#include "heap.h"

template <typename T>
MinHeap<T>::MinHeap(int capacity) : capacity(capacity), heap(capacity) {}

template <typename T>
void MinHeap<T>::insert(T value) {
    if (size() == capacity) {
        std::cerr << "Heap is full!" << std::endl;
        return;
    }
    heap.push_back(value);
    heapifyUp(size() - 1);
}

template <typename T>
T MinHeap<T>::extractMin() {
    if (isEmpty()) {
        std::cerr << "Heap is empty!" << std::endl;
        return T{}; // Return default value for the type T
    }
    T minVal = heap[0];
    heap[0] = heap.back();
    heap.pop_back();
    heapifyDown(0);
    return minVal;
}


// ... (Implementation of other MinHeap methods, MaxHeap, and helper functions) ...

//Example for heapifyUp
template <typename T>
void MinHeap<T>::heapifyUp(int index) {
    int parent = (index - 1) / 2;
    while (index > 0 && heap[index] < heap[parent]) {
        std::swap(heap[index], heap[parent]);
        index = parent;
        parent = (index - 1) / 2;
    }
}

template <typename T>
bool MinHeap<T>::isEmpty() { return heap.empty(); }
template <typename T>
int MinHeap<T>::size() { return heap.size(); }
template <typename T>
T MinHeap<T>::peekMin() { return heap[0]; }


//Similar implementations for MaxHeap would be added here.