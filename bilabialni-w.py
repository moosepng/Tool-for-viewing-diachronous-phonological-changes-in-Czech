import re

def bilabialni_w(text):
    patterns = [
        (r"w", r"v")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result = bilabialni_w("wálka")
print(result)