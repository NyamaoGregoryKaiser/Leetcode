```cpp
#ifndef BINARY_SEARCH_ALGORITHMS_H
#define BINARY_SEARCH_ALGORITHMS_H

#include <vector>
#include <algorithm> // For std::max_element

// Forward declarations for all binary search problems and their alternatives

namespace BinarySearch {

    // Problem 1: Standard Binary Search
    // --- Brute Force / Linear Search ---
    // Time Complexity: O(N)
    // Space Complexity: O(1)
    int linearSearch(const std::vector<int>& nums, int target);

    // --- Optimal Solution 1.1: Iterative Binary Search ---
    // Time Complexity: O(log N)
    // Space Complexity: O(1)
    int standardBinarySearchIterative(const std::vector<int>& nums, int target);

    // --- Optimal Solution 1.2: Recursive Binary Search ---
    // Time Complexity: O(log N)
    // Space Complexity: O(log N) (due to recursion stack)
    int standardBinarySearchRecursive(const std::vector<int>& nums, int target);
    // Helper for the recursive function (internal use)
    int _standardBinarySearchRecursiveHelper(const std::vector<int>& nums, int target, int low, int high);


    // Problem 2: Find First and Last Occurrence of an Element
    // Time Complexity: O(log N)
    // Space Complexity: O(1)
    std::vector<int> findFirstAndLastOccurrence(const std::vector<int>& nums, int target);
    // Helper to find the first occurrence (used by main problem)
    int findFirstOccurrence(const std::vector<int>& nums, int target);
    // Helper to find the last occurrence (used by main problem)
    int findLastOccurrence(const std::vector<int>& nums, int target);


    // Problem 3: Search in Rotated Sorted Array
    // Time Complexity: O(log N)
    // Space Complexity: O(1)
    int searchInRotatedSortedArray(const std::vector<int>& nums, int target);


    // Problem 4: Find Peak Element
    // --- Brute Force / Linear Scan ---
    // Time Complexity: O(N)
    // Space Complexity: O(1)
    int findPeakElementLinear(const std::vector<int>& nums);

    // --- Optimal Solution: Binary Search ---
    // Time Complexity: O(log N)
    // Space Complexity: O(1)
    int findPeakElement(const std::vector<int>& nums);


    // Problem 5: Smallest Divisor Given a Threshold (Binary Search on Answer)
    // Time Complexity: O(N log(MaxDivisor)) where MaxDivisor is max(nums)
    // Space Complexity: O(1)
    int smallestDivisor(const std::vector<int>& nums, int threshold);

} // namespace BinarySearch

#endif // BINARY_SEARCH_ALGORITHMS_H
```