const lookupByLineNumber = (obj, key, index) => {
  let newObj = {};
  newObj[key] = index;
  return Object.assign(obj, newObj);
};
/**
 * A representation of the program counter. This class encapsulates the line number at which the program currently executes and the next line that it will execute. An object of this class can also be asked to alter the next line to execute.
 */
class ProgramCounter {
  /**
   * Creates a new ProgramCounter. lineNumbers is expected to be an object which has line numbers as a key and an index as the value
   * @constructor
   * @param {Object} lineNumbers
   */
  constructor(lineNumbers) {
    this._lineNumbers = lineNumbers;
    this._indexOf = lineNumbers.reduce(lookupByLineNumber, {});
    this._currentIndex = 0;
    this._nextIndex = 1;
  }

  /**
   * This method gets the current line number that is executing.
   * @returns {string} The line number that is currently executing
   */
  getCurrentLineNumber() {
    return this._lineNumbers[this._currentIndex];
  }

  /**
   * This method gets the next line number that will execute.
   * @returns {string} The line number that is currently executing
   */
  getNextLineNumber() {
    return this._lineNumbers[this._nextIndex];
  }

  /**
   * This method updates the current and next line indices respectively.
   */
  update() {
    this._currentIndex = this._nextIndex;
    this._nextIndex++;
  }

  /**
   * This method sets the next line index based on the lineNumber specified.
   * @param {string} lineNumber
   */
  setNextLine(lineNumber) {
    this._nextIndex = this._indexOf[lineNumber];
  }

  /**
   * This method returns the currently executing line index
   * @returns {number} current index
   */
  getCurrentLineIndex() {
    return this._currentIndex;
  }
}

module.exports = ProgramCounter;
