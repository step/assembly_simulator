const Command = require('./command.js');

class PrnReg extends Command {
  constructor(reg) {
    super();
    this.reg = reg;
  }

  execute(currRegs, currFlags) {
    let prn = currRegs[this.reg].toString();
    return { regs: currRegs, flags: currFlags, prn };
  }
}

module.exports = PrnReg;
