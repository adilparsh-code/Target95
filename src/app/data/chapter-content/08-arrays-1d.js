const chapter08 = {
  id: "08-arrays-1d",
  title: "Arrays (Single Dimensional)",
  slug: "arrays-1d",
  subject: "Java Programming",
  difficulty: "Advanced",
  estimatedTime: 70,
  topics: ["1D arrays", "indexing", "traversal", "array operations"],
  introduction: {
    description: "A one-dimensional array stores elements of the same type in indexed positions. In Java, indexes start at 0 and end at length - 1.",
    realLifeExamples: ["Student marks", "Daily temperatures", "Monthly sales"],
    commonMistakes: ["Using <= with length", "Starting from index 1 unintentionally", "Confusing length with last index"],
    whereUsed: ["Tabular data", "Search and aggregation", "Sorting and traversal"]
  },
  theoryNotes: {
    beginnerExplanation: "Declare an array, create it with a fixed size, assign values, and traverse it using an index or loop.",
    importantPoints: ["Indexes begin at 0", "length gives number of elements", "Last valid index is length - 1", "Elements share one declared type", "Arrays have fixed size after creation"],
    memoryTricks: ["0 to length-1", "length counts; index locates", "Create once, traverse many times"],
    examTips: ["Check loop bounds", "Trace indexes carefully", "Watch for ArrayIndexOutOfBoundsException", "Separate sum/average from comparison logic"]
  },
  syntax: {
    code: "int[] marks = new int[5];\nmarks[0] = 72;\nint[] nums = {2, 4, 6, 8};",
    breakdown: [
      { keyword: "int[]", explanation: "Declares a one-dimensional integer array." },
      { keyword: "new int[5]", explanation: "Creates space for five integers." },
      { keyword: "marks[0]", explanation: "Accesses the first element." }
    ]
  },
  examples: {
    basic: [{ title: "Sum of elements", code: "int[] a={3,5,7,9};\nint sum=0;\nfor(int i=0;i<a.length;i++) sum+=a[i];\nSystem.out.println(sum);", output: "24", explanation: ["Visit indexes 0 to 3.", "Add each element to sum."] }],
    intermediate: [{ title: "Count values above average", code: "int[] a={4,8,6,10};\nint sum=0;\nfor(int x:a) sum+=x;\ndouble avg=(double)sum/a.length;\nint count=0;\nfor(int x:a) if(x>avg) count++;\nSystem.out.println(count);", output: "2", explanation: ["Average is 7.", "8 and 10 are above average."] }],
    advanced: [{ title: "Second-largest distinct", code: "int[] a={7,4,9,9,6};\nint largest=Integer.MIN_VALUE, second=Integer.MIN_VALUE;\nfor(int x:a){ if(x>largest){ second=largest; largest=x; } else if(x>second && x!=largest){ second=x; }}\nSystem.out.println(second);", output: "7", explanation: ["9 becomes the largest.", "7 becomes the second-largest distinct value."] }]
  },
  dryRun: [{ title: "Index traversal", code: "int[] a={4,1,5}; int s=0; for(int i=0;i<a.length;i++) s+=a[i];", trace: [{ line: 1, explanation: "Initially i=0 and s=0." }, { line: 2, explanation: "Visits 4, then 1, then 5; final sum is 10." }] }],
  diagrams: [
    {
      type: "image",
      title: "One-Dimensional Array Indexing",
      explanation: "Java arrays are zero-indexed. For five elements, valid indexes are 0 through 4.",
      src: "/visuals/icse-java/java-array-indexing.svg",
      alt: "Array with values 72, 85, 91, 64 and 78 labelled at indexes 0 through 4.",
      caption: "Five elements have valid indexes 0 to 4; the last valid index is length minus one."
    }
  ],
  outputBasedQuestions: [
    { id:"arrays-1d-ob-1", question:"Predict the output: int[] a={5,2,7}; System.out.println(a[1]+a[2]);", answer:"9", explanation:"a[1]=2 and a[2]=7, so the sum is 9." },
    { id:"arrays-1d-ob-2", question:"Predict the output: int[] a={3,6,9,12}; for(int i=0;i<a.length;i+=2) System.out.print(a[i]+\" \");", answer:"3 9", explanation:"Indexes 0 and 2 are visited." },
    { id:"arrays-1d-ob-3", question:"Predict the output: int[] a={2,4,6,8}; int s=0; for(int i=1;i<3;i++) s+=a[i]; System.out.println(s);", answer:"10", explanation:"Indexes 1 and 2 contribute 4+6." },
    { id:"arrays-1d-ob-4", question:"Predict the output: int[] a={1,3,5,7}; System.out.println(a.length+a[0]);", answer:"5", explanation:"length is 4 and a[0] is 1." },
    { id:"arrays-1d-ob-5", question:"Predict the output: int[] a={10,20,30}; for(int i=a.length-1;i>=0;i--) System.out.print(a[i]+\" \");", answer:"30 20 10", explanation:"Traversal starts from the last index and moves backwards." },
    { id:"arrays-1d-ob-6", question:"Predict the output: int[] a={4,1,4,2}; int c=0; for(int x:a) if(x==4)c++; System.out.println(c);", answer:"2", explanation:"The value 4 occurs twice." },
    { id:"arrays-1d-ob-7", question:"Predict the output: int[] a={2,5,8}; int p=1; for(int x:a) p*=x; System.out.println(p);", answer:"80", explanation:"2×5×8=80." },
    { id:"arrays-1d-ob-8", question:"Predict the output: int[] a={7,2,9,4}; int m=a[0]; for(int i=1;i<a.length;i++) if(a[i]<m)m=a[i]; System.out.println(m);", answer:"2", explanation:"The minimum value is 2." },
    { id:"arrays-1d-ob-9", question:"Predict the output: int[] a={1,2,3,4}; int s=0; for(int i=0;i<a.length;i++) if(i%2==0)s+=a[i]; System.out.println(s);", answer:"4", explanation:"Indexes 0 and 2 contain 1 and 3." },
    { id:"arrays-1d-ob-10", question:"Predict the output: int[] a={5,10,15}; System.out.println(a[2]-a[0]);", answer:"10", explanation:"15-5=10." }
  ],
  errorFindingQuestions: [
    { id:"arrays-1d-ef-1", question:"Find the error: for(int i=0;i<=a.length;i++) System.out.println(a[i]);", error:"The condition reaches index a.length.", corrected:"for(int i=0;i<a.length;i++) System.out.println(a[i]);" },
    { id:"arrays-1d-ef-2", question:"Find the error: int[] a=new int[5]; a[5]=10;", error:"Index 5 is invalid in a five-element array.", corrected:"Use an index from 0 to 4." },
    { id:"arrays-1d-ef-3", question:"Find the error: int[] a={1,2,3}; System.out.println(a[3]);", error:"Index 3 is outside the valid range 0..2.", corrected:"Use a[2] for the last element." },
    { id:"arrays-1d-ef-4", question:"Find the error: int[] a={1,2,3}; for(int i=1;i<a.length;i++) System.out.println(a[i]); if the task is to print every element.", error:"The loop skips index 0.", corrected:"Start with i=0." },
    { id:"arrays-1d-ef-5", question:"Find the error: int avg=sum/a.length; when sum is int and a.length is int but a fractional average is required.", error:"Integer division discards the fractional part.", corrected:"Use double avg=(double)sum/a.length;" }
  ],
  fillInTheBlanks: [
    { id:"arrays-1d-fb-1", question:"The first valid index of a Java array is ______.", answer:"0" },
    { id:"arrays-1d-fb-2", question:"For an array of length n, the last valid index is ______.", answer:"n-1" },
    { id:"arrays-1d-fb-3", question:"The number of elements in array a is returned by ______.", answer:"a.length" },
    { id:"arrays-1d-fb-4", question:"Accessing an invalid array index can cause ______.", answer:"ArrayIndexOutOfBoundsException" },
    { id:"arrays-1d-fb-5", question:"An array created with new int[5] contains ______ elements.", answer:"5" }
  ],
  mcqs: [
    { id:"arrays-1d-mcq-1", question:"Which is the last valid index of int[] a=new int[6]?", options:["A) 5","B) 6","C) 4","D) 0"], answer:0, explanation:"The last valid index is length-1 = 5." },
    { id:"arrays-1d-mcq-2", question:"Which statement gives the number of elements in array a?", options:["A) a.length","B) a.size()","C) a.length()","D) length(a)"], answer:0, explanation:"Java arrays use the length field." },
    { id:"arrays-1d-mcq-3", question:"What happens when int[] a={1,2}; System.out.println(a[2]); executes?", options:["A) ArrayIndexOutOfBoundsException","B) 0","C) 2","D) Compilation error"], answer:0, explanation:"Index 2 is invalid for length 2." },
    { id:"arrays-1d-mcq-4", question:"Which loop prints every element of int[] a?", options:["A) for(int i=0;i<a.length;i++)","B) for(int i=1;i<a.length;i++)","C) for(int i=0;i<=a.length;i++)","D) for(int i=1;i<=a.length;i++)"], answer:0, explanation:"It visits indexes 0 through length-1 exactly once." },
    { id:"arrays-1d-mcq-5", question:"Which statement correctly creates an array of five integers?", options:["A) int[] a=new int[5];","B) int a=new int[5];","C) array int a[5];","D) int[5] a;"], answer:0, explanation:"This is valid Java array-declaration and creation syntax." }
  ],
  programmingQuestions: [
    { id:"arrays-1d-pq-1", question:"Read 10 integers into an array and display their sum and average." },
    { id:"arrays-1d-pq-2", question:"Read an array and display the largest and smallest elements." },
    { id:"arrays-1d-pq-3", question:"Read an array and count even and odd elements." }
  ]
};

export default chapter08;
