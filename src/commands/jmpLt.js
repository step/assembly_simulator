class JmpLt {
  constructor(lineNumber) {
    this.lineNumber=lineNumber;
  }

  execute(regs,flags) {
    let {LT} = flags;
    let nextLine=undefined;
    if(LT == 1) {
      nextLine = this.lineNumber;
    }
    return {regs,flags,nextLine};
  }
}

module.exports = JmpLt;
