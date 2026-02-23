```cpp
#ifndef SUBSETS_II_HPP
#define SUBSETS_II_HPP

#include <vector>
#include <algorithm> // For std::sort

/**
 * @brief Solution for the Subsets II problem (with duplicates).
 *
 * Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set).
 * The solution set must not contain duplicate subsets.
 *
 * @complexity
 * Time Complexity: O(2^N * N) - There are 2^N total subsets. For each subset, copying it to the result
 * takes O(N) time. The recursive calls themselves explore the state space. The sorting takes O(N log N).
 * The primary factor is generating 2^N subsets.
 *
 * Space Complexity: O(N) - For the recursion stack depth (at most N) and the `current_subset` vector.
 * The space for the result `all_subsets` is O(2^N * N) in the worst case, but this is output space,
 * not auxiliary space of the algorithm itself.
 */
class SubsetsII {
public:
    /**
     * @brief Generates all unique subsets of a given array with duplicates.
     * @param nums The input array of integers, possibly containing duplicates.
     * @return A vector of vectors of integers, where each inner vector is a unique subset.
     */
    std::vector<std::vector<int>> subsetsWithDup(std::vector<int>& nums) {
        std::vector<std::vector<int>> all_subsets;
        std::vector<int> current_subset;

        // Step 1: Sort the input array. This is crucial for handling duplicates effectively.
        // Sorting brings identical elements together, allowing us to easily skip them.
        std::sort(nums.begin(), nums.end());

        // Step 2: Start the backtracking process.
        // `start_index` ensures that elements are considered in increasing order
        // and prevents duplicate subsets from different orderings.
        backtrack(nums, 0, current_subset, all_subsets);

        return all_subsets;
    }

private:
    /**
     * @brief Recursive backtracking helper function to find unique subsets.
     * @param nums The original sorted input array.
     * @param start_index The index from which to start considering elements for the current subset.
     * @param current_subset The subset being built in the current recursive call.
     * @param all_subsets Reference to the vector storing all unique subsets found.
     */
    void backtrack(const std::vector<int>& nums, int start_index,
                   std::vector<int>& current_subset,
                   std::vector<std::vector<int>>& all_subsets) {
        // Base case / Add current state:
        // Every time we enter the backtrack function, the `current_subset` represents a valid unique subset.
        all_subsets.push_back(current_subset);

        // Recursive step: Explore possibilities to extend the current subset.
        for (int i = start_index; i < nums.size(); ++i) {
            // Handle duplicates:
            // If the current element is the same as the previous one AND
            // we are not at the `start_index` (i.e., `i > start_index`),
            // then we have already considered subsets starting with `nums[i-1]`.
            // Skipping `nums[i]` in this case prevents duplicate subsets
            // (e.g., for [1,2,2], if we pick first '2', then we don't need to
            // consider picking second '2' if we are iterating starting from second '2').
            // The condition `i > start_index` is important.
            // When we start a new level of recursion (i.e., `i == start_index`),
            // we *should* consider the first occurrence of a duplicate element.
            // Example: [1,2,2]
            // start_index=0:
            //   [] -> add []
            //   i=0 (nums[0]=1): take 1, recurse(1, ...)
            //     [1] -> add [1]
            //     i=1 (nums[1]=2): take 2, recurse(1,2, ...)
            //       [1,2] -> add [1,2]
            //       i=2 (nums[2]=2): take 2, recurse(1,2,2, ...)
            //         [1,2,2] -> add [1,2,2]
            //         backtrack
            //       backtrack
            //     backtrack
            //   i=1 (nums[1]=2): take 2, recurse(2, ...)
            //     [2] -> add [2]
            //     i=2 (nums[2]=2): take 2, recurse(2,2, ...)
            //       [2,2] -> add [2,2]
            //       backtrack
            //     backtrack
            //   i=2 (nums[2]=2): This is where we need to skip.
            //     Here `i=2`, `start_index=0`. `nums[2] == nums[1]` is true.
            //     But `i > start_index` means `2 > 0`. This is NOT the correct condition.
            //     Correct condition for skipping duplicates is `i > start_index && nums[i] == nums[i-1]`.
            //     This correctly handles skipping the *second* '2' if we are considering starting from '2'.
            //     The `i > start_index` ensures that if `nums[i]` is the first element
            //     chosen in a new recursive call (i.e., `i == start_index`), it's always considered,
            //     even if it's a duplicate of `nums[start_index - 1]`.
            //     The condition should actually be `i > start_index && nums[i] == nums[i-1]`.
            //     This implies that if we just processed `nums[i-1]` and `nums[i]` is the same,
            //     we should skip `nums[i]` at this level, because the branch with `nums[i-1]` already
            //     covered all combinations that `nums[i]` would start.
            //     The correct logic is: if `nums[i]` is the same as `nums[i-1]`, and we are at a point
            //     where `nums[i-1]` could have been picked, then picking `nums[i]` would lead to a
            //     duplicate branch.
            //     A simpler and more robust duplicate handling for combination problems is:
            if (i > start_index && nums[i] == nums[i-1]) {
                continue; // Skip duplicates to avoid duplicate subsets.
            }

            // Choose: Include the current element.
            current_subset.push_back(nums[i]);

            // Explore: Recurse with the next element (i+1) to ensure elements are picked in order
            // and no element is picked twice in the same combination.
            backtrack(nums, i + 1, current_subset, all_subsets);

            // Unchoose (Backtrack): Remove the current element to explore other possibilities.
            current_subset.pop_back();
        }
    }
    /*
    Alternative approach discussion:
    Another way to handle duplicates, without explicit sorting initially, is to use a frequency map
    and then iterate through the map. However, for general integer arrays, sorting is simpler
    and typically more efficient than managing a frequency map for elements that might have a wide range.
    The sorting + skip duplicate logic (`if (i > start_index && nums[i] == nums[i-1]) continue;`)
    is the standard and most optimal approach for this problem.
    */
};

#endif // SUBSETS_II_HPP
```