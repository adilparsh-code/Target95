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
        'Explain and use data types',
        'Appreciate the notion of algorithms',
        'Understand computer systems, architecture and operating systems',
        'Explain cyber ethics, cyber safety and cybercrime',
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
      learningOutcomes: [
        'Identify the components of computer system',
        'Create Python programs using data types, lists and dictionaries',
        'Understand database concepts and RDBMS',
        'Retrieve and manipulate data using SQL',
        'Identify emerging trends in Information Technology',
      ],
    },
  },
};

export const getVerifiedSeniorCBSE = (subjectCode, classNumber) =>
  CBSE_SENIOR_2026_27_VERIFIED[String(subjectCode)]?.[Number(classNumber)] ?? null;

export default CBSE_SENIOR_2026_27_VERIFIED;
