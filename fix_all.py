#!/usr/bin/env python3
"""Fix remaining 4 question-bank files."""
import re

# === 11-inheritance.js ===
# Issue: Incorrect CH18 caseBasedQuestions content added, needs proper ending
with open('src/app/data/question-bank/11-inheritance.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the CH18 caseBasedQuestions content and add proper CH11 ending
idx = content.find('  caseBasedQuestions: [')
if idx >= 0:
    # Keep everything up to and including caseBasedQuestions opener
    content = content[:idx] + '''  caseBasedQuestions: [
    { id: "CH11-CBQ-001", difficulty: "medium", chapter: "Inheritance", chapterId: 11, topic: "Inheritance Basics", question: "Design a 'Vehicle' class with a start() method. Create subclasses 'Car' and 'Bike' that override start(). Demonstrate polymorphism by calling start() on an array of Vehicle objects.", correctAnswer: "Vehicle has start(). Car overrides to print 'Car started'. Bike overrides to print 'Bike started'. Use Vehicle[] v = {new Car(), new Bike()}; for(Vehicle x : v) x.start();", hint: "How do subclasses override methods?", estimatedTime: 60, marks: 5, tags: ["inheritance", "Vehicle", "polymorphism"] },
    { id: "CH11-CBQ-002", difficulty: "hard", chapter: "Inheritance", chapterId: 11, topic: "Method Overriding", question: "A banking system needs different account types. Base class 'Account' has balance and withdraw(). 'SavingsAccount' adds interest. 'CheckingAccount' adds overdraft limit. Design this hierarchy.", correctAnswer: "Account (base): private balance, withdraw(double). SavingsAccount extends Account: add interest, override withdraw. CheckingAccount extends Account: add overdraftLimit, override withdraw with limit check.", hint: "How do you override withdraw() differently in each subclass?", estimatedTime: 75, marks: 5, tags: ["inheritance", "Account", "overriding"] }
  ]
};
export default chapter11;
'''
    with open('src/app/data/question-bank/11-inheritance.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("11-inheritance.js: Fixed - removed CH18 content, added proper ending")
else:
    print("11-inheritance.js: caseBasedQuestions not found")

# === 17-input-output.js ===
# Issue: Raw newlines inside quoted strings (lines 16-18, 20-21, 22-23, 40-42, 48-49, 53-55, 56-60, 61-63, 78-83, 84-88)
# Also in output/programmingQuestions sections

with open('src/app/data/question-bank/17-input-output.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern: find strings that span multiple lines and fix them
# A string starts with " and ends with " - if there's a raw newline inside, it's broken
# Replace raw newlines inside strings with \n

# Split by newlines and rejoin strings that span multiple lines
lines = content.split('\n')
fixed_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    
    # Count unescaped double quotes in the line
    # If odd number of " outside of escape sequences, string is not closed
    quote_count = 0
    j = 0
    in_template = False
    while j < len(line):
        if j > 0 and line[j-1] == '\\':
            j += 1
            continue
        if line[j] == '`':
            in_template = not in_template
        if line[j] == '"' and not in_template:
            quote_count += 1
        j += 1
    
    if quote_count % 2 == 1:
        # String is not closed - find continuation
        # Join with next lines until string is closed
        combined = line
        i += 1
        while i < len(lines):
            next_line = lines[i]
            # Check if next line closes the string
            # Simple check: if the next line has any content after the string
            combined = combined + '\\n' + next_line
            # Re-count quotes
            q2 = 0
            k = 0
            in_template2 = False
            while k < len(combined):
                if k > 0 and combined[k-1] == '\\':
                    k += 1
                    continue
                if combined[k] == '`':
                    in_template2 = not in_template2
                if combined[k] == '"' and not in_template2:
                    q2 += 1
                k += 1
            if q2 % 2 == 0:
                break
            i += 1
        fixed_lines.append(combined)
    else:
        fixed_lines.append(line)
    i += 1

content = '\n'.join(fixed_lines)
with open('src/app/data/question-bank/17-input-output.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("17-input-output.js: Fixed raw newlines in strings")

# === 18-packages-access-modifiers.js ===
with open('src/app/data/question-bank/18-packages-access-modifiers.js', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
fixed_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    quote_count = 0
    j = 0
    in_template = False
    while j < len(line):
        if j > 0 and line[j-1] == '\\':
            j += 1
            continue
        if line[j] == '`':
            in_template = not in_template
        if line[j] == '"' and not in_template:
            quote_count += 1
        j += 1
    
    if quote_count % 2 == 1:
        combined = line
        i += 1
        while i < len(lines):
            next_line = lines[i]
            combined = combined + '\\n' + next_line
            q2 = 0
            k = 0
            in_template2 = False
            while k < len(combined):
                if k > 0 and combined[k-1] == '\\':
                    k += 1
                    continue
                if combined[k] == '`':
                    in_template2 = not in_template2
                if combined[k] == '"' and not in_template2:
                    q2 += 1
                k += 1
            if q2 % 2 == 0:
                break
            i += 1
        fixed_lines.append(combined)
    else:
        fixed_lines.append(line)
    i += 1

content = '\n'.join(fixed_lines)
with open('src/app/data/question-bank/18-packages-access-modifiers.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("18-packages-access-modifiers.js: Fixed raw newlines in strings")

# === 19-oop-concepts.js ===
with open('src/app/data/question-bank/19-oop-concepts.js', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
fixed_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    quote_count = 0
    j = 0
    in_template = False
    while j < len(line):
        if j > 0 and line[j-1] == '\\':
            j += 1
            continue
        if line[j] == '`':
            in_template = not in_template
        if line[j] == '"' and not in_template:
            quote_count += 1
        j += 1
    
    if quote_count % 2 == 1:
        combined = line
        i += 1
        while i < len(lines):
            next_line = lines[i]
            combined = combined + '\\n' + next_line
            q2 = 0
            k = 0
            in_template2 = False
            while k < len(combined):
                if k > 0 and combined[k-1] == '\\':
                    k += 1
                    continue
                if combined[k] == '`':
                    in_template2 = not in_template2
                if combined[k] == '"' and not in_template2:
                    q2 += 1
                k += 1
            if q2 % 2 == 0:
                break
            i += 1
        fixed_lines.append(combined)
    else:
        fixed_lines.append(line)
    i += 1

content = '\n'.join(fixed_lines)
with open('src/app/data/question-bank/19-oop-concepts.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("19-oop-concepts.js: Fixed raw newlines in strings")

print("\nAll fixes applied!")
