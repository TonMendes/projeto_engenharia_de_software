import os
import sys
import re

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

    result = '\n'.join(cleaned_lines)

    while result.endswith('\n\n'):
        result = result[:-1]

    if result and not result.endswith('\n'):
        result += '\n'

    return result

def should_process(filepath):
    if 'node_modules' in filepath:
        return False
    if filepath.endswith(('.js', '.jsx', '.ts', '.tsx', '.html', '.css')):
        return True
    return False

def process_file(filepath):
    try:
        if not os.path.exists(filepath):
            return True

        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        original_content = content

        if filepath.endswith(('.js', '.jsx', '.ts', '.tsx')):
            content = remove_js_comments(content)
        elif filepath.endswith('.html'):
            content = remove_html_comments(content)
            content = remove_js_comments(content)
        elif filepath.endswith('.css'):
            content = remove_css_comments(content)

        content = clean_empty_lines(content)

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

        return True
    except Exception as e:
        print(f"Error processing {filepath}: {e}", file=sys.stderr)
        return True

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root or '.git' in root:
            continue

        for file in files:
            filepath = os.path.join(root, file)
            if should_process(filepath):
                process_file(filepath)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        target = sys.argv[1]
        if os.path.isfile(target):
            process_file(target)
        elif os.path.isdir(target):
            process_directory(target)
    else:
        process_directory('.')
