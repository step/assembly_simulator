const Start = require("./start.js");
const MovValToReg = require("./movValToReg");
const MovRegToReg = require("./movRegToReg");
const AddValToReg = require("./addValToReg");
const AddRegToReg = require("./addRegToReg");
const CmpRegToVal = require("./cmpRegToVal");
const CmpRegToReg = require("./cmpRegToReg");
const InvalidInstructionException = require("./invalidInstructionException");
const Jmp = require('./jmp.js');
const JmpEq = require('./jmpEq.js');
const JmpNe = require('./jmpNe.js');

const isRegister = (arg) => arg.toString().match(/^[ABCD]$/i);
const isNumericalValue = (arg) => arg.toString().match(/^[0-9]+$/i);

const factories = {};

factories.start = (args) => new Start();

factories.mov = (args) => {
  if(!isRegister(args[0]))
    throw new InvalidInstructionException();

  if(isRegister(args[1]))
    return new MovRegToReg(args[0],args[1]);

  if(!isNumericalValue(args[1]))
    throw new InvalidInstructionException();

  return new MovValToReg(args[0],+args[1]);
}

factories.cmp = (args) => {
  if(!isRegister(args[0]))
    throw new InvalidInstructionException();

  if(isRegister(args[1]))
    return new CmpRegToReg(args[0],args[1]);

  if(!isNumericalValue(args[1]))
    throw new InvalidInstructionException();

  return new CmpRegToVal(args[0],+args[1]);
}

factories.jmp = (args,actualJump=Jmp)=>{
  if( (args.length != 1 ) || !isNumericalValue(args[0]))
    throw new InvalidInstructionException();
  return new actualJump(args[0]);
}

factories.je = (args) => {
  return factories.jmp(args,JmpEq);
}

factories.jne = (args) => {
  return factories.jmp(args,JmpNe);
}

factories.add = (args) => {
  if(!isRegister(args[0]))
    throw new InvalidInstructionException();

  if(isRegister(args[1]))
    return new AddRegToReg(args[0],args[1]);

  if(!isNumericalValue(args[1]))
    throw new InvalidInstructionException();

  return new AddValToReg(args[0],+args[1]);
}


module.exports = factories;
