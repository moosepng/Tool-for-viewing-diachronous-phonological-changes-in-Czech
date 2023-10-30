import re

def ctrnacte_stoleti(text):
    patterns = [
        (r"([žščřcjďťň])u", r"\1i"),
        (r"([žščřcďťň])ú", r"\1í"),
        (r"ĺu", r"li"),
        (r"ĺú", r"lí"),
        (r"([žčřcjďťň])o", r"\1ě"),
        (r"([žčřcjďť])ó", r"\1ie"),
        (r"´u", r"i"),
        (r"´o", r"ě"),
        (r"šo", r"še"),
        (r"ĺo", r"le"),
        (r"ňó", r"nie"),
    ]

    for pattern, replacement in patterns:
        text = re.sub(pattern, replacement, text)

    return text

result = ctrnacte_stoleti("oráčóm čuch pĺúcě našu kašu kupuju mažú prac´uješ oráčovi Judášovi koňóm kráĺovic mořóm noc´ovati bičovati ")
print(result, "\n čuch pĺúcě našu kašu kupuju mažú prac´uješ oráčovi Judášovi koňóm kráĺovic mořóm noc´ovati bičovati")
