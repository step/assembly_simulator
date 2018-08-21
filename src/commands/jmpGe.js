const Command = require('./command.js');

class JmpGe extends Command {
  constructor(lineNumber) {
    super();
    this.lineNumber = lineNumber;
  }

  execute(regs, flags, stack, programCounter) {
    let { GT, EQ } = flags;
    if (GT == 1 || EQ == 1) {
      programCounter.setNextLine(this.lineNumber);
    }
    return { regs, flags };
  }
}

module.exports = JmpGe;
