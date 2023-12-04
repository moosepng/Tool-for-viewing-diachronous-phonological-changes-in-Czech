import re

def slabicne_rl(text):
    patterns = [
        (r"([tkdgcčďsšzžnlrř])r", r"\1r̥"),
        (r"([tkdgcčďsšzžnlrř])l", r"\1l̥")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text
