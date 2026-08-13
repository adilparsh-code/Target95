import sys

def fix_file(filepath, old_str, new_str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Fix 10-encapsulation.js - the double-escaped Rahul
# The file has p.name = \\"Rahul\\" (double backslash) which is invalid JS
# Should be p.name = \"Rahul\" (single backslash for JS string escaping)

# Read the file and fix the escaping
with open('src/app/data/question-bank/10-encapsulation.js', 'r', encoding='utf-8') as f:
    content = f.read()

# The problem is backslashes before quotes in the debugging question
# Let's find the exact problematic content
import re

# Find p.name = followed by backslash quotes
match = re.search(r'p\.name\s*=\s*\\"Rahul\\"', content)
if match:
    print(f"Found double-escaped: {repr(match.group())} at position {match.start()}")
    # Replace with properly escaped version
    content = content[:match.start()] + r'p.name = \"Rahul\"' + content[match.end():]
    with open('src/app/data/question-bank/10-encapsulation.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed!")
else:
    print("Pattern not found - checking what's there...")
    idx = content.find('p.name')
    if idx >= 0:
        print(f"Found p.name at: {repr(content[idx:idx+30])}")
    else:
        print("p.name not found")
</arg_value>
</write_to_file>
<task_progress>
- [ ] Read and analyze 10-encapsulation.js
- [ ] Read and analyze 11-inheritance.js
- [ ] Read and analyze 17-input-output.js
- [ ] Read and analyze 18-packages-access-modifiers.js
- [ ] Read and analyze 19-oop-concepts.js
</task_progress></tool_call>