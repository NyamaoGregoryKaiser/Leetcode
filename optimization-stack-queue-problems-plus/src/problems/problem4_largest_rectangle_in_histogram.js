```javascript
/**
 * @fileoverview Problem 4: Largest Rectangle in Histogram
 * Given an array of integers `heights` representing the histogram's bar height where
 * the width of each bar is 1, return the area of the largest rectangle in the histogram.
 *
 * Example:
 * heights = [2,1,5,6,2,3]
 * Output: 10 (rectangle formed by bars of height 5 and 6)
 *
 * Constraints:
 * 1 <= heights.length <= 10^5
 * 0 <= heights[i] <= 10^4
 */

import { Stack } from '../utils/stack.js';

/**
 * Solution 1 (Optimal): Using a Monotonic Stack.
 *
 * Intuition:
 * For any given bar `heights[i]`, if we want to find the largest rectangle *that includes this bar*
 * as its shortest bar, we need to find the first bar to its left that is shorter than `heights[i]`
 * and the first bar to its right that is shorter than `heights[i]`.
 * The width of the rectangle with `heights[i]` as its minimum height would then be `right_smaller_index - left_smaller_index - 1`.
 *
 * A monotonic increasing stack is perfect for finding the "next smaller element" or "previous smaller element".
 * When we iterate through the heights:
 * - If the current bar is taller than or equal to the bar at the top of the stack, we push its index.
 *   This maintains the increasing order.
 * - If the current bar is shorter than the bar at the top of the stack, it means the bar at the stack top
 *   can no longer extend to the right (because we found a shorter bar). This is our cue to "pop"
 *   and calculate areas. When we pop `heights[j]` (where `j` is the index popped):
 *     - Its height is `heights[j]`.
 *     - Its right boundary is the current `i` (the first bar shorter than `heights[j]`).
 *     - Its left boundary is the element *below* `j` in the stack (which is the first bar shorter than `heights[j]` to its left),
 *       or -1 if the stack becomes empty after popping `j`.
 *
 * Algorithm:
 * 1. Initialize `maxArea = 0` and an empty `stack`.
 * 2. Iterate `i` from `0` to `heights.length` (inclusive, add a dummy height of 0 at the end to flush the stack).
 *    Let `currentHeight = (i === heights.length) ? 0 : heights[i]`.
 * 3. While the stack is NOT empty AND `currentHeight` is LESS THAN the height of the bar at the stack's top index:
 *    a. Pop an index `hIndex = stack.pop()`.
 *    b. Let `h = heights[hIndex]`. This is the height of the rectangle.
 *    c. Calculate the width:
 *       - If the stack is now empty, it means `h` extends all the way to the left (index 0).
 *         The width is `i`.
 *       - Otherwise, the width is `i - stack.peek() - 1`. (`stack.peek()` is the index of the first smaller bar to the left).
 *    d. Update `maxArea = Math.max(maxArea, h * width)`.
 * 4. After the while loop, push the current index `i` onto the stack.
 * 5. After the for loop finishes, `maxArea` will hold the result.
 *
 * Time Complexity: O(N)
 * Each bar's index is pushed onto the stack once and popped from the stack at most once.
 * All stack operations are O(1).
 *
 * Space Complexity: O(N)
 * In the worst case (e.g., a monotonically increasing histogram), the stack could store all N indices.
 *
 * @param {number[]} heights An array of integers representing histogram bar heights.
 * @returns {number} The area of the largest rectangle in the histogram.
 */
export function largestRectangleAreaOptimal(heights) {
    let maxArea = 0;
    const stack = new Stack(); // Stores indices of bars in increasing order of height.

    // Iterate through all bars, including a dummy '0' height at the end to clear the stack
    for (let i = 0; i <= heights.length; i++) {
        // currentHeight is the current bar's height, or 0 if we're at the dummy end.
        const currentHeight = (i === heights.length) ? 0 : heights[i];

        // While the stack is not empty AND current bar is shorter than the bar at stack top
        // (This means the bar at stack top can't extend further right than current i)
        while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {
            const hIndex = stack.pop(); // Index of the bar being considered as the height of the rectangle
            const h = heights[hIndex];    // Height of this bar

            // Calculate width:
            // If stack is empty after pop, it means h extends from index 0 to current i-1.
            // So, its left boundary is effectively -1. Width = i - (-1) - 1 = i.
            // Otherwise, stack.peek() is the index of the first bar to the left that is shorter than h.
            // Width = current i (right boundary) - stack.peek() (left boundary) - 1.
            const width = stack.isEmpty() ? i : i - stack.peek() - 1;

            maxArea = Math.max(maxArea, h * width);
        }

        // Push current index onto stack. Maintains monotonic increasing property.
        stack.push(i);
    }

    return maxArea;
}

/**
 * Solution 2 (Brute Force): Iterate through all possible rectangles.
 *
 * Intuition:
 * A rectangle is defined by a start index, an end index, and a minimum height within that range.
 * We can iterate over all possible pairs of (start, end) indices. For each pair,
 * find the minimum height bar in that range and calculate the area.
 *
 * Algorithm:
 * 1. Initialize `maxArea = 0`.
 * 2. Iterate `i` from `0` to `heights.length - 1` (start of rectangle).
 * 3. Iterate `j` from `i` to `heights.length - 1` (end of rectangle).
 *    a. Initialize `minHeight = Infinity`.
 *    b. Iterate `k` from `i` to `j` to find `minHeight` in `heights[i...j]`.
 *    c. Calculate `currentWidth = j - i + 1`.
 *    d. Calculate `currentArea = minHeight * currentWidth`.
 *    e. Update `maxArea = Math.max(maxArea, currentArea)`.
 * 4. Return `maxArea`.
 *
 * Time Complexity: O(N^3)
 *   - Outer two loops for `i` and `j`: O(N^2) pairs.
 *   - Inner loop for `k` to find `minHeight`: O(N) for each pair.
 *   - Total: O(N * N * N) = O(N^3).
 *
 * Space Complexity: O(1)
 * Only a few variables are used.
 *
 * Note: A slight optimization to O(N^2) can be made by updating `minHeight` incrementally
 * as `j` increases for a fixed `i`.
 *
 * @param {number[]} heights An array of integers representing histogram bar heights.
 * @returns {number} The area of the largest rectangle in the histogram.
 */
export function largestRectangleAreaBruteForce(heights) {
    let maxArea = 0;
    const n = heights.length;

    for (let i = 0; i < n; i++) { // Start index of the rectangle
        let minHeight = heights[i]; // Minimum height for current rectangle starting at i

        for (let j = i; j < n; j++) { // End index of the rectangle
            // As we extend the rectangle to the right, the minimum height can only decrease or stay the same
            minHeight = Math.min(minHeight, heights[j]);
            const width = j - i + 1;
            maxArea = Math.max(maxArea, minHeight * width);
        }
    }

    return maxArea;
}
```