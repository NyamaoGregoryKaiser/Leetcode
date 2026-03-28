```java
package com.example.sorting.algorithms;

/**
 * Implements the Heap Sort algorithm.
 * Heap Sort is a comparison-based sorting technique based on binary heap data structure.
 * It is similar to selection sort where we first find the maximum element and place it
 * at the end. We repeat the same process for the remaining elements.
 *
 * <p>The main idea is to first build a Max-Heap from the input data. Then, repeatedly,
 * the largest element (root of the heap) is extracted and placed at the end of the array.
 * The heap is then re-heapified for the remaining elements.
 */
public class HeapSort extends AbstractSorter {

    /**
     * Sorts an array of integers using the Heap Sort algorithm.
     *
     * <p>Time Complexity:
     * <ul>
     *   <li>Worst Case: O(n log n)</li>
     *   <li>Average Case: O(n log n)</li>
     *   <li>Best Case: O(n log n)</li>
     * </ul>
     * This is because building the heap takes O(n) time, and then performing N
     * extract-max operations (each taking O(log n) time) gives O(n log n).
     *
     * <p>Space Complexity: O(1) - It's an in-place sorting algorithm, requiring only a constant
     * amount of extra memory for temporary variables.
     *
     * <p>Stability: Unstable - The relative order of equal elements is generally not preserved.
     *
     * @param arr The array of integers to be sorted.
     * @throws IllegalArgumentException if the input array is null.
     */
    @Override
    public void sort(int[] arr) {
        validateArray(arr);
        int n = arr.length;
        if (n <= 1) { // An array with 0 or 1 element is already sorted
            return;
        }

        // 1. Build a max-heap (rearrange array)
        // Start from the last non-leaf node and heapify upwards
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // 2. One by one extract an element from heap
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            swap(arr, 0, i);

            // Call max heapify on the reduced heap
            heapify(arr, i, 0); // i is the new size of the heap
        }
    }

    /**
     * To heapify a subtree rooted with node 'i' which is an index in arr[].
     * 'n' is size of heap.
     *
     * @param arr The array representing the heap.
     * @param n   The current size of the heap (number of elements to consider).
     * @param i   The root index of the subtree to heapify.
     */
    private void heapify(int[] arr, int n, int i) {
        int largest = i;       // Initialize largest as root
        int left = 2 * i + 1;  // Left child
        int right = 2 * i + 2; // Right child

        // If left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        // If right child is larger than largest so far
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        // If largest is not root
        if (largest != i) {
            swap(arr, i, largest);

            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
    }
}
```