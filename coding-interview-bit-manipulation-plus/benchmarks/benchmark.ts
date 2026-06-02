```typescript
/**
 * benchmarks/benchmark.ts
 *
 * This file contains performance benchmarking code for comparing different
 * bit manipulation algorithm implementations. It uses `console.time` and
 * `performance.now()` for simple time measurement and provides insights
 * into the relative speed of various approaches.
 *
 * To run this benchmark, use: `npm run benchmark`
 */

import {
    countSetBitsSimple,
    countSetBitsBrianKernighan,
    singleNumber,
    singleNumberHashMap,
    isPowerOfTwo,
    isPowerOfTwoIterative,
    reverseBits
} from '../src/bitManipulation';
import { performance } from 'perf_hooks'; // Node.js specific for high-resolution timing

// --- Helper for consistent benchmarking output ---
function benchmarkFunction(name: string, func: Function, ...args: any[]): number {
    const start = performance.now();
    func(...args);
    const end = performance.now();
    const duration = end - start;
    // console.log(`  ${name}: ${duration.toFixed(4)} ms`);
    return duration;
}

function printBenchmarkResults(title: string, results: { name: string; time: number }[]) {
    console.log(`\n--- ${title} ---`);
    results.sort((a, b) => a.time - b.time); // Sort by fastest first
    results.forEach((res, index) => {
        console.log(`  ${index + 1}. ${res.name}: ${res.time.toFixed(4)} ms`);
    });
}

console.log("Starting Bit Manipulation Benchmarks...");

// --- Benchmark Data ---

// For countSetBits
const NUM_ITERATIONS_COUNT_BITS = 1_000_000;
const testNumbersCountBits: number[] = [
    0, 1, 10, 12345, 0x0F0F0F0F, 0xAAAAAAAA, 0xFFFFFFFF,
    Math.floor(Math.random() * 0xFFFFFFFF),
    Math.floor(Math.random() * 0xFFFFFFFF),
    Math.floor(Math.random() * 0xFFFFFFFF),
];

// For singleNumber
const NUM_ARRAY_ELEMENTS = 1_000_000;
const singleNumberArray: number[] = [];
for (let i = 0; i < NUM_ARRAY_ELEMENTS / 2; i++) {
    const val = Math.floor(Math.random() * 1_000_000_000);
    singleNumberArray.push(val, val);
}
const uniqueValue = Math.floor(Math.random() * 1_000_000_000) + 1_000_000_000; // Ensure it's unique
singleNumberArray.push(uniqueValue);
// Shuffle to make sure the unique value is not always at the end
for (let i = singleNumberArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [singleNumberArray[i], singleNumberArray[j]] = [singleNumberArray[j], singleNumberArray[i]];
}

// For isPowerOfTwo
const NUM_ITERATIONS_POWER_OF_TWO = 5_000_000;
const testNumbersPowerOfTwo: number[] = [];
for (let i = 0; i < 100; i++) {
    testNumbersPowerOfTwo.push(2 ** i); // Powers of 2
    testNumbersPowerOfTwo.push(2 ** i + 1); // Not powers of 2
    testNumbersPowerOfTwo.push(Math.floor(Math.random() * 2 ** 31)); // Random numbers
}
testNumbersPowerOfTwo.push(0, 3, 5, 6, 15, 1023, 2147483648); // Specific cases

// For reverseBits
const NUM_ITERATIONS_REVERSE_BITS = 1_000_000;
const testNumbersReverseBits: number[] = [
    0, 1, 0xFFFFFFFF, 0xAAAAAAAA, 0x55555555, 43261596, 2147483648,
    Math.floor(Math.random() * 0xFFFFFFFF),
    Math.floor(Math.random() * 0xFFFFFFFF),
    Math.floor(Math.random() * 0xFFFFFFFF),
];


// --- Run Benchmarks ---

// 1. Counting Set Bits
const countBitsResults: { name: string; time: number }[] = [];
let totalTimeSimple = 0;
let totalTimeKernighan = 0;

for (let i = 0; i < NUM_ITERATIONS_COUNT_BITS; i++) {
    const n = testNumbersCountBits[i % testNumbersCountBits.length];
    totalTimeSimple += benchmarkFunction('Simple', countSetBitsSimple, n);
    totalTimeKernighan += benchmarkFunction('Brian Kernighan', countSetBitsBrianKernighan, n);
}
countBitsResults.push({ name: `countSetBitsSimple (${NUM_ITERATIONS_COUNT_BITS} ops)`, time: totalTimeSimple });
countBitsResults.push({ name: `countSetBitsBrianKernighan (${NUM_ITERATIONS_COUNT_BITS} ops)`, time: totalTimeKernighan });
printBenchmarkResults('Counting Set Bits', countBitsResults);

// 2. Single Number
const singleNumberResults: { name: string; time: number }[] = [];
const singleNumberArrayCopy1 = [...singleNumberArray]; // Ensure identical input
const singleNumberArrayCopy2 = [...singleNumberArray]; // Ensure identical input

singleNumberResults.push({
    name: `singleNumber (XOR, ${NUM_ARRAY_ELEMENTS} elements)`,
    time: benchmarkFunction('singleNumber', singleNumber, singleNumberArrayCopy1)
});
singleNumberResults.push({
    name: `singleNumberHashMap (HashMap, ${NUM_ARRAY_ELEMENTS} elements)`,
    time: benchmarkFunction('singleNumberHashMap', singleNumberHashMap, singleNumberArrayCopy2)
});
printBenchmarkResults('Single Number', singleNumberResults);


// 3. Power of Two
const isPowerOfTwoResults: { name: string; time: number }[] = [];
let totalTimeBitwise = 0;
let totalTimeIterative = 0;

for (let i = 0; i < NUM_ITERATIONS_POWER_OF_TWO; i++) {
    const n = testNumbersPowerOfTwo[i % testNumbersPowerOfTwo.length];
    totalTimeBitwise += benchmarkFunction('Bitwise AND', isPowerOfTwo, n);
    totalTimeIterative += benchmarkFunction('Iterative Division', isPowerOfTwoIterative, n);
}
isPowerOfTwoResults.push({ name: `isPowerOfTwo (Bitwise AND, ${NUM_ITERATIONS_POWER_OF_TWO} ops)`, time: totalTimeBitwise });
isPowerOfTwoResults.push({ name: `isPowerOfTwoIterative (Iterative, ${NUM_ITERATIONS_POWER_OF_TWO} ops)`, time: totalTimeIterative });
printBenchmarkResults('Power of Two', isPowerOfTwoResults);


// 4. Reverse Bits
const reverseBitsResults: { name: string; time: number }[] = [];
let totalTimeReverseBits = 0;

for (let i = 0; i < NUM_ITERATIONS_REVERSE_BITS; i++) {
    const n = testNumbersReverseBits[i % testNumbersReverseBits.length];
    totalTimeReverseBits += benchmarkFunction('reverseBits', reverseBits, n);
}
reverseBitsResults.push({ name: `reverseBits (${NUM_ITERATIONS_REVERSE_BITS} ops)`, time: totalTimeReverseBits });
printBenchmarkResults('Reverse Bits', reverseBitsResults);

console.log("\nBenchmarks finished.");
```