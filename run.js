const fs = require("fs");
const Machine = require("./src/machine.js");

let fooAsm=fs.readFileSync("./foo.asm","utf8");

let machine = new Machine();
machine.load(fooAsm);
machine.execute();
console.log(machine.getPrn().join("\n"));
