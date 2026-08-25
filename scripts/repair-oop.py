import subprocess
from pathlib import Path

target = Path("src/app/data/question-bank/19-oop-concepts.js")
parent = "38b84a98cda3b082b884c7bf4535d702ad2e5fbb"
path = "src/app/data/question-bank/19-oop-concepts.js"

try:
    original = subprocess.check_output(
        ["git", "show", f"{parent}:{path}"], text=True
    )
except subprocess.CalledProcessError as e:
    print(f"Git commit {parent} or file path not found.")
    raise e

out = []
in_string = False
escaped = False

for ch in original:
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

target.write_text("".join(out), encoding="utf-8")
print("Sanitization completed successfully.")
