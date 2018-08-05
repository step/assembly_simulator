const InvalidInstructionException = require('./invalidInstructionException');

const Start = require('./start.js');
const Stop = require('./stop.js');
const MovValToReg = require('./movValToReg');
const MovRegToReg = require('./movRegToReg');
const AddValToReg = require('./addValToReg');
const AddRegToReg = require('./addRegToReg');
const CmpRegToVal = require('./cmpRegToVal');
const CmpRegToReg = require('./cmpRegToReg');
const Jmp = require('./jmp.js');
const JmpEq = require('./jmpEq.js');
const JmpNe = require('./jmpNe.js');
const JmpLt = require('./jmpLt.js');
const JmpLe = require('./jmpLe.js');
const JmpGt = require('./jmpGt.js');
const JmpGe = require('./jmpGe.js');
const PrnLiteral = require('./prnLiteral.js');
const PrnReg = require('./prnReg.js');

const isRegister = arg => arg.toString().match(/^[ABCD]$/i);
const isNumericalValue = arg => arg.toString().match(/^[0-9]+$/i);
const isStringLiteral = arg => arg.toString().match(/^".*"$/);
const stripOuterQuotes = arg => arg.replace(/^"/, '').replace(/"$/, '');
const factories = {};

factories.start = args => new Start();

factories.stop = args => new Stop();

factories.mov = args => {
  if (!isRegister(args[0])) throw new InvalidInstructionException();

  if (isRegister(args[1]))
    return new MovRegToReg(args[0].toUpperCase(), args[1].toUpperCase());

  if (!isNumericalValue(args[1])) throw new InvalidInstructionException();

  return new MovValToReg(args[0].toUpperCase(), +args[1]);
};

factories.cmp = args => {
  if (!isRegister(args[0])) throw new InvalidInstructionException();

  if (isRegister(args[1]))
    return new CmpRegToReg(args[0].toUpperCase(), args[1].toUpperCase());

  if (!isNumericalValue(args[1])) throw new InvalidInstructionException();

  return new CmpRegToVal(args[0].toUpperCase(), +args[1]);
};

factories.jmp = (args, actualJump = Jmp) => {
  if (args.length != 1 || !isNumericalValue(args[0]))
    throw new InvalidInstructionException();
  return new actualJump(args[0]);
};

factories.je = args => {
  return factories.jmp(args, JmpEq);
};

factories.jlt = args => {
  return factories.jmp(args, JmpLt);
};

factories.jle = args => {
  return factories.jmp(args, JmpLe);
};

factories.jne = args => {
  return factories.jmp(args, JmpNe);
};

factories.jgt = args => {
  return factories.jmp(args, JmpGt);
};

factories.jge = args => {
  return factories.jmp(args, JmpGe);
};

factories.add = args => {
  if (!isRegister(args[0])) throw new InvalidInstructionException();

  if (isRegister(args[1]))
    return new AddRegToReg(args[0].toUpperCase(), args[1].toUpperCase());

  if (!isNumericalValue(args[1])) throw new InvalidInstructionException();

  return new AddValToReg(args[0].toUpperCase(), +args[1]);
};

factories.prn = args => {
  if (args.length != 1) throw new InvalidInstructionException();

  if (isStringLiteral(args[0])) {
    return new PrnLiteral(stripOuterQuotes(args[0]));
  }

  if (isRegister(args[0])) return new PrnReg(args[0].toUpperCase());

  throw new InvalidInstructionException();
};

module.exports = factories;
