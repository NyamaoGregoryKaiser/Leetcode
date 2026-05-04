```javascript
/**
 * Problem 1: Rotate Array
 *
 * Given an array, rotate the array to the right by `k` steps, where `k` is non-negative.
 *
 * Example 1:
 * Input: nums = [1,2,3,4,5,6,7], k = 3
 * Output: [5,6,7,1,2,3,4]
 * Explanation:
 * rotate 1 steps to the right: [7,1,2,3,4,5,6]
 * rotate 2 steps to the right: [6,7,1,2,3,4,5]
 * rotate 3 steps to the right: [5,6,7,1,2,3,4]
 *
 * Example 2:
 * Input: nums = [-1,-100,3,99], k = 2
 * Output: [3,99,-1,-100]
 * Explanation:
 * rotate 1 steps to the right: [99,-1,-100,3]
 * rotate 2 steps to the right: [3,99,-1,-100]
 *
 * Constraints:
 * 1 <= nums.length <= 10^5
 * -2^31 <= nums[i] <= 2^31 - 1
 * 0 <= k <= 10^5
 */

/**
 * Approach 1: Using an Extra Array
 *
 * This approach creates a new array and places each element at its new rotated position.
 * The element at index `i` in the original array moves to `(i + k) % n` in the new array.
 * Finally, the elements are copied back to the original array.
 *
 * @param {number[]} nums The array to rotate.
 * @param {number} k The number of steps to rotate.
 * @returns {number[]} The rotated array (modifies original `nums` in place by copying back).
 */
function rotateArrayByExtraArray(nums, k) {
    const n = nums.length;
    if (n === 0 || k === 0) {
        return nums;
    }

    // Normalize k: k can be larger than n, so we only need to rotate by k % n.
    k = k % n;
    if (k === 0) {
        return nums;
    }

    // Create a new array to store rotated elements
    const newArr = new Array(n);

    // Place each element from original `nums` into its new position in `newArr`
    for (let i = 0; i < n; i++) {
        // The element at original index `i` moves to `(i + k) % n`.
        newArr[(i + k) % n] = nums[i];
    }

    // Copy elements back to the original `nums` array
    for (let i = 0; i < n; i++) {
        nums[i] = newArr[i];
    }

    return nums; // Return nums, which has been modified in place.
}

/**
 * Complexity Analysis for rotateArrayByExtraArray:
 * - Time Complexity: O(N)
 *   - One loop to populate `newArr` (N operations).
 *   - One loop to copy back to `nums` (N operations).
 *   - Total: O(N) + O(N) = O(N).
 * - Space Complexity: O(N)
 *   - An auxiliary `newArr` of size N is created.
 */


/**
 * Helper function to reverse a portion of an array in place.
 * Used by the Optimal Reversal Approach.
 *
 * @param {number[]} arr The array to modify.
 * @param {number} start The starting index (inclusive).
 * @param {number} end The ending index (inclusive).
 */
function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]]; // Swap elements
        start++;
        end--;
    }
}

/**
 * Approach 2: Optimal - Using Reversal (In-place)
 *
 * This approach utilizes the property that rotating an array can be achieved by a series of reversals.
 *
 * Steps:
 * 1. Normalize k: `k = k % n`. If k is 0, no rotation needed.
 * 2. Reverse the entire array.
 *    Example: [1,2,3,4,5,6,7], k=3 -> [7,6,5,4,3,2,1]
 * 3. Reverse the first `k` elements.
 *    Example: [7,6,5,4,3,2,1] -> reverse first 3 -> [5,6,7,4,3,2,1]
 * 4. Reverse the remaining `n - k` elements.
 *    Example: [5,6,7,4,3,2,1] -> reverse remaining 4 -> [5,6,7,1,2,3,4] (Desired output!)
 *
 * This method is highly efficient as it performs operations in-place without requiring extra space.
 *
 * @param {number[]} nums The array to rotate (modified in-place).
 * @param {number} k The number of steps to rotate.
 * @returns {void} The array `nums` is modified directly.
 */
function rotateArrayByReversal(nums, k) {
    const n = nums.length;
    if (n === 0 || k === 0) {
        return; // No rotation needed for empty array or zero steps
    }

    // Normalize k: k can be larger than n.
    // The effective rotation is k % n.
    k = k % n;
    if (k === 0) {
        return; // No effective rotation after normalization
    }

    // Step 1: Reverse the entire array
    // Example: [1,2,3,4,5,6,7] -> [7,6,5,4,3,2,1]
    reverse(nums, 0, n - 1);

    // Step 2: Reverse the first k elements
    // Example: [7,6,5,4,3,2,1] -> reverse(0, 2) -> [5,6,7,4,3,2,1]
    reverse(nums, 0, k - 1);

    // Step 3: Reverse the remaining n-k elements
    // Example: [5,6,7,4,3,2,1] -> reverse(3, 6) -> [5,6,7,1,2,3,4]
    reverse(nums, k, n - 1);
}

/**
 * Complexity Analysis for rotateArrayByReversal:
 * - Time Complexity: O(N)
 *   - Each element is reversed at most three times (once in each call to `reverse`).
 *   - The `reverse` function takes O(length of subarray) time.
 *   - Total: O(N) + O(k) + O(N-k) = O(N).
 * - Space Complexity: O(1)
 *   - All operations are performed in-place. No extra auxiliary space proportional to N is used.
 */

/**
 * Approach 3: Using JavaScript's built-in `splice` and `concat` (less optimal for in-place requirement)
 * This approach is concise in JavaScript but generally not what interviewers look for
 * if they emphasize in-place or manual manipulation. It creates new arrays.
 *
 * @param {number[]} nums The array to rotate (modified in-place by reassigning).
 * @param {number} k The number of steps to rotate.
 * @returns {number[]} The rotated array.
 */
function rotateArrayBySplice(nums, k) {
    const n = nums.length;
    if (n === 0 || k === 0) {
        return nums;
    }

    k = k % n;
    if (k === 0) {
        return nums;
    }

    // Extract the last k elements
    const rotatedPart = nums.splice(n - k, k);

    // Prepend the extracted part to the beginning of the remaining elements
    // This directly modifies nums if it's a reference, but technically splice returns new parts,
    // and unshift/concat for arrays can be O(N).
    nums.unshift(...rotatedPart);

    return nums;
}

/**
 * Complexity Analysis for rotateArrayBySplice:
 * - Time Complexity: O(N)
 *   - `splice(n - k, k)` takes O(k) time to extract elements and O(N-k) to shift remaining elements. Total O(N).
 *   - `unshift(...rotatedPart)` takes O(k) to prepend and O(N) to shift existing elements. Total O(N).
 *   - Overall: O(N).
 * - Space Complexity: O(N)
 *   - `splice` creates a new array for the extracted part (O(k)).
 *   - `unshift` operation, especially with spread, often involves creating a new array internally or significant reallocations.
 *   - Overall: O(N) for intermediate array creations.
 */


module.exports = {
    rotateArrayByExtraArray,
    rotateArrayByReversal, // Optimal in-place solution
    rotateArrayBySplice,
};
```