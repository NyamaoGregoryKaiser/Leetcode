package com.binarysearch.algorithms;

/**
 * This class provides optimal (O(log N)) solutions for various Binary Search problems.
 * It includes iterative and, for some problems, recursive approaches.
 * Each method contains detailed comments on logic, edge cases, and complexity analysis.
 */
public class BinarySearchProblems {

    /**
     * PROBLEM 1: Standard Binary Search
     * Given a sorted array of integers `nums` and an integer `target`,
     * return the index of `target` if it is in `nums`, otherwise return -1.
     *
     * APPROACH 1: Iterative Binary Search (Optimal)
     * Time Complexity: O(log N) - The search space is halved in each step.
     * Space Complexity: O(1) - Uses a constant amount of extra space.
     *
     * @param nums The sorted array to search in.
     * @param target The element to find.
     * @return The index of the target if found, otherwise -1.
     */
    public int find(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return -1;
        }

        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            // Calculate mid to prevent potential integer overflow: (low + high) / 2
            // If low and high are very large, their sum might exceed Integer.MAX_VALUE.
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid; // Target found at mid index
            } else if (nums[mid] < target) {
                // Target is in the right half, so discard mid and everything to its left
                low = mid + 1;
            } else { // nums[mid] > target
                // Target is in the left half, so discard mid and everything to its right
                high = mid - 1;
            }
        }

        return -1; // Target not found in the array
    }

    /**
     * PROBLEM 1 (Alternative): Standard Binary Search (Recursive)
     * Implements the same problem as above, but using a recursive approach.
     *
     * Time Complexity: O(log N)
     * Space Complexity: O(log N) - Due to the recursive call stack.
     *
     * @param nums The sorted array.
     * @param target The element to find.
     * @return The index of the target if found, otherwise -1.
     */
    public int findRecursive(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return -1;
        }
        return findRecursiveHelper(nums, target, 0, nums.length - 1);
    }

    private int findRecursiveHelper(int[] nums, int target, int low, int high) {
        // Base case: search space is empty
        if (low > high) {
            return -1;
        }

        int mid = low + (high - low) / 2;

        if (nums[mid] == target) {
            return mid; // Target found
        } else if (nums[mid] < target) {
            // Target is in the right half
            return findRecursiveHelper(nums, target, mid + 1, high);
        } else { // nums[mid] > target
            // Target is in the left half
            return findRecursiveHelper(nums, target, low, mid - 1);
        }
    }

    /**
     * PROBLEM 2: Find First Occurrence
     * Given a sorted array with duplicates and a target value, find the index of its first occurrence.
     * If the target is not found, return -1.
     *
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     *
     * @param nums The sorted array with potential duplicates.
     * @param target The element to find.
     * @return The index of the first occurrence of the target, or -1 if not found.
     */
    public int findFirst(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return -1;
        }

        int low = 0;
        int high = nums.length - 1;
        int firstOccurrence = -1; // Stores the potential first occurrence

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                firstOccurrence = mid; // Found a target, store its index
                high = mid - 1;         // Try to find an even earlier occurrence in the left half
            } else if (nums[mid] < target) {
                low = mid + 1; // Target is in the right half
            } else { // nums[mid] > target
                high = mid - 1; // Target is in the left half
            }
        }
        return firstOccurrence;
    }

    /**
     * PROBLEM 2: Find Last Occurrence
     * Given a sorted array with duplicates and a target value, find the index of its last occurrence.
     * If the target is not found, return -1.
     *
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     *
     * @param nums The sorted array with potential duplicates.
     * @param target The element to find.
     * @return The index of the last occurrence of the target, or -1 if not found.
     */
    public int findLast(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return -1;
        }

        int low = 0;
        int high = nums.length - 1;
        int lastOccurrence = -1; // Stores the potential last occurrence

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                lastOccurrence = mid; // Found a target, store its index
                low = mid + 1;          // Try to find an even later occurrence in the right half
            } else if (nums[mid] < target) {
                low = mid + 1; // Target is in the right half
            } else { // nums[mid] > target
                high = mid - 1; // Target is in the left half
            }
        }
        return lastOccurrence;
    }

    /**
     * PROBLEM 3: Search in Rotated Sorted Array
     * Given a sorted array that has been rotated at some pivot unknown to you beforehand
     * (e.g., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]), and a target value,
     * find the index of the target. Assume no duplicate elements exist.
     *
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     *
     * @param nums The rotated sorted array.
     * @param target The element to find.
     * @return The index of the target if found, otherwise -1.
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

            // Determine which half is sorted
            if (nums[low] <= nums[mid]) { // Left half is sorted (from low to mid)
                // Check if target is in the sorted left half
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1; // Target is in the left half, search there
                } else {
                    low = mid + 1; // Target is in the right (unsorted/rotated) half, search there
                }
            } else { // Right half is sorted (from mid to high)
                // Check if target is in the sorted right half
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1; // Target is in the right half, search there
                } else {
                    high = mid - 1; // Target is in the left (unsorted/rotated) half, search there
                }
            }
        }
        return -1; // Target not found
    }

    /**
     * PROBLEM 4: Find Peak Element
     * A peak element is an element that is greater than its neighbors.
     * Given an input array `nums`, where `nums[i] != nums[i+1]`, find a peak element
     * and return its index. You may imagine that `nums[-1] = nums[n] = -∞`.
     *
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     *
     * @param nums The array where a peak needs to be found.
     * @return The index of a peak element. If multiple peaks exist, any one is acceptable.
     */
    public int findPeakElement(int[] nums) {
        if (nums == null || nums.length == 0) {
            return -1;
        }
        if (nums.length == 1) {
            return 0; // A single element is always a peak
        }

        int low = 0;
        int high = nums.length - 1;

        // Loop while there is more than one element to consider (low < high)
        // When low == high, that index is the peak.
        while (low < high) {
            int mid = low + (high - low) / 2;

            // Compare mid with its right neighbor (mid + 1)
            if (nums[mid] < nums[mid + 1]) {
                // We are on an increasing slope. A peak must exist to the right of mid.
                // It could be mid + 1 or further right.
                low = mid + 1;
            } else { // nums[mid] > nums[mid + 1] (we are on a decreasing slope or at a peak)
                // A peak must exist at or to the left of mid.
                // mid could be the peak, or a peak could be further left.
                high = mid; // We cannot discard mid, as it might be the peak.
            }
        }

        // When low == high, we have found a peak element.
        return low;
    }


    /**
     * PROBLEM 5: Sqrt(x)
     * Compute and return the square root of `x`.
     * Since the return type is an integer, the decimal digits are truncated,
     * and only the integer part of the result is returned.
     *
     * This problem applies Binary Search to the range of *possible answers*, not array indices.
     * We are looking for the largest integer `ans` such that `ans * ans <= x`.
     *
     * Time Complexity: O(log X) - where X is the input value (or `Integer.MAX_VALUE` in worst case for search space).
     * Space Complexity: O(1)
     *
     * @param x The non-negative integer for which to compute the square root.
     * @return The integer part of the square root of x.
     */
    public int mySqrt(int x) {
        if (x < 0) {
            throw new IllegalArgumentException("Input must be non-negative.");
        }
        if (x == 0) {
            return 0;
        }

        // Search space for the answer is from 1 to x.
        // For x=1, low=1, high=1. mid=1, 1*1=1. ans=1, low=2. Loop ends. returns 1.
        // For x=8, sqrt is 2.something, so ans=2.
        int low = 1;
        int high = x; // The square root cannot be greater than x itself (for x > 1)
        int ans = 0; // Store the largest integer whose square is less than or equal to x

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Use long for square to prevent overflow for large mid values (e.g., mid near Integer.MAX_VALUE)
            long square = (long) mid * mid;

            if (square == x) {
                return mid; // Exact square root found
            } else if (square < x) {
                ans = mid;         // mid could be the answer, but try for a larger one
                low = mid + 1;     // Search in the right half
            } else { // square > x
                high = mid - 1; // mid is too large, search in the left half
            }
        }
        return ans; // 'ans' will hold the truncated integer square root
    }
}