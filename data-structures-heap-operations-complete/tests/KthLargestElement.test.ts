import { findKthLargest, findKthLargest_sorting } from '../src/algorithms/KthLargestElement';

describe('KthLargestElement', () => {
    // Test cases for findKthLargest (heap-based)
    describe('findKthLargest (Heap-based)', () => {
        it('should find the 2nd largest element in a small array', () => {
            const nums = [3, 2, 1, 5, 6, 4];
            const k = 2;
            expect(findKthLargest(nums, k)).toBe(5);
        });

        it('should find the 4th largest element in an array with duplicates', () => {
            const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
            const k = 4;
            expect(findKthLargest(nums, k)).toBe(4);
        });

        it('should find the 1st largest element', () => {
            const nums = [7, 6, 5, 4, 3, 2, 1];
            const k = 1;
            expect(findKthLargest(nums, k)).toBe(7);
        });

        it('should find the largest element when k equals array length', () => {
            const nums = [1, 2, 3, 4, 5];
            const k = 5;
            expect(findKthLargest(nums, k)).toBe(1);
        });

        it('should handle negative numbers', () => {
            const nums = [-1, -5, -2, -8, -3];
            const k = 2;
            expect(findKthLargest(nums, k)).toBe(-2);
        });

        it('should handle an array with all same elements', () => {
            const nums = [10, 10, 10, 10, 10];
            const k = 3;
            expect(findKthLargest(nums, k)).toBe(10);
        });

        it('should throw error for empty array', () => {
            const nums: number[] = [];
            const k = 1;
            expect(() => findKthLargest(nums, k)).toThrow("Invalid input: nums array is empty, or k is out of bounds.");
        });

        it('should throw error for k greater than array length', () => {
            const nums = [1, 2, 3];
            const k = 4;
            expect(() => findKthLargest(nums, k)).toThrow("Invalid input: nums array is empty, or k is out of bounds.");
        });

        it('should throw error for k equals 0', () => {
            const nums = [1, 2, 3];
            const k = 0;
            expect(() => findKthLargest(nums, k)).toThrow("Invalid input: nums array is empty, or k is out of bounds.");
        });

        it('should handle large array', () => {
            const largeNums = Array.from({ length: 10000 }, (_, i) => i + 1); // [1, 2, ..., 10000]
            const k = 5000;
            expect(findKthLargest(largeNums, k)).toBe(5001); // 5000th largest from 10000 is 5001
        });

        it('should work correctly when k is 1 for a large random array', () => {
            const randomNums = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000));
            const maxVal = Math.max(...randomNums);
            expect(findKthLargest(randomNums, 1)).toBe(maxVal);
        });

        it('should work correctly when k is nums.length for a large random array', () => {
            const randomNums = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000));
            const minVal = Math.min(...randomNums);
            expect(findKthLargest(randomNums, randomNums.length)).toBe(minVal);
        });
    });

    // Test cases for findKthLargest_sorting (sorting-based)
    describe('findKthLargest_sorting (Sorting-based)', () => {
        it('should find the 2nd largest element in a small array', () => {
            const nums = [3, 2, 1, 5, 6, 4];
            const k = 2;
            expect(findKthLargest_sorting(nums, k)).toBe(5);
        });

        it('should find the 4th largest element in an array with duplicates', () => {
            const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6];
            const k = 4;
            expect(findKthLargest_sorting(nums, k)).toBe(4);
        });

        it('should handle negative numbers', () => {
            const nums = [-1, -5, -2, -8, -3];
            const k = 2;
            expect(findKthLargest_sorting(nums, k)).toBe(-2);
        });

        it('should throw error for empty array', () => {
            const nums: number[] = [];
            const k = 1;
            expect(() => findKthLargest_sorting(nums, k)).toThrow("Invalid input: nums array is empty, or k is out of bounds.");
        });

        it('should handle large array correctly', () => {
            const largeNums = Array.from({ length: 10000 }, (_, i) => i + 1);
            const k = 5000;
            expect(findKthLargest_sorting(largeNums, k)).toBe(5001);
        });
    });
});