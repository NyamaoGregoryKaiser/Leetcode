/**
 * bench/benchmark.ts
 *
 * This file contains performance benchmarking code for the DP algorithms.
 * It compares the execution time of brute-force recursive solutions against
 * their optimized DP counterparts (memoization, tabulation, space-optimized)
 * for selected problems.
 *
 * To run this benchmark: `npm run benchmark`
 */

import {
    fibonacciRecursive,
    fibonacciMemoization,
    fibonacciTabulation,
    fibonacciSpaceOptimized,
} from '../src/algorithms/fibonacci';

import {
    lcsRecursive,
    lcsMemoization,
    lcsTabulation,
} from '../src/algorithms/longest-common-subsequence';

import {
    knapsackRecursive,
    knapsackMemoization,
    knapsackTabulation,
} from '../src/algorithms/knapsack';

import {
    uniquePathsRecursive,
    uniquePathsMemoization,
    uniquePathsTabulation,
    uniquePathsSpaceOptimized,
    uniquePathsCombinatorial,
} from '../src/algorithms/unique-paths';

import {
    houseRobberRecursive,
    houseRobberMemoization,
    houseRobberTabulation,
    houseRobberSpaceOptimized,
} from '../src/algorithms/house-robber';


console.log("--- Dynamic Programming Benchmarks ---");
console.log("Comparing Brute Force vs. DP for various problems.");
console.log("-------------------------------------\n");

interface BenchmarkOptions {
    iterations?: number;
}

function runBenchmark(
    name: string,
    func: (...args: any[]) => any,
    args: any[],
    options: BenchmarkOptions = {}
): number {
    const { iterations = 1 } = options;
    const start = process.hrtime.bigint();
    let result: any;

    for (let i = 0; i < iterations; i++) {
        result = func(...args);
    }

    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_000_000;
    console.log(`  - ${name.padEnd(30)}: ${durationMs.toFixed(3)} ms (Result: ${result})`);
    return durationMs;
}

// --- Fibonacci Sequence Benchmarks ---
console.log("--- Fibonacci Sequence (N-th Fibonacci Number) ---");
const fibN = 40; // Recursive is usually too slow beyond N=40 for simple setup
const fibN_small = 20; // For recursive test

console.log(`\nBenchmarking for N = ${fibN_small}:`);
runBenchmark('Fibonacci Recursive (small N)', fibonacciRecursive, [fibN_small]);
runBenchmark('Fibonacci Memoization (small N)', fibonacciMemoization, [fibN_small, []]);
runBenchmark('Fibonacci Tabulation (small N)', fibonacciTabulation, [fibN_small]);
runBenchmark('Fibonacci Space-Optimized (small N)', fibonacciSpaceOptimized, [fibN_small]);

console.log(`\nBenchmarking for N = ${fibN}:`);
// Recursive for fibN will be extremely slow, so skip or use with caution.
// runBenchmark('Fibonacci Recursive', fibonacciRecursive, [fibN]); // THIS WILL TAKE A LONG TIME!
runBenchmark('Fibonacci Memoization', fibonacciMemoization, [fibN, []]);
runBenchmark('Fibonacci Tabulation', fibonacciTabulation, [fibN]);
runBenchmark('Fibonacci Space-Optimized', fibonacciSpaceOptimized, [fibN]);

// --- Longest Common Subsequence Benchmarks ---
console.log("\n--- Longest Common Subsequence ---");
const lcs_s1_small = "ABCDEFGH"; // Length 8
const lcs_s2_small = "AXBCYEFG"; // Length 8
const lcs_s1_large = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Length 52
const lcs_s2_large = "AZBYCXDWEVFUGTHSIRJQKPLOMNAZBYCXDWEVFUGTHSIRJQKPLOMN"; // Length 52

console.log(`\nBenchmarking for small strings (len ~${lcs_s1_small.length}):`);
runBenchmark('LCS Recursive (small)', lcsRecursive, [lcs_s1_small, lcs_s2_small]);
runBenchmark('LCS Memoization (small)', lcsMemoization, [lcs_s1_small, lcs_s2_small]);
runBenchmark('LCS Tabulation (small)', lcsTabulation, [lcs_s1_small, lcs_s2_small]);

console.log(`\nBenchmarking for large strings (len ~${lcs_s1_large.length}):`);
// Recursive for large strings is too slow.
// runBenchmark('LCS Recursive (large)', lcsRecursive, [lcs_s1_large, lcs_s2_large]); // THIS WILL TAKE A LONG TIME!
runBenchmark('LCS Memoization (large)', lcsMemoization, [lcs_s1_large, lcs_s2_large]);
runBenchmark('LCS Tabulation (large)', lcsTabulation, [lcs_s1_large, lcs_s2_large]);


// --- 0/1 Knapsack Problem Benchmarks ---
console.log("\n--- 0/1 Knapsack Problem ---");
const knapsack_weights_small = [10, 20, 30, 40, 50]; // 5 items
const knapsack_values_small = [60, 100, 120, 150, 200];
const knapsack_capacity_small = 100;

