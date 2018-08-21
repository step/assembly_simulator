const Command = require('./command.js');

class Stop extends Command {
  execute(currRegs, currFlags, stack, programCounter) {
    programCounter.halt();
    return { regs: currRegs, flags: currFlags };
  }
}

module.exports = Stop;
