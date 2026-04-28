```javascript
/**
 * PriorityQueue.js
 * Implements a Min-Priority Queue using a binary min-heap.
 * This is essential for algorithms like Dijkstra's, where we need to
 * efficiently retrieve the element with the smallest priority.
 *
 * Each element in the queue is expected to be an object with a 'priority' property.
 * For example: `{ value: 'A', priority: 0 }`
 */
class PriorityQueue {
    constructor() {
        this.heap = []; // Array to store heap elements
    }

    /**
     * Gets the number of elements in the priority queue.
     * @returns {number} - The number of elements.
     */
    size() {
        return this.heap.length;
    }

    /**
     * Checks if the priority queue is empty.
     * @returns {boolean} - True if empty, false otherwise.
     */
    isEmpty() {
        return this.heap.length === 0;
    }

    /**
     * Adds an element to the priority queue.
     * The element should be an object with a 'priority' property.
     * @param {object} element - The element to add (e.g., { value: 'A', priority: 5 }).
     */
    enqueue(element) {
        this.heap.push(element); // Add to the end
        this.bubbleUp(); // Restore heap property
    }

    /**
     * Removes and returns the element with the smallest priority.
     * @returns {object|undefined} - The element with the smallest priority, or undefined if empty.
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.pop(); // Only one element, just remove it
        }

        // Swap root with last element
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.sinkDown(); // Restore heap property
        return min;
    }

    /**
     * Returns the element with the smallest priority without removing it.
     * @returns {object|undefined} - The element with the smallest priority, or undefined if empty.
     */
    peek() {
        return this.heap[0];
    }

    /**
     * Restores the min-heap property by bubbling up an element from the bottom.
     * Used after an enqueue operation.
     */
    bubbleUp() {
        let index = this.heap.length - 1;
        const element = this.heap[index];

        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            // If the element's priority is greater than or equal to its parent's, it's in correct position
            if (element.priority >= parent.priority) {
                break;
            }

            // Otherwise, swap with parent
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex; // Update index to continue bubbling up
        }
    }

    /**
     * Restores the min-heap property by sinking down an element from the top.
     * Used after a dequeue operation.
     */
    sinkDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null; // Stores the index of the child to swap with

            // Check if left child exists and has a smaller priority
            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }

            // Check if right child exists and has a smaller priority than current element
            // AND potentially smaller than the left child (if a swap with left was already determined)
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            // If no child has a smaller priority, element is in correct position
            if (swap === null) {
                break;
            }

            // Swap element with the smaller child
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap; // Move down to the swapped position
        }
    }

    /**
     * Updates the priority of an existing element.
     * This is an O(N) operation if we don't have a direct reference to the element's index.
     * For Dijkstra's, this might mean simply adding a new entry with updated priority,
     * which is fine because the algorithm naturally handles redundant entries by ignoring older ones.
     * However, for a "true" update in the heap, a more complex heap structure (e.g., Fibonacci heap)
     * or a mapping of value to index is needed. For simplicity and typical interview contexts,
     * adding a new entry (and implicitly handling "stale" entries) is often acceptable.
     *
     * In this implementation, we re-insert the item. This means older entries might still be in the heap
     * but will be ignored when dequeued if a lower-priority (newer) entry for the same value has already been processed.
     * This is a common and acceptable simplification for Dijkstra's in interviews.
     *
     * @param {any} value - The value of the element to update.
     * @param {number} newPriority - The new priority for the element.
     */
    updatePriority(value, newPriority) {
        // Find the element with the given value. This is O(N).
        // A more efficient update would require storing indices or using a specialized heap.
        // For Dijkstra's, it's often simpler to just add a new entry with the updated priority
        // and let the algorithm naturally pick the lowest-priority entry for a given node.
        // This 'lazy deletion' approach is often accepted in interviews.
        // If strict in-place update is required for a heap, you'd need a map `value -> index_in_heap`.

        // For this project, we demonstrate the "lazy update" by just adding a new element
        // if the priority is truly lower. Dijkstra's algorithm will naturally handle this.
        this.enqueue({ value, priority: newPriority });
        // The calling algorithm (Dijkstra) must ensure that it only processes the first
        // (lowest priority) instance of a node it encounters.
    }
}

module.exports = PriorityQueue;
```