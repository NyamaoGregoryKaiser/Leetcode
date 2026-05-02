```java
package additional_implementations;

import java.util.Arrays;

/**
 * KthSmallestElement_BruteForce:
 * This class provides a brute-force approach to find the Kth smallest element
 * in an unsorted array by sorting the entire array.
 *
 * This serves as a baseline for comparison against more optimized, heap-based solutions.
 */
public class KthSmallestElement_BruteForce {

    /**
     * Finds the Kth smallest element in an unsorted array using sorting.
     *
     * Algorithm:
     * 1. Sort the input array in ascending order.
     * 2. The Kth smallest element will be at index `k-1` after sorting.
     *
     * Time Complexity: O(N log N)
     *   - Dominated by the sorting step (e.g., Arrays.sort uses Dual-Pivot Quicksort, typically N log N average case).
     * Space Complexity: O(log N) or O(N)
     *   - Depends on the sorting algorithm's implementation (e.g., in-place quicksort uses O(log N) stack space,
     *     mergesort might use O(N) auxiliary space). Java's `Arrays.sort` for primitives is Quicksort.
     *
     * @param nums The input array of integers.
     * @param k The desired Kth smallest element (1-indexed).
     * @return The Kth smallest element.
     * @throws IllegalArgumentException if nums is null or empty, or k is out of bounds.
     */
    public int findKthSmallest(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
            throw new IllegalArgumentException("Invalid input: nums array is empty or k is out of bounds.");
        }

        // Step 1: Sort the array
        Arrays.sort(nums);

        // Step 2: Return the element at index k-1 (since k is 1-indexed)
        return nums[k - 1];
    }

    public static void main(String[] args) {
        KthSmallestElement_BruteForce solver = new KthSmallestElement_BruteForce();

        int[] nums1 = {3, 2, 1, 5, 6, 4};
        int k1 = 2;
        System.out.println("Array: " + Arrays.toString(nums1) + ", k: " + k1 + " -> Kth smallest: " + solver.findKthSmallest(nums1, k1)); // Expected: 2

        int[] nums2 = {3, 2, 3, 1, 2, 4, 5, 5, 6};
        int k2 = 4;
        System.out.println("Array: " + Arrays.toString(nums2) + ", k: " + k2 + " -> Kth smallest: " + solver.findKthSmallest(nums2, k2)); // Expected: 3

        int[] nums3 = {7, 6, 5, 4, 3, 2, 1};
        int k3 = 1;
        System.out.println("Array: " + Arrays.toString(nums3) + ", k: " + k3 + " -> Kth smallest: " + solver.findKthSmallest(nums3, k3)); // Expected: 1

        int[] nums4 = {10, 20, 15, 25, 30};
        int k4 = 3;
        System.out.println("Array: " + Arrays.toString(nums4) + ", k: " + k4 + " -> Kth smallest: " + solver.findKthSmallest(nums4, k4)); // Expected: 20

        try {
            solver.findKthSmallest(new int[]{}, 1);
        } catch (IllegalArgumentException e) {
            System.out.println("Error for empty array: " + e.getMessage());
        }
        try {
            solver.findKthSmallest(new int[]{1}, 0);
        } catch (IllegalArgumentException e) {
            System.out.println("Error for k=0: " + e.getMessage());
        }
    }
}
```