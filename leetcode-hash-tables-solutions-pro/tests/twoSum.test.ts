```typescript
import { twoSum } from '../src/problems/twoSum';
import { twoSumBruteForce } from '../src/problems/twoSumBruteForce';

describe('Two Sum', () => {
    // Helper to sort results, as problem allows any order
    const sortResult = (arr: number[]) => arr.sort((a, b) => a - b);

    // Test cases for the optimal Hash Map solution
    describe('Optimal Solution (Hash Map)', () => {
        it('should return correct indices for a basic case', () => {
            const nums = [2, 7, 11, 15];
            const target = 9;
            const result = twoSum(nums, target);
            expect(sortResult(result)).toEqual(sortResult([0, 1]));
        });

        it('should handle different order of numbers', () => {
            const nums = [15, 2, 11, 7];
            const target = 9;
            const result = twoSum(nums, target);
            expect(sortResult(result)).toEqual(sortResult([1, 3])); // 2 at index 1, 7 at index 3
        });

        it('should handle target with negative numbers', () => {
            const nums = [-1, -2, -3, -4, -5];
            const target = -8;
            const result = twoSum(nums, target);
            expect(sortResult(result)).toEqual(sortResult([2, 4])); // -3 + -5 = -8
        });

        it('should handle target with positive and negative numbers', () => {
            const nums = [-10, -5, 1, 9, 11];
            const target = 4;
            const result = twoSum(nums, target);
            expect(sortResult(result)).toEqual(sortResult([1, 3])); // -5 + 9 = 4
        });

        it('should handle duplicate numbers that sum to target', () => {
            const nums = [3, 3];
            const target = 6;
            const result = twoSum(nums, target);
            expect(sortResult(result)).toEqual(sortResult([0, 1]));
        });

        it('should handle numbers with zero', () => {
            const nums = [0, 4, 3, 0];
            const target = 0;
            const result = twoSum(nums, target);
            expect(sortResult(result)).toEqual(sortResult([0, 3]));
        });

        it('should handle larger numbers', () => {
            const nums = [1000000000, 2, 7, 1000000000];
            const target = 1000000002;
            const result = twoSum(nums, target);
            expect(sortResult(result)).toEqual(sortResult([0, 1]));
        });

        it('should return empty array if no solution (though problem states one exists)', () => {
            const nums = [1, 2, 3];
            const target = 7;
            const result = twoSum(nums, target);
            expect(result).toEqual([]);
        });

        it('should handle long array with unique solution', () => {
            const nums = Array.from({ length: 10000 }, (_, i) => i); // [0, 1, ..., 9999]
            const target = 19997; // 9998 + 9999
            const result = twoSum(nums, target);
            expect(sortResult(result)).toEqual(sortResult([9998, 9999]));
        });

        it('should work with single valid pair in a large array', () => {
            const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
            const target = 39; // 19 + 20
            const result = twoSum(nums, target);
            expect(sortResult(result)).toEqual(sortResult([18, 19]));
        });
    });

    // Test cases for the brute-force solution
    describe('Brute-Force Solution', () => {
        it('should return correct indices for a basic case', () => {
            const nums = [2, 7, 11, 15];
            const target = 9;
            const result = twoSumBruteForce(nums, target);
            expect(sortResult(result)).toEqual(sortResult([0, 1]));
        });

        it('should handle different order of numbers', () => {
            const nums = [15, 2, 11, 7];
            const target = 9;
            const result = twoSumBruteForce(nums, target);
            expect(sortResult(result)).toEqual(sortResult([1, 3])); // 2 at index 1, 7 at index 3
        });

        it('should handle target with negative numbers', () => {
            const nums = [-1, -2, -3, -4, -5];
            const target = -8;
            const result = twoSumBruteForce(nums, target);
            expect(sortResult(result)).toEqual(sortResult([2, 4]));
        });

        it('should handle duplicate numbers that sum to target', () => {
            const nums = [3, 3];
            const target = 6;
            const result = twoSumBruteForce(nums, target);
            expect(sortResult(result)).toEqual(sortResult([0, 1]));
        });
    });
});
```