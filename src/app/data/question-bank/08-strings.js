const chapter8 = {
  id: 8,
  title: "String Handling",
  slug: "strings",
  description: "Master String class methods, StringBuilder, StringBuffer, and string manipulation techniques.",
  topics: ["String Methods", "StringBuilder", "StringBuffer", "Manipulation", "Comparison"],

  mcqs: [
    {
      id: "CH08-MCQ-001", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Basics",
      question: "Which of the following is true about String in Java?",
      options: ["A) String is a primitive data type", "B) String is immutable", "C) String is mutable", "D) String cannot be compared"],
      correctAnswer: "B", explanation: "String objects in Java are immutable — once created, their value cannot be changed.",
      hint: "Can you change the characters of a String after it is created?", estimatedTime: 15, marks: 1, tags: ["immutable", "String class"]
    },
    {
      id: "CH08-MCQ-002", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Methods",
      question: "Which method returns the number of characters in a String?",
      options: ["A) length", "B) length()", "C) size()", "D) getLength()"],
      correctAnswer: "B", explanation: "String uses length() method (with parentheses). Arrays use length property (without parentheses).",
      hint: "Is it length or length() for Strings?", estimatedTime: 10, marks: 1, tags: ["length()", "method"]
    },
    {
      id: "CH08-MCQ-003", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "String Comparison",
      question: "What will be the output?\nString s1 = \"Hello\";\nString s2 = \"Hello\";\nSystem.out.println(s1 == s2);",
      options: ["A) true", "B) false", "C) Hello", "D) Compilation error"],
      correctAnswer: "A", explanation: "Due to string interning, both s1 and s2 refer to the same object in the string pool. So == returns true.",
      hint: "What is string interning?", estimatedTime: 25, marks: 1, tags: ["string pool", "==", "interning"]
    },
    {
      id: "CH08-MCQ-004", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "String Comparison",
      question: "What should be used to compare the content of two Strings?",
      options: ["A) ==", "B) .equals()", "C) .compare()", "D) ="],
      correctAnswer: "B", explanation: "The .equals() method compares the actual content of strings. == compares references.",
      hint: "Which method compares the actual characters of the string?", estimatedTime: 15, marks: 1, tags: ["equals", "content comparison"]
    },
    {
      id: "CH08-MCQ-005", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "String Methods",
      question: "What will be the output?\nString str = \"Programming\";\nSystem.out.println(str.substring(3, 7));",
      options: ["A) gram", "B) gramm", "C) prog", "D) ramm"],
      correctAnswer: "A", explanation: "substring(3, 7) extracts characters from index 3 (inclusive) to index 7 (exclusive). Result: 'gram'.",
      hint: "substring(beginIndex, endIndex) — endIndex is exclusive.", estimatedTime: 25, marks: 2, tags: ["substring", "index"]
    },
    {
      id: "CH08-MCQ-006", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "StringBuilder",
      question: "Which class should be used for efficient string manipulation when many modifications are needed?",
      options: ["A) String", "B) StringBuilder", "C) StringBuffer", "D) Both B and C"],
      correctAnswer: "D", explanation: "Both StringBuilder and StringBuffer are mutable and efficient. StringBuilder is faster but not thread-safe. StringBuffer is thread-safe but slower.",
      hint: "Which classes are mutable alternatives to String?", estimatedTime: 20, marks: 1, tags: ["StringBuilder", "StringBuffer", "mutable"]
    },
    {
      id: "CH08-MCQ-007", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "String Methods",
      question: "What will be the output?\nString s = \"Java\";\ns.concat(\" Programming\");\nSystem.out.println(s);",
      options: ["A) Java Programming", "B) Java", "C) Java Programming Programming", "D) Compilation error"],
      correctAnswer: "B", explanation: "concat() returns a new String but the original String s is unchanged (Strings are immutable).",
      hint: "Are Strings mutable? What happens to the result of concat()?", estimatedTime: 20, marks: 2, tags: ["immutable", "concat", "assignment"]
    },
    {
      id: "CH08-MCQ-008", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Methods",
      question: "Which method converts a String to uppercase?",
      options: ["A) toUpperCase()", "B) toUpper()", "C) upperCase()", "D) changeCase(true)"],
      correctAnswer: "A", explanation: "String.toUpperCase() returns a new string converted to uppercase.",
      hint: "The method name follows camelCase convention.", estimatedTime: 10, marks: 1, tags: ["toUpperCase", "case conversion"]
    }
  ],

  assertionReasons: [
    {
      id: "CH08-AR-001", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "Immutability",
      question: "Assertion (A): String objects in Java are immutable.\nReason (R): Once a String object is created, its value cannot be changed.",
      options: ["A) Both A and R are true, and R is the correct explanation of A", "B) Both A and R are true, but R is NOT the correct explanation of A", "C) A is true, but R is false", "D) A is false, but R is true"],
      correctAnswer: "A", explanation: "Immutability means unchangeable. String objects cannot be modified after creation.",
      hint: "What does 'immutable' mean?", estimatedTime: 15, marks: 2, tags: ["immutable", "definition"]
    },
    {
      id: "CH08-AR-002", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "String Pool",
      question: "Assertion (A): String literals in Java are stored in a special memory area called the string pool.\nReason (R): The string pool allows reuse of String objects, saving memory.",
      options: ["A) Both A and R are true, and R is the correct explanation of A", "B) Both A and R are true, but R is NOT the correct explanation of A", "C) A is true, but R is false", "D) A is false, but R is true"],
      correctAnswer: "A", explanation: "String literals are stored in the string pool. If the same string literal appears again, Java reuses the existing object.",
      hint: "What memory optimization does Java use for string literals?", estimatedTime: 20, marks: 2, tags: ["string pool", "memory", "interning"]
    },
    {
      id: "CH08-AR-003", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "StringBuilder vs StringBuffer",
      question: "Assertion (A): StringBuilder is faster than StringBuffer.\nReason (R): StringBuilder methods are not synchronized, while StringBuffer methods are synchronized.",
      options: ["A) Both A and R are true, and R is the correct explanation of A", "B) Both A and R are true, but R is NOT the correct explanation of A", "C) A is true, but R is false", "D) A is false, but R is true"],
      correctAnswer: "A", explanation: "Synchronization adds overhead. StringBuilder methods are not synchronized, so they execute faster.",
      hint: "What does synchronization do to performance?", estimatedTime: 20, marks: 2, tags: ["StringBuilder", "StringBuffer", "synchronization"]
    },
    {
      id: "CH08-AR-004", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Methods",
      question: "Assertion (A): String s = \"\" creates an empty string.\nReason (R): An empty string has length 0.",
      options: ["A) Both A and R are true, and R is the correct explanation of A", "B) Both A and R are true, but R is NOT the correct explanation of A", "C) A is true, but R is false", "D) A is false, but R is true"],
      correctAnswer: "B", explanation: "Both statements are true. \"\" does create an empty string, and its length is 0.",
      hint: "An empty string has no characters.", estimatedTime: 10, marks: 2, tags: ["empty string", "length 0"]
    }
  ],

  trueFalse: [
    { id: "CH08-TF-001", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Comparison", question: "The == operator compares the content of two String objects.", correctAnswer: "False", explanation: "== compares object references (memory addresses), not content. Use .equals() to compare String content.", hint: "Does == look at the characters or the memory location?", estimatedTime: 10, marks: 1, tags: ["==", "reference"] },
    { id: "CH08-TF-002", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "The String method charAt(index) returns the character at the specified index.", correctAnswer: "True", explanation: "charAt(int index) returns the char value at the specified index (0-based).", hint: "What method returns a character from a specific position?", estimatedTime: 10, marks: 1, tags: ["charAt", "method"] },
    { id: "CH08-TF-003", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "StringBuilder", question: "StringBuilder objects are immutable.", correctAnswer: "False", explanation: "StringBuilder objects are mutable — their content can be changed without creating new objects.", hint: "Is StringBuilder mutable or immutable?", estimatedTime: 10, marks: 1, tags: ["StringBuilder", "mutable"] },
    { id: "CH08-TF-004", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "The replace() method in String modifies the original string.", correctAnswer: "False", explanation: "replace() returns a new String with replacements made. The original String remains unchanged.", hint: "Does replace() change the original string or create a new one?", estimatedTime: 15, marks: 1, tags: ["replace", "immutable"] },
    { id: "CH08-TF-005", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "String Pool", question: "Strings created with the 'new' keyword are stored in the string pool.", correctAnswer: "False", explanation: "Strings created with 'new String(...)' are stored in the heap (not the pool). Only string literals are stored in the pool.", hint: "Are all String objects stored in the string pool or only literals?", estimatedTime: 20, marks: 1, tags: ["string pool", "new", "intern"] }
  ],

  fillBlanks: [
    { id: "CH08-FIB-001", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "The ________ method of String class returns the character at a given index.", correctAnswer: "charAt()", explanation: "charAt(int index) returns the char at the specified position.", hint: "It returns a single character from a position.", estimatedTime: 10, marks: 1, tags: ["charAt", "character"] },
    { id: "CH08-FIB-002", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "The ________ method checks if a String ends with a specified suffix.", correctAnswer: "endsWith()", explanation: "endsWith(String suffix) returns true if the string ends with the specified suffix.", hint: "It checks the ending of a string.", estimatedTime: 10, marks: 1, tags: ["endsWith", "suffix"] },
    { id: "CH08-FIB-003", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "The ________ method removes leading and trailing whitespace from a String.", correctAnswer: "trim()", explanation: "trim() returns a copy of the string with leading and trailing whitespace removed.", hint: "It 'trims' extra space from both ends.", estimatedTime: 10, marks: 1, tags: ["trim", "whitespace"] },
    { id: "CH08-FIB-004", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "StringBuilder", question: "The ________ method of StringBuilder appends a string representation of various data types.", correctAnswer: "append()", explanation: "append() adds the specified value to the end of the StringBuilder.", hint: "It 'adds' to the end of the StringBuilder.", estimatedTime: 10, marks: 1, tags: ["append", "StringBuilder"] },
    { id: "CH08-FIB-005", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "The ________ method splits a String into an array of substrings based on a delimiter.", correctAnswer: "split()", explanation: "split(String regex) divides the string around matches of the given regular expression.", hint: "It 'splits' a string into parts.", estimatedTime: 15, marks: 1, tags: ["split", "delimiter", "regex"] }
  ],

  outputQuestions: [
    { id: "CH08-OUT-001", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "What will be the output?\nString s = \"Hello World\";\nSystem.out.println(s.length());", correctAnswer: "11", explanation: "\"Hello World\" has 11 characters (including the space).", hint: "Count all characters including the space.", estimatedTime: 10, marks: 1, tags: ["length", "space"] },
    { id: "CH08-OUT-002", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "What will be the output?\nString str = \"Java Programming\";\nSystem.out.println(str.indexOf('a'));", correctAnswer: "1", explanation: "indexOf('a') returns the first occurrence of 'a'. In 'Java Programming', the first 'a' is at index 1.", hint: "indexOf returns the first occurrence from the beginning.", estimatedTime: 15, marks: 1, tags: ["indexOf", "first occurrence"] },
    { id: "CH08-OUT-003", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "StringBuilder", question: "What will be the output?\nStringBuilder sb = new StringBuilder(\"Hello\");\nsb.append(\" World\");\nSystem.out.println(sb.toString());", correctAnswer: "Hello World", explanation: "StringBuilder is mutable, so append() modifies the existing object.", hint: "Does append() modify the StringBuilder object itself?", estimatedTime: 15, marks: 2, tags: ["StringBuilder", "append", "toString"] },
    { id: "CH08-OUT-004", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "What will be the output?\nString s = \"Mississippi\";\nSystem.out.println(s.replace(\"iss\", \"pp\"));", correctAnswer: "Mippippi", explanation: "replace() replaces ALL occurrences of \"iss\" with \"pp\". 'Mississippi' → 'Mippippi'.", hint: "replace() replaces ALL matching substrings, not just the first.", estimatedTime: 25, marks: 2, tags: ["replace", "all occurrences"] },
    { id: "CH08-OUT-005", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "String Comparison", question: "What will be the output?\nString s1 = \"Java\";\nString s2 = new String(\"Java\");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1.equals(s2));", correctAnswer: "false\ntrue", explanation: "s1 is a literal (string pool), s2 is created with new (heap). == compares references (different), .equals() compares content (same).", hint: "What does == compare vs what does .equals() compare?", estimatedTime: 25, marks: 2, tags: ["==", "equals", "string pool"] }
  ],

  errorFinding: [
    { id: "CH08-ERR-001", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "Find the error:\nString str = \"Hello\";\nchar c = str.charAt(10);\nSystem.out.println(c);", correctAnswer: "Index 10 is out of bounds. String \"Hello\" has length 5, valid indices are 0-4.", explanation: "charAt(10) throws StringIndexOutOfBoundsException.", hint: "What is the length of \"Hello\"? Is 10 a valid index?", estimatedTime: 10, marks: 1, tags: ["charAt", "index out of bounds"] },
    { id: "CH08-ERR-002", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "String Comparison", question: "Find the logical error:\nString password = \"secret\";\nif (password == \"secret\") {\n    System.out.println(\"Access granted\");\n}", correctAnswer: "Use .equals() instead of == for String content comparison.", explanation: "== compares references, which may fail for non-literal strings. Always use .equals().", hint: "Which method compares String content?", estimatedTime: 15, marks: 2, tags: ["logical error", "==", "equals"] },
    { id: "CH08-ERR-003", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "StringBuilder", question: "Find the error:\nStringBuilder sb = \"Hello\";\nsb.append(\" World\");", correctAnswer: "Cannot assign a String literal to a StringBuilder variable. Use: StringBuilder sb = new StringBuilder(\"Hello\");", explanation: "StringBuilder is a class. You must use the constructor to create an object.", hint: "How do you create a StringBuilder object?", estimatedTime: 15, marks: 1, tags: ["StringBuilder", "constructor"] },
    { id: "CH08-ERR-004", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "Find the error:\nString str = \"ABCDEF\";\nString sub = str.substring(2, 2);\nSystem.out.println(sub);", correctAnswer: "substring(2, 2) returns an empty string, not an error. This is valid but may not be the intended behavior.", explanation: "substring(begin, end) where begin == end returns an empty string. This is valid Java but may be a logical error.", hint: "What does substring(2, 2) return?", estimatedTime: 15, marks: 2, tags: ["substring", "empty string"] },
    { id: "CH08-ERR-005", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "Find the error:\nString s = null;\nSystem.out.println(s.length());", correctAnswer: "NullPointerException. Calling a method on a null reference throws NullPointerException.", explanation: "s is null, so calling s.length() throws NullPointerException at runtime.", hint: "What happens when you call a method on null?", estimatedTime: 15, marks: 2, tags: ["null pointer", "NullPointerException"] }
  ],

  programmingQuestions: [
    { id: "CH08-PRQ-001", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Methods", problemStatement: "Write a Java program to count the number of vowels in a string. Test with \"Programming\".", input: "No input required (string = \"Programming\").", output: "Number of vowels: 3", constraints: "Count a, e, i, o, u (case-insensitive).", logic: "Convert to lowercase, iterate through characters, check if each is a vowel.", solution: `public class VowelCounter {\n    public static void main(String[] args) {\n        String str = "Programming".toLowerCase();\n        int count = 0;\n        for (int i = 0; i < str.length(); i++) {\n            char c = str.charAt(i);\n            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {\n                count++;\n            }\n        }\n        System.out.println("Number of vowels: " + count);\n    }\n}`, solutionExplanation: "1. Convert string to lowercase for case-insensitive comparison.\n2. Loop through each character.\n3. Check if character is a vowel.\n4. Count and print the result.", sampleTestCases: [{ input: "Programming", output: "Number of vowels: 3" }], estimatedTime: 240, marks: 4, tags: ["vowels", "string traversal", "counting"] },
    { id: "CH08-PRQ-002", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "StringBuilder", problemStatement: "Write a Java program to reverse a string using StringBuilder. Test with \"Hello World\".", input: "No input required (string = \"Hello World\").", output: "Reversed: dlroW olleH", constraints: "Use StringBuilder's reverse() method.", logic: "Create a StringBuilder from the string, call reverse(), convert back to String.", solution: `public class ReverseString {\n    public static void main(String[] args) {\n        String str = "Hello World";\n        StringBuilder sb = new StringBuilder(str);\n        sb.reverse();\n        System.out.println("Reversed: " + sb.toString());\n    }\n}`, solutionExplanation: "1. Create a StringBuilder from the input string.\n2. Call reverse() to reverse the content.\n3. Convert back to String using toString().\n4. Print the result.", sampleTestCases: [{ input: "Hello World", output: "Reversed: dlroW olleH" }], estimatedTime: 240, marks: 4, tags: ["StringBuilder", "reverse"] },
    { id: "CH08-PRQ-003", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "String Methods", problemStatement: "Write a Java program to check if a string is a palindrome (reads the same forwards and backwards). Test with \"madam\".", input: "No input required (string = \"madam\").", output: "madam is a palindrome", constraints: "Use equals() and reverse() for comparison.", logic: "Compare the original string with its reverse. If they are equal, it's a palindrome.", solution: `public class PalindromeCheck {\n    public static void main(String[] args) {\n        String str = "madam";\n        String reversed = new StringBuilder(str).reverse().toString();\n        if (str.equals(reversed)) {\n            System.out.println(str + " is a palindrome");\n        } else {\n            System.out.println(str + " is not a palindrome");\n        }\n    }\n}`, solutionExplanation: "1. Create a StringBuilder from the string.\n2. Reverse it and convert back to String.\n3. Compare original and reversed using .equals().\n4. If equal, it's a palindrome.", sampleTestCases: [{ input: "madam", output: "madam is a palindrome" }, { input: "hello", output: "hello is not a palindrome" }], estimatedTime: 300, marks: 5, tags: ["palindrome", "StringBuilder", "equals"] }
  ],

  debuggingQuestions: [
    { id: "CH08-DBG-001", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "The following code intends to check if a string starts with 'A'. Identify and fix the error:\nString str = \"Apple\";\nif (str.charAt(0) == 'A') {\n    System.out.println(\"Starts with A\");\n}", correctAnswer: "The code is correct but not the best approach. Use str.startsWith(\"A\") instead for clarity and robustness.", explanation: "While charAt(0) works, startsWith() is the proper method for this check. It also handles empty strings gracefully.", hint: "Is there a built-in method for checking prefixes?", estimatedTime: 15, marks: 1, tags: ["startsWith", "best practice"] },
    { id: "CH08-DBG-002", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "String Comparison", question: "The following code intends to compare two strings. Identify and fix the error:\nString s1 = \"Hello\";\nString s2 = \"hello\";\nif (s1 == s2) {\n    System.out.println(\"Equal\");\n}", correctAnswer: "Use s1.equalsIgnoreCase(s2) instead of ==. The strings differ in case, and == compares references.", explanation: "== compares references, not content. For case-insensitive comparison, use equalsIgnoreCase().", hint: "How do you compare strings ignoring case?", estimatedTime: 15, marks: 2, tags: ["equalsIgnoreCase", "case"] },
    { id: "CH08-DBG-003", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "StringBuilder", question: "The following code intends to build a string by appending numbers 1 to 5. Identify and fix the error:\nStringBuilder sb = new StringBuilder();\nfor (int i = 1; i <= 5; i++) {\n    sb = sb.append(i);\n}\nSystem.out.println(sb.toString());", correctAnswer: "The assignment 'sb = sb.append(i)' is unnecessary. append() returns the same StringBuilder object. Just use sb.append(i);", explanation: "StringBuilder.append() returns 'this' (the same object). The assignment is redundant but not an error. It works correctly but is not idiomatic.", hint: "Does append() return a new object or the same object?", estimatedTime: 15, marks: 2, tags: ["append", "redundant", "return this"] }
  ],

  caseBasedQuestions: [
    { id: "CH08-CBQ-001", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "A school has a student database where each student's full name is stored as a single string in the format \"FirstName LastName\".\n\na) Write a method to extract the first name.\nb) Write a method to extract the last name.\nc) Write a method to get the initials (e.g., \"John Doe\" → \"J.D.\").\nd) Test with \"Priya Sharma\".", correctAnswer: "a) str.substring(0, str.indexOf(' '))\nb) str.substring(str.indexOf(' ') + 1)\nc) (str.charAt(0) + \".\" + str.substring(str.indexOf(' ')+1).charAt(0) + \".\")\nd) First: Priya, Last: Sharma, Initials: P.S.", explanation: "Use indexOf(' ') to find the space, then substring to extract parts. For initials, get the first character of each part.", hint: "How do you find the position of the space between first and last name?", estimatedTime: 60, marks: 5, tags: ["substring", "indexOf", "name parsing"] },
    { id: "CH08-CBQ-002", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "StringBuilder", question: "A text editor needs to implement a 'find and replace all' feature.\n\na) Write a method using StringBuilder to replace all occurrences of a word in a text.\nb) Test with text=\"The cat sat on the mat\", find=\"the\", replace=\"dog\".\nc) How would you make the search case-insensitive?\nd) What is the time complexity of your approach?", correctAnswer: "a) Use StringBuilder, find indexOf, replace, repeat until no more matches.\nb) Result: \"The dog sat on the mat\" (only 'The' matches if case-sensitive).\nc) Convert both to lowercase for comparison, but preserve original case in output.\nd) O(n*m) where n is text length and m is number of replacements.", explanation: "StringBuilder allows efficient in-place modifications. Use indexOf to find occurrences and replace to modify.", hint: "How do you repeatedly find and replace in a StringBuilder?", estimatedTime: 75, marks: 5, tags: ["StringBuilder", "replace", "indexOf"] }
  ],

  vivaQuestions: [
    { id: "CH08-VIV-001", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Basics", question: "What is a String in Java? Why is it special?", sampleAnswer: "A String is a class in Java that represents a sequence of characters. It is special because: 1) It is immutable, 2) String literals are stored in the string pool for memory efficiency, 3) It has many useful built-in methods, 4) It is one of the most commonly used classes.", estimatedTime: 20, marks: 2, tags: ["String", "special", "immutable"] },
    { id: "CH08-VIV-002", difficulty: "easy", chapter: "String Handling", chapterId: 8, topic: "String Comparison", question: "How do you compare two strings in Java? Explain the difference between == and .equals().", sampleAnswer: "== compares object references (memory addresses). .equals() compares the actual content of strings. For content comparison, always use .equals(). For case-insensitive comparison, use equalsIgnoreCase().", estimatedTime: 15, marks: 2, tags: ["comparison", "==", "equals"] },
    { id: "CH08-VIV-003", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "StringBuilder", question: "What is the difference between String, StringBuilder, and StringBuffer?", sampleAnswer: "String is immutable. StringBuilder and StringBuffer are mutable. StringBuilder is not thread-safe (faster). StringBuffer is thread-safe (slower). Use String for constant strings, StringBuilder for single-threaded modifications, StringBuffer for multi-threaded modifications.", estimatedTime: 20, marks: 2, tags: ["String", "StringBuilder", "StringBuffer"] },
    { id: "CH08-VIV-004", difficulty: "medium", chapter: "String Handling", chapterId: 8, topic: "String Pool", question: "What is the string pool in Java? How does it work?", sampleAnswer: "The string pool is a special memory area in the heap where string literals are stored. When a string literal is created, Java checks if it already exists in the pool. If it does, the existing object is reused. If not, a new object is created and added to the pool. This saves memory.", estimatedTime: 20, marks: 2, tags: ["string pool", "memory", "interning"] },
    { id: "CH08-VIV-005", difficulty: "hard", chapter: "String Handling", chapterId: 8, topic: "String Methods", question: "What are some commonly used String methods? Give examples.", sampleAnswer: "1) length() - returns string length. 2) charAt(int) - returns character at index. 3) substring(int, int) - extracts a portion. 4) indexOf(String) - finds position of substring. 5) equals(String) - compares content. 6) replace(char, char) - replaces characters. 7) toUpperCase()/toLowerCase() - changes case. 8) trim() - removes whitespace. 9) split(String) - splits into array.", estimatedTime: 25, marks: 3, tags: ["methods", "examples"] }
  ]
};

export default chapter8;
</arg_value>
<task_progress>
- [x] Create question-bank directory
- [x] Chapter 1: Introduction to Java
- [x] Chapter 2: Variables & Data Types
- [x] Chapter 3: Operators
- [x] Chapter 4: Conditional Constructs (If-Else)
- [x] Chapter 5: Looping Constructs
- [x] Chapter 6: Methods
- [x] Chapter 7: Arrays
- [x] Chapter 8: String Handling
- [ ] Chapter 9: Constructors
- [ ] Chapter 10: Encapsulation / User-Defined Classes
- [ ] Chapter 11: Inheritance
- [ ] Chapter 12: Polymorphism
- [ ] Chapter 13: Library Classes
- [ ] Chapter 14: Recursion
- [ ] Chapter 15: Searching & Sorting
- [ ] Chapter 16: Exception Handling
- [ ] Chapter 17: Input/Output
- [ ] Chapter 18: Packages & Access Modifiers
- [ ] Chapter 19: OOP Concepts Overview
- [ ] Create index.js master export
</task_progress></tool_call>