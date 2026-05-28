```javascript
/**
 * Node class for the Doubly Linked List used in Deque.
 */
class DequeNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

/**
 * Custom Deque (Double-Ended Queue) implementation using a Doubly Linked List.
 * This provides O(1) time complexity for adding and removing elements from both ends.
 * Essential for problems like Sliding Window Maximum.
 */
class Deque {
    constructor() {
        this.head = null; // Front of the deque
        this.tail = null; // Back of the deque
        this.count = 0;   // Number of elements in the deque
    }

    /**
     * Adds an element to the front of the deque.
     * @param {*} value - The element to add.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addFront(value) {
        const newNode = new DequeNode(value);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.count++;
    }

    /**
     * Adds an element to the back of the deque.
     * @param {*} value - The element to add.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addBack(value) {
        const newNode = new DequeNode(value);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.count++;
    }

    /**
     * Removes and returns the element from the front of the deque.
     * @returns {*} The element removed, or `undefined` if empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    removeFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        const removedValue = this.head.value;
        if (this.head === this.tail) { // Only one element
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this.count--;
        return removedValue;
    }

    /**
     * Removes and returns the element from the back of the deque.
     * @returns {*} The element removed, or `undefined` if empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    removeBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        const removedValue = this.tail.value;
        if (this.head === this.tail) { // Only one element
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.count--;
        return removedValue;
    }

    /**
     * Returns the element at the front of the deque without removing it.
     * @returns {*} The element at the front, or `undefined` if empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peekFront() {
        return this.head ? this.head.value : undefined;
    }

    /**
     * Returns the element at the back of the deque without removing it.
     * @returns {*} The element at the back, or `undefined` if empty.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    peekBack() {
        return this.tail ? this.tail.value : undefined;
    }

    /**
     * Checks if the deque is empty.
     * @returns {boolean} `true` if empty, `false` otherwise.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    isEmpty() {
        return this.count === 0;
    }

    /**
     * Returns the number of elements in the deque.
     * @returns {number} The size of the deque.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    size() {
        return this.count;
    }

    /**
     * Clears all elements from the deque.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    clear() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    /**
     * Converts the deque to an array.
     * @returns {Array} An array representation of the deque from front to back.
     * Time Complexity: O(N) where N is the number of elements.
     * Space Complexity: O(N) for the new array.
     */
    toArray() {
        const arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }

    /**
     * Returns a string representation of the deque.
     * For debugging or display purposes.
     * Time Complexity: O(N) where N is the number of elements.
     * Space Complexity: O(N) for the resulting string.
     * @returns {string} A string representation of the deque.
     */
    toString() {
        return this.toArray().join(' <-> ');
    }
}

module.exports = Deque;
```