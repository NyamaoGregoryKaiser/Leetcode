```java
package com.example;

import java.util.Arrays;

public class BinarySearch {

    // Standard Binary Search
    public static int binarySearch(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2; // Avoid overflow
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1; // Target not found
    }


    // Find First and Last Occurrence (TODO: Implement)
    public static int[] findFirstAndLast(int[] nums, int target) {
        // TODO: Implement this function
        return new int[0]; // Placeholder
    }


    // Find Closest Element (TODO: Implement)
    public static int findClosest(int[] nums, int target) {
        // TODO: Implement this function
        return 0; // Placeholder
    }

    // Search in Rotated Sorted Array (TODO: Implement)
    public static int searchRotated(int[] nums, int target) {
        // TODO: Implement this function
        return 0; // Placeholder
    }

    // Search Range in Sorted Matrix (TODO: Implement)
    public static int[] searchMatrix(int[][] matrix, int target) {
        // TODO: Implement this function
        return new int[0]; // Placeholder
    }


    public static void main(String[] args) {
        int[] nums = {2, 5, 7, 8, 11, 12};
        int target = 11;
        System.out.println("Standard Binary Search: " + binarySearch(nums, target));


        //Test other functions here
    }
}
```