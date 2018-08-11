const assert = require('assert');
const SubValFromReg = require('../src/commands/subValFromReg.js');

describe('SubValFromReg execution', function() {
  it('should subtract a literal value from the A register', function() {
    let sub = new SubValFromReg('A', 5);
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 10, B: 0, C: 0, D: 0 };
    let { regs, flags } = sub.execute(currRegs, currFlags);
    assert.deepEqual({ A: 5, B: 0, C: 0, D: 0 }, regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
  });
  it('should subtract a literal value from the A register', function() {
    let sub = new SubValFromReg('A', 5);
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 10, B: 0, C: 0, D: 0 };
    let { regs, flags } = sub.execute(currRegs, currFlags);
    assert.deepEqual({ A: 5, B: 0, C: 0, D: 0 }, regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
  });
  it('should subtract a literal value from the B register', function() {
    let sub = new SubValFromReg('B', 5);
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 10, C: 0, D: 0 };
    let { regs, flags } = sub.execute(currRegs, currFlags);
    assert.deepEqual({ A: 0, B: 5, C: 0, D: 0 }, regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
  });
  it('should subtract a literal value from the C register', function() {
    let sub = new SubValFromReg('C', 5);
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 0, C: 10, D: 0 };
    let { regs, flags } = sub.execute(currRegs, currFlags);
    assert.deepEqual({ A: 0, B: 0, C: 5, D: 0 }, regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
  });
  it('should subtract a literal value from the D register', function() {
    let sub = new SubValFromReg('D', 5);
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 0, C: 0, D: 10 };
    let { regs, flags } = sub.execute(currRegs, currFlags);
    assert.deepEqual({ A: 0, B: 0, C: 0, D: 5 }, regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
  });
  it('should provide a negative number on subtracting a larger number from a smaller one', function() {
    let sub = new SubValFromReg('A', 5);
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 0, C: 0, D: 0 };
    let { regs, flags } = sub.execute(currRegs, currFlags);
    assert.deepEqual({ A: -5, B: 0, C: 0, D: 0 }, regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
  });
});
