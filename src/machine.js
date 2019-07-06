const parse = require('./parse.js');
const Line = require('./line.js');
const Stack = require('./stack.js');
const Lines = require('./lines.js');

class Machine {
  constructor(maxLinesToExecute = 100) {
    this.lines = new Lines(maxLinesToExecute);
    this.stack = new Stack();
    this.maxLinesToExecute = maxLinesToExecute;
    this._reset();
  }

  _reset() {
    this._resetRegisters();
    this._resetFlags();
    this.stack.clear();
    this.prn = [];
    this.table = [];
  }

  _resetRegisters() {
    this.regs = { A: 0, B: 0, C: 0, D: 0 };
  }

  _resetFlags() {
    this.flags = { NE: 0, EQ: 0, LT: 0, GT: 0 };
  }

  load(program) {
    this.lines = new Lines(this.maxLinesToExecute);
    let instructions = program.split(/\n/);
    instructions.forEach((instruction, index) => {
      let line;
      try {
        let { lineNumber, command, args, nonExecutableLine } = parse(
          instruction
        );
        if (nonExecutableLine) return;
        line = Line.create(lineNumber, command, args, index + 1, instruction);
      } catch (e) {
        e.setLineNumber(index + 1);
        e.setInstruction(instruction);
        throw e;
      }
      this.lines.add(line);
    });
  }

  getRegs() {
    let { A, B, C, D } = this.regs;
    return { A, B, C, D };
  }

  getFlags() {
    let { EQ, NE, GT, LT } = this.flags;
    return { EQ, NE, GT, LT };
  }

  _setRegs({ A, B, C, D }) {
    this.regs = { A, B, C, D };
  }

  _setFlags({ EQ, NE, LT, GT }) {
    this.flags = { EQ, NE, LT, GT };
  }

  getPrn() {
    return this.prn;
  }

  getStack() {
    return this.stack.asArray();
  }

  _toRow({ regs, flags, nextLine, currLine, prn, srcLine, instruction }) {
    let { A, B, C, D } = regs;
    let { EQ, NE, GT, LT } = flags;
    let row = {
      A,
      B,
      C,
      D,
      EQ,
      NE,
      GT,
      LT,
      CL: currLine,
      NL: nextLine,
      PRN: prn,
      SL: srcLine,
      INST: instruction,
      STK: this.getStack()
    };
    return row;
  }

  _addToTable(state) {
    this.table.push(this._toRow(state));
  }

  getTable() {
    return this.table;
  }

  _updateCurrentExecState({
    regs,
    flags,
    nextLine,
    currLine,
    prn,
    srcLine,
    instruction
  }) {
    this._setRegs(regs);
    this._setFlags(flags);
    if (prn) this.prn.push(prn);
    this._addToTable({
      regs,
      flags,
      nextLine,
      currLine,
      prn,
      srcLine,
      instruction
    });
  }

  execute() {
    this._reset();
    let regs = this.getRegs();
    let flags = this.getFlags();
    let stack = this.stack;
    this.lines.execute(
      { regs, flags, stack },
      this._updateCurrentExecState.bind(this)
    );
  }

  nextStep() {
    if (this._stepWiseExecutor) {
      let shouldExecute = this._stepWiseExecutor();
      if (!shouldExecute) this._stepWiseExecutor = undefined;
    }
  }

  executeStepWise(cb) {
    this._reset();
    let wrappedCb = state => {
      this._updateCurrentExecState(state);
      cb(this._toRow(state));
    };
    let regs = this.getRegs();
    let flags = this.getFlags();
    let stack = this.stack;
    this._stepWiseExecutor = this.lines.getStepWiseExecutor(
      { regs, flags, stack },
      wrappedCb
    );
  }
}

module.exports = Machine;
