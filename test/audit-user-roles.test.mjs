import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { auditUsers, classifyRole, isActive, parseArgs, READ_FIELDS, runAudit, STAGING_PROJECT_ALLOWLIST, verifyProject } from '../scripts/audit-user-roles.mjs';

// Fake Firestore: honours orderBy(__name__), select(), limit(), startAfter() and records every call.
function fakeDb(profiles) {
  const calls = { queries: [], gets: 0, writes: 0 };
  const sorted = [...profiles].sort((a, b) => (a.uid < b.uid ? -1 : 1));
  const db = {
    collection(name) {
      assert.equal(name, 'users');
      const q = { fields: null, limit: Infinity, after: null };
      const api = {
        orderBy(field) { assert.equal(field, '__name__'); return api; },
        select(...f) { q.fields = f; return api; },
        limit(n) { q.limit = n; return api; },
        startAfter(snap) { q.after = snap.id; return api; },
        async get() {
          calls.gets += 1; calls.queries.push({ ...q });
          let rows = sorted.filter((p) => (q.after ? p.uid > q.after : true)).slice(0, q.limit);
          const docs = rows.map((p) => ({ id: p.uid, data: () => (q.fields ? Object.fromEntries(q.fields.filter((k) => k in p.data).map((k) => [k, p.data[k]])) : { ...p.data }) }));
          return { empty: docs.length === 0, docs };
        },
        set() { calls.writes += 1; }, update() { calls.writes += 1; }, delete() { calls.writes += 1; },
      };
      return api;
    },
  };
  return { db, calls };
}
const mk = (n, make) => Array.from({ length: n }, (_, i) => ({ uid: `u${String(i).padStart(5, '0')}`, data: make(i) }));
const active = (role) => ({ role, status: 'active', disabled: false, email: 'someone@example.com', fullName: 'Some One' });

test('classification is strict: only exact lowercase student/teacher/admin are recognised', () => {
  for (const r of ['student', 'teacher', 'admin']) assert.equal(classifyRole({ role: r }), r);
  for (const r of ['Student', 'STUDENT', ' student', 'student ', 'Teacher', 'ADMIN', 'pupil', 'superuser', 0, false, {}, []]) assert.equal(classifyRole({ role: r }), 'unknown', JSON.stringify(r));
  for (const p of [{}, { role: undefined }, { role: null }, { role: '' }, null, undefined]) assert.equal(classifyRole(p), 'missing', JSON.stringify(p));
});

test('active-account rule matches the project (status active and disabled === false or absent)', () => {
  assert.equal(isActive({ status: 'active' }), true);
  assert.equal(isActive({ status: 'active', disabled: false }), true);
  for (const p of [{ status: 'active', disabled: true }, { status: 'active', disabled: 'false' }, { status: 'suspended' }, { status: 'Active' }, {}, null]) assert.equal(isActive(p), false, JSON.stringify(p));
});

test('pagination: every document counted exactly once across pages, with field projection on every query', async () => {
  const profiles = mk(1203, (i) => active(i % 3 === 0 ? 'student' : i % 3 === 1 ? 'teacher' : undefined));
  const { db, calls } = fakeDb(profiles);
  const r = await auditUsers(db, { pageSize: 500 });
  assert.equal(r.total, 1203);
  assert.equal(r.roles.student + r.roles.teacher + r.roles.admin + r.roles.missing + r.roles.unknown, 1203);
  assert.equal(r.pages, 3);
  assert.equal(calls.gets, 3);
  assert.ok(calls.queries.every((q) => JSON.stringify(q.fields) === JSON.stringify([...READ_FIELDS])));
  assert.equal(calls.queries[0].after, null);
  assert.ok(calls.queries[1].after && calls.queries[2].after && calls.queries[1].after !== calls.queries[2].after);
  assert.equal(calls.writes, 0);
});

test('pagination edge cases: empty collection, exact page multiple, single short page', async () => {
  assert.equal((await auditUsers(fakeDb([]).db, { pageSize: 5 })).total, 0);
  const exact = fakeDb(mk(10, () => active('student')));
  const r = await auditUsers(exact.db, { pageSize: 5 });
  assert.equal(r.total, 10);
  assert.equal(r.pages, 2);
  assert.equal((await auditUsers(fakeDb(mk(3, () => active('student'))).db, { pageSize: 5 })).pages, 1);
});

