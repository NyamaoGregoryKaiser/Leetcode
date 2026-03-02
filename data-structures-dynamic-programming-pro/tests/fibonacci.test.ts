/**
 * tests/fibonacci.test.ts
 *
 * Test suite for Fibonacci number calculation algorithms.
 */

import {
    fibonacci_bruteForce,
    fibonacci_memoized,
    fibonacci_tabulated,
    fibonacci_spaceOptimized
} from '../src/algorithms/fibonacci';

describe('Fibonacci Number Algorithms', () => {

    // Test cases for valid inputs
    const testCases = [
        { n: 0, expected: 0 },
        { n: 1, expected: 1 },
        { n: 2, expected: 1 },
        { n: 3, expected: 2 },
        { n: 4, expected: 3 },
        { n: 5, expected: 5 },
        { n: 6, expected: 8 },
        { n: 10, expected: 55 },
        { n: 15, expected: 610 },
        { n: 20, expected: 6765 },
    ];

    // Test brute force (only for smaller N due to exponential complexity)
    describe('fibonacci_bruteForce', () => {
        testCases.slice(0, 15).forEach(({ n, expected }) => { // Limit to smaller N for brute force
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacci_bruteForce(n)).toBe(expected);
            });
        });

        test('should throw error for negative input', () => {
            expect(() => fibonacci_bruteForce(-1)).toThrow("Input must be a non-negative integer.");
        });
    });

    // Test memoized version
    describe('fibonacci_memoized', () => {
        testCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacci_memoized(n)).toBe(expected);
            });
        });

        test('should throw error for negative input', () => {
            expect(() => fibonacci_memoized(-1)).toThrow("Input must be a non-negative integer.");
        });

        test('should handle larger N efficiently', () => {
            expect(fibonacci_memoized(30)).toBe(832040);
        });
    });

    // Test tabulated version
    describe('fibonacci_tabulated', () => {
        testCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacci_tabulated(n)).toBe(expected);
            });
        });

        test('should throw error for negative input', () => {
            expect(() => fibonacci_tabulated(-1)).toThrow("Input must be a non-negative integer.");
        });

        test('should handle larger N efficiently', () => {
            expect(fibonacci_tabulated(30)).toBe(832040);
        });
    });

    // Test space-optimized version
    describe('fibonacci_spaceOptimized', () => {
        testCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacci_spaceOptimized(n)).toBe(expected);
            });
        });

        test('should throw error for negative input', () => {
            expect(() => fibonacci_spaceOptimized(-1)).toThrow("Input must be a non-negative integer.");
        });

        test('should handle larger N efficiently', () => {
            expect(fibonacci_spaceOptimized(30)).toBe(832040);
        });
    });
});