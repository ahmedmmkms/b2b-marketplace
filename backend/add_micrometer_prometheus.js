const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join('D:', 'Projects', 'b2b-marketplace', 'backend', 'pom.xml');
let content = fs.readFileSync(filePath, 'utf8');

// Add the missing Micrometer Prometheus dependency after the actuator dependency
content = content.replace(
  '<artifactId>spring-boot-starter-actuator</artifactId>\n\t\t</dependency>',
  '<artifactId>spring-boot-starter-actuator</artifactId>\n\t\t</dependency>\n\t\t<dependency>\n\t\t\t<groupId>io.micrometer</groupId>\n\t\t\t<artifactId>micrometer-registry-prometheus</artifactId>\n\t\t\t<scope>runtime</scope>\n\t\t</dependency>'
);

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');
console.log('Micrometer Prometheus dependency added successfully');