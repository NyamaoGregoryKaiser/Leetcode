```java
package com.example.sorting.problems;

import com.example.sorting.utils.ArrayUtils;

/**
 * Problem 1: Sort an Array (LeetCode 912 Equivalent)
 *
 * Implement various standard sorting algorithms to sort an integer array in ascending order.
 * This class provides implementations for Merge Sort, Quick Sort, and Heap Sort.
 * Each method sorts the input array in-place.
 */
public class Problem1_SortAnArray {

    /**
     * --- Merge Sort ---
     *
     * Algorithm:
     * 1. Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).
     * 2. Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.
     *
     * Time Complexity: O(N log N) in all cases (best, average, worst) due to its divide-and-conquer nature.
     * Space Complexity: O(N) due to the auxiliary array used during the merge step.
     * Stability: Stable.
     */
    public void mergeSort(int[] nums) {
        if (nums == null || nums.length <= 1) {
            return; // Already sorted or nothing to sort
        }
        mergeSortRecursive(nums, 0, nums.length - 1);
    }

    private void mergeSortRecursive(int[] nums, int left, int right) {
        if (left < right) {
            // Find the middle point
            int mid = left + (right - left) / 2;

            // Sort first and second halves
            mergeSortRecursive(nums, left, mid);
            mergeSortRecursive(nums, mid + 1, right);

            // Merge the sorted halves
            merge(nums, left, mid, right);
        }
    }

    private void merge(int[] nums, int left, int mid, int right) {
        // Create temporary arrays
        int len1 = mid - left + 1;
        int len2 = right - mid;

        int[] leftArr = new int[len1];
        int[] rightArr = new int[len2];

        // Copy data to temp arrays
        System.arraycopy(nums, left, leftArr, 0, len1);
        System.arraycopy(nums, mid + 1, rightArr, 0, len2);

        // Merge the temp arrays back into nums[left..right]
        int i = 0, j = 0; // Initial indices of first and second subarrays
        int k = left;     // Initial index of merged subarray

        while (i < len1 && j < len2) {
            if (leftArr[i] <= rightArr[j]) {
                nums[k] = leftArr[i];
                i++;
            } else {
                nums[k] = rightArr[j];
                j++;
            }
            k++;
        }

        // Copy remaining elements of leftArr[] if any
        while (i < len1) {
            nums[k] = leftArr[i];
            i++;
            k++;
        }

        // Copy remaining elements of rightArr[] if any
        while (j < len2) {
            nums[k] = rightArr[j];
            j++;
            k++;
        }
    }


    /**
     * --- Quick Sort ---
     *
     * Algorithm:
     * 1. Pick an element as a pivot from the array.
     * 2. Partitioning: Rearrange the array such that all elements less than the pivot come before the pivot,
     *    and all elements greater than the pivot come after it. Elements equal to the pivot can go on either side.
     * 3. Recursively apply the above steps to the sub-array of elements with smaller values and separately
     *    to the sub-array of elements with greater values.
     *
     * This implementation uses Lomuto partition scheme and picks the last element as the pivot.
     * For better performance, a random pivot or median-of-three pivot selection is recommended to avoid worst-case.
     *
     * Time Complexity:
     *   - Average: O(N log N)
     *   - Worst: O(N^2) (occurs when pivot selection consistently results in highly unbalanced partitions, e.g., already sorted array with last element as pivot)
     * Space Complexity: O(log N) for recursion stack in average case, O(N) in worst case.
     * Stability: Unstable.
     */
    public void quickSort(int[] nums) {
        if (nums == null || nums.length <= 1) {
            return;
        }
        quickSortRecursive(nums, 0, nums.length - 1);
    }

    private void quickSortRecursive(int[] nums, int low, int high) {
        if (low < high) {
            // Partitioning index: nums[pI] is now at correct place
            int pI = partitionLomuto(nums, low, high);

            // Recursively sort elements before partition and after partition
            quickSortRecursive(nums, low, pI - 1);
            quickSortRecursive(nums, pI + 1, high);
        }
    }

    /**
     * Lomuto partition scheme.
     * Selects the last element as pivot. Places all elements smaller than the pivot to its left,
     * and all greater elements to its right.
     *
     * @param nums The array to be partitioned.
     * @param low  The starting index of the subarray.
     * @param high The ending index of the subarray.
     * @return The final index of the pivot element.
     */
    private int partitionLomuto(int[] nums, int low, int high) {
        int pivot = nums[high]; // Pivot is the last element
        int i = (low - 1);      // Index of smaller element

        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (nums[j] <= pivot) {
                i++;
                ArrayUtils.swap(nums, i, j);
            }
        }
        // Swap pivot (nums[high]) with the element at i+1
        ArrayUtils.swap(nums, i + 1, high);
        return i + 1; // Return the partition index
    }

    // Alternative: Hoare partition scheme, generally more efficient.
    // private int partitionHoare(int[] nums, int low, int high) { /* ... */ }


    /**
     * --- Heap Sort ---
     *
     * Algorithm:
     * 1. Build a max-heap from the input data. A max-heap is a complete binary tree where the value
     *    of each node is greater than or equal to the value of its children.
     * 2. At this point, the largest item is stored at the root of the heap. Replace it with the last
     *    item of the heap, then reduce the size of the heap by 1.
     * 3. Heapify the root of the tree again to maintain the max-heap property.
     * 4. Repeat step 2 until the heap size is 1.
     *
     * Time Complexity: O(N log N) in all cases (best, average, worst) because building the heap takes O(N)
     *                  and N extractions (heapify) take O(log N) each.
     * Space Complexity: O(1) as it is an in-place sorting algorithm.
     * Stability: Unstable.
     */
    public void heapSort(int[] nums) {
        if (nums == null || nums.length <= 1) {
            return;
        }

        int n = nums.length;

        // Build max-heap (rearrange array)
        // Start from the last non-leaf node and heapify downwards
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(nums, n, i);
        }

        // One by one extract an element from heap
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            ArrayUtils.swap(nums, 0, i);

            // Call max heapify on the reduced heap
            heapify(nums, i, 0); // i is the new heap size
        }
    }

    /**
     * To heapify a subtree rooted with node i which is an index in nums[].
     * n is size of heap.
     */
    private void heapify(int[] nums, int n, int i) {
        int largest = i;      // Initialize largest as root
        int left = 2 * i + 1; // Left child
        int right = 2 * i + 2; // Right child

        // If left child is larger than root
        if (left < n && nums[left] > nums[largest]) {
            largest = left;
        }

        // If right child is larger than largest so far
        if (right < n && nums[right] > nums[largest]) {
            largest = right;
        }

        // If largest is not root
        if (largest != i) {
            ArrayUtils.swap(nums, i, largest);

            // Recursively heapify the affected sub-tree
            heapify(nums, n, largest);
        }
    }
}
```