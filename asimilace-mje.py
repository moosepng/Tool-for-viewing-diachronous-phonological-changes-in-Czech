import re

def asimilace_mje(text):
    patterns = [
        (r"mje", r"mňě")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text
