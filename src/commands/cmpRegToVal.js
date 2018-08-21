const Command = require('./command.js');

class CmpRegToVal extends Command {
  constructor(lhs, rhs) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  execute(currRegs, currFlags) {
    let newFlags = { EQ: 0, NE: 0, GT: 0, LT: 0 };
    let val = currRegs[this.lhs];
    if (val == this.rhs) {
      newFlags['EQ'] = 1;
    } else {
      newFlags['NE'] = 1;
      if (val > this.rhs) {
        newFlags['GT'] = 1;
      } else {
        newFlags['LT'] = 1;
      }
    }
    return { regs: currRegs, flags: newFlags };
  }
}

module.exports = CmpRegToVal;
