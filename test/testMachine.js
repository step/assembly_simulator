const assert = require('assert');
const Machine = require('../src/machine.js');
const InvalidInstructionException = require('../src/commands/invalidInstructionException.js');
const StackUnderFlowException = require('../src/stackUnderflowException.js');
const StackOverflowException = require('../src/stackOverflowException.js');

const stitch = lines => lines.join('\n');

describe('Machine loading', function() {
  it('should load a basic program without throwing an exception', function() {
    const machine = new Machine();
    const program = ['10 START', '20 STOP'];
    assert.doesNotThrow(() => machine.load(stitch(program)));
  });

  it('should throw an exception when there is an error in a line', function() {
    const machine = new Machine();
    const program = ['10 STAR'];
    assert.throws(() => machine.load(stitch(program)));
  });

  it('should throw an exception when there is a parse error in the arguments',() => {
    const machine = new Machine();
    const missingArgumentProg = ['10 MOV A,'];
    const missingQuoteProg = ['10 PRN "HELLO'];
    assert.throws(() => machine.load(stitch(missingArgumentProg)), InvalidInstructionException);
    assert.throws(() => machine.load(stitch(missingQuoteProg)), InvalidInstructionException);
  });

  it('should ignore empty lines', function() {
    const machine = new Machine();
    const program = ['', ' ', '\t'];
    assert.doesNotThrow(() => machine.load(stitch(program)));
  });
});

describe('Machine execution', function() {
  it('should execute a basic program', function() {
    const machine = new Machine();
    const program = ['10 START', '20 MOV A,10', '30 STOP'];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, machine.getRegs());
    assert.deepEqual({ NE: 0, EQ: 0, LT: 0, GT: 0 }, machine.getFlags());
  });

  it('should execute a program with empty lines', function() {
    const machine = new Machine();
    const program = ['10 START', ' ', '20 MOV A,10', '30 STOP'];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, machine.getRegs());
    assert.deepEqual({ NE: 0, EQ: 0, LT: 0, GT: 0 }, machine.getFlags());
  });

  it('should execute a program with comments', function() {
    const machine = new Machine();
    const program = [
      '; this is a comment',
      '10 START',
      ' ',
      '20 MOV A,10',
      '30 STOP'
    ];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, machine.getRegs());
    assert.deepEqual({ NE: 0, EQ: 0, LT: 0, GT: 0 }, machine.getFlags());
  });

  it('should execute a program with jmp instructions', function() {
    const machine = new Machine();
    const program = ['10 START', '20 JMP 40', '30 MOV A,10', '40 STOP'];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, machine.getRegs());
    assert.deepEqual({ NE: 0, EQ: 0, LT: 0, GT: 0 }, machine.getFlags());
  });
  it('should execute a program with prn instructions', function() {
    const machine = new Machine();
    const program = [
      '10 START',
      '20 PRN "HELLO"',
      '30 MOV A,10',
      '40 PRN A',
      '50 STOP'
    ];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual(['HELLO', '10'], machine.getPrn());
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, machine.getRegs());
    assert.deepEqual({ NE: 0, EQ: 0, LT: 0, GT: 0 }, machine.getFlags());
  });
});

