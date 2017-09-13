const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const sharp = require('sharp');
const preprocess = require('./preprocess');

Promise.promisifyAll(fs);

main();

function main() {
  const inputDir = path.join(__dirname, 'images', 'input');
  const outputDir = path.join(__dirname, 'images', 'output');

  // Create output directory if it doesn't exist.
  fs.accessAsync(outputDir, fs.constants.W_OK)
    .catch(err => fs.mkdirAsync(outputDir))
    .then(() => fs.readdirAsync(inputDir))
    .map(filename => ({
      input: path.join(inputDir, filename),
      output: path.join(outputDir, `formatted_${filename}`)
    }))
    .map(paths => preprocess.resize(paths.input)
        .then(image => image.greyscale())
        .then(image => image.toFile(paths.output))
    )
    .then(() => {
      console.log('Clean Complete');
    });
}
