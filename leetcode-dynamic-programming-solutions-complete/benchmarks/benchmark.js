/**
 * benchmarks/benchmark.js
 *
 * This file contains performance benchmarking code to compare the execution times
 * of different solution approaches (recursive, memoized, tabulated, space-optimized)
 * for the Dynamic Programming problems.
 *
 * It uses the `measureExecutionTime` utility from `src/utils/helpers.js`.
 */

const { measureExecutionTime } = require('../src/utils/helpers');

// Import all problem solutions
const {
    fibonacciRecursive,
    fibonacciMemoized,
    fibonacciTabulated,
    fibonacciSpaceOptimized,
} = require('../src/problems/fibonacci');

const {
    coinChangeRecursive,
    coinChangeMemoized,
    coinChangeTabulated,
} = require('../src/problems/coinChange');

const {
    longestCommonSubsequenceRecursive,
    longestCommonSubsequenceMemoized,
    longestCommonSubsequenceTabulated,
} = require('../src/problems/longestCommonSubsequence');

const {
    knapsack01Recursive,
    knapsack01Memoized,
    knapsack01Tabulated,
} = require('../src/problems/knapsack01');

function runBenchmark(name, func, ...args) {
    console.log(`\n--- Benchmarking: ${name} ---`);
    try {
        const { time, result } = measureExecutionTime(func, ...args);
        console.log(`  Result: ${result}`);
        console.log(`  Execution Time: ${time.toFixed(4)} ms`);
    } catch (error) {
        console.error(`  Error during execution: ${error.message}`);
    }
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

console.log('--- Starting DP Benchmarks ---');

// --- Fibonacci Benchmarks ---
console.log('\n### Fibonacci Sequence ###');
const fibN = 40; // For larger N, recursive will be extremely slow

runBenchmark(`Fibonacci Recursive (N=${fibN})`, fibonacciRecursive, fibN);
runBenchmark(`Fibonacci Memoized (N=${fibN})`, fibonacciMemoized, fibN);
runBenchmark(`Fibonacci Tabulated (N=${fibN})`, fibonacciTabulated, fibN);
runBenchmark(`Fibonacci Space-Optimized (N=${fibN})`, fibonacciSpaceOptimized, fibN);

// --- Coin Change Benchmarks ---
console.log('\n### Coin Change ###');
const ccCoins = [1, 2, 5, 10, 25, 50, 100];
const ccAmountSmall = 100;
const ccAmountMedium = 1000;

runBenchmark(`Coin Change Recursive (Coins=${ccCoins.length}, Amount=${ccAmountSmall})`, coinChangeRecursive, ccCoins, ccAmountSmall);
runBenchmark(`Coin Change Memoized (Coins=${ccCoins.length}, Amount=${ccAmountMedium})`, coinChangeMemoized, ccCoins, ccAmountMedium);
runBenchmark(`Coin Change Tabulated (Coins=${ccCoins.length}, Amount=${ccAmountMedium})`, coinChangeTabulated, ccCoins, ccAmountMedium);

const ccCoinsComplex = [186, 419, 83, 408];
const ccAmountComplex = 6249;
runBenchmark(`Coin Change Memoized (Complex, Amount=${ccAmountComplex})`, coinChangeMemoized, ccCoinsComplex, ccAmountComplex);
runBenchmark(`Coin Change Tabulated (Complex, Amount=${ccAmountComplex})`, coinChangeTabulated, ccCoinsComplex, ccAmountComplex);

// --- Longest Common Subsequence Benchmarks ---
console.log('\n### Longest Common Subsequence ###');
const lcsStr1 = "AGGTAB";
const lcsStr2 = "GXTXAYB";
const lcsStrLong1 = generateRandomString(15);
const lcsStrLong2 = generateRandomString(15);
const lcsStrVeryLong1 = generateRandomString(30);
const lcsStrVeryLong2 = generateRandomString(30);

runBenchmark(`LCS Recursive ("${lcsStr1}", "${lcsStr2}")`, longestCommonSubsequenceRecursive, lcsStr1, lcsStr2);
runBenchmark(`LCS Memoized ("${lcsStrLong1.substring(0,5)}...", "${lcsStrLong2.substring(0,5)}...") (Len=15)`, longestCommonSubsequenceMemoized, lcsStrLong1, lcsStrLong2);
runBenchmark(`LCS Tabulated ("${lcsStrLong1.substring(0,5)}...", "${lcsStrLong2.substring(0,5)}...") (Len=15)`, longestCommonSubsequenceTabulated, lcsStrLong1, lcsStrLong2);

// For very long strings, recursive would take too long. Only benchmark DP.
runBenchmark(`LCS Memoized (Len=30)`, longestCommonSubsequenceMemoized, lcsStrVeryLong1, lcsStrVeryLong2);
runBenchmark(`LCS Tabulated (Len=30)`, longestCommonSubsequenceTabulated, lcsStrVeryLong1, lcsStrVeryLong2);

// --- 0/1 Knapsack Benchmarks ---
console.log('\n### 0/1 Knapsack Problem ###');
const ksWeights = [10, 20, 30, 40, 50];
const ksValues = [60, 100, 120, 140, 160];
const ksCapacity = 100;

runBenchmark(`Knapsack Recursive (Items=${ksWeights.length}, Capacity=${ksCapacity})`, knapsack01Recursive, ksWeights, ksValues, ksCapacity);
runBenchmark(`Knapsack Memoized (Items=${ksWeights.length}, Capacity=${ksCapacity})`, knapsack01Memoized, ksWeights, ksValues, ksCapacity);
runBenchmark(`Knapsack Tabulated (Items=${ksWeights.length}, Capacity=${ksCapacity})`, knapsack01Tabulated, ksWeights, ksValues, ksCapacity);

// Larger example for DP
const largeKsWeights = Array.from({ length: 15 }, (_, i) => Math.floor(Math.random() * 50) + 1);
const largeKsValues = Array.from({ length: 15 }, (_, i) => Math.floor(Math.random() * 100) + 1);
const largeKsCapacity = 500;

runBenchmark(`Knapsack Memoized (Items=${largeKsWeights.length}, Capacity=${largeKsCapacity})`, knapsack01Memoized, largeKsWeights, largeKsValues, largeKsCapacity);
runBenchmark(`Knapsack Tabulated (Items=${largeKsWeights.length}, Capacity=${largeKsCapacity})`, knapsack01Tabulated, largeKsWeights, largeKsValues, largeKsCapacity);

console.log('\n--- DP Benchmarks Complete ---');