const InvalidInstructionException = require('./commands/invalidInstructionException');
const parse = instruction => {
  let empty = /^\s*$/;
  let onlyNumber = /^\s*([0-9]+)+\s*$/;
  let comment = /^\s*;.*$/;
  let components = /^\s*([0-9]+)\s+([a-zA-Z]+)\s*(.*)*$/;
  if (instruction.match(empty) || instruction.match(comment) || instruction.match(onlyNumber))
    return {nonExecutableLine: true};
  let matches = instruction.match(components);
  try {
    let lineNumber = matches[1];
    let command = matches[2];
    let args = matches[3] ? parseArgs(matches[3]) : [];
    return {lineNumber, command, args};
  } catch (e) {
    throw new InvalidInstructionException();
  }
};

const parseArgs = args => {
  let trimmed = args.trim();
  if (trimmed.match(/^\"[^\"]*\"$/)) return [trimmed];
  let matches = trimmed.match(/^([a-zA-Z0-9]+)(\s*,\s*([a-zA-Z0-9]+))?$/);
  if (!matches) throw new Error();
  let parsed = [matches[1]];
  if (matches[3]) parsed.push(matches[3]);

  return parsed;
};

module.exports = parse;
