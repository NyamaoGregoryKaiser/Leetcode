#pragma once

#include <vector>
#include <stdexcept>
#include <iostream>
#include <algorithm> // For std::swap

/**
 * @brief Custom Max-Heap implementation using a vector.
 *
 * This class provides a basic Max-Heap data structure with common operations
 * like push, pop, top, empty, and size. It demonstrates the underlying
 * mechanics of a heap, including heapify_up and heapify_down operations.
 *
 * @tparam T The type of elements stored in the heap. Must be comparable.
 */
template <typename T>
class MaxHeap {
private:
    std::vector<T> data; // The underlying vector to store heap elements

    /**
     * @brief Get the index of the parent of a node.
     * @param idx The index of the child node.
     * @return The index of the parent node.
     */
    int parent_idx(int idx) const {
        return (idx - 1) / 2;
    }

    /**
     * @brief Get the index of the left child of a node.
     * @param idx The index of the parent node.
     * @return The index of the left child node.
     */
    int left_child_idx(int idx) const {
        return 2 * idx + 1;
    }

    /**
     * @brief Get the index of the right child of a node.
     * @param idx The index of the parent node.
     * @return The index of the right child node.
     */
    int right_child_idx(int idx) const {
        return 2 * idx + 2;
    }

    /**
     * @brief Check if an index is valid within the heap's current size.
     * @param idx The index to check.
     * @return True if the index is valid, false otherwise.
     */
    bool is_valid_idx(int idx) const {
        return idx >= 0 && idx < data.size();
    }

    /**
     * @brief Restores the Max-Heap property by moving an element up the heap.
     *        This is called after an insertion.
     * @param idx The index of the newly inserted element.
     */
    void heapify_up(int idx) {
        // While current node is not root (idx > 0) AND current node is larger than its parent
        while (idx > 0 && data[idx] > data[parent_idx(idx)]) {
            std::swap(data[idx], data[parent_idx(idx)]);
            idx = parent_idx(idx); // Move up to the parent's position
        }
    }

    /**
     * @brief Restores the Max-Heap property by moving an element down the heap.
     *        This is called after removing the root or replacing it.
     * @param idx The index of the element to heapify down from.
     */
    void heapify_down(int idx) {
        int largest = idx;
        int left = left_child_idx(idx);
        int right = right_child_idx(idx);
        int n = data.size();

        // If left child exists and is larger than current largest
        if (left < n && data[left] > data[largest]) {
            largest = left;
        }

        // If right child exists and is larger than current largest
        if (right < n && data[right] > data[largest]) {
            largest = right;
        }

        // If largest is not current node, swap and continue heapifying down
        if (largest != idx) {
            std::swap(data[idx], data[largest]);
            heapify_down(largest); // Recursively call for the swapped child
        }
    }

public:
    /**
     * @brief Default constructor for MaxHeap.
     */
    MaxHeap() = default;

    /**
     * @brief Constructs a MaxHeap from a vector of elements.
     *        Builds the heap in O(N) time.
     * @param arr The vector of elements to initialize the heap with.
     */
    MaxHeap(const std::vector<T>& arr) : data(arr) {
        // Start from the last non-leaf node and heapify_down upwards
        for (int i = (data.size() / 2) - 1; i >= 0; --i) {
            heapify_down(i);
        }
    }

    /**
     * @brief Inserts an element into the Max-Heap.
     * @param value The element to insert.
     */
    void push(const T& value) {
        data.push_back(value);
        heapify_up(data.size() - 1); // Restore heap property from the new element's position
    }

    /**
     * @brief Removes the maximum element (root) from the Max-Heap.
     * @throws std::runtime_error If the heap is empty.
     */
    void pop() {
        if (empty()) {
            throw std::runtime_error("Heap is empty, cannot pop.");
        }
        data[0] = data.back(); // Move last element to root
        data.pop_back();       // Remove last element
        if (!empty()) {
            heapify_down(0);   // Restore heap property from the root
        }
    }

    /**
     * @brief Returns a const reference to the maximum element (root) of the Max-Heap.
     * @return Const reference to the maximum element.
     * @throws std::runtime_error If the heap is empty.
     */
    const T& top() const {
        if (empty()) {
            throw std::runtime_error("Heap is empty, no top element.");
        }
        return data[0];
    }

    /**
     * @brief Checks if the Max-Heap is empty.
     * @return True if the heap is empty, false otherwise.
     */
    bool empty() const {
        return data.empty();
    }

    /**
     * @brief Returns the number of elements in the Max-Heap.
     * @return The current size of the heap.
     */
    size_t size() const {
        return data.size();
    }

    /**
     * @brief Clears all elements from the heap.
     */
    void clear() {
        data.clear();
    }

    /**
     * @brief Prints the elements of the heap (for debugging).
     *        Note: This prints the underlying array, not the tree structure.
     */
    void print_heap() const {
        std::cout << "Heap elements: [";
        for (size_t i = 0; i < data.size(); ++i) {
            std::cout << data[i] << (i == data.size() - 1 ? "" : ", ");
        }
        std::cout << "]" << std::endl;
    }
};