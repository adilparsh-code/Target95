const chapter10 = {
  id: "10-strings",
  title: "STRINGS — ICSE Class X to ISC Class XII",
  slug: "strings",
  subject: "Java Programming",
  difficulty: "Advanced",
  estimatedTime: 420,
  topics: ["String basics","indexing","length","charAt","substring","indexOf","lastIndexOf","equals","equalsIgnoreCase","compareTo","compareToIgnoreCase","concat","replace","trim","case conversion","String arrays","palindrome","frequency","anagram","word processing","StringBuffer"],

  introduction: {
    description: "A String is a sequence of characters. In Java, String is a class, not a primitive type. Class X students should first learn to see a String as indexed character boxes. ISC Class XII then builds on that foundation with extraction, searching, comparison, frequency, palindrome, word-processing and String-array problems.",
    learningPath: [
      "Level 1: understand characters and indexes.",
      "Level 2: master length() and charAt().",
      "Level 3: master substring(), indexOf() and lastIndexOf().",
      "Level 4: compare strings using equals(), equalsIgnoreCase() and compareTo().",
      "Level 5: combine String methods with loops and conditions.",
      "Level 6: solve ISC-style frequency, palindrome, anagram and sentence problems."
    ],
    commonMistakes: [
      "String indexes start at 0.",
      "String uses length(), while an array uses length.",
      "substring(begin,end) excludes end.",
      "indexOf() returns -1 when the target is absent.",
      "equals() compares content; == compares references.",
      "String is immutable; methods return new Strings.",
      "charAt() returns a char, substring() returns a String."
    ]
  },

  theoryNotes: {
    beginnerExplanation: "Think of COMPUTER as eight boxes: C0 O1 M2 P3 U4 T5 E6 R7. Most difficult String questions become manageable once these indexes are written down.",
    indexModel: {
      example: "COMPUTER",
      table: "Index:     0 1 2 3 4 5 6 7\nCharacter: C O M P U T E R",
      rules: [
        "First index = 0.",
        "Last index = length()-1.",
        "charAt(i) reads one character.",
        "substring(i) starts at i and continues to the end.",
        "substring(i,j) includes i but excludes j."
      ]
    },
    immutability: "String objects are immutable. String s = \"java\"; String t = s.toUpperCase(); leaves s as \"java\" and stores \"JAVA\" in t.",
    methodMap: [
      ["length()","number of characters","\"JAVA\".length() -> 4"],
      ["charAt(i)","character at index i","\"JAVA\".charAt(1) -> 'A'"],
      ["indexOf(x)","first occurrence","\"BANANA\".indexOf('A') -> 1"],
      ["lastIndexOf(x)","last occurrence","\"BANANA\".lastIndexOf('A') -> 5"],
      ["substring(i)","i to end","\"COMPUTER\".substring(4) -> \"UTER\""],
      ["substring(i,j)","i through j-1","\"COMPUTER\".substring(0,4) -> \"COMP\""],
      ["equals(s)","content equality","\"Java\".equals(\"Java\") -> true"],
      ["equalsIgnoreCase(s)","content equality ignoring case","\"Java\".equalsIgnoreCase(\"JAVA\") -> true"],
      ["compareTo(s)","lexicographic comparison","0 means equal; negative/positive mean before/after"],
      ["compareToIgnoreCase(s)","lexicographic comparison ignoring case","\"abc\".compareToIgnoreCase(\"ABC\") -> 0"],
      ["concat(s)","join strings","\"IC\".concat(\"SE\") -> \"ICSE\""],
      ["replace(old,new)","replace characters/sequences","\"banana\".replace('a','o') -> \"bonono\""],
      ["trim()","remove leading/trailing spaces","\"  Java  \".trim() -> \"Java\""],
      ["toUpperCase()/toLowerCase()","case conversion","\"java\".toUpperCase() -> \"JAVA\""],
      ["startsWith()/endsWith()","prefix/suffix test","\"report.pdf\".endsWith(\".pdf\") -> true"],
      ["String.valueOf(x)","convert a value to String","String.valueOf(125) -> \"125\""]
    ],
    comparisonRule: "Use equals() when the question asks whether two Strings contain the same text. Use compareTo() when ordering matters. Do not assume compareTo() returns only -1, 0 or 1.",
    examThinking: [
      "Write indexes before tracing.",
      "Mark the excluded end index in substring().",
      "Search left-to-right for indexOf() and right-to-left for lastIndexOf().",
      "For palindrome problems compare symmetric positions.",
      "For frequency problems scan the complete String."
    ]
  },

  syntax: {
    code: "String s = \"COMPUTER\";\nint n = s.length();\nchar ch = s.charAt(2);\nString a = s.substring(0,4);\nString b = s.substring(4);\nint p = s.indexOf('P');\nint q = s.lastIndexOf('E');\nboolean same = s.equals(\"COMPUTER\");\nint order = \"ABC\".compareTo(\"ABD\");\nString changed = s.replace('O','0');",
    breakdown: [
      {keyword:"s.length()",explanation:"Counts characters."},
      {keyword:"s.charAt(i)",explanation:"Returns one character."},
      {keyword:"s.substring(i,j)",explanation:"Returns a String and excludes j."},
      {keyword:"s.indexOf(x)",explanation:"Returns an index or -1."},
      {keyword:"s.equals(t)",explanation:"Compares content."},
      {keyword:"s.compareTo(t)",explanation:"Compares lexicographic order."}
    ]
  },

  examples: {
    basic: [
      {id:"string-b1",title:"Index thinking",code:"String s=\"SCHOOL\";\nfor(int i=0;i<s.length();i++) System.out.print(s.charAt(i)+\" \");",output:"S C H O O L",explanation:["The loop visits 0 through length()-1.","charAt(i) reads one character."]},
      {id:"string-b2",title:"Core methods",code:"String s=\"COMPUTER\";\nSystem.out.println(s.length());\nSystem.out.println(s.charAt(3));\nSystem.out.println(s.substring(0,4));\nSystem.out.println(s.indexOf('P'));",output:"8\nP\nCOMP\n3",explanation:["There are eight characters.","Index 3 contains P.","substring(0,4) uses indexes 0 to 3."]}
    ],
    intermediate: [
      {id:"string-i1",title:"Character frequency",code:"String s=\"BANANA\";\nint count=0;\nfor(int i=0;i<s.length();i++) if(s.charAt(i)=='A') count++;\nSystem.out.println(count);",output:"3",explanation:["A occurs at indexes 1, 3 and 5."]},
      {id:"string-i2",title:"Palindrome",code:"String s=\"LEVEL\";\nboolean ok=true;\nfor(int i=0;i<s.length()/2;i++) if(s.charAt(i)!=s.charAt(s.length()-1-i)) ok=false;\nSystem.out.println(ok ? \"Palindrome\" : \"Not Palindrome\");",output:"Palindrome",explanation:["Compare first with last, second with second-last.","Only half the String must be checked."]},
      {id:"string-i3",title:"Reverse",code:"String s=\"COMPUTER\";\nString rev=\"\";\nfor(int i=s.length()-1;i>=0;i--) rev+=s.charAt(i);\nSystem.out.println(rev);",output:"RETUPMOC",explanation:["Start at the last index and move backwards."]}
    ],
    advanced: [
      {id:"string-a1",title:"Extract last word",code:"String s=\"ISC COMPUTER SCIENCE\";\nint p=s.lastIndexOf(' ');\nSystem.out.println(s.substring(p+1));",output:"SCIENCE",explanation:["Find the final space, then start one position after it."]},
      {id:"string-a2",title:"Frequency of every letter",code:"String s=\"BANANA\";\nfor(char ch='A';ch<='Z';ch++){\n int count=0;\n for(int i=0;i<s.length();i++) if(s.charAt(i)==ch) count++;\n if(count>0) System.out.println(ch+\" = \"+count);\n}",output:"A = 3\nB = 1\nN = 2",explanation:["Outer loop selects a letter; inner loop counts it."]},
      {id:"string-a3",title:"Anagram logic",code:"String a=\"LISTEN\", b=\"SILENT\";\nboolean same=true;\nfor(char ch='A';ch<='Z';ch++){\n int ca=0,cb=0;\n for(int i=0;i<a.length();i++) if(Character.toUpperCase(a.charAt(i))==ch) ca++;\n for(int i=0;i<b.length();i++) if(Character.toUpperCase(b.charAt(i))==ch) cb++;\n if(ca!=cb) same=false;\n}\nSystem.out.println(same ? \"Anagram\" : \"Not Anagram\");",output:"Anagram",explanation:["Anagrams have identical character frequencies."]}
    ]
  },

  dryRun: [
    {id:"string-d1",title:"substring trace",code:"String s=\"EDUCATION\"; System.out.println(s.substring(2,6));",trace:["Write indexes: E0 D1 U2 C3 A4 T5 I6 O7 N8.","Begin is 2 -> U.","End is 6 and is excluded.","Indexes 2,3,4,5 -> UCAT."]},
    {id:"string-d2",title:"indexOf trace",code:"String s=\"PROGRAMMING\"; System.out.println(s.indexOf(\"GRAM\"));",trace:["Search from the left.","GRAM begins at index 3.","Answer = 3."]}
  ],

  outputBasedQuestions: [
    {id:"strings-xii-ob-1",question:"String s=\"COMPUTER\"; System.out.println(s.charAt(4));",answer:"U",explanation:"Indexes: C0 O1 M2 P3 U4."},
    {id:"strings-xii-ob-2",question:"String s=\"COMPUTER\"; System.out.println(s.substring(1,5));",answer:"OMPU",explanation:"Indexes 1,2,3,4 are included."},
    {id:"strings-xii-ob-3",question:"String s=\"BANANA\"; System.out.println(s.indexOf('A')+\" \"+s.lastIndexOf('A'));",answer:"1 5",explanation:"First A is at 1; last A is at 5."},
    {id:"strings-xii-ob-4",question:"String a=\"Java\",b=\"JAVA\"; System.out.println(a.equalsIgnoreCase(b));",answer:"true",explanation:"Case is ignored."},
    {id:"strings-xii-ob-5",question:"String s=\"  ICSE  \"; System.out.println(s.trim().length());",answer:"4",explanation:"trim() leaves ICSE."},
    {id:"strings-xii-ob-6",question:"String s=\"banana\"; System.out.println(s.replace('a','o'));",answer:"bonono",explanation:"Every a is replaced by o."},
    {id:"strings-xii-ob-7",question:"String s=\"COMPUTER\"; System.out.println(s.substring(s.length()-3));",answer:"TER",explanation:"length is 8, so substring(5) gives TER."},
    {id:"strings-xii-ob-8",question:"String s=\"JAVA\"; System.out.println(s.indexOf('Z'));",answer:"-1",explanation:"Z is absent."},
    {id:"strings-xii-ob-9",question:"String s=\"ABC\"; String t=\"ABD\"; System.out.println(s.compareTo(t)<0);",answer:"true",explanation:"ABC comes before ABD lexicographically."},
    {id:"strings-xii-ob-10",question:"String s=\"ISC XII\"; System.out.println(s.startsWith(\"ISC\"));",answer:"true",explanation:"ISC is the prefix."},
    {id:"strings-xii-ob-11",question:"String s=\"report.pdf\"; System.out.println(s.endsWith(\".pdf\"));",answer:"true",explanation:".pdf is the suffix."},
    {id:"strings-xii-ob-12",question:"String s=\"MISSISSIPPI\"; System.out.println(s.indexOf(\"SS\"));",answer:"2",explanation:"The first SS begins at index 2."}
  ],

  programmingQuestions: [
    {id:"strings-x-1",level:"Class X",question:"Accept a String and count vowels, consonants, digits and spaces."},
    {id:"strings-x-2",level:"Class X",question:"Accept a String and print it in reverse."},
    {id:"strings-x-3",level:"Class X",question:"Accept a String and check whether it is a palindrome."},
    {id:"strings-x-4",level:"Class X",question:"Accept a String and count the occurrence of a character entered by the user."},
    {id:"strings-xii-1",level:"ISC XII",question:"Accept a String and print the frequency of every alphabetic character that occurs."},
    {id:"strings-xii-2",level:"ISC XII",question:"Accept two Strings and determine whether they are anagrams."},
    {id:"strings-xii-3",level:"ISC XII",question:"Accept a sentence and print the longest word and its length."},
    {id:"strings-xii-4",level:"ISC XII",question:"Accept a sentence and print every word in reverse order."},
    {id:"strings-xii-5",level:"ISC XII",question:"Accept a sentence and count words, vowels, consonants, digits and spaces."},
    {id:"strings-xii-6",level:"ISC XII",question:"Accept a String and find the first non-repeating character."},
    {id:"strings-xii-7",level:"ISC XII",question:"Accept a sentence and print the word having the maximum number of vowels."},
    {id:"strings-xii-8",level:"ISC XII",question:"Accept a String and remove repeated consecutive characters, e.g. AAABBCCDA -> ABCDA."}
  ],

  errorFindingQuestions: [
    {id:"strings-err-1",question:"for(int i=0;i<=s.length();i++) System.out.print(s.charAt(i));",error:"i can become s.length(), which is outside the valid range.",corrected:"Use i < s.length()."},
    {id:"strings-err-2",question:"if(s1==s2) System.out.println(\"Same\");",error:"== compares references when content equality is intended.",corrected:"Use s1.equals(s2)."},
    {id:"strings-err-3",question:"System.out.println(s.length);",error:"String length is a method.",corrected:"System.out.println(s.length());"},
    {id:"strings-err-4",question:"s.substring(2,5) is assumed to include index 5.",error:"The end index is exclusive.",corrected:"It includes indexes 2,3,4."}
  ],

  challengeProblems: [
    {id:"strings-ch-1",title:"Longest palindromic word",question:"Accept a sentence and print the longest word that is a palindrome. If no word qualifies, display an appropriate message."},
    {id:"strings-ch-2",title:"Character with maximum frequency",question:"Accept a String and find the alphabetic character occurring most frequently. Ignore case and spaces."},
    {id:"strings-ch-3",title:"Second most frequent character",question:"Accept a String and determine the second-highest character frequency without using collection classes."},
    {id:"strings-ch-4",title:"String array ranking",question:"Accept an array of names and arrange them alphabetically using a suitable sorting technique, then search for a requested name."}
  ],

  revisionNotes: [
    "String index starts at 0; last index = length()-1.",
    "String uses length(); arrays use length.",
    "charAt() returns char; substring() returns String.",
    "substring(begin,end) includes begin and excludes end.",
    "indexOf()/lastIndexOf() return -1 when the target is absent.",
    "equals() compares content; == compares references.",
    "compareTo() is used for lexicographic ordering.",
    "String is immutable.",
    "Difficult ISC questions usually combine String methods with loops, conditions and arrays.",
    "For word problems, identify word boundaries first and then use substring()."
  ],

  chapterSummary: {
    keyPoints: [
      "See a String as indexed characters.",
      "Master access, extraction, search, comparison and transformation methods.",
      "Use loops to turn individual String methods into algorithms.",
      "Use frequency and symmetric-position logic for advanced problems.",
      "The Class X foundation should directly support ISC XII application questions."
    ]
  },

  examTricks: [
    "Write indexes below the String before tracing.",
    "Circle the excluded end index in substring().",
    "Do not write compareTo() answers as only -1/0/1; only the sign and zero have guaranteed meaning.",
    "For palindrome, compare s.charAt(i) with s.charAt(n-1-i).",
    "For frequency, scan every character and maintain a counter.",
    "For sentence questions, first separate the problem into word extraction and word processing."
  ],

  practiceTest: {
    instructions:"Attempt output questions by writing indexes. Attempt programming questions without using ready-made reverse/sort utilities.",
    questions:[
      {id:"strings-test-1",type:"output",question:"String s=\"EDUCATION\"; System.out.println(s.substring(2,6));",answer:"UCAT"},
      {id:"strings-test-2",type:"output",question:"String s=\"BANANA\"; System.out.println(s.indexOf('A')+s.lastIndexOf('A'));",answer:"6"},
      {id:"strings-test-3",type:"concept",question:"Why is equals() preferred to == for String content?",answer:"equals() compares content; == compares references."},
      {id:"strings-test-4",type:"programming",question:"Write a program to count the frequency of each vowel.",answer:"Use a vowel-selection loop and a complete character scan."},
      {id:"strings-test-5",type:"programming",question:"Write a program to print the longest palindrome word in a sentence.",answer:"Extract words, test each word for palindrome, and track the longest."}
    ]
  }
};

export default chapter10;
