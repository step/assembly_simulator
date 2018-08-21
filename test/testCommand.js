const assert = require('assert');
const Command = require('../src/commands/command.js');
const Stack = require('../src/stack.js');
const ProgramCounter = require('../src/programCounter.js');

describe('Command execution', () => {
  it('should return registers, flags and stack unchanged', () => {
    let currFlags = { EQ: 1, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 10, B: 20, C: 30, D: 40 };
    let stack = new Stack();
    stack.push(10);
    let pc = new ProgramCounter([10, 20]);
    let cmd = new Command();
    let { regs, flags } = cmd.execute(currRegs, currFlags, stack, pc);
    assert.deepEqual([10], stack.asArray());
    assert.deepEqual({ A: 10, B: 20, C: 30, D: 40 }, regs);
    assert.deepEqual({ EQ: 1, NE: 0, LT: 0, GT: 0 }, flags);
  });

  it('should not populate a function table', () => {
    let cmd = new Command();
    let fnTable = { MULTIPLY: '10' };
    let newFnTable = cmd.populateFunctionTable(fnTable, 20);
    assert.deepEqual({ MULTIPLY: '10' }, newFnTable);
  });
});
