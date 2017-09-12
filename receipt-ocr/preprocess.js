const exec = require('child_process').exec;
const fs = require('fs');
const Promise = require('bluebird');

module.exports = {
  clean
};

/**
 * Execute the textcleaner ImageMagick script
 *
 * @param {String} inputFile the path to the input image
 * @param {String} outputFile the path to the output image
 * @param {Object} options a collection of options (name:value) to pass (excluding '-' in the key)
 * @returns {Promise.<{image, filepath}>} A promise that returns the output image and filepath
 */
function clean(inputFile, outputFile, options = {}) {
  const _options = Object.assign({
    binary: './textcleaner'
  }, options);

  return new Promise((resolve, reject) => {
    const command = [_options.binary, inputFile, outputFile];

    exec(command.join(' '), options, (err) => {
      if (err) {
        return reject(err);
      }

      fs.readFile(outputFile, (err, data) => err ? reject(err) : resolve({
        image: data,
        filepath: outputFile
      }));
    });
  });
}
