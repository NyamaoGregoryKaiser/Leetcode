#ifndef HEAP_H
#define HEAP_H

#include <vector>
#include <iostream>
#include <algorithm>

template <typename T>
class MinHeap {
public:
    MinHeap(int capacity);
    void insert(T value);
    T extractMin();
    T peekMin();
    bool isEmpty();
    int size();
private:
    std::vector<T> heap;
    int capacity;
    void heapifyUp(int index);
    void heapifyDown(int index);
};

template <typename T>
class MaxHeap {
public:
    MaxHeap(int capacity);
    void insert(T value);
    T extractMax();
    T peekMax();
    bool isEmpty();
    int size();
private:
    std::vector<T> heap;
    int capacity;
    void heapifyUp(int index);
    void heapifyDown(int index);
};


#endif