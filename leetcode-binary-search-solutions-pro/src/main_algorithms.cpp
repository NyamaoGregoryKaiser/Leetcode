```cpp
#include "main_algorithms.h"
#include <algorithm> // For std::max, std::min

namespace BinarySearch {

    // Problem 1: Standard Binary Search
    // Time Complexity: O(log N) - Each step halves the search space.
    // Space Complexity: O(1) - Uses a constant amount of extra space.
    std::optional<int> iterativeBinarySearch(const std::vector<int>& nums, int target) {
        int low = 0;
        int high = static_cast<int>(nums.size()) - 1;

        while (low <= high) {
            // Prevent potential integer overflow:
            // mid = low + (high - low) / 2 is safer than (low + high) / 2
            // especially when low and high are large positive integers.
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid; // Target found
            } else if (nums[mid] < target) {
                low = mid + 1; // Target is in the right half
            } else {
                high = mid - 1; // Target is in the left half
            }
        }
        return {}; // Target not found
    }

    // Helper function for recursiveBinarySearch
    // Time Complexity: O(log N) - Each recursive call halves the search space.
    // Space Complexity: O(log N) - Due to recursive call stack.
    std::optional<int> recursiveBinarySearchHelper(const std::vector<int>& nums, int target, int low, int high) {
        if (low > high) {
            return {}; // Base case: search space is empty, target not found
        }

        int mid = low + (high - low) / 2;

        if (nums[mid] == target) {
            return mid; // Target found
        } else if (nums[mid] < target) {
            return recursiveBinarySearchHelper(nums, target, mid + 1, high); // Search in right half
        } else {
            return recursiveBinarySearchHelper(nums, target, low, mid - 1); // Search in left half
        }
    }

    // Public interface for recursiveBinarySearch
    std::optional<int> recursiveBinarySearch(const std::vector<int>& nums, int target) {
        return recursiveBinarySearchHelper(nums, target, 0, static_cast<int>(nums.size()) - 1);
    }


    // Problem 2: Find First and Last Occurrence of an Element
    // Time Complexity: O(log N) - Each function performs a binary search.
    // Space Complexity: O(1) - Uses a constant amount of extra space.

    // Finds the index of the first occurrence of the target.
    // If target is not found, returns std::nullopt.
    std::optional<int> findFirstOccurrence(const std::vector<int>& nums, int target) {
        int low = 0;
        int high = static_cast<int>(nums.size()) - 1;
        std::optional<int> first_idx;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                first_idx = mid;     // Potential first occurrence
                high = mid - 1;      // Try to find an even earlier occurrence in the left half
            } else if (nums[mid] < target) {
                low = mid + 1;       // Target is in the right half
            } else {
                high = mid - 1;      // Target is in the left half
            }
        }
        return first_idx;
    }

    // Finds the index of the last occurrence of the target.
    // If target is not found, returns std::nullopt.
    std::optional<int> findLastOccurrence(const std::vector<int>& nums, int target) {
        int low = 0;
        int high = static_cast<int>(nums.size()) - 1;
        std::optional<int> last_idx;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                last_idx = mid;      // Potential last occurrence
                low = mid + 1;       // Try to find an even later occurrence in the right half
            } else if (nums[mid] < target) {
                low = mid + 1;       // Target is in the right half
            } else {
                high = mid - 1;      // Target is in the left half
            }
        }
        return last_idx;
    }

    // Combines findFirstOccurrence and findLastOccurrence.
    std::pair<std::optional<int>, std::optional<int>> findFirstAndLastOccurrence(const std::vector<int>& nums, int target) {
        std::optional<int> first = findFirstOccurrence(nums, target);
        if (!first) { // If first occurrence is not found, target is not in the array at all.
            return {std::nullopt, std::nullopt};
        }
        std::optional<int> last = findLastOccurrence(nums, target);
        return {first, last};
    }


    // Problem 3: Search in Rotated Sorted Array
    // Time Complexity: O(log N) - Each step halves the search space.
    // Space Complexity: O(1) - Uses a constant amount of extra space.
    std::optional<int> searchInRotatedSortedArray(const std::vector<int>& nums, int target) {
        if (nums.empty()) {
            return {};
        }

        int low = 0;
        int high = static_cast<int>(nums.size()) - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid; // Target found
            }

            // Determine which half is sorted
            if (nums[low] <= nums[mid]) { // Left half is sorted
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1; // Target is in the sorted left half
                } else {
                    low = mid + 1; // Target is in the unsorted right half
                }
            } else { // Right half is sorted
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1; // Target is in the sorted right half
                } else {
                    high = mid - 1; // Target is in the unsorted left half
                }
            }
        }
        return {}; // Target not found
    }


    // Problem 4: Find Peak Element
    // Time Complexity: O(log N) - Each step halves the search space.
    // Space Complexity: O(1) - Uses a constant amount of extra space.
    std::optional<int> findPeakElement(const std::vector<int>& nums) {
        if (nums.empty()) {
            return {};
        }
        if (nums.size() == 1) {
            return 0; // Single element is always a peak
        }

        int low = 0;
        int high = static_cast<int>(nums.size()) - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Handle edge cases for mid
            // Check if mid is a peak:
            // - If mid is at the beginning (0), check only right neighbor.
            // - If mid is at the end (size-1), check only left neighbor.
            // - Otherwise, check both neighbors.

            bool is_left_smaller = (mid == 0 || nums[mid] > nums[mid - 1]);
            bool is_right_smaller = (mid == static_cast<int>(nums.size()) - 1 || nums[mid] > nums[mid + 1]);

            if (is_left_smaller && is_right_smaller) {
                return mid; // nums[mid] is a peak
            } else if (!is_left_smaller) {
                // nums[mid-1] > nums[mid], so peak must be in the left subarray
                high = mid - 1;
            } else { // !is_right_smaller (i.e., nums[mid+1] > nums[mid])
                // Peak must be in the right subarray, or nums[mid+1] itself is a peak candidate
                low = mid + 1;
            }
        }
        return {}; // Should not reach here for valid inputs according to problem statement (always a peak exists)
                   // But added for completeness or if problem constraints change.
    }


    // Problem 5: Sqrt(x) - Integer Square Root
    // Time Complexity: O(log X) - Binary search operates on the range [0, X].
    // Space Complexity: O(1) - Uses a constant amount of extra space.
    int mySqrt(int x) {
        if (x < 0) {
            throw std::invalid_argument("Input must be a non-negative integer.");
        }
        if (x == 0 || x == 1) {
            return x;
        }

        long long low = 1; // We start from 1 since 0 and 1 are handled.
        long long high = x; // The maximum possible square root is x itself (for x=1). For x > 1, max is x/2.
                           // Using x as high is safe, though x/2 is a tighter bound for x > 1.
        long long ans = 1; // To store the best candidate for square root.

        while (low <= high) {
            long long mid = low + (high - low) / 2;
            long long square = mid * mid; // Use long long to prevent overflow for mid*mid

            if (square == x) {
                return static_cast<int>(mid); // Exact square root found
            } else if (square < x) {
                ans = mid;         // mid is a potential answer, try larger values
                low = mid + 1;
            } else { // square > x
                high = mid - 1;    // mid is too large, try smaller values
            }
        }
        return static_cast<int>(ans); // Return the largest integer whose square is less than or equal to x
    }

} // namespace BinarySearch
```