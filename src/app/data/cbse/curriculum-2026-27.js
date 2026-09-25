/**
 * Target95 CBSE curriculum map for session 2026-27.
 * Source of truth: official CBSE curriculum pages/PDFs.
 */

import CBSE_402_CLASS9_2026_27 from './class9-402-2026-27-sources.js';

export const CBSE_CURRICULUM_SESSION = '2026-27';

const class9PartAUnits = CBSE_402_CLASS9_2026_27.partA.units.map((unit) => ({
  id: `402-ix-a${unit.code}`, code: String(unit.code), name: unit.title,
  learningOutcomes: [], theory: [], practicalActivities: [], chapters: [],
  hours: unit.hours, marks: unit.marks,
}));

const class9PartBUnits = CBSE_402_CLASS9_2026_27.partB.units.map((unit) => ({
  id: `402-ix-b${unit.code}`, code: String(unit.code), name: unit.title,
  learningOutcomes: [], theory: [], practicalActivities: [], chapters: [],
  hours: { theory: unit.theoryHours, practical: unit.practicalHours }, marks: unit.marks,
}));

const cbse402Class9 = {
  code: '402', id: 'cbse-402-class-9', name: 'Information Technology', category: 'skill-subject',
  syllabusSource: 'CBSE 402 Information Technology Class IX 2026-27',
  sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-IX.pdf',
  pythonRole: 'none',
  assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 },
  parts: {
    partA: { name: 'Employability Skills', units: class9PartAUnits },
    partB: { name: 'Subject Specific Skills', units: class9PartBUnits },
  },
  practicalAssessment: { practicalExamination: 15, writtenTest: 10, vivaVoce: 10, practicalFileStudentPortfolio: 10, projectVivaVoce: 5 },
};

const class10PartAUnits = [
  { id: '402-x-a1', code: '1', name: 'Communication Skills-II', hours: { theory: 6, practical: 4 }, marks: 2 },
  { id: '402-x-a2', code: '2', name: 'Self-Management Skills-II', hours: { theory: 6, practical: 4 }, marks: 3 },
  { id: '402-x-a3', code: '3', name: 'Basic ICT Skills-II', hours: { theory: 6, practical: 4 }, marks: 1 },
  { id: '402-x-a4', code: '4', name: 'Entrepreneurial Skills-II', hours: { theory: 10, practical: 5 }, marks: 3 },
  { id: '402-x-a5', code: '5', name: 'Green Skills-II', hours: { theory: 3, practical: 2 }, marks: 1 },
];

const class10PartBUnits = [
  { id: '402-x-b1', code: '1', name: 'Digital Documentation (Advanced)', hours: { theory: 10, practical: 26 }, marks: 10 },
  { id: '402-x-b2', code: '2', name: 'Electronic Spreadsheet (Advanced)', hours: { theory: 18, practical: 35 }, marks: 10 },
  { id: '402-x-b3', code: '3', name: 'Database Management System', hours: { theory: 10, practical: 20 }, marks: 10 },
  { id: '402-x-b4', code: '4', name: 'Web Applications and Security', hours: { theory: 6, practical: 10 }, marks: 10 },
];

const cbse402Class10 = {
  code: '402', id: 'cbse-402-class-10', name: 'Information Technology', category: 'skill-subject',
  syllabusSource: 'CBSE 402 Information Technology Class X 2026-27',
  sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-X.pdf',
  pythonRole: 'none',
  assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 },
  parts: { partA: { name: 'Employability Skills', units: class10PartAUnits }, partB: { name: 'Subject Specific Skills', units: class10PartBUnits } },
  practicalAssessment: { practicalExamination: 20, vivaVoce: 10, projectWorkFieldVisit: 10, portfolioPracticalFile: 10 },
};

// Unit factory — must be declared before the unit arrays below (TDZ).
const makeUnit = (id, code, name, theory, practicalActivities = [], marks = null, hours = null) => ({
  id, code: String(code), name, learningOutcomes: [], theory, practicalActivities,
  chapters: [], ...(marks !== null ? { marks } : {}), ...(hours !== null ? { hours } : {}),
});

