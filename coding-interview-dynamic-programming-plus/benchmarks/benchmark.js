/**
 * @fileoverview Performance benchmarking script for Dynamic Programming algorithms.
 * This script compares the execution time of different implementations (brute force, memoization,
 * tabulation, space-optimized tabulation) for various DP problems across different input sizes.
 */

const Stopwatch = require('../src/utils/stopwatch');

// Import all DP problem implementations
const fibonacci = require('../src/problems/fibonacci');
const coinChange = require('../src/problems/coin_change');
const lcs = require('../src/problems/longest_common_subsequence');
const knapsack = require('../src/problems/zero_one_knapsack');

const stopwatch = new Stopwatch();

/**
 * Runs a benchmark for a given function with specific inputs.
 * @param {string} name Name of the function/algorithm.
 * @param {function} func The function to benchmark.
 * @param {Array<any>} args Arguments for the function.
 * @param {boolean} [expectError=false] Whether an error is expected (e.g., for brute force on large inputs).
 */
function runBenchmark(name, func, args, expectError = false) {
    try {
        const { result, time } = stopwatch.measure(func, ...args);
        console.log(`  - ${name.padEnd(25)}: Time = ${time.toFixed(4)} ms, Result = ${result}`);
    } catch (e) {
        if (expectError) {
            console.log(`  - ${name.padEnd(25)}: Error (as expected) - ${e.message.substring(0, 50)}...`);
        } else {
            console.error(`  - ${name.padEnd(25)}: Error - ${e.message}`);
        }
    }
}

// --- Fibonacci Sequence Benchmarks ---
console.log('--- Fibonacci Sequence Benchmarks ---');
const fibInputs = [10, 20, 30, 35, 40, 45]; // n = 45 is usually max for JS number before precision issues / very slow brute force

fibInputs.forEach(n => {
    console.log(`\nBenchmarking Fibonacci for n = ${n}:`);
    runBenchmark('Brute Force', fibonacci.fibonacci_brute_force, [n], n > 35); // Brute force might stack overflow or be too slow for n > 35
    runBenchmark('Memoization', fibonacci.fibonacci_memo, [n]);
    runBenchmark('Tabulation', fibonacci.fibonacci_tab, [n]);
    runBenchmark('Space Optimized Tabulation', fibonacci.fibonacci_tab_optimized, [n]);
});

// --- Coin Change Benchmarks ---
console.log('\n--- Coin Change Benchmarks ---');
const coinChangeInputs = [
    { coins: [1, 2, 5], amount: 100 },
    { coins: [1, 2, 5], amount: 500 },
    { coins: [1, 2, 5], amount: 1000 },
    { coins: [1, 2, 5, 10, 25, 50, 100], amount: 5000 },
    { coins: [1, 2, 5, 10, 25, 50, 100], amount: 10000 },
    { coins: [186, 419, 83, 408], amount: 6249 }, // LeetCode example
    { coins: [2], amount: 10000 } // Impossible case (to test its speed)
];

coinChangeInputs.forEach(({ coins, amount }) => {
    console.log(`\nBenchmarking Coin Change for coins=[${coins}] and amount = ${amount}:`);
    runBenchmark('Memoization', coinChange.coinChange_memo, [coins, amount]);
    runBenchmark('Tabulation', coinChange.coinChange_tab, [coins, amount]);
});

// --- Longest Common Subsequence Benchmarks ---
console.log('\n--- Longest Common Subsequence Benchmarks ---');
const lcsInputs = [
    { text1: "abcde", text2: "ace" },
    { text1: "AGGTAB", text2: "GXTXAYB" },
    { text1: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", text2: "ACEGIKMOQSUWY" },
    { // Longer strings
        text1: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz", // 52 chars
        text2: "axbyczdwexfygyhzijakblcmndopeqrs" // 32 chars
    },
    { // Even longer
        text1: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // 100 'a's
        text2: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" // 100 'b's
    },
    { // Longest possible with current constraints 1000x1000 is too much for simple string generation
        // Max (1000 chars) x (1000 chars) for O(MN) would be 10^6 operations.
        // Let's test with 200x200 which is still 40,000 operations.
        text1: 'a'.repeat(200) + 'b'.repeat(200) + 'c'.repeat(200),
        text2: 'x'.repeat(100) + 'a'.repeat(100) + 'y'.repeat(100) + 'b'.repeat(100) + 'z'.repeat(100) // length 500
    },
    { // Longer matching strings
        text1: 'abacaba'.repeat(20), // length 140
        text2: 'abacaba'.repeat(20) // length 140
    }
];

lcsInputs.forEach(({ text1, text2 }) => {
    console.log(`\nBenchmarking LCS for text1.len=${text1.length}, text2.len=${text2.length}:`);
    runBenchmark('Memoization', lcs.lcs_memo, [text1, text2]);
    runBenchmark('Tabulation', lcs.lcs_tab, [text1, text2]);
});

// --- 0/1 Knapsack Problem Benchmarks ---
console.log('\n--- 0/1 Knapsack Problem Benchmarks ---');
const knapsackInputs = [
    { weights: [1, 2, 3], values: [6, 10, 12], capacity: 5 },
    { weights: [10, 20, 30], values: [60, 100, 120], capacity: 50 },
    {
        weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], // 15 items
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        capacity: 15
    },
    { // Moderate number of items, larger capacity
        weights: Array.from({ length: 20 }, (_, i) => Math.floor(Math.random() * 10) + 1), // 20 items, weight 1-10
        values: Array.from({ length: 20 }, (_, i) => Math.floor(Math.random() * 20) + 1), // value 1-20
        capacity: 100
    },
    { // Larger number of items, larger capacity (brute force will fail here)
        weights: Array.from({ length: 30 }, (_, i) => Math.floor(Math.random() * 20) + 1), // 30 items
        values: Array.from({ length: 30 }, (_, i) => Math.floor(Math.random() * 30) + 1),
        capacity: 200
    }
];

knapsackInputs.forEach(({ weights, values, capacity }, index) => {
    const numItems = weights.length;
    console.log(`\nBenchmarking Knapsack for ${numItems} items, capacity = ${capacity}:`);
    runBenchmark('Brute Force', knapsack.knapsack_brute_force, [weights, values, capacity], numItems > 25); // Brute force will be slow for numItems > ~25
    runBenchmark('Memoization', knapsack.knapsack_memo, [weights, values, capacity]);
    runBenchmark('Tabulation', knapsack.knapsack_tab, [weights, values, capacity]);
    runBenchmark('Space Optimized Tabulation', knapsack.knapsack_tab_optimized, [weights, values, capacity]);
});