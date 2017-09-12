const fs = require('fs');
const path = require('path');
const sharp = require('sharp');


main();

function main() {
  const inputDir = path.join(__dirname, 'test', 'input');
  const outputDir = path.join(__dirname, 'test', 'output');

  const inputFilepath = path.join(__dirname, 'test', filename);
  const outputFilepath = path.join(__dirname, 'test' , `formatted_${filename}`);

  sharp(inputFilepath)
    .resize(200)
    .toFile(outputFilepath);
}
