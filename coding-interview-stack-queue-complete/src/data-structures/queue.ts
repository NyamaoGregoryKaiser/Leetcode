/**
 * Custom Queue Implementation
 *
 * This file provides a generic, array-based implementation of a Queue data structure.
 * It demonstrates the core FIFO (First-In, First-Out) principle and is used
 * in the algorithm solutions. For true O(1) dequeue, a linked list based queue is better,
 * but for simplicity and common interview scenarios, array-based with `shift()` or
 * head/tail pointers is often acceptable, or a circular buffer. This uses `shift()` which is O(N).
 * For optimal O(1) enqueue/dequeue with an array, one would typically use two pointers and
 * handle resizing/wrapping carefully, or a Deque-like approach with a custom Array or LinkedList.
 * For this project, a simplified approach demonstrating the concept is sufficient.
 *
 * Note: A simple array-based queue using `push` and `shift` for enqueue/dequeue will have
 * O(N) dequeue time due to re-indexing. For truly O(1) average time enqueue/dequeue,
 * a linked list or a more sophisticated array implementation (e.g., using two pointers and resizing logic)
 * would be preferred. For the purpose of implementing Queue using Stacks, this basic queue
 * suffices, as the performance bottleneck will be the stack operations.
 */
export class Queue<T> {
    private elements: T[];
    private _size: number;

    /**
     * Creates a new empty Queue.
     */
    constructor() {
        this.elements = [];
        this._size = 0;
    }

    /**
     * Adds an element to the back (end) of the queue.
     * @param item The element to enqueue.
     *
     * Time Complexity: O(1) - Adding to the end of an array is constant time.
     * Space Complexity: O(1) - Only a single element is added.
     */
    enqueue(item: T): void {
        this.elements.push(item);
        this._size++;
    }

    /**
     * Removes and returns the element from the front (beginning) of the queue.
     * Throws an error if the queue is empty.
     * @returns The element at the front of the queue.
     *
     * Time Complexity: O(N) - `shift()` operation re-indexes all subsequent elements.
     * Space Complexity: O(1) - No additional space is used beyond storing the return value.
     */
    dequeue(): T {
        if (this.isEmpty()) {
            throw new Error("Queue is empty, cannot dequeue.");
        }
        this._size--;
        return this.elements.shift()!; // ! asserts that shift will not return undefined
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * Throws an error if the queue is empty.
     * @returns The element at the front of the queue.
     *
     * Time Complexity: O(1) - Accessing the first element of an array is constant time.
     * Space Complexity: O(1) - No additional space is used.
     */
    peek(): T {
        if (this.isEmpty()) {
            throw new Error("Queue is empty, no front element.");
        }
        return this.elements[0];
    }

    /**
     * Checks if the queue is empty.
     * @returns True if the queue is empty, false otherwise.
     *
     * Time Complexity: O(1) - Checking the size is constant time.
     * Space Complexity: O(1) - No additional space is used.
     */
    isEmpty(): boolean {
        return this._size === 0;
    }

    /**
     * Returns the number of elements in the queue.
     * @returns The number of elements.
     *
     * Time Complexity: O(1) - Accessing the stored size is constant time.
     * Space Complexity: O(1) - No additional space is used.
     */
    size(): number {
        return this._size;
    }

    /**
     * Returns the elements of the queue as an array (for debugging or iteration).
     * Note: This exposes the internal array, use with caution to maintain queue integrity.
     * @returns An array containing all elements in the queue, from front to back.
     *
     * Time Complexity: O(N) - Creating a shallow copy of the array.
     * Space Complexity: O(N) - Creating a new array of N elements.
     */
    toArray(): T[] {
        return [...this.elements];
    }
}

/**
 * Custom Deque (Double-Ended Queue) Implementation
 *
 * This implementation provides O(1) for adding/removing from both ends using an array and
 * two pointers (head, tail). It handles resizing and maintains logical continuity.
 * This is crucial for problems like Sliding Window Maximum.
 */
export class Deque<T> {
    private elements: T[];
    private head: number;
    private tail: number;
    private _size: number;
    private capacity: number;
    private static readonly DEFAULT_CAPACITY = 16;

