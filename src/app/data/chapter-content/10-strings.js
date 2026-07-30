const chapter10 = {
  id: "10-strings",
  title: "STRINGS",
  slug: "strings",
  subject: "Java Programming",
  difficulty: "Intermediate",
  estimatedTime: 260,
  topics: [
    "strings",
    "String class",
    "string creation",
    "string methods",
    "character extraction",
    "charAt",
    "substring",
    "string comparison",
    "equals",
    "compareTo",
    "searching in strings",
    "indexOf",
    "lastIndexOf",
    "case conversion",
    "toUpperCase",
    "toLowerCase",
    "palindrome",
    "frequency counting",
    "string manipulation",
    "string concatenation",
    "immutable strings",
    "StringBuffer",
  ],

  // ========== 1. INTRODUCTION ==========
  introduction: {
    description:
      "A String is a sequence of characters used to represent text in programming. In Java, strings are objects of the String class, which is part of the java.lang package. Unlike many other programming languages where strings are primitive data types, Java treats strings as objects, providing a rich set of methods for manipulation. Strings in Java are immutable, meaning once created, their content cannot be changed. Any operation that appears to modify a string actually creates a new string object. Understanding strings is crucial as they are used extensively in almost every Java program for input, output, and data processing.",
    realLifeExamples: [
      "A person's name — stored as a string of characters.",
      "A student's roll number — represented as a string.",
      "A password — stored as a string for authentication.",
      "A message or SMS — composed of characters in a string.",
      "A book title or author name — stored as strings.",
      "An email address — a string containing '@' and '.' characters.",
      "A phone number — stored as a string to preserve leading zeros.",
      "A URL or web address — a string with special characters.",
      "A product code or barcode — represented as a string.",
      "A sentence or paragraph — a sequence of words in a string.",
    ],
    commonMistakes: [
      "Using == to compare strings instead of equals() — == compares references, not content.",
      "Forgetting that strings are immutable — any modification creates a new string.",
      "Confusing == and equals() — == checks reference equality, equals() checks content equality.",
      "Not handling null strings before calling methods — causes NullPointerException.",
      "Using wrong index in substring() — substring(beginIndex, endIndex) excludes endIndex.",
      "Forgetting that string indices start at 0, not 1.",
      "Assuming strings can be modified directly — they cannot, use StringBuilder instead.",
      "Not understanding that string literals are stored in the string pool.",
      "Using charAt() with invalid index — causes StringIndexOutOfBoundsException.",
      "Confusing toLowerCase() and toUpperCase() — they return new strings, don't modify original.",
    ],
    whereUsed: [
      "Storing and manipulating text data (names, addresses, descriptions).",
      "User input and output operations.",
      "File processing and data parsing.",
      "Password handling and authentication.",
      "URL and file path manipulation.",
      "Text processing and analysis.",
      "Pattern matching and validation.",
      "Database operations and SQL queries.",
      "Web development and API communication.",
      "Game development for player names, scores, and messages.",
    ],
  },

  // ========== 2. THEORY NOTES ==========
  theoryNotes: {
    beginnerExplanation:
      "A String in Java is a sequence of characters. You can create a string using string literals (double quotes) or using the new keyword. For example, String s1 = 'hello'; or String s2 = new String('world');. Strings are immutable, meaning once created, you cannot change the characters in the string. If you try to modify a string, Java creates a new string object with the modified content. The String class provides many useful methods like length(), charAt(), substring(), indexOf(), equals(), toUpperCase(), toLowerCase(), etc. These methods make it easy to work with text data.",
    importantPoints: [
      "String is a class in java.lang package, not a primitive data type.",
      "Strings are immutable — once created, content cannot be changed.",
      "String literals are stored in the String Pool (memory optimization).",
      "String s = 'hello'; creates a string in the pool.",
      "String s = new String('hello'); creates a string in the heap memory.",
      "Use equals() to compare string content, not ==.",
      "== compares references (memory addresses), equals() compares content.",
      "String indices start at 0, just like arrays.",
      "charAt(index) returns the character at the specified index.",
      "substring(begin, end) returns characters from begin to end-1.",
      "length() returns the number of characters in the string.",
      "indexOf(str) returns the index of the first occurrence of str.",
      "lastIndexOf(str) returns the index of the last occurrence of str.",
      "toUpperCase() and toLowerCase() convert case and return new strings.",
      "StringBuffer and StringBuilder are mutable alternatives to String.",
    ],
    memoryTricks: [
      "STRING = 'Sequence of Text Represented In Numeric Graphics' — sequence of characters.",
      "Immutable: 'Once created, never changed' — any modification creates new string.",
      "String Pool: 'Share and save memory' — identical literals share same memory.",
      "== vs equals(): '== checks address, equals() checks content'.",
      "Indices start at 0: 'Zero is the hero' — first character is at index 0.",
      "substring(begin, end): 'Begin is included, end is excluded' — end-1 is last char.",
      "length() is a method: 'Parentheses matter' — s.length() not s.length.",
      "charAt: 'Character at position' — returns char at specified index.",
    ],
    examTips: [
      "Always use equals() to compare strings, never use ==.",
      "Strings are immutable — any operation creates a new string.",
      "String literals are stored in the String Pool for memory efficiency.",
      "s.length() returns the number of characters (method with parentheses).",
      "String indices start at 0, last index is length()-1.",
      "substring(beginIndex, endIndex) — beginIndex is included, endIndex is excluded.",
      "indexOf() returns -1 if substring is not found.",
      "toUpperCase() and toLowerCase() return new strings, they don't modify the original.",
      "compareTo() compares strings lexicographically (dictionary order).",
      "StringBuffer is mutable and thread-safe, StringBuilder is mutable but not thread-safe.",
      "For string concatenation, use + operator or concat() method.",
      "trim() removes leading and trailing whitespace.",
      "startsWith() and endsWith() check if string starts/ends with specified prefix/suffix.",
      "contains() checks if string contains specified character sequence.",
      "Practice palindrome, anagram, and frequency counting programs — frequently asked.",
    ],
  },

  // ========== 3. SYNTAX ==========
  syntax: {
    code: `// Creating strings
String s1 = "hello";                    // String literal (stored in pool)
String s2 = new String("world");        // Using new keyword (stored in heap)
String s3 = "hello";                    // Same as s1, refers to same pool object

// String length
int len = s1.length();                  // returns 5

// Character at index
char ch = s1.charAt(0);                 // returns 'h'

// Substring
String sub1 = s1.substring(1, 3);       // returns "el" (index 1 to 2)
String sub2 = s1.substring(2);          // returns "llo" (index 2 to end)

// String comparison
boolean isEqual = s1.equals(s2);        // compares content
boolean isSame = (s1 == s3);            // compares references
int compare = s1.compareTo(s2);         // lexicographic comparison

// Searching
int index1 = s1.indexOf('l');           // returns 2 (first occurrence)
int index2 = s1.lastIndexOf('l');       // returns 3 (last occurrence)
int index3 = s1.indexOf("ll");          // returns 2
int index4 = s1.indexOf("xyz");         // returns -1 (not found)

// Case conversion
String upper = s1.toUpperCase();        // returns "HELLO"
String lower = s1.toLowerCase();        // returns "hello"

// Checking string content
boolean starts = s1.startsWith("he");   // returns true
boolean ends = s1.endsWith("lo");       // returns true
boolean contains = s1.contains("ell");  // returns true

// Trimming
String trimmed = "  hello  ".trim();    // returns "hello"

// Concatenation
String s4 = s1 + " " + s2;              // returns "hello world"
String s5 = s1.concat(" ").concat(s2);  // returns "hello world"`,
    breakdown: [
      {
        keyword: "String s1 = 'hello'",
        explanation:
          "Creates a string using string literal. The string 'hello' is stored in the String Pool. If another string with same content is created, it references the same pool object.",
      },
      {
        keyword: "new String('world')",
        explanation:
          "Creates a string using new keyword. The string is stored in heap memory, not in the pool. Even if same content exists in pool, a new object is created.",
      },
      {
        keyword: "s1.length()",
        explanation:
          "Returns the number of characters in the string. Note: length() is a method (with parentheses), not a property like arrays.",
      },
      {
        keyword: "s1.charAt(0)",
        explanation:
          "Returns the character at index 0. String indices start at 0, so charAt(0) returns the first character.",
      },
      {
        keyword: "s1.substring(1, 3)",
        explanation:
          "Returns a substring from index 1 to 2 (endIndex is exclusive). substring(beginIndex, endIndex) includes beginIndex but excludes endIndex.",
      },
    ],
    variations: {
      creation: {
        code: `// Different ways to create strings
String s1 = "hello";                    // String literal
String s2 = new String();               // Empty string
String s3 = new String("hello");        // Using new keyword
char[] arr = {'h', 'e', 'l', 'l', 'o'};
String s4 = new String(arr);            // From character array
String s5 = String.valueOf(123);        // From other data types`,
        explanation:
          "Strings can be created using literals, new keyword, character arrays, or by converting other data types.",
      },
      comparison: {
        code: `// String comparison methods
String s1 = "hello";
String s2 = "hello";
String s3 = new String("hello");

// == operator (compares references)
System.out.println(s1 == s2);           // true (same pool object)
System.out.println(s1 == s3);           // false (different objects)

// equals() method (compares content)
System.out.println(s1.equals(s3));      // true (same content)

// compareTo() method (lexicographic)
System.out.println(s1.compareTo(s2));   // 0 (equal)
System.out.println("abc".compareTo("xyz"));  // negative (abc < xyz)`,
        explanation:
          "Use == to compare references, equals() to compare content, compareTo() for lexicographic comparison.",
      },
      manipulation: {
        code: `// String manipulation methods
String s = "Hello World";

// Concatenation
String s1 = s + " Java";                // "Hello World Java"
String s2 = s.concat(" Java");          // "Hello World Java"

// Case conversion
String upper = s.toUpperCase();         // "HELLO WORLD"
String lower = s.toLowerCase();         // "hello world"

// Trimming
String trimmed = "  hello  ".trim();    // "hello"

// Replacing
String replaced = s.replace('o', 'a');  // "Hella Warld"
String replaced2 = s.replace("World", "Java");  // "Hello Java"

// Splitting
String[] words = s.split(" ");          // ["Hello", "World"]`,
        explanation:
          "Strings can be manipulated using various methods. Note that all these methods return new strings, they don't modify the original.",
      },
      searching: {
        code: `// Searching in strings
String s = "hello world hello";

// indexOf - first occurrence
int idx1 = s.indexOf('l');              // returns 2
int idx2 = s.indexOf("lo");             // returns 3
int idx3 = s.indexOf("xyz");            // returns -1

// lastIndexOf - last occurrence
int idx4 = s.lastIndexOf('l');          // returns 9
int idx5 = s.lastIndexOf("hello");      // returns 12

// From index
int idx6 = s.indexOf('l', 5);           // returns 9 (search from index 5)

// contains
boolean has = s.contains("world");      // returns true

// startsWith and endsWith
boolean start = s.startsWith("he");     // returns true
boolean end = s.endsWith("lo");         // returns true`,
        explanation:
          "String searching methods help find characters or substrings. indexOf() finds first occurrence, lastIndexOf() finds last occurrence.",
      },
    },
  },

  // ========== 4. EXAMPLES ==========
  examples: {
    basic: [
      {
        id: "string-ex-b-1",
        title: "Create and print strings",
        code: `String s1 = "hello";
String s2 = new String("world");

System.out.println("s1: " + s1);
System.out.println("s2: " + s2);
System.out.println("Length of s1: " + s1.length());
System.out.println("Character at index 1: " + s1.charAt(1));`,
        output: "s1: hello\ns2: world\nLength of s1: 5\nCharacter at index 1: e",
        explanation: [
          "Step 1: Create two strings using different methods.",
          "Step 2: s1 is created using literal (stored in pool).",
          "Step 3: s2 is created using new keyword (stored in heap).",
          "Step 4: length() returns 5 (number of characters).",
          "Step 5: charAt(1) returns 'e' (second character, index 1).",
        ],
      },
      {
        id: "string-ex-b-2",
        title: "String comparison",
        code: `String s1 = "hello";
String s2 = "hello";
String s3 = new String("hello");
String s4 = "world";

System.out.println("s1 == s2: " + (s1 == s2));           // true
System.out.println("s1 == s3: " + (s1 == s3));           // false
System.out.println("s1.equals(s3): " + s1.equals(s3));   // true
System.out.println("s1.equals(s4): " + s1.equals(s4));   // false
System.out.println("s1.compareTo(s4): " + s1.compareTo(s4));`,
        output: "s1 == s2: true\ns1 == s3: false\ns1.equals(s3): true\ns1.equals(s4): false\ns1.compareTo(s4): -15",
        explanation: [
          "Step 1: s1 and s2 are string literals with same content, so == returns true.",
          "Step 2: s3 is created with new keyword, so == with s1 returns false.",
          "Step 3: equals() compares content, so s1.equals(s3) returns true.",
          "Step 4: compareTo() returns negative value because 'h' < 'w' lexicographically.",
          "Key point: Always use equals() for string content comparison.",
        ],
      },
      {
        id: "string-ex-b-3",
        title: "Substring operations",
        code: `String s = "Hello World";

System.out.println("Original: " + s);
System.out.println("substring(0, 5): " + s.substring(0, 5));
System.out.println("substring(6): " + s.substring(6));
System.out.println("substring(0, 1): " + s.substring(0, 1));
System.out.println("substring(6, 11): " + s.substring(6, 11));`,
        output: "Original: Hello World\nsubstring(0, 5): Hello\nsubstring(6): World\nsubstring(0, 1): H\nsubstring(6, 11): World",
        explanation: [
          "Step 1: substring(0, 5) returns characters from index 0 to 4 (endIndex is exclusive).",
          "Step 2: substring(6) returns characters from index 6 to end.",
          "Step 3: substring(0, 1) returns only first character.",
          "Step 4: substring(6, 11) returns 'World' (indices 6 to 10).",
          "Key point: endIndex is exclusive in substring().",
        ],
      },
      {
        id: "string-ex-b-4",
        title: "Searching in strings",
        code: `String s = "hello world hello";

System.out.println("indexOf('l'): " + s.indexOf('l'));
System.out.println("lastIndexOf('l'): " + s.lastIndexOf('l'));
System.out.println("indexOf('lo'): " + s.indexOf("lo"));
System.out.println("indexOf('xyz'): " + s.indexOf("xyz"));
System.out.println("contains('world'): " + s.contains("world"));
System.out.println("startsWith('he'): " + s.startsWith("he"));
System.out.println("endsWith('lo'): " + s.endsWith("lo"));`,
        output: "indexOf('l'): 2\nlastIndexOf('l'): 9\nindexOf('lo'): 3\nindexOf('xyz'): -1\ncontains('world'): true\nstartsWith('he'): true\nendsWith('lo'): true",
        explanation: [
          "Step 1: indexOf('l') returns 2 (first 'l' is at index 2).",
          "Step 2: lastIndexOf('l') returns 9 (last 'l' is at index 9).",
          "Step 3: indexOf('lo') returns 3 (substring 'lo' starts at index 3).",
          "Step 4: indexOf('xyz') returns -1 (substring not found).",
          "Step 5: contains() returns true if substring exists.",
          "Key point: indexOf() returns -1 when substring is not found.",
        ],
      },
      {
        id: "string-ex-b-5",
        title: "Case conversion",
        code: `String s = "Hello World";

System.out.println("Original: " + s);
System.out.println("toUpperCase(): " + s.toUpperCase());
System.out.println("toLowerCase(): " + s.toLowerCase());

String s2 = s.toUpperCase();
System.out.println("Original after toUpperCase(): " + s);
System.out.println("New string: " + s2);`,
        output: "Original: Hello World\ntoUpperCase(): HELLO WORLD\ntoLowerCase(): hello world\nOriginal after toUpperCase(): Hello World\nNew string: HELLO WORLD",
        explanation: [
          "Step 1: toUpperCase() converts all characters to uppercase.",
          "Step 2: toLowerCase() converts all characters to lowercase.",
          "Step 3: Original string 's' is not modified (strings are immutable).",
          "Step 4: s2 holds the new uppercase string.",
          "Key point: These methods return new strings, they don't modify the original.",
        ],
      },
      {
        id: "string-ex-b-6",
        title: "String concatenation",
        code: `String s1 = "Hello";
String s2 = "World";

// Using + operator
String s3 = s1 + " " + s2;
System.out.println("Using +: " + s3);

// Using concat() method
String s4 = s1.concat(" ").concat(s2);
System.out.println("Using concat(): " + s4);

// Concatenating with other types
String s5 = s1 + 123;
System.out.println("String + int: " + s5);

String s6 = s1 + 'A';
System.out.println("String + char: " + s6);`,
        output: "Using +: Hello World\nUsing concat(): Hello World\nString + int: Hello123\nString + char: HelloA",
        explanation: [
          "Step 1: + operator concatenates strings.",
          "Step 2: concat() method also concatenates strings.",
          "Step 3: When + is used with string and other type, other type is converted to string.",
          "Step 4: s1 + 123 converts 123 to '123' and concatenates.",
          "Key point: + operator is more commonly used for concatenation.",
        ],
      },
      {
        id: "string-ex-b-7",
        title: "Trimming and checking strings",
        code: `String s = "  Hello World  ";

System.out.println("Original: '" + s + "'");
System.out.println("Trimmed: '" + s.trim() + "'");

System.out.println("startsWith('He'): " + s.trim().startsWith("He"));
System.out.println("endsWith('ld'): " + s.trim().endsWith("ld"));
System.out.println("contains('lo Wo'): " + s.trim().contains("lo Wo"));
System.out.println("isEmpty(): " + "".isEmpty());
System.out.println("length(): " + s.trim().length());`,
        output: "Original: '  Hello World  '\nTrimmed: 'Hello World'\nstartsWith('He'): true\nendsWith('ld'): true\ncontains('lo Wo'): true\nisEmpty(): true\nlength(): 11",
        explanation: [
          "Step 1: trim() removes leading and trailing whitespace.",
          "Step 2: startsWith() checks if string starts with specified prefix.",
          "Step 3: endsWith() checks if string ends with specified suffix.",
          "Step 4: contains() checks if string contains specified sequence.",
          "Step 5: isEmpty() returns true if string length is 0.",
        ],
      },
      {
        id: "string-ex-b-8",
        title: "Replacing characters and substrings",
        code: `String s = "Hello World";

System.out.println("Original: " + s);
System.out.println("replace('o', 'a'): " + s.replace('o', 'a'));
System.out.println("replace('l', 'x'): " + s.replace('l', 'x'));
System.out.println("replace('World', 'Java'): " + s.replace("World", "Java"));
System.out.println("replaceFirst('l', 'x'): " + s.replaceFirst("l", "x"));`,
        output: "Original: Hello World\nreplace('o', 'a'): Hella Warld\nreplace('l', 'x'): Hexxo Worxd\nreplace('World', 'Java'): Hello Java\nreplaceFirst('l', 'x'): Hexlo World",
        explanation: [
          "Step 1: replace(char, char) replaces all occurrences of a character.",
          "Step 2: replace(CharSequence, CharSequence) replaces all occurrences of a substring.",
          "Step 3: replaceFirst() replaces only the first occurrence.",
          "Step 4: All methods return new strings, original is unchanged.",
        ],
      },
      {
        id: "string-ex-b-9",
        title: "Converting string to character array",
        code: `String s = "hello";

// Convert to character array
char[] chars = s.toCharArray();

System.out.println("String: " + s);
System.out.print("Characters: ");
for (int i = 0; i < chars.length; i++) {
    System.out.print(chars[i] + " ");
}

System.out.println("\\nFirst char: " + chars[0]);
System.out.println("Last char: " + chars[chars.length - 1]);`,
        output: "String: hello\nCharacters: h e l l o \nFirst char: h\nLast char: o",
        explanation: [
          "Step 1: toCharArray() converts string to character array.",
          "Step 2: Each character becomes an element in the array.",
          "Step 3: chars[0] is 'h', chars[4] is 'o'.",
          "Step 4: Character array can be modified (unlike string).",
          "Key point: Use toCharArray() when you need to modify individual characters.",
        ],
      },
      {
        id: "string-ex-b-10",
        title: "String splitting",
        code: `String s = "apple,banana,orange,mango";

// Split by comma
String[] fruits = s.split(",");

System.out.println("Original: " + s);
System.out.println("Fruits:");
for (int i = 0; i < fruits.length; i++) {
    System.out.println(fruits[i]);
}

// Split by space
String sentence = "Hello World Java";
String[] words = sentence.split(" ");
System.out.println("\\nWords:");
for (int i = 0; i < words.length; i++) {
    System.out.println(words[i]);
}`,
        output: "Original: apple,banana,orange,mango\nFruits:\napple\nbanana\norange\nmango\n\nWords:\nHello\nWorld\nJava",
        explanation: [
          "Step 1: split() divides string into array of substrings.",
          "Step 2: split(',') splits by comma, returns array of fruits.",
          "Step 3: split(' ') splits by space, returns array of words.",
          "Step 4: The delimiter (separator) is not included in the result.",
          "Key point: split() uses regular expressions, so special characters need escaping.",
        ],
      },
    ],
    intermediate: [
      {
        id: "string-ex-i-1",
        title: "Check if string is palindrome",
        code: `String s = "madam";
String original = s;
boolean isPalindrome = true;

// Convert to lowercase for case-insensitive comparison
s = s.toLowerCase();

for (int i = 0; i < s.length() / 2; i++) {
    if (s.charAt(i) != s.charAt(s.length() - 1 - i)) {
        isPalindrome = false;
        break;
    }
}

System.out.println(original + " is palindrome: " + isPalindrome);`,
        output: "madam is palindrome: true",
        explanation: [
          "Step 1: A palindrome reads the same forwards and backwards.",
          "Step 2: Compare characters from start and end moving towards center.",
          "Step 3: s.charAt(i) should equal s.charAt(length-1-i).",
          "Step 4: Loop only needs to go to length/2.",
          "Key point: Palindrome check: first char = last char, second char = second-last char, etc.",
        ],
      },
      {
        id: "string-ex-i-2",
        title: "Count frequency of each character",
        code: `String s = "hello world";
int[] freq = new int[256];  // ASCII characters

for (int i = 0; i < s.length(); i++) {
    char ch = s.charAt(i);
    freq[ch]++;
}

System.out.println("Character frequencies:");
for (int i = 0; i < 256; i++) {
    if (freq[i] > 0) {
        System.out.println((char) i + ": " + freq[i]);
    }
}`,
        output: "Character frequencies:\n : 1\nd: 1\ne: 1\nh: 1\nl: 3\nm: 1\no: 2\nr: 1\nw: 1",
        explanation: [
          "Step 1: Create frequency array for all ASCII characters (256).",
          "Step 2: For each character, increment its frequency.",
          "Step 3: Use character as index: freq[ch]++.",
          "Step 4: Print characters with frequency > 0.",
          "Key point: Character's ASCII value is used as array index.",
        ],
      },
      {
        id: "string-ex-i-3",
        title: "Reverse a string",
        code: `String s = "hello";
String reversed = "";

for (int i = s.length() - 1; i >= 0; i--) {
    reversed = reversed + s.charAt(i);
}

System.out.println("Original: " + s);
System.out.println("Reversed: " + reversed);

// Using StringBuilder
StringBuilder sb = new StringBuilder(s);
System.out.println("Using StringBuilder: " + sb.reverse());`,
        output: "Original: hello\nReversed: olleh\nUsing StringBuilder: olleh",
        explanation: [
          "Step 1: Traverse string from end to beginning.",
          "Step 2: Append each character to reversed string.",
          "Step 3: StringBuilder has built-in reverse() method.",
          "Step 4: StringBuilder is more efficient for multiple modifications.",
          "Key point: Strings are immutable, so concatenation in loop creates many objects.",
        ],
      },
      {
        id: "string-ex-i-4",
        title: "Check if two strings are anagrams",
        code: `String s1 = "listen";
String s2 = "silent";

// Convert to character arrays and sort
char[] arr1 = s1.toCharArray();
char[] arr2 = s2.toCharArray();

// Sort arrays
java.util.Arrays.sort(arr1);
java.util.Arrays.sort(arr2);

// Compare sorted arrays
boolean isAnagram = java.util.Arrays.equals(arr1, arr2);

System.out.println(s1 + " and " + s2 + " are anagrams: " + isAnagram);`,
        output: "listen and silent are anagrams: true",
        explanation: [
          "Step 1: Anagrams have same characters in different order.",
          "Step 2: Convert both strings to character arrays.",
          "Step 3: Sort both arrays.",
          "Step 4: If sorted arrays are equal, strings are anagrams.",
          "Key point: listen and silent both have characters: e, i, l, n, s, t.",
        ],
      },
      {
        id: "string-ex-i-5",
        title: "Count vowels and consonants",
        code: `String s = "Hello World";
s = s.toLowerCase();

int vowels = 0, consonants = 0;

for (int i = 0; i < s.length(); i++) {
    char ch = s.charAt(i);
    
    if (ch >= 'a' && ch <= 'z') {
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
            vowels++;
        } else {
            consonants++;
        }
    }
}

System.out.println("Vowels: " + vowels);
System.out.println("Consonants: " + consonants);`,
        output: "Vowels: 3\nConsonants: 7",
        explanation: [
          "Step 1: Convert to lowercase for easier comparison.",
          "Step 2: Check if character is a letter (between 'a' and 'z').",
          "Step 3: If letter is a, e, i, o, or u, it's a vowel.",
          "Step 4: Otherwise, it's a consonant.",
          "Step 5: Vowels: e, o, o (3). Consonants: h, l, l, w, r, l, d (7).",
        ],
      },
      {
        id: "string-ex-i-6",
        title: "Find first non-repeating character",
        code: `String s = "swiss";
int[] freq = new int[256];

// Count frequencies
for (int i = 0; i < s.length(); i++) {
    freq[s.charAt(i)]++;
}

// Find first non-repeating character
char firstNonRepeat = ' ';
for (int i = 0; i < s.length(); i++) {
    if (freq[s.charAt(i)] == 1) {
        firstNonRepeat = s.charAt(i);
        break;
    }
}

System.out.println("First non-repeating character: " + firstNonRepeat);`,
        output: "First non-repeating character: w",
        explanation: [
          "Step 1: Count frequency of each character.",
          "Step 2: Traverse string again to find first character with frequency 1.",
          "Step 3: 'w' appears only once and is the first such character.",
          "Step 4: 's' appears 3 times, 'i' appears 1 time (but comes after 'w').",
          "Key point: Need two passes — first to count, second to find first non-repeat.",
        ],
      },
      {
        id: "string-ex-i-7",
        title: "Remove duplicate characters",
        code: `String s = "programming";
String result = "";
boolean[] visited = new boolean[256];

for (int i = 0; i < s.length(); i++) {
    char ch = s.charAt(i);
    if (!visited[ch]) {
        result = result + ch;
        visited[ch] = true;
    }
}

System.out.println("Original: " + s);
System.out.println("Without duplicates: " + result);`,
        output: "Original: programming\nWithout duplicates: progamin",
        explanation: [
          "Step 1: Use boolean array to track visited characters.",
          "Step 2: For each character, check if already visited.",
          "Step 3: If not visited, add to result and mark as visited.",
          "Step 4: Result contains only first occurrence of each character.",
          "Key point: Maintains order of first occurrence.",
        ],
      },
      {
        id: "string-ex-i-8",
        title: "Count words in a string",
        code: `String s = "Hello World Java Programming";
int wordCount = 0;

// Split by spaces
String[] words = s.split(" ");

wordCount = words.length;

System.out.println("String: " + s);
System.out.println("Word count: " + wordCount);

// Manual count
int count = 0;
for (int i = 0; i < s.length(); i++) {
    if (s.charAt(i) == ' ') {
        count++;
    }
}
System.out.println("Word count (manual): " + (count + 1));`,
        output: "String: Hello World Java Programming\nWord count: 4\nWord count (manual): 4",
        explanation: [
          "Step 1: Split string by spaces to get words.",
          "Step 2: Number of words = length of array.",
          "Step 3: Manual method: count spaces and add 1.",
          "Step 4: Both methods give same result.",
          "Key point: Word count = number of spaces + 1 (for non-empty string).",
        ],
      },
      {
        id: "string-ex-i-9",
        title: "Find all occurrences of a substring",
        code: `String s = "hello world hello java hello";
String target = "hello";
int count = 0;
int index = 0;

while ((index = s.indexOf(target, index)) != -1) {
    count++;
    index = index + target.length();
}

System.out.println("String: " + s);
System.out.println("Target: " + target);
System.out.println("Occurrences: " + count);`,
        output: "String: hello world hello java hello\nTarget: hello\nOccurrences: 3",
        explanation: [
          "Step 1: Use indexOf() with fromIndex to find all occurrences.",
          "Step 2: Start search from current index.",
          "Step 3: If found, increment count and move index forward.",
          "Step 4: Continue until indexOf() returns -1 (not found).",
          "Key point: Use fromIndex parameter to continue search from last found position.",
        ],
      },
      {
        id: "string-ex-i-10",
        title: "Swap first and last characters of each word",
        code: `String s = "Hello World Java";
String[] words = s.split(" ");
String result = "";

for (int i = 0; i < words.length; i++) {
    String word = words[i];
    if (word.length() > 1) {
        char first = word.charAt(0);
        char last = word.charAt(word.length() - 1);
        String middle = word.substring(1, word.length() - 1);
        result = result + last + middle + first + " ";
    } else {
        result = result + word + " ";
    }
}

System.out.println("Original: " + s);
System.out.println("Swapped: " + result.trim());`,
        output: "Original: Hello World Java\nSwapped: oellH dlroW aJv",
        explanation: [
          "Step 1: Split string into words.",
          "Step 2: For each word, swap first and last characters.",
          "Step 3: Extract first, middle, and last parts.",
          "Step 4: Reconstruct word as last + middle + first.",
          "Key point: Handle single-character words separately.",
        ],
      },
    ],
    advanced: [
      {
        id: "string-ex-a-1",
        title: "Check if string is a valid palindrome (ignoring case and spaces)",
        code: `String s = "A man a plan a canal Panama";
s = s.toLowerCase().replace(" ", "");

boolean isPalindrome = true;
for (int i = 0; i < s.length() / 2; i++) {
    if (s.charAt(i) != s.charAt(s.length() - 1 - i)) {
        isPalindrome = false;
        break;
    }
}

System.out.println("Is palindrome: " + isPalindrome);`,
        output: "Is palindrome: true",
        explanation: [
          "Step 1: Convert to lowercase and remove spaces.",
          "Step 2: Compare characters from both ends.",
          "Step 3: 'amanaplanacanalpanama' is a palindrome.",
          "Step 4: Ignoring case and spaces, it reads same forwards and backwards.",
          "Key point: Preprocess string before palindrome check.",
        ],
      },
      {
        id: "string-ex-a-2",
        title: "Find longest word in a string",
        code: `String s = "The quick brown fox jumps over the lazy dog";
String[] words = s.split(" ");
String longest = words[0];

for (int i = 1; i < words.length; i++) {
    if (words[i].length() > longest.length()) {
        longest = words[i];
    }
}

System.out.println("Longest word: " + longest);
System.out.println("Length: " + longest.length());`,
        output: "Longest word: jumps\nLength: 5",
        explanation: [
          "Step 1: Split string into words.",
          "Step 2: Initialize longest with first word.",
          "Step 3: Compare each word's length with current longest.",
          "Step 4: Update longest if current word is longer.",
          "Key point: In case of tie, first longest word is kept.",
        ],
      },
      {
        id: "string-ex-a-3",
        title: "Count occurrences of each word",
        code: `String s = "apple banana apple orange banana apple";
String[] words = s.split(" ");
int[] freq = new int[words.length];
int wordCount = 0;

for (int i = 0; i < words.length; i++) {
    int count = 1;
    if (freq[i] == 0) {
        for (int j = i + 1; j < words.length; j++) {
            if (words[i].equals(words[j])) {
                count++;
                freq[j] = -1;
            }
        }
        freq[i] = count;
    }
}

System.out.println("Word frequencies:");
for (int i = 0; i < words.length; i++) {
    if (freq[i] > 0) {
        System.out.println(words[i] + ": " + freq[i]);
    }
}`,
        output: "Word frequencies:\napple: 3\nbanana: 2\norange: 1",
        explanation: [
          "Step 1: Split string into words.",
          "Step 2: Use frequency array to track counted words.",
          "Step 3: For each word, count occurrences in remaining array.",
          "Step 4: Mark counted words to avoid recounting.",
          "Key point: Use -1 to mark already counted words.",
        ],
      },
      {
        id: "string-ex-a-4",
        title: "Reverse words in a string",
        code: `String s = "Hello World Java";
String[] words = s.split(" ");
String reversed = "";

for (int i = words.length - 1; i >= 0; i--) {
    reversed = reversed + words[i];
    if (i > 0) {
        reversed = reversed + " ";
    }
}

System.out.println("Original: " + s);
System.out.println("Reversed words: " + reversed);`,
        output: "Original: Hello World Java\nReversed words: Java World Hello",
        explanation: [
          "Step 1: Split string into words.",
          "Step 2: Traverse words array in reverse order.",
          "Step 3: Append each word to result string.",
          "Step 4: Add space between words (except after last word).",
          "Key point: Words are reversed, not characters within words.",
        ],
      },
      {
        id: "string-ex-a-5",
        title: "Check if string contains only digits",
        code: `String s = "1234567890";
boolean allDigits = true;

for (int i = 0; i < s.length(); i++) {
    if (s.charAt(i) < '0' || s.charAt(i) > '9') {
        allDigits = false;
        break;
    }
}

System.out.println("String: " + s);
System.out.println("All digits: " + allDigits);

// Using built-in method
System.out.println("Using matches(): " + s.matches("[0-9]+"));`,
        output: "String: 1234567890\nAll digits: true\nUsing matches(): true",
        explanation: [
          "Step 1: Check each character to see if it's between '0' and '9'.",
          "Step 2: If any character is not a digit, set flag to false.",
          "Step 3: matches() method uses regular expressions.",
          "Step 4: [0-9]+ matches one or more digits.",
          "Key point: Character comparison uses ASCII values.",
        ],
      },
      {
        id: "string-ex-a-6",
        title: "Convert string to title case",
        code: `String s = "hello world java";
String[] words = s.split(" ");
String titleCase = "";

for (int i = 0; i < words.length; i++) {
    if (words[i].length() > 0) {
        char first = Character.toUpperCase(words[i].charAt(0));
        String rest = words[i].substring(1).toLowerCase();
        titleCase = titleCase + first + rest;
        if (i < words.length - 1) {
            titleCase = titleCase + " ";
        }
    }
}

System.out.println("Original: " + s);
System.out.println("Title case: " + titleCase);`,
        output: "Original: hello world java\nTitle case: Hello World Java",
        explanation: [
          "Step 1: Split string into words.",
          "Step 2: For each word, capitalize first letter and lowercase rest.",
          "Step 3: Use Character.toUpperCase() for single character.",
          "Step 4: Combine words with spaces.",
          "Key point: Title case means first letter of each word is uppercase.",
        ],
      },
      {
        id: "string-ex-a-7",
        title: "Find all permutations of a string",
        code: `import java.util.ArrayList;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        String s = "abc";
        ArrayList<String> permutations = new ArrayList<>();
        
        permute(s, 0, s.length() - 1, permutations);
        
        System.out.println("Permutations of '" + s + "':");
        for (String perm : permutations) {
            System.out.println(perm);
        }
    }
    
    public static void permute(String str, int left, int right, ArrayList<String> result) {
        if (left == right) {
            result.add(str);
        } else {
            for (int i = left; i <= right; i++) {
                str = swap(str, left, i);
                permute(str, left + 1, right, result);
                str = swap(str, left, i);  // backtrack
            }
        }
    }
    
    public static String swap(String s, int i, int j) {
        char[] chars = s.toCharArray();
        char temp = chars[i];
        chars[i] = chars[j];
        chars[j] = temp;
        return new String(chars);
    }
}`,
        output: "Permutations of 'abc':\nabc\nacb\nbac\nbca\ncab\ncba",
        explanation: [
          "Step 1: Use recursion to generate all permutations.",
          "Step 2: Swap each character with every other character.",
          "Step 3: Recursively permute the remaining substring.",
          "Step 4: Backtrack by swapping back to original positions.",
          "Key point: For n characters, there are n! permutations.",
        ],
      },
      {
        id: "string-ex-a-8",
        title: "Compress a string (run-length encoding)",
        code: `String s = "aaabbbcccaaa";
String compressed = "";
int count = 1;

for (int i = 0; i < s.length(); i++) {
    if (i < s.length() - 1 && s.charAt(i) == s.charAt(i + 1)) {
        count++;
    } else {
        compressed = compressed + s.charAt(i) + count;
        count = 1;
    }
}

System.out.println("Original: " + s);
System.out.println("Compressed: " + compressed);`,
        output: "Original: aaabbbcccaaa\nCompressed: a3b3c3a3",
        explanation: [
          "Step 1: Traverse string and count consecutive characters.",
          "Step 2: When character changes, append character and count to result.",
          "Step 3: Reset count for new character.",
          "Step 4: 'aaa' becomes 'a3', 'bbb' becomes 'b3', etc.",
          "Key point: Run-length encoding compresses consecutive repeated characters.",
        ],
      },
      {
        id: "string-ex-a-9",
        title: "Check if string is a valid identifier",
        code: `String s = "myVariable123";
boolean isValid = true;

// First character must be letter or underscore
if (s.length() > 0) {
    char first = s.charAt(0);
    if (!((first >= 'a' && first <= 'z') || (first >= 'A' && first <= 'Z') || first == '_')) {
        isValid = false;
    }
    
    // Rest can be letters, digits, or underscore
    for (int i = 1; i < s.length() && isValid; i++) {
        char ch = s.charAt(i);
        if (!((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9') || ch == '_')) {
            isValid = false;
        }
    }
}

System.out.println("String: " + s);
System.out.println("Valid identifier: " + isValid);`,
        output: "String: myVariable123\nValid identifier: true",
        explanation: [
          "Step 1: First character must be letter (a-z, A-Z) or underscore (_).",
          "Step 2: Remaining characters can be letters, digits (0-9), or underscore.",
          "Step 3: Check each character against allowed set.",
          "Step 4: If any character violates rules, identifier is invalid.",
          "Key point: Java identifiers cannot start with a digit.",
        ],
      },
      {
        id: "string-ex-a-10",
        title: "Convert integer to string and vice versa",
        code: `// Integer to String
int num = 12345;
String s1 = String.valueOf(num);
String s2 = Integer.toString(num);
String s3 = num + "";

System.out.println("Integer: " + num);
System.out.println("String (valueOf): " + s1);
System.out.println("String (toString): " + s2);
System.out.println("String (concatenation): " + s3);

// String to Integer
String s = "67890";
int n1 = Integer.parseInt(s);
int n2 = Integer.valueOf(s);

System.out.println("\\nString: " + s);
System.out.println("Integer (parseInt): " + n1);
System.out.println("Integer (valueOf): " + n2);`,
        output: "Integer: 12345\nString (valueOf): 12345\nString (toString): 12345\nString (concatenation): 12345\n\nString: 67890\nInteger (parseInt): 67890\nInteger (valueOf): 67890",
        explanation: [
          "Step 1: String.valueOf() converts any type to string.",
          "Step 2: Integer.toString() converts int to string.",
          "Step 3: Concatenating with empty string also converts to string.",
          "Step 4: Integer.parseInt() converts string to int (returns primitive).",
          "Step 5: Integer.valueOf() converts string to Integer object.",
          "Key point: parseInt() is faster, valueOf() returns wrapper object.",
        ],
      },
    ],
  },

  // ========== 5. DRY RUN ==========
  dryRun: [
    {
      title: "String Palindrome Check",
      code: `String s = "madam";
boolean isPalindrome = true;

for (int i = 0; i < s.length() / 2; i++) {
    if (s.charAt(i) != s.charAt(s.length() - 1 - i)) {
        isPalindrome = false;
        break;
    }
}

System.out.println(isPalindrome);`,
      trace: [
        { line: 1, explanation: "s = 'madam'. length = 5." },
        { line: 2, explanation: "isPalindrome = true." },
        { line: 4, explanation: "i = 0. s.length()/2 = 2. Compare s.charAt(0)='m' with s.charAt(4)='m'. Equal." },
        { line: 4, explanation: "i = 1. Compare s.charAt(1)='a' with s.charAt(3)='a'. Equal." },
        { line: 4, explanation: "i = 2. Loop condition: 2 < 2 is false. Exit loop." },
        { line: 9, explanation: "Print: true. 'madam' is a palindrome." },
      ],
    },
    {
      title: "String indexOf() Search",
      code: `String s = "hello world";
int index = s.indexOf("world");

System.out.println(index);`,
      trace: [
        { line: 1, explanation: "s = 'hello world'." },
        { line: 2, explanation: "Search for 'world' in s." },
        { line: 2, explanation: "'world' starts at index 6 (after 'hello ')." },
        { line: 4, explanation: "Print: 6." },
      ],
    },
    {
      title: "String Concatenation",
      code: `String s1 = "hello";
String s2 = s1 + " world";
String s3 = s2 + "!";

System.out.println(s1);
System.out.println(s2);
System.out.println(s3);`,
      trace: [
        { line: 1, explanation: "s1 = 'hello' (stored in string pool)." },
        { line: 2, explanation: "s2 = 'hello world' (new string created in pool)." },
        { line: 3, explanation: "s3 = 'hello world!' (new string created in pool)." },
        { line: 5, explanation: "Print: 'hello' (s1 is unchanged)." },
        { line: 6, explanation: "Print: 'hello world' (s2)." },
        { line: 7, explanation: "Print: 'hello world!' (s3)." },
      ],
    },
  ],

  // ========== 6. OUTPUT BASED QUESTIONS ==========
  outputBasedQuestions: [
    {
      id: "string-ob-1",
      question: `String s = "hello";
System.out.println(s.length());`,
      answer: "5",
      explanation: "length() returns the number of characters, which is 5.",
    },
    {
      id: "string-ob-2",
      question: `String s = "hello";
System.out.println(s.charAt(1));`,
      answer: "e",
      explanation: "charAt(1) returns the character at index 1, which is 'e'.",
    },
    {
      id: "string-ob-3",
      question: `String s = "hello";
System.out.println(s.substring(1, 3));`,
      answer: "el",
      explanation: "substring(1, 3) returns characters from index 1 to 2 (endIndex is exclusive).",
    },
    {
      id: "string-ob-4",
      question: `String s1 = "hello";
String s2 = "hello";
System.out.println(s1 == s2);`,
      answer: "true",
      explanation: "String literals with same content refer to same object in string pool.",
    },
    {
      id: "string-ob-5",
      question: `String s1 = "hello";
String s2 = new String("hello");
System.out.println(s1 == s2);`,
      answer: "false",
      explanation: "s1 is in pool, s2 is in heap. == compares references, which are different.",
    },
    {
      id: "string-ob-6",
      question: `String s1 = "hello";
String s2 = new String("hello");
System.out.println(s1.equals(s2));`,
      answer: "true",
      explanation: "equals() compares content, not references. Both have same content 'hello'.",
    },
    {
      id: "string-ob-7",
      question: `String s = "hello world";
System.out.println(s.indexOf('o'));`,
      answer: "4",
      explanation: "indexOf('o') returns index of first 'o', which is at index 4.",
    },
    {
      id: "string-ob-8",
      question: `String s = "hello world";
System.out.println(s.lastIndexOf('o'));`,
      answer: "7",
      explanation: "lastIndexOf('o') returns index of last 'o', which is at index 7.",
    },
    {
      id: "string-ob-9",
      question: `String s = "hello";
System.out.println(s.toUpperCase());`,
      answer: "HELLO",
      explanation: "toUpperCase() converts all characters to uppercase.",
    },
    {
      id: "string-ob-10",
      question: `String s = "HELLO";
System.out.println(s.toLowerCase());`,
      answer: "hello",
      explanation: "toLowerCase() converts all characters to lowercase.",
    },
    {
      id: "string-ob-11",
      question: `String s = "  hello  ";
System.out.println(s.trim().length());`,
      answer: "5",
      explanation: "trim() removes leading and trailing spaces. 'hello' has length 5.",
    },
    {
      id: "string-ob-12",
      question: `String s = "hello";
System.out.println(s.startsWith("he"));`,
      answer: "true",
      explanation: "startsWith('he') returns true because string starts with 'he'.",
    },
    {
      id: "string-ob-13",
      question: `String s = "hello";
System.out.println(s.endsWith("lo"));`,
      answer: "true",
      explanation: "endsWith('lo') returns true because string ends with 'lo'.",
    },
    {
      id: "string-ob-14",
      question: `String s = "hello";
System.out.println(s.contains("ell"));`,
      answer: "true",
      explanation: "contains('ell') returns true because 'ell' is a substring of 'hello'.",
    },
    {
      id: "string-ob-15",
      question: `String s = "hello";
System.out.println(s.indexOf("xyz"));`,
      answer: "-1",
      explanation: "indexOf() returns -1 when substring is not found.",
    },
    {
      id: "string-ob-16",
      question: `String s = "hello";
s = s + " world";
System.out.println(s);`,
      answer: "hello world",
      explanation: "+ operator concatenates strings. s becomes 'hello world'.",
    },
    {
      id: "string-ob-17",
      question: `String s = "hello";
char ch = s.charAt(0);
System.out.println(ch);`,
      answer: "h",
      explanation: "charAt(0) returns the first character, which is 'h'.",
    },
    {
      id: "string-ob-18",
      question: `String s = "hello world";
System.out.println(s.substring(6));`,
      answer: "world",
      explanation: "substring(6) returns characters from index 6 to end, which is 'world'.",
    },
    {
      id: "string-ob-19",
      question: `String s = "hello";
System.out.println(s.replace('l', 'x'));`,
      answer: "hexxo",
      explanation: "replace('l', 'x') replaces all 'l' with 'x'. 'hello' becomes 'hexxo'.",
    },
    {
      id: "string-ob-20",
      question: `String s = "a b c";
String[] arr = s.split(" ");
System.out.println(arr.length);`,
      answer: "3",
      explanation: "split(' ') splits by space. 'a b c' becomes ['a', 'b', 'c']. Length is 3.",
    },
  ],

  // ========== 7. ERROR FINDING QUESTIONS ==========
  errorFindingQuestions: [
    {
      id: "string-ef-1",
      question: `String s = "hello";
System.out.println(s[0]);`,
      error: "Compilation error. Strings are not arrays. Use s.charAt(0) instead of s[0].",
      corrected: `String s = "hello";
System.out.println(s.charAt(0));`,
    },
    {
      id: "string-ef-2",
      question: `String s = "hello";
System.out.println(s.length);`,
      error: "Compilation error. length() is a method, not a property. Use s.length() with parentheses.",
      corrected: `String s = "hello";
System.out.println(s.length());`,
    },
    {
      id: "string-ef-3",
      question: `String s1 = "hello";
String s2 = "hello";
if (s1 == s2) {
    System.out.println("Equal");
}`,
      error: "No error, but logic is risky. == compares references, not content. Works for string literals but fails for strings created with new keyword. Always use equals() for content comparison.",
      corrected: `String s1 = "hello";
String s2 = "hello";
if (s1.equals(s2)) {
    System.out.println("Equal");
}`,
    },
    {
      id: "string-ef-4",
      question: `String s = "hello";
s.toUpperCase();
System.out.println(s);`,
      error: "Logical error. toUpperCase() returns a new string, it doesn't modify the original. s remains 'hello'.",
      corrected: `String s = "hello";
s = s.toUpperCase();
System.out.println(s);`,
    },
    {
      id: "string-ef-5",
      question: `String s = "hello";
System.out.println(s.substring(1, 5));`,
      error: "No error, but common confusion. substring(1, 5) returns 'ello' (indices 1, 2, 3, 4). endIndex 5 is exclusive.",
      corrected: "No error. Output is 'ello'.",
    },
    {
      id: "string-ef-6",
      question: `String s = null;
System.out.println(s.length());`,
      error: "NullPointerException. s is null, cannot call methods on null reference.",
      corrected: `String s = "hello";
System.out.println(s.length());`,
    },
    {
      id: "string-ef-7",
      question: `String s = "hello";
System.out.println(s.charAt(5));`,
      error: "StringIndexOutOfBoundsException. String 'hello' has indices 0-4. charAt(5) is out of bounds.",
      corrected: `String s = "hello";
System.out.println(s.charAt(4));  // Last valid index`,
    },
    {
      id: "string-ef-8",
      question: `String s = "hello";
int index = s.indexOf('z');
System.out.println(index);`,
      error: "No error, but 'z' is not in 'hello'. indexOf() returns -1 when character is not found.",
      corrected: "No error. Output is -1.",
    },
    {
      id: "string-ef-9",
      question: `String s = "123";
int n = s.parseInt();`,
      error: "Compilation error. parseInt() is a static method of Integer class, not String. Use Integer.parseInt(s).",
      corrected: `String s = "123";
int n = Integer.parseInt(s);`,
    },
    {
      id: "string-ef-10",
      question: `String s1 = "hello";
String s2 = "Hello";
System.out.println(s1 == s2);`,
      error: "Logical error. == compares references, and 'hello' and 'Hello' are different objects. Also, content is different due to case. Use equals() for content comparison.",
      corrected: `String s1 = "hello";
String s2 = "Hello";
System.out.println(s1.equals(s2));  // false, different content`,
    },
  ],

  // ========== 8. FILL IN THE BLANKS ==========
  fillInTheBlanks: [
    { id: "string-fb-1", question: "String is a class in the _____ package.", answer: "java.lang" },
    { id: "string-fb-2", question: "Strings in Java are _____ (cannot be changed after creation).", answer: "immutable" },
    { id: "string-fb-3", question: "String literals are stored in the _____ .", answer: "string pool" },
    { id: "string-fb-4", question: "To compare string content, use the _____ method.", answer: "equals" },
    { id: "string-fb-5", question: "The _____ operator compares references, not content.", answer: "==" },
    { id: "string-fb-6", question: "_____ returns the number of characters in a string.", answer: "length()" },
    { id: "string-fb-7", question: "_____ returns the character at a specified index.", answer: "charAt()" },
    { id: "string-fb-8", question: "_____ returns a substring from beginIndex to endIndex-1.", answer: "substring()" },
    { id: "string-fb-9", question: "_____ returns the index of the first occurrence of a character.", answer: "indexOf()" },
    { id: "string-fb-10", question: "_____ returns the index of the last occurrence of a character.", answer: "lastIndexOf()" },
    { id: "string-fb-11", question: "_____ converts string to uppercase and returns a new string.", answer: "toUpperCase()" },
    { id: "string-fb-12", question: "_____ converts string to lowercase and returns a new string.", answer: "toLowerCase()" },
    { id: "string-fb-13", question: "_____ removes leading and trailing whitespace.", answer: "trim()" },
    { id: "string-fb-14", question: "_____ checks if string starts with specified prefix.", answer: "startsWith()" },
    { id: "string-fb-15", question: "_____ checks if string ends with specified suffix.", answer: "endsWith()" },
    { id: "string-fb-16", question: "_____ checks if string contains specified character sequence.", answer: "contains()" },
    { id: "string-fb-17", question: "_____ replaces all occurrences of a character or substring.", answer: "replace()" },
    { id: "string-fb-18", question: "_____ splits string into array of substrings.", answer: "split()" },
    { id: "string-fb-19", question: "_____ converts string to character array.", answer: "toCharArray()" },
    { id: "string-fb-20", question: "_____ class provides mutable string operations.", answer: "StringBuffer" },
  ],

  // ========== 9. MCQs ==========
  mcqs: [
    {
      id: "string-mcq-1",
      question: "Which package contains the String class?",
      options: ["java.util", "java.lang", "java.io", "java.string"],
      answer: 1,
      explanation: "String class is in java.lang package, which is automatically imported.",
    },
    {
      id: "string-mcq-2",
      question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.length());",
      options: ["4", "5", "6", "Compilation error"],
      answer: 1,
      explanation: "length() returns 5, the number of characters in 'hello'.",
    },
    {
      id: "string-mcq-3",
      question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.charAt(1));",
      options: ["h", "e", "l", "o"],
      answer: 1,
      explanation: "charAt(1) returns the character at index 1, which is 'e'.",
    },
    {
      id: "string-mcq-4",
      question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.substring(1, 3));",
      options: ["hel", "el", "ell", "llo"],
      answer: 1,
      explanation: "substring(1, 3) returns characters from index 1 to 2 (endIndex is exclusive).",
    },
    {
      id: "string-mcq-5",
      question: "Which method is used to compare string content?",
      options: ["==", "equals()", "compare()", "=="],
      answer: 1,
      explanation: "equals() method compares the content of strings. == compares references.",
    },
    {
      id: "string-mcq-6",
      question: "What is the output?\nString s1 = \"hello\";\nString s2 = new String(\"hello\");\nSystem.out.println(s1 == s2);",
      options: ["true", "false", "Compilation error", "Runtime error"],
      answer: 1,
      explanation: "s1 is in string pool, s2 is in heap. == compares references, which are different.",
    },
    {
      id: "string-mcq-7",
      question: "What is the output?\nString s1 = \"hello\";\nString s2 = new String(\"hello\");\nSystem.out.println(s1.equals(s2));",
      options: ["true", "false", "Compilation error", "Runtime error"],
      answer: 0,
      explanation: "equals() compares content. Both strings have same content 'hello'.",
    },
    {
      id: "string-mcq-8",
      question: "What does indexOf() return when substring is not found?",
      options: ["0", "-1", "null", "Compilation error"],
      answer: 1,
      explanation: "indexOf() returns -1 when the specified substring is not found.",
    },
    {
      id: "string-mcq-9",
      question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.toUpperCase());",
      options: ["hello", "HELLO", "Hello", "hELLO"],
      answer: 1,
      explanation: "toUpperCase() converts all characters to uppercase, returning 'HELLO'.",
    },
    {
      id: "string-mcq-10",
      question: "Are strings in Java mutable or immutable?",
      options: ["Mutable", "Immutable", "Depends on size", "Depends on content"],
      answer: 1,
      explanation: "Strings in Java are immutable. Any modification creates a new string object.",
    },
    {
      id: "string-mcq-11",
      question: "What is the output?\nString s = \"  hello  \";\nSystem.out.println(s.trim().length());",
      options: ["7", "5", "9", "8"],
      answer: 1,
      explanation: "trim() removes leading and trailing spaces. 'hello' has length 5.",
    },
    {
      id: "string-mcq-12",
      question: "What is the output?\nString s = \"hello world\";\nSystem.out.println(s.indexOf('o'));",
      options: ["0", "4", "7", "-1"],
      answer: 1,
      explanation: "indexOf('o') returns index of first 'o', which is at index 4.",
    },
    {
      id: "string-mcq-13",
      question: "What is the output?\nString s = \"hello world\";\nSystem.out.println(s.lastIndexOf('o'));",
      options: ["4", "7", "-1", "0"],
      answer: 1,
      explanation: "lastIndexOf('o') returns index of last 'o', which is at index 7.",
    },
    {
      id: "string-mcq-14",
      question: "Which method converts a string to a character array?",
      options: ["toArray()", "toCharArray()", "getChars()", "charArray()"],
      answer: 1,
      explanation: "toCharArray() converts a string to a character array.",
    },
    {
      id: "string-mcq-15",
      question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.startsWith(\"he\"));",
      options: ["true", "false", "Compilation error", "Runtime error"],
      answer: 0,
      explanation: "startsWith('he') returns true because 'hello' starts with 'he'.",
    },
    {
      id: "string-mcq-16",
      question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.endsWith(\"lo\"));",
      options: ["true", "false", "Compilation error", "Runtime error"],
      answer: 0,
      explanation: "endsWith('lo') returns true because 'hello' ends with 'lo'.",
    },
    {
      id: "string-mcq-17",
      question: "Which class provides mutable string operations?",
      options: ["String", "StringBuffer", "StringBuilder", "Both StringBuffer and StringBuilder"],
      answer: 3,
      explanation: "Both StringBuffer and StringBuilder provide mutable string operations.",
    },
    {
      id: "string-mcq-18",
      question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.contains(\"ell\"));",
      options: ["true", "false", "Compilation error", "Runtime error"],
      answer: 0,
      explanation: "contains('ell') returns true because 'ell' is a substring of 'hello'.",
    },
    {
      id: "string-mcq-19",
      question: "What is the output?\nString s = \"a b c\";\nString[] arr = s.split(\" \");\nSystem.out.println(arr.length);",
      options: ["1", "3", "5", "Compilation error"],
      answer: 1,
      explanation: "split(' ') splits by space. 'a b c' becomes ['a', 'b', 'c']. Length is 3.",
    },
    {
      id: "string-mcq-20",
      question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.replace('l', 'x'));",
      options: ["hexxo", "hexo", "hello", "hxlo"],
      answer: 0,
      explanation: "replace('l', 'x') replaces all 'l' with 'x'. 'hello' becomes 'hexxo'.",
    },
    {
      id: "string-mcq-21",
      question: "What does compareTo() return when strings are equal?",
      options: ["1", "0", "-1", "true"],
      answer: 1,
      explanation: "compareTo() returns 0 when strings are equal lexicographically.",
    },
    {
      id: "string-mcq-22",
      question: "What is the output?\nString s = \"123\";\nint n = Integer.parseInt(s);\nSystem.out.println(n + 10);",
      options: ["12310", "133", "Compilation error", "Runtime error"],
      answer: 1,
      explanation: "Integer.parseInt('123') converts string to int 123. 123 + 10 = 133.",
    },
    {
      id: "string-mcq-23",
      question: "Which method checks if string is empty?",
      options: ["length() == 0", "isEmpty()", "isBlank()", "Both isEmpty() and length() == 0"],
      answer: 3,
      explanation: "isEmpty() returns true if length is 0. length() == 0 also works.",
    },
    {
      id: "string-mcq-24",
      question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.substring(2));",
      options: ["he", "el", "llo", "lo"],
      answer: 2,
      explanation: "substring(2) returns characters from index 2 to end, which is 'llo'.",
    },
    {
      id: "string-mcq-25",
      question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.indexOf('l', 3));",
      options: ["2", "3", "4", "-1"],
      answer: 1,
      explanation: "indexOf('l', 3) searches for 'l' starting from index 3. Found at index 3.",
    },
    {
      id: "string-mcq-26",
      question: "Which of the following is true about StringBuffer?",
      options: ["Immutable", "Mutable and thread-safe", "Mutable but not thread-safe", "Same as String"],
      answer: 1,
      explanation: "StringBuffer is mutable and thread-safe (synchronized methods).",
    },
    {
      id: "string-mcq-27",
      question: "What is the output?\nString s = \"Hello\";\nSystem.out.println(s.replaceFirst(\"l\", \"x\"));",
      options: ["Hexlo", "He xlo", "Hello", "Hexxo"],
      answer: 0,
      explanation: "replaceFirst('l', 'x') replaces only first 'l' with 'x'. 'Hello' becomes 'Hexlo'.",
    },
    {
      id: "string-mcq-28",
      question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.matches(\"[a-z]+\"));",
      options: ["true", "false", "Compilation error", "Runtime error"],
      answer: 0,
      explanation: "matches('[a-z]+') returns true because 'hello' contains only lowercase letters.",
    },
    {
      id: "string-mcq-29",
      question: "What is the output?\nString s = \"hello world\";\nSystem.out.println(s.indexOf(\"world\"));",
      options: ["0", "5", "6", "-1"],
      answer: 2,
      explanation: "indexOf('world') returns 6, the starting index of 'world'.",
    },
    {
      id: "string-mcq-30",
      question: "Which method converts other data types to string?",
      options: ["toString()", "valueOf()", "toString() and valueOf()", "parseString()"],
      answer: 2,
      explanation: "Both toString() and valueOf() can convert other types to string.",
    },
  ],

  // ========== 10. TRUE/FALSE ==========
  trueFalse: [
    { id: "string-tf-1", question: "String is a primitive data type in Java.", answer: false, explanation: "String is a class in java.lang package, not a primitive data type." },
    { id: "string-tf-2", question: "Strings in Java are immutable.", answer: true, explanation: "Once created, the content of a string cannot be changed." },
    { id: "string-tf-3", question: "String literals are stored in the String Pool.", answer: true, explanation: "String literals are stored in the String Pool for memory optimization." },
    { id: "string-tf-4", question: "The == operator compares string content.", answer: false, explanation: "== compares references (memory addresses), not content. Use equals() for content comparison." },
    { id: "string-tf-5", question: "The equals() method compares string content.", answer: true, explanation: "equals() method compares the actual content of strings." },
    { id: "string-tf-6", question: "length is a property of String class.", answer: false, explanation: "length() is a method (with parentheses), not a property." },
    { id: "string-tf-7", question: "String indices start at 0.", answer: true, explanation: "Like arrays, string indices start at 0. First character is at index 0." },
    { id: "string-tf-8", question: "substring(begin, end) includes both begin and end indices.", answer: false, explanation: "substring(begin, end) includes beginIndex but excludes endIndex." },
    { id: "string-tf-9", question: "indexOf() returns -1 when substring is not found.", answer: true, explanation: "indexOf() returns -1 to indicate the substring was not found." },
    { id: "string-tf-10", question: "toUpperCase() modifies the original string.", answer: false, explanation: "toUpperCase() returns a new string. Original string is unchanged (immutable)." },
    { id: "string-tf-11", question: "StringBuffer is mutable.", answer: true, explanation: "StringBuffer provides mutable string operations." },
    { id: "string-tf-12", question: "StringBuffer is thread-safe.", answer: true, explanation: "StringBuffer methods are synchronized, making it thread-safe." },
    { id: "string-tf-13", question: "StringBuilder is thread-safe.", answer: false, explanation: "StringBuilder is not thread-safe but is faster than StringBuffer." },
    { id: "string-tf-14", question: "trim() removes all spaces from a string.", answer: false, explanation: "trim() removes only leading and trailing whitespace, not spaces in the middle." },
    { id: "string-tf-15", question: "charAt() returns a character.", answer: true, explanation: "charAt(index) returns the character at the specified index as a char." },
    { id: "string-tf-16", question: "Strings can be created using the new keyword.", answer: true, explanation: "Strings can be created using new String() or string literals." },
    { id: "string-tf-17", question: "String Pool is part of the heap memory.", answer: true, explanation: "String Pool is a special area in the heap memory where string literals are stored." },
    { id: "string-tf-18", question: "Two string literals with same content always refer to the same object.", answer: true, explanation: "String literals with same content are interned and refer to the same object in the pool." },
    { id: "string-tf-19", question: "compareTo() compares strings lexicographically.", answer: true, explanation: "compareTo() compares strings based on Unicode values (dictionary order)." },
    { id: "string-tf-20", question: "String concatenation using + creates a new string.", answer: true, explanation: "Since strings are immutable, concatenation always creates a new string object." },
  ],

  // ========== 11. SHORT ANSWER QUESTIONS ==========
  shortAnswerQuestions: [
    { id: "string-sa-1", question: "What is a String in Java?", answer: "A String is a sequence of characters. In Java, it's an object of the String class, which is part of java.lang package. Strings are immutable." },
    { id: "string-sa-2", question: "Are strings in Java mutable or immutable?", answer: "Strings in Java are immutable. Once created, their content cannot be changed. Any operation that appears to modify a string actually creates a new string object." },
    { id: "string-sa-3", question: "What is the String Pool?", answer: "String Pool is a special area in heap memory where string literals are stored. When you create a string literal, Java checks if it already exists in the pool. If yes, it returns the reference to the existing string." },
    { id: "string-sa-4", question: "What is the difference between == and equals() for strings?", answer: "== compares references (memory addresses), while equals() compares content. Use == only to check if two references point to the same object. Use equals() to check if two strings have the same content." },
    { id: "string-sa-5", question: "What does length() method return?", answer: "length() returns the number of characters in the string. Note: it's a method with parentheses, not a property like arrays." },
    { id: "string-sa-6", question: "What is the difference between substring() and substring(begin)?", answer: "substring(begin, end) returns characters from beginIndex to endIndex-1. substring(begin) returns characters from beginIndex to the end of the string." },
    { id: "string-sa-7", question: "What does indexOf() return when substring is not found?", answer: "indexOf() returns -1 when the specified character or substring is not found in the string." },
    { id: "string-sa-8", question: "What is the difference between toUpperCase() and toLowerCase()?", answer: "toUpperCase() converts all characters to uppercase and returns a new string. toLowerCase() converts all characters to lowercase and returns a new string. Neither modifies the original string." },
    { id: "string-sa-9", question: "What does trim() do?", answer: "trim() removes leading and trailing whitespace (spaces, tabs, newlines) from a string and returns a new trimmed string." },
    { id: "string-sa-10", question: "What is the difference between String, StringBuffer, and StringBuilder?", answer: "String is immutable. StringBuffer is mutable and thread-safe (synchronized). StringBuilder is mutable but not thread-safe (faster). Use StringBuffer when thread safety is needed, StringBuilder for single-threaded operations." },
    { id: "string-sa-11", question: "What does charAt() method do?", answer: "charAt(index) returns the character at the specified index. String indices start at 0, so charAt(0) returns the first character." },
    { id: "string-sa-12", question: "What is the difference between indexOf() and lastIndexOf()?", answer: "indexOf() returns the index of the first occurrence of a character or substring. lastIndexOf() returns the index of the last occurrence." },
    { id: "string-sa-13", question: "What does startsWith() and endsWith() do?", answer: "startsWith(prefix) returns true if the string begins with the specified prefix. endsWith(suffix) returns true if the string ends with the specified suffix." },
    { id: "string-sa-14", question: "What is a palindrome?", answer: "A palindrome is a string that reads the same forwards and backwards. Examples: 'madam', 'racecar', 'level'." },
    { id: "string-sa-15", question: "What is an anagram?", answer: "Two strings are anagrams if they contain the same characters in different orders. Example: 'listen' and 'silent' are anagrams." },
    { id: "string-sa-16", question: "What does split() method do?", answer: "split() divides a string into an array of substrings based on a delimiter (separator). The delimiter is a regular expression." },
    { id: "string-sa-17", question: "What does toCharArray() do?", answer: "toCharArray() converts a string to a character array. Each character of the string becomes an element in the array." },
    { id: "string-sa-18", question: "What is the difference between concat() and + operator?", answer: "Both concatenate strings. concat() is a method that only works with strings. + operator can concatenate strings with other data types (automatically converts to string)." },
    { id: "string-sa-19", question: "What does replace() method do?", answer: "replace() replaces all occurrences of a character or substring with another character or substring. It returns a new string with replacements." },
    { id: "string-sa-20", question: "What is the time complexity of string concatenation in a loop?", answer: "String concatenation in a loop has O(n²) time complexity because strings are immutable. Each concatenation creates a new string. Use StringBuilder for O(n) complexity." },
  ],

  // ========== 12. LONG ANSWER QUESTIONS ==========
  longAnswerQuestions: [
    {
      id: "string-la-1",
      question: "Explain String class in Java with its important methods.",
      answer: "String is a class in java.lang package used to represent a sequence of characters.\n\nCreation:\nString s1 = 'hello';                    // String literal\nString s2 = new String('world');        // Using new keyword\n\nImportant Methods:\n\n1. length() - Returns number of characters\n   int len = s.length();\n\n2. charAt(index) - Returns character at specified index\n   char ch = s.charAt(0);\n\n3. substring(begin, end) - Returns substring\n   String sub = s.substring(1, 3);\n\n4. equals(str) - Compares content\n   boolean isEqual = s1.equals(s2);\n\n5. compareTo(str) - Lexicographic comparison\n   int result = s1.compareTo(s2);\n\n6. indexOf(ch) - Returns index of first occurrence\n   int idx = s.indexOf('l');\n\n7. lastIndexOf(ch) - Returns index of last occurrence\n   int idx = s.lastIndexOf('l');\n\n8. toUpperCase() - Converts to uppercase\n   String upper = s.toUpperCase();\n\n9. toLowerCase() - Converts to lowercase\n   String lower = s.toLowerCase();\n\n10. trim() - Removes leading and trailing spaces\n    String trimmed = s.trim();\n\n11. replace(old, new) - Replaces characters\n    String replaced = s.replace('a', 'b');\n\n12. split(delimiter) - Splits into array\n    String[] words = s.split(' ');\n\n13. contains(str) - Checks if contains substring\n    boolean has = s.contains('lo');\n\n14. startsWith(prefix) - Checks if starts with prefix\n    boolean start = s.startsWith('he');\n\n15. endsWith(suffix) - Checks if ends with suffix\n    boolean end = s.endsWith('lo');",
    },
    {
      id: "string-la-2",
      question: "Explain the difference between == and equals() for string comparison with examples.",
      answer: "DIFFERENCE BETWEEN == AND equals():\n\n== Operator:\n- Compares references (memory addresses)\n- Checks if two references point to the same object\n- Returns true if both references are identical\n\nequals() Method:\n- Compares content of strings\n- Checks if two strings have same characters\n- Returns true if content is same\n\nExample 1: String Literals\nString s1 = 'hello';\nString s2 = 'hello';\nSystem.out.println(s1 == s2);           // true (same pool object)\nSystem.out.println(s1.equals(s2));      // true (same content)\n\nExample 2: Using new keyword\nString s1 = 'hello';\nString s2 = new String('hello');\nSystem.out.println(s1 == s2);           // false (different objects)\nSystem.out.println(s1.equals(s2));      // true (same content)\n\nExample 3: Different content\nString s1 = 'hello';\nString s2 = 'world';\nSystem.out.println(s1 == s2);           // false (different objects)\nSystem.out.println(s1.equals(s2));      // false (different content)\n\nKey Points:\n- Always use equals() for string content comparison\n- == can be used to check if two references are identical\n- String literals with same content share the same pool object\n- Strings created with new keyword are always in heap memory",
    },
    {
      id: "string-la-3",
      question: "Write a program to check if a string is a palindrome.",
      answer: "Program to check palindrome:\n\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        System.out.print('Enter a string: ');\n        String s = sc.nextLine();\n        \n        // Convert to lowercase for case-insensitive comparison\n        s = s.toLowerCase();\n        \n        boolean isPalindrome = true;\n        int left = 0;\n        int right = s.length() - 1;\n        \n        while (left < right) {\n            if (s.charAt(left) != s.charAt(right)) {\n                isPalindrome = false;\n                break;\n            }\n            left++;\n            right--;\n        }\n        \n        if (isPalindrome) {\n            System.out.println(s + ' is a palindrome');\n        } else {\n            System.out.println(s + ' is not a palindrome');\n        }\n        \n        sc.close();\n    }\n}\n\nExample Run:\nEnter a string: madam\nmadam is a palindrome\n\nEnter a string: hello\nhello is not a palindrome\n\nExplanation:\n1. Convert to lowercase for case-insensitive comparison.\n2. Use two pointers: left (start) and right (end).\n3. Compare characters at left and right.\n4. If any pair doesn't match, not a palindrome.\n5. Move pointers towards center.\n6. Time complexity: O(n), Space complexity: O(1).",
    },
    {
      id: "string-la-4",
      question: "Write a program to count the frequency of each character in a string.",
      answer: "Program to count character frequency:\n\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        System.out.print('Enter a string: ');\n        String s = sc.nextLine();\n        \n        int[] freq = new int[256];  // For all ASCII characters\n        \n        for (int i = 0; i < s.length(); i++) {\n            char ch = s.charAt(i);\n            freq[ch]++;\n        }\n        \n        System.out.println('Character frequencies:');\n        for (int i = 0; i < 256; i++) {\n            if (freq[i] > 0) {\n                System.out.println((char) i + ': ' + freq[i]);\n            }\n        }\n        \n        sc.close();\n    }\n}\n\nExample Run:\nEnter a string: hello\nCharacter frequencies:\nh: 1\ne: 1\nl: 2\no: 1\n\nExplanation:\n1. Create frequency array for all ASCII characters (256).\n2. For each character, increment its frequency.\n3. Use character's ASCII value as array index.\n4. Print characters with frequency > 0.\n5. Time complexity: O(n), Space complexity: O(1) (fixed size array).",
    },
    {
      id: "string-la-5",
      question: "Write a program to check if two strings are anagrams.",
      answer: "Program to check anagrams:\n\nimport java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        System.out.print('Enter first string: ');\n        String s1 = sc.nextLine();\n        System.out.print('Enter second string: ');\n        String s2 = sc.nextLine();\n        \n        // Remove spaces and convert to lowercase\n        s1 = s1.replace(' ', '').toLowerCase();\n        s2 = s2.replace(' ', '').toLowerCase();\n        \n        // Check if lengths are equal\n        if (s1.length() != s2.length()) {\n            System.out.println('Not anagrams');\n            return;\n        }\n        \n        // Convert to character arrays and sort\n        char[] arr1 = s1.toCharArray();\n        char[] arr2 = s2.toCharArray();\n        Arrays.sort(arr1);\n        Arrays.sort(arr2);\n        \n        // Compare sorted arrays\n        boolean isAnagram = Arrays.equals(arr1, arr2);\n        \n        if (isAnagram) {\n            System.out.println('Anagrams');\n        } else {\n            System.out.println('Not anagrams');\n        }\n        \n        sc.close();\n    }\n}\n\nExample Run:\nEnter first string: listen\nEnter second string: silent\nAnagrams\n\nExplanation:\n1. Remove spaces and convert to lowercase.\n2. Check if lengths are equal (anagrams must have same length).\n3. Convert to character arrays.\n4. Sort both arrays.\n5. If sorted arrays are equal, strings are anagrams.\n6. Time complexity: O(n log n) due to sorting.",
    },
    {
      id: "string-la-6",
      question: "Write a program to reverse a string.",
      answer: "Program to reverse a string:\n\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        System.out.print('Enter a string: ');\n        String s = sc.nextLine();\n        \n        // Method 1: Using StringBuilder\n        StringBuilder sb = new StringBuilder(s);\n        String reversed1 = sb.reverse().toString();\n        System.out.println('Reversed (StringBuilder): ' + reversed1);\n        \n        // Method 2: Using character array\n        char[] chars = s.toCharArray();\n        int left = 0;\n        int right = chars.length - 1;\n        \n        while (left < right) {\n            char temp = chars[left];\n            chars[left] = chars[right];\n            chars[right] = temp;\n            left++;\n            right--;\n        }\n        \n        String reversed2 = new String(chars);\n        System.out.println('Reversed (character array): ' + reversed2);\n        \n        // Method 3: Using concatenation\n        String reversed3 = '';\n        for (int i = s.length() - 1; i >= 0; i--) {\n            reversed3 = reversed3 + s.charAt(i);\n        }\n        System.out.println('Reversed (concatenation): ' + reversed3);\n        \n        sc.close();\n    }\n}\n\nExample Run:\nEnter a string: hello\nReversed (StringBuilder): olleh\nReversed (character array): olleh\nReversed (concatenation): olleh\n\nExplanation:\n1. StringBuilder has built-in reverse() method (most efficient).\n2. Character array method swaps characters from both ends.\n3. Concatenation method builds reversed string character by character.\n4. StringBuilder is most efficient for string manipulation.",
    },
    {
      id: "string-la-7",
      question: "Write a program to convert a string to title case.",
      answer: "Program to convert to title case:\n\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        System.out.print('Enter a string: ');\n        String s = sc.nextLine();\n        \n        String[] words = s.split(' ');\n        String titleCase = '';\n        \n        for (int i = 0; i < words.length; i++) {\n            if (words[i].length() > 0) {\n                // Capitalize first letter, lowercase rest\n                char first = Character.toUpperCase(words[i].charAt(0));\n                String rest = words[i].substring(1).toLowerCase();\n                titleCase = titleCase + first + rest;\n                \n                if (i < words.length - 1) {\n                    titleCase = titleCase + ' ';\n                }\n            }\n        }\n        \n        System.out.println('Title case: ' + titleCase);\n        \n        sc.close();\n    }\n}\n\nExample Run:\nEnter a string: hello world java\nTitle case: Hello World Java\n\nExplanation:\n1. Split string into words.\n2. For each word, capitalize first letter and lowercase rest.\n3. Use Character.toUpperCase() for single character.\n4. Combine words with spaces.\n5. Title case means first letter of each word is uppercase.",
    },
    {
      id: "string-la-8",
      question: "Write a program to find the first non-repeating character in a string.",
      answer: "Program to find first non-repeating character:\n\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        System.out.print('Enter a string: ');\n        String s = sc.nextLine();\n        \n        int[] freq = new int[256];\n        \n        // Count frequencies\n        for (int i = 0; i < s.length(); i++) {\n            freq[s.charAt(i)]++;\n        }\n        \n        // Find first non-repeating character\n        char firstNonRepeat = ' ';\n        for (int i = 0; i < s.length(); i++) {\n            if (freq[s.charAt(i)] == 1) {\n                firstNonRepeat = s.charAt(i);\n                break;\n            }\n        }\n        \n        if (firstNonRepeat != ' ') {\n            System.out.println('First non-repeating character: ' + firstNonRepeat);\n        } else {\n            System.out.println('No non-repeating character found');\n        }\n        \n        sc.close();\n    }\n}\n\nExample Run:\nEnter a string: swiss\nFirst non-repeating character: w\n\nExplanation:\n1. Count frequency of each character.\n2. Traverse string again to find first character with frequency 1.\n3. 'w' appears only once and is the first such character.\n4. 's' appears 3 times, 'i' appears 1 time (but comes after 'w').\n5. Time complexity: O(n), Space complexity: O(1).",
    },
    {
      id: "string-la-9",
      question: "Write a program to count vowels and consonants in a string.",
      answer: "Program to count vowels and consonants:\n\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        System.out.print('Enter a string: ');\n        String s = sc.nextLine();\n        s = s.toLowerCase();\n        \n        int vowels = 0;\n        int consonants = 0;\n        \n        for (int i = 0; i < s.length(); i++) {\n            char ch = s.charAt(i);\n            \n            if (ch >= 'a' && ch <= 'z') {\n                if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {\n                    vowels++;\n                } else {\n                    consonants++;\n                }\n            }\n        }\n        \n        System.out.println('Vowels: ' + vowels);\n        System.out.println('Consonants: ' + consonants);\n        \n        sc.close();\n    }\n}\n\nExample Run:\nEnter a string: Hello World\nVowels: 3\nConsonants: 7\n\nExplanation:\n1. Convert to lowercase for easier comparison.\n2. Check if character is a letter (between 'a' and 'z').\n3. If letter is a, e, i, o, or u, it's a vowel.\n4. Otherwise, it's a consonant.\n5. Ignore non-alphabetic characters (spaces, digits, etc.).\n6. Vowels: e, o, o (3). Consonants: h, l, l, w, r, l, d (7).",
    },
    {
      id: "string-la-10",
      question: "Write a program to reverse words in a string.",
      answer: "Program to reverse words:\n\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n        System.out.print('Enter a string: ');\n        String s = sc.nextLine();\n        \n        String[] words = s.split(' ');\n        String reversed = '';\n        \n        for (int i = words.length - 1; i >= 0; i--) {\n            reversed = reversed + words[i];\n            if (i > 0) {\n                reversed = reversed + ' ';\n            }\n        }\n        \n        System.out.println('Original: ' + s);\n        System.out.println('Reversed words: ' + reversed);\n        \n        sc.close();\n    }\n}\n\nExample Run:\nEnter a string: Hello World Java\nReversed words: Java World Hello\n\nExplanation:\n1. Split string into words using space as delimiter.\n2. Traverse words array in reverse order.\n3. Append each word to result string.\n4. Add space between words (except after last word).\n5. Words are reversed, not characters within words.\n6. Time complexity: O(n), where n is the number of words.",
    },
  ],

  // ========== 13. PROGRAMMING QUESTIONS ==========
  programmingQuestions: {
    easy: [
      {
        id: "string-pg-e-1",
        question: "Write a program to input a string and print its length.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        System.out.println("Length: " + s.length());
        
        sc.close();
    }
}`,
        output: "Enter a string: hello\nLength: 5",
      },
      {
        id: "string-pg-e-2",
        question: "Write a program to print each character of a string on a new line.",
        solution: `public class Main {
    public static void main(String[] args) {
        String s = "hello";
        
        for (int i = 0; i < s.length(); i++) {
            System.out.println(s.charAt(i));
        }
    }
}`,
        output: "h\ne\nl\nl\no",
      },
      {
        id: "string-pg-e-3",
        question: "Write a program to convert a string to uppercase and lowercase.",
        solution: `public class Main {
    public static void main(String[] args) {
        String s = "Hello World";
        
        System.out.println("Original: " + s);
        System.out.println("Uppercase: " + s.toUpperCase());
        System.out.println("Lowercase: " + s.toLowerCase());
    }
}`,
        output: "Original: Hello World\nUppercase: HELLO WORLD\nLowercase: hello world",
      },
      {
        id: "string-pg-e-4",
        question: "Write a program to check if a string is empty.",
        solution: `public class Main {
    public static void main(String[] args) {
        String s1 = "";
        String s2 = "hello";
        
        System.out.println("s1 is empty: " + s1.isEmpty());
        System.out.println("s2 is empty: " + s2.isEmpty());
        System.out.println("s1 length: " + s1.length());
    }
}`,
        output: "s1 is empty: true\ns2 is empty: false\ns1 length: 0",
      },
      {
        id: "string-pg-e-5",
        question: "Write a program to trim a string.",
        solution: `public class Main {
    public static void main(String[] args) {
        String s = "  hello world  ";
        
        System.out.println("Original: '" + s + "'");
        System.out.println("Trimmed: '" + s.trim() + "'");
        System.out.println("Length before: " + s.length());
        System.out.println("Length after: " + s.trim().length());
    }
}`,
        output: "Original: '  hello world  '\nTrimmed: 'hello world'\nLength before: 13\nLength after: 11",
      },
      {
        id: "string-pg-e-6",
        question: "Write a program to concatenate two strings.",
        solution: `public class Main {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "World";
        
        // Using + operator
        String s3 = s1 + " " + s2;
        System.out.println("Using +: " + s3);
        
        // Using concat()
        String s4 = s1.concat(" ").concat(s2);
        System.out.println("Using concat(): " + s4);
    }
}`,
        output: "Using +: Hello World\nUsing concat(): Hello World",
      },
      {
        id: "string-pg-e-7",
        question: "Write a program to replace a character in a string.",
        solution: `public class Main {
    public static void main(String[] args) {
        String s = "hello world";
        
        System.out.println("Original: " + s);
        System.out.println("Replace 'l' with 'x': " + s.replace('l', 'x'));
        System.out.println("Replace 'world' with 'java': " + s.replace("world", "java"));
    }
}`,
        output: "Original: hello world\nReplace 'l' with 'x': hexxo worxd\nReplace 'world' with 'java': hello java",
      },
      {
        id: "string-pg-e-8",
        question: "Write a program to check if a string starts and ends with specific characters.",
        solution: `public class Main {
    public static void main(String[] args) {
        String s = "hello world";
        
        System.out.println("Starts with 'he': " + s.startsWith("he"));
        System.out.println("Ends with 'ld': " + s.endsWith("ld"));
        System.out.println("Contains 'lo wo': " + s.contains("lo wo"));
    }
}`,
        output: "Starts with 'he': true\nEnds with 'ld': true\nContains 'lo wo': true",
      },
      {
        id: "string-pg-e-9",
        question: "Write a program to split a string into words.",
        solution: `public class Main {
    public static void main(String[] args) {
        String s = "apple banana orange";
        String[] fruits = s.split(" ");
        
        System.out.println("Words:");
        for (int i = 0; i < fruits.length; i++) {
            System.out.println(fruits[i]);
        }
    }
}`,
        output: "Words:\napple\nbanana\norange",
      },
      {
        id: "string-pg-e-10",
        question: "Write a program to convert a string to a character array.",
        solution: `public class Main {
    public static void main(String[] args) {
        String s = "hello";
        char[] chars = s.toCharArray();
        
        System.out.print("Characters: ");
        for (int i = 0; i < chars.length; i++) {
            System.out.print(chars[i] + " ");
        }
    }
}`,
        output: "Characters: h e l l o ",
      },
    ],
    medium: [
      {
        id: "string-pg-m-1",
        question: "Write a program to check if a string is a palindrome.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        s = s.toLowerCase();
        
        boolean isPalindrome = true;
        for (int i = 0; i < s.length() / 2; i++) {
            if (s.charAt(i) != s.charAt(s.length() - 1 - i)) {
                isPalindrome = false;
                break;
            }
        }
        
        System.out.println("Is palindrome: " + isPalindrome);
        
        sc.close();
    }
}`,
        output: "Enter a string: madam\nIs palindrome: true",
      },
      {
        id: "string-pg-m-2",
        question: "Write a program to count frequency of each character in a string.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        int[] freq = new int[256];
        
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i)]++;
        }
        
        System.out.println("Character frequencies:");
        for (int i = 0; i < 256; i++) {
            if (freq[i] > 0) {
                System.out.println((char) i + ": " + freq[i]);
            }
        }
        
        sc.close();
    }
}`,
        output: "Enter a string: hello\nCharacter frequencies:\nh: 1\ne: 1\nl: 2\no: 1",
      },
      {
        id: "string-pg-m-3",
        question: "Write a program to check if two strings are anagrams.",
        solution: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first string: ");
        String s1 = sc.nextLine();
        System.out.print("Enter second string: ");
        String s2 = sc.nextLine();
        
        s1 = s1.replace(" ", "").toLowerCase();
        s2 = s2.replace(" ", "").toLowerCase();
        
        if (s1.length() != s2.length()) {
            System.out.println("Not anagrams");
            return;
        }
        
        char[] arr1 = s1.toCharArray();
        char[] arr2 = s2.toCharArray();
        Arrays.sort(arr1);
        Arrays.sort(arr2);
        
        boolean isAnagram = Arrays.equals(arr1, arr2);
        System.out.println("Anagrams: " + isAnagram);
        
        sc.close();
    }
}`,
        output: "Enter first string: listen\nEnter second string: silent\nAnagrams: true",
      },
      {
        id: "string-pg-m-4",
        question: "Write a program to reverse a string.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        // Using StringBuilder
        StringBuilder sb = new StringBuilder(s);
        String reversed = sb.reverse().toString();
        
        System.out.println("Reversed: " + reversed);
        
        sc.close();
    }
}`,
        output: "Enter a string: hello\nReversed: olleh",
      },
      {
        id: "string-pg-m-5",
        question: "Write a program to count vowels and consonants in a string.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        s = s.toLowerCase();
        
        int vowels = 0, consonants = 0;
        
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch >= 'a' && ch <= 'z') {
                if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            }
        }
        
        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
        
        sc.close();
    }
}`,
        output: "Enter a string: Hello World\nVowels: 3\nConsonants: 7",
      },
      {
        id: "string-pg-m-6",
        question: "Write a program to find the first non-repeating character in a string.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        int[] freq = new int[256];
        
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i)]++;
        }
        
        char firstNonRepeat = ' ';
        for (int i = 0; i < s.length(); i++) {
            if (freq[s.charAt(i)] == 1) {
                firstNonRepeat = s.charAt(i);
                break;
            }
        }
        
        System.out.println("First non-repeating: " + firstNonRepeat);
        
        sc.close();
    }
}`,
        output: "Enter a string: swiss\nFirst non-repeating: w",
      },
      {
        id: "string-pg-m-7",
        question: "Write a program to count words in a string.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        String[] words = s.split(" ");
        int wordCount = words.length;
        
        System.out.println("Word count: " + wordCount);
        
        sc.close();
    }
}`,
        output: "Enter a string: Hello World Java\nWord count: 3",
      },
      {
        id: "string-pg-m-8",
        question: "Write a program to reverse words in a string.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        String[] words = s.split(" ");
        String reversed = "";
        
        for (int i = words.length - 1; i >= 0; i--) {
            reversed = reversed + words[i];
            if (i > 0) {
                reversed = reversed + " ";
            }
        }
        
        System.out.println("Reversed: " + reversed);
        
        sc.close();
    }
}`,
        output: "Enter a string: Hello World Java\nReversed: Java World Hello",
      },
      {
        id: "string-pg-m-9",
        question: "Write a program to check if a string contains only digits.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        boolean allDigits = true;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) < '0' || s.charAt(i) > '9') {
                allDigits = false;
                break;
            }
        }
        
        System.out.println("All digits: " + allDigits);
        
        sc.close();
    }
}`,
        output: "Enter a string: 12345\nAll digits: true",
      },
      {
        id: "string-pg-m-10",
        question: "Write a program to convert a string to title case.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        String[] words = s.split(" ");
        String titleCase = "";
        
        for (int i = 0; i < words.length; i++) {
            if (words[i].length() > 0) {
                char first = Character.toUpperCase(words[i].charAt(0));
                String rest = words[i].substring(1).toLowerCase();
                titleCase = titleCase + first + rest;
                if (i < words.length - 1) {
                    titleCase = titleCase + " ";
                }
            }
        }
        
        System.out.println("Title case: " + titleCase);
        
        sc.close();
    }
}`,
        output: "Enter a string: hello world java\nTitle case: Hello World Java",
      },
    ],
    hard: [
      {
        id: "string-pg-h-1",
        question: "Write a program to find all permutations of a string.",
        solution: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        String s = "abc";
        ArrayList<String> permutations = new ArrayList<>();
        
        permute(s, 0, s.length() - 1, permutations);
        
        System.out.println("Permutations:");
        for (String perm : permutations) {
            System.out.println(perm);
        }
    }
    
    public static void permute(String str, int left, int right, ArrayList<String> result) {
        if (left == right) {
            result.add(str);
        } else {
            for (int i = left; i <= right; i++) {
                str = swap(str, left, i);
                permute(str, left + 1, right, result);
                str = swap(str, left, i);  // backtrack
            }
        }
    }
    
    public static String swap(String s, int i, int j) {
        char[] chars = s.toCharArray();
        char temp = chars[i];
        chars[i] = chars[j];
        chars[j] = temp;
        return new String(chars);
    }
}`,
        output: "Permutations:\nabc\nacb\nbac\nbca\ncab\ncba",
      },
      {
        id: "string-pg-h-2",
        question: "Write a program to implement run-length encoding.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        String compressed = "";
        int count = 1;
        
        for (int i = 0; i < s.length(); i++) {
            if (i < s.length() - 1 && s.charAt(i) == s.charAt(i + 1)) {
                count++;
            } else {
                compressed = compressed + s.charAt(i) + count;
                count = 1;
            }
        }
        
        System.out.println("Original: " + s);
        System.out.println("Compressed: " + compressed);
        
        sc.close();
    }
}`,
        output: "Enter a string: aaabbbcccaaa\nOriginal: aaabbbcccaaa\nCompressed: a3b3c3a3",
      },
      {
        id: "string-pg-h-3",
        question: "Write a program to find the longest word in a string.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        String[] words = s.split(" ");
        String longest = words[0];
        
        for (int i = 1; i < words.length; i++) {
            if (words[i].length() > longest.length()) {
                longest = words[i];
            }
        }
        
        System.out.println("Longest word: " + longest);
        System.out.println("Length: " + longest.length());
        
        sc.close();
    }
}`,
        output: "Enter a string: The quick brown fox jumps\nLongest word: jumps\nLength: 5",
      },
      {
        id: "string-pg-h-4",
        question: "Write a program to count occurrences of each word in a string.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        String[] words = s.split(" ");
        int[] freq = new int[words.length];
        
        for (int i = 0; i < words.length; i++) {
            int count = 1;
            if (freq[i] == 0) {
                for (int j = i + 1; j < words.length; j++) {
                    if (words[i].equals(words[j])) {
                        count++;
                        freq[j] = -1;
                    }
                }
                freq[i] = count;
            }
        }
        
        System.out.println("Word frequencies:");
        for (int i = 0; i < words.length; i++) {
            if (freq[i] > 0) {
                System.out.println(words[i] + ": " + freq[i]);
            }
        }
        
        sc.close();
    }
}`,
        output: "Enter a string: apple banana apple orange banana apple\nWord frequencies:\napple: 3\nbanana: 2\norange: 1",
      },
      {
        id: "string-pg-h-5",
        question: "Write a program to check if a string is a valid identifier.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        boolean isValid = true;
        
        if (s.length() > 0) {
            char first = s.charAt(0);
            if (!((first >= 'a' && first <= 'z') || (first >= 'A' && first <= 'Z') || first == '_')) {
                isValid = false;
            }
            
            for (int i = 1; i < s.length() && isValid; i++) {
                char ch = s.charAt(i);
                if (!((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9') || ch == '_')) {
                    isValid = false;
                }
            }
        } else {
            isValid = false;
        }
        
        System.out.println("Valid identifier: " + isValid);
        
        sc.close();
    }
}`,
        output: "Enter a string: myVariable123\nValid identifier: true",
      },
      {
        id: "string-pg-h-6",
        question: "Write a program to find all occurrences of a substring.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter string: ");
        String s = sc.nextLine();
        System.out.print("Enter target: ");
        String target = sc.nextLine();
        
        int count = 0;
        int index = 0;
        
        while ((index = s.indexOf(target, index)) != -1) {
            count++;
            index = index + target.length();
        }
        
        System.out.println("Occurrences: " + count);
        
        sc.close();
    }
}`,
        output: "Enter string: hello world hello java hello\nEnter target: hello\nOccurrences: 3",
      },
      {
        id: "string-pg-h-7",
        question: "Write a program to swap first and last characters of each word.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        String[] words = s.split(" ");
        String result = "";
        
        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            if (word.length() > 1) {
                char first = word.charAt(0);
                char last = word.charAt(word.length() - 1);
                String middle = word.substring(1, word.length() - 1);
                result = result + last + middle + first;
            } else {
                result = result + word;
            }
            if (i < words.length - 1) {
                result = result + " ";
            }
        }
        
        System.out.println("Swapped: " + result);
        
        sc.close();
    }
}`,
        output: "Enter a string: Hello World Java\nSwapped: oellH dlroW aJv",
      },
      {
        id: "string-pg-h-8",
        question: "Write a program to check if a string is a valid palindrome (ignoring case and spaces).",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        // Remove spaces and convert to lowercase
        s = s.toLowerCase().replace(" ", "");
        
        boolean isPalindrome = true;
        for (int i = 0; i < s.length() / 2; i++) {
            if (s.charAt(i) != s.charAt(s.length() - 1 - i)) {
                isPalindrome = false;
                break;
            }
        }
        
        System.out.println("Is palindrome: " + isPalindrome);
        
        sc.close();
    }
}`,
        output: "Enter a string: A man a plan a canal Panama\nIs palindrome: true",
      },
      {
        id: "string-pg-h-9",
        question: "Write a program to convert integer to string and string to integer.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // Integer to String
        int num = 12345;
        String s1 = String.valueOf(num);
        String s2 = Integer.toString(num);
        String s3 = num + "";
        
        System.out.println("Integer: " + num);
        System.out.println("String (valueOf): " + s1);
        System.out.println("String (toString): " + s2);
        
        // String to Integer
        System.out.print("\\nEnter a number string: ");
        String s = sc.nextLine();
        int n = Integer.parseInt(s);
        
        System.out.println("Integer: " + n);
        System.out.println("Integer + 10: " + (n + 10));
        
        sc.close();
    }
}`,
        output: "Integer: 12345\nString (valueOf): 12345\nString (toString): 12345\n\nEnter a number string: 67890\nInteger: 67890\nInteger + 10: 67900",
      },
      {
        id: "string-pg-h-10",
        question: "Write a program to remove duplicate characters from a string.",
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        String result = "";
        boolean[] visited = new boolean[256];
        
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (!visited[ch]) {
                result = result + ch;
                visited[ch] = true;
            }
        }
        
        System.out.println("Original: " + s);
        System.out.println("Without duplicates: " + result);
        
        sc.close();
    }
}`,
        output: "Enter a string: programming\nOriginal: programming\nWithout duplicates: progamin",
      },
    ],
  },

  // ========== 14. CHALLENGE PROBLEMS ==========
  challengeProblems: [
    {
      id: "string-cp-1",
      title: "Longest Palindromic Substring",
      question: "Find the longest palindromic substring in a given string.",
      solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        String longestPalindrome = "";
        int maxLength = 0;
        
        for (int i = 0; i < s.length(); i++) {
            // Odd length palindrome
            String odd = expandAroundCenter(s, i, i);
            // Even length palindrome
            String even = expandAroundCenter(s, i, i + 1);
            
            if (odd.length() > maxLength) {
                maxLength = odd.length();
                longestPalindrome = odd;
            }
            if (even.length() > maxLength) {
                maxLength = even.length();
                longestPalindrome = even;
            }
        }
        
        System.out.println("Longest palindrome: " + longestPalindrome);
        System.out.println("Length: " + maxLength);
        
        sc.close();
    }
    
    public static String expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return s.substring(left + 1, right);
    }
}`,
      output: "Enter a string: babad\nLongest palindrome: bab\nLength: 3",
    },
    {
      id: "string-cp-2",
      title: "String Compression",
      question: "Compress a string using run-length encoding. If compressed string is not shorter, return original.",
      solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        String compressed = compress(s);
        
        if (compressed.length() < s.length()) {
            System.out.println("Compressed: " + compressed);
        } else {
            System.out.println("Original: " + s);
        }
        
        sc.close();
    }
    
    public static String compress(String s) {
        StringBuilder sb = new StringBuilder();
        int count = 1;
        
        for (int i = 0; i < s.length(); i++) {
            if (i < s.length() - 1 && s.charAt(i) == s.charAt(i + 1)) {
                count++;
            } else {
                sb.append(s.charAt(i));
                sb.append(count);
                count = 1;
            }
        }
        
        return sb.toString();
    }
}`,
      output: "Enter a string: aaabbbcccaaa\nCompressed: a3b3c3a3",
    },
    {
      id: "string-cp-3",
      title: "Group Anagrams",
      question: "Group anagrams together from an array of strings.",
      solution: `import java.util.Scanner;
