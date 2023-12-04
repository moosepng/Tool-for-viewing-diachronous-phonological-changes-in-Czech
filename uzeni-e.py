import re

def uzeni_e(text):
    patterns = [
        (r"é", r"í")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text