```typescript
import {
    findKthLargestHeap,
    findKthLargestSort,
    findKthSmallestHeap,
    findKthSmallestSort
} from '../../src/problems/KthElement';
import { measurePerformance } from '../../src/utils/benchmarking';

describe('Kth Largest/Smallest Element', () => {

    // Test cases for Kth Largest
    describe('findKthLargestHeap', () => {
        it('should return the Kth largest element correctly', () => {
            expect(findKthLargestHeap([3, 2, 1, 5, 6, 4], 2)).toBe(5);
            expect(findKthLargestHeap([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
            expect(findKthLargestHeap([1], 1)).toBe(1);
            expect(findKthLargestHeap([7, 6, 5, 4, 3, 2, 1], 5)).toBe(3);
            expect(findKthLargestHeap([1, 2, 3, 4, 5], 1)).toBe(5);
            expect(findKthLargestHeap([1, 2, 3, 4, 5], 5)).toBe(1);
        });

        it('should handle duplicate values correctly', () => {
            expect(findKthLargestHeap([3, 3, 3, 3, 3], 1)).toBe(3);
            expect(findKthLargestHeap([1, 2, 2, 3, 3, 3, 4, 4], 3)).toBe(3);
        });

        it('should return undefined for invalid k', () => {
            expect(findKthLargestHeap([1, 2, 3], 0)).toBeUndefined();
            expect(findKthLargestHeap([1, 2, 3], 4)).toBeUndefined();
            expect(findKthLargestHeap([], 1)).toBeUndefined();
            expect(findKthLargestHeap(null as any, 1)).toBeUndefined();
        });
    });

    describe('findKthLargestSort (Brute Force)', () => {
        it('should return the Kth largest element correctly', () => {
            expect(findKthLargestSort([3, 2, 1, 5, 6, 4], 2)).toBe(5);
            expect(findKthLargestSort([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
            expect(findKthLargestSort([1], 1)).toBe(1);
            expect(findKthLargestSort([7, 6, 5, 4, 3, 2, 1], 5)).toBe(3);
        });

        it('should return undefined for invalid k', () => {
            expect(findKthLargestSort([1, 2, 3], 0)).toBeUndefined();
            expect(findKthLargestSort([1, 2, 3], 4)).toBeUndefined();
            expect(findKthLargestSort([], 1)).toBeUndefined();
        });
    });

    // Test cases for Kth Smallest
    describe('findKthSmallestHeap', () => {
        it('should return the Kth smallest element correctly', () => {
            expect(findKthSmallestHeap([3, 2, 1, 5, 6, 4], 2)).toBe(2);
            expect(findKthSmallestHeap([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(3);
            expect(findKthSmallestHeap([1], 1)).toBe(1);
            expect(findKthSmallestHeap([7, 6, 5, 4, 3, 2, 1], 5)).toBe(5);
            expect(findKthSmallestHeap([1, 2, 3, 4, 5], 1)).toBe(1);
            expect(findKthSmallestHeap([1, 2, 3, 4, 5], 5)).toBe(5);
        });

        it('should handle duplicate values correctly', () => {
            expect(findKthSmallestHeap([3, 3, 3, 3, 3], 1)).toBe(3);
            expect(findKthSmallestHeap([1, 2, 2, 3, 3, 3, 4, 4], 3)).toBe(2);
        });

        it('should return undefined for invalid k', () => {
            expect(findKthSmallestHeap([1, 2, 3], 0)).toBeUndefined();
            expect(findKthSmallestHeap([1, 2, 3], 4)).toBeUndefined();
            expect(findKthSmallestHeap([], 1)).toBeUndefined();
        });
    });

    describe('findKthSmallestSort (Brute Force)', () => {
        it('should return the Kth smallest element correctly', () => {
            expect(findKthSmallestSort([3, 2, 1, 5, 6, 4], 2)).toBe(2);
            expect(findKthSmallestSort([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(3);
            expect(findKthSmallestSort([1], 1)).toBe(1);
            expect(findKthSmallestSort([7, 6, 5, 4, 3, 2, 1], 5)).toBe(5);
        });

        it('should return undefined for invalid k', () => {
            expect(findKthSmallestSort([1, 2, 3], 0)).toBeUndefined();
            expect(findKthSmallestSort([1, 2, 3], 4)).toBeUndefined();
            expect(findKthSmallestSort([], 1)).toBeUndefined();
        });
    });

    // Performance Benchmarking (Uncomment to run)
    describe('Performance Comparison (Kth Largest)', () => {
        const largeArraySize = 100000;
        const kValue = Math.floor(largeArraySize * 0.01); // K is small relative to N
        const mediumKValue = Math.floor(largeArraySize * 0.5); // K is medium relative to N
        const largeKValue = Math.floor(largeArraySize * 0.99); // K is large relative to N

        let largeRandomArray: number[];

        beforeAll(() => {
            largeRandomArray = Array.from({ length: largeArraySize }, () => Math.floor(Math.random() * largeArraySize * 10));
        });

        // Uncomment to enable performance tests
        it.skip('Heap vs Sort for Kth Largest (small K)', () => {
            const arr1 = [...largeRandomArray];
            const arr2 = [...largeRandomArray];

            console.log(`\n--- Benchmarking Kth Largest (N=${largeArraySize}, K=${kValue}) ---`);
            const heapTime = measurePerformance('findKthLargestHeap (Heap, small K)', () => findKthLargestHeap(arr1, kValue));
            const sortTime = measurePerformance('findKthLargestSort (Sort, small K)', () => findKthLargestSort(arr2, kValue));

            expect(heapTime).toBeLessThan(sortTime); // Expect Heap to be faster for small K
        });

        it.skip('Heap vs Sort for Kth Largest (medium K)', () => {
            const arr1 = [...largeRandomArray];
            const arr2 = [...largeRandomArray];

            console.log(`\n--- Benchmarking Kth Largest (N=${largeArraySize}, K=${mediumKValue}) ---`);
            const heapTime = measurePerformance('findKthLargestHeap (Heap, medium K)', () => findKthLargestHeap(arr1, mediumKValue));
            const sortTime = measurePerformance('findKthLargestSort (Sort, medium K)', () => findKthLargestSort(arr2, mediumKValue));

            // For K near N/2, Heap (N log K) and Sort (N log N) might be comparable or sort even slightly faster due to constant factors.
            // This test is more for observation than strict pass/fail.
            console.log("For K around N/2, performance can be close. Heap is still theoretically N log K.");
            expect(true).toBe(true); // Placeholder assertion
        });

        it.skip('Heap vs Sort for Kth Largest (large K close to N)', () => {
            const arr1 = [...largeRandomArray];
            const arr2 = [...largeRandomArray];

            console.log(`\n--- Benchmarking Kth Largest (N=${largeArraySize}, K=${largeKValue}) ---`);
            const heapTime = measurePerformance('findKthLargestHeap (Heap, large K)', () => findKthLargestHeap(arr1, largeKValue));
            const sortTime = measurePerformance('findKthLargestSort (Sort, large K)', () => findKthLargestSort(arr2, largeKValue));

            // When K is close to N, Kth largest means Kth smallest from the other end.
            // Heap is still O(N log K), which becomes O(N log N) here.
            // Sort is O(N log N).
            // Expect comparable performance.
            expect(true).toBe(true); // Placeholder assertion
        });
    });
});
```