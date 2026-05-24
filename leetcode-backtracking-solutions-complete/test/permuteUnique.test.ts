import { permuteUnique } from '@problems/permuteUnique';

describe('Permutations II (with Duplicates)', () => {

    // Helper to sort a 2D array of numbers for consistent comparison
    const sortAndStringify = (arr: number[][]): string[] => {
        return arr.map(sub => sub.join(',')).sort();
    };

    it('should return all unique permutations for an array with duplicates', () => {
        const nums = [1, 1, 2];
        const expected = [[1, 1, 2], [1, 2, 1], [2, 1, 1]];
        const result = permuteUnique(nums);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should return all unique permutations for an array with no duplicates', () => {
        const nums = [1, 2, 3];
        const expected = [
            [1, 2, 3], [1, 3, 2],
            [2, 1, 3], [2, 3, 1],
            [3, 1, 2], [3, 2, 1]
        ];
        const result = permuteUnique(nums);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should return a single permutation for a single element array', () => {
        const nums = [0];
        const expected = [[0]];
        const result = permuteUnique(nums);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should return a single permutation for an array of all identical elements', () => {
        const nums = [1, 1, 1];
        const expected = [[1, 1, 1]];
        const result = permuteUnique(nums);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should return an empty array for an empty input array', () => {
        const nums: number[] = [];
        const expected: number[][] = [[]]; // Per LeetCode convention, an empty array has one permutation: itself
        const result = permuteUnique(nums);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should handle a more complex array with multiple duplicates', () => {
        const nums = [2, 2, 1, 1];
        const expected = [
            [1, 1, 2, 2], [1, 2, 1, 2], [1, 2, 2, 1],
            [2, 1, 1, 2], [2, 1, 2, 1], [2, 2, 1, 1]
        ];
        const result = permuteUnique(nums);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should handle larger inputs efficiently (check count for N=4, no full list)', () => {
        const nums = [1, 2, 3, 4];
        // 4! = 24 permutations
        const result = permuteUnique(nums);
        expect(result.length).toBe(24);
    });

    it('should handle larger inputs with duplicates efficiently (check count for [1,1,2,3])', () => {
        const nums = [1, 1, 2, 3];
        // Total permutations for N=4: 4! = 24.
        // With two 1's, divide by 2!: 24 / 2 = 12 unique permutations.
        const expectedCount = 12;
        const result = permuteUnique(nums);
        expect(result.length).toBe(expectedCount);
    });
});