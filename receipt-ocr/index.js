const _ = require('lodash');
const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const preprocess = require('./preprocess');
const ocr = require('./parsing/ocr');
const text = require('./parsing/text');
const io = require('./io');
const debug = require('debug')('receipt-ocr');

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
    .map(filename => {
      const imageName = path.parse(filename).name;
      const writeRawText = _.partial(writeTextToFile, `${imageName}.txt`);
      const writeJsonText = _.partial(writeTextToFile, `${imageName}.txt`);

      return path.join(inputDir, filename)
        .then(parseImage)
        .tap(debug)
        .tap(text => text.parse(text).then(writeJsonText))
        .then(writeRawText);
    });
}

function parseImage(imagePath) {
  const imagePathData = path.parse(imagePath);

  const tempImageDir = path.join(__dirname, 'images', 'output');
  const tempImagePath = path.join(tempImageDir, `${imagePathData.name}${imagePathData.ext}`);

  return io.ensureExists(tempImageDir)
    .then(() => preprocess.clean(imagePath, tempImagePath))
    .then(() => ocr.extractText(tempImagePath));
}

function writeTextToFile(filename, text) {
  const outputDir = path.join(__dirname, 'text');
  const outputPath = path.join(outputDir, filename);
  return io.ensureExists(outputDir)
    .then(() => fs.writeFileAsync(outputPath, text));
}


main();
