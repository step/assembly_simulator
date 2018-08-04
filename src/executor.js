class Executor {
  resetRegisters() {
    this.regs = {A:0,B:0,C:0,D:0};
  }

  resetFlags() {
    this.flags = {NE:0,EQ:0,LT:0,GT:0};
  }

  constructor() {
    this.resetRegisters();
    this.resetFlags();
  }

  getRegs() {
    let {A,B,C,D} = this.regs;
    return {A,B,C,D};
  }

  getFlags() {
    let {EQ,NE,GT,LT} = this.flags;
    return {EQ,NE,GT,LT};
  }

  execute(executableLines) {
    this.executableLines=executableLines;
  }
}

module.exports = Executor;
