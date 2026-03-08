#include "binary_search_problems.h"
#include <iostream>
#include <algorithm> // For std::min, std::max

namespace BinarySearch {

    // --- Problem 1: Standard Binary Search ---

    /**
     * @brief Standard Binary Search (Iterative)
     * Finds the index of a target element in a sorted vector.
     *
     * @param nums The sorted vector of integers.
     * @param target The element to search for.
     * @return The index of the target if found, -1 otherwise.
     *
     * @complexity
     *   Time: O(log N) - The search space is halved in each step.
     *   Space: O(1) - Uses a constant amount of extra space for variables.
     */
    int searchIterative(const std::vector<int>& nums, int target) {
        if (nums.empty()) {
            return -1;
        }

        int low = 0;
        int high = nums.size() - 1;

        // Loop while the search space [low, high] is valid
        while (low <= high) {
            // Calculate mid to prevent potential integer overflow:
            // mid = low + (high - low) / 2 is equivalent to (low + high) / 2
            // but safer for very large low/high values.
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid; // Target found
            } else if (nums[mid] < target) {
                // If mid element is less than target, target must be in the right half.
                // Move low to mid + 1 to exclude mid and its left side.
                low = mid + 1;
            } else { // nums[mid] > target
                // If mid element is greater than target, target must be in the left half.
                // Move high to mid - 1 to exclude mid and its right side.
                high = mid - 1;
            }
        }

