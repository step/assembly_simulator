const assert = require('assert');
const Jmp = require('../src/commands/jmp.js');
const Stack = require('../src/stack.js');
const ProgramCounter = require('../src/programCounter.js');

describe('Jmp execution', function() {
  it('should jump to the given line number', function() {
    let jmp = new Jmp(70);
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 10, C: 0, D: 0 };
    let stack = new Stack();
    let pc = new ProgramCounter([10,70]);
    let { regs, flags } = jmp.execute(currRegs, currFlags, stack, pc);
    assert.deepEqual(regs, { A: 0, B: 10, C: 0, D: 0 });
    assert.deepEqual(flags, { EQ: 0, NE: 0, LT: 0, GT: 0 });
    assert.equal(70,pc.getNextLineNumber());
  });
});
