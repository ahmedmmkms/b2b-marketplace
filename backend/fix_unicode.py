import os
import re

# List of test files to fix
test_files = [
    "task5.1-acceptance-test.py",
    "task5.2-acceptance-test.py", 
    "task5.3-acceptance-test.py",
    "task5.4-acceptance-test.py",
    "task5.5-acceptance-test.py",
    "task5.6-acceptance-test.py"
]

# Define replacements
replacements = [
    ("✓", "SUCCESS:"),
    ("✗", "ERROR:")
]

backend_dir = "D:\\Projects\\b2b-marketplace\\backend"

for test_file in test_files:
    file_path = os.path.join(backend_dir, test_file)
    
    if os.path.exists(file_path):
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Perform replacements
        for old_char, new_text in replacements:
            content = content.replace(old_char, new_text)
        
        # Write the modified content back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Fixed Unicode characters in {test_file}")
    else:
        print(f"File not found: {test_file}")