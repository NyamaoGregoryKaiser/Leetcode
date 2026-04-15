```typescript
import { DoublyLinkedList } from '../utils/dataStructures/doublyLinkedList';
import { DLNode } from '../utils/types';

/**
 * Design and implement a Least Recently Used (LRU) cache.
 *
 * The `LRUCache` class should support two operations: `get` and `put`.
 *
 * `get(key)`: Get the value of the `key` if the `key` exists in the cache, otherwise return -1.
 * `put(key, value)`: Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache.
 * When the number of keys exceeds the `capacity` from this operation, evict the least recently used key.
 *
 * The functions `get` and `put` must each run in O(1) average time complexity.
 *
 * Constraints:
 * 1 <= capacity <= 3000
 * 0 <= key <= 10^4
 * 0 <= value <= 10^5
 * At most 2 * 10^5 calls will be made to get and put.
 */

/**
 * Optimal Solution: Using a Hash Map (Map) combined with a Doubly Linked List.
 *
 * Rationale:
 * - Hash Map provides O(1) average time for `get` operations (checking if a key exists and retrieving its value).
 * - Doubly Linked List maintains the order of usage (most recently used at the head, least recently used at the tail).
 *   - Adding to head: O(1)
 *   - Removing from tail: O(1)
 *   - Moving an existing node to head (for `get` or `put` operations on existing keys): O(1)
 *     (Requires knowing the node's reference, which the hash map will store).
 *
 * Data Structures:
 * 1. `cacheMap`: A `Map<number, DLNode<number>>` (or `Map<keyType, Node<valueType>>`).
 *    - Key: The cache key (number).
 *    - Value: A reference to the corresponding node in the Doubly Linked List.
 *      Storing the node reference is crucial for O(1) deletion/movement within the linked list.
 * 2. `lruList`: An instance of `DoublyLinkedList<number>`.
 *    - Stores the actual `(key, value)` pairs as nodes.
 *    - Head of the list is the Most Recently Used (MRU) item.
 *    - Tail of the list is the Least Recently Used (LRU) item.
 *
 * `get(key)` operation:
 * 1. Check if `key` exists in `cacheMap`.
 * 2. If not, return -1.
 * 3. If yes:
 *    a. Retrieve the `node` from `cacheMap` using the `key`.
 *    b. Move this `node` to the head of `lruList` (marking it as MRU).
 *    c. Return the `node.value`.
 *
 * `put(key, value)` operation:
 * 1. Check if `key` exists in `cacheMap`.
 * 2. If `key` exists:
 *    a. Retrieve the `node` from `cacheMap`.
 *    b. Update `node.value` with the new `value`.
 *    c. Move this `node` to the head of `lruList` (marking it as MRU).
 * 3. If `key` does NOT exist:
 *    a. Create a `newNode` for `(key, value)`.
 *    b. Add `newNode` to the head of `lruList`.
 *    c. Add `key -> newNode` to `cacheMap`.
 *    d. Check if `lruList.size` > `capacity`:
 *       i. If true, remove the tail `node` from `lruList` (this is the LRU item).
 *       ii. Delete the `tailNode.key` from `cacheMap`.
 *
 * Time Complexity:
 * - `get(key)`: O(1) average (Map lookup O(1), Doubly Linked List move O(1)).
 * - `put(key, value)`: O(1) average (Map lookup/insert/delete O(1), Doubly Linked List operations O(1)).
 *
 * Space Complexity: O(Capacity)
 * The Hash Map and Doubly Linked List will store at most `capacity` items.
 */
export class LRUCache {
    private capacity: number;
    private cacheMap: Map<number, DLNode<number>>; // Maps key to the DLL node
    private lruList: DoublyLinkedList<number>;     // Stores nodes in LRU order

    /**
     * Initializes the LRU cache with a given capacity.
     * @param capacity - The maximum number of key-value pairs the cache can hold.
     */
    constructor(capacity: number) {
        if (capacity <= 0) {
            throw new Error("Capacity must be a positive integer.");
        }
        this.capacity = capacity;
        this.cacheMap = new Map<number, DLNode<number>>();
        this.lruList = new DoublyLinkedList<number>();
    }

    /**
     * Gets the value associated with the key. If the key exists,
     * it's marked as most recently used.
     * @param key - The key to look up.
     * @returns The value if found, otherwise -1.
     */
    get(key: number): number {
        if (!this.cacheMap.has(key)) {
            return -1; // Key not found
        }

        const node = this.cacheMap.get(key)!;
        // Move the accessed node to the head of the list (most recently used)
        this.lruList.moveToHead(node);
        return node.value;
    }

    /**
     * Puts a key-value pair into the cache.
     * If the key already exists, its value is updated and it's marked as MRU.
     * If the key is new and cache is full, the LRU item is evicted.
     * @param key - The key to store or update.
     * @param value - The value to associate with the key.
     */
    put(key: number, value: number): void {
        if (this.cacheMap.has(key)) {
            // Key already exists: update its value and move to head
            const node = this.cacheMap.get(key)!;
            node.value = value;
            this.lruList.moveToHead(node);
        } else {
            // Key does not exist: add new entry
            // Check if capacity is reached
            if (this.lruList.size >= this.capacity) {
                // Evict LRU item (tail of the list)
                const tailNode = this.lruList.removeTail();
                if (tailNode) { // Make sure a node was actually removed
                    this.cacheMap.delete(tailNode.key);
                }
            }
            // Add new node to the head (MRU)
            const newNode = this.lruList.addHead(key, value);
            this.cacheMap.set(key, newNode);
        }
    }
}
```