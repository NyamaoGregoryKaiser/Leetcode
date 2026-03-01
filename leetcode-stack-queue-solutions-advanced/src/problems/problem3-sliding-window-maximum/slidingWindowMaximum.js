/**
 * @file Implements the optimal solution for the Sliding Window Maximum problem using a Deque.
 * @module problems/slidingWindowMaximum
 */

const { Deque } = require('@datastructures-js/deque'); // Using an external Deque for simplicity and robustness

/**
 * Finds the maximum value within each sliding window of size `k` in an array `nums`.
 *
 * This optimal solution uses a **double-ended queue (deque)** to store indices of elements
 * in the current window. The deque is maintained in **monotonically decreasing order**
 * with respect to the values at those indices.
 *
 * Algorithm Steps:
 * 1. Initialize an empty deque and an empty result array.
 * 2. Iterate through the array `nums` with index `i` from `0` to `n-1`:
 *    a. **Remove elements outside the window:** If the front of the deque (the oldest element's index)
 *       is `i - k`, it means this element is no longer in the current window. Remove it from the front.
 *    b. **Maintain monotonic decreasing order:** While the deque is not empty AND the element at the
 *       back of the deque (`nums[deque.back()]`) is less than or equal to the current element (`nums[i]`),
 *       remove elements from the back of the deque. This ensures that the deque only contains indices
 *       of relevant elements in decreasing order of their values. If `nums[i]` is larger, it makes
 *       all smaller elements before it irrelevant for future maximums within this window.
 *    c. **Add current element:** Push the current index `i` to the back of the deque.
 *    d. **Record maximum:** If `i` is greater than or equal to `k - 1` (meaning the window is fully formed),
 *       the element at the front of the deque (`nums[deque.front()]`) is the maximum for the current window.
 *       Add it to the result array.
 *
 * @param {number[]} nums The input array of integers.
 * @param {number} k The size of the sliding window.
 * @returns {number[]} An array containing the maximum value for each sliding window.
 *
 * @example
 * slidingWindowMaximum([1, 3, -1, -3, 5, 3, 6, 7], 3); // -> [3, 3, 5, 5, 6, 7]
 * slidingWindowMaximum([1], 1); // -> [1]
 * slidingWindowMaximum([1, 2, 3, 4, 5], 3); // -> [3, 4, 5]
 * slidingWindowMaximum([5, 4, 3, 2, 1], 3); // -> [5, 4, 3]
 * slidingWindowMaximum([], 0); // -> []
 */
function slidingWindowMaximum(nums, k) {
    if (k <= 0 || !nums || nums.length === 0) {
        return [];
    }
    if (k === 1) {
        return nums;
    }
    if (k > nums.length) {
        // If k is larger than the array length, there's only one "window" which is the entire array.
        // The maximum for this single window is the max of the entire array.
        return [Math.max(...nums)];
    }

    const result = [];
    // Using a Deque from '@datastructures-js/deque'.
    // A Deque (double-ended queue) allows adding/removing from both ends in O(1).
    // Here, it stores indices of elements, not the elements themselves.
    const deque = new Deque();

    for (let i = 0; i < nums.length; i++) {
        // 1. Remove elements from the front of the deque that are out of the current window.
        // The element at deque.front() is the index of the current maximum.
        // If (i - k) >= deque.front(), it means the window has slid past this index.
        if (!deque.isEmpty() && deque.front() <= i - k) {
            deque.shift(); // Remove from front
        }

        // 2. Remove elements from the back of the deque that are smaller than the current element `nums[i]`.
        // This maintains the deque in a strictly decreasing order of values.
        // If a new element `nums[i]` is greater than or equal to an element currently in the deque
        // (from the back), then that smaller element can never be the maximum of any future window
        // that `nums[i]` is part of. So, it's safe to remove.
        while (!deque.isEmpty() && nums[deque.back()] <= nums[i]) {
            deque.pop(); // Remove from back
        }

        // 3. Add the current element's index to the back of the deque.
        deque.push(i);

        // 4. Once the window is fully formed (i.e., we've processed at least 'k' elements),
        // the element at the front of the deque is the maximum of the current window.
        if (i >= k - 1) {
            result.push(nums[deque.front()]);
        }
    }

    return result;
}

/**
 * Time Complexity Analysis:
 * O(N), where N is the length of the input array `nums`.
 * Each element is added to the deque once and removed from the deque at most twice
 * (once from the back, once from the front). All deque operations (push, pop, shift, front, back, isEmpty)
 * take O(1) time. Therefore, the total time complexity is linear.
 *
 * Space Complexity Analysis:
 * O(K), where K is the size of the sliding window.
 * In the worst case (e.g., a strictly decreasing array like [5, 4, 3, 2, 1] with k=5),
 * the deque might store up to K elements.
 */

module.exports = slidingWindowMaximum;