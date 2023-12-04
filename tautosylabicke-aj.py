import re

def tautosylabicke_aj(text):
    patterns = [
        (r"aj", r"ej")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text