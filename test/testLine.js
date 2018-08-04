const Line = require("../src/line.js");
const assert = require("assert");

describe("Line execute",function(){
  it("should execute a start instruction",function(){
    let line = Line.create(10,"START");
    let currRegs = {A:0,B:0,C:0,D:0};
    let currFlags = {EQ:0,NE:0,GT:0,LT:0};
    let {currLine,regs,flags} = line.execute(currRegs,currFlags);
    assert.equal(10,currLine);
    assert.deepEqual({A:0,B:0,C:0,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,GT:0,LT:0},flags);
  });

  it("should execute a mov val to reg instruction",function(){
    let line = Line.create(10,"MOV",["A","10"]);
    let currRegs = {A:0,B:0,C:0,D:0};
    let currFlags = {EQ:0,NE:0,GT:0,LT:0};
    let {currLine,regs,flags} = line.execute(currRegs,currFlags);
    assert.equal(10,currLine);
    assert.deepEqual({A:10,B:0,C:0,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,GT:0,LT:0},flags);
  });

  it("should execute a mov reg to reg instruction",function(){
    let line = Line.create(10,"MOV",["A","B"]);
    let currRegs = {A:0,B:10,C:0,D:0};
    let currFlags = {EQ:0,NE:0,GT:0,LT:0};
    let {currLine,regs,flags} = line.execute(currRegs,currFlags);
    assert.equal(10,currLine);
    assert.deepEqual({A:10,B:10,C:0,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,GT:0,LT:0},flags);
  });
});
