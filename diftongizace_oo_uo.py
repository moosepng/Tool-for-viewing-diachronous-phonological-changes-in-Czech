import re

def diftongizace_oo_uo(text):
    patterns = [
        (r"ó", r"u̯o")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result = diftongizace_oo_uo("bóh dóm vóči svój")
print(result)
