const factories = require('./commands/commandFactories.js');
const InvalidInstructionException = require('./commands/invalidInstructionException.js');
const lib = {};

class Line {
  constructor(lineNumber, command) {
    this.lineNumber = lineNumber;
    this.command = command;
  }

  getLineNumber() {
    return this.lineNumber;
  }

  execute(currRegs, currFlags) {
    let result = this.command.execute(currRegs, currFlags);
    result.currLine = this.lineNumber;
    return result;
  }
}

lib.create = (lineNumber, command, args) => {
  let key = command.toLowerCase();
  if(!Object.keys(factories).includes(key)) {
    throw new InvalidInstructionException();
  }
  let cmd = factories[key](args);
  return new Line(lineNumber, cmd);
};

module.exports = lib;
