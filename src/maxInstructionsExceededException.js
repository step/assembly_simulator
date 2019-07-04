class MaxInstructionsExceededException extends Error {
  constructor(maxLinesToExecute) {
    super();
    this.maxLinesToExecute = maxLinesToExecute;
  }
}

module.exports = MaxInstructionsExceededException;