describe('Machine with stack', () => {
  it('should execute a program that pushes a register onto the stack', () => {
    const machine = new Machine();
    const program = ['10 START', '20 MOV A,10', '30 PUSH A', '40 STOP'];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, machine.getRegs());
    assert.deepEqual({ NE: 0, EQ: 0, LT: 0, GT: 0 }, machine.getFlags());
    assert.deepEqual([10], machine.getStack());
  });

  it('should execute a program that pops the stack into a register', () => {
    const machine = new Machine();
    const program = [
      '10 START',
      '20 MOV A,10',
      '30 PUSH A',
      '40 POP B',
      '50 STOP'
    ];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual({ A: 10, B: 10, C: 0, D: 0 }, machine.getRegs());
    assert.deepEqual({ NE: 0, EQ: 0, LT: 0, GT: 0 }, machine.getFlags());
    assert.deepEqual([], machine.getStack());
  });

  it('should throw an exception when it tries to pop an empty stack', () => {
    const machine = new Machine();
    const program = ['10 START', '30 POP B', '50 STOP'];
    machine.load(stitch(program));
    assert.throws(() => machine.execute());
  });

  it('should throw an exception when it tries to push when stack is full', () => {
    const machine = new Machine(0);
    const program = ['10 START', '30 PUSH B', '50 STOP'];
    machine.load(stitch(program));
    assert.throws(() => machine.execute(),
      function (err) {
        if (err instanceof StackOverflowException) {
          return true;
        }
      });
  });

  it('should clear the stack between multiple executions', () => {
    const machine = new Machine();
    const program = ['10 START', '20 MOV A, 5', '30 PUSH A', '40 STOP'];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual([5], machine.getStack());
    machine.execute();
    assert.deepEqual([5], machine.getStack());
  });
});

describe('Machine step wise execution', () => {
  it('should execute a simple program step wise', () => {
    const machine = new Machine();
    const program = ['10 START', '30 MOV A,10', '40 STOP'];
    let actualRegs = {};
    const cb = ({ A, B, C, D }) => {
      actualRegs = { A, B, C, D };
    };
    machine.load(stitch(program));
    machine.executeStepWise(cb);
    machine.nextStep();
    assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, actualRegs);
    machine.nextStep();
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, actualRegs);
    machine.nextStep();
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, actualRegs);
  });

  it('should execute a program with jumps step wise', () => {
    const machine = new Machine();
    const program = ['10 START', '30 JMP 50', '40 MOV A,10', '50 STOP'];
    let actualCurrLine, actualNextLine, actualRegs;
    const cb = ({ NL, CL, A, B, C, D }) => {
      actualRegs = { A, B, C, D };
      actualCurrLine = CL;
      actualNextLine = NL;
    };
    machine.load(stitch(program));
    machine.executeStepWise(cb);
    machine.nextStep();
    assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, actualRegs);
    assert.equal('10', actualCurrLine);
    assert.equal('30', actualNextLine);
    machine.nextStep();
    assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, actualRegs);
    assert.equal('30', actualCurrLine);
    assert.equal('50', actualNextLine);
    machine.nextStep();
    assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, actualRegs);
    assert.equal('50', actualCurrLine);
    assert.equal(' ', actualNextLine);
  });

  it('should provide the stack as a part of the callback', () => {
    const machine = new Machine();
    const program = ['10 START', '20 MOV A,10', '40 PUSH A', '50 STOP'];
    let stack = [];
    const cb = ({ STK }) => {
      stack = STK;
    };
    machine.load(stitch(program));
    machine.executeStepWise(cb);
    machine.nextStep();
    assert.deepEqual([], stack);
    machine.nextStep();
    assert.deepEqual([], stack);
    machine.nextStep();
    assert.deepEqual([10], stack);
  });

  it('should execute a program with compare statements step wise', () => {
    const machine = new Machine();
    const program = [
      '10 START',
      '20 MOV A,10',
      '30 CMP A,10',
      '40 JE 60',
      '50 PRN A',
      '60 STOP'
    ];
    let actualFlags;
    let cb = ({ EQ, NE, GT, LT }) => (actualFlags = { EQ, NE, GT, LT });
    machine.load(stitch(program));
    machine.executeStepWise(cb);
    machine.nextStep();
    assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, actualFlags);
    machine.nextStep();
    assert.deepEqual({ EQ: 0, NE: 0, GT: 0, LT: 0 }, actualFlags);
    machine.nextStep();
    assert.deepEqual({ EQ: 1, NE: 0, GT: 0, LT: 0 }, actualFlags);
  });

  it('should not execute the next step if stepwise execution has not begun', () => {
    const machine = new Machine();
    const program = '10 MOV A, 10';
    machine.load(program);
    machine.nextStep();
    assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, machine.getRegs());
  });

  it('should not execute the next step if stepwise execution is over', () => {
    const machine = new Machine();
    const program = ['10 START', '20 MOV A,10', '30 STOP'];
    machine.load(stitch(program));
    let lineHasExecuted = false;
    machine.executeStepWise(() => (lineHasExecuted = true));
    machine.nextStep();
    assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, machine.getRegs());
    assert.equal(true, lineHasExecuted);
    lineHasExecuted = false;
    machine.nextStep();
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, machine.getRegs());
    assert.equal(true, lineHasExecuted);
    lineHasExecuted = false;
    machine.nextStep();
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, machine.getRegs());
    assert.equal(true, lineHasExecuted);
    lineHasExecuted = false;
    machine.nextStep();
    assert.equal(false, lineHasExecuted);
  });
});

