#ifndef HASH_TABLE_H
#define HASH_TABLE_H

#include <iostream>
#include <vector>
#include <string>
#include <list>

template <typename K, typename V>
class HashTable {
public:
  HashTable(int capacity = 10);
  ~HashTable();
  void insert(const K& key, const V& value);
  bool contains(const K& key) const;
  V& get(const K& key);
  V get(const K& key) const;
  void remove(const K& key);
  int size() const { return _size; }


private:
  int _capacity;
  int _size;
  std::list<std::pair<K, V>>* _table;
  int hash(const K& key) const;
};

#include "hash_table.cpp" // Include implementation
#endif