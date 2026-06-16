```typescript
/**
 * src/index.ts
 *
 * This is the main entry point for the DP Interview Project.
 * It demonstrates how to use the implemented algorithms and provides
 * performance benchmarks for comparison.
 */

import { comparePerformance } from './utils/performance';
import * as LCS from './problems/longestCommonSubsequence';
import * as Knapsack from './problems/knapsack01';
import * as CoinChange from './problems/coinChangeMin';
import * as EditDistance from './problems/editDistance';

console.log("--- DP Interview Project Demonstrations ---");

// --- Longest Common Subsequence (LCS) Demonstration ---
console.log("\n*** Longest Common Subsequence (LCS) ***");
const lcs_text1_small = "ABCBDAB";
const lcs_text2_small = "BDCABA";
// Expected LCS: "BCBA" or "BDAB" or "BCAB", length 4.
console.log(`LCS("${lcs_text1_small}", "${lcs_text2_small}")`);
console.log(`  Brute Force:       ${LCS.longestCommonSubsequence_BruteForce(lcs_text1_small, lcs_text2_small)}`);
console.log(`  Memoized:          ${LCS.longestCommonSubsequence_Memoized(lcs_text1_small, lcs_text2_small)}`);
console.log(`  Tabulated:         ${LCS.longestCommonSubsequence_Tabulated(lcs_text1_small, lcs_text2_small)}`);
console.log(`  Space Optimized:   ${LCS.longestCommonSubsequence_SpaceOptimized(lcs_text1_small, lcs_text2_small)}`);

// LCS Performance Comparison (can use longer strings for better differentiation)
const lcs_text1_medium = "GXTXAYB";
const lcs_text2_medium = "AGGTAB";
// LCS: "GTAB", length 4
comparePerformance(
    [
        { name: 'LCS (Memoized)', func: LCS.longestCommonSubsequence_Memoized },
        { name: 'LCS (Tabulated)', func: LCS.longestCommonSubsequence_Tabulated },
        { name: 'LCS (Space-Opt)', func: LCS.longestCommonSubsequence_SpaceOptimized }
    ],
    [lcs_text1_medium, lcs_text2_medium],
    10000 // A reasonable number of iterations for medium inputs
);
// For brute force, the string lengths need to be very small, otherwise it takes too long.
// If you uncomment, be aware it might run for a while.
/*
const lcs_text1_tiny = "ABC";
const lcs_text2_tiny = "ADC";
comparePerformance(
    [
        { name: 'LCS (Brute Force)', func: LCS.longestCommonSubsequence_BruteForce },
        { name: 'LCS (Memoized)', func: LCS.longestCommonSubsequence_Memoized },
    ],
    [lcs_text1_tiny, lcs_text2_tiny],
    100000 // More iterations for very small inputs
);
*/

// --- 0/1 Knapsack Problem Demonstration ---
console.log("\n*** 0/1 Knapsack Problem ***");
const knapsack_weights = [10, 20, 30];
const knapsack_values = [60, 100, 120];
const knapsack_capacity = 50;
// Expected: 220 (items 20, 30 selected)
console.log(`Knapsack Problem (W=[${knapsack_weights}], V=[${knapsack_values}], C=${knapsack_capacity})`);
console.log(`  Brute Force:       ${Knapsack.knapsack01_BruteForce(knapsack_weights, knapsack_values, knapsack_capacity)}`);
console.log(`  Memoized:          ${Knapsack.knapsack01_Memoized(knapsack_weights, knapsack_values, knapsack_capacity)}`);
console.log(`  Tabulated:         ${Knapsack.knapsack01_Tabulated(knapsack_weights, knapsack_values, knapsack_capacity)}`);
console.log(`  Space Optimized:   ${Knapsack.knapsack01_SpaceOptimized(knapsack_weights, knapsack_values, knapsack_capacity)}`);

// Knapsack Performance Comparison
const knapsack_weights_large = Array.from({ length: 20 }, (_, i) => i * 5 + 1); // 1, 6, 11, ... 96
const knapsack_values_large = Array.from({ length: 20 }, (_, i) => i * 10 + 5); // 5, 15, 25, ... 195
const knapsack_capacity_large = 200;
comparePerformance(
    [
        { name: 'Knapsack (Memoized)', func: Knapsack.knapsack01_Memoized },
        { name: 'Knapsack (Tabulated)', func: Knapsack.knapsack01_Tabulated },
        { name: 'Knapsack (Space-Opt)', func: Knapsack.knapsack01_SpaceOptimized }
    ],
    [knapsack_weights_large, knapsack_values_large, knapsack_capacity_large],
    1000 // Fewer iterations for larger N*W complexity
);
// Brute force is typically skipped for N > ~20 items as 2^N becomes too large.


// --- Coin Change (Minimum Coins) Demonstration ---
console.log("\n*** Coin Change (Minimum Coins) ***");
const cc_coins_small = [1, 2, 5];
const cc_amount_small = 11;
// Expected: 3 (5+5+1)
console.log(`Coin Change (Coins=[${cc_coins_small}], Amount=${cc_amount_small})`);
console.log(`  Brute Force:       ${CoinChange.coinChangeMin_BruteForce(cc_coins_small, cc_amount_small)}`);
console.log(`  Memoized:          ${CoinChange.coinChangeMin_Memoized(cc_coins_small, cc_amount_small)}`);
console.log(`  Tabulated:         ${CoinChange.coinChangeMin_Tabulated(cc_coins_small, cc_amount_small)}`);

// Coin Change Performance Comparison
const cc_coins_large = [1, 3, 7, 10, 25, 50, 100];
const cc_amount_large = 999;
comparePerformance(
    [
        { name: 'Coin Change (Memoized)', func: CoinChange.coinChangeMin_Memoized },
        { name: 'Coin Change (Tabulated)', func: CoinChange.coinChangeMin_Tabulated }
    ],
    [cc_coins_large, cc_amount_large],
    500 // Fewer iterations for larger C*A complexity
);
// Brute force is typically skipped for amount > ~15-20.


// --- Edit Distance Demonstration ---
console.log("\n*** Edit Distance ***");
const ed_word1_small = "horse";
const ed_word2_small = "ros";
// Expected: 3
console.log(`Edit Distance ("${ed_word1_small}", "${ed_word2_small}")`);
console.log(`  Brute Force:       ${EditDistance.editDistance_BruteForce(ed_word1_small, ed_word2_small)}`);
console.log(`  Memoized:          ${EditDistance.editDistance_Memoized(ed_word1_small, ed_word2_small)}`);
console.log(`  Tabulated:         ${EditDistance.editDistance_Tabulated(ed_word1_small, ed_word2_small)}`);
console.log(`  Space Optimized:   ${EditDistance.editDistance_SpaceOptimized(ed_word1_small, ed_word2_small)}`);

// Edit Distance Performance Comparison
const ed_word1_medium = "intention";
const ed_word2_medium = "execution";
// Expected: 5
comparePerformance(
    [
        { name: 'Edit Distance (Memoized)', func: EditDistance.editDistance_Memoized },
        { name: 'Edit Distance (Tabulated)', func: EditDistance.editDistance_Tabulated },
        { name: 'Edit Distance (Space-Opt)', func: EditDistance.editDistance_SpaceOptimized }
    ],
    [ed_word1_medium, ed_word2_medium],
    1000 // A reasonable number of iterations for medium inputs
);
// Brute force is typically skipped for string lengths > ~10.


console.log("\n--- Demonstrations Complete ---");

```