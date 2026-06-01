```typescript
/**
 * Represents an element stored in the PriorityQueue.
 * Used to store arbitrary data with an associated numeric priority.
 */
interface PriorityQueueElement<T> {
    value: T;
    priority: number;
}

/**
 * Implements a Min-Priority Queue using a binary heap.
 * It's generic, allowing any type T to be stored, prioritized by a number.
 *
 * Key features:
 * - `insert`: Adds an element with its priority. O(log N)
 * - `extractMin`: Removes and returns the element with the smallest priority. O(log N)
 * - `peek`: Returns the element with the smallest priority without removing it. O(1)
 * - `isEmpty`: Checks if the queue is empty. O(1)
 * - `size`: Returns the number of elements. O(1)
 *
 * This implementation does not support `decreaseKey` directly by element reference,
 * which means if you update a priority of an existing element, you'd typically re-insert
 * it and handle duplicate/stale entries when extracted (by checking if a shorter distance
 * has already been processed for that node, common in Dijkstra's).
 */
export class PriorityQueue<T> {
    private heap: PriorityQueueElement<T>[];

    constructor() {
        this.heap = [];
    }

    /**
     * Returns the number of elements in the priority queue.
     * Time Complexity: O(1)
     */
    size(): number {
        return this.heap.length;
    }

    /**
     * Checks if the priority queue is empty.
     * Time Complexity: O(1)
     */
    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    /**
     * Inserts an element with its priority into the queue.
     * The heap property is maintained by bubbling up the new element.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     * @param value - The value to store.
     * @param priority - The priority of the value (lower numbers mean higher priority).
     */
    insert(value: T, priority: number): void {
        const element: PriorityQueueElement<T> = { value, priority };
        this.heap.push(element);
        this.bubbleUp();
    }

    /**
     * Removes and returns the element with the highest priority (lowest priority number).
     * The heap property is maintained by bubbling down the new root.
     * Time Complexity: O(log N)
     * @returns The element with the smallest priority, or undefined if the queue is empty.
     */
    extractMin(): PriorityQueueElement<T> | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.pop();
        }

        // Store the minimum element to return
        const min = this.heap[0];
        // Move the last element to the root
        this.heap[0] = this.heap.pop()!; // Pop removes and returns last, ! asserts it exists
        // Re-heapify by bubbling down the new root
        this.bubbleDown();
        return min;
    }

    /**
     * Returns the element with the highest priority (lowest priority number) without removing it.
     * Time Complexity: O(1)
     * @returns The element with the smallest priority, or undefined if the queue is empty.
     */
    peek(): PriorityQueueElement<T> | undefined {
        return this.heap.length > 0 ? this.heap[0] : undefined;
    }

    /**
     * Helper method to maintain the min-heap property by moving an element up the heap.
     * This is called after an insertion.
     * Time Complexity: O(log N)
     */
    private bubbleUp(): void {
        let index = this.heap.length - 1;
        const element = this.heap[index];

        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (element.priority >= parent.priority) {
                // Element is in correct position relative to parent
                break;
            }

            // Swap element with parent
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    /**
     * Helper method to maintain the min-heap property by moving an element down the heap.
     * This is called after `extractMin`.
     * Time Complexity: O(log N)
     */
    private bubbleDown(): void {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap: number | null = null; // Index of child to swap with

            // Check left child
            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }

            // Check right child
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                // If right child exists and has higher priority than current element
                // AND either there's no left child to swap with, or right child has higher priority than left child
                if (rightChild.priority < (swap === null ? element.priority : leftChild!.priority)) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) {
                // No swap needed, element is in correct position
                break;
            }

            // Perform swap
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap; // Move down to the swapped position
        }
    }
}
```