#include "lfu_cache.h"
#include <iostream>

namespace LFUCache {

LFUCache::LFUCache(int cap) : capacity(cap), size(0), min_frequency(0) {}

void LFUCache::update_frequency(int key) {
    // 1. Get the current node from the main map.
    CacheNode& node = key_to_node_map.at(key); // Use .at() for bounds checking, or find()

    // 2. Remove the key from its current frequency list.
    // We store the key in the freq_to_key_list_map's list, not the node itself.
    freq_to_key_list_map[node.frequency].erase(node.it);

    // 3. If the list for the old frequency becomes empty AND it was the min_frequency,
    //    increment min_frequency.
    if (freq_to_key_list_map[node.frequency].empty()) {
        freq_to_key_list_map.erase(node.frequency); // Clean up empty list
        if (node.frequency == min_frequency) {
            min_frequency++;
        }
    }

    // 4. Increment the node's frequency.
    node.frequency++;

    // 5. Add the key to the front of the list for the new frequency (MRU).
    freq_to_key_list_map[node.frequency].push_front(key);
    // Update the node's iterator to point to its new position in the new list.
    node.it = freq_to_key_list_map[node.frequency].begin();
}

int LFUCache::get(int key) {
    if (capacity == 0) {
        return -1;
    }

    // Check if the key exists in the cache.
    auto it = key_to_node_map.find(key);
    if (it == key_to_node_map.end()) {
        // Key not found.
        return -1;
    }

    // Key found.
    // 1. Update its frequency (moves it to a higher frequency list, updates recency).
    update_frequency(key);

    // 2. Return its value.
    return it->second.value;
}

void LFUCache::put(int key, int value) {
    if (capacity == 0) {
        return;
    }

    // Check if the key already exists.
    auto it = key_to_node_map.find(key);
    if (it != key_to_node_map.end()) {
        // Key exists: update its value and frequency.
        it->second.value = value;
        update_frequency(key);
        return;
    }

    // Key does not exist.
    // 1. If cache is full, evict LFU (and LRU for ties).
    if (size == capacity) {
        // Get the least recently used key from the min_frequency list.
        // This is the back of the list (std::list::back()).
        int key_to_evict = freq_to_key_list_map[min_frequency].back();

        // Remove it from its frequency list.
        freq_to_key_list_map[min_frequency].pop_back();

        // If this eviction makes the min_frequency list empty, the min_frequency itself will
        // be updated when a new node is inserted or an existing node's frequency is increased.
        // No explicit min_frequency update here is needed because we are adding a new node
        // which will become the new min_frequency or take the place of an existing min_frequency.

        // Remove it from the main key_to_node_map.
        key_to_node_map.erase(key_to_evict);
        size--;
    }

    // 2. Insert the new key-value pair.
    // Create a new node. It starts with frequency 1.
    // Directly insert the CacheNode object into the map.
    key_to_node_map.emplace(std::piecewise_construct,
                            std::forward_as_tuple(key),
                            std::forward_as_tuple(key, value));

    // Add the new key to the frequency 1 list (most recent for this freq).
    freq_to_key_list_map[1].push_front(key);
    // Update the new node's iterator to point to its position in the freq 1 list.
    key_to_node_map.at(key).it = freq_to_key_list_map[1].begin();

    // Reset min_frequency to 1, as a new element always starts with frequency 1.
    min_frequency = 1;
    size++;
}

} // namespace LFUCache