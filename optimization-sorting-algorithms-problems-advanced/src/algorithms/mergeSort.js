/**
 * src/algorithms/mergeSort.js
 *
 * Implements the Merge Sort algorithm.
 *
 * Merge Sort is a divide-and-conquer algorithm. It recursively divides the array
 * into two halves until individual elements are reached, then merges them back
 * in sorted order.
 *
 * @param {Array<number>} arr The array of numbers to be sorted.
 * @returns {Array<number>} The sorted array.
 *
 * Time Complexity:
 *   - Worst Case: O(N log N)
 *   - Average Case: O(N log N)
 *   - Best Case: O(N log N)
 * Space Complexity: O(N) auxiliary space (due to temporary arrays used during merging).
 * Stability: Stable.
 */
function mergeSort(arr) {
    const n = arr.length;

    // Base case: if the array has 0 or 1 element, it's already sorted.
    if (n <= 1) {
        return arr;
    }

    // Step 1: Divide the array into two halves
    const mid = Math.floor(n / 2);
    const leftHalf = arr.slice(0, mid);
    const rightHalf = arr.slice(mid);

    // Step 2: Recursively sort each half
    const sortedLeft = mergeSort(leftHalf);
    const sortedRight = mergeSort(rightHalf);

    // Step 3: Merge the two sorted halves back into a single sorted array
    return merge(sortedLeft, sortedRight);
}

/**
 * Helper function to merge two sorted arrays into a single sorted array.
 *
 * @param {Array<number>} left The left sorted array.
 * @param {Array<number>} right The right sorted array.
 * @returns {Array<number>} A new merged and sorted array.
 */
function merge(left, right) {
    const result = [];
    let i = 0; // Pointer for the left array
    let j = 0; // Pointer for the right array

    // Compare elements from both arrays and add the smaller one to the result
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // Add any remaining elements from the left array (if any)
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    // Add any remaining elements from the right array (if any)
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    return result;
}

module.exports = mergeSort;