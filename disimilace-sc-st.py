import re

def disimilace_sc_st(text):
    patterns = [
        (r"šč", r"sť"),
        (r"šť([bcdďfghjklmnňpqrřsštťvwxzž])", r"št\1")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text
