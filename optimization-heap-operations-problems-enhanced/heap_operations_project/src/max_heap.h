```cpp
#ifndef MAX_HEAP_H
#define MAX_HEAP_H

#include <vector>
#include <algorithm> // For std::swap

/**
 * @brief Custom Max-Heap implementation.
 *
 * This class provides a basic implementation of a Max-Heap using a std::vector.
 * It demonstrates the core operations of a heap: insertion, extraction of the maximum element,
 * and peeking at the maximum element.
 *
 * A Max-Heap ensures that the parent node is always greater than or equal to its children.
 * The largest element is always at the root (index 0).
 */
template <typename T>
class MaxHeap {
private:
    std::vector<T> heap; // The underlying vector to store heap elements

    /**
     * @brief Restores the max-heap property by sifting down an element at a given index.
     *
     * If an element at `idx` is smaller than its children, it's swapped with the larger child
     * and the process continues recursively downwards until the heap property is restored.
     * @param idx The index of the element to sift down.
     */
    void siftDown(int idx) {
        int leftChild = 2 * idx + 1;
        int rightChild = 2 * idx + 2;
        int largest = idx; // Assume current node is the largest

        // Compare with left child
        if (leftChild < heap.size() && heap[leftChild] > heap[largest]) {
            largest = leftChild;
        }

        // Compare with right child
        if (rightChild < heap.size() && heap[rightChild] > heap[largest]) {
            largest = rightChild;
        }

        // If the largest is not the current node, swap and continue sifting down
        if (largest != idx) {
            std::swap(heap[idx], heap[largest]);
            siftDown(largest); // Recursively sift down from the new position
        }
    }

    /**
     * @brief Restores the max-heap property by sifting up an element at a given index.
     *
     * If an element at `idx` is larger than its parent, it's swapped with the parent
     * and the process continues recursively upwards until the heap property is restored.
     * @param idx The index of the element to sift up.
     */
    void siftUp(int idx) {
        int parent = (idx - 1) / 2; // Calculate parent index

        // While not at root and current element is larger than its parent
        while (idx > 0 && heap[idx] > heap[parent]) {
            std::swap(heap[idx], heap[parent]); // Swap with parent
            idx = parent;                       // Move to parent's position
            parent = (idx - 1) / 2;             // Recalculate new parent
        }
    }

public:
    /**
     * @brief Constructs an empty MaxHeap.
     */
    MaxHeap() = default;

    /**
     * @brief Constructs a MaxHeap from a vector of elements.
     * @param elements Initial elements to build the heap from.
     *
     * Time Complexity: O(N) for building the heap.
     * Space Complexity: O(N)
     */
    MaxHeap(const std::vector<T>& elements) : heap(elements) {
        // Start from the last non-leaf node and sift down all elements
        // This ensures the heap property is maintained for all subtrees.
        for (int i = (heap.size() / 2) - 1; i >= 0; --i) {
            siftDown(i);
        }
    }

    /**
     * @brief Inserts a new element into the max-heap.
     * @param value The element to insert.
     *
     * Time Complexity: O(log N) due to sifting up.
     * Space Complexity: O(1) amortized.
     */
    void push(const T& value) {
        heap.push_back(value); // Add element to the end
        siftUp(heap.size() - 1); // Sift it up to its correct position
    }

    /**
     * @brief Removes and returns the maximum element from the max-heap.
     * @return The maximum element.
     * @throws std::runtime_error if the heap is empty.
     *
     * Time Complexity: O(log N) due to sifting down.
     * Space Complexity: O(1)
     */
    T pop() {
        if (isEmpty()) {
            throw std::runtime_error("Heap is empty, cannot pop.");
        }
        T maxVal = heap[0]; // The maximum element is at the root
        heap[0] = heap.back(); // Replace root with the last element
        heap.pop_back();       // Remove the last element
        siftDown(0);           // Sift down the new root to maintain heap property
        return maxVal;
    }

    /**
     * @brief Returns the maximum element without removing it.
     * @return The maximum element.
     * @throws std::runtime_error if the heap is empty.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    T peek() const {
        if (isEmpty()) {
            throw std::runtime_error("Heap is empty, cannot peek.");
        }
        return heap[0]; // The maximum element is always at the root
    }

    /**
     * @brief Checks if the max-heap is empty.
     * @return true if the heap is empty, false otherwise.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    bool isEmpty() const {
        return heap.empty();
    }

    /**
     * @brief Returns the number of elements in the max-heap.
     * @return The size of the heap.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    size_t size() const {
        return heap.size();
    }

    /**
     * @brief Exposes the underlying vector (for debugging or direct access, generally discouraged).
     * @return A const reference to the internal vector.
     */
    const std::vector<T>& getInternalVector() const {
        return heap;
    }
};

#endif // MAX_HEAP_H
```