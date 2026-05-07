```javascript
const {
    rotateArrayBruteForce,
    rotateArrayExtraSpace,
    rotateArrayReversal,
    rotateArrayCyclicReplacement
} = require('../src/algorithms/arrayManipulation');

const { generateRandomArray } = require('../src/algorithms/utils');

/**
 * Performance Benchmarking for Array Rotation Algorithms.
 * This script compares the execution time of different array rotation methods.
 *
 * To run: `npm run test:performance`
 */

function runBenchmark(name, func, arr, k, iterations = 1) {
    // Deep copy the array for each iteration to ensure a fresh start
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        const testArr = JSON.parse(JSON.stringify(arr));
        const start = process.hrtime.bigint();
        func(testArr, k);
        const end = process.hrtime.bigint();
        totalTime += Number(end - start); // Convert BigInt to number for summation
    }
    const avgTimeMs = (totalTime / BigInt(iterations)) / 1_000_000; // Convert nanoseconds to milliseconds
    console.log(`- ${name}: ${avgTimeMs.toFixed(3)} ms (avg over ${iterations} runs)`);
    return avgTimeMs;
}

console.log('--- Array Rotation Performance Benchmarks ---');

const smallArraySize = 1000;
const mediumArraySize = 10000;
const largeArraySize = 100000;
const veryLargeArraySize = 1000000; // Caution: Brute force will be very slow here

const rotationK = 50; // Constant rotation amount for testing

const iterationsSmall = 1000;
const iterationsMedium = 100;
const iterationsLarge = 10;
const iterationsVeryLarge = 1; // Only a few runs for very large arrays for brute force

console.log('\nBenchmarking with different array sizes:');

// --- Small Array ---
console.log(`\nArray Size: ${smallArraySize}, k: ${rotationK}, Iterations: ${iterationsSmall}`);
const smallArr = generateRandomArray(smallArraySize, 1, 100);
runBenchmark('Brute Force (O(NK))', rotateArrayBruteForce, smallArr, rotationK, iterationsSmall);
runBenchmark('Extra Space (O(N))', rotateArrayExtraSpace, smallArr, rotationK, iterationsSmall);
runBenchmark('Reversal (O(N))', rotateArrayReversal, smallArr, rotationK, iterationsSmall);
runBenchmark('Cyclic Replacement (O(N))', rotateArrayCyclicReplacement, smallArr, rotationK, iterationsSmall);

// --- Medium Array ---
console.log(`\nArray Size: ${mediumArraySize}, k: ${rotationK}, Iterations: ${iterationsMedium}`);
const mediumArr = generateRandomArray(mediumArraySize, 1, 100);
// Brute force will be very slow here, skipping to save time
// runBenchmark('Brute Force (O(NK))', rotateArrayBruteForce, mediumArr, rotationK, iterationsMedium);
runBenchmark('Extra Space (O(N))', rotateArrayExtraSpace, mediumArr, rotationK, iterationsMedium);
runBenchmark('Reversal (O(N))', rotateArrayReversal, mediumArr, rotationK, iterationsMedium);
runBenchmark('Cyclic Replacement (O(N))', rotateArrayCyclicReplacement, mediumArr, rotationK, iterationsMedium);

// --- Large Array ---
console.log(`\nArray Size: ${largeArraySize}, k: ${rotationK}, Iterations: ${iterationsLarge}`);
const largeArr = generateRandomArray(largeArraySize, 1, 100);
// Brute force is too slow, skipping
// runBenchmark('Brute Force (O(NK))', rotateArrayBruteForce, largeArr, rotationK, iterationsLarge);
runBenchmark('Extra Space (O(N))', rotateArrayExtraSpace, largeArr, rotationK, iterationsLarge);
runBenchmark('Reversal (O(N))', rotateArrayReversal, largeArr, rotationK, iterationsLarge);
runBenchmark('Cyclic Replacement (O(N))', rotateArrayCyclicReplacement, largeArr, rotationK, iterationsLarge);

// --- Very Large Array (Focus on O(N) methods) ---
console.log(`\nArray Size: ${veryLargeArraySize}, k: ${rotationK}, Iterations: ${iterationsVeryLarge}`);
const veryLargeArr = generateRandomArray(veryLargeArraySize, 1, 100);
// Brute force is impossibly slow for 1M elements.
// runBenchmark('Brute Force (O(NK))', rotateArrayBruteForce, veryLargeArr, rotationK, iterationsVeryLarge);
runBenchmark('Extra Space (O(N))', rotateArrayExtraSpace, veryLargeArr, rotationK, iterationsVeryLarge);
runBenchmark('Reversal (O(N))', rotateArrayReversal, veryLargeArr, rotationK, iterationsVeryLarge);
runBenchmark('Cyclic Replacement (O(N))', rotateArrayCyclicReplacement, veryLargeArr, rotationK, iterationsVeryLarge);

console.log('\n--- Benchmarking Complete ---');
console.log('Observations:');
console.log('  - Brute force (O(NK)) quickly becomes impractical as N or K increases.');
console.log('  - The O(N) methods (Extra Space, Reversal, Cyclic Replacement) scale much better.');
console.log('  - Among O(N) methods, "Reversal" and "Extra Space" are often slightly faster in JavaScript due to ' +
            'optimized native array operations and memory access patterns. "Cyclic Replacement" can incur more overhead ' +
            'with individual element swaps, especially for larger N.');
console.log('  - The exact performance can vary based on Node.js version, hardware, and specific `k` values.');

```