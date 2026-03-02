/**
 * tests/uniquePaths.test.ts
 *
 * Test suite for Unique Paths algorithms.
 */

import {
    uniquePaths_bruteForce,
    uniquePaths_memoized,
    uniquePaths_tabulated,
    uniquePaths_spaceOptimized
} from '../src/algorithms/uniquePaths';

describe('Unique Paths Algorithms', () => {

    const testCases = [
        { m: 1, n: 1, expected: 1 },
        { m: 1, n: 5, expected: 1 },
        { m: 5, n: 1, expected: 1 },
        { m: 2, n: 2, expected: 2 }, // R, D; D, R
        { m: 3, n: 2, expected: 3 }, // RRD, RDR, DRR (equivalent to m=2,n=3)
        { m: 2, n: 3, expected: 3 }, // RD, DR, RR
        { m: 3, n: 3, expected: 6 },
        { m: 3, n: 7, expected: 28 },
        { m: 7, n: 3, expected: 28 },
        { m: 10, n: 10, expected: 48620 },
        { m: 20, n: 2, expected: 20 },
        { m: 2, n: 20, expected: 20 },
    ];

    describe('uniquePaths_bruteForce', () => {
        // Brute force is exponential, so test only small cases.
        testCases.slice(0, 7).forEach(({ m, n, expected }) => {
            test(`should return ${expected} for m=${m}, n=${n}`, () => {
                expect(uniquePaths_bruteForce(m, n)).toBe(expected);
            });
        });

        test('should throw error for non-positive dimensions', () => {
            expect(() => uniquePaths_bruteForce(0, 5)).toThrow("Grid dimensions must be positive integers.");
            expect(() => uniquePaths_bruteForce(5, 0)).toThrow("Grid dimensions must be positive integers.");
            expect(() => uniquePaths_bruteForce(-1, 5)).toThrow("Grid dimensions must be positive integers.");
        });
    });

    describe('uniquePaths_memoized', () => {
        testCases.forEach(({ m, n, expected }) => {
            test(`should return ${expected} for m=${m}, n=${n}`, () => {
                expect(uniquePaths_memoized(m, n)).toBe(expected);
            });
        });

        test('should throw error for non-positive dimensions', () => {
            expect(() => uniquePaths_memoized(0, 5)).toThrow("Grid dimensions must be positive integers.");
        });

        test('should handle larger inputs efficiently', () => {
            expect(uniquePaths_memoized(15, 15)).toBe(40116600);
            expect(uniquePaths_memoized(23, 12)).toBe(1352078);
        });
    });

    describe('uniquePaths_tabulated', () => {
        testCases.forEach(({ m, n, expected }) => {
            test(`should return ${expected} for m=${m}, n=${n}`, () => {
                expect(uniquePaths_tabulated(m, n)).toBe(expected);
            });
        });

        test('should throw error for non-positive dimensions', () => {
            expect(() => uniquePaths_tabulated(0, 5)).toThrow("Grid dimensions must be positive integers.");
        });

        test('should handle larger inputs efficiently', () => {
            expect(uniquePaths_tabulated(15, 15)).toBe(40116600);
            expect(uniquePaths_tabulated(23, 12)).toBe(1352078);
        });
    });

    describe('uniquePaths_spaceOptimized', () => {
        testCases.forEach(({ m, n, expected }) => {
            test(`should return ${expected} for m=${m}, n=${n}`, () => {
                expect(uniquePaths_spaceOptimized(m, n)).toBe(expected);
            });
        });

        test('should throw error for non-positive dimensions', () => {
            expect(() => uniquePaths_spaceOptimized(0, 5)).toThrow("Grid dimensions must be positive integers.");
        });

        test('should handle larger inputs efficiently', () => {
            expect(uniquePaths_spaceOptimized(15, 15)).toBe(40116600);
            expect(uniquePaths_spaceOptimized(23, 12)).toBe(1352078);
        });
    });
});