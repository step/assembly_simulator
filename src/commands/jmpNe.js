class JmpNe {
  constructor(lineNumber) {
    this.lineNumber = lineNumber;
  }

  execute(regs, flags) {
    let { NE } = flags;
    let nextLine = undefined;
    if (NE == 1) {
      nextLine = this.lineNumber;
    }
    return { regs, flags, nextLine };
  }
}

module.exports = JmpNe;
