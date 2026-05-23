```javascript
/**
 * @fileoverview Test suite for Maximum Subarray Sum problem.
 * Uses Jest for testing various approaches.
 */

const {
    maxSubarraySum_bruteForce,
    maxSubarraySum_kadane
} = require('../src/problems/maxSubarraySum');

describe('Max Subarray Sum - Brute Force (O(N^2))', () => {
    test('should return the correct sum for a basic case', () => {
        expect(maxSubarraySum_bruteForce([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    });

    test('should handle all positive numbers', () => {
        expect(maxSubarraySum_bruteForce([1, 2, 3, 4, 5])).toBe(15);
    });

    test('should handle all negative numbers', () => {
        expect(maxSubarraySum_bruteForce([-1, -2, -3, -4, -5])).toBe(-1);
    });

    test('should handle mixed positive and negative numbers with max at start', () => {
        expect(maxSubarraySum_bruteForce([5, -1, -2, -3, -4])).toBe(5);
    });

    test('should handle mixed positive and negative numbers with max at end', () => {
        expect(maxSubarraySum_bruteForce([-4, -3, -2, -1, 5])).toBe(5);
    });

    test('should handle single element array (positive)', () => {
        expect(maxSubarraySum_bruteForce([10])).toBe(10);
    });

    test('should handle single element array (negative)', () => {
        expect(maxSubarraySum_bruteForce([-10])).toBe(-10);
    });

    test('should handle array with two elements', () => {
        expect(maxSubarraySum_bruteForce([1, -5])).toBe(1);
        expect(maxSubarraySum_bruteForce([-5, 1])).toBe(1);
    });

    test('should handle array with zero sum possibility', () => {
        expect(maxSubarraySum_bruteForce([0, 0, 0])).toBe(0);
        expect(maxSubarraySum_bruteForce([-1, 0, -2])).toBe(0);
    });

    test('should handle large array with specific pattern', () => {
        const largeArray = Array(100).fill(1).concat(Array(100).fill(-1)).concat(Array(100).fill(2));
        expect(maxSubarraySum_bruteForce(largeArray)).toBe(200); // 100 ones + 100 twos
    });

    test('should return 0 for an empty array (custom handling, though problem constraints imply non-empty)', () => {
        expect(maxSubarraySum_bruteForce([])).toBe(0); // My implementation returns 0, otherwise would be -Infinity
    });
});

describe('Max Subarray Sum - Kadane\'s Algorithm (Optimal, O(N))', () => {
    test('should return the correct sum for a basic case', () => {
        expect(maxSubarraySum_kadane([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    });

    test('should handle all positive numbers', () => {
        expect(maxSubarraySum_kadane([1, 2, 3, 4, 5])).toBe(15);
    });

    test('should handle all negative numbers', () => {
        expect(maxSubarraySum_kadane([-1, -2, -3, -4, -5])).toBe(-1);
    });

    test('should handle mixed positive and negative numbers with max at start', () => {
        expect(maxSubarraySum_kadane([5, -1, -2, -3, -4])).toBe(5);
    });

    test('should handle mixed positive and negative numbers with max at end', () => {
        expect(maxSubarraySum_kadane([-4, -3, -2, -1, 5])).toBe(5);
    });

    test('should handle single element array (positive)', () => {
        expect(maxSubarraySum_kadane([10])).toBe(10);
    });

    test('should handle single element array (negative)', () => {
        expect(maxSubarraySum_kadane([-10])).toBe(-10);
    });

    test('should handle array with two elements', () => {
        expect(maxSubarraySum_kadane([1, -5])).toBe(1);
        expect(maxSubarraySum_kadane([-5, 1])).toBe(1);
    });

    test('should handle array with zero sum possibility', () => {
        expect(maxSubarraySum_kadane([0, 0, 0])).toBe(0);
        expect(maxSubarraySum_kadane([-1, 0, -2])).toBe(0);
    });

    test('should handle large array with specific pattern', () => {
        const largeArray = Array(100).fill(1).concat(Array(100).fill(-1)).concat(Array(100).fill(2));
        expect(maxSubarraySum_kadane(largeArray)).toBe(200); // 100 ones + 100 twos
    });

    test('should return 0 for an empty array (custom handling, though problem constraints imply non-empty)', () => {
        expect(maxSubarraySum_kadane([])).toBe(0);
    });

    test('should handle complex mixed array', () => {
        expect(maxSubarraySum_kadane([8, -19, 5, -4, 20])).toBe(21); // [5, -4, 20]
        expect(maxSubarraySum_kadane([-2, -3, -1, -5, -4])).toBe(-1);
    });
});
```