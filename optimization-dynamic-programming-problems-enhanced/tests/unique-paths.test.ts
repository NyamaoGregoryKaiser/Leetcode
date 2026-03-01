/**
 * tests/unique-paths.test.ts
 *
 * Test suite for the Unique Paths implementations.
 * Uses Jest for testing.
 */

import {
    uniquePathsRecursive,
    uniquePathsMemoization,
    uniquePathsTabulation,
    uniquePathsSpaceOptimized,
    uniquePathsCombinatorial
} from '../src/algorithms/unique-paths';

describe('Unique Paths', () => {
    // Test cases for all implementations
    const testCases = [
        { m: 1, n: 1, expected: 1 }, // 1x1 grid
        { m: 1, n: 2, expected: 1 }, // 1 row, 2 cols
        { m: 2, n: 1, expected: 1 }, // 2 rows, 1 col
        { m: 2, n: 2, expected: 2 }, // [[S,R],[D,E]] S->R->E, S->D->E
        { m: 3, n: 2, expected: 3 }, // (0,0)->(2,1)
        { m: 2, n: 3, expected: 3 }, // (0,0)->(1,2)
        { m: 3, n: 3, expected: 6 }, // (0,0)->(2,2)
        { m: 7, n: 3, expected: 28 },
        { m: 3, n: 7, expected: 28 },
        { m: 10, n: 10, expected: 48620 },
        { m: 23, n: 12, expected: 193536720 }, // Larger numbers for DP methods
        { m: 1, n: 50, expected: 1 },
        { m: 50, n: 1, expected: 1 },
    ];

    // Recursive (Brute Force) tests
    describe('uniquePathsRecursive', () => {
        // Limiting recursive tests for smaller grids as it's O(2^(m+n))
        const recursiveTestCases = testCases.filter(tc => tc.m + tc.n <= 10); // Adjust max sum for reasonable runtime
        recursiveTestCases.forEach(({ m, n, expected }) => {
            test(`should return ${expected} for ${m}x${n} grid`, () => {
                expect(uniquePathsRecursive(m, n)).toBe(expected);
            });
        });

        // Specific test for a case that might be slow for full recursion but is within limits
        test('should handle 3x3 grid correctly (recursive)', () => {
            expect(uniquePathsRecursive(3, 3)).toBe(6);
        });

        // Edge cases
        test('should return 1 for 1x1 grid (recursive)', () => {
            expect(uniquePathsRecursive(1, 1)).toBe(1);
        });
        test('should return 1 for 1xN grid (recursive)', () => {
            expect(uniquePathsRecursive(1, 5)).toBe(1);
        });
        test('should return 1 for Nx1 grid (recursive)', () => {
            expect(uniquePathsRecursive(5, 1)).toBe(1);
        });
    });

    // Memoization (Top-Down DP) tests
    describe('uniquePathsMemoization', () => {
        testCases.forEach(({ m, n, expected }) => {
            test(`should return ${expected} for ${m}x${n} grid`, () => {
                const memo = Array(m).fill(0).map(() => Array(n).fill(-1));
                expect(uniquePathsMemoization(m, n, 0, 0, memo)).toBe(expected);
            });
        });

        // Edge cases
        test('should return 1 for 1x1 grid (memoization)', () => {
            expect(uniquePathsMemoization(1, 1)).toBe(1);
        });
        test('should return 1 for 1xN grid (memoization)', () => {
            expect(uniquePathsMemoization(1, 5)).toBe(1);
        });
        test('should return 1 for Nx1 grid (memoization)', () => {
            expect(uniquePathsMemoization(5, 1)).toBe(1);
        });
    });

    // Tabulation (Bottom-Up DP) tests
    describe('uniquePathsTabulation', () => {
        testCases.forEach(({ m, n, expected }) => {
            test(`should return ${expected} for ${m}x${n} grid`, () => {
                expect(uniquePathsTabulation(m, n)).toBe(expected);
            });
        });

        // Edge cases
        test('should return 1 for 1x1 grid (tabulation)', () => {
            expect(uniquePathsTabulation(1, 1)).toBe(1);
        });
        test('should return 1 for 1xN grid (tabulation)', () => {
            expect(uniquePathsTabulation(1, 5)).toBe(1);
        });
        test('should return 1 for Nx1 grid (tabulation)', () => {
            expect(uniquePathsTabulation(5, 1)).toBe(1);
        });
    });

    // Space-Optimized Tabulation tests
    describe('uniquePathsSpaceOptimized', () => {
        testCases.forEach(({ m, n, expected }) => {
            test(`should return ${expected} for ${m}x${n} grid`, () => {
                expect(uniquePathsSpaceOptimized(m, n)).toBe(expected);
            });
        });

        // Edge cases
        test('should return 1 for 1x1 grid (space-optimized)', () => {
            expect(uniquePathsSpaceOptimized(1, 1)).toBe(1);
        });
        test('should return 1 for 1xN grid (space-optimized)', () => {
            expect(uniquePathsSpaceOptimized(1, 5)).toBe(1);
        });
        test('should return 1 for Nx1 grid (space-optimized)', () => {
            expect(uniquePathsSpaceOptimized(5, 1)).toBe(1);
        });
    });

    // Combinatorial Solution tests
    describe('uniquePathsCombinatorial', () => {
        testCases.forEach(({ m, n, expected }) => {
            test(`should return ${expected} for ${m}x${n} grid`, () => {
                expect(uniquePathsCombinatorial(m, n)).toBe(expected);
            });
        });

        // Edge cases
        test('should return 1 for 1x1 grid (combinatorial)', () => {
            expect(uniquePathsCombinatorial(1, 1)).toBe(1);
        });
        test('should return 1 for 1xN grid (combinatorial)', () => {
            expect(uniquePathsCombinatorial(1, 5)).toBe(1);
        });
        test('should return 1 for Nx1 grid (combinatorial)', () => {
            expect(uniquePathsCombinatorial(5, 1)).toBe(1);
        });
        test('should return 0 for invalid grid (m=0)', () => {
            expect(uniquePathsCombinatorial(0, 5)).toBe(0);
        });
        test('should return 0 for invalid grid (n=0)', () => {
            expect(uniquePathsCombinatorial(5, 0)).toBe(0);
        });
        test('should return 0 for invalid grid (m=0, n=0)', () => {
            expect(uniquePathsCombinatorial(0, 0)).toBe(0);
        });
    });
});