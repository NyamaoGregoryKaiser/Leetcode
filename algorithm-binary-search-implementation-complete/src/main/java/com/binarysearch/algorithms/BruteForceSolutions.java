package com.binarysearch.algorithms;

/**
 * This class provides brute-force (typically O(N)) solutions
 * to problems that can be optimized with Binary Search.
 * These are included for comparison and to demonstrate the performance benefits
 * of Binary Search.
 */
public class BruteForceSolutions {

    /**
     * Brute-force solution for finding an element in an array.
     * Iterates through the array linearly.
     *
     * Time Complexity: O(N) - In the worst case, we traverse the entire array.
     * Space Complexity: O(1) - Uses a constant amount of extra space.
     *
     * @param nums   The array to search in.
     * @param target The element to find.
     * @return The index of the target if found, otherwise -1.
     */
    public int find(int[] nums, int target) {
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
     * Brute-force solution for finding the first occurrence of an element.
     * Iterates through the array linearly from the beginning.
     *
     * Time Complexity: O(N) - In the worst case, we traverse the entire array.
     * Space Complexity: O(1) - Uses a constant amount of extra space.
     *
     * @param nums   The array to search in.
     * @param target The element to find.
     * @return The index of the first occurrence of the target if found, otherwise -1.
     */
    public int findFirst(int[] nums, int target) {
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
     * Brute-force solution for finding the last occurrence of an element.
     * Iterates through the array linearly from the end.
     *
     * Time Complexity: O(N) - In the worst case, we traverse the entire array.
     * Space Complexity: O(1) - Uses a constant amount of extra space.
     *
     * @param nums   The array to search in.
     * @param target The element to find.
     * @return The index of the last occurrence of the target if found, otherwise -1.
     */
    public int findLast(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return -1;
        }
        for (int i = nums.length - 1; i >= 0; i--) {
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Brute-force solution for searching in a rotated sorted array.
     * Iterates through the array linearly.
     *
     * Time Complexity: O(N) - In the worst case, we traverse the entire array.
     * Space Complexity: O(1) - Uses a constant amount of extra space.
     *
     * @param nums   The rotated sorted array.
     * @param target The element to find.
     * @return The index of the target if found, otherwise -1.
     */
    public int searchInRotatedSortedArray(int[] nums, int target) {
        return find(nums, target); // Linear scan is the brute force for this too
    }

    /**
     * Brute-force solution for finding a peak element.
     * Iterates through the array and checks each element against its neighbors.
     * Handles boundary conditions by assuming nums[-1] and nums[n] are -infinity.
     *
     * Time Complexity: O(N) - We might check every element.
     * Space Complexity: O(1) - Uses a constant amount of extra space.
     *
     * @param nums The array to search for a peak.
     * @return The index of a peak element. If multiple peaks exist, any one is acceptable.
     *         Returns -1 if array is empty.
     */
    public int findPeakElement(int[] nums) {
        if (nums == null || nums.length == 0) {
            return -1;
        }
        if (nums.length == 1) {
            return 0; // Single element is always a peak
        }

        for (int i = 0; i < nums.length; i++) {
            boolean isLeftLess = (i == 0) || (nums[i] > nums[i - 1]);
            boolean isRightLess = (i == nums.length - 1) || (nums[i] > nums[i + 1]);
            if (isLeftLess && isRightLess) {
                return i;
            }
        }
        return -1; // Should not happen based on problem constraints (peak always exists)
    }

    /**
     * Brute-force solution for Sqrt(x).
     * Iterates linearly from 0 up to x, checking squares.
     *
     * Time Complexity: O(sqrt(x)) - In the worst case, we iterate up to sqrt(x).
     * Space Complexity: O(1) - Uses a constant amount of extra space.
     *
     * @param x The non-negative integer.
     * @return The integer part of the square root of x.
     */
    public int mySqrt(int x) {
        if (x < 0) {
            throw new IllegalArgumentException("Input must be non-negative.");
        }
        if (x == 0) {
            return 0;
        }

        for (long i = 1; i <= x; i++) { // Use long for i*i to prevent overflow
            long square = i * i;
            if (square == x) {
                return (int) i;
            }
            if (square > x) {
                return (int) (i - 1);
            }
        }
        return x; // Fallback for very large x if loop condition allows (e.g., if x is Integer.MAX_VALUE and i exceeds int)
                  // For x=1, loop i=1, 1*1=1, return 1.
                  // For x=2, loop i=1, 1*1=1 < 2, continue. i=2, 2*2=4 > 2, return (2-1)=1.
    }
}