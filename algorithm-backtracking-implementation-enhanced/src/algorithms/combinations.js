```javascript
/**
 * @fileoverview
 * Implementations for generating all combinations of k numbers from a range [1, n].
 *
 * Problem: Given two integers `n` and `k`, return all possible combinations of
 * `k` numbers chosen from the range `[1, n]`. You can return the answer in any order.
 *
 * Example:
 * Input: `n = 4, k = 2`
 * Output: `[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`
 *
 * Constraints:
 * - 1 <= n <= 20
 * - 1 <= k <= n
 */

/**
 * Finds all combinations of `k` numbers from the range `[1, n]` using backtracking.
 *
 * This approach builds combinations incrementally. At each step, it decides whether
 * to include the current number in the combination or not. To avoid duplicate combinations
 * and ensure numbers are in ascending order within a combination, it uses a `start` parameter
 * to only consider numbers greater than the last chosen number.
 *
 * The `backtrack` function takes the following parameters:
 * @param {number} n - The upper bound of the range [1, n].
 * @param {number} k - The number of elements to choose for each combination.
 * @param {number[]} currentCombination - The combination being built in the current recursive call.
 * @param {number[][]} results - The array to store all valid combinations.
 * @param {number} start - The starting number for the current choice to avoid duplicates and maintain order.
 */
function findCombinations(n, k) {
    const results = [];
    const currentCombination = [];

    /**
     * Recursive helper function for backtracking.
     * @param {number} start - The starting number to consider for the current position.
     */
    function backtrack(start) {
        // Base case: If the current combination has `k` elements, it's complete.
        // Add a copy of it to the results.
        if (currentCombination.length === k) {
            results.push([...currentCombination]); // Push a shallow copy
            return; // Backtrack
        }

        // Optimization (Pruning):
        // If the remaining numbers to choose (k - currentCombination.length)
        // plus the current number `i` we are considering are not enough to
        // form a combination of length `k` by the time we reach `n`,
        // then we can stop early.
        // Specifically, if `(n - i + 1) < (k - currentCombination.length)`,
        // it means there are not enough numbers left from `i` to `n` to complete the combination.
        // (n - i + 1) is the count of numbers from `i` to `n`.
        // (k - currentCombination.length) is the count of numbers we still need.
        // If what we have left is less than what we need, we can prune.
        // This condition can be written as: `i > n - (k - currentCombination.length) + 1`
        // So, we loop `for (let i = start; i <= n - (k - currentCombination.length) + 1; i++)`
        // or just continue until `i <= n` and the condition `currentCombination.length === k` will handle it.
        // For clarity and correctness, the common loop condition `i <= n` is fine,
        // but the `i <= n - (k - currentCombination.length) + 1` makes it more efficient.

        // Recursive step: Iterate from `start` up to `n`.
        // `start` ensures that we only pick numbers greater than or equal to the last picked number,
        // which prevents duplicate combinations (e.g., [1,2] and [2,1] are considered same).
        for (let i = start; i <= n; i++) {
             // Pruning for efficiency: If remaining elements (n - i + 1) are not enough to complete the combination
             // (k - currentCombination.length), then stop this branch early.
             // This is `i > n - (k - currentCombination.length) + 1`
            if (currentCombination.length + (n - i + 1) < k) {
                break; // No need to continue with i, nor with i+1, i+2...
            }


            // Make a choice: Add the current number `i` to the combination.
            currentCombination.push(i);

            // Explore: Recurse for the next position. The next number to consider starts from `i + 1`
            // to ensure combinations are unique and elements are in ascending order.
            backtrack(i + 1);

            // Unmake the choice (backtrack): Remove the last number to explore other possibilities.
            currentCombination.pop();
        }
    }

    backtrack(1); // Start the backtracking process from number 1
    return results;
}

/*
 * Time Complexity Analysis:
 * Let N be the range limit and K be the size of combinations.
 *
 * The number of combinations C(N, K) = N! / (K! * (N-K)!).
 *
 * For each combination:
 * - We create a copy of `currentCombination` of length K, which takes O(K) time.
 *
 * In the `backtrack` function:
 * - The loop runs up to N times.
 * - Operations like `push`, `pop` are O(1).
 *
 * The depth of the recursion tree is K (length of the combination).
 * At each level, the loop iterates from `start` to `N`.
 *
 * Total Time Complexity: O(K * C(N, K))
 * The factor K comes from copying each valid combination to the `results` array.
 * If we ignore the copy operation, the number of calls to `backtrack` is roughly O(C(N, K)).
 *
 * Space Complexity Analysis:
 *
 * 1. `results` array: Stores C(N, K) combinations, each of length K. So, O(K * C(N, K)) space.
 * 2. `currentCombination` array: Stores at most K elements. O(K) space.
 * 3. Recursion call stack: The depth of the recursion is K. O(K) space.
 *
 * Total Space Complexity: O(K * C(N, K)) (dominated by the storage of results)
 * If we don't count the output space, it's O(K) for recursion stack and temporary array.
 */

module.exports = {
    findCombinations
};
```