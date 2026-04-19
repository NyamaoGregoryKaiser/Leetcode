```java
package com.example.binarysearch.problems;

/**
 * This class contains implementations for various advanced problems that can be solved
 * using variations of the binary search algorithm.
 */
public class BinarySearchAdvancedProblems {

    /**
     * Problem 1: Find First Occurrence (Lower Bound)
     * Finds the index of the first occurrence of a target value in a sorted array.
     * If the target is not found, returns -1. If multiple occurrences, returns the smallest index.
     *
     * @param arr The sorted array.
     * @param target The value to search for.
     * @return The index of the first occurrence of the target, or -1 if not found.
     *
     * Time Complexity: O(log N)
     *   - Similar to standard binary search, search space is halved in each step.
     * Space Complexity: O(1)
     *   - Uses a constant amount of extra space.
     */
    public int findFirstOccurrence(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int low = 0;
        int high = arr.length - 1;
        int firstOccurrenceIndex = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                // Found a potential first occurrence. Store it and try to find an even earlier one
                // by searching in the left half.
                firstOccurrenceIndex = mid;
                high = mid - 1; // Search left
            } else if (arr[mid] < target) {
                // Target is in the right half.
                low = mid + 1;
            } else { // arr[mid] > target
                // Target is in the left half.
                high = mid - 1;
            }
        }
        return firstOccurrenceIndex;
    }

    /**
     * Problem 2: Find Last Occurrence (Upper Bound)
     * Finds the index of the last occurrence of a target value in a sorted array.
     * If the target is not found, returns -1. If multiple occurrences, returns the largest index.
     *
     * @param arr The sorted array.
     * @param target The value to search for.
     * @return The index of the last occurrence of the target, or -1 if not found.
     *
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     */
    public int findLastOccurrence(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int low = 0;
        int high = arr.length - 1;
        int lastOccurrenceIndex = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                // Found a potential last occurrence. Store it and try to find an even later one
                // by searching in the right half.
                lastOccurrenceIndex = mid;
                low = mid + 1; // Search right
            } else if (arr[mid] < target) {
                // Target is in the right half.
                low = mid + 1;
            } else { // arr[mid] > target
                // Target is in the left half.
                high = mid - 1;
            }
        }
        return lastOccurrenceIndex;
    }

    /**
     * Problem 3: Search in Rotated Sorted Array
     * Searches for a target value in a sorted array that has been rotated at an unknown pivot.
     * Example: [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2].
     *
     * @param arr The rotated sorted array.
     * @param target The value to search for.
     * @return The index of the target value if found, otherwise -1.
     *
     * Time Complexity: O(log N)
     *   - In each iteration, we determine which half is sorted and whether the target
     *     lies in that sorted half or the unsorted half. We then reduce the search space.
     * Space Complexity: O(1)
     *   - Constant extra space for pointers.
     */
    public int searchInRotatedSortedArray(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                return mid;
            }

            // Determine which half is sorted
            if (arr[low] <= arr[mid]) { // Left half is sorted
                // Check if target is within the sorted left half
                if (target >= arr[low] && target < arr[mid]) {
                    high = mid - 1; // Search left
                } else {
                    low = mid + 1; // Search right
                }
            } else { // Right half is sorted (arr[mid] < arr[low])
                // Check if target is within the sorted right half
                if (target > arr[mid] && target <= arr[high]) {
                    low = mid + 1; // Search right
                } else {
                    high = mid - 1; // Search left
                }
            }
        }
        return -1;
    }

    /**
     * Problem 4: Find Minimum in Rotated Sorted Array
     * Finds the minimum element in a sorted array that has been rotated at an unknown pivot.
     * Assume no duplicate elements exist in the array.
     * Example: [3,4,5,1,2] -> 1
     *
     * @param arr The rotated sorted array.
     * @return The minimum element in the array.
     *
     * Time Complexity: O(log N)
     *   - Each step reduces the search space, focusing on the unsorted part where the minimum must lie.
     * Space Complexity: O(1)
     *   - Constant extra space.
     */
    public int findMinInRotatedSortedArray(int[] arr) {
        if (arr == null || arr.length == 0) {
            throw new IllegalArgumentException("Array cannot be null or empty.");
        }
        // If the array is not rotated or has only one element, the first element is the minimum.
        if (arr.length == 1 || arr[0] <= arr[arr.length - 1]) {
            return arr[0];
        }

        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Case 1: mid element is greater than its next element means mid+1 is the smallest.
            // This is the pivot point.
            if (mid < arr.length - 1 && arr[mid] > arr[mid + 1]) {
                return arr[mid + 1];
            }
            // Case 2: mid element is smaller than its previous element means mid is the smallest.
            // This is the pivot point.
            if (mid > 0 && arr[mid - 1] > arr[mid]) {
                return arr[mid];
            }

            // If left half is sorted (arr[low] <= arr[mid]), then the pivot must be in the right half.
            if (arr[low] <= arr[mid]) {
                low = mid + 1;
            }
            // If right half is sorted (arr[mid] <= arr[high]), then the pivot must be in the left half.
            // Note: This condition will also cover the case where arr[mid] > arr[high] but arr[mid] < arr[low]
            // which implies the minimum is on the left.
            else { // arr[mid] < arr[low] and right half is potentially unsorted
                high = mid - 1;
            }
        }
        // This line should ideally not be reached if the array is guaranteed to be rotated sorted
        // and contains at least one element. But for compilation, a return is needed.
        // The first 'if' condition (arr[0] <= arr[arr.length - 1]) covers the non-rotated case.
        return -1; // Should not happen for valid input.
    }

    /**
     * Problem 5: Find Square Root of X (Integer)
     * Computes and returns the square root of x.
     * Since the return type is an integer, the decimal digits are truncated.
     * The result is non-negative.
     *
     * @param x The non-negative integer for which to find the square root.
     * @return The integer part of the square root of x.
     *
     * Time Complexity: O(log X)
     *   - The search space for the square root is from 0 to X.
     *   - Binary search reduces this space logarithmically.
     * Space Complexity: O(1)
     *   - Constant extra space.
     */
    public int mySqrt(int x) {
        if (x < 0) {
            throw new IllegalArgumentException("Input must be a non-negative integer.");
        }
        if (x == 0 || x == 1) {
            return x;
        }

        long low = 1; // Using long for low/high to prevent overflow when calculating mid*mid
        long high = x;
        long ans = 0;

        while (low <= high) {
            long mid = low + (high - low) / 2;
            long square = mid * mid; // Potential overflow if mid is int and mid*mid > Integer.MAX_VALUE

            if (square == x) {
                return (int) mid;
            } else if (square < x) {
                // mid could be the answer, or a larger number could be the answer.
                // We keep track of mid and search in the right half.
                ans = mid; // Store mid as a potential answer (current largest integer whose square <= x)
                low = mid + 1;
            } else { // square > x
                // mid is too large, search in the left half.
                high = mid - 1;
            }
        }
        return (int) ans;
    }

    /**
     * Problem 6: Find Peak Element
     * A peak element is an element that is strictly greater than its neighbors.
     * Given a 0-indexed integer array `nums`, find a peak element, and return its index.
     * If the array contains multiple peaks, return the index to any of the peaks.
     * Assume `nums[-1] = nums[n] = -inf`. This implies that elements at the ends can be peaks.
     *
     * @param nums The integer array.
     * @return The index of any peak element.
     *
     * Time Complexity: O(log N)
     *   - Each step reduces the search space by half.
     * Space Complexity: O(1)
     *   - Constant extra space.
     */
    public int findPeakElement(int[] nums) {
        if (nums == null || nums.length == 0) {
            return -1; // Or throw IllegalArgumentException
        }
        if (nums.length == 1) {
            return 0; // The single element is a peak by definition
        }

        int low = 0;
        int high = nums.length - 1;

        while (low < high) { // Use low < high to avoid infinite loop when low = high-1
            int mid = low + (high - low) / 2;

            // Compare mid with its right neighbor
            if (nums[mid] < nums[mid + 1]) {
                // We are on an ascending slope. A peak MUST exist on the right side (including mid+1).
                // nums[mid+1] could be the peak, or there's a peak further right.
                low = mid + 1;
            } else { // nums[mid] > nums[mid + 1]
                // We are on a descending slope or at a peak.
                // mid could be the peak, or a peak exists on the left side.
                // It's safe to discard the right side (mid+1 and beyond)
                // because mid is greater than mid+1, so mid+1 cannot be a peak unless it's the last element.
                // Since nums[mid] > nums[mid+1], if mid is not the peak, the peak must be to its left.
                high = mid; // Don't do mid - 1, because mid itself could be the peak
            }
        }
        // When low == high, we have found a peak element.
        return low;
    }
}
```