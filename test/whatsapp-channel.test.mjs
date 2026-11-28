import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSharePost, buildWhatsappShareUrl, cleanPageUrl, parseChannelUrl } from '../src/lib/whatsappChannel.mjs';

const CHANNEL = 'https://whatsapp.com/channel/0029VaAbCdEfGh1234567890';

test('channel url: accepts the real format and normalises it', () => {
  assert.equal(parseChannelUrl(CHANNEL), CHANNEL);
  assert.equal(parseChannelUrl(`  ${CHANNEL}  `), CHANNEL);
  assert.equal(parseChannelUrl('https://www.whatsapp.com/channel/0029VaAbCdEfGh1234567890/'), CHANNEL);
  assert.equal(parseChannelUrl(`${CHANNEL}?mode=wwt#frag`), CHANNEL, 'query and hash are dropped');
});

test('channel url: rejects anything that is not exactly a WhatsApp channel link', () => {
  for (const bad of [
    undefined,
    null,
    '',
    '   ',
    42,
    'not a url',
    'http://whatsapp.com/channel/0029VaAbCdEfGh1234567890',
    'https://whatsapp.com.evil.example/channel/0029VaAbCdEfGh1234567890',
    'https://evil.example/whatsapp.com/channel/0029VaAbCdEfGh1234567890',
    'https://wa.me/channel/0029VaAbCdEfGh1234567890',
    'https://user:pass@whatsapp.com/channel/0029VaAbCdEfGh1234567890',
    'https://whatsapp.com:8443/channel/0029VaAbCdEfGh1234567890',
    'https://whatsapp.com/channel/short',
    'https://whatsapp.com/channel/0029Va AbCdEf',
    'https://whatsapp.com/channel/0029VaAbCdEfGh1234567890/extra',
    'https://whatsapp.com/chat/0029VaAbCdEfGh1234567890',
    'javascript:alert(1)',
  ]) {
    assert.equal(parseChannelUrl(bad), null, String(bad));
  }
});

test('page url: keeps origin and path, drops query, hash and credentials', () => {
  assert.equal(cleanPageUrl('https://target95.web.app/study/arrays?board=icse&q=1#top'), 'https://target95.web.app/study/arrays');
  assert.equal(cleanPageUrl('http://localhost:3000/study/x'), 'http://localhost:3000/study/x');
  for (const bad of [undefined, null, '', 'ftp://x.example/a', 'javascript:alert(1)', 'https://u:p@x.example/a', 'nope']) {
    assert.equal(cleanPageUrl(bad), null, String(bad));
  }
});

test('share post: title, chapter link and (only when configured) the channel link', () => {
  const withChannel = buildSharePost({ title: 'Arrays in Java', pageUrl: 'https://target95.web.app/study/arrays?board=icse', channelUrl: CHANNEL });
  assert.equal(
    withChannel,
    `📘 Arrays in Java\n\nRead the full chapter on Target95+:\nhttps://target95.web.app/study/arrays\n\nFollow our WhatsApp Channel for daily lessons:\n${CHANNEL}`,
  );
  const without = buildSharePost({ title: 'Arrays in Java', pageUrl: 'https://target95.web.app/study/arrays' });
  assert.ok(!without.includes('Channel'), 'no channel line when no channel is configured');
  const invalidChannel = buildSharePost({ title: 'Arrays', pageUrl: 'https://target95.web.app/study/arrays', channelUrl: 'https://evil.example/x' });
  assert.ok(!invalidChannel.includes('evil.example'), 'an invalid channel link is never shared');
});

test('share post: no tracking, no study state, no personal data', () => {
  const post = buildSharePost({ title: 'Loops', pageUrl: 'https://target95.web.app/study/loops?board=icse&userId=abc#x', channelUrl: CHANNEL });
  for (const leak of ['?', 'board=', 'userId', 'utm_', '#x']) {
    assert.ok(!post.replace(CHANNEL, '').includes(leak), `leaked ${leak}`);
  }
});

test('share post: titles are cleaned and capped; empty input shares nothing', () => {
  const messy = buildSharePost({ title: '  Loops\n\n\tand   <b>arrays</b>\u0007  ', pageUrl: 'https://target95.web.app/study/loops' });
  assert.ok(messy.startsWith('📘 Loops and <b>arrays</b>\n'), 'control characters and runs of whitespace collapse');
  const long = buildSharePost({ title: 'x'.repeat(500), pageUrl: 'https://target95.web.app/study/loops' });
  assert.equal(long.split('\n')[0].length, '📘 '.length + 120, 'title is cut to exactly 120 characters');
  assert.equal(buildSharePost({ title: '', pageUrl: 'https://target95.web.app/a' }), '');
  assert.equal(buildSharePost({ title: 'Loops', pageUrl: '' }), '');
  assert.equal(buildSharePost({ title: 'Loops', pageUrl: 'javascript:alert(1)' }), '');
  assert.equal(buildSharePost(), '');
  assert.ok(buildSharePost({ title: 'Loops', pageUrl: `https://target95.web.app/${'a'.repeat(2000)}` }).length <= 1000);
});

test('whatsapp share url: wa.me with an encoded text; nothing for empty text', () => {
  const url = buildWhatsappShareUrl('Hello & welcome?\nSecond line');
  assert.equal(url, `https://wa.me/?text=${encodeURIComponent('Hello & welcome?\nSecond line')}`);
  assert.equal(new URL(url).searchParams.get('text'), 'Hello & welcome?\nSecond line');
  assert.equal(buildWhatsappShareUrl(''), null);
  assert.equal(buildWhatsappShareUrl('   '), null);
  assert.equal(buildWhatsappShareUrl(undefined), null);
});