// CBSE 083 is mapped explicitly to the 2026-27 official syllabus.
// Legacy class11/class12 files remain compatibility data only.
const cbse083Class11Units = [
  makeUnit('083-xi-u1', 1, 'Computer Systems and Organisation', [
    'Basic computer organisation: computer system, hardware, software, input/output devices, CPU and memory.',
    'Memory hierarchy and units: bit, byte, KB, MB, GB, TB and PB; primary, cache and secondary memory.',
    'System software: operating systems, system utilities and device drivers.',
    'Programming tools and language translators: assembler, compiler and interpreter.',
    'Application software and operating-system functions/user interface.',
    'Boolean logic: NOT, AND, OR, NAND, NOR, XOR, truth tables, De Morgan’s laws and logic circuits.',
    'Number systems: binary, octal, decimal and hexadecimal; conversions between number systems.',
    'Encoding schemes: ASCII, ISCII and Unicode including UTF-8 and UTF-32.',
  ], [
    'Identify computer components and classify hardware/software.',
    'Construct truth tables and perform basic number-system conversions.',
  ], 10),
  makeUnit('083-xi-u2', 2, 'Computational Thinking and Programming - 1', [
    'Problem-solving: analyse the problem, develop an algorithm, code, test and debug.',
    'Algorithm representation using flowcharts and pseudocode; decomposition.',
    'Python basics: features, interactive/script modes, character set, tokens, variables, l-values/r-values and comments.',
    'Data types: integer, float, complex, boolean, string, list, tuple, None and dictionary; mutable vs immutable types.',
    'Operators: arithmetic, relational, logical, assignment, augmented assignment, identity and membership operators.',
    'Expressions, statements, operator precedence, explicit/implicit type conversion, console input and output.',
    'Errors: syntax, logical and run-time errors.',
    'Flow of control: indentation, sequential, conditional and iterative flow; if, if-else and if-elif-else.',
    'Loops: for, range(), while, break, continue and nested loops; patterns, series and factorial programs.',
    'Strings: concatenation, repetition, membership, slicing, traversal and core string methods.',
    'Lists: indexing, operations, slicing, traversal, append, extend, insert, count, index, remove, pop, reverse, sort, sorted, min, max and sum; nested lists and linear search.',
    'Tuples: indexing, operations, slicing, traversal, tuple assignment, nested tuples and core functions.',
    'Dictionaries: key access, adding/modifying items, traversal and len, keys, values, items, get, update, del, clear, fromkeys, copy, pop, popitem, setdefault, max, min and sorted.',
    'Python modules: import/from syntax; math, random and statistics modules and their prescribed functions.',
  ], [
    'Design, write, test and debug Python programs for prescribed problems.',
    'Maintain a practical portfolio covering strings, lists, tuples, dictionaries, modules and control flow.',
  ], 45),
  makeUnit('083-xi-u3', 3, 'Society, Law, and Ethics', [
    'Digital footprints and responsible digital presence.',
    'Digital society and netizen behaviour: netiquette, communication etiquette and social-media etiquette.',
    'Data protection and intellectual property rights: copyright, patent and trademark.',
    'IPR violations: plagiarism, copyright infringement and trademark infringement.',
    'Open-source software and licensing: Creative Commons, GPL and Apache.',
    'Cyber crime: hacking, eavesdropping, phishing, fraud emails, ransomware, cyber trolls and cyber bullying.',
    'Cyber safety: safe browsing, identity protection and confidentiality.',
    'Malware: viruses, trojans and adware.',
    'E-waste management and responsible disposal of electronic gadgets.',
    'Information Technology Act and responsible technology use.',
    'Technology and society with attention to gender and disability issues.',
  ], [
    'Analyse a cyber-safety scenario and propose responsible actions.',
    'Compare licensing/IPR cases and identify appropriate ethical behaviour.',
  ], 15),
];

