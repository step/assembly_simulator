const fs = require("fs");
const parse=require("./src/parse.js");
const Line = require("./src/line.js");
const Lines = require("./src/lines.js");
const Executor = require("./src/executor.js");

let fooAsm=fs.readFileSync("./foo.asm","utf8");
let lines=new Lines();
let instructions=fooAsm.trim().split(/\n/);
instructions.forEach(instruction=>{
  let {lineNumber,command,args}=parse(instruction);
  let line=Line.create(lineNumber,command,args);
  lines.add(line);
});

let executor = new Executor();
executor.execute(lines);
console.log(executor.getPrn().join("\n"));
