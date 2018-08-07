const parse = require('./parse.js');
const Line = require('./line.js');
const Lines = require('./lines.js');

class Machine {
  constructor() {
    this._reset();
    this.lines = new Lines();
  }

  _reset() {
    this._resetRegisters();
    this._resetFlags();
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
    this.lines = new Lines();
    let instructions = program.trim().split(/\n/);
    instructions.forEach(instruction => {
      let { lineNumber, command, args, nonExecutableLine } = parse(instruction);
      if(!nonExecutableLine) {        
        let line = Line.create(lineNumber, command, args);
        this.lines.add(line);
      }
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

  _addToTable({ regs, flags, nextLine, currLine, prn }) {
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
      PRN: prn
    };
    this.table.push(row);
  }

  getTable() {
    return this.table;
  }

  execute() {
    this._reset();
    let regs = this.getRegs();
    let flags = this.getFlags();
    this.lines.execute(
      { regs, flags },
      ({ regs, flags, nextLine, currLine, prn }) => {
        this._setRegs(regs);
        this._setFlags(flags);
        if (prn) this.prn.push(prn);
        this._addToTable({ regs, flags, nextLine, currLine, prn });
      }
    );
  }
}

module.exports = Machine;