const cbse083Class12Units = [
  makeUnit('083-xii-u1', 1, 'Computational Thinking and Programming – 2', [
    'Revision of Python topics covered in Class XI.',
    'Functions: built-in, module and user-defined functions; arguments, parameters, default/positional parameters, return values, flow of execution and local/global scope.',
    'Exception handling using try-except-finally.',
    'Files: text, binary and CSV files; relative/absolute paths and file modes.',
    'Text-file operations: open/close, with, read, readline, readlines, write, writelines, seek and tell; search/update/append style operations.',
    'Binary files with pickle: dump/load and create, read, write, search, append and update operations.',
    'CSV files using csv module: reader, writer, writerow and writerows.',
    'Stack data structure: push/pop and implementation using a Python list.',
  ], [
    'Write and test Python programs using functions, exception handling, text/binary/CSV files and stacks.',
    'Maintain a Class XII practical portfolio with file-handling and data-structure programs.',
  ], 40),
  makeUnit('083-xii-u2', 2, 'Computer Networks', [
    'Evolution of networking: ARPANET, NSFNET and Internet.',
    'Data communication: sender, receiver, message, communication media and protocols.',
    'Bandwidth and data-transfer rate; IP address and switching techniques.',
    'Transmission media: twisted pair, coaxial, fibre-optic, radio, microwave and infrared.',
    'Network devices: modem, Ethernet card, RJ45, repeater, hub, switch, router, gateway and Wi-Fi card.',
    'Network types: PAN, LAN, MAN and WAN; topologies: bus, star and tree.',
    'Protocols: HTTP, FTP, PPP, SMTP, TCP/IP, POP3, HTTPS, TELNET and VoIP.',
    'Web services: WWW, HTML, XML, domain names, URL, websites, browsers, web servers and web hosting.',
  ], [
    'Identify network devices, media, topologies and protocols in practical scenarios.',
    'Explain how a web request moves through common network components.',
  ], 10),
  makeUnit('083-xii-u3', 3, 'Database Management', [
    'Database concepts and need for databases.',
    'Relational model: relation, attribute, tuple, domain, degree, cardinality and candidate/primary/alternate/foreign keys.',
    'SQL and DDL/DML; data types CHAR, VARCHAR, INT, FLOAT and DATE.',
    'Constraints: NOT NULL, UNIQUE and PRIMARY KEY.',
    'Database/table commands: CREATE, USE, SHOW, DROP, DESCRIBE, ALTER and table creation/removal.',
    'Data manipulation: INSERT, DELETE, UPDATE and SELECT.',
    'SQL operators, aliasing, DISTINCT, WHERE, IN, BETWEEN, ORDER BY, NULL, IS NULL, IS NOT NULL and LIKE.',
    'Aggregate functions MAX, MIN, AVG, SUM and COUNT; GROUP BY and HAVING.',
    'Joins: Cartesian product, equi-join and natural join.',
    'Python-SQL connectivity: connect, cursor, execute, commit, fetchone, fetchall, rowcount and parameterised queries using %s/format().',
  ], [
    'Create/query relational databases and perform Python-SQL connectivity tasks.',
    'Build a small database application using SQL operations and Python.',
  ], 20),
];

