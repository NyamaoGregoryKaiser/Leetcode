#include "hash_table.h"
#include <iostream>

template <typename K, typename V>
size_t HashTable<K,V>::hash(const K& key) const {
    // Simple hash function (replace with a better one if needed)
    return std::hash<K>{}(key) % capacity;
}

template <typename K, typename V>
HashTable<K, V>::HashTable(size_t capacity) : size(0), capacity(capacity) {
    table.resize(capacity);
}

template <typename K, typename V>
HashTable<K, V>::~HashTable() {}

template <typename K, typename V>
void HashTable<K, V>::insert(const K& key, const V& value) {
    size_t index = hash(key);
    for (auto& pair : table[index]) {
        if (pair.first == key) {
            pair.second = value; // Update existing key
            return;
        }
    }
    table[index].push_back({key, value});
    size++;
}


template <typename K, typename V>
bool HashTable<K, V>::remove(const K& key) {
    size_t index = hash(key);
    for (auto it = table[index].begin(); it != table[index].end(); ++it) {
        if (it->first == key) {
            table[index].erase(it);
            size--;
            return true;
        }
    }
    return false;
}

template <typename K, typename V>
V& HashTable<K, V>::get(const K& key) {
    size_t index = hash(key);
    for (auto& pair : table[index]) {
        if (pair.first == key) {
            return pair.second;
        }
    }
    throw std::out_of_range("Key not found");
}


template <typename K, typename V>
bool HashTable<K, V>::contains(const K& key) const {
    size_t index = hash(key);
    for (const auto& pair : table[index]) {
        if (pair.first == key) {
            return true;
        }
    }
    return false;
}