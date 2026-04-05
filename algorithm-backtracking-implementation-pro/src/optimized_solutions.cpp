#include "backtracking_solver.hpp"
#include <vector>
#include <cmath> // For std::pow or for bit manipulation limit

namespace OptimizedBacktracking {

// Iterative approach to generate all subsets using bit manipulation.
// This method leverages the fact that there are 2^N subsets for N elements,
// and each integer from 0 to 2^N - 1 can represent a unique subset.
// If the k-th bit of the integer is set, the k-th element of the input array is included.
//
// @param nums: The input array of integers (assumed unique for simplicity here,
//              but works for duplicates as well, though it won't filter duplicate subsets).
// @return: A vector of vectors, where each inner vector is a distinct subset.
std::vector<std::vector<int>> subsetsIterative(std::vector<int>& nums) {
    std::vector<std::vector<int>> results;
    int n = nums.size();
    
    // Total number of subsets is 2^N
    // We iterate from 0 to (2^N - 1)
    int num_subsets = 1 << n; // Equivalent to std::pow(2, n) but often faster and explicit for bitwise ops

    // Each integer 'i' from 0 to (2^N - 1) represents a unique subset
    for (int i = 0; i < num_subsets; ++i) {
        std::vector<int> current_subset;
        // Check each bit of 'i' to determine which elements to include in the current subset
        for (int j = 0; j < n; ++j) {
            // If the j-th bit of 'i' is set (i.e., (i >> j) & 1 is true)
            if ((i >> j) & 1) {
                current_subset.push_back(nums[j]);
            }
        }
        results.push_back(current_subset);
    }

    return results;
}

} // namespace OptimizedBacktracking

/*
Complexity Analysis for Subsets (Iterative/Bit Manipulation approach):

Let N be the number of elements in the input array `nums`.

Time Complexity:
1.  **Outer loop:** The loop runs `2^N` times (from 0 to `num_subsets - 1`).
2.  **Inner loop:** Inside the outer loop, the inner loop runs `N` times (for `j` from 0 to `n-1`).
    Each iteration of the inner loop involves bitwise operations and a potential `push_back`.
    Bitwise operations are O(1). `push_back` on a `std::vector` is amortized O(1).
3.  **Copying subsets:** Each `current_subset` is eventually added to `results`. On average, a subset has N/2 elements.
    So, copying `current_subset` takes O(N) time.
    Therefore, the total time to generate and copy all 2^N subsets is O(2^N * N).

Time Complexity: O(2^N * N).
This is asymptotically the same as the backtracking approach, but often faster in practice due to
avoiding recursion overhead and potentially better cache locality.

Space Complexity:
1.  **`current_subset`:** In each iteration of the outer loop, a `current_subset` is built. Its maximum size is N.
    So, O(N) auxiliary space for `current_subset` at any point.
2.  **Result storage:** We store 2^N subsets. On average, each subset has N/2 elements.
    Therefore, the space required to store all results is O(2^N * N).
    If we only consider the auxiliary space (excluding the output), it's O(N) for `current_subset`.

This approach is highly memory efficient for its auxiliary space, only needing to store one `current_subset` at a time.
*/