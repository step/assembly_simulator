class Jmp {
  constructor(lineNumber) {
    this.lineNumber = lineNumber;
  }

  execute(currRegs, currFlags, stack, programCounter) {
    programCounter.setNextLine(this.lineNumber);
    return { regs: currRegs, flags: currFlags };
  }
}

module.exports = Jmp;
