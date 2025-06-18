#ifndef HASH_TABLE_H
#define HASH_TABLE_H

#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>

//Simple Hash Table Implementation (using unordered_map for brevity)
template <typename K, typename V>
class HashTable {
public:
    void insert(const K& key, const V& value) { table[key] = value; }
    bool contains(const K& key) const { return table.count(key) > 0; }
    V& get(const K& key) { return table[key]; }
    void remove(const K& key) { table.erase(key); }
    int size() const { return table.size(); }
private:
    std::unordered_map<K, V> table;
};

#endif