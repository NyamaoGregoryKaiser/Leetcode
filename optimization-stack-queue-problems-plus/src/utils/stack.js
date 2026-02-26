```javascript
/**
 * @fileoverview Custom Stack data structure implementation.
 * Provides basic LIFO (Last-In, First-Out) operations.
 */

/**
 * Implements a Stack data structure using a JavaScript array.
 * A stack follows the LIFO (Last-In, First-Out) principle.
 *
 * Operations provided:
 * - push(element): Adds an element to the top of the stack.
 * - pop(): Removes and returns the element from the top of the stack.
 * - peek(): Returns the element at the top of the stack without removing it.
 * - isEmpty(): Checks if the stack is empty.
 * - size(): Returns the number of elements in the stack.
 * - clear(): Removes all elements from the stack.
 * - toArray(): Returns the stack elements as an array (bottom to top).
 */
export class Stack {
    /**
     * @private
     * @type {Array<any>}
     * The underlying array to store stack elements.
     */
    #items;

    constructor() {
        this.#items = [];
    }

    /**
     * Adds an element to the top of the stack.
     * Time Complexity: O(1) - Array push at the end is amortized constant time.
     * Space Complexity: O(1) - Constant additional space for the new element.
     * @param {*} element The element to be added to the stack.
     */
    push(element) {
        this.#items.push(element);
    }

    /**
     * Removes and returns the element from the top of the stack.
     * If the stack is empty, it returns undefined.
     * Time Complexity: O(1) - Array pop from the end is constant time.
     * Space Complexity: O(1) - No additional space is used.
     * @returns {*} The element removed from the top of the stack, or undefined if the stack is empty.
     */
    pop() {
        if (this.isEmpty()) {
            return undefined; // Or throw an error, depending on desired behavior
        }
        return this.#items.pop();
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * If the stack is empty, it returns undefined.
     * Time Complexity: O(1) - Accessing the last element of an array is constant time.
     * Space Complexity: O(1) - No additional space is used.
     * @returns {*} The element at the top of the stack, or undefined if the stack is empty.
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.#items[this.#items.length - 1];
    }

    /**
     * Checks if the stack is empty.
     * Time Complexity: O(1) - Array length check is constant time.
     * Space Complexity: O(1) - No additional space is used.
     * @returns {boolean} True if the stack is empty, false otherwise.
     */
    isEmpty() {
        return this.#items.length === 0;
    }

    /**
     * Returns the number of elements in the stack.
     * Time Complexity: O(1) - Array length access is constant time.
     * Space Complexity: O(1) - No additional space is used.
     * @returns {number} The number of elements in the stack.
     */
    size() {
        return this.#items.length;
    }

    /**
     * Removes all elements from the stack.
     * Time Complexity: O(1) - Reassigning the array.
     * Space Complexity: O(1) - The old array might be garbage collected.
     */
    clear() {
        this.#items = [];
    }

    /**
     * Returns the elements of the stack as an array, from bottom to top.
     * This is useful for inspection or iteration.
     * Time Complexity: O(N) - Creating a new array and copying elements.
     * Space Complexity: O(N) - A new array of size N is created.
     * @returns {Array<any>} An array containing the stack elements.
     */
    toArray() {
        return [...this.#items];
    }

    /**
     * Returns a string representation of the stack for debugging.
     * Time Complexity: O(N) - Joining elements of the array.
     * Space Complexity: O(N) - For the string representation.
     * @returns {string} A string representing the stack.
     */
    toString() {
        return `Stack: [${this.#items.join(', ')}]`;
    }
}
```