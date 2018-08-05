class JmpGt {
  constructor(lineNumber) {
    this.lineNumber = lineNumber;
  }

  execute(regs, flags) {
    let { GT } = flags;
    let nextLine = undefined;
    if (GT == 1) {
      nextLine = this.lineNumber;
    }
    return { regs, flags, nextLine };
  }
}

module.exports = JmpGt;
