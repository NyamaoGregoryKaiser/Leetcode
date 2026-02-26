#ifndef ARRAY_MANIPULATION_H
#define ARRAY_MANIPULATION_H

#include <vector>
#include <algorithm> // Required for std::reverse, std::sort

// Problem 1: Rotate Array
namespace RotateArray {
    // Approach 1: Using extra space (temporary array)
    void rotate_approach1(std::vector<int>& nums, int k);
    // Approach 2: Reversal technique (in-place, optimal)
    void rotate_approach2(std::vector<int>& nums, int k);
    // Approach 3: Juggling Cycle Algorithm (in-place, optimal)
    void rotate_approach3(std::vector<int>& nums, int k);
}

// Problem 2: Product of Array Except Self
namespace ProductExceptSelf {
    // Approach 1: Two-pass (prefix and suffix products), optimal
    std::vector<int> productExceptSelf_approach1(const std::vector<int>& nums);
}

// Problem 3: Merge Intervals
namespace MergeIntervals {
    // Approach 1: Sort and merge, optimal
    std::vector<std::vector<int>> merge_approach1(std::vector<std::vector<int>>& intervals);
}

// Problem 4: Trapping Rain Water
namespace TrappingRainWater {
    // Approach 1: Two pointers (optimal)
    int trap_approach1(const std::vector<int>& height);
    // Approach 2: Using a stack
    int trap_approach2(const std::vector<int>& height);
}

#endif // ARRAY_MANIPULATION_H
---