import re

def diftongizace_y_ej(text):
    patterns = [
        (r"ý", r"e̬i̯")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result1 = diftongizace_y_ej("mlýn")
print(result1)

def diftongizace_ej_ej(text):
    patterns = [
        (r"e̬i̯", r"ei̯")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result2 = diftongizace_ej_ej(result1)
print(result2)