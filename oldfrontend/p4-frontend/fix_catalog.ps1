# Fix catalog.ts file
$catalogPath = "D:\Projects\b2b-marketplace\frontend\p4-frontend\src\app\catalog\catalog.ts"
$content = Get-Content $catalogPath -Raw

# Fix $event.target.checked issues
$content = $content -replace '\(change\)="onCategoryChange\(([^)]+), \$event\.target\.checked\)"', '(change)="onCategoryChange($1, ($event.target as HTMLInputElement).checked)"'
$content = $content -replace '\(change\)="onVendorChange\(([^)]+), \$event\.target\.checked\)"', '(change)="onVendorChange($1, ($event.target as HTMLInputElement).checked)"'

# Fix translation concatenation issues
$content = $content -replace "\[attr\.aria-label\]=\"'BUTTONS\.VIEW_DETAILS' \| translate \+ ' ' \+ product\.name\"", "[attr.aria-label]=\"{{'BUTTONS.VIEW_DETAILS' | translate}} {{product.name}}\""
$content = $content -replace "\[attr\.aria-label\]=\"'BUTTONS\.ADD_TO_CART' \| translate \+ ' ' \+ product\.name\"", "[attr.aria-label]=\"{{'BUTTONS.ADD_TO_CART' | translate}} {{product.name}}\""

# Write back to file
Set-Content -Path $catalogPath -Value $content -Encoding UTF8