const Command = require('./command.js');

class JmpNe extends Command {
  constructor(lineNumber) {
    super();
    this.lineNumber = lineNumber;
  }

  execute(regs, flags, stack, programCounter) {
    let { NE } = flags;
    if (NE == 1) programCounter.setNextLine(this.lineNumber);
    return { regs, flags };
  }
}

module.exports = JmpNe;
