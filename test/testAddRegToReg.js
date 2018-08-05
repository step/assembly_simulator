const assert=require("assert");
const AddRegToReg=require("../src/commands/addRegToReg.js");

describe("AddRegToReg execution",function(){
  it("should add B to the A register",function(){
    let add=new AddRegToReg("A","B");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:1,B:2,C:0,D:0};
    let {regs,flags} = add.execute(currRegs,currFlags);
    assert.deepEqual({A:3,B:2,C:0,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });
  it("should add C to the A register",function(){
    let add=new AddRegToReg("A","C");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:1,B:0,C:2,D:0};
    let {regs,flags} = add.execute(currRegs,currFlags);
    assert.deepEqual({A:3,B:0,C:2,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });
  it("should add D to the A register",function(){
    let add=new AddRegToReg("A","D");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:1,B:0,C:0,D:2};
    let {regs,flags} = add.execute(currRegs,currFlags);
    assert.deepEqual({A:3,B:0,C:0,D:2},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });
  it("should add A to the A register",function(){
    let add=new AddRegToReg("A","A");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:1,B:0,C:0,D:0};
    let {regs,flags} = add.execute(currRegs,currFlags);
    assert.deepEqual({A:2,B:0,C:0,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });
});
