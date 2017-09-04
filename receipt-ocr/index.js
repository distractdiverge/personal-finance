const path = require('path');
const Tesseract = require('tesseract.js');

const filepath = path.join('test', 'input.png');

Tesseract.recognize(filepath)
  .progress((p) => { console.log('progress', p);    })
  .then((result) => { console.log('result', result); });