const knapsack_weights_large = Array.from({ length: 20 }, (_, i) => i + 1); // 20 items
const knapsack_values_large = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
const knapsack_capacity_large = 200;

console.log(`\nBenchmarking for small item count (N=${knapsack_weights_small.length}):`);
runBenchmark('Knapsack Recursive (small)', knapsackRecursive, [knapsack_weights_small, knapsack_values_small, knapsack_capacity_small]);
runBenchmark('Knapsack Memoization (small)', knapsackMemoization, [knapsack_weights_small, knapsack_values_small, knapsack_capacity_small]);
runBenchmark('Knapsack Tabulation (small)', knapsackTabulation, [knapsack_weights_small, knapsack_values_small, knapsack_capacity_small]);

console.log(`\nBenchmarking for large item count (N=${knapsack_weights_large.length}):`);
// Recursive for large item count is too slow.
// runBenchmark('Knapsack Recursive (large)', knapsackRecursive, [knapsack_weights_large, knapsack_values_large, knapsack_capacity_large]); // THIS WILL TAKE A VERY LONG TIME!
runBenchmark('Knapsack Memoization (large)', knapsackMemoization, [knapsack_weights_large, knapsack_values_large, knapsack_capacity_large]);
runBenchmark('Knapsack Tabulation (large)', knapsackTabulation, [knapsack_weights_large, knapsack_values_large, knapsack_capacity_large]);


// --- Unique Paths Benchmarks ---
console.log("\n--- Unique Paths ---");
const unique_paths_m_small = 5;
const unique_paths_n_small = 5;
const unique_paths_m_large = 20;
const unique_paths_n_large = 20;

console.log(`\nBenchmarking for small grid (${unique_paths_m_small}x${unique_paths_n_small}):`);
runBenchmark('Unique Paths Recursive (small)', uniquePathsRecursive, [unique_paths_m_small, unique_paths_n_small]);
runBenchmark('Unique Paths Memoization (small)', uniquePathsMemoization, [unique_paths_m_small, unique_paths_n_small]);
runBenchmark('Unique Paths Tabulation (small)', uniquePathsTabulation, [unique_paths_m_small, unique_paths_n_small]);
runBenchmark('Unique Paths Space-Optimized (small)', uniquePathsSpaceOptimized, [unique_paths_m_small, unique_paths_n_small]);
runBenchmark('Unique Paths Combinatorial (small)', uniquePathsCombinatorial, [unique_paths_m_small, unique_paths_n_small]);

console.log(`\nBenchmarking for large grid (${unique_paths_m_large}x${unique_paths_n_large}):`);
// Recursive for large grid is too slow.
// runBenchmark('Unique Paths Recursive (large)', uniquePathsRecursive, [unique_paths_m_large, unique_paths_n_large]); // THIS WILL TAKE A LONG TIME!
runBenchmark('Unique Paths Memoization (large)', uniquePathsMemoization, [unique_paths_m_large, unique_paths_n_large]);
runBenchmark('Unique Paths Tabulation (large)', uniquePathsTabulation, [unique_paths_m_large, unique_paths_n_large]);
runBenchmark('Unique Paths Space-Optimized (large)', uniquePathsSpaceOptimized, [unique_paths_m_large, unique_paths_n_large]);
runBenchmark('Unique Paths Combinatorial (large)', uniquePathsCombinatorial, [unique_paths_m_large, unique_paths_n_large]);


// --- House Robber Benchmarks ---
console.log("\n--- House Robber ---");
const hr_nums_small = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // 15 houses
const hr_nums_large = Array.from({ length: 1000 }, (_, i) => i % 100 + 1); // 1000 houses

console.log(`\nBenchmarking for small array (N=${hr_nums_small.length}):`);
runBenchmark('House Robber Recursive (small)', houseRobberRecursive, [hr_nums_small]);
runBenchmark('House Robber Memoization (small)', houseRobberMemoization, [hr_nums_small]);
runBenchmark('House Robber Tabulation (small)', houseRobberTabulation, [hr_nums_small]);
runBenchmark('House Robber Space-Optimized (small)', houseRobberSpaceOptimized, [hr_nums_small]);

console.log(`\nBenchmarking for large array (N=${hr_nums_large.length}):`);
// Recursive for large array is too slow.
// runBenchmark('House Robber Recursive (large)', houseRobberRecursive, [hr_nums_large]); // THIS WILL TAKE A LONG TIME!
runBenchmark('House Robber Memoization (large)', houseRobberMemoization, [hr_nums_large]);
runBenchmark('House Robber Tabulation (large)', houseRobberTabulation, [hr_nums_large]);
runBenchmark('House Robber Space-Optimized (large)', houseRobberSpaceOptimized, [hr_nums_large]);

console.log("\n--- Benchmarks Finished ---");