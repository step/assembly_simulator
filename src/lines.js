class Lines {
  constructor() {
    this.lines = [];
    this.lineNumbers = {};
  }

  add(line) {
    this.lines.push(line);
    let index = this.lines.length - 1;
    this.lineNumbers[line.getLineNumber()] = index;
  }

  shouldExecute(pc, halt) {
    return pc < this.lines.length && !halt;
  }

  execute(initState, cb) {
    let { regs, flags } = initState;
    let state = { regs, flags, halt: false };
    let programCounter = 0;
    while (this.shouldExecute(programCounter, state.halt)) {
      let line = this.lines[programCounter];
      state = line.execute(state.regs, state.flags);
      programCounter++;
      if (state.nextLine) programCounter = this.lineNumbers[state.nextLine];
      else {
        let lineToExecute = this.lines[programCounter];
        state.nextLine = lineToExecute ? lineToExecute.getLineNumber() : ' ';
      }
      cb(state);
    }
  }
}

module.exports = Lines;
