class JmpGe {
  constructor(lineNumber) {
    this.lineNumber = lineNumber;
  }

  execute(regs, flags) {
    let { GT, EQ } = flags;
    let nextLine = undefined;
    if (GT == 1 || EQ == 1) {
      nextLine = this.lineNumber;
    }
    return { regs, flags, nextLine };
  }
}

module.exports = JmpGe;
