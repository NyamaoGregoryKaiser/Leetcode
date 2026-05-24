import { combinationSum2 } from '@problems/combinationSumII';

describe('Combination Sum II (with Duplicates)', () => {

    // Helper to sort a 2D array of numbers for consistent comparison
    const sortAndStringify = (arr: number[][]): string[] => {
        return arr.map(sub => sub.sort((a, b) => a - b).join(',')).sort();
    };

    it('should find unique combinations for a given target with duplicates', () => {
        const candidates = [10, 1, 2, 7, 6, 1, 5];
        const target = 8;
        const expected = [
            [1, 1, 6],
            [1, 2, 5],
            [1, 7],
            [2, 6]
        ];
        const result = combinationSum2(candidates, target);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should handle a case where all candidates are the same and match target', () => {
        const candidates = [2, 2, 2];
        const target = 4;
        const expected = [[2, 2]];
        const result = combinationSum2(candidates, target);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should return an empty array if no combination sums to target', () => {
        const candidates = [2, 3, 5];
        const target = 1;
        const expected: number[][] = [];
        const result = combinationSum2(candidates, target);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should handle target = 0 (empty combination if allowed by problem, usually no)', () => {
        // Per problem definition, numbers must be positive and used to sum. So target 0 is usually empty.
        const candidates = [1, 2, 3];
        const target = 0;
        const expected: number[][] = []; // No numbers can be used to sum to 0 if only positive.
        const result = combinationSum2(candidates, target);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should handle a single candidate that matches the target', () => {
        const candidates = [5];
        const target = 5;
        const expected = [[5]];
        const result = combinationSum2(candidates, target);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should handle multiple candidates that are all duplicates and sum to target', () => {
        const candidates = [1, 1, 1, 1, 1];
        const target = 3;
        const expected = [[1, 1, 1]];
        const result = combinationSum2(candidates, target);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });

    it('should handle a more complex scenario with various duplicates', () => {
        const candidates = [1, 1, 2, 3, 4, 5, 6];
        const target = 7;
        const expected = [
            [1, 1, 5],
            [1, 2, 4],
            [1, 6],
            [2, 5],
            [3, 4],
            [7] // Assuming 7 is a candidate
        ];
        // If 7 is not in candidates:
        const candidates_no7 = [1, 1, 2, 3, 4, 5, 6];
        const target_no7 = 7;
        const expected_no7 = [
            [1, 1, 5],
            [1, 2, 4],
            [1, 6],
            [2, 5],
            [3, 4]
        ];
        const result = combinationSum2(candidates_no7, target_no7);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected_no7));

        // Test with 7 in candidates
        const candidates_with7 = [1, 1, 2, 3, 4, 5, 6, 7];
        const result_with7 = combinationSum2(candidates_with7, target_no7);
        expect(sortAndStringify(result_with7)).toEqual(sortAndStringify(expected));
    });

    it('should handle cases with large numbers or targets if within integer limits', () => {
        const candidates = [50, 25, 25, 100];
        const target = 150;
        const expected = [
            [25, 25, 100],
            [50, 100]
        ];
        const result = combinationSum2(candidates, target);
        expect(sortAndStringify(result)).toEqual(sortAndStringify(expected));
    });
});