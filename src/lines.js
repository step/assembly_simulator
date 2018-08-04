class Lines {
  constructor() {
    this.lines = [];
    this.lineNumbers={};
  }

  add(line) {
    this.lines.push(line);
    let index = this.lines.length - 1;
    this.lineNumbers[line.getLineNumber()] = index;
  }
}

module.exports = Lines;
