class Start {
  execute(currRegs, currFlags) {
    let newRegs = { A: 0, B: 0, C: 0, D: 0 };
    let newFlags = { EQ: 0, NE: 0, LT: 0, GT: 0 };
    return { regs: newRegs, flags: newFlags };
  }
}

module.exports = Start;
