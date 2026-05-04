```javascript
/**
 * benchmarks/benchmark_findDuplicate.js
 * Benchmark for Problem 5: Find the Duplicate Number
 * Compares `findDuplicateHashSet`, `findDuplicateSorting`, `findDuplicateFloyd`.
 */

const { performance } = require('perf_hooks');
const {
    findDuplicateHashSet,
    findDuplicateSorting,
    findDuplicateFloyd
} = require('../src/problems/problem5_findDuplicate');
const { shallowCopyArray, generateArrayWithOneDuplicate } = require('../src/utils/arrayUtils');

function benchmarkFunction(name, fn, array, allowsModification = false, iterations = 100) {
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        const arrToUse = allowsModification ? shallowCopyArray(array) : array; // Copy only if modification allowed
        const start = performance.now();
        fn(arrToUse);
        const end = performance.now();
        totalTime += (end - start);
    }
    console.log(`  ${name}: ${totalTime.toFixed(4)} ms (average over ${iterations} runs)`);
    return totalTime / iterations;
}

async function run() {
    console.log("Benchmarking Find Duplicate Number implementations:");

    const testCases = [
        { name: "Small array (n=100)", n: 100 },
        { name: "Medium array (n=1000)", n: 1000 },
        { name: "Large array (n=10000)", n: 10000 },
        { name: "Very Large array (n=50000)", n: 50000 },
        { name: "Max Constraint array (n=100000)", n: 100000 },
    ];

    for (const tc of testCases) {
        const nums = generateArrayWithOneDuplicate(tc.n); // Array of n+1 elements, range [1, n]
        const iterations = tc.n < 10000 ? 100 : 10;

        console.log(`\n${tc.name} (Array length: ${tc.n + 1})`);
        const timeHashSet = benchmarkFunction('Hash Set (O(N) time, O(N) space)', findDuplicateHashSet, nums, false, iterations);
        // Note: findDuplicateSorting modifies the array, so we must copy for each iteration
        const timeSorting = benchmarkFunction('Sorting (O(N log N) time, O(N) space)', findDuplicateSorting, nums, true, iterations);
        const timeFloyd = benchmarkFunction('Floyd\'s Cycle Detection (O(N) time, O(1) space - Optimal)', findDuplicateFloyd, nums, false, iterations);

        const bestTime = Math.min(timeHashSet, timeSorting, timeFloyd);
        if (bestTime === timeFloyd) {
            console.log("  Floyd's Cycle Detection is often the most performant O(N) approach.");
        } else if (bestTime === timeHashSet) {
            console.log("  Hash Set can be very fast due to constant time lookups on average.");
        } else {
            console.log("  Sorting is typically slower due to N log N complexity.");
        }
    }
}

module.exports = { run };
```