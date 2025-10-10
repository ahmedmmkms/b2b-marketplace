const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join('D:', 'Projects', 'b2b-marketplace', 'backend', 'pom.xml');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the bucket4j-jdk8 dependency
content = content.replace(
  /<dependency>\s*<groupId>com\.github\.vladimir-bukhtoyarov<\/groupId>\s*<artifactId>bucket4j-jdk8<\/artifactId>\s*<version>7\.6\.0<\/version>\s*<\/dependency>/g,
  ''
);

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');
console.log('Bucket4j JDK8 dependency removed successfully');