const Stack = require('../data-structures/Stack');

/**
 * Problem 3: Implement Queue using Stacks
 *
 * Implement a first-in-first-out (FIFO) queue using only two stacks.
 * The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).
 *
 * Implement the `MyQueue` class:
 * - `MyQueue()` initializes the queue object.
 * - `void push(int x)` Pushes element `x` to the back of the queue.
 * - `int pop()` Removes the element from the front of the queue and returns it.
 * - `int peek()` Returns the element at the front of the queue.
 * - `boolean empty()` Returns `true` if the queue is empty, `false` otherwise.
 *
 * Notes:
 * - You must use only standard operations of a stack, which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.
 * - Depending on your language, a stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.
 *
 * Example:
 * MyQueue queue = new MyQueue();
 * queue.push(1);
 * queue.push(2);
 * queue.peek(); // return 1
 * queue.pop();  // return 1
 * queue.empty(); // return false
 */

/**
 * Optimal Approach: Using Two Stacks (Input Stack and Output Stack)
 *
 * The core idea is to simulate FIFO behavior (like a queue) using LIFO structures (stacks).
 * When elements are pushed onto the first stack (`inputStack`), they are in LIFO order.
 * To get FIFO order for `pop` or `peek`, we need to reverse this order. This reversal is done
 * by moving all elements from the `inputStack` to a second stack (`outputStack`).
 *
 * Algorithm:
 *
 * `MyQueue()`:
 *   - Initialize `inputStack` (for pushing elements).
 *   - Initialize `outputStack` (for popping/peeking elements).
 *
 * `push(x)`:
 *   - Simply push `x` onto the `inputStack`. This is an O(1) operation.
 *
 * `pop()`:
 *   - This is where the magic happens. We need the oldest element.
 *   - First, ensure `outputStack` has elements. If it's empty, we need to "transfer" elements from `inputStack`.
 *   - While `inputStack` is not empty, pop an element from `inputStack` and push it onto `outputStack`.
 *     This reverses the order. The element that was at the bottom of `inputStack` (the oldest)
 *     will now be at the top of `outputStack`.
 *   - Once `outputStack` is populated (or if it already had elements), pop from `outputStack`.
 *   - If both stacks are empty, the queue is empty, so `pop` would return undefined (or throw error).
 *
 * `peek()`:
 *   - Similar to `pop()`, ensure `outputStack` has elements by transferring from `inputStack` if necessary.
 *   - Then, `peek` at the top of `outputStack`.
 *
 * `empty()`:
 *   - The queue is empty if and only if both `inputStack` and `outputStack` are empty.
 *
 * Time Complexity Analysis:
 * - `push`: O(1) on average.
 * - `pop` / `peek`: Amortized O(1).
 *   - While a single `pop` operation might take O(N) if it triggers a transfer from `inputStack` to `outputStack`
 *     (where N is the number of elements in `inputStack`), this transfer happens only when `outputStack` is empty.
 *   - Each element is pushed onto `inputStack` once, moved from `inputStack` to `outputStack` once,
 *     and popped from `outputStack` once. Over a sequence of M operations, each element undergoes a constant
 *     number of stack operations. Thus, the total time complexity for M operations is O(M),
 *     making the amortized time complexity per `pop`/`peek` operation O(1).
 *
 * Space Complexity: O(N)
 *   - In the worst case, all N elements are either in `inputStack` or `outputStack`, so total space is proportional to N.
 */
class MyQueue {
    constructor() {
        this.inputStack = new Stack();  // For pushing elements (LIFO input)
        this.outputStack = new Stack(); // For popping/peeking elements (LIFO output, but helps achieve FIFO)
    }

    /**
     * Pushes element x to the back of the queue.
     * @param {number} x
     * @return {void}
     * Time Complexity: O(1)
     */
    push(x) {
        this.inputStack.push(x);
    }

    /**
     * Removes the element from the front of the queue and returns it.
     * @return {number}
     * Time Complexity: Amortized O(1)
     */
    pop() {
        // Ensure outputStack is ready for dequeueing
        this._transferStacks();
        // If outputStack is still empty, queue was empty
        if (this.outputStack.isEmpty()) {
            return undefined; // Or throw an error
        }
        return this.outputStack.pop();
    }

    /**
     * Returns the element at the front of the queue.
     * @return {number}
     * Time Complexity: Amortized O(1)
     */
    peek() {
        // Ensure outputStack is ready for peeking
        this._transferStacks();
        // If outputStack is still empty, queue was empty
        if (this.outputStack.isEmpty()) {
            return undefined; // Or throw an error
        }
        return this.outputStack.peek();
    }

    /**
     * Returns true if the queue is empty, false otherwise.
     * @return {boolean}
     * Time Complexity: O(1)
     */
    empty() {
        return this.inputStack.isEmpty() && this.outputStack.isEmpty();
    }

    /**
     * Helper method to transfer elements from inputStack to outputStack.
     * This ensures the oldest element is at the top of outputStack for pop/peek.
     * Time Complexity: O(N) in worst case (N elements in inputStack), but amortized O(1) over many operations.
     * @private
     */
    _transferStacks() {
        // Only transfer if outputStack is empty, to avoid unnecessary transfers
        // and to ensure correct FIFO order. Once outputStack has elements,
        // they are the correct front elements.
        if (this.outputStack.isEmpty()) {
            while (!this.inputStack.isEmpty()) {
                this.outputStack.push(this.inputStack.pop());
            }
        }
    }
}

module.exports = MyQueue;