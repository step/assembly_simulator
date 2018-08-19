const assert = require('assert');
const Stop = require('../src/commands/stop.js');
const Stack = require('../src/stack.js');
const ProgramCounter = require('../src/programCounter.js');

describe('Stop execution', function() {
  it('should return a halt flag', function() {
    let stop = new Stop();
    let currFlags = {};
    let currRegs = {};
    let stack = new Stack();
    let pc = new ProgramCounter([10, 20, 70]);
    stop.execute(currRegs, currFlags, stack, pc);
    assert.equal(true, pc.shouldHalt());
  });

  it('should not modify any registers or flags', function() {
    let stop = new Stop();
    let currFlags = { EQ: 1, NE: 0, GT: 0, LT: 0 };
    let currRegs = { A: 10, B: 20, C: 30, D: 40 };
    let stack = new Stack();
    let pc = new ProgramCounter([10, 20, 70]);
    let { regs, flags } = stop.execute(currRegs, currFlags, stack, pc);
    assert.deepEqual(regs, { A: 10, B: 20, C: 30, D: 40 });
    assert.deepEqual(flags, { EQ: 1, NE: 0, GT: 0, LT: 0 });
  });
});
