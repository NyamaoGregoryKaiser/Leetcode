#ifndef LFU_CACHE_H
#define LFU_CACHE_H

#include <unordered_map>
#include <list> // std::list is used to implement a Doubly Linked List for each frequency

namespace LFUCache {

// Node for the Doubly Linked List. Stores key, value, and frequency.
// It also has pointers for `prev` and `next` in the list, and a pointer
// to the parent list's iterator so it can be quickly removed from `freqMap` lists.
struct CacheNode {
    int key;
    int value;
    int frequency;
    // An iterator pointing to this node's position in its parent std::list<CacheNode>
    // This allows O(1) removal from the list.
    std::list<CacheNode>::iterator it;

    CacheNode(int k, int v) : key(k), value(v), frequency(1) {}
};

/**
 * @brief Implements a Least Frequently Used (LFU) cache.
 *
 * This LFU cache supports O(1) average time complexity for both `get` and `put` operations.
 * It uses a combination of hash maps and doubly linked lists:
 * - `key_to_node_map`: std::unordered_map<int, CacheNode*> to quickly find a node by its key.
 * - `freq_to_list_map`: std::unordered_map<int, std::list<CacheNode>> to store lists of nodes
 *   for each frequency. Each list is ordered by recency (MRU at front, LRU at back).
 * - `min_frequency`: Tracks the minimum frequency currently in the cache, used for eviction.
 *
 * When a node's frequency changes (on `get` or `put`):
 * 1. It's removed from its current frequency list.
 * 2. Its frequency is incremented.
 * 3. It's added to the front of the new (incremented) frequency list.
 * 4. `min_frequency` is updated if the old frequency list becomes empty and it was the minimum.
 *
 * When capacity is exceeded:
 * 1. The `min_frequency` list is identified.
 * 2. The least recently used node (back of the list) is evicted.
 */
class LFUCache {
private:
    int capacity;
    int size; // Current number of elements in the cache
    int min_frequency; // Smallest frequency currently in the cache

    // Map: key -> CacheNode (stores actual node data)
    // Stores direct pointer to the node inside its list for O(1) access
    std::unordered_map<int, CacheNode> key_to_node_map;

    // Map: frequency -> list of CacheNodes (stores keys with that frequency)
    // Each list is ordered by recency: MRU at front, LRU at back.
    std::unordered_map<int, std::list<int>> freq_to_key_list_map;

    // Helper to update a node's frequency and move it between lists
    void update_frequency(int key);

public:
    LFUCache(int capacity);

    int get(int key);

    void put(int key, int value);
};

} // namespace LFUCache

#endif // LFU_CACHE_H