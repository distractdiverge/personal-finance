const Promise = require('bluebird');

module.exports = {
  parse,
};

/***
 * Split the given receipt text into headers, footers and the main content
 * The header can also contain store name, location, date and time
 * The main content is split into further parts, itemized list, subtotal tax and total
 * The individual items can also be split into multiple parts, name, category (food / non-food) price and quantity
 * The quantity may span multiple lines before/after the actual item.
 *
 * The other metadata about the receipt may include payment method, and if cash, what change
 * if debit, what cash back amount.
 *
 * @param text Raw Receipt Text parsed from OCR
 */
function parse(text) {
  // TODO: Extract parts of the given receipt text
  return Promise.resolve(text);
}
