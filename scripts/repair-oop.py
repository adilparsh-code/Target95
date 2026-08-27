import subprocess
from pathlib import Path

def sanitize_js_strings(text: str) -> str:
    out = []
    in_string = False
    escaped = False
    for ch in text:
        if in_string:
            if escaped:
                out.append(ch)
                escaped = False
                continue
            if ch == "\\":
                out.append(ch)
                escaped = True
                continue
            if ch == '"':
                out.append(ch)
                in_string = False
                continue
            if ch == "\n":
                out.append("\\n")
                continue
            out.append(ch)
        else:
            out.append(ch)
            if ch == '"':
                in_string = True
    return "".join(out)

# Support both workflow modes: fetch original from git or sanitize existing file
TARGET = Path("src/app/data/question-bank/19-oop-concepts.js")
parent_commit = "38b84a98cda3b082b884c7bf4535d702ad2e5fbb"

try:
    # Try to fetch original version from git if available
    original = subprocess.check_output(
        ["git", "show", f"{parent_commit}:{TARGET.as_posix()}"], text=True
    )
    sanitized = sanitize_js_strings(original)
except subprocess.CalledProcessError:
    # Fall back to sanitizing the existing file if git fetch fails
    print("Git commit not found - sanitizing current file instead")
    current_content = TARGET.read_text(encoding="utf-8")
    sanitized = sanitize_js_strings(current_content)

TARGET.write_text(sanitized, encoding="utf-8")
print("Sanitization completed successfully.")