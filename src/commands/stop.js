class Stop {
  execute(currRegs, currFlags, stack, programCounter) {
    programCounter.halt();
    return { regs: currRegs, flags: currFlags };
  }
}

module.exports = Stop;
