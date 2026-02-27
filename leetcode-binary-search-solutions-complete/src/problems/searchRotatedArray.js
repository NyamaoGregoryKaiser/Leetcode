```javascript
/**
 * src/problems/searchRotatedArray.js
 * Implements binary search for a target in a rotated sorted array.
 */

/**
 * Search in Rotated Sorted Array (Optimized)
 *
 * Given a sorted array that has been rotated at some pivot unknown to you beforehand
 * (e.g., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`).
 * Search for a target value. If it's not in the array, return -1.
 * Assume no duplicate values exist in the array.
 *
 * @param {number[]} nums - The rotated sorted array.
 * @param {number} target - The value to search for.
 * @returns {number} The index of the target if found, otherwise -1.
 *
 * Time Complexity: O(log N) - Each iteration halves the search space.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
function searchRotatedArray(nums, target) {
    if (!nums || nums.length === 0) {
        return -1;
    }

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Determine which half is sorted
        // Case 1: Left half is sorted (nums[left] <= nums[mid])
        if (nums[left] <= nums[mid]) {
            // Check if target is within the sorted left half
            if (target >= nums[left] && target < nums[mid]) {
                // Target is in the sorted left half, so search there
                right = mid - 1;
            } else {
                // Target is in the unsorted right half (or not present)
                left = mid + 1;
            }
        }
        // Case 2: Right half is sorted (nums[left] > nums[mid])
        // This implies the pivot is in the left half, and the right half is sorted
        else {
            // Check if target is within the sorted right half
            if (target > nums[mid] && target <= nums[right]) {
                // Target is in the sorted right half, so search there
                left = mid + 1;
            } else {
                // Target is in the unsorted left half (or not present)
                right = mid - 1;
            }
        }
    }

    // Target not found
    return -1;
}

/**
 * Search in Rotated Sorted Array (Brute Force - Linear Scan)
 *
 * This function provides a brute-force approach for comparison.
 * It linearly scans the entire array to find the target.
 *
 * @param {number[]} nums - The rotated sorted array.
 * @param {number} target - The value to search for.
 * @returns {number} The index of the target if found, otherwise -1.
 *
 * Time Complexity: O(N) - In the worst case, it iterates through all N elements.
 * Space Complexity: O(1) - Uses a constant amount of extra space.
 */
function searchRotatedArrayBruteForce(nums, target) {
    if (!nums || nums.length === 0) {
        return -1;
    }

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            return i;
        }
    }

    return -1;
}

module.exports = {
    searchRotatedArray,
    searchRotatedArrayBruteForce
};
```