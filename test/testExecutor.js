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

describe("executing multiple lines",function(){
  it("should set each of the 4 registers with values",function(){
    const executor = new Executor();
    const program = new Lines();
    program.add(Line.create("10","start"));
    program.add(Line.create("20","mov",["A","1"]));
    program.add(Line.create("30","mov",["B","2"]));
    program.add(Line.create("40","mov",["C","3"]));
    program.add(Line.create("50","mov",["D","4"]));
    program.add(Line.create("60","cmp",["D","4"]));
    executor.execute(program);
    assert.deepEqual({A:1,B:2,C:3,D:4},executor.getRegs());
    assert.deepEqual({NE:0,EQ:1,LT:0,GT:0},executor.getFlags());
  });

  it("should run a loop 3 times",function(){
    const executor = new Executor();
    const program = new Lines();
    program.add(Line.create("10","start"));
    program.add(Line.create("20","mov",["A",0]));
    program.add(Line.create("30","cmp",["A",2]));
    program.add(Line.create("40","je",["70"]));
    program.add(Line.create("50","add",["A",1]));
    program.add(Line.create("60","jmp",["30"]));
    program.add(Line.create("70","mov",["B",100]));
    executor.execute(program);
    assert.deepEqual({A:2,B:100,C:0,D:0},executor.getRegs());
    assert.deepEqual({NE:0,EQ:1,LT:0,GT:0},executor.getFlags());
  });

  it("should stop execution on the STOP instruction",function(){
    const executor = new Executor();
    const program = new Lines();
    program.add(Line.create("10","start"));
    program.add(Line.create("20","mov",["A",10]));
    program.add(Line.create("30","stop"));
    program.add(Line.create("40","mov",["A",20]));
    executor.execute(program);
    assert.deepEqual({A:10,B:0,C:0,D:0},executor.getRegs())
    assert.deepEqual({NE:0,EQ:0,LT:0,GT:0},executor.getFlags());
  });
});
