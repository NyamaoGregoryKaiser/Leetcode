import { ArrayUtils } from '../utils/arrayUtils';

/**
 * A generic Min-Heap implementation.
 * It stores elements such that the smallest element is always at the root.
 *
 * @template T The type of elements stored in the heap.
 */
export class MinHeap<T> {
    private heap: T[];
    private compare: (a: T, b: T) => number;

    /**
     * Initializes a new MinHeap.
     * @param comparator An optional function to compare two elements.
     *                   It should return:
     *                   - a negative number if `a` < `b`
     *                   - 0 if `a` === `b`
     *                   - a positive number if `a` > `b`
     *                   Defaults to a standard numeric comparison for numbers.
     */
    constructor(comparator?: (a: T, b: T) => number) {
        this.heap = [];
        this.compare = comparator || ((a: T, b: T) => {
            if (typeof a === 'number' && typeof b === 'number') {
                return a - b;
            }
            // Fallback for non-numeric types if no comparator is provided
            // This might not be meaningful without a custom comparator
            throw new Error("Comparator required for non-numeric types or complex objects.");
        });
    }

    /**
     * Returns the number of elements in the heap.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public size(): number {
        return this.heap.length;
    }

    /**
     * Checks if the heap is empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    /**
     * Returns the smallest element in the heap without removing it.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns The smallest element, or `undefined` if the heap is empty.
     */
    public peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.heap[0];
    }

    /**
     * Inserts a new element into the heap.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     *                  This is because `heapifyUp` traverses up the height of the tree.
     * Space Complexity: O(1) (amortized for array resizing, but usually constant for the operation itself).
     * @param item The element to insert.
     */
    public insert(item: T): void {
        this.heap.push(item);
        this.heapifyUp(this.heap.length - 1);
    }

    /**
     * Extracts and returns the smallest element from the heap.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     *                  This is due to `heapifyDown` traversing the height of the tree.
     * Space Complexity: O(1)
     * @returns The smallest element, or `undefined` if the heap is empty.
     */
    public extractMin(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];
        // Move the last element to the root
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown(0); // Restore heap property starting from the root
        return min;
    }

    /**
     * Restores the min-heap property by moving an element up the heap.
     * This is called after insertion.
     * Time Complexity: O(log N)
     * @param index The index of the element to heapify up.
     */
    private heapifyUp(index: number): void {
        let currentIndex = index;
        let parentIndex = ArrayUtils.getParentIndex(currentIndex);

        // While current element is smaller than its parent and not at the root
        while (currentIndex > 0 && this.compare(this.heap[currentIndex], this.heap[parentIndex]) < 0) {
            ArrayUtils.swap(this.heap, currentIndex, parentIndex);
            currentIndex = parentIndex;
            parentIndex = ArrayUtils.getParentIndex(currentIndex);
        }
    }

    /**
     * Restores the min-heap property by moving an element down the heap.
     * This is called after extraction.
     * Time Complexity: O(log N)
     * @param index The index of the element to heapify down.
     */
    private heapifyDown(index: number): void {
        let currentIndex = index;
        const lastIndex = this.heap.length - 1;

        while (true) {
            let leftChildIndex = ArrayUtils.getLeftChildIndex(currentIndex);
            let rightChildIndex = ArrayUtils.getRightChildIndex(currentIndex);
            let smallestIndex = currentIndex;

            // Find the smallest among current node, left child, and right child
            if (leftChildIndex <= lastIndex && this.compare(this.heap[leftChildIndex], this.heap[smallestIndex]) < 0) {
                smallestIndex = leftChildIndex;
            }

            if (rightChildIndex <= lastIndex && this.compare(this.heap[rightChildIndex], this.heap[smallestIndex]) < 0) {
                smallestIndex = rightChildIndex;
            }

            // If the current node is not the smallest, swap and continue heapifying down
            if (smallestIndex !== currentIndex) {
                ArrayUtils.swap(this.heap, currentIndex, smallestIndex);
                currentIndex = smallestIndex;
            } else {
                // Heap property is restored
                break;
            }
        }
    }

    /**
     * Builds a min-heap from an array of elements.
     * This is an optimization for creating a heap from existing data.
     * Time Complexity: O(N), where N is the number of elements.
     *                  While each heapifyDown is O(log N), the overall cost is O(N)
     *                  because most elements are in the lower levels of the tree.
     * Space Complexity: O(1) (in-place modification of the array).
     * @param items The array of items to build the heap from.
     * @param comparator An optional comparator specific to this build operation.
     */
    public static buildHeap<T>(items: T[], comparator?: (a: T, b: T) => number): MinHeap<T> {
        const heap = new MinHeap<T>(comparator);
        heap.heap = [...items]; // Copy items to internal array

        // Start heapifying from the last non-leaf node up to the root
        // The last non-leaf node is at index floor(N/2) - 1
        for (let i = Math.floor(heap.heap.length / 2) - 1; i >= 0; i--) {
            heap.heapifyDown(i);
        }
        return heap;
    }

    /**
     * Returns the internal array representing the heap (for debugging/testing).
     * Do not modify this array directly outside the heap's public methods.
     */
    public _getHeapArray(): T[] {
        return this.heap;
    }
}