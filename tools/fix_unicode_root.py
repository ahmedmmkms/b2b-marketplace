import os
import re

# List of test files to fix in the root directory
test_files = [
    "test_catalog_browsing.py",
    "test_catalog_browsing_auth.py", 
    "test_catalog_browsing_simple.py",
    "test_fulltext_search.py",
    "test_fulltext_search_auth.py",
    "test_media_assets.py",
    "test_media_assets_auth.py",
    "test_product_attributes.py",
    "test_product_attributes_auth.py",
    "test_product_entity.py",
    "test_product_entity_auth.py",
    "test_vendor_entity.py",
    "test_vendor_entity_auth.py",
    "test_vendor_entity_mod.py"
]

# Define replacements
replacements = [
    ("✓", "SUCCESS:"),
    ("✗", "ERROR:")
]

root_dir = "D:\\Projects\\b2b-marketplace"

for test_file in test_files:
    file_path = os.path.join(root_dir, test_file)
    
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