describe('Machine state table', function() {
  it('should generate a state table for a basic program', function() {
    const machine = new Machine();
    const program = ['10 START', '20 MOV A,10', '30 STOP'];
    let expectedTable = [
      {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        CL: 10,
        NL: 20,
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 1,
        INST: '10 START',
        STK: []
      },
      {
        A: 10,
        B: 0,
        C: 0,
        D: 0,
        CL: 20,
        NL: 30,
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 2,
        INST: '20 MOV A,10',
        STK: []
      },
      {
        A: 10,
        B: 0,
        C: 0,
        D: 0,
        CL: 30,
        NL: ' ',
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 3,
        INST: '30 STOP',
        STK: []
      }
    ];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual(expectedTable, machine.getTable());
  });

  it('should generate a state table for a program with jmps', function() {
    const machine = new Machine();
    const program = ['10 START', '20 JMP 40', '30 MOV B,15', '40 STOP'];
    let expectedTable = [
      {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        CL: 10,
        NL: 20,
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 1,
        INST: '10 START',
        STK: []
      },
      {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        CL: 20,
        NL: 40,
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 2,
        INST: '20 JMP 40',
        STK: []
      },
      {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        CL: 40,
        NL: ' ',
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 4,
        INST: '40 STOP',
        STK: []
      }
    ];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual(expectedTable, machine.getTable());
  });

  it('should generate a state table for a program with cmp', function() {
    const machine = new Machine();
    const program = [
      '10 START',
      '20 CMP A,10',
      '30 JLE 50',
      '40 MOV A,10',
      '50 MOV A,20',
      '60 STOP'
    ];
    let expectedTable = [
      {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        CL: 10,
        NL: 20,
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 1,
        INST: '10 START',
        STK: []
      },
      {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        CL: 20,
        NL: 30,
        EQ: 0,
        NE: 1,
        GT: 0,
        LT: 1,
        PRN: undefined,
        SL: 2,
        INST: '20 CMP A,10',
        STK: []
      },
      {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        CL: 30,
        NL: 50,
        EQ: 0,
        NE: 1,
        GT: 0,
        LT: 1,
        PRN: undefined,
        SL: 3,
        INST: '30 JLE 50',
        STK: []
      },
      {
        A: 20,
        B: 0,
        C: 0,
        D: 0,
        CL: 50,
        NL: 60,
        EQ: 0,
        NE: 1,
        GT: 0,
        LT: 1,
        PRN: undefined,
        SL: 5,
        INST: '50 MOV A,20',
        STK: []
      },
      {
        A: 20,
        B: 0,
        C: 0,
        D: 0,
        CL: 60,
        NL: ' ',
        EQ: 0,
        NE: 1,
        GT: 0,
        LT: 1,
        PRN: undefined,
        SL: 6,
        INST: '60 STOP',
        STK: []
      }
    ];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual(expectedTable, machine.getTable());
  });

  it('should reflect the state of the stack for each executed line', () => {
    const machine = new Machine();
    const program = [
      '10 START',
      '20 MOV A,10',
      '30 PUSH A',
      '40 MOV B,20',
      '50 PUSH B',
      '60 POP A',
      '70 POP B',
      '80 STOP'
    ];
    let expectedTable = [
      {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        CL: 10,
        NL: 20,
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 1,
        INST: '10 START',
        STK: []
      },
      {
        A: 10,
        B: 0,
        C: 0,
        D: 0,
        CL: 20,
        NL: 30,
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 2,
        INST: '20 MOV A,10',
        STK: []
      },
      {
        A: 10,
        B: 0,
        C: 0,
        D: 0,
        CL: 30,
        NL: 40,
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 3,
        INST: '30 PUSH A',
        STK: [10]
      },
      {
        A: 10,
        B: 20,
        C: 0,
        D: 0,
        CL: 40,
        NL: 50,
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 4,
        INST: '40 MOV B,20',
        STK: [10]
      },
      {
        A: 10,
        B: 20,
        C: 0,
        D: 0,
        CL: 50,
        NL: 60,
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 5,
        INST: '50 PUSH B',
        STK: [10, 20]
      },
      {
        A: 20,
        B: 20,
        C: 0,
        D: 0,
        CL: 60,
        NL: 70,
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 6,
        INST: '60 POP A',
        STK: [10]
      },
      {
        A: 20,
        B: 10,
        C: 0,
        D: 0,
        CL: 70,
        NL: 80,
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 7,
        INST: '70 POP B',
        STK: []
      },
      {
        A: 20,
        B: 10,
        C: 0,
        D: 0,
        CL: 80,
        NL: ' ',
        EQ: 0,
        NE: 0,
        GT: 0,
        LT: 0,
        PRN: undefined,
        SL: 8,
        INST: '80 STOP',
        STK: []
      }
    ];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual(expectedTable, machine.getTable());
  });
});

