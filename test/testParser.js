const InvalidInstructionException = require('../src/commands/invalidInstructionException');
const assert = require('assert');
const parse = require('../src/parse.js');

describe('should parse all legal forms', function() {
  it("should parse '10 START'", function() {
    let { lineNumber, command, args } = parse('10 START');
    assert.equal(lineNumber, '10');
    assert.equal(command, 'START');
    assert.deepEqual(args, []);
  });
  it("should parse '10 MOV A,2'", function() {
    let { lineNumber, command, args } = parse('10 MOV A,2');
    assert.equal(lineNumber, '10');
    assert.equal(command, 'MOV');
    assert.deepEqual(args, ['A', '2']);
  });
  it("should parse '10 JMP 70'", function() {
    let { lineNumber, command, args } = parse('10 JMP 70');
    assert.equal(lineNumber, '10');
    assert.equal(command, 'JMP');
    assert.deepEqual(args, ['70']);
  });
  it("should parse '10 ADD A,A'", function() {
    let { lineNumber, command, args } = parse('10 ADD A,A');
    assert.equal(lineNumber, '10');
    assert.equal(command, 'ADD');
    assert.deepEqual(args, ['A', 'A']);
  });
  it('should parse string literals \'10 PRN "HELLO"\'', function() {
    let { lineNumber, command, args } = parse(`10 PRN "HELLO"`);
    assert.equal(lineNumber, '10');
    assert.equal(command, 'PRN');
    assert.deepEqual(args, [`"HELLO"`]);
  });
  it("should parse empty lines ''", function() {
    let { nonExecutableLine } = parse(``);
    assert.equal(true, nonExecutableLine);
  });
  it('should parse comment lines', function() {
    let { nonExecutableLine } = parse(`; this is a comment`);
    assert.equal(true, nonExecutableLine);
  });
  it('should parse comment lines with leading spaces', function() {
    let { nonExecutableLine } = parse(`  ; this is a comment`);
    assert.equal(true, nonExecutableLine);
  });
  it('should parse line with only line number', function() {
    let { nonExecutableLine } = parse(`10`);
    assert.equal(true, nonExecutableLine);
  });
  it('should parse line with only line number with spaces', function() {
    let { nonExecutableLine } = parse(`10  `);
    assert.equal(true, nonExecutableLine);
  });
  it('should parse line with only line number with newLine at end', function() {
    let { nonExecutableLine } = parse(`10 \n`);
    assert.equal(true, nonExecutableLine);
  });
});

describe('should not parse illegal forms', function() {
  it('should not parse illegal lines', function() {
    assert.throws(() => parse('ADD A,A'), InvalidInstructionException);
    assert.throws(() => parse('10ADD A,A'), InvalidInstructionException);
    assert.throws(() => parse('10 ADDA,A'), InvalidInstructionException);
    assert.throws(() => parse('10 ADD A,'), InvalidInstructionException);
    assert.throws(() => parse('10 ADD ,A'), InvalidInstructionException);
    assert.throws(() => parse('10+ADD ,A'), InvalidInstructionException);
    assert.throws(() => parse('10 ADD -2,A'), InvalidInstructionException);
    assert.throws(() => parse('10 ADD A,-2'), InvalidInstructionException);
    assert.throws(() => parse('10 ADD A -2'), InvalidInstructionException);
    assert.throws(() => parse('-10 ADD A -2'), InvalidInstructionException);
  });
});
