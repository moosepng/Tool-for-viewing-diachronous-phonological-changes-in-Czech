import re

def bilabialni_i_y(text):
    patterns = [
        (r"y", r"i")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result = bilabialni_i_y("byl mysleti")
print(result)