describe('Error reporting while loading', function() {
  it('should report the line number at which the error occurred', function() {
    const machine = new Machine();
    const program = ['10 STAR'];

    try {
      machine.load(stitch(program));
    } catch (e) {
      assert.equal('InvalidInstructionException', e.name);
      assert.equal(1, e.lineNumber);
      assert.equal('10 STAR', e.instruction);
    }
  });

  it('should report the line number when the error is on the last line', function() {
    const machine = new Machine();
    const program = ['10 START', '20 STO'];

    try {
      machine.load(stitch(program));
    } catch (e) {
      assert.equal('InvalidInstructionException', e.name);
      assert.equal(2, e.lineNumber);
      assert.equal('20 STO', e.instruction);
    }
  });

  it('should report the line number when the error is on a middle line', function() {
    const machine = new Machine();
    const program = ['10 START', '20 MO A,B', '30 STOP'];

    try {
      machine.load(stitch(program));
    } catch (e) {
      assert.equal('InvalidInstructionException', e.name);
      assert.equal(2, e.lineNumber);
      assert.equal('20 MO A,B', e.instruction);
    }
  });
});

describe('Source mapping at the machine level', function() {
  it('should provide the source of the line that was executed in the table', function() {
    const machine = new Machine();
    const program = ['10 START', '20 MOV A,10', '30 STOP'];
    machine.load(stitch(program));
    machine.execute();
    let table = machine.getTable();
    let srcMap = table.map(({ INST, SL }) => {
      return { INST, SL };
    });
    assert.deepEqual(
      [
        { INST: '10 START', SL: 1 },
        { INST: '20 MOV A,10', SL: 2 },
        { INST: '30 STOP', SL: 3 }
      ],
      srcMap
    );
  });
});

describe('Machine with functions', () => {
  it('should execute a basic function', () => {
    const machine = new Machine();
    const program = [
      '10 START',
      '20 JMP 60',
      '30 FUNC A10',
      '40 MOV A,10',
      '41 ADD A,20',
      '50 RET',
      '60 CALL A10',
      '70 STOP'
    ];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual({ A: 30, B: 0, C: 0, D: 0 }, machine.getRegs());
  });
});
