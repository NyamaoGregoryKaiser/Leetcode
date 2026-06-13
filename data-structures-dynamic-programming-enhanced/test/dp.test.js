```javascript
const assert = require('assert');
const {
    fibonacciBruteForce,
    fibonacciMemoization,
    fibonacciTabulation,
    fibonacciSpaceOptimized,
    coinChangeMemoization,
    coinChangeTabulation,
    longestCommonSubsequenceMemoization,
    longestCommonSubsequenceTabulation,
    reconstructLCS,
    knapsack01Memoization,
    knapsack01Tabulation,
    knapsack01SpaceOptimized,
    uniquePathsMemoization,
    uniquePathsTabulation,
    uniquePathsSpaceOptimized,
} = require('../src'); // Import all functions from index.js

function runTestSuite(name, tests) {
    console.log(`\n--- Running ${name} Tests ---`);
    let passed = 0;
    let failed = 0;

    tests.forEach((test, index) => {
        try {
            test.func();
            console.log(`✅ Test ${index + 1}: ${test.description} - PASSED`);
            passed++;
        } catch (error) {
            console.error(`❌ Test ${index + 1}: ${test.description} - FAILED`);
            console.error(error.message);
            failed++;
        }
    });

    console.log(`\n${passed} tests passed, ${failed} tests failed in ${name}.\n`);
    if (failed > 0) {
        process.exit(1); // Indicate failure to the system
    }
}

// --- Fibonacci Tests ---
runTestSuite('Fibonacci', [
    {
        description: 'fibonacciBruteForce(0) should return 0',
        func: () => assert.strictEqual(fibonacciBruteForce(0), 0)
    },
    {
        description: 'fibonacciBruteForce(1) should return 1',
        func: () => assert.strictEqual(fibonacciBruteForce(1), 1)
    },
    {
        description: 'fibonacciBruteForce(7) should return 13',
        func: () => assert.strictEqual(fibonacciBruteForce(7), 13)
    },
    {
        description: 'fibonacciBruteForce(10) should return 55',
        func: () => assert.strictEqual(fibonacciBruteForce(10), 55)
    },
    {
        description: 'fibonacciMemoization(0) should return 0',
        func: () => assert.strictEqual(fibonacciMemoization(0), 0)
    },
    {
        description: 'fibonacciMemoization(1) should return 1',
        func: () => assert.strictEqual(fibonacciMemoization(1), 1)
    },
    {
        description: 'fibonacciMemoization(10) should return 55',
        func: () => assert.strictEqual(fibonacciMemoization(10), 55)
    },
    {
        description: 'fibonacciMemoization(20) should return 6765',
        func: () => assert.strictEqual(fibonacciMemoization(20), 6765)
    },
    {
        description: 'fibonacciMemoization(40) should return 102334155',
        func: () => assert.strictEqual(fibonacciMemoization(40), 102334155)
    },
    {
        description: 'fibonacciTabulation(0) should return 0',
        func: () => assert.strictEqual(fibonacciTabulation(0), 0)
    },
    {
        description: 'fibonacciTabulation(1) should return 1',
        func: () => assert.strictEqual(fibonacciTabulation(1), 1)
    },
    {
        description: 'fibonacciTabulation(10) should return 55',
        func: () => assert.strictEqual(fibonacciTabulation(10), 55)
    },
    {
        description: 'fibonacciTabulation(20) should return 6765',
        func: () => assert.strictEqual(fibonacciTabulation(20), 6765)
    },
    {
        description: 'fibonacciTabulation(40) should return 102334155',
        func: () => assert.strictEqual(fibonacciTabulation(40), 102334155)
    },
    {
        description: 'fibonacciSpaceOptimized(0) should return 0',
        func: () => assert.strictEqual(fibonacciSpaceOptimized(0), 0)
    },
    {
        description: 'fibonacciSpaceOptimized(1) should return 1',
        func: () => assert.strictEqual(fibonacciSpaceOptimized(1), 1)
    },
    {
        description: 'fibonacciSpaceOptimized(10) should return 55',
        func: () => assert.strictEqual(fibonacciSpaceOptimized(10), 55)
    },
    {
        description: 'fibonacciSpaceOptimized(20) should return 6765',
        func: () => assert.strictEqual(fibonacciSpaceOptimized(20), 6765)
    },
    {
        description: 'fibonacciSpaceOptimized(40) should return 102334155',
        func: () => assert.strictEqual(fibonacciSpaceOptimized(40), 102334155)
    },
]);

// --- Coin Change Tests ---
runTestSuite('Coin Change', [
    {
        description: 'coinChangeMemoization([1, 2, 5], 11) should return 3',
        func: () => assert.strictEqual(coinChangeMemoization([1, 2, 5], 11), 3)
    },
    {
        description: 'coinChangeMemoization([2], 3) should return -1',
        func: () => assert.strictEqual(coinChangeMemoization([2], 3), -1)
    },
    {
        description: 'coinChangeMemoization([1], 0) should return 0',
        func: () => assert.strictEqual(coinChangeMemoization([1], 0), 0)
    },
    {
        description: 'coinChangeMemoization([1], 1) should return 1',
        func: () => assert.strictEqual(coinChangeMemoization([1], 1), 1)
    },
    {
        description: 'coinChangeMemoization([186, 419, 83, 408], 6249) should return 20',
        func: () => assert.strictEqual(coinChangeMemoization([186, 419, 83, 408], 6249), 20)
    },
    {
        description: 'coinChangeMemoization([3, 5], 7) should return -1',
        func: () => assert.strictEqual(coinChangeMemoization([3, 5], 7), -1)
    },
    {
        description: 'coinChangeMemoization([1, 3, 4, 5], 7) should return 2 (3+4 or 2+5)',
        func: () => assert.strictEqual(coinChangeMemoization([1, 3, 4, 5], 7), 2)
    },

    {
        description: 'coinChangeTabulation([1, 2, 5], 11) should return 3',
        func: () => assert.strictEqual(coinChangeTabulation([1, 2, 5], 11), 3)
    },
    {
        description: 'coinChangeTabulation([2], 3) should return -1',
        func: () => assert.strictEqual(coinChangeTabulation([2], 3), -1)
    },
    {
        description: 'coinChangeTabulation([1], 0) should return 0',
        func: () => assert.strictEqual(coinChangeTabulation([1], 0), 0)
    },
    {
        description: 'coinChangeTabulation([1], 1) should return 1',
        func: () => assert.strictEqual(coinChangeTabulation([1], 1), 1)
    },
    {
        description: 'coinChangeTabulation([186, 419, 83, 408], 6249) should return 20',
        func: () => assert.strictEqual(coinChangeTabulation([186, 419, 83, 408], 6249), 20)
    },
    {
        description: 'coinChangeTabulation([3, 5], 7) should return -1',
        func: () => assert.strictEqual(coinChangeTabulation([3, 5], 7), -1)
    },
    {
        description: 'coinChangeTabulation([1, 3, 4, 5], 7) should return 2 (3+4 or 2+5)',
        func: () => assert.strictEqual(coinChangeTabulation([1, 3, 4, 5], 7), 2)
    },
]);

// --- Longest Common Subsequence Tests ---
runTestSuite('Longest Common Subsequence', [
    {
        description: 'LCS Memoization("abcde", "ace") should return 3',
        func: () => assert.strictEqual(longestCommonSubsequenceMemoization("abcde", "ace"), 3)
    },
    {
        description: 'LCS Memoization("abc", "abc") should return 3',
        func: () => assert.strictEqual(longestCommonSubsequenceMemoization("abc", "abc"), 3)
    },
    {
        description: 'LCS Memoization("abc", "def") should return 0',
        func: () => assert.strictEqual(longestCommonSubsequenceMemoization("abc", "def"), 0)
    },
    {
        description: 'LCS Memoization("AGGTAB", "GXTXAYB") should return 4 ("GTAB")',
        func: () => assert.strictEqual(longestCommonSubsequenceMemoization("AGGTAB", "GXTXAYB"), 4)
    },
    {
        description: 'LCS Memoization("", "test") should return 0',
        func: () => assert.strictEqual(longestCommonSubsequenceMemoization("", "test"), 0)
    },
    {
        description: 'LCS Memoization("test", "") should return 0',
        func: () => assert.strictEqual(longestCommonSubsequenceMemoization("test", ""), 0)
    },
    {
        description: 'LCS Memoization("ab", "ba") should return 1 ("a" or "b")',
        func: () => assert.strictEqual(longestCommonSubsequenceMemoization("ab", "ba"), 1)
    },

    {
        description: 'LCS Tabulation("abcde", "ace") should return 3',
        func: () => assert.strictEqual(longestCommonSubsequenceTabulation("abcde", "ace"), 3)
    },
    {
        description: 'LCS Tabulation("abc", "abc") should return 3',
        func: () => assert.strictEqual(longestCommonSubsequenceTabulation("abc", "abc"), 3)
    },
    {
        description: 'LCS Tabulation("abc", "def") should return 0',
        func: () => assert.strictEqual(longestCommonSubsequenceTabulation("abc", "def"), 0)
    },
    {
        description: 'LCS Tabulation("AGGTAB", "GXTXAYB") should return 4 ("GTAB")',
        func: () => assert.strictEqual(longestCommonSubsequenceTabulation("AGGTAB", "GXTXAYB"), 4)
    },
    {
        description: 'LCS Tabulation("", "test") should return 0',
        func: () => assert.strictEqual(longestCommonSubsequenceTabulation("", "test"), 0)
    },
    {
        description: 'LCS Tabulation("test", "") should return 0',
        func: () => assert.strictEqual(longestCommonSubsequenceTabulation("test", ""), 0)
    },
    {
        description: 'LCS Tabulation("ab", "ba") should return 1 ("a" or "b")',
        func: () => assert.strictEqual(longestCommonSubsequenceTabulation("ab", "ba"), 1)
    },

    {
        description: 'Reconstruct LCS("abcde", "ace") should return "ace"',
        func: () => assert.strictEqual(reconstructLCS("abcde", "ace"), "ace")
    },
    {
        description: 'Reconstruct LCS("AGGTAB", "GXTXAYB") should return "GTAB"',
        func: () => assert.strictEqual(reconstructLCS("AGGTAB", "GXTXAYB"), "GTAB")
    },
    {
        description: 'Reconstruct LCS("ABAZDC", "BACBAD") should return "ABAD"',
        func: () => assert.strictEqual(reconstructLCS("ABAZDC", "BACBAD"), "ABAD")
    },
    {
        description: 'Reconstruct LCS("abcdef", "azbycx") should return "abc"',
        func: () => assert.strictEqual(reconstructLCS("abcdef", "azbycx"), "abc")
    },
    {
        description: 'Reconstruct LCS("", "test") should return ""',
        func: () => assert.strictEqual(reconstructLCS("", "test"), "")
    },
]);

// --- 0/1 Knapsack Tests ---
runTestSuite('0/1 Knapsack', [
    {
        description: 'Knapsack Memoization basic (capacity 50) should return 220',
        func: () => assert.strictEqual(knapsack01Memoization([10, 20, 30], [60, 100, 120], 50), 220)
    },
    {
        description: 'Knapsack Memoization no item fits (capacity 1) should return 0',
        func: () => assert.strictEqual(knapsack01Memoization([10, 20, 30], [60, 100, 120], 1), 0)
    },
    {
        description: 'Knapsack Memoization with one item (capacity 5) should return 10',
        func: () => assert.strictEqual(knapsack01Memoization([3, 4, 5], [30, 40, 50], 5), 50)
    },
    {
        description: 'Knapsack Memoization all items fit (capacity 100) should return sum of all values',
        func: () => assert.strictEqual(knapsack01Memoization([10, 20, 30], [60, 100, 120], 100), 280) // 60+100+120
    },
    {
        description: 'Knapsack Memoization empty items should return 0',
        func: () => assert.strictEqual(knapsack01Memoization([], [], 10), 0)
    },

    {
        description: 'Knapsack Tabulation basic (capacity 50) should return 220',
        func: () => assert.strictEqual(knapsack01Tabulation([10, 20, 30], [60, 100, 120], 50), 220)
    },
    {
        description: 'Knapsack Tabulation no item fits (capacity 1) should return 0',
        func: () => assert.strictEqual(knapsack01Tabulation([10, 20, 30], [60, 100, 120], 1), 0)
    },
    {
        description: 'Knapsack Tabulation with one item (capacity 5) should return 50',
        func: () => assert.strictEqual(knapsack01Tabulation([3, 4, 5], [30, 40, 50], 5), 50)
    },
    {
        description: 'Knapsack Tabulation all items fit (capacity 100) should return sum of all values',
        func: () => assert.strictEqual(knapsack01Tabulation([10, 20, 30], [60, 100, 120], 100), 280)
    },
    {
        description: 'Knapsack Tabulation empty items should return 0',
        func: () => assert.strictEqual(knapsack01Tabulation([], [], 10), 0)
    },

    {
        description: 'Knapsack Space-Optimized basic (capacity 50) should return 220',
        func: () => assert.strictEqual(knapsack01SpaceOptimized([10, 20, 30], [60, 100, 120], 50), 220)
    },
    {
        description: 'Knapsack Space-Optimized no item fits (capacity 1) should return 0',
        func: () => assert.strictEqual(knapsack01SpaceOptimized([10, 20, 30], [60, 100, 120], 1), 0)
    },
    {
        description: 'Knapsack Space-Optimized with one item (capacity 5) should return 50',
        func: () => assert.strictEqual(knapsack01SpaceOptimized([3, 4, 5], [30, 40, 50], 5), 50)
    },
    {
        description: 'Knapsack Space-Optimized all items fit (capacity 100) should return sum of all values',
        func: () => assert.strictEqual(knapsack01SpaceOptimized([10, 20, 30], [60, 100, 120], 100), 280)
    },
    {
        description: 'Knapsack Space-Optimized empty items should return 0',
        func: () => assert.strictEqual(knapsack01SpaceOptimized([], [], 10), 0)
    },
]);

// --- Unique Paths Tests ---
runTestSuite('Unique Paths', [
    {
        description: 'Unique Paths Memoization (3x7) should return 28',
        func: () => assert.strictEqual(uniquePathsMemoization(3, 7), 28)
    },
    {
        description: 'Unique Paths Memoization (1x1) should return 1',
        func: () => assert.strictEqual(uniquePathsMemoization(1, 1), 1)
    },
    {
        description: 'Unique Paths Memoization (1x5) should return 1',
        func: () => assert.strictEqual(uniquePathsMemoization(1, 5), 1)
    },
    {
        description: 'Unique Paths Memoization (5x1) should return 1',
        func: () => assert.strictEqual(uniquePathsMemoization(5, 1), 1)
    },
    {
        description: 'Unique Paths Memoization (2x2) should return 2',
        func: () => assert.strictEqual(uniquePathsMemoization(2, 2), 2)
    },
    {
        description: 'Unique Paths Memoization (3x2) should return 3',
        func: () => assert.strictEqual(uniquePathsMemoization(3, 2), 3) // Right, Down, Down; Down, Right, Down; Down, Down, Right
    },
    {
        description: 'Unique Paths Memoization (7x3) should return 28',
        func: () => assert.strictEqual(uniquePathsMemoization(7, 3), 28)
    },

    {
        description: 'Unique Paths Tabulation (3x7) should return 28',
        func: () => assert.strictEqual(uniquePathsTabulation(3, 7), 28)
    },
    {
        description: 'Unique Paths Tabulation (1x1) should return 1',
        func: () => assert.strictEqual(uniquePathsTabulation(1, 1), 1)
    },
    {
        description: 'Unique Paths Tabulation (1x5) should return 1',
        func: () => assert.strictEqual(uniquePathsTabulation(1, 5), 1)
    },
    {
        description: 'Unique Paths Tabulation (5x1) should return 1',
        func: () => assert.strictEqual(uniquePathsTabulation(5, 1), 1)
    },
    {
        description: 'Unique Paths Tabulation (2x2) should return 2',
        func: () => assert.strictEqual(uniquePathsTabulation(2, 2), 2)
    },
    {
        description: 'Unique Paths Tabulation (3x2) should return 3',
        func: () => assert.strictEqual(uniquePathsTabulation(3, 2), 3)
    },
    {
        description: 'Unique Paths Tabulation (7x3) should return 28',
        func: () => assert.strictEqual(uniquePathsTabulation(7, 3), 28)
    },

    {
        description: 'Unique Paths Space-Optimized (3x7) should return 28',
        func: () => assert.strictEqual(uniquePathsSpaceOptimized(3, 7), 28)
    },
    {
        description: 'Unique Paths Space-Optimized (1x1) should return 1',
        func: () => assert.strictEqual(uniquePathsSpaceOptimized(1, 1), 1)
    },
    {
        description: 'Unique Paths Space-Optimized (1x5) should return 1',
        func: () => assert.strictEqual(uniquePathsSpaceOptimized(1, 5), 1)
    },
    {
        description: 'Unique Paths Space-Optimized (5x1) should return 1',
        func: () => assert.strictEqual(uniquePathsSpaceOptimized(5, 1), 1)
    },
    {
        description: 'Unique Paths Space-Optimized (2x2) should return 2',
        func: () => assert.strictEqual(uniquePathsSpaceOptimized(2, 2), 2)
    },
    {
        description: 'Unique Paths Space-Optimized (3x2) should return 3',
        func: () => assert.strictEqual(uniquePathsSpaceOptimized(3, 2), 3)
    },
    {
        description: 'Unique Paths Space-Optimized (7x3) should return 28',
        func: () => assert.strictEqual(uniquePathsSpaceOptimized(7, 3), 28)
    },
]);
```