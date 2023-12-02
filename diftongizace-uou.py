import re

def diftongizace_u_ou(text):
    patterns = [
        (r"ú", r"o̬u̯")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result1 = diftongizace_u_ou("dlúhý")
print(result1)

def diftongizace_ou_ou(text):
    patterns = [
        (r"o̬u̯", r"ou̯")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result2 = diftongizace_ou_ou(result1)
print(result2)