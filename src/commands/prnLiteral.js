class PrnLiteral {
  constructor(literal) {
    this.literal=literal;
  }

  execute(currRegs,currFlags) {
    return {regs:currRegs,flags:currFlags,prn:this.literal}
  }
}

module.exports = PrnLiteral;
