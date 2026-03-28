```javascript
/**
 * maxHeap.js
 *
 * Implements a Max-Heap using the generic Heap base class.
 * In a Max-Heap, the largest element is always at the root.
 * The comparator function ensures that `a` comes before `b` if `a > b`.
 */

const Heap = require('./heap');

class MaxHeap extends Heap {
    /**
     * Constructs a new Max-Heap.
     * The comparator `(a, b) => a > b` ensures that the parent is always greater than or equal to its children.
     */
    constructor() {
        super((a, b) => a > b); // For a max-heap, 'a' comes before 'b' if 'a' is larger than 'b'.
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
     * @returns {*} The largest element in the heap, or undefined if empty.
     */
    peekMax() {
        return super.peek();
    }

    /**
     * Alias for `extract`.
     * @returns {*} The largest element in the heap, removed, or undefined if empty.
     */
    extractMax() {
        return super.extract();
    }
}

module.exports = MaxHeap;
```