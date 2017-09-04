const config = require('config');
const plaid = require('plaid');

const plaidClient = new plaid.Client(
  config.get('plaid.client_id'),
  config.get('plaid.secret'),
  config.get('plaid.public_key'),
  config.get('plaid.plaid_env'),
  config.get('plaid.options')
);

module.exports = {};
