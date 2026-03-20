```javascript
/**
 * @fileoverview
 * Implementations for generating all permutations of an array.
 *
 * Problem: Given an array `nums` of distinct integers, return all possible permutations.
 * You can return the answer in any order.
 *
 * Example:
 * Input: `nums = [1, 2, 3]`
 * Output: `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`
 *
 * Constraints:
 * - 1 <= nums.length <= 6
 * - -10 <= nums[i] <= 10
 * - All the integers in `nums` are unique.
 */

/**
 * Finds all unique permutations of an array of distinct numbers using backtracking.
 *
 * This approach builds permutations incrementally. At each step, it tries to place
 * an unused number into the current position of the permutation being built.
 *
 * The `backtrack` function takes the following parameters:
 * @param {number[]} nums - The original array of numbers.
 * @param {number[]} currentPermutation - The permutation being built up in the current recursive call.
 * @param {boolean[]} used - An array of booleans to keep track of which numbers from `nums` have already been used in `currentPermutation`.
 * @param {number[][]} results - The array to store all valid permutations.
 */
function findPermutations(nums) {
    const results = [];
    const currentPermutation = [];
    const used = new Array(nums.length).fill(false); // To keep track of used elements

    /**
     * Recursive helper function for backtracking.
     * @param {number[]} currentPermutation - The current permutation being built.
     * @param {boolean[]} used - Tracks which numbers from nums are already in currentPermutation.
     */
    function backtrack() {
        // Base case: If the current permutation is complete (has the same length as nums),
        // add a copy of it to the results.
        if (currentPermutation.length === nums.length) {
            results.push([...currentPermutation]); // Push a shallow copy to avoid reference issues
            return; // Backtrack
        }

        // Recursive step: Iterate through all available numbers.
        for (let i = 0; i < nums.length; i++) {
            // Pruning: If the number at index `i` has already been used in `currentPermutation`, skip it.
            if (used[i]) {
                continue;
            }

            // Make a choice: Add the current number to the permutation.
            currentPermutation.push(nums[i]);
            used[i] = true; // Mark it as used.

            // Explore: Recurse to build the rest of the permutation.
            backtrack();

            // Unmake the choice (backtrack): Remove the last number and mark it as unused
            // to explore other possibilities. This allows other branches of the decision tree.
            used[i] = false;
            currentPermutation.pop();
        }
    }

    backtrack(); // Start the backtracking process
    return results;
}

/**
 * Another common approach for permutations using swapping.
 * This method modifies the input array in place and backtracks by swapping back.
 * It does not require a `used` array.
 *
 * @param {number[]} nums - The original array of numbers.
 * @returns {number[][]} All possible permutations.
 */
function findPermutationsSwap(nums) {
    const results = [];

    /**
     * Helper function to swap elements in an array.
     * @param {number[]} arr - The array.
     * @param {number} i - First index.
     * @param {number} j - Second index.
     */
    function swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    /**
     * Recursive helper function for backtracking using swaps.
     * @param {number} first - The starting index for the current permutation part.
     * @param {number[]} arr - The array (passed by reference, modified in place).
     */
    function backtrack(first, arr) {
        // Base case: If `first` index has reached the end of the array,
        // it means we've generated a complete permutation.
        if (first === arr.length) {
            results.push([...arr]); // Push a shallow copy
            return;
        }

        // Recursive step: Iterate from `first` to the end of the array.
        // For each `i`, we swap `arr[first]` with `arr[i]` to place `arr[i]`
        // at the current position, then recurse.
        for (let i = first; i < arr.length; i++) {
            // Make a choice: Swap `arr[first]` with `arr[i]`.
            // This effectively places `arr[i]` at the `first` position.
            swap(arr, first, i);

            // Explore: Recurse for the next position (`first + 1`).
            backtrack(first + 1, arr);

            // Unmake the choice (backtrack): Swap them back to restore the array
            // to its state before the current choice, allowing other branches
            // of the decision tree to be explored.
            swap(arr, first, i);
        }
    }

    backtrack(0, nums); // Start backtracking from the first element
    return results;
}


/*
 * Time Complexity Analysis:
 * Let N be the number of elements in `nums`.
 *
 * There are N! (N factorial) unique permutations.
 * For each permutation:
 * - The `currentPermutation.length === nums.length` check takes O(1).
 * - Pushing to `results` takes O(N) because a shallow copy `[...currentPermutation]` is made.
 *
 * In the `backtrack` function:
 * - The loop runs N times.
 * - Inside the loop, operations like `push`, `pop`, and array access for `used` are O(1).
 *
 * The depth of the recursion tree is N.
 * At the first level, there are N choices.
 * At the second level, N-1 choices, and so on.
 * Total nodes in the recursion tree (roughly) = N * (N-1) * ... * 1 = N!
 * Or more precisely, for a decision tree, the number of internal nodes is sum(N! / (N-k)! for k from 0 to N-1).
 *
 * So, we visit roughly N! * N nodes. At each leaf node, we perform an O(N) copy operation.
 *
 * Total Time Complexity: O(N * N!)
 *
 * Space Complexity Analysis:
 *
 * 1. `results` array: Stores N! permutations, each of length N. So, O(N * N!) space.
 * 2. `currentPermutation` array: Stores at most N elements. O(N) space.
 * 3. `used` array: Stores N booleans. O(N) space.
 * 4. Recursion call stack: The depth of the recursion is N. O(N) space.
 *
 * Total Space Complexity: O(N * N!) (dominated by the storage of results)
 * If we don't count the output space, it's O(N) for recursion stack and temporary arrays.
 */


module.exports = {
    findPermutations,
    findPermutationsSwap
};
```