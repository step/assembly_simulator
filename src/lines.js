const ProgramCounter = require('./programCounter.js');

class Lines {
  constructor() {
    this.lines = [];
    this.fnTable = {};
  }

  add(line) {
    this.fnTable = line.populateFunctionTable(this.fnTable);
    this.lines.push(line);
  }

  getStepWiseExecutor(initState, cb) {
    let { regs, flags, stack } = initState;
    let state = { regs, flags, halt: false };
    let lineNumbers = this.lines.map(l => l.getLineNumber());
    console.log(this.fnTable);
    let programCounter = new ProgramCounter(lineNumbers, this.fnTable);
    let executor = () => {
      let line = this.lines[programCounter.getCurrentLineIndex()];
      state = line.execute(state.regs, state.flags, stack, programCounter);
      state.nextLine = programCounter.getNextLineNumber();
      programCounter.update();
      cb(state);
      return !programCounter.shouldHalt();
    };
    return executor;
  }

  execute(initState, cb) {
    let executor = this.getStepWiseExecutor(initState, cb);
    while (executor()) {}
  }
}

module.exports = Lines;
