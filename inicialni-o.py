import re

def inicialni_o(text):
    patterns = [
        (r"^o", r"vo")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text
