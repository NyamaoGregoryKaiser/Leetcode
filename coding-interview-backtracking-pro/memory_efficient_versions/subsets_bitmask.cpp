#include <vector>
#include <cmath> // For std::pow
#include <algorithm> // For std::sort (if needed for output consistency)
#include <iostream>

#include "../utils/helpers.hpp" // For printVectorOfVectors

// Subsets using Bitmask:
// This technique is useful for generating all subsets of a given set when the
// number of elements (N) is relatively small (typically N <= 20 to avoid huge results).
// It leverages the fact that a set with N elements has 2^N subsets.
// Each subset can be represented by a unique N-bit binary number, where the i-th bit
// being set means the i-th element of the original set is included in the subset.

namespace SubsetsBitmask {

    /**
     * @brief Generates all subsets of a given vector of integers using bit manipulation.
     * @param nums The input array of distinct integers.
     * @return A vector of vectors of integers, where each inner vector is a subset.
     *
     * Time Complexity: O(N * 2^N)
     * There are 2^N subsets. For each subset, we iterate up to N bits to construct it.
     *
     * Space Complexity: O(N * 2^N) for storing the result.
     * O(1) auxiliary space beyond the input and output.
     */
    std::vector<std::vector<int>> subsets_bitmask(const std::vector<int>& nums) {
        std::vector<std::vector<int>> result;
        if (nums.empty()) {
            result.push_back({}); // The empty set is a subset of an empty set
            return result;
        }

        int n = nums.size();
        int num_subsets = 1 << n; // Equivalent to std::pow(2, n), but faster for integers

        // Iterate from 0 to 2^N - 1
        for (int i = 0; i < num_subsets; ++i) {
            std::vector<int> current_subset;
            // For each number 'i', check its bits to form a subset
            for (int j = 0; j < n; ++j) {
                // If the j-th bit of 'i' is set, include nums[j] in the current subset
                if ((i >> j) & 1) {
                    current_subset.push_back(nums[j]);
                }
            }
            result.push_back(current_subset);
        }

        // Optional: Sort inner subsets and then the outer vector for consistent output,
        // especially if comparing with a backtracking approach.
        for (auto& subset : result) {
            std::sort(subset.begin(), subset.end());
        }
        std::sort(result.begin(), result.end());

        return result;
    }

    void test_subsets_bitmask(std::vector<int> nums) {
        std::cout << "\n--- Subsets (Bitmask) ---\n";
        std::cout << "Input: ";
        Helpers::printVector(nums);

        auto solutions = subsets_bitmask(nums);
        std::cout << "Found " << solutions.size() << " subsets:\n";
        Helpers::printVectorOfVectors(solutions);
        std::cout << "----------------------\n";
    }

} // namespace SubsetsBitmask

// Main function to run tests for this specific file
int main() {
    std::cout << "Running Subsets Bitmask Version...\n";
    std::vector<int> n1 = {1,2,3};
    SubsetsBitmask::test_subsets_bitmask(n1);

    std::vector<int> n2 = {4,5};
    SubsetsBitmask::test_subsets_bitmask(n2);

    std::vector<int> n3 = {};
    SubsetsBitmask::test_subsets_bitmask(n3); // Empty case

    std::vector<int> n4 = {0};
    SubsetsBitmask::test_subsets_bitmask(n4); // Single element case

    std::vector<int> n5 = {10, -5, 20, 0}; // Negative numbers, zero
    SubsetsBitmask::test_subsets_bitmask(n5);

    return 0;
}