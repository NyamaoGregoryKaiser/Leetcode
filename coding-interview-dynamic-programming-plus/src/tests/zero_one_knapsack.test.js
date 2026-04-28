/**
 * @fileoverview Test suite for 0/1 Knapsack Problem implementations.
 */

const {
    knapsack_brute_force,
    knapsack_memo,
    knapsack_tab,
    knapsack_tab_optimized
} = require('../problems/zero_one_knapsack');

describe('0/1 Knapsack Problem Implementations', () => {

    // Define common test cases
    const testCases = [
        // Example 1: Basic case
        {
            weights: [1, 2, 3],
            values: [6, 10, 12],
            capacity: 5,
            expected: 22 // Take items with weights 2 and 3 (values 10 + 12 = 22)
        },
        // Example 2: Some items are too heavy
        {
            weights: [4, 5, 1],
            values: [1, 2, 3],
            capacity: 4,
            expected: 3 // Take item with weight 1 (value 3). Max value from (1,3), (4,1) -> 3. Cannot take 4, cannot take 5.
        },
        // Example 3: All items fit
        {
            weights: [1, 2, 3],
            values: [10, 20, 30],
            capacity: 6,
            expected: 60 // Take all items
        },
        // Example 4: No items can be taken
        {
            weights: [10, 20, 30],
            values: [60, 100, 120],
            capacity: 5,
            expected: 0
        },
        // Example 5: Single item fits
        {
            weights: [10],
            values: [60],
            capacity: 10,
            expected: 60
        },
        // Example 6: Single item too heavy
        {
            weights: [10],
            values: [60],
            capacity: 5,
            expected: 0
        },
        // Example 7: Empty items list
        {
            weights: [],
            values: [],
            capacity: 10,
            expected: 0
        },
        // Example 8: Zero capacity
        {
            weights: [1, 2, 3],
            values: [6, 10, 12],
            capacity: 0,
            expected: 0
        },
        // Example 9: Complex case
        {
            weights: [2, 3, 4, 5],
            values: [3, 4, 5, 6],
            capacity: 5,
            expected: 7 // Options: (2,3) -> 3+4=7. (3,4) + (no other fits) -> 4. (4,5) -> 5. (5,6) -> 6. Max is 7.
        },
        // Example 10: Another complex case
        {
            weights: [1, 3, 4, 5],
            values: [1, 4, 5, 7],
            capacity: 7,
            expected: 9 // Options: (1,1)+(3,4)+(?) -> 4+1=5+ (can't do 4,5. 1+3=4, rem 3, no more items. 5). Max (3,4)+(4,5) -> weight 7, value 9.
        },
        // Example 11: A common test pattern
        {
            weights: [10, 20, 30],
            values: [60, 100, 120],
            capacity: 50,
            expected: 220 // Take items with weights 20 and 30 (values 100 + 120 = 220)
        }
    ];

    // Test knapsack_brute_force
    describe('knapsack_brute_force', () => {
        // Brute force is exponential, so limit test cases for speed
        testCases.slice(0, 8).forEach(({ weights, values, capacity, expected }, index) => {
            test(`Test Case ${index + 1}: should return ${expected} for capacity ${capacity}`, () => {
                expect(knapsack_brute_force(weights, values, capacity)).toBe(expected);
            });
        });

        // For larger inputs, brute force is too slow, we'll skip or note.
        // For demonstration, we'll avoid very large 'n'.
        // Test with slightly more items to highlight inefficiency (but still pass in reasonable time)
        test('should correctly compute for moderate number of items', () => {
            const w = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // 15 items
            const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            const cap = 15;
            // The optimal for this simple case is sum of all values 1..15 = 15*16/2 = 120
            expect(knapsack_brute_force(w, v, cap)).toBe(120);
        });
    });

    // Test knapsack_memo
    describe('knapsack_memo (Memoization / Top-Down DP)', () => {
        testCases.forEach(({ weights, values, capacity, expected }, index) => {
            test(`Test Case ${index + 1}: should return ${expected} for capacity ${capacity}`, () => {
                expect(knapsack_memo(weights, values, capacity)).toBe(expected);
            });
        });
    });

    // Test knapsack_tab
    describe('knapsack_tab (Tabulation / Bottom-Up DP)', () => {
        testCases.forEach(({ weights, values, capacity, expected }, index) => {
            test(`Test Case ${index + 1}: should return ${expected} for capacity ${capacity}`, () => {
                expect(knapsack_tab(weights, values, capacity)).toBe(expected);
            });
        });
    });

    // Test knapsack_tab_optimized
    describe('knapsack_tab_optimized (Tabulation with O(W) Space)', () => {
        testCases.forEach(({ weights, values, capacity, expected }, index) => {
            test(`Test Case ${index + 1}: should return ${expected} for capacity ${capacity}`, () => {
                expect(knapsack_tab_optimized(weights, values, capacity)).toBe(expected);
            });
        });
    });
});