export const BOOLEAN_CANONICAL_FORMS = {
  title: "From Truth Table to Canonical Form",
  rule: "Fix the variable order first. For n variables, use 2^n rows.",
  minterm: "For an F=1 row: 1 stays normal, 0 becomes complemented. AND all literals.",
  maxterm: "For an F=0 row: 0 stays normal, 1 becomes complemented. OR all literals.",
  notation: [{ symbol: "Σm", meaning: "List the decimal indices of rows where F=1." }, { symbol: "ΠM", meaning: "List the decimal indices of rows where F=0." }],
  examples: [
    { title: "Truth table → canonical SOP", rows: [1,3,6], binary: ["001","011","110"], terms: ["m1 = A'B'C","m3 = A'BC","m6 = ABC'"], result: "F = A'B'C + A'BC + ABC' = Σm(1,3,6)" },
    { title: "Truth table → canonical POS", rows: [0,2,4,5,7], binary: ["000","010","100","101","111"], terms: ["M0=(A+B+C)","M2=(A+B'+C)","M4=(A'+B+C)","M5=(A'+B+C')","M7=(A'+B'+C')"], result: "F = ΠM(0,2,4,5,7)" },
    { title: "Σm → canonical SOP", rows: [0,2,5,7], binary: ["000","010","101","111"], terms: ["m0=A'B'C'","m2=A'BC'","m5=AB'C","m7=ABC"], result: "Σm(0,2,5,7)=A'B'C'+A'BC'+AB'C+ABC" },
    { title: "ΠM → canonical POS", rows: [1,3,4,6], binary: ["001","011","100","110"], terms: ["M1=(A+B+C')","M3=(A+B'+C')","M4=(A'+B+C)","M6=(A'+B'+C)"], result: "ΠM(1,3,4,6)=(A+B+C')(A+B'+C')(A'+B+C)(A'+B'+C)" }
  ],
  traps: ["Σm uses the 1-rows. ΠM uses the 0-rows.","Minterm: 1=normal, 0=complement.","Maxterm: 0=normal, 1=complement.","Never change variable order after numbering rows."],
  practice: [{ id:"CAN-Q1", question:"F(A,B,C)=Σm(1,3,6). Write canonical SOP.", answer:"A'B'C + A'BC + ABC'." },{ id:"CAN-Q2", question:"F(A,B,C)=ΠM(0,2,4,5,7). Write canonical POS.", answer:"(A+B+C)(A+B'+C)(A'+B+C)(A'+B+C')(A'+B'+C')." },{ id:"CAN-Q3", question:"A 3-variable function is 1 on rows 0,2,5,7. Write Σm.", answer:"Σm(0,2,5,7)." }]
};

export default BOOLEAN_CANONICAL_FORMS;
