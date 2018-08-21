const Command = require('./command.js');

class MovRegToReg extends Command {
  constructor(lhs, rhs) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  execute(currRegs, currFlags) {
    let { A, B, C, D } = currRegs;
    let newRegs = { A, B, C, D };
    newRegs[this.lhs] = currRegs[this.rhs];
    return { regs: newRegs, flags: currFlags };
  }
}

module.exports = MovRegToReg;
