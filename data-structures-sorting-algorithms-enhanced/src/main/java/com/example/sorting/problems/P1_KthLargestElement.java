```java
package com.example.sorting.problems;

import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Problem: Kth Largest Element in an Array
 *
 * Given an unsorted array of integers `nums` and an integer `k`, return the k-th largest element in the array.
 * Note that it is the k-th largest element in the sorted order, not the k-th distinct element.
 *
 * Example 1:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 *
 * Example 2:
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 */
public class P1_KthLargestElement {

    /**
     * Approach 1: Sorting the entire array (Brute Force)
     * Sorts the array in ascending order and then returns the element at the (n-k)th index.
     *
     * Time Complexity: O(N log N) due to sorting.
     * Space Complexity: O(log N) or O(N) depending on the sorting algorithm used by `Arrays.sort()`
     *                   (typically Timsort, which is O(N) worst case for aux space).
     *
     * @param nums The input array.
     * @param k The k-th largest element to find.
     * @return The k-th largest element.
     * @throws IllegalArgumentException if nums is null, empty, or k is out of bounds.
     */
    public int findKthLargest_Sort(int[] nums, int k) {
        validateInputs(nums, k);
        Arrays.sort(nums); // Sorts in ascending order
        return nums[nums.length - k];
    }

    /**
     * Approach 2: Using a Min-Heap (Priority Queue)
     * Maintain a min-heap of size `k`. Iterate through the array:
     * - Add elements to the heap.
     * - If the heap size exceeds `k`, remove the smallest element (heap's root).
     * After processing all elements, the root of the heap will be the k-th largest element.
     *
     * Time Complexity: O(N log k)
     *   - Each insertion/deletion in a heap of size k takes O(log k).
     *   - We do this N times.
     * Space Complexity: O(k) for the priority queue.
     *
     * @param nums The input array.
     * @param k The k-th largest element to find.
     * @return The k-th largest element.
     * @throws IllegalArgumentException if nums is null, empty, or k is out of bounds.
     */
    public int findKthLargest_MinHeap(int[] nums, int k) {
        validateInputs(nums, k);

        // Min-heap
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int num : nums) {
            minHeap.offer(num); // Add element to the heap
            if (minHeap.size() > k) {
                minHeap.poll(); // If heap size exceeds k, remove the smallest element
            }
        }

        // The top of the min-heap is the k-th largest element
        return minHeap.peek();
    }

    /**
     * Approach 3: QuickSelect Algorithm (Optimized)
     * QuickSelect is a selection algorithm to find the k-th smallest (or largest) element
     * in an unsorted array. It is a variant of QuickSort.
     *
     * The idea is:
     * 1. Pick a pivot element.
     * 2. Partition the array around the pivot.
     * 3. If the pivot is at the (n-k)th position (for k-th largest), we found our element.
     * 4. If the pivot is too small, recurse on the right partition.
     * 5. If the pivot is too large, recurse on the left partition.
     *
     * To find the k-th largest element, we are essentially looking for the (N - k)th smallest element
     * in a 0-indexed array of size N.
     *
     * Time Complexity:
     *   - Average Case: O(N) - On average, we eliminate a significant portion of the array in each step.
     *   - Worst Case: O(N^2) - If the pivot selection is consistently bad (e.g., always choosing
     *     the smallest or largest element), reducing the problem size by only one element at a time.
     *     Using a random pivot helps to avoid this worst-case in practice.
     * Space Complexity: O(log N) on average for the recursion stack. O(N) in worst case.
     *
     * @param nums The input array.
     * @param k The k-th largest element to find.
     * @return The k-th largest element.
     * @throws IllegalArgumentException if nums is null, empty, or k is out of bounds.
     */
    public int findKthLargest_QuickSelect(int[] nums, int k) {
        validateInputs(nums, k);

        int N = nums.length;
        // The k-th largest element is at index N - k if the array were 0-indexed sorted.
        return quickSelect(nums, 0, N - 1, N - k);
    }

    /**
     * Recursive helper for QuickSelect.
     *
     * @param nums The array.
     * @param low The starting index of the current subarray.
     * @param high The ending index of the current subarray.
     * @param kIndex The target index (N-k) to find.
     * @return The element at kIndex.
     */
    private int quickSelect(int[] nums, int low, int high, int kIndex) {
        if (low == high) { // Base case: if the subarray has only one element
            return nums[low];
        }

        // Choose a random pivot index to help prevent worst-case O(N^2)
        Random rand = ThreadLocalRandom.current();
        int pivotIndex = low + rand.nextInt(high - low + 1);

        // Partition the array and get the final position of the pivot
        pivotIndex = partition(nums, low, high, pivotIndex);

        if (pivotIndex == kIndex) {
            return nums[pivotIndex];
        } else if (pivotIndex < kIndex) {
            // If pivot is too small, search in the right partition
            return quickSelect(nums, pivotIndex + 1, high, kIndex);
        } else {
            // If pivot is too large, search in the left partition
            return quickSelect(nums, low, pivotIndex - 1, kIndex);
        }
    }

    /**
     * Partitions the array around a pivot element.
     * Rearranges elements such that elements smaller than the pivot are to its left,
     * and elements greater are to its right.
     *
     * @param nums The array to partition.
     * @param low The starting index.
     * @param high The ending index.
     * @param pivotIndex The chosen pivot's initial index.
     * @return The final index of the pivot after partitioning.
     */
    private int partition(int[] nums, int low, int high, int pivotIndex) {
        int pivotValue = nums[pivotIndex];
        // Move pivot to the end
        swap(nums, pivotIndex, high);
        int storeIndex = low;

        // Iterate through the array from low to high-1
        // and move all elements smaller than the pivot to the left of storeIndex
        for (int i = low; i < high; i++) {
            if (nums[i] < pivotValue) {
                swap(nums, storeIndex, i);
                storeIndex++;
            }
        }
        // Move pivot to its final sorted position
        swap(nums, storeIndex, high);
        return storeIndex;
    }

    /**
     * Helper to swap two elements in an array.
     */
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    /**
     * Validates input parameters for all findKthLargest methods.
     * @param nums The input array.
     * @param k The k-th value.
     * @throws IllegalArgumentException if inputs are invalid.
     */
    private void validateInputs(int[] nums, int k) {
        if (nums == null) {
            throw new IllegalArgumentException("Input array cannot be null.");
        }
        if (nums.length == 0) {
            throw new IllegalArgumentException("Input array cannot be empty.");
        }
        if (k <= 0 || k > nums.length) {
            throw new IllegalArgumentException("k is out of bounds. k must be between 1 and array length.");
        }
    }
}
```