const cbse065Class11Units = [
  makeUnit('065-xi-u1', 1, 'Introduction to Computer System', [
    'Evolution of computing devices and the concept of a computer system.',
    'Components and interconnections of a computer system; input and output devices.',
    'Memory units and types: primary and secondary memory.',
    'Data deletion, recovery and related security concerns.',
  ], [
    'Identify major computer-system components and explain their roles.',
    'Demonstrate safe handling and responsible disposal/recovery awareness.',
  ], 10),
  makeUnit('065-xi-u2', 2, 'Introduction to Python', [
    'Python language, features, program structure, execution modes and tokens.',
    'Variables, constants, keywords, identifiers and comments.',
    'Data types, operators, expressions, input/output and type conversion.',
    'Conditional statements and loops.',
    'Strings, lists and dictionaries with indexing, traversal and common operations.',
    'Basic functions and modular thinking required for practical programming.',
  ], [
    'Write, execute and debug Python programs using core data types, strings, lists and dictionaries.',
    'Build small data-processing programs from a problem statement.',
  ], 25),
  makeUnit('065-xi-u3', 3, 'Database Concepts and the Structured Query Language', [
    'Database concepts and relational database management systems.',
    'Database, table, record, field, domain and keys.',
    'SQL data types and database/table creation.',
    'INSERT, UPDATE, DELETE and SELECT statements.',
    'WHERE, ORDER BY and aggregate functions.',
    'GROUP BY, HAVING and relational operations.',
  ], [
    'Create tables and perform SQL queries on a relational database.',
    'Use keys and aggregation to retrieve meaningful information.',
  ], 30),
  makeUnit('065-xi-u4', 4, 'Introduction to Emerging Trends', [
    'Artificial Intelligence and Machine Learning.',
    'Natural Language Processing and immersive technologies.',
    'Internet of Things, robotics and blockchain.',
    'Cloud computing and big data.',
  ], [
    'Identify emerging technologies and give appropriate real-world applications.',
    'Discuss opportunities, limitations and responsible use.',
  ], 5),
];

const cbse065Class12Units = [
  makeUnit('065-xii-u1', 1, 'Data Handling using Pandas and Data Visualization', [
    'Pandas and Matplotlib libraries.',
    'Series: creation, indexing, selection and operations.',
    'DataFrame: creation, indexing, selection, adding/deleting rows and columns.',
    'Importing/exporting data and handling CSV data.',
    'Data cleaning, merging and analysis workflows appropriate to the prescribed practical scope.',
    'Visualization using line, bar, histogram and pie charts.',
  ], [
    'Create Series/DataFrames, clean/select data and visualize it with Matplotlib.',
    'Interpret a chart and communicate the underlying data insight.',
  ], 25),
  makeUnit('065-xii-u2', 2, 'Database Query using SQL', [
    'Revision of database concepts and SQL.',
    'Aggregate functions MAX, MIN, AVG, SUM and COUNT.',
    'GROUP BY and HAVING clauses.',
    'Joins and queries using multiple tables.',
    'Import/export data between SQL database and Pandas.',
  ], [
    'Design and execute SQL queries and exchange data between SQL and Pandas.',
    'Combine database results with Pandas analysis.',
  ], 25),
  makeUnit('065-xii-u3', 3, 'Introduction to Computer Networks', [
    'Computer networks and their advantages.',
    'Network types and topologies.',
    'Networking devices and transmission media.',
    'Internet, web, URL, browser and web services.',
    'Internet security issues and safe browser configuration.',
  ], [
    'Identify network devices/topologies and explain safe internet practices.',
  ], 10),
  makeUnit('065-xii-u4', 4, 'Societal Impacts', [
    'Digital footprint, digital identity and data privacy.',
    'Intellectual property rights, plagiarism and open-source licensing.',
    'Cybercrime and cyber laws.',
    'Technology impact on society, gender and disability issues.',
    'E-waste and responsible digital citizenship.',
  ], [
    'Analyse a societal-impact case and propose responsible digital behaviour.',
  ], 10),
];

const cbse802Class11PartA = [
  makeUnit('802-xi-a1', 1, 'Communication Skills-III', [], [], 2, 10), makeUnit('802-xi-a2', 2, 'Self-Management Skills-III', [], [], 3, 10), makeUnit('802-xi-a3', 3, 'ICT Skills-III', [], [], 1, 10), makeUnit('802-xi-a4', 4, 'Entrepreneurial Skills-III', [], [], 3, 15), makeUnit('802-xi-a5', 5, 'Green Skills-III', [], [], 1, 5),
];

