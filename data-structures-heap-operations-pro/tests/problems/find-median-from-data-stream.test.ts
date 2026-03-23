```typescript
/**
 * tests/problems/find-median-from-data-stream.test.ts
 * 
 * Test suite for the MedianFinder class (Problem 3: Find Median from Data Stream).
 * Verifies the correctness of `addNum` and `findMedian` methods in various scenarios,
 * ensuring proper balancing of heaps and accurate median calculation for both
 * odd and even number of elements.
 */

import { MedianFinder } from '../../src/problems/find-median-from-data-stream';

describe('MedianFinder', () => {
    test('should find median for single element', () => {
        const mf = new MedianFinder();
        mf.addNum(1);
        expect(mf.findMedian()).toBe(1.0);
    });

    test('should find median for two elements', () => {
        const mf = new MedianFinder();
        mf.addNum(1);
        mf.addNum(2);
        expect(mf.findMedian()).toBe(1.5);
    });

    test('should find median for three elements', () => {
        const mf = new MedianFinder();
        mf.addNum(1);
        mf.addNum(2);
        mf.addNum(3);
        expect(mf.findMedian()).toBe(2.0);
    });

    test('should find median for multiple elements (LeetCode example)', () => {
        const mf = new MedianFinder();
        mf.addNum(1);
        expect(mf.findMedian()).toBe(1.0);
        mf.addNum(2);
        expect(mf.findMedian()).toBe(1.5);
        mf.addNum(3);
        expect(mf.findMedian()).toBe(2.0);
        mf.addNum(4);
        expect(mf.findMedian()).toBe(2.5);
        mf.addNum(5);
        expect(mf.findMedian()).toBe(3.0);
        mf.addNum(6);
        expect(mf.findMedian()).toBe(3.5);
    });

    test('should handle negative numbers', () => {
        const mf = new MedianFinder();
        mf.addNum(-1);
        expect(mf.findMedian()).toBe(-1.0);
        mf.addNum(-2);
        expect(mf.findMedian()).toBe(-1.5);
        mf.addNum(-3);
        expect(mf.findMedian()).toBe(-2.0);
        mf.addNum(0);
        expect(mf.findMedian()).toBe(-1.5);
    });

    test('should handle zero correctly', () => {
        const mf = new MedianFinder();
        mf.addNum(0);
        expect(mf.findMedian()).toBe(0.0);
        mf.addNum(0);
        expect(mf.findMedian()).toBe(0.0);
        mf.addNum(1);
        expect(mf.findMedian()).toBe(0.0);
        mf.addNum(-1);
        expect(mf.findMedian()).toBe(0.0);
    });

    test('should handle duplicates', () => {
        const mf = new MedianFinder();
        mf.addNum(5);
        expect(mf.findMedian()).toBe(5.0);
        mf.addNum(5);
        expect(mf.findMedian()).toBe(5.0);
        mf.addNum(5);
        expect(mf.findMedian()).toBe(5.0);
        mf.addNum(1);
        expect(mf.findMedian()).toBe(5.0);
        mf.addNum(10);
        expect(mf.findMedian()).toBe(5.0);
        mf.addNum(0);
        expect(mf.findMedian()).toBe(5.0);
    });

    test('should handle larger and more complex sequences', () => {
        const mf = new MedianFinder();
        const nums = [12, 10, 13, 11, 5, 15, 1, 11, 6, 17, 14, 8, 17, 6, 8, 11, 4, 15, 12, 4];
        const expectedMedians = [
            12.0, 11.0, 12.0, 11.5, 11.0, 11.5, 11.0, 11.0, 11.0, 11.0,
            11.5, 11.0, 11.0, 11.0, 11.0, 11.0, 11.0, 11.0, 11.0, 11.0
        ];

        let sorted: number[] = [];
        for (let i = 0; i < nums.length; i++) {
            mf.addNum(nums[i]);
            sorted.push(nums[i]);
            sorted.sort((a, b) => a - b);
            
            let median: number;
            const mid = Math.floor(sorted.length / 2);
            if (sorted.length % 2 === 0) {
                median = (sorted[mid - 1] + sorted[mid]) / 2;
            } else {
                median = sorted[mid];
            }
            
            expect(mf.findMedian()).toBeCloseTo(median, 5); // Use toBeCloseTo for floating point comparisons
            // Also compare with pre-calculated expected medians
            expect(mf.findMedian()).toBeCloseTo(expectedMedians[i], 5);
        }
    });

    test('should work correctly with random large inputs (conceptual)', () => {
        const mf = new MedianFinder();
        const testSize = 1000;
        const randomNumbers = Array.from({ length: testSize }, () => Math.floor(Math.random() * 2000) - 1000); // Numbers between -1000 and 1000

        const sortedStream: number[] = [];
        for (let i = 0; i < testSize; i++) {
            const num = randomNumbers[i];
            mf.addNum(num);
            sortedStream.push(num);
            sortedStream.sort((a, b) => a - b);

            let expectedMedian: number;
            const mid = Math.floor(sortedStream.length / 2);
            if (sortedStream.length % 2 === 0) {
                expectedMedian = (sortedStream[mid - 1] + sortedStream[mid]) / 2;
            } else {
                expectedMedian = sortedStream[mid];
            }
            expect(mf.findMedian()).toBeCloseTo(expectedMedian, 5);
        }
    });
});
```