```javascript
/**
 * @fileoverview Custom Queue data structure implementation.
 * Provides basic FIFO (First-In, First-Out) operations.
 */

/**
 * Implements a Queue data structure using a JavaScript array.
 * A queue follows the FIFO (First-In, First-Out) principle.
 *
 * Operations provided:
 * - enqueue(element): Adds an element to the back of the queue.
 * - dequeue(): Removes and returns the element from the front of the queue.
 * - peek(): Returns the element at the front of the queue without removing it.
 * - isEmpty(): Checks if the queue is empty.
 * - size(): Returns the number of elements in the queue.
 * - clear(): Removes all elements from the queue.
 * - toArray(): Returns the queue elements as an array (front to back).
 *
 * Note on efficiency: Using `Array.prototype.shift()` for dequeue operation
 * can be O(N) in JavaScript for large arrays, as it re-indexes all remaining elements.
 * For a truly O(1) dequeue, a linked list or a circular array implementation
 * would be more efficient. However, for typical interview scenarios with
 * moderate N, array-based `push` and `shift` are often accepted due to
 * JavaScript engine optimizations or if N is not excessively large.
 * We'll use this simpler array-based approach for clarity and common practice.
 */
export class Queue {
    /**
     * @private
     * @type {Array<any>}
     * The underlying array to store queue elements.
     */
    #items;

    constructor() {
        this.#items = [];
    }

    /**
     * Adds an element to the back (end) of the queue.
     * Time Complexity: O(1) - Array push at the end is amortized constant time.
     * Space Complexity: O(1) - Constant additional space for the new element.
     * @param {*} element The element to be added to the queue.
     */
    enqueue(element) {
        this.#items.push(element);
    }

    /**
     * Removes and returns the element from the front (beginning) of the queue.
     * If the queue is empty, it returns undefined.
     * Time Complexity: O(N) in worst case for native Array.shift() due to re-indexing.
     *                  However, modern JS engines optimize this for smaller queues.
     * Space Complexity: O(1) - No additional space is used.
     * @returns {*} The element removed from the front of the queue, or undefined if the queue is empty.
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined; // Or throw an error, depending on desired behavior
        }
        return this.#items.shift();
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * If the queue is empty, it returns undefined.
     * Time Complexity: O(1) - Accessing the first element of an array is constant time.
     * Space Complexity: O(1) - No additional space is used.
     * @returns {*} The element at the front of the queue, or undefined if the queue is empty.
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.#items[0];
    }

    /**
     * Checks if the queue is empty.
     * Time Complexity: O(1) - Array length check is constant time.
     * Space Complexity: O(1) - No additional space is used.
     * @returns {boolean} True if the queue is empty, false otherwise.
     */
    isEmpty() {
        return this.#items.length === 0;
    }

    /**
     * Returns the number of elements in the queue.
     * Time Complexity: O(1) - Array length access is constant time.
     * Space Complexity: O(1) - No additional space is used.
     * @returns {number} The number of elements in the queue.
     */
    size() {
        return this.#items.length;
    }

    /**
     * Removes all elements from the queue.
     * Time Complexity: O(1) - Reassigning the array.
     * Space Complexity: O(1) - The old array might be garbage collected.
     */
    clear() {
        this.#items = [];
    }

    /**
     * Returns the elements of the queue as an array, from front to back.
     * This is useful for inspection or iteration.
     * Time Complexity: O(N) - Creating a new array and copying elements.
     * Space Complexity: O(N) - A new array of size N is created.
     * @returns {Array<any>} An array containing the queue elements.
     */
    toArray() {
        return [...this.#items];
    }

    /**
     * Returns a string representation of the queue for debugging.
     * Time Complexity: O(N) - Joining elements of the array.
     * Space Complexity: O(N) - For the string representation.
     * @returns {string} A string representing the queue.
     */
    toString() {
        return `Queue: [${this.#items.join(', ')}]`;
    }
}
```