const Line = require("../src/line.js");
const assert = require("assert");
const InvalidInstructionException=require("../src/commands/invalidInstructionException.js");

describe("Line execute",function(){
  describe("start",function(){
    it("should execute a start instruction",function(){
      let line = Line.create(10,"START");
      let currRegs = {A:0,B:0,C:0,D:0};
      let currFlags = {EQ:0,NE:0,GT:0,LT:0};
      let {currLine,regs,flags} = line.execute(currRegs,currFlags);
      assert.equal(10,currLine);
      assert.deepEqual({A:0,B:0,C:0,D:0},regs);
      assert.deepEqual({EQ:0,NE:0,GT:0,LT:0},flags);
    });
  });

  describe("mov",function(){
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

    it("should throw an error when MOV has an invalid argument",function(){
      assert.throws(()=>Line.create(10,"MOV",["10","B"]),InvalidInstructionException);
      assert.throws(()=>Line.create(10,"MOV",["F","B"]),InvalidInstructionException);
      assert.throws(()=>Line.create(10,"MOV",["B","F"]),InvalidInstructionException);
    });
  });

  describe("cmp",function(){
    it("should execute a cmp val to reg instruction",function(){
      let line = Line.create(10,"CMP",["A","10"]);
      let currRegs = {A:10,B:0,C:0,D:0};
      let currFlags = {EQ:0,NE:0,GT:0,LT:0};
      let {currLine,regs,flags} = line.execute(currRegs,currFlags);
      assert.equal(10,currLine);
      assert.deepEqual({A:10,B:0,C:0,D:0},regs);
      assert.deepEqual({EQ:1,NE:0,GT:0,LT:0},flags);
    });

    it("should execute a cmp reg to reg instruction",function(){
      let line = Line.create(10,"CMP",["A","B"]);
      let currRegs = {A:10,B:10,C:0,D:0};
      let currFlags = {EQ:0,NE:0,GT:0,LT:0};
      let {currLine,regs,flags} = line.execute(currRegs,currFlags);
      assert.equal(10,currLine);
      assert.deepEqual({A:10,B:10,C:0,D:0},regs);
      assert.deepEqual({EQ:1,NE:0,GT:0,LT:0},flags);
    });

    it("should throw an error when CMP has an invalid argument",function(){
      assert.throws(()=>Line.create(10,"CMP",["10","B"]),InvalidInstructionException);
      assert.throws(()=>Line.create(10,"CMP",["F","B"]),InvalidInstructionException);
      assert.throws(()=>Line.create(10,"CMP",["B","F"]),InvalidInstructionException);
    });
  });

  describe("add",function(){
    it("should execute a add val to reg instruction",function(){
      let line = Line.create(10,"ADD",["A","10"]);
      let currRegs = {A:1,B:0,C:0,D:0};
      let currFlags = {EQ:0,NE:0,GT:0,LT:0};
      let {currLine,regs,flags} = line.execute(currRegs,currFlags);
      assert.equal(10,currLine);
      assert.deepEqual({A:11,B:0,C:0,D:0},regs);
      assert.deepEqual({EQ:0,NE:0,GT:0,LT:0},flags);
    });

    it("should execute a add reg to reg instruction",function(){
      let line = Line.create(10,"ADD",["A","B"]);
      let currRegs = {A:1,B:10,C:0,D:0};
      let currFlags = {EQ:0,NE:0,GT:0,LT:0};
      let {currLine,regs,flags} = line.execute(currRegs,currFlags);
      assert.equal(10,currLine);
      assert.deepEqual({A:11,B:10,C:0,D:0},regs);
      assert.deepEqual({EQ:0,NE:0,GT:0,LT:0},flags);
    });

    it("should throw an error when ADD has an invalid argument",function(){
      assert.throws(()=>Line.create(10,"ADD",["10","B"]),InvalidInstructionException);
      assert.throws(()=>Line.create(10,"ADD",["F","B"]),InvalidInstructionException);
      assert.throws(()=>Line.create(10,"ADD",["B","F"]),InvalidInstructionException);
    });
  });

  describe("jmp",function(){
    it("should execute a jmp with valid numeric value",function(){
      let line = Line.create(10,"JMP",["20"]);
      let currRegs = {A:0,B:0,C:0,D:0};
      let currFlags = {EQ:0,NE:0,GT:0,LT:0};
      let {currLine,regs,flags,nextLine} = line.execute(currRegs,currFlags);
      assert.equal(10,currLine);
      assert.equal("20",nextLine);
      assert.deepEqual({A:0,B:0,C:0,D:0},regs);
      assert.deepEqual({EQ:0,NE:0,GT:0,LT:0},flags);
    });

    it("should throw an error when JMP has an invalid argument",function(){
      assert.throws(()=>Line.create(10,"JMP",[]),InvalidInstructionException);
      assert.throws(()=>Line.create(10,"JMP",["B"]),InvalidInstructionException);
    });
  });

  describe("je",function(){
    it("should execute a je with valid numeric value",function(){
      let line = Line.create(10,"JE",["20"]);
      let currRegs = {A:0,B:0,C:0,D:0};
      let currFlags = {EQ:1,NE:0,GT:0,LT:0};
      let {currLine,regs,flags,nextLine} = line.execute(currRegs,currFlags);
      assert.equal(10,currLine);
      assert.equal("20",nextLine);
      assert.deepEqual({A:0,B:0,C:0,D:0},regs);
      assert.deepEqual({EQ:1,NE:0,GT:0,LT:0},flags);
    });

    it("should throw an error when JE has an invalid argument",function(){
      assert.throws(()=>Line.create(10,"JE",[]),InvalidInstructionException);
      assert.throws(()=>Line.create(10,"JE",["B"]),InvalidInstructionException);
    });
  });

  describe("jne",function(){
    it("should execute a jne with valid numeric value",function(){
      let line = Line.create(10,"JNE",["20"]);
      let currRegs = {A:0,B:0,C:0,D:0};
      let currFlags = {EQ:0,NE:1,GT:1,LT:0};
      let {currLine,regs,flags,nextLine} = line.execute(currRegs,currFlags);
      assert.equal(10,currLine);
      assert.equal("20",nextLine);
      assert.deepEqual({A:0,B:0,C:0,D:0},regs);
      assert.deepEqual({EQ:0,NE:1,GT:1,LT:0},flags);
    });

    it("should throw an error when JNE has an invalid argument",function(){
      assert.throws(()=>Line.create(10,"JNE",[]),InvalidInstructionException);
      assert.throws(()=>Line.create(10,"JNE",["B"]),InvalidInstructionException);
    });
  });

  describe("jlt",function(){
    it("should execute a jlt with valid numeric value",function(){
      let line = Line.create(10,"JLT",["20"]);
      let currRegs = {A:0,B:0,C:0,D:0};
      let currFlags = {EQ:0,NE:1,GT:0,LT:1};
      let {currLine,regs,flags,nextLine} = line.execute(currRegs,currFlags);
      assert.equal(10,currLine);
      assert.equal("20",nextLine);
      assert.deepEqual({A:0,B:0,C:0,D:0},regs);
      assert.deepEqual({EQ:0,NE:1,GT:0,LT:1},flags);
    });

    it("should throw an error when JLT has an invalid argument",function(){
      assert.throws(()=>Line.create(10,"JLT",[]),InvalidInstructionException);
      assert.throws(()=>Line.create(10,"JLT",["B"]),InvalidInstructionException);
    });
  });

  describe("jle",function(){
    it("should execute a jle with valid numeric value",function(){
      let line = Line.create(10,"JLE",["20"]);
      let currRegs = {A:0,B:0,C:0,D:0};
      let currFlags = {EQ:0,NE:1,GT:0,LT:1};
      let {currLine,regs,flags,nextLine} = line.execute(currRegs,currFlags);
      assert.equal(10,currLine);
      assert.equal("20",nextLine);
      assert.deepEqual({A:0,B:0,C:0,D:0},regs);
      assert.deepEqual({EQ:0,NE:1,GT:0,LT:1},flags);
    });

    it("should execute a jle with valid numeric value when EQ is set",function(){
      let line = Line.create(10,"JLE",["20"]);
      let currRegs = {A:0,B:0,C:0,D:0};
      let currFlags = {EQ:1,NE:0,GT:0,LT:0};
      let {currLine,regs,flags,nextLine} = line.execute(currRegs,currFlags);
      assert.equal(10,currLine);
      assert.equal("20",nextLine);
      assert.deepEqual({A:0,B:0,C:0,D:0},regs);
      assert.deepEqual({EQ:1,NE:0,GT:0,LT:0},flags);
    });

    it.skip("should throw an error when JLT has an invalid argument",function(){
      assert.throws(()=>Line.create(10,"JLT",[]),InvalidInstructionException);
      assert.throws(()=>Line.create(10,"JLT",["B"]),InvalidInstructionException);
    });
  });

});
