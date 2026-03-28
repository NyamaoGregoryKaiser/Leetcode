```typescript
/**
 * @file tests/problem1-two-sum.test.ts
 * @description Test suite for the Two Sum problem.
 */

import { twoSum } from '../src/main';
import { twoSumBruteForce } from '../implementations/brute-force-problems'; // Import brute force for comparison if needed

describe('Two Sum', () => {
    // Test cases for optimal hash table solution
    describe('Optimal Solution (Hash Map)', () => {
        test('should find the correct indices for a basic case', () => {
            const nums = [2, 7, 11, 15];
            const target = 9;
            expect(twoSum(nums, target)).toEqual([0, 1]);
        });

        test('should handle cases with numbers out of order', () => {
            const nums = [3, 2, 4];
            const target = 6;
            expect(twoSum(nums, target)).toEqual([1, 2]);
        });

        test('should work with negative numbers', () => {
            const nums = [-1, -2, -3, -4, -5];
            const target = -8;
            expect(twoSum(nums, target)).toEqual([2, 4]); // -3 + -5 = -8
        });

        test('should work with zero and positive numbers', () => {
            const nums = [0, 4, 3, 0];
            const target = 0;
            // The problem statement implies unique elements, but test edge cases.
            // LeetCode's Two Sum allows using different indices for same value if present.
            expect(twoSum(nums, target)).toEqual([0, 3]);
        });

        test('should handle large numbers', () => {
            const nums = [1000000000, 1000000000, 1];
            const target = 2000000000;
            expect(twoSum(nums, target)).toEqual([0, 1]);
        });

        test('should work with minimum required elements', () => {
            const nums = [5, 5];
            const target = 10;
            expect(twoSum(nums, target)).toEqual([0, 1]);
        });

        // According to problem statement, there's always exactly one solution.
        // So, no tests for no solution or multiple solutions.
    });

    // Test cases for brute-force solution (for comparison/completeness)
    describe('Brute Force Solution', () => {
        test('should find the correct indices for a basic case (brute force)', () => {
            const nums = [2, 7, 11, 15];
            const target = 9;
            expect(twoSumBruteForce(nums, target)).toEqual([0, 1]);
        });

        test('should handle cases with numbers out of order (brute force)', () => {
            const nums = [3, 2, 4];
            const target = 6;
            expect(twoSumBruteForce(nums, target)).toEqual([1, 2]);
        });

        test('should work with negative numbers (brute force)', () => {
            const nums = [-1, -2, -3, -4, -5];
            const target = -8;
            expect(twoSumBruteForce(nums, target)).toEqual([2, 4]); // -3 + -5 = -8
        });

        test('should work with zero and positive numbers (brute force)', () => {
            const nums = [0, 4, 3, 0];
            const target = 0;
            expect(twoSumBruteForce(nums, target)).toEqual([0, 3]);
        });
    });
});
```