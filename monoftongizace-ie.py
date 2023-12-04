import re

def monoftongizace_uo(text):
    patterns = [
        (r"i̯e", r"í")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text
