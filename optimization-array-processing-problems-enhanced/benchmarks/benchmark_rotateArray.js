```javascript
/**
 * benchmarks/benchmark_rotateArray.js
 * Benchmark for Problem 1: Rotate Array
 * Compares `rotateArrayByExtraArray`, `rotateArrayByReversal`, `rotateArrayBySplice`.
 */

const { performance } = require('perf_hooks');
const {
    rotateArrayByExtraArray,
    rotateArrayByReversal,
    rotateArrayBySplice
} = require('../src/problems/problem1_rotateArray');
const { shallowCopyArray, generateRandomArray } = require('../src/utils/arrayUtils');

function benchmarkFunction(name, fn, array, k, iterations = 100) {
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arrCopy = shallowCopyArray(array); // Ensure original array is not modified across runs
        const start = performance.now();
        fn(arrCopy, k);
        const end = performance.now();
        totalTime += (end - start);
    }
    console.log(`  ${name}: ${totalTime.toFixed(4)} ms (average over ${iterations} runs)`);
    return totalTime / iterations;
}

async function run() {
    console.log("Benchmarking Rotate Array implementations:");

    const testCases = [
        { name: "Small array (N=100, k=30)", size: 100, k: 30 },
        { name: "Medium array (N=1000, k=300)", size: 1000, k: 300 },
        { name: "Large array (N=10000, k=3000)", size: 10000, k: 3000 },
        { name: "Very Large array (N=100000, k=30000)", size: 100000, k: 30000 },
        { name: "Very Large array (N=100000, k=1)", size: 100000, k: 1 }, // Small k
        { name: "Very Large array (N=100000, k=99999)", size: 100000, k: 99999 }, // Large k
    ];

    for (const tc of testCases) {
        const nums = generateRandomArray(tc.size, 1, 1000); // Numbers 1-1000
        const k = tc.k;
        const iterations = tc.size < 10000 ? 1000 : tc.size < 100000 ? 100 : 10; // More iterations for smaller arrays

        console.log(`\n${tc.name}`);
        const timeExtraArray = benchmarkFunction('Extra Array (O(N) space)', rotateArrayByExtraArray, nums, k, iterations);
        const timeReversal = benchmarkFunction('Reversal (O(1) space - Optimal)', rotateArrayByReversal, nums, k, iterations);
        const timeSplice = benchmarkFunction('Splice/Unshift (O(N) space)', rotateArrayBySplice, nums, k, iterations);

        // Optional: Compare and highlight best
        const minTime = Math.min(timeExtraArray, timeReversal, timeSplice);
        if (minTime === timeReversal) {
            console.log("  Reversal method is generally the fastest for larger N.");
        } else if (minTime === timeExtraArray) {
            console.log("  Extra Array method might be slightly faster for small N due to less overhead.");
        } else {
             console.log("  Splice/Unshift might be competitive for small N or specific JS engine optimizations.");
        }
    }
}

module.exports = { run };
```