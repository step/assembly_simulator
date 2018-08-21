const assert = require('assert');
const Ret = require('../src/commands/ret.js');
const Stack = require('../src/stack.js');
const ProgramCounter = require('../src/programCounter.js');

describe('Ret execution', () => {
  it('should remove the line number to return to from the stack', () => {
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 0, C: 0, D: 0 };
    let stack = new Stack();
    stack.push('30');
    let pc = new ProgramCounter([10, 20, 30], { MUL: '30' });
    let ret = new Ret('MUL');
    ret.execute(currRegs, currFlags, stack, pc);
    assert.deepEqual([], stack.asArray());
  });

  it('should change the program counter to reflect the line to return to', () => {
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 0, C: 0, D: 0 };
    let stack = new Stack();
    stack.push('30');
    let pc = new ProgramCounter([10, 20, 30], { MUL: '30' });
    let ret = new Ret('MUL');
    ret.execute(currRegs, currFlags, stack, pc);
    assert.deepEqual('30', pc.getNextLineNumber());
  });
});
