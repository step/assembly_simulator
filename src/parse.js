const InvalidInstructionException = require('./invalidInstructionException');
const parse = (instruction) => {
  let components = /^\s*([0-9]+)\s+([a-zA-Z]+)\s*(.*)*$/;
  let matches = instruction.match(components);
  try {
    let lineNumber = matches[1];
    let command = matches[2];
    let args = matches[3]? parseArgs(matches[3]) : [];
    return {lineNumber,command,args };
  } catch (e) {
    throw new InvalidInstructionException();
  }
}

const parseArgs =  (args)=>{
  return args.split(',').map(arg=>arg.trim());
}

module.exports= parse;
