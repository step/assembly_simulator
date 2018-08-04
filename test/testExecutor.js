const Executor = require("../src/executor.js");
const Lines = require("../src/lines.js");
const Line = require("../src/line.js");
const assert = require("assert");


describe("executing a single line",function(){
  it("should start the program by resetting all flags",function(){
    const executor = new Executor();
    const program = new Lines();
    program.add(Line.create("10","start"));
    executor.execute(program);
    assert.deepEqual({A:0,B:0,C:0,D:0},executor.getRegs());
    assert.deepEqual({NE:0,EQ:0,LT:0,GT:0},executor.getFlags());
  });
});
