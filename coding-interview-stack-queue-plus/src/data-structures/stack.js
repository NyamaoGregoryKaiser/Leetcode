```javascript
/**
 * Custom Stack implementation using a JavaScript array.
 * Provides basic LIFO (Last-In, First-Out) operations.
 */
class Stack {
    constructor() {
        // Use an array to store stack elements.
        // The end of the array (its length) will represent the top of the stack.
        this.items = [];
    }

    /**
     * Pushes an element onto the top of the stack.
     * @param {*} element - The element to add to the stack.
     * Time Complexity: O(1) - Array `push` operation is amortized O(1).
     * Space Complexity: O(1) - Constant space for a single element.
     */
    push(element) {
        this.items.push(element);
    }

    /**
     * Removes and returns the element at the top of the stack.
     * Returns `undefined` if the stack is empty.
     * Time Complexity: O(1) - Array `pop` operation is O(1).
     * Space Complexity: O(1) - Constant space.
     * @returns {*} The element removed from the top of the stack, or `undefined` if empty.
     */
    pop() {
        if (this.isEmpty()) {
            return undefined; // Or throw an error depending on desired behavior
        }
        return this.items.pop();
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * Returns `undefined` if the stack is empty.
     * Time Complexity: O(1) - Accessing the last element of an array is O(1).
     * Space Complexity: O(1) - Constant space.
     * @returns {*} The element at the top of the stack, or `undefined` if empty.
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    /**
     * Checks if the stack is empty.
     * Time Complexity: O(1) - Checking array length is O(1).
     * Space Complexity: O(1) - Constant space.
     * @returns {boolean} `true` if the stack is empty, `false` otherwise.
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Returns the number of elements in the stack.
     * Time Complexity: O(1) - Accessing array length is O(1).
     * Space Complexity: O(1) - Constant space.
     * @returns {number} The number of elements in the stack.
     */
    size() {
        return this.items.length;
    }

    /**
     * Clears all elements from the stack.
     * Time Complexity: O(1) - Reassigning the array is O(1).
     * Space Complexity: O(1) - Constant space.
     */
    clear() {
        this.items = [];
    }

    /**
     * Returns a string representation of the stack.
     * For debugging or display purposes.
     * Time Complexity: O(N) where N is the number of elements.
     * Space Complexity: O(N) for the resulting string.
     * @returns {string} A string representation of the stack.
     */
    toString() {
        return this.items.join(' -> ');
    }

    /**
     * Returns the underlying array. Useful for converting stack to array directly.
     * Note: Modifying the returned array directly can break stack integrity.
     * @returns {Array} The internal array representing the stack.
     */
    toArray() {
        return [...this.items]; // Return a copy to prevent direct modification
    }
}

module.exports = Stack;
```