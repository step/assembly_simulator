const assert = require('assert');
const JmpEq = require('../src/commands/jmpEq.js');
const Stack = require('../src/stack.js');
const ProgramCounter = require('../src/programCounter.js');

describe('JmpEq execution', function() {
  it('should jump to the given line number when EQ is set', function() {
    let jmp = new JmpEq(70);
    let currFlags = { EQ: 1, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 10, C: 0, D: 0 };
    let stack = new Stack();
    let pc = new ProgramCounter([10, 70]);
    let { regs, flags } = jmp.execute(currRegs, currFlags, stack, pc);
    assert.equal(pc.getNextLineNumber(), 70);
    assert.deepEqual(regs, { A: 0, B: 10, C: 0, D: 0 });
    assert.deepEqual(flags, { EQ: 1, NE: 0, LT: 0, GT: 0 });
  });

  it('should not jump to the given line number when EQ is not set', function() {
    let jmp = new JmpEq(70);
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 10, C: 0, D: 0 };
    let stack = new Stack();
    let pc = new ProgramCounter([10, 20, 70]);
    let { regs, flags } = jmp.execute(currRegs, currFlags, stack, pc);
    assert.equal(20, pc.getNextLineNumber());
    assert.deepEqual(regs, { A: 0, B: 10, C: 0, D: 0 });
    assert.deepEqual(flags, { EQ: 0, NE: 0, LT: 0, GT: 0 });
  });
});
