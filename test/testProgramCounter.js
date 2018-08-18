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

  describe('halt', () => {
    it('should halt the updation of program counter', () => {
      let lineNumbers = ['10', '20', '30', '40'];
      let pc = new ProgramCounter(lineNumbers);
      assert.equal(10, pc.getCurrentLineNumber());
      pc.update();
      assert.equal(20, pc.getCurrentLineNumber());
      assert.equal(30, pc.getNextLineNumber());
      pc.halt();
      pc.update();
      assert.equal(20, pc.getCurrentLineNumber());
      assert.equal(' ', pc.getNextLineNumber());
    });

    it('should prevent setNextLine from having an effect', () => {
      let lineNumbers = ['10', '20', '30', '40'];
      let pc = new ProgramCounter(lineNumbers);
      assert.equal(10, pc.getCurrentLineNumber());
      pc.update();
      assert.equal(20, pc.getCurrentLineNumber());
      assert.equal(30, pc.getNextLineNumber());
      pc.halt();
      pc.setNextLine(30);
      assert.equal(20, pc.getCurrentLineNumber());
      assert.equal(' ', pc.getNextLineNumber());
    });
  });
});

describe('should halt', () => {
  it('should decide to halt when the current line is illegal', () => {
    let lineNumbers = ['10', '20', '30', '40'];
    let pc = new ProgramCounter(lineNumbers);
    pc.setNextLine(800);
    pc.update();
    assert.equal(true, pc.shouldHalt());
  });

  it('should decide to halt when the line index exceeds the length of the program', () => {
    let lineNumbers = ['10', '20', '30'];
    let pc = new ProgramCounter(lineNumbers);
    pc.update();
    pc.update();
    pc.update();
    pc.update();
    assert.equal(true, pc.shouldHalt());
  });

  it('should halt when explicitly asked to halt', () => {
    let lineNumbers = ['10', '20', '30'];
    let pc = new ProgramCounter(lineNumbers);
    pc.halt();
    assert.equal(true, pc.shouldHalt());
  });
});
