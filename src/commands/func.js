/**
 * The Func command is not really an executable instruction per se. As far as execution is concerned it does nothing. It is only useful at Machine load time to populate the function table.
 */
class Func {
  /**
   * Creates an instance of a function with the given name
   * @param {string} fnName 
   * @constructor
   */
  constructor(fnName) {
    this.fnName = fnName;
  }

  /**
   * 
   * @param {Object} currRegs - The current state of the registers
   * @param {Object} currFlags - The current state of the flags
   * @param {Object} stack - The call stack
   * @returns {Object} current registers and current flags are returned unchanged
   */
  execute(currRegs, currFlags, stack) {
    return { regs: currRegs, flags: currFlags };
  }
}

module.exports = Func;