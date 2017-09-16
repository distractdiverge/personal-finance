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

  // TODO: Extract Dates
  // TODO: Extract Lines with text like a price (e.g. 5 99 or 3.49)

  let priceLines = [];
  let dateLines = [];

  // Iterate over each line


  return Promise.resolve(text);
}

/**
 * SAMPLE RAW TEXT (Wegman's receipt)
 WWW

 I405 MAIN 2191* I
 UHHHXHOIUN. V0 IHV/L
 *ZIM 919392.

 07/27/11 UPI 53H408

 UH. V UH. . PM / III 5
 IN VUIEH IN UR I VI 0
 SC IN NI NM CHIN. PB 3 W I
 SC 25920 TH RLL WM VAN 0.604
 UIGIORNU 92 HM 5 69 F
 IRESCH GF PIZZR 9 99 F
 SC KELL POP MUS 1.99 F
 SC 27339 KELL FRSY IRRT ILU 0.20.1I
 EDURRD GF SGR CONE 3.49 F
 SC POLAR HRNDRRIN SEL 0 99 9
 SC 25933 POLM SELTZER 0.1M
 SC PDLRR PDHEGRRNRIE 0099 8
 SC 2593. POLER SELTZER 0.1M
 93H CLUHNSEBL HG 15.99 T
 TS MERICM SIYLE 3999 I
 CORN . BI *COLOR 1.50 F
 09 GOURHET BLEND 4 2.99 F

 YRX 1.61

 .... MMCE 60049

 VISR PURCHRSE

 CRRD NUHBER9 IIIIIIIIIIII0280 C
 VISA 06311 05

 RUIH9 003196 RCPI1 17995

 C0053 0000 RPPO0V.#

 9102 00000000031010

 CREDIT CARD V 50.49
 CHRNGE 0.00

 ..9..0.... SWIM W $.99.
 W CLUB SAVXDB3 0 1.03
 1091 8 1.02

 *................... .................

 07/27/11 069M 3617 19. 330W


 */
