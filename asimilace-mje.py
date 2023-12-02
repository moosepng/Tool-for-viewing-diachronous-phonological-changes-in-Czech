import re

def asimilace_mje(text):
    patterns = [
        (r"w", r"v")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result = asimilace_mje("wálka")
print(result)