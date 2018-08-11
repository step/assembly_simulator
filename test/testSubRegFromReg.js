const assert = require('assert');
const SubRegFromReg = require('../src/commands/subRegFromReg.js');

describe("SubRegFromReg execution",function(){
  it('should subtract A from the A register', function() {
    let sub = new SubRegFromReg('A', 'A');
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 2, B: 1, C: 0, D: 0 };
    let { regs, flags } = sub.execute(currRegs, currFlags);
    assert.deepEqual({ A: 0, B: 1, C: 0, D: 0 }, regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
  });

  it('should subtract B from the A register', function() {
    let sub = new SubRegFromReg('A', 'B');
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 2, B: 1, C: 0, D: 0 };
    let { regs, flags } = sub.execute(currRegs, currFlags);
    assert.deepEqual({ A: 1, B: 1, C: 0, D: 0 }, regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
  });

  it('should subtract C from the A register', function() {
    let sub = new SubRegFromReg('A', 'C');
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 2, B: 0, C: 1, D: 0 };
    let { regs, flags } = sub.execute(currRegs, currFlags);
    assert.deepEqual({ A: 1, B: 0, C: 1, D: 0 }, regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
  });

  it('should subtract D from the A register', function() {
    let sub = new SubRegFromReg('A', 'D');
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 2, B: 0, C: 0, D: 1 };
    let { regs, flags } = sub.execute(currRegs, currFlags);
    assert.deepEqual({ A: 1, B: 0, C: 0, D: 1 }, regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
  });

  it("should provide a negative number on subtracting a larger register from a smaller one",function(){
    let sub = new SubRegFromReg("A","B");
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 5, C: 0, D: 0 };
    let { regs, flags } = sub.execute(currRegs, currFlags);
    assert.deepEqual({ A: -5, B: 5, C: 0, D: 0 }, regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
  });

});
