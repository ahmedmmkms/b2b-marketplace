const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join('D:', 'Projects', 'b2b-marketplace', 'frontend', 'p4-frontend', 'src', 'app', 'catalog', 'catalog.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the event handlers to use a new approach that avoids casting in the template
// Instead of onCategoryChange(category.id, $event.target.checked), we'll use a wrapper
content = content.replace(
  /onCategoryChange\(([^)]+), \$event\.target\.checked\)/g,
  'onCategoryChangeSafe($1, $event)'
);

content = content.replace(
  /onVendorChange\(([^)]+), \$event\.target\.checked\)/g,
  'onVendorChangeSafe($1, $event)'
);

// Fix aria-label concatenation by using a method call
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