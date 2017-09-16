const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const debug = require('debug')('io');

module.exports = {
 ensureExists,
};

/**
 * Ensure a directory exists at the given path.
 * Checks to see if a directory exists at the given path, and if it can be written to.
 * If it does not exist, it will be created.
 *
 * @param dirPath Path to the directory to check.
 * @returns Promise.<String> Returns the given dirPath
 */
function ensureExists(dirPath) {
  return fs.accessAsync(dirPath, fs.constants.W_OK)
    .catch(err => {
      debug(err);
      return fs.mkdirAsync(dirPath);
    })
    .then(() => dirPath);
}
