const Command = require('./command.js');

/**
 * This class encapsulates the call command. It takes the function name to jump to. When asked to execute it will modify the program counter according to the call and store the return value in the stack
 */
class Call extends Command {
  /**
   * This constructs an instance of the Call class.
   * @param {string} fnName
   * @constructor
   */
  constructor(fnName) {
    super();
    this.fnName = fnName;
  }

  /**
   * Executes the call command by placing the next line to return to on the stack. It also modifies the program counter's next line to jump to the function.
   * @param {Object} regs
   * @param {Object} flags
   * @param {Object} stack
   * @param {Object} programCounter
   * @returns {Object}
   * @override
   */
  execute(regs, flags, stack, programCounter) {
    stack.push(programCounter.getNextLineNumber());
    programCounter.setNextLineByName(this.fnName);
    return { regs, flags };
  }
}

module.exports = Call;
