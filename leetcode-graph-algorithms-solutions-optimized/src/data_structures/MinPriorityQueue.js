```javascript
/**
 * MinPriorityQueue.js
 *
 * Implements a Min-Heap based Priority Queue.
 * Stores elements as objects: { value: any, priority: number }.
 * Elements with lower priority numbers have higher priority.
 * Designed for algorithms like Dijkstra's.
 */

class MinPriorityQueue {
    constructor() {
        this.heap = [];
        this.size = 0; // Current number of elements in the queue
    }

    /**
     * Adds an element to the priority queue.
     * @param {any} value - The actual value to store.
     * @param {number} priority - The priority of the value (lower number = higher priority).
     */
    enqueue(value, priority) {
        const entry = { value, priority };
        this.heap.push(entry);
        this.size++;
        this.bubbleUp(this.size - 1); // Maintain heap property
    }

    /**
     * Removes and returns the element with the highest priority (lowest priority number).
     * @returns {object | undefined} The { value, priority } object, or undefined if queue is empty.
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size === 1) {
            this.size--;
            return this.heap.pop();
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop(); // Move last element to root
        this.size--;
        this.sinkDown(0); // Maintain heap property
        return min;
    }

    /**
     * Returns the element with the highest priority without removing it.
     * @returns {object | undefined} The { value, priority } object, or undefined if queue is empty.
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.heap[0];
    }

    /**
     * Checks if the priority queue is empty.
     * @returns {boolean} True if empty, false otherwise.
     */
    isEmpty() {
        return this.size === 0;
    }

    /**
     * Helper function to move an element up the heap to maintain heap property.
     * @param {number} index - The index of the element to bubble up.
     */
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].priority >= this.heap[parentIndex].priority) {
                break; // Correct position found
            }
            // Swap with parent
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    /**
     * Helper function to move an element down the heap to maintain heap property.
     * @param {number} index - The index of the element to sink down.
     */
    sinkDown(index) {
        const len = this.size;
        const element = this.heap[index];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let swapIndex = null;

            // Check left child
            if (leftChildIndex < len) {
                const leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swapIndex = leftChildIndex;
                }
            }

            // Check right child
            if (rightChildIndex < len) {
                const rightChild = this.heap[rightChildIndex];
                // If right child exists and has higher priority than current (or left child if it's already candidate for swap)
                if (
                    (swapIndex === null && rightChild.priority < element.priority) ||
                    (swapIndex !== null && rightChild.priority < this.heap[leftChildIndex].priority)
                ) {
                    swapIndex = rightChildIndex;
                }
            }

            if (swapIndex === null) {
                break; // No swap needed, element is in correct position
            }

            // Perform swap
            [this.heap[index], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[index]];
            index = swapIndex;
        }
    }

    /**
     * Clears all elements from the priority queue.
     */
    clear() {
        this.heap = [];
        this.size = 0;
    }
}

module.exports = MinPriorityQueue;
```