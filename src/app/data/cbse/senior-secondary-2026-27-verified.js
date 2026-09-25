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
        { code: 1, name: 'Data Handling using Pandas and Data Visualization', marks: 25 },
        { code: 2, name: 'Database Query using SQL', marks: 25 },
        { code: 3, name: 'Introduction to Computer Networks', marks: 10 },
        { code: 4, name: 'Societal Impacts', marks: 10 },
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
      sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/SrSec/802-IT.pdf',
      theoryMarks: 60, practicalMarks: 40,
      units: [
        { code: 1, name: 'Computer Organization', marks: 5 },
        { code: 2, name: 'Networking And Internet', marks: 10 },
        { code: 3, name: 'Office Automation Tools', marks: 10 },
        { code: 4, name: 'RDBMS', marks: 10 },
        { code: 5, name: 'Fundamentals of Java', marks: 15 },
      ],
      programmingLanguage: 'Java',
    },
    12: {
      sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/SrSec/802-IT.pdf',
      theoryMarks: 60, practicalMarks: 40,
      units: [
        { code: 1, name: 'Database Concepts – RDBMS Tool', marks: 15 },
        { code: 2, name: 'Operating Web Based Applications', marks: 10 },
        { code: 3, name: 'JAVA', marks: 20 },
        { code: 4, name: 'Work Integrated Learning IT – DMA', marks: 5 },
      ],
      programmingLanguage: 'Java',
    },
  },
};

export const getVerifiedSeniorCBSE = (subjectCode, classNumber) =>
  CBSE_SENIOR_2026_27_VERIFIED[String(subjectCode)]?.[Number(classNumber)] ?? null;

export default CBSE_SENIOR_2026_27_VERIFIED;
