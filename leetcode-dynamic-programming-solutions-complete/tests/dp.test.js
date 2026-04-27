/**
 * tests/dp.test.js
 *
 * This file contains comprehensive test cases for all Dynamic Programming problems
 * implemented in the `src/problems` directory.
 * It uses a simple assertion utility from `src/utils/helpers.js`.
 */

const { assert } = require('../src/utils/helpers');

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

let testCount = 0;
let passedCount = 0;

function runTest(name, testFunction) {
    testCount++;
    try {
        testFunction();
        console.log(`✓ ${name}`);
        passedCount++;
    } catch (e) {
        console.error(`✗ ${name}`);
        console.error(`   Error: ${e.message}`);
        if (e.stack) {
            console.error(e.stack.split('\n')[1].trim()); // Show where the assertion failed
        }
        process.exit(1); // Exit on first failure for quick feedback
    }
}

console.log('--- Running DP Tests ---');

// --- Fibonacci Tests ---
runTest('Fibonacci: F(0) is 0', () => {
    assert(fibonacciRecursive(0) === 0, 'fibonacciRecursive(0) should be 0');
    assert(fibonacciMemoized(0) === 0, 'fibonacciMemoized(0) should be 0');
    assert(fibonacciTabulated(0) === 0, 'fibonacciTabulated(0) should be 0');
    assert(fibonacciSpaceOptimized(0) === 0, 'fibonacciSpaceOptimized(0) should be 0');
});

runTest('Fibonacci: F(1) is 1', () => {
    assert(fibonacciRecursive(1) === 1, 'fibonacciRecursive(1) should be 1');
    assert(fibonacciMemoized(1) === 1, 'fibonacciMemoized(1) should be 1');
    assert(fibonacciTabulated(1) === 1, 'fibonacciTabulated(1) should be 1');
    assert(fibonacciSpaceOptimized(1) === 1, 'fibonacciSpaceOptimized(1) should be 1');
});

runTest('Fibonacci: F(2) is 1', () => {
    assert(fibonacciRecursive(2) === 1, 'fibonacciRecursive(2) should be 1');
    assert(fibonacciMemoized(2) === 1, 'fibonacciMemoized(2) should be 1');
    assert(fibonacciTabulated(2) === 1, 'fibonacciTabulated(2) should be 1');
    assert(fibonacciSpaceOptimized(2) === 1, 'fibonacciSpaceOptimized(2) should be 1');
});

runTest('Fibonacci: F(7) is 13', () => {
    assert(fibonacciRecursive(7) === 13, 'fibonacciRecursive(7) should be 13');
    assert(fibonacciMemoized(7) === 13, 'fibonacciMemoized(7) should be 13');
    assert(fibonacciTabulated(7) === 13, 'fibonacciTabulated(7) should be 13');
    assert(fibonacciSpaceOptimized(7) === 13, 'fibonacciSpaceOptimized(7) should be 13');
});

runTest('Fibonacci: F(10) is 55', () => {
    assert(fibonacciRecursive(10) === 55, 'fibonacciRecursive(10) should be 55');
    assert(fibonacciMemoized(10) === 55, 'fibonacciMemoized(10) should be 55');
    assert(fibonacciTabulated(10) === 55, 'fibonacciTabulated(10) should be 55');
    assert(fibonacciSpaceOptimized(10) === 55, 'fibonacciSpaceOptimized(10) should be 55');
});

runTest('Fibonacci: F(20) is 6765', () => {
    // Note: Recursive (brute force) will be slow for larger N, but for small N like 20 it's fine.
    // We mainly test for correctness here. Performance is in benchmarks.
    assert(fibonacciRecursive(20) === 6765, 'fibonacciRecursive(20) should be 6765');
    assert(fibonacciMemoized(20) === 6765, 'fibonacciMemoized(20) should be 6765');
    assert(fibonacciTabulated(20) === 6765, 'fibonacciTabulated(20) should be 6765');
    assert(fibonacciSpaceOptimized(20) === 6765, 'fibonacciSpaceOptimized(20) should be 6765');
});

