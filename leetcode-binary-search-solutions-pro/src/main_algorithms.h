```cpp
#ifndef MAIN_ALGORITHMS_H
#define MAIN_ALGORITHMS_H

#include <vector>
#include <optional> // C++17 for optional return values

// Namespace for Binary Search algorithms
namespace BinarySearch {

    // Problem 1: Standard Binary Search
    // Find the index of a target element in a sorted array.
    // Returns std::optional<int> to indicate if the element is found.
    std::optional<int> iterativeBinarySearch(const std::vector<int>& nums, int target);
    std::optional<int> recursiveBinarySearch(const std::vector<int>& nums, int target);
    // Helper for recursiveBinarySearch
    std::optional<int> recursiveBinarySearchHelper(const std::vector<int>& nums, int target, int low, int high);


    // Problem 2: Find First and Last Occurrence of an Element
    // Find the first and last index of a target element in a sorted array with duplicates.
    std::optional<int> findFirstOccurrence(const std::vector<int>& nums, int target);
    std::optional<int> findLastOccurrence(const std::vector<int>& nums, int target);
    std::pair<std::optional<int>, std::optional<int>> findFirstAndLastOccurrence(const std::vector<int>& nums, int target);


    // Problem 3: Search in Rotated Sorted Array
    // Find the index of a target element in a sorted array that has been rotated.
    // Example: [4,5,6,7,0,1,2]
    std::optional<int> searchInRotatedSortedArray(const std::vector<int>& nums, int target);


    // Problem 4: Find Peak Element
    // A peak element is an element that is strictly greater than its neighbors.
    // Given an input array `nums` where `nums[i] != nums[i+1]`, find a peak element
    // and return its index. If there are multiple peaks, return the index to any of them.
    // Assume `nums[-1] = nums[n] = -infinity`.
    std::optional<int> findPeakElement(const std::vector<int>& nums);


    // Problem 5: Sqrt(x) - Integer Square Root
    // Compute and return the square root of x.
    // Since the return type is an integer, the decimal digits are truncated.
    // The return value should be a non-negative integer.
    int mySqrt(int x);

} // namespace BinarySearch

#endif // MAIN_ALGORITHMS_H
```