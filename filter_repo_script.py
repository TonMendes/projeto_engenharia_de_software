#!/usr/bin/env python3
import re
import git_filter_repo as fr

def remove_comments_js(code):
    def replacer(match):
        s = match.group(0)
        if s.startswith('/'):
            return b''
        else:
            return s

    pattern = re.compile(
        rb'//.*?$|/\*.*?\*/|\'(?:\\.|[^\\\'])*\'|"(?:\\.|[^\\"])*"|`(?:\\.|[^\\`])*`',
        re.DOTALL | re.MULTILINE
    )
    result = pattern.sub(replacer, code)

    lines = result.split(b'\n')
    cleaned = []
    for line in lines:
        if line.strip():
            cleaned.append(line)

    return b'\n'.join(cleaned) + b'\n' if cleaned else b''

def remove_comments_html(code):
    pattern = re.compile(rb'<!--.*?-->', re.DOTALL)
    return pattern.sub(b'', code)

def remove_comments_css(code):
    pattern = re.compile(rb'/\*.*?\*/', re.DOTALL)
    return pattern.sub(b'', code)

def blob_callback(blob, callback_metadata):
    filename = blob.original_id
    if b'node_modules' in filename or b'.git' in filename:
        return

    try:
        if filename.endswith((b'.js', b'.jsx', b'.ts', b'.tsx')):
            blob.data = remove_comments_js(blob.data)
        elif filename.endswith(b'.html'):
            blob.data = remove_comments_html(blob.data)
        elif filename.endswith(b'.css'):
            blob.data = remove_comments_css(blob.data)
    except:
        pass

args = fr.FilteringOptions.parse_args(['--force'], blob_callback=blob_callback)
fr.RepoFilter(args).run()
