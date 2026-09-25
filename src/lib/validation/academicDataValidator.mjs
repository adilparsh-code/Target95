import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { pathToFileURL } from 'node:url';

export class AcademicDataValidator {
  constructor(rootDir = process.cwd()) {
    this.rootDir = rootDir;
    this.srcDir = path.join(rootDir, 'src');
    this.appDataDir = path.join(this.srcDir, 'app', 'data');
    this.chaptersDir = path.join(this.appDataDir, 'chapter-content');
    this.questionBankDir = path.join(this.appDataDir, 'question-bank');
    this.icseSupplementalBankFile = path.join(this.appDataDir, 'icse-board-practice-2026-27.js');
    this.javaCurriculumFile = path.join(this.appDataDir, 'javaCurriculum.js');
    this.chapterContentFile = path.join(this.srcDir, 'lib', 'chapterContent.js');
    this.subjectsFile = path.join(this.appDataDir, 'subjects.js');
    this.legacyQuestionBankChapters = [];
    this.findings = [];
  }

  severityRank(severity) { return { ERROR: 0, WARNING: 1, INFO: 2 }[severity] ?? 3; }

  addFinding(severity, category, message, file = null, record = null) {
    this.findings.push({ severity, category, message, file, record });
  }

  collectJsFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter((name) => name.endsWith('.js') || name.endsWith('.mjs') || name.endsWith('.json'))
      .map((name) => path.join(dir, name));
  }

  firstValue(text, regex) { return text.match(regex)?.[1] || null; }

  readChapterContentRecords() {
    const records = [];
    for (const file of this.collectJsFiles(this.chaptersDir)) {
      if (path.basename(file) === 'index.js') continue;
      const text = fs.readFileSync(file, 'utf8');
      const id = this.firstValue(text, /["']?id["']?\s*:\s*['"`]([^'"`]+)/m);
      const title = this.firstValue(text, /["']?title["']?\s*:\s*['"`]([^'"`]+)/m);
      const slug = this.firstValue(text, /["']?slug["']?\s*:\s*['"`]([^'"`]+)/m);
      const subject = this.firstValue(text, /["']?subject["']?\s*:\s*['"`]([^'"`]+)/m);
      const board = this.firstValue(text, /["']?board["']?\s*:\s*['"`]([^'"`]+)/m);
      const className = this.firstValue(text, /["']?class["']?\s*:\s*['"`]([^'"`]+)/m);
      if (id || title || slug) records.push({ id, title, slug, subject, board, className, file });
    }
    return records;
  }

  inferQuestionTypeFromId(id) {
    if (!id || typeof id !== 'string') return null;
    const match = id.trim().toUpperCase().match(/CH\d{2}-(MCQ|AR|TF|FIB|OUT|ERR|PRQ|DBG|CBQ|VIV)(?:-|$)/i);
    if (!match) return null;
    const map = { MCQ: 'mcq', AR: 'assertion-reason', TF: 'true-false', FIB: 'fill-blank', OUT: 'output', ERR: 'error-finding', PRQ: 'programming', DBG: 'debugging', CBQ: 'case-study', VIV: 'viva' };
    return map[match[1].toUpperCase()] || null;
  }

  legacyQuestionFamilyMap() {
    return {
      mcqs: { type: 'mcq' }, assertionReasons: { type: 'assertion-reason' }, trueFalse: { type: 'true-false' },
      fillBlanks: { type: 'fill-blank' }, outputQuestions: { type: 'output' }, errorFinding: { type: 'error-finding' },
      programmingQuestions: { type: 'programming' }, debuggingQuestions: { type: 'debugging' }, caseBasedQuestions: { type: 'case-study' }, vivaQuestions: { type: 'viva' },
    };
  }

  normalizeQuestionRecord(raw, chapter, familyName, file) {
    if (!raw || typeof raw !== 'object') return null;
    const familyInfo = this.legacyQuestionFamilyMap()[familyName] || null;
    return {
      file, family: familyName, id: raw.id || null, slug: raw.slug || null,
      question: raw.question || raw.prompt || raw.problemStatement || raw.problem || null,
      difficulty: raw.difficulty || null, bloom: raw.bloom || null,
      type: familyInfo?.type || raw.type || this.inferQuestionTypeFromId(raw.id),
      board: raw.board || null, className: raw.className || raw.class || null,
      chapter: raw.chapter || chapter?.title || chapter?.slug || null, chapterId: raw.chapterId || chapter?.id || null,
      chapterSlug: chapter?.slug || null, subject: raw.subject || null,
      problemStatement: raw.problemStatement || null, input: raw.input || null, output: raw.output || null,
      constraints: raw.constraints || null, solution: raw.solution || null, line: null, raw,
    };
  }

  findMatchingCharacter(text, start, openChar, closeChar) {
    if (start < 0 || start >= text.length) return -1;
    let depth = 0; let inSingle = false; let inDouble = false; let inTemplate = false;
    for (let i = start; i < text.length; i += 1) {
      const char = text[i]; const prev = i > 0 ? text[i - 1] : '';
      if (inSingle) { if (char === '\'' && prev !== '\\') inSingle = false; continue; }
      if (inDouble) { if (char === '"' && prev !== '\\') inDouble = false; continue; }
      if (inTemplate) { if (char === '`' && prev !== '\\') inTemplate = false; continue; }
      if (char === '\'' && prev !== '\\') { inSingle = true; continue; }
      if (char === '"' && prev !== '\\') { inDouble = true; continue; }
      if (char === '`' && prev !== '\\') { inTemplate = true; continue; }
      if (char === openChar) depth += 1;
      else if (char === closeChar) { depth -= 1; if (depth === 0) return i; }
    }
    return -1;
  }

  readQuestionBankRecords() {
    const records = [];
    if (!fs.existsSync(this.questionBankDir)) return records;
    const familyKeys = Object.keys(this.legacyQuestionFamilyMap());
    for (const file of this.collectJsFiles(this.questionBankDir)) {
      const base = path.basename(file);
      if (base === 'index.js') continue;
      const text = fs.readFileSync(file, 'utf8').replace(/<\/arg_value>[\s\S]*$/m, '').trim();
      const chapterObj = {
        id: this.firstValue(text, /id\s*:\s*([0-9]+)/m),
        title: this.firstValue(text, /title\s*:\s*['"`]([^'"`]+)/m),
        slug: this.firstValue(text, /slug\s*:\s*['"`]([^'"`]+)/m),
      };
      this.legacyQuestionBankChapters.push({ ...chapterObj, file });
      const vmExecutableCode = text.replace(/export\s+default\s+/g, 'const __default_export__ = ').replace(/export\s+const\s+/g, 'const ').replace(/export\s+function\s+/g, 'function ');
      try { new vm.Script(vmExecutableCode, { filename: file }); }
      catch (error) { this.addFinding('ERROR', 'SOURCE', `Invalid JavaScript source: ${error.message}`, file, { chapter: chapterObj.title || base }); continue; }
      for (const familyName of familyKeys) {
        const familyMatch = text.match(new RegExp(`\\b${familyName}\\s*:\\s*\\[`, 'm'));
        if (!familyMatch) continue;
        const arrayOpen = text.indexOf('[', familyMatch.index);
        const arrayClose = this.findMatchingCharacter(text, arrayOpen, '[', ']');
        if (arrayOpen < 0 || arrayClose < 0) { this.addFinding('WARNING', 'QUESTION', 'Question bank family array is unbalanced', file, { family: familyName, chapter: base }); continue; }
        try {
          const collection = vm.runInNewContext(`[${text.slice(arrayOpen + 1, arrayClose)}]`, { console });
          if (Array.isArray(collection)) for (const rawQuestion of collection) {
            const q = this.normalizeQuestionRecord(rawQuestion, chapterObj, familyName, file);
            if (q) records.push(q);
          }
        } catch (error) {
          this.addFinding('WARNING', 'QUESTION', `Legacy question-family array could not be evaluated: ${error.message}`, file, { family: familyName, chapter: base });
        }
      }
    }
    return records;
  }

  readJavaCurriculumRecords() {
    const records = [];
    if (!fs.existsSync(this.javaCurriculumFile)) return records;
    const text = fs.readFileSync(this.javaCurriculumFile, 'utf8');
    for (const match of text.matchAll(/\{[^{}]*\}/gs)) {
      const objectText = match[0];
      const slug = this.firstValue(objectText, /["']?slug["']?\s*:\s*['"`]([^'"`]+)/m);
      const title = this.firstValue(objectText, /["']?title["']?\s*:\s*['"`]([^'"`]+)/m);
      if (slug && title) records.push({ type: 'chapter', id: null, slug, title, file: this.javaCurriculumFile });
    }
    return records;
  }

  validDifficulty(value) { return !!value && new Set(['Easy', 'Medium', 'Hard', 'Beginner', 'Intermediate', 'Advanced', 'easy', 'medium', 'hard']).has(String(value).trim()); }
  validBloom(value) { return !value || new Set(['remember', 'understand', 'apply', 'analyse', 'analyze', 'evaluate', 'create']).has(String(value).trim().toLowerCase()); }
  supportedSubject(subject) {
    if (!subject || !fs.existsSync(this.subjectsFile)) return true;
    const text = fs.readFileSync(this.subjectsFile, 'utf8').toLowerCase(); const id = String(subject).trim().toLowerCase();
    return text.includes(`id: "${id}"`) || text.includes(`id: '${id}'`) || text.includes(`"${id}"`);
  }
  validClassBoardPair(className, board) {
    const cls = String(className || '').toLowerCase(); const b = String(board || '').toLowerCase();
    if (b.includes('icse')) return ['9', 'ix', '10', 'x'].some((x) => cls.includes(x));
    if (b.includes('isc')) return cls.includes('11') || cls.includes('12');
    return true;
  }

  normalizeDuplicateChapterRecords(records) {
    const groups = new Map();
    for (const record of records) { const key = `${record.id || ''}::${record.slug || ''}`; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(record); }
    const canonical = [];
    for (const [key, group] of groups) {
      if (group.length === 1) { canonical.push(group[0]); continue; }
      const preferred = group.find((r) => path.basename(r.file) === '08-arrays-1d.js') || group.find((r) => path.basename(r.file) === '08-one-dimensional-arrays.js') || group[0];
      canonical.push(preferred);
      this.addFinding('INFO', 'REGISTRY', `Duplicate legacy chapter content collapsed to canonical record: ${key}`, preferred.file, { duplicateFiles: group.filter((r) => r !== preferred).map((r) => path.basename(r.file)) });
    }
    return canonical;
  }

  validateSupplementalBankSource() {
    if (!fs.existsSync(this.icseSupplementalBankFile)) return;
    const text = fs.readFileSync(this.icseSupplementalBankFile, 'utf8');
    const vmExecutableCode = text.replace(/export\s+default\s+/g, 'const __default_export__ = ').replace(/export\s+\{[^}]+\}\s*;?/g, '');
    try { new vm.Script(vmExecutableCode, { filename: this.icseSupplementalBankFile }); }
    catch (error) {
      this.addFinding('ERROR', 'SOURCE', `ICSE supplemental question bank has invalid JavaScript: ${error.message}`, this.icseSupplementalBankFile);
    }
  }

  validateSectionStructures() {
    if (!fs.existsSync(this.chapterContentFile)) return;
    const contract = fs.readFileSync(this.chapterContentFile, 'utf8');
    const expected = ['learningObjectives', 'theory', 'definitions', 'keyTerms', 'examples', 'diagrams', 'practice', 'mcqs', 'output', 'programming', 'pyqs', 'revisionNotes'];
    const missing = expected.filter((section) => !contract.includes(section));
    if (missing.length) this.addFinding('WARNING', 'CONTENT', 'ChapterContentEngine normalization contract has incomplete section coverage', this.chapterContentFile, { missing });
    for (const file of this.collectJsFiles(this.chaptersDir)) {
      if (path.basename(file) === 'index.js') continue;
      const text = fs.readFileSync(file, 'utf8');
      const missingFields = ['theoryNotes', 'examples'].filter((field) => !text.includes(field));
      if (missingFields.length) this.addFinding('WARNING', 'CONTENT', `Chapter content file lacks expected schema sections: ${missingFields.join(', ')}`, file, { missing: missingFields });
      if (text.includes('examples: {') && !text.includes('basic:') && !text.includes('intermediate:') && !text.includes('advanced:')) this.addFinding('ERROR', 'CONTENT', 'Invalid content-engine examples structure: expected basic/intermediate/advanced examples grouping', file);
    }
  }

  async validateCBSE083Boundary() {
    const dataFiles = [
      'curriculum-2026-27.js',
      'question-bank-2026-27.js',
      'practice-question-bank-2026-27.js',
      'practice-questions-2026-27.js',
      'board-practice-2026-27.js',
      'mock-test-blueprints-2026-27.js',
      'mock-tests-2026-27.js',
    ].map((name) => path.join(this.appDataDir, 'cbse', name));
    dataFiles.push(path.join(this.appDataDir, 'projects', 'cbseCS083Projects.js'));

    const forbiddenJava = /\b(java|bluej|constructor(?:s)?|inheritance|polymorphism)\b|public\s+static\s+void\s+main|system\.out\.println|\/java\//i;
    const visit = (value, file, key = '') => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => visit(item, file, `${key}[${index}]`));
        return;
      }
      if (!value || typeof value !== 'object') return;

      const identifies083 = String(value.subjectCode || value.code || '') === '083'
        || /cbse[-_]?083/i.test(String(value.id || ''));
      if (identifies083) {
        const serialized = JSON.stringify(value);
        if (forbiddenJava.test(serialized)) {
          this.addFinding('ERROR', 'CBSE-083', 'CBSE 083 record resolves to Java-specific content', file, { key, id: value.id || value.slug || null });
        }
        if (value.programmingLanguage && String(value.programmingLanguage).toLowerCase() !== 'python') {
          this.addFinding('ERROR', 'CBSE-083', 'CBSE 083 programmingLanguage must be Python', file, { key, programmingLanguage: value.programmingLanguage });
        }
        const isActiveQuestion = path.basename(file) === 'question-bank-2026-27.js' && typeof value.question === 'string';
        if (isActiveQuestion) {
          if (String(value.board).toUpperCase() !== 'CBSE') {
            this.addFinding('ERROR', 'CBSE-083', 'Active CBSE 083 question must declare board: CBSE', file, { key, id: value.id || null });
          }
          if (![11, 12].includes(Number(value.classLevel)) || Number(value.classNumber) !== Number(value.classLevel)) {
            this.addFinding('ERROR', 'CBSE-083', 'Active CBSE 083 question must declare matching classNumber/classLevel 11 or 12', file, { key, id: value.id || null });
          }
          if (String(value.questionType).toLowerCase() === 'programming' && value.programmingLanguage !== 'Python') {
            this.addFinding('ERROR', 'CBSE-083', 'Active CBSE 083 programming question must declare Python', file, { key, id: value.id || null });
          }
        }
      }
      Object.entries(value).forEach(([childKey, child]) => visit(child, file, key ? `${key}.${childKey}` : childKey));
    };

    for (const file of dataFiles) {
      if (!fs.existsSync(file)) continue;
      try {
        const importedData = await import(`${pathToFileURL(file).href}?validation=${Date.now()}`);
        Object.entries(importedData).forEach(([name, value]) => {
          if (name !== 'default') visit(value, file, name);
        });
        if (path.basename(file) === 'question-bank-2026-27.js') {
          const activeQuestions = importedData.CBSE_PRACTICE_QUESTIONS_2026_27 || [];
          const allowedClasses = { '402': [9, 10], '083': [11, 12], '065': [11, 12], '802': [11, 12] };
          const forbiddenByTrack = {
            '402': /\b(java|python|pandas|matplotlib)\b|system\.out|public\s+static\s+void\s+main/i,
            '083': /\b(java|bluej|arraylist|pandas|matplotlib)\b|system\.out|public\s+static\s+void\s+main/i,
            '065': /\b(java|bluej|arraylist)\b|system\.out|public\s+static\s+void\s+main/i,
          };
          activeQuestions.forEach((question) => {
            const code = String(question.subjectCode || '');
            const record = { id: question.id || null, subjectCode: code, classLevel: question.classLevel };
            if (question.board !== 'CBSE' || !allowedClasses[code]?.includes(Number(question.classLevel)) || Number(question.classNumber) !== Number(question.classLevel)) {
              this.addFinding('ERROR', 'CBSE', 'Active CBSE question has invalid board/class/subject metadata', file, record);
            }
            const requiredFields = ['unitId', 'topicId', 'questionType', 'difficulty', 'question', 'correctAnswer', 'explanation'];
            const missing = requiredFields.filter((field) => question[field] === undefined || question[field] === null || String(question[field]).trim() === '');
            if (missing.length) this.addFinding('ERROR', 'CBSE', 'Active CBSE question is missing required metadata/content', file, { ...record, missing });
            if (!String(question.unitId || '').startsWith(`${code}-`)) {
              this.addFinding('ERROR', 'CBSE', 'Active CBSE question unit does not belong to its subject', file, { ...record, unitId: question.unitId || null });
            }
            if (forbiddenByTrack[code]?.test(JSON.stringify(question))) {
              this.addFinding('ERROR', 'CBSE', `Active CBSE ${code} question crosses its subject-language boundary`, file, record);
            }
          });
          Object.entries(allowedClasses).forEach(([code, classes]) => classes.forEach((classNumber) => {
            const selected = activeQuestions.filter((question) => question.subjectCode === code && question.classLevel === classNumber);
            if (selected.length < 6) this.addFinding('ERROR', 'CBSE', `${code}-${classNumber} requires at least six active questions for practice/mock selection`, file, { count: selected.length });
            if (['083', '065'].includes(code) && !selected.some((question) => question.programmingLanguage === 'Python')) {
              this.addFinding('ERROR', 'CBSE', `${code}-${classNumber} must retain an active Python programming question`, file);
            }
            if (code === '802' && !selected.some((question) => question.programmingLanguage === 'Java')) {
              this.addFinding('ERROR', 'CBSE', `802-${classNumber} must retain an active Java programming question`, file);
            }
          }));
          for (const id of this.findDuplicates(activeQuestions.map((question) => question.id))) {
            this.addFinding('ERROR', 'CBSE', `Duplicate active CBSE question ID: ${id}`, file, { id });
          }
        }
        if (path.basename(file) === 'practice-question-bank-2026-27.js') {
          const compatibilityQuestions = importedData.cbsePracticeQuestions2026_27 || [];
          compatibilityQuestions.filter((question) => String(question.subjectCode) === '802').forEach((question) => {
            if (/\bpython\b|\bdef\s+\w+\s*\(/i.test(JSON.stringify(question))) {
              this.addFinding('ERROR', 'CBSE', 'Compatibility CBSE 802 question contains Python content', file, { id: question.id || null });
            }
          });
        }
        if (path.basename(file) === 'curriculum-2026-27.js') {
          const curriculum = importedData.cbseCurriculum2026_27;
          const class10IT = curriculum?.classes?.[10]?.subjects?.find((subject) => subject.code === '402');
          const class10Units = [...(class10IT?.parts?.partA?.units || []), ...(class10IT?.parts?.partB?.units || [])];
          if (!class10Units.some((unit) => unit.id === '402-x-b4' && unit.name === 'Web Applications and Security')) {
            this.addFinding('ERROR', 'CBSE', '402-X Unit 4 must be Web Applications and Security', file);
          }
          if (class10Units.some((unit) => /Maintain Healthy, Safe and Secure Working Environment/i.test(unit.name))) {
            this.addFinding('ERROR', 'CBSE', 'Stale 402-X workplace-safety Unit 4 remains active', file);
          }
        }
        if (path.basename(file) === 'mock-test-blueprints-2026-27.js') {
          const blueprints = importedData.CBSE_MOCK_BLUEPRINTS || {};
          const expectedLanguages = { '083-11': 'Python', '083-12': 'Python', '065-11': 'Python', '065-12': 'Python', '802-11': 'Java', '802-12': 'Java' };
          Object.entries(expectedLanguages).forEach(([key, language]) => {
            if (blueprints[key]?.programmingLanguage !== language) {
              this.addFinding('ERROR', 'CBSE', `${key} mock blueprint must use ${language}`, file, { actual: blueprints[key]?.programmingLanguage || null });
            }
          });
          const expectedLibraries = { '083-11': [], '083-12': [], '065-11': [], '065-12': ['Pandas', 'Matplotlib'], '802-11': [], '802-12': [] };
          Object.entries(expectedLibraries).forEach(([key, libraries]) => {
            if (JSON.stringify(blueprints[key]?.pythonLibraries || []) !== JSON.stringify(libraries)) {
              this.addFinding('ERROR', 'CBSE', `${key} mock blueprint has incorrect Python-library scope`, file, { expected: libraries, actual: blueprints[key]?.pythonLibraries || [] });
            }
          });
        }
        if (path.basename(file) === 'mock-tests-2026-27.js') {
          const tracks = { '402': [9, 10], '083': [11, 12], '065': [11, 12], '802': [11, 12] };
          Object.entries(tracks).forEach(([subjectCode, classes]) => classes.forEach((classNumber) => {
            const selected = importedData.getCBSEMockQuestions(classNumber, subjectCode, 1000);
            if (!selected.length) {
              this.addFinding('ERROR', 'CBSE', `${subjectCode}-${classNumber} mock selection returned no questions`, file);
            }
            if (selected.some((question) => question.board !== 'CBSE' || question.classLevel !== classNumber || question.subjectCode !== subjectCode)) {
              this.addFinding('ERROR', 'CBSE', `${subjectCode}-${classNumber} mock selection crossed a board/class/subject boundary`, file);
            }
            visit(selected, file, `getCBSEMockQuestions(${classNumber},${subjectCode})`);
          }));
        }
      } catch (error) {
        this.addFinding('ERROR', 'CBSE-083', `Unable to validate CBSE boundary data: ${error.message}`, file);
      }
    }

    const cbseRouteDir = path.join(this.srcDir, 'app', 'cbse');
    const pending = fs.existsSync(cbseRouteDir) ? [cbseRouteDir] : [];
    while (pending.length) {
      const current = pending.pop();
      for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
        const target = path.join(current, entry.name);
        if (entry.isDirectory()) pending.push(target);
        else if (/\.(?:js|jsx|mjs)$/.test(entry.name)) {
          const source = fs.readFileSync(target, 'utf8');
          if (/from\s+['"][^'"]*(?:javaCurriculum|\/Java(?:\/|['"]))/i.test(source)) {
            this.addFinding('ERROR', 'CBSE-083', 'CBSE route imports the generic CISCE Java curriculum or route', target);
          }
          if (/from\s+['"][^'"]*cbse\/classes\/class(?:11|12)|legacyCBSEClass(?:11|12)/i.test(source)) {
            this.addFinding('ERROR', 'CBSE', 'Active CBSE route imports compatibility-only XI/XII curriculum data', target);
          }
        }
      }
    }
  }

  findDuplicates(values) {
    const seen = new Set(); const duplicates = new Set();
    for (const value of values) { if (!value) continue; const key = String(value).trim(); if (seen.has(key)) duplicates.add(key); else seen.add(key); }
    return [...duplicates];
  }

  async validate() {
    this.findings = [];
    this.legacyQuestionBankChapters = [];
    this.validateSupplementalBankSource();
    this.validateSectionStructures();
    await this.validateCBSE083Boundary();
    const chapterRecords = this.normalizeDuplicateChapterRecords(this.readChapterContentRecords());
    const questionRecords = await this.readQuestionBankRecords();
    const javaRecords = this.readJavaCurriculumRecords();

    const chapterIds = chapterRecords.map((r) => r.id).filter(Boolean);
    const chapterSlugs = chapterRecords.map((r) => r.slug).filter(Boolean);
    for (const id of this.findDuplicates(chapterIds)) this.addFinding('ERROR', 'CHAPTER', `Duplicate chapter ID detected: ${id}`, null, { id });
    for (const slug of this.findDuplicates(chapterSlugs)) if (!slug.includes('-complete')) this.addFinding('ERROR', 'CHAPTER', `Duplicate chapter slug detected: ${slug}`, null, { slug });

    const chapterRegistrySlugs = new Set(chapterRecords.map((r) => r.slug).filter(Boolean));
    const chapterRegistryTitles = new Set(chapterRecords.map((r) => r.title).filter(Boolean));
    for (const chapter of chapterRecords) {
      if (!chapter.id) this.addFinding('ERROR', 'CHAPTER', 'Missing chapter ID', chapter.file, { slug: chapter.slug, title: chapter.title });
      if (!chapter.slug) this.addFinding('WARNING', 'CHAPTER', 'Missing chapter slug', chapter.file, { id: chapter.id, title: chapter.title });
      if (!chapter.title) this.addFinding('ERROR', 'CHAPTER', 'Missing chapter title', chapter.file, { id: chapter.id, slug: chapter.slug });
      const isRich = chapter.file?.includes('chapter-content');
      if (!isRich && chapter.className && chapter.board && !this.validClassBoardPair(chapter.className, chapter.board)) this.addFinding('ERROR', 'CHAPTER', `Invalid class/board combination: class=${chapter.className}, board=${chapter.board}`, chapter.file, { id: chapter.id, slug: chapter.slug });
    }

    const javaCurriculumSlugs = new Set(javaRecords.filter((x) => x.type === 'chapter').map((x) => x.slug).filter(Boolean));
    const javaCurriculumTitles = new Set(javaRecords.filter((x) => x.type === 'chapter').map((x) => x.title).filter(Boolean));
    for (const slug of javaCurriculumSlugs) if (!chapterRegistrySlugs.has(slug)) this.addFinding('INFO', 'REGISTRY', `Canonical runtime chapter has no matching rich chapter-content entry: ${slug}`, this.javaCurriculumFile, { slug });
    for (const slug of chapterRegistrySlugs) if (!javaCurriculumSlugs.has(slug)) this.addFinding('INFO', 'REGISTRY', `chapter-content registry chapter not present in javaCurriculum.js: ${slug}`, this.chaptersDir, { slug });

    const questionIds = questionRecords.map((r) => r.id).filter(Boolean); const questionSlugs = questionRecords.map((r) => r.slug).filter(Boolean);
    for (const id of this.findDuplicates(questionIds)) this.addFinding('ERROR', 'QUESTION', `Duplicate question ID detected: ${id}`, null, { id });
    for (const slug of this.findDuplicates(questionSlugs)) this.addFinding('ERROR', 'QUESTION', `Duplicate question slug detected: ${slug}`, null, { slug });

    const validQuestionTypes = new Set(['mcq', 'programming', 'theory', 'output', 'pyq', 'case-study', 'assertion-reason', 'debugging', 'true-false', 'fill-blank', 'error-finding', 'error', 'viva']);
    for (const q of questionRecords) {
      if (!q.id) this.addFinding('ERROR', 'QUESTION', 'Question missing ID', q.file, q);
      if (!q.question && !q.problemStatement) this.addFinding('WARNING', 'QUESTION', 'Question text is missing', q.file, { id: q.id, family: q.family });
      if (!q.type) this.addFinding('WARNING', 'QUESTION', 'Question metadata missing type', q.file, { id: q.id, slug: q.slug });
      else if (!validQuestionTypes.has(String(q.type).toLowerCase())) this.addFinding('ERROR', 'QUESTION', `Invalid question type ${q.type}`, q.file, { id: q.id, slug: q.slug });
      const inferred = this.inferQuestionTypeFromId(q.id);
      if (q.type && inferred && String(q.type).toLowerCase() !== String(inferred).toLowerCase()) this.addFinding('WARNING', 'QUESTION', `Question family/type mismatch: ${q.id} belongs to ${inferred} but was read from ${q.family}`, q.file, { id: q.id, type: q.type, expected: inferred, actualFamily: q.family });
      if (q.chapter) {
        const legacyExists = this.legacyQuestionBankChapters.some((chapter) => chapter.title === q.chapter || chapter.slug === q.chapter);
        const exists = chapterRegistrySlugs.has(q.chapter) || chapterRegistryTitles.has(q.chapter) || javaCurriculumSlugs.has(q.chapter) || javaCurriculumTitles.has(q.chapter) || legacyExists;
        if (!exists) this.addFinding('WARNING', 'QUESTION', `Question ${q.id || q.slug} references chapter not in registries: ${q.chapter}`, q.file, { id: q.id, slug: q.slug, chapter: q.chapter });
      }
      if (q.difficulty && !this.validDifficulty(q.difficulty)) this.addFinding('WARNING', 'QUESTION', `Unrecognized difficulty: ${q.difficulty}`, q.file, { id: q.id });
      if (q.bloom && !this.validBloom(q.bloom)) this.addFinding('WARNING', 'QUESTION', `Unrecognized Bloom level: ${q.bloom}`, q.file, { id: q.id });
      if (q.subject && !this.supportedSubject(q.subject)) this.addFinding('WARNING', 'SUBJECT', `Invalid subject identifier: ${q.subject}`, q.file, { id: q.id, slug: q.slug });
    }
    return this.buildSummary();
  }

  buildSummary() {
    return { totals: { ERROR: this.findings.filter((f) => f.severity === 'ERROR').length, WARNING: this.findings.filter((f) => f.severity === 'WARNING').length, INFO: this.findings.filter((f) => f.severity === 'INFO').length }, findings: this.findings };
  }

  formatReport(summary) {
    const lines = ['TARGET95 DATA VALIDATION', '', `ERRORS: ${summary.totals.ERROR}`, `WARNINGS: ${summary.totals.WARNING}`, `INFO: ${summary.totals.INFO}`, ''];
    const sorted = [...summary.findings].sort((a, b) => this.severityRank(a.severity) - this.severityRank(b.severity));
    for (const finding of sorted) { lines.push(`${finding.severity}:`); lines.push(`[${finding.category}] ${finding.message}`); if (finding.file) lines.push(`File: ${finding.file}`); if (finding.record) lines.push(`Record: ${JSON.stringify(finding.record)}`); lines.push(''); }
    return lines.join('\n');
  }
}

export async function validateAcademicData(rootDir = process.cwd()) {
  const validator = new AcademicDataValidator(rootDir);
  const result = await validator.validate();
  const report = validator.formatReport(result);
  return { result, report, criticalErrors: result.totals.ERROR, exitCode: result.totals.ERROR > 0 ? 1 : 0 };
}
