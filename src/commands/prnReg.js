class PrnReg {
  constructor(reg) {
    this.reg=reg;
  }

  execute(currRegs,currFlags) {
    let prn=currRegs[this.reg].toString();
    return {regs:currRegs,flags:currFlags,prn}
  }
}

module.exports = PrnReg;
