const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const sharp = require('sharp');

Promise.promisifyAll(fs);

main();

function main() {
  const inputDir = path.join(__dirname, 'images', 'input');
  const outputDir = path.join(__dirname, 'images', 'output');
  const upscaleFactor = 2;

  // Create output directory if it doesn't exist.
  fs.accessAsync(outputDir, fs.constants.W_OK)
    .catch(err => fs.mkdirAsync(outputDir))
    .then(() => fs.readdirAsync(inputDir))
    .map(filename => ({
      input: path.join(inputDir, filename),
      output: path.join(outputDir, `formatted_${filename}`)
    }))
    .map(filepath => {
      const image = sharp(filepath.input);
      return image
        .metadata()
        .then(filedata => image.resize(Math.ceil(filedata.width * upscaleFactor)))
        .then(newImage => newImage.toFile(filepath.output))
        .then(fileinfo => ({info: fileinfo, paths: filepath}));
    })
    .map(result => {
      console.log(`Resized '${result.paths.output}' to '${result.info.width}x${result.info.height}'`);
    });
}
