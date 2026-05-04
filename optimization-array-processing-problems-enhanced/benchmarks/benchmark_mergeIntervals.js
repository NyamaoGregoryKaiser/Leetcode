```javascript
/**
 * benchmarks/benchmark_mergeIntervals.js
 * Benchmark for Problem 2: Merge Intervals
 * Compares `mergeIntervalsOptimal`. (No brute force implemented due to extreme inefficiency).
 */

const { performance } = require('perf_hooks');
const { mergeIntervalsOptimal } = require('../src/problems/problem2_mergeIntervals');
const { shallowCopyArray } = require('../src/utils/arrayUtils');

// Helper function to generate random intervals
function generateRandomIntervals(count, maxVal, maxOverlapRange) {
    const intervals = [];
    for (let i = 0; i < count; i++) {
        const start = Math.floor(Math.random() * maxVal);
        const end = start + Math.floor(Math.random() * maxOverlapRange) + 1; // Ensure end > start
        intervals.push([start, end]);
    }
    return intervals;
}

function benchmarkFunction(name, fn, intervals, iterations = 100) {
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        const intervalsCopy = shallowCopyArray(intervals.map(int => shallowCopyArray(int))); // Deep copy for intervals
        const start = performance.now();
        fn(intervalsCopy);
        const end = performance.now();
        totalTime += (end - start);
    }
    console.log(`  ${name}: ${totalTime.toFixed(4)} ms (average over ${iterations} runs)`);
}

async function run() {
    console.log("Benchmarking Merge Intervals implementations:");

    const testCases = [
        { name: "Small intervals (N=100, maxVal=1000, overlap=50)", size: 100, maxVal: 1000, maxOverlap: 50 },
        { name: "Medium intervals (N=1000, maxVal=10000, overlap=500)", size: 1000, maxVal: 10000, maxOverlap: 500 },
        { name: "Large intervals (N=10000, maxVal=100000, overlap=5000)", size: 10000, maxVal: 100000, maxOverlap: 5000 },
        { name: "Very Large intervals (N=100000, maxVal=1000000, overlap=50000)", size: 100000, maxVal: 1000000, maxOverlap: 50000 },
        { name: "Large (Few Overlaps) (N=10000, maxVal=100000, overlap=10)", size: 10000, maxVal: 100000, maxOverlap: 10 },
        { name: "Large (Many Overlaps) (N=10000, maxVal=10000, overlap=5000)", size: 10000, maxVal: 10000, maxOverlap: 5000 },
    ];

    for (const tc of testCases) {
        const intervals = generateRandomIntervals(tc.size, tc.maxVal, tc.maxOverlap);
        const iterations = tc.size < 10000 ? 100 : 10;

        console.log(`\n${tc.name}`);
        benchmarkFunction('Optimal (Sort and Merge)', mergeIntervalsOptimal, intervals, iterations);
        console.log("  Note: Brute force (O(N^2) or worse) is not benchmarked due to extreme inefficiency.");
    }
}

module.exports = { run };
```