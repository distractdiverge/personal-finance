const exec = require('child_process').exec;
const fs = require('fs');
const Promise = require('bluebird');
const sharp = require('sharp');

module.exports = {
  clean,
  resize
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

/**
 * Resizes an image by a given scale factor
 * @param inputFilepath - Absolute path to the input image
 * @param upscaleFactor - A number to scale the image by
 * @param interpolator - The name of a 'sharp' interpolator {@link http://sharp.dimens.io/en/stable/api-resize/#resize}
 * @returns {Promise.<image: SharpImageObject>} {@link http://sharp.dimens.io/en/stable/api-constructor/#sharp}
 */
function resize(inputFilepath, upscaleFactor = 1.5, interpolator = 'bicubic') {
  const image = sharp(inputFilepath);
  return image
    .metadata()
    .then(filedata => Math.ceil(filedata.width * upscaleFactor))
    .then(newWidth => image.resize(newWidth, null, interpolator));
}
