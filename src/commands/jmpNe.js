class JmpNe {
  constructor(lineNumber) {
    this.lineNumber = lineNumber;
  }

  execute(regs, flags, stack, programCounter) {
    let { NE } = flags;
    if (NE == 1) programCounter.setNextLine(this.lineNumber);
    return { regs, flags };
  }
}

module.exports = JmpNe;
