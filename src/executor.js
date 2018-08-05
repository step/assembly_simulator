class Executor {
  resetRegisters() {
    this.regs = { A: 0, B: 0, C: 0, D: 0 };
  }

  resetFlags() {
    this.flags = { NE: 0, EQ: 0, LT: 0, GT: 0 };
  }

  constructor() {
    this.resetRegisters();
    this.resetFlags();
    this.prn = [];
  }

  setRegs({ A, B, C, D }) {
    this.regs = { A, B, C, D };
  }

  setFlags({ EQ, NE, LT, GT }) {
    this.flags = { EQ, NE, LT, GT };
  }

  getRegs() {
    let { A, B, C, D } = this.regs;
    return { A, B, C, D };
  }

  getFlags() {
    let { EQ, NE, GT, LT } = this.flags;
    return { EQ, NE, GT, LT };
  }

  getPrn() {
    return this.prn;
  }

  execute(executableLines) {
    let regs = this.getRegs();
    let flags = this.getFlags();
    executableLines.execute(
      { regs, flags },
      ({ regs, flags, nextLine, currLine, prn }) => {
        // console.log(regs,flags,currLine,nextLine);
        this.setRegs(regs);
        this.setFlags(flags);
        if (prn) this.prn.push(prn);
      }
    );
  }
}

module.exports = Executor;
