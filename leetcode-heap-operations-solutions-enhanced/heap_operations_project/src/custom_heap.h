```cpp
#ifndef CUSTOM_HEAP_H
#define CUSTOM_HEAP_H

#include <vector>
#include <stdexcept>
#include <algorithm> // For std::swap

/**
 * @brief Template class for a generic Min-Heap.
 *
 * Implements a binary min-heap using a std::vector as the underlying storage.
 * Provides basic heap operations like push, pop, top, empty, and size.
 * Elements must be comparable (have operator< defined).
 */
template <typename T>
class MinHeap {
private:
    std::vector<T> data;

    /**
     * @brief Restores the min-heap property by sifting an element up.
     * Starts from the last element (newly pushed) and moves it up
     * until it's in the correct position relative to its parent.
     *
     * Time Complexity: O(log N) where N is the number of elements in the heap.
     * Space Complexity: O(1)
     *
     * @param index The index of the element to sift up.
     */
    void sift_up(int index) {
        while (index > 0) {
            int parent_index = (index - 1) / 2;
            if (data[index] < data[parent_index]) {
                std::swap(data[index], data[parent_index]);
                index = parent_index;
            } else {
                break; // Heap property satisfied
            }
        }
    }

    /**
     * @brief Restores the min-heap property by sifting an element down.
     * Starts from the root (after pop) and moves it down until it's
     * in the correct position relative to its children.
     *
     * Time Complexity: O(log N) where N is the number of elements in the heap.
     * Space Complexity: O(1)
     *
     * @param index The index of the element to sift down.
     */
    void sift_down(int index) {
        int left_child, right_child, smallest_child;
        int N = data.size();

        while (true) {
            left_child = 2 * index + 1;
            right_child = 2 * index + 2;
            smallest_child = index;

            // Find the smallest among parent, left child, and right child
            if (left_child < N && data[left_child] < data[smallest_child]) {
                smallest_child = left_child;
            }
            if (right_child < N && data[right_child] < data[smallest_child]) {
                smallest_child = right_child;
            }

            if (smallest_child != index) {
                std::swap(data[index], data[smallest_child]);
                index = smallest_child; // Continue sifting down from the new position
            } else {
                break; // Heap property satisfied
            }
        }
    }

public:
    MinHeap() = default;

    /**
     * @brief Constructor that builds a min-heap from a vector of elements.
     * This uses the O(N) heapify-down approach.
     *
     * Time Complexity: O(N) where N is the number of elements.
     * Space Complexity: O(N) due to copying the input vector.
     *
     * @param elements Initial elements for the heap.
     */
    explicit MinHeap(const std::vector<T>& elements) : data(elements) {
        if (data.empty()) return;
        // Start from the last non-leaf node and sift down
        for (int i = (data.size() / 2) - 1; i >= 0; --i) {
            sift_down(i);
        }
    }

    /**
     * @brief Pushes a new element onto the heap.
     * The element is added to the end and then sifted up to maintain heap property.
     *
     * Time Complexity: O(log N)
     * Space Complexity: Amortized O(1) (vector reallocation can be O(N))
     *
     * @param value The element to push.
     */
    void push(const T& value) {
        data.push_back(value);
        sift_up(data.size() - 1);
    }

    /**
     * @brief Removes the smallest element from the heap (the root).
     * The last element is moved to the root, and then sifted down.
     *
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     *
     * @throws std::runtime_error if the heap is empty.
     */
    void pop() {
        if (empty()) {
            throw std::runtime_error("Cannot pop from an empty heap.");
        }
        data[0] = data.back();
        data.pop_back();
        if (!empty()) {
            sift_down(0);
        }
    }

    /**
     * @brief Returns a const reference to the smallest element in the heap (the root).
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @return Const reference to the smallest element.
     * @throws std::runtime_error if the heap is empty.
     */
    const T& top() const {
        if (empty()) {
            throw std::runtime_error("Cannot get top from an empty heap.");
        }
        return data[0];
    }

    /**
     * @brief Checks if the heap is empty.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @return True if the heap is empty, false otherwise.
     */
    bool empty() const {
        return data.empty();
    }

    /**
     * @brief Returns the number of elements in the heap.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @return The number of elements.
     */
    size_t size() const {
        return data.size();
    }

    /**
     * @brief Returns a const reference to the underlying vector.
     * Useful for debugging or testing the internal state.
     *
     * @return Const reference to the internal vector.
     */
    const std::vector<T>& get_data() const {
        return data;
    }
};

/**
 * @brief Template class for a generic Max-Heap.
 *
 * Implements a binary max-heap using a std::vector as the underlying storage.
 * Provides basic heap operations like push, pop, top, empty, and size.
 * Elements must be comparable (have operator< defined).
 */
template <typename T>
class MaxHeap {
private:
    std::vector<T> data;

    /**
     * @brief Restores the max-heap property by sifting an element up.
     *
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     *
     * @param index The index of the element to sift up.
     */
    void sift_up(int index) {
        while (index > 0) {
            int parent_index = (index - 1) / 2;
            if (data[index] > data[parent_index]) { // Changed from < to > for Max-Heap
                std::swap(data[index], data[parent_index]);
                index = parent_index;
            } else {
                break;
            }
        }
    }

    /**
     * @brief Restores the max-heap property by sifting an element down.
     *
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     *
     * @param index The index of the element to sift down.
     */
    void sift_down(int index) {
        int left_child, right_child, largest_child;
        int N = data.size();

        while (true) {
            left_child = 2 * index + 1;
            right_child = 2 * index + 2;
            largest_child = index;

            // Find the largest among parent, left child, and right child
            if (left_child < N && data[left_child] > data[largest_child]) { // Changed from < to >
                largest_child = left_child;
            }
            if (right_child < N && data[right_child] > data[largest_child]) { // Changed from < to >
                largest_child = right_child;
            }

            if (largest_child != index) {
                std::swap(data[index], data[largest_child]);
                index = largest_child;
            } else {
                break;
            }
        }
    }

public:
    MaxHeap() = default;

    /**
     * @brief Constructor that builds a max-heap from a vector of elements.
     * Uses the O(N) heapify-down approach.
     *
     * Time Complexity: O(N)
     * Space Complexity: O(N)
     *
     * @param elements Initial elements for the heap.
     */
    explicit MaxHeap(const std::vector<T>& elements) : data(elements) {
        if (data.empty()) return;
        for (int i = (data.size() / 2) - 1; i >= 0; --i) {
            sift_down(i);
        }
    }

    /**
     * @brief Pushes a new element onto the heap.
     *
     * Time Complexity: O(log N)
     * Space Complexity: Amortized O(1)
     *
     * @param value The element to push.
     */
    void push(const T& value) {
        data.push_back(value);
        sift_up(data.size() - 1);
    }

    /**
     * @brief Removes the largest element from the heap (the root).
     *
     * Time Complexity: O(log N)
     * Space Complexity: O(1)
     *
     * @throws std::runtime_error if the heap is empty.
     */
    void pop() {
        if (empty()) {
            throw std::runtime_error("Cannot pop from an empty heap.");
        }
        data[0] = data.back();
        data.pop_back();
        if (!empty()) {
            sift_down(0);
        }
    }

    /**
     * @brief Returns a const reference to the largest element in the heap (the root).
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @return Const reference to the largest element.
     * @throws std::runtime_error if the heap is empty.
     */
    const T& top() const {
        if (empty()) {
            throw std::runtime_error("Cannot get top from an empty heap.");
        }
        return data[0];
    }

    /**
     * @brief Checks if the heap is empty.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @return True if the heap is empty, false otherwise.
     */
    bool empty() const {
        return data.empty();
    }

    /**
     * @brief Returns the number of elements in the heap.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @return The number of elements.
     */
    size_t size() const {
        return data.size();
    }

    /**
     * @brief Returns a const reference to the underlying vector.
     * Useful for debugging or testing the internal state.
     *
     * @return Const reference to the internal vector.
     */
    const std::vector<T>& get_data() const {
        return data;
    }
};

#endif // CUSTOM_HEAP_H
```