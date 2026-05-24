import { subsetsWithDup } from '@problems/subsetsWithDup';

describe('Subsets With Duplicates', () => {

    // Helper to sort a 2D array of numbers for consistent comparison
    const sortAndStringify = (arr: number[][]): string[] => {
        return arr.map(sub => sub.sort((a, b) => a - b).join(',')).sort();
    };

    it('should return all unique subsets for a simple array with duplicates', () => {
        const nums = [1, 2, 2];
        const expected = [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]];
        const result = subsetsWithDup(nums);

        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should return an empty subset for an empty array', () => {
        const nums: number[] = [];
        const expected = [[]];
        const result = subsetsWithDup(nums);

        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should return correct subsets for an array with no duplicates', () => {
        const nums = [1, 2, 3];
        const expected = [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]];
        const result = subsetsWithDup(nums);

        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should handle an array with all duplicates', () => {
        const nums = [1, 1, 1];
        const expected = [[], [1], [1, 1], [1, 1, 1]];
        const result = subsetsWithDup(nums);

        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should handle mixed duplicates and unique numbers', () => {
        const nums = [4, 4, 4, 1, 4];
        const expected = [
            [], [1], [1, 4], [1, 4, 4], [1, 4, 4, 4], [1, 4, 4, 4, 4],
            [4], [4, 4], [4, 4, 4], [4, 4, 4, 4]
        ];
        const result = subsetsWithDup(nums);

        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should handle a single element array', () => {
        const nums = [5];
        const expected = [[], [5]];
        const result = subsetsWithDup(nums);

        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should handle a slightly larger array with duplicates', () => {
        const nums = [1, 2, 3, 2];
        const expected = [[], [1], [1, 2], [1, 2, 2], [1, 2, 3], [1, 2, 2, 3], [1, 3], [2], [2, 2], [2, 3], [2, 2, 3], [3]];
        const result = subsetsWithDup(nums);

        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });
});