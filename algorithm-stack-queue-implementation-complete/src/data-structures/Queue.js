/**
 * Queue Data Structure Implementation
 *
 * A queue is a linear data structure that follows the First In, First Out (FIFO) principle.
 * This means the first element added to the queue is the first one to be removed.
 *
 * This implementation uses a JavaScript array. For optimal performance with `shift()`
 * (which can be O(N) in some JS engine implementations if the array is dense and large),
 * a linked list based queue or a circular array could be more performant for very large queues
 * with frequent `dequeue` operations. However, for typical interview scenarios and smaller
 * queues, an array-based approach is often acceptable and simpler to implement.
 */
class Queue {
    /**
     * Initializes a new empty Queue.
     */
    constructor() {
        this.items = []; // Array to store queue elements
    }

    /**
     * Adds an element to the back (end) of the queue.
     * This is also known as "enqueue".
     * @param {*} element - The element to be added.
     * @returns {number} The new size of the queue.
     *
     * Time Complexity: O(1) - Array.push() takes constant time on average.
     * Space Complexity: O(1) - Adds one element to the array.
     */
    enqueue(element) {
        this.items.push(element);
        return this.size();
    }

    /**
     * Removes and returns the element from the front (beginning) of the queue.
     * This is also known as "dequeue".
     * If the queue is empty, it returns undefined.
     * @returns {*} The element removed from the front of the queue, or undefined if empty.
     *
     * Time Complexity: O(N) in worst case (Array.shift() can re-index all elements)
     *                 O(1) amortized for modern JS engines on smaller arrays
     * Space Complexity: O(1) - Removes one element from the array.
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift();
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * This is also known as "peek" or "front".
     * If the queue is empty, it returns undefined.
     * @returns {*} The element at the front of the queue, or undefined if empty.
     *
     * Time Complexity: O(1) - Accessing the first element of an array is constant time.
     * Space Complexity: O(1) - Does not modify the array.
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }

    /**
     * Checks if the queue is empty.
     * @returns {boolean} True if the queue is empty, false otherwise.
     *
     * Time Complexity: O(1) - Checking array length is constant time.
     * Space Complexity: O(1) - No extra space used.
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Returns the number of elements in the queue.
     * @returns {number} The number of elements in the queue.
     *
     * Time Complexity: O(1) - Accessing array length is constant time.
     * Space Complexity: O(1) - No extra space used.
     */
    size() {
        return this.items.length;
    }

    /**
     * Clears all elements from the queue.
     *
     * Time Complexity: O(1) - Reassigning the array to an empty array.
     * Space Complexity: O(1) - No extra space used (memory might be reclaimed).
     */
    clear() {
        this.items = [];
    }

    /**
     * Converts the queue to a string representation (for debugging).
     * @returns {string} A string representation of the queue.
     */
    toString() {
        return this.items.toString();
    }
}

module.exports = Queue;