const assert = require('assert');
const Func = require('../src/commands/func.js');
const Stack = require('../src/stack.js');
const ProgramCounter = require('../src/programCounter.js');

describe('Func execution', () => {
  it('should execute without changing regs,flags,stack', () => {
    let func = new Func('MUL');
    let currFlags = { EQ: 0, NE: 1, LT: 0, GT: 1 };
    let currRegs = { A: 1, B: 2, C: 3, D: 4 };
    let stack = new Stack();
    let pc = new ProgramCounter([10, 20]);
    let { regs, flags } = func.execute(currRegs, currFlags, stack, pc);
    assert.deepEqual({ A: 1, B: 2, C: 3, D: 4 }, regs);
    assert.deepEqual({ EQ: 0, NE: 1, LT: 0, GT: 1 }, flags);
    assert.deepEqual([], stack.asArray());
  });

  it('should add itself to the function table on the given line number', () => {
    let func = new Func('MUL');
    let newFnTable = func.populateFunctionTable({}, '10');
    assert.deepEqual({ MUL: '10' }, newFnTable);
  });
});
