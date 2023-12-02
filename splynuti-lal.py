import re

def splynuti_lal(text):
    patterns = [
        (r"ł", r"l"),
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result = splynuti_lal("łáska")
print(result)