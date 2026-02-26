```javascript
/**
 * @fileoverview Problem 2: Implement Queue using Stacks
 * Implement a first in first out (FIFO) queue using only two stacks.
 * The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).
 *
 * You must use only standard operations of a stack, which means only `push to top`, `peek/top`,
 * `pop from top`, and `is empty` operations are valid.
 *
 * Constraints:
 * 1. 1 <= x <= 9
 * 2. At most 100 calls will be made to push, pop, peek, and empty.
 * 3. All calls to pop and peek are valid (i.e., will not be called on an empty queue).
 */

import { Stack } from '../utils/stack.js';

/**
 * Solution 1 (Optimal - Lazy Transfer): Implement MyQueue class using two stacks.
 * This approach optimizes `push` to be O(1) and amortizes `pop`/`peek` to O(1).
 *
 * Intuition:
 * A queue is FIFO. A stack is LIFO. To simulate FIFO with LIFO, we need a way to reverse the order.
 * If we push elements onto `stack1`, the first element pushed will be at the bottom.
 * To get that first element (FIFO), we need to reverse `stack1`'s order.
 * We can do this by popping all elements from `stack1` and pushing them onto `stack2`.
 * Once `stack1` is empty, `stack2` will have the elements in reversed order, meaning
 * the original first element is now at the top of `stack2`.
 *
 * We use two stacks:
 * - `inStack`: Used for `push` operations. New elements are always pushed here.
 * - `outStack`: Used for `pop` and `peek` operations. Elements are transferred here from `inStack`
 *               when `outStack` becomes empty and a `pop` or `peek` is requested.
 *
 * Algorithm:
 * - `push(x)`: Simply push `x` onto `inStack`. (O(1))
 * - `pop()`:
 *   1. Call `_transferStacks()` to ensure `outStack` has elements ready for dequeuing.
 *   2. Pop and return the top element from `outStack`. (O(1) amortized)
 * - `peek()`:
 *   1. Call `_transferStacks()` to ensure `outStack` has elements ready for peeking.
 *   2. Peek and return the top element from `outStack`. (O(1) amortized)
 * - `empty()`: The queue is empty if both `inStack` and `outStack` are empty. (O(1))
 *
 * - `_transferStacks()` (Helper method):
 *   This method is crucial for amortized O(1) behavior. It only transfers elements
 *   from `inStack` to `outStack` if `outStack` is empty.
 *   1. If `outStack` is NOT empty, do nothing, as elements are already in the correct order for `pop`/`peek`.
 *   2. If `outStack` IS empty:
 *      a. Pop all elements from `inStack` one by one.
 *      b. For each popped element, push it onto `outStack`.
 *      This reverses the order, so the oldest element in `inStack` becomes the top of `outStack`.
 *
 * Time Complexity:
 * - `push`: O(1)
 * - `pop`: Amortized O(1). In the worst case (when `outStack` is empty and `inStack` has N elements),
 *          it takes O(N) to transfer. However, each element is pushed once to `inStack` and popped once
 *          from `inStack` (to `outStack`), and then popped once from `outStack`. Total operations
 *          per element is constant. Over a sequence of M operations, the total time is O(M).
 * - `peek`: Amortized O(1). Same logic as `pop`.
 * - `empty`: O(1)
 *
 * Space Complexity: O(N)
 * In the worst case, all N elements will be stored across both `inStack` and `outStack`.
 */
export class MyQueueOptimal {
    constructor() {
        this.inStack = new Stack();  // For pushing elements
        this.outStack = new Stack(); // For popping/peeking elements
    }

    /**
     * Pushes element x to the back of the queue.
     * @param {number} x The element to push.
     * @return {void}
     */
    push(x) {
        this.inStack.push(x);
    }

    /**
     * Removes the element from the front of the queue and returns it.
     * @return {number} The element removed from the front.
     */
    pop() {
        this._transferStacks(); // Ensure outStack is ready
        return this.outStack.pop();
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * @return {number} The element at the front.
     */
    peek() {
        this._transferStacks(); // Ensure outStack is ready
        return this.outStack.peek();
    }

    /**
     * Checks whether the queue is empty.
     * @return {boolean} True if the queue is empty, false otherwise.
     */
    empty() {
        return this.inStack.isEmpty() && this.outStack.isEmpty();
    }

    /**
     * Private helper method to transfer elements from inStack to outStack.
     * Elements are only transferred if outStack is empty, ensuring FIFO order for pop/peek.
     * Amortized O(1) for pop/peek calls.
     * @private
     * @return {void}
     */
    _transferStacks() {
        // If outStack is not empty, it means elements are already in the correct order for FIFO,
        // so no transfer is needed.
        if (this.outStack.isEmpty()) {
            while (!this.inStack.isEmpty()) {
                this.outStack.push(this.inStack.pop());
            }
        }
    }
}

/**
 * Solution 2 (Alternative - Eager Transfer): Implement MyQueue using two stacks.
 * This approach optimizes `pop`/`peek` to be O(1) but makes `push` O(N).
 * This is generally less preferred than the lazy transfer for typical queue usage
 * where pushes are frequent.
 *
 * Intuition:
 * Instead of waiting for `pop` or `peek` to transfer elements, we proactively transfer
 * all elements on every `push` operation to ensure that `inStack` always contains
 * elements in the desired "queue-like" order.
 *
 * Algorithm:
 * - `push(x)`:
 *   1. Transfer all elements from `inStack` to `outStack`. (This clears `inStack`)
 *   2. Push `x` onto `inStack`. (Now `inStack` only has `x`)
 *   3. Transfer all elements from `outStack` back to `inStack`. (This puts old elements after `x`)
 *   This ensures `inStack` always holds elements with the oldest at the top, ready for `peek`/`pop`.
 *   This makes `push` O(N).
 * - `pop()`: Pop and return the top element from `inStack`. (O(1))
 * - `peek()`: Peek and return the top element from `inStack`. (O(1))
 * - `empty()`: Check if `inStack` is empty. (O(1))
 *
 * Time Complexity:
 * - `push`: O(N). Each push operation requires transferring all existing N elements twice.
 * - `pop`: O(1)
 * - `peek`: O(1)
 * - `empty`: O(1)
 *
 * Space Complexity: O(N)
 * All N elements will be stored across both stacks during the transfer.
 */
export class MyQueueEagerTransfer {
    constructor() {
        this.mainStack = new Stack(); // Always stores queue elements with front at top
        this.tempStack = new Stack(); // Used for temporary storage during push operations
    }

    /**
     * Pushes element x to the back of the queue.
     * @param {number} x The element to push.
     * @return {void}
     */
    push(x) {
        // Transfer all elements from mainStack to tempStack
        while (!this.mainStack.isEmpty()) {
            this.tempStack.push(this.mainStack.pop());
        }

        // Push the new element onto mainStack (it will be at the bottom after transfer)
        this.mainStack.push(x);

        // Transfer all elements back from tempStack to mainStack
        while (!this.tempStack.isEmpty()) {
            this.mainStack.push(this.tempStack.pop());
        }
    }

    /**
     * Removes the element from the front of the queue and returns it.
     * @return {number} The element removed from the front.
     */
    pop() {
        return this.mainStack.pop();
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * @return {number} The element at the front.
     */
    peek() {
        return this.mainStack.peek();
    }

    /**
     * Checks whether the queue is empty.
     * @return {boolean} True if the queue is empty, false otherwise.
     */
    empty() {
        return this.mainStack.isEmpty();
    }
}
```