const chai = require('chai');
const expect = chai.expect;
const ptext = require('../../parsing/text');
const testData = require('../data/receipts');

const inputRawText = testData.rawReceiptText();

describe('Text Parsing', () => {
  it('should extract dates', () => {
    const parsedText = ptext.parse(inputRawText);

    expect(parsedText).to.exist;
    expect(parsedText).to.have.property('metadata');
    expect(parsedText.metadata).to.have.property('date');
    expect(parsedText.metadata.date).to.equal('09/01/2017');
  });

  it('should extract lines with prices', () => {
    const parsedText = ptext.parse(inputRawText);

    expect(parsedText).to.exist;
    expect(parsedText).to.have.property('items');
    expect(parsedText.items).to.have.length(10);
  });
})
