const Start = require("./start.js");
const MovValToReg = require("./movValToReg");
const MovRegToReg = require("./movRegToReg");
const cmpRegToVal = require("./cmpRegToVal");
const CmpRegToReg = require("./cmpRegToReg");
const InvalidInstructionException = require("./invalidInstructionException");

const isRegister = (arg) => arg.match(/^[ABCD]$/i);
const isNumericalValue = (arg) => arg.match(/^[0-9]+$/i);

const factories = {};

factories.start = (args) => new Start();

factories.mov = (args) => {
  if(!isRegister(args[0]))
    throw new InvalidInstructionException();

  if(isRegister(args[1]))
    return new MovRegToReg(args[0],args[1]);

  if(!isNumericalValue(args[1]))
    throw new InvalidInstructionException();

  return new MovValToReg(args[0],args[1]);
}

factories.cmp = (args) => {
  if(!isRegister(args[0]))
    throw new InvalidInstructionException();

  if(isRegister(args[1]))
    return new CmpRegToReg(args[0],args[1]);

  if(!isNumericalValue(args[1]))
    throw new InvalidInstructionException();

  return new cmpRegToVal(args[0],args[1]);
}

module.exports = factories;
