```java
package com.example.binarysearch.core;

/**
 * Implements the standard binary search algorithm iteratively.
 * This approach uses a while loop to repeatedly divide the search interval in half.
 */
public class BinarySearchIterative {

    /**
     * Searches for a target value in a sorted array using the iterative binary search algorithm.
     *
     * @param arr The sorted array to search within.
     * @param target The value to search for.
     * @return The index of the target value if found, otherwise -1.
     *
     * Time Complexity: O(log N)
     *   - In each step, the search space is halved.
     *   - This logarithmic reduction leads to a very efficient search for large arrays.
     * Space Complexity: O(1)
     *   - Only a few variables (low, high, mid) are used, regardless of the input array size.
     */
    public int search(int[] arr, int target) {
        // Handle edge case: null or empty array
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int low = 0;
        int high = arr.length - 1;

        // The loop continues as long as the search space is valid (low <= high).
        // If low > high, it means the target has not been found in the array.
        while (low <= high) {
            // Calculate the middle index.
            // Using `low + (high - low) / 2` prevents potential integer overflow
            // that could occur with `(low + high) / 2` if low and high are very large.
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                // Target found at mid index.
                return mid;
            } else if (arr[mid] < target) {
                // If the middle element is less than the target,
                // the target must be in the right half (if it exists).
                // So, move the 'low' pointer to `mid + 1`.
                low = mid + 1;
            } else { // arr[mid] > target
                // If the middle element is greater than the target,
                // the target must be in the left half (if it exists).
                // So, move the 'high' pointer to `mid - 1`.
                high = mid - 1;
            }
        }

        // Target not found in the array.
        return -1;
    }
}
```