import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of strings: ");
        int n = sc.nextInt();
        sc.nextLine();
        
        String[] arr = new String[n];
        System.out.println("Enter strings:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextLine();
        }
        
        System.out.println("Anagram groups:");
        for (int i = 0; i < n; i++) {
            if (arr[i] != null) {
                System.out.print(arr[i] + " ");
                String sorted1 = sortString(arr[i]);
                
                for (int j = i + 1; j < n; j++) {
                    if (arr[j] != null && sorted1.equals(sortString(arr[j]))) {
                        System.out.print(arr[j] + " ");
                        arr[j] = null;
                    }
                }
                System.out.println();
            }
        }
        
        sc.close();
    }
    
    public static String sortString(String s) {
        char[] chars = s.toCharArray();
        java.util.Arrays.sort(chars);
        return new String(chars);
    }
}`,
      output: "Enter number of strings: 6\nEnter strings:\neat\ntea\ntan\nate\nnat\nbat\nAnagram groups:\neat tea ate \ntan nat \nbat",
    },
    {
      id: "string-cp-4",
      title: "Longest Common Prefix",
      question: "Find the longest common prefix string amongst an array of strings.",
      solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter number of strings: ");
        int n = sc.nextInt();
        sc.nextLine();
        
        String[] arr = new String[n];
        System.out.println("Enter strings:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextLine();
        }
        
        String longestPrefix = findLongestPrefix(arr);
        System.out.println("Longest common prefix: " + longestPrefix);
        
        sc.close();
    }
    
    public static String findLongestPrefix(String[] arr) {
        if (arr.length == 0) return "";
        
        String prefix = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            while (arr[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        
        return prefix;
    }
}`,
      output: "Enter number of strings: 3\nEnter strings:\nflower\nflow\nflight\nLongest common prefix: fl",
    },
    {
      id: "string-cp-5",
      title: "Valid Parentheses",
      question: "Check if a string containing only parentheses is valid.",
      solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        boolean isValid = isValidParentheses(s);
        System.out.println("Valid: " + isValid);
        
        sc.close();
    }
    
    public static boolean isValidParentheses(String s) {
        int count = 0;
        
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            
            if (ch == '(') {
                count++;
            } else if (ch == ')') {
                count--;
                if (count < 0) {
                    return false;
                }
            }
        }
        
        return count == 0;
    }
}`,
      output: "Enter a string: (())()\nValid: true",
    },
    {
      id: "string-cp-6",
      title: "Count and Say",
      question: "Generate the nth term of the count-and-say sequence.",
      solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        
        String result = countAndSay(n);
        System.out.println("Term " + n + ": " + result);
        
        sc.close();
    }
    
    public static String countAndSay(int n) {
        String result = "1";
        
        for (int i = 1; i < n; i++) {
            StringBuilder sb = new StringBuilder();
            int count = 1;
            
            for (int j = 1; j < result.length(); j++) {
                if (result.charAt(j) == result.charAt(j - 1)) {
                    count++;
                } else {
                    sb.append(count);
                    sb.append(result.charAt(j - 1));
                    count = 1;
                }
            }
            
            sb.append(count);
            sb.append(result.charAt(result.length() - 1));
            result = sb.toString();
        }
        
        return result;
    }
}`,
      output: "Enter n: 5\nTerm 5: 111221",
    },
    {
      id: "string-cp-7",
      title: "Longest Substring Without Repeating Characters",
      question: "Find the length of the longest substring without repeating characters.",
      solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        int maxLength = lengthOfLongestSubstring(s);
        System.out.println("Longest substring length: " + maxLength);
        
        sc.close();
    }
    
    public static int lengthOfLongestSubstring(String s) {
        int[] freq = new int[256];
        int left = 0;
        int maxLength = 0;
        
        for (int right = 0; right < s.length(); right++) {
            freq[s.charAt(right)]++;
            
            while (freq[s.charAt(right)] > 1) {
                freq[s.charAt(left)]--;
                left++;
            }
            
            maxLength = Math.max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
}`,
      output: "Enter a string: abcabcbb\nLongest substring length: 3",
    },
    {
      id: "string-cp-8",
      title: "String to Integer (atoi)",
      question: "Convert a string to an integer, handling whitespace and signs.",
      solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        
        int result = myAtoi(s);
        System.out.println("Integer: " + result);
        
        sc.close();
    }
    
    public static int myAtoi(String s) {
        s = s.trim();
        if (s.length() == 0) return 0;
        
        int sign = 1;
        int i = 0;
        int result = 0;
        
        if (s.charAt(0) == '+' || s.charAt(0) == '-') {
            sign = (s.charAt(0) == '-') ? -1 : 1;
            i++;
        }
        
        while (i < s.length() && s.charAt(i) >= '0' && s.charAt(i) <= '9') {
            int digit = s.charAt(i) - '0';
            
            if (result > Integer.MAX_VALUE / 10 || (result == Integer.MAX_VALUE / 10 && digit > 7)) {
                return (sign == 1) ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            }
            
            result = result * 10 + digit;
            i++;
        }
        
        return result * sign;
    }
}`,
      output: "Enter a string: -12345\nInteger: -12345",
    },
  ],

  // ========== 15. PREVIOUS YEAR QUESTIONS ==========
  previousYearQuestions: [
    {
      id: "string-py-1",
      question: "(ICSE 2023) Write a program to check if a string is a palindrome.",
      answer: "String s = 'madam';\nboolean isPalindrome = true;\nfor (int i = 0; i < s.length() / 2; i++) {\n    if (s.charAt(i) != s.charAt(s.length() - 1 - i)) {\n        isPalindrome = false;\n        break;\n    }\n}",
      explanation: "Compare characters from both ends moving towards center.",
    },
    {
      id: "string-py-2",
      question: "(ICSE 2023) Write a program to count the frequency of a character in a string.",
      answer: "int count = 0;\nfor (int i = 0; i < s.length(); i++) {\n    if (s.charAt(i) == target) {\n        count++;\n    }\n}",
      explanation: "Traverse string and count occurrences of target character.",
    },
    {
      id: "string-py-3",
      question: "(ICSE 2022) Write a program to reverse a string.",
      answer: "String reversed = '';\nfor (int i = s.length() - 1; i >= 0; i--) {\n    reversed = reversed + s.charAt(i);\n}",
      explanation: "Traverse string from end to beginning and concatenate characters.",
    },
    {
      id: "string-py-4",
      question: "(ICSE 2022) Write a program to check if two strings are anagrams.",
      answer: "char[] arr1 = s1.toCharArray();\nchar[] arr2 = s2.toCharArray();\nArrays.sort(arr1);\nArrays.sort(arr2);\nboolean isAnagram = Arrays.equals(arr1, arr2);",
      explanation: "Convert to arrays, sort, and compare.",
    },
    {
      id: "string-py-5",
      question: "(ICSE 2021) Write a program to convert a string to uppercase.",
      answer: "String upper = s.toUpperCase();\nSystem.out.println(upper);",
      explanation: "toUpperCase() method converts all characters to uppercase.",
    },
    {
      id: "string-py-6",
      question: "(ISC 2021) Write a program to find the first non-repeating character in a string.",
      answer: "int[] freq = new int[256];\nfor (int i = 0; i < s.length(); i++) {\n    freq[s.charAt(i)]++;\n}\nfor (int i = 0; i < s.length(); i++) {\n    if (freq[s.charAt(i)] == 1) {\n        firstNonRepeat = s.charAt(i);\n        break;\n    }\n}",
      explanation: "Count frequencies, then find first character with frequency 1.",
    },
  ],

  // ========== 16. AI VIVA QUESTIONS ==========
  aiVivaQuestions: [
    {
      id: "string-av-1",
      question: "What is a String in Java?",
      answer: "A String is a sequence of characters. In Java, it's an object of the String class in java.lang package. Strings are immutable.",
    },
    {
      id: "string-av-2",
      question: "Are strings in Java mutable or immutable?",
      answer: "Strings in Java are immutable. Once created, their content cannot be changed. Any modification creates a new string object.",
    },
    {
      id: "string-av-3",
      question: "What is the String Pool?",
      answer: "String Pool is a special area in heap memory where string literals are stored. It optimizes memory by reusing identical string literals.",
    },
    {
      id: "string-av-4",
      question: "What is the difference between == and equals()?",
      answer: "== compares references (memory addresses). equals() compares content. Use == to check if two references point to same object, equals() to check if strings have same content.",
    },
    {
      id: "string-av-5",
      question: "What does length() method return?",
      answer: "length() returns the number of characters in the string. Note: it's a method with parentheses, not a property.",
    },
    {
      id: "string-av-6",
      question: "What is the difference between substring() and substring(begin)?",
      answer: "substring(begin, end) returns characters from beginIndex to endIndex-1. substring(begin) returns characters from beginIndex to end of string.",
    },
    {
      id: "string-av-7",
      question: "What does indexOf() return when substring is not found?",
      answer: "indexOf() returns -1 when the specified character or substring is not found.",
    },
    {
      id: "string-av-8",
      question: "What is the difference between toUpperCase() and toLowerCase()?",
      answer: "Both return new strings. toUpperCase() converts to uppercase, toLowerCase() converts to lowercase. Neither modifies the original string.",
    },
    {
      id: "string-av-9",
      question: "What does trim() do?",
      answer: "trim() removes leading and trailing whitespace (spaces, tabs, newlines) and returns a new trimmed string.",
    },
    {
      id: "string-av-10",
      question: "What is the difference between String, StringBuffer, and StringBuilder?",
      answer: "String is immutable. StringBuffer is mutable and thread-safe. StringBuilder is mutable but not thread-safe (faster).",
    },
    {
      id: "string-av-11",
      question: "What is a palindrome?",
      answer: "A palindrome is a string that reads the same forwards and backwards. Examples: 'madam', 'racecar', 'level'.",
    },
    {
      id: "string-av-12",
      question: "What is an anagram?",
      answer: "Two strings are anagrams if they contain the same characters in different orders. Example: 'listen' and 'silent' are anagrams.",
    },
    {
      id: "string-av-13",
      question: "What does charAt() return?",
      answer: "charAt(index) returns the character at the specified index as a char value. Indices start at 0.",
    },
    {
      id: "string-av-14",
      question: "What is the time complexity of string concatenation in a loop?",
      answer: "O(n²) because strings are immutable. Each concatenation creates a new string. Use StringBuilder for O(n) complexity.",
    },
    {
      id: "string-av-15",
      question: "What does split() method do?",
      answer: "split() divides a string into an array of substrings based on a delimiter (regular expression).",
    },
    {
      id: "string-av-16",
      question: "What is the difference between indexOf() and lastIndexOf()?",
      answer: "indexOf() returns the index of the first occurrence. lastIndexOf() returns the index of the last occurrence.",
    },
    {
      id: "string-av-17",
      question: "What does startsWith() and endsWith() do?",
      answer: "startsWith(prefix) returns true if string begins with prefix. endsWith(suffix) returns true if string ends with suffix.",
    },
    {
      id: "string-av-18",
      question: "What does toCharArray() do?",
      answer: "toCharArray() converts a string to a character array. Each character becomes an element in the array.",
    },
    {
      id: "string-av-19",
      question: "What is the difference between concat() and + operator?",
      answer: "Both concatenate strings. concat() only works with strings. + operator can concatenate strings with other types (auto-converts to string).",
    },
    {
      id: "string-av-20",
      question: "What does replace() method do?",
      answer: "replace() replaces all occurrences of a character or substring with another and returns a new string.",
    },
  ],

  // ========== 17. PRACTICE TEST ==========
  practiceTest: {
    title: "STRINGS - Practice Test",
    duration: "60 minutes",
    totalMarks: 50,
    instructions: "Attempt all questions. Write programs with proper indentation and comments.",
    sections: [
      {
        name: "Section A: Objective Questions",
        marks: 10,
        questions: [
          { id: "pt-1", question: "Which package contains the String class?", options: ["java.util", "java.lang", "java.io", "java.string"], answer: 1 },
          { id: "pt-2", question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.length());", options: ["4", "5", "6", "Compilation error"], answer: 1 },
          { id: "pt-3", question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.charAt(1));", options: ["h", "e", "l", "o"], answer: 1 },
          { id: "pt-4", question: "Which method compares string content?", options: ["==", "equals()", "compare()", "equals"], answer: 1 },
          { id: "pt-5", question: "What does indexOf() return when substring is not found?", options: ["0", "-1", "null", "Compilation error"], answer: 1 },
        ],
      },
      {
        name: "Section B: Output Questions",
        marks: 10,
        questions: [
          { id: "pt-6", question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.substring(1, 3));", answer: "el" },
          { id: "pt-7", question: "What is the output?\nString s1 = \"hello\";\nString s2 = new String(\"hello\");\nSystem.out.println(s1.equals(s2));", answer: "true" },
          { id: "pt-8", question: "What is the output?\nString s = \"hello world\";\nSystem.out.println(s.indexOf('o'));", answer: "4" },
          { id: "pt-9", question: "What is the output?\nString s = \"hello\";\nSystem.out.println(s.toUpperCase());", answer: "HELLO" },
          { id: "pt-10", question: "What is the output?\nString s = \"  hello  \";\nSystem.out.println(s.trim().length());", answer: "5" },
        ],
      },
      {
        name: "Section C: Programming Questions",
        marks: 20,
        questions: [
          { id: "pt-11", question: "Write a program to check if a string is a palindrome.", answer: "for (int i = 0; i < s.length() / 2; i++) {\n    if (s.charAt(i) != s.charAt(s.length() - 1 - i)) {\n        isPalindrome = false;\n        break;\n    }\n}" },
          { id: "pt-12", question: "Write a program to count frequency of each character.", answer: "int[] freq = new int[256];\nfor (int i = 0; i < s.length(); i++) {\n    freq[s.charAt(i)]++;\n}" },
          { id: "pt-13", question: "Write a program to reverse a string.", answer: "StringBuilder sb = new StringBuilder(s);\nString reversed = sb.reverse().toString();" },
          { id: "pt-14", question: "Write a program to check if two strings are anagrams.", answer: "char[] arr1 = s1.toCharArray();\nchar[] arr2 = s2.toCharArray();\nArrays.sort(arr1);\nArrays.sort(arr2);\nboolean isAnagram = Arrays.equals(arr1, arr2);" },
          { id: "pt-15", question: "Write a program to count vowels and consonants.", answer: "for (int i = 0; i < s.length(); i++) {\n    char ch = s.charAt(i);\n    if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {\n        vowels++;\n    } else {\n        consonants++;\n    }\n}" },
        ],
      },
      {
        name: "Section D: HOTS (Higher Order Thinking Skills)",
        marks: 10,
        questions: [
          { id: "pt-16", question: "What is the output?\nString s1 = \"hello\";\nString s2 = new String(\"hello\");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1.equals(s2));", answer: "false\ntrue", explanation: "== compares references (different objects), equals() compares content (same content)." },
          { id: "pt-17", question: "Trace the output:\nString s = \"hello\";\nfor (int i = 0; i < s.length(); i++) {\n    System.out.print(s.charAt(s.length() - 1 - i));\n}", answer: "olleh" },
        ],
      },
    ],
  },

  // ========== 18. REVISION NOTES ==========
  revisionNotes: [
    "String is immutable — any modification creates a new string.",
    "String literals are stored in the String Pool for memory efficiency.",
    "Use equals() to compare string content, not ==.",
    "== compares references, equals() compares content.",
    "length() is a method (with parentheses), not a property.",
    "String indices start at 0, last index is length()-1.",
    "substring(begin, end) — beginIndex is included, endIndex is excluded.",
    "indexOf() returns -1 when substring is not found.",
    "toUpperCase() and toLowerCase() return new strings.",
    "trim() removes leading and trailing whitespace.",
    "charAt() returns character at specified index.",
    "StringBuffer is mutable and thread-safe.",
    "StringBuilder is mutable but not thread-safe (faster).",
    "split() divides string into array of substrings.",
    "Practice palindrome, anagram, and frequency counting programs.",
  ],

  // ========== 19. CHEATSHEET ==========
  cheatsheet: {
    title: "STRINGS - Quick Reference",
    syntax: "String s = \"hello\";  or  String s = new String(\"hello\");",
    keyPoints: [
      "Immutable — cannot be changed after creation",
      "Stored in String Pool (literals) or heap (new keyword)",
      "Use equals() for content comparison",
      "length() is a method, not property",
      "Indices start at 0",
      "substring(begin, end) — end is exclusive",
      "indexOf() returns -1 when not found",
      "All methods return new strings",
    ],
    commonMethods: [
      { method: "length()", returns: "int", description: "Number of characters" },
      { method: "charAt(index)", returns: "char", description: "Character at index" },
      { method: "substring(begin, end)", returns: "String", description: "Substring from begin to end-1" },
      { method: "equals(str)", returns: "boolean", description: "Compare content" },
      { method: "compareTo(str)", returns: "int", description: "Lexicographic comparison" },
      { method: "indexOf(ch)", returns: "int", description: "Index of first occurrence" },
      { method: "lastIndexOf(ch)", returns: "int", description: "Index of last occurrence" },
      { method: "toUpperCase()", returns: "String", description: "Convert to uppercase" },
      { method: "toLowerCase()", returns: "String", description: "Convert to lowercase" },
      { method: "trim()", returns: "String", description: "Remove leading/trailing spaces" },
      { method: "replace(old, new)", returns: "String", description: "Replace characters" },
      { method: "split(delimiter)", returns: "String[]", description: "Split into array" },
      { method: "contains(str)", returns: "boolean", description: "Check if contains substring" },
      { method: "startsWith(prefix)", returns: "boolean", description: "Check if starts with prefix" },
      { method: "endsWith(suffix)", returns: "boolean", description: "Check if ends with suffix" },
    ],
    comparison: [
      { feature: "String", mutable: "No", threadSafe: "N/A", performance: "Fast for literals" },
      { feature: "StringBuffer", mutable: "Yes", threadSafe: "Yes", performance: "Moderate" },
      { feature: "StringBuilder", mutable: "Yes", threadSafe: "No", performance: "Fast" },
    ],
  },

  // ========== 20. INTERVIEW QUESTIONS ==========
  interviewQuestions: [
    {
      id: "string-iq-1",
      question: "What is a String in Java?",
      answer: "A String is a sequence of characters. In Java, it's an object of the String class in java.lang package. Strings are immutable.",
    },
    {
      id: "string-iq-2",
      question: "Are strings mutable or immutable in Java?",
      answer: "Strings are immutable. Once created, their content cannot be changed. Any operation creates a new string object.",
    },
    {
      id: "string-iq-3",
      question: "What is the String Pool?",
      answer: "String Pool is a special area in heap memory where string literals are stored. It optimizes memory by reusing identical string literals.",
    },
    {
      id: "string-iq-4",
      question: "What is the difference between == and equals()?",
      answer: "== compares references (memory addresses). equals() compares content. Use equals() for string content comparison.",
    },
    {
      id: "string-iq-5",
      question: "Why is String immutable in Java?",
      answer: "String immutability provides security (passwords, class loaders), caching (string pool), performance (hashcode caching), and thread safety.",
    },
    {
      id: "string-iq-6",
      question: "What is the difference between String, StringBuffer, and StringBuilder?",
      answer: "String is immutable. StringBuffer is mutable and thread-safe (synchronized). StringBuilder is mutable but not thread-safe (faster).",
    },
    {
      id: "string-iq-7",
      question: "What does intern() method do?",
      answer: "intern() returns a string from the pool if it exists, otherwise adds the string to the pool. It ensures string literals share the same reference.",
    },
    {
      id: "string-iq-8",
      question: "What is the time complexity of string concatenation?",
      answer: "String concatenation using + in a loop has O(n²) complexity because strings are immutable. Use StringBuilder for O(n) complexity.",
    },
    {
      id: "string-iq-9",
      question: "What is the difference between substring() and subSequence()?",
      answer: "substring() returns a String. subSequence() returns a CharSequence. Both return the same characters but different return types.",
    },
    {
      id: "string-iq-10",
      question: "What does compareTo() return?",
      answer: "compareTo() returns 0 if strings are equal, negative if string is lexicographically less, positive if string is lexicographically greater.",
    },
    {
      id: "string-iq-11",
      question: "What is a palindrome?",
      answer: "A palindrome is a string that reads the same forwards and backwards. Examples: 'madam', 'racecar', 'level'.",
    },
    {
      id: "string-iq-12",
      question: "What is an anagram?",
      answer: "Two strings are anagrams if they contain the same characters in different orders. Example: 'listen' and 'silent'.",
    },
    {
      id: "string-iq-13",
      question: "How do you convert string to character array?",
      answer: "Use toCharArray() method. It converts the string to a new character array.",
    },
    {
      id: "string-iq-14",
      question: "What does trim() do?",
      answer: "trim() removes leading and trailing whitespace (spaces, tabs, newlines) and returns a new trimmed string.",
    },
    {
      id: "string-iq-15",
      question: "What is the difference between isEmpty() and isBlank()?",
      answer: "isEmpty() returns true if length is 0. isBlank() returns true if length is 0 or contains only whitespace (Java 11+).",
    },
  ],

  // ========== 21. EXAM TRICKS ==========
  examTricks: [
    "Always use equals() to compare strings, never use ==.",
    "Strings are immutable — any operation creates a new string.",
    "String literals are stored in the String Pool.",
    "s.length() is a method (with parentheses), not a property.",
    "String indices start at 0, last index is length()-1.",
    "substring(begin, end) — beginIndex is included, endIndex is excluded.",
    "indexOf() returns -1 when substring is not found.",
    "toUpperCase() and toLowerCase() return new strings.",
    "trim() removes only leading and trailing whitespace.",
    "StringBuffer is mutable and thread-safe, StringBuilder is mutable but not thread-safe.",
    "For palindrome: compare characters from both ends.",
    "For anagram: sort both strings and compare.",
    "For frequency counting: use array of size 256 (ASCII).",
    "String concatenation in loop is O(n²) — use StringBuilder.",
    "Practice palindrome, anagram, and frequency programs — frequently asked in exams.",
  ],

  // ========== 22. ASSERTION & REASON QUESTIONS ==========
  assertionReason: [
    {
      id: "strings-ar-1",
      assertion: "Assertion (A): A string can execute zero or more times.",
      reason: "Reason (R): The condition is checked before entering the loop body.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. The condition is checked before each iteration. If false initially, it executes 0 times."
    },
    {
      id: "strings-ar-2",
      assertion: "Assertion (A): The break statement exits the loop immediately.",
      reason: "Reason (R): The continue statement also exits the loop immediately.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 2,
      explanation: "A is true (break exits the loop), but R is false (continue skips only the current iteration)."
    },
    {
      id: "strings-ar-3",
      assertion: "Assertion (A): Nested loops are loops inside other loops.",
      reason: "Reason (R): The inner loop completes all its iterations for each iteration of the outer loop.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. A nested loop is a loop inside another loop, and the inner loop runs completely for each outer loop iteration."
    },
    {
      id: "strings-ar-4",
      assertion: "Assertion (A): An infinite loop is always a programming error.",
      reason: "Reason (R): Infinite loops can be useful in some applications like game loops.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 2,
      explanation: "A is false — infinite loops are not always errors (e.g., game loops, server listeners). R is true."
    },
    {
      id: "strings-ar-5",
      assertion: "Assertion (A): A loop variable declared inside a loop is accessible outside the loop.",
      reason: "Reason (R): Variables declared inside a block have block-level scope.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 3,
      explanation: "A is false — loop variables are NOT accessible outside. R is true — variables have block-level scope."
    },
    {
      id: "strings-ar-6",
      assertion: "Assertion (A): Using i++ in a loop condition checks the incremented value.",
      reason: "Reason (R): Post-increment operator increments after using the current value.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 3,
      explanation: "A is false — i++ uses the current value for comparison, then increments. R is true."
    },
    {
      id: "strings-ar-7",
      assertion: "Assertion (A): A for loop can always be converted to a while loop.",
      reason: "Reason (R): Both for and while loops are entry-controlled loops.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 1,
      explanation: "Both are true. Any for loop can be rewritten as a while loop. However, the reason is not the correct explanation."
    },
    {
      id: "strings-ar-8",
      assertion: "Assertion (A): The condition in a loop is evaluated n+1 times for n iterations.",
      reason: "Reason (R): The condition is checked before each iteration and once more when it becomes false.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. For n iterations, the condition is checked n times + 1 final check = n+1 times."
    },
    {
      id: "strings-ar-9",
      assertion: "Assertion (A): A do-while loop always executes at least once.",
      reason: "Reason (R): The do-while loop checks the condition after executing the loop body.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. The do-while loop is exit-controlled — the body executes first, then the condition is checked."
    },
    {
      id: "strings-ar-10",
      assertion: "Assertion (A): A while loop with condition true runs infinitely.",
      reason: "Reason (R): The condition true is always true and never becomes false.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "while(true) creates an infinite loop because the condition is always true and never changes."
    },
  ],

  // ========== 23. DEBUG THE CODE ==========
  debugTheCode: [
    {
      id: "strings-dc-1",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n}",
      bug: "The loop variable i is never incremented, causing an infinite loop.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "Without i++, the value of i remains 1 forever, so the condition i <= 5 is always true."
    },
    {
      id: "strings-dc-2",
      question: "Find and fix the bug:\nfor (int i = 0; i < 3; i++);\n    System.out.println(\"Hello\");",
      bug: "The semicolon after the for loop creates an empty loop body.",
      debuggedCode: "for (int i = 0; i < 3; i++) {\n    System.out.println(\"Hello\");\n}",
      explanation: "The semicolon ends the for statement, making the loop body empty. The println runs only once."
    },
    {
      id: "strings-dc-3",
      question: "Find and fix the bug:\nint sum = 0;\nfor (int i = 1; i <= 10; i++);\n    sum = sum + i;\nSystem.out.println(sum);",
      bug: "Two bugs: (1) semicolon after for creates empty loop, (2) i is out of scope outside the for loop.",
      debuggedCode: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum = sum + i;\n}\nSystem.out.println(sum);",
      explanation: "The semicolon must be removed, and the sum calculation must be inside the loop body."
    },
    {
      id: "strings-dc-4",
      question: "Find and fix the bug:\nint i = 5;\nwhile (i >= 1)\n    System.out.println(i);\n    i--;",
      bug: "Missing braces. Only the println is inside the loop. i-- is outside and never executes.",
      debuggedCode: "int i = 5;\nwhile (i >= 1) {\n    System.out.println(i);\n    i--;\n}",
      explanation: "Without braces, only the first statement is inside the loop. i-- is outside and never runs."
    },
    {
      id: "strings-dc-5",
      question: "Find and fix the bug:\nint num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n}\nSystem.out.println(sum);",
      bug: "The loop variable num is never updated (num/10 is missing), causing an infinite loop.",
      debuggedCode: "int num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n    num = num / 10;\n}\nSystem.out.println(sum);",
      explanation: "Without num = num / 10, the value of num stays 123 forever, so the loop never ends."
    },
    {
      id: "strings-dc-6",
      question: "Find and fix the bug:\nint x = 5;\nif (x = 5)\n    System.out.println(\"Equal\");",
      bug: "Using = (assignment) instead of == (comparison). Causes compilation error.",
      debuggedCode: "int x = 5;\nif (x == 5)\n    System.out.println(\"Equal\");",
      explanation: "Use == for comparison. The single = is for assignment and returns int, not boolean."
    },
    {
      id: "strings-dc-7",
      question: "Find and fix the bug:\nint fact = 0;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      bug: "fact is initialized to 0. 0 * anything = 0, so the result will always be 0.",
      debuggedCode: "int fact = 1;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      explanation: "For product calculations, initialize to 1 (multiplicative identity), not 0."
    },
    {
      id: "strings-dc-8",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
      bug: "Semicolon after while creates empty loop. i is out of scope.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "The semicolon ends the while statement. The println is outside the loop and i is out of scope."
    },
    {
      id: "strings-dc-9",
      question: "Find and fix the bug:\nint a = 5, b = 10;\nif (a > b)\n    System.out.println(a);\n    System.out.println(b);",
      bug: "Missing braces. Only the first println is inside the if. The second always runs.",
      debuggedCode: "int a = 5, b = 10;\nif (a > b) {\n    System.out.println(a);\n    System.out.println(b);\n}",
      explanation: "Without braces, only the first statement after if is conditional. The second statement always executes."
    },
    {
      id: "strings-dc-10",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 10) {\n    if (i == 5)\n        continue;\n    System.out.println(i);\n    i++;\n}",
      bug: "When i == 5, continue skips i++, causing an infinite loop (i stays 5 forever).",
      debuggedCode: "int i = 1;\nwhile (i <= 10) {\n    if (i == 5) {\n        i++;\n        continue;\n    }\n    System.out.println(i);\n    i++;\n}",
      explanation: "The continue skips the rest of the iteration including i++. Move i++ before continue or use a for loop."
    },
  ],

  // ========== 24. CASE STUDY QUESTIONS ==========
  caseStudyQuestions: [
    {
      id: "strings-cs-1",
      title: "Student Marks Analysis",
      scenario: "A teacher enters marks for multiple students until -1 is entered. The program calculates class average, highest, lowest, and pass count (marks >= 40).",
      questions: [
        {
          id: "strings-cs-1-q1",
          question: "Which loop is most suitable for reading marks until -1?",
          options: ["for loop", "while loop", "do-while loop", "Any loop works"],
          answer: 1,
          explanation: "A while loop is best because the number of iterations is unknown."
        },
        {
          id: "strings-cs-1-q2",
          question: "What should be the loop condition?",
          options: ["while (marks > 0)", "while (marks != -1)", "while (marks >= 0)", "while (marks == -1)"],
          answer: 1,
          explanation: "The loop continues while marks is NOT equal to -1 (the sentinel value)."
        },
        {
          id: "strings-cs-1-q3",
          question: "If marks are: 45, 78, 32, 90, 56, -1, how many passed?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Students with marks >= 40: 45, 78, 90, 56 = 4 students passed."
        },
      ]
    },
    {
      id: "strings-cs-2",
      title: "ATM Withdrawal System",
      scenario: "An ATM allows withdrawals in multiples of 100. The user enters amount. ATM validates (multiple of 100, positive, not exceeding balance). Multiple transactions until exit.",
      questions: [
        {
          id: "strings-cs-2-q1",
          question: "What loop structure is best for the main menu?",
          options: ["for loop with fixed count", "while loop with sentinel", "nested for loop", "for-each loop"],
          answer: 1,
          explanation: "A while loop with a sentinel (exit option) is best for menu-driven programs."
        },
        {
          id: "strings-cs-2-q2",
          question: "Which condition validates multiple of 100?",
          options: ["amount % 100 == 0", "amount / 100 == 0", "amount * 100 == 0", "amount - 100 == 0"],
          answer: 0,
          explanation: "amount % 100 == 0 checks if remainder is 0, meaning it is a multiple of 100."
        },
        {
          id: "strings-cs-2-q3",
          question: "If balance is 5000 and user withdraws 1500, new balance?",
          options: ["3500", "1500", "5000", "6500"],
          answer: 0,
          explanation: "New balance = 5000 - 1500 = 3500."
        },
      ]
    },
    {
      id: "strings-cs-3",
      title: "Pattern Printing",
      scenario: "A student prints patterns using nested loops. The program asks for pattern type and size.",
      questions: [
        {
          id: "strings-cs-3-q1",
          question: "For a right-angled triangle of size 5, total stars?",
          options: ["5", "10", "15", "25"],
          answer: 2,
          explanation: "Sum of 1+2+3+4+5 = 15 stars."
        },
        {
          id: "strings-cs-3-q2",
          question: "In nested loops for a square, outer loop controls:",
          options: ["Columns", "Rows", "Both", "Pattern type"],
          answer: 1,
          explanation: "The outer loop controls rows, inner loop controls columns."
        },
        {
          id: "strings-cs-3-q3",
          question: "For a hollow square of size 5, boundary stars?",
          options: ["16", "20", "25", "12"],
          answer: 0,
          explanation: "Perimeter = 4*(5-1) = 16 stars. Corners counted once."
        },
      ]
    },
  ],

  // ========== 25. MIXED PRACTICE SETS ==========
  mixedPracticeSets: [
    {
      id: "strings-mps-1",
      title: "Practice Set 1: String Fundamentals",
      questions: [
        {
          type: "mcq",
          id: "strings-mps-1-q1",
          question: "What is the output if the loop condition is false initially?",
          options: ["1 iteration", "0 iterations", "Infinite loop", "Compilation error"],
          answer: 1
        },
        {
          type: "fillInTheBlank",
          id: "strings-mps-1-q2",
          question: "An entry-controlled loop checks the condition _____ each iteration.",
          answer: "before"
        },
        {
          type: "output",
          id: "strings-mps-1-q3",
          question: "int i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}",
          answer: "1 2 3"
        },
        {
          type: "trueFalse",
          id: "strings-mps-1-q4",
          question: "A while loop can be converted to a for loop.",
          answer: true
        },
        {
          type: "shortAnswer",
          id: "strings-mps-1-q5",
          question: "What is the difference between break and continue?",
          answer: "break exits the loop completely. continue skips the current iteration."
        },
      ]
    },
    {
      id: "strings-mps-2",
      title: "Practice Set 2: String Applications",
      questions: [
        {
          type: "mcq",
          id: "strings-mps-2-q1",
          question: "Which loop is best for menu-driven programs?",
          options: ["for", "while", "do-while", "for-each"],
          answer: 1
        },
        {
          type: "output",
          id: "strings-mps-2-q2",
          question: "int i = 5;\nwhile (i >= 1) {\n    System.out.print(i--);\n}",
          answer: "54321"
        },
        {
          type: "errorFinding",
          id: "strings-mps-2-q3",
          question: "int i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
          error: "Semicolon after while creates empty loop.",
          corrected: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}"
        },
        {
          type: "programming",
          id: "strings-mps-2-q4",
          question: "Write a program to calculate sum of first 10 natural numbers.",
          solution: "int sum = 0, i = 1;\nwhile (i <= 10) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);"
        },
        {
          type: "assertionReason",
          id: "strings-mps-2-q5",
          assertion: "A while loop may execute zero times.",
          reason: "The condition is checked before entering the loop body.",
          answer: 0
        },
      ]
    },
  ],

  // ========== 26. RAPID REVISION QUESTIONS ==========
  rapidRevisionQuestions: [
    { id: "strings-rr-1", question: "What type of loop is a while loop?", answer: "Entry-controlled loop" },
    { id: "strings-rr-2", question: "How many times does a while loop execute if condition is false initially?", answer: "0 times" },
    { id: "strings-rr-3", question: "Where is the loop variable initialized in a while loop?", answer: "Before the while loop" },
    { id: "strings-rr-4", question: "Where is the loop variable updated in a while loop?", answer: "Inside the while loop body" },
    { id: "strings-rr-5", question: "What happens if you forget to update the loop variable?", answer: "Infinite loop" },
    { id: "strings-rr-6", question: "Which loop is best when the number of iterations is unknown?", answer: "While loop" },
    { id: "strings-rr-7", question: "Which loop is best when the number of iterations is known?", answer: "For loop" },
    { id: "strings-rr-8", question: "What does while(true) create?", answer: "An infinite loop" },
    { id: "strings-rr-9", question: "Which statement exits a loop immediately?", answer: "break" },
    { id: "strings-rr-10", question: "Which statement skips the current iteration?", answer: "continue" },
    { id: "strings-rr-11", question: "Can a while loop be nested?", answer: "Yes" },
    { id: "strings-rr-12", question: "Can a while loop be converted to a for loop?", answer: "Yes" },
    { id: "strings-rr-13", question: "What is a sentinel value?", answer: "A special value that signals end of input" },
    { id: "strings-rr-14", question: "What is the scope of a variable declared inside a loop?", answer: "Only within the loop" },
    { id: "strings-rr-15", question: "What is the difference between while and do-while?", answer: "While checks before (may not execute), do-while checks after (always executes once)" },
    { id: "strings-rr-16", question: "What is a nested loop?", answer: "A loop inside another loop" },
    { id: "strings-rr-17", question: "What is the time complexity of a simple loop running n times?", answer: "O(n)" },
    { id: "strings-rr-18", question: "What is the output of: int i=1; while(i<=3) { System.out.print(i); i++; }", answer: "123" },
    { id: "strings-rr-19", question: "What is the output of: int i=5; while(i>=1) { System.out.print(i--); }", answer: "54321" },
    { id: "strings-rr-20", question: "What is the purpose of the break statement?", answer: "To exit the loop immediately" },
  ],

};

export default chapter10;