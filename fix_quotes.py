#!/usr/bin/env python3
"""Fix files 17, 18, 19 - escape inner quotes and join multi-line strings."""
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    fixed_lines = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Count unescaped double quotes (not in template literals)
        quote_count = 0
        j = 0
        in_template = False
        while j < len(line):
            if j > 0 and line[j-1] == '\\':
                j += 2
                continue
            if line[j] == '`':
                in_template = not in_template
            if line[j] == '"' and not in_template:
                quote_count += 1
            j += 1
        
        if quote_count % 2 == 1:
            # String not closed - accumulate until closed
            combined = line
            i += 1
            while i < len(lines):
                next_line = lines[i]
                combined = combined + '\\n' + next_line
                # Count quotes in combined
                q2 = 0
                k = 0
                in_t = False
                while k < len(combined):
                    if k > 0 and combined[k-1] == '\\':
                        k += 2
                        continue
                    if combined[k] == '`':
                        in_t = not in_t
                    if combined[k] == '"' and not in_t:
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
    
    # Now fix unescaped quotes inside strings
    # The issue is patterns like: "text "Hello" more" 
    # where "Hello" has unescaped quotes inside a double-quoted JS string
    #
    # Strategy: find all string values that contain Java code with "text" 
    # and escape the inner quotes
    
    # Pattern: look for quoted sections that have unescaped " inside
    # e.g., System.out.print("Hello") -> System.out.print(\"Hello\")
    # e.g., System.out.println("A") -> System.out.println(\"A\")
    
    # Find all occurrences of text within double quotes that should be escaped
    # Pattern: (" or ')(text)(", , or ;)
    # But only for Java code patterns
    
    # More specific: look for patterns like ("text") where text is inside 
    # a JS string and has unescaped quotes
    # The Java code patterns are: println("..."), print("..."), printf("...")
    
    # Fix: System.out.println("...") -> System.out.println(\"...\")
    # Fix: System.out.print("...") -> System.out.print(\"...\")
    # Fix: System.out.printf("...", ...) -> System.out.printf(\"...", ...)
    
    # But we need to be careful - these patterns only appear inside JS strings
    # that have already been joined
    
    # Simple approach: replace '(" with \\"' and '")' with \\"'
    # and '") ' with \\"'
    # Actually this is too broad - it would affect the JS delimiters
    
    # Better approach: use a regex to find quoted strings that are inside JS strings
    # and escape their inner quotes
    
    # Pattern: look for " followed by word followed by " inside strings
    # e.g., ("Hello") -> (\"Hello\")
    # e.g., ("World") -> (\"World\")
    # e.g., ("A") -> (\"A\")
    # e.g., ("B") -> (\"B\")
    # e.g., ("%s") -> (\"%s\")
    # e.g., ("%d") -> (\"%d\")
    
    # These are all Java code patterns inside JS strings
    # Replace (" with (\" and ") with \") only in specific contexts
    
    # Actually, the pattern is: text like println("Hello") where the "Hello" 
    # is not properly escaped. We can replace ("word") with (\"word\")
    
    patterns = [
        # System.out.println("Hello") -> System.out.println(\"Hello\")
        (r'System\.out\.println\("([^"]+)"\)', r'System\.out\.println(\\"\\1\\")'),
        # System.out.print("Hello") -> System.out.print(\"Hello\")
        (r'System\.out\.print\("([^"]+)"\)', r'System\.out\.print(\\"\\1\\")'),
        # System.out.printf("Name: %s, Age: %d", "Rahul", 17) -> escape both
        (r'System\.out\.printf\("([^"]+)",\s*("[^"]+"),\s*(\d+)\)', r'System\.out\.printf(\\"\\1\\", \\"\\2\\", \\3)'),
    ]
    
    for pattern, replacement in patterns:
        content = re.sub(pattern, replacement, content)
    
    # Also fix list.add("text") patterns
    content = re.sub(r'list\.add\("([^"]+)"\)', r'list.add(\\"\\1\\")', content)
    
    # Fix System.out.println("text") patterns that might have different formats
    # e.g., ("A ") or ("B ") or ("C ") (with trailing spaces)
    content = re.sub(r'println\("([^"]+)"\)', r'println(\\"\\1\\")', content)
    content = re.sub(r'print\("([^"]+)"\)', r'print(\\"\\1\\")', content)
    
    # Fix new ClassName("text") patterns
    content = re.sub(r'new (String|Integer|Double|Float)\("([^"]+)"\)', r'new \\1(\\"\\2\\")', content)
    
    # Fix any remaining ("..." in Java code context that's inside strings
    # This is a catch-all for patterns like (text with "quotes")
    # e.g., list.add("Hello") - already handled
    # e.g., .get(0) - no quotes
    # e.g., ("Apple", "Banana", "Cherry")
    content = re.sub(r'\("([^"]+)","([^"]+)","([^"]+)"\)', r'(\\"\\1\\",\\\"\\2\\",\\\"\\3")', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {filepath}")

for f in [
    'src/app/data/question-bank/17-input-output.js',
    'src/app/data/question-bank/18-packages-access-modifiers.js', 
    'src/app/data/question-bank/19-oop-concepts.js',
]:
    fix_file(f)

print("\nAll quote fixes applied!")
