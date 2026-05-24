/**
 * @fileoverview
 * Implements the Permutations II problem using backtracking.
 *
 * Problem: Given a collection of numbers, `nums`, that might contain duplicates,
 * return all possible unique permutations in any order.
 *
 * Example:
 * Input: nums = [1,1,2]
 * Output: [[1,1,2], [1,2,1], [2,1,1]]
 */

/**
 * Finds all unique permutations of a given array of numbers that may contain duplicates.
 *
 * Brute Force Approach (Conceptual):
 * A brute-force approach would be to generate all N! permutations without considering duplicates.
 * Then, for each permutation, convert it to a canonical form (e.g., stringify it)
 * and store it in a Set to filter out duplicates.
 * This involves N! operations, and for each, an O(N) operation to create the permutation and O(N) for hashing,
 * leading to a total of O(N * N!) time and O(N * N!) space for the unique strings. This is extremely inefficient.
 *
 * Optimized Backtracking Approach:
 * The backtracking approach builds permutations incrementally. To handle duplicates and avoid generating
 * redundant permutations, we use a combination of sorting and a `used` array:
 * 1.  **Sort the input array:** This groups identical elements together.
 * 2.  **Use a `used` boolean array:** `used[i]` is true if `nums[i]` has already been included in the `currentPermutation`.
 *     This ensures each specific element instance at `nums[i]` is used at most once per permutation path.
 * 3.  **Skip redundant choices (duplicate handling):** In the `for` loop that iterates through candidates,
 *     if the current element `nums[i]` is the same as the previous element `nums[i-1]`, and `nums[i-1]`
 *     was *not* used in the current path (i.e., `!used[i-1]`), then skipping `nums[i]` prevents
 *     generating identical permutations that only differ by the *order* of identical elements.
 *     If `used[i-1]` was `true`, it means `nums[i-1]` was just picked, and `nums[i]` (if identical)
 *     represents a distinct *positional* choice in the current branch, so it should be considered.
 *     This subtle distinction is key for permutations with duplicates.
 *
 * Time Complexity: O(N! * N)
 *   - Sorting the input array takes O(N log N).
 *   - In the worst case, we explore N! permutations. For each permutation, creating a copy of the
 *     `currentPermutation` (which has N elements) takes O(N) time.
 *   - The loop runs N times for each depth of recursion, and the total calls approximate N!.
 * Space Complexity: O(N! * N)
 *   - To store all the permutations in the `solutions` array. Maximum number of permutations is N!, each with N elements.
 *   - O(N) for the recursion stack depth.
 *   - O(N) for the `used` array.
 *
 * @param nums The input array of numbers, potentially containing duplicates.
 * @returns A 2D array containing all unique permutations.
 */
export function permuteUnique(nums: number[]): number[][] {
    const solutions: number[][] = [];
    // Sort the input array. This is crucial for correctly handling duplicates.
    nums.sort((a, b) => a - b);

    // `used` array to keep track of which numbers have been included in the current permutation.
    // Each index corresponds to an element in the original `nums` array.
    const used: boolean[] = new Array(nums.length).fill(false);

    /**
     * Recursive backtracking helper function.
     *
     * @param currentPermutation The list of numbers forming the current permutation.
     */
    function backtrack(currentPermutation: number[]): void {
        // Base case: If the current permutation has N elements, a complete permutation is formed.
        if (currentPermutation.length === nums.length) {
            // Add a deep copy of the current permutation to the solutions.
            // `slice()` or `[...currentPermutation]` prevents modifications to `currentPermutation`
            // during backtracking from affecting the recorded solution.
            solutions.push([...currentPermutation]);
            return;
        }

        // Recursive step: Iterate through all numbers in `nums` to find the next element.
        for (let i = 0; i < nums.length; i++) {
            // Pruning/Duplicate Handling for Permutations:
            // 1. If `nums[i]` has already been used in the current permutation, skip it.
            if (used[i]) {
                continue;
            }

            // 2. This is the crucial part for handling duplicates:
            //    If the current number `nums[i]` is the same as the previous number `nums[i-1]`,
            //    AND the previous number `nums[i-1]` was *not* used (meaning we skipped it in a previous iteration of THIS loop),
            //    then we should skip `nums[i]` as well.
            //    This prevents generating duplicate permutations like [1,2,1'] and [1',2,1] where 1 and 1' are identical values.
            //    The condition `!used[i-1]` is important:
            //    If `nums[i-1]` *was* used, it means we are building a path like `[..., nums[i-1], nums[i], ...]`.
            //    In this case, `nums[i]` is distinct by its *position* relative to `nums[i-1]` in the permutation,
            //    even if their values are the same.
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue;
            }

            // Make a choice: Include the current number in the permutation.
            currentPermutation.push(nums[i]);
            used[i] = true; // Mark this number as used.

            // Recurse: Continue building the permutation.
            backtrack(currentPermutation);

            // Backtrack: Undo the choice. Remove the number and mark it as unused.
            // This restores the state for exploring other possibilities at the current level.
            used[i] = false;
            currentPermutation.pop();
        }
    }

    // Start the backtracking process with an empty permutation.
    backtrack([]);

    return solutions;
}
```