test('missing and unknown roles are counted separately and flagged only when active', async () => {
  const profiles = [
    { uid: 'a1', data: { status: 'active' } },                       // missing, active
    { uid: 'a2', data: { role: 'Student', status: 'active' } },      // unknown (case), active
    { uid: 'a3', data: { role: 'pupil', status: 'inactive', disabled: true } }, // unknown, inactive
    { uid: 'a4', data: { status: 'suspended' } },                    // missing, inactive
    { uid: 'a5', data: active('student') },
  ];
  const r = await auditUsers(fakeDb(profiles).db, { list: true });
  assert.deepEqual(r.roles, { student: 1, teacher: 0, admin: 0, missing: 2, unknown: 2 });
  assert.equal(r.activeMissingOrUnknownRole, 2);
  assert.deepEqual(r.flagged.map((f) => f.uid).sort(), ['a1', 'a2']);
});

test('non-student-role and inactive counts are reported separately (and overlap is explicit)', async () => {
  const profiles = [
    { uid: 'b1', data: active('student') },
    { uid: 'b2', data: { role: 'student', status: 'inactive', disabled: true } }, // inactive student: NOT a role denial
    { uid: 'b3', data: active('teacher') },
    { uid: 'b4', data: { role: 'admin', status: 'inactive' } },                   // inactive admin: both
    { uid: 'b5', data: active(undefined) },
  ];
  const r = await auditUsers(fakeDb(profiles).db);
  assert.deepEqual(r.nonStudentRoleProfiles, { total: 3, teacher: 1, admin: 1, missing: 1, unknown: 0 });
  assert.equal(r.inactiveProfiles.total, 2);
  assert.deepEqual(r.inactiveProfiles.byRole, { student: 1, teacher: 0, admin: 1, missing: 0, unknown: 0 });
  assert.equal(r.activeMissingOrUnknownRole, 1);
});

test('default output has aggregates only: no uids, emails or names, and none were even fetched', async () => {
  const profiles = [{ uid: 'secretuid1', data: active(undefined) }, { uid: 'secretuid2', data: active('student') }];
  const out = []; const err = [];
  const { db } = fakeDb(profiles);
  const code = await runAudit({ allowedProjects: ['target95-staging'], env: { FIREBASE_SERVICE_ACCOUNT: JSON.stringify({ project_id: 'target95-staging' }) }, argv: ['--expect-project', 'target95-staging'], createDb: async () => db, stdout: (s) => out.push(s), stderr: (s) => err.push(s) });
  assert.equal(code, 0);
  const text = out.join('\n');
  assert.ok(!text.includes('secretuid') && !text.includes('@') && !/example\.com|Some One/.test(text));
  assert.equal(JSON.parse(text).projectId, 'target95-staging');
  assert.equal(JSON.parse(text).readOnly, true);
  assert.equal(err.length, 0);
});

test('--list prints flagged uids only for active missing/unknown roles, with a sensitivity warning on stderr', async () => {
  const profiles = [{ uid: 'flag1', data: { status: 'active' } }, { uid: 'ok1', data: active('student') }, { uid: 'gone1', data: { status: 'inactive' } }];
  const out = []; const err = [];
  const code = await runAudit({ allowedProjects: ['target95-staging'], env: { FIREBASE_SERVICE_ACCOUNT: JSON.stringify({ project_id: 'target95-staging' }) }, argv: ['--expect-project=target95-staging', '--list'], createDb: async () => fakeDb(profiles).db, stdout: (s) => out.push(s), stderr: (s) => err.push(s) });
  assert.equal(code, 0);
  assert.ok(out.some((l) => l === 'missing\tflag1'));
  assert.ok(!out.join('\n').includes('ok1') && !out.join('\n').includes('gone1'));
  assert.match(err.join('\n'), /sensitive identifiers/);
  assert.ok(!JSON.stringify(JSON.parse(out[0])).includes('flag1'), 'the JSON report itself never contains uids');
});

test('project mismatch refuses BEFORE any Firebase call and never echoes key material', async () => {
  let created = 0;
  const err = [];
  const secret = { project_id: 'target95-production', private_key: '-----BEGIN PRIVATE KEY-----SECRET', client_email: 'sa@x.iam' };
  const code = await runAudit({ allowedProjects: ['target95-staging'], env: { FIREBASE_SERVICE_ACCOUNT: JSON.stringify(secret) }, argv: ['--expect-project', 'target95-staging'], createDb: async () => { created += 1; return fakeDb([]).db; }, stdout: () => {}, stderr: (s) => err.push(s) });
  assert.equal(code, 1);
  assert.equal(created, 0, 'createDb must not be called on mismatch');
  assert.match(err.join(' '), /not an allowlisted staging project/, 'a production key is refused even though --expect-project names a different, allowlisted project');
  assert.ok(!/SECRET|PRIVATE KEY|sa@x/.test(err.join(' ')));
});

