```java
package com.example.sorting.problems;

/**
 * Problem: Dutch National Flag Problem (Sort Colors)
 *
 * Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place
 * so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
 * We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
 *
 * Constraint: You are not allowed to use any built-in sort function.
 *
 * Example 1:
 * Input: nums = [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 *
 * Example 2:
 * Input: nums = [2,0,1]
 * Output: [0,1,2]
 */
public class P3_DutchNationalFlag {

    /**
     * Approach 1: Two-Pass Counting Sort
     * This is a simple and intuitive approach, but it requires two passes over the array.
     *
     * 1. Count the occurrences of 0s, 1s, and 2s.
     * 2. Overwrite the array with the counted number of 0s, then 1s, then 2s.
     *
     * Time Complexity: O(N)
     *   - O(N) for the first pass to count frequencies.
     *   - O(N) for the second pass to overwrite the array.
     *   - Total: O(N).
     *
     * Space Complexity: O(1)
     *   - Uses a constant amount of extra space for counters (e.g., an array of size 3).
     *
     * @param nums The array of integers (0, 1, or 2) to be sorted.
     * @throws IllegalArgumentException if nums is null.
     */
    public void sortColors_CountingSort(int[] nums) {
        if (nums == null) {
            throw new IllegalArgumentException("Input array cannot be null.");
        }
        int n = nums.length;
        if (n <= 1) {
            return;
        }

        int count0 = 0; // Counts of 0s (red)
        int count1 = 0; // Counts of 1s (white)
        // No need to count 2s, as count2 = n - count0 - count1

        // First pass: Count the occurrences of each color
        for (int num : nums) {
            if (num == 0) {
                count0++;
            } else if (num == 1) {
                count1++;
            } else if (num != 2) {
                // Optional: Handle invalid input if numbers other than 0, 1, 2 are present
                throw new IllegalArgumentException("Array contains elements other than 0, 1, or 2.");
            }
        }

        // Second pass: Overwrite the array based on counts
        for (int i = 0; i < n; i++) {
            if (i < count0) {
                nums[i] = 0;
            } else if (i < count0 + count1) {
                nums[i] = 1;
            } else {
                nums[i] = 2;
            }
        }
    }

    /**
     * Approach 2: One-Pass Three-Pointer (Dutch National Flag Algorithm)
     * This is the classic in-place, one-pass solution.
     *
     * We maintain three pointers: `low`, `mid`, and `high`.
     * - `low` points to the next position for a 0 (red). All elements before `low` are 0s.
     * - `mid` points to the current element being considered.
     * - `high` points to the next position for a 2 (blue). All elements after `high` are 2s.
     *
     * The algorithm iterates while `mid` is less than or equal to `high`:
     * - If `nums[mid]` is 0: Swap `nums[mid]` with `nums[low]`, then increment both `low` and `mid`.
     * - If `nums[mid]` is 1: Increment `mid`. The element is already in its correct "middle" partition.
     * - If `nums[mid]` is 2: Swap `nums[mid]` with `nums[high]`, then decrement `high`. `mid` is NOT
     *   incremented here because the element swapped into `nums[mid]` from `nums[high]` could be 0, 1, or 2
     *   and needs to be re-evaluated.
     *
     * Time Complexity: O(N)
     *   - Only one pass is made through the array. Each element is visited at most twice (once by `mid`,
     *     and potentially once by `low` or `high` during a swap).
     *
     * Space Complexity: O(1)
     *   - Uses a constant amount of extra space for pointers and a temporary variable for swaps.
     *
     * @param nums The array of integers (0, 1, or 2) to be sorted.
     * @throws IllegalArgumentException if nums is null.
     */
    public void sortColors_OnePass(int[] nums) {
        if (nums == null) {
            throw new IllegalArgumentException("Input array cannot be null.");
        }
        int n = nums.length;
        if (n <= 1) {
            return;
        }

        // low: boundary between 0s and 1s/2s (exclusive of low)
        // mid: current element being examined
        // high: boundary between 2s and 0s/1s (exclusive of high)
        int low = 0;
        int mid = 0;
        int high = n - 1;

        while (mid <= high) {
            switch (nums[mid]) {
                case 0: // If current element is 0 (red)
                    // Swap it with element at 'low' pointer, then advance both 'low' and 'mid'
                    swap(nums, low, mid);
                    low++;
                    mid++;
                    break;
                case 1: // If current element is 1 (white)
                    // It's already in its correct partition, just advance 'mid'
                    mid++;
                    break;
                case 2: // If current element is 2 (blue)
                    // Swap it with element at 'high' pointer, then decrement 'high'
                    // DO NOT increment 'mid' because the element swapped into 'mid'
                    // could be a 0, 1, or 2, and needs to be processed.
                    swap(nums, mid, high);
                    high--;
                    break;
                default:
                    // Handle invalid input if numbers other than 0, 1, 2 are present
                    throw new IllegalArgumentException("Array contains elements other than 0, 1, or 2.");
            }
        }
    }

    /**
     * Helper to swap two elements in an array.
     */
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```