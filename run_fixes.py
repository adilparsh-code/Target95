#!/usr/bin/env python3
"""Fix all 5 malformed question-bank files."""
import re

def fix_js_newlines_in_strings(filepath, chapter_num):
    """Fix raw newlines inside JavaScript double-quoted strings."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all string literals that have raw newlines
    # A JS string starts with " and ends with " (not \")
    # We need to find lines where a string spans multiple lines
    
    lines = content.split('\n')
    fixed_lines = []
    in_string = False
    string_buffer = ""
    string_start_line = -1
    
    for i, line in enumerate(lines):
        if not in_string:
            # Check if this line starts a string that isn't closed
            string_buffer = ""
            j = 0
            temp_in_string = False
            temp_buffer = ""
            
            while j < len(line):
                if line[j] == '"' and (j == 0 or line[j-1] != '\\'):
                    temp_in_string = not temp_in_string
                    temp_buffer += line[j]
                elif line[j] == '\\' and temp_in_string and j+1 < len(line):
                    temp_buffer += line[j] + line[j+1]
                    j += 2
                    continue
                else:
                    temp_buffer += line[j]
                j += 1
            
            if temp_in_string:
                # String not closed on this line - need to join with next
                in_string = True
                string_buffer = temp_buffer
                string_start_line = i
                # We'll accumulate lines until string is closed
                fixed_lines.append(line)
            else:
                fixed_lines.append(line)
        else:
            # We're in a multi-line string - join with \n
            # This line is a continuation of the previous string
            # Replace the newline with \n
            fixed_lines.append(line)
    
    # Actually, let me take a simpler approach
    # Just fix the specific patterns we know about
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # For 10-encapsulation.js: Fix CH10-DBG-001
    if chapter_num == 10:
        # Replace the raw newline after "Rahul"  
        old = 'p.name = "Rahul";'
        new = 'p.name = \\"Rahul\\";\\n    }\\n"'
        if old in content:
            content = content.replace(old, new)
            # Remove the now-extra content
            # The original had: p.name = "Rahul";\n    }\n}", correctAnswer
            # After replace: p.name = \"Rahul\";\n    }\n}", correctAnswer\n    }\n}", correctAnswer
            # This might create duplicates - let's handle it differently
            pass
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Fixed {filepath}")

# Let me try a different approach - read and inspect each file
# then fix with simple string replacements

def inspect_and_fix(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"\n=== {filepath} ===")
    print(f"Length: {len(content)}")
    
    # Run node check to see the error
    import subprocess
    result = subprocess.run(['node', '--check', filepath], capture_output=True, text=True)
    if result.returncode != 0:
        # Parse error line
        error_output = result.stderr
        # Find line number from error
        match = re.search(r':(\d+)\n', error_output)
        if match:
            line_num = int(match.group(1))
            print(f"Error at line {line_num}")
            lines = content.split('\n')
            start = max(0, line_num - 3)
            end = min(len(lines), line_num + 3)
            for i in range(start, end):
                print(f"  {i+1}: {lines[i][:120]}")
        else:
            print(f"Error: {error_output[:200]}")
    else:
        print("PASS")
    
    return content

# Check all 5 files
files = [
    'src/app/data/question-bank/10-encapsulation.js',
    'src/app/data/question-bank/11-inheritance.js',
    'src/app/data/question-bank/17-input-output.js',
    'src/app/data/question-bank/18-packages-access-modifiers.js',
    'src/app/data/question-bank/19-oop-concepts.js',
]

for f in files:
    inspect_and_fix(f)
