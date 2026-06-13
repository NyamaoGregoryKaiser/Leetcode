```javascript
const {
    fibonacciBruteForce,
    fibonacciMemoization,
    fibonacciTabulation,
    fibonacciSpaceOptimized,
    coinChangeMemoization,
    coinChangeTabulation,
    longestCommonSubsequenceMemoization,
    longestCommonSubsequenceTabulation,
    knapsack01Memoization,
    knapsack01Tabulation,
    knapsack01SpaceOptimized,
    uniquePathsMemoization,
    uniquePathsTabulation,
    uniquePathsSpaceOptimized,
} = require('../src');

function runBenchmark(name, fn, ...args) {
    console.time(name);
    const result = fn(...args);
    console.timeEnd(name);
    return result;
}

console.log('--- Running Performance Benchmarks ---');

// --- Fibonacci ---
console.log('\n--- Fibonacci (n=40) ---');
let n_fib = 40;
runBenchmark(`Fibonacci Memoization (${n_fib})`, fibonacciMemoization, n_fib);
runBenchmark(`Fibonacci Tabulation (${n_fib})`, fibonacciTabulation, n_fib);
runBenchmark(`Fibonacci Space Optimized (${n_fib})`, fibonacciSpaceOptimized, n_fib);

// For brute force, use a smaller n as it's exponential
let n_fib_brute = 20;
console.log(`\n--- Fibonacci Brute Force (n=${n_fib_brute}) ---`);
runBenchmark(`Fibonacci Brute Force (${n_fib_brute})`, fibonacciBruteForce, n_fib_brute);


// --- Coin Change ---
console.log('\n--- Coin Change (amount=6249, coins=[186, 419, 83, 408]) ---');
const coins_cc = [186, 419, 83, 408];
const amount_cc = 6249;
runBenchmark(`Coin Change Memoization (${amount_cc})`, coinChangeMemoization, coins_cc, amount_cc);
runBenchmark(`Coin Change Tabulation (${amount_cc})`, coinChangeTabulation, coins_cc, amount_cc);

console.log('\n--- Coin Change (larger amount=10000, coins=[1, 2, 5, 10, 20, 50, 100]) ---');
const coins_cc_large = [1, 2, 5, 10, 20, 50, 100];
const amount_cc_large = 10000;
runBenchmark(`Coin Change Memoization (${amount_cc_large})`, coinChangeMemoization, coins_cc_large, amount_cc_large);
runBenchmark(`Coin Change Tabulation (${amount_cc_large})`, coinChangeTabulation, coins_cc_large, amount_cc_large);


// --- Longest Common Subsequence ---
console.log('\n--- Longest Common Subsequence (long strings) ---');
const text1_lcs = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Length 52
const text2_lcs = "AXBYCZDEFWGHIJVLMNOPQRSTUWVXYZAXBYCZDEFWGHIJVLMNOPQRSTUWVXYZ"; // Length 60 (with some common)
// Expected LCS length: 26 (A-Z) * 2 / approx 2 = ~26 chars common depending on specifics
// For this example, "ABCDEFGHIJKLMNOPQRSTUVWXYZ" is the common part.
// So, we'll make a more specific one.
const text1_lcs_specific = "AGGTABAGGTABAGGTABAGGTABAGGTAB"; // Length 30
const text2_lcs_specific = "GXTXAYBGXTXAYBGXTXAYBGXTXAYBGXTXAYB"; // Length 35
// LCS for "AGGTAB", "GXTXAYB" is "GTAB" (length 4)
// Expected LCS length for specific is 4 * 5 = 20

runBenchmark(`LCS Memoization (long strings)`, longestCommonSubsequenceMemoization, text1_lcs_specific, text2_lcs_specific);
runBenchmark(`LCS Tabulation (long strings)`, longestCommonSubsequenceTabulation, text1_lcs_specific, text2_lcs_specific);


// --- 0/1 Knapsack ---
console.log('\n--- 0/1 Knapsack (N=100 items, W=1000 capacity) ---');
const N_knapsack = 100;
const W_knapsack = 1000;
const weights_knapsack = Array.from({ length: N_knapsack }, () => Math.floor(Math.random() * 50) + 1);
const values_knapsack = Array.from({ length: N_knapsack }, () => Math.floor(Math.random() * 100) + 1);

runBenchmark(`Knapsack Memoization (N=${N_knapsack}, W=${W_knapsack})`, knapsack01Memoization, weights_knapsack, values_knapsack, W_knapsack);
runBenchmark(`Knapsack Tabulation (N=${N_knapsack}, W=${W_knapsack})`, knapsack01Tabulation, weights_knapsack, values_knapsack, W_knapsack);
runBenchmark(`Knapsack Space Optimized (N=${N_knapsack}, W=${W_knapsack})`, knapsack01SpaceOptimized, weights_knapsack, values_knapsack, W_knapsack);


// --- Unique Paths ---
console.log('\n--- Unique Paths (m=15, n=15) ---');
const m_up = 15;
const n_up = 15;
runBenchmark(`Unique Paths Memoization (${m_up}x${n_up})`, uniquePathsMemoization, m_up, n_up);
runBenchmark(`Unique Paths Tabulation (${m_up}x${n_up})`, uniquePathsTabulation, m_up, n_up);
runBenchmark(`Unique Paths Space Optimized (${m_up}x${n_up})`, uniquePathsSpaceOptimized, m_up, n_up);

console.log('\n--- Unique Paths (m=50, n=50) ---');
const m_up_large = 50;
const n_up_large = 50;
runBenchmark(`Unique Paths Memoization (${m_up_large}x${n_up_large})`, uniquePathsMemoization, m_up_large, n_up_large);
runBenchmark(`Unique Paths Tabulation (${m_up_large}x${n_up_large})`, uniquePathsTabulation, m_up_large, n_up_large);
runBenchmark(`Unique Paths Space Optimized (${m_up_large}x${n_up_large})`, uniquePathsSpaceOptimized, m_up_large, n_up_large);

console.log('\n--- Benchmarks Complete ---');
```