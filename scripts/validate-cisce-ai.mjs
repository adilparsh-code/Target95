#!/usr/bin/env node
import { ISC_AI_2027 } from '../src/app/data/iscArtificialIntelligence.js';
import { ISC_AI_883_PRACTICE } from '../src/app/data/iscArtificialIntelligencePractice.js';
import robotics from '../src/app/data/icseRoboticsAI.js';
import roboticsX from '../src/app/data/icseRoboticsAIClassX.js';
import supplemental from '../src/app/data/icseRoboticsAIQuestionBank.js';

const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };
const checkQuestion = (question, context) => {
  pass(Boolean(question?.id), `${context}: missing id`);
  pass(Boolean(question?.question || question?.assertion), `${context}: missing question`);
  pass(Boolean(question?.answer), `${context}: missing answer`);
  pass(Boolean(question?.explanation), `${context}: missing explanation`);
};

for (const [classNo, practice] of Object.entries({ 11: ISC_AI_883_PRACTICE.classXI, 12: ISC_AI_883_PRACTICE.classXII })) {
  const units = ISC_AI_2027.classes[classNo].theoryUnits;
  const ids = practice.map((item) => item.id);
  pass(new Set(ids).size === ids.length, `ISC AI Class ${classNo}: duplicate question id`);
  pass(!practice.some((item) => /843|402|java/i.test(`${item.question} ${item.answer} ${item.explanation}`)), `ISC AI Class ${classNo}: CBSE/ISC CS content leaked into AI bank`);
  for (const unit of units) {
    const items = practice.filter((item) => item.unitId === unit.id);
    pass(items.length >= 3, `ISC AI Class ${classNo}/${unit.id}: needs at least 3 questions, found ${items.length}`);
    for (const question of items) checkQuestion(question, `ISC AI Class ${classNo}/${question.id}`);
  }
  const types = new Set(practice.map((item) => item.type));
  for (const required of classNo === 11 ? ['MCQ', 'Direct', 'Application', 'Case Based', 'Numerical', 'Programming'] : ['MCQ', 'Direct', 'Application', 'Case Based', 'Numerical', 'HOTS', 'Programming']) {
    pass(types.has(required), `ISC AI Class ${classNo}: missing ${required} coverage`);
  }
}

pass(ISC_AI_2027.classes[11].theoryUnits.length === 7, 'ISC AI XI: expected 7 theory units');
pass(ISC_AI_2027.classes[12].theoryUnits.length === 5, 'ISC AI XII: expected 5 theory units');
pass(robotics.classIX.units.length === 7, 'ICSE Robotics & AI IX: expected 7 units');
pass(roboticsX.units.length === 4, 'ICSE Robotics & AI X: expected 4 authored units');
for (const unit of robotics.classIX.units) for (const question of unit.examQuestions || []) checkQuestion(question, `ICSE IX/${question.id}`);
for (const question of supplemental) checkQuestion(question, `ICSE IX supplement/${question.id}`);
for (const unit of roboticsX.units) for (const question of unit.questions) checkQuestion(question, `ICSE X/${question.id}`);
pass(!JSON.stringify({ ix: robotics.classIX, x: roboticsX, supplemental }).match(/Java|JAVA|class-xii|class-xi/i), 'ICSE Robotics & AI contains Java or ISC CS content');

if (failures.length) {
  console.error(`CISCE AI VALIDATION FAILED (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  const xi = ISC_AI_883_PRACTICE.classXI.length;
  const xii = ISC_AI_883_PRACTICE.classXII.length;
  const ix = robotics.classIX.units.reduce((total, unit) => total + unit.examQuestions.length, 0) + supplemental.length;
  const icseX = roboticsX.units.reduce((total, unit) => total + unit.questions.length, 0);
  console.log(`CISCE AI VALIDATION PASSED: ISC XI ${xi} questions, ISC XII ${xii} questions, ICSE IX ${ix} questions, ICSE X ${icseX} questions; all answers and explanations present.`);
}
