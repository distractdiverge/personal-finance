const Promise = require('bluebird');
const tesseract = require('node-tesseract');
const processAsync = Promise.promisify(tesseract.process);
const debug = require('debug')('ocr');

module.exports = {
  extractText,
};

/**
 * Promisified wrapper for tesseract.process
 * @param {string} filepath
 * @returns {Promise.<text, error>} Resolves with text or rejects with an error.
 */
function extractText(filepath, options = {}) {
  const defaultOptions = {
    l: 'eng',
    psm: 4,
    config: '.tesseractconfig'
  };

  return processAsync(
    filepath,
    Object.assign({}, defaultOptions, options)
  ).catch(err => {
    console.log('test');
    debug(`An error occurred while processing ${filepath}: '${err}'`);
    throw err;
  });
}
