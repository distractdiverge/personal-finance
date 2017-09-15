const tesseract = require('node-tesseract');
const Promise = require('bluebird');

module.exports = {
  extractText,
};

/**
 * Promisified wrapper for tesseract.process
 * @param {string} filepath
 * @returns {Promise.<text, error>} Resolves with text or rejects with an error.
 */
function extractText(filepath) {
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
