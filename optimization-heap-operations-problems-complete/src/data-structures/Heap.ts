```typescript
import { Comparator, defaultCompare, reverseComparator } from '../utils/comparator';

/**
 * Represents a Heap data structure.
 * It can function as a Min-Heap or a Max-Heap based on the provided comparator.
 *
 * An array-based binary heap implementation.
 *
 * @template T The type of elements stored in the heap.
 */
export class Heap<T> {
    private heap: T[];
    private compare: Comparator<T>;

    /**
     * Creates a new Heap instance.
     * @param comparator An optional custom comparison function.
     *                   For a Min-Heap, `(a, b) => a - b` (or `defaultCompare`).
     *                   For a Max-Heap, `(a, b) => b - a` (or `reverseComparator(defaultCompare)`).
     *                   If not provided, defaults to a Min-Heap for numbers.
     */
    constructor(comparator?: Comparator<T>) {
        this.heap = [];
        // Default to Min-Heap behavior if no comparator is provided
        // This cast is safe if the heap is only used with numbers or objects that can be compared this way
        this.compare = comparator || (defaultCompare as Comparator<T>);
    }

    /**
     * Returns the number of elements in the heap.
     * Time Complexity: O(1)
     */
    public size(): number {
        return this.heap.length;
    }

    /**
     * Checks if the heap is empty.
     * Time Complexity: O(1)
     */
    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    /**
     * Returns the top element of the heap without removing it.
     * For a Min-Heap, this is the smallest element. For a Max-Heap, it's the largest.
     * Time Complexity: O(1)
     * @returns The top element, or `undefined` if the heap is empty.
     */
    public peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.heap[0];
    }

    /**
     * Adds a new element to the heap.
     * The element is added to the end and then 'heapified up' to maintain the heap property.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     * @param item The element to add.
     */
    public insert(item: T): void {
        this.heap.push(item);
        this.heapifyUp();
    }

    /**
     * Removes and returns the top element of the heap.
     * The last element is moved to the root, and then 'heapified down' to maintain the heap property.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     * @returns The top element, or `undefined` if the heap is empty.
     */
    public extract(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.pop();
        }

        const top = this.heap[0];
        // Move the last element to the root and remove the last element
        this.heap[0] = this.heap.pop()!; // '!' asserts that pop() will not return undefined here
        this.heapifyDown();
        return top;
    }

    /**
     * Corrects the heap property by moving the last inserted element upwards.
     * Starts from the last element and swaps it with its parent if it violates the heap property.
     * Time Complexity: O(log N)
     */
    protected heapifyUp(): void {
        let currentIndex = this.size() - 1;
        while (this.hasParent(currentIndex) && this.shouldSwap(this.getParentIndex(currentIndex), currentIndex)) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    /**
     * Corrects the heap property by moving the root element downwards.
     * Starts from the root and swaps it with its smallest (or largest) child if it violates the heap property.
     * Time Complexity: O(log N)
     */
    protected heapifyDown(): void {
        let currentIndex = 0;
        while (this.hasLeftChild(currentIndex)) {
            let smallerChildIndex = this.getLeftChildIndex(currentIndex);
            if (this.hasRightChild(currentIndex) && this.shouldSwap(smallerChildIndex, this.getRightChildIndex(currentIndex))) {
                smallerChildIndex = this.getRightChildIndex(currentIndex);
            }

            if (this.shouldSwap(currentIndex, smallerChildIndex)) {
                this.swap(currentIndex, smallerChildIndex);
                currentIndex = smallerChildIndex;
            } else {
                break; // Heap property is satisfied
            }
        }
    }

    /**
     * Determines if a swap should occur based on the comparator.
     * For a Min-Heap, returns `true` if parent > child.
     * For a Max-Heap, returns `true` if parent < child.
     * @param parentIndex Index of the parent element.
     * @param childIndex Index of the child element.
     * @returns `true` if the elements at parentIndex and childIndex should be swapped.
     */
    protected shouldSwap(parentIndex: number, childIndex: number): boolean {
        // If comparator(parent, child) > 0, it means parent is "greater" than child according to the comparator.
        // For Min-Heap, this means parent > child, so we swap.
        // For Max-Heap, this means parent < child, so we swap.
        return this.compare(this.heap[parentIndex], this.heap[childIndex]) > 0;
    }

    /**
     * Swaps two elements in the heap array.
     * @param indexOne The index of the first element.
     * @param indexTwo The index of the second element.
     */
    protected swap(indexOne: number, indexTwo: number): void {
        [this.heap[indexOne], this.heap[indexTwo]] = [this.heap[indexTwo], this.heap[indexOne]];
    }

    // --- Helper functions for calculating child/parent indices ---

    protected getLeftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }

    protected getRightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }

    protected getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    protected hasLeftChild(parentIndex: number): boolean {
        return this.getLeftChildIndex(parentIndex) < this.size();
    }

    protected hasRightChild(parentIndex: number): boolean {
        return this.getRightChildIndex(parentIndex) < this.size();
    }

    protected hasParent(childIndex: number): boolean {
        return this.getParentIndex(childIndex) >= 0;
    }

    // --- Utility methods for specific heap types ---

    /**
     * Static factory method to create a Min-Heap.
     * @param comparator Optional custom comparator for min-heap behavior.
     *                   If not provided, `defaultCompare` (ascending) is used.
     */
    public static createMinHeap<T>(comparator?: Comparator<T>): Heap<T> {
        // Ensure that if a custom comparator is provided, it truly represents min-heap logic.
        // Otherwise, fall back to default numeric ascending for safety/clarity.
        const effectiveComparator = comparator || defaultCompare as Comparator<T>;
        return new Heap<T>(effectiveComparator);
    }

    /**
     * Static factory method to create a Max-Heap.
     * @param comparator Optional custom comparator for max-heap behavior.
     *                   If not provided, `reverseComparator(defaultCompare)` (descending) is used.
     */
    public static createMaxHeap<T>(comparator?: Comparator<T>): Heap<T> {
        // If a custom comparator is provided for max-heap, it should already be designed for max-heap logic.
        // If no custom comparator, we reverse the default (numeric ascending) to get numeric descending.
        const effectiveComparator = comparator || reverseComparator(defaultCompare as Comparator<T>);
        return new Heap<T>(effectiveComparator);
    }
}
```