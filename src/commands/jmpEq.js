class JmpEq {
  constructor(lineNumber) {
    this.lineNumber = lineNumber;
  }

  execute(regs, flags, stack, programCounter) {
    let { EQ } = flags;
    if (EQ == 1) programCounter.setNextLine(this.lineNumber);
    return { regs, flags };
  }
}

module.exports = JmpEq;
