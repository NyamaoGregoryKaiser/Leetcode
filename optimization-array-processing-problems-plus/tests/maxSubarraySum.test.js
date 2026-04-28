/**
 * @fileoverview Test suite for the "Maximum Subarray Sum" problem (Kadane's Algorithm).
 * Uses Jest for testing.
 */

const {
    maxSubarraySumKadane,
    maxSubarraySumBruteForce
} = require('../src/maxSubarraySum');

describe('maxSubarraySum', () => {

    // Array of all max subarray sum functions to test
    const sumFunctions = [
        { name: 'maxSubarraySumKadane (Optimal)', func: maxSubarraySumKadane },
        { name: 'maxSubarraySumBruteForce (Brute Force)', func: maxSubarraySumBruteForce }
    ];

    sumFunctions.forEach(({ name, func }) => {
        describe(`Function: ${name}`, () => {
            // Test Case 1: Example from problem description
            test('should return 6 for [-2,1,-3,4,-1,2,1,-5,4]', () => {
                const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
                expect(func(nums)).toBe(6);
            });

            // Test Case 2: All positive numbers
            test('should return sum of all elements for all positive numbers', () => {
                const nums = [1, 2, 3, 4, 5];
                expect(func(nums)).toBe(15);
            });

            // Test Case 3: All negative numbers (should return the largest negative number)
            test('should return the largest single negative number for all negative array', () => {
                const nums = [-5, -2, -8, -1, -3];
                expect(func(nums)).toBe(-1);
            });

            // Test Case 4: Single element array (positive)
            test('should handle single positive element array', () => {
                const nums = [1];
                expect(func(nums)).toBe(1);
            });

            // Test Case 5: Single element array (negative)
            test('should handle single negative element array', () => {
                const nums = [-10];
                expect(func(nums)).toBe(-10);
            });

            // Test Case 6: Array with leading/trailing negative sums
            test('should find max subarray within negative surroundings', () => {
                const nums = [-2, -3, 4, -1, -2, 1, 5, -3];
                expect(func(nums)).toBe(7); // Subarray [4, -1, -2, 1, 5]
            });

            // Test Case 7: All zeros
            test('should handle array with all zeros', () => {
                const nums = [0, 0, 0, 0];
                expect(func(nums)).toBe(0);
            });

            // Test Case 8: Mixed positive and negative
            test('should handle mixed positive and negative numbers correctly', () => {
                const nums = [5, 4, -1, 7, 8];
                expect(func(nums)).toBe(23); // Subarray [5,4,-1,7,8]
            });

            // Test Case 9: Another mixed array
            test('should handle another mixed array', () => {
                const nums = [1, 2, -1, -2, 2, 1, -2, 1, 4, -5, 4];
                expect(func(nums)).toBe(6); // Subarray [2, 1, -2, 1, 4]
            });

            // Test Case 10: Longer array to ensure correctness for more elements
            test('should handle longer array', () => {
                const nums = [10, -4, 3, 1, 5, 6, -35, 12, 21, -1];
                expect(func(nums)).toBe(33); // Subarray [12, 21]
            });

            // Test Case 11: Array with only two elements
            test('should handle two-element array', () => {
                expect(func([1, -5])).toBe(1);
                expect(func([-5, 1])).toBe(1);
                expect(func([2, 3])).toBe(5);
            });
        });
    });

    // Test for error handling for empty array, specific to implementations
    describe('Error Handling', () => {
        test('maxSubarraySumKadane should throw error for empty array', () => {
            expect(() => maxSubarraySumKadane([])).toThrow("Input array must not be empty.");
        });

        test('maxSubarraySumBruteForce should throw error for empty array', () => {
            expect(() => maxSubarraySumBruteForce([])).toThrow("Input array must not be empty.");
        });
    });
});