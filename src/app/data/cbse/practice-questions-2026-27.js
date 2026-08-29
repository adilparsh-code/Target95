/**
 * CBSE 2026-27 practice question bank seed.
 * Keep board, class and subject explicit so ICSE data never leaks into CBSE.
 */
export const CBSE_PRACTICE_QUESTIONS_2026_27 = [
  { id:'CBSE-402-9-001', board:'CBSE', session:'2026-27', classNumber:9, subjectCode:'402', type:'mcq', topic:'Digital documentation', difficulty:'easy', question:'Which feature is used to apply the same formatting consistently to headings in a document?', options:['Styles','Spell Check','Find and Replace','Word Count'], answer:'Styles' },
  { id:'CBSE-402-9-002', board:'CBSE', session:'2026-27', classNumber:9, subjectCode:'402', type:'scenario', topic:'Spreadsheet', difficulty:'medium', question:'A student needs a chart that compares the values of several categories. Which chart is generally most suitable?', options:['Column chart','Text box','Page break','Header'], answer:'Column chart' },
  { id:'CBSE-402-10-001', board:'CBSE', session:'2026-27', classNumber:10, subjectCode:'402', type:'mcq', topic:'Database Management System', difficulty:'easy', question:'Which database object is primarily used to enter or edit records through a user-friendly interface?', options:['Form','Report','Query','Relationship'], answer:'Form' },
  { id:'CBSE-402-10-002', board:'CBSE', session:'2026-27', classNumber:10, subjectCode:'402', type:'scenario', topic:'Workplace safety', difficulty:'medium', question:'A workstation causes repeated discomfort because the monitor is poorly positioned. What should be corrected first?', options:['Ergonomic setup','File name','Database key','Slide transition'], answer:'Ergonomic setup' },
  { id:'CBSE-083-11-001', board:'CBSE', session:'2026-27', classNumber:11, subjectCode:'083', type:'mcq', topic:'Python', difficulty:'easy', question:'Which Python data type stores an ordered, mutable collection?', options:['list','tuple','string','set'], answer:'list' },
  { id:'CBSE-083-11-002', board:'CBSE', session:'2026-27', classNumber:11, subjectCode:'083', type:'mcq', topic:'Exception handling', difficulty:'medium', question:'Which block is used to handle an exception raised by code in a try block?', options:['except','define','import','return'], answer:'except' },
  { id:'CBSE-083-12-001', board:'CBSE', session:'2026-27', classNumber:12, subjectCode:'083', type:'mcq', topic:'SQL', difficulty:'medium', question:'Which SQL clause is used to filter rows before grouping?', options:['WHERE','ORDER BY','GROUP BY','FROM'], answer:'WHERE' },
  { id:'CBSE-083-12-002', board:'CBSE', session:'2026-27', classNumber:12, subjectCode:'083', type:'mcq', topic:'Computer networks', difficulty:'easy', question:'Which device forwards packets between different networks?', options:['Router','Keyboard','Monitor','Printer'], answer:'Router' },
  { id:'CBSE-065-11-001', board:'CBSE', session:'2026-27', classNumber:11, subjectCode:'065', type:'mcq', topic:'Pandas', difficulty:'easy', question:'Which Pandas object is one-dimensional and labelled?', options:['Series','DataFrame','IndexFile','Plot'], answer:'Series' },
  { id:'CBSE-065-11-002', board:'CBSE', session:'2026-27', classNumber:11, subjectCode:'065', type:'mcq', topic:'Matplotlib', difficulty:'medium', question:'Which Matplotlib function is commonly used to display a line graph?', options:['plot()','read_csv()','head()','drop()'], answer:'plot()' },
  { id:'CBSE-065-12-001', board:'CBSE', session:'2026-27', classNumber:12, subjectCode:'065', type:'mcq', topic:'SQL', difficulty:'medium', question:'Which SQL clause groups rows having the same values in selected columns?', options:['GROUP BY','WHERE','FROM','INSERT'], answer:'GROUP BY' },
  { id:'CBSE-065-12-002', board:'CBSE', session:'2026-27', classNumber:12, subjectCode:'065', type:'mcq', topic:'Data handling', difficulty:'medium', question:'Which Pandas function is commonly used to read a CSV file into a DataFrame?', options:['read_csv()','to_csv()','plot()','describe_sql()'], answer:'read_csv()' },
  { id:'CBSE-802-11-001', board:'CBSE', session:'2026-27', classNumber:11, subjectCode:'802', type:'mcq', topic:'Information Technology', difficulty:'easy', question:'Which practice helps protect a computer account from unauthorized access?', options:['Using a strong unique password','Sharing passwords','Disabling updates','Using unknown attachments'], answer:'Using a strong unique password' },
  { id:'CBSE-802-12-001', board:'CBSE', session:'2026-27', classNumber:12, subjectCode:'802', type:'scenario', topic:'IT skills', difficulty:'medium', question:'Before sharing a work document containing personal information, what should be checked?', options:['Privacy and access permissions','Font size only','Page colour only','Animation speed'], answer:'Privacy and access permissions' },
];

export const getCBSEPracticeQuestions = ({ classNumber, subjectCode, topic, difficulty } = {}) =>
  CBSE_PRACTICE_QUESTIONS_2026_27.filter((q) =>
    (classNumber == null || q.classNumber === Number(classNumber)) &&
    (subjectCode == null || q.subjectCode === String(subjectCode)) &&
    (topic == null || q.topic === topic) &&
    (difficulty == null || q.difficulty === difficulty)
  );

export default CBSE_PRACTICE_QUESTIONS_2026_27;
