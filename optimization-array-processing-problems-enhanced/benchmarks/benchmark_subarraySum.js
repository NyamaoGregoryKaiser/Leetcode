```javascript
/**
 * benchmarks/benchmark_subarraySum.js
 * Benchmark for Problem 3: Subarray Sum Equals K
 * Compares `subarraySumBruteForce` and `subarraySumOptimal`.
 */

const { performance } = require('perf_hooks');
const {
    subarraySumBruteForce,
    subarraySumOptimal
} = require('../src/problems/problem3_subarraySum');
const { generateRandomArray } = require('../src/utils/arrayUtils');

function benchmarkFunction(name, fn, array, k, iterations = 100) {
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        // No need to copy array if function doesn't modify it
        const start = performance.now();
        fn(array, k);
        const end = performance.now();
        totalTime += (end - start);
    }
    console.log(`  ${name}: ${totalTime.toFixed(4)} ms (average over ${iterations} runs)`);
    return totalTime / iterations;
}

async function run() {
    console.log("Benchmarking Subarray Sum Equals K implementations:");

    const testCases = [
        { name: "Small array (N=100)", size: 100, k: 50 },
        { name: "Medium array (N=1000)", size: 1000, k: 500 },
        // Brute force becomes too slow for N=10000 or larger
        // { name: "Large array (N=10000)", size: 10000, k: 5000 },
    ];

    const optimalTestCases = [
        { name: "Large array (N=10000)", size: 10000, k: 5000 },
        { name: "Very Large array (N=50000)", size: 50000, k: 25000 },
    ];

    for (const tc of testCases) {
        const nums = generateRandomArray(tc.size, -100, 100); // Numbers between -100 and 100
        const k = tc.k;
        const iterations = tc.size < 1000 ? 1000 : 100;

        console.log(`\n${tc.name}`);
        const timeBruteForce = benchmarkFunction('Brute Force (O(N^2))', subarraySumBruteForce, nums, k, iterations);
        const timeOptimal = benchmarkFunction('Optimal (Prefix Sums + Map, O(N))', subarraySumOptimal, nums, k, iterations);

        const speedup = timeBruteForce / timeOptimal;
        if (speedup > 1) {
            console.log(`  Optimal is ~${speedup.toFixed(2)}x faster than Brute Force.`);
        }
    }

    // Run optimal solution on larger inputs where brute force would fail
    console.log("\nBenchmarking Optimal solution on larger inputs:");
    for (const tc of optimalTestCases) {
        const nums = generateRandomArray(tc.size, -100, 100);
        const k = tc.k;
        const iterations = tc.size < 20000 ? 100 : 10;
        console.log(`\n${tc.name}`);
        benchmarkFunction('Optimal (Prefix Sums + Map, O(N))', subarraySumOptimal, nums, k, iterations);
    }
}

module.exports = { run };
```