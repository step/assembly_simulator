const assert=require("assert");
const PrnReg=require("../src/commands/prnReg.js");

describe("PrnReg execution",function(){
  it("should 'print' the register A",function(){
    let print=new PrnReg("A");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:1,B:0,C:0,D:0};
    let {flags,regs,prn}=print.execute(currRegs,currFlags);
    assert.equal("1",prn);
  });

  it("should 'print' the register B",function(){
    let print=new PrnReg("B");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:2,C:0,D:0};
    let {flags,regs,prn}=print.execute(currRegs,currFlags);
    assert.equal("2",prn);
  });

  it("should 'print' the register C",function(){
    let print=new PrnReg("C");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:0,C:3,D:0};
    let {flags,regs,prn}=print.execute(currRegs,currFlags);
    assert.equal("3",prn);
  });

  it("should 'print' the register D",function(){
    let print=new PrnReg("D");
    let currFlags = {EQ:0,NE:0,LT:0,GT:0};
    let currRegs = {A:0,B:0,C:0,D:4};
    let {flags,regs,prn}=print.execute(currRegs,currFlags);
    assert.equal("4",prn);
  });
});
