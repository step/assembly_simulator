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

  getStepWiseExecutor(initState, cb) {
    let { regs, flags, stack } = initState;
    let state = { regs, flags, halt: false };
    let programCounter = 0;
    let executor = () => {
      if (this.shouldExecute(programCounter, state.halt)) {
        let line = this.lines[programCounter];
        state = line.execute(state.regs, state.flags, stack);
        programCounter++;
        if (state.nextLine) programCounter = this.lineNumbers[state.nextLine];
        else {
          let lineToExecute = this.lines[programCounter];
          state.nextLine = lineToExecute ? lineToExecute.getLineNumber() : ' ';
        }
        cb(state);
        return true;
      }
      return false;
    };
    return executor;
  }

  execute(initState, cb) {
    let executor = this.getStepWiseExecutor(initState, cb);
    while (executor()) {}
  }
}

module.exports = Lines;
