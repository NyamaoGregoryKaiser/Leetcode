```cpp
#ifndef MIN_HEAP_H
#define MIN_HEAP_H

#include <vector>
#include <algorithm> // For std::swap

/**
 * @brief Custom Min-Heap implementation.
 *
 * This class provides a basic implementation of a Min-Heap using a std::vector.
 * It demonstrates the core operations of a heap: insertion, extraction of the minimum element,
 * and peeking at the minimum element.
 *
 * A Min-Heap ensures that the parent node is always less than or equal to its children.
 * The smallest element is always at the root (index 0).
 */
template <typename T>
class MinHeap {
private:
    std::vector<T> heap; // The underlying vector to store heap elements

    /**
     * @brief Restores the min-heap property by sifting down an element at a given index.
     *
     * If an element at `idx` is larger than its children, it's swapped with the smaller child
     * and the process continues recursively downwards until the heap property is restored.
     * @param idx The index of the element to sift down.
     */
    void siftDown(int idx) {
        int leftChild = 2 * idx + 1;
        int rightChild = 2 * idx + 2;
        int smallest = idx; // Assume current node is the smallest

        // Compare with left child
        if (leftChild < heap.size() && heap[leftChild] < heap[smallest]) {
            smallest = leftChild;
        }

        // Compare with right child
        if (rightChild < heap.size() && heap[rightChild] < heap[smallest]) {
            smallest = rightChild;
        }

        // If the smallest is not the current node, swap and continue sifting down
        if (smallest != idx) {
            std::swap(heap[idx], heap[smallest]);
            siftDown(smallest); // Recursively sift down from the new position
        }
    }

    /**
     * @brief Restores the min-heap property by sifting up an element at a given index.
     *
     * If an element at `idx` is smaller than its parent, it's swapped with the parent
     * and the process continues recursively upwards until the heap property is restored.
     * @param idx The index of the element to sift up.
     */
    void siftUp(int idx) {
        int parent = (idx - 1) / 2; // Calculate parent index

        // While not at root and current element is smaller than its parent
        while (idx > 0 && heap[idx] < heap[parent]) {
            std::swap(heap[idx], heap[parent]); // Swap with parent
            idx = parent;                       // Move to parent's position
            parent = (idx - 1) / 2;             // Recalculate new parent
        }
    }

public:
    /**
     * @brief Constructs an empty MinHeap.
     */
    MinHeap() = default;

    /**
     * @brief Constructs a MinHeap from a vector of elements.
     * @param elements Initial elements to build the heap from.
     *
     * Time Complexity: O(N) for building the heap.
     * Space Complexity: O(N)
     */
    MinHeap(const std::vector<T>& elements) : heap(elements) {
        // Start from the last non-leaf node and sift down all elements
        // This ensures the heap property is maintained for all subtrees.
        for (int i = (heap.size() / 2) - 1; i >= 0; --i) {
            siftDown(i);
        }
    }

    /**
     * @brief Inserts a new element into the min-heap.
     * @param value The element to insert.
     *
     * Time Complexity: O(log N) due to sifting up.
     * Space Complexity: O(1) amortized (vector may reallocate, but element itself is O(1)).
     */
    void push(const T& value) {
        heap.push_back(value); // Add element to the end
        siftUp(heap.size() - 1); // Sift it up to its correct position
    }

    /**
     * @brief Removes and returns the minimum element from the min-heap.
     * @return The minimum element.
     * @throws std::runtime_error if the heap is empty.
     *
     * Time Complexity: O(log N) due to sifting down.
     * Space Complexity: O(1)
     */
    T pop() {
        if (isEmpty()) {
            throw std::runtime_error("Heap is empty, cannot pop.");
        }
        T minVal = heap[0]; // The minimum element is at the root
        heap[0] = heap.back(); // Replace root with the last element
        heap.pop_back();       // Remove the last element
        siftDown(0);           // Sift down the new root to maintain heap property
        return minVal;
    }

    /**
     * @brief Returns the minimum element without removing it.
     * @return The minimum element.
     * @throws std::runtime_error if the heap is empty.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    T peek() const {
        if (isEmpty()) {
            throw std::runtime_error("Heap is empty, cannot peek.");
        }
        return heap[0]; // The minimum element is always at the root
    }

    /**
     * @brief Checks if the min-heap is empty.
     * @return true if the heap is empty, false otherwise.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    bool isEmpty() const {
        return heap.empty();
    }

    /**
     * @brief Returns the number of elements in the min-heap.
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

#endif // MIN_HEAP_H
```