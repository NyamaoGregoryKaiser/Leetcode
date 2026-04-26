```typescript
/**
 * @file index.ts
 * @description Main entry point for the Bit Manipulation project.
 *              Can be used to demonstrate or test algorithms manually.
 */

import {
    countSetBits_brianKernighan,
    isPowerOfTwo_bitManipulation,
    reverseBits_iterative,
    singleNumber_xor,
    insertMIntoN_optimal,
} from './algorithms/bitManipulationProblems';
import { toBinaryString } from './utils/bitUtils';

console.log("--- Bit Manipulation Project Demo ---");

// Demo: Count Set Bits
const numCount = 2873345; // Binary: 101011110101010111001001
console.log(`\nProblem: Count Set Bits (Hamming Weight)`);
console.log(`Number: ${numCount} (Binary: ${toBinaryString(numCount, 24)})`);
const setBits = countSetBits_brianKernighan.solve(numCount);
console.log(`Number of set bits (Brian Kernighan): ${setBits}`); // Expected: 13

// Demo: Is Power of Two
const numPowerOfTwo = 1024;
const numNotPowerOfTwo = 1000;
console.log(`\nProblem: Is Power of Two`);
console.log(`Number: ${numPowerOfTwo} (Binary: ${toBinaryString(numPowerOfTwo, 11)})`);
console.log(`Is ${numPowerOfTwo} a power of two? ${isPowerOfTwo_bitManipulation.solve(numPowerOfTwo)}`); // Expected: true
console.log(`Number: ${numNotPowerOfTwo} (Binary: ${toBinaryString(numNotPowerOfTwo, 10)})`);
console.log(`Is ${numNotPowerOfTwo} a power of two? ${isPowerOfTwo_bitManipulation.solve(numNotPowerOfTwo)}`); // Expected: false

// Demo: Reverse Bits
const numToReverse: number = 0b00000010100101000001111010011100; // Example 32-bit number
console.log(`\nProblem: Reverse Bits`);
console.log(`Original: ${numToReverse} (Binary: ${toBinaryString(numToReverse, 32)})`);
const reversed = reverseBits_iterative.solve(numToReverse);
console.log(`Reversed: ${reversed} (Binary: ${toBinaryString(reversed, 32)})`); // Expected: 0b00111001011110000010100101000000

// Demo: Single Number
const arrSingle = [4, 1, 2, 1, 2];
console.log(`\nProblem: Single Number`);
console.log(`Array: [${arrSingle}]`);
const single = singleNumber_xor.solve(arrSingle);
console.log(`Single number: ${single}`); // Expected: 4

// Demo: Insert M into N
const N_insert = 0b10000000000; // 1024
const M_insert = 0b10011;      // 19
const i_insert = 2;
const j_insert = 6;
console.log(`\nProblem: Insert M into N`);
console.log(`N: ${toBinaryString(N_insert, 11)}`);
console.log(`M: ${toBinaryString(M_insert, 5)}`);
console.log(`Insert M into N from bit ${i_insert} to ${j_insert}.`);
const resultInsert = insertMIntoN_optimal.solve({ N: N_insert, M: M_insert, i: i_insert, j: j_insert });
console.log(`Result: ${toBinaryString(resultInsert, 11)}`); // Expected: 10001001100 (1092)

console.log("\n--- Demo End ---");
```