class JmpLe {
  constructor(lineNumber) {
    this.lineNumber=lineNumber;
  }

  execute(regs,flags) {
    let {LT,EQ} = flags;
    let nextLine=undefined;
    if(LT == 1 || EQ == 1) {
      nextLine = this.lineNumber;
    }
    return {regs,flags,nextLine};
  }
}

module.exports = JmpLe;
