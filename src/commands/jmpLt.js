const Command = require('./command.js');

class JmpLt extends Command {
  constructor(lineNumber) {
    super();
    this.lineNumber = lineNumber;
  }

  execute(regs, flags, stack, programCounter) {
    let { LT } = flags;
    if (LT == 1) programCounter.setNextLine(this.lineNumber);
    return { regs, flags };
  }
}

module.exports = JmpLt;
