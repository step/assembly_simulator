const Command = require('./command.js');

class PrnLiteral extends Command {
  constructor(literal) {
    super();
    this.literal = literal;
  }

  execute(currRegs, currFlags) {
    return { regs: currRegs, flags: currFlags, prn: this.literal };
  }
}

module.exports = PrnLiteral;
