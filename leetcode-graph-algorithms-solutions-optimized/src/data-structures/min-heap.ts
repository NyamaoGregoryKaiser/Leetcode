```typescript
import { PriorityQueueElement } from '../types';

/**
 * Min-Heap implementation for use in algorithms like Dijkstra's.
 * Stores elements with a priority, always allowing quick access to the element with the minimum priority.
 */
export class MinHeap<T> {
    private heap: PriorityQueueElement<T>[];

    constructor() {
        this.heap = [];
    }

    /**
     * Returns the number of elements in the heap.
     * Time Complexity: O(1)
     */
    size(): number {
        return this.heap.length;
    }

    /**
     * Checks if the heap is empty.
     * Time Complexity: O(1)
     */
    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    /**
     * Inserts a value with an associated priority into the heap.
     * The new element is added to the end and then bubbled up to maintain heap property.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     * Space Complexity: O(1) for the operation itself, O(N) for the heap storage.
     * @param value The value to insert.
     * @param priority The priority of the value (lower priority means higher importance/smaller value).
     */
    insert(value: T, priority: number): void {
        this.heap.push({ value, priority });
        this.bubbleUp();
    }

    /**
     * Returns the element with the minimum priority without removing it.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     * @returns The element with minimum priority, or undefined if the heap is empty.
     */
    peek(): PriorityQueueElement<T> | undefined {
        return this.heap[0];
    }

    /**
     * Removes and returns the element with the minimum priority.
     * The last element is moved to the root, and then bubbled down to maintain heap property.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     * Space Complexity: O(1) for the operation itself.
     * @returns The element with minimum priority, or undefined if the heap is empty.
     */
    extractMin(): PriorityQueueElement<T> | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.pop();
        }

        // Swap the root with the last element
        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown();
        return min;
    }

    /**
     * Bubbles up the last element to its correct position in the heap.
     * Called after an insert operation.
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     */
    private bubbleUp(): void {
        let currentIndex = this.heap.length - 1;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[currentIndex].priority < this.heap[parentIndex].priority) {
                // Swap if child has higher priority (smaller value) than parent
                [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
                currentIndex = parentIndex;
            } else {
                break; // Heap property satisfied
            }
        }
    }

    /**
     * Bubbles down the root element to its correct position in the heap.
     * Called after an extractMin operation.
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     */
    private bubbleDown(): void {
        let currentIndex = 0;
        const lastIndex = this.heap.length - 1;

        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let smallestChildIndex = currentIndex;

            // Check if left child exists and has a higher priority
            if (leftChildIndex <= lastIndex && this.heap[leftChildIndex].priority < this.heap[smallestChildIndex].priority) {
                smallestChildIndex = leftChildIndex;
            }

            // Check if right child exists and has a higher priority
            if (rightChildIndex <= lastIndex && this.heap[rightChildIndex].priority < this.heap[smallestChildIndex].priority) {
                smallestChildIndex = rightChildIndex;
            }

            // If the current element is not the smallest, swap with the smallest child
            if (smallestChildIndex !== currentIndex) {
                [this.heap[currentIndex], this.heap[smallestChildIndex]] = [this.heap[smallestChildIndex], this.heap[currentIndex]];
                currentIndex = smallestChildIndex;
            } else {
                break; // Heap property satisfied
            }
        }
    }
}
```