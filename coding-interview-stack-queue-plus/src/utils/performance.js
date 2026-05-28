```javascript
const {
    MyQueue,
    MyStack,
    isValid,
    maxSlidingWindow,
    trap
} = require('../algorithms/stack-queue-problems');

/**
 * Utility function to benchmark the performance of a given function.
 * @param {string} name - Name of the function/algorithm being benchmarked.
 * @param {Function} func - The function to benchmark.
 * @param {Array} args - An array of arguments to pass to the function.
 * @param {number} iterations - Number of times to run the function for averaging.
 * @returns {Object} An object containing the name, average time, and total time.
 */
function benchmark(name, func, args, iterations = 1000) {
    let totalTime = 0;
    let result; // To store the result of the last run, useful for verification

    for (let i = 0; i < iterations; i++) {
        const start = process.hrtime.bigint();
        // Use spread operator if func expects multiple arguments, otherwise pass args as is
        result = func(...args);
        const end = process.hrtime.bigint();
        totalTime += Number(end - start); // Convert BigInt to Number for sum
    }

    const averageTimeNs = totalTime / iterations;
    const averageTimeMs = averageTimeNs / 1_000_000;

    console.log(`--- Benchmark: ${name} ---`);
    console.log(`  Iterations: ${iterations}`);
    console.log(`  Average Time: ${averageTimeMs.toFixed(6)} ms (${averageTimeNs.toFixed(0)} ns)`);
    // console.log(`  Last Result: ${JSON.stringify(result).substring(0, 100)}...`); // Optionally log part of result
    console.log('---------------------------\n');

    return {
        name,
        averageTimeNs,
        averageTimeMs,
        totalTimeNs: totalTime,
        lastResult: result
    };
}

// --- Benchmarking Setup ---

// Data for benchmarking
const largeParentheses = '('.repeat(50000) + ')'.repeat(50000);
const hugeNums = Array.from({
    length: 100000
}, (_, i) => Math.floor(Math.random() * 10000));
const hugeK = 1000;
const largeHeightMap = Array.from({
    length: 50000
}, (_, i) => i % 2 === 0 ? Math.floor(Math.random() * 100) : 0); // Alternating peaks and valleys
const largeHeightMapComplex = Array.from({
    length: 50000
}, (_, i) => {
    const r = Math.random();
    if (r < 0.3) return 0; // Flat
    if (r < 0.6) return Math.floor(Math.random() * 10) + 1; // Small peaks
    return Math.floor(Math.random() * 50) + 10; // Large peaks
});

console.log("Starting Benchmarks...\n");

// 1. Valid Parentheses
benchmark('Valid Parentheses (Large String)', isValid, [largeParentheses], 100);

// 2. Sliding Window Maximum
benchmark('Sliding Window Maximum (Huge Array, Large K)', maxSlidingWindow, [hugeNums, hugeK], 10);
benchmark('Sliding Window Maximum (Huge Array, Small K)', maxSlidingWindow, [hugeNums, 5], 10);

// 3. Trapping Rain Water
benchmark('Trapping Rain Water (Large Array - Sparse Peaks)', trap, [largeHeightMap], 50);
benchmark('Trapping Rain Water (Large Array - Complex Peaks)', trap, [largeHeightMapComplex], 50);

// For MyQueue and MyStack, benchmarking individual operations is more useful
// Example: MyQueue - push and pop N elements
const queueSize = 10000;
let myQueueInstance = new MyQueue();
console.log(`--- Benchmark: MyQueue - Push ${queueSize} elements ---`);
let start = process.hrtime.bigint();
for (let i = 0; i < queueSize; i++) {
    myQueueInstance.push(i);
}
let end = process.hrtime.bigint();
let timeMs = Number(end - start) / 1_000_000;
console.log(`  Push ${queueSize} elements: ${timeMs.toFixed(6)} ms\n`);

console.log(`--- Benchmark: MyQueue - Pop ${queueSize} elements ---`);
start = process.hrtime.bigint();
for (let i = 0; i < queueSize; i++) {
    myQueueInstance.pop();
}
end = process.hrtime.bigint();
timeMs = Number(end - start) / 1_000_000;
console.log(`  Pop ${queueSize} elements: ${timeMs.toFixed(6)} ms\n`);


const stackSize = 10000;
let myStackInstance = new MyStack();
console.log(`--- Benchmark: MyStack - Push ${stackSize} elements ---`);
start = process.hrtime.bigint();
for (let i = 0; i < stackSize; i++) {
    myStackInstance.push(i);
}
end = process.hrtime.bigint();
timeMs = Number(end - start) / 1_000_000;
console.log(`  Push ${stackSize} elements: ${timeMs.toFixed(6)} ms\n`);

console.log(`--- Benchmark: MyStack - Pop ${stackSize} elements ---`);
start = process.hrtime.bigint();
for (let i = 0; i < stackSize; i++) {
    myStackInstance.pop();
}
end = process.hrtime.bigint();
timeMs = Number(end - start) / 1_000_000;
console.log(`  Pop ${stackSize} elements: ${timeMs.toFixed(6)} ms\n`);


console.log("All Benchmarks Complete.");
```