const cbse802Class11PartB = [
  makeUnit('802-xi-b1', 1, 'Computer Organization', [
    'Fundamentals and characteristics of computers; components and block diagram.',
    'Task/process execution and functions of computer components and CPU.',
    'Input/output devices and storage devices; memory units.',
    'Operating systems: need, functions, types and comparison of features.',
    'Troubleshooting hardware, printer, sound, software and networking problems.',
    'Printer setup, default printer and printer settings; force restart/stop a task.',
    'Network fly-lead and network-card troubleshooting.',
    'Utilities: disk-space management, Disk Cleanup, Recycle Bin, defragmentation, removing unused programs/services and command-prompt file search.',
  ], [
    'Identify computer components and I/O devices.',
    'Perform basic printer, storage and system troubleshooting tasks.',
  ], 5, { theory: 15, practical: 15 }),
  makeUnit('802-xi-b2', 2, 'Networking And Internet', [
    'Need and benefits of networking; sender, receiver, message and channel.',
    'Wired/wireless transmission media and telephone-network generations.',
    'RJ45, modem, repeater, hub, switch, bridge, gateway and router.',
    'Network topologies: bus, star, ring, tree and mesh.',
    'Network types: LAN, MAN, WAN, PAN and VAN.',
    'Internet terminology: digital literacy, channels, bandwidth and ISP.',
    'Data-transfer rates: bps, Kbps, KBps, Mbps, MBps, Gbps and GBps.',
    'Protocols: TCP/IP, FTP, HTTP, SMTP, POP3, PPP and UDP.',
    'Cyber threats: digital footprints, virus, worm, trojan, spam, malware, DoS, eavesdropping, adware, spyware and snooping.',
    'Security measures: antivirus, firewall, login IDs and passwords; cybercrime, phishing, pharming, spoofing, bullying, hacking, cracking, identity theft, cyber stalking and trolling.',
    'Cyber safety: netiquette, IT Act and cyber laws.',
  ], [
    'Identify network devices/media/topologies in a lab.',
    'Set up a hotspot and inspect data-transfer/security settings.',
  ], 10, { theory: 15, practical: 25 }),
  makeUnit('802-xi-b3', 3, 'Office Automation Tools', [
    'Word processing with OpenOffice Writer: window components, tabs, document views, navigation and tables.',
    'Spreadsheet with Calc: formatting, AutoFill, alignment, borders, text wrapping, numeric formats, find/replace, rows/columns and formulas.',
    'Spreadsheet functions including SUM, SQRT, PRODUCT, POWER, LOG, ROUND, ABS and AVERAGE.',
    'Relative, absolute and mixed references; sorting, filtering and charts.',
    'Macros: create, record, run and use macros.',
    'Presentation with OpenOffice Impress: views, animations, transitions, headers and footers.',
  ], [
    'Create and format documents, spreadsheets and presentations.',
    'Build formulas/charts and create/run a simple spreadsheet macro.',
  ], 10, { theory: 15, practical: 30 }),
  makeUnit('802-xi-b4', 4, 'RDBMS', [
    'Database purpose and relational model terminology: relation, tuple, attribute and cardinality.',
    'Keys: primary, candidate, alternate and foreign.',
    'MySQL installation and simple calculations.',
    'DDL/DML classification and MySQL data types: CHAR, VARCHAR, DECIMAL, INT, DATE and TIME.',
    'CREATE DATABASE, USE, CREATE TABLE, DESCRIBE, SHOW TABLES, ALTER TABLE and DROP TABLE.',
    'DML: INSERT INTO, UPDATE and DELETE.',
    'SELECT with WHERE, ORDER BY, DISTINCT, LIKE, BETWEEN and IN.',
  ], [
    'Create databases/tables, apply keys and execute prescribed MySQL queries.',
  ], 10, { theory: 15, practical: 20 }),
  makeUnit('802-xi-b5', 5, 'Fundamentals of Java', [
    'NetBeans IDE and GUI components: jButton, jLabel, jTextField, jTextArea, jRadioButton, jCheckBox, jPasswordField, jListBox, jComboBox, JTable, JOptionPane and JPanel.',
    'Java and object-oriented programming; primitive data types and variables.',
    'Operators: assignment, arithmetic, relational, logical and bitwise.',
    'Event-driven GUI programming with JFrame and component properties.',
    'Selection statements: if, if-else and switch-case.',
    'Simple applications: messages, concatenation, arithmetic, simple interest, checkbox/radio-button decisions, colour selection, marks/percentage/grade and vowel/consonant.',
  ], [
    'Create a NetBeans GUI project and implement event-driven Java programs.',
    'Build small applications using components, operators and selection statements.',
  ], 15, { theory: 25, practical: 35 }),
];