test('refuses without --expect-project, with a malformed id, with bad JSON, with no project_id, and without the env var', async () => {
  const run = (env, argv) => { let created = 0; return runAudit({ allowedProjects: ['target95-staging'], env, argv, createDb: async () => { created += 1; return fakeDb([]).db; }, stdout: () => {}, stderr: () => {} }).then((code) => ({ code, created })); };
  const good = { FIREBASE_SERVICE_ACCOUNT: JSON.stringify({ project_id: 'target95-staging' }) };
  for (const [env, argv] of [[good, []], [good, ['--expect-project']], [good, ['--expect-project', 'Target95 Staging']], [{ FIREBASE_SERVICE_ACCOUNT: '{nope' }, ['--expect-project', 'target95-staging']], [{ FIREBASE_SERVICE_ACCOUNT: '{}' }, ['--expect-project', 'target95-staging']], [{}, ['--expect-project', 'target95-staging']], [good, ['--expect-project', 'target95-staging', '--apply']]]) {
    const r = await run(env, argv);
    assert.notEqual(r.code, 0, JSON.stringify(argv));
    assert.equal(r.created, 0);
  }
});

test('verifyProject and parseArgs behave as specified', () => {
  assert.equal(verifyProject(JSON.stringify({ project_id: 'p-staging1' }), 'p-staging1', ['p-staging1']).ok, true);
  assert.equal(verifyProject(JSON.stringify({ project_id: 'p-staging1' }), 'p-staging2', ['p-staging1', 'p-staging2']).ok, false);
  assert.deepEqual(parseArgs(['--list', '--expect-project', 'x-y-z1']), { list: true, expectProject: 'x-y-z1', unknown: [] });
});

test('a Firestore failure exits non-zero with only an error code in the message', async () => {
  const err = [];
  const code = await runAudit({ allowedProjects: ['target95-staging'], env: { FIREBASE_SERVICE_ACCOUNT: JSON.stringify({ project_id: 'target95-staging' }) }, argv: ['--expect-project', 'target95-staging'], createDb: async () => { throw Object.assign(new Error('token abc123 leaked?'), { code: 'permission-denied' }); }, stdout: () => {}, stderr: (s) => err.push(s) });
  assert.equal(code, 1);
  assert.equal(err.join(' '), 'audit failed: permission-denied');
});

