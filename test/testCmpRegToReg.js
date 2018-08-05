const assert = require('assert');
const CmpRegToReg = require('../src/commands/cmpRegToReg.js');

describe('CmpRegToReg execution', function() {
  it('should compare two equal values and set the EQ flag', function() {
    let cmp = new CmpRegToReg('A', 'B');
    let currRegs = { A: 10, B: 10, C: 0, D: 0 };
    let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
    let { regs, flags } = cmp.execute(currRegs, currFlags);
    assert.deepEqual({ EQ: 1, NE: 0, GT: 0, LT: 0 }, flags);
    assert.deepEqual({ A: 10, B: 10, C: 0, D: 0 }, regs);
  });
  it('should compare two unequal values and set the NE flag', function() {
    let cmp = new CmpRegToReg('A', 'B');
    let currRegs = { A: 10, B: 11, C: 0, D: 0 };
    let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
    let { regs, flags } = cmp.execute(currRegs, currFlags);
    assert.deepEqual({ EQ: 0, NE: 1, GT: 0, LT: 1 }, flags);
    assert.deepEqual({ A: 10, B: 11, C: 0, D: 0 }, regs);
  });
  it('should compare a greater value and set the GT and NE flag', function() {
    let cmp = new CmpRegToReg('A', 'B');
    let currRegs = { A: 10, B: 9, C: 0, D: 0 };
    let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
    let { regs, flags } = cmp.execute(currRegs, currFlags);
    assert.deepEqual({ EQ: 0, NE: 1, GT: 1, LT: 0 }, flags);
    assert.deepEqual({ A: 10, B: 9, C: 0, D: 0 }, regs);
  });
});
