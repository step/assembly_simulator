const assert = require('assert');
const Pop = require('../src/commands/pop.js');
const Stack = require('../src/stack.js');

describe('Pop execution', () => {
  it('should pop from the stack to the A register', () => {
    let pop = new Pop('A');
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 0, C: 0, D: 0 };
    let stack = new Stack();
    stack.push(10)
    let {regs} = pop.execute(currRegs, currFlags, stack);
    assert.deepEqual([], stack.asArray());
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 },regs);
  });

  it('should pop from the stack to the B register', () => {
    let pop = new Pop('B');
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 0, C: 0, D: 0 };
    let stack = new Stack();
    stack.push(10)
    let {regs} = pop.execute(currRegs, currFlags, stack);
    assert.deepEqual([], stack.asArray());
    assert.deepEqual({ A: 0, B: 10, C: 0, D: 0 },regs);
  });

  it('should not modify the current flags', () => {
    let pop = new Pop('A');
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 0, C: 0, D: 0 };
    let stack = new Stack();
    stack.push(10)
    let {regs,flags} = pop.execute(currRegs, currFlags, stack);
    assert.deepEqual([], stack.asArray());
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 },regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 },flags);
  });
});
