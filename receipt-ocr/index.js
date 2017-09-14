const path = require('path');
const tesseract = require('node-tesseract');
const S = require('string');
const Promise = require('bluebird');
const dateParser = require('./parsing/date');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');
const preprocess = require('./preprocess');
const util = require('./util');


const inputDir = path.join(__dirname, 'images', 'input');

fs.readdirAsync(inputDir)
  .map(filename => path.join(inputDir, filename))
  .map(inputPath => parseText(inputPath));

function parseText(imagePath) {
  const imagePathData = path.parse(imagePath);
  const outputDir = path.join(__dirname, 'text');
  const outputPath = path.join(outputDir, `${imagePathData.name}.txt`);

  const tempImageDir = path.join(__dirname, 'images', 'output');
  const tempImagePath = path.join(tempImageDir, `${imagePathData.name}${imagePathData.ext}`);

  return Promise.join(util.ensureExists(outputDir), util.ensureExists(tempImageDir))
    .then(() => preprocess.clean(imagePath, tempImagePath))
    .then(() => process(tempImagePath))
    .then(text => fs.writeFileAsync(outputPath, text));
}


/**
 * Promisified wrapper for tesseract.process
 * @param {string} filepath
 * @returns {Promise.<text, error>} Resolves with text or rejects with an error.
 */
function process(filepath) {
  const options = {
    l: 'eng',
    config: '.tesseractconfig'
  };
  return new Promise((resolve, reject) => {
    tesseract.process(filepath, options, (err, text) => {
      if(err) {
        reject(err);
      } else {
        resolve(text);
      }
    });
  });
}
