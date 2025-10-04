#!/bin/bash
git ls-files | while IFS= read -r file; do
    if [[ "$file" =~ \.(js|jsx|ts|tsx|html|css)$ ]] && [[ "$file" != *"node_modules"* ]] && [ -f "$file" ]; then
        python filter_script.py "$file" < "$file" > "$file.tmp" 2>/dev/null && mv "$file.tmp" "$file" 2>/dev/null || true
    fi
done
