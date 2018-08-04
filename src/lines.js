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
    while(currentIndex<this.lines.length) {
      let line = this.lines[currentIndex];
      let {regs,flags,nextLine,currLine} = line.execute(currRegs,currFlags);
      currRegs=regs;
      currFlags=flags;
      currentIndex++;
      if(nextLine)
        currentIndex = this.lineNumbers[nextLine];
      else {
        let lineToExecute = this.lines[currentIndex];
        nextLine = lineToExecute?lineToExecute.getLineNumber():"STOP";
      }
      cb({regs,flags,nextLine,currLine});
    }
  }
}

module.exports = Lines;
