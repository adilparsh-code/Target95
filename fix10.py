import re, sys

# Fix 10-encapsulation.js
# Issue: CH10-DBG-001 has p.name = "Rahul" with raw newline inside JS string
with open('src/app/data/question-bank/10-encapsulation.js', 'r', encoding='utf-8') as f:
    content = f.read()

# The problematic line: p.name = "Rahul";\n    }\n}",
# (with real newline characters breaking the JS string)
# Fix: replace with properly escaped version
old = 'p.name = "Rahul";'
if old in content:
    # Find where this occurs and fix
    idx = content.index(old)
    # Replace the unescaped quotes and the following raw newline
    old_full = 'p.name = "Rahul";\n    }\\n}", correctAnswer'
    new_full = 'p.name = \\"Rahul\\";\\n    }\\n\"", correctAnswer'
    
    if old_full in content:
        content = content.replace(old_full, new_full)
        with open('src/app/data/question-bank/10-encapsulation.js', 'w', encoding='utf-8') as f:
            f.write(content)
        print("10-encapsulation.js: Fixed")
    else:
        # Try simpler approach
        # Just replace the quotes
        content = content.replace('p.name = "Rahul";', 'p.name = \\"Rahul\\";')
        # And replace real newline with \n
        content = content.replace('p.name = \\"Rahul\\";\n    }\\n}", correctAnswer', 'p.name = \\"Rahul\\";\\n    }\\n\"", correctAnswer')
        # Check if the simple replacement worked
        if 'p.name = "Rahul";' in content:
            print("10-encapsulation.js: Quote replacement done but newline still needs fixing")
        else:
            with open('src/app/data/question-bank/10-encapsulation.js', 'w', encoding='utf-8') as f:
                f.write(content)
            print("10-encapsulation.js: Fixed (simple)")
else:
    print("10-encapsulation.js: p.name pattern not found")
    idx = content.find('p.name')
    if idx >= 0:
        print(f"  Context: {repr(content[idx:idx+50])}")
