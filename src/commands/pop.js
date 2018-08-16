/**
 * The Pop command pops the stack and puts the popped value into the given register at execution time.
 */
class Pop {
  /**
   * Keeps note of the register to pop into from the stack
   * @param {string} reg - The register to push into
   */
  constructor(reg) {
    this.reg = reg;
  }

  /**
   * Execute will pop the top of the stack and stores the value in the register specified.
   * @param {Object} currRegs - The current state of the registers
   * @param {Object} currFlags - The current state of the flags
   * @param {Object} stack - The stack
   * @returns {Object} current registers and current flags are returned unchanged with the popped value in the specified register
   */
  execute(currRegs, currFlags, stack) {
    let {A,B,C,D} = currRegs;
    let newRegs = {A,B,C,D};
    let value = stack.pop();
    newRegs[this.reg] = value;
    return { regs: newRegs, flags: currFlags };
  }
}

module.exports = Pop;
