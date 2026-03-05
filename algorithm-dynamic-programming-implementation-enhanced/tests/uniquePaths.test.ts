```typescript
/**
 * @fileoverview Test suite for Unique Paths implementations.
 */

import {
    uniquePaths_recursive,
    uniquePaths_memoized,
    uniquePaths_tabulated,
    uniquePaths_spaceOptimized,
} from '../src/algorithms/uniquePaths';

describe('Unique Paths Implementations', () => {
    const testCases = [
        { m: 1, n: 1, expected: 1 }, // Single cell
        { m: 1, n: 5, expected: 1 }, // Single row
        { m: 5, n: 1, expected: 1 }, // Single column
        { m: 2, n: 2, expected: 2 }, // Right-Down, Down-Right
        { m: 3, n: 2, expected: 3 }, // RD, DR, DD
        { m: 2, n: 3, expected: 3 }, // DR, RD, DD
        { m: 3, n: 3, expected: 6 },
        { m: 7, n: 3, expected: 28 },
        { m: 3, n: 7, expected: 28 },
        { m: 10, n: 10, expected: 48620 },
        // Larger cases
        { m: 20, n: 20, expected: 35345263800 },
        { m: 100, n: 1, expected: 1 }, // Edge case, large M, small N
        { m: 1, n: 100, expected: 1 }, // Edge case, small M, large N
    ];

    // Recursive tests can be slow for larger inputs
    const recursiveTestCases = testCases.filter(tc => tc.m * tc.n <= 50); // Limit m*n for recursive

    describe('uniquePaths_recursive', () => {
        recursiveTestCases.forEach(({ m, n, expected }) => {
            test(`should return ${expected} for a ${m}x${n} grid`, () => {
                expect(uniquePaths_recursive(m, n)).toBe(expected);
            });
        });
        test('should handle 1x1 grid', () => {
            expect(uniquePaths_recursive(1, 1)).toBe(1);
        });
    });

    describe('uniquePaths_memoized', () => {
        testCases.forEach(({ m, n, expected }) => {
            test(`should return ${expected} for a ${m}x${n} grid`, () => {
                expect(uniquePaths_memoized(m, n)).toBe(expected);
            });
        });
        test('should handle 1x1 grid', () => {
            expect(uniquePaths_memoized(1, 1)).toBe(1);
        });
    });

    describe('uniquePaths_tabulated', () => {
        testCases.forEach(({ m, n, expected }) => {
            test(`should return ${expected} for a ${m}x${n} grid`, () => {
                expect(uniquePaths_tabulated(m, n)).toBe(expected);
            });
        });
        test('should handle 1x1 grid', () => {
            expect(uniquePaths_tabulated(1, 1)).toBe(1);
        });
    });

    describe('uniquePaths_spaceOptimized', () => {
        testCases.forEach(({ m, n, expected }) => {
            test(`should return ${expected} for a ${m}x${n} grid`, () => {
                expect(uniquePaths_spaceOptimized(m, n)).toBe(expected);
            });
        });
        test('should handle 1x1 grid', () => {
            expect(uniquePaths_spaceOptimized(1, 1)).toBe(1);
        });
    });
});
```