const assert = require('assert');
const Stack = require('../src/stack.js');
const StackUnderflowException = require('../src/stackUnderflowException.js');

describe('Stack ', () => {
  it('should be able to push a value on to a stack', () => {
    let stack = new Stack();
    stack.push(5);
    assert.deepEqual([5], stack.asArray());
  });

  it('should be able to push more than one value on to a stack', () => {
    let stack = new Stack();
    stack.push(5);
    stack.push(6);
    assert.deepEqual([5, 6], stack.asArray());
  });

  it('should be able to pop a value from the stack', () => {
    let stack = new Stack();
    stack.push(5);
    assert.equal(5, stack.pop());
    assert.deepEqual([], stack.asArray());
  });

  it('should only pop the topmost value from the stack', () => {
    let stack = new Stack();
    stack.push(5);
    stack.push(6);
    assert.equal(6, stack.pop());
    assert.deepEqual([5], stack.asArray());
  });

  it('should throw an error when trying to pop an empty stack', () => {
    let stack = new Stack();
    assert.throws(() => stack.pop());
  });

  it('should clear the stack',() => {
    let stack = new Stack();
    stack.push(5);
    assert.deepEqual([5], stack.asArray());
    stack.clear();
    assert.deepEqual([], stack.asArray());
  });
});
