import sys

with open('src/app/data/question-bank/10-encapsulation.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the debugging question with Rahul
idx = content.find('p.name = ')
if idx < 0:
    print("ERROR: p.name not found")
    sys.exit(1)

# Print what we have
snippet = repr(content[idx:idx+80])
print(f"Found: {snippet}")

# The current file has (on one line):
# p.name = "Rahul"; followed by a real newline
# This breaks the JS string. We need to:
# 1. Escape the double quotes: "Rahul" -> \"Rahul\"
# 2. Replace the real newline with \\n (escaped newline for JS string)

old = 'p.name = "Rahul";'
new = 'p.name = \\"Rahul\\";\\n    }\\n"'

if old in content:
    content = content.replace(old, new)
    with open('src/app/data/question-bank/10-encapsulation.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed! Replaced with escaped version")
else:
    print("Exact pattern not found")
    # Let's see what we actually have
    raw = content[idx:idx+30]
    print(f"Raw bytes: {raw.encode()}")
