import { ArrayUtils } from '../utils/arrayUtils';

/**
 * A generic Max-Heap implementation.
 * It stores elements such that the largest element is always at the root.
 *
 * @template T The type of elements stored in the heap.
 */
export class MaxHeap<T> {
    private heap: T[];
    private compare: (a: T, b: T) => number;

    /**
     * Initializes a new MaxHeap.
     * @param comparator An optional function to compare two elements.
     *                   It should return:
     *                   - a negative number if `a` < `b`
     *                   - 0 if `a` === `b`
     *                   - a positive number if `a` > `b`
     *                   Defaults to a standard numeric comparison for numbers (a-b will be flipped for MaxHeap).
     */
    constructor(comparator?: (a: T, b: T) => number) {
        this.heap = [];
        // For a MaxHeap, we want a "greater than" comparison to determine priority.
        // If comparator(a, b) > 0 means a is "greater", then we want to keep a higher in the heap.
        // The default `a - b` for numbers means: if a > b, result > 0.
        // To make it a MaxHeap, we need to treat larger numbers as having higher priority when moving up.
        // Our heapify logic expects 'smaller' for MinHeap, so for MaxHeap we use 'greater'.
        this.compare = comparator || ((a: T, b: T) => {
            if (typeof a === 'number' && typeof b === 'number') {
                return b - a; // Flipped comparison for MaxHeap: larger number -> smaller result (higher priority)
            }
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
     * Returns the largest element in the heap without removing it.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns The largest element, or `undefined` if the heap is empty.
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
     * Space Complexity: O(1)
     * @param item The element to insert.
     */
    public insert(item: T): void {
        this.heap.push(item);
        this.heapifyUp(this.heap.length - 1);
    }

    /**
     * Extracts and returns the largest element from the heap.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     * Space Complexity: O(1)
     * @returns The largest element, or `undefined` if the heap is empty.
     */
    public extractMax(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const max = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown(0);
        return max;
    }

    /**
     * Restores the max-heap property by moving an element up the heap.
     * This is called after insertion.
     * Time Complexity: O(log N)
     * @param index The index of the element to heapify up.
     */
    private heapifyUp(index: number): void {
        let currentIndex = index;
        let parentIndex = ArrayUtils.getParentIndex(currentIndex);

        // While current element is larger than its parent and not at the root
        // Note: For MaxHeap, 'this.compare(a, b) < 0' means 'a' is "greater" than 'b'
        // due to the flipped comparator (b-a). So we want a > b (or compare(b,a) > 0) to swap up.
        // It's equivalent to this.compare(this.heap[currentIndex], this.heap[parentIndex]) < 0 with default b-a comparator
        // or compare (this.heap[currentIndex], this.heap[parentIndex]) > 0 if using a-b and checking against parent.
        // Let's stick to consistent interpretation for comparison:
        // `compare(a,b) < 0` means 'a' has higher priority than 'b' (a should come before b).
        // For MinHeap, smaller numbers have higher priority. For MaxHeap, larger numbers have higher priority.
        // So, if current element has higher priority than parent, swap.
        while (currentIndex > 0 && this.compare(this.heap[currentIndex], this.heap[parentIndex]) < 0) {
            ArrayUtils.swap(this.heap, currentIndex, parentIndex);
            currentIndex = parentIndex;
            parentIndex = ArrayUtils.getParentIndex(currentIndex);
        }
    }

    /**
     * Restores the max-heap property by moving an element down the heap.
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
            let largestIndex = currentIndex;

            // Find the largest among current node, left child, and right child
            // Note: `compare(a, b) < 0` means 'a' is "greater" than 'b' (has higher priority for MaxHeap)
            if (leftChildIndex <= lastIndex && this.compare(this.heap[leftChildIndex], this.heap[largestIndex]) < 0) {
                largestIndex = leftChildIndex;
            }

            if (rightChildIndex <= lastIndex && this.compare(this.heap[rightChildIndex], this.heap[largestIndex]) < 0) {
                largestIndex = rightChildIndex;
            }

            // If the current node is not the largest, swap and continue heapifying down
            if (largestIndex !== currentIndex) {
                ArrayUtils.swap(this.heap, currentIndex, largestIndex);
                currentIndex = largestIndex;
            } else {
                // Heap property is restored
                break;
            }
        }
    }

    /**
     * Builds a max-heap from an array of elements.
     * Time Complexity: O(N)
     * Space Complexity: O(1)
     * @param items The array of items to build the heap from.
     * @param comparator An optional comparator specific to this build operation.
     */
    public static buildHeap<T>(items: T[], comparator?: (a: T, b: T) => number): MaxHeap<T> {
        const heap = new MaxHeap<T>(comparator);
        heap.heap = [...items]; // Copy items to internal array

        // Start heapifying from the last non-leaf node up to the root
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