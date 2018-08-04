const assert = require("assert");
const parse = require("../src/parse.js");

describe("should parse all legal forms",function(){
  it("should parse '10 START'",function(){
    let {lineNumber,command,args} = parse("10 START");
    assert.equal(lineNumber,"10");
    assert.equal(command,"START");
    assert.deepEqual(args,[]);
  });
  it("should parse '10 MOV A,2'",function(){
    let {lineNumber,command,args} = parse("10 MOV A,2");
    assert.equal(lineNumber,"10");
    assert.equal(command,"MOV");
    assert.deepEqual(args,['A','2']);
  });
  it("should parse '10 JMP 70'",function(){
    let {lineNumber,command,args} = parse("10 JMP 70");
    assert.equal(lineNumber,"10");
    assert.equal(command,"JMP");
    assert.deepEqual(args,['70']);
  });
});
