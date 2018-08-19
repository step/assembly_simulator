const Line = require('../src/line.js');
const Stack = require('../src/stack.js');
const ProgramCounter = require('../src/programCounter.js');
const assert = require('assert');
const InvalidInstructionException = require('../src/commands/invalidInstructionException.js');

describe('Line execute', function() {
  describe('start', function() {
    it('should execute a start instruction', function() {
      let line = Line.create(10, 'START');
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let { currLine, regs, flags } = line.execute(currRegs, currFlags);
      assert.equal(10, currLine);
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });
  });

  describe('stop', function() {
    it('should execute a stop instruction', function() {
      let line = Line.create(10, 'STOP');
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let stack = new Stack();
      let pc = new ProgramCounter(['10', '20', '30']);
      let { regs, flags, currLine } = line.execute(
        currRegs,
        currFlags,
        stack,
        pc
      );
      assert.equal(true, pc.shouldHalt());
      assert.equal(10, currLine);
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });
  });

  describe('mov', function() {
    it('should execute a mov val to reg instruction', function() {
      let line = Line.create(10, 'MOV', ['A', '10']);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let { currLine, regs, flags } = line.execute(currRegs, currFlags);
      assert.equal(10, currLine);
      assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should execute a mov reg to reg instruction', function() {
      let line = Line.create(10, 'MOV', ['A', 'B']);
      let currRegs = { A: 0, B: 10, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let { currLine, regs, flags } = line.execute(currRegs, currFlags);
      assert.equal(10, currLine);
      assert.deepEqual({ A: 10, B: 10, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should throw an error when MOV has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'MOV', ['10', 'B']),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'MOV', ['F', 'B']),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'MOV', ['B', 'F']),
        InvalidInstructionException
      );
    });
  });

  describe('cmp', function() {
    it('should execute a cmp val to reg instruction', function() {
      let line = Line.create(10, 'CMP', ['A', '10']);
      let currRegs = { A: 10, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let { currLine, regs, flags } = line.execute(currRegs, currFlags);
      assert.equal(10, currLine);
      assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 1, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should execute a cmp reg to reg instruction', function() {
      let line = Line.create(10, 'CMP', ['A', 'B']);
      let currRegs = { A: 10, B: 10, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let { currLine, regs, flags } = line.execute(currRegs, currFlags);
      assert.equal(10, currLine);
      assert.deepEqual({ A: 10, B: 10, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 1, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should throw an error when CMP has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'CMP', ['10', 'B']),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'CMP', ['F', 'B']),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'CMP', ['B', 'F']),
        InvalidInstructionException
      );
    });
  });

  describe('add', function() {
    it('should execute a add val to reg instruction', function() {
      let line = Line.create(10, 'ADD', ['A', '10']);
      let currRegs = { A: 1, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let { currLine, regs, flags } = line.execute(currRegs, currFlags);
      assert.equal(10, currLine);
      assert.deepEqual({ A: 11, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should execute a add reg to reg instruction', function() {
      let line = Line.create(10, 'ADD', ['A', 'B']);
      let currRegs = { A: 1, B: 10, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let { currLine, regs, flags } = line.execute(currRegs, currFlags);
      assert.equal(10, currLine);
      assert.deepEqual({ A: 11, B: 10, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should throw an error when ADD has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'ADD', ['10', 'B']),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'ADD', ['F', 'B']),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'ADD', ['B', 'F']),
        InvalidInstructionException
      );
    });
  });

  describe('sub', function() {
    it('should execute a sub val from reg instruction', function() {
      let line = Line.create(10, 'SUB', ['A', '2']);
      let currRegs = { A: 5, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let { currLine, regs, flags } = line.execute(currRegs, currFlags);
      assert.equal(10, currLine);
      assert.deepEqual({ A: 3, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should execute a sub reg from reg instruction', function() {
      let line = Line.create(10, 'SUB', ['A', 'B']);
      let currRegs = { A: 10, B: 3, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let { currLine, regs, flags } = line.execute(currRegs, currFlags);
      assert.equal(10, currLine);
      assert.deepEqual({ A: 7, B: 3, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should throw an error when SUB has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'SUB', ['10', 'B']),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'SUB', ['F', 'B']),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'SUB', ['B', 'F']),
        InvalidInstructionException
      );
    });
  });

  describe('jmp', function() {
    it('should execute a jmp with valid numeric value', function() {
      let line = Line.create(10, 'JMP', ['20']);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let stack = new Stack();
      let pc = new ProgramCounter(['10', '20']);
      let { currLine, regs, flags, nextLine } = line.execute(
        currRegs,
        currFlags,
        stack,
        pc
      );
      assert.equal(10, currLine);
      assert.equal('20', pc.getNextLineNumber());
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should throw an error when JMP has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'JMP', []),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'JMP', ['B']),
        InvalidInstructionException
      );
    });
  });

  describe('je', function() {
    it('should execute a je with valid numeric value', function() {
      let line = Line.create(10, 'JE', ['30']);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 1, NE: 0, GT: 0, LT: 0 };
      let stack = new Stack();
      let pc = new ProgramCounter(['10', '20', '30']);
      let { currLine, regs, flags } = line.execute(
        currRegs,
        currFlags,
        stack,
        pc
      );
      assert.equal(10, currLine);
      assert.equal('30', pc.getNextLineNumber());
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 1, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should throw an error when JE has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'JE', []),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'JE', ['B']),
        InvalidInstructionException
      );
    });
  });

  describe('jne', function() {
    it('should execute a jne with valid numeric value', function() {
      let line = Line.create(10, 'JNE', ['30']);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 1, GT: 1, LT: 0 };
      let stack = new Stack();
      let pc = new ProgramCounter(['10', '20', '30']);
      let { currLine, regs, flags } = line.execute(
        currRegs,
        currFlags,
        stack,
        pc
      );
      assert.equal(10, currLine);
      assert.equal('30', pc.getNextLineNumber());
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 1, GT: 1, LT: 0 }, flags);
    });

    it('should throw an error when JNE has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'JNE', []),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'JNE', ['B']),
        InvalidInstructionException
      );
    });
  });

  describe('jlt', function() {
    it('should execute a jlt with valid numeric value', function() {
      let line = Line.create(10, 'JLT', ['30']);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 1, GT: 0, LT: 1 };
      let stack = new Stack();
      let pc = new ProgramCounter(['10', '20', '30']);
      let { currLine, regs, flags } = line.execute(
        currRegs,
        currFlags,
        stack,
        pc
      );
      assert.equal(10, currLine);
      assert.equal('30', pc.getNextLineNumber());
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 1, GT: 0, LT: 1 }, flags);
    });

    it('should throw an error when JLT has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'JLT', []),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'JLT', ['B']),
        InvalidInstructionException
      );
    });
  });

  describe('jle', function() {
    it('should execute a jle with valid numeric value', function() {
      let line = Line.create(10, 'JLE', ['70']);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 1, GT: 0, LT: 1 };
      let stack = new Stack();
      let pc = new ProgramCounter(['10', '70']);
      let { regs, flags } = line.execute(currRegs, currFlags, stack, pc);
      assert.equal(10, pc.getCurrentLineNumber());
      assert.equal('70', pc.getNextLineNumber());
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 1, GT: 0, LT: 1 }, flags);
    });

    it('should execute a jle with valid numeric value when EQ is set', function() {
      let line = Line.create(10, 'JLE', ['70']);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 1, NE: 0, GT: 0, LT: 0 };
      let stack = new Stack();
      let pc = new ProgramCounter(['10', '70']);
      let { regs, flags } = line.execute(currRegs, currFlags, stack, pc);
      assert.equal(10, pc.getCurrentLineNumber());
      assert.equal('70', pc.getNextLineNumber());
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 1, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should not execute a jle when neither EQ nor LE are set', function() {
      let line = Line.create(10, 'JLE', ['70']);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 1, GT: 1, LT: 0 };
      let { currLine, regs, flags, nextLine } = line.execute(
        currRegs,
        currFlags
      );
      assert.equal(10, currLine);
      assert.equal(undefined, nextLine);
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 1, GT: 1, LT: 0 }, flags);
    });

    it('should throw an error when JLE has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'JLE', []),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'JLE', ['B']),
        InvalidInstructionException
      );
    });
  });

  describe('jgt', function() {
    it('should execute a jgt with valid numeric value', function() {
      let line = Line.create(10, 'JGT', ['30']);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 1, GT: 1, LT: 0 };
      let stack = new Stack();
      let pc = new ProgramCounter(['10', '20', '30']);
      let { currLine, regs, flags } = line.execute(
        currRegs,
        currFlags,
        stack,
        pc
      );
      assert.equal(10, currLine);
      assert.equal('30', pc.getNextLineNumber());
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 1, GT: 1, LT: 0 }, flags);
    });

    it('should throw an error when JGT has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'JGT', []),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'JGT', ['B']),
        InvalidInstructionException
      );
    });
  });

  describe('jge', function() {
    it('should execute a jge with valid numeric value when GT is set', function() {
      let line = Line.create(10, 'JGE', ['70']);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 1, GT: 1, LT: 0 };
      let stack = new Stack();
      let pc = new ProgramCounter(['10', '70']);
      let { currLine, regs, flags } = line.execute(
        currRegs,
        currFlags,
        stack,
        pc
      );
      assert.equal(10, currLine);
      assert.equal('70', pc.getNextLineNumber());
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 1, GT: 1, LT: 0 }, flags);
    });

    it('should execute a jge with valid numeric value when EQ is set', function() {
      let line = Line.create(10, 'JGE', ['70']);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 1, NE: 0, GT: 0, LT: 0 };
      let stack = new Stack();
      let pc = new ProgramCounter(['10', '70']);
      let { currLine, regs, flags } = line.execute(
        currRegs,
        currFlags,
        stack,
        pc
      );
      assert.equal(10, currLine);
      assert.equal('70', pc.getNextLineNumber());
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 1, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should not execute a jge when neither EQ nor GT are set', function() {
      let line = Line.create(10, 'JGE', ['70']);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 1, GT: 0, LT: 1 };
      let { currLine, regs, flags, nextLine } = line.execute(
        currRegs,
        currFlags
      );
      assert.equal(10, currLine);
      assert.equal(undefined, nextLine);
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 1, GT: 0, LT: 1 }, flags);
    });

    it('should throw an error when JGE has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'JGE', []),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'JGE', ['B']),
        InvalidInstructionException
      );
    });
  });

  describe('prn', function() {
    it('should print literal strings', function() {
      let line = Line.create(10, 'PRN', [`"hello"`]);
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let { currLine, regs, flags, nextLine, prn } = line.execute(
        currRegs,
        currFlags
      );
      assert.equal('hello', prn);
      assert.equal(10, currLine);
      assert.equal(undefined, nextLine);
      assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should print register A', function() {
      let line = Line.create(10, 'PRN', ['A']);
      let currRegs = { A: 1, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let { currLine, regs, flags, nextLine, prn } = line.execute(
        currRegs,
        currFlags
      );
      assert.equal('1', prn);
      assert.equal(10, currLine);
      assert.equal(undefined, nextLine);
      assert.deepEqual({ A: 1, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should throw an error when prn has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'PRN', []),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'PRN', [`"hello`]),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'PRN', [`hello"`]),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'PRN', [`hello`]),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'PRN', ['E']),
        InvalidInstructionException
      );
    });
  });

  describe('push', () => {
    it('should push a single register on the stack', () => {
      let line = Line.create(10, 'PUSH', ['A'], 1, '10 PUSH A');
      let currRegs = { A: 10, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let stack = new Stack();
      let { currLine, regs, flags, srcLine, instruction } = line.execute(
        currRegs,
        currFlags,
        stack
      );
      assert.deepEqual([10], stack.asArray());
      assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should throw an error when push has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'PUSH', []),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'PUSH', ['A', 'B']),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'PUSH', ['E']),
        InvalidInstructionException
      );
    });
  });

  describe('pop', () => {
    it('should pop the stack into the specified register', () => {
      let line = Line.create(10, 'POP', ['A'], 1, '10 POP A');
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let stack = new Stack();
      stack.push(10);
      let { regs, flags } = line.execute(currRegs, currFlags, stack);
      assert.deepEqual([], stack.asArray());
      assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, regs);
      assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, flags);
    });

    it('should throw an error when pop has an invalid argument', function() {
      assert.throws(
        () => Line.create(10, 'POP', []),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'POP', ['A', 'B']),
        InvalidInstructionException
      );
      assert.throws(
        () => Line.create(10, 'POP', ['E']),
        InvalidInstructionException
      );
    });

    it('should throw an error when trying to pop an empty stack', () => {
      let line = Line.create(10, 'POP', ['A'], 1, '10 POP A');
      let currRegs = { A: 0, B: 0, C: 0, D: 0 };
      let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
      let stack = new Stack();
      assert.throws(() => line.execute(currRegs, currFlags, stack));
    });
  });
});

describe('Source mapping', function() {
  it('should report the line number and instruction in the source file', function() {
    let line = Line.create(10, 'START', [], 1, '10 START');
    let currRegs = { A: 0, B: 0, C: 0, D: 0 };
    let currFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
    let { currLine, regs, flags, srcLine, instruction } = line.execute(
      currRegs,
      currFlags
    );
    assert.equal(1, srcLine);
    assert.equal('10 START', instruction);
  });
});
