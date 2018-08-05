const assert=require("assert");
const MovRegToReg=require("../src/commands/movRegToReg.js");

describe("MovRegToReg execution",function(){
  it("should copy value from reg B to reg A",function(){
    let mov=new MovRegToReg("A","B");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:10,C:0,D:0};
    let {regs,flags} = mov.execute(currRegs,currFlags);
    assert.deepEqual({A:10,B:10,C:0,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });

  it("should copy value from reg C to reg A",function(){
    let mov=new MovRegToReg("A","C");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:0,C:10,D:0};
    let {regs,flags} = mov.execute(currRegs,currFlags);
    assert.deepEqual({A:10,B:0,C:10,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });

  it("should copy value from reg D to reg A",function(){
    let mov=new MovRegToReg("A","D");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:0,C:0,D:10};
    let {regs,flags} = mov.execute(currRegs,currFlags);
    assert.deepEqual({A:10,B:0,C:0,D:10},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });

  it("should copy value from reg A to reg B",function(){
    let mov=new MovRegToReg("B","A");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:10,B:0,C:0,D:0};
    let {regs,flags} = mov.execute(currRegs,currFlags);
    assert.deepEqual({A:10,B:10,C:0,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });

  it("should copy value from reg C to reg B",function(){
    let mov=new MovRegToReg("B","C");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:0,C:10,D:0};
    let {regs,flags} = mov.execute(currRegs,currFlags);
    assert.deepEqual({A:0,B:10,C:10,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });

  it("should copy value from reg D to reg B",function(){
    let mov=new MovRegToReg("B","D");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:0,C:0,D:10};
    let {regs,flags} = mov.execute(currRegs,currFlags);
    assert.deepEqual({A:0,B:10,C:0,D:10},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });
});
