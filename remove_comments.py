import re
import sys

def remove_js_comments(content):
    def replacer(match):
        s = match.group(0)
        if s.startswith('/'):
            return " "
        else:
            return s

    pattern = re.compile(
        r'//.*?$|/\*.*?\*/|\'(?:\\.|[^\\\'])*\'|"(?:\\.|[^\\"])*"',
        re.DOTALL | re.MULTILINE
    )
    return pattern.sub(replacer, content)

def remove_html_comments(content):
    pattern = re.compile(r'<!--.*?-->', re.DOTALL)
    return pattern.sub('', content)

def remove_css_comments(content):
    pattern = re.compile(r'/\*.*?\*/', re.DOTALL)
    return pattern.sub('', content)

def clean_empty_lines(content):
    lines = content.split('\n')
    cleaned_lines = []
    prev_empty = False

    for line in lines:
        is_empty = line.strip() == ''
        if not (is_empty and prev_empty):
            cleaned_lines.append(line)
        prev_empty = is_empty

    return '\n'.join(cleaned_lines)

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if filepath.endswith(('.js', '.jsx', '.ts', '.tsx')):
            content = remove_js_comments(content)
        elif filepath.endswith('.html'):
            content = remove_html_comments(content)
            content = remove_js_comments(content)
        elif filepath.endswith('.css'):
            content = remove_css_comments(content)

        content = clean_empty_lines(content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        return True
    except Exception as e:
        print(f"Error processing {filepath}: {e}", file=sys.stderr)
        return False

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python remove_comments.py <file>")
        sys.exit(1)

    filepath = sys.argv[1]
    if process_file(filepath):
        sys.exit(0)
    else:
        sys.exit(1)