        return -1; // Target not found in the array
    }

    /**
     * @brief Helper for Recursive Binary Search
     * @param nums The sorted vector of integers.
     * @param target The element to search for.
     * @param low The current lower bound of the search space.
     * @param high The current upper bound of the search space.
     * @return The index of the target if found, -1 otherwise.
     *
     * @complexity
     *   Time: O(log N) - Each recursive call halves the search space.
     *   Space: O(log N) - Due to the recursion stack depth.
     */
    int searchRecursiveHelper(const std::vector<int>& nums, int target, int low, int high) {
        // Base case: If low exceeds high, the search space is invalid, target not found.
        if (low > high) {
            return -1;
        }

        int mid = low + (high - low) / 2;

        if (nums[mid] == target) {
            return mid; // Target found
        } else if (nums[mid] < target) {
            // Target is in the right half
            return searchRecursiveHelper(nums, target, mid + 1, high);
        } else { // nums[mid] > target
            // Target is in the left half
            return searchRecursiveHelper(nums, target, low, mid - 1);
        }
    }

    /**
     * @brief Standard Binary Search (Recursive)
     * Public interface for recursive binary search.
     *
     * @param nums The sorted vector of integers.
     * @param target The element to search for.
     * @return The index of the target if found, -1 otherwise.
     *
     * @complexity
     *   Time: O(log N)
     *   Space: O(log N)
     */
    int searchRecursive(const std::vector<int>& nums, int target) {
        if (nums.empty()) {
            return -1;
        }
        return searchRecursiveHelper(nums, target, 0, nums.size() - 1);
    }

    // --- Problem 2: First and Last Occurrence ---

    /**
     * @brief Finds the first occurrence of a target element in a sorted vector with duplicates.
     * This is a "lower_bound" type of binary search.
     *
     * @param nums The sorted vector of integers.
     * @param target The element to search for.
     * @return The index of the first occurrence of the target, or -1 if not found.
     *
     * @complexity
     *   Time: O(log N)
     *   Space: O(1)
     */
    int findFirstOccurrence(const std::vector<int>& nums, int target) {
        if (nums.empty()) {
            return -1;
        }

        int low = 0;
        int high = nums.size() - 1;
        int first_occurrence_index = -1; // Stores the potential first occurrence

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                first_occurrence_index = mid; // Found a potential first occurrence
                high = mid - 1;               // Try to find an even earlier occurrence in the left half
            } else if (nums[mid] < target) {
                low = mid + 1; // Target must be in the right half
            } else { // nums[mid] > target
                high = mid - 1; // Target must be in the left half
            }
        }

        return first_occurrence_index;
    }

    /**
     * @brief Finds the last occurrence of a target element in a sorted vector with duplicates.
     * This is an "upper_bound - 1" type of binary search.
     *
     * @param nums The sorted vector of integers.
     * @param target The element to search for.
     * @return The index of the last occurrence of the target, or -1 if not found.
     *
     * @complexity
     *   Time: O(log N)
     *   Space: O(1)
     */
    int findLastOccurrence(const std::vector<int>& nums, int target) {
        if (nums.empty()) {
            return -1;
        }

        int low = 0;
        int high = nums.size() - 1;
        int last_occurrence_index = -1; // Stores the potential last occurrence

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                last_occurrence_index = mid; // Found a potential last occurrence
                low = mid + 1;               // Try to find an even later occurrence in the right half
            } else if (nums[mid] < target) {
                low = mid + 1; // Target must be in the right half
            } else { // nums[mid] > target
                high = mid - 1; // Target must be in the left half
            }
        }

        return last_occurrence_index;
    }

    // --- Problem 3: Search in Rotated Sorted Array ---

    /**
     * @brief Searches for a target in a rotated sorted array.
     *
     * The array is sorted, but then rotated at some pivot. Example: [4,5,6,7,0,1,2].
     * The key is to determine which half (left or right of mid) is sorted and then
     * check if the target lies within that sorted half.
     *
     * @param nums The rotated sorted vector of integers.
     * @param target The element to search for.
     * @return The index of the target if found, -1 otherwise.
     *
     * @complexity
     *   Time: O(log N) - Each step eliminates half of the search space.
     *   Space: O(1) - Uses constant extra space.
     */
    int searchRotatedSortedArray(const std::vector<int>& nums, int target) {
        if (nums.empty()) {
            return -1;
        }

        int low = 0;
        int high = nums.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid; // Target found
            }

            // Determine if the left half (from low to mid) is sorted
            if (nums[low] <= nums[mid]) {
                // Left half is sorted
                // Check if target is within the sorted left half
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1; // Target is in the left sorted half
                } else {
                    low = mid + 1;  // Target is in the right (unsorted or sorted) half
                }
            }
            // Otherwise, the right half (from mid to high) must be sorted
            else {
                // Right half is sorted
                // Check if target is within the sorted right half
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1;  // Target is in the right sorted half
                } else {
                    high = mid - 1; // Target is in the left (unsorted or sorted) half
                }
            }
        }

        return -1; // Target not found
    }

    // --- Problem 4: Integer Square Root (mySqrt) ---

    /**
     * @brief Computes the integer square root of x, truncating decimals.
     * Implements "binary search on the answer".
     *
     * The search space for the square root of `x` is typically `[0, x]`.
     * We look for the largest `mid` such that `mid * mid <= x`.
     *
     * @param x The non-negative integer to find the square root of.
     * @return The integer part of the square root.
     *
     * @complexity
     *   Time: O(log X) - The search space is `[0, X]`, and it's halved in each step.
     *   Space: O(1) - Uses constant extra space.
     */
    long long mySqrt(int x) {
        if (x < 0) {
            // Or throw an exception for invalid input
            return -1; // As per problem statement, x is non-negative, but good to handle.
        }
        if (x == 0 || x == 1) {
            return x;
        }

        long long low = 1;
        long long high = x;
        long long ans = 0; // Stores the largest `mid` for which `mid*mid <= x`

        while (low <= high) {
            long long mid = low + (high - low) / 2;

            // Using `mid * mid` can overflow for large `mid`.
            // Check `mid <= x / mid` to prevent overflow,
            // or use `long long` for `mid` and `mid * mid`.
            // Here, we use `long long` for `mid` to be safe.
            if (mid <= x / mid) { // Check if mid*mid <= x without overflow
                ans = mid;         // mid is a potential answer (or too small), store it
                low = mid + 1;     // Try a larger mid in the right half
            } else {
                high = mid - 1;    // mid*mid is too large, try a smaller mid in the left half
            }
        }

        return ans;
    }

    // --- Problem 5: Kth Smallest Element in Two Sorted Arrays ---

    /**
     * @brief Finds the k-th smallest element (1-indexed) in two sorted arrays.
     * This is an advanced binary search problem, often seen as a generalized
     * "Median of Two Sorted Arrays". It uses a partition-based binary search.
     *
     * @param nums1 The first sorted vector.
     * @param nums2 The second sorted vector.
     * @param k The desired k-th smallest element (1-indexed).
     * @return The k-th smallest element.
     *
     * @complexity
     *   Time: O(log(min(m, n))) - Where m and n are the sizes of nums1 and nums2.
     *                             The binary search is performed on the smaller array's partition space.
     *   Space: O(1) - Uses constant extra space.
     *
     * @notes
     *   Assumes k is valid: 1 <= k <= nums1.size() + nums2.size().
     *   Handles cases where one array is empty by effectively searching in the other.
     *   Uses INT_MIN/INT_MAX to handle edge cases of partitions being at the start/end of arrays.
     */
    int findKthSmallestInTwoSortedArrays(const std::vector<int>& nums1, const std::vector<int>& nums2, int k) {
        int m = nums1.size();
        int n = nums2.size();

        // Ensure nums1 is the smaller array to optimize binary search range
        // If m > n, swap (nums1, nums2) and (m, n) conceptually without copying
        if (m > n) {
            return findKthSmallestInTwoSortedArrays(nums2, nums1, k);
        }

        // Binary search on the number of elements to take from nums1 (partitionX)
        // partitionX can range from max(0, k-n) to min(k, m)
        // max(0, k-n) ensures we take enough elements if nums2 is too small for k
        // min(k, m) ensures we don't take more than k elements total or more than m elements from nums1
        int low = std::max(0, k - n);
        int high = std::min(k, m);

        while (low <= high) {
            int partitionX = low + (high - low) / 2; // Number of elements from nums1
            int partitionY = k - partitionX;         // Number of elements from nums2

            // Handle edge cases where partitions are at the start/end of arrays
            // If partition is 0, maxLeft is effectively -infinity
            // If partition is size, minRight is effectively +infinity
            int maxLeftX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
            int minRightX = (partitionX == m) ? INT_MAX : nums1[partitionX];

            int maxLeftY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
            int minRightY = (partitionY == n) ? INT_MAX : nums2[partitionY];

            // Check if partition is valid
            // Conditions for a valid partition:
            // 1. All elements in the left partition of X <= all elements in the right partition of Y
            // 2. All elements in the left partition of Y <= all elements in the right partition of X
            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                // Found the correct partition
                // The k-th smallest element is the maximum of the elements in the left partitions
                return std::max(maxLeftX, maxLeftY);
            } else if (maxLeftX > minRightY) {
                // We have taken too many elements from nums1
                // maxLeftX is too large, need to reduce partitionX
                high = partitionX - 1;
            } else { // maxLeftY > minRightX
                // We have taken too few elements from nums1
                // maxLeftY is too large, need to increase partitionX
                low = partitionX + 1;
            }
        }

        // This line should ideally not be reached if k is always valid
        // and arrays are sorted. It indicates an error or invalid input.
        return -1;
    }

} // namespace BinarySearch
---