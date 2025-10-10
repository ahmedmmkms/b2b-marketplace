const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join('D:', 'Projects', 'b2b-marketplace', 'frontend', 'p4-frontend', 'src', 'app', 'catalog', 'catalog.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Fix $event.target.checked issues for both onCategoryChange and onVendorChange
content = content.replace(
  /onCategoryChange\(([^)]+), \$event\.target\.checked\)/g,
  'onCategoryChange($1, ($event.target as HTMLInputElement).checked)'
);

content = content.replace(
  /onVendorChange\(([^)]+), \$event\.target\.checked\)/g,
  'onVendorChange($1, ($event.target as HTMLInputElement).checked)'
);

// Fix the aria-label concatenation issues - these are more complex and require a different approach
// Looking at the specific lines that are causing issues:

// Fix the aria-label for VIEW_DETAILS button
content = content.replace(
  /\[attr\.aria-label\]="'BUTTONS\.VIEW_DETAILS' \| translate \+ ' ' \+ product\.name"/g,
  "[attr.aria-label]=\"{{'BUTTONS.VIEW_DETAILS' | translate}} {{product.name}}\""
);

// Fix the aria-label for ADD_TO_CART button
content = content.replace(
  /\[attr\.aria-label\]="'BUTTONS\.ADD_TO_CART' \| translate \+ ' ' \+ product\.name"/g,
  "[attr.aria-label]=\"{{'BUTTONS.ADD_TO_CART' | translate}} {{product.name}}\""
);

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');
console.log('File updated successfully');