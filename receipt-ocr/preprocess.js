const exec = require('child_process').exec;
const fs = require('fs');
const Promise = require('bluebird');
const sharp = require('sharp');

module.exports = {
  clean,
  resize
};

/**
 * Execute a combination of scripts to clean the image
 *
 * @param {String} inputFile the path to the input image
 * @param {String} outputFile the path to the output image
 */
function clean(inputFile, outputFile, options = {}) {
  const defaultOptions = {
    blur: 1.5,
    threshold: 155,
    sharpen: 4
  };
  const combinedOptions = Object.assign({}, defaultOptions, options);
  return resize(inputFile)
    .then(image => image.greyscale())
    .then(image => image.normalise())
    .then(image => image.blur(combinedOptions.blur))
    .then(image => image.threshold(combinedOptions.threshold))
    .then(image => image.sharpen(combinedOptions.sharpen))
    .then(image => image.toFile(outputFile).then(() => image));
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
