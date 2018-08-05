class JmpEq {
  constructor(lineNumber) {
    this.lineNumber=lineNumber;
  }

  execute(regs,flags) {
    let {EQ} = flags;
    let nextLine=undefined;
    if(EQ == 1) {
      nextLine = this.lineNumber;
    }
    return {regs,flags,nextLine};
  }
}

module.exports = JmpEq;
