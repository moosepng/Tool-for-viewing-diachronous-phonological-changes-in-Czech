import re

def zanik_kratkeho_jat(text):
    patterns = [
        (r"([pbmvf])ě", r"\1je"),
        (r"([tkdgcčďsšzžnlrř])ě", r"\1e")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result = zanik_kratkeho_jat("město")
print(result)