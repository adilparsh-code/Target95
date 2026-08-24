import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

export class AcademicDataValidator {
  constructor(rootDir = process.cwd()) {
    this.rootDir = rootDir;
    this.srcDir = path.join(rootDir, 'src');
    this.appDataDir = path.join(this.srcDir, 'app', 'data');
    this.chaptersDir = path.join(this.appDataDir, 'chapter-content');
    this.questionBankDir = path.join(this.appDataDir, 'question-bank');
    this.javaCurriculumFile = path.join(this.appDataDir, 'javaCurriculum.js');
    this.studyCenterFile = path.join(this.srcDir, 'lib', 'studyCenter.js');
    this.chapterContentFile = path.join(this.srcDir, 'lib', 'chapterContent.js');
    this.subjectsFile = path.join(this.appDataDir, 'subjects.js');
    this.programmingLibraryFile = path.join(this.appDataDir, 'programmingLibrary.js');
    this.programmingQuestionsFile = path.join(this.appDataDir, 'programmingQuestions.js');
    this.legacyQuestionBankChapters = [];
    this.findings = [];
  }

  severityRank(severity) {
    const order = { ERROR: 0, WARNING: 1, INFO: 2 };
    return order[severity] ?? 3;
  }

  addFinding(severity, category, message, file = null, record = null) {
    this.findings.push({
      severity,
      category,
      message,
      file,
      record,
    });
  }

  // --- File Collection ---

  collectJsFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter((name) => name.endsWith('.js') || name.endsWith('.mjs') || name.endsWith('.json'))
      .map((name) => path.join(dir, name));
  }

  firstValue(text, regex) {
    const match = text.match(regex);
    return match?.[1] || null;
  }

  // --- Chapter Reading ---

  readChapterContentRecords() {
    const chapterFiles = this.collectJsFiles(this.chaptersDir);
    const chapterRecords = [];

    for (const file of chapterFiles) {
      if (path.basename(file) === 'index.js') continue;
      const text = fs.readFileSync(file, 'utf8');
      
      const id = this.firstValue(text, /["']?id["']?\s*:\s*['"`]([^'"`]+)/m);
      const title = this.firstValue(text, /["']?title["']?\s*:\s*['"`]([^'"`]+)/m);
      const slug = this.firstValue(text, /["']?slug["']?\s*:\s*['"`]([^'"`]+)/m);
      const subject = this.firstValue(text, /["']?subject["']?\s*:\s*['"`]([^'"`]+)/m);
      const board = this.firstValue(text, /["']?board["']?\s*:\s*['"`]([^'"`]+)/m);
      const className = this.firstValue(text, /["']?class["']?\s*:\s*['"`]([^'"`]+)/m);

      const chapterRecord = {
        id,
        title,
        slug,
        subject,
        board,
        className,
        file,
      };

      if (id || title || slug) {
        chapterRecords.push(chapterRecord);
      }
    }

    return chapterRecords;
  }

  // --- Question Type Inference ---

  inferQuestionTypeFromId(id) {
    if (!id || typeof id !== 'string') return null;

    const raw = id.trim().toUpperCase();
    const match = raw.match(/CH\d{2}-(MCQ|AR|TF|FIB|OUT|ERR|PRQ|DBG|CBQ|VIV)(?:-|$)/i);
    if (!match) return null;

    const map = {
      MCQ: 'mcq',
      AR: 'assertion-reason',
      TF: 'true-false',
      FIB: 'fill-blank',
      OUT: 'output',
      ERR: 'error-finding',
      PRQ: 'programming',
      DBG: 'debugging',
      CBQ: 'case-study',
      VIV: 'viva',
    };

    return map[match[1].toUpperCase()] || null;
  }

  legacyQuestionFamilyMap() {
    return {
      mcqs: { type: 'mcq', label: 'MCQ' },
      assertionReasons: { type: 'assertion-reason', label: 'Assertion/Reason' },
      trueFalse: { type: 'true-false', label: 'True/False' },
      fillBlanks: { type: 'fill-blank', label: 'Fill in the Blank' },
      outputQuestions: { type: 'output', label: 'Output' },
      errorFinding: { type: 'error-finding', label: 'Error Identification' },
      programmingQuestions: { type: 'programming', label: 'Programming' },
      debuggingQuestions: { type: 'debugging', label: 'Debugging' },
      caseBasedQuestions: { type: 'case-study', label: 'Case-Based' },
      vivaQuestions: { type: 'viva', label: 'Viva' },
    };
  }

  normalizeQuestionRecord(raw, chapter, familyName, file) {
    if (!raw || typeof raw !== 'object') return null;

    const familyInfo = this.legacyQuestionFamilyMap()[familyName] || null;
    const type = familyInfo?.type || raw.type || this.inferQuestionTypeFromId(raw.id);

    return {
      file,
      family: familyName,
      id: raw.id || null,
      slug: raw.slug || null,
      question: raw.question || raw.prompt || raw.problemStatement || raw.problem || null,
      difficulty: raw.difficulty || null,
      bloom: raw.bloom || null,
      type,
      board: raw.board || null,
      className: raw.className || raw.class || null,
      chapter: raw.chapter || (chapter ? chapter.title || chapter.slug : null),
      chapterId: raw.chapterId || chapter?.id || null,
      chapterSlug: chapter?.slug || null,
      subject: raw.subject || null,
      problemStatement: raw.problemStatement || null,
      input: raw.input || null,
      output: raw.output || null,
      constraints: raw.constraints || null,
      solution: raw.solution || null,
      line: null,
      raw,
    };
  }

  findMatchingCharacter(text, start, openChar, closeChar) {
    if (start < 0 || start >= text.length) return -1;

    let depth = 0;
    let inSingle = false;
    let inDouble = false;
    let inTemplate = false;

    for (let i = start; i < text.length; i += 1) {
      const char = text[i];
      const prev = i > 0 ? text[i - 1] : '';

      if (inSingle) {
        if (char === '\'' && prev !== '\\') inSingle = false;
        continue;
      }

      if (inDouble) {
        if (char === '"' && prev !== '\\') inDouble = false;
        continue;
      }

      if (inTemplate) {
        if (char === '`' && prev !== '\\') inTemplate = false;
        continue;
      }

      if (char === '\'' && prev !== '\\') {
        inSingle = true;
        continue;
      }

      if (char === '"' && prev !== '\\') {
        inDouble = true;
        continue;
      }

      if (char === '`' && prev !== '\\') {
        inTemplate = true;
        continue;
      }

      if (char === openChar) depth += 1;
      else if (char === closeChar) {
        depth -= 1;
        if (depth === 0) return i;
      }
    }

    return -1;
  }

  readQuestionBankRecords() {
    const records = [];
    const dir = this.questionBankDir;
    if (!fs.existsSync(dir)) return records;

    const familyKeys = Object.keys(this.legacyQuestionFamilyMap());

    for (const file of this.collectJsFiles(dir)) {
      const base = path.basename(file);
      if (base === 'index.js') continue;

      const rawText = fs.readFileSync(file, 'utf8');
      const text = rawText.replace(/<\/arg_value>[\s\S]*$/m, '').trim();

      const chapterIdValue = this.firstValue(text, /id\s*:\s*([0-9]+)/m);
      const chapterTitle = this.firstValue(text, /title\s*:\s*['"`]([^'"`]+)/m);
      const chapterSlug = this.firstValue(text, /slug\s*:\s*['"`]([^'"`]+)/m);
      const chapterObj = {
        id: chapterIdValue || null,
        title: chapterTitle || null,
        slug: chapterSlug || null,
      };
      this.legacyQuestionBankChapters.push({ ...chapterObj, file });

      // Clean ES exports for VM execution
      const vmExecutableCode = text
        .replace(/export\s+default\s+/g, 'const __default_export__ = ')
        .replace(/export\s+const\s+/g, 'const ')
        .replace(/export\s+function\s+/g, 'function ');

      try {
        new vm.Script(vmExecutableCode, { filename: file });
      } catch (error) {
        this.addFinding('ERROR', 'SOURCE', `Invalid JavaScript source: ${error.message}`, file, { chapter: chapterTitle || base });
        continue;
      }

      for (const familyName of familyKeys) {
        const familyPattern = new RegExp(`\\b${familyName}\\s*:\\s*\\[`, 'm');
        const familyMatch = text.match(familyPattern);
        if (!familyMatch) continue;

        const arrayOpen = text.indexOf('[', familyMatch.index);
        if (arrayOpen < 0) continue;

        const arrayClose = this.findMatchingCharacter(text, arrayOpen, '[', ']');
        if (arrayClose < 0) {
          this.addFinding('WARNING', 'QUESTION', 'Question bank family array is unbalanced', file, { family: familyName, chapter: base });
          continue;
        }

        const familyBody = text.slice(arrayOpen + 1, arrayClose);
        const arrayLiteral = `[${familyBody}]`;

        let familyCollection = [];
        const sandbox = { console };
        try {
          familyCollection = vm.runInNewContext(arrayLiteral, sandbox);
        } catch (error) {
          this.addFinding('WARNING', 'QUESTION', `Legacy question-family array could not be evaluated: ${error.message}`, file, { family: familyName, chapter: base });
          continue;
        }

        if (!Array.isArray(familyCollection)) continue;

        for (const rawQuestion of familyCollection) {
          const q = this.normalizeQuestionRecord(rawQuestion, chapterObj, familyName, file);
          if (!q) continue;

          records.push(q);
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

    const questionMatches = [...text.matchAll(/id:\s*['"`]([^'"`]+)['"`].+?question|id:\s*['"`]([^'"`]+)['"`].+?prompt/gs)];
    for (const match of questionMatches) {
      const id = match[1] || match[2];
      records.push({ type: 'question', id, file: this.javaCurriculumFile });
    }

    return records;
  }

  // --- Utility Validations ---

  validDifficulty(value) {
    if (!value) return false;
    const normalized = String(value).trim();
    const validSet = new Set([
      'Easy', 'Medium', 'Hard',
      'Beginner', 'Intermediate', 'Advanced',
      'easy', 'medium', 'hard'
    ]);
    return validSet.has(normalized);
  }

  validBloom(value) {
    if (!value) return true;
    const normalized = String(value).trim().toLowerCase();
    const allowed = new Set([
      'remember', 'understand', 'apply',
      'analyse', 'analyze', 'evaluate', 'create'
    ]);
    return allowed.has(normalized);
  }

  supportedSubject(subject) {
    if (!subject) return true;
    if (!fs.existsSync(this.subjectsFile)) return true;

    const text = fs.readFileSync(this.subjectsFile, 'utf8').toLowerCase();
    const subjectId = String(subject).trim().toLowerCase();
    return text.includes(`id: "${subjectId}"`) ||
           text.includes(`id: '${subjectId}'`) ||
           text.includes(`"${subjectId}"`);
  }

  validClassBoardPair(className, board) {
    const classText = String(className || '').toLowerCase();
    const boardText = String(board || '').toLowerCase();

    if (boardText.includes('icse')) {
      return classText.includes('9') || classText.includes('ix') || classText.includes('10') || classText.includes('x');
    }

    if (boardText.includes('isc')) {
      return classText.includes('11') || classText.includes('12');
    }

    return true;
  }

  // --- Main Validation Method ---

  async validate() {
    // Reset state for clean validation runs
    this.findings = [];
    this.legacyQuestionBankChapters = [];

    // Run structural checks on files
    this.validateSectionStructures();

    const chapterRecords = this.readChapterContentRecords();
    const questionRecords = await this.readQuestionBankRecords();
    const javaRecords = this.readJavaCurriculumRecords();

    const chapterIds = chapterRecords.map((r) => r.id).filter(Boolean);
    const chapterSlugs = chapterRecords.map((r) => r.slug).filter(Boolean);

    // Duplicate chapter detection
    for (const id of this.findDuplicates(chapterIds)) {
      this.addFinding('ERROR', 'CHAPTER', `Duplicate chapter ID detected: ${id}`, null, { id });
    }

    for (const slug of this.findDuplicates(chapterSlugs)) {
      if (slug && !slug.includes('-complete')) {
        this.addFinding('ERROR', 'CHAPTER', `Duplicate chapter slug detected: ${slug}`, null, { slug });
      }
    }

    // Chapter record metadata checks
    const chapterRegistrySlugs = new Set(chapterRecords.map((r) => r.slug).filter(Boolean));
    const chapterRegistryTitles = new Set(chapterRecords.map((r) => r.title).filter(Boolean));

    for (const chapter of chapterRecords) {
      if (!chapter.id) {
        this.addFinding('ERROR', 'CHAPTER', 'Missing chapter ID', chapter.file, { slug: chapter.slug, title: chapter.title });
      }

      if (!chapter.slug) {
        this.addFinding('WARNING', 'CHAPTER', 'Missing chapter slug', chapter.file, { id: chapter.id, title: chapter.title });
      }

      if (!chapter.title) {
        this.addFinding('ERROR', 'CHAPTER', 'Missing chapter title', chapter.file, { id: chapter.id, slug: chapter.slug });
      }

      const isChapterContentFile = chapter.file && chapter.file.includes('chapter-content');
      if (!isChapterContentFile) {
        if (!chapter.className) {
          this.addFinding('WARNING', 'CHAPTER', 'Missing class metadata for chapter', chapter.file, { id: chapter.id, slug: chapter.slug });
        }

        if (!chapter.board) {
          this.addFinding('WARNING', 'CHAPTER', 'Missing board metadata for chapter', chapter.file, { id: chapter.id, slug: chapter.slug });
        }
      }

      if (!isChapterContentFile && chapter.className && chapter.board) {
        if (!this.validClassBoardPair(chapter.className, chapter.board)) {
          this.addFinding('ERROR', 'CHAPTER', `Invalid class/board combination: class=${chapter.className}, board=${chapter.board}`, chapter.file, { id: chapter.id, slug: chapter.slug });
        }
      }
    }

    // Registry cross-check
    const javaCurriculumSlugs = new Set(javaRecords.filter((x) => x.type === 'chapter').map((x) => x.slug).filter(Boolean));
    const javaCurriculumTitles = new Set(javaRecords.filter((x) => x.type === 'chapter').map((x) => x.title).filter(Boolean));

    for (const slug of [...javaCurriculumSlugs]) {
      if (!chapterRegistrySlugs.has(slug)) {
        this.addFinding('INFO', 'REGISTRY', `Canonical runtime chapter has no matching rich chapter-content entry: ${slug}`, this.javaCurriculumFile, { slug });
      }
    }

    for (const slug of [...chapterRegistrySlugs]) {
      if (!javaCurriculumSlugs.has(slug)) {
        this.addFinding('INFO', 'REGISTRY', `chapter-content registry chapter not present in javaCurriculum.js: ${slug}`, this.chaptersDir, { slug });
      }
    }

    // Question duplicate detection
    const questionIds = questionRecords.map((r) => r.id).filter(Boolean);
    const questionSlugs = questionRecords.map((r) => r.slug).filter(Boolean);

    for (const id of this.findDuplicates(questionIds)) {
      this.addFinding('ERROR', 'QUESTION', `Duplicate question ID detected: ${id}`, null, { id });
    }

    for (const slug of this.findDuplicates(questionSlugs)) {
      this.addFinding('ERROR', 'QUESTION', `Duplicate question slug detected: ${slug}`, null, { slug });
    }

    const validQuestionTypes = new Set(['mcq', 'programming', 'theory', 'output', 'pyq', 'case-study', 'assertion-reason', 'debugging', 'true-false', 'fill-blank', 'error-finding', 'error', 'viva']);

    // Question record checks
    for (const q of questionRecords) {
      if (!q.id) {
        this.addFinding('ERROR', 'QUESTION', 'Question missing required ID', q.file, { line: q.line });
      }

      if (!q.question && !q.problemStatement && !q.chapter) {
        this.addFinding('ERROR', 'QUESTION', 'Question missing required question text or chapter metadata', q.file, { line: q.line });
      }

      if (!q.type) {
        this.addFinding('WARNING', 'QUESTION', 'Question metadata missing type', q.file, { id: q.id, slug: q.slug });
      } else if (q.type && !validQuestionTypes.has(String(q.type).toLowerCase())) {
        this.addFinding('ERROR', 'QUESTION', `Invalid question type ${q.type}`, q.file, { id: q.id, slug: q.slug });
      }

      const inferredFromId = this.inferQuestionTypeFromId(q.id);
      if (q.type && inferredFromId && String(q.type).toLowerCase() !== String(inferredFromId).toLowerCase()) {
        this.addFinding('WARNING', 'QUESTION', `Question family/type mismatch: ${q.id} belongs to ${inferredFromId} but was read from ${q.family}`, q.file, { id: q.id, type: q.type, expected: inferredFromId, actualFamily: q.family });
      }

      if (q.chapter) {
        const legacyChapterExists = this.legacyQuestionBankChapters.some((chapter) =>
          chapter.title === q.chapter || chapter.slug === q.chapter
        );
        const chapterExists = chapterRegistrySlugs.has(q.chapter)
          || chapterRegistryTitles.has(q.chapter)
          || javaCurriculumSlugs.has(q.chapter)
          || javaCurriculumTitles.has(q.chapter)
          || legacyChapterExists;
        if (!chapterExists) {
          this.addFinding('WARNING', 'QUESTION', `Question ${q.id || q.slug} references chapter not in registries: ${q.chapter}`, q.file, { id: q.id, slug: q.slug, chapter: q.chapter });
        }
      }

      if (!q.difficulty || !this.validDifficulty(q.difficulty)) {
        this.addFinding('WARNING', 'QUESTION', `Invalid or missing difficulty value: ${q.difficulty || 'null'}`, q.file, { id: q.id, slug: q.slug });
      }

      if (q.bloom && !this.validBloom(q.bloom)) {
        this.addFinding('WARNING', 'QUESTION', `Invalid Bloom taxonomy value: ${q.bloom}`, q.file, { id: q.id, slug: q.slug });
      }

      if (q.subject && !this.supportedSubject(q.subject)) {
        this.addFinding('WARNING', 'SUBJECT', `Invalid subject identifier: ${q.subject}`, q.file, { id: q.id, slug: q.slug });
      }
    }

    return this.buildSummary();
  }

  readSubjectCatalog() {
    if (!fs.existsSync(this.subjectsFile)) return [];
    const text = fs.readFileSync(this.subjectsFile, 'utf8');
    const subjectIds = [...text.matchAll(/id:\s*['"`]([^'"`]+)['"`]/g)].map((m) => m[1]);
    return subjectIds;
  }

  validateSectionStructures() {
    const contentFile = this.chapterContentFile;
    if (!fs.existsSync(contentFile)) {
      this.addFinding('WARNING', 'CONTENT', 'Chapter content normalization contract file not found', contentFile);
      return;
    }

    const c = fs.readFileSync(contentFile, 'utf8');
    const expectedSections = ['learningObjectives', 'theory', 'definitions', 'keyTerms', 'examples', 'diagrams', 'practice', 'mcqs', 'output', 'programming', 'pyqs', 'revisionNotes'];
    const covered = expectedSections.filter((s) => c.includes(s));

    if (covered.length < expectedSections.length) {
      this.addFinding('WARNING', 'CONTENT', 'ChapterContentEngine normalization contract has incomplete section coverage', contentFile, { missing: expectedSections.filter((s) => !covered.includes(s)) });
    }

    for (const file of this.collectJsFiles(this.chaptersDir)) {
      if (path.basename(file) === 'index.js') continue;
      const text = fs.readFileSync(file, 'utf8');
      const requiredFields = ['theoryNotes', 'examples'];
      const missing = requiredFields.filter((field) => !text.includes(field));
      if (missing.length) {
        this.addFinding('WARNING', 'CONTENT', `Chapter content file lacks expected schema sections: ${missing.join(', ')}`, file, { missing });
      }

      if (text.includes('examples: {') && !text.includes('basic:') && !text.includes('intermediate:') && !text.includes('advanced:')) {
        this.addFinding('ERROR', 'CONTENT', 'Invalid content-engine examples structure: expected basic/intermediate/advanced examples grouping', file);
      }
    }
  }

  findDuplicates(values) {
    const seen = new Map();
    const duplicates = new Set();
    for (const value of values) {
      if (!value) continue;
      const key = String(value).trim();
      if (!seen.has(key)) {
        seen.set(key, 1);
      } else {
        seen.set(key, seen.get(key) + 1);
        duplicates.add(key);
      }
    }
    return [...duplicates];
  }

  buildSummary() {
    const summary = {
      totals: {
        ERROR: this.findings.filter((f) => f.severity === 'ERROR').length,
        WARNING: this.findings.filter((f) => f.severity === 'WARNING').length,
        INFO: this.findings.filter((f) => f.severity === 'INFO').length,
      },
      findings: this.findings,
    };

    return summary;
  }

  formatReport(summary) {
    const lines = [];
    lines.push('TARGET95 DATA VALIDATION');
    lines.push('');
    lines.push(`ERRORS: ${summary.totals.ERROR}`);
    lines.push(`WARNINGS: ${summary.totals.WARNING}`);
    lines.push(`INFO: ${summary.totals.INFO}`);
    lines.push('');

    const sorted = [...summary.findings].sort((a, b) => this.severityRank(a.severity) - this.severityRank(b.severity));

    for (const finding of sorted) {
      lines.push(`${finding.severity}:`);
      lines.push(`[${finding.category}] ${finding.message}`);
      if (finding.file) lines.push(`File: ${finding.file}`);
      if (finding.record) lines.push(`Record: ${JSON.stringify(finding.record)}`);
      lines.push('');
    }

    return lines.join('\n');
  }
}

export async function validateAcademicData(rootDir = process.cwd()) {
  const validator = new AcademicDataValidator(rootDir);
  const result = await validator.validate();
  const report = validator.formatReport(result);

  return {
    result,
    report,
    criticalErrors: result.totals.ERROR,
    exitCode: result.totals.ERROR > 0 ? 1 : 0,
  };
}