import sys

with open('src/app/data/question-bank/10-encapsulation.js', 'r', encoding='utf-8') as f:
    content = f.read()

# The file has a real newline inside the JS string after p.name = \"Rahul\";
# This breaks JS parsing. We need to replace the real newline with \\n escape

old = 'p.name = \\"Rahul\\";\n    }\\n}", correctAnswer'
new = 'p.name = \\"Rahul\\";\\n    }\\n}", correctAnswer'

print(f"Looking for: {repr(old)}")
print(f"Found: {old in content}")

if old in content:
    content = content.replace(old, new)
    with open('src/app/data/question-bank/10-encapsulation.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed!")
else:
    idx = content.find('p.name')
    if idx >= 0:
        print(f"Context: {repr(content[idx:idx+60])}")
