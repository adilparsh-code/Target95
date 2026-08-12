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

  // --- Utility Validations ---

  validDifficulty(value) {
    if (!value) return false;
    // Fix: Clean whitespace dynamically instead of hardcoding 'Medium ' or 'Hard '
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

  // --- Main Validation Method ---

  async validate() {
    const chapterRecords = this.readChapterContentRecords();
    const questionRecords = await this.readQuestionBankRecords();
    const javaRecords = this.readJavaCurriculumRecords();

    const chapterIds = chapterRecords.map((r) => r.id).filter(Boolean);
    const chapterSlugs = chapterRecords.map((r) => r.slug).filter(Boolean);

    // Duplicate detection
    for (const id of this.findDuplicates(chapterIds)) {
      this.addFinding('ERROR', 'CHAPTER', `Duplicate chapter ID detected: ${id}`, null, { id });
    }

    for (const slug of this.findDuplicates(chapterSlugs)) {
      // Exclude '-complete' variant files if they coexist by design
      if (slug && !slug.includes('-complete')) {
        this.addFinding('ERROR', 'CHAPTER', `Duplicate chapter slug detected: ${slug}`, null, { slug });
      }
    }

    // Chapter record metadata checks
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

      if (!chapter.className) {
        this.addFinding('WARNING', 'CHAPTER', 'Missing class metadata for chapter', chapter.file, { id: chapter.id, slug: chapter.slug });
      }

      if (!chapter.board) {
        this.addFinding('WARNING', 'CHAPTER', 'Missing board metadata for chapter', chapter.file, { id: chapter.id, slug: chapter.slug });
      }

      if (chapter.className && chapter.board) {
        if (!this.validClassBoardPair(chapter.className, chapter.board)) {
          this.addFinding('ERROR', 'CHAPTER', `Invalid class/board combination: class=${chapter.className}, board=${chapter.board}`, chapter.file, { id: chapter.id, slug: chapter.slug });
        }
      }
    }

    // Question record checks
    const chapterRegistrySlugs = new Set(chapterRecords.map((r) => r.slug).filter(Boolean));
    const chapterRegistryTitles = new Set(chapterRecords.map((r) => r.title).filter(Boolean));
    const javaCurriculumSlugs = new Set(javaRecords.filter((x) => x.type === 'chapter').map((x) => x.slug).filter(Boolean));
    const javaCurriculumTitles = new Set(javaRecords.filter((x) => x.type === 'chapter').map((x) => x.title).filter(Boolean));

    for (const q of questionRecords) {
      if (!q.id) {
        this.addFinding('ERROR', 'QUESTION', 'Question missing required ID', q.file, { line: q.line });
      }

      if (q.type && String(q.type).toLowerCase() === 'programming') {
        const required = ['problemStatement', 'input', 'output', 'constraints', 'solution'];
        const missing = required.filter((field) => !q[field]);
        if (missing.length) {
          this.addFinding('WARNING', 'QUESTION', `Programming question missing optional metadata: ${missing.join(', ')}`, q.file, { id: q.id, slug: q.slug, type: q.type });
        }
      }

      if (q.chapter) {
        const chapterExists = chapterRegistrySlugs.has(q.chapter)
          || chapterRegistryTitles.has(q.chapter)
          || javaCurriculumSlugs.has(q.chapter)
          || javaCurriculumTitles.has(q.chapter);
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
}