#include "brute_force_solutions.h"
#include <iostream>
#include <algorithm> // For std::sort, std::merge
#include <vector>    // For std::vector

namespace BruteForce {

    // --- Brute-force for Standard Binary Search: Linear Scan ---

    /**
     * @brief Linear Search
     * Finds the index of a target element by iterating through the vector.
     * This is the brute-force approach compared to binary search.
     *
     * @param nums The vector of integers (can be unsorted, but works for sorted too).
     * @param target The element to search for.
     * @return The index of the target if found, -1 otherwise.
     *
     * @complexity
     *   Time: O(N) - In the worst case, we may iterate through all N elements.
     *   Space: O(1) - Uses a constant amount of extra space.
     */
    int linearSearch(const std::vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] == target) {
                return i; // Target found
            }
        }
        return -1; // Target not found
    }

    // --- Brute-force for Search in Rotated Sorted Array: Linear Scan ---

    /**
     * @brief Linear Search for Rotated Sorted Array
     * Since the brute-force for a rotated sorted array is simply to ignore the rotation
     * and scan linearly, it's identical to the general linear search.
     *
     * @param nums The rotated sorted vector of integers.
     * @param target The element to search for.
     * @return The index of the target if found, -1 otherwise.
     *
     * @complexity
     *   Time: O(N)
     *   Space: O(1)
     */
    int linearSearchRotated(const std::vector<int>& nums, int target) {
        return linearSearch(nums, target);
    }

    // --- Brute-force for Integer Square Root: Linear Search ---

    /**
     * @brief Computes the integer square root of x using a linear search approach.
     * Iterates from 0 upwards until `i*i` exceeds `x`.
     *
     * @param x The non-negative integer to find the square root of.
     * @return The integer part of the square root.
     *
     * @complexity
     *   Time: O(sqrt(X)) - In the worst case, we iterate up to sqrt(X).
     *   Space: O(1) - Uses constant extra space.
     */
    long long mySqrtLinear(int x) {
        if (x < 0) return -1;
        if (x == 0 || x == 1) return x;

        long long i = 1;
        // Use `i <= x / i` to prevent `i * i` from overflowing for large i.
        while (i <= x / i) {
            i++;
        }
        return i - 1; // The loop overshoots by 1, so return (i-1)
    }

    // --- Brute-force for Kth Smallest Element in Two Sorted Arrays: Merge and Find ---

    /**
     * @brief Finds the k-th smallest element (1-indexed) in two sorted arrays by merging them.
     * This is a straightforward brute-force approach.
     *
     * @param nums1 The first sorted vector.
     * @param nums2 The second sorted vector.
     * @param k The desired k-th smallest element (1-indexed).
     * @return The k-th smallest element.
     *
     * @complexity
     *   Time: O(m + n) - Merging two sorted arrays takes linear time.
     *   Space: O(m + n) - An auxiliary vector is created to store the merged result.
     */
    int findKthSmallestInTwoSortedArraysMerge(const std::vector<int>& nums1, const std::vector<int>& nums2, int k) {
        int m = nums1.size();
        int n = nums2.size();

        // Check for invalid k
        if (k < 1 || k > m + n) {
            std::cerr << "Error: Invalid k for KthSmallestInTwoSortedArraysMerge" << std::endl;
            return -1; // Or throw an exception
        }

        std::vector<int> merged_array;
        merged_array.reserve(m + n); // Pre-allocate memory for efficiency

        // Merge the two sorted arrays
        std::merge(nums1.begin(), nums1.end(),
                   nums2.begin(), nums2.end(),
                   std::back_inserter(merged_array));

        // The k-th smallest element is at index k-1 (0-indexed)
        return merged_array[k - 1];
    }

} // namespace BruteForce
---