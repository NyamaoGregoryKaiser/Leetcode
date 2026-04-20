```typescript
import { MedianFinder } from '../../src/problems/FindMedianFromDataStream';
import { measurePerformance } from '../../src/utils/benchmarking';

describe('Find Median from Data Stream (MedianFinder)', () => {

    let mf: MedianFinder;

    beforeEach(() => {
        mf = new MedianFinder();
    });

    it('should return 0 for an empty stream initially (or handle as per requirements)', () => {
        // Current implementation returns 0 if no numbers are added.
        expect(mf.findMedian()).toBe(0);
    });

    it('should calculate median for a single element', () => {
        mf.addNum(1);
        expect(mf.findMedian()).toBe(1);
    });

    it('should calculate median for an even number of elements', () => {
        mf.addNum(1);
        mf.addNum(2);
        // Stream: [1, 2] -> Median (1+2)/2 = 1.5
        expect(mf.findMedian()).toBe(1.5);

        mf.addNum(3);
        mf.addNum(4);
        // Stream: [1, 2, 3, 4] -> Median (2+3)/2 = 2.5
        expect(mf.findMedian()).toBe(2.5);
    });

    it('should calculate median for an odd number of elements', () => {
        mf.addNum(1);
        mf.addNum(2);
        mf.addNum(3);
        // Stream: [1, 2, 3] -> Median 2
        expect(mf.findMedian()).toBe(2);

        mf.addNum(4);
        mf.addNum(5);
        // Stream: [1, 2, 3, 4, 5] -> Median 3
        expect(mf.findMedian()).toBe(3);
    });

    it('should handle negative numbers', () => {
        mf.addNum(-1);
        expect(mf.findMedian()).toBe(-1);
        mf.addNum(-2);
        expect(mf.findMedian()).toBe(-1.5);
        mf.addNum(-3);
        expect(mf.findMedian()).toBe(-2);
    });

    it('should handle zero', () => {
        mf.addNum(0);
        expect(mf.findMedian()).toBe(0);
        mf.addNum(1);
        expect(mf.findMedian()).toBe(0.5);
        mf.addNum(-1);
        expect(mf.findMedian()).toBe(0);
    });

    it('should handle a mix of positive, negative, and zero', () => {
        mf.addNum(10);
        mf.addNum(2);
        mf.addNum(0);
        // Stream: [0, 2, 10] -> Median 2
        expect(mf.findMedian()).toBe(2);
        mf.addNum(-5);
        // Stream: [-5, 0, 2, 10] -> Median (0+2)/2 = 1
        expect(mf.findMedian()).toBe(1);
        mf.addNum(7);
        // Stream: [-5, 0, 2, 7, 10] -> Median 2
        expect(mf.findMedian()).toBe(2);
        mf.addNum(3);
        // Stream: [-5, 0, 2, 3, 7, 10] -> Median (2+3)/2 = 2.5
        expect(mf.findMedian()).toBe(2.5);
    });

    it('should handle large number of elements', () => {
        const numElements = 10000;
        const nums = Array.from({ length: numElements }, (_, i) => Math.floor(Math.random() * 20000) - 10000); // numbers from -10000 to 10000

        for (let i = 0; i < numElements; i++) {
            mf.addNum(nums[i]);
            // For verification, a brute-force sort and median calculation
            const sorted = nums.slice(0, i + 1).sort((a, b) => a - b);
            let expectedMedian;
            if (sorted.length % 2 === 0) {
                const mid = sorted.length / 2;
                expectedMedian = (sorted[mid - 1] + sorted[mid]) / 2;
            } else {
                expectedMedian = sorted[Math.floor(sorted.length / 2)];
            }
            expect(mf.findMedian()).toBe(expectedMedian);
        }
    });

    // Performance Benchmarking (Uncomment to run)
    describe('Performance Comparison', () => {
        const numOperations = 50000;
        const randomNumbers = Array.from({ length: numOperations }, () => Math.floor(Math.random() * 1000000));

        // Naive implementation using a sorted array (for comparison, not part of actual solution)
        class NaiveMedianFinder {
            private arr: number[] = [];

            addNum(num: number): void {
                // Find insertion point and splice
                let low = 0, high = this.arr.length;
                while (low < high) {
                    const mid = Math.floor((low + high) / 2);
                    if (this.arr[mid] < num) {
                        low = mid + 1;
                    } else {
                        high = mid;
                    }
                }
                this.arr.splice(low, 0, num);
            }

            findMedian(): number {
                if (this.arr.length === 0) return 0;
                const mid = Math.floor(this.arr.length / 2);
                if (this.arr.length % 2 === 0) {
                    return (this.arr[mid - 1] + this.arr[mid]) / 2;
                } else {
                    return this.arr[mid];
                }
            }
        }

        // Uncomment to enable performance tests
        it.skip(`Heap-based MedianFinder vs Naive Sorted Array for ${numOperations} operations`, () => {
            console.log(`\n--- Benchmarking MedianFinder (N=${numOperations}) ---`);

            const heapBasedMedianFinder = new MedianFinder();
            const heapTime = measurePerformance('Heap-based MedianFinder (addNum + findMedian)', () => {
                for (let i = 0; i < numOperations; i++) {
                    heapBasedMedianFinder.addNum(randomNumbers[i]);
                    heapBasedMedianFinder.findMedian(); // Call findMedian to reflect realistic usage
                }
            });

            const naiveMedianFinder = new NaiveMedianFinder();
            const naiveTime = measurePerformance('Naive Sorted Array (addNum + findMedian)', () => {
                for (let i = 0; i < numOperations; i++) {
                    naiveMedianFinder.addNum(randomNumbers[i]);
                    naiveMedianFinder.findMedian(); // Call findMedian to reflect realistic usage
                }
            });

            expect(heapTime).toBeLessThan(naiveTime); // Expect Heap-based to be significantly faster
        });
    });
});
```