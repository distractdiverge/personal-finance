const path = require('path');
const tesseract = require('node-tesseract');
const S = require('string');
const Promise = require('bluebird');
const dateParser = require('./parsing/date');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');
const preprocess = require('./preprocess');



//
process(path.join(__dirname, 'test', 'image4.png'))
  .then(text => {
    fs.writeFileSync(path.join(__dirname, 'out', 'image4.txt'), text);
    return Promise.resolve();
  });

preprocess.clean(path.join(__dirname, 'test', 'image.png'), path.join(__dirname, 'test', 'formatted_image.png'))
  .then(({filepath}) => process(filepath))
  .then(text => {
    const originalOutput = path.join(__dirname, 'out', 'original.txt');
    fs.writeFileSync(originalOutput, text);
    return Promise.resolve();
  });

/*
process(filepath)
  .then(text => {
    const lines = S(text).lines();
    console.log(`Number of lines in decoded image: ${lines.length}`);

    const dates = lines
      .filter(dateParser.containsDate)
      .map(line => ({line, date:dateParser.parse(line)}));

    dates.forEach(({line, date}) => {
      console.log(`Found Date '${date}' in ${line}`);
    });


  })
  .catch(err => {
    console.log(err);
  });
*/


/**
 * Promisified wrapper for tesseract.process
 * @param {string} filepath
 * @returns {Promise.<text, error>} Resolves with text or rejects with an error.
 */
function process(filepath) {
  const options = {
    l: 'eng',
   // psm: 4,
    config: '.tesseractconfig',
    binary: '/usr/local/bin/tesseract'
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
