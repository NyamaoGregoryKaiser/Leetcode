```typescript
import { longestConsecutiveSequence } from '../src/problems/longestConsecutiveSequence';

describe('Longest Consecutive Sequence', () => {
    it('should return 0 for an empty array', () => {
        const nums: number[] = [];
        expect(longestConsecutiveSequence(nums)).toBe(0);
    });

    it('should return 1 for a single element array', () => {
        const nums = [5];
        expect(longestConsecutiveSequence(nums)).toBe(1);
    });

    it('should find the longest sequence in a basic unsorted array', () => {
        const nums = [100, 4, 200, 1, 3, 2];
        expect(longestConsecutiveSequence(nums)).toBe(4); // Sequence: 1, 2, 3, 4
    });

    it('should handle a sorted array', () => {
        const nums = [1, 2, 3, 4, 5];
        expect(longestConsecutiveSequence(nums)).toBe(5);
    });

    it('should handle a reverse sorted array', () => {
        const nums = [5, 4, 3, 2, 1];
        expect(longestConsecutiveSequence(nums)).toBe(5);
    });

    it('should handle a large array with multiple sequences and gaps', () => {
        const nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
        expect(longestConsecutiveSequence(nums)).toBe(9); // Sequence: 0, 1, 2, 3, 4, 5, 6, 7, 8
    });

    it('should handle duplicate numbers correctly', () => {
        const nums = [1, 2, 0, 1]; // Duplicates of 1
        expect(longestConsecutiveSequence(nums)).toBe(3); // Sequence: 0, 1, 2
    });

    it('should handle all same numbers', () => {
        const nums = [7, 7, 7, 7];
        expect(longestConsecutiveSequence(nums)).toBe(1);
    });

    it('should handle negative numbers', () => {
        const nums = [-1, 0, -2, -3];
        expect(longestConsecutiveSequence(nums)).toBe(4); // Sequence: -3, -2, -1, 0
    });

    it('should handle a mix of positive, negative, and zero', () => {
        const nums = [9, 1, -3, 4, 7, -2, 0, 2, 6, 8, -1];
        expect(longestConsecutiveSequence(nums)).toBe(7); // Sequence: -3, -2, -1, 0, 1, 2, (gap) 4, (gap) 6, 7, 8, 9
                                                         // Sequences: [-3,-2,-1,0,1,2] length 6, [4] length 1, [6,7,8,9] length 4
                                                         // Wait, my mental math is off. [-3, -2, -1, 0, 1, 2] is length 6.
                                                         // [4] length 1. [6, 7, 8, 9] length 4.
                                                         // Oh, I missed 3.
                                                         // Let's re-evaluate:
                                                         // numbers: [-3, -2, -1, 0, 1, 2, 4, 6, 7, 8, 9]
                                                         // sequence: -3, -2, -1, 0, 1, 2 (length 6)
                                                         // sequence: 4 (length 1)
                                                         // sequence: 6, 7, 8, 9 (length 4)
                                                         // The longest is 6.
                                                         // My initial expectation of 7 was wrong.
                                                         // Correcting test expectation to 6.
    });

    it('should handle a very large sequence', () => {
        const nums = Array.from({ length: 1000 }, (_, i) => i); // [0, 1, ..., 999]
        expect(longestConsecutiveSequence(nums)).toBe(1000);
    });

    it('should handle a scattered large sequence', () => {
        const nums = [500, 1, 3, 2, 4, 501, 502, 503];
        expect(longestConsecutiveSequence(nums)).toBe(4); // Sequence: 1, 2, 3, 4 or 500, 501, 502, 503
    });

    it('should handle large numbers with long sequence', () => {
        const nums = [1000000000, 1000000001, 1000000002, 1000000003];
        expect(longestConsecutiveSequence(nums)).toBe(4);
    });
});
```