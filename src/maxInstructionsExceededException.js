class MaxInstructionsExceededException extends Error {
  constructor(maxLinesToExecute) {
    super();
    this.name = this.constructor.name;
    this.maxLinesToExecute = maxLinesToExecute;
  }
}

module.exports = MaxInstructionsExceededException;
