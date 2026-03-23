```typescript
/**
 * src/data-structures/MinMaxHeap.ts
 * 
 * This file implements generic MinHeap and MaxHeap data structures using an array-based representation.
 * It provides core heap operations such as insertion, extraction, peeking, and heapification.
 * 
 * A custom comparator function can be provided to handle different data types or custom comparison logic.
 */

/**
 * Type alias for a comparator function.
 * It takes two elements of type T and returns:
 * - A negative number if a < b
 * - A positive number if a > b
 * - Zero if a == b
 */
export type Comparator<T> = (a: T, b: T) => number;

/**
 * Abstract base class for Heap data structures.
 * Provides common utility methods and defines the structure.
 */
abstract class Heap<T> {
    // The underlying array that stores the heap elements.
    protected heap: T[];
    // The comparison function to maintain heap property (min-heap or max-heap).
    protected comparator: Comparator<T>;

    /**
     * Constructs a new Heap instance.
     * @param comparator The comparison function for elements.
     * @param initialElements Optional array of initial elements to build the heap from.
     */
    constructor(comparator: Comparator<T>, initialElements: T[] = []) {
        this.heap = [];
        this.comparator = comparator;
        // If initial elements are provided, build the heap efficiently.
        if (initialElements.length > 0) {
            this.heap = [...initialElements];
            this.buildHeap();
        }
    }

    /**
     * Returns the index of the parent of the node at `i`.
     * Parent of node at index `i` is at `(i - 1) / 2` (integer division).
     * @param i The index of the child node.
     * @returns The index of the parent node.
     */
    protected parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    /**
     * Returns the index of the left child of the node at `i`.
     * Left child of node at index `i` is at `2 * i + 1`.
     * @param i The index of the parent node.
     * @returns The index of the left child node.
     */
    protected leftChild(i: number): number {
        return 2 * i + 1;
    }

    /**
     * Returns the index of the right child of the node at `i`.
     * Right child of node at index `i` is at `2 * i + 2`.
     * @param i The index of the parent node.
     * @returns The index of the right child node.
     */
    protected rightChild(i: number): number {
        return 2 * i + 2;
    }

    /**
     * Swaps two elements in the heap array.
     * @param i The index of the first element.
     * @param j The index of the second element.
     */
    protected swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    /**
     * Checks if the heap is empty.
     * @returns True if the heap contains no elements, false otherwise.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    /**
     * Returns the number of elements in the heap.
     * @returns The size of the heap.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    size(): number {
        return this.heap.length;
    }

    /**
     * Returns the top element of the heap (min for MinHeap, max for MaxHeap) without removing it.
     * @returns The top element, or undefined if the heap is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peek(): T | undefined {
        return this.heap.length > 0 ? this.heap[0] : undefined;
    }

    /**
     * Inserts an element into the heap and restores the heap property by bubbling up.
     * @param item The element to insert.
     * Time Complexity: O(log N) - where N is the number of elements in the heap.
     * Space Complexity: O(1) - for operations, O(N) for storage.
     */
    insert(item: T): void {
        this.heap.push(item);
        this.heapifyUp(this.heap.length - 1);
    }

    /**
     * Removes and returns the top element of the heap (min for MinHeap, max for MaxHeap).
     * Restores the heap property by bubbling down.
     * @returns The top element, or undefined if the heap is empty.
     * Time Complexity: O(log N) - where N is the number of elements in the heap.
     * Space Complexity: O(1) - for operations, O(N) for storage.
     */
    extract(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.pop();
        }

        // Swap root with the last element
        const root = this.heap[0];
        this.heap[0] = this.heap.pop()!; // TS non-null assertion as size() > 1
        // Restore heap property by bubbling down from the root
        this.heapifyDown(0);
        return root;
    }

    /**
     * Restores the heap property by moving an element up the heap.
     * Compares the element at `index` with its parent and swaps if the heap property is violated.
     * Repeats until the property is restored or the root is reached.
     * @param index The starting index for heapification.
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     */
    protected heapifyUp(index: number): void {
        let currentIndex = index;
        // Continue as long as we are not at the root and the current element violates the heap property
        while (currentIndex > 0 && this.comparator(this.heap[currentIndex], this.heap[this.parent(currentIndex)]) < 0) {
            this.swap(currentIndex, this.parent(currentIndex));
            currentIndex = this.parent(currentIndex);
        }
    }

    /**
     * Restores the heap property by moving an element down the heap.
     * Compares the element at `index` with its children and swaps with the smaller/larger child (depending on heap type)
     * if the heap property is violated. Repeats until the property is restored or a leaf node is reached.
     * @param index The starting index for heapification.
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     */
    protected heapifyDown(index: number): void {
        let currentIndex = index;
        const lastIndex = this.heap.length - 1;

        while (true) {
            const left = this.leftChild(currentIndex);
            const right = this.rightChild(currentIndex);
            let targetIndex = currentIndex; // Assume current element is in correct position

            // If left child exists and violates heap property, it becomes the target for swap
            if (left <= lastIndex && this.comparator(this.heap[left], this.heap[targetIndex]) < 0) {
                targetIndex = left;
            }

            // If right child exists and violates heap property, and is 'more' violating than left child,
            // it becomes the target for swap.
            // Note: comparator(heap[right], heap[targetIndex]) < 0 check ensures that if left and right children
            // both violate, we pick the one that maintains the heap property (e.g., smaller for min-heap).
            if (right <= lastIndex && this.comparator(this.heap[right], this.heap[targetIndex]) < 0) {
                targetIndex = right;
            }

            // If targetIndex is still currentIndex, then the heap property is satisfied at this node.
            if (targetIndex === currentIndex) {
                break;
            }

            // Swap the current element with the chosen child
            this.swap(currentIndex, targetIndex);
            // Move down to the swapped child to continue heapifying
            currentIndex = targetIndex;
        }
    }

    /**
     * Builds a heap from an arbitrary array of elements in O(N) time.
     * It starts from the last non-leaf node and calls `heapifyDown` on each node up to the root.
     * Time Complexity: O(N)
     * Space Complexity: O(1) (in-place modification of the array)
     */
    protected buildHeap(): void {
        const lastParentIndex = Math.floor(this.heap.length / 2) - 1;
        // Iterate from the last non-leaf node up to the root (index 0)
        for (let i = lastParentIndex; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }
}

/**
 * Implements a MinHeap.
 * Uses a default comparator for numbers (a - b) to ensure smallest elements bubble up.
 */
export class MinHeap<T> extends Heap<T> {
    /**
     * Constructs a new MinHeap instance.
     * @param comparator An optional comparison function. If not provided,
     *                   it defaults to a standard numerical comparison for `T` extending `number`.
     *                   If `T` is not a number, a custom comparator *must* be provided.
     * @param initialElements Optional array of initial elements to build the heap from.
     */
    constructor(comparator?: Comparator<T>, initialElements: T[] = []) {
        // Default comparator for MinHeap: a < b should return negative.
        // For numbers, (a - b) works.
        // For other types, a custom comparator is essential.
        super(comparator || ((a, b) => (a as any) - (b as any)), initialElements);
    }

    /**
     * Extracts and returns the minimum element from the heap.
     * Alias for `extract()` in MinHeap context.
     * @returns The minimum element, or undefined if the heap is empty.
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     */
    extractMin(): T | undefined {
        return this.extract();
    }
}

/**
 * Implements a MaxHeap.
 * Uses a default comparator for numbers (b - a) to ensure largest elements bubble up.
 */
export class MaxHeap<T> extends Heap<T> {
    /**
     * Constructs a new MaxHeap instance.
     * @param comparator An optional comparison function. If not provided,
     *                   it defaults to a standard numerical comparison for `T` extending `number`.
     *                   If `T` is not a number, a custom comparator *must* be provided.
     * @param initialElements Optional array of initial elements to build the heap from.
     */
    constructor(comparator?: Comparator<T>, initialElements: T[] = []) {
        // Default comparator for MaxHeap: a > b should return negative (so `a` is preferred to bubble up).
        // For numbers, (b - a) works.
        // For other types, a custom comparator is essential.
        super(comparator || ((a, b) => (b as any) - (a as any)), initialElements);
    }

    /**
     * Extracts and returns the maximum element from the heap.
     * Alias for `extract()` in MaxHeap context.
     * @returns The maximum element, or undefined if the heap is empty.
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     */
    extractMax(): T | undefined {
        return this.extract();
    }
}
```