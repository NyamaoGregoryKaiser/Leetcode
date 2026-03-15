import { topKFrequent, topKFrequent_sorting, topKFrequent_bucketSort } from '../src/algorithms/TopKFrequentElements';

describe('TopKFrequentElements', () => {
    // Helper to sort the result for comparison, as order may not be guaranteed.
    const sortResult = (arr: number[]) => arr.sort((a, b) => a - b);

    const testCases = [
        {
            name: 'Example 1',
            nums: [1, 1, 1, 2, 2, 3],
            k: 2,
            expected: [1, 2],
        },
        {
            name: 'Single element array',
            nums: [1],
            k: 1,
            expected: [1],
        },
        {
            name: 'All elements unique',
            nums: [1, 2, 3, 4, 5],
            k: 3,
            expected: [1, 2, 3], // Or any 3, problem doesn't guarantee order if frequencies are same
        },
        {
            name: 'All elements same frequency, k is smaller',
            nums: [1, 2, 3, 4, 5, 6],
            k: 3,
            expected: [1, 2, 3], // Any 3, sorted for consistent test
        },
        {
            name: 'All elements same frequency, k is larger than unique count',
            nums: [1, 2, 3],
            k: 5,
            expected: [1, 2, 3], // Returns all unique elements
        },
        {
            name: 'Negative numbers',
            nums: [-1, -1, -1, -2, -2, 0],
            k: 2,
            expected: [-1, -2],
        },
        {
            name: 'More complex frequencies',
            nums: [1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5],
            k: 3,
            expected: [1, 3, 4], // Freq: 3 (1), 2 (2), 4 (3), 2 (4), 1 (5). Top 3 are 3, 1, 4. Sorted.
        },
        {
            name: 'Large array, k=1',
            nums: Array.from({ length: 1000 }, (_, i) => i % 50), // 0-49 repeated 20 times
            k: 1,
            expected: [0], // 0 will appear most often as it's the first in line for modulo
        },
        {
            name: 'Mixed frequencies with zeroes',
            nums: [0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3],
            k: 3,
            expected: [0, 1, 2], // Freq: 3(0), 2(1), 4(2), 2(3). Top 3 are 2, 0, 1/3 (choose 1). Sorted for test.
        }
    ];

    // Test cases for topKFrequent (heap-based)
    describe('topKFrequent (Heap-based)', () => {
        testCases.forEach(testCase => {
            it(`should correctly find top ${testCase.k} frequent elements for: ${testCase.name}`, () => {
                const result = topKFrequent([...testCase.nums], testCase.k);
                // We sort both for consistent comparison as order is not guaranteed.
                expect(sortResult(result)).toEqual(sortResult(testCase.expected));
            });
        });

        it('should throw error for empty array', () => {
            const nums: number[] = [];
            const k = 1;
            expect(() => topKFrequent(nums, k)).toThrow("Invalid input: nums array is empty, or k is non-positive.");
        });

        it('should throw error for k = 0', () => {
            const nums = [1, 2, 3];
            const k = 0;
            expect(() => topKFrequent(nums, k)).toThrow("Invalid input: nums array is empty, or k is non-positive.");
        });

        it('should handle k > distinct elements count by returning all distinct', () => {
            const nums = [1, 2, 3];
            const k = 5;
            const result = topKFrequent(nums, k);
            expect(sortResult(result)).toEqual([1, 2, 3]);
        });
    });

    // Test cases for topKFrequent_sorting (sorting-based)
    describe('topKFrequent_sorting (Sorting-based)', () => {
        testCases.forEach(testCase => {
            it(`should correctly find top ${testCase.k} frequent elements for: ${testCase.name}`, () => {
                const result = topKFrequent_sorting([...testCase.nums], testCase.k);
                expect(sortResult(result)).toEqual(sortResult(testCase.expected));
            });
        });
    });

    // Test cases for topKFrequent_bucketSort (bucket sort based)
    describe('topKFrequent_bucketSort (Bucket Sort-based)', () => {
        testCases.forEach(testCase => {
            it(`should correctly find top ${testCase.k} frequent elements for: ${testCase.name}`, () => {
                const result = topKFrequent_bucketSort([...testCase.nums], testCase.k);
                expect(sortResult(result)).toEqual(sortResult(testCase.expected));
            });
        });
    });
});