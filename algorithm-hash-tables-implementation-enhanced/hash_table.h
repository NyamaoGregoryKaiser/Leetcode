#ifndef HASH_TABLE_H
#define HASH_TABLE_H

#include <iostream>
#include <vector>
#include <string>
#include <list>

template <typename K, typename V>
class HashTable {
private:
    std::vector<std::list<std::pair<K, V>>> table;
    size_t size;
    size_t capacity;

    size_t hash(const K& key) const;

public:
    HashTable(size_t capacity = 10);
    ~HashTable();

    void insert(const K& key, const V& value);
    bool remove(const K& key);
    V& get(const K& key);
    bool contains(const K& key) const;
    size_t getSize() const { return size; }

};

#include "hash_table.cpp" // Include implementation

#endif