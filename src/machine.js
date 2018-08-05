const parse = require('./parse.js');
const Line = require('./line.js');
const Lines = require('./lines.js');

class Machine {
  constructor() {
    this.lines = new Lines();
    this._resetRegisters();
    this._resetFlags();
    this.prn = [];
  }

  _resetRegisters() {
    this.regs = { A: 0, B: 0, C: 0, D: 0 };
  }

  _resetFlags() {
    this.flags = { NE: 0, EQ: 0, LT: 0, GT: 0 };
  }

  load(program) {
    this.lines = new Lines();
    let instructions = program.trim().split(/\n/);
    instructions.forEach(instruction => {
      let { lineNumber, command, args } = parse(instruction);
      let line = Line.create(lineNumber, command, args);
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

  execute() {
    let regs = this.getRegs();
    let flags = this.getFlags();
    this.lines.execute(
      { regs, flags },
      ({ regs, flags, nextLine, currLine, prn }) => {
        this._setRegs(regs);
        this._setFlags(flags);
        if (prn) this.prn.push(prn);
      }
    );
  }
}

module.exports = Machine;
