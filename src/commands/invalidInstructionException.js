class InvalidInstructionException extends Error {
  constructor() {
    super();
    this.name = "InvalidInstructionException";
  }
}

module.exports = InvalidInstructionException;
