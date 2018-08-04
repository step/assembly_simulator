const assert=require("assert");
const AddValToReg=require("../src/addValToReg.js");

describe("AddValToReg execution",function(){
  it("should add a literal value to the A register",function(){
    let add=new AddValToReg("A",2);
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:1,B:0,C:0,D:0};
    let {regs,flags} = add.execute(currRegs,currFlags);
    assert.deepEqual({A:3,B:0,C:0,D:0},regs);
    assert.deepEqual({EQ:0,NE:0,LT:0,GT:0},flags);
  });
});
