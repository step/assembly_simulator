const assert=require("assert");
const Jmp=require("../src/jmp.js");

describe("Jmp execution",function(){
  it("should jump to the given line number",function(){
    let jmp=new Jmp(70);
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:10,C:0,D:0};
    let {regs,flags,nextLine} = jmp.execute(currRegs,currFlags);
    assert.equal(nextLine,70);
    assert.deepEqual(regs,{A:0,B:10,C:0,D:0});
    assert.deepEqual(flags,{EQ:0,NE:0,LT:0,GT:0});
  });
});
