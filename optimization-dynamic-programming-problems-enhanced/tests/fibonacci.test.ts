/**
 * tests/fibonacci.test.ts
 *
 * Test suite for the Fibonacci Sequence implementations.
 * Uses Jest for testing.
 */

import {
    fibonacciRecursive,
    fibonacciMemoization,
    fibonacciTabulation,
    fibonacciSpaceOptimized
} from '../src/algorithms/fibonacci';

describe('Fibonacci Sequence', () => {
    // Test cases for all implementations
    const testCases = [
        { n: 0, expected: 0 },
        { n: 1, expected: 1 },
        { n: 2, expected: 1 },
        { n: 3, expected: 2 },
        { n: 4, expected: 3 },
        { n: 5, expected: 5 },
        { n: 6, expected: 8 },
        { n: 10, expected: 55 },
        { n: 20, expected: 6765 },
        { n: 30, expected: 832040 },
        // Larger numbers for DP methods (recursive might be too slow)
        { n: 40, expected: 102334155 },
    ];

    // Recursive (Brute Force) tests
    describe('fibonacciRecursive', () => {
        // Limiting recursive tests for larger N as it's O(2^N) and can be very slow or stack overflow
        const recursiveTestCases = testCases.filter(tc => tc.n <= 20); // Adjust max N for reasonable runtime
        recursiveTestCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacciRecursive(n)).toBe(expected);
            });
        });

        // Test with maximum n for recursive within reasonable limits
        test('should handle n = 20 correctly', () => {
            expect(fibonacciRecursive(20)).toBe(6765);
        });

        // Edge case: n=0 should return 0
        test('should return 0 for n = 0', () => {
            expect(fibonacciRecursive(0)).toBe(0);
        });

        // Edge case: n=1 should return 1
        test('should return 1 for n = 1', () => {
            expect(fibonacciRecursive(1)).toBe(1);
        });
    });

    // Memoization (Top-Down DP) tests
    describe('fibonacciMemoization', () => {
        testCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                // For memoization, we need to pass a fresh memo array for each test
                const memo: number[] = new Array(n + 1).fill(undefined);
                expect(fibonacciMemoization(n, memo)).toBe(expected);
            });
        });

        // Test with maximum n for DP methods
        test('should handle n = 40 correctly', () => {
            const n = 40;
            const memo: number[] = new Array(n + 1).fill(undefined);
            expect(fibonacciMemoization(n, memo)).toBe(102334155);
        });

        // Edge case: n=0 should return 0
        test('should return 0 for n = 0', () => {
            expect(fibonacciMemoization(0)).toBe(0);
        });

        // Edge case: n=1 should return 1
        test('should return 1 for n = 1', () => {
            expect(fibonacciMemoization(1)).toBe(1);
        });
    });

    // Tabulation (Bottom-Up DP) tests
    describe('fibonacciTabulation', () => {
        testCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacciTabulation(n)).toBe(expected);
            });
        });

        // Test with maximum n for DP methods
        test('should handle n = 40 correctly', () => {
            expect(fibonacciTabulation(40)).toBe(102334155);
        });

        // Edge case: n=0 should return 0
        test('should return 0 for n = 0', () => {
            expect(fibonacciTabulation(0)).toBe(0);
        });

        // Edge case: n=1 should return 1
        test('should return 1 for n = 1', () => {
            expect(fibonacciTabulation(1)).toBe(1);
        });
    });

    // Space-Optimized Tabulation tests
    describe('fibonacciSpaceOptimized', () => {
        testCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacciSpaceOptimized(n)).toBe(expected);
            });
        });

        // Test with maximum n for DP methods
        test('should handle n = 40 correctly', () => {
            expect(fibonacciSpaceOptimized(40)).toBe(102334155);
        });

        // Edge case: n=0 should return 0
        test('should return 0 for n = 0', () => {
            expect(fibonacciSpaceOptimized(0)).toBe(0);
        });

        // Edge case: n=1 should return 1
        test('should return 1 for n = 1', () => {
            expect(fibonacciSpaceOptimized(1)).toBe(1);
        });
    });
});