```cpp
#ifndef ARRAY_MANIPULATOR_H
#define ARRAY_MANIPULATOR_H

#include <vector>
#include <string>
#include <utility> // For std::pair

namespace ArrayManipulator {

    // --- Problem 1: Two Sum ---
    // Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    // Assume each input would have exactly one solution, and you may not use the same element twice.

    // Approach 1: Brute Force
    // Time: O(N^2) | Space: O(1)
    std::vector<int> twoSum_bruteForce(const std::vector<int>& nums, int target);

    // Approach 2: Hash Map (Optimal)
    // Time: O(N) | Space: O(N)
    std::vector<int> twoSum_hashMap(const std::vector<int>& nums, int target);


    // --- Problem 2: Rotate Array ---
    // Rotate an array by k steps to the right.
    // Example: nums = [1,2,3,4,5,6,7], k = 3 -> [5,6,7,1,2,3,4]

    // Approach 1: Using an extra array
    // Time: O(N) | Space: O(N)
    void rotate_extraArray(std::vector<int>& nums, int k);

    // Approach 2: Bubble rotate (k times)
    // Time: O(N*k) | Space: O(1)
    void rotate_bubble(std::vector<int>& nums, int k);

    // Approach 3: Reversal (Optimal In-Place)
    // Time: O(N) | Space: O(1)
    void rotate_reversal(std::vector<int>& nums, int k);


    // --- Problem 3: Merge Intervals ---
    // Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals,
    // and return an array of the non-overlapping intervals that cover all the intervals in the input.

    // Approach 1: Sort and Merge (Optimal)
    // Time: O(N log N) due to sorting | Space: O(N) for storing the result (worst case)
    std::vector<std::vector<int>> mergeIntervals_sortAndMerge(std::vector<std::vector<int>>& intervals);


    // --- Problem 4: Trapping Rain Water ---
    // Given n non-negative integers representing an elevation map where the width of each bar is 1,
    // compute how much water it can trap after raining.

    // Approach 1: Brute Force (for each bar, find left_max and right_max)
    // Time: O(N^2) | Space: O(1)
    int trapRainWater_bruteForce(const std::vector<int>& height);

    // Approach 2: Precompute Max Heights (Dynamic Programming/Two-Pass)
    // Time: O(N) | Space: O(N)
    int trapRainWater_precomputeMax(const std::vector<int>& height);

    // Approach 3: Two-Pointer (Optimal In-Place Logic)
    // Time: O(N) | Space: O(1)
    int trapRainWater_twoPointer(const std::vector<int>& height);

} // namespace ArrayManipulator

#endif // ARRAY_MANIPULATOR_H
```