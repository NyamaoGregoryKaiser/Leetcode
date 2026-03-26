```java
package com.example.sorting.problems;

import com.example.sorting.utils.ArrayUtils;

import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Problem 3: Kth Largest Element in an Array (LeetCode 215 Equivalent)
 *
 * Find the k-th largest element in an unsorted array.
 * Note that it is the k-th largest element in the sorted order, not the k-th distinct element.
 *
 * Example:
 * Input: [3,2,1,5,6,4], k = 2
 * Output: 5 (After sorting: [1,2,3,4,5,6], 2nd largest is 5)
 */
public class Problem3_KthLargestElement {

    /**
     * Optimal Solution: QuickSelect (Partition-based Selection Algorithm)
     *
     * Algorithm:
     * QuickSelect is a selection algorithm to find the k-th smallest (or largest) element in an unordered list.
     * It is related to QuickSort, but instead of recursively processing both sides of the pivot, it only
     * recurses on the side that contains the target element.
     *
     * To find the k-th largest element, we actually look for the (N - k)-th smallest element.
     *
     * 1. Choose a pivot element. (Random pivot is crucial for average-case performance).
     * 2. Partition the array around the pivot. After partitioning, the pivot will be at its final sorted position.
     * 3. Let's say the pivot's final index is `pIdx`.
     *    - If `pIdx` is equal to `N - k`, then the pivot is our k-th largest element.
     *    - If `pIdx` is less than `N - k`, the k-th largest element must be in the right sub-array (elements greater than pivot).
     *    - If `pIdx` is greater than `N - k`, the k-th largest element must be in the left sub-array (elements smaller than pivot).
     * 4. Recursively apply the process to the relevant sub-array.
     *
     * Time Complexity:
     *   - Average: O(N) - In each step, the problem size is reduced on average by a constant factor.
     *   - Worst: O(N^2) - Occurs if pivot selection consistently results in highly unbalanced partitions
     *     (e.g., always picking the smallest or largest element). Randomized pivot helps mitigate this.
     * Space Complexity: O(log N) on average for recursion stack, O(N) in worst case.
     */
    public int findKthLargestQuickSelect(int[] nums, int k) {
        if (nums == null || nums.length == 0) {
            throw new IllegalArgumentException("Array cannot be null or empty.");
        }
        if (k <= 0 || k > nums.length) {
            throw new IllegalArgumentException("k must be between 1 and array length.");
        }

        // The problem asks for the k-th largest, which is equivalent to the (N - k)-th smallest.
        // We'll use 0-indexed for smallest: (nums.length - k) is the index of the k-th largest element
        // if the array were sorted in ascending order.
        return quickSelect(nums, 0, nums.length - 1, nums.length - k);
    }

    private int quickSelect(int[] nums, int low, int high, int kSmallestIndex) {
        if (low == high) { // Base case: subarray has only one element
            return nums[low];
        }

        // Pick a random pivot index to ensure average O(N) performance
        int pivotIndex = ThreadLocalRandom.current().nextInt(low, high + 1);
        ArrayUtils.swap(nums, pivotIndex, high); // Move pivot to end

        int pIdx = partition(nums, low, high);

        if (pIdx == kSmallestIndex) {
            return nums[pIdx];
        } else if (pIdx < kSmallestIndex) {
            return quickSelect(nums, pIdx + 1, high, kSmallestIndex);
        } else { // pIdx > kSmallestIndex
            return quickSelect(nums, low, pIdx - 1, kSmallestIndex);
        }
    }

    /**
     * Lomuto partition scheme with random pivot moved to end.
     * Places the pivot element at its correct sorted position.
     */
    private int partition(int[] nums, int low, int high) {
        int pivot = nums[high]; // Pivot is the last element (randomly chosen and moved here)
        int i = low;            // Pointer for elements smaller than pivot

        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                ArrayUtils.swap(nums, i, j);
                i++;
            }
        }
        ArrayUtils.swap(nums, i, high); // Put pivot in its correct position
        return i; // Return the partition index
    }

    /**
     * Solution 2: Using a Min-Heap (Priority Queue)
     *
     * Algorithm:
     * 1. Create a Min-Heap (PriorityQueue in Java).
     * 2. Iterate through the array `nums`.
     * 3. For each number, add it to the min-heap.
     * 4. If the size of the min-heap exceeds `k`, remove the smallest element from the heap (using `poll()`).
     *    This ensures that the heap always contains the `k` largest elements encountered so far.
     * 5. After iterating through all numbers, the root of the min-heap (`peek()`) will be the k-th largest element.
     *
     * Time Complexity: O(N log K)
     *   - Each of N elements is offered to the heap: O(log K) for each offer (and poll).
     *   - Total: N * O(log K) = O(N log K).
     * Space Complexity: O(K) - The heap stores at most K elements.
     */
    public int findKthLargestMinHeap(int[] nums, int k) {
        if (nums == null || nums.length == 0) {
            throw new IllegalArgumentException("Array cannot be null or empty.");
        }
        if (k <= 0 || k > nums.length) {
            throw new IllegalArgumentException("k must be between 1 and array length.");
        }

        // By default, PriorityQueue is a min-heap
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int num : nums) {
            minHeap.offer(num); // Add element to heap
            if (minHeap.size() > k) {
                minHeap.poll(); // Remove the smallest element if heap size exceeds k
            }
        }
        return minHeap.peek(); // The root of the min-heap is the k-th largest element
    }

    /**
     * Brute-Force Solution: Sort the Array
     *
     * Algorithm:
     * 1. Sort the entire array in ascending order.
     * 2. The k-th largest element will be at index `nums.length - k`.
     *
     * Time Complexity: O(N log N) - Dominated by the sorting step.
     * Space Complexity: O(log N) to O(N) depending on the sort implementation (e.g., QuickSort uses O(log N) on average, MergeSort uses O(N)).
     *                   Java's `Arrays.sort()` for primitives is typically Dual-Pivot QuickSort, which is O(log N) space.
     */
    public int findKthLargestSort(int[] nums, int k) {
        if (nums == null || nums.length == 0) {
            throw new IllegalArgumentException("Array cannot be null or empty.");
        }
        if (k <= 0 || k > nums.length) {
            throw new IllegalArgumentException("k must be between 1 and array length.");
        }

        Arrays.sort(nums);
        return nums[nums.length - k];
    }
}
```