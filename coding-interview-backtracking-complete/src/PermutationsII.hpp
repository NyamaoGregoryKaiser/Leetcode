```cpp
#ifndef PERMUTATIONS_II_HPP
#define PERMUTATIONS_II_HPP

#include <vector>
#include <algorithm> // For std::sort

/**
 * @brief Solution for the Permutations II problem (with duplicates).
 *
 * Given a collection of numbers, `nums`, that might contain duplicates, return all possible unique permutations.
 *
 * @complexity
 * Time Complexity: O(N * N!) - There are N! permutations in total for N distinct elements. With duplicates,
 * the number of unique permutations is N! / (c1! * c2! * ...), where c_i is the count of duplicate element i.
 * For each unique permutation found, converting it to a result vector takes O(N) time.
 * The backtracking itself explores branches.
 * The initial sort is O(N log N).
 *
 * Space Complexity: O(N) - For the recursion stack depth (at most N), the `current_permutation` vector,
 * and the `used` boolean array.
 * The space for the result `all_permutations` is O(N * N!) in the worst case, but this is output space.
 */
class PermutationsII {
public:
    /**
     * @brief Generates all unique permutations of a given array with duplicates.
     * @param nums The input array of integers, possibly containing duplicates.
     * @return A vector of vectors of integers, where each inner vector is a unique permutation.
     */
    std::vector<std::vector<int>> permuteUnique(std::vector<int>& nums) {
        std::vector<std::vector<int>> all_permutations;
        std::vector<int> current_permutation;
        std::vector<bool> used(nums.size(), false); // Track which elements have been used in current_permutation

        // Step 1: Sort the input array. Essential for handling duplicates effectively.
        // Sorting ensures identical elements are adjacent, allowing us to skip them.
        std::sort(nums.begin(), nums.end());

        // Step 2: Start the backtracking process.
        backtrack(nums, used, current_permutation, all_permutations);

        return all_permutations;
    }

private:
    /**
     * @brief Recursive backtracking helper function to find unique permutations.
     * @param nums The original sorted input array.
     * @param used Boolean array tracking which elements are currently in `current_permutation`.
     * @param current_permutation The permutation being built in the current recursive call.
     * @param all_permutations Reference to the vector storing all unique permutations found.
     */
    void backtrack(const std::vector<int>& nums,
                   std::vector<bool>& used,
                   std::vector<int>& current_permutation,
                   std::vector<std::vector<int>>& all_permutations) {
        // Base case: If the current permutation has N elements, a complete permutation is found.
        if (current_permutation.size() == nums.size()) {
            all_permutations.push_back(current_permutation);
            return;
        }

        // Recursive step: Iterate through all available elements.
        for (int i = 0; i < nums.size(); ++i) {
            // Pruning 1: Skip if the element at index `i` is already used in the current permutation.
            if (used[i]) {
                continue;
            }

            // Pruning 2: Handle duplicates.
            // If the current element `nums[i]` is the same as the previous one `nums[i-1]`,
            // and the previous one `nums[i-1]` has NOT been used (meaning it was skipped in a previous iteration
            // at this same level of recursion), then picking `nums[i]` now would lead to a duplicate permutation.
            // We should skip `nums[i]` to avoid generating redundant branches.
            // Example: [1,1,2]
            // If we are at recursion depth 0, and `nums[0]` (first 1) is picked, then explore.
            // If we are at recursion depth 0, and `nums[0]` (first 1) is NOT picked,
            // then `i=1`. `nums[1]` (second 1) is same as `nums[0]` (first 1).
            // `used[0]` is false (because it was not picked for this position).
            // So, skip `nums[1]` to avoid starting a permutation with the second '1'
            // when the first '1' would yield the exact same sequence if arranged later.
            if (i > 0 && nums[i] == nums[i-1] && !used[i-1]) {
                continue;
            }

            // Choose: Include the current element.
            current_permutation.push_back(nums[i]);
            used[i] = true; // Mark as used.

            // Explore: Recurse to find the next element for the permutation.
            backtrack(nums, used, current_permutation, all_permutations);

            // Unchoose (Backtrack): Remove the current element and mark as unused to explore other possibilities.
            used[i] = false;
            current_permutation.pop_back();
        }
    }
};

#endif // PERMUTATIONS_II_HPP
```