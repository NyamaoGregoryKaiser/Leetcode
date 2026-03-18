```cpp
#include <iostream>
#include <vector>
#include <algorithm> // For std::swap
#include <stdexcept> // For std::runtime_error

/**
 * @file functional_min_heap.cpp
 * @brief A functional-style Min-Heap implementation using a std::vector.
 *
 * This implementation demonstrates the core heap algorithms (siftUp, siftDown,
 * push, pop, peek) as standalone functions that operate directly on a std::vector
 * passed by reference. There is no explicit class wrapper for the heap itself,
 * emphasizing the raw array manipulation aspect.
 */

namespace FunctionalMinHeap {

    /**
     * @brief Helper function to get the parent index for a given node index.
     * @param idx The index of the child node.
     * @return The index of the parent node.
     */
    int getParentIndex(int idx) {
        return (idx - 1) / 2;
    }

    /**
     * @brief Helper function to get the left child index for a given node index.
     * @param idx The index of the parent node.
     * @return The index of the left child.
     */
    int getLeftChildIndex(int idx) {
        return 2 * idx + 1;
    }

    /**
     * @brief Helper function to get the right child index for a given node index.
     * @param idx The index of the parent node.
     * @return The index of the right child.
     */
    int getRightChildIndex(int idx) {
        return 2 * idx + 2;
    }

    /**
     * @brief Sifts down an element at a given index to maintain the min-heap property.
     *
     * This function assumes that the children's subtrees (if they exist) are already
     * valid heaps. It moves the element at `idx` down the heap until it finds its
     * correct position.
     *
     * @param heap The vector representing the heap.
     * @param idx The index of the element to sift down.
     */
    void siftDown(std::vector<int>& heap, int idx) {
        int n = heap.size();
        int smallest = idx;
        int left = getLeftChildIndex(idx);
        int right = getRightChildIndex(idx);

        if (left < n && heap[left] < heap[smallest]) {
            smallest = left;
        }
        if (right < n && heap[right] < heap[smallest]) {
            smallest = right;
        }

        if (smallest != idx) {
            std::swap(heap[idx], heap[smallest]);
            siftDown(heap, smallest); // Recursively continue sifting down
        }
    }

    /**
     * @brief Sifts up an element at a given index to maintain the min-heap property.
     *
     * This function moves the element at `idx` up the heap until it finds its
     * correct position relative to its parent.
     *
     * @param heap The vector representing the heap.
     * @param idx The index of the element to sift up.
     */
    void siftUp(std::vector<int>& heap, int idx) {
        int parent = getParentIndex(idx);
        while (idx > 0 && heap[idx] < heap[parent]) {
            std::swap(heap[idx], heap[parent]);
            idx = parent;
            parent = getParentIndex(idx);
        }
    }

    /**
     * @brief Builds a min-heap from an unsorted vector of elements.
     *
     * This function modifies the input vector in-place to form a valid min-heap.
     * It starts from the last non-leaf node and applies `siftDown` upwards to the root.
     *
     * @param heap The vector to be converted into a min-heap.
     *
     * Time Complexity: O(N)
     */
    void buildMinHeap(std::vector<int>& heap) {
        int n = heap.size();
        // Start from the last non-leaf node and sift down
        for (int i = (n / 2) - 1; i >= 0; --i) {
            siftDown(heap, i);
        }
    }

    /**
     * @brief Inserts a new element into the min-heap.
     *
     * @param heap The vector representing the heap.
     * @param value The element to insert.
     *
     * Time Complexity: O(log N)
     */
    void heapPush(std::vector<int>& heap, int value) {
        heap.push_back(value);
        siftUp(heap, heap.size() - 1);
    }

    /**
     * @brief Removes and returns the minimum element from the min-heap.
     *
     * @param heap The vector representing the heap.
     * @return The minimum element.
     * @throws std::runtime_error if the heap is empty.
     *
     * Time Complexity: O(log N)
     */
    int heapPop(std::vector<int>& heap) {
        if (heap.empty()) {
            throw std::runtime_error("Heap is empty, cannot pop.");
        }
        int minVal = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        if (!heap.empty()) { // Only sift down if there are elements left
            siftDown(heap, 0);
        }
        return minVal;
    }

    /**
     * @brief Returns the minimum element without removing it.
     *
     * @param heap The vector representing the heap.
     * @return The minimum element.
     * @throws std::runtime_error if the heap is empty.
     *
     * Time Complexity: O(1)
     */
    int heapPeek(const std::vector<int>& heap) {
        if (heap.empty()) {
            throw std::runtime_error("Heap is empty, cannot peek.");
        }
        return heap[0];
    }

    /**
     * @brief Checks if the min-heap is empty.
     *
     * @param heap The vector representing the heap.
     * @return true if the heap is empty, false otherwise.
     *
     * Time Complexity: O(1)
     */
    bool isHeapEmpty(const std::vector<int>& heap) {
        return heap.empty();
    }

    /**
     * @brief Returns the number of elements in the min-heap.
     *
     * @param heap The vector representing the heap.
     * @return The size of the heap.
     *
     * Time Complexity: O(1)
     */
    size_t heapSize(const std::vector<int>& heap) {
        return heap.size();
    }

} // namespace FunctionalMinHeap

int main() {
    using namespace FunctionalMinHeap;
    std::vector<int> myHeap;

    std::cout << "--- Functional Min-Heap Operations ---" << std::endl;

    std::cout << "Is heap empty? " << (isHeapEmpty(myHeap) ? "Yes" : "No") << std::endl; // Expected: Yes

    heapPush(myHeap, 5);
    heapPush(myHeap, 3);
    heapPush(myHeap, 8);
    heapPush(myHeap, 1);
    heapPush(myHeap, 10);
    heapPush(myHeap, 2);

    std::cout << "Heap size: " << heapSize(myHeap) << std::endl; // Expected: 6
    std::cout << "Min element (peek): " << heapPeek(myHeap) << std::endl; // Expected: 1

    std::cout << "Popped: " << heapPop(myHeap) << std::endl; // Expected: 1
    std::cout << "Min element after pop: " << heapPeek(myHeap) << std::endl; // Expected: 2
    std::cout << "Popped: " << heapPop(myHeap) << std::endl; // Expected: 2
    std::cout << "Min element after pop: " << heapPeek(myHeap) << std::endl; // Expected: 3

    // Demonstrate buildMinHeap
    std::vector<int> rawData = {9, 2, 7, 4, 1, 6, 3, 8, 5};
    std::cout << "\nBuilding heap from raw data: ";
    for (int n : rawData) std::cout << n << " ";
    std::cout << std::endl;

    buildMinHeap(rawData);
    std::cout << "Heap after build: ";
    for (int n : rawData) std::cout << n << " ";
    std::cout << std::endl; // Should be a valid heap structure, not necessarily sorted

    std::cout << "Min element (peek) from built heap: " << heapPeek(rawData) << std::endl; // Expected: 1

    std::cout << "Popping all elements from built heap: ";
    while (!isHeapEmpty(rawData)) {
        std::cout << heapPop(rawData) << " "; // Should print elements in sorted order
    }
    std::cout << std::endl; // Expected: 1 2 3 4 5 6 7 8 9

    // Test error handling
    try {
        heapPop(rawData);
    } catch (const std::runtime_error& e) {
        std::cout << "\nCaught expected error (pop empty heap): " << e.what() << std::endl;
    }
    try {
        heapPeek(rawData);
    } catch (const std::runtime_error& e) {
        std::cout << "Caught expected error (peek empty heap): " << e.what() << std::endl;
    }

    return 0;
}
```