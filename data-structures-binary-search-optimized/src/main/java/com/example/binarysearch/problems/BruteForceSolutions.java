```java
package com.example.binarysearch.problems;

/**
 * This class provides brute-force implementations for some problems
 * where binary search offers a significant performance improvement.
 * These are included for comparison and to demonstrate the efficiency gain.
 */
public class BruteForceSolutions {

    /**
     * Brute-force approach for searching in a sorted array (linear scan).
     * This is the counterpart to standard binary search.
     *
     * @param arr The array to search within.
     * @param target The value to search for.
     * @return The index of the target value if found, otherwise -1.
     *
     * Time Complexity: O(N)
     *   - In the worst case, we might have to iterate through the entire array.
     * Space Complexity: O(1)
     *   - Uses a constant amount of extra space.
     */
    public int linearSearch(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Brute-force approach for finding the first occurrence of a target.
     *
     * @param arr The sorted array.
     * @param target The value to search for.
     * @return The index of the first occurrence of the target, or -1 if not found.
     *
     * Time Complexity: O(N)
     *   - Scans the entire array from left to right.
     * Space Complexity: O(1)
     */
    public int findFirstOccurrenceBruteForce(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Return the first one found
            }
        }
        return -1;
    }

    /**
     * Brute-force approach for finding the last occurrence of a target.
     *
     * @param arr The sorted array.
     * @param target The value to search for.
     * @return The index of the last occurrence of the target, or -1 if not found.
     *
     * Time Complexity: O(N)
     *   - Scans the entire array. Could be optimized to scan from right to left,
     *     but for general comparison, a full scan is fine.
     * Space Complexity: O(1)
     */
    public int findLastOccurrenceBruteForce(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        int lastIndex = -1;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                lastIndex = i; // Keep updating to the latest found index
            } else if (lastIndex != -1 && arr[i] > target) {
                // Optimization for sorted array: if we found a target previously
                // and current element is greater, no more targets will be found.
                break;
            }
        }
        return lastIndex;
    }


    /**
     * Brute-force approach for searching in a rotated sorted array (linear scan).
     *
     * @param arr The rotated sorted array.
     * @param target The value to search for.
     * @return The index of the target value if found, otherwise -1.
     *
     * Time Complexity: O(N)
     *   - Iterates through the entire array in the worst case.
     * Space Complexity: O(1)
     *   - Constant extra space.
     */
    public int searchInRotatedSortedArrayBruteForce(int[] arr, int target) {
        if (arr == null || arr.length == 0) {
            return -1;
        }

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Brute-force approach for finding the minimum in a rotated sorted array.
     *
     * @param arr The rotated sorted array.
     * @return The minimum element in the array.
     *
     * Time Complexity: O(N)
     *   - Iterates through the entire array to find the minimum.
     * Space Complexity: O(1)
     *   - Constant extra space.
     */
    public int findMinInRotatedSortedArrayBruteForce(int[] arr) {
        if (arr == null || arr.length == 0) {
            throw new IllegalArgumentException("Array cannot be null or empty.");
        }

        int minVal = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < minVal) {
                minVal = arr[i];
            }
        }
        return minVal;
    }

    /**
     * Brute-force approach for calculating integer square root.
     * Iterates from 0 up to x, checking squares.
     *
     * @param x The non-negative integer.
     * @return The integer part of the square root.
     *
     * Time Complexity: O(sqrt(X))
     *   - Iterates up to the square root of X.
     * Space Complexity: O(1)
     */
    public int mySqrtBruteForce(int x) {
        if (x < 0) {
            throw new IllegalArgumentException("Input must be a non-negative integer.");
        }
        if (x == 0) {
            return 0;
        }

        // Iterate from 1 up to x. The square root will not exceed x.
        // Actually, it won't exceed x/2 for x > 1, but for safety, iterating to x is fine.
        // Even better, iterate up to (x/2) + 1 to avoid overflow for square calculation if x is large.
        // Or check `i <= x / i` to avoid overflow.
        for (long i = 1; i <= x; i++) { // Using long for 'i' to prevent i*i overflow
            long square = i * i;
            if (square == x) {
                return (int) i;
            } else if (square > x) {
                // The square root is between i-1 and i. Since we need integer part, return i-1.
                return (int) (i - 1);
            }
            // For large x, 'i*i' might overflow if 'i' is an int.
            // A more robust check: `if (i > x / i)` prevents overflow and early exit.
            // Example: i=46341 for int MAX_INT, (46341*46341) overflows. But 46341 > 2147483647 / 46341 is false.
        }
        return 0; // Should not be reached for x >= 1
    }

    /**
     * Brute-force approach for finding a peak element.
     * Iterates through the array and checks each element against its neighbors.
     *
     * @param nums The integer array.
     * @return The index of any peak element.
     *
     * Time Complexity: O(N)
     *   - Iterates through the array to check each element.
     * Space Complexity: O(1)
     */
    public int findPeakElementBruteForce(int[] nums) {
        if (nums == null || nums.length == 0) {
            return -1;
        }
        if (nums.length == 1) {
            return 0;
        }

        // Check first element
        if (nums[0] > nums[1]) {
            return 0;
        }
        // Check last element
        if (nums[nums.length - 1] > nums[nums.length - 2]) {
            return nums.length - 1;
        }

        // Check middle elements
        for (int i = 1; i < nums.length - 1; i++) {
            if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
                return i;
            }
        }
        return -1; // Should not be reached for valid problems (guaranteed peak exists)
    }
}
```