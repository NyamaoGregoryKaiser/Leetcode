```typescript
/**
 * @fileoverview Performance benchmarking for Dynamic Programming algorithms.
 * This suite compares the execution time of different approaches (recursive, memoized, tabulated, space-optimized)
 * for the implemented DP problems, highlighting the performance benefits of DP.
 */

import { benchmarkFunctions, BenchmarkFunction, formatTime } from '../src/utils/timer';
import {
    fibonacci_recursive,
    fibonacci_memoized,
    fibonacci_tabulated,
    fibonacci_spaceOptimized,
} from '../src/algorithms/fibonacci';
import {
    uniquePaths_recursive,
    uniquePaths_memoized,
    uniquePaths_tabulated,
    uniquePaths_spaceOptimized,
} from '../src/algorithms/uniquePaths';
import {
    coinChange_recursive,
    coinChange_memoized,
    coinChange_tabulated,
} from '../src/algorithms/coinChange';
import {
    lis_recursive,
    lis_memoized,
    lis_tabulated,
    lis_nLogn,
} from '../src/algorithms/longestIncreasingSubsequence';
import {
    knapsack01_recursive,
    knapsack01_memoized,
    knapsack01_tabulated,
    knapsack01_spaceOptimized,
} from '../src/algorithms/knapsack01';

// Increase Jest timeout for performance tests, as some brute-force might take longer.
jest.setTimeout(60 * 1000); // 60 seconds

describe('Dynamic Programming Performance Benchmarks', () => {

    console.log('\n--- DP Algorithm Performance Benchmarks ---');

    // --- Fibonacci Number ---
    describe('Fibonacci Number (N=40)', () => {
        const n = 40; // N=40 will make recursive very slow
        const fibonacciFunctions: BenchmarkFunction<typeof fibonacci_recursive>[] = [
            { name: 'Recursive', func: fibonacci_recursive },
            { name: 'Memoized', func: fibonacci_memoized },
            { name: 'Tabulated', func: fibonacci_tabulated },
            { name: 'Space Optimized', func: fibonacci_spaceOptimized },
        ];

        test(`should compare performance for F(${n})`, () => {
            console.log(`\nBenchmarking Fibonacci for N = ${n}:`);
            const results = benchmarkFunctions(fibonacciFunctions, n);

            results.forEach(res => {
                console.log(`  ${res.name.padEnd(18)}: ${formatTime(res.timeMs)} (Result: ${res.result})`);
            });

            // Assertions for correctness (already covered by unit tests, but good for sanity)
            const expectedResult = 102334155;
            expect(results[0].result).toBe(expectedResult); // Recursive (if it completes)
            expect(results[1].result).toBe(expectedResult); // Memoized
            expect(results[2].result).toBe(expectedResult); // Tabulated
            expect(results[3].result).toBe(expectedResult); // Space Optimized

            // Assertions for performance (relative, not absolute values)
            // Memoized/Tabulated/Space Optimized should be significantly faster than Recursive
            if (results[0].timeMs < Infinity) { // If recursive completed
                 expect(results[1].timeMs).toBeLessThan(results[0].timeMs);
                 expect(results[2].timeMs).toBeLessThan(results[0].timeMs);
                 expect(results[3].timeMs).toBeLessThan(results[0].timeMs);
            }
            expect(results[1].timeMs).toBeLessThan(100); // Should be very fast
            expect(results[2].timeMs).toBeLessThan(100); // Should be very fast
            expect(results[3].timeMs).toBeLessThan(100); // Should be very fast
        });
    });

    // --- Unique Paths ---
    describe('Unique Paths (M=15, N=15)', () => {
        const m = 15;
        const n = 15;
        const uniquePathsFunctions: BenchmarkFunction<typeof uniquePaths_recursive>[] = [
            { name: 'Recursive', func: uniquePaths_recursive },
            { name: 'Memoized', func: uniquePaths_memoized },
            { name: 'Tabulated', func: uniquePaths_tabulated },
            { name: 'Space Optimized', func: uniquePaths_spaceOptimized },
        ];

        test(`should compare performance for ${m}x${n} grid`, () => {
            console.log(`\nBenchmarking Unique Paths for ${m}x${n} grid:`);
            const results = benchmarkFunctions(uniquePathsFunctions, m, n);

            results.forEach(res => {
                console.log(`  ${res.name.padEnd(18)}: ${formatTime(res.timeMs)} (Result: ${res.result})`);
            });

            const expectedResult = 40116600; // For 15x15
            // Assertions for correctness
            expect(results[0].result).toBe(expectedResult);
            expect(results[1].result).toBe(expectedResult);
            expect(results[2].result).toBe(expectedResult);
            expect(results[3].result).toBe(expectedResult);

            // Assertions for performance
            if (results[0].timeMs < Infinity) {
                expect(results[1].timeMs).toBeLessThan(results[0].timeMs);
                expect(results[2].timeMs).toBeLessThan(results[0].timeMs);
                expect(results[3].timeMs).toBeLessThan(results[0].timeMs);
            }
            expect(results[1].timeMs).toBeLessThan(100);
            expect(results[2].timeMs).toBeLessThan(100);
            expect(results[3].timeMs).toBeLessThan(100);
        });
    });

    // --- Coin Change ---
    describe('Coin Change (Coins=[1,2,5], Amount=1000)', () => {
        const coins = [1, 2, 5];
        const amount = 1000; // Smallest coins, large amount, brute force will explode.
        const coinChangeFunctions: BenchmarkFunction<typeof coinChange_recursive>[] = [
            // Note: recursive will likely time out or stack overflow for amount=1000
            // { name: 'Recursive', func: coinChange_recursive },
            { name: 'Memoized', func: coinChange_memoized },
            { name: 'Tabulated', func: coinChange_tabulated },
        ];

        test(`should compare performance for amount ${amount} with coins [${coins}]`, () => {
            console.log(`\nBenchmarking Coin Change for Amount = ${amount} with Coins = [${coins}]:`);
            const results = benchmarkFunctions(coinChangeFunctions, coins, amount);

            results.forEach(res => {
                console.log(`  ${res.name.padEnd(18)}: ${formatTime(res.timeMs)} (Result: ${res.result})`);
            });

            const expectedResult = 200; // 1000 / 5
            // Assertions for correctness
            expect(results[0].result).toBe(expectedResult); // Memoized
            expect(results[1].result).toBe(expectedResult); // Tabulated

            // Memoized and Tabulated should be fast
            expect(results[0].timeMs).toBeLessThan(100);
            expect(results[1].timeMs).toBeLessThan(100);
        });
    });

    // --- Longest Increasing Subsequence ---
    describe('LIS (N=500, mixed numbers)', () => {
        // Generate a random array of N numbers for LIS.
        const N_LIS = 500;
        const nums_lis = Array.from({ length: N_LIS }, () => Math.floor(Math.random() * N_LIS * 2));

        const lisFunctions: BenchmarkFunction<typeof lis_recursive>[] = [
            // { name: 'Recursive', func: lis_recursive }, // Too slow for N=500
            // { name: 'Memoized', func: lis_memoized }, // Too slow for N=500 (O(N^2))
            { name: 'Tabulated (O(N^2))', func: lis_tabulated },
            { name: 'N log N', func: lis_nLogn },
        ];

        test(`should compare performance for LIS with N = ${N_LIS} elements`, () => {
            console.log(`\nBenchmarking LIS for N = ${N_LIS} elements:`);
            const results = benchmarkFunctions(lisFunctions, nums_lis);

            results.forEach(res => {
                console.log(`  ${res.name.padEnd(18)}: ${formatTime(res.timeMs)} (Result: ${res.result})`);
            });

            // Assertions for correctness (all should produce the same result)
            const expectedResult = results[0].result;
            expect(results[1].result).toBe(expectedResult);

            // Assertions for performance: N log N should be significantly faster than N^2
            expect(results[1].timeMs).toBeLessThan(results[0].timeMs);
            expect(results[1].timeMs).toBeLessThan(100); // N log N should be very fast
        });
    });

    // --- 0/1 Knapsack Problem ---
    describe('0/1 Knapsack (N=100 items, Capacity=1000)', () => {
        const N_KNAPSACK = 100;
        const CAPACITY_KNAPSACK = 1000;
        const weights = Array.from({ length: N_KNAPSACK }, (_, i) => Math.floor(Math.random() * 20) + 1); // weights 1-20
        const values = Array.from({ length: N_KNAPSACK }, (_, i) => Math.floor(Math.random() * 50) + 10); // values 10-60

        const knapsackFunctions: BenchmarkFunction<typeof knapsack01_recursive>[] = [
            // { name: 'Recursive', func: knapsack01_recursive }, // Too slow for N=100
            { name: 'Memoized', func: knapsack01_memoized },
            { name: 'Tabulated', func: knapsack01_tabulated },
            { name: 'Space Optimized', func: knapsack01_spaceOptimized },
        ];

        test(`should compare performance for N=${N_KNAPSACK} items, Capacity=${CAPACITY_KNAPSACK}`, () => {
            console.log(`\nBenchmarking 0/1 Knapsack for N = ${N_KNAPSACK} items, Capacity = ${CAPACITY_KNAPSACK}:`);
            const results = benchmarkFunctions(knapsackFunctions, weights, values, CAPACITY_KNAPSACK);

            results.forEach(res => {
                console.log(`  ${res.name.padEnd(18)}: ${formatTime(res.timeMs)} (Result: ${res.result})`);
            });

            // Assertions for correctness
            const expectedResult = results[0].result; // Assuming memoized is correct
            expect(results[1].result).toBe(expectedResult); // Tabulated
            expect(results[2].result).toBe(expectedResult); // Space Optimized

            // Assertions for performance
            expect(results[1].timeMs).toBeLessThan(results[0].timeMs * 2); // Tabulated might be slightly faster or slower than memoized due to overheads, but same order
            expect(results[2].timeMs).toBeLessThan(results[0].timeMs * 2); // Space Optimized also similar time complexity
        });
    });
});
```