/**
 * tests/performance.test.ts
 *
 * Performance benchmarking for selected Dynamic Programming algorithms.
 * This file compares brute force, memoized, tabulated, and space-optimized
 * versions for specific larger inputs to demonstrate efficiency gains.
 *
 * To run this test: `npm run test:performance`
 */

import {
    fibonacci_bruteForce,
    fibonacci_memoized,
    fibonacci_tabulated,
    fibonacci_spaceOptimized
} from '../src/algorithms/fibonacci';

import {
    uniquePaths_bruteForce,
    uniquePaths_memoized,
    uniquePaths_tabulated,
    uniquePaths_spaceOptimized
} from '../src/algorithms/uniquePaths';

import {
    coinChange_bruteForce,
    coinChange_memoized,
    coinChange_tabulated
} from '../src/algorithms/coinChange';

import {
    longestCommonSubsequence_bruteForce,
    longestCommonSubsequence_memoized,
    longestCommonSubsequence_tabulated,
    longestCommonSubsequence_spaceOptimized
} from '../src/algorithms/longestCommonSubsequence';

import {
    knapsack01_bruteForce,
    knapsack01_memoized,
    knapsack01_tabulated,
    knapsack01_spaceOptimized
} from '../src/algorithms/knapsack01';
import { KnapsackItem } from '../src/types';

// Helper to measure execution time
function measureExecutionTime<T extends (...args: any[]) => any>(
    func: T,
    ...args: Parameters<T>
): [ReturnType<T>, number] {
    const start = process.hrtime.bigint();
    const result = func(...args);
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds
    return [result, durationMs];
}

