#include <vector>
#include <algorithm> // For std::sort
#include <iostream>

#include "../utils/helpers.hpp" // For printVectorOfVectors

// Combination Sum II: Find all unique combinations in candidates where the numbers sum to target.
// Each number in candidates may only be used once in the combination.
// The solution set must not contain duplicate combinations.

namespace CombinationSumII {

    /**
     * @brief Recursive backtracking function to find unique combinations that sum to target.
     * @param candidates The list of candidate numbers (must be sorted).
     * @param target The target sum.
     * @param start_index The starting index for the current iteration to avoid duplicates and redundant checks.
     * @param current_combination The current combination being built.
     * @param result The vector to store all valid unique combinations.
     *
     * Time Complexity:
     * Exponential. In the worst case, it's roughly O(2^N) where N is the number
     * of candidates, as each number can either be included or not included.
     * However, `target` also plays a role. If all numbers are 1, and target is N,
     * it might be O(N!). More precisely, it's related to the number of combinations,
     * which can be bounded by O(2^N).
     * Sorting takes O(N log N).
     *
     * Space Complexity:
     * O(target) for recursion depth (in worst case if all candidates are 1).
     * O(N) for `current_combination` (max size N).
     * O(number_of_solutions * N) for storing the `result`.
     */
    void backtrack(const std::vector<int>& candidates, int target, int start_index,
                   std::vector<int>& current_combination,
                   std::vector<std::vector<int>>& result) {
        // Base case 1: Target reached
        if (target == 0) {
            result.push_back(current_combination);
            return;
        }

        // Base case 2: Target is negative or no more candidates to consider
        if (target < 0) {
            return;
        }

        // Recursive step: Iterate through candidates from start_index
        for (int i = start_index; i < candidates.size(); ++i) {
            // Skip duplicates: If the current candidate is the same as the previous
            // and we are not using the previous one from this specific call stack (i > start_index),
            // then skip it to avoid duplicate combinations.
            if (i > start_index && candidates[i] == candidates[i - 1]) {
                continue;
            }

            // Optimization: If current candidate is greater than target, no need to proceed
            // since candidates are sorted and positive.
            if (candidates[i] > target) {
                break; // Since candidates are sorted, further elements will also be > target
            }

            // Make a choice: Include the current candidate
            current_combination.push_back(candidates[i]);

            // Recurse: Call backtrack with reduced target and next index (each number used once)
            backtrack(candidates, target - candidates[i], i + 1, current_combination, result);

            // Backtrack: Undo the choice (remove the current candidate)
            current_combination.pop_back();
        }
    }

    /**
     * @brief Finds all unique combinations in candidates that sum to target.
     * @param candidates The list of candidate numbers.
     * @param target The target sum.
     * @return A vector of vectors of integers, where each inner vector is a unique combination.
     */
    std::vector<std::vector<int>> combinationSum2(std::vector<int>& candidates, int target) {
        std::vector<std::vector<int>> result;
        if (candidates.empty() || target < 0) {
            return result;
        }

        // Sort candidates to handle duplicates efficiently
        std::sort(candidates.begin(), candidates.end());

        std::vector<int> current_combination;
        backtrack(candidates, target, 0, current_combination, result);
        return result;
    }

    void test_combination_sum_ii(std::vector<int> candidates, int target) {
        std::cout << "\n--- Combination Sum II ---\n";
        std::cout << "Candidates: ";
        Helpers::printVector(candidates);
        std::cout << "Target: " << target << "\n";

        auto solutions = combinationSum2(candidates, target);
        std::cout << "Found " << solutions.size() << " unique combinations:\n";
        Helpers::printVectorOfVectors(solutions);
        std::cout << "----------------------\n";
    }

} // namespace CombinationSumII