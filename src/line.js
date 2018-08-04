const Start = require("./start.js");

const lib = {};

class Line {
  constructor(lineNumber,command) {
    this.lineNumber = lineNumber;
    this.command = command;
  }

  getLineNumber() {
    return this.lineNumber;
  }
}

lib.create = (lineNumber)=>{
  return new Line(new Start());
}

module.exports = lib;
