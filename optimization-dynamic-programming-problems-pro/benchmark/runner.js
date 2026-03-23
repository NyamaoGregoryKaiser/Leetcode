```javascript
/**
 * benchmark/runner.js
 *
 * This script benchmarks the performance of different implementations (recursive, memoized, tabulated, space-optimized)
 * for each DP problem. It helps visualize the performance gains of DP over brute-force.
 */

const { measurePerformance } = require('../utils/performance');
const dpProblems = require('../src/dp_problems');

// --- Configuration ---
const ITERATIONS_SMALL = 1000; // For smaller inputs where recursive might not crash
const ITERATIONS_MEDIUM = 100;
const ITERATIONS_LARGE = 10;
const ITERATIONS_XLARGE = 1; // For very large inputs, especially for LCS/Knapsack

console.log('--- Dynamic Programming Performance Benchmarks ---');
console.log(`Running ${ITERATIONS_SMALL} iterations for small inputs, ${ITERATIONS_MEDIUM} for medium, ${ITERATIONS_LARGE} for large, ${ITERATIONS_XLARGE} for XLarge.\n`);


// --- Fibonacci Benchmarks ---
console.log('--- Fibonacci Number (F(n)) ---');
const fibInputs = [
    { n: 10, label: 'Small (n=10)' },
    { n: 20, label: 'Medium (n=20)' },
    { n: 35, label: 'Large (n=35)' }, // Recursive starts to get very slow here
    // { n: 40, label: 'XLarge (n=40)' } // Recursive will be extremely slow
];

fibInputs.forEach(({ n, label }) => {
    console.log(`\n${label}:`);
    let duration;

    // Recursive
    if (n < 40) { // Limit recursive for very large N
        duration = measurePerformance(dpProblems.fibonacciRecursive, [n], ITERATIONS_SMALL);
        console.log(`  Recursive:         ${duration.toFixed(3)} ms`);
    } else {
        console.log(`  Recursive:         Skipped (too slow for n=${n})`);
    }

    // Memoization
    duration = measurePerformance(dpProblems.fibonacciMemoization, [n], ITERATIONS_MEDIUM);
    console.log(`  Memoization:       ${duration.toFixed(3)} ms`);

    // Tabulation
    duration = measurePerformance(dpProblems.fibonacciTabulation, [n], ITERATIONS_MEDIUM);
    console.log(`  Tabulation:        ${duration.toFixed(3)} ms`);

    // Space-Optimized Tabulation
    duration = measurePerformance(dpProblems.fibonacciSpaceOptimized, [n], ITERATIONS_MEDIUM);
    console.log(`  Space-Optimized:   ${duration.toFixed(3)} ms`);
});


// --- Climbing Stairs Benchmarks ---
console.log('\n--- Climbing Stairs (n steps) ---');
const climbInputs = [
    { n: 10, label: 'Small (n=10)' },
    { n: 20, label: 'Medium (n=20)' },
    { n: 35, label: 'Large (n=35)' },
    // { n: 40, label: 'XLarge (n=40)' }
];

climbInputs.forEach(({ n, label }) => {
    console.log(`\n${label}:`);
    let duration;

    // Recursive
    if (n < 40) {
        duration = measurePerformance(dpProblems.climbStairsRecursive, [n], ITERATIONS_SMALL);
        console.log(`  Recursive:         ${duration.toFixed(3)} ms`);
    } else {
        console.log(`  Recursive:         Skipped (too slow for n=${n})`);
    }

    // Memoization
    duration = measurePerformance(dpProblems.climbStairsMemoization, [n], ITERATIONS_MEDIUM);
    console.log(`  Memoization:       ${duration.toFixed(3)} ms`);

    // Tabulation
    duration = measurePerformance(dpProblems.climbStairsTabulation, [n], ITERATIONS_MEDIUM);
    console.log(`  Tabulation:        ${duration.toFixed(3)} ms`);

    // Space-Optimized Tabulation
    duration = measurePerformance(dpProblems.climbStairsSpaceOptimized, [n], ITERATIONS_MEDIUM);
    console.log(`  Space-Optimized:   ${duration.toFixed(3)} ms`);
});


// --- Longest Common Subsequence (LCS) Benchmarks ---
console.log('\n--- Longest Common Subsequence (LCS) ---');
const lcsInputs = [
    { s1: 'ABCDEFGH', s2: 'AXBCYDEZFH', label: 'Small (len=8,10)' },
    { s1: 'AGGTAB', s2: 'GXTXAYB', label: 'Medium (len=6,7)' },
    { s1: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', s2: 'ACEGIKMOQSUWY', label: 'Large (len=26,13)' },
    { s1: 'X'.repeat(50), s2: 'Y'.repeat(50), label: 'Large (len=50,50, no match)' },
    { s1: 'X'.repeat(50), s2: 'X'.repeat(50), label: 'Large (len=50,50, full match)' },
    { s1: 'ABC' + 'DEF' + 'GHI' + 'JKL' + 'MNO' + 'PQR' + 'STU' + 'VWX' + 'YZ' + 'ABC' + 'DEF' + 'GHI',
      s2: 'AXBXCXXDEXFXXGXHXIXJXKXMXNXOXPXQXRSXTXUXV' + 'WX YZ ABC DEF GHI', label: 'XLarge (len=36, 43)'
    }
];

lcsInputs.forEach(({ s1, s2, label }) => {
    console.log(`\n${label}: (s1.len=${s1.length}, s2.len=${s2.length})`);
    let duration;

    // Recursive (limit for small inputs)
    if (s1.length < 20 && s2.length < 20) { // Recursive gets very slow for lengths > ~15-20
        duration = measurePerformance(dpProblems.lcsRecursive, [s1, s2], ITERATIONS_SMALL);
        console.log(`  Recursive:         ${duration.toFixed(3)} ms`);
    } else {
        console.log(`  Recursive:         Skipped (too slow for lengths ${s1.length},${s2.length})`);
    }

    // Memoization
    duration = measurePerformance(dpProblems.lcsMemoization, [s1, s2], ITERATIONS_LARGE);
    console.log(`  Memoization:       ${duration.toFixed(3)} ms`);

    // Tabulation
    duration = measurePerformance(dpProblems.lcsTabulation, [s1, s2], ITERATIONS_LARGE);
    console.log(`  Tabulation:        ${duration.toFixed(3)} ms`);
});


// --- 0/1 Knapsack Benchmarks ---
console.log('\n--- 0/1 Knapsack Problem ---');

// Helper to generate random knapsack items
function generateKnapsackItems(count, maxWeight, maxValue) {
    const weights = [];
    const values = [];
    for (let i = 0; i < count; i++) {
        weights.push(Math.floor(Math.random() * maxWeight) + 1);
        values.push(Math.floor(Math.random() * maxValue) + 1);
    }
    return { weights, values };
}

const knapsackInputs = [
    { items: 5, capacity: 10, label: 'Small (5 items, cap 10)' },
    { items: 10, capacity: 50, label: 'Medium (10 items, cap 50)' },
    { items: 20, capacity: 100, label: 'Large (20 items, cap 100)' },
    { items: 50, capacity: 200, label: 'XLarge (50 items, cap 200)' },
];

knapsackInputs.forEach(({ items, capacity, label }) => {
    // Generate items for this benchmark run
    const { weights, values } = generateKnapsackItems(items, capacity / 3, 100);
    const n = weights.length;

    console.log(`\n${label}: (items=${n}, capacity=${capacity})`);
    let duration;

    // Recursive (limit for small inputs)
    if (n < 25) { // Recursive gets very slow for n > ~20
        duration = measurePerformance(dpProblems.knapsackRecursive, [weights, values, capacity, n], ITERATIONS_SMALL);
        console.log(`  Recursive:         ${duration.toFixed(3)} ms`);
    } else {
        console.log(`  Recursive:         Skipped (too slow for n=${n})`);
    }

    // Memoization
    duration = measurePerformance(dpProblems.knapsackMemoization, [weights, values, capacity, n], ITERATIONS_LARGE);
    console.log(`  Memoization:       ${duration.toFixed(3)} ms`);

    // Tabulation
    duration = measurePerformance(dpProblems.knapsackTabulation, [weights, values, capacity], ITERATIONS_LARGE);
    console.log(`  Tabulation:        ${duration.toFixed(3)} ms`);

    // Space-Optimized Tabulation
    duration = measurePerformance(dpProblems.knapsackSpaceOptimized, [weights, values, capacity], ITERATIONS_LARGE);
    console.log(`  Space-Optimized:   ${duration.toFixed(3)} ms`);
});

console.log('\n--- Benchmarks Complete ---\n');
```