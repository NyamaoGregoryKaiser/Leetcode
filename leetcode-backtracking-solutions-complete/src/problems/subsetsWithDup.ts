/**
 * @fileoverview
 * Implements the Subsets II problem using backtracking.
 *
 * Problem: Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set).
 * The solution set must not contain duplicate subsets. Return the solution in any order.
 *
 * Example:
 * Input: nums = [1,2,2]
 * Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
 */

/**
 * Finds all unique subsets of a given array of numbers that may contain duplicates.
 *
 * Brute Force Approach (Conceptual):
 * A brute-force approach would be to generate all 2^N possible subsets without considering duplicates.
 * Then, for each subset, convert it to a canonical form (e.g., sort the subset and then convert to string)
 * and store it in a Set to filter out duplicates.
 * This involves N * 2^N operations for sorting each subset and potentially N * 2^N space for unique strings,
 * which is inefficient.
 *
 * Optimized Backtracking Approach:
 * The backtracking approach builds subsets incrementally. To handle duplicates, we first sort the input array.
 * When making choices in the backtracking loop, if the current element is a duplicate of the previous element
 * and the previous element was *not* picked (i.e., we are in the same level of recursion and trying a new branch),
 * we skip the current element to avoid generating duplicate subsets.
 *
 * Time Complexity: O(N * 2^N)
 *   - Sorting the input array takes O(N log N).
 *   - In the worst case, we generate 2^N subsets. For each subset, we perform operations proportional to its length (N)
 *     (e.g., adding to `currentSubset`, pushing to `solutions`, copying the subset).
 *   - The number of unique subsets with duplicates is still at most 2^N.
 * Space Complexity: O(N * 2^N)
 *   - To store all the subsets in the `solutions` array. The maximum number of subsets is 2^N, and each subset can have up to N elements.
 *   - O(N) for the recursion stack depth (maximum depth is N).
 *
 * @param nums The input array of numbers, potentially containing duplicates.
 * @returns A 2D array containing all unique subsets.
 */
export function subsetsWithDup(nums: number[]): number[][] {
    const solutions: number[][] = [];
    // Sort the input array to handle duplicates effectively.
    // This groups identical elements together, which simplifies the duplicate skipping logic.
    nums.sort((a, b) => a - b);

    /**
     * Recursive backtracking helper function.
     *
     * @param start The starting index for the current iteration, ensuring elements are picked in increasing order.
     * @param currentSubset The current subset being built.
     */
    function backtrack(start: number, currentSubset: number[]): void {
        // Base case: Add the current subset to the solutions.
        // A subset is formed at every step of the recursion.
        // We create a new array using `slice()` to store a snapshot of `currentSubset`,
        // as `currentSubset` will be modified during backtracking.
        solutions.push([...currentSubset]);

        // Recursive step: Iterate through possible numbers to add to the current subset.
        for (let i = start; i < nums.length; i++) {
            // Pruning/Duplicate Handling:
            // If the current element is the same as the previous one AND
            // we are not considering the first occurrence of this duplicate group (i > start),
            // then we have already explored all subsets that include the previous identical element
            // starting from the `start` index.
            // Skipping this duplicate prevents generating redundant subsets (e.g., [1,2_a] and [1,2_b]).
            if (i > start && nums[i] === nums[i - 1]) {
                continue; // Skip duplicates
            }

            // Make a choice: Include the current number in the subset.
            currentSubset.push(nums[i]);

            // Recurse: Explore subsets starting from the next index (i + 1).
            // This ensures each element is considered at most once for a given branch
            // and maintains the non-decreasing order for combinations.
            backtrack(i + 1, currentSubset);

            // Backtrack: Remove the current number from the subset.
            // This undoes the choice, allowing other possibilities to be explored
            // for the current `start` level.
            currentSubset.pop();
        }
    }

    // Start the backtracking process from the beginning of the sorted array with an empty subset.
    backtrack(0, []);

    return solutions;
}
```