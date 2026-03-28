```java
package com.example.sorting.problems;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * Problem: Find the Smallest Missing Positive Integer
 *
 * Given an unsorted integer array `nums`, find the smallest missing positive integer.
 *
 * You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.
 *
 * Example 1:
 * Input: nums = [1,2,0]
 * Output: 3
 *
 * Example 2:
 * Input: nums = [3,4,-1,1]
 * Output: 2
 *
 * Example 3:
 * Input: nums = [7,8,9,11,12]
 * Output: 1
 *
 * Constraints:
 * - 1 <= nums.length <= 5 * 10^5
 * - -2^31 <= nums[i] <= 2^31 - 1
 */
public class P5_FindMissingPositive {

    /**
     * Approach 1: Using a Hash Set (Brute Force / O(N) Space)
     *
     * This approach is straightforward but does not meet the O(1) space complexity requirement.
     *
     * 1. Collect all positive numbers from the input array into a HashSet for O(1) average time lookup.
     * 2. Iterate from `1` upwards. The first positive integer `i` that is not present in the HashSet
     *    is the smallest missing positive integer.
     *
     * Time Complexity: O(N)
     *   - O(N) to iterate through the array and add positive numbers to the hash set.
     *   - O(N) in the worst case to iterate from 1 up to N (if 1 to N are all present, N+1 is missing).
     *   - Total: O(N) on average (Hash Set operations are average O(1)).
     *
     * Space Complexity: O(N)
     *   - O(N) to store the positive numbers in the HashSet. In the worst case, all N numbers are positive
     *     and distinct.
     *
     * @param nums The input integer array.
     * @return The smallest missing positive integer.
     * @throws IllegalArgumentException if the input array is null.
     */
    public int findMissingPositive_HashSet(int[] nums) {
        if (nums == null) {
            throw new IllegalArgumentException("Input array cannot be null.");
        }
        if (nums.length == 0) {
            return 1; // Smallest positive integer in an empty array is 1.
        }

        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (num > 0) {
                seen.add(num);
            }
        }

        // Iterate from 1 upwards to find the first missing positive integer
        for (int i = 1; i <= nums.length + 1; i++) { // Check up to N+1
            if (!seen.contains(i)) {
                return i;
            }
        }
        // This line should technically not be reached if checking up to N+1.
        // If all numbers from 1 to N are present, then N+1 is the smallest missing positive.
        // The loop condition `i <= nums.length + 1` covers this.
        return nums.length + 1;
    }

    /**
     * Approach 2: In-place Swapping (Optimal - O(1) Space, O(N) Time)
     *
     * This approach leverages the array itself as a hash map.
     * The key insight is that if there are `N` elements in the array, the smallest missing
     * positive integer must be between `1` and `N+1`. We can try to put each number `x`
     * into its "correct" position, which is `x-1` (if `x` is positive and within the range `1` to `N`).
     *
     * 1. Iterate through the array. For each number `num = nums[i]`:
     *    If `num` is positive, within the range `[1, N]`, and `num` is not already at its correct position
     *    (`nums[num - 1] != num`), then swap `nums[i]` with `nums[num - 1]`.
     *    Keep swapping until `nums[i]` is not a valid candidate to place, or it's in its correct spot.
     * 2. After this re-arrangement, iterate through the array again. The first index `i` for which
     *    `nums[i] != i + 1` indicates that `i + 1` is the smallest missing positive integer.
     * 3. If all numbers from `1` to `N` are present (i.e., `nums[i] == i + 1` for all `i`),
     *    then `N + 1` is the smallest missing positive integer.
     *
     * Time Complexity: O(N)
     *   - The first loop iterates `N` times. In the worst case, an element might be swapped
     *     multiple times, but each number `x` is moved to its correct position `x-1` at most once.
     *     Therefore, the total number of swaps is at most O(N).
     *   - The second loop iterates `N` times.
     *   - Total: O(N).
     *
     * Space Complexity: O(1)
     *   - All operations are performed in-place.
     *
     * @param nums The input integer array.
     * @return The smallest missing positive integer.
     * @throws IllegalArgumentException if the input array is null.
     */
    public int findMissingPositive_InPlaceSwapping(int[] nums) {
        if (nums == null) {
            throw new IllegalArgumentException("Input array cannot be null.");
        }
        int n = nums.length;
        if (n == 0) {
            return 1;
        }

        // Phase 1: Place each positive number 'x' at index 'x-1'
        // We iterate through the array, and for each element nums[i],
        // if it's a valid candidate (positive, within [1, n], and not already in place),
        // we swap it until it's in place or not a valid candidate.
        for (int i = 0; i < n; i++) {
            // Loop condition:
            // 1. nums[i] is positive.
            // 2. nums[i] is within the valid range [1, n].
            // 3. nums[i] is not already at its correct position (i.e., nums[i] != nums[nums[i] - 1]).
            //    The third condition is crucial to avoid infinite loops if nums[i] = nums[nums[i]-1]
            //    but nums[i] is not equal to i+1 (e.g., [1,1] or [2,2,2])
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                // If it meets the conditions, swap nums[i] with the element at its target index
                swap(nums, i, nums[i] - 1);
            }
        }

        // Phase 2: Find the first mismatch
        // After placing numbers in their correct positions, the first index 'i'
        // where nums[i] is not 'i + 1' indicates that 'i + 1' is the smallest missing positive.
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }

        // If all numbers from 1 to n are present, then n + 1 is the smallest missing positive.
        return n + 1;
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