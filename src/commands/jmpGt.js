const Command = require('./command.js');

class JmpGt extends Command {
  constructor(lineNumber) {
    super();
    this.lineNumber = lineNumber;
  }

  execute(regs, flags, stack, programCounter) {
    let { GT } = flags;
    if (GT == 1) programCounter.setNextLine(this.lineNumber);
    return { regs, flags };
  }
}

module.exports = JmpGt;
