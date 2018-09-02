const ProgramCounter = require('./programCounter.js');
const MaximumInstructionsException = require('./maximumInstructionsException.js');

class Lines {
  constructor() {
    this.lines = [];
    this.fnTable = {};
  }

  add(line) {
    this.fnTable = line.populateFunctionTable(this.fnTable);
    this.lines.push(line);
  }

  getStepWiseExecutor(initState, cb, programCounterLimit) {
    let { regs, flags, stack } = initState;
    let state = { regs, flags, halt: false };
    let lineNumbers = this.lines.map(l => l.getLineNumber());
    let programCounter = new ProgramCounter(lineNumbers, this.fnTable, programCounterLimit);
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

  execute(initState, cb, programCounterLimit) {
    let executor = this.getStepWiseExecutor(initState, cb, programCounterLimit);
    while (executor()) {}
  }
}

module.exports = Lines;
