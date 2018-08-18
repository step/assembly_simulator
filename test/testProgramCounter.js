const assert = require('assert');
const ProgramCounter = require('../src/programCounter.js');

describe('Program Counter get line', () => {
  describe('get line', () => {
    it('should get the current line being executed', () => {
      let lineNumbers = ['10', '20'];
      let pc = new ProgramCounter(lineNumbers);
      assert.equal(20, pc.getNextLineNumber());
    });

    it('should get the next line being executed', () => {
      let lineNumbers = ['10', '20'];
      let pc = new ProgramCounter(lineNumbers);
      assert.equal(20, pc.getNextLineNumber());
    });
  });

  describe('update', () => {
    it('should update the current and next line numbers', () => {
      let lineNumbers = ['10', '20', '30'];
      let pc = new ProgramCounter(lineNumbers);
      pc.update();
      assert.equal(30, pc.getNextLineNumber());
    });
  });

  describe('set next line', () => {
    it('should set the next index based on the line number provided', () => {
      let lineNumbers = ['10', '20', '30', '40'];
      let pc = new ProgramCounter(lineNumbers);
      pc.setNextLine('30');
      assert.equal(30, pc.getNextLineNumber());
      pc.update();
      assert.equal(30, pc.getCurrentLineNumber());
      assert.equal(40, pc.getNextLineNumber());
    });
  });

  describe('get line index', () => {
    it('gets the currently executing line index', () => {
      let lineNumbers = ['10', '20', '30', '40'];
      let pc = new ProgramCounter(lineNumbers);
      assert.equal(0, pc.getCurrentLineIndex());
      pc.update();
      assert.equal(1, pc.getCurrentLineIndex());
    });
  });
});
