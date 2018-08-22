const StackUnderflowException = require('./stackUnderflowException.js');
/**
 * A simple Stack representation that Machine will use to keep track of a call stack
 */
class Stack {
  /**
   * Initialises a stack
   * @constructor
   */
  constructor() {
    this._stack = [];
  }

  /**
   * Pushes the given value onto the stack
   * @param {number} value - The value to be pushed onto a stack.
   */
  push(value) {
    this._stack.push(value);
  }

  /**
   * Pops the topmost value from the stack
   * @returns {number}
   * @throws {StackUnderflowException} Will throw an error if you try to pop an empty stack
   */
  pop() {
    if (this._stack.length == 0) throw new StackUnderflowException();
    return this._stack.pop();
  }

  /**
   * Returns an array representation of the stack
   * @returns {number[]} The stack represented as an array with the last number pushed at the tail of the array and the first number pushed at the head of the array.
   */
  asArray() {
    return this._stack.map(a => a);
  }

  clear() {
    this._stack = [];
  }
}

module.exports = Stack;
