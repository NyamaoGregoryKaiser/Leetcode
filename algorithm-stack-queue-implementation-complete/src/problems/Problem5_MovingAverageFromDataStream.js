const Queue = require('../data-structures/Queue');

/**
 * Problem 5: Moving Average from Data Stream
 *
 * Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.
 *
 * Implement the `MovingAverage` class:
 * - `MovingAverage(int size)` Initializes the object with the size of the window `size`.
 * - `double next(int val)` Returns the moving average of the last `size` values of the stream.
 *
 * Example:
 * MovingAverage m = new MovingAverage(3);
 * m.next(1) = 1.0 (average is 1 / 1)
 * m.next(10) = 5.5 (average is (1 + 10) / 2)
 * m.next(3) = 4.66667 (average is (1 + 10 + 3) / 3)
 * m.next(5) = 6.0 (average is (10 + 3 + 5) / 3)
 */

/**
 * Optimal Approach: Using a Queue
 *
 * A queue (FIFO) is the perfect data structure for maintaining a "sliding window" of elements.
 * When a new element arrives, we add it to the window. If the window exceeds its maximum size,
 * we remove the oldest element from the window.
 *
 * Algorithm:
 *
 * `MovingAverage(size)`:
 *   - Initialize a `queue` (our custom `Queue` class).
 *   - Store the maximum `size` of the window.
 *   - Initialize `currentSum` to 0. This variable will keep track of the sum of elements currently in the queue.
 *
 * `next(val)`:
 *   1. Add the new value `val` to `currentSum`.
 *   2. Enqueue `val` into the `queue`.
 *   3. Check if the `queue` size exceeds the maximum `size`:
 *      a. If it does, dequeue the oldest element from the `queue`.
 *      b. Subtract this dequeued element from `currentSum`.
 *   4. The moving average is `currentSum` divided by `queue.size()`.
 *
 * This approach ensures that we always have the sum of the most recent `size` (or fewer, if the stream hasn't
 * provided `size` elements yet) elements, and the number of elements in the window,
 * allowing O(1) computation of the average.
 *
 * Time Complexity: O(1) for `next()` operation.
 *   - `enqueue`, `dequeue`, `size` operations on our array-based Queue are typically O(1) amortized
 *     (though `shift` could be O(N) in worst-case raw array implementation, for typical interview contexts and
 *     the window size constraint, it's considered constant).
 * Space Complexity: O(size)
 *   - The queue will store at most `size` elements.
 */
class MovingAverage {
    /**
     * @param {number} size
     */
    constructor(size) {
        if (size <= 0) {
            throw new Error("Window size must be a positive integer.");
        }
        this.size = size;
        this.queue = new Queue(); // Stores elements in the current window
        this.currentSum = 0;      // Stores the sum of elements in the current window
    }

    /**
     * @param {number} val
     * @return {number}
     */
    next(val) {
        // Add the new value to the sum and enqueue it
        this.currentSum += val;
        this.queue.enqueue(val);

        // If the queue size exceeds the window size, remove the oldest element
        if (this.queue.size() > this.size) {
            const oldestVal = this.queue.dequeue();
            this.currentSum -= oldestVal;
        }

        // Calculate and return the moving average
        // Ensure division by zero is handled if queue is somehow empty, though it shouldn't be with valid inputs.
        return this.currentSum / this.queue.size();
    }
}

module.exports = MovingAverage;