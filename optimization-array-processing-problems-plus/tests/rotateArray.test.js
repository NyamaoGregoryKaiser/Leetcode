/**
 * @fileoverview Test suite for the "Rotate Array" problem.
 * Uses Jest for testing.
 */

const {
    rotateArrayByReverse,
    rotateArrayBySplice,
    rotateArrayByTempArray
} = require('../src/rotateArray');

describe('rotateArray', () => {

    // Array of all rotation functions to test
    const rotateFunctions = [
        { name: 'rotateArrayByReverse (Optimal)', func: rotateArrayByReverse },
        { name: 'rotateArrayBySplice (Splice/Unshift)', func: rotateArrayBySplice },
        { name: 'rotateArrayByTempArray (Temp Array)', func: rotateArrayByTempArray }
    ];

    rotateFunctions.forEach(({ name, func }) => {
        describe(`Function: ${name}`, () => {
            // Test Case 1: Basic rotation
            test('should rotate a basic array by k steps', () => {
                const nums = [1, 2, 3, 4, 5, 6, 7];
                const k = 3;
                func(nums, k);
                expect(nums).toEqual([5, 6, 7, 1, 2, 3, 4]);
            });

            // Test Case 2: Another basic rotation
            test('should rotate a different array by k steps', () => {
                const nums = [-1, -100, 3, 99];
                const k = 2;
                func(nums, k);
                expect(nums).toEqual([3, 99, -1, -100]);
            });

            // Test Case 3: k equals array length (should result in no change)
            test('should not change array when k is equal to length', () => {
                const nums = [1, 2, 3];
                const k = 3;
                func(nums, k);
                expect(nums).toEqual([1, 2, 3]);
            });

            // Test Case 4: k greater than array length (should be k % n)
            test('should rotate correctly when k is greater than length', () => {
                const nums = [1, 2, 3, 4, 5];
                const k = 7; // 7 % 5 = 2 rotations
                func(nums, k);
                expect(nums).toEqual([4, 5, 1, 2, 3]);
            });

            // Test Case 5: k is 0 (no rotation)
            test('should not change array when k is 0', () => {
                const nums = [1, 2, 3, 4];
                const k = 0;
                func(nums, k);
                expect(nums).toEqual([1, 2, 3, 4]);
            });

            // Test Case 6: Empty array
            test('should handle empty array gracefully', () => {
                const nums = [];
                const k = 3;
                func(nums, k);
                expect(nums).toEqual([]);
            });

            // Test Case 7: Single element array
            test('should handle single element array', () => {
                const nums = [1];
                const k = 5;
                func(nums, k);
                expect(nums).toEqual([1]);
            });

            // Test Case 8: Array with duplicates
            test('should handle array with duplicate elements', () => {
                const nums = [1, 1, 2, 3, 1];
                const k = 2;
                func(nums, k);
                expect(nums).toEqual([3, 1, 1, 1, 2]);
            });

            // Test Case 9: Rotate by 1 step
            test('should rotate by 1 step', () => {
                const nums = [1, 2, 3, 4];
                const k = 1;
                func(nums, k);
                expect(nums).toEqual([4, 1, 2, 3]);
            });

            // Test Case 10: Rotate by length - 1 steps
            test('should rotate by length - 1 steps', () => {
                const nums = [1, 2, 3, 4];
                const k = 3; // Equivalent to rotating left by 1
                func(nums, k);
                expect(nums).toEqual([2, 3, 4, 1]);
            });

            // Test Case 11: Array with negative numbers
            test('should handle array with negative numbers', () => {
                const nums = [-10, 20, -30, 40];
                const k = 1;
                func(nums, k);
                expect(nums).toEqual([40, -10, 20, -30]);
            });
        });
    });
});