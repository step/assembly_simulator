class JmpLe {
  constructor(lineNumber) {
    this.lineNumber = lineNumber;
  }

  execute(regs, flags, stack, programCounter) {
    let { LT, EQ } = flags;
    if (LT == 1 || EQ == 1) {
      programCounter.setNextLine(this.lineNumber);
    }
    return { regs, flags };
  }
}

module.exports = JmpLe;
