```typescript
/**
 * @fileoverview Test suite for Longest Increasing Subsequence (LIS) implementations.
 */

import {
    lis_recursive,
    lis_memoized,
    lis_tabulated,
    lis_nLogn,
} from '../src/algorithms/longestIncreasingSubsequence';

describe('Longest Increasing Subsequence (LIS) Implementations', () => {
    const testCases = [
        { nums: [10, 9, 2, 5, 3, 7, 101, 18], expected: 4 }, // [2,3,7,18] or [2,5,7,18] or [2,3,7,101] or [2,5,7,101]
        { nums: [0, 1, 0, 3, 2, 3], expected: 4 }, // [0,1,2,3] or [0,0,2,3] (if not strictly increasing)
        { nums: [7, 7, 7, 7, 7, 7, 7], expected: 1 }, // All same numbers, LIS is 1
        { nums: [1, 3, 6, 7, 9, 4, 10, 5, 6], expected: 6 }, // [1,3,6,7,9,10]
        { nums: [1, 2, 3, 4, 5], expected: 5 }, // Already sorted
        { nums: [5, 4, 3, 2, 1], expected: 1 }, // Reverse sorted
        { nums: [], expected: 0 }, // Empty array
        { nums: [1], expected: 1 }, // Single element
        { nums: [4, 10, 4, 3, 8, 9], expected: 3 }, // [4,8,9] or [4,10] length 2
        { nums: [3, 10, 2, 1, 20], expected: 3 }, // [3,10,20] or [2,20]
        { nums: [3, 10, 2, 11, 20], expected: 4 }, // [3,10,11,20]
        { nums: [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15], expected: 6 }, // E.g., [0,2,6,9,11,15]
    ];

    // Recursive LIS can be very slow.
    // Filter test cases for recursive to prevent timeouts, limit N.
    const recursiveTestCases = testCases.filter(tc => tc.nums.length <= 10);

    describe('lis_recursive', () => {
        recursiveTestCases.forEach(({ nums, expected }) => {
            test(`should return ${expected} for nums = [${nums}]`, () => {
                expect(lis_recursive(nums)).toBe(expected);
            });
        });
        test('should handle empty array', () => {
            expect(lis_recursive([])).toBe(0);
        });
        test('should handle single element array', () => {
            expect(lis_recursive([5])).toBe(1);
        });
    });

    describe('lis_memoized', () => {
        testCases.forEach(({ nums, expected }) => {
            test(`should return ${expected} for nums = [${nums}]`, () => {
                expect(lis_memoized(nums)).toBe(expected);
            });
        });
        test('should handle empty array', () => {
            expect(lis_memoized([])).toBe(0);
        });
        test('should handle single element array', () => {
            expect(lis_memoized([5])).toBe(1);
        });
    });

    describe('lis_tabulated', () => {
        testCases.forEach(({ nums, expected }) => {
            test(`should return ${expected} for nums = [${nums}]`, () => {
                expect(lis_tabulated(nums)).toBe(expected);
            });
        });
        test('should handle empty array', () => {
            expect(lis_tabulated([])).toBe(0);
        });
        test('should handle single element array', () => {
            expect(lis_tabulated([5])).toBe(1);
        });
    });

    describe('lis_nLogn', () => {
        testCases.forEach(({ nums, expected }) => {
            test(`should return ${expected} for nums = [${nums}]`, () => {
                expect(lis_nLogn(nums)).toBe(expected);
            });
        });
        test('should handle empty array', () => {
            expect(lis_nLogn([])).toBe(0);
        });
        test('should handle single element array', () => {
            expect(lis_nLogn([5])).toBe(1);
        });
    });
});
```