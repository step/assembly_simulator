const factories = require('./commands/commandFactories.js');

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
  let cmd = factories[command.toLowerCase()](args);
  return new Line(lineNumber, cmd);
};

module.exports = lib;
