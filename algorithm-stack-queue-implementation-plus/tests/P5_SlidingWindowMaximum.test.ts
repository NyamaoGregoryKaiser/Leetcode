```typescript
/**
 * @fileoverview Test suite for P5_SlidingWindowMaximum.ts
 */

import { maxSlidingWindowOptimal, maxSlidingWindowBruteForce, maxSlidingWindowTwoPasses } from '../src/problems/P5_SlidingWindowMaximum';

describe('P5: Sliding Window Maximum', () => {

    const testCases = [
        { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3, expected: [3, 3, 5, 5, 6, 7] },
        { nums: [1], k: 1, expected: [1] },
        { nums: [1, -1], k: 1, expected: [1, -1] },
        { nums: [7, 2, 4], k: 2, expected: [7, 4] },
        { nums: [1, 3, 1, 2, 0, 5], k: 3, expected: [3, 3, 2, 5] },
        { nums: [1, 2, 3, 4, 5], k: 3, expected: [3, 4, 5] }, // Increasing sequence
        { nums: [5, 4, 3, 2, 1], k: 3, expected: [5, 4, 3] }, // Decreasing sequence
        { nums: [1, 1, 1, 1, 1], k: 3, expected: [1, 1, 1] }, // All same
        { nums: [0, 0, 0, 0, 0], k: 1, expected: [0, 0, 0, 0, 0] },
        { nums: [10, 8, 5, 12, 15, 7, 13], k: 4, expected: [12, 15, 15, 15] },
        { nums: [], k: 0, expected: [] }, // Empty array, k=0 (edge case, not strictly covered by constraints but good to handle)
        { nums: [], k: 1, expected: [] }, // Empty array, k=1
        { nums: [1, 2, 3, 4, 5], k: 5, expected: [5] }, // Window size equals array length
        { nums: [-9, -7, -5, -3, -1], k: 2, expected: [-7, -5, -3, -1] }, // All negative, increasing
        { nums: [-1, -3, -5, -7, -9], k: 2, expected: [-1, -3, -5, -7] }, // All negative, decreasing
        { nums: [1, 2, 3], k: 4, expected: [] }, // k > nums.length (should not happen per constraints, but good to check defensive coding)
    ];

    const runTestsForMaxSlidingWindow = (solutionFn: (nums: number[], k: number) => number[], solutionName: string) => {
        describe(solutionName, () => {
            test.each(testCases)(
                'should return $expected for nums=$nums and k=$k',
                ({ nums, k, expected }) => {
                    // Handle the k > nums.length constraint from problem statement.
                    // If k is greater than nums.length, problem says it won't happen.
                    // If it does, a reasonable output would be empty or an error.
                    // My functions return empty array, which is acceptable.
                    if (k > nums.length && nums.length > 0) {
                        expect(solutionFn(nums, k)).toEqual([]);
                    } else {
                        expect(solutionFn(nums, k)).toEqual(expected);
                    }
                }
            );
        });
    };

    runTestsForMaxSlidingWindow(maxSlidingWindowOptimal, 'Optimal Solution (Deque)');
    runTestsForMaxSlidingWindow(maxSlidingWindowBruteForce, 'Brute Force Solution');
    runTestsForMaxSlidingWindow(maxSlidingWindowTwoPasses, 'Two Passes (DP) Solution');

    // Additional specific test for the `k > nums.length` constraint which the problem states won't happen.
    // Our functions return an empty array if `k > nums.length` and `nums` is not empty.
    test('Optimal should return empty array when k > nums.length (even though constraints say this wont happen)', () => {
        expect(maxSlidingWindowOptimal([1, 2, 3], 4)).toEqual([]);
    });
    test('Brute Force should return empty array when k > nums.length', () => {
        expect(maxSlidingWindowBruteForce([1, 2, 3], 4)).toEqual([]);
    });
    test('Two Passes should return empty array when k > nums.length', () => {
        expect(maxSlidingWindowTwoPasses([1, 2, 3], 4)).toEqual([]);
    });
});
```