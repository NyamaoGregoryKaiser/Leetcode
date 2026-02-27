```typescript
/**
 * @fileoverview Generic Stack Data Structure Implementation
 *
 * This file provides a basic, generic implementation of a Last-In, First-Out (LIFO) Stack.
 * It uses an array internally to store elements, offering simple and efficient operations.
 */

/**
 * Interface for a Stack data structure.
 * @template T The type of elements stored in the stack.
 */
export interface IStack<T> {
    /** Pushes an element onto the top of the stack. */
    push(item: T): void;
    /** Removes and returns the element at the top of the stack. */
    pop(): T | undefined;
    /** Returns the element at the top of the stack without removing it. */
    peek(): T | undefined;
    /** Returns the number of elements in the stack. */
    size(): number;
    /** Checks if the stack is empty. */
    isEmpty(): boolean;
    /** Clears all elements from the stack. */
    clear(): void;
    /** Returns a shallow copy of the stack's elements as an array. */
    toArray(): T[];
}

/**
 * Implements a generic LIFO Stack data structure.
 *
 * This Stack uses an array as its underlying storage.
 * All operations (push, pop, peek, size, isEmpty) have an average time complexity of O(1).
 * In JavaScript/TypeScript, array `push` and `pop` at the end are generally O(1).
 *
 * @template T The type of elements the stack will hold.
 */
export class Stack<T> implements IStack<T> {
    private elements: T[];

    constructor(initialElements?: T[]) {
        this.elements = initialElements ? [...initialElements] : [];
    }

    /**
     * Pushes an element onto the top of the stack.
     * Time Complexity: O(1)
     * Space Complexity: O(1) (for the new element)
     * @param item The element to push onto the stack.
     */
    push(item: T): void {
        this.elements.push(item);
    }

    /**
     * Removes and returns the element at the top of the stack.
     * Returns `undefined` if the stack is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns The element removed from the top, or `undefined` if the stack was empty.
     */
    pop(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements.pop();
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * Returns `undefined` if the stack is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns The element at the top, or `undefined` if the stack was empty.
     */
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements[this.elements.length - 1];
    }

    /**
     * Returns the number of elements in the stack.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns The current size of the stack.
     */
    size(): number {
        return this.elements.length;
    }

    /**
     * Checks if the stack is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns `true` if the stack contains no elements, `false` otherwise.
     */
    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    /**
     * Clears all elements from the stack.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear(): void {
        this.elements = [];
    }

    /**
     * Returns a shallow copy of the stack's elements as an array,
     * maintaining the LIFO order (top element is last in the array).
     * Time Complexity: O(N) where N is the number of elements.
     * Space Complexity: O(N) for the new array.
     * @returns An array containing all elements in the stack.
     */
    toArray(): T[] {
        return [...this.elements];
    }
}
```