```javascript
/**
 * streamMedian.test.js
 *
 * Jest test suite for the Median from Data Stream problem.
 */

const { MedianFinder, MedianFinder_BruteForce } = require('../src/algorithms/streamMedian');
const { benchmark, benchmarkAverage } = require('../src/utils/performanceBenchmarking');

describe('MedianFinder (Optimized Heap Approach)', () => {
    let mf;

    beforeEach(() => {
        mf = new MedianFinder();
    });

    test('should return 0 for empty stream', () => {
        expect(mf.findMedian()).toBe(0);
    });

    test('should correctly find median for single element', () => {
        mf.addNum(1);
        expect(mf.findMedian()).toBe(1);
    });

    test('should correctly find median for two elements', () => {
        mf.addNum(1);
        mf.addNum(2);
        expect(mf.findMedian()).toBe(1.5);
    });

    test('should correctly find median for odd number of elements', () => {
        mf.addNum(1); // [1]
        expect(mf.findMedian()).toBe(1);
        mf.addNum(2); // [1,2]
        expect(mf.findMedian()).toBe(1.5);
        mf.addNum(3); // [1,2,3]
        expect(mf.findMedian()).toBe(2);
        mf.addNum(4); // [1,2,3,4]
        expect(mf.findMedian()).toBe(2.5);
        mf.addNum(5); // [1,2,3,4,5]
        expect(mf.findMedian()).toBe(3);
    });

    test('should correctly find median for even number of elements', () => {
        mf.addNum(5);
        mf.addNum(10);
        expect(mf.findMedian()).toBe(7.5);
        mf.addNum(2); // [2,5,10]
        expect(mf.findMedian()).toBe(5);
        mf.addNum(12); // [2,5,10,12]
        expect(mf.findMedian()).toBe(7.5);
    });

    test('should handle negative numbers', () => {
        mf.addNum(-1);
        expect(mf.findMedian()).toBe(-1);
        mf.addNum(-2);
        expect(mf.findMedian()).toBe(-1.5);
        mf.addNum(-3);
        expect(mf.findMedian()).toBe(-2);
    });

    test('should handle numbers in unsorted order', () => {
        mf.addNum(5);
        expect(mf.findMedian()).toBe(5);
        mf.addNum(2);
        expect(mf.findMedian()).toBe(3.5);
        mf.addNum(8);
        expect(mf.findMedian()).toBe(5);
        mf.addNum(1);
        expect(mf.findMedian()).toBe(3.5);
        mf.addNum(10);
        expect(mf.findMedian()).toBe(5);
        mf.addNum(3);
        expect(mf.findMedian()).toBe(4);
        mf.addNum(7);
        expect(mf.findMedian()).toBe(5);
        mf.addNum(9);
        expect(mf.findMedian()).toBe(6);
        mf.addNum(4);
        expect(mf.findMedian()).toBe(5);
        mf.addNum(6);
        expect(mf.findMedian()).toBe(5.5);
    });

    test('optimized heap solution vs brute force (large stream)', () => {
        const NUM_ELEMENTS = 1000;
        const testData = Array.from({ length: NUM_ELEMENTS }, () => Math.floor(Math.random() * 2000) - 1000);

        const mfHeap = new MedianFinder();
        const mfBruteForce = new MedianFinder_BruteForce();

        let heapAddTotalTime = 0;
        let heapFindTotalTime = 0;
        let bruteForceAddTotalTime = 0;
        let bruteForceFindTotalTime = 0;

        let heapMedians = [];
        let bruteForceMedians = [];

        console.log(`\nBenchmarking MedianFinder (N=${NUM_ELEMENTS}):`);

        for (let i = 0; i < NUM_ELEMENTS; i++) {
            const num = testData[i];

            // Heap solution
            let start = process.hrtime.bigint();
            mfHeap.addNum(num);
            heapAddTotalTime += Number(process.hrtime.bigint() - start) / 1_000_000;
            if ((i + 1) % 10 === 0) { // Find median less frequently for brute force comparison
                start = process.hrtime.bigint();
                heapMedians.push(mfHeap.findMedian());
                heapFindTotalTime += Number(process.hrtime.bigint() - start) / 1_000_000;
            }


            // Brute force solution
            start = process.hrtime.bigint();
            mfBruteForce.addNum(num);
            bruteForceAddTotalTime += Number(process.hrtime.bigint() - start) / 1_000_000;
            if ((i + 1) % 10 === 0) { // Find median less frequently for brute force comparison
                start = process.hrtime.bigint();
                bruteForceMedians.push(mfBruteForce.findMedian());
                bruteForceFindTotalTime += Number(process.hrtime.bigint() - start) / 1_000_000;
            }
        }

        console.log(`  Heap: addNum Total Time = ${heapAddTotalTime.toFixed(3)}ms, findMedian Total Time = ${heapFindTotalTime.toFixed(3)}ms`);
        console.log(`  Brute Force: addNum Total Time = ${bruteForceAddTotalTime.toFixed(3)}ms, findMedian Total Time = ${bruteForceFindTotalTime.toFixed(3)}ms`);

        // Check if medians are approximately equal
        expect(heapMedians.length).toBe(bruteForceMedians.length);
        for (let i = 0; i < heapMedians.length; i++) {
            expect(heapMedians[i]).toBeCloseTo(bruteForceMedians[i], 5); // 5 decimal places precision
        }

        // Expect Heap solution to be significantly faster for findMedian, and comparable for addNum (for brute force, addNum is O(1) but findMedian is O(N log N)).
        // Overall, the heap solution should be much faster.
        expect(heapAddTotalTime + heapFindTotalTime).toBeLessThan(bruteForceAddTotalTime + bruteForceFindTotalTime);
        // Specifically, findMedian for brute force will dominate.
        expect(heapFindTotalTime).toBeLessThan(bruteForceFindTotalTime / 10); // Find median is O(1) for heap, O(N log N) for brute force.
    });
});
```