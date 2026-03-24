/**
 * @fileoverview Performance benchmarking script for Dynamic Programming solutions.
 * This script compares the execution time and memory usage of different approaches
 * (brute force, memoization, tabulation, space-optimized) for selected DP problems.
 */

const { benchmarkFunction, formatBytes } = require('../src/utils/helpers');

// Import problem implementations
const fibonacci = require('../src/problems/fibonacci');
const coinChange = require('../src/problems/coinChange');
const longestCommonSubsequence = require('../src/problems/longestCommonSubsequence');
const knapsack = require('../src/problems/knapsack');
const houseRobber = require('../src/problems/houseRobber');

console.log("--- DP Algorithm Benchmarking ---");
console.log("Comparing Brute Force, Memoization, Tabulation, and Space-Optimized approaches.\n");

function runBenchmark(name, func, args, iterations = 1) {
    let totalTime = 0;
    let totalMemory = 0;
    let result = null;

    for (let i = 0; i < iterations; i++) {
        const bench = benchmarkFunction(func, args, name);
        totalTime += bench.time;
        totalMemory += bench.memory;
        result = bench.result; // Keep the last result
    }

    const avgTime = totalTime / iterations;
    const avgMemory = totalMemory / iterations;

    console.log(`  ${name}:`);
    console.log(`    Result: ${JSON.stringify(result).substring(0, 100)}${JSON.stringify(result).length > 100 ? '...' : ''}`);
    console.log(`    Avg Time: ${avgTime.toFixed(4)} ms`);
    console.log(`    Avg Memory: ${formatBytes(avgMemory)}`);
}

// --- Fibonacci Sequence Benchmarks ---
console.log("--- Fibonacci Sequence (n=40) ---");
const fibN = 40;
runBenchmark("Fibonacci Brute Force", fibonacci.fibonacciBruteForce, [fibN], 1); // Brute force is too slow for many iterations
runBenchmark("Fibonacci Memoization", fibonacci.fibonacciMemoization, [fibN], 100);
runBenchmark("Fibonacci Tabulation", fibonacci.fibonacciTabulation, [fibN], 100);
runBenchmark("Fibonacci Space Optimized", fibonacci.fibonacciSpaceOptimized, [fibN], 100);
console.log("\n");

console.log("--- Fibonacci Sequence (n=10) --- (Brute Force comparison)");
const fibSmallN = 10;
runBenchmark("Fibonacci Brute Force", fibonacci.fibonacciBruteForce, [fibSmallN], 100);
runBenchmark("Fibonacci Memoization", fibonacci.fibonacciMemoization, [fibSmallN], 100);
runBenchmark("Fibonacci Tabulation", fibonacci.fibonacciTabulation, [fibSmallN], 100);
runBenchmark("Fibonacci Space Optimized", fibonacci.fibonacciSpaceOptimized, [fibSmallN], 100);
console.log("\n");


// --- Coin Change Benchmarks ---
console.log("--- Coin Change (coins=[1,2,5], amount=100) ---");
const ccCoins = [1, 2, 5];
const ccAmount = 100;
// Note: Brute force for coin change can be extremely slow even for small amounts, disabling or using very small amounts.
// runBenchmark("Coin Change Brute Force", coinChange.coinChangeBruteForce, [ccCoins, ccAmount], 1);
runBenchmark("Coin Change Memoization", coinChange.coinChangeMemoization, [ccCoins, ccAmount], 50);
runBenchmark("Coin Change Tabulation", coinChange.coinChangeTabulation, [ccCoins, ccAmount], 50);
console.log("\n");

console.log("--- Coin Change (coins=[1,5,10,25], amount=1000) ---");
const ccCoinsLarge = [1, 5, 10, 25];
const ccAmountLarge = 1000;
runBenchmark("Coin Change Memoization", coinChange.coinChangeMemoization, [ccCoinsLarge, ccAmountLarge], 50);
runBenchmark("Coin Change Tabulation", coinChange.coinChangeTabulation, [ccCoinsLarge, ccAmountLarge], 50);
console.log("\n");


// --- Longest Common Subsequence Benchmarks ---
console.log("--- Longest Common Subsequence (text1.length=15, text2.length=15) ---");
const lcsText1 = "abcdeFGHIJKLMnOpq"; // 17 characters
const lcsText2 = "aXcYeZGHIKlMNpQrS"; // 17 characters
// Brute force is disabled for performance. Uncomment with smaller strings if needed.
// runBenchmark("LCS Brute Force", longestCommonSubsequence.longestCommonSubsequenceBruteForce, [lcsText1.substring(0, 8), lcsText2.substring(0, 8)], 1);
runBenchmark("LCS Memoization", longestCommonSubsequence.longestCommonSubsequenceMemoization, [lcsText1, lcsText2], 20);
runBenchmark("LCS Tabulation", longestCommonSubsequence.longestCommonSubsequenceTabulation, [lcsText1, lcsText2], 20);
runBenchmark("LCS Space Optimized", longestCommonSubsequence.longestCommonSubsequenceSpaceOptimized, [lcsText1, lcsText2], 20);
console.log("\n");

