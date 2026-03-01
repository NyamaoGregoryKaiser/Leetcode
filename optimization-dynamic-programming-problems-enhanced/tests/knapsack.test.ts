/**
 * tests/knapsack.test.ts
 *
 * Test suite for the 0/1 Knapsack Problem implementations.
 * Uses Jest for testing.
 */

import {
    knapsackRecursive,
    knapsackMemoization,
    knapsackTabulation
} from '../src/algorithms/knapsack';

describe('0/1 Knapsack Problem', () => {
    // Test cases for all implementations
    const testCases = [
        // Example from GeeksforGeeks
        { weights: [10, 20, 30], values: [60, 100, 120], capacity: 50, expected: 220 }, // Take items 20 and 30
        // Another common example
        { weights: [1, 2, 3], values: [6, 10, 12], capacity: 5, expected: 22 }, // Take items (2,10) and (3,12)
        // No items
        { weights: [], values: [], capacity: 10, expected: 0 },
        // Zero capacity
        { weights: [1, 2, 3], values: [6, 10, 12], capacity: 0, expected: 0 },
        // Single item, fits
        { weights: [10], values: [100], capacity: 10, expected: 100 },
        // Single item, doesn't fit
        { weights: [10], values: [100], capacity: 5, expected: 0 },
        // Multiple items, some fit, some don't
        { weights: [4, 5, 1], values: [1, 2, 3], capacity: 4, expected: 3 }, // Take item (1,3)
        { weights: [4, 5, 1], values: [1, 2, 3], capacity: 5, expected: 3 }, // Still (1,3), 5 value is for item with weight 5 which we could take, but value is lower
        { weights: [4, 5, 1], values: [1, 2, 3], capacity: 6, expected: 4 }, // Take (4,1) and (1,3)
        // Items with same weight, different values
        { weights: [2, 2, 2], values: [10, 15, 5], capacity: 4, expected: 25 }, // Take (2,10) and (2,15)
        // Large number of items (for DP methods)
        {
            weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            capacity: 20,
            expected: 20 // Example sum, will need to verify this manually or with an online calculator.
                         // For capacity 20, optimal sum of weights would be 10+9+1 = 20, sum of values 10+9+1=20
                         // Or 15+5=20, value 15+5=20. So 20 is a plausible max.
                         // Let's verify for a small set: [1,2,3,4,5], [1,2,3,4,5], capacity 7 -> Take (3,3)+(4,4) = 7, value 7.
                         // Or (2,2)+(5,5) = 7, value 7. Or (1,1)+(2,2)+(4,4) = 7, value 7. Max 7.
                         // Corrected expected for the large case.
                         // For weights [1..15], values [1..15], capacity 20, max value is indeed 20.
        },
    ];

    // Recursive (Brute Force) tests
    describe('knapsackRecursive', () => {
        // Limiting recursive tests for small N as it's O(2^N) and can be very slow
        const recursiveTestCases = testCases.filter(tc => tc.weights.length <= 10); // Adjust max N for reasonable runtime
        recursiveTestCases.forEach(({ weights, values, capacity, expected }) => {
            test(`should return ${expected} for items ${weights} (weights), capacity ${capacity}`, () => {
                expect(knapsackRecursive(weights, values, capacity)).toBe(expected);
            });
        });

        test('should return 220 for a common example (recursive)', () => {
            expect(knapsackRecursive([10, 20, 30], [60, 100, 120], 50)).toBe(220);
        });

        // Edge cases
        test('should return 0 for no items (recursive)', () => {
            expect(knapsackRecursive([], [], 10)).toBe(0);
        });
        test('should return 0 for zero capacity (recursive)', () => {
            expect(knapsackRecursive([1, 2, 3], [6, 10, 12], 0)).toBe(0);
        });
    });

    // Memoization (Top-Down DP) tests
    describe('knapsackMemoization', () => {
        testCases.forEach(({ weights, values, capacity, expected }) => {
            test(`should return ${expected} for items ${weights} (weights), capacity ${capacity}`, () => {
                const n = weights.length;
                const memo = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(-1));
                expect(knapsackMemoization(weights, values, capacity, n, memo)).toBe(expected);
            });
        });

        // Edge cases
        test('should return 0 for no items (memoization)', () => {
            expect(knapsackMemoization([], [], 10)).toBe(0);
        });
        test('should return 0 for zero capacity (memoization)', () => {
            expect(knapsackMemoization([1, 2, 3], [6, 10, 12], 0)).toBe(0);
        });
    });

    // Tabulation (Bottom-Up DP) tests
    describe('knapsackTabulation', () => {
        testCases.forEach(({ weights, values, capacity, expected }) => {
            test(`should return ${expected} for items ${weights} (weights), capacity ${capacity}`, () => {
                expect(knapsackTabulation(weights, values, capacity)).toBe(expected);
            });
        });

        // Edge cases
        test('should return 0 for no items (tabulation)', () => {
            expect(knapsackTabulation([], [], 10)).toBe(0);
        });
        test('should return 0 for zero capacity (tabulation)', () => {
            expect(knapsackTabulation([1, 2, 3], [6, 10, 12], 0)).toBe(0);
        });
    });
});