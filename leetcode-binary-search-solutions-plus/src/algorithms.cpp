```cpp
#include "algorithms.h"
#include <cmath> // For std::ceil

namespace BinarySearch {

    // --- Problem 1: Standard Binary Search ---

    // Brute Force: Linear Search
    // Time: O(N), Space: O(1)
    int linearSearch(const std::vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }

    // Optimal Solution 1.1: Iterative Binary Search
    // Time: O(log N), Space: O(1)
    int standardBinarySearchIterative(const std::vector<int>& nums, int target) {
        if (nums.empty()) {
            return -1;
        }

        int low = 0;
        int high = nums.size() - 1;

        while (low <= high) {
            // Avoids potential overflow compared to (low + high) / 2
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid; // Target found
            } else if (nums[mid] < target) {
                low = mid + 1; // Target is in the right half
            } else { // nums[mid] > target
                high = mid - 1; // Target is in the left half
            }
        }
        return -1; // Target not found
    }

    // Optimal Solution 1.2: Recursive Binary Search Helper
    int _standardBinarySearchRecursiveHelper(const std::vector<int>& nums, int target, int low, int high) {
        if (low > high) {
            return -1; // Base case: Search space is empty
        }

        int mid = low + (high - low) / 2;

        if (nums[mid] == target) {
            return mid; // Target found
        } else if (nums[mid] < target) {
            return _standardBinarySearchRecursiveHelper(nums, target, mid + 1, high); // Search right
        } else { // nums[mid] > target
            return _standardBinarySearchRecursiveHelper(nums, target, low, mid - 1); // Search left
        }
    }

    // Optimal Solution 1.2: Recursive Binary Search (Public interface)
    // Time: O(log N), Space: O(log N) (due to recursion stack)
    int standardBinarySearchRecursive(const std::vector<int>& nums, int target) {
        if (nums.empty()) {
            return -1;
        }
        return _standardBinarySearchRecursiveHelper(nums, target, 0, nums.size() - 1);
    }


    // --- Problem 2: Find First and Last Occurrence of an Element ---

    // Helper to find the first occurrence of a target
    // Time: O(log N), Space: O(1)
    int findFirstOccurrence(const std::vector<int>& nums, int target) {
        int result = -1;
        int low = 0;
        int high = nums.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                result = mid;       // Potential first occurrence
                high = mid - 1;     // Try to find an even earlier occurrence in the left half
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else { // nums[mid] > target
                high = mid - 1;
            }
        }
        return result;
    }

    // Helper to find the last occurrence of a target
    // Time: O(log N), Space: O(1)
    int findLastOccurrence(const std::vector<int>& nums, int target) {
        int result = -1;
        int low = 0;
        int high = nums.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                result = mid;       // Potential last occurrence
                low = mid + 1;      // Try to find an even later occurrence in the right half
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else { // nums[mid] > target
                high = mid - 1;
            }
        }
        return result;
    }

    // Main function for Problem 2
    // Time: O(log N), Space: O(1)
    std::vector<int> findFirstAndLastOccurrence(const std::vector<int>& nums, int target) {
        int first = findFirstOccurrence(nums, target);
        int last = findLastOccurrence(nums, target);
        return {first, last};
    }


    // --- Problem 3: Search in Rotated Sorted Array ---

    // Time: O(log N), Space: O(1)
    int searchInRotatedSortedArray(const std::vector<int>& nums, int target) {
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

            // Determine which half is sorted
            if (nums[low] <= nums[mid]) { // Left half is sorted
                // Check if target lies in the sorted left half
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1; // Search in the left half
                } else {
                    low = mid + 1;  // Target is in the unsorted right half
                }
            } else { // Right half is sorted (nums[low] > nums[mid])
                // Check if target lies in the sorted right half
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1;  // Search in the right half
                } else {
                    high = mid - 1; // Target is in the unsorted left half
                }
            }
        }
        return -1; // Target not found
    }


    // --- Problem 4: Find Peak Element ---

    // Brute Force: Linear Scan
    // Time: O(N), Space: O(1)
    int findPeakElementLinear(const std::vector<int>& nums) {
        if (nums.empty()) return -1;
        if (nums.size() == 1) return 0; // Single element is a peak

        for (int i = 0; i < nums.size(); ++i) {
            bool left_smaller = (i == 0) || (nums[i] > nums[i-1]);
            bool right_smaller = (i == nums.size() - 1) || (nums[i] > nums[i+1]);
            if (left_smaller && right_smaller) {
                return i;
            }
        }
        return -1; // Should not happen for valid inputs (guaranteed peak)
    }

    // Optimal Solution: Binary Search
    // Time: O(log N), Space: O(1)
    int findPeakElement(const std::vector<int>& nums) {
        if (nums.empty()) {
            return -1;
        }
        // Imagining nums[-1] = nums[n] = -inf
        // So, if nums[mid] > nums[mid+1], then mid could be a peak, or peak is to its left.
        // If nums[mid] < nums[mid+1], then peak must be to the right of mid.

        int low = 0;
        int high = nums.size() - 1; // Using high as an inclusive upper bound

        while (low < high) { // Loop until low == high, which will be the peak index
            int mid = low + (high - low) / 2;

            if (nums[mid] < nums[mid + 1]) {
                // We are on an ascending slope, so a peak must be to the right of mid
                low = mid + 1;
            } else {
                // We are on a descending slope or at a peak.
                // A peak could be mid itself, or to its left.
                // So, we eliminate mid+1 and search in [low, mid]
                high = mid;
            }
        }
        return low; // low (or high) will be the index of a peak element
    }


    // --- Problem 5: Smallest Divisor Given a Threshold (Binary Search on Answer) ---

    // Helper function to check if a given divisor satisfies the threshold condition
    // Time: O(N)
    bool checkDivisor(const std::vector<int>& nums, int divisor, int threshold) {
        long long current_sum = 0;
        for (int num : nums) {
            // Equivalent to ceil(num / divisor)
            current_sum += (num + divisor - 1) / divisor;
            if (current_sum > threshold) { // Optimization: early exit if sum already exceeds
                return false;
            }
        }
        return current_sum <= threshold;
    }

    // Optimal Solution: Binary Search on the Answer Space
    // Time: O(N log(MaxDivisor)), Space: O(1)
    int smallestDivisor(const std::vector<int>& nums, int threshold) {
        if (nums.empty()) {
            return 1; // Or handle as error/specific requirement
        }

        // The possible range for the divisor is [1, max_element_in_nums]
        int low = 1;
        int high = *std::max_element(nums.begin(), nums.end()); // Find max element in nums

        int ans = high; // Initialize answer with a valid but potentially large divisor

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (mid == 0) { // Divisor cannot be zero, skip this case just in case
                low = 1;
                continue;
            }

            if (checkDivisor(nums, mid, threshold)) {
                // If mid is a valid divisor, it could be our answer.
                // Try to find an even smaller divisor in the left half.
                ans = mid;
                high = mid - 1;
            } else {
                // If mid is not a valid divisor, it's too small.
                // We need a larger divisor.
                low = mid + 1;
            }
        }
        return ans;
    }

} // namespace BinarySearch
```