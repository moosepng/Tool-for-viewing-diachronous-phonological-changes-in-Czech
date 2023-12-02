import re

def inicialni_o(text):
    patterns = [
        (r"w", r"v")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result = inicialni_o("wálka")
print(result)