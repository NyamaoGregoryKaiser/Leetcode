/**
 * Custom Stack Implementation
 *
 * This file provides a generic, array-based implementation of a Stack data structure.
 * It demonstrates the core LIFO (Last-In, First-Out) principle and is used
 * in the algorithm solutions to avoid reliance on built-in array methods as a direct stack,
 * enhancing understanding of how stacks work internally.
 */
export class Stack<T> {
    private elements: T[];
    private _size: number;

    /**
     * Creates a new empty Stack.
     */
    constructor() {
        this.elements = [];
        this._size = 0;
    }

    /**
     * Pushes an element onto the top of the stack.
     * @param item The element to push.
     *
     * Time Complexity: O(1) - Adding to the end of an array is constant time.
     * Space Complexity: O(1) - Only a single element is added, though overall stack space grows with elements.
     */
    push(item: T): void {
        this.elements.push(item);
        this._size++;
    }

    /**
     * Removes and returns the element at the top of the stack.
     * Throws an error if the stack is empty.
     * @returns The element at the top of the stack.
     *
     * Time Complexity: O(1) - Removing from the end of an array is constant time.
     * Space Complexity: O(1) - No additional space is used beyond storing the return value.
     */
    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack is empty, cannot pop.");
        }
        this._size--;
        return this.elements.pop()!; // ! asserts that pop will not return undefined as we checked isEmpty
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * Throws an error if the stack is empty.
     * @returns The element at the top of the stack.
     *
     * Time Complexity: O(1) - Accessing the last element of an array is constant time.
     * Space Complexity: O(1) - No additional space is used.
     */
    peek(): T {
        if (this.isEmpty()) {
            throw new Error("Stack is empty, no top element.");
        }
        return this.elements[this._size - 1];
    }

    /**
     * Checks if the stack is empty.
     * @returns True if the stack is empty, false otherwise.
     *
     * Time Complexity: O(1) - Checking the size is constant time.
     * Space Complexity: O(1) - No additional space is used.
     */
    isEmpty(): boolean {
        return this._size === 0;
    }

    /**
     * Returns the number of elements in the stack.
     * @returns The number of elements.
     *
     * Time Complexity: O(1) - Accessing the stored size is constant time.
     * Space Complexity: O(1) - No additional space is used.
     */
    size(): number {
        return this._size;
    }

    /**
     * Returns the elements of the stack as an array (for debugging or iteration).
     * Note: This exposes the internal array, use with caution to maintain stack integrity.
     * @returns An array containing all elements in the stack, from bottom to top.
     *
     * Time Complexity: O(N) - Creating a shallow copy of the array.
     * Space Complexity: O(N) - Creating a new array of N elements.
     */
    toArray(): T[] {
        return [...this.elements];
    }
}