```javascript
// Export all DP problem solutions from their respective files

// Fibonacci
const {
    fibonacciBruteForce,
    fibonacciMemoization,
    fibonacciTabulation,
    fibonacciSpaceOptimized,
} = require('./problems/fibonacci');

// Coin Change
const {
    coinChangeMemoization,
    coinChangeTabulation,
} = require('./problems/coinChange');

// Longest Common Subsequence
const {
    longestCommonSubsequenceMemoization,
    longestCommonSubsequenceTabulation,
    reconstructLCS,
} = require('./problems/longestCommonSubsequence');

// 0/1 Knapsack
const {
    knapsack01Memoization,
    knapsack01Tabulation,
    knapsack01SpaceOptimized,
} = require('./problems/knapsack01');

// Unique Paths
const {
    uniquePathsMemoization,
    uniquePathsTabulation,
    uniquePathsSpaceOptimized,
} = require('./problems/uniquePaths');

module.exports = {
    // Fibonacci
    fibonacciBruteForce,
    fibonacciMemoization,
    fibonacciTabulation,
    fibonacciSpaceOptimized,

    // Coin Change
    coinChangeMemoization,
    coinChangeTabulation,

    // Longest Common Subsequence
    longestCommonSubsequenceMemoization,
    longestCommonSubsequenceTabulation,
    reconstructLCS,

    // 0/1 Knapsack
    knapsack01Memoization,
    knapsack01Tabulation,
    knapsack01SpaceOptimized,

    // Unique Paths
    uniquePathsMemoization,
    uniquePathsTabulation,
    uniquePathsSpaceOptimized,
};
```