const assert = require('assert');
const Machine = require('../src/machine.js');
const InvalidInstructionException = require("../src/commands/InvalidInstructionException.js");

const stitch = (lines) => lines.join("\n");

describe("Machine loading",function(){
  it("should load a basic program without throwing an exception",function(){
    const machine = new Machine();
    const program = [
      "10 START",
      "20 STOP"
    ];
    assert.doesNotThrow(()=>machine.load(stitch(program)))
  });

  it("should throw an exception when there is an error in a line",function(){
    const machine = new Machine();
    const program = ["10 STAR"];
    assert.throws(() => machine.load(stitch(program)));
  });
});

describe("Machine execution",function(){
  it("should execute a basic program",function(){
    const machine = new Machine();
    const program = [
      "10 START",
      "20 MOV A,10",
      "30 STOP"
    ];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual({ A: 10, B: 0, C: 0, D: 0 }, machine.getRegs());
    assert.deepEqual({ NE: 0, EQ: 0, LT: 0, GT: 0 }, machine.getFlags());
  });

  it("should execute a program with jmp instructions",function(){
    const machine = new Machine();
    const program = [
      "10 START",
      "20 JMP 40",
      "30 MOV A,10",
      "40 STOP"
    ];
    machine.load(stitch(program));
    machine.execute();
    assert.deepEqual({ A: 0, B: 0, C: 0, D: 0 }, machine.getRegs());
    assert.deepEqual({ NE: 0, EQ: 0, LT: 0, GT: 0 }, machine.getFlags());
  });
});
