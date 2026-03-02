```javascript
/**
 * @fileoverview Defines the Node and LinkedList classes for use in linked list problems.
 */

/**
 * Represents a single node in a singly-linked list.
 * @class
 */
class Node {
    /**
     * Creates an instance of Node.
     * @param {*} val The value stored in the node.
     * @param {Node|null} next The next node in the list, or null if it's the last node.
     */
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Represents a singly-linked list.
 * Provides utility methods for list manipulation and creation.
 * @class
 */
class LinkedList {
    /**
     * Creates an instance of LinkedList.
     * @param {Node|null} head The head node of the list. Defaults to null for an empty list.
     */
    constructor(head = null) {
        this.head = head;
        this.size = 0; // Keep track of size for convenience, though not strictly necessary for all problems
        if (head) {
            let current = head;
            while (current) {
                this.size++;
                current = current.next;
            }
        }
    }

    /**
     * Adds a new node with the given value to the end of the list.
     * @param {*} val The value to add.
     * @returns {LinkedList} The current LinkedList instance for chaining.
     * @complexity Time: O(N) in worst case (traverse to end), O(1) if list is empty.
     *             Space: O(1)
     */
    add(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
        return this; // Allow chaining
    }

    /**
     * Adds a new node with the given value to the head of the list.
     * @param {*} val The value to add.
     * @returns {LinkedList} The current LinkedList instance for chaining.
     * @complexity Time: O(1)
     *             Space: O(1)
     */
    addAtHead(val) {
        const newNode = new Node(val, this.head);
        this.head = newNode;
        this.size++;
        return this;
    }

    /**
     * Converts the linked list to an array of its values.
     * @returns {Array<*>} An array containing all values in the list in order.
     * @complexity Time: O(N)
     *             Space: O(N) (for the new array)
     */
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        return result;
    }

    /**
     * Creates a new LinkedList instance from an array of values.
     * @static
     * @param {Array<*>} arr The array of values to convert into a linked list.
     * @returns {Node|null} The head node of the newly created linked list, or null if the array is empty.
     * @complexity Time: O(N)
     *             Space: O(N) (for the new nodes)
     */
    static fromArray(arr) {
        if (!arr || arr.length === 0) {
            return null;
        }

        const dummyHead = new Node(0); // Use a dummy head to simplify initial node creation
        let current = dummyHead;

        for (const val of arr) {
            current.next = new Node(val);
            current = current.next;
        }

        return dummyHead.next; // The actual head of the list
    }

    /**
     * Prints the linked list to the console.
     * @complexity Time: O(N)
     *             Space: O(N) (for the string representation)
     */
    print() {
        console.log(this.toArray().join(' -> ') || 'Empty List');
    }

    /**
     * Returns the head node of the linked list.
     * @returns {Node|null} The head node, or null if the list is empty.
     * @complexity Time: O(1)
     *             Space: O(1)
     */
    getHead() {
        return this.head;
    }

    /**
     * Creates a cycle in the linked list at a specified position.
     * This is a utility for testing cycle detection problems.
     * @param {number} pos The 0-indexed position where the cycle should begin.
     *                     -1 indicates no cycle (though the function will not create one).
     * @returns {Node|null} The head node of the list, potentially with a cycle.
     * @throws {Error} If pos is out of bounds for the current list.
     * @complexity Time: O(N)
     *             Space: O(1)
     */
    hasCycle(pos) {
        if (!this.head || pos < -1) {
            throw new Error("Invalid position for creating a cycle or empty list.");
        }
        if (pos === -1) {
            return this.head; // No cycle
        }

        let tail = this.head;
        let cycleStartNode = null;
        let i = 0;

        while (tail.next) {
            if (i === pos) {
                cycleStartNode = tail;
            }
            tail = tail.next;
            i++;
        }

        // Check if cycleStartNode was found (pos was within bounds)
        if (!cycleStartNode) {
            if (pos === i) { // Cycle starts at the very last node itself
                cycleStartNode = tail;
            } else {
                throw new Error(`Cycle position ${pos} is out of bounds for list of size ${i + 1}.`);
            }
        }

        // Create the cycle by pointing the tail to the cycleStartNode
        tail.next = cycleStartNode;
        return this.head;
    }
}

module.exports = {
    Node,
    LinkedList
};
```