console.log("--- Longest Common Subsequence (text1.length=50, text2.length=50) ---");
const lcsLongText1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(0, 50);
const lcsLongText2 = "ACEGIKMOQSUWYacegikmoqsuwy0123456789!@#$%^&*()".substring(0, 50);
runBenchmark("LCS Memoization", longestCommonSubsequence.longestCommonSubsequenceMemoization, [lcsLongText1, lcsLongText2], 5);
runBenchmark("LCS Tabulation", longestCommonSubsequence.longestCommonSubsequenceTabulation, [lcsLongText1, lcsLongText2], 5);
runBenchmark("LCS Space Optimized", longestCommonSubsequence.longestCommonSubsequenceSpaceOptimized, [lcsLongText1, lcsLongText2], 5);
console.log("\n");


// --- 0/1 Knapsack Benchmarks ---
console.log("--- 0/1 Knapsack (N=15, W=50) ---");
const kpWeights = [10, 20, 30, 15, 25, 5, 35, 40, 12, 18, 22, 28, 8, 32, 27];
const kpValues = [60, 100, 120, 80, 110, 20, 150, 170, 70, 95, 105, 130, 45, 140, 125];
const kpW = 50;
const kpN = kpWeights.length;
runBenchmark("Knapsack Brute Force", knapsack.knapsackBruteForce, [kpWeights.slice(0, 15), kpValues.slice(0, 15), kpW, 15], 1); // Only small N for brute force
runBenchmark("Knapsack Memoization", knapsack.knapsackMemoization, [kpWeights, kpValues, kpW, kpN], 10);
runBenchmark("Knapsack Tabulation", knapsack.knapsackTabulation, [kpWeights, kpValues, kpW], 10);
runBenchmark("Knapsack Space Optimized", knapsack.knapsackSpaceOptimized, [kpWeights, kpValues, kpW], 10);
console.log("\n");

console.log("--- 0/1 Knapsack (N=20, W=100) ---");
const kpWeightsLarge = Array.from({ length: 20 }, (_, i) => Math.floor(Math.random() * 40) + 1);
const kpValuesLarge = Array.from({ length: 20 }, (_, i) => Math.floor(Math.random() * 200) + 1);
const kpWLarge = 100;
const kpNLarge = kpWeightsLarge.length;
// runBenchmark("Knapsack Brute Force", knapsack.knapsackBruteForce, [kpWeightsLarge, kpValuesLarge, kpWLarge, kpNLarge], 1); // Too slow
runBenchmark("Knapsack Memoization", knapsack.knapsackMemoization, [kpWeightsLarge, kpValuesLarge, kpWLarge, kpNLarge], 5);
runBenchmark("Knapsack Tabulation", knapsack.knapsackTabulation, [kpWeightsLarge, kpValuesLarge, kpWLarge], 5);
runBenchmark("Knapsack Space Optimized", knapsack.knapsackSpaceOptimized, [kpWeightsLarge, kpValuesLarge, kpWLarge], 5);
console.log("\n");


// --- House Robber Benchmarks ---
console.log("--- House Robber (N=20) ---");
const hrNums = [2, 7, 9, 3, 1, 5, 8, 4, 10, 12, 6, 11, 1, 9, 7, 3, 5, 2, 8, 4];
runBenchmark("House Robber Brute Force", houseRobber.houseRobberBruteForce, [hrNums], 1); // Small array for brute force
runBenchmark("House Robber Memoization", houseRobber.houseRobberMemoization, [hrNums], 100);
runBenchmark("House Robber Tabulation", houseRobber.houseRobberTabulation, [hrNums], 100);
runBenchmark("House Robber Space Optimized", houseRobber.houseRobberSpaceOptimized, [hrNums], 100);
console.log("\n");

console.log("--- House Robber (N=1000) ---");
const hrLargeNums = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 200));
// runBenchmark("House Robber Brute Force", houseRobber.houseRobberBruteForce, [hrLargeNums], 1); // Too slow
runBenchmark("House Robber Memoization", houseRobber.houseRobberMemoization, [hrLargeNums], 10);
runBenchmark("House Robber Tabulation", houseRobber.houseRobberTabulation, [hrLargeNums], 10);
runBenchmark("House Robber Space Optimized", houseRobber.houseRobberSpaceOptimized, [hrLargeNums], 10);
console.log("\n--- Benchmarking Complete ---");