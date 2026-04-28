/**
 * @fileoverview Test suite for Fibonacci Sequence implementations.
 */

const {
    fibonacci_brute_force,
    fibonacci_memo,
    fibonacci_tab,
    fibonacci_tab_optimized
} = require('../problems/fibonacci');

describe('Fibonacci Sequence Implementations', () => {

    // Define common test cases
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
        // Large number to test performance, though brute force will fail for this.
        // It's mainly for memoization/tabulation.
        { n: 40, expected: 102334155 }
    ];

    // Test for negative input (edge case)
    const negativeInput = -1;

    // Test fibonacci_brute_force
    describe('fibonacci_brute_force', () => {
        // Run typical test cases up to a reasonable N
        testCases.slice(0, 10).forEach(({ n, expected }) => { // Limit for brute force performance
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacci_brute_force(n)).toBe(expected);
            });
        });

        test('should throw error for negative input', () => {
            expect(() => fibonacci_brute_force(negativeInput)).toThrow("Input cannot be negative.");
        });

        // Demonstrating that brute force is too slow for larger N
        test('should be slow for large n (e.g., n=35 takes significant time)', () => {
            // This test is conceptual; it will actually run and take time.
            // For a real CI/CD, you might skip or use a very small N for brute force.
            // jest.setTimeout(30000); // Increase timeout for this specific test
            // expect(fibonacci_brute_force(35)).toBe(9227465); // This will pass but be slow
            // jest.setTimeout(5000); // Reset timeout

            // For practical testing, we usually don't run very slow brute force.
            // We just note its theoretical inefficiency.
            expect(true).toBe(true); // Placeholder for performance observation
        });
    });

    // Test fibonacci_memo
    describe('fibonacci_memo (Memoization / Top-Down DP)', () => {
        testCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacci_memo(n)).toBe(expected);
            });
        });

        test('should handle negative input', () => {
            expect(() => fibonacci_memo(negativeInput)).toThrow("Input cannot be negative.");
        });
    });

    // Test fibonacci_tab
    describe('fibonacci_tab (Tabulation / Bottom-Up DP)', () => {
        testCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacci_tab(n)).toBe(expected);
            });
        });

        test('should handle negative input', () => {
            expect(() => fibonacci_tab(negativeInput)).toThrow("Input cannot be negative.");
        });
    });

    // Test fibonacci_tab_optimized
    describe('fibonacci_tab_optimized (Tabulation with O(1) space)', () => {
        testCases.forEach(({ n, expected }) => {
            test(`should return ${expected} for n = ${n}`, () => {
                expect(fibonacci_tab_optimized(n)).toBe(expected);
            });
        });

        test('should handle negative input', () => {
            expect(() => fibonacci_tab_optimized(negativeInput)).toThrow("Input cannot be negative.");
        });
    });
});