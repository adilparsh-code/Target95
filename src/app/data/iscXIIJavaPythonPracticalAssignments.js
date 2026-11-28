/**
 * ISC Class XII Python practical assignments for the CISCE 2028 syllabus.
 * Distribution: 1 Strings, 2 Lists, 2 Tuples (5 assignments total).
 * Original teaching examples; no external similarity or legal clearance is implied.
 */
export const ISC_XII_PYTHON_PRACTICALS = [
  {
    id: "ISC12-PY-S01", category: "Strings", title: "Analyse a Sentence", difficulty: "Easy",
    objective: "Accept a sentence and count vowels, consonants, digits and whitespace characters. Ignore letter case while classifying alphabetic characters.",
    algorithm: [
      "Accept a complete sentence using input().",
      "Initialize counters for vowels, consonants, digits and whitespace.",
      "Visit each character and convert alphabetic characters to lowercase for comparison.",
      "Update the matching counter; ignore punctuation for these four categories.",
      "Display all four totals with clear labels."
    ],
    code: `sentence = input("Enter a sentence: ")
vowels = "aeiou"
vowel_count = 0
consonant_count = 0
digit_count = 0
space_count = 0

for ch in sentence:
    if ch.isalpha():
        if ch.lower() in vowels:
            vowel_count += 1
        else:
            consonant_count += 1
    elif ch.isdigit():
        digit_count += 1
    elif ch.isspace():
        space_count += 1

print("Vowels =", vowel_count)
print("Consonants =", consonant_count)
print("Digits =", digit_count)
print("Whitespace =", space_count)`,
    sampleInput: "Education 2028!",
    sampleOutput: "Enter a sentence: Vowels = 5\nConsonants = 4\nDigits = 4\nWhitespace = 1",
    concepts: ["String traversal", "Character testing", "Case normalization"]
  },
  {
    id: "ISC12-PY-L01", category: "Lists", title: "Search and Count an Element", difficulty: "Easy",
    objective: "Create a list of integers, search for a target value and report its first position and total frequency.",
    algorithm: [
      "Accept the number of elements and reject a non-positive count.",
      "Read the integers and store them in a list.",
      "Accept the target value and initialize frequency to zero and first position to -1.",
      "Traverse the list using index positions; update frequency and record the first matching position.",
      "Display whether the value occurs, its first position (1-based), and its frequency."
    ],
    code: `n = int(input("Enter number of elements: "))
if n <= 0:
    print("Enter a positive number of elements.")
else:
    numbers = []
    for i in range(n):
        value = int(input("Enter an integer: "))
        numbers.append(value)

    target = int(input("Enter value to search: "))
    frequency = 0
    first_position = -1

    for i in range(len(numbers)):
        if numbers[i] == target:
            frequency += 1
            if first_position == -1:
                first_position = i + 1

    if frequency == 0:
        print("Value not found.")
    else:
        print("First position =", first_position)
        print("Frequency =", frequency)`,
    sampleInput: "6\n4\n7\n4\n2\n4\n9\n4",
    sampleOutput: "Enter number of elements: Enter an integer: Enter an integer: Enter an integer: Enter an integer: Enter an integer: Enter an integer: Enter value to search: First position = 1\nFrequency = 3",
    concepts: ["List creation", "List traversal", "Linear search"]
  },
  {
    id: "ISC12-PY-L02", category: "Lists", title: "Sort a List Using Bubble Sort", difficulty: "Medium",
    objective: "Accept integers into a list and arrange them in ascending order using Bubble Sort without the built-in sort method.",
    algorithm: [
      "Accept a positive number of elements and store the integers in a list.",
      "For each pass, compare adjacent elements from the beginning to the unsorted boundary.",
      "Swap adjacent elements when the left element is greater than the right element.",
      "Reduce the unsorted boundary after each pass.",
      "Display the sorted list."
    ],
    code: `n = int(input("Enter number of elements: "))
if n <= 0:
    print("Enter a positive number of elements.")
else:
    numbers = []
    for i in range(n):
        numbers.append(int(input("Enter an integer: ")))

    for i in range(n - 1):
        for j in range(n - 1 - i):
            if numbers[j] > numbers[j + 1]:
                temp = numbers[j]
                numbers[j] = numbers[j + 1]
                numbers[j + 1] = temp

    print("Sorted list =", numbers)`,
    sampleInput: "5\n32\n12\n25\n8\n19",
    sampleOutput: "Enter number of elements: Enter an integer: Enter an integer: Enter an integer: Enter an integer: Enter an integer: Sorted list = [8, 12, 19, 25, 32]",
    concepts: ["Mutable lists", "Nested loops", "Bubble Sort"]
  },
  {
    id: "ISC12-PY-T01", category: "Tuples", title: "Tuple Statistics", difficulty: "Easy",
    objective: "Accept integer values, store them in a tuple and calculate the largest, smallest, total and arithmetic mean.",
    algorithm: [
      "Accept a positive number of values.",
      "Read each integer into a temporary list.",
      "Convert the list into a tuple.",
      "Traverse the tuple to determine the largest, smallest and sum.",
      "Calculate the mean and display the tuple and results."
    ],
    code: `n = int(input("Enter number of elements: "))
if n <= 0:
    print("Enter a positive number of elements.")
else:
    values = []
    for i in range(n):
        values.append(int(input("Enter an integer: ")))

    data = tuple(values)
    largest = data[0]
    smallest = data[0]
    total = 0

    for value in data:
        if value > largest:
            largest = value
        if value < smallest:
            smallest = value
        total += value

    average = total / len(data)
    print("Tuple =", data)
    print("Largest =", largest)
    print("Smallest =", smallest)
    print("Sum =", total)
    print("Average =", format(average, ".2f"))`,
    sampleInput: "4\n12\n5\n18\n9",
    sampleOutput: "Enter number of elements: Enter an integer: Enter an integer: Enter an integer: Enter an integer: Tuple = (12, 5, 18, 9)\nLargest = 18\nSmallest = 5\nSum = 44\nAverage = 11.00",
    concepts: ["Tuple creation", "Tuple traversal", "Aggregate calculations"]
  },
  {
    id: "ISC12-PY-T02", category: "Tuples", title: "Merge Two Tuples and Find Common Values", difficulty: "Medium",
    objective: "Accept two integer sequences, convert them to tuples, concatenate the tuples and display the distinct values common to both in their first-tuple order.",
    algorithm: [
      "Accept the sizes of the two sequences and ensure both are positive.",
      "Read the first sequence into a list and convert it to tuple1.",
      "Read the second sequence into a list and convert it to tuple2.",
      "Concatenate tuple1 and tuple2 to form merged_tuple.",
      "Traverse tuple1 and append a value to common only when it occurs in tuple2 and has not already been added.",
      "Display both tuples, the merged tuple and the common values tuple."
    ],
    code: `n1 = int(input("Enter size of first tuple: "))
n2 = int(input("Enter size of second tuple: "))

if n1 <= 0 or n2 <= 0:
    print("Both tuple sizes must be positive.")
else:
    first_values = []
    second_values = []

    for i in range(n1):
        first_values.append(int(input("Enter first-tuple value: ")))
    for i in range(n2):
        second_values.append(int(input("Enter second-tuple value: ")))

    tuple1 = tuple(first_values)
    tuple2 = tuple(second_values)
    merged_tuple = tuple1 + tuple2

    common = []
    for value in tuple1:
        if value in tuple2 and value not in common:
            common.append(value)

    common_tuple = tuple(common)
    print("First tuple =", tuple1)
    print("Second tuple =", tuple2)
    print("Merged tuple =", merged_tuple)
    print("Common values =", common_tuple)`,
    sampleInput: "4\n3\n2\n4\n6\n4\n4\n6\n8",
    sampleOutput: "Enter size of first tuple: Enter size of second tuple: Enter first-tuple value: Enter first-tuple value: Enter first-tuple value: Enter first-tuple value: Enter second-tuple value: Enter second-tuple value: Enter second-tuple value: First tuple = (2, 4, 6, 4)\nSecond tuple = (4, 6, 8)\nMerged tuple = (2, 4, 6, 4, 4, 6, 8)\nCommon values = (4, 6)",
    concepts: ["Tuple concatenation", "Membership testing", "Tuple conversion"]
  }
];

export const getISCXIIPythonPracticals = () => ISC_XII_PYTHON_PRACTICALS;
