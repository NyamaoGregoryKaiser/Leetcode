```java
package com.example.sorting.algorithms;

/**
 * An abstract base class for all sorting algorithms.
 * Provides common utility methods like swapping elements.
 */
public abstract class AbstractSorter {

    /**
     * Sorts the given array of integers in ascending order.
     * This is an abstract method that concrete sorting algorithms must implement.
     *
     * @param arr The array to be sorted.
     * @throws IllegalArgumentException if the input array is null.
     */
    public abstract void sort(int[] arr);

    /**
     * Swaps two elements in an array.
     *
     * @param arr The array in which to swap elements.
     * @param i   The index of the first element.
     * @param j   The index of the second element.
     */
    protected void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    /**
     * Checks if the array is null and throws an exception if it is.
     *
     * @param arr The array to check.
     * @throws IllegalArgumentException if the array is null.
     */
    protected void validateArray(int[] arr) {
        if (arr == null) {
            throw new IllegalArgumentException("Input array cannot be null.");
        }
    }
}
```