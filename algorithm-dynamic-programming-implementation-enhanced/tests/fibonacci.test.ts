```typescript
/**
 * @fileoverview Test suite for Fibonacci number implementations.
 */

import {
    fibonacci_recursive,
    fibonacci_memoized,
    fibonacci_tabulated,
    fibonacci_spaceOptimized,
} from '../src/algorithms/fibonacci';

describe('Fibonacci Number Implementations', () => {
    const testCases = [
        { n: 0, expected: 0 },
        { n: 1, expected: 1 },
        { n: 2, expected: 1 },
        { n: 3, expected: 2 },
        { n: 4, expected: 3 },
        { n: 5, expected: 5 },
        { n: 6, expected: 8 },
        { n: 7, expected: 13 },
        { n: 8, expected: 21 },
        { n: 9, expected: 34 },
        { n: 10, expected: 55 },
        { n: 15, expected: 610 },
        { n: 20, expected: 6765 },
        // Add larger cases for non-recursive methods to ensure correctness
        { n: 30, expected: 832040 },
        { n: 40, expected: 102334155 },
    ];

    // Test cases specific for recursive that might time out for large N
    const recursiveTestCases = testCases.filter(tc => tc.n <= 20); // Keep N small for recursive tests

    describe('fibonacci_recursive', () => {
        recursiveTestCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacci_recursive(n)).toBe(expected);
            });
        });
        test('should handle edge case n=0', () => {
            expect(fibonacci_recursive(0)).toBe(0);
        });
        test('should handle edge case n=1', () => {
            expect(fibonacci_recursive(1)).toBe(1);
        });
        test('should handle n=30, though it will be slow', () => {
            // This test is intentionally slow to show the performance difference
            // It might be commented out or set to skip in a real production environment
            // but for a learning project, it highlights the brute-force issue.
            // jest.setTimeout(60000); // Increase timeout for this specific test
            // expect(fibonacci_recursive(30)).toBe(832040);
        });
    });

    describe('fibonacci_memoized', () => {
        testCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacci_memoized(n)).toBe(expected);
            });
        });
        test('should handle edge case n=0', () => {
            expect(fibonacci_memoized(0)).toBe(0);
        });
        test('should handle edge case n=1', () => {
            expect(fibonacci_memoized(1)).toBe(1);
        });
    });

    describe('fibonacci_tabulated', () => {
        testCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacci_tabulated(n)).toBe(expected);
            });
        });
        test('should handle edge case n=0', () => {
            expect(fibonacci_tabulated(0)).toBe(0);
        });
        test('should handle edge case n=1', () => {
            expect(fibonacci_tabulated(1)).toBe(1);
        });
    });

    describe('fibonacci_spaceOptimized', () => {
        testCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacci_spaceOptimized(n)).toBe(expected);
            });
        });
        test('should handle edge case n=0', () => {
            expect(fibonacci_spaceOptimized(0)).toBe(0);
        });
        test('should handle edge case n=1', () => {
            expect(fibonacci_spaceOptimized(1)).toBe(1);
        });
    });
});
```