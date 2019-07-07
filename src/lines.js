const MaxInstructionsExceededException = require('./maxInstructionsExceededException.js');
const ProgramCounter = require('./programCounter.js');

class Lines {
  constructor(maxLinesToExecute) {
    this.maxLinesToExecute = maxLinesToExecute;
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
    let programCounter = new ProgramCounter(lineNumbers, this.fnTable);
    let numberOfLinesExecuted = 0;
    let executor = () => {
      if(this.hasNoLines()) return false;
      let line = this.lines[programCounter.getCurrentLineIndex()];
      state = line.execute(state.regs, state.flags, stack, programCounter);
      numberOfLinesExecuted++;
      if (numberOfLinesExecuted > this.maxLinesToExecute) {
        throw new MaxInstructionsExceededException(this.maxLinesToExecute);
      }
      state.nextLine = programCounter.getNextLineNumber();
      programCounter.update();
      cb(state);
      return !programCounter.shouldHalt();
    };
    return executor;
  }

  hasNoLines(){
    return this.lines.length == 0;
  }

  execute(initState, cb) {
    let executor = this.getStepWiseExecutor(initState, cb);
    while (executor()) {}
  }
}

module.exports = Lines;
