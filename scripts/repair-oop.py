from pathlib import Path

TARGET = Path("src/app/data/question-bank/19-oop-concepts.js")


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


TARGET.write_text(sanitize_js_strings(TARGET.read_text(encoding="utf-8")), encoding="utf-8")
