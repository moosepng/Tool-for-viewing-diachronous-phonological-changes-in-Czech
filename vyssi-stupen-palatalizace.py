import re

def vyssi_palatalizace(text):
    patterns = [
        (r"´´ě", r"e")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text
