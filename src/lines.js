class Lines {
  constructor() {
    this.lines = [];
    this.lineNumbers={};
  }

  add(line) {
    this.lines.push(line);
    let index = this.lines.length - 1;
    this.lineNumbers[line.getLineNumber()] = index;
  }

  execute(initState,cb) {
    let currRegs = initState.regs;
    let currFlags = initState.flags;
    let currentIndex=0;
    let shouldHalt=false;
    while(currentIndex<this.lines.length && !shouldHalt) {
      let line = this.lines[currentIndex];
      let {regs,flags,nextLine,currLine,halt,prn} = line.execute(currRegs,currFlags);
      currRegs=regs;
      currFlags=flags;
      currentIndex++;
      shouldHalt=halt;
      if(nextLine)
        currentIndex = this.lineNumbers[nextLine];
      else {
        let lineToExecute = this.lines[currentIndex];
        nextLine = lineToExecute?lineToExecute.getLineNumber():"STOP";
      }
      cb({regs,flags,nextLine,currLine,prn});
    }
  }
}

module.exports = Lines;
