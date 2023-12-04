import re

def posileni_dift_dlouheho_jat(text):
    patterns = [
        (r"ě̄", r"i̯e")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text
