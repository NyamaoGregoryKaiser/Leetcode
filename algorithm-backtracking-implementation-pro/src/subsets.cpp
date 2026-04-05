#include "backtracking_solver.hpp"
#include <vector>
#include <algorithm> // For std::sort if needed, but not for core logic

namespace Backtracking {

// Recursive backtracking function to generate subsets
// @param nums: The input array of integers.
// @param start_index: The starting index for considering elements in the current recursive call.
// @param current_subset: The subset being built in the current path of recursion.
// @param results: A vector to store all generated subsets.
void backtrack_subsets(const std::vector<int>& nums, int start_index,
                       std::vector<int>& current_subset,
                       std::vector<std::vector<int>>& results) {
    // Base case: Add the current subset to results.
    // Every path in the recursion tree from the root to any node represents a valid subset.
    results.push_back(current_subset);

    // Recursive step: Iterate through elements from `start_index` to the end of `nums`.
    for (int i = start_index; i < nums.size(); ++i) {
        // Choice: Include the current element `nums[i]` in the subset.
        current_subset.push_back(nums[i]);

        // Recurse: Explore subsets starting from the *next* element (`i + 1`).
        // This ensures that we don't pick the same element multiple times in a subset
        // and also handles the "order" implicitly (e.g., [1,2] is the same as [2,1]).
        backtrack_subsets(nums, i + 1, current_subset, results);

        // Backtrack: Undo the choice. Remove the last added element from `current_subset`.
        // This allows exploring paths where `nums[i]` is NOT included.
        current_subset.pop_back();
    }
}

// Main function to generate all subsets (power set) of an array.
// This version handles distinct unique elements.
// @param nums: The input array of unique integers.
// @return: A vector of vectors, where each inner vector is a distinct subset.
std::vector<std::vector<int>> subsets(std::vector<int>& nums) {
    std::vector<std::vector<int>> results; // Stores all subsets
    std::vector<int> current_subset;       // Represents the subset being built

    // It's often good practice to sort the input array for combinatorial problems,
    // especially if duplicates are present or if canonical order is required.
    // For unique elements, it's not strictly necessary for correctness but can
    // make the output deterministic if not specified.
    // std::sort(nums.begin(), nums.end()); // Uncomment if you want sorted output

    // Start the backtracking process from the first element (index 0)
    backtrack_subsets(nums, 0, current_subset, results);

    return results;
}

} // namespace Backtracking

/*
Complexity Analysis for Subsets (Backtracking approach):

Let N be the number of elements in the input array `nums`.

Time Complexity:
1.  **Number of subsets:** For N elements, there are 2^N possible subsets (including the empty set).
2.  **Work per subset:** Each time a subset is found (base case or at any `push_back` to `results`),
    it requires copying `current_subset` into `results`. Copying a `std::vector` of size `k` takes O(k) time.
    On average, the size of a subset is N/2. So, copying takes O(N).
    Therefore, the total time to collect all 2^N subsets is O(2^N * N).
    The recursion tree also has 2^N leaves. Each node in the tree performs constant work (loop, push_back, pop_back)
    plus the work of its children. The loop for choosing elements runs N times in the worst case (for the initial call).
    Overall, the dominant factor is the generation and copying of subsets.
    Time Complexity: O(2^N * N).

Space Complexity:
1.  **Recursion stack:** The maximum depth of the recursion is N (when `start_index` goes from 0 to N).
    Each stack frame stores parameters and local variables. So, the auxiliary space for the recursion stack is O(N).
2.  **`current_subset`:** The maximum size of `current_subset` is N. So, O(N) space.
3.  **Result storage:** We store 2^N subsets. On average, each subset has N/2 elements.
    Therefore, the space required to store all results is O(2^N * N).
    If we only consider the auxiliary space (excluding the output), it's O(N) for the recursion stack and `current_subset`.

Note on duplicates:
This specific implementation assumes `nums` contains unique integers. If `nums` could contain duplicates,
additional pruning logic would be required inside the loop to skip duplicate elements, typically after sorting `nums`.
e.g., `if (i > start_index && nums[i] == nums[i-1]) continue;`
*/