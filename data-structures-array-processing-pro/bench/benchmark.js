```javascript
/**
 * @fileoverview Performance benchmarking script for Array Manipulation problems.
 * Compares the execution time of different approaches for each problem.
 */

const {
    rotateArray_tempArray,
    rotateArray_reverse,
    rotateArray_cyclicReplacement
} = require('../src/problems/rotateArray');

const {
    maxSubarraySum_bruteForce,
    maxSubarraySum_kadane
} = require('../src/problems/maxSubarraySum');

const {
    trappingRainWater_bruteForce,
    trappingRainWater_dp,
    trappingRainWater_twoPointers
} = require('../src/problems/trappingRainWater');

const {
    productExceptSelf_division,
    productExceptSelf_twoPass
} = require('../src/problems/productExceptSelf');

// --- Helper for deep copying arrays for in-place modifications ---
const createDeepCopy = (arr) => arr.slice();

// --- Benchmark Runner Function ---
function runBenchmark(name, fn, args, iterations = 10000) {
    let results = [];
    for (let i = 0; i < iterations; i++) {
        // Deep copy args if the function modifies them in place
        const currentArgs = args.map(arg => Array.isArray(arg) ? createDeepCopy(arg) : arg);
        const start = process.hrtime.bigint();
        fn(...currentArgs);
        const end = process.hrtime.bigint();
        results.push(Number(end - start)); // Convert BigInt to Number for calculations
    }

    const totalTime = results.reduce((sum, time) => sum + time, 0);
    const avgTimeNs = totalTime / iterations;
    const avgTimeMs = avgTimeNs / 1_000_000;

    console.log(`  ${name}: ${avgTimeMs.toFixed(4)} ms (avg over ${iterations} runs)`);
    return avgTimeNs;
}

// --- Test Data Generation ---
function generateRandomArray(length, min, max) {
    return Array.from({
        length
    }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// --- Main Benchmarking Logic ---
console.log('--- Benchmarking Array Manipulation Algorithms ---');

// --- Problem: Rotate Array ---
console.log('\nProblem: Rotate Array (Array Length: 1000, k: 300)');
let numsToRotate = generateRandomArray(1000, -100, 100);
let kRotate = 300;
runBenchmark('rotateArray_tempArray', rotateArray_tempArray, [numsToRotate, kRotate]);
runBenchmark('rotateArray_reverse', rotateArray_reverse, [numsToRotate, kRotate]);
runBenchmark('rotateArray_cyclicReplacement', rotateArray_cyclicReplacement, [numsToRotate, kRotate]);

console.log('\nProblem: Rotate Array (Array Length: 10000, k: 3000)');
numsToRotate = generateRandomArray(10000, -1000, 1000);
kRotate = 3000;
runBenchmark('rotateArray_tempArray', rotateArray_tempArray, [numsToRotate, kRotate], 1000);
runBenchmark('rotateArray_reverse', rotateArray_reverse, [numsToRotate, kRotate], 1000);
runBenchmark('rotateArray_cyclicReplacement', rotateArray_cyclicReplacement, [numsToRotate, kRotate], 1000);

// --- Problem: Max Subarray Sum ---
console.log('\nProblem: Max Subarray Sum (Array Length: 1000)');
let numsForMaxSubarray = generateRandomArray(1000, -100, 100);
runBenchmark('maxSubarraySum_bruteForce (O(N^2))', maxSubarraySum_bruteForce, [numsForMaxSubarray]);
runBenchmark('maxSubarraySum_kadane (O(N))', maxSubarraySum_kadane, [numsForMaxSubarray]);

console.log('\nProblem: Max Subarray Sum (Array Length: 5000)');
numsForMaxSubarray = generateRandomArray(5000, -100, 100);
runBenchmark('maxSubarraySum_bruteForce (O(N^2))', maxSubarraySum_bruteForce, [numsForMaxSubarray], 100); // Reduce iterations for O(N^2)
runBenchmark('maxSubarraySum_kadane (O(N))', maxSubarraySum_kadane, [numsForMaxSubarray]);

console.log('\nProblem: Max Subarray Sum (Array Length: 20000)');
numsForMaxSubarray = generateRandomArray(20000, -100, 100);
// Omitting brute force for very large N due to extreme runtime
// runBenchmark('maxSubarraySum_bruteForce (O(N^2))', maxSubarraySum_bruteForce, [numsForMaxSubarray], 1);
runBenchmark('maxSubarraySum_kadane (O(N))', maxSubarraySum_kadane, [numsForMaxSubarray], 1000);


// --- Problem: Trapping Rain Water ---
console.log('\nProblem: Trapping Rain Water (Array Length: 1000)');
let heights = generateRandomArray(1000, 0, 1000);
runBenchmark('trappingRainWater_bruteForce (O(N^2))', trappingRainWater_bruteForce, [heights]);
runBenchmark('trappingRainWater_dp (O(N) Time, O(N) Space)', trappingRainWater_dp, [heights]);
runBenchmark('trappingRainWater_twoPointers (O(N) Time, O(1) Space)', trappingRainWater_twoPointers, [heights]);

console.log('\nProblem: Trapping Rain Water (Array Length: 5000)');
heights = generateRandomArray(5000, 0, 10000);
runBenchmark('trappingRainWater_bruteForce (O(N^2))', trappingRainWater_bruteForce, [heights], 10); // Reduce iterations
runBenchmark('trappingRainWater_dp (O(N) Time, O(N) Space)', trappingRainWater_dp, [heights], 100);
runBenchmark('trappingRainWater_twoPointers (O(N) Time, O(1) Space)', trappingRainWater_twoPointers, [heights], 100);

console.log('\nProblem: Trapping Rain Water (Array Length: 20000)');
heights = generateRandomArray(20000, 0, 100000);
// Omitting brute force for very large N due to extreme runtime
runBenchmark('trappingRainWater_dp (O(N) Time, O(N) Space)', trappingRainWater_dp, [heights], 100);
runBenchmark('trappingRainWater_twoPointers (O(N) Time, O(1) Space)', trappingRainWater_twoPointers, [heights], 100);


// --- Problem: Product of Array Except Self ---
console.log('\nProblem: Product of Array Except Self (Array Length: 1000)');
let numsForProduct = generateRandomArray(1000, -30, 30).map(val => val === 0 ? Math.random() > 0.9 ? 0 : val : val); // Occasionally include zero
runBenchmark('productExceptSelf_division (O(N))', productExceptSelf_division, [numsForProduct]);
runBenchmark('productExceptSelf_twoPass (O(N))', productExceptSelf_twoPass, [numsForProduct]);

console.log('\nProblem: Product of Array Except Self (Array Length: 10000)');
numsForProduct = generateRandomArray(10000, -30, 30).map(val => val === 0 ? Math.random() > 0.95 ? 0 : val : val); // Occasionally include zero
runBenchmark('productExceptSelf_division (O(N))', productExceptSelf_division, [numsForProduct], 1000);
runBenchmark('productExceptSelf_twoPass (O(N))', productExceptSelf_twoPass, [numsForProduct], 1000);

console.log('\n--- Benchmarking Complete ---');
```