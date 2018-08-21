const Command = require('./command.js');

class Jmp extends Command {
  constructor(lineNumber) {
    super();
    this.lineNumber = lineNumber;
  }

  execute(currRegs, currFlags, stack, programCounter) {
    programCounter.setNextLine(this.lineNumber);
    return { regs: currRegs, flags: currFlags };
  }
}

module.exports = Jmp;
