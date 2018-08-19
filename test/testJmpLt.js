const assert = require('assert');
const JmpLt = require('../src/commands/jmpLt.js');
const Stack = require('../src/stack.js');
const ProgramCounter = require('../src/programCounter.js');

describe('JmpLt execution', function() {
  it('should jump to the given line number when LT is set', function() {
    let jmp = new JmpLt(70);
    let currFlags = { EQ: 0, NE: 1, LT: 1, GT: 0 };
    let currRegs = { A: 0, B: 10, C: 0, D: 0 };
    let stack = new Stack();
    let pc = new ProgramCounter([10, 70]);
    let { regs, flags } = jmp.execute(currRegs, currFlags, stack, pc);
    assert.equal(pc.getNextLineNumber(), 70);
    assert.deepEqual(regs, { A: 0, B: 10, C: 0, D: 0 });
    assert.deepEqual(flags, { EQ: 0, NE: 1, LT: 1, GT: 0 });
  });

  it('should not jump to the given line number when LT is not set', function() {
    let jmp = new JmpLt(70);
    let currFlags = { EQ: 1, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 10, C: 0, D: 0 };
    let stack = new Stack();
    let pc = new ProgramCounter([10, 20, 70]);
    let { regs, flags } = jmp.execute(currRegs, currFlags, stack, pc);
    assert.equal(20, pc.getNextLineNumber());
    assert.deepEqual(regs, { A: 0, B: 10, C: 0, D: 0 });
    assert.deepEqual(flags, { EQ: 1, NE: 0, LT: 0, GT: 0 });
  });
});
