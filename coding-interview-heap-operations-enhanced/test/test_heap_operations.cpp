```cpp
#include "../src/heap_operations.hpp"
#include <iostream>
#include <vector>
#include <string>
#include <cassert>
#include <algorithm> // For std::is_sorted

// Custom test framework (simple assertions)
#define TEST_CASE(name) void name() { std::cout << "Running " << #name << "..." << std::endl;
#define END_TEST_CASE std::cout << #name << " passed." << std::endl; }

// Helper for printing vectors
template <typename T>
std::string vector_to_string(const std::vector<T>& vec) {
    std::string s = "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        s += std::to_string(vec[i]);
        if (i < vec.size() - 1) {
            s += ", ";
        }
    }
    s += "]";
    return s;
}

// Check if a vector represents a valid Min-Heap
template <typename T>
bool is_min_heap(const std::vector<T>& data) {
    for (size_t i = 0; i < data.size(); ++i) {
        size_t left = 2 * i + 1;
        size_t right = 2 * i + 2;
        if (left < data.size() && data[i] > data[left]) return false;
        if (right < data.size() && data[i] > data[right]) return false;
    }
    return true;
}

// Check if a vector represents a valid Max-Heap
template <typename T>
bool is_max_heap(const std::vector<T>& data) {
    for (size_t i = 0; i < data.size(); ++i) {
        size_t left = 2 * i + 1;
        size_t right = 2 * i + 2;
        if (left < data.size() && data[i] < data[left]) return false;
        if (right < data.size() && data[i] < data[right]) return false;
    }
    return true;
}

TEST_CASE(testMinHeapPush) {
    MinHeap<int> min_heap;
    min_heap.push(5);
    assert(min_heap.top() == 5 && min_heap.size() == 1);
    min_heap.push(3);
    assert(min_heap.top() == 3 && min_heap.size() == 2);
    min_heap.push(8);
    assert(min_heap.top() == 3 && min_heap.size() == 3);
    min_heap.push(1);
    assert(min_heap.top() == 1 && min_heap.size() == 4);
    min_heap.push(10);
    assert(min_heap.top() == 1 && min_heap.size() == 5);

    // Verify internal structure property for a min-heap
    assert(is_min_heap(min_heap.get_data()));
} END_TEST_CASE

TEST_CASE(testMinHeapPop) {
    MinHeap<int> min_heap;
    min_heap.push(5); min_heap.push(3); min_heap.push(8); min_heap.push(1); min_heap.push(10);
    // Heap: [1, 3, 8, 5, 10] (conceptual, not necessarily in order of underlying array)
    // Top is 1

    assert(min_heap.top() == 1);
    min_heap.pop(); // 1 removed, new top should be 3
    assert(min_heap.top() == 3 && min_heap.size() == 4);
    assert(is_min_heap(min_heap.get_data()));

    min_heap.pop(); // 3 removed, new top should be 5
    assert(min_heap.top() == 5 && min_heap.size() == 3);
    assert(is_min_heap(min_heap.get_data()));

    min_heap.pop(); // 5 removed, new top should be 8
    assert(min_heap.top() == 8 && min_heap.size() == 2);
    assert(is_min_heap(min_heap.get_data()));

    min_heap.pop(); // 8 removed, new top should be 10
    assert(min_heap.top() == 10 && min_heap.size() == 1);
    assert(is_min_heap(min_heap.get_data()));

    min_heap.pop(); // 10 removed, heap empty
    assert(min_heap.empty() && min_heap.size() == 0);
    
    bool caught_exception = false;
    try {
        min_heap.pop();
    } catch (const std::out_of_range& e) {
        caught_exception = true;
    }
    assert(caught_exception); // Should throw an exception on empty pop
} END_TEST_CASE

TEST_CASE(testMaxHeapPush) {
    MaxHeap<int> max_heap;
    max_heap.push(5);
    assert(max_heap.top() == 5 && max_heap.size() == 1);
    max_heap.push(3);
    assert(max_heap.top() == 5 && max_heap.size() == 2);
    max_heap.push(8);
    assert(max_heap.top() == 8 && max_heap.size() == 3);
    max_heap.push(1);
    assert(max_heap.top() == 8 && max_heap.size() == 4);
    max_heap.push(10);
    assert(max_heap.top() == 10 && max_heap.size() == 5);

    // Verify internal structure property for a max-heap
    assert(is_max_heap(max_heap.get_data()));
} END_TEST_CASE

TEST_CASE(testMaxHeapPop) {
    MaxHeap<int> max_heap;
    max_heap.push(5); max_heap.push(3); max_heap.push(8); max_heap.push(1); max_heap.push(10);
    // Heap: [10, 8, 5, 1, 3] (conceptual)
    // Top is 10

    assert(max_heap.top() == 10);
    max_heap.pop(); // 10 removed, new top should be 8
    assert(max_heap.top() == 8 && max_heap.size() == 4);
    assert(is_max_heap(max_heap.get_data()));

    max_heap.pop(); // 8 removed, new top should be 5
    assert(max_heap.top() == 5 && max_heap.size() == 3);
    assert(is_max_heap(max_heap.get_data()));

    max_heap.pop(); // 5 removed, new top should be 3
    assert(max_heap.top() == 3 && max_heap.size() == 2);
    assert(is_max_heap(max_heap.get_data()));

    max_heap.pop(); // 3 removed, new top should be 1
    assert(max_heap.top() == 1 && max_heap.size() == 1);
    assert(is_max_heap(max_heap.get_data()));

    max_heap.pop(); // 1 removed, heap empty
    assert(max_heap.empty() && max_heap.size() == 0);

    bool caught_exception = false;
    try {
        max_heap.top();
    } catch (const std::out_of_range& e) {
        caught_exception = true;
    }
    assert(caught_exception); // Should throw an exception on empty top
} END_TEST_CASE

TEST_CASE(testHeapEmptyAndSize) {
    MinHeap<int> min_heap;
    assert(min_heap.empty() && min_heap.size() == 0);
    min_heap.push(10);
    assert(!min_heap.empty() && min_heap.size() == 1);
    min_heap.pop();
    assert(min_heap.empty() && min_heap.size() == 0);

    MaxHeap<int> max_heap;
    assert(max_heap.empty() && max_heap.size() == 0);
    max_heap.push(20);
    assert(!max_heap.empty() && max_heap.size() == 1);
    max_heap.pop();
    assert(max_heap.empty() && max_heap.size() == 0);
} END_TEST_CASE

TEST_CASE(testHeapConstruction) {
    std::vector<int> initial_data = {9, 2, 7, 5, 1, 8, 3};
    MinHeap<int> min_heap(initial_data);
    assert(min_heap.size() == initial_data.size());
    assert(min_heap.top() == 1); // Smallest element should be 1

    std::vector<int> sorted_min_heap_elements;
    while(!min_heap.empty()){
        sorted_min_heap_elements.push_back(min_heap.top());
        min_heap.pop();
    }
    assert(std::is_sorted(sorted_min_heap_elements.begin(), sorted_min_heap_elements.end()));
    assert(sorted_min_heap_elements[0] == 1);
    assert(sorted_min_heap_elements[6] == 9);

    MaxHeap<int> max_heap(initial_data);
    assert(max_heap.size() == initial_data.size());
    assert(max_heap.top() == 9); // Largest element should be 9

    std::vector<int> sorted_max_heap_elements;
    while(!max_heap.empty()){
        sorted_max_heap_elements.push_back(max_heap.top());
        max_heap.pop();
    }
    // Should be sorted descending
    assert(std::is_sorted(sorted_max_heap_elements.begin(), sorted_max_heap_elements.end(), std::greater<int>()));
    assert(sorted_max_heap_elements[0] == 9);
    assert(sorted_max_heap_elements[6] == 1);
} END_TEST_CASE

int main() {
    std::cout << "--- Running Heap Operations Unit Tests ---" << std::endl;
    testMinHeapPush();
    testMinHeapPop();
    testMaxHeapPush();
    testMaxHeapPop();
    testHeapEmptyAndSize();
    testHeapConstruction();
    std::cout << "All Heap Operations tests passed!" << std::endl;
    return 0;
}
```