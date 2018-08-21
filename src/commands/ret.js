const Command = require('./command.js');

class Ret extends Command {
  execute(regs, flags, stack, pc) {
    let retLine = stack.pop();
    pc.setNextLine(retLine);
    return { regs, flags };
  }
}

module.exports = Ret;
