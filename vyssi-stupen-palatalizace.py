import re

def vyssi_palatalizace(text):
    patterns = [
        (r"´´ě", r"e")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result = vyssi_palatalizace("s´´ěmo z´´ět c´´ěsta duš´´ě ž´´ěleti pláč´´ě")
print(result)
