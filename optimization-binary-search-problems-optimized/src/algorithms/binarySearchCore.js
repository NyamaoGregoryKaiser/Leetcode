/**
 * @fileoverview Core Binary Search implementations: iterative and recursive.
 * These are generic functions that search for an exact target in a sorted array.
 */

/**
 * Performs an iterative binary search to find the index of a target value in a sorted array.
 * If multiple occurrences exist, it returns the index of any occurrence.
 *
 * Time Complexity: O(log N) - The search space is halved in each step.
 * Space Complexity: O(1) - Only a few variables are used, regardless of input size.
 *
 * @param {number[]} arr The sorted array to search within.
 * @param {number} target The value to search for.
 * @returns {number} The index of the target if found, otherwise -1.
 */
function findTargetIterative(arr, target) {
    if (!arr || arr.length === 0) {
        return -1;
    }

    let low = 0;
    let high = arr.length - 1;

    // Continue as long as the search space is valid (low <= high means at least one element)
    while (low <= high) {
        // Calculate the middle index. Using low + (high - low) / 2 to prevent potential
        // integer overflow if low and high are very large (though less critical in JS).
        const mid = Math.floor(low + (high - low) / 2);

        if (arr[mid] === target) {
            return mid; // Target found at mid index
        } else if (arr[mid] < target) {
            // Target is in the right half, so discard the left half (including mid)
            low = mid + 1;
        } else {
            // Target is in the left half, so discard the right half (including mid)
            high = mid - 1;
        }
    }

    return -1; // Target not found in the array
}

/**
 * Performs a recursive binary search to find the index of a target value in a sorted array.
 * If multiple occurrences exist, it returns the index of any occurrence.
 *
 * Time Complexity: O(log N) - The search space is halved in each recursive call.
 * Space Complexity: O(log N) - Due to the recursion stack depth.
 *
 * @param {number[]} arr The sorted array to search within.
 * @param {number} target The value to search for.
 * @param {number} [low=0] The starting index of the current search space (inclusive).
 * @param {number} [high=arr.length-1] The ending index of the current search space (inclusive).
 * @returns {number} The index of the target if found, otherwise -1.
 */
function findTargetRecursive(arr, target, low, high) {
    if (!arr || arr.length === 0) {
        return -1;
    }

    // Initialize low and high for the initial call if not provided
    if (low === undefined) low = 0;
    if (high === undefined) high = arr.length - 1;

    // Base case: If low crosses high, the search space is empty
    if (low > high) {
        return -1;
    }

    const mid = Math.floor(low + (high - low) / 2);

    if (arr[mid] === target) {
        return mid; // Target found
    } else if (arr[mid] < target) {
        // Target is in the right half
        return findTargetRecursive(arr, target, mid + 1, high);
    } else {
        // Target is in the left half
        return findTargetRecursive(arr, target, low, mid - 1);
    }
}

module.exports = {
    findTargetIterative,
    findTargetRecursive
};