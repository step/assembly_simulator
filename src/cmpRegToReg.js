class CmpRegToReg {
  constructor(lhs,rhs) {
    this.lhs=lhs;
    this.rhs=rhs;
  }

  execute(currRegs,currFlags) {
    let newFlags={EQ:0,NE:0,GT:0,LT:0};
    let leftVal=currRegs[this.lhs];
    let rightVal=currRegs[this.rhs];
    if(leftVal==rightVal) {
      newFlags["EQ"] = 1;
    } else {
      newFlags["NE"] = 1;
      if (leftVal>rightVal) {
        newFlags["GT"] = 1;
      } else {
        newFlags["LT"] = 1;
      }
    }
    return {regs:currRegs,flags:newFlags};
  }
}

module.exports = CmpRegToReg;
