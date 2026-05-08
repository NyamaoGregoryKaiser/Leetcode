#ifndef ARRAY_MANIPULATION_HPP
#define ARRAY_MANIPULATION_HPP

#include <vector>
#include <numeric> // For std::iota
#include <algorithm> // For std::reverse, std::sort

// --- Problem 1: Rotate Array ---
namespace RotateArray {
    // Brute force: Rotate k times, each time shifting by 1
    // Time: O(n*k), Space: O(1)
    void rotateBruteForce(std::vector<int>& nums, int k);

    // Using Extra Space: Copy to a temporary array
    // Time: O(n), Space: O(n)
    void rotateWithExtraSpace(std::vector<int>& nums, int k);

    // Three Reversals: Optimal in-place solution
    // Time: O(n), Space: O(1)
    void rotateThreeReversals(std::vector<int>& nums, int k);

    // Juggling Algorithm: Based on GCD
    // Time: O(n), Space: O(1)
    void rotateJugglingAlgorithm(std::vector<int>& nums, int k);
}

// --- Problem 2: Product of Array Except Self ---
namespace ProductExceptSelf {
    // Brute Force with Division (if allowed): Calculate total product, then divide
    // Time: O(n), Space: O(1) (excluding output array)
    std::vector<int> productExceptSelfWithDivision(const std::vector<int>& nums);

    // Optimal: Prefix and Suffix products (without division)
    // Time: O(n), Space: O(1) (excluding output array)
    std::vector<int> productExceptSelfOptimal(const std::vector<int>& nums);
}

// --- Problem 3: Maximum Subarray Sum ---
namespace MaxSubarray {
    // Brute Force: Iterate all possible subarrays
    // Time: O(n^2), Space: O(1)
    int maxSubArrayBruteForce(const std::vector<int>& nums);

    // Kadane's Algorithm: Optimal Dynamic Programming / Greedy approach
    // Time: O(n), Space: O(1)
    int maxSubArrayKadane(const std::vector<int>& nums);
}

// --- Problem 4: Merge Intervals ---
namespace MergeIntervals {
    // Function to merge overlapping intervals
    // Time: O(N log N) due to sorting, Space: O(N) in worst case (no overlaps)
    std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals);
}

#endif // ARRAY_MANIPULATION_HPP