# Assembly Simulator

This project is a small simulator that combines BASIC like line numbers and assembly like instructions to help teach the basics of computing.


1. [Installation](#installation)
2. [Usage](#usage)
3. [Architecture](#architecture)
4. [Instruction Set](#instruction-set)

### Installation

`npm install https://github.com/step/assembly_simulator.git`


### Usage

```javascript
const Machine = require('assembly_simulator');
machine = new Machine();
machine.load('10 START\n20 PRN "HELLO"\n30 STOP');
machine.execute();
console.log(machine.getPrn().join("\n"));
```


### Architecture

The "Machine" has 4 registers `A, B, C, D`.

There are 4 flags that are set on the compare instruction.

1. EQ - this is set when two values are equal
2. NE - this is set when two values are not equal
3. GT - this is set when the value of the first argument is greater than the second one.
4. LT - this is set when the value of the first argument is lesser than the second one.

The "Machine" only recognises positive integers for now.

### Instruction Set
1. **START**

   Starts execution and resets flags. Used at the start of a program, often as `10 START`.


2. **MOV**

   Copies a value into a register. First argument has to be a register. Second argument can either be a register or a positive integer.

   Valid uses
   ```
   10 MOV A,2   ;; Copies 2 into A
   20 MOV B,A   ;; Copies A's value into B.
   ```

   Invalid uses
   ```
   10 MOV 2,2
   20 MOV 2,A
   ```

3. **ADD**

   Adds a value with a register and copies the new value into the register. First argument has to be a register. Second argument can either be a register or a positive integer.

   Valid uses
   ```
   10 ADD A,2   ;; Adds 2 to A and puts it back in A
   20 ADD B,A   ;; Adds A to B and puts it back in B
   ```
   Invalid uses
   ```
   10 ADD 2,2
   20 ADD 2,A
   ```

4. **CMP**

   The compare instruction sets flags. Based on the arguments it sets one or more flags. The first argument has to be a register. The second argument can be either a positive integer or a register.

   `CMP A,10` will set the `EQ` flag if A is 10.

   `CMP A,10` will set the `NE` and `GT` flag if A is 12.

   `CMP A,10` will set the `NE` and `LT` flag if A is 8.

   Valid uses
   ```
   10 CMP A, 2  ;; will set LT if A<2 or GT if A>2
   20 CMP A, B  ;; will set LT if A<B or GT if A>B
   ```

   Invalid uses
   ```
   10 CMP 2,2
   20 CMP 2,A
   ```
5. **JMP**
6. **JE**
7. **JNE**
8. **JGT**
9. **JGE**
10. **JLT**
11. **JLE**
12. **STOP**
