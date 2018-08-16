const assert = require('assert');
const Push = require('../src/commands/push.js');
const Stack = require('../src/stack.js');

describe('Push execution', () => {
  it('should push the A register to stack', () => {
    let push = new Push('A');
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 10, B: 0, C: 0, D: 0 };
    let stack = new Stack();
    push.execute(currRegs, currFlags, stack);
    assert.deepEqual([10], stack.asArray());
  });

  it('should push the B register to stack', () => {
    let push = new Push('B');
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 0, B: 10, C: 0, D: 0 };
    let stack = new Stack();
    push.execute(currRegs, currFlags, stack);
    assert.deepEqual([10], stack.asArray());
  });

  it('should not modify the current registers or flags', () => {
    let push = new Push('A');
    let currFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    let currRegs = { A: 10, B: 0, C: 0, D: 0 };
    let stack = new Stack();
    let { regs, flags } = push.execute(currRegs, currFlags, stack);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, regs);
  });
});
