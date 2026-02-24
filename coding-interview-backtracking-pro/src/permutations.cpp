#include <vector>
#include <algorithm> // For std::sort (if needed, but not for distinct elements)
#include <iostream>

#include "../utils/helpers.hpp" // For printVectorOfVectors

// Permutations: Given an array nums of distinct integers, return all possible permutations.

namespace Permutations {

    /**
     * @brief Recursive backtracking function to generate all permutations.
     * @param nums The input array of distinct integers.
     * @param current_permutation The permutation being built.
     * @param result The vector to store all generated permutations.
     * @param used Boolean array to track which numbers from `nums` have been used.
     *
     * Time Complexity:
     * O(N * N!), where N is the number of elements in `nums`.
     * There are N! permutations. For each permutation, we perform N operations
     * (e.g., building the `current_permutation` vector and adding it to `result`).
     * The recursive calls themselves form a search tree where each path from root
     * to leaf is a permutation. At each level of recursion, we iterate through N choices.
     *
     * Space Complexity:
     * O(N) for `current_permutation` (maximum N elements).
     * O(N) for `used` array.
     * O(N) for recursion stack depth.
     * O(N * N!) for storing the `result` (N! permutations, each of size N).
     * Total: O(N * N!).
     */
    void backtrack(const std::vector<int>& nums,
                   std::vector<int>& current_permutation,
                   std::vector<std::vector<int>>& result,
                   std::vector<bool>& used) {
        // Base case: If the current permutation has N elements, it's complete
        if (current_permutation.size() == nums.size()) {
            result.push_back(current_permutation);
            return;
        }

        // Recursive step: Iterate through all numbers in `nums`
        for (int i = 0; i < nums.size(); ++i) {
            // If the number has not been used yet
            if (!used[i]) {
                // Make a choice: Include the current number
                current_permutation.push_back(nums[i]);
                used[i] = true;

                // Recurse: Build the rest of the permutation
                backtrack(nums, current_permutation, result, used);

                // Backtrack: Undo the choice (remove the number and mark as unused)
                used[i] = false;
                current_permutation.pop_back();
            }
        }
    }

    /**
     * @brief Generates all possible permutations of a given array of distinct integers.
     * @param nums The input array of distinct integers.
     * @return A vector of vectors of integers, where each inner vector is a permutation.
     */
    std::vector<std::vector<int>> permute(const std::vector<int>& nums) {
        std::vector<std::vector<int>> result;
        if (nums.empty()) {
            return result;
        }

        std::vector<int> current_permutation;
        std::vector<bool> used(nums.size(), false); // Track used elements

        backtrack(nums, current_permutation, result, used);
        return result;
    }

    void test_permutations(std::vector<int> nums) {
        std::cout << "\n--- Permutations ---\n";
        std::cout << "Input: ";
        Helpers::printVector(nums);

        auto solutions = permute(nums);
        std::cout << "Found " << solutions.size() << " permutations:\n";
        Helpers::printVectorOfVectors(solutions);
        std::cout << "----------------------\n";
    }

} // namespace Permutations