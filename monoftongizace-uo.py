import re

def monoftongizace_uo(text):
    patterns = [
        (r"u̯o", r"ú")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result = monoftongizace_uo("bu̯oh")
print(result)