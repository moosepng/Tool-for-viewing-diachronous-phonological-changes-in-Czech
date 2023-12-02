import re

def inicialni_o(text):
    patterns = [
        (r"aj", r"ej")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result = inicialni_o("najlepší krajčí házaj")
print(result)