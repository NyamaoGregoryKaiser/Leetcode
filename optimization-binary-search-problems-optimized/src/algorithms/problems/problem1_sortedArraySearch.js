/**
 * @fileoverview Problem 1: Search for a target in a sorted array.
 * This file demonstrates the standard iterative binary search and advanced templates
 * for finding first/last occurrences.
 */

/**
 * Implements the standard binary search to find the index of any occurrence of the target.
 * This is identical to `binarySearchCore.js#findTargetIterative` but included here for completeness
 * within the problem context.
 *
 * Time Complexity: O(log N) - The search space is halved in each step.
 * Space Complexity: O(1) - Constant space used.
 *
 * @param {number[]} nums The sorted array to search within.
 * @param {number} target The value to search for.
 * @returns {number} The index of any occurrence of the target if found, otherwise -1.
 */
function searchAnyOccurrence(nums, target) {
    if (!nums || nums.length === 0) {
        return -1;
    }

    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);

        if (nums[mid] === target) {
            return mid; // Found any occurrence
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1; // Target not found
}

/**
 * Finds the index of the first occurrence of the target in a sorted array.
 * This uses a modified binary search template to continue searching in the left half
 * even after a match is found, to ensure we get the absolute first index.
 *
 * Time Complexity: O(log N) - Similar to standard binary search.
 * Space Complexity: O(1) - Constant space used.
 *
 * @param {number[]} nums The sorted array to search within.
 * @param {number} target The value to search for.
 * @returns {number} The index of the first occurrence of the target, or -1 if not found.
 */
function findFirstOccurrence(nums, target) {
    if (!nums || nums.length === 0) {
        return -1;
    }

    let low = 0;
    let high = nums.length - 1;
    let firstOccurrence = -1; // Stores the potential first occurrence

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);

        if (nums[mid] === target) {
            firstOccurrence = mid; // Found a target, but it might not be the first
            high = mid - 1;        // Try to find an earlier occurrence in the left half
        } else if (nums[mid] < target) {
            low = mid + 1;         // Target is in the right half
        } else {
            high = mid - 1;        // Target is in the left half
        }
    }
    return firstOccurrence;
}

/**
 * Finds the index of the last occurrence of the target in a sorted array.
 * This uses a modified binary search template to continue searching in the right half
 * even after a match is found, to ensure we get the absolute last index.
 *
 * Time Complexity: O(log N) - Similar to standard binary search.
 * Space Complexity: O(1) - Constant space used.
 *
 * @param {number[]} nums The sorted array to search within.
 * @param {number} target The value to search for.
 * @returns {number} The index of the last occurrence of the target, or -1 if not found.
 */
function findLastOccurrence(nums, target) {
    if (!nums || nums.length === 0) {
        return -1;
    }

    let low = 0;
    let high = nums.length - 1;
    let lastOccurrence = -1; // Stores the potential last occurrence

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);

        if (nums[mid] === target) {
            lastOccurrence = mid;  // Found a target, but it might not be the last
            low = mid + 1;         // Try to find a later occurrence in the right half
        } else if (nums[mid] < target) {
            low = mid + 1;         // Target is in the right half
        } else {
            high = mid - 1;        // Target is in the left half
        }
    }
    return lastOccurrence;
}

/**
 * Finds the count of occurrences of the target in a sorted array.
 * This leverages findFirstOccurrence and findLastOccurrence.
 *
 * Time Complexity: O(log N) - Two binary searches.
 * Space Complexity: O(1) - Constant space used.
 *
 * @param {number[]} nums The sorted array to search within.
 * @param {number} target The value to search for.
 * @returns {number} The count of target occurrences, or 0 if not found.
 */
function countOccurrences(nums, target) {
    const first = findFirstOccurrence(nums, target);
    if (first === -1) {
        return 0; // Target not found
    }
    const last = findLastOccurrence(nums, target);
    // Since we know 'first' is not -1, 'last' will also not be -1 if first is valid
    return last - first + 1;
}


// --- Brute Force Comparison (for Additional Implementation Files section) ---
/**
 * Implements a brute-force linear search to find the index of a target value.
 * This is provided for comparison to highlight the efficiency of Binary Search.
 *
 * Time Complexity: O(N) - In the worst case, every element must be checked.
 * Space Complexity: O(1) - Constant space used.
 *
 * @param {number[]} arr The array to search within.
 * @param {number} target The value to search for.
 * @returns {number} The index of the first occurrence of the target, or -1 if not found.
 */
function linearSearch(arr, target) {
    if (!arr || arr.length === 0) {
        return -1;
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

module.exports = {
    searchAnyOccurrence,
    findFirstOccurrence,
    findLastOccurrence,
    countOccurrences,
    linearSearch // Included for comparison
};