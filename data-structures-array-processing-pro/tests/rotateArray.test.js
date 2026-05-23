```javascript
/**
 * @fileoverview Test suite for Rotate Array problem.
 * Uses Jest for testing various approaches.
 */

const {
    rotateArray_tempArray,
    rotateArray_reverse,
    rotateArray_cyclicReplacement
} = require('../src/problems/rotateArray');

// Helper function to create a deep copy of an array for testing in-place modifications
const createDeepCopy = (arr) => arr.slice();

describe('Rotate Array - Using Temporary Array (Non-in-place logic)', () => {
    test('should rotate an array to the right by k steps', () => {
        const nums = [1, 2, 3, 4, 5, 6, 7];
        const k = 3;
        rotateArray_tempArray(nums, k);
        expect(nums).toEqual([5, 6, 7, 1, 2, 3, 4]);
    });

    test('should handle k greater than array length', () => {
        const nums = [1, 2, 3, 4, 5];
        const k = 7; // k % n = 7 % 5 = 2
        rotateArray_tempArray(nums, k);
        expect(nums).toEqual([4, 5, 1, 2, 3]);
    });

    test('should handle k equal to array length (no effective rotation)', () => {
        const nums = [1, 2, 3, 4];
        const k = 4; // k % n = 0
        rotateArray_tempArray(nums, k);
        expect(nums).toEqual([1, 2, 3, 4]);
    });

    test('should handle k = 0 (no rotation)', () => {
        const nums = [1, 2, 3, 4, 5];
        const k = 0;
        rotateArray_tempArray(nums, k);
        expect(nums).toEqual([1, 2, 3, 4, 5]);
    });

    test('should handle single element array', () => {
        const nums = [1];
        const k = 3;
        rotateArray_tempArray(nums, k);
        expect(nums).toEqual([1]);
    });

    test('should handle empty array', () => {
        const nums = [];
        const k = 5;
        rotateArray_tempArray(nums, k);
        expect(nums).toEqual([]);
    });

    test('should handle array with negative numbers', () => {
        const nums = [-1, -100, 3, 99];
        const k = 2;
        rotateArray_tempArray(nums, k);
        expect(nums).toEqual([3, 99, -1, -100]);
    });

    test('should handle two elements array, k=1', () => {
        const nums = [1, 2];
        const k = 1;
        rotateArray_tempArray(nums, k);
        expect(nums).toEqual([2, 1]);
    });

    test('should handle two elements array, k=2', () => {
        const nums = [1, 2];
        const k = 2; // k % n = 0
        rotateArray_tempArray(nums, k);
        expect(nums).toEqual([1, 2]);
    });
});

describe('Rotate Array - Using Reverse Technique (Optimal, In-place)', () => {
    test('should rotate an array to the right by k steps', () => {
        const nums = [1, 2, 3, 4, 5, 6, 7];
        const k = 3;
        rotateArray_reverse(nums, k);
        expect(nums).toEqual([5, 6, 7, 1, 2, 3, 4]);
    });

    test('should handle k greater than array length', () => {
        const nums = [1, 2, 3, 4, 5];
        const k = 7; // k % n = 2
        rotateArray_reverse(nums, k);
        expect(nums).toEqual([4, 5, 1, 2, 3]);
    });

    test('should handle k equal to array length (no effective rotation)', () => {
        const nums = [1, 2, 3, 4];
        const k = 4; // k % n = 0
        rotateArray_reverse(nums, k);
        expect(nums).toEqual([1, 2, 3, 4]);
    });

    test('should handle k = 0 (no rotation)', () => {
        const nums = [1, 2, 3, 4, 5];
        const k = 0;
        rotateArray_reverse(nums, k);
        expect(nums).toEqual([1, 2, 3, 4, 5]);
    });

    test('should handle single element array', () => {
        const nums = [1];
        const k = 3;
        rotateArray_reverse(nums, k);
        expect(nums).toEqual([1]);
    });

    test('should handle empty array', () => {
        const nums = [];
        const k = 5;
        rotateArray_reverse(nums, k);
        expect(nums).toEqual([]);
    });

    test('should handle array with negative numbers', () => {
        const nums = [-1, -100, 3, 99];
        const k = 2;
        rotateArray_reverse(nums, k);
        expect(nums).toEqual([3, 99, -1, -100]);
    });

    test('should handle two elements array, k=1', () => {
        const nums = [1, 2];
        const k = 1;
        rotateArray_reverse(nums, k);
        expect(nums).toEqual([2, 1]);
    });

    test('should handle two elements array, k=2', () => {
        const nums = [1, 2];
        const k = 2; // k % n = 0
        rotateArray_reverse(nums, k);
        expect(nums).toEqual([1, 2]);
    });
});

describe('Rotate Array - Using Cyclic Replacement (In-place)', () => {
    test('should rotate an array to the right by k steps', () => {
        const nums = [1, 2, 3, 4, 5, 6, 7];
        const k = 3;
        rotateArray_cyclicReplacement(nums, k);
        expect(nums).toEqual([5, 6, 7, 1, 2, 3, 4]);
    });

    test('should handle k greater than array length', () => {
        const nums = [1, 2, 3, 4, 5];
        const k = 7; // k % n = 2
        rotateArray_cyclicReplacement(nums, k);
        expect(nums).toEqual([4, 5, 1, 2, 3]);
    });

    test('should handle k equal to array length (no effective rotation)', () => {
        const nums = [1, 2, 3, 4];
        const k = 4; // k % n = 0
        rotateArray_cyclicReplacement(nums, k);
        expect(nums).toEqual([1, 2, 3, 4]);
    });

    test('should handle k = 0 (no rotation)', () => {
        const nums = [1, 2, 3, 4, 5];
        const k = 0;
        rotateArray_cyclicReplacement(nums, k);
        expect(nums).toEqual([1, 2, 3, 4, 5]);
    });

    test('should handle single element array', () => {
        const nums = [1];
        const k = 3;
        rotateArray_cyclicReplacement(nums, k);
        expect(nums).toEqual([1]);
    });

    test('should handle empty array', () => {
        const nums = [];
        const k = 5;
        rotateArray_cyclicReplacement(nums, k);
        expect(nums).toEqual([]);
    });

    test('should handle array with negative numbers', () => {
        const nums = [-1, -100, 3, 99];
        const k = 2;
        rotateArray_cyclicReplacement(nums, k);
        expect(nums).toEqual([3, 99, -1, -100]);
    });

    test('should handle two elements array, k=1', () => {
        const nums = [1, 2];
        const k = 1;
        rotateArray_cyclicReplacement(nums, k);
        expect(nums).toEqual([2, 1]);
    });

    test('should handle two elements array, k=2', () => {
        const nums = [1, 2];
        const k = 2; // k % n = 0
        rotateArray_cyclicReplacement(nums, k);
        expect(nums).toEqual([1, 2]);
    });

    test('should work for arrays where n and k have common factors (multiple cycles)', () => {
        const nums = [1, 2, 3, 4, 5, 6];
        const k = 2; // gcd(6, 2) = 2 cycles.
        // Expected: [5, 6, 1, 2, 3, 4]
        rotateArray_cyclicReplacement(nums, k);
        expect(nums).toEqual([5, 6, 1, 2, 3, 4]);
    });
});

```