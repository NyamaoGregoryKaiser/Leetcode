/**
 * Stack Data Structure Implementation
 *
 * A stack is a linear data structure that follows the Last In, First Out (LIFO) principle.
 * This means the last element added to the stack is the first one to be removed.
 *
 * This implementation uses a JavaScript array as its underlying storage.
 */
class Stack {
    /**
     * Initializes a new empty Stack.
     */
    constructor() {
        this.items = []; // Array to store stack elements
    }

    /**
     * Pushes an element onto the top of the stack.
     * @param {*} element - The element to be pushed.
     * @returns {number} The new size of the stack.
     *
     * Time Complexity: O(1) - Array.push() takes constant time on average.
     * Space Complexity: O(1) - Adds one element to the array.
     */
    push(element) {
        this.items.push(element);
        return this.size();
    }

    /**
     * Removes and returns the element at the top of the stack.
     * If the stack is empty, it returns undefined.
     * @returns {*} The element removed from the top of the stack, or undefined if the stack is empty.
     *
     * Time Complexity: O(1) - Array.pop() takes constant time on average.
     * Space Complexity: O(1) - Removes one element from the array.
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
     * @returns {*} The element at the top of the stack, or undefined if the stack is empty.
     *
     * Time Complexity: O(1) - Accessing the last element of an array is constant time.
     * Space Complexity: O(1) - Does not modify the array.
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
     *
     * Time Complexity: O(1) - Checking array length is constant time.
     * Space Complexity: O(1) - No extra space used.
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Returns the number of elements in the stack.
     * @returns {number} The number of elements in the stack.
     *
     * Time Complexity: O(1) - Accessing array length is constant time.
     * Space Complexity: O(1) - No extra space used.
     */
    size() {
        return this.items.length;
    }

    /**
     * Clears all elements from the stack.
     *
     * Time Complexity: O(1) - Reassigning the array to an empty array.
     * Space Complexity: O(1) - No extra space used (memory might be reclaimed).
     */
    clear() {
        this.items = [];
    }

    /**
     * Converts the stack to a string representation (for debugging).
     * @returns {string} A string representation of the stack.
     */
    toString() {
        return this.items.toString();
    }
}

module.exports = Stack;