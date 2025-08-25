#include "hash_table.h"

template <typename K, typename V>
HashTable<K, V>::HashTable(int capacity) : _capacity(capacity), _size(0) {
  _table = new std::list<std::pair<K, V>>[_capacity];
}

template <typename K, typename V>
HashTable<K, V>::~HashTable() {
  delete[] _table;
}

template <typename K, typename V>
int HashTable<K, V>::hash(const K& key) const {
    // Simple hash function - replace with a better one if needed
    return std::hash<K>{}(key) % _capacity;
}

template <typename K, typename V>
void HashTable<K, V>::insert(const K& key, const V& value) {
  int index = hash(key);
  _table[index].push_back({key, value});
  _size++;
}


// Implement other HashTable methods (contains, get, remove) here...