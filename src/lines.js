const ProgramCounter = require('./programCounter.js');

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
    let lineNumbers = this.lines.map((l)=>l.getLineNumber());
    let programCounter = new ProgramCounter(lineNumbers);
    let executor = () => {
      if(programCounter.shouldHalt()) return false;
      let line = this.lines[programCounter.getCurrentLineIndex()];
      state = line.execute(state.regs, state.flags, stack, programCounter);
      state.nextLine = programCounter.getNextLineNumber();
      programCounter.update();
      cb(state);
      return true;
    };
    return executor;
  }

  execute(initState, cb) {
    let executor = this.getStepWiseExecutor(initState, cb);
    while (executor()) {}
  }
}

module.exports = Lines;
