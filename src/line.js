const factories = require('./commands/commandFactories.js');
const InvalidInstructionException = require('./commands/invalidInstructionException.js');

const lib = {};

class Line {
  constructor(lineNumber, command, srcLine, instruction) {
    this.lineNumber = lineNumber;
    this.command = command;
    this.srcLine = srcLine;
    this.instruction = instruction;
  }

  getLineNumber() {
    return this.lineNumber;
  }

  populateFunctionTable(fnTable) {
    return this.command.populateFunctionTable(fnTable, this.lineNumber);
  }

  execute(currRegs, currFlags, stack, programCounter) {
    let result;
    try {
      result = this.command.execute(currRegs, currFlags, stack, programCounter);
    } catch (error) {
      error.setLineNumber(this.lineNumber);
      error.setInstruction(this.instruction);
      throw error;
    }
    result.currLine = this.lineNumber;
    result.srcLine = this.srcLine;
    result.instruction = this.instruction;
    return result;
  }
}

lib.create = (lineNumber, command, args, srcLine, instruction) => {
  let key = command.toLowerCase();
  if (!Object.keys(factories).includes(key)) {
    throw new InvalidInstructionException();
  }
  let cmd = factories[key](args);
  return new Line(lineNumber, cmd, srcLine, instruction);
};

module.exports = lib;
