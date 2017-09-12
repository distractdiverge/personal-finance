const _ = require('lodash');
const moment = require('moment');

module.exports = {
  containsDate,
  parse
};

const validFormat = /[0-1]?[0-9]\/[0-3]?[0-9]\/[0-9]{2,4}/g;

/**
 * Return true if the given text contains a valid date in the format MM/DD/YYYY or MM/DD/YY
 * @param {string} text - The text to find a date within.
 */
function containsDate(text) {
  if (!text) return false;
  return validFormat.test(text);
}

/**
 * Returns a moment instance
 * @param text
 * @returns {Date}
 */
function parse(text) {
  const parseResult = validFormat.exec(_.deburr(text));

  if (!parseResult) {
    throw new Error(`unable to parse text '${text}'`);
  }

  const dateString = _.first(parseResult);
  return moment(dateString);
}
