```typescript
/**
 * @file tests/problem2-longest-consecutive-sequence.test.ts
 * @description Test suite for the Longest Consecutive Sequence problem.
 */

import { longestConsecutiveSequence } from '../src/main';

describe('Longest Consecutive Sequence', () => {
    test('should return 0 for an empty array', () => {
        const nums: number[] = [];
        expect(longestConsecutiveSequence(nums)).toBe(0);
    });

    test('should return 1 for a single element array', () => {
        const nums = [1];
        expect(longestConsecutiveSequence(nums)).toBe(1);
    });

    test('should find a basic consecutive sequence', () => {
        const nums = [100, 4, 200, 1, 3, 2];
        expect(longestConsecutiveSequence(nums)).toBe(4); // Sequence: 1, 2, 3, 4
    });

    test('should handle unsorted input with multiple sequences', () => {
        const nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
        expect(longestConsecutiveSequence(nums)).toBe(9); // Sequence: 0, 1, 2, 3, 4, 5, 6, 7, 8
    });

    test('should handle negative numbers', () => {
        const nums = [-1, 0, -3, -2, 5, 4];
        expect(longestConsecutiveSequence(nums)).toBe(4); // Sequence: -3, -2, -1, 0
    });

    test('should handle all same numbers (sequence of 1)', () => {
        const nums = [5, 5, 5, 5];
        expect(longestConsecutiveSequence(nums)).toBe(1);
    });

    test('should handle a single long sequence', () => {
        const nums = [5, 1, 2, 3, 4, 6, 7, 8, 9, 10];
        expect(longestConsecutiveSequence(nums)).toBe(10); // Sequence: 1-10
    });

    test('should handle duplicate numbers correctly (they are ignored by Set)', () => {
        const nums = [1, 2, 0, 1];
        expect(longestConsecutiveSequence(nums)).toBe(3); // Sequence: 0, 1, 2
    });

    test('should handle mixed positive and negative numbers with zero', () => {
        const nums = [-5, -4, -3, 0, 1, 2, 3, 4, 5];
        expect(longestConsecutiveSequence(nums)).toBe(7); // Sequence: -5 to -3 (len 3) OR 0 to 5 (len 6) -> 6
        // Oh wait, [-5,-4,-3,0,1,2,3,4,5] has sequences [-5,-4,-3] (len 3) and [0,1,2,3,4,5] (len 6). Longest is 6.
        // Let's create a better test case for 7:
        const nums2 = [-5, -4, -3, -2, -1, 0, 1];
        expect(longestConsecutiveSequence(nums2)).toBe(7); // Sequence: -5, -4, -3, -2, -1, 0, 1
    });

    test('should handle large numbers', () => {
        const nums = [
            1000000000, 1000000001, 1000000002, 1000000003,
            1, 3, 5, 7, 9
        ];
        expect(longestConsecutiveSequence(nums)).toBe(4);
    });

    test('should work with already sorted array', () => {
        const nums = [1, 2, 3, 4, 5];
        expect(longestConsecutiveSequence(nums)).toBe(5);
    });

    test('should work with reverse sorted array', () => {
        const nums = [5, 4, 3, 2, 1];
        expect(longestConsecutiveSequence(nums)).toBe(5);
    });
});
```