/**
 * @fileoverview Test suite for the "Product of Array Except Self" problem.
 * Uses Jest for testing.
 */

const {
    productExceptSelfOptimal,
    productExceptSelfBruteForce
} = require('../src/productExceptSelf');

describe('productExceptSelf', () => {

    // Array of all product functions to test
    const productFunctions = [
        { name: 'productExceptSelfOptimal (O(N) time, O(1) space)', func: productExceptSelfOptimal },
        { name: 'productExceptSelfBruteForce (O(N^2) time)', func: productExceptSelfBruteForce }
    ];

    productFunctions.forEach(({ name, func }) => {
        describe(`Function: ${name}`, () => {
            // Test Case 1: Basic positive numbers
            test('should return correct products for positive numbers', () => {
                const nums = [1, 2, 3, 4];
                expect(func(nums)).toEqual([24, 12, 8, 6]);
            });

            // Test Case 2: Array with zero
            test('should handle array with a single zero', () => {
                const nums = [1, 2, 0, 4];
                expect(func(nums)).toEqual([0, 0, 8, 0]);
            });

            // Test Case 3: Array with multiple zeros
            test('should handle array with multiple zeros', () => {
                const nums = [1, 0, 3, 0];
                expect(func(nums)).toEqual([0, 0, 0, 0]);
            });

            // Test Case 4: Array with negative numbers
            test('should handle array with negative numbers', () => {
                const nums = [-1, 1, -3, 3];
                expect(func(nums)).toEqual([-9, 9, -3, 3]);
            });

            // Test Case 5: Mix of positive, negative, and zero
            test('should handle mixed numbers including zero', () => {
                const nums = [-1, 1, 0, -3, 3];
                expect(func(nums)).toEqual([0, 0, 9, 0, 0]);
            });

            // Test Case 6: Single element array (edge case)
            test('should handle single element array', () => {
                const nums = [5];
                // Product except self for a single element array can be considered as 1 or the problem usually implies n > 1
                // LeetCode's problem constraints usually define n >= 2. If n=1, problem is underspecified.
                // For optimal solution, if n=1, answer is [1] (empty product is 1).
                // Brute force would also result in 1.
                expect(func(nums)).toEqual([1]); // Assuming product of empty set is 1
            });

            // Test Case 7: Two elements
            test('should handle two elements', () => {
                const nums = [2, 3];
                expect(func(nums)).toEqual([3, 2]);
            });

            // Test Case 8: All ones
            test('should handle array of all ones', () => {
                const nums = [1, 1, 1, 1];
                expect(func(nums)).toEqual([1, 1, 1, 1]);
            });

            // Test Case 9: Empty array - optimal solution handles this, brute force might error or return empty
            test('should handle empty array (optimal)', () => {
                const nums = [];
                expect(func(nums)).toEqual([]); // Optimal solution
            });

            // Test Case 10: Larger array (still small enough for O(N^2) to pass quickly)
            test('should work for a slightly larger array', () => {
                const nums = [1, 2, 3, 4, 5];
                expect(func(nums)).toEqual([120, 60, 40, 30, 24]);
            });
        });
    });
});