runTest('Fibonacci: Handles large N (40) with DP', () => {
    // F(40) = 102334155
    assert(fibonacciMemoized(40) === 102334155, 'fibonacciMemoized(40) should be 102334155');
    assert(fibonacciTabulated(40) === 102334155, 'fibonacciTabulated(40) should be 102334155');
    assert(fibonacciSpaceOptimized(40) === 102334155, 'fibonacciSpaceOptimized(40) should be 102334155');
});

// --- Coin Change Tests ---
runTest('Coin Change: coins=[1,2,5], amount=11 -> 3', () => {
    const coins = [1, 2, 5];
    const amount = 11;
    assert(coinChangeRecursive(coins, amount) === 3, 'coinChangeRecursive([1,2,5], 11) should be 3');
    assert(coinChangeMemoized(coins, amount) === 3, 'coinChangeMemoized([1,2,5], 11) should be 3');
    assert(coinChangeTabulated(coins, amount) === 3, 'coinChangeTabulated([1,2,5], 11) should be 3');
});

runTest('Coin Change: coins=[2], amount=3 -> -1', () => {
    const coins = [2];
    const amount = 3;
    assert(coinChangeRecursive(coins, amount) === -1, 'coinChangeRecursive([2], 3) should be -1');
    assert(coinChangeMemoized(coins, amount) === -1, 'coinChangeMemoized([2], 3) should be -1');
    assert(coinChangeTabulated(coins, amount) === -1, 'coinChangeTabulated([2], 3) should be -1');
});

runTest('Coin Change: coins=[1], amount=0 -> 0', () => {
    const coins = [1];
    const amount = 0;
    assert(coinChangeRecursive(coins, amount) === 0, 'coinChangeRecursive([1], 0) should be 0');
    assert(coinChangeMemoized(coins, amount) === 0, 'coinChangeMemoized([1], 0) should be 0');
    assert(coinChangeTabulated(coins, amount) === 0, 'coinChangeTabulated([1], 0) should be 0');
});

runTest('Coin Change: coins=[186,419,83,408], amount=6249 -> 20', () => {
    const coins = [186, 419, 83, 408];
    const amount = 6249;
    // Recursive might be too slow for this. Test only DP approaches.
    assert(coinChangeMemoized(coins, amount) === 20, 'coinChangeMemoized for large case should be 20');
    assert(coinChangeTabulated(coins, amount) === 20, 'coinChangeTabulated for large case should be 20');
});

runTest('Coin Change: coins=[7, 9], amount=10 -> -1', () => {
    const coins = [7, 9];
    const amount = 10;
    assert(coinChangeRecursive(coins, amount) === -1, 'coinChangeRecursive([7,9], 10) should be -1');
    assert(coinChangeMemoized(coins, amount) === -1, 'coinChangeMemoized([7,9], 10) should be -1');
    assert(coinChangeTabulated(coins, amount) === -1, 'coinChangeTabulated([7,9], 10) should be -1');
});

runTest('Coin Change: coins=[1, 3, 4, 5], amount=7 -> 2 (3+4 or 1+1+5)', () => {
    const coins = [1, 3, 4, 5];
    const amount = 7;
    assert(coinChangeRecursive(coins, amount) === 2, 'coinChangeRecursive([1,3,4,5], 7) should be 2');
    assert(coinChangeMemoized(coins, amount) === 2, 'coinChangeMemoized([1,3,4,5], 7) should be 2');
    assert(coinChangeTabulated(coins, amount) === 2, 'coinChangeTabulated([1,3,4,5], 7) should be 2');
});

