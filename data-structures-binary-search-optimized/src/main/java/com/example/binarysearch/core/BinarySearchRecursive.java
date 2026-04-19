```java
package com.example.binarysearch.core;

/**
 * Implements the standard binary search algorithm recursively.
 * This approach divides the problem into smaller subproblems and calls itself for those subproblems.
 */
public class BinarySearchRecursive {

    /**
     * Public method to initiate the recursive binary search.
     *
     * @param arr The sorted array to search within.
     * @param target The value to search for.
     * @return The index of the target value if found, otherwise -1.
     *
     * Time Complexity: O(log N)
     *   - Each recursive call halves the search space.
     * Space Complexity: O(log N)
     *   - Due to the recursive call stack. In the worst case (target not found),
     *     the depth of the recursion is log N.
     */
    public int search(int[] arr, int target) {
        // Handle edge case: null or empty array
        if (arr == null || arr.length == 0) {
            return -1;
        }
        return searchHelper(arr, target, 0, arr.length - 1);
    }

    /**
     * Helper method that performs the actual recursive binary search.
     *
     * @param arr The sorted array.
     * @param target The value to search for.
     * @param low The starting index of the current search interval.
     * @param high The ending index of the current search interval.
     * @return The index of the target value if found, otherwise -1.
     */
    private int searchHelper(int[] arr, int target, int low, int high) {
        // Base case 1: Search space is invalid. Target not found.
        if (low > high) {
            return -1;
        }

        // Calculate the middle index.
        // Prevents potential integer overflow.
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            // Base case 2: Target found at mid index.
            return mid;
        } else if (arr[mid] < target) {
            // Target is in the right half. Recurse on the right subarray.
            return searchHelper(arr, target, mid + 1, high);
        } else { // arr[mid] > target
            // Target is in the left half. Recurse on the left subarray.
            return searchHelper(arr, target, low, mid - 1);
        }
    }
}
```