const assert = require('assert');
const Call = require('../src/commands/call.js');
const Stack = require('../src/stack.js');
const ProgramCounter = require('../src/programCounter.js');

describe('Call execution', () => {
  it('should preserve the line number to return to', () => {
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 0, C: 0, D: 0 };
    let stack = new Stack();
    let pc = new ProgramCounter([10, 20, 30], { MUL: '30' });
    let call = new Call('MUL');
    call.execute(currRegs, currFlags, stack, pc);
    assert.deepEqual(['20'], stack.asArray());
  });
});
