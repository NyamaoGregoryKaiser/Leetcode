/**
 * src/utils/dataStructures.js
 *
 * This file contains implementations of common data structures
 * that might be useful in various algorithm problems.
 *
 * For string manipulation, a Stack is often used, especially for
 * problems involving parentheses balancing or similar tasks.
 */

/**
 * Implements a basic Stack data structure using a JavaScript array.
 * This demonstrates how a stack works and can be used in solutions
 * where a custom stack is preferred or required over built-in array methods.
 */
class Stack {
    /**
     * Initializes a new empty stack.
     */
    constructor() {
        this.items = [];
    }

    /**
     * Adds an element to the top of the stack.
     * @param {*} element - The element to add.
     */
    push(element) {
        this.items.push(element);
    }

    /**
     * Removes and returns the element at the top of the stack.
     * If the stack is empty, it returns undefined.
     * @returns {*} The element at the top of the stack, or undefined if empty.
     */
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.pop();
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * If the stack is empty, it returns undefined.
     * @returns {*} The element at the top of the stack, or undefined if empty.
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    /**
     * Checks if the stack is empty.
     * @returns {boolean} True if the stack is empty, false otherwise.
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Returns the number of elements in the stack.
     * @returns {number} The size of the stack.
     */
    size() {
        return this.items.length;
    }

    /**
     * Clears all elements from the stack.
     */
    clear() {
        this.items = [];
    }

    /**
     * Converts the stack to a string representation.
     * @returns {string} A string representation of the stack.
     */
    toString() {
        return this.items.toString();
    }
}

module.exports = {
    Stack
};