describe('Dynamic Programming Algorithm Performance Benchmarks', () => {

    // --- Fibonacci Numbers ---
    describe('Fibonacci (N=40)', () => {
        const N = 40; // N=20-25 for brute force already takes noticeable time, N=40 for DP is instant
        const expected = 102334155;

        // Brute force is deliberately not run for N=40 as it would take too long (> 1 minute)
        // If you want to try it for smaller N, e.g., N=20:
        // test(`fibonacci_bruteForce (N=${20})`, () => {
        //     const [result, time] = measureExecutionTime(() => fibonacci_bruteForce(20));
        //     console.log(`  fibonacci_bruteForce (N=20): ${time.toFixed(3)} ms`);
        //     expect(result).toBe(6765);
        //     expect(time).toBeGreaterThan(1); // Expect it to take a measurable amount of time
        // });

        test(`fibonacci_memoized (N=${N})`, () => {
            const [result, time] = measureExecutionTime(() => fibonacci_memoized(N));
            console.log(`  fibonacci_memoized (N=${N}): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(10); // Should be very fast
        });

        test(`fibonacci_tabulated (N=${N})`, () => {
            const [result, time] = measureExecutionTime(() => fibonacci_tabulated(N));
            console.log(`  fibonacci_tabulated (N=${N}): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(10); // Should be very fast
        });

        test(`fibonacci_spaceOptimized (N=${N})`, () => {
            const [result, time] = measureExecutionTime(() => fibonacci_spaceOptimized(N));
            console.log(`  fibonacci_spaceOptimized (N=${N}): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(10); // Should be very fast
        });
    });

    // --- Unique Paths ---
    describe('Unique Paths (m=15, n=15)', () => {
        const M = 15;
        const N = 15;
        const expected = 40116600;

        // Brute force uniquePaths_bruteForce(10,10) already takes seconds.
        // Skipping for M=15, N=15 to avoid excessively long test runs.
        // If testing small values:
        // test(`uniquePaths_bruteForce (M=${5}, N=${5})`, () => {
        //     const [result, time] = measureExecutionTime(() => uniquePaths_bruteForce(5, 5));
        //     console.log(`  uniquePaths_bruteForce (M=5, N=5): ${time.toFixed(3)} ms`);
        //     expect(result).toBe(70);
        //     expect(time).toBeGreaterThan(1);
        // });

        test(`uniquePaths_memoized (M=${M}, N=${N})`, () => {
            const [result, time] = measureExecutionTime(() => uniquePaths_memoized(M, N));
            console.log(`  uniquePaths_memoized (M=${M}, N=${N}): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(50); // Should be efficient
        });

        test(`uniquePaths_tabulated (M=${M}, N=${N})`, () => {
            const [result, time] = measureExecutionTime(() => uniquePaths_tabulated(M, N));
            console.log(`  uniquePaths_tabulated (M=${M}, N=${N}): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(50);
        });

        test(`uniquePaths_spaceOptimized (M=${M}, N=${N})`, () => {
            const [result, time] = measureExecutionTime(() => uniquePaths_spaceOptimized(M, N));
            console.log(`  uniquePaths_spaceOptimized (M=${M}, N=${N}): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(50);
        });
    });

    // --- Coin Change ---
    describe('Coin Change (amount=1000, coins=[1, 5, 10, 25, 50, 100])', () => {
        const coins = [1, 5, 10, 25, 50, 100];
        const amount = 1000; // Expected: 10 (10x100) or 20 (20x50) depending on greedy. No, this is optimal.
        // For 1000, if 100 is available, take 10x100 = 10 coins.
        const expected = 10;

        // Brute force coinChange_bruteForce for amount=1000 is extremely slow.
        // Skipping for this test. Try amount=10, coins=[1,2,5] for BF (expected 2)
        // test(`coinChange_bruteForce (amount=${10})`, () => {
        //     const [result, time] = measureExecutionTime(() => coinChange_bruteForce([1,2,5], 10));
        //     console.log(`  coinChange_bruteForce (amount=10): ${time.toFixed(3)} ms`);
        //     expect(result).toBe(2); // 5+5
        //     expect(time).toBeGreaterThan(1);
        // });

        test(`coinChange_memoized (amount=${amount}, coins=[...])`, () => {
            const [result, time] = measureExecutionTime(() => coinChange_memoized(coins, amount));
            console.log(`  coinChange_memoized (amount=${amount}): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(100); // Should be efficient
        });

        test(`coinChange_tabulated (amount=${amount}, coins=[...])`, () => {
            const [result, time] = measureExecutionTime(() => coinChange_tabulated(coins, amount));
            console.log(`  coinChange_tabulated (amount=${amount}): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(100);
        });
    });

    // --- Longest Common Subsequence ---
    describe('Longest Common Subsequence (text lengths ~50)', () => {
        const text1 = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"; // Length 52
        const text2 = "axbyczdwefvgthijkulmnopqrsxtuavywz"; // Length 34, LCS "abcdefghijklmnopqrstuvwxyz" (length 26)
        const expected = 26;

        // Brute force LCS for these lengths is extremely slow.
        // Skipping for this test. Try shorter strings if needed for BF.
        // test(`longestCommonSubsequence_bruteForce (len ~10)`, () => {
        //     const [result, time] = measureExecutionTime(() => longestCommonSubsequence_bruteForce("AGGTAB", "GXTXAYB"));
        //     console.log(`  lcs_bruteForce (len ~10): ${time.toFixed(3)} ms`);
        //     expect(result).toBe(4);
        //     expect(time).toBeGreaterThan(1);
        // });

        test(`longestCommonSubsequence_memoized (len ~50)`, () => {
            const [result, time] = measureExecutionTime(() => longestCommonSubsequence_memoized(text1, text2));
            console.log(`  longestCommonSubsequence_memoized (len ~50): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(100); // Should be efficient
        });

        test(`longestCommonSubsequence_tabulated (len ~50)`, () => {
            const [result, time] = measureExecutionTime(() => longestCommonSubsequence_tabulated(text1, text2));
            console.log(`  longestCommonSubsequence_tabulated (len ~50): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(100);
        });

        test(`longestCommonSubsequence_spaceOptimized (len ~50)`, () => {
            const [result, time] = measureExecutionTime(() => longestCommonSubsequence_spaceOptimized(text1, text2));
            console.log(`  longestCommonSubsequence_spaceOptimized (len ~50): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(100);
        });
    });

    // --- 0/1 Knapsack ---
    describe('0/1 Knapsack (items=20, capacity=100)', () => {
        const items: KnapsackItem[] = Array.from({ length: 20 }, (_, i) => ({
            weight: i + 1,
            value: (i + 1) * 10
        }));
        const capacity = 100;
        const expected = 1000;

        // Brute force knapsack01_bruteForce for 20 items is extremely slow (2^20 operations).
        // Skipping for this test. Try with 10 items for BF:
        // const smallItems: KnapsackItem[] = Array.from({ length: 10 }, (_, i) => ({ weight: i + 1, value: (i + 1) * 10 }));
        // test(`knapsack01_bruteForce (items=10, cap=50)`, () => {
        //     const [result, time] = measureExecutionTime(() => knapsack01_bruteForce(smallItems, 50));
        //     console.log(`  knapsack01_bruteForce (items=10, cap=50): ${time.toFixed(3)} ms`);
        //     expect(result).toBe(300); // (10,9,8,7,6,5,4,3,2,1) sum to 550, take items {10,9,8,7,6,5,4,3,2,1}
        //                                // Max sum of weights <= 50. 10+9+8+7+6+5+4+1 = 50. Value 500.
        //                                // Or 10+9+8+7+6+5+4+3+2+1 = 55.
        //                                // Correct for smallItems, cap 50 should be 300 (sum of (10,9,8,7,6,5,4,3,2,1) = 55. Value sum * 10 = 550)
        //                                // For capacity 50: items from (1,10) to (10,100). Result is 300 for (10,20,30,40,50) sum 150.
        //                                // Max sum of weights <= 50: (10, 9, 8, 7, 6, 5, 4, 1) -> sum = 50. Value = 500.
        //                                // Max for sum(W) <= 50: Take {10, 9, 8, 7, 6, 5, 4, 1}. Sum weights = 50. Sum values = 500.
        //                                // Let's re-run for 10 items, cap 50. Expected: 500.
        //     expect(result).toBe(500);
        //     expect(time).toBeGreaterThan(1);
        // });

        test(`knapsack01_memoized (items=${items.length}, capacity=${capacity})`, () => {
            const [result, time] = measureExecutionTime(() => knapsack01_memoized(items, capacity));
            console.log(`  knapsack01_memoized (items=${items.length}, capacity=${capacity}): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(100); // Should be efficient (N*C operations)
        });

        test(`knapsack01_tabulated (items=${items.length}, capacity=${capacity})`, () => {
            const [result, time] = measureExecutionTime(() => knapsack01_tabulated(items, capacity));
            console.log(`  knapsack01_tabulated (items=${items.length}, capacity=${capacity}): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(100);
        });

        test(`knapsack01_spaceOptimized (items=${items.length}, capacity=${capacity})`, () => {
            const [result, time] = measureExecutionTime(() => knapsack01_spaceOptimized(items, capacity));
            console.log(`  knapsack01_spaceOptimized (items=${items.length}, capacity=${capacity}): ${time.toFixed(3)} ms`);
            expect(result).toBe(expected);
            expect(time).toBeLessThan(100);
        });
    });
});