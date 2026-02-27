```typescript
/**
 * @fileoverview Generic Deque (Double-Ended Queue) Data Structure Implementation
 *
 * This file provides an optimized, generic implementation of a Deque,
 * allowing elements to be added or removed from both the front and the back.
 * It's built using a JavaScript array and manages `head` and `tail` pointers
 * for efficient O(1) amortized operations.
 *
 * Deques are crucial for problems like Sliding Window Maximum, where elements
 * need to be efficiently added/removed from both ends while maintaining a certain order.
 */

/**
 * Interface for a Deque data structure.
 * @template T The type of elements stored in the deque.
 */
export interface IDeque<T> {
    /** Adds an element to the front of the deque. */
    addFront(item: T): void;
    /** Adds an element to the back of the deque. */
    addBack(item: T): void;
    /** Removes and returns the element from the front of the deque. */
    removeFront(): T | undefined;
    /** Removes and returns the element from the back of the deque. */
    removeBack(): T | undefined;
    /** Returns the element at the front of the deque without removing it. */
    peekFront(): T | undefined;
    /** Returns the element at the back of the deque without removing it. */
    peekBack(): T | undefined;
    /** Returns the number of elements in the deque. */
    size(): number;
    /** Checks if the deque is empty. */
    isEmpty(): boolean;
    /** Clears all elements from the deque. */
    clear(): void;
    /** Returns a shallow copy of the deque's elements as an array (from front to back). */
    toArray(): T[];
}

/**
 * Implements a generic Deque (Double-Ended Queue) data structure.
 *
 * This Deque uses an array internally and manages `head` and `tail` pointers
 * to provide O(1) amortized time complexity for all add/remove operations
 * from both ends. It periodically compacts the underlying array to maintain
 * space efficiency.
 *
 * @template T The type of elements the deque will hold.
 */
export class Deque<T> implements IDeque<T> {
    private elements: T[];
    private head: number; // Index of the first element
    private tail: number; // Index where the next element would be added to the back
    private readonly MIN_COMPACT_RATIO = 0.25; // If head advances this much of total, compact

    constructor(initialElements?: T[]) {
        this.elements = initialElements ? [...initialElements] : [];
        this.head = 0;
        this.tail = this.elements.length;
    }

    /**
     * Adds an element to the front of the deque.
     * Time Complexity: O(1) amortized (O(N) if resize/compact is needed, but rare).
     * Space Complexity: O(1) (O(N) if resize/compact).
     * @param item The element to add to the front.
     */
    addFront(item: T): void {
        if (this.head === 0) {
            // Need to shift existing elements or resize if no space at front.
            // For optimal performance, a real Deque might use a linked list or
            // dynamically grow/shift arrays. Here, we'll compact if at beginning.
            if (this.tail === this.elements.length) { // Array is full
                this.elements.unshift(item); // O(N) but simple for this implementation
                this.tail++;
            } else { // Space available at front due to previous compacting or only additions to back
                this.compact(); // Ensure head is 0, then add
                this.elements.unshift(item);
                this.tail++;
            }
            // A more robust array-based deque would pre-allocate space or
            // expand both ends by copying to a larger array.
            // For this project, unshift is used for simplicity when at `head=0`.
            // The `compact` logic helps maintain amortized O(1) by keeping `head` close to `0`.
        } else {
            this.head--;
            this.elements[this.head] = item;
        }
    }

    /**
     * Adds an element to the back of the deque.
     * Time Complexity: O(1) amortized (O(N) if resize/compact is needed, but rare).
     * Space Complexity: O(1) (O(N) if resize/compact).
     * @param item The element to add to the back.
     */
    addBack(item: T): void {
        this.elements[this.tail] = item;
        this.tail++;
    }

    /**
     * Removes and returns the element from the front of the deque.
     * Returns `undefined` if the deque is empty.
     * Time Complexity: O(1) amortized.
     * Space Complexity: O(1).
     * @returns The element removed from the front, or `undefined` if empty.
     */
    removeFront(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const item = this.elements[this.head];
        // delete this.elements[this.head]; // Optional: clear reference for GC
        this.head++;

        // Compact if the head has moved significantly, reclaiming space at the front.
        if (this.head > this.elements.length * this.MIN_COMPACT_RATIO && this.size() > 0) {
            this.compact();
        }

        return item;
    }

    /**
     * Removes and returns the element from the back of the deque.
     * Returns `undefined` if the deque is empty.
     * Time Complexity: O(1) amortized.
     * Space Complexity: O(1).
     * @returns The element removed from the back, or `undefined` if empty.
     */
    removeBack(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        this.tail--;
        const item = this.elements[this.tail];
        // delete this.elements[this.tail]; // Optional: clear reference for GC
        return item;
    }

    /**
     * Returns the element at the front of the deque without removing it.
     * Returns `undefined` if the deque is empty.
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     * @returns The element at the front, or `undefined` if empty.
     */
    peekFront(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements[this.head];
    }

    /**
     * Returns the element at the back of the deque without removing it.
     * Returns `undefined` if the deque is empty.
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     * @returns The element at the back, or `undefined` if empty.
     */
    peekBack(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements[this.tail - 1]; // tail points to next available slot
    }

    /**
     * Returns the number of elements currently in the deque.
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     * @returns The current size of the deque.
     */
    size(): number {
        return this.tail - this.head;
    }

    /**
     * Checks if the deque is empty.
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     * @returns `true` if the deque contains no elements, `false` otherwise.
     */
    isEmpty(): boolean {
        return this.head === this.tail;
    }

    /**
     * Clears all elements from the deque.
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     */
    clear(): void {
        this.elements = [];
        this.head = 0;
        this.tail = 0;
    }

    /**
     * Returns a shallow copy of the deque's elements as an array,
     * maintaining the order from front to back.
     * Time Complexity: O(N) where N is the number of elements.
     * Space Complexity: O(N) for the new array.
     * @returns An array containing all elements in the deque.
     */
    toArray(): T[] {
        return this.elements.slice(this.head, this.tail);
    }

    /**
     * Internal method to compact the `elements` array.
     * It shifts remaining elements to the beginning of the array and
     * adjusts `head` and `tail` pointers accordingly.
     * This operation is O(N) but called infrequently, leading to amortized O(1) overall.
     * Time Complexity: O(N) where N is the number of elements in the deque.
     * Space Complexity: O(N) for the new array created by `slice`.
     */
    private compact(): void {
        const currentSize = this.size();
        if (currentSize === 0) {
            this.clear();
            return;
        }

        // Create a new array with just the active elements
        // This is effectively `this.elements = this.elements.slice(this.head, this.tail);`
        const newElements = new Array<T>(currentSize);
        for (let i = 0; i < currentSize; i++) {
            newElements[i] = this.elements[this.head + i];
        }
        this.elements = newElements;
        this.head = 0;
        this.tail = currentSize;
    }
}
```