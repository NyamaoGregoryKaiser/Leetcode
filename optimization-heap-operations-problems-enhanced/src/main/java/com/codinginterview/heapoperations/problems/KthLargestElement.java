```java
package com.codinginterview.heapoperations.problems;

import com.codinginterview.heapoperations.utils.CustomMinHeap;

import java.util.Arrays;
import java.util.Collections;
import java.util.PriorityQueue;

/**
 * Problem: Kth Largest Element in an Array
 *
 * Given an integer array nums and an integer k, return the k-th largest element in the array.
 * Note that it is the k-th largest element in the sorted order, not the k-th distinct element.
 *
 * Example 1:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 *
 * Example 2:
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 *
 * Constraints:
 * 1 <= k <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 */
public class KthLargestElement {

    /**
     * Approach 1: Optimal Solution using a Min-Heap (Java's PriorityQueue)
     *
     * Algorithm:
     * 1. Create a Min-Heap (PriorityQueue).
     * 2. Iterate through each number in the input array `nums`.
     * 3. Add the current number to the min-heap.
     * 4. If the size of the min-heap exceeds `k`, remove the smallest element from the heap
     *    (which is at the root and accessed via `poll()`). This ensures that the heap
     *    always stores the `k` largest elements encountered so far. The smallest element
     *    in this heap will be the k-th largest overall.
     * 5. After iterating through all numbers, the top element of the min-heap (`peek()`)
     *    will be the k-th largest element.
     *
     * Example: nums = [3,2,1,5,6,4], k = 2
     * - Initialize minHeap = []
     * - Process 3: minHeap = [3]
     * - Process 2: minHeap = [2,3]
     * - Process 1: minHeap = [1,2,3]. Size > k (3 > 2), poll 1. minHeap = [2,3]
     * - Process 5: minHeap = [2,3,5]. Size > k (3 > 2), poll 2. minHeap = [3,5]
     * - Process 6: minHeap = [3,5,6]. Size > k (3 > 2), poll 3. minHeap = [5,6]
     * - Process 4: minHeap = [4,5,6]. Size > k (3 > 2), poll 4. minHeap = [5,6]
     * - Final minHeap.peek() = 5
     *
     * Time Complexity: O(N log K)
     *   - We iterate through `N` elements.
     *   - Each `add` or `poll` operation on a heap of size `K` takes O(log K) time.
     * Space Complexity: O(K)
     *   - The heap stores at most `K` elements.
     *
     * @param nums The input integer array.
     * @param k The desired k-th largest element.
     * @return The k-th largest element.
     */
    public int findKthLargestMinHeap(int[] nums, int k) {
        // A min-heap to store the k largest elements.
        // PriorityQueue in Java is a min-heap by default.
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int num : nums) {
            minHeap.add(num);
            // If the heap size exceeds k, remove the smallest element.
            // This ensures that the heap always contains the k largest elements seen so far.
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        // The root of the min-heap will be the k-th largest element.
        return minHeap.peek();
    }

    /**
     * Approach 2: Optimal Solution using a Custom Min-Heap
     *
     * This method provides the same logic as `findKthLargestMinHeap` but uses
     * our custom `CustomMinHeap` implementation to demonstrate heap mechanics from scratch.
     *
     * Time Complexity: O(N log K)
     * Space Complexity: O(K)
     *
     * @param nums The input integer array.
     * @param k The desired k-th largest element.
     * @return The k-th largest element.
     */
    public int findKthLargestCustomMinHeap(int[] nums, int k) {
        CustomMinHeap<Integer> minHeap = new CustomMinHeap<>();

        for (int num : nums) {
            minHeap.add(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }


    /**
     * Approach 3: Using a Max-Heap (less optimal for this specific problem)
     *
     * Algorithm:
     * 1. Create a Max-Heap (PriorityQueue with reverse order).
     * 2. Add all elements from `nums` to the max-heap.
     * 3. Remove the top element (`poll()`) `k-1` times.
     * 4. The remaining top element (`peek()`) is the k-th largest.
     *
     * This approach is generally less efficient than the min-heap approach
     * because it adds all N elements and then removes k elements, whereas
     * the min-heap approach keeps the heap size bounded by K.
     *
     * Time Complexity: O(N log N)
     *   - Adding all N elements to a max-heap: N * O(log N) = O(N log N).
     *   - Removing k-1 elements: (k-1) * O(log N) = O(K log N).
     *   - Total: O(N log N)
     * Space Complexity: O(N)
     *   - The heap stores all `N` elements.
     *
     * @param nums The input integer array.
     * @param k The desired k-th largest element.
     * @return The k-th largest element.
     */
    public int findKthLargestMaxHeap(int[] nums, int k) {
        // A max-heap to store all elements.
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

        for (int num : nums) {
            maxHeap.add(num);
        }

        // Pop k-1 largest elements
        for (int i = 0; i < k - 1; i++) {
            maxHeap.poll();
        }

        // The k-th largest element is now at the top
        return maxHeap.peek();
    }

    /**
     * Approach 4: Brute Force / Sorting (for comparison)
     *
     * Algorithm:
     * 1. Sort the entire array `nums` in ascending order.
     * 2. The k-th largest element will be at index `nums.length - k`.
     *
     * Time Complexity: O(N log N)
     *   - Dominated by the sorting operation.
     * Space Complexity: O(log N) or O(N) depending on the sorting algorithm implementation.
     *   - `Arrays.sort()` uses a dual-pivot quicksort which is O(log N) for recursion stack.
     *
     * @param nums The input integer array.
     * @param k The desired k-th largest element.
     * @return The k-th largest element.
     */
    public int findKthLargestSorting(int[] nums, int k) {
        Arrays.sort(nums); // Sorts in ascending order
        return nums[nums.length - k];
    }

    // Note: Another optimal approach is QuickSelect (average O(N), worst O(N^2) time, O(log N) space),
    // but it's not implemented here to keep the focus on heap operations.
}
```