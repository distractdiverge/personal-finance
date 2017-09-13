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
  const white = '#FFFFFF';

  // Create output directory if it doesn't exist.
  fs.accessAsync(outputDir, fs.constants.W_OK)
    .catch(err => fs.mkdirAsync(outputDir))
    .then(() => fs.readdirAsync(inputDir))
    .map(filename => ({
      input: path.join(inputDir, filename),
      output: path.join(outputDir, `formatted_${filename}`)
    }))
    .map(paths => preprocess.resize(paths.input)
      .then(image => applyOperation(image, i => i.greyscale(), paths.output+'.step1.png'))
      .then(image => applyOperation(image, i => i.normalise(), paths.output+'.step2.png'))
      .then(image => applyOperation(image, i => i.blur(1.5), paths.output+'.step3.png'))
      .then(image => applyOperation(image, i => i.threshold(155), paths.output+'.step4.png'))
      .then(image => applyOperation(image, i => i.background(white).extend(50), paths.output+'.step5.png'))
      .then(image => applyOperation(image,
          i => i
            .metadata()
            .then(data => i.extract(70, 70, data.width-70*2, data.height-70*2)),
            paths.output+'.step6.png'
          ))
      .then(image => applyOperation(image, i => i.background(white).extend(50), paths.output+'.step7.png'))
      .then(image => applyOperation(image, i => i.sharpen(4), paths.output+'.step8.png'))
      .then(image => applyOperation(image, i => i, paths.output+'.final.png'))
      .then(image => {
        console.log(`finished ${paths.input}`);
        return image;
      })
    )
    .then(images => {
      console.log('Clean Complete');
      return images;
    });
}

function applyOperation(image, operation, filename) {
  const newImage = operation(image);

  // if operation returns a promise, get the new image from the promise
  if(newImage.then) {
    return newImage.then(i => i.toFile(filename).then(() => i));
  } else { // otherwise, just operate on the new image
    return newImage.toFile(filename).then(() => newImage);
  }
}
