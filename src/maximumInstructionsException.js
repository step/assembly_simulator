class MaximumInstructionsException extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.lineNumber = 0;
    this.instruction = '';
  }

  setLineNumber(lineNumber) {
    this.lineNumber = lineNumber;
  }

  setInstruction(instruction) {
    this.instruction = instruction;
  }
}

module.exports = MaximumInstructionsException;
