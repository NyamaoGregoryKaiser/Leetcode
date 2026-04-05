#include "backtracking_solver.hpp"
#include <vector>
#include <algorithm> // For std::swap

namespace Backtracking {

// Recursive backtracking function to generate permutations
// @param nums: The input array for which to generate permutations (passed by value for state management or by reference if modified and reverted)
// @param start: The starting index for the current permutation generation. Elements from `start` to `nums.size()-1` are to be permuted.
// @param results: A vector to store all generated permutations.
void backtrack_permutations(std::vector<int>& nums, int start,
                            std::vector<std::vector<int>>& results) {
    // Base case: If `start` index reaches the end of the array,
    // it means a complete permutation has been formed.
    if (start == nums.size()) {
        results.push_back(nums); // Add the current permutation to results
        return;
    }

    // Recursive step: Iterate through elements from `start` to the end of the array.
    for (int i = start; i < nums.size(); ++i) {
        // Choice: Swap the current element `nums[i]` with `nums[start]`.
        // This effectively places `nums[i]` at the current `start` position.
        std::swap(nums[start], nums[i]);

        // Recurse: Generate permutations for the rest of the array (from `start + 1`).
        backtrack_permutations(nums, start + 1, results);

        // Backtrack: Undo the swap to restore the array to its state before the choice.
        // This is crucial to explore other possibilities and avoid side effects.
        std::swap(nums[start], nums[i]);
    }
}

// Main function to generate all permutations of an array.
// This version handles distinct integers.
// @param nums: The input array of integers.
// @return: A vector of vectors, where each inner vector is a distinct permutation.
std::vector<std::vector<int>> permute(std::vector<int>& nums) {
    std::vector<std::vector<int>> results; // Stores all permutations
    // If the input array is empty, return an empty set of permutations (or a set containing an empty permutation, depending on definition)
    if (nums.empty()) {
        return results;
    }

    // Start the backtracking process from the first element (index 0)
    backtrack_permutations(nums, 0, results);

    return results;
}

} // namespace Backtracking

/*
Complexity Analysis for Permutations (swap-based approach):

Let N be the number of elements in the input array `nums`.

Time Complexity:
1.  **Number of permutations:** There are N! (N factorial) unique permutations for N distinct elements.
2.  **Work per permutation:** Each permutation involves N swaps over the course of the recursion.
    At the base case, `nums` (which is a `std::vector`) is copied into `results`. Copying a vector of size N takes O(N) time.
    So, for N! permutations, the total time to collect them is O(N! * N).
    The recursive calls and swaps also contribute:
    -   The loop runs `N` times at the first level.
    -   `N-1` times at the second level, and so on.
    -   This forms an N-ary tree where leaves are at depth N.
    -   The total number of nodes in the recursion tree is roughly N * N!.
    Each call involves a constant number of operations (swap, check base case, loop).
    Therefore, the total time complexity is dominated by generating the N! permutations and copying them.
    Overall, Time Complexity: O(N! * N).

Space Complexity:
1.  **Recursion stack:** The maximum depth of the recursion is N (when `start` reaches `nums.size()`).
    Each stack frame stores a few variables (parameters `nums`, `start`, `results`).
    So, the auxiliary space for the recursion stack is O(N).
2.  **Result storage:** We store N! permutations, each of size N.
    Therefore, the space required to store all results is O(N! * N).
    If we only consider the auxiliary space (excluding the output), it's O(N) for the recursion stack.

Note on duplicates:
This specific implementation assumes `nums` contains distinct integers. If `nums` could contain duplicates,
additional logic (e.g., using a `std::set` to store permutations and remove duplicates, or a more complex
pruning step based on sorting and skipping duplicate elements at each level of recursion) would be required.
*/