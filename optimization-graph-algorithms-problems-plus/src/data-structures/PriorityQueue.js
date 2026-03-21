/**
 * Represents an item in the priority queue.
 * @typedef {object} PriorityQueueItem
 * @property {*} element - The actual data element.
 * @property {number} priority - The priority of the element (lower number means higher priority).
 */

/**
 * Implements a Min-Priority Queue using a Min-Heap.
 * Supports efficient enqueue, dequeue, peek, and updating priority.
 * Uses a map to keep track of element positions in the heap array for O(log N) updatePriority.
 */
class PriorityQueue {
    constructor() {
        /**
         * The heap array stores objects { element, priority }.
         * @type {PriorityQueueItem[]}
         */
        this.heap = [];
        /**
         * A map to store the index of each element in the heap array.
         * This allows O(1) lookup of an element's position, crucial for updatePriority.
         * Maps element (string/number) to its index in the heap array.
         * @type {Map<*, number>}
         */
        this.elementIndexes = new Map();
    }

    /**
     * Gets the number of elements in the priority queue.
     * @returns {number} The size of the queue.
     */
    size() {
        return this.heap.length;
    }

    /**
     * Checks if the priority queue is empty.
     * @returns {boolean} True if empty, false otherwise.
     */
    isEmpty() {
        return this.heap.length === 0;
    }

    /**
     * Swaps two elements in the heap array and updates their indices in the elementIndexes map.
     * @param {number} idx1 - Index of the first element.
     * @param {number} idx2 - Index of the second element.
     */
    _swap(idx1, idx2) {
        const item1 = this.heap[idx1];
        const item2 = this.heap[idx2];

        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];

        this.elementIndexes.set(item1.element, idx2);
        this.elementIndexes.set(item2.element, idx1);
    }

    /**
     * Moves an element up the heap to maintain the min-heap property.
     * @param {number} index - The index of the element to bubble up.
     */
    _bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].priority < this.heap[parentIndex].priority) {
                this._swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    /**
     * Moves an element down the heap to maintain the min-heap property.
     * @param {number} index - The index of the element to sink down.
     */
    _sinkDown(index) {
        const lastIndex = this.heap.length - 1;
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let smallestChildIndex = index;

            if (leftChildIndex <= lastIndex && this.heap[leftChildIndex].priority < this.heap[smallestChildIndex].priority) {
                smallestChildIndex = leftChildIndex;
            }
            if (rightChildIndex <= lastIndex && this.heap[rightChildIndex].priority < this.heap[smallestChildIndex].priority) {
                smallestChildIndex = rightChildIndex;
            }

            if (smallestChildIndex !== index) {
                this._swap(index, smallestChildIndex);
                index = smallestChildIndex;
            } else {
                break;
            }
        }
    }

    /**
     * Adds an element with a given priority to the queue.
     * If the element already exists, its priority is updated if the new priority is lower.
     * @param {*} element - The element to add. Must be hashable (e.g., string, number).
     * @param {number} priority - The priority of the element (lower is higher priority).
     * @returns {void}
     *
     * Time Complexity: O(log N) due to bubbling up.
     * Space Complexity: O(1) for this operation, O(N) overall for storing N elements.
     */
    enqueue(element, priority) {
        // If element already exists, update its priority if new priority is lower
        if (this.elementIndexes.has(element)) {
            this.updatePriority(element, priority);
            return;
        }

        const newItem = { element, priority };
        this.heap.push(newItem);
        const newIndex = this.heap.length - 1;
        this.elementIndexes.set(element, newIndex);
        this._bubbleUp(newIndex);
    }

    /**
     * Removes and returns the element with the highest priority (lowest priority value).
     * @returns {PriorityQueueItem | null} The item with the highest priority, or null if the queue is empty.
     *
     * Time Complexity: O(log N) due to sinking down.
     * Space Complexity: O(1).
     */
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        const minItem = this.heap[0];
        const lastItem = this.heap.pop();
        this.elementIndexes.delete(minItem.element);

        if (!this.isEmpty()) {
            this.heap[0] = lastItem;
            this.elementIndexes.set(lastItem.element, 0);
            this._sinkDown(0);
        }

        return minItem;
    }

    /**
     * Returns the element with the highest priority without removing it.
     * @returns {PriorityQueueItem | null} The item with the highest priority, or null if the queue is empty.
     *
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     */
    peek() {
        return this.isEmpty() ? null : this.heap[0];
    }

    /**
     * Updates the priority of an existing element.
     * If the element doesn't exist, it's added with the new priority.
     * If the element exists and the new priority is higher (lower value), its position is updated.
     * @param {*} element - The element whose priority is to be updated.
     * @param {number} newPriority - The new priority value.
     * @returns {void}
     *
     * Time Complexity: O(log N) due to potential bubbleUp or sinkDown.
     * Space Complexity: O(1).
     */
    updatePriority(element, newPriority) {
        if (!this.elementIndexes.has(element)) {
            this.enqueue(element, newPriority); // Add if not present
            return;
        }

        const index = this.elementIndexes.get(element);
        const oldPriority = this.heap[index].priority;
        this.heap[index].priority = newPriority;

        if (newPriority < oldPriority) {
            this._bubbleUp(index);
        } else if (newPriority > oldPriority) {
            this._sinkDown(index);
        }
        // If newPriority === oldPriority, no action needed.
    }

    /**
     * Checks if a given element is present in the priority queue.
     * @param {*} element - The element to check for.
     * @returns {boolean} True if the element is in the queue, false otherwise.
     *
     * Time Complexity: O(1) due to direct lookup in `elementIndexes` map.
     * Space Complexity: O(1).
     */
    has(element) {
        return this.elementIndexes.has(element);
    }
}

module.exports = PriorityQueue;