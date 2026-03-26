```java
package com.example.sorting.problems;

import com.example.sorting.utils.ArrayUtils;

import java.util.Arrays;

/**
 * Problem 4: Sort Colors (LeetCode 75 Equivalent)
 *
 * Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place
 * so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
 * Use the integers 0, 1, and 2 to represent red, white, and blue, respectively.
 *
 * You must solve this problem without using the library's sort function.
 *
 * Example:
 * Input: [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 */
public class Problem4_SortColors {

    /**
     * Optimal Solution: Dutch National Flag Algorithm (Three-Way Partitioning)
     *
     * Algorithm:
     * This algorithm uses three pointers: `low`, `mid`, and `high`.
     * - `low`: Points to the end of the 0s section. All elements to the left of `low` (exclusive) are 0s.
     * - `mid`: Points to the current element being examined.
     * - `high`: Points to the beginning of the 2s section. All elements to the right of `high` (exclusive) are 2s.
     *
     * The invariant is:
     * - `nums[0...low-1]` contains all 0s.
     * - `nums[low...mid-1]` contains all 1s.
     * - `nums[mid...high]` contains unknown elements.
     * - `nums[high+1...n-1]` contains all 2s.
     *
     * Steps:
     * 1. Initialize `low = 0`, `mid = 0`, `high = nums.length - 1`.
     * 2. Iterate while `mid <= high`:
     *    a. If `nums[mid]` is 0:
     *       Swap `nums[low]` and `nums[mid]`.
     *       Increment both `low` and `mid`.
     *    b. If `nums[mid]` is 1:
     *       Increment `mid`.
     *    c. If `nums[mid]` is 2:
     *       Swap `nums[mid]` and `nums[high]`.
     *       Decrement `high`. (Note: `mid` is not incremented here because the element swapped from `high`
     *       could be 0, 1, or 2, and needs to be re-examined).
     *
     * Time Complexity: O(N) - Each element is visited and swapped at most a constant number of times.
     * Space Complexity: O(1) - In-place sorting.
     */
    public void sortColorsDutchNationalFlag(int[] nums) {
        if (nums == null || nums.length <= 1) {
            return;
        }

        int low = 0;    // Pointer for 0s (red)
        int mid = 0;    // Pointer for current element
        int high = nums.length - 1; // Pointer for 2s (blue)

        while (mid <= high) {
            switch (nums[mid]) {
                case 0: // If current element is 0 (red)
                    ArrayUtils.swap(nums, low, mid);
                    low++;
                    mid++;
                    break;
                case 1: // If current element is 1 (white)
                    mid++;
                    break;
                case 2: // If current element is 2 (blue)
                    ArrayUtils.swap(nums, mid, high);
                    high--;
                    // Note: mid is NOT incremented here because the element swapped from 'high'
                    // might be a 0 or 1, and needs to be re-examined.
                    break;
            }
        }
    }

    /**
     * Alternative Solution: Counting Sort (Two-Pass Approach)
     *
     * Algorithm:
     * Counting sort is efficient for sorting data within a small integer range.
     * 1. Count the occurrences of each color (0, 1, and 2) in the array.
     * 2. Overwrite the array based on the counts:
     *    - Fill the first `count[0]` positions with 0.
     *    - Fill the next `count[1]` positions with 1.
     *    - Fill the remaining `count[2]` positions with 2.
     *
     * Time Complexity: O(N) - One pass to count, one pass to fill the array.
     * Space Complexity: O(1) - As the range of numbers (0, 1, 2) is fixed and small, the count array size is constant (3).
     * Stability: Stable if implemented carefully, but for this problem, stability is not required.
     */
    public void sortColorsCountingSort(int[] nums) {
        if (nums == null || nums.length <= 1) {
            return;
        }

        // Assuming colors are only 0, 1, 2
        int[] counts = new int[3]; // counts[0] for 0s, counts[1] for 1s, counts[2] for 2s

        // First pass: Count occurrences of each color
        for (int num : nums) {
            if (num >= 0 && num <= 2) { // Basic validation
                counts[num]++;
            } else {
                throw new IllegalArgumentException("Array contains elements other than 0, 1, or 2.");
            }
        }

        // Second pass: Overwrite the array based on counts
        int index = 0;
        for (int i = 0; i < counts[0]; i++) {
            nums[index++] = 0;
        }
        for (int i = 0; i < counts[1]; i++) {
            nums[index++] = 1;
        }
        for (int i = 0; i < counts[2]; i++) {
            nums[index++] = 2;
        }
    }

    /**
     * Brute-Force Solution: Using Built-in Sort
     *
     * Algorithm:
     * Simply use the standard library's sorting function to sort the array.
     *
     * Time Complexity: O(N log N) - Standard library sorts are typically O(N log N).
     * Space Complexity: O(log N) to O(N) depending on the specific implementation (e.g., Java's `Arrays.sort()` for primitives is Dual-Pivot QuickSort with O(log N) space).
     * This solution violates the "without using the library's sort function" constraint but is a valid brute-force comparison.
     */
    public void sortColorsBuiltInSort(int[] nums) {
        if (nums == null || nums.length <= 1) {
            return;
        }
        Arrays.sort(nums);
    }
}
```