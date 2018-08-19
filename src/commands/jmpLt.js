class JmpLt {
  constructor(lineNumber) {
    this.lineNumber = lineNumber;
  }

  execute(regs, flags, stack, programCounter) {
    let { LT } = flags;
    if (LT == 1) programCounter.setNextLine(this.lineNumber);
    return { regs, flags };
  }
}

module.exports = JmpLt;
