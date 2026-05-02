```java
package additional_implementations;

import java.util.Arrays;
import java.util.NoSuchElementException;

/**
 * KthSmallestElement_StreamAPI:
 * This class provides a solution to find the Kth smallest element in an unsorted array
 * using Java's Stream API. It demonstrates a functional programming approach.
 *
 * This also serves as a comparison to the imperative and heap-based solutions.
 */
public class KthSmallestElement_StreamAPI {

    /**
     * Finds the Kth smallest element in an unsorted array using Java Stream API.
     *
     * Algorithm:
     * 1. Convert the array to an `IntStream`.
     * 2. Sort the stream.
     * 3. Skip the first `k-1` elements.
     * 4. Find the next element (which will be the Kth smallest).
     *
     * Time Complexity: O(N log N)
     *   - Dominated by the `sorted()` operation on the stream.
     * Space Complexity: O(N) or O(log N)
     *   - Intermediate stream operations might require auxiliary space, similar to sorting.
     *
     * @param nums The input array of integers.
     * @param k The desired Kth smallest element (1-indexed).
     * @return The Kth smallest element.
     * @throws IllegalArgumentException if nums is null or empty, or k is out of bounds.
     * @throws NoSuchElementException if k is valid but the array has fewer elements after skipping (should not happen
     *                                 if initial checks are correct).
     */
    public int findKthSmallest(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
            throw new IllegalArgumentException("Invalid input: nums array is empty or k is out of bounds.");
        }

        // Using Java Stream API: sort, skip, and find
        return Arrays.stream(nums)
                     .sorted()            // O(N log N)
                     .skip(k - 1)         // O(k) or O(N) depending on stream optimization
                     .findFirst()         // O(1)
                     .orElseThrow(() -> new NoSuchElementException("Cannot find Kth smallest element. " +
                             "This should not happen if input validation for k is correct."));
    }

    public static void main(String[] args) {
        KthSmallestElement_StreamAPI solver = new KthSmallestElement_StreamAPI();

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