/**
 * The Command class is the parent class from which all other classes derive. The execute of this class simply returns everything unmodified. It also defines a method called populateFunctionTable that returns the fnTable unchanged.
 */
class Command {
  /**
   * This method returns the registers and flags unchanged. It also does not modify the stack or alter the program counter.
   * @param {Object} regs
   * @param {Object} flags
   * @param {Object} stack
   * @param {Object} pc
   * @returns {Object}
   */
  execute(regs, flags, stack, pc) {
    return { regs, flags };
  }

  /**
   * Returns the fnTable unchanged.
   * @param {Object} fnTable
   * @param {string} lineNumber
   * @returns {Object}
   */
  populateFunctionTable(fnTable, lineNumber) {
    return fnTable;
  }
}

module.exports = Command;
