```javascript
/**
 * src/problems/binarySearch.js
 * Implementation of standard binary search, and variations for first/last occurrence.
 */

/**
 * Standard Binary Search (Iterative)
 * Finds the index of a target value in a sorted array.
 *
 * @param {number[]} arr - The sorted array to search within.
 * @param {number} target - The value to search for.
 * @returns {number} The index of the target if found, otherwise -1.
 *
 * Time Complexity: O(log N) - The search space is halved in each iteration.
 * Space Complexity: O(1) - Uses a constant amount of extra space for pointers.
 */
function binarySearchIterative(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    // The search space is [left, right] (inclusive)
    while (left <= right) {
        // Calculate mid-point to avoid potential integer overflow:
        // mid = left + floor((right - left) / 2) is safer than (left + right) / 2
        const mid = Math.floor(left + (right - left) / 2);

        if (arr[mid] === target) {
            // Target found at mid
            return mid;
        } else if (arr[mid] < target) {
            // Target is in the right half, update left pointer
            left = mid + 1;
        } else {
            // Target is in the left half, update right pointer
            right = mid - 1;
        }
    }

    // Target not found in the array
    return -1;
}

/**
 * Standard Binary Search (Recursive)
 * Finds the index of a target value in a sorted array using recursion.
 *
 * @param {number[]} arr - The sorted array to search within.
 * @param {number} target - The value to search for.
 * @param {number} [left=0] - The starting index of the current search segment.
 * @param {number} [right=arr.length-1] - The ending index of the current search segment.
 * @returns {number} The index of the target if found, otherwise -1.
 *
 * Time Complexity: O(log N) - Each recursive call halves the search space.
 * Space Complexity: O(log N) - Due to the recursion stack depth.
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    // Base case: If the search space is invalid (left pointer crosses right pointer)
    if (left > right) {
        return -1; // Target not found
    }

    const mid = Math.floor(left + (right - left) / 2);

    if (arr[mid] === target) {
        return mid; // Target found
    } else if (arr[mid] < target) {
        // Target is in the right half
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        // Target is in the left half
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

/**
 * Find First Occurrence of a Target (Iterative)
 * Finds the index of the first occurrence of a target value in a sorted array
 * that may contain duplicates.
 *
 * @param {number[]} arr - The sorted array to search within.
 * @param {number} target - The value to search for.
 * @returns {number} The index of the first occurrence, or -1 if not found.
 *
 * Time Complexity: O(log N) - Standard binary search halving.
 * Space Complexity: O(1) - Constant extra space.
 */
function findFirstOccurrence(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1; // Stores the potential first occurrence index

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (arr[mid] === target) {
            result = mid;       // Found a target, but it might not be the first.
            right = mid - 1;    // Try to find an earlier occurrence in the left half.
        } else if (arr[mid] < target) {
            left = mid + 1;     // Target is in the right half.
        } else {
            right = mid - 1;    // Target is in the left half.
        }
    }
    return result;
}

/**
 * Find Last Occurrence of a Target (Iterative)
 * Finds the index of the last occurrence of a target value in a sorted array
 * that may contain duplicates.
 *
 * @param {number[]} arr - The sorted array to search within.
 * @param {number} target - The value to search for.
 * @returns {number} The index of the last occurrence, or -1 if not found.
 *
 * Time Complexity: O(log N) - Standard binary search halving.
 * Space Complexity: O(1) - Constant extra space.
 */
function findLastOccurrence(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1; // Stores the potential last occurrence index

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (arr[mid] === target) {
            result = mid;       // Found a target, but it might not be the last.
            left = mid + 1;     // Try to find a later occurrence in the right half.
        } else if (arr[mid] < target) {
            left = mid + 1;     // Target is in the right half.
        } else {
            right = mid - 1;    // Target is in the left half.
        }
    }
    return result;
}

module.exports = {
    binarySearchIterative,
    binarySearchRecursive,
    findFirstOccurrence,
    findLastOccurrence
};
```