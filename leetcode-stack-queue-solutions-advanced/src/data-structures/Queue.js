/**
 * @file Implements an efficient Queue data structure using an array with two pointers.
 * @module data-structures/Queue
 */

/**
 * Represents a Queue data structure (FIFO - First In, First Out).
 * Implemented using a JavaScript array and two pointers (`head` and `tail`)
 * to optimize `dequeue` operations and avoid `Array.prototype.shift()`'s O(N) complexity.
 *
 * @template T The type of elements stored in the queue.
 */
class Queue {
    /**
     * @private
     * @type {Array<T>}
     * The internal array used to store queue elements.
     */
    #elements;

    /**
     * @private
     * @type {number}
     * Index of the head of the queue (the first element to be dequeued).
     */
    #head;

    /**
     * @private
     * @type {number}
     * Index of the tail of the queue (where the next element will be enqueued).
     */
    #tail;

    /**
     * Creates an instance of Queue.
     */
    constructor() {
        this.#elements = [];
        this.#head = 0;
        this.#tail = 0;
    }

    /**
     * Adds an element to the back (tail) of the queue.
     *
     * Time Complexity: O(1) on average (amortized due to array resizing).
     *
     * @param {T} element The element to be added.
     * @returns {void}
     *
     * @example
     * const q = new Queue();
     * q.enqueue(10); // Queue: [10]
     * q.enqueue(20); // Queue: [10, 20]
     */
    enqueue(element) {
        this.#elements[this.#tail] = element;
        this.#tail++;
    }

    /**
     * Removes and returns the element from the front (head) of the queue.
     *
     * Time Complexity: O(1).
     *
     * To maintain O(1) for dequeue without `shift()`, we simply increment `head`.
     * To prevent indefinite memory growth, we periodically trim the array if `head`
     * gets too far from `tail` and the array is mostly empty.
     *
     * @returns {T | undefined} The element removed from the front of the queue,
     *                          or `undefined` if the queue is empty.
     *
     * @example
     * const q = new Queue();
     * q.enqueue(10);
     * q.enqueue(20);
     * const frontElement = q.dequeue(); // frontElement is 10, Queue: [20] (conceptually)
     * const nextElement = q.dequeue();  // nextElement is 20, Queue: []
     * const emptyDequeue = q.dequeue(); // emptyDequeue is undefined
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        const element = this.#elements[this.#head];
        // Optional: Nullify the dequeued element to release reference and aid garbage collection
        this.#elements[this.#head] = undefined;
        this.#head++;

        // Optimization: If a significant portion of the queue is empty at the beginning,
        // re-index to save memory and avoid extremely long sparse arrays.
        // This is an amortized O(N) operation but happens infrequently.
        const QUEUE_RESIZE_THRESHOLD = 0.25; // Resize if less than 25% of elements are at start
        if (this.#head > (this.#elements.length * QUEUE_RESIZE_THRESHOLD) && this.size() > 0) {
             // Slice creates a new array, effectively shifting elements to the beginning.
            this.#elements = this.#elements.slice(this.#head, this.#tail);
            this.#tail = this.#elements.length;
            this.#head = 0;
        } else if (this.isEmpty()) { // If queue becomes empty, reset pointers and array
            this.clear();
        }

        return element;
    }

    /**
     * Returns the element at the front (head) of the queue without removing it.
     *
     * Time Complexity: O(1).
     *
     * @returns {T | undefined} The element at the front of the queue,
     *                          or `undefined` if the queue is empty.
     *
     * @example
     * const q = new Queue();
     * q.enqueue(10);
     * q.enqueue(20);
     * const frontElement = q.peek(); // frontElement is 10, Queue: [10, 20]
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.#elements[this.#head];
    }

    /**
     * Checks if the queue is empty.
     *
     * Time Complexity: O(1).
     *
     * @returns {boolean} `true` if the queue contains no elements, `false` otherwise.
     *
     * @example
     * const q = new Queue();
     * console.log(q.isEmpty()); // true
     * q.enqueue(1);
     * console.log(q.isEmpty()); // false
     */
    isEmpty() {
        return this.#head === this.#tail;
    }

    /**
     * Returns the number of elements in the queue.
     *
     * Time Complexity: O(1).
     *
     * @returns {number} The size of the queue.
     *
     * @example
     * const q = new Queue();
     * q.enqueue(1);
     * q.enqueue(2);
     * console.log(q.size()); // 2
     */
    size() {
        return this.#tail - this.#head;
    }

    /**
     * Clears all elements from the queue and resets its state.
     *
     * Time Complexity: O(1).
     *
     * @returns {void}
     *
     * @example
     * const q = new Queue();
     * q.enqueue(1);
     * q.clear(); // Queue: []
     */
    clear() {
        this.#elements = [];
        this.#head = 0;
        this.#tail = 0;
    }

    /**
     * Returns a string representation of the queue.
     *
     * @returns {string} A string representing the queue.
     *
     * @example
     * const q = new Queue();
     * q.enqueue(1);
     * q.enqueue(2);
     * console.log(q.toString()); // "[1, 2]"
     */
    toString() {
        // Only include actual elements
        const activeElements = this.#elements.slice(this.#head, this.#tail);
        return `[${activeElements.join(', ')}]`;
    }

    /**
     * Returns an iterator for the queue elements (from head to tail).
     * This allows the queue to be used with `for...of` loops.
     *
     * @yields {T} Each element in the queue, starting from the head.
     *
     * @example
     * const q = new Queue();
     * q.enqueue(1);
     * q.enqueue(2);
     * for (const item of q) {
     *   console.log(item); // 1, then 2
     * }
     */
    *[Symbol.iterator]() {
        for (let i = this.#head; i < this.#tail; i++) {
            yield this.#elements[i];
        }
    }
}

module.exports = Queue;