// --- Longest Common Subsequence Tests ---
runTest('LCS: text1="abcde", text2="ace" -> 3', () => {
    const text1 = "abcde";
    const text2 = "ace";
    assert(longestCommonSubsequenceRecursive(text1, text2) === 3, 'LCS Recursive for "abcde", "ace" should be 3');
    assert(longestCommonSubsequenceMemoized(text1, text2) === 3, 'LCS Memoized for "abcde", "ace" should be 3');
    assert(longestCommonSubsequenceTabulated(text1, text2) === 3, 'LCS Tabulated for "abcde", "ace" should be 3');
});

runTest('LCS: text1="abc", text2="abc" -> 3', () => {
    const text1 = "abc";
    const text2 = "abc";
    assert(longestCommonSubsequenceRecursive(text1, text2) === 3, 'LCS Recursive for "abc", "abc" should be 3');
    assert(longestCommonSubsequenceMemoized(text1, text2) === 3, 'LCS Memoized for "abc", "abc" should be 3');
    assert(longestCommonSubsequenceTabulated(text1, text2) === 3, 'LCS Tabulated for "abc", "abc" should be 3');
});

runTest('LCS: text1="abc", text2="def" -> 0', () => {
    const text1 = "abc";
    const text2 = "def";
    assert(longestCommonSubsequenceRecursive(text1, text2) === 0, 'LCS Recursive for "abc", "def" should be 0');
    assert(longestCommonSubsequenceMemoized(text1, text2) === 0, 'LCS Memoized for "abc", "def" should be 0');
    assert(longestCommonSubsequenceTabulated(text1, text2) === 0, 'LCS Tabulated for "abc", "def" should be 0');
});

runTest('LCS: text1="AGGTAB", text2="GXTXAYB" -> 4 ("GTAB" or "GTAY")', () => {
    const text1 = "AGGTAB";
    const text2 = "GXTXAYB";
    assert(longestCommonSubsequenceRecursive(text1, text2) === 4, 'LCS Recursive for "AGGTAB", "GXTXAYB" should be 4');
    assert(longestCommonSubsequenceMemoized(text1, text2) === 4, 'LCS Memoized for "AGGTAB", "GXTXAYB" should be 4');
    assert(longestCommonSubsequenceTabulated(text1, text2) === 4, 'LCS Tabulated for "AGGTAB", "GXTXAYB" should be 4');
});

runTest('LCS: Empty strings -> 0', () => {
    const text1 = "";
    const text2 = "";
    assert(longestCommonSubsequenceRecursive(text1, text2) === 0, 'LCS Recursive for empty strings should be 0');
    assert(longestCommonSubsequenceMemoized(text1, text2) === 0, 'LCS Memoized for empty strings should be 0');
    assert(longestCommonSubsequenceTabulated(text1, text2) === 0, 'LCS Tabulated for empty strings should be 0');
});

runTest('LCS: One empty string -> 0', () => {
    const text1 = "abc";
    const text2 = "";
    assert(longestCommonSubsequenceRecursive(text1, text2) === 0, 'LCS Recursive for one empty string should be 0');
    assert(longestCommonSubsequenceMemoized(text1, text2) === 0, 'LCS Memoized for one empty string should be 0');
    assert(longestCommonSubsequenceTabulated(text1, text2) === 0, 'LCS Tabulated for one empty string should be 0');
});

runTest('LCS: Larger case (DP only) "ABCDGH", "AEDFHR" -> 3 ("ADH")', () => {
    const text1 = "ABCDGH";
    const text2 = "AEDFHR";
    assert(longestCommonSubsequenceMemoized(text1, text2) === 3, 'LCS Memoized for "ABCDGH", "AEDFHR" should be 3');
    assert(longestCommonSubsequenceTabulated(text1, text2) === 3, 'LCS Tabulated for "ABCDGH", "AEDFHR" should be 3');
});

