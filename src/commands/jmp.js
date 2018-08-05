class Jmp {
  constructor(lineNumber) {
    this.lineNumber = lineNumber;
  }

  execute(currRegs, currFlags) {
    return { regs: currRegs, flags: currFlags, nextLine: this.lineNumber };
  }
}

module.exports = Jmp;
