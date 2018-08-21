const Command = require('./command.js');

/**
 * The Func command is not really an executable instruction per se. As far as execution is concerned it does nothing. It is only useful at Machine load time to populate the function table.
 */
class Func extends Command {
  /**
   * Creates an instance of a function with the given name
   * @param {string} fnName
   * @constructor
   */
  constructor(fnName) {
    super();
    this.fnName = fnName;
  }

  /**
   * Populates the function table with the fnName and lineNumber provided.
   * @param {Object} fnTable
   * @param {string} lineNumber
   */
  populateFunctionTable(fnTable, lineNumber) {
    let newEntry = {};
    newEntry[this.fnName] = lineNumber;
    return Object.assign(newEntry, fnTable);
  }
}

module.exports = Func;
