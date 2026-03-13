package com.example.binarysearch;

/**
 * This class provides implementations for various Binary Search problems.
 * Each method includes detailed comments, time/space complexity analysis,
 * and handles common edge cases.
 */
public class BinarySearchProblems {

    /**
     * Problem 1: Standard Binary Search
     * Finds the index of a target element in a sorted array.
     *
     * @param arr    The sorted array to search in.
     * @param target The element to find.
     * @return The index of the target if found, otherwise -1.
     *
     * Time Complexity: O(log N) - In each step, the search space is halved.
     * Space Complexity: O(1) - Only a few constant space variables are used.
     *
     * Approach:
     * - Initialize 'low' to 0 and 'high' to arr.length - 1.
     * - While 'low' is less than or equal to 'high':
     *   - Calculate 'mid' as low + (high - low) / 2 to prevent overflow.
     *   - If arr[mid] equals target, return 'mid'.
     *   - If arr[mid] is less than target, the target must be in the right half, so set low = mid + 1.
     *   - If arr[mid] is greater than target, the target must be in the left half, so set high = mid - 1.
     * - If the loop finishes without finding the target, return -1.
     */
    public int search(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2; // Prevents potential integer overflow for very large low/high

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1; // Target is in the right half
            } else {
                high = mid - 1; // Target is in the left half
            }
        }

        // Target not found
        return -1;
    }

    /**
     * Problem 2: Find First/Last Occurrence of Target
     * Finds the index of the first occurrence of a target element in a sorted array that may contain duplicates.
     *
     * @param arr    The sorted array to search in.
     * @param target The element to find the first occurrence of.
     * @return The index of the first occurrence of the target if found, otherwise -1.
     *
     * Time Complexity: O(log N) - Standard binary search behavior.
     * Space Complexity: O(1) - Constant extra space.
     *
     * Approach:
     * - Standard binary search setup.
     * - When arr[mid] == target:
     *   - Store 'mid' as a potential result.
     *   - To find the *first* occurrence, continue searching in the left half (high = mid - 1) to see if an earlier occurrence exists.
     * - If arr[mid] < target, search right (low = mid + 1).
     * - If arr[mid] > target, search left (high = mid - 1).
     * - Return the stored potential result (initialized to -1).
     */
    public int findFirstOccurrence(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int low = 0;
        int high = arr.length - 1;
        int firstOccurrence = -1; // Stores the potential first occurrence

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                firstOccurrence = mid; // Found a target, record it
                high = mid - 1;        // Try to find an earlier occurrence in the left half
            } else if (arr[mid] < target) {
                low = mid + 1;         // Target is in the right half
            } else {
                high = mid - 1;        // Target is in the left half
            }
        }
        return firstOccurrence;
    }

    /**
     * Problem 2 (Variation): Find Last Occurrence of Target
     * Finds the index of the last occurrence of a target element in a sorted array that may contain duplicates.
     *
     * @param arr    The sorted array to search in.
     * @param target The element to find the last occurrence of.
     * @return The index of the last occurrence of the target if found, otherwise -1.
     *
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     *
     * Approach: Similar to findFirstOccurrence, but when arr[mid] == target,
     * we search in the *right* half (low = mid + 1) to find a later occurrence.
     */
    public int findLastOccurrence(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int low = 0;
        int high = arr.length - 1;
        int lastOccurrence = -1; // Stores the potential last occurrence

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                lastOccurrence = mid; // Found a target, record it
                low = mid + 1;        // Try to find a later occurrence in the right half
            } else if (arr[mid] < target) {
                low = mid + 1;        // Target is in the right half
            } else {
                high = mid - 1;       // Target is in the left half
            }
        }
        return lastOccurrence;
    }

    /**
     * Problem 3: Search in Rotated Sorted Array
     * Searches for a target element in a sorted array that has been rotated at some pivot.
     * Example: [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2].
     * There are no duplicate elements in the array.
     *
     * @param nums   The rotated sorted array.
     * @param target The element to find.
     * @return The index of the target if found, otherwise -1.
     *
     * Time Complexity: O(log N) - Each step halves the search space.
     * Space Complexity: O(1) - Constant extra space.
     *
     * Approach:
     * - The key is to identify which half of the array (left or right of mid) is sorted.
     * - Initialize low = 0, high = nums.length - 1.
     * - While low <= high:
     *   - Calculate mid.
     *   - If nums[mid] == target, return mid.
     *   - Check if the left half (nums[low] to nums[mid]) is sorted:
     *     - If nums[low] <= nums[mid]:
     *       - If target is within the range of the left sorted half (nums[low] <= target < nums[mid]),
     *         then search left (high = mid - 1).
     *       - Else, target must be in the right (unsorted or sorted but not in range) half, so search right (low = mid + 1).
     *   - Else, the right half (nums[mid] to nums[high]) must be sorted:
     *     - If target is within the range of the right sorted half (nums[mid] < target <= nums[high]),
     *       then search right (low = mid + 1).
     *     - Else, target must be in the left (unsorted or sorted but not in range) half, so search left (high = mid - 1).
     * - If loop finishes, target not found, return -1.
     */
    public int searchInRotatedSortedArray(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return -1;
        }

        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            // Check if the left half is sorted (nums[low] to nums[mid])
            if (nums[low] <= nums[mid]) {
                // If the target is within the sorted left half's range
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1; // Search in the left sorted half
                } else {
                    low = mid + 1;  // Target is in the right (possibly unsorted) half
                }
            }
            // Else, the right half must be sorted (nums[mid] to nums[high])
            else {
                // If the target is within the sorted right half's range
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1;  // Search in the right sorted half
                } else {
                    high = mid - 1; // Target is in the left (possibly unsorted) half
                }
            }
        }
        return -1; // Target not found
    }

    /**
     * Problem 4: Find Peak Element
     * A peak element is an element that is strictly greater than its neighbors.
     * Given a 0-indexed integer array `nums`, where `nums[i] != nums[i+1]` for all valid `i`.
     * You may imagine that `nums[-1] = nums[n] = -∞`.
     * Your algorithm should run in O(log N) time.
     *
     * @param nums The array of integers.
     * @return The index of any peak element.
     *
     * Time Complexity: O(log N) - Each iteration halves the search space.
     * Space Complexity: O(1) - Constant extra space.
     *
     * Approach:
     * - The problem guarantees `nums[i] != nums[i+1]`, which means there are no plateaus.
     * - We can use binary search on the properties of the array.
     * - Initialize low = 0, high = nums.length - 1.
     * - While low < high (because when low == high, we have found a peak):
     *   - Calculate mid.
     *   - If `nums[mid] < nums[mid + 1]`:
     *     - This means we are on an ascending slope (or the peak is to the right).
     *     - A peak *must* exist to the right of `mid` (including `mid + 1`).
     *     - So, `low = mid + 1`.
     *   - Else (`nums[mid] > nums[mid + 1]`):
     *     - This means we are on a descending slope (or `mid` itself is a peak, or the peak is to the left).
     *     - A peak *must* exist at or to the left of `mid`.
     *     - So, `high = mid`.
     * - When the loop terminates, `low` will be equal to `high`, and that index will be a peak element.
     */
    public int findPeakElement(int[] nums) {
        if (nums == null || nums.length == 0) {
            // According to problem constraints, nums has at least one element.
            // For robustness, returning -1 or throwing an exception would be appropriate
            // if an empty array was possible. Let's assume non-empty as per LC constraints.
            throw new IllegalArgumentException("Input array cannot be null or empty.");
        }
        if (nums.length == 1) {
            return 0; // A single element array has its only element as a peak.
        }

        int low = 0;
        int high = nums.length - 1;

        while (low < high) { // Loop until low and high converge to a single element
            int mid = low + (high - low) / 2;

            // Compare mid with its right neighbor.
            // We don't need to check left neighbor explicitly because the logic ensures
            // that if nums[mid] < nums[mid+1], then there must be a peak to the right (mid+1 or further).
            // If nums[mid] > nums[mid+1], then mid could be a peak, or a peak is to its left.
            if (nums[mid] < nums[mid + 1]) {
                // Mid is on an ascending slope, a peak must be to the right
                low = mid + 1;
            } else {
                // Mid is on a descending slope or is a peak itself.
                // A peak must be at or to the left of mid.
                high = mid;
            }
        }

        // When low == high, we have found an index that is guaranteed to be a peak.
        // This is because if low moves to mid+1, it means nums[mid] was less than nums[mid+1],
        // so we move right to find an ascent.
        // If high moves to mid, it means nums[mid] was greater than or equal to nums[mid+1],
        // so mid is a potential peak, or an earlier element is.
        // The loop invariants ensure that a peak is always within [low, high].
        return low;
    }

    /**
     * Problem 5: Sqrt(x) - Integer Square Root
     * Computes and returns the integer square root of x.
     * The returned integer part is truncated.
     *
     * @param x The non-negative integer.
     * @return The integer square root of x.
     *
     * Time Complexity: O(log X) - The search space is from 0 to X (or X/2).
     * Space Complexity: O(1) - Constant extra space.
     *
     * Approach:
     * - The square root of x lies in the range [0, x].
     *   (More precisely, [0, x/2 + 1] for x > 1, but [0, x] simplifies bounds)
     * - We can binary search for the largest integer 'ans' such that 'ans * ans <= x'.
     * - Initialize low = 0, high = x.
     * - While low <= high:
     *   - Calculate mid.
     *   - Calculate `square = mid * mid`. Be careful about integer overflow if `mid` is large.
     *     Use `long` for `square` calculation to avoid overflow, especially for `x` close to `Integer.MAX_VALUE`.
     *   - If `square == x`, return `mid`.
     *   - If `square < x`:
     *     - `mid` could be the answer, or a larger number could be the answer.
     *     - Store `mid` as a potential answer (`ans = mid`).
     *     - Search in the right half for a larger `mid` (low = mid + 1).
     *   - If `square > x`:
     *     - `mid` is too large. Search in the left half (high = mid - 1).
     * - Return the last recorded `ans`.
     *
     * Brute Force Alternative:
     * A simple linear scan from 1 up to x/2, checking `i*i <= x`.
     * Time Complexity: O(sqrt(X)) which is worse than O(log X).
     */
    public int mySqrt(int x) {
        if (x < 0) {
            throw new IllegalArgumentException("Input cannot be negative for square root.");
        }
        if (x == 0 || x == 1) {
            return x;
        }

        int low = 1; // Square root of 0 is 0, of 1 is 1. Start from 1 for search.
        int high = x; // The square root cannot be greater than x itself (e.g., sqrt(4) = 2, sqrt(2) = 1)
        int ans = 0;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Use long to prevent overflow when mid * mid is calculated,
            // as mid can be up to Integer.MAX_VALUE / 2, and mid*mid can exceed Integer.MAX_VALUE.
            long square = (long) mid * mid;

            if (square == x) {
                return mid; // Found exact square root
            } else if (square < x) {
                // mid is a potential answer, but we try for a larger one in the right half
                ans = mid;
                low = mid + 1;
            } else {
                // mid is too large, search in the left half
                high = mid - 1;
            }
        }
        return ans; // 'ans' will hold the largest integer whose square is less than or equal to x
    }
}