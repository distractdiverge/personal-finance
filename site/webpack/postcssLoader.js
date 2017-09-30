const atImport = require('postcss-import');
const autoPrefixer = require('autoprefixer');

module.exports = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [
        atImport,
        autoPrefixer,
      ];
    },
  },
};
