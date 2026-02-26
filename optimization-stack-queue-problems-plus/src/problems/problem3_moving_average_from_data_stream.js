```javascript
/**
 * @fileoverview Problem 3: Moving Average from Data Stream
 * Given a stream of integers and a window size, calculate the moving average of all integers
 * in the sliding window.
 *
 * Implement the `MovingAverage` class:
 * - `MovingAverage(int size)` Initializes the object with the size of the window `size`.
 * - `double next(int val)` Returns the moving average of the last `size` values of the stream.
 *
 * Example:
 * MovingAverage m = new MovingAverage(3);
 * m.next(1) = 1.0 (average is (1)/1)
 * m.next(10) = 5.5 (average is (1 + 10)/2)
 * m.next(3) = 4.66667 (average is (1 + 10 + 3)/3)
 * m.next(5) = 6.0 (average is (10 + 3 + 5)/3)
 *
 * Constraints:
 * 1 <= size <= 1000
 * -10^5 <= val <= 10^5
 * At most 10^4 calls will be made to next.
 */

import { Queue } from '../utils/queue.js';

/**
 * Solution 1 (Optimal): Using a Queue (Sliding Window).
 *
 * Intuition:
 * A moving average of a fixed window size inherently implies a "sliding window" pattern.
 * When a new element comes in, the oldest element leaves the window (if the window is full).
 * A Queue (FIFO) is the perfect data structure for this, as it naturally stores elements
 * in the order they arrive and allows for easy removal of the oldest element.
 * We also need to keep track of the sum of elements in the window to calculate the average efficiently.
 *
 * Algorithm:
 * 1. Initialize `MovingAverage` with a `size` (window capacity), an empty `queue`, and a `windowSum` of 0.
 * 2. In the `next(val)` method:
 *    a. **Add new element:** `enqueue(val)` to the queue and add `val` to `windowSum`.
 *    b. **Check window size:** If the queue's `size()` exceeds the specified `size`:
 *       i. Remove the oldest element: `oldestVal = dequeue()` from the queue.
 *       ii. Subtract `oldestVal` from `windowSum`.
 *    c. **Calculate average:** Return `windowSum / queue.size()`.
 *       Note: `queue.size()` will be `size` if the window is full, or less than `size` if not full yet.
 *
 * Time Complexity: O(1) for `next()` operation.
 *   - Queue operations (`enqueue`, `dequeue`, `size`) are O(1) on average for a well-implemented queue (like `src/utils/queue.js` using `push` and `shift` which are usually efficient for small `N` in JS, or truly O(1) with a linked list/circular buffer).
 *   - Arithmetic operations are O(1).
 *
 * Space Complexity: O(WindowSize)
 *   - The queue will store at most `size` elements.
 *
 */
export class MovingAverageOptimal {
    /**
     * Initializes the object with the size of the window.
     * @param {number} size The maximum number of elements in the sliding window.
     */
    constructor(size) {
        this.windowSize = size;
        this.queue = new Queue();
        this.windowSum = 0;
    }

    /**
     * Returns the moving average of the last `windowSize` values of the stream.
     * @param {number} val The new value to add to the stream.
     * @returns {number} The current moving average.
     */
    next(val) {
        // 1. Add the new value to the window and update sum
        this.queue.enqueue(val);
        this.windowSum += val;

        // 2. If the window exceeds its maximum size, remove the oldest element
        if (this.queue.size() > this.windowSize) {
            const oldestVal = this.queue.dequeue();
            this.windowSum -= oldestVal;
        }

        // 3. Calculate and return the current average
        // The queue's current size represents the number of elements in the window.
        return this.windowSum / this.queue.size();
    }
}


/**
 * Solution 2 (Alternative - Array-based fixed-size circular buffer):
 * This approach uses a fixed-size array and two pointers (or a single pointer and modulo arithmetic)
 * to simulate a circular queue, avoiding the O(N) `shift` operation cost of a standard JS array
 * used as a queue when N is large. This makes it truly O(1) for all operations regardless of
 * JavaScript engine optimizations.
 *
 * Intuition:
 * Instead of dynamically resizing the array or shifting elements, we pre-allocate an array
 * of `windowSize` and use a `head` pointer and `count` to manage the elements.
 * When `head` reaches the end, it wraps around to the beginning (circular buffer).
 *
 * Algorithm:
 * 1. Initialize `MovingAverageCircularBuffer` with `size`, a `buffer` array of `size` filled with zeros,
 *    `head` pointer at 0, `count` of current elements at 0, and `windowSum` at 0.
 * 2. In the `next(val)` method:
 *    a. **Remove oldest (if window is full):** If `count` is equal to `windowSize`, it means the buffer is full.
 *       Subtract the element at `buffer[head]` from `windowSum`.
 *    b. **Add new element:** Place `val` into `buffer[head]`. Add `val` to `windowSum`.
 *    c. **Advance head:** `head = (head + 1) % windowSize`. This wraps the pointer.
 *    d. **Update count:** If `count` is less than `windowSize`, increment `count`.
 *    e. **Calculate average:** Return `windowSum / count`.
 *
 * Time Complexity: O(1) for `next()`. All operations are constant time.
 * Space Complexity: O(WindowSize). The buffer array has a fixed size.
 */
export class MovingAverageCircularBuffer {
    /**
     * Initializes the object with the size of the window.
     * @param {number} size The maximum number of elements in the sliding window.
     */
    constructor(size) {
        this.windowSize = size;
        this.buffer = new Array(size).fill(0); // Pre-allocate fixed-size array
        this.head = 0; // Pointer to the next position to write (and the oldest element if full)
        this.count = 0; // Current number of elements in the window
        this.windowSum = 0;
    }

    /**
     * Returns the moving average of the last `windowSize` values of the stream.
     * @param {number} val The new value to add to the stream.
     * @returns {number} The current moving average.
     */
    next(val) {
        // If the window is full, subtract the element that is about to be overwritten (the oldest)
        if (this.count === this.windowSize) {
            this.windowSum -= this.buffer[this.head];
        }

        // Add the new value to the buffer and update sum
        this.buffer[this.head] = val;
        this.windowSum += val;

        // Move head pointer to the next position (circularly)
        this.head = (this.head + 1) % this.windowSize;

        // Increment count if the window is not yet full
        if (this.count < this.windowSize) {
            this.count++;
        }

        // Calculate and return the current average
        return this.windowSum / this.count;
    }
}
```