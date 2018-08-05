const assert = require('assert');
const Start = require('../src/commands/start.js');

describe('Start execution', function() {
  it('should reset all flags and registers', function() {
    let start = new Start();
    let currFlags = {};
    let currRegs = {};
    let { regs, flags } = start.execute(currRegs, currFlags);
    assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
    assert.deepEqual({ EQ: 0, NE: 0, LT: 0, GT: 0 }, flags);
  });
});
