![CircleCI](https://circleci.com/gh/step/assembly_simulator.svg?style=shield)

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

0. **Comments**

   Comments can be entered by starting a line with `;`. The first non-space character has to be a `;` for it to be considered a comment.

   Valid uses
   ```
   ; This is a comment
      ; this is also a comment
   ```

   Invalid uses
   ```
   10 START ; comments cannot be placed after an instruction
   this is also not a comment
   ```
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

   The `JMP` instruction unconditionally continues execution from the line specified. `JMP` and all other jump instructions leave the registers and flags unmodified. `JMP` takes one argument and that argument has to be a line number.

   Valid uses
   ```
   70 JMP 80
   70 JMP 60
   ```

   Invalid uses
   ```
   10 JMP A
   20 JMP "10"
   ```

6. **JE**

   `JE` is a conditional jump instruction that only jumps to a specified line if the `EQ` flag is set. If `EQ` is not set, then the execution continues normally.

   Valid uses
   ```
   10 JE 50
   20 JE 10
   ```

   Invalid uses
   ```
   10 JE A
   20 JE "10"
   ```

7. **JNE**

   `JNE` is a conditional jump instruction that only jumps to a specified line if the `NE` flag is set. If `NE` is not set, then the execution continues normally.

   Valid uses
   ```
   10 JNE 50
   20 JNE 10
   ```

   Invalid uses
   ```
   10 JNE A
   20 JNE "10"
   ```

8. **JGT**

   `JGT` is a conditional jump instruction that only jumps to a specified line if the `GT` flag is set. If `GT` is not set, then the execution continues normally.

   Valid uses
   ```
   10 JGT 50
   20 JGT 10
   ```

   Invalid uses
   ```
   10 JGT A
   20 JGT "10"
   ```

9. **JGE**

   `JGE` is a conditional jump instruction that only jumps to a specified line if the `GT` or `EQ` flags are set. If `GT` or `EQ` are not set, then the execution continues normally.

   Valid uses
   ```
   10 JGE 50
   20 JGE 10
   ```

   Invalid uses
   ```
   10 JGE A
   20 JGE "10"
   ```

10. **JLT**

   `JLT` is a conditional jump instruction that only jumps to a specified line if the `LT` flag is set. If `LT` is not set, then the execution continues normally.

   Valid uses
   ```
   10 JLT 50
   20 JLT 10
   ```

   Invalid uses
   ```
   10 JLT A
   20 JLT "10"
   ```

11. **JLE**

   `JLE` is a conditional jump instruction that only jumps to a specified line if the `LT` or `EQ` flags are set. If `LT` or `EQ` are not set, then the execution continues normally.

   Valid uses
   ```
   10 JLE 50
   20 JLE 10
   ```

   Invalid uses
   ```
   10 JLE A
   20 JLE "10"
   ```

12. **STOP**

   The `STOP` instruction halts execution entirely. It does not take an argument.

   Valid uses
   ```
   100 STOP
   ```

   Invalid uses
   ```
   100 STOP 10
   100 STOP A
   ```
