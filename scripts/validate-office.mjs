import assert from 'node:assert/strict';
import fs from 'node:fs';
const ids = new Set();
let lessons = 0;
let mcqs = 0;
for (const [app, count] of [['word',22],['excel',24],['powerpoint',20]]) {
  const chapters = JSON.parse(fs.readFileSync(`src/data/office/${app}.json`));
  assert.equal(chapters.length, count);
  for (const chapter of chapters) {
    assert(!ids.has(`${app}/${chapter.id}`)); ids.add(`${app}/${chapter.id}`);
    assert.equal(chapter.number, chapters.indexOf(chapter)+1);
    for (const field of ['title','description','expectedResult','independentPractice','challenge']) assert(chapter[field]?.length > 2, `${chapter.id}: ${field}`);
    for (const field of ['steps','objectives','concepts','tips','mistakes','keyPoints','shortQuestions','mcqs']) assert(chapter[field]?.length, `${chapter.id}: ${field}`);
    assert(chapter.guidedPractical.checklist.length >= 3);
    assert(fs.existsSync(`public${chapter.image.src}`));
    assert.equal(chapter.image.kind, 'instructional-diagram');
    for (const question of chapter.mcqs) {
      assert(!ids.has(question.id)); ids.add(question.id);
      assert.equal(question.options.length,4);
      assert.equal(new Set(question.options).size,4);
      assert(question.answer >= 0 && question.answer < 4);
      assert(question.explanation);
      mcqs++;
    }
    lessons++;
  }
}
console.log(`PASS: ${lessons} lessons, ${mcqs} MCQs, ${lessons} local visuals, unique IDs, valid schema.`);
// Load the production registry with its JSON imports inlined for plain Node ESM.
let registry = fs.readFileSync('src/data/office/index.js','utf8');
for (const app of ['word','excel','powerpoint']) registry = registry.replace(`import ${app} from './${app}.json';`, `const ${app} = ${fs.readFileSync(`src/data/office/${app}.json`,'utf8')};`);
const { searchOfficeContent, canCompleteOfficeChapter, getOfficeApp } = await import(`data:text/javascript;base64,${Buffer.from(registry).toString('base64')}`);
for (const term of ['mail merge','Excel SUM','Excel IF','PowerPoint animation','Word table','Excel chart']) assert(searchOfficeContent(term).length, `Search missing: ${term}`);
assert.equal(searchOfficeContent('    ').length,0);
assert.equal(searchOfficeContent('nonexistentzz').length,0);
assert.equal(getOfficeApp('invalid'),undefined);
const chapter = getOfficeApp('excel').chapters[6];
const complete = { checks: { 0:true, 1:true, 2:true }, independent:true, challengeDone:true, answers:Object.fromEntries(chapter.mcqs.map((q) => [q.id,q.answer])) };
assert(canCompleteOfficeChapter(chapter,complete));
for (const change of [{ checks:{} }, { independent:false }, { challengeDone:false }, { answers:{} }]) assert(!canCompleteOfficeChapter(chapter,{...complete,...change}));
console.log('PASS: search discovery and completion gates reject incomplete practicals and quizzes.');
