/**
 * @fileoverview Problem 2: Search in a Rotated Sorted Array.
 * Given a sorted array that has been rotated, find the index of a target element.
 * The array is initially sorted in ascending order and then rotated at some pivot unknown to you.
 * (e.g., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).
 * You are given a target value to search. If found in the array return its index, otherwise return -1.
 * You may assume no duplicate exists in the array.
 */

/**
 * Searches for a target value in a rotated sorted array.
 * The array is sorted but has been rotated at some pivot point.
 *
 * Time Complexity: O(log N) - Similar to standard binary search, we halve the search space in each step.
 * Space Complexity: O(1) - Constant space used.
 *
 * @param {number[]} nums The rotated sorted array to search within.
 * @param {number} target The value to search for.
 * @returns {number} The index of the target if found, otherwise -1.
 */
function searchRotated(nums, target) {
    if (!nums || nums.length === 0) {
        return -1;
    }

    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);

        if (nums[mid] === target) {
            return mid; // Target found
        }

        // Determine which half is sorted
        // Case 1: Left half is sorted (nums[low] <= nums[mid])
        if (nums[low] <= nums[mid]) {
            // Check if target is within the sorted left half
            if (target >= nums[low] && target < nums[mid]) {
                high = mid - 1; // Target is in the left sorted half
            } else {
                low = mid + 1;  // Target is in the right (unsorted or rotated) half
            }
        }
        // Case 2: Right half is sorted (nums[low] > nums[mid]), meaning the pivot is in the left half
        else {
            // Check if target is within the sorted right half
            if (target > nums[mid] && target <= nums[high]) {
                low = mid + 1;  // Target is in the right sorted half
            } else {
                high = mid - 1; // Target is in the left (unsorted or rotated) half
            }
        }
    }

    return -1; // Target not found
}

module.exports = {
    searchRotated
};