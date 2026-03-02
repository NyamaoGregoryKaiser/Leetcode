/**
 * src/index.ts
 *
 * Main entry point for the DP Interview Project.
 * This file can be used to demonstrate how to use the implemented algorithms.
 * For actual testing, refer to the `tests/` directory.
 */

import * as dpAlgorithms from './algorithms';
import { KnapsackItem } from './types';

function runDemonstrations() {
    console.log("--- Dynamic Programming Algorithms Demonstrations ---");
    console.log("===================================================");

    // Problem 1: Fibonacci Numbers
    console.log("\n--- Fibonacci Numbers (N=10) ---");
    const N_fib = 10;
    console.log(`Brute Force (N=${N_fib}): ${dpAlgorithms.fibonacci_bruteForce(N_fib)}`);
    console.log(`Memoized (N=${N_fib}): ${dpAlgorithms.fibonacci_memoized(N_fib)}`);
    console.log(`Tabulated (N=${N_fib}): ${dpAlgorithms.fibonacci_tabulated(N_fib)}`);
    console.log(`Space Optimized (N=${N_fib}): ${dpAlgorithms.fibonacci_spaceOptimized(N_fib)}`);

    // Problem 2: Unique Paths
    console.log("\n--- Unique Paths (m=3, n=7) ---");
    const m_up = 3, n_up = 7;
    // console.log(`Brute Force (m=${m_up}, n=${n_up}): ${dpAlgorithms.uniquePaths_bruteForce(m_up, n_up)}`); // Might be slow for larger m,n
    console.log(`Memoized (m=${m_up}, n=${n_up}): ${dpAlgorithms.uniquePaths_memoized(m_up, n_up)}`);
    console.log(`Tabulated (m=${m_up}, n=${n_up}): ${dpAlgorithms.uniquePaths_tabulated(m_up, n_up)}`);
    console.log(`Space Optimized (m=${m_up}, n=${n_up}): ${dpAlgorithms.uniquePaths_spaceOptimized(m_up, n_up)}`);

    // Problem 3: Coin Change
    console.log("\n--- Coin Change (coins=[1, 2, 5], amount=11) ---");
    const coins_cc = [1, 2, 5];
    const amount_cc = 11;
    // console.log(`Brute Force (amount=${amount_cc}): ${dpAlgorithms.coinChange_bruteForce(coins_cc, amount_cc)}`); // Can be very slow
    console.log(`Memoized (amount=${amount_cc}): ${dpAlgorithms.coinChange_memoized(coins_cc, amount_cc)}`);
    console.log(`Tabulated (amount=${amount_cc}): ${dpAlgorithms.coinChange_tabulated(coins_cc, amount_cc)}`);
    console.log(`Result for amount=11: ${dpAlgorithms.coinChange_tabulated(coins_cc, amount_cc)}`); // Expected: 3 (5+5+1)
    console.log(`Result for impossible amount=7, coins=[3,5]: ${dpAlgorithms.coinChange_tabulated([3, 5], 7)}`); // Expected: -1

    // Problem 4: Longest Common Subsequence
    console.log("\n--- Longest Common Subsequence (text1='abcde', text2='ace') ---");
    const text1_lcs = "abcde";
    const text2_lcs = "ace";
    // console.log(`Brute Force: ${dpAlgorithms.longestCommonSubsequence_bruteForce(text1_lcs, text2_lcs)}`); // Can be slow for longer strings
    console.log(`Memoized: ${dpAlgorithms.longestCommonSubsequence_memoized(text1_lcs, text2_lcs)}`);
    console.log(`Tabulated: ${dpAlgorithms.longestCommonSubsequence_tabulated(text1_lcs, text2_lcs)}`);
    console.log(`Space Optimized: ${dpAlgorithms.longestCommonSubsequence_spaceOptimized(text1_lcs, text2_lcs)}`);
    console.log(`Result: ${dpAlgorithms.longestCommonSubsequence_tabulated(text1_lcs, text2_lcs)}`); // Expected: 3 ("ace")

    // Problem 5: 0/1 Knapsack Problem
    console.log("\n--- 0/1 Knapsack (capacity=10, items=[(6,30), (3,14), (4,16), (2,9)]) ---");
    const items_kp: KnapsackItem[] = [
        { weight: 6, value: 30 },
        { weight: 3, value: 14 },
        { weight: 4, value: 16 },
        { weight: 2, value: 9 }
    ];
    const capacity_kp = 10;
    // console.log(`Brute Force: ${dpAlgorithms.knapsack01_bruteForce(items_kp, capacity_kp)}`); // Can be slow for more items
    console.log(`Memoized: ${dpAlgorithms.knapsack01_memoized(items_kp, capacity_kp)}`);
    console.log(`Tabulated: ${dpAlgorithms.knapsack01_tabulated(items_kp, capacity_kp)}`);
    console.log(`Space Optimized: ${dpAlgorithms.knapsack01_spaceOptimized(items_kp, capacity_kp)}`);
    console.log(`Result: ${dpAlgorithms.knapsack01_tabulated(items_kp, capacity_kp)}`); // Expected: 48 (items with weights 6, 4 or 3, 2, 4+3=7 (14+16+9=39), 6+4=10 (30+16=46), 6+3=9(30+14=44), 6+2=8 (30+9=39), 3+4+2=9 (14+16+9=39)) -> 30 (item 1) + 16 (item 3) + nothing else = 46. Or 14 (item 2) + 16 (item 3) + 9 (item 4) = 39. So 46. Let's recheck.
    // Recheck for KP capacity 10, items [(6,30), (3,14), (4,16), (2,9)]
    // (6,30) + (4,16) -> W=10, V=46
    // (6,30) + (3,14) -> W=9, V=44
    // (6,30) + (2,9) -> W=8, V=39
    // (3,14) + (4,16) + (2,9) -> W=9, V=39
    // Max is 46.

    console.log("\n===================================================");
}

// Run the demonstration if this file is executed directly
if (require.main === module) {
    runDemonstrations();
}