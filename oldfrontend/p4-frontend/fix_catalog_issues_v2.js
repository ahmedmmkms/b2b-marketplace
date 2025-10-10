const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join('D:', 'Projects', 'b2b-marketplace', 'frontend', 'p4-frontend', 'src', 'app', 'catalog', 'catalog.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Fix $event.target.checked issues for both onCategoryChange and onVendorChange with proper TypeScript casting
content = content.replace(
  /onCategoryChange\(([^)]+), \$event\.target\.checked\)/g,
  'onCategoryChange($1, ($event.target as HTMLInputElement).checked)'
);

content = content.replace(
  /onVendorChange\(([^)]+), \$event\.target\.checked\)/g,
  'onVendorChange($1, ($event.target as HTMLInputElement).checked)'
);

// For aria-label concatenation, we'll need to use a different approach
// Instead of [attr.aria-label]="'BUTTONS.VIEW_DETAILS' | translate + ' ' + product.name"
// We need to use a component method that handles the concatenation
// Since we can't directly make this change with a regex, let's modify the component logic

// First, let's fix the attribute by changing it to use a method call instead
// This will require both template changes and component method changes
content = content.replace(
  /\[attr\.aria-label\]=\"'BUTTONS\.VIEW_DETAILS' \| translate \+ ' ' \+ product\.name\"/g,
  "[attr.aria-label]=\"getAriaLabelForViewDetails(product.name)\""
);

content = content.replace(
  /\[attr\.aria-label\]=\"'BUTTONS\.ADD_TO_CART' \| translate \+ ' ' \+ product\.name\"/g,
  "[attr.aria-label]=\"getAriaLabelForAddToCart(product.name)\""
);

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');
console.log('File updated successfully');