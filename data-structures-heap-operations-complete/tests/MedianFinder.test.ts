import { MedianFinder, MedianFinder_Naive } from '../src/algorithms/MedianFinder';

describe('MedianFinder', () => {
    // Test for the heap-based MedianFinder
    describe('MedianFinder (Heap-based)', () => {
        it('should correctly find the median for a small stream', () => {
            const mf = new MedianFinder();
            mf.addNum(1);
            expect(mf.findMedian()).toBe(1);
            mf.addNum(2);
            expect(mf.findMedian()).toBe(1.5);
            mf.addNum(3);
            expect(mf.findMedian()).toBe(2);
            mf.addNum(4);
            expect(mf.findMedian()).toBe(2.5);
            mf.addNum(5);
            expect(mf.findMedian()).toBe(3);
        });

        it('should handle duplicate numbers correctly', () => {
            const mf = new MedianFinder();
            mf.addNum(2);
            expect(mf.findMedian()).toBe(2);
            mf.addNum(3);
            expect(mf.findMedian()).toBe(2.5);
            mf.addNum(2);
            expect(mf.findMedian()).toBe(2);
            mf.addNum(3);
            expect(mf.findMedian()).toBe(2.5);
            mf.addNum(4);
            expect(mf.findMedian()).toBe(3);
        });

        it('should handle negative numbers', () => {
            const mf = new MedianFinder();
            mf.addNum(-1);
            expect(mf.findMedian()).toBe(-1);
            mf.addNum(-2);
            expect(mf.findMedian()).toBe(-1.5);
            mf.addNum(-3);
            expect(mf.findMedian()).toBe(-2);
            mf.addNum(0);
            expect(mf.findMedian()).toBe(-1);
            mf.addNum(1);
            expect(mf.findMedian()).toBe(-1);
        });

        it('should handle numbers in reverse sorted order', () => {
            const mf = new MedianFinder();
            mf.addNum(5);
            expect(mf.findMedian()).toBe(5);
            mf.addNum(4);
            expect(mf.findMedian()).toBe(4.5);
            mf.addNum(3);
            expect(mf.findMedian()).toBe(4);
            mf.addNum(2);
            expect(mf.findMedian()).toBe(3.5);
            mf.addNum(1);
            expect(mf.findMedian()).toBe(3);
        });

        it('should handle a large stream of random numbers', () => {
            const mf = new MedianFinder();
            const numbers = [];
            for (let i = 0; i < 1000; i++) {
                const num = Math.floor(Math.random() * 1000); // Numbers between 0 and 999
                numbers.push(num);
                mf.addNum(num);
                numbers.sort((a, b) => a - b); // Keep a sorted array for verification

                const n = numbers.length;
                let expectedMedian;
                if (n % 2 === 0) {
                    expectedMedian = (numbers[n / 2 - 1] + numbers[n / 2]) / 2;
                } else {
                    expectedMedian = numbers[Math.floor(n / 2)];
                }
                expect(mf.findMedian()).toBe(expectedMedian);
            }
        });

        it('should return 0 for an empty stream initially', () => {
            const mf = new MedianFinder();
            expect(mf.findMedian()).toBe(0); // Assuming 0 is acceptable for empty, or an error is thrown
        });
    });

    // Test for the naive sorting-based MedianFinder
    describe('MedianFinder_Naive (Sorting-based)', () => {
        it('should correctly find the median for a small stream', () => {
            const mf = new MedianFinder_Naive();
            mf.addNum(1);
            expect(mf.findMedian()).toBe(1);
            mf.addNum(2);
            expect(mf.findMedian()).toBe(1.5);
            mf.addNum(3);
            expect(mf.findMedian()).toBe(2);
            mf.addNum(4);
            expect(mf.findMedian()).toBe(2.5);
            mf.addNum(5);
            expect(mf.findMedian()).toBe(3);
        });

        it('should handle duplicates and negative numbers correctly', () => {
            const mf = new MedianFinder_Naive();
            mf.addNum(-1);
            mf.addNum(0);
            mf.addNum(1);
            mf.addNum(-1);
            expect(mf.findMedian()).toBe(0); // [-1,-1,0,1] -> ( -1 + 0 ) / 2 = -0.5
            mf.addNum(2);
            expect(mf.findMedian()).toBe(0); // [-1,-1,0,1,2] -> 0
        });

        it('should return 0 for an empty stream initially', () => {
            const mf = new MedianFinder_Naive();
            expect(mf.findMedian()).toBe(0);
        });
    });
});