test('static: the script contains no Firestore write calls', () => {
  const src = fs.readFileSync(new URL('../scripts/audit-user-roles.mjs', import.meta.url), 'utf8');
  assert.deepEqual(src.match(/\.(set|update|delete|create|add|batch|runTransaction|bulkWriter|recursiveDelete)\(/g), null);
  assert.ok(/\.select\(\.\.\.READ_FIELDS\)/.test(src), 'must project only the needed fields');
});

test('overlap: an inactive non-student is in both counts, active role denials exclude it, and the overlap is stated', async () => {
  const profiles = [
    { uid: 'c1', data: active('student') },                                  // neither
    { uid: 'c2', data: { role: 'student', status: 'inactive' } },            // inactive only
    { uid: 'c3', data: active('teacher') },                                  // non-student, active
    { uid: 'c4', data: { role: 'admin', status: 'inactive', disabled: true } }, // BOTH
    { uid: 'c5', data: { status: 'suspended' } },                            // BOTH (missing role, inactive)
    { uid: 'c6', data: active('Student') },                                  // non-student (unknown), active
  ];
  const r = await auditUsers(fakeDb(profiles).db);
  assert.equal(r.total, 6);
  assert.equal(r.nonStudentRoleProfiles.total, 4);          // c3 c4 c5 c6
  assert.equal(r.inactiveProfiles.total, 3);                // c2 c4 c5
  assert.equal(r.inactiveAndNonStudent, 2);                 // c4 c5
  assert.equal(r.nonStudentRoleProfiles.total + r.inactiveProfiles.total - r.inactiveAndNonStudent <= r.total, true, 'inclusion-exclusion never exceeds total');
  assert.ok(r.nonStudentRoleProfiles.total + r.inactiveProfiles.total > r.total, 'naive sum double counts, which is why the note exists');
  assert.deepEqual(r.activeNonStudentRoleProfiles, { total: 2, teacher: 1, admin: 0, missing: 0, unknown: 1 }); // c3 c6
  assert.equal(r.activeMissingOrUnknownRole, 1);            // c6
  assert.match(r.note, /overlap/);
  assert.equal('roleDenied' in r, false, 'the ambiguous roleDenied name is gone');
});

test('the shipped allowlist is exactly target95-staging and frozen', () => {
  assert.deepEqual([...STAGING_PROJECT_ALLOWLIST], ['target95-staging']);
  assert.ok(Object.isFrozen(STAGING_PROJECT_ALLOWLIST));
});

test('with the shipped allowlist, any other project (even if key and flag agree) is refused before Firebase is touched', async () => {
  for (const project of ['target95', 'target95-prod', 'some-other-project', 'target95-staging-2']) {
    let created = 0; const err = [];
    const code = await runAudit({ env: { FIREBASE_SERVICE_ACCOUNT: JSON.stringify({ project_id: project }) }, argv: ['--expect-project', project], createDb: async () => { created += 1; return fakeDb([]).db; }, stdout: () => {}, stderr: (s) => err.push(s) });
    assert.equal(code, 1, project);
    assert.equal(created, 0, project);
  }
});

test('with the shipped allowlist, a target95-staging key and flag are accepted', async () => {
  const out = [];
  const code = await runAudit({ env: { FIREBASE_SERVICE_ACCOUNT: JSON.stringify({ project_id: 'target95-staging' }) }, argv: ['--expect-project', 'target95-staging'], createDb: async () => fakeDb([]).db, stdout: (s) => out.push(s), stderr: () => {} });
  assert.equal(code, 0);
  assert.equal(JSON.parse(out[0]).projectId, 'target95-staging');
});

test('an empty allowlist still refuses everything (fail closed is preserved)', async () => {
  let created = 0; const err = [];
  const code = await runAudit({ allowedProjects: [], env: { FIREBASE_SERVICE_ACCOUNT: JSON.stringify({ project_id: 'target95-staging' }) }, argv: ['--expect-project', 'target95-staging'], createDb: async () => { created += 1; return fakeDb([]).db; }, stdout: () => {}, stderr: (s) => err.push(s) });
  assert.equal(code, 1);
  assert.equal(created, 0);
  assert.match(err.join(' '), /No staging project is configured/);
});

test('production is rejected even when --expect-project and the key AGREE with each other', async () => {
  for (const production of ['target95', 'target95-prod', 'target95-production', 'my-app-live']) {
    let created = 0; const err = [];
    const code = await runAudit({ allowedProjects: ['target95-staging'], env: { FIREBASE_SERVICE_ACCOUNT: JSON.stringify({ project_id: production, private_key: 'SECRETKEY' }) }, argv: ['--expect-project', production], createDb: async () => { created += 1; return fakeDb([]).db; }, stdout: () => {}, stderr: (s) => err.push(s) });
    assert.equal(code, 1, production);
    assert.equal(created, 0, `${production}: no Firebase call may happen`);
    assert.match(err.join(' '), /not on the staging allowlist|looks like a production/);
    assert.ok(!err.join(' ').includes('SECRETKEY'));
  }
});

test('production-looking ids are refused even if someone adds them to the allowlist', () => {
  for (const id of ['target95-prod', 'target95-production', 'app-live', 'prod-target95']) {
    const r = verifyProject(JSON.stringify({ project_id: id }), id, [id]);
    assert.equal(r.ok, false, id);
    assert.match(r.error, /looks like a production/);
  }
  assert.equal(verifyProject(JSON.stringify({ project_id: 'target95-staging' }), 'target95-staging', ['target95-staging']).ok, true);
});

test('allowlisted --expect-project with a key from a DIFFERENT project (including production) is refused', async () => {
  for (const keyProject of ['target95-production', 'target95-other', 'target95']) {
    let created = 0;
    const code = await runAudit({ allowedProjects: ['target95-staging'], env: { FIREBASE_SERVICE_ACCOUNT: JSON.stringify({ project_id: keyProject }) }, argv: ['--expect-project', 'target95-staging'], createDb: async () => { created += 1; return fakeDb([]).db; }, stdout: () => {}, stderr: () => {} });
    assert.equal(code, 1, keyProject);
    assert.equal(created, 0);
  }
});

test('an allowlist that is not a non-empty array is treated as unconfigured', () => {
  for (const bad of [null, [], 'target95-staging', {}]) {
    const r = verifyProject(JSON.stringify({ project_id: 'target95-staging' }), 'target95-staging', bad);
    assert.equal(r.ok, false, String(bad));
    assert.match(r.error, /No staging project is configured/);
  }
});

test('an omitted allowlist means the shipped staging allowlist: staging passes, anything else is refused', () => {
  const ok = verifyProject(JSON.stringify({ project_id: 'target95-staging' }), 'target95-staging');
  assert.equal(ok.ok, true);
  for (const other of ['target95', 'target95-prod', 'other-project']) {
    const r = verifyProject(JSON.stringify({ project_id: other }), other);
    assert.equal(r.ok, false, other);
    assert.match(r.error, /allowlist|production/);
  }
});
