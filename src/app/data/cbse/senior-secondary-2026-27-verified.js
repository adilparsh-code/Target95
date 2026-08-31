/**
 * CBSE 2026-27 senior-secondary verified syllabus guardrails.
 * Official CBSE curriculum is authoritative; legacy chapter files are learning-data
 * sources only and must not be treated as the current syllabus map.
 */
export const CBSE_SENIOR_2026_27_VERIFIED = {
  '083': {
    11: {
      sourceUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Computer_Science_SecP2_2026-27.pdf',
      theoryMarks: 70, practicalMarks: 30,
      units: [
        { code: 1, name: 'Computer Systems and Organisation', marks: 10 },
        { code: 2, name: 'Computational Thinking and Programming - I', marks: 45 },
        { code: 3, name: 'Society, Law, and Ethics', marks: 15 },
      ],
      learningOutcomes: [
        'Develop basic computational thinking',
        'Explain and use data types and algorithms',
        'Write and trace Python programs for problem solving',
        'Understand computer systems, architecture and operating systems',
        'Apply cyber ethics, cyber safety and responsible digital behaviour',
      ],
    },
    12: {
      sourceUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SrSecPart1/Computer_Science_SrSecP1_2026-27.pdf',
      theoryMarks: 70, practicalMarks: 30,
      units: [
        { code: 1, name: 'Computational Thinking and Programming - II', marks: 40 },
        { code: 2, name: 'Computer Networks', marks: 10 },
        { code: 3, name: 'Database Management', marks: 20 },
      ],
      learningOutcomes: [
        'Develop modular Python programs for computational problems',
        'Use data structures, file handling and error-aware programming appropriately',
        'Explain fundamental networking concepts and protocols',
        'Use SQL and database concepts to manage and query data',
        'Apply safe and ethical computing practices',
      ],
    },
  },
  '065': {
    11: {
      sourceUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Informatics_Practices_SecP2_2026-27.pdf',
      theoryMarks: 70, practicalMarks: 30,
      units: [
        { code: 1, name: 'Introduction to Computer System', marks: 10 },
        { code: 2, name: 'Introduction to Python', marks: 25 },
        { code: 3, name: 'Database concepts and the Structured Query Language', marks: 30 },
        { code: 4, name: 'Introduction to Emerging Trends', marks: 5 },
      ],
      pythonLibraries: [],
      learningOutcomes: [
        'Identify the components and functions of a computer system',
        'Create Python programs using prescribed data types and collections',
        'Understand database concepts and RDBMS',
        'Retrieve and manipulate data using SQL',
        'Identify major emerging trends in Information Technology',
      ],
    },
    12: {
      sourceUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Informatics_Practices_SecP2_2026-27.pdf',
      theoryMarks: 70, practicalMarks: 30,
      units: [
        { code: 1, name: 'Data Handling using Pandas - I', marks: 25 },
        { code: 2, name: 'Data Visualisation', marks: 25 },
        { code: 3, name: 'Database Query using SQL', marks: 25 },
        { code: 4, name: 'Societal Impacts', marks: 5 },
      ],
      pythonLibraries: ['Pandas', 'Matplotlib'],
      learningOutcomes: [
        'Create and manipulate Series and DataFrame objects with Pandas',
        'Analyse and clean tabular data programmatically',
        'Create and interpret appropriate visualisations using Matplotlib',
        'Write SQL queries for filtering, grouping, aggregation and data manipulation',
        'Recognise societal impacts, cyber safety and ethical issues of technology',
      ],
    },
  },
  '802': {
    11: {
      sourceUrl: 'https://cbseacademic.nic.in/skill-education.html',
      units: [],
      status: 'source-registry-pending',
      note: 'Do not synthesize a current 2026-27 unit map until the exact official 802 curriculum PDF is verified.',
    },
    12: {
      sourceUrl: 'https://cbseacademic.nic.in/skill-education.html',
      units: [],
      status: 'source-registry-pending',
      note: 'Do not synthesize a current 2026-27 unit map until the exact official 802 curriculum PDF is verified.',
    },
  },
};

export const getVerifiedSeniorCBSE = (subjectCode, classNumber) =>
  CBSE_SENIOR_2026_27_VERIFIED[String(subjectCode)]?.[Number(classNumber)] ?? null;

export default CBSE_SENIOR_2026_27_VERIFIED;
