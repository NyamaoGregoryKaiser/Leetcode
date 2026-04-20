```typescript
import { topKFrequent, topKFrequentSort } from '../../src/problems/TopKFrequentElements';
import { measurePerformance } from '../../src/utils/benchmarking';

describe('Top K Frequent Elements', () => {

    describe('topKFrequent (Optimal Heap Approach)', () => {
        it('should return top k frequent elements for basic cases', () => {
            expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toEqual(expect.arrayContaining([1, 2]));
            expect(topKFrequent([1], 1)).toEqual([1]);
            expect(topKFrequent([1, 2], 2)).toEqual(expect.arrayContaining([1, 2]));
        });

        it('should handle tie-breaking (order does not matter)', () => {
            const result = topKFrequent([1, 1, 2, 2, 3, 3], 3);
            expect(result.length).toBe(3);
            expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
        });

        it('should handle various frequencies', () => {
            expect(topKFrequent([1, 2, 3, 1, 2, 1, 4, 4, 4, 4], 2)).toEqual(expect.arrayContaining([4, 1])); // 4:4, 1:3
            expect(topKFrequent([5, 5, 5, 1, 1, 2, 2, 3], 2)).toEqual(expect.arrayContaining([5, 1])); // 5:3, 1:2
        });

        it('should return unique elements', () => {
            const result = topKFrequent([1, 1, 1, 2, 2, 3], 1);
            expect(result.length).toBe(1);
            expect(result).toEqual(expect.arrayContaining([1]));
        });

        it('should handle edge cases: k equals number of unique elements', () => {
            const result = topKFrequent([1, 2, 3], 3);
            expect(result.length).toBe(3);
            expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
        });

        it('should handle edge cases: all elements are the same', () => {
            expect(topKFrequent([7, 7, 7, 7, 7], 1)).toEqual([7]);
        });

        it('should return empty array for invalid k or empty nums', () => {
            expect(topKFrequent([], 1)).toEqual([]);
            expect(topKFrequent([1, 2, 3], 0)).toEqual([]);
            expect(topKFrequent([1, 2, 3], -1)).toEqual([]);
            expect(topKFrequent(null as any, 1)).toEqual([]);
        });
    });

    describe('topKFrequentSort (Alternative Sorting Approach)', () => {
        it('should return top k frequent elements for basic cases', () => {
            expect(topKFrequentSort([1, 1, 1, 2, 2, 3], 2)).toEqual(expect.arrayContaining([1, 2]));
            expect(topKFrequentSort([1], 1)).toEqual([1]);
            expect(topKFrequentSort([1, 2], 2)).toEqual(expect.arrayContaining([1, 2]));
        });

        it('should handle tie-breaking', () => {
            // Sort approach might have a deterministic order for ties based on initial map iteration/sort stability
            const result = topKFrequentSort([1, 1, 2, 2, 3, 3], 3);
            expect(result.length).toBe(3);
            expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
        });

        it('should handle various frequencies', () => {
            expect(topKFrequentSort([1, 2, 3, 1, 2, 1, 4, 4, 4, 4], 2)).toEqual(expect.arrayContaining([4, 1]));
        });

        it('should return empty array for invalid k or empty nums', () => {
            expect(topKFrequentSort([], 1)).toEqual([]);
            expect(topKFrequentSort([1, 2, 3], 0)).toEqual([]);
        });
    });

    // Performance Benchmarking (Uncomment to run)
    describe('Performance Comparison', () => {
        const arraySize = 100000;
        const kValue = Math.floor(arraySize * 0.01); // Small K
        const mediumKValue = Math.floor(arraySize * 0.5); // Medium K
        const uniqueElementsRatio = 0.5; // Half of elements are unique

        let largeArray: number[];

        beforeAll(() => {
            largeArray = Array.from({ length: arraySize }, (_, i) =>
                Math.floor(Math.random() * arraySize * uniqueElementsRatio) // Ensure some duplicates
            );
        });

        // Uncomment to enable performance tests
        it.skip(`Heap vs Sort for N=${arraySize}, K=${kValue} (small K)`, () => {
            const arr1 = [...largeArray];
            const arr2 = [...largeArray];

            console.log(`\n--- Benchmarking Top K Frequent (N=${arraySize}, K=${kValue}) ---`);
            const heapTime = measurePerformance('topKFrequent (Heap, small K)', () => topKFrequent(arr1, kValue));
            const sortTime = measurePerformance('topKFrequentSort (Sort, small K)', () => topKFrequentSort(arr2, kValue));

            expect(heapTime).toBeLessThan(sortTime); // Expect Heap to be faster
        });

        it.skip(`Heap vs Sort for N=${arraySize}, K=${mediumKValue} (medium K)`, () => {
            const arr1 = [...largeArray];
            const arr2 = [...largeArray];

            console.log(`\n--- Benchmarking Top K Frequent (N=${arraySize}, K=${mediumKValue}) ---`);
            const heapTime = measurePerformance('topKFrequent (Heap, medium K)', () => topKFrequent(arr1, mediumKValue));
            const sortTime = measurePerformance('topKFrequentSort (Sort, medium K)', () => topKFrequentSort(arr2, mediumKValue));

            // For K around N/2, performance can be close. Heap is still theoretically N + M log K.
            // Sort is N + M log M. If M is close to N, then both are roughly N log N.
            console.log("For K around N/2, performance can be close. Heap is still theoretically better for M >> K.");
            expect(true).toBe(true); // Placeholder assertion
        });
    });
});
```