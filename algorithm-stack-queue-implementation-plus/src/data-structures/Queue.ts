```typescript
/**
 * @fileoverview Generic Queue Data Structure Implementation
 *
 * This file provides a basic, generic implementation of a First-In, First-Out (FIFO) Queue.
 * It uses an array internally, but for optimal performance (O(1) amortized for `dequeue`),
 * it would ideally use a linked list or a more sophisticated array-based approach
 * (like a circular buffer). This implementation uses `shift()` which is O(N) in worst case
 * but conceptually easier. For interview context, it's often accepted or a linked list
 * implementation is preferred for true O(1) dequeue.
 */

/**
 * Interface for a Queue data structure.
 * @template T The type of elements stored in the queue.
 */
export interface IQueue<T> {
    /** Adds an element to the back of the queue. */
    enqueue(item: T): void;
    /** Removes and returns the element from the front of the queue. */
    dequeue(): T | undefined;
    /** Returns the element at the front of the queue without removing it. */
    peek(): T | undefined;
    /** Returns the number of elements in the queue. */
    size(): number;
    /** Checks if the queue is empty. */
    isEmpty(): boolean;
    /** Clears all elements from the queue. */
    clear(): void;
    /** Returns a shallow copy of the queue's elements as an array (from front to back). */
    toArray(): T[];
}

/**
 * Implements a generic FIFO Queue data structure.
 *
 * This Queue uses an array as its underlying storage.
 * - `enqueue` (push to end): O(1)
 * - `dequeue` (shift from beginning): O(N) in worst case for JavaScript arrays due to re-indexing.
 *   For true O(1) dequeue, a linked list or a circular buffer implementation is needed.
 *   For practical purposes in many JS environments, `shift()` is often optimized, but
 *   the theoretical complexity is N.
 *
 * @template T The type of elements the queue will hold.
 */
export class Queue<T> implements IQueue<T> {
    private elements: T[];

    constructor(initialElements?: T[]) {
        this.elements = initialElements ? [...initialElements] : [];
    }

    /**
     * Adds an element to the back (end) of the queue.
     * Time Complexity: O(1)
     * Space Complexity: O(1) (for the new element)
     * @param item The element to add to the queue.
     */
    enqueue(item: T): void {
        this.elements.push(item);
    }

    /**
     * Removes and returns the element from the front of the queue.
     * Returns `undefined` if the queue is empty.
     * Time Complexity: O(N) in worst case for typical array `shift()` implementation.
     *                  Can be amortized O(1) with a more complex array-based approach (e.g., two pointers, resizing).
     *                  Is O(1) if implemented with a linked list.
     * Space Complexity: O(1)
     * @returns The element removed from the front, or `undefined` if the queue was empty.
     */
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements.shift();
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * Returns `undefined` if the queue is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns The element at the front, or `undefined` if the queue was empty.
     */
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements[0];
    }

    /**
     * Returns the number of elements in the queue.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns The current size of the queue.
     */
    size(): number {
        return this.elements.length;
    }

    /**
     * Checks if the queue is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns `true` if the queue contains no elements, `false` otherwise.
     */
    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    /**
     * Clears all elements from the queue.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear(): void {
        this.elements = [];
    }

    /**
     * Returns a shallow copy of the queue's elements as an array,
     * maintaining the FIFO order (front element is first in the array).
     * Time Complexity: O(N) where N is the number of elements.
     * Space Complexity: O(N) for the new array.
     * @returns An array containing all elements in the queue.
     */
    toArray(): T[] {
        return [...this.elements];
    }
}


/**
 * @fileoverview Optimized Queue Data Structure Implementation (Array-based with Pointers)
 *
 * This optimized implementation of a generic FIFO Queue aims to achieve O(1) amortized
 * time complexity for both `enqueue` and `dequeue` operations, overcoming the O(N)
 * issue of `Array.prototype.shift()` by using two pointers (`head` and `tail`)
 * and periodically compacting the array.
 *
 * This version is more aligned with what's expected for true O(1) queue performance
 * using an array, without resorting to a linked list.
 */

/**
 * Implements a generic FIFO Queue data structure with O(1) amortized time complexity
 * for enqueue and dequeue operations, using an array and two pointers.
 *
 * It uses a technique where `head` and `tail` pointers track the front and back of the queue.
 * When the number of removed elements becomes significant, the array is compacted
 * to reclaim space.
 *
 * @template T The type of elements the queue will hold.
 */
export class OptimizedQueue<T> implements IQueue<T> {
    private elements: T[];
    private head: number;
    private tail: number;
    private readonly MIN_FREE_SPACE_RATIO = 0.25; // Compact if empty space exceeds this ratio of total elements

    constructor(initialElements?: T[]) {
        this.elements = initialElements ? [...initialElements] : [];
        this.head = 0;
        this.tail = this.elements.length;
    }

    /**
     * Adds an element to the back (end) of the queue.
     * Time Complexity: O(1) amortized (O(N) if resize/compact is needed, but rare).
     * Space Complexity: O(1) (for the new element, O(N) if resize/compact)
     * @param item The element to add to the queue.
     */
    enqueue(item: T): void {
        this.elements[this.tail] = item;
        this.tail++;
    }

    /**
     * Removes and returns the element from the front of the queue.
     * Returns `undefined` if the queue is empty.
     * Time Complexity: O(1) amortized.
     * Space Complexity: O(1)
     * @returns The element removed from the front, or `undefined` if the queue was empty.
     */
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const item = this.elements[this.head];
        // Optional: clear reference to allow garbage collection if elements can be large objects
        // delete this.elements[this.head];
        this.head++;

        // Compact the array if a significant portion of elements have been dequeued
        // This prevents excessive memory usage from growing a large `elements` array
        // while `head` keeps moving forward.
        if (this.head > this.elements.length * this.MIN_FREE_SPACE_RATIO && this.size() > 0) {
            this.compact();
        }

        return item;
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * Returns `undefined` if the queue is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns The element at the front, or `undefined` if the queue was empty.
     */
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements[this.head];
    }

    /**
     * Returns the number of elements currently in the queue.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns The current size of the queue.
     */
    size(): number {
        return this.tail - this.head;
    }

    /**
     * Checks if the queue is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns `true` if the queue contains no elements, `false` otherwise.
     */
    isEmpty(): boolean {
        return this.head === this.tail;
    }

    /**
     * Clears all elements from the queue.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear(): void {
        this.elements = [];
        this.head = 0;
        this.tail = 0;
    }

    /**
     * Returns a shallow copy of the queue's elements as an array,
     * maintaining the FIFO order (front element is first in the array).
     * Time Complexity: O(N) where N is the number of elements.
     * Space Complexity: O(N) for the new array.
     * @returns An array containing all elements currently in the queue.
     */
    toArray(): T[] {
        return this.elements.slice(this.head, this.tail);
    }

    /**
     * Internal method to compact the `elements` array.
     * It shifts remaining elements to the beginning of the array and
     * adjusts `head` and `tail` pointers accordingly.
     * This operation is O(N) but called infrequently, leading to amortized O(1) overall.
     * Time Complexity: O(N) where N is the number of elements in the queue.
     * Space Complexity: O(N) for creating the new array in slice.
     *                  Can be O(1) with in-place shifting but more complex.
     */
    private compact(): void {
        // Only compact if there are elements left
        if (this.head === 0 && this.tail === this.elements.length) {
            // Already compact, or full. No need to compact.
            return;
        }

        const currentSize = this.size();
        if (currentSize === 0) {
            this.clear(); // If empty, just reset
            return;
        }

        // Create a new array with just the active elements
        // This is effectively `this.elements = this.elements.slice(this.head, this.tail);`
        // but can be optimized if we want to avoid creating new array in place
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