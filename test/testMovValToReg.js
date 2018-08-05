const assert=require("assert");
const MovValToReg=require("../src/commands/movValToReg.js");

describe("MovValToReg execution",function(){
  it("should mov literal value to A",function(){
    let mov = new MovValToReg("A",10);
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:0,C:0,D:0};
    let {regs,flags} = mov.execute(currRegs,currFlags);
    assert.deepEqual({A:10,B:0,C:0,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });

  it("should mov literal value to B",function(){
    let mov = new MovValToReg("B",10);
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:0,C:0,D:0};
    let {regs,flags} = mov.execute(currRegs,currFlags);
    assert.deepEqual({A:0,B:10,C:0,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });

  it("should mov literal value to C",function(){
    let mov = new MovValToReg("C",10);
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:0,C:0,D:0};
    let {regs,flags} = mov.execute(currRegs,currFlags);
    assert.deepEqual({A:0,B:0,C:10,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });

  it("should mov literal value to D",function(){
    let mov = new MovValToReg("D",10);
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:0,C:0,D:0};
    let {regs,flags} = mov.execute(currRegs,currFlags);
    assert.deepEqual({A:0,B:0,C:0,D:10},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });

});
