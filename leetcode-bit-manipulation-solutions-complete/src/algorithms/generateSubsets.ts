```typescript
/**
 * src/algorithms/generateSubsets.ts
 *
 * Problem: Generate Subsets (Power Set) using Bitmasking
 *
 * Given an integer array `nums` of unique elements, return all possible subsets (the power set).
 * The solution set must not contain duplicate subsets. Return the solution in any order.
 *
 * This problem is a classic example where bit manipulation (specifically, bitmasking)
 * can be used to generate all combinations.
 *
 * Example:
 * Input: nums = [1, 2, 3]
 * Output: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
 * (Order of inner subsets and overall list may vary)
 */

/**
 * Approach 1: Bitmasking
 *
 * This approach leverages the fact that for a set of `n` elements, there are `2^n` possible subsets.
 * Each subset can be uniquely represented by a binary number (a bitmask) from `0` to `2^n - 1`.
 *
 * If the `i`-th bit of the bitmask is set (i.e., it's '1'), it means the `i`-th element
 * from the input array `nums` is included in the current subset.
 * If the `i`-th bit is unset (i.e., it's '0'), the `i`-th element is excluded.
 *
 * Algorithm:
 * 1. Get the number of elements `n = nums.length`.
 * 2. Calculate the total number of subsets `numSubsets = 2^n`. This is `1 << n`.
 * 3. Initialize an empty list `allSubsets` to store the results.
 * 4. Iterate from `i = 0` to `numSubsets - 1`. Each `i` represents a unique bitmask.
 *    a. Initialize an empty list `currentSubset`.
 *    b. Iterate from `j = 0` to `n - 1` (representing the indices of `nums`):
 *       i. Check if the `j`-th bit of the current bitmask `i` is set.
 *          This can be done with `(i >> j) & 1`.
 *          If the `j`-th bit is 1, it means `nums[j]` should be included in `currentSubset`.
 *       ii. If `(i >> j) & 1` is true, add `nums[j]` to `currentSubset`.
 *    c. Add `currentSubset` to `allSubsets`.
 * 5. Return `allSubsets`.
 *
 * Example: nums = [1, 2, 3], n = 3
 * numSubsets = 2^3 = 8. Iterate i from 0 to 7.
 *
 * i = 0 (000 in binary):
 *   j=0: (0>>0)&1 = 0. Skip nums[0].
 *   j=1: (0>>1)&1 = 0. Skip nums[1].
 *   j=2: (0>>2)&1 = 0. Skip nums[2].
 *   currentSubset = []
 *
 * i = 1 (001 in binary):
 *   j=0: (1>>0)&1 = 1. Add nums[0] (1).
 *   j=1: (1>>1)&1 = 0. Skip nums[1].
 *   j=2: (1>>2)&1 = 0. Skip nums[2].
 *   currentSubset = [1]
 *
 * i = 2 (010 in binary):
 *   j=0: (2>>0)&1 = 0. Skip nums[0].
 *   j=1: (2>>1)&1 = 1. Add nums[1] (2).
 *   j=2: (2>>2)&1 = 0. Skip nums[2].
 *   currentSubset = [2]
 *
 * ... and so on, until i = 7 (111 in binary) which gives [1,2,3].
 *
 * Time Complexity: O(N * 2^N)
 *   - There are `2^N` subsets.
 *   - For each subset, we iterate up to `N` times to build it.
 * Space Complexity: O(N * 2^N)
 *   - `2^N` subsets are stored.
 *   - Each subset can contain up to `N` elements.
 *
 * @param nums The array of unique elements.
 * @returns A list of all possible subsets.
 */
export function generateSubsets_Bitmasking(nums: number[]): number[][] {
    const n = nums.length;
    const allSubsets: number[][] = [];

    // The total number of subsets is 2^n.
    // We can iterate from 0 to 2^n - 1, where each number represents a bitmask.
    const numSubsets = 1 << n; // Equivalent to Math.pow(2, n)

    for (let i = 0; i < numSubsets; i++) {
        const currentSubset: number[] = [];
        // For each bitmask `i`, check each bit from 0 to n-1.
        for (let j = 0; j < n; j++) {
            // Check if the j-th bit of `i` is set.
            // `(i >> j)` shifts the j-th bit to the 0th position.
            // `& 1` checks if that 0th bit is 1.
            if ((i >> j) & 1) {
                currentSubset.push(nums[j]);
            }
        }
        allSubsets.push(currentSubset);
    }

    return allSubsets;
}

/**
 * Approach 2: Backtracking / Recursion (Alternative, not bit manipulation focused)
 *
 * This is the more traditional recursive approach to generate subsets.
 * It builds subsets incrementally, at each step deciding whether to include
 * the current element or not.
 * While not bit manipulation, it's a common alternative to show for this problem.
 *
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N * 2^N) (for storing results + recursion stack depth O(N))
 *
 * @param nums The array of unique elements.
 * @returns A list of all possible subsets.
 */
export function generateSubsets_Backtracking(nums: number[]): number[][] {
    const allSubsets: number[][] = [];
    const currentSubset: number[] = [];

    function backtrack(start: number) {
        // Base case: Add the current subset to the results
        allSubsets.push([...currentSubset]);

        // Recursive step: Explore options for including subsequent elements
        for (let i = start; i < nums.length; i++) {
            // 1. Include nums[i]
            currentSubset.push(nums[i]);
            // 2. Recurse with the next element
            backtrack(i + 1);
            // 3. Backtrack: Remove nums[i] to explore other combinations
            currentSubset.pop();
        }
    }

    backtrack(0);
    return allSubsets;
}

/**
 * Main function to export the preferred/most optimal solution.
 * Bitmasking is specifically asked for in the context of bit manipulation interviews.
 */
export const generateSubsets = generateSubsets_Bitmasking;
```