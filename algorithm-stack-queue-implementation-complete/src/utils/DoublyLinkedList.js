/**
 * Node for Doubly Linked List
 */
class ListNode {
    constructor(key, value) {
        this.key = key; // Stores key for O(1) access in Map for LRU
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * Doubly Linked List Implementation
 *
 * This specific implementation is optimized for use with an LRU Cache,
 * providing O(1) operations for adding, removing, and moving nodes.
 * It uses dummy head and tail nodes to simplify edge cases (empty list, single node).
 */
class DoublyLinkedList {
    constructor() {
        // Dummy head and tail nodes
        this.head = new ListNode(null, null);
        this.tail = new ListNode(null, null);

        // Link head and tail initially
        this.head.next = this.tail;
        this.tail.prev = this.head;

        this.size = 0; // Keep track of the number of actual nodes
    }

    /**
     * Adds a new node right after the head (most recently used).
     * @param {ListNode} node - The node to add.
     */
    addFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
        this.size++;
    }

    /**
     * Removes a given node from the list.
     * @param {ListNode} node - The node to remove.
     */
    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        node.prev = null; // Detach for garbage collection
        node.next = null; // Detach for garbage collection
        this.size--;
    }

    /**
     * Removes and returns the least recently used node (node before tail).
     * @returns {ListNode|null} The removed node, or null if list is empty.
     */
    removeTail() {
        if (this.size === 0) {
            return null;
        }
        const lastNode = this.tail.prev;
        this.removeNode(lastNode);
        return lastNode;
    }

    /**
     * Moves an existing node to the front (most recently used position).
     * This is equivalent to removing it and then adding it to the front.
     * @param {ListNode} node - The node to move.
     */
    moveToFront(node) {
        this.removeNode(node);
        this.addFront(node);
    }

    /**
     * Checks if the list is empty (contains no actual data nodes).
     * @returns {boolean} True if empty, false otherwise.
     */
    isEmpty() {
        return this.size === 0;
    }

    /**
     * Returns the number of actual data nodes in the list.
     * @returns {number} The current size.
     */
    getLength() {
        return this.size;
    }
}

module.exports = { ListNode, DoublyLinkedList };