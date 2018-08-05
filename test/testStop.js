const assert=require("assert");
const Stop=require("../src/commands/stop.js");

describe("Stop execution",function(){
  it("should return a halt flag",function(){
    let stop = new Stop();
    let currFlags = {};
    let currRegs = {};
    let {regs,flags,halt} = stop.execute(currRegs,currFlags);
    assert.equal(true,halt);
  });

  it("should not modify any registers or flags",function(){
    let stop = new Stop();
    let currFlags = {EQ:1,NE:0,GT:0,LT:0};
    let currRegs = {A:10,B:20,C:30,D:40};
    let {regs,flags,halt} = stop.execute(currRegs,currFlags);
    assert.deepEqual(regs,{A:10,B:20,C:30,D:40});
    assert.deepEqual(flags,{EQ:1,NE:0,GT:0,LT:0});
  });
});
