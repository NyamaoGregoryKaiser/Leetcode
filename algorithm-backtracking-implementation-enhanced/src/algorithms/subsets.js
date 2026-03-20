```javascript
/**
 * @fileoverview
 * Implementations for generating all possible subsets (the power set) of an array.
 *
 * Problem: Given an integer array `nums` of unique elements, return all possible
 * subsets (the power set). The solution set must not contain duplicate subsets.
 * You can return the answer in any order.
 *
 * Example:
 * Input: `nums = [1, 2, 3]`
 * Output: `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`
 * (Order of subsets within the outer array and elements within subsets may vary)
 *
 * Constraints:
 * - 1 <= nums.length <= 10
 * - -10 <= nums[i] <= 10
 * - All the numbers in `nums` are unique.
 */

/**
 * Finds all possible subsets of an array `nums` using backtracking.
 *
 * This approach treats each element as having two choices: either include it
 * in the current subset or exclude it. To avoid duplicate subsets, it uses a `start`
 * parameter to ensure that elements are considered in a non-decreasing order for inclusion.
 *
 * The `backtrack` function takes the following parameters:
 * @param {number[]} nums - The original array of numbers.
 * @param {number[]} currentSubset - The subset being built up in the current recursive call.
 * @param {number[][]} results - The array to store all valid subsets.
 * @param {number} start - The starting index for the current choice to avoid duplicates.
 */
function findSubsets(nums) {
    const results = [];
    const currentSubset = [];

    /**
     * Recursive helper function for backtracking.
     * @param {number} start - The starting index to consider for the current iteration.
     */
    function backtrack(start) {
        // Every path in the decision tree leads to a valid subset.
        // So, at the beginning of each call, we add a copy of the currentSubset
        // to our results. This includes the empty set at the very beginning
        // (when currentSubset is empty and start is 0).
        results.push([...currentSubset]); // Push a shallow copy

        // Recursive step: Iterate from `start` to `nums.length - 1`.
        // `start` ensures that we only pick elements at or after the current index,
        // preventing duplicates like `[1,2]` and then `[2,1]`.
        for (let i = start; i < nums.length; i++) {
            // Make a choice: Include `nums[i]` in the current subset.
            currentSubset.push(nums[i]);

            // Explore: Recurse for the next element, starting from `i + 1`.
            // This means `nums[i]` has been chosen, and subsequent elements
            // will be chosen from `nums[i+1]` onwards.
            backtrack(i + 1);

            // Unmake the choice (backtrack): Remove `nums[i]` from the current subset.
            // This allows the next iteration of the loop (or a higher level call)
            // to explore paths where `nums[i]` is NOT included.
            currentSubset.pop();
        }
    }

    backtrack(0); // Start the backtracking process from the first element (index 0)
    return results;
}

/**
 * Another common approach for finding subsets, often called the "inclusion-exclusion" method.
 * This explicitly explores two branches for each element:
 * 1. Include the element.
 * 2. Exclude the element.
 *
 * @param {number[]} nums - The original array of numbers.
 * @returns {number[][]} All possible subsets.
 */
function findSubsetsIncludeExclude(nums) {
    const results = [];
    const currentSubset = [];

    /**
     * Recursive helper function for backtracking with explicit include/exclude choices.
     * @param {number} index - The current index of the number being considered in `nums`.
     */
    function backtrack(index) {
        // Base case: If we have considered all elements, the current `currentSubset`
        // is a valid subset.
        if (index === nums.length) {
            results.push([...currentSubset]);
            return;
        }

        // Choice 1: Include `nums[index]` in the current subset.
        currentSubset.push(nums[index]);
        // Explore this path (move to the next element).
        backtrack(index + 1);
        // Unmake choice: Remove `nums[index]` to backtrack.
        currentSubset.pop();

        // Choice 2: Exclude `nums[index]` from the current subset.
        // We simply move to the next element without adding `nums[index]`.
        backtrack(index + 1);
    }

    backtrack(0); // Start the backtracking process from the first element (index 0)
    return results;
}


/*
 * Time Complexity Analysis:
 * Let N be the number of elements in `nums`.
 *
 * There are 2^N possible subsets (the power set).
 *
 * For each subset:
 * - We create a copy of `currentSubset` of varying length. On average, it's O(N).
 *   However, summing up all lengths: Each element appears in 2^(N-1) subsets.
 *   Total elements across all subsets: N * 2^(N-1).
 *   Copying these takes roughly O(N * 2^N) time.
 *
 * In the `backtrack` function:
 * - The loop runs at most N times.
 * - Operations like `push`, `pop` are O(1).
 * - The depth of the recursion tree is N.
 *
 * Every call to `backtrack` either pushes `currentSubset` to results (O(N) copy)
 * or makes recursive calls.
 * The total number of nodes in the decision tree is proportional to 2^N.
 *
 * Total Time Complexity: O(N * 2^N)
 * The factor N comes from copying each valid subset to the `results` array.
 *
 * Space Complexity Analysis:
 *
 * 1. `results` array: Stores 2^N subsets. The average length of a subset is N/2,
 *    but the maximum length is N. So, O(N * 2^N) space to store all subsets.
 * 2. `currentSubset` array: Stores at most N elements. O(N) space.
 * 3. Recursion call stack: The depth of the recursion is N. O(N) space.
 *
 * Total Space Complexity: O(N * 2^N) (dominated by the storage of results)
 * If we don't count the output space, it's O(N) for recursion stack and temporary array.
 */

module.exports = {
    findSubsets,
    findSubsetsIncludeExclude
};
```