    constructor(initialCapacity: number = Deque.DEFAULT_CAPACITY) {
        this.capacity = initialCapacity;
        this.elements = new Array(this.capacity);
        this.head = 0;
        this.tail = 0; // tail points to the next available slot
        this._size = 0;
    }

    /**
     * Adds an element to the front of the deque.
     * Amortized Time Complexity: O(1) - Resizing can take O(N), but happens infrequently.
     * Space Complexity: O(1) - Per element, amortized.
     */
    addFront(item: T): void {
        this.ensureCapacity();
        this.head = (this.head - 1 + this.capacity) % this.capacity;
        this.elements[this.head] = item;
        this._size++;
    }

    /**
     * Adds an element to the back of the deque.
     * Amortized Time Complexity: O(1) - Resizing can take O(N), but happens infrequently.
     * Space Complexity: O(1) - Per element, amortized.
     */
    addBack(item: T): void {
        this.ensureCapacity();
        this.elements[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
        this._size++;
    }

    /**
     * Removes and returns the element from the front of the deque.
     * Throws an error if the deque is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    removeFront(): T {
        if (this.isEmpty()) {
            throw new Error("Deque is empty, cannot remove from front.");
        }
        const item = this.elements[this.head];
        // Optional: clear the reference to help garbage collection
        // delete this.elements[this.head];
        this.head = (this.head + 1) % this.capacity;
        this._size--;
        return item;
    }

    /**
     * Removes and returns the element from the back of the deque.
     * Throws an error if the deque is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    removeBack(): T {
        if (this.isEmpty()) {
            throw new Error("Deque is empty, cannot remove from back.");
        }
        this.tail = (this.tail - 1 + this.capacity) % this.capacity;
        const item = this.elements[this.tail];
        // Optional: clear the reference to help garbage collection
        // delete this.elements[this.tail];
        this._size--;
        return item;
    }

    /**
     * Returns the element at the front of the deque without removing it.
     * Throws an error if the deque is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peekFront(): T {
        if (this.isEmpty()) {
            throw new Error("Deque is empty, no front element.");
        }
        return this.elements[this.head];
    }

    /**
     * Returns the element at the back of the deque without removing it.
     * Throws an error if the deque is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peekBack(): T {
        if (this.isEmpty()) {
            throw new Error("Deque is empty, no back element.");
        }
        return this.elements[(this.tail - 1 + this.capacity) % this.capacity];
    }

    /**
     * Checks if the deque is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean {
        return this._size === 0;
    }

    /**
     * Returns the number of elements in the deque.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    size(): number {
        return this._size;
    }

    /**
     * Doubles the capacity of the deque when it's full.
     * Time Complexity: O(N) - where N is the current size.
     * Space Complexity: O(N) - for creating a new array.
     */
    private ensureCapacity(): void {
        if (this._size === this.capacity) {
            this.resize(this.capacity * 2);
        }
    }

    /**
     * Resizes the internal array to a new capacity.
     * Time Complexity: O(N)
     * Space Complexity: O(N)
     */
    private resize(newCapacity: number): void {
        const oldElements = this.elements;
        const oldCapacity = this.capacity;
        this.elements = new Array(newCapacity);
        this.capacity = newCapacity;

        let current = this.head;
        for (let i = 0; i < this._size; i++) {
            this.elements[i] = oldElements[current];
            current = (current + 1) % oldCapacity;
        }
        this.head = 0;
        this.tail = this._size;
    }

    /**
     * Returns the elements of the deque as an array, preserving order.
     * Time Complexity: O(N)
     * Space Complexity: O(N)
     */
    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        for (let i = 0; i < this._size; i++) {
            result.push(this.elements[current]);
            current = (current + 1) % this.capacity;
        }
        return result;
    }
}