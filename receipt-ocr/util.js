const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = {

  /**
   * Ensure a directory exists at the given path.
   * Checks to see if a directory exists at the given path, and if it can be written to.
   * If it does not exist, it will be created.
   *
   * @param dirPath Path to the directory to check.
   * @returns Promise.<String> Returns the given dirPath
   */
  ensureExists: function(dirPath) {
    return fs.accessAsync(dirPath, fs.constants.W_OK)
      .catch(err => fs.mkdirAsync(dirPath))
      .then(() => dirPath);
  }
};
