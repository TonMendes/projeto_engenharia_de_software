#!/bin/bash
git ls-files -z | grep -zE '\.(js|jsx|ts|tsx|html|css)$' | while IFS= read -r -d '' file; do
    if [ -f "$file" ]; then
        python filter_script.py "$file" < "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
    fi
done
