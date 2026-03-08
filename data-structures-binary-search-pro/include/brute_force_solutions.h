#ifndef BRUTE_FORCE_SOLUTIONS_H
#define BRUTE_FORCE_SOLUTIONS_H

#include <vector>
#include <algorithm> // For std::sort, std::merge

namespace BruteForce {

    // Brute-force for Standard Binary Search: Linear Scan
    int linearSearch(const std::vector<int>& nums, int target);

    // Brute-force for Search in Rotated Sorted Array: Linear Scan (same as linearSearch)
    int linearSearchRotated(const std::vector<int>& nums, int target);

    // Brute-force for Integer Square Root: Linear Search (count up from 0)
    long long mySqrtLinear(int x);

    // Brute-force for Kth Smallest in Two Sorted Arrays: Merge and Find
    int findKthSmallestInTwoSortedArraysMerge(const std::vector<int>& nums1, const std::vector<int>& nums2, int k);

} // namespace BruteForce

#endif // BRUTE_FORCE_SOLUTIONS_H
---