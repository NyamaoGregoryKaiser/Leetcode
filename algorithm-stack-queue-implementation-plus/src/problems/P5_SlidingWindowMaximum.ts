```typescript
/**
 * @fileoverview Problem: Sliding Window Maximum
 *
 * You are given an array of integers `nums`, there is a sliding window of size `k`
 * which is moving from the very left of the array to the very right.
 * You can only see the `k` numbers in the window. Each time the sliding window
 * moves right by one position.
 *
 * Return the max sliding window.
 *
 * Example 1:
 * Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
 * Output: [3,3,5,5,6,7]
 * Explanation:
 * Window position                Max
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 *  1 [3  -1  -3] 5  3  6  7       3
 *  1  3 [-1  -3  5] 3  6  7       5
 *  1  3  -1 [-3  5  3] 6  7       5
 *  1  3  -1  -3 [5  3  6] 7       6
 *  1  3  -1  -3  5 [3  6  7]      7
 *
 * Example 2:
 * Input: nums = [1], k = 1
 * Output: [1]
 *
 * Constraints:
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * 1 <= k <= nums.length
 */

import { Deque } from '../data-structures/Deque'; // Using our custom Deque implementation

/**
 * Approach 1: Optimal - Using a Deque (Double-Ended Queue)
 *
 * This approach uses a Deque to store indices of elements. The Deque maintains
 * elements in *decreasing order* of their values. The front of the Deque always
 * holds the index of the maximum element in the current window.
 *
 * Algorithm:
 * 1. **Initialization:**
 *    - Initialize an empty Deque (stores indices).
 *    - Initialize an empty array `results` to store the maximums.
 *
 * 2. **Iterate through `nums` with index `i`:**
 *    a. **Remove elements out of window:**
 *       - If the front of the Deque contains an index that is no longer
 *         within the current window (i.e., `deque.peekFront() <= i - k`),
 *         remove it from the front of the Deque.
 *
 *    b. **Maintain decreasing order in Deque:**
 *       - While the Deque is not empty AND the value at the index at the
 *         back of the Deque (`nums[deque.peekBack()]`) is less than or
 *         equal to the current number (`nums[i]`):
 *         - Remove elements from the back of the Deque. This is because
 *           these smaller elements are no longer relevant: they are
 *           behind the current `nums[i]` in the window, and `nums[i]`
 *           is greater, so they can never be the maximum.
 *
 *    c. **Add current element's index:**
 *       - Add the current index `i` to the back of the Deque.
 *
 *    d. **Record maximum:**
 *       - If the window has fully formed (i.e., `i >= k - 1`):
 *         - The maximum element for the current window is `nums[deque.peekFront()]`.
 *         - Add this maximum to the `results` array.
 *
 * 3. **Return `results` array.**
 *
 * Time Complexity: O(N), where N is the length of `nums`.
 *    Each element is added to the Deque and removed from the Deque at most once.
 *    Therefore, each operation (addFront, addBack, removeFront, removeBack, peekFront, peekBack)
 *    is effectively O(1) amortized.
 *
 * Space Complexity: O(K), where K is the window size.
 *    In the worst case (e.g., a strictly decreasing array like `[5,4,3,2,1]`),
 *    the Deque can store up to `k` elements/indices.
 */
export function maxSlidingWindowOptimal(nums: number[], k: number): number[] {
    if (k === 0 || nums.length === 0) {
        return [];
    }
    if (k === 1) {
        return nums; // Each element is its own maximum
    }

    const results: number[] = [];
    // The Deque stores indices, maintaining numbers in decreasing order from front to back.
    // The front of the Deque always holds the index of the largest element in the current window.
    const deque = new Deque<number>();

    for (let i = 0; i < nums.length; i++) {
        // 1. Remove elements from the front that are outside the current window.
        // If the index at the front of the deque is `i - k`, it means it's
        // exactly one position *before* the current window's start.
        if (!deque.isEmpty() && deque.peekFront()! <= i - k) {
            deque.removeFront();
        }

        // 2. Remove elements from the back that are smaller than the current element `nums[i]`.
        // These elements can never be the maximum in any future window that `nums[i]` is part of,
        // because `nums[i]` is larger and appears later.
        while (!deque.isEmpty() && nums[deque.peekBack()!] <= nums[i]) {
            deque.removeBack();
        }

        // 3. Add the current element's index to the back of the deque.
        deque.addBack(i);

        // 4. Once the window has fully formed (i.e., we've processed at least 'k' elements),
        // the maximum for the current window is at the front of the deque.
        if (i >= k - 1) {
            results.push(nums[deque.peekFront()!]);
        }
    }

    return results;
}


/**
 * Approach 2: Brute Force (Naive)
 *
 * This approach directly simulates the sliding window by iterating through all possible
 * windows and finding the maximum element within each window.
 *
 * Algorithm:
 * 1. Initialize an empty array `results` to store the maximums.
 * 2. Iterate from `i = 0` to `nums.length - k`. This `i` represents the start of each window.
 * 3. For each `i`:
 *    a. Initialize `currentMax` to `nums[i]`.
 *    b. Iterate from `j = i + 1` to `i + k - 1` (i.e., within the current window).
 *    c. Update `currentMax = Math.max(currentMax, nums[j])`.
 *    d. After checking all elements in the window, add `currentMax` to `results`.
 * 4. Return `results`.
 *
 * Time Complexity: O(N * K), where N is the length of `nums` and K is the window size.
 *    There are `N - K + 1` windows. For each window, we iterate `K` elements to find the maximum.
 *    In the worst case, K can be N, leading to O(N^2).
 *    For N = 10^5, K = 10^5, this would be 10^10 operations, too slow.
 *
 * Space Complexity: O(N) for the `results` array. O(1) auxiliary space beyond that.
 */
export function maxSlidingWindowBruteForce(nums: number[], k: number): number[] {
    if (k === 0 || nums.length === 0) {
        return [];
    }
    if (k === 1) {
        return nums;
    }

    const results: number[] = [];
    const n = nums.length;

    // Iterate through all possible starting positions of the window
    for (let i = 0; i <= n - k; i++) {
        let currentMax = nums[i];
        // Iterate within the current window to find the maximum
        for (let j = i + 1; j < i + k; j++) {
            currentMax = Math.max(currentMax, nums[j]);
        }
        results.push(currentMax);
    }

    return results;
}


/**
 * Approach 3: Another Optimal - Using two passes with dynamic programming (less intuitive)
 *
 * This method involves pre-calculating maximums for blocks of size `k` and then
 * combining them. It's more complex to implement and understand compared to the Deque approach,
 * but also achieves O(N) time complexity.
 *
 * It uses two arrays, `left` and `right`, to store maximums.
 * `left[i]` stores the maximum in the block `[j, i]` where `j` is the start of the block.
 * `right[i]` stores the maximum in the block `[i, j]` where `j` is the end of the block.
 *
 * For example, if nums = [1,3,-1,-3,5,3,6,7] and k=3:
 * Blocks would be [1,3,-1], [-3,5,3], [6,7].
 *
 * `left` array (max from block start to current index):
 * Index   0 1  2  3  4  5  6  7
 * nums    1 3 -1 -3  5  3  6  7
 * left    1 3  3 -3  5  5  6  7
 * (1 | 1,3 | 1,3,-1 | -3 | -3,5 | -3,5,3 | 6 | 6,7)
 *
 * `right` array (max from current index to block end):
 * Index   0 1  2  3  4  5  6  7
 * nums    1 3 -1 -3  5  3  6  7
 * right   3 3 -1  5  5  3  7  7
 * (1,3,-1 | 3,-1 | -1 | -3,5,3 | 5,3 | 3 | 6,7 | 7)
 *
 * Then, for each window starting at `i` and ending at `i+k-1`, the maximum is
 * `max(right[i], left[i+k-1])`.
 *
 * Example: window `[1,3,-1]` (indices 0,1,2). `i=0, k=3`.
 * max = `max(right[0], left[0+3-1])` = `max(right[0], left[2])` = `max(3, 3)` = `3`.
 *
 * This approach is clever but generally harder to conceptualize and debug compared to the Deque.
 *
 * Time Complexity: O(N) for two passes to fill `left` and `right` arrays, and one pass
 *                  to fill the `results` array.
 * Space Complexity: O(N) for `left`, `right`, and `results` arrays.
 */
export function maxSlidingWindowTwoPasses(nums: number[], k: number): number[] {
    if (k === 0 || nums.length === 0) {
        return [];
    }
    if (k === 1) {
        return nums;
    }

    const n = nums.length;
    const left: number[] = new Array(n).fill(0);
    const right: number[] = new Array(n).fill(0);
    const results: number[] = [];

    // Left pass: calculate maximums from the start of each block
    for (let i = 0; i < n; i++) {
        if (i % k === 0) { // Start of a new block
            left[i] = nums[i];
        } else {
            left[i] = Math.max(left[i - 1], nums[i]);
        }
    }

    // Right pass: calculate maximums from the end of each block
    for (let i = n - 1; i >= 0; i--) {
        if (i === n - 1 || (i + 1) % k === 0) { // End of a block or last element
            right[i] = nums[i];
        } else {
            right[i] = Math.max(right[i + 1], nums[i]);
        }
    }

    // Combine results for each window
    for (let i = 0; i <= n - k; i++) {
        // The maximum for the window [i, i+k-1] is the maximum of:
        // 1. The maximum in the block ending at `i+k-1` (from the `left` array)
        // 2. The maximum in the block starting at `i` (from the `right` array)
        // One of these will cover the entire window.
        results.push(Math.max(right[i], left[i + k - 1]));
    }

    return results;
}
```