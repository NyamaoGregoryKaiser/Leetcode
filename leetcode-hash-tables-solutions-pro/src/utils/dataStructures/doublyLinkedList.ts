```typescript
import { DLNode } from '../types';

/**
 * Represents a Node in a Doubly Linked List.
 * @template T - The type of the value stored in the node.
 */
class DoublyLinkedListNode<T> implements DLNode<T> {
    key: string | number;
    value: T;
    prev: DoublyLinkedListNode<T> | null;
    next: DoublyLinkedListNode<T> | null;

    /**
     * Creates a new DoublyLinkedListNode.
     * @param key - The key associated with the node (useful for hash map integration).
     * @param value - The value to store in the node.
     */
    constructor(key: string | number, value: T) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * Implements a Doubly Linked List.
 * This structure is often used in combination with Hash Maps for O(1) operations
 * when order (like LRU) and quick node removal/addition are required.
 * @template T - The type of values stored in the list.
 */
export class DoublyLinkedList<T> {
    head: DoublyLinkedListNode<T> | null;
    tail: DoublyLinkedListNode<T> | null;
    size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * Adds a new node with the given key and value to the head of the list.
     * This operation is O(1).
     * @param key - The key of the new node.
     * @param value - The value of the new node.
     * @returns The newly added node.
     */
    addHead(key: string | number, value: T): DoublyLinkedListNode<T> {
        const newNode = new DoublyLinkedListNode(key, value);
        if (!this.head) {
            // List is empty
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Add new node before the current head
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
        return newNode;
    }

    /**
     * Removes a specific node from the list.
     * This operation is O(1) given a reference to the node.
     * @param node - The node to remove.
     */
    removeNode(node: DoublyLinkedListNode<T>): void {
        if (!node) return;

        if (node === this.head && node === this.tail) {
            // Only one node in the list
            this.head = null;
            this.tail = null;
        } else if (node === this.head) {
            // Node is the head
            this.head = node.next;
            if (this.head) {
                this.head.prev = null;
            }
        } else if (node === this.tail) {
            // Node is the tail
            this.tail = node.prev;
            if (this.tail) {
                this.tail.next = null;
            }
        } else {
            // Node is in the middle
            if (node.prev) {
                node.prev.next = node.next;
            }
            if (node.next) {
                node.next.prev = node.prev;
            }
        }
        this.size--;
    }

    /**
     * Removes the tail node from the list.
     * This operation is O(1).
     * @returns The removed tail node, or null if the list was empty.
     */
    removeTail(): DoublyLinkedListNode<T> | null {
        if (!this.tail) {
            return null; // List is empty
        }
        const removedNode = this.tail;
        this.removeNode(removedNode); // Use generic removeNode for simplicity and correctness
        return removedNode;
    }

    /**
     * Moves an existing node to the head of the list.
     * This is typically used in LRU cache to mark an item as recently used.
     * This operation is O(1).
     * @param node - The node to move to the head.
     */
    moveToHead(node: DoublyLinkedListNode<T>): void {
        if (node === this.head) {
            return; // Already at the head
        }
        this.removeNode(node); // Remove it from its current position
        this.addHead(node.key, node.value); // Add it back as the new head (re-creates node, but maintains key/value)
        // Note: For LRU, you might want to re-insert the *same* node instance.
        // The above re-creates. Let's adjust to reuse the node instance.

        // Re-implement moveToHead to re-use the node instance
        if (node === this.head) {
            return; // Already at head
        }

        // Remove node from its current position
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }

        // Update head/tail if node was previously head/tail
        if (node === this.tail) {
            this.tail = node.prev;
        }

        // Place node at the head
        node.next = this.head;
        node.prev = null; // It's now the head, so no previous
        if (this.head) {
            this.head.prev = node;
        }
        this.head = node;

        // If list was empty before (and node was the only element), update tail
        if (!this.tail) {
            this.tail = node;
        }
    }
}
```