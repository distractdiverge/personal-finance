const _ = require('lodash');
const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const preprocess = require('./preprocess');
const ocr = require('./parsing/ocr');
const io = require('./io');

function main() {
  const inputDir = path.join(__dirname, 'images', 'input');
  const isValidFile = _.flow(
    f => path.parse(f),
    parts => parts.ext,
    _.toLower,
    _.partial(_.includes, ['.png', '.jpg', '.jpeg'])
  );

  fs.readdirAsync(inputDir)
    .filter(isValidFile)
    .map(filename => path.join(inputDir, filename))
    .map(inputPath => parseText(inputPath));
}

function parseText(imagePath) {
  const imagePathData = path.parse(imagePath);
  const outputDir = path.join(__dirname, 'text');
  const outputPath = path.join(outputDir, `${imagePathData.name}.txt`);

  const tempImageDir = path.join(__dirname, 'images', 'output');
  const tempImagePath = path.join(tempImageDir, `${imagePathData.name}${imagePathData.ext}`);

  return Promise.join(io.ensureExists(outputDir), io.ensureExists(tempImageDir))
    .then(() => preprocess.clean(imagePath, tempImagePath))
    .then(() => ocr.extractText(tempImagePath))
    .then(text => fs.writeFileAsync(outputPath, text));
}



main();