// --- 0/1 Knapsack Tests ---
runTest('Knapsack 0/1: Basic case 1', () => {
    const weights = [1, 2, 3];
    const values = [6, 10, 12];
    const capacity = 5;
    assert(knapsack01Recursive(weights, values, capacity) === 22, 'Knapsack Recursive 1 should be 22');
    assert(knapsack01Memoized(weights, values, capacity) === 22, 'Knapsack Memoized 1 should be 22');
    assert(knapsack01Tabulated(weights, values, capacity) === 22, 'Knapsack Tabulated 1 should be 22');
});

runTest('Knapsack 0/1: Basic case 2', () => {
    const weights = [10, 20, 30];
    const values = [60, 100, 120];
    const capacity = 50;
    assert(knapsack01Recursive(weights, values, capacity) === 220, 'Knapsack Recursive 2 should be 220');
    assert(knapsack01Memoized(weights, values, capacity) === 220, 'Knapsack Memoized 2 should be 220');
    assert(knapsack01Tabulated(weights, values, capacity) === 220, 'Knapsack Tabulated 2 should be 220');
});

runTest('Knapsack 0/1: No items -> 0', () => {
    const weights = [];
    const values = [];
    const capacity = 10;
    assert(knapsack01Recursive(weights, values, capacity) === 0, 'Knapsack Recursive no items should be 0');
    assert(knapsack01Memoized(weights, values, capacity) === 0, 'Knapsack Memoized no items should be 0');
    assert(knapsack01Tabulated(weights, values, capacity) === 0, 'Knapsack Tabulated no items should be 0');
});

runTest('Knapsack 0/1: Zero capacity -> 0', () => {
    const weights = [1, 2, 3];
    const values = [6, 10, 12];
    const capacity = 0;
    assert(knapsack01Recursive(weights, values, capacity) === 0, 'Knapsack Recursive zero capacity should be 0');
    assert(knapsack01Memoized(weights, values, capacity) === 0, 'Knapsack Memoized zero capacity should be 0');
    assert(knapsack01Tabulated(weights, values, capacity) === 0, 'Knapsack Tabulated zero capacity should be 0');
});

runTest('Knapsack 0/1: Capacity too small for any item -> 0', () => {
    const weights = [10, 20, 30];
    const values = [60, 100, 120];
    const capacity = 5;
    assert(knapsack01Recursive(weights, values, capacity) === 0, 'Knapsack Recursive small capacity should be 0');
    assert(knapsack01Memoized(weights, values, capacity) === 0, 'Knapsack Memoized small capacity should be 0');
    assert(knapsack01Tabulated(weights, values, capacity) === 0, 'Knapsack Tabulated small capacity should be 0');
});

runTest('Knapsack 0/1: All items can be included', () => {
    const weights = [1, 2, 3];
    const values = [10, 20, 30];
    const capacity = 6; // 1+2+3 = 6
    assert(knapsack01Recursive(weights, values, capacity) === 60, 'Knapsack Recursive all items should be 60');
    assert(knapsack01Memoized(weights, values, capacity) === 60, 'Knapsack Memoized all items should be 60');
    assert(knapsack01Tabulated(weights, values, capacity) === 60, 'Knapsack Tabulated all items should be 60');
});

runTest('Knapsack 0/1: Complex case with duplicates in optimal choice (DP only)', () => {
    const weights = [2, 3, 4, 5];
    const values = [3, 4, 5, 6];
    const capacity = 5;
    // Expected: max(val(2)+val(3)=3+4=7 for w=5, val(5)=6 for w=5) -> 7
    assert(knapsack01Memoized(weights, values, capacity) === 7, 'Knapsack Memoized complex case should be 7');
    assert(knapsack01Tabulated(weights, values, capacity) === 7, 'Knapsack Tabulated complex case should be 7');
});

console.log(`\n--- Test Summary ---`);
console.log(`${passedCount} / ${testCount} tests passed.`);

if (passedCount === testCount) {
    console.log('All tests passed successfully!');
    process.exit(0);
} else {
    console.error('Some tests failed.');
    process.exit(1);
}