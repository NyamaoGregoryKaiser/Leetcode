const { ListNode, DoublyLinkedList } = require('../utils/DoublyLinkedList');

/**
 * Problem 4: LRU Cache
 *
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
 *
 * Implement the `LRUCache` class:
 * - `LRUCache(int capacity)` initializes the LRU cache with the given positive `capacity`.
 * - `int get(int key)`:
 *   - If the key exists in the cache, return its value.
 *   - Otherwise, return -1.
 *   - In either case, if the key was found, it becomes the most recently used.
 * - `void put(int key, int value)`:
 *   - If the key already exists, update its value and make it the most recently used.
 *   - If the key does not exist:
 *     - Add the new key-value pair to the cache.
 *     - If the cache exceeds its `capacity`, evict the least recently used item.
 *
 * Both `get` and `put` operations must run in O(1) average time complexity.
 *
 * Example:
 * LRUCache lRUCache = new LRUCache(2);
 * lRUCache.put(1, 1); // cache is {1=1}
 * lRUCache.put(2, 2); // cache is {1=1, 2=2}
 * lRUCache.get(1);    // return 1
 *                     // cache is {2=2, 1=1} (1 becomes MRU)
 * lRUCache.put(3, 3); // LRU key 2 is evicted, cache is {1=1, 3=3}
 * lRUCache.get(2);    // return -1 (not found)
 * lRUCache.put(4, 4); // LRU key 1 is evicted, cache is {3=3, 4=4}
 * lRUCache.get(1);    // return -1 (not found)
 * lRUCache.get(3);    // return 3
 *                     // cache is {4=4, 3=3} (3 becomes MRU)
 * lRUCache.get(4);    // return 4
 *                     // cache is {3=3, 4=4} (4 becomes MRU)
 */

/**
 * Optimal Approach: Using a Hash Map (Map in JS) and a Doubly Linked List
 *
 * To achieve O(1) for both `get` and `put` operations, we need a way to:
 * 1. Quickly look up elements by key (O(1)). A Hash Map (JavaScript's `Map` object) is perfect for this.
 * 2. Quickly move an element to the "most recently used" position (O(1)).
 * 3. Quickly remove the "least recently used" element when capacity is exceeded (O(1)).
 *
 * A Doubly Linked List is ideal for points 2 and 3.
 *
 * Algorithm:
 *
 * Data Structures:
 * - `cacheMap`: A `Map` (or `Object` acting as a hash map) where `key` maps to the actual `ListNode`
 *   in our doubly linked list. This allows O(1) lookup to find the node.
 * - `cacheList`: A `DoublyLinkedList` that maintains the order of usage.
 *   - The **head** of the list (right after the dummy head node) will be the Most Recently Used (MRU) item.
 *   - The **tail** of the list (right before the dummy tail node) will be the Least Recently Used (LRU) item.
 *
 * `LRUCache(capacity)`:
 *   - Initialize `cacheMap` as an empty Map.
 *   - Initialize `cacheList` as an empty DoublyLinkedList.
 *   - Store `capacity`.
 *
 * `get(key)`:
 *   1. Check if `key` exists in `cacheMap`.
 *      a. If not, return -1.
 *      b. If it exists:
 *         i. Retrieve the `ListNode` associated with `key` from `cacheMap`.
 *         ii. Since this `key` has just been accessed, it becomes MRU. Move this node to the front of `cacheList` using `cacheList.moveToFront(node)`.
 *         iii. Return the `value` from the retrieved node.
 *
 * `put(key, value)`:
 *   1. Check if `key` already exists in `cacheMap`:
 *      a. If it exists:
 *         i. Retrieve the existing `ListNode` from `cacheMap`.
 *         ii. Update its `value`.
 *         iii. Move this node to the front of `cacheList` (it's now MRU).
 *
 *      b. If it does not exist:
 *         i. Create a `new ListNode(key, value)`.
 *         ii. Add this new node to the front of `cacheList` (it's MRU).
 *         iii. Add `key -> newNode` to `cacheMap`.
 *         iv. Check if `cacheList.getLength()` now exceeds `capacity`:
 *             - If yes, `cacheList` is too full. We need to evict the LRU item.
 *             - Remove the node from the tail of `cacheList` using `cacheList.removeTail()`.
 *             - Get the `key` of the evicted node.
 *             - Remove this key from `cacheMap`.
 *
 * Time Complexity: O(1) for both `get` and `put` operations.
 *   - Map operations (set, get, delete) are O(1) on average.
 *   - Doubly Linked List operations (addFront, removeNode, removeTail, moveToFront) are O(1).
 *
 * Space Complexity: O(Capacity)
 *   - The `cacheMap` stores `capacity` number of keys, each mapping to a node.
 *   - The `cacheList` stores `capacity` number of nodes.
 *   - Each node object stores a key, value, and two pointers.
 */
class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        if (capacity <= 0) {
            throw new Error("Capacity must be a positive integer.");
        }
        this.capacity = capacity;
        this.cacheMap = new Map(); // key -> ListNode (for O(1) lookup)
        this.cacheList = new DoublyLinkedList(); // Stores nodes in MRU (front) to LRU (back) order
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!this.cacheMap.has(key)) {
            return -1; // Key not found
        }

        const node = this.cacheMap.get(key);
        // Move the accessed node to the front (MRU position)
        this.cacheList.moveToFront(node);
        return node.value;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if (this.cacheMap.has(key)) {
            // Key already exists: update value and move to front
            const node = this.cacheMap.get(key);
            node.value = value; // Update value
            this.cacheList.moveToFront(node); // Move to MRU
        } else {
            // Key does not exist: add new entry
            const newNode = new ListNode(key, value);

            // Check if cache is full
            if (this.cacheList.getLength() === this.capacity) {
                // Evict LRU item (tail of the list)
                const lruNode = this.cacheList.removeTail();
                if (lruNode) {
                    this.cacheMap.delete(lruNode.key); // Remove from map
                }
            }

            // Add new node to cache
            this.cacheList.addFront(newNode); // Add to MRU
            this.cacheMap.set(key, newNode);  // Add to map
        }
    }
}

module.exports = LRUCache;