const cbse802Class12PartA = [
  makeUnit('802-xii-a1', 1, 'Communication Skills-IV', [], [], 2, 10), makeUnit('802-xii-a2', 2, 'Self-Management Skills-IV', [], [], 3, 10), makeUnit('802-xii-a3', 3, 'Information and Communication Technology Skills-IV', [], [], 1, 10), makeUnit('802-xii-a4', 4, 'Entrepreneurial Skills-IV', [], [], 3, 15), makeUnit('802-xii-a5', 5, 'Green Skills-IV', [], [], 1, 5),
];

const cbse802Class12PartB = [
  makeUnit('802-xii-b1', 1, 'Database Concepts – RDBMS Tool', [
    'Basics of RDBMS and relational data organisation.',
    'Creating and opening databases.',
    'Creating and populating tables.',
    'Modifying table content and structure.',
    'Ordering and grouping data.',
    'Operating with multiple tables.',
  ], [
    'Create a database/table, insert records, modify structure/content and execute multi-table queries.',
  ], 15, { theory: 30, practical: 45 }),
  makeUnit('802-xii-b2', 2, 'Operating Web Based Applications', [
    'Online reservation systems.',
    'E-governance services.',
    'Online shopping and bill payments.',
    'Online tutorials and tests.',
    'Project management and web-based application development.',
    'Project essentials and tips.',
    'Case studies: online game, online quiz and online bill calculator.',
  ], [
    'Evaluate and safely operate web-based services.',
    'Plan a small web-based application project and document its requirements.',
  ], 10, { theory: 15, practical: 20 }),
  makeUnit('802-xii-b3', 3, 'JAVA', [
    'Fundamentals of Java programming and Object-Oriented Programming.',
    'Java language elements and operators.',
    'Control flow and arrays.',
    'Class design and object-oriented structure.',
    'Exception handling and assertions.',
    'Threads.',
    'Wrapper classes.',
    'String manipulation.',
  ], [
    'Write and execute Java programs covering OOP, arrays, exceptions, assertions, threads, wrappers and strings.',
  ], 20, { theory: 30, practical: 50 }),
  makeUnit('802-xii-b4', 4, 'Work Integrated Learning IT – DMA', [
    'Identification of work areas.',
    'Work experience and workplace-oriented IT/DMA activity.',
  ], [
    'Complete and document a workplace-oriented IT/DMA activity or project.',
  ], 5, { theory: 10, practical: 10 }),
];

const seniorTrack = (code, name, category, pythonRole, pythonLibraries = [], sourceUrl = 'https://cbseacademic.nic.in/') => ({
  code, id: `cbse-${code}-senior-secondary`, name, category,
  syllabusSource: `CBSE ${code} ${name} 2026-27`, sourceUrl,
  pythonRole, pythonLibraries,
  assessment: { theoryMarks: 70, practicalMarks: 30, totalMarks: 100 },
  parts: { partA: { name: 'Curriculum content', units: [] }, partB: { name: 'Detailed topics', units: [] } },
  practicalAssessment: { practicalExamination: 30 },
});

