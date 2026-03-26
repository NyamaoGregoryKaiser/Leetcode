```java
package com.example.sorting.problems;

import java.util.Arrays;

/**
 * Problem 2: Merge Sorted Arrays (LeetCode 88 Equivalent)
 *
 * Given two sorted integer arrays `nums1` and `nums2`, merge `nums2` into `nums1` as one sorted array.
 * The number of elements initialized in `nums1` and `nums2` are `m` and `n` respectively.
 * `nums1` has a length of `m + n` (it has enough space to hold elements from both arrays).
 */
public class Problem2_MergeSortedArrays {

    /**
     * Optimal Solution: Merge from the back.
     *
     * Algorithm:
     * Since `nums1` has enough space at its end (after `m` elements), we can start merging from the end
     * of both arrays. This avoids overwriting elements in `nums1` that haven't been processed yet.
     *
     * 1. Initialize three pointers:
     *    - `p1`: points to the last element of the initialized part of `nums1` (`m - 1`).
     *    - `p2`: points to the last element of `nums2` (`n - 1`).
     *    - `p`: points to the last available position in `nums1` (`m + n - 1`).
     * 2. While `p1` and `p2` are non-negative:
     *    - Compare `nums1[p1]` and `nums2[p2]`.
     *    - Place the larger element at `nums1[p]` and decrement its respective pointer (`p1` or `p2`)
     *      and `p`.
     * 3. If there are remaining elements in `nums2` (i.e., `p2 >= 0`), copy them directly to the
     *    beginning of `nums1`. All elements from `nums1` will have already been placed or moved.
     *    (Note: If `nums1` has remaining elements, they are already in place and sorted, so no action needed).
     *
     * Time Complexity: O(m + n) - Each element is moved or compared exactly once.
     * Space Complexity: O(1) - In-place modification, no extra space used beyond a few pointers.
     */
    public void mergeOptimal(int[] nums1, int m, int[] nums2, int n) {
        // Pointers for nums1 (actual elements), nums2, and the placement position in nums1
        int p1 = m - 1;         // Pointer for the last valid element in nums1
        int p2 = n - 1;         // Pointer for the last element in nums2
        int p = m + n - 1;      // Pointer for the last position in the merged nums1 array

        // While there are elements to compare in both arrays
        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1];
                p1--;
            } else {
                nums1[p] = nums2[p2];
                p2--;
            }
            p--;
        }

        // If there are remaining elements in nums2, copy them to the beginning of nums1.
        // Elements from nums1 (if any remaining) are already in their correct sorted positions.
        while (p2 >= 0) {
            nums1[p] = nums2[p2];
            p2--;
            p--;
        }
    }

    /**
     * Brute-Force Solution: Copy and Sort.
     *
     * Algorithm:
     * 1. Copy all elements from `nums2` into the available space at the end of `nums1`.
     * 2. Sort the entire `nums1` array using a standard sorting algorithm (e.g., `Arrays.sort()` in Java).
     *
     * Time Complexity: O((m + n) log (m + n)) - Dominated by the sorting step.
     * Space Complexity: O(1) if `Arrays.sort()` is in-place (like QuickSort or Dual-Pivot QuickSort for primitives in Java),
     *                   or O(log (m+n)) for recursion stack.
     */
    public void mergeBruteForce(int[] nums1, int m, int[] nums2, int n) {
        // Copy elements from nums2 into the empty space in nums1
        for (int i = 0; i < n; i++) {
            nums1[m + i] = nums2[i];
        }

        // Sort the entire nums1 array
        Arrays.sort(nums1);
    }
}
```