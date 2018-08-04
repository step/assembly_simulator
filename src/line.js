const Start = require("./start.js");
const MovValToReg = require("./movValToReg");
const MovRegToReg = require("./movRegToReg");

const lib = {};

const isRegister = (arg) => {
  return arg.match(/^[ABCD]$/i);
}

const factories = {};

factories.start = (args) => new Start();
factories.mov = (args) => {
  if(isRegister(args[1]))
    return new MovRegToReg(args[0],args[1]);
  return new MovValToReg(args[0],args[1]);
}

class Line {
  constructor(lineNumber,command) {
    this.lineNumber = lineNumber;
    this.command = command;
  }

  getLineNumber() {
    return this.lineNumber;
  }

  execute(currRegs,currFlags) {
    let result = this.command.execute(currRegs,currFlags);
    result.currLine = this.lineNumber;
    return result;
  }
}

lib.create = (lineNumber,command,args)=>{
  let cmd = factories[command.toLowerCase()](args);
  return new Line(lineNumber,cmd);
}

module.exports = lib;
