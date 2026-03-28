```typescript
/**
 * @file utils.ts
 * @description Provides helper utilities such as a custom SinglyLinkedList
 * for hash table collision resolution and simple hash functions.
 */

import { Node, HashCodeFunction, EqualityFunction } from './types';

/**
 * Represents a node in a Singly Linked List.
 * @template T The type of the value stored in the node.
 */
class LinkedListNode<T> implements Node<T> {
    value: T;
    next: LinkedListNode<T> | null;

    constructor(value: T, next: LinkedListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

/**
 * Implements a generic Singly Linked List.
 * Used primarily for separate chaining in the custom HashTable.
 * @template T The type of elements stored in the list.
 */
export class SinglyLinkedList<T> {
    private head: LinkedListNode<T> | null;
    private _length: number;

    constructor() {
        this.head = null;
        this._length = 0;
    }

    /**
     * Gets the number of elements in the list.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    get length(): number {
        return this._length;
    }

    /**
     * Appends a new value to the end of the list.
     * Time Complexity: O(N) in worst case (traverse to end), O(1) if head is tracked.
     * For separate chaining, we often append at head for O(1). Let's implement append at head.
     *
     * Note: For collision resolution, inserting at the head is usually preferred for O(1) average time.
     * The `append` name here is a bit misleading if it's head-insertion, but it means "add to list".
     *
     * Let's rename to `prepend` for clarity, as it's typically faster for collision chains.
     *
     * @param value The value to add.
     */
    prepend(value: T): void {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;
        this._length++;
    }

    /**
     * Finds a node in the list based on a predicate function.
     * @param predicate A function that takes a node's value and returns true if it's the target.
     * @returns The value of the found node, or undefined if not found.
     * Time Complexity: O(N) (N is list length)
     * Space Complexity: O(1)
     */
    find(predicate: (value: T) => boolean): T | undefined {
        let current = this.head;
        while (current) {
            if (predicate(current.value)) {
                return current.value;
            }
            current = current.next;
        }
        return undefined;
    }

    /**
     * Deletes a node from the list based on a predicate function.
     * @param predicate A function that takes a node's value and returns true if it's the target to delete.
     * @returns True if a node was deleted, false otherwise.
     * Time Complexity: O(N) (N is list length)
     * Space Complexity: O(1)
     */
    delete(predicate: (value: T) => boolean): boolean {
        if (!this.head) {
            return false;
        }

        // If head is the node to delete
        if (predicate(this.head.value)) {
            this.head = this.head.next;
            this._length--;
            return true;
        }

        let current = this.head;
        while (current.next) {
            if (predicate(current.next.value)) {
                current.next = current.next.next;
                this._length--;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    /**
     * Converts the linked list into an array of its values.
     * @returns An array containing all values in the list.
     * Time Complexity: O(N) (N is list length)
     * Space Complexity: O(N) (for the new array)
     */
    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}


/**
 * Simple polynomial rolling hash function for strings.
 * Uses ASCII values of characters and a prime number (31).
 * @param s The string to hash.
 * @returns A non-negative integer hash code.
 * Time Complexity: O(L) where L is the length of the string.
 * Space Complexity: O(1)
 */
export const stringHashCode: HashCodeFunction<string> = (s: string): number => {
    let hash = 0;
    if (s.length === 0) return hash;
    const PRIME_NUMBER = 31; // A common prime used in string hashing
    for (let i = 0; i < s.length; i++) {
        const char = s.charCodeAt(i);
        hash = (hash * PRIME_NUMBER + char) >>> 0; // >>> 0 converts to unsigned 32-bit integer
    }
    return hash;
};

/**
 * A basic hash function for numbers.
 * Simply returns the number itself, ensuring it's non-negative.
 * If the number is large, it might be problematic for direct modulo,
 * but for typical integer keys, it's often sufficient.
 * @param n The number to hash.
 * @returns A non-negative integer hash code.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export const numberHashCode: HashCodeFunction<number> = (n: number): number => {
    // Ensure the hash is a non-negative integer.
    // Using bitwise OR 0 to convert to 32-bit integer.
    // Using Math.abs for positive, then bitwise for integer.
    return (Math.abs(n) | 0) >>> 0;
};

/**
 * A default equality function for primitive types.
 * @param a First value.
 * @param b Second value.
 * @returns True if a and b are strictly equal, false otherwise.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export const defaultEquality: EqualityFunction<any> = (a: any, b: any): boolean => {
    return a === b;
};

/**
 * Creates a unique key for grouping anagrams.
 * Sorts the characters of the string and joins them.
 * @param s The string to normalize.
 * @returns A sorted string.
 * Time Complexity: O(L log L) where L is the length of the string (due to sorting).
 * Space Complexity: O(L) for the array of characters.
 */
export const getAnagramKey = (s: string): string => {
    return s.split('').sort().join('');
};
```