class Stop {
  execute(currRegs,currFlags) {
    return {regs:currRegs,flags:currFlags,halt:true};
  }
}

module.exports = Stop;
