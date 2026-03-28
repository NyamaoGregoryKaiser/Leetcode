```javascript
/**
 * heap.js
 *
 * This file provides a generic Heap base class that can be extended to create
 * specific Min-Heap or Max-Heap implementations by providing a custom comparator function.
 *
 * A Heap is a specialized tree-based data structure that satisfies the heap property:
 * - In a Min-Heap, the parent node is always smaller than or equal to its child nodes.
 * - In a Max-Heap, the parent node is always greater than or equal to its child nodes.
 *
 * Heaps are typically implemented using an array, where:
 * - The root element is at index 0.
 * - For any node at index `i`:
 *   - Its left child is at index `2*i + 1`.
 *   - Its right child is at index `2*i + 2`.
 *   - Its parent is at index `floor((i - 1) / 2)`.
 */

class Heap {
    /**
     * Constructs a new Heap.
     * @param {function(a, b): boolean} comparator - A function that returns true if 'a' should come before 'b'
     *                                             according to the heap property (e.g., for min-heap `a < b`, for max-heap `a > b`).
     */
    constructor(comparator) {
        this.heap = [];
        this.comparator = comparator;
    }

    /**
     * Returns the number of elements in the heap.
     * @returns {number} The size of the heap.
     */
    size() {
        return this.heap.length;
    }

    /**
     * Checks if the heap is empty.
     * @returns {boolean} True if the heap is empty, false otherwise.
     */
    isEmpty() {
        return this.size() === 0;
    }

    /**
     * Returns the element at the top of the heap without removing it.
     * @returns {*} The top element, or undefined if the heap is empty.
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.heap[0];
    }

    /**
     * Inserts a new element into the heap.
     * @param {*} value - The value to insert.
     * @returns {void}
     *
     * Time Complexity: O(log N) due to `heapifyUp` operation.
     * Space Complexity: O(1) for auxiliary space (excluding storage for heap itself).
     */
    insert(value) {
        this.heap.push(value);
        this._heapifyUp();
    }

    /**
     * Extracts (removes and returns) the element at the top of the heap.
     * @returns {*} The top element, or undefined if the heap is empty.
     *
     * Time Complexity: O(log N) due to `heapifyDown` operation.
     * Space Complexity: O(1) for auxiliary space.
     */
    extract() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.pop();
        }

        const root = this.heap[0];
        // Move the last element to the root position
        this.heap[0] = this.heap.pop();
        this._heapifyDown();
        return root;
    }

    /**
     * Swaps two elements in the heap array.
     * @param {number} i - Index of the first element.
     * @param {number} j - Index of the second element.
     * @returns {void}
     */
    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    /**
     * Returns the index of the parent of a node at a given index.
     * @param {number} i - The index of the node.
     * @returns {number} The parent index.
     */
    _getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }

    /**
     * Returns the index of the left child of a node at a given index.
     * @param {number} i - The index of the node.
     * @returns {number} The left child index.
     */
    _getLeftChildIndex(i) {
        return 2 * i + 1;
    }

    /**
     * Returns the index of the right child of a node at a given index.
     * @param {number} i - The index of the node.
     * @returns {number} The right child index.
     */
    _getRightChildIndex(i) {
        return 2 * i + 2;
    }

    /**
     * Moves an element up the heap to maintain the heap property after insertion.
     * It compares the element with its parent and swaps them if the heap property is violated.
     * Continues until the element is at the root or the heap property is satisfied.
     * @returns {void}
     */
    _heapifyUp() {
        let currentIndex = this.size() - 1;
        while (currentIndex > 0) {
            const parentIndex = this._getParentIndex(currentIndex);
            // If the current element should come before its parent based on comparator
            if (this.comparator(this.heap[currentIndex], this.heap[parentIndex])) {
                this._swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else {
                break; // Heap property satisfied
            }
        }
    }

    /**
     * Moves an element down the heap to maintain the heap property after extraction.
     * It compares the element with its children and swaps it with the appropriate child
     * (the smaller child for a min-heap, the larger for a max-heap) if the heap property is violated.
     * Continues until the element is a leaf or the heap property is satisfied.
     * @returns {void}
     */
    _heapifyDown() {
        let currentIndex = 0;
        const lastIndex = this.size() - 1;

        while (true) {
            const leftChildIndex = this._getLeftChildIndex(currentIndex);
            const rightChildIndex = this._getRightChildIndex(currentIndex);
            let targetIndex = currentIndex; // Assume current element is in the correct position

            // Determine which child (if any) should be swapped with the current element
            // based on the comparator.

            // Check left child
            if (leftChildIndex <= lastIndex &&
                this.comparator(this.heap[leftChildIndex], this.heap[targetIndex])) {
                targetIndex = leftChildIndex;
            }

            // Check right child
            // If right child is "more prioritized" than current target (which might be the left child),
            // then right child becomes the new target.
            if (rightChildIndex <= lastIndex &&
                this.comparator(this.heap[rightChildIndex], this.heap[targetIndex])) {
                targetIndex = rightChildIndex;
            }

            // If the current element is in its correct position (no child is "more prioritized"), stop.
            if (targetIndex === currentIndex) {
                break;
            }

            // Otherwise, swap with the target child and continue heapifying down.
            this._swap(currentIndex, targetIndex);
            currentIndex = targetIndex;
        }
    }
}

module.exports = Heap;
```