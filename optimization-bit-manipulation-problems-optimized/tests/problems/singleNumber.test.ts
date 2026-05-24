```typescript
import {
    singleNumber_hashMap,
    singleNumber_xor,
    singleNumber_threeTimes
} from '../../src/problems/singleNumber';

describe('Single Number', () => {
    const testCases = [
        { nums: [2, 2, 1], expected: 1 },
        { nums: [4, 1, 2, 1, 2], expected: 4 },
        { nums: [1], expected: 1 },
        { nums: [7, 7, 7, 7, 7, 7, 10], expected: 10 },
        { nums: [-1, 2, -1, 3, 2], expected: 3 }, // Negative numbers
        { nums: [0, 0, 1], expected: 1 },
        { nums: [1, 2, 3, 4, 1, 2, 3], expected: 4 },
    ];

    describe.each([
        ['Hash Map (O(N) space)', singleNumber_hashMap],
        ['XOR Property (O(1) space)', singleNumber_xor],
    ])('Method: %s', (methodName, singleNumber) => {
        it('should find the single number correctly for various arrays', () => {
            for (const { nums, expected } of testCases) {
                expect(singleNumber(nums)).toBe(expected);
            }
        });

        it('should handle array with a single element', () => {
            expect(singleNumber([42])).toBe(42);
        });

        it('should handle large positive numbers', () => {
            const largeNums = [100000, 200000, 300000, 100000, 200000, 300000, 500000];
            expect(singleNumber(largeNums)).toBe(500000);
        });

        it('should handle large negative numbers', () => {
            const largeNegativeNums = [-100000, -200000, -300000, -100000, -200000, -300000, -500000];
            expect(singleNumber(largeNegativeNums)).toBe(-500000);
        });
    });
});

describe('Single Number (Every element appears three times except for one)', () => {
    const testCasesThreeTimes = [
        { nums: [2, 2, 3, 2], expected: 3 },
        { nums: [0, 1, 0, 1, 0, 1, 99], expected: 99 },
        { nums: [1, 1, 1, -2, -2, -2, 5], expected: 5 },
        { nums: [-3, -3, -3, 42], expected: 42 },
        { nums: [100], expected: 100 },
        { nums: [1, 2, 1, 2, 1, 2, 3], expected: 3 }, // Example: 3 is the unique
        { nums: [-2,-2,1,1,-3,1,-3,-3,-4,-2], expected: -4 } // Example from LeetCode
    ];

    it('should find the single number where others appear three times', () => {
        for (const { nums, expected } of testCasesThreeTimes) {
            expect(singleNumber_threeTimes(nums)).toBe(expected);
        }
    });

    it('should handle large numbers', () => {
        const largeNums = [100000, 200000, 300000, 100000, 200000, 300000, 100000, 200000, 300000, 500000];
        expect(singleNumber_threeTimes(largeNums)).toBe(500000);
    });

    it('should handle a single number array', () => {
        expect(singleNumber_threeTimes([42])).toBe(42);
    });
});
```