/**
 * @file Implements a simple Stack data structure using an array.
 * @module data-structures/Stack
 */

/**
 * Represents a Stack data structure (LIFO - Last In, First Out).
 * Implemented using a JavaScript array for storage.
 *
 * @template T The type of elements stored in the stack.
 */
class Stack {
    /**
     * @private
     * @type {Array<T>}
     * The internal array used to store stack elements.
     */
    #elements;

    /**
     * Creates an instance of Stack.
     */
    constructor() {
        this.#elements = [];
    }

    /**
     * Adds an element to the top of the stack.
     *
     * @param {T} element The element to be added.
     * @returns {void}
     *
     * @example
     * const s = new Stack();
     * s.push(10); // Stack: [10]
     * s.push(20); // Stack: [10, 20]
     */
    push(element) {
        this.#elements.push(element);
    }

    /**
     * Removes and returns the element at the top of the stack.
     *
     * @returns {T | undefined} The element removed from the top of the stack,
     *                          or `undefined` if the stack is empty.
     *
     * @example
     * const s = new Stack();
     * s.push(10);
     * s.push(20);
     * const topElement = s.pop(); // topElement is 20, Stack: [10]
     * const nextElement = s.pop(); // nextElement is 10, Stack: []
     * const emptyPop = s.pop();   // emptyPop is undefined
     */
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.#elements.pop();
    }

    /**
     * Returns the element at the top of the stack without removing it.
     *
     * @returns {T | undefined} The element at the top of the stack,
     *                          or `undefined` if the stack is empty.
     *
     * @example
     * const s = new Stack();
     * s.push(10);
     * s.push(20);
     * const topElement = s.peek(); // topElement is 20, Stack: [10, 20]
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.#elements[this.#elements.length - 1];
    }

    /**
     * Checks if the stack is empty.
     *
     * @returns {boolean} `true` if the stack contains no elements, `false` otherwise.
     *
     * @example
     * const s = new Stack();
     * console.log(s.isEmpty()); // true
     * s.push(1);
     * console.log(s.isEmpty()); // false
     */
    isEmpty() {
        return this.#elements.length === 0;
    }

    /**
     * Returns the number of elements in the stack.
     *
     * @returns {number} The size of the stack.
     *
     * @example
     * const s = new Stack();
     * s.push(1);
     * s.push(2);
     * console.log(s.size()); // 2
     */
    size() {
        return this.#elements.length;
    }

    /**
     * Clears all elements from the stack.
     *
     * @returns {void}
     *
     * @example
     * const s = new Stack();
     * s.push(1);
     * s.clear(); // Stack: []
     */
    clear() {
        this.#elements = [];
    }

    /**
     * Returns a string representation of the stack.
     *
     * @returns {string} A string representing the stack.
     *
     * @example
     * const s = new Stack();
     * s.push(1);
     * s.push(2);
     * console.log(s.toString()); // "[1, 2]"
     */
    toString() {
        return `[${this.#elements.join(', ')}]`;
    }

    /**
     * Returns an iterator for the stack elements (from bottom to top).
     * This allows the stack to be used with `for...of` loops.
     *
     * @yields {T} Each element in the stack, starting from the bottom.
     *
     * @example
     * const s = new Stack();
     * s.push(1);
     * s.push(2);
     * for (const item of s) {
     *   console.log(item); // 1, then 2
     * }
     */
    *[Symbol.iterator]() {
        for (const element of this.#elements) {
            yield element;
        }
    }
}

module.exports = Stack;