const cbse083Class11 = {
  ...seniorTrack('083', 'Computer Science', 'academic-subject', 'core-programming', [], 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Computer_Science_SecP2_2026-27.pdf'),
  programmingLanguage: 'Python',
  parts: { partA: { name: 'Core Curriculum', units: cbse083Class11Units }, partB: { name: 'Practical Topics', units: [] } },
};
const cbse083Class12 = {
  ...seniorTrack('083', 'Computer Science', 'academic-subject', 'core-programming', [], 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Computer_Science_SecP2_2026-27.pdf'),
  programmingLanguage: 'Python',
  parts: { partA: { name: 'Core Curriculum', units: cbse083Class12Units }, partB: { name: 'Practical Topics', units: [] } },
};
const cbse065Class11 = {
  ...seniorTrack('065', 'Informatics Practices', 'academic-subject', 'programming-and-data-handling', [], 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Informatics_Practices_SecP2_2026-27.pdf'),
  programmingLanguage: 'Python',
  parts: { partA: { name: 'Curriculum content', units: cbse065Class11Units }, partB: { name: 'Practical Topics', units: [] } },
};
const cbse065Class12 = {
  ...seniorTrack('065', 'Informatics Practices', 'academic-subject', 'programming-and-data-handling', ['Pandas', 'Matplotlib'], 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Informatics_Practices_SecP2_2026-27.pdf'),
  programmingLanguage: 'Python',
  parts: { partA: { name: 'Curriculum content', units: cbse065Class12Units }, partB: { name: 'Practical Topics', units: [] } },
};
const cbse802Class11 = {
  ...seniorTrack('802', 'Information Technology', 'skill-subject', 'none', [], 'https://cbseacademic.nic.in/web_material/Curriculum27/SrSec/802-IT.pdf'),
  assessment: { theoryMarks: 60, practicalMarks: 40, totalMarks: 100 },
  programmingLanguage: 'Java',
  parts: { partA: { name: 'Employability Skills', units: cbse802Class11PartA }, partB: { name: 'Subject Specific Skills', units: cbse802Class11PartB } },
  practicalAssessment: { officeAutomationTools: 15, javaProgramme: 10, mysqlCommands: 5, practicalFile: 5, vivaVoce: 5, projectWork: 10 },
};
const cbse802Class12 = {
  ...seniorTrack('802', 'Information Technology', 'skill-subject', 'none', [], 'https://cbseacademic.nic.in/web_material/Curriculum27/SrSec/802-IT.pdf'),
  assessment: { theoryMarks: 60, practicalMarks: 40, totalMarks: 100 },
  programmingLanguage: 'Java',
  parts: { partA: { name: 'Employability Skills', units: cbse802Class12PartA }, partB: { name: 'Subject Specific Skills', units: cbse802Class12PartB } },
  practicalAssessment: { javaProgram: 10, sqlQueries: 10, practicalFile: 10, vivaVoce: 5, projectWork: 5 },
};

export const cbseCurriculum2026_27 = {
  board: 'CBSE', session: CBSE_CURRICULUM_SESSION,
  classes: {
    9: { classId: 'cbse-class-9', subjects: [cbse402Class9] },
    10: { classId: 'cbse-class-10', subjects: [cbse402Class10] },
    11: { classId: 'cbse-class-11', subjects: [cbse083Class11, cbse065Class11, cbse802Class11] },
    12: { classId: 'cbse-class-12', subjects: [cbse083Class12, cbse065Class12, cbse802Class12] },
  },
};

export const getCBSECurriculum = (classNumber, subjectCode) => {
  const targetClass = cbseCurriculum2026_27.classes[classNumber];
  if (!targetClass) return null;
  return targetClass.subjects.find((subject) => subject.code === String(subjectCode)) ?? null;
};

export const getAllCBSE2026_27Classes = () => Object.entries(cbseCurriculum2026_27.classes).map(([classNumber, data]) => ({ classNumber: Number(classNumber), ...data }));

export default cbseCurriculum2026_27;
