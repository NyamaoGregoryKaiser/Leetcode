```typescript
/**
 * tests/problems/top-k-frequent-elements.test.ts
 * 
 * Test suite for the topKFrequent function (Problem 4: Top K Frequent Elements).
 * Verifies the correctness of identifying the K most frequent elements in various arrays,
 * including edge cases, duplicates, and different K values.
 * Since the order of the output does not matter, the test sorts both actual and expected arrays.
 */

import { topKFrequent } from '../../src/problems/top-k-frequent-elements';

describe('topKFrequent', () => {
    test('should return the top K frequent elements (LeetCode example 1)', () => {
        const nums = [1, 1, 1, 2, 2, 3];
        const k = 2;
        const result = topKFrequent(nums, k).sort((a, b) => a - b); // Sort for consistent comparison
        expect(result).toEqual([1, 2]);
    });

    test('should return the top K frequent elements (LeetCode example 2)', () => {
        const nums = [1];
        const k = 1;
        const result = topKFrequent(nums, k).sort((a, b) => a - b);
        expect(result).toEqual([1]);
    });

    test('should handle all elements having the same frequency', () => {
        const nums = [1, 2, 3, 4, 5];
        const k = 3;
        const result = topKFrequent(nums, k).sort((a, b) => a - b);
        expect(result.length).toBe(3);
        // Order doesn't matter, so any 3 of [1,2,3,4,5] are valid.
        // We'll just check if it's a subset.
        expect(new Set(result).size).toBe(3);
        for (const num of result) {
            expect(nums).toContain(num);
        }
    });

    test('should handle k equal to the number of unique elements', () => {
        const nums = [1, 2, 1, 3, 2, 1, 4];
        const k = 4; // Unique elements are 1, 2, 3, 4
        const result = topKFrequent(nums, k).sort((a, b) => a - b);
        expect(result).toEqual([1, 2, 3, 4]);
    });

    test('should handle k equal to the total number of elements', () => {
        const nums = [1, 1, 2, 2, 3, 3];
        const k = 6;
        const result = topKFrequent(nums, k).sort((a, b) => a - b);
        // Problem implies distinct elements for 'top k'.
        // If k == total elements, and they have frequencies, it's ambiguous if
        // it expects all elements (including duplicates) or unique.
        // Standard interpretation is unique elements.
        expect(result).toEqual([1, 2, 3]); // Frequencies: 1:2, 2:2, 3:2. All have same frequency.
        // My implementation correctly returns the set of unique elements if k is large enough.
        // The problem statement on LeetCode implies k distinct elements.
        expect(result.length).toBe(3);
    });
    
    test('should handle k equal to the total number of elements with distinct frequencies', () => {
        const nums = [1,1,1,2,2,3,4];
        const k = 7; // All elements
        const result = topKFrequent(nums, k).sort((a,b) => a-b);
        expect(result).toEqual([1,2,3,4]); // Unique elements
    });


    test('should handle negative numbers', () => {
        const nums = [-1, -1, -1, -2, -2, 0];
        const k = 2;
        const result = topKFrequent(nums, k).sort((a, b) => a - b);
        expect(result).toEqual([-2, -1]); // -1 appears 3 times, -2 appears 2 times, 0 appears 1 time. Top 2 are -1, -2.
    });

    test('should handle empty input array', () => {
        const nums: number[] = [];
        const k = 1;
        const result = topKFrequent(nums, k);
        expect(result).toEqual([]);
    });

    test('should handle k=0', () => {
        const nums = [1, 2, 2, 3, 3, 3];
        const k = 0;
        const result = topKFrequent(nums, k);
        expect(result).toEqual([]);
    });

    test('should handle no unique elements (single element repeated)', () => {
        const nums = [7, 7, 7, 7, 7];
        const k = 1;
        const result = topKFrequent(nums, k);
        expect(result).toEqual([7]);
    });

    test('should handle tie-breaking (order does not matter)', () => {
        const nums = [1, 1, 2, 2, 3, 3, 4]; // Frequencies: 1:2, 2:2, 3:2, 4:1
        const k = 3;
        const result = topKFrequent(nums, k).sort((a, b) => a - b);
        // Any combination of 3 elements from [1,2,3] is valid.
        expect(result.length).toBe(3);
        expect(result).toEqual([1, 2, 3]);
    });

    test('should handle a larger test case', () => {
        const nums = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]; // Freq: 1:1, 2:2, 3:3, 4:4, 5:5
        const k = 3;
        const result = topKFrequent(nums, k).sort((a, b) => a - b);
        // Top 3 should be 3, 4, 5
        expect(result).toEqual([3, 4, 5]);
    });

    test('should handle values far apart', () => {
        const nums = [100, 100, 1, 1, 1, 2, 2, 200]; // Freq: 1:3, 2:2, 100:2, 200:1
        const k = 3;
        const result = topKFrequent(nums, k).sort((a, b) => a - b);
        // Top 3: 1 (3 times), 2 (2 times), 100 (2 times). Frequencies 2 and 100 are tied.
        // My implementation's tie-breaking for elements with same frequency depends on map iteration order,
        // which is generally insertion order for number keys.
        // However, problem allows any order, so [1,2,100] is valid.
        expect(result).toEqual([1, 2, 100]); 
    });
});
```