import re

def slabikotvorne_lr(text):
    patterns = [
        (r"(č)(ₑr̥|r̥ₑ)", r"\1er"),
        (r"(ž)(ₑr̥|r̥ₑ)", r"\1er")
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text
