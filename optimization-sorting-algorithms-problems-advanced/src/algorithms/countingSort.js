/**
 * src/algorithms/countingSort.js
 *
 * Implements the Counting Sort algorithm.
 *
 * Counting Sort is a non-comparison sorting algorithm that is effective for sorting
 * integers within a specific range. It works by counting the number of occurrences
 * of each distinct element in the input array.
 *
 * Constraints:
 *   - Works best when the range of input numbers (k) is not significantly larger
 *     than the number of elements (N).
 *   - Typically used for non-negative integers.
 *
 * @param {Array<number>} arr The array of non-negative integers to be sorted.
 * @returns {Array<number>} The sorted array.
 *
 * Time Complexity: O(N + K), where N is the number of elements and K is the range of input values (max - min + 1).
 * Space Complexity: O(N + K) auxiliary space (for count array and output array).
 * Stability: Stable (if implemented correctly, especially step 4).
 */
function countingSort(arr) {
    const n = arr.length;

    // Handle edge cases: empty or single-element array
    if (n <= 1) {
        return arr;
    }

    // Step 1: Find the maximum value in the input array to determine the range.
    // If negative numbers are possible, you'd need to find min and shift values.
    // For this implementation, we assume non-negative integers.
    let max = arr[0];
    for (let i = 1; i < n; i++) {
        if (arr[i] < 0) {
            // Counting sort as implemented here is for non-negative integers.
            // For negative, need to find min and adjust indices (e.g., arr[i] - min).
            throw new Error("Counting Sort in this implementation does not support negative numbers directly.");
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    // Step 2: Create a count array to store the frequency of each element.
    // The size of the count array will be (max + 1) to accommodate values from 0 to max.
    const count = new Array(max + 1).fill(0);

    // Step 3: Populate the count array.
    // count[x] will store the number of times x appears in arr.
    for (let i = 0; i < n; i++) {
        count[arr[i]]++;
    }

    // Step 4: Modify the count array to store the actual position of each element
    // in the output array. This is done by summing up the counts cumulatively.
    // After this step, count[x] will store the number of elements less than or equal to x.
    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    // Step 5: Build the output array.
    // Iterate through the input array in reverse to ensure stability.
    // For each element, place it in its correct position in the output array
    // using the cumulative count, then decrement the count for that element.
    const output = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
        const value = arr[i];
        output[count[value] - 1] = value; // Place value at its correct sorted position
        count[value]--; // Decrement count for stability and correct placement of duplicates
    }

    // Copy the sorted elements from output array back to the original array (or return output).
    // In-place modification is often not strictly O(1) space with counting sort,
    // as an auxiliary output array is generally required.
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }

    return arr; // Or return output; depending on whether in-place modification is required.
}

module.exports = countingSort;