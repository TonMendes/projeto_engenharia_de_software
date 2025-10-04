import re
import sys

def remove_comments_js(code):
    def replacer(match):
        s = match.group(0)
        if s.startswith('/'):
            return ''
        else:
            return s

    pattern = re.compile(
        r'//.*?$|/\*.*?\*/|\'(?:\\.|[^\\\'])*\'|"(?:\\.|[^\\"])*"|`(?:\\.|[^\\`])*`',
        re.DOTALL | re.MULTILINE
    )
    result = pattern.sub(replacer, code)

    lines = result.split('\n')
    cleaned = []
    for line in lines:
        if line.strip():
            cleaned.append(line)

    return '\n'.join(cleaned) + '\n' if cleaned else ''

def remove_comments_html(code):
    pattern = re.compile(r'<!--.*?-->', re.DOTALL)
    return pattern.sub('', code)

def remove_comments_css(code):
    pattern = re.compile(r'/\*.*?\*/', re.DOTALL)
    return pattern.sub('', code)

try:
    content = sys.stdin.buffer.read().decode('utf-8', errors='replace')
    filename = sys.argv[1] if len(sys.argv) > 1 else ''

    if 'node_modules' not in filename and '.git' not in filename:
        if filename.endswith(('.js', '.jsx', '.ts', '.tsx')):
            content = remove_comments_js(content)
        elif filename.endswith('.html'):
            content = remove_comments_html(content)
        elif filename.endswith('.css'):
            content = remove_comments_css(content)

    sys.stdout.buffer.write(content.encode('utf-8'))
except:
    sys.stdout.buffer.write(content.encode('utf-8', errors='replace'))
