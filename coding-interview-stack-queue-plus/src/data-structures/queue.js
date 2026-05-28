```javascript
/**
 * Custom Queue implementation using a JavaScript array.
 * Provides basic FIFO (First-In, First-Out) operations.
 *
 * NOTE: Using `Array.prototype.shift()` for dequeue operations can be O(N)
 * because it re-indexes all remaining elements. For very large queues and
 * frequent dequeue operations, a linked-list based queue is more efficient
 * (O(1) for both enqueue and dequeue). For typical interview problems or
 * smaller N, array-based is often acceptable and simpler.
 * This implementation uses `shift` for simplicity but acknowledges its limitation.
 */
class Queue {
    constructor() {
        // Use an array to store queue elements.
        // Elements are added to the end and removed from the beginning.
        this.items = [];
    }

    /**
     * Adds an element to the back (end) of the queue.
     * @param {*} element - The element to add to the queue.
     * Time Complexity: O(1) - Array `push` operation is amortized O(1).
     * Space Complexity: O(1) - Constant space for a single element.
     */
    enqueue(element) {
        this.items.push(element);
    }

    /**
     * Removes and returns the element from the front (beginning) of the queue.
     * Returns `undefined` if the queue is empty.
     * Time Complexity: O(N) in worst case for JavaScript's `Array.prototype.shift()`
     *                  due to re-indexing elements.
     * Space Complexity: O(1) - Constant space.
     * @returns {*} The element removed from the front of the queue, or `undefined` if empty.
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined; // Or throw an error
        }
        return this.items.shift();
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * Returns `undefined` if the queue is empty.
     * Time Complexity: O(1) - Accessing the first element of an array is O(1).
     * Space Complexity: O(1) - Constant space.
     * @returns {*} The element at the front of the queue, or `undefined` if empty.
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }

    /**
     * Checks if the queue is empty.
     * Time Complexity: O(1) - Checking array length is O(1).
     * Space Complexity: O(1) - Constant space.
     * @returns {boolean} `true` if the queue is empty, `false` otherwise.
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Returns the number of elements in the queue.
     * Time Complexity: O(1) - Accessing array length is O(1).
     * Space Complexity: O(1) - Constant space.
     * @returns {number} The number of elements in the queue.
     */
    size() {
        return this.items.length;
    }

    /**
     * Clears all elements from the queue.
     * Time Complexity: O(1) - Reassigning the array is O(1).
     * Space Complexity: O(1) - Constant space.
     */
    clear() {
        this.items = [];
    }

    /**
     * Returns a string representation of the queue.
     * For debugging or display purposes.
     * Time Complexity: O(N) where N is the number of elements.
     * Space Complexity: O(N) for the resulting string.
     * @returns {string} A string representation of the queue.
     */
    toString() {
        return this.items.join(' <- ');
    }

    /**
     * Returns the underlying array. Useful for converting queue to array directly.
     * Note: Modifying the returned array directly can break queue integrity.
     * @returns {Array} The internal array representing the queue.
     */
    toArray() {
        return [...this.items]; // Return a copy to prevent direct modification
    }
}

module.exports = Queue;
```