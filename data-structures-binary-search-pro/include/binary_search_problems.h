#ifndef BINARY_SEARCH_PROBLEMS_H
#define BINARY_SEARCH_PROBLEMS_H

#include <vector>
#include <climits> // For INT_MAX, INT_MIN in Kth smallest

// Problem 1: Standard Binary Search
namespace BinarySearch {

    // Optimal Iterative Binary Search
    int searchIterative(const std::vector<int>& nums, int target);

    // Optimal Recursive Binary Search
    int searchRecursive(const std::vector<int>& nums, int target);
    // Helper for recursive search
    int searchRecursiveHelper(const std::vector<int>& nums, int target, int low, int high);

    // Problem 2: First and Last Occurrence
    // Find the first index of target. Returns -1 if not found.
    int findFirstOccurrence(const std::vector<int>& nums, int target);

    // Find the last index of target. Returns -1 if not found.
    int findLastOccurrence(const std::vector<int>& nums, int target);

    // Problem 3: Search in Rotated Sorted Array
    // Search for a target in a rotated sorted array. Returns index, or -1 if not found.
    int searchRotatedSortedArray(const std::vector<int>& nums, int target);

    // Problem 4: Integer Square Root (mySqrt)
    // Computes the integer square root of x, truncating decimals.
    long long mySqrt(int x);

    // Problem 5: Kth Smallest Element in Two Sorted Arrays
    // Finds the k-th smallest element (1-indexed) in two sorted arrays.
    int findKthSmallestInTwoSortedArrays(const std::vector<int>& nums1, const std::vector<int>& nums2, int k);

} // namespace BinarySearch

#endif // BINARY_SEARCH_PROBLEMS_H
---