```java
package com.example.binarysearch;

import java.util.Arrays;

/**
 * This class provides optimal Binary Search implementations for various problems.
 * Each method includes detailed comments, time and space complexity analysis.
 */
public class BinarySearchAlgorithms {

    /**
     * Problem 1: Standard Binary Search
     * Find the index of a target value in a sorted array.
     *
     * @param nums   The sorted array to search in.
     * @param target The value to search for.
     * @return The index of the target if found, otherwise -1.
     *
     * Approach 1: Iterative Binary Search (Preferred for interviews due to no recursion overhead)
     * Time Complexity: O(log N) - In each step, the search space is halved.
     * Space Complexity: O(1) - Only a few variables are used.
     */
    public int findTarget(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return -1;
        }

        int low = 0;
        int high = nums.length - 1;

        // Loop until the search space is valid (low <= high)
        // If low > high, it means the target is not in the array
        while (low <= high) {
            // Calculate mid-point to prevent potential integer overflow
            // Equivalent to (low + high) / 2 but safer for very large low/high values
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid; // Target found
            } else if (nums[mid] < target) {
                // Target is in the right half, so discard the left half
                // and the current mid (since nums[mid] is too small)
                low = mid + 1;
            } else { // nums[mid] > target
                // Target is in the left half, so discard the right half
                // and the current mid (since nums[mid] is too large)
                high = mid - 1;
            }
        }
        return -1; // Target not found in the array
    }

    /**
     * Problem 2: Find First and Last Position of Element in Sorted Array
     * Given a sorted array with potentially duplicate elements, find the starting and ending
     * position of a given target value. If the target is not found, return [-1, -1].
     *
     * @param nums   The sorted array.
     * @param target The value to search for.
     * @return An array of two integers representing the start and end index, or [-1, -1] if not found.
     *
     * Approach: Two separate binary searches.
     * One to find the first occurrence (lower bound).
     * Another to find the last occurrence (upper bound).
     *
     * Time Complexity: O(log N) - Each search takes logarithmic time.
     * Space Complexity: O(1)
     */
    public int[] findFirstAndLastOccurrence(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return new int[]{-1, -1};
        }

        int first = findFirst(nums, target);
        if (first == -1) { // If first occurrence is not found, target is not in array
            return new int[]{-1, -1};
        }
        int last = findLast(nums, target);

        return new int[]{first, last};
    }

    /**
     * Helper method to find the first occurrence of the target.
     * This is a "lower bound" binary search.
     *
     * @param nums   The sorted array.
     * @param target The value to search for.
     * @return The index of the first occurrence, or -1 if not found.
     */
    private int findFirst(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        int firstOccurrence = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                firstOccurrence = mid; // Potential first occurrence, try to find an earlier one
                high = mid - 1;        // Search in the left half
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else { // nums[mid] > target
                high = mid - 1;
            }
        }
        return firstOccurrence;
    }

    /**
     * Helper method to find the last occurrence of the target.
     * This is an "upper bound" binary search.
     *
     * @param nums   The sorted array.
     * @param target The value to search for.
     * @return The index of the last occurrence, or -1 if not found.
     */
    private int findLast(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        int lastOccurrence = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                lastOccurrence = mid; // Potential last occurrence, try to find a later one
                low = mid + 1;        // Search in the right half
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else { // nums[mid] > target
                high = mid - 1;
            }
        }
        return lastOccurrence;
    }


    /**
     * Problem 3: Search in Rotated Sorted Array
     * Given a sorted array that has been rotated at some pivot unknown to you beforehand.
     * (e.g., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).
     * Find the index of the target value. If the target is not found, return -1.
     * There are no duplicate elements in the array.
     *
     * @param nums   The rotated sorted array.
     * @param target The value to search for.
     * @return The index of the target, or -1 if not found.
     *
     * Approach: Modified Binary Search.
     * The key is to identify which half of the array is sorted and if the target lies within that sorted half.
     *
     * Time Complexity: O(log N) - Search space is halved in each step.
     * Space Complexity: O(1)
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
                return mid; // Target found
            }

            // Determine which part is sorted (left half or right half)
            if (nums[low] <= nums[mid]) {
                // The left half is sorted (nums[low] to nums[mid])
                // Check if target lies within this sorted left half
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1; // Target is in the left half
                } else {
                    low = mid + 1; // Target is in the right (unsorted or sorted) half
                }
            } else {
                // The right half is sorted (nums[mid] to nums[high])
                // Check if target lies within this sorted right half
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1; // Target is in the right half
                } else {
                    high = mid - 1; // Target is in the left (unsorted or sorted) half
                }
            }
        }
        return -1; // Target not found
    }

    /**
     * Problem 4: Find Peak Element
     * A peak element is an element that is strictly greater than its neighbors.
     * Given a 0-indexed integer array nums, find a peak element, and return its index.
     * If the array contains multiple peaks, return the index to any of the peaks.
     * You may imagine that nums[-1] = nums[n] = -∞.
     *
     * @param nums The integer array.
     * @return The index of any peak element.
     *
     * Approach: Modified Binary Search.
     * If nums[mid] is greater than its right neighbor, it means a peak is either at mid
     * or to its left (because the values are decreasing towards the right). So, we search in the left half.
     * If nums[mid] is less than its right neighbor, it means the values are increasing
     * towards the right, so a peak must be to the right.
     *
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     */
    public int findPeakElement(int[] nums) {
        if (nums == null || nums.length == 0) {
            return -1; // Or throw IllegalArgumentException depending on requirements
        }
        if (nums.length == 1) {
            return 0; // Single element is always a peak
        }

        int low = 0;
        int high = nums.length - 1;

        while (low < high) { // Use low < high to avoid infinite loop when low = mid, high = mid+1
            int mid = low + (high - low) / 2;

            // Compare mid with its right neighbor
            if (nums[mid] > nums[mid + 1]) {
                // We are on a decreasing slope or at a peak.
                // The peak could be at 'mid' or to its left.
                // Discard right half including mid+1.
                high = mid;
            } else {
                // nums[mid] < nums[mid + 1]
                // We are on an increasing slope.
                // The peak must be to the right of mid.
                // Discard left half including mid.
                low = mid + 1;
            }
        }
        // When low == high, this is a peak element
        return low;
    }

    /**
     * Problem 5: Sqrt(x)
     * Compute and return the integer square root of x.
     * The fractional part is truncated, and the only integer part is returned.
     *
     * @param x The non-negative integer for which to compute the square root.
     * @return The integer square root of x.
     *
     * Approach: Binary Search on the answer space.
     * The square root of x will lie in the range [0, x].
     * Specifically, it's in [0, x/2 + 1] or [0, x] for x=0, 1.
     * A tighter bound is [0, x] for x=0, 1 and [1, x/2] for x > 1.
     * We search for a number `mid` such that `mid * mid <= x` and `(mid + 1) * (mid + 1) > x`.
     * Using long for `mid * mid` to prevent overflow for large `x`.
     *
     * Time Complexity: O(log N) where N is the value of x.
     * Space Complexity: O(1)
     */
    public int mySqrt(int x) {
        if (x < 0) {
            throw new IllegalArgumentException("Input must be non-negative.");
        }
        if (x == 0 || x == 1) {
            return x;
        }

        int low = 1; // Square root of x >= 1 can't be 0 (unless x=0)
        int high = x; // The square root cannot exceed x itself. A tighter upper bound could be x/2, but x is fine.
        int ans = 0;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            // Use long to prevent overflow when calculating mid*mid, as mid can be up to x/2
            long midSquared = (long) mid * mid;

            if (midSquared == x) {
                return mid; // Exact square root found
            } else if (midSquared < x) {
                // mid is too small, or it could be the answer if mid+1 is too large.
                // Store mid as a potential answer and try for a larger one.
                ans = mid;
                low = mid + 1;
            } else { // midSquared > x
                // mid is too large, search in the left half.
                high = mid - 1;
            }
        }
        return ans; // 'ans' will hold the largest integer whose square is less than or equal to x.
    }
}
```