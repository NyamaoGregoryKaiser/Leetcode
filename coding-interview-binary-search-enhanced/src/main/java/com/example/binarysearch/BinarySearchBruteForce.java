```java
package com.example.binarysearch;

import java.util.Arrays;

/**
 * This class provides brute-force (linear search) implementations for the same problems
 * as BinarySearchAlgorithms.java. This is mainly for performance comparison and
 * understanding the efficiency gains of binary search.
 */
public class BinarySearchBruteForce {

    /**
     * Brute-force for Problem 1: Standard Binary Search
     * Linearly search for the target value.
     *
     * @param nums The array to search in.
     * @param target The value to search for.
     * @return The index of the target if found, otherwise -1.
     *
     * Time Complexity: O(N) - In the worst case, we iterate through the entire array.
     * Space Complexity: O(1)
     */
    public int findTarget(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return -1;
        }

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                return i; // Target found
            }
        }
        return -1; // Target not found
    }

    /**
     * Brute-force for Problem 2: Find First and Last Position of Element in Sorted Array
     * Linearly scan the array to find the first and last occurrences.
     *
     * @param nums   The sorted array.
     * @param target The value to search for.
     * @return An array of two integers representing the start and end index, or [-1, -1] if not found.
     *
     * Time Complexity: O(N) - In the worst case, we might scan the entire array for duplicates.
     * Space Complexity: O(1)
     */
    public int[] findFirstAndLastOccurrence(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return new int[]{-1, -1};
        }

        int first = -1;
        int last = -1;

        // Find first occurrence
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                first = i;
                break; // Found the first, now look for the last
            }
        }

        if (first == -1) {
            return new int[]{-1, -1}; // Target not found at all
        }

        // Find last occurrence (starting from where we found the first, or from first+1)
        for (int i = first; i < nums.length; i++) {
            if (nums[i] == target) {
                last = i;
            } else if (nums[i] > target) {
                // Since the array is sorted, if we encounter a number greater than target,
                // there won't be any more targets further in the array.
                break;
            }
        }

        return new int[]{first, last};
    }

    /**
     * Brute-force for Problem 3: Search in Rotated Sorted Array
     * Linearly scan the array to find the target. The rotation doesn't change
     * the applicability of linear search, only binary search complexity.
     *
     * @param nums   The rotated sorted array.
     * @param target The value to search for.
     * @return The index of the target, or -1 if not found.
     *
     * Time Complexity: O(N)
     * Space Complexity: O(1)
     */
    public int searchInRotatedSortedArray(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return -1;
        }

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Brute-force for Problem 4: Find Peak Element
     * Iterate through the array and check each element if it's a peak.
     * An element is a peak if it's greater than its left and right neighbors.
     * For edge elements, imagine nums[-1] = nums[n] = -∞.
     *
     * @param nums The integer array.
     * @return The index of any peak element.
     *
     * Time Complexity: O(N)
     * Space Complexity: O(1)
     */
    public int findPeakElement(int[] nums) {
        if (nums == null || nums.length == 0) {
            return -1;
        }
        if (nums.length == 1) {
            return 0;
        }

        for (int i = 0; i < nums.length; i++) {
            boolean isLeftGreater = (i == 0) ? true : (nums[i] > nums[i - 1]);
            boolean isRightGreater = (i == nums.length - 1) ? true : (nums[i] > nums[i + 1]);

            if (isLeftGreater && isRightGreater) {
                return i;
            }
        }
        return -1; // Should not happen for arrays with at least one element (guaranteed by problem constraints)
    }

    /**
     * Brute-force for Problem 5: Sqrt(x)
     * Linearly iterate from 0 upwards and check if `i*i` is less than or equal to `x`.
     * The last `i` that satisfies this condition is the integer square root.
     *
     * @param x The non-negative integer for which to compute the square root.
     * @return The integer square root of x.
     *
     * Time Complexity: O(sqrt(x)) - We iterate up to the square root of x.
     * Space Complexity: O(1)
     */
    public int mySqrt(int x) {
        if (x < 0) {
            throw new IllegalArgumentException("Input must be non-negative.");
        }
        if (x == 0 || x == 1) {
            return x;
        }

        long ans = 1; // Start from 1 as 0 and 1 are handled
        while (ans * ans <= x) {
            // Check for overflow before incrementing ans and squaring again
            if (ans > Integer.MAX_VALUE / ans) { // If ans * ans would overflow an int, stop
                break; // This indicates ans * ans > x for current ans or current ans is too big for int
                       // If x itself is large, ans can be sqrt(MAX_INT) which is within int range.
                       // The check is to ensure (ans+1)*(ans+1) doesn't overflow.
                       // A better check would be: ans+1 > sqrt(MAX_INT)
            }
            ans++;
        }
        return (int) (ans - 1); // The loop stops when ans*ans > x, so the previous ans was the correct one.
    }
}
```