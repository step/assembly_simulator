const assert = require('assert');
const PrnLiteral = require('../src/commands/prnLiteral.js');

describe('PrnLiteral execution', function() {
  it("should 'print' the literal given to it", function() {
    let print = new PrnLiteral('hello');
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 1, B: 0, C: 0, D: 0 };
    let { flags, regs, prn } = print.execute(currRegs, currFlags);
    assert.equal('hello', prn);
  });
});
