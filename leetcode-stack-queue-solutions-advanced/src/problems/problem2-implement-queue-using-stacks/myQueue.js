/**
 * @file Implements a Queue data structure using two Stack instances.
 * @module problems/myQueue
 */

const Stack = require('../../data-structures/Stack');

/**
 * Implements a First-In-First-Out (FIFO) queue using two internal Stack instances.
 * The queue supports `push`, `pop`, `peek`, and `empty` operations.
 *
 * The core idea is to use one stack (`inStack`) for pushing new elements
 * and another stack (`outStack`) for popping/peeking elements.
 * When an element needs to be dequeued or peeked, if `outStack` is empty,
 * all elements from `inStack` are transferred to `outStack`. This reverses
 * their order, making the oldest element from `inStack` available at the top
 * of `outStack`.
 *
 * @template T The type of elements stored in the queue.
 */
class MyQueue {
    /**
     * @private
     * @type {Stack<T>}
     * The stack used for pushing elements (input stack).
     */
    #inStack;

    /**
     * @private
     * @type {Stack<T>}
     * The stack used for popping and peeking elements (output stack).
     */
    #outStack;

    /**
     * Creates an instance of MyQueue.
     */
    constructor() {
        this.#inStack = new Stack();
        this.#outStack = new Stack();
    }

    /**
     * Pushes an element onto the back of the queue.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1) (amortized)
     *
     * @param {T} x The element to push.
     * @returns {void}
     */
    push(x) {
        this.#inStack.push(x);
    }

    /**
     * Removes and returns the element from the front of the queue.
     *
     * Time Complexity: Amortized O(1).
     * In the worst case (when `outStack` is empty and `inStack` has N elements),
     * it takes O(N) to transfer all elements. However, each element is pushed
     * onto `inStack` once and then popped from `inStack` and pushed onto `outStack` once,
     * and finally popped from `outStack` once. So, over N operations, the total cost is O(N).
     *
     * Space Complexity: O(1) for this operation, but O(N) overall for storing elements.
     *
     * @returns {T | undefined} The element removed, or `undefined` if the queue is empty.
     */
    pop() {
        // If outStack is empty, transfer all elements from inStack to outStack
        this.#transferElements();
        // Now outStack has the elements in FIFO order, so pop from it.
        return this.#outStack.pop();
    }

    /**
     * Returns the element at the front of the queue without removing it.
     *
     * Time Complexity: Amortized O(1). (Same reasoning as pop)
     * Space Complexity: O(1) for this operation.
     *
     * @returns {T | undefined} The element at the front, or `undefined` if the queue is empty.
     */
    peek() {
        // If outStack is empty, transfer all elements from inStack to outStack
        this.#transferElements();
        // Now outStack has the elements in FIFO order, so peek from it.
        return this.#outStack.peek();
    }

    /**
     * Checks if the queue is empty.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @returns {boolean} `true` if the queue is empty, `false` otherwise.
     */
    empty() {
        return this.#inStack.isEmpty() && this.#outStack.isEmpty();
    }

    /**
     * Private helper method to transfer elements from `inStack` to `outStack`.
     * This operation is performed only when `outStack` is empty to ensure FIFO order.
     *
     * @private
     * @returns {void}
     */
    #transferElements() {
        // Only transfer if outStack is empty. If it's not empty, it means it already
        // contains elements that are ready to be dequeued in FIFO order.
        if (this.#outStack.isEmpty()) {
            while (!this.#inStack.isEmpty()) {
                this.#outStack.push(this.#inStack.pop());
            }
        }
    }
}

/**
 * Total Time Complexity (Amortized):
 * - push: O(1)
 * - pop: O(1) amortized
 * - peek: O(1) amortized
 * - empty: O(1)
 *
 * Each element is pushed onto `inStack` once, moved to `outStack` once, and popped from `outStack` once.
 * This makes the total cost for N operations O(N), hence amortized O(1) per operation.
 *
 * Total Space Complexity:
 * O(N), where N is the total number of elements currently in the queue.
 * In the worst case, all elements might reside in `inStack` or `outStack`,
 * or be split between them.
 */

module.exports = MyQueue;