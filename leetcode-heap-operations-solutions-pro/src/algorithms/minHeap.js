```javascript
/**
 * minHeap.js
 *
 * Implements a Min-Heap using the generic Heap base class.
 * In a Min-Heap, the smallest element is always at the root.
 * The comparator function ensures that `a` comes before `b` if `a < b`.
 */

const Heap = require('./heap');

class MinHeap extends Heap {
    /**
     * Constructs a new Min-Heap.
     * The comparator `(a, b) => a < b` ensures that the parent is always less than or equal to its children.
     */
    constructor() {
        super((a, b) => a < b); // For a min-heap, 'a' comes before 'b' if 'a' is smaller than 'b'.
    }

    /**
     * Alias for `insert`.
     * @param {*} value - The value to insert.
     */
    insert(value) {
        super.insert(value);
    }

    /**
     * Alias for `peek`.
     * @returns {*} The smallest element in the heap, or undefined if empty.
     */
    peekMin() {
        return super.peek();
    }

    /**
     * Alias for `extract`.
     * @returns {*} The smallest element in the heap, removed, or undefined if empty.
     */
    extractMin() {
        return super.extract();
    }
}

module.exports = MinHeap;
```