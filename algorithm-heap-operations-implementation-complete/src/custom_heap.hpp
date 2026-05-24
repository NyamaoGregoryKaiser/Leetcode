```cpp
#ifndef CUSTOM_HEAP_HPP
#define CUSTOM_HEAP_HPP

#include <vector>
#include <functional> // For std::less and std::greater
#include <stdexcept>  // For std::out_of_range
#include <algorithm>  // For std::swap

// --- Default Comparators for Max-Heap and Min-Heap ---
// A comparator `comp(a, b)` returns true if `a` has lower priority than `b`.
// For a Max-Heap, smaller elements have lower priority. So, `a < b` means `a` has lower priority.
template <typename T>
struct DefaultMaxHeapComparator {
    bool operator()(const T& a, const T& b) const {
        return a < b; // 'a' has lower priority than 'b' if a is less than b
    }
};

// For a Min-Heap, larger elements have lower priority. So, `a > b` means `a` has lower priority.
template <typename T>
struct DefaultMinHeapComparator {
    bool operator()(const T& a, const T& b) const {
        return a > b; // 'a' has lower priority than 'b' if a is greater than b
    }
};

/**
 * @class CustomHeap
 * @brief Generic array-based binary heap implementation.
 *
 * This class template implements a binary heap using a std::vector.
 * It can function as both a min-heap or a max-heap depending on the `Comparator`
 * supplied. The `Comparator` should define how elements are prioritized.
 *
 * @tparam T The type of elements stored in the heap.
 * @tparam Comparator A functor (or function object) that takes two arguments
 *                    of type `T` and returns `true` if the first argument has
 *                    LOWER priority than the second.
 *                    - For a Max-Heap: `std::less<T>` or `DefaultMaxHeapComparator<T>` (element `a` < `b` means `a` has lower priority)
 *                    - For a Min-Heap: `std::greater<T>` or `DefaultMinHeapComparator<T>` (element `a` > `b` means `a` has lower priority)
 */
template <typename T, typename Comparator = DefaultMaxHeapComparator<T>>
class CustomHeap {
public:
    /**
     * @brief Default constructor. Creates an empty heap.
     */
    CustomHeap() = default;

    /**
     * @brief Constructor to build a heap from an initial vector of elements.
     * @param data The vector of elements to initialize the heap with.
     *
     * Time Complexity: O(N) where N is the number of elements in `data`.
     * Space Complexity: O(N) to store the elements.
     */
    explicit CustomHeap(const std::vector<T>& data) : heap_data(data) {
        // Build heap property by heapifying down from the first non-leaf node.
        // All nodes after (size / 2) - 1 are leaf nodes, which are already valid heaps.
        // The last non-leaf node is at index (heap_data.size() / 2) - 1.
        for (int i = (static_cast<int>(heap_data.size()) / 2) - 1; i >= 0; --i) {
            heapifyDown(i);
        }
    }

    /**
     * @brief Inserts an element into the heap.
     * @param value The element to be inserted.
     *
     * Time Complexity: O(log N) where N is the current number of elements in the heap.
     * Space Complexity: O(1) (amortized for vector growth).
     */
    void push(const T& value) {
        heap_data.push_back(value);
        // After adding, the new element might violate the heap property,
        // so we heapify up from its position.
        heapifyUp(static_cast<int>(heap_data.size()) - 1);
    }

    /**
     * @brief Removes the top element from the heap.
     *
     * Throws `std::out_of_range` if the heap is empty.
     *
     * Time Complexity: O(log N) where N is the current number of elements in the heap.
     * Space Complexity: O(1).
     */
    void pop() {
        if (empty()) {
            throw std::out_of_range("Heap is empty, cannot pop.");
        }
        // Move the last element to the root, effectively removing the old root.
        heap_data[0] = heap_data.back();
        heap_data.pop_back();
        // If the heap is not empty, restore the heap property by heapifying down from the new root.
        if (!empty()) {
            heapifyDown(0);
        }
    }

    /**
     * @brief Returns a const reference to the top element of the heap.
     *
     * Throws `std::out_of_range` if the heap is empty.
     *
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     *
     * @return A const reference to the top element.
     */
    const T& top() const {
        if (empty()) {
            throw std::out_of_range("Heap is empty, no top element.");
        }
        return heap_data[0];
    }

    /**
     * @brief Checks if the heap is empty.
     *
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     *
     * @return True if the heap contains no elements, false otherwise.
     */
    bool empty() const {
        return heap_data.empty();
    }

    /**
     * @brief Returns the number of elements in the heap.
     *
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     *
     * @return The number of elements in the heap.
     */
    size_t size() const {
        return heap_data.size();
    }

    /**
     * @brief Provides read-only access to the underlying vector data.
     *        Primarily for testing and debugging purposes.
     *
     * Time Complexity: O(1).
     * Space Complexity: O(1).
     *
     * @return A const reference to the internal `std::vector` storing heap elements.
     */
    const std::vector<T>& data() const {
        return heap_data;
    }

private:
    std::vector<T> heap_data; ///< The underlying vector storing the heap elements.
    Comparator comp;          ///< The comparator used to determine element priority.

    /**
     * @brief Restores the heap property by moving the element at `index` upwards.
     *        This is used after pushing a new element.
     * @param index The index of the element to heapify up.
     *
     * Time Complexity: O(log N) in the worst case.
     */
    void heapifyUp(int index) {
        while (index > 0) {
            int parent_index = (index - 1) / 2;
            // If current element has higher priority than its parent, swap them.
            // comp(parent, child) returns true if parent has LOWER priority than child.
            if (comp(heap_data[parent_index], heap_data[index])) {
                std::swap(heap_data[index], heap_data[parent_index]);
                index = parent_index; // Continue moving up
            } else {
                break; // Heap property satisfied
            }
        }
    }

    /**
     * @brief Restores the heap property by moving the element at `index` downwards.
     *        This is used after popping the top element or during heap construction.
     * @param index The index of the element to heapify down.
     *
     * Time Complexity: O(log N) in the worst case.
     */
    void heapifyDown(int index) {
        int heap_size = static_cast<int>(heap_data.size());
        while (true) {
            int left_child_index = 2 * index + 1;
            int right_child_index = 2 * index + 2;
            int highest_priority_index = index; // Assume current node has highest priority initially

            // Check if left child exists and has higher priority than current (or current highest priority child).
            // comp(current, left_child) returns true if current has LOWER priority than left_child.
            if (left_child_index < heap_size && comp(heap_data[highest_priority_index], heap_data[left_child_index])) {
                highest_priority_index = left_child_index;
            }

            // Check if right child exists and has higher priority than current highest priority child.
            // comp(current_highest, right_child) returns true if current_highest has LOWER priority than right_child.
            if (right_child_index < heap_size && comp(heap_data[highest_priority_index], heap_data[right_child_index])) {
                highest_priority_index = right_child_index;
            }

            // If the element at 'index' already has the highest priority among itself and its children,
            // the heap property is satisfied.
            if (highest_priority_index == index) {
                break;
            } else {
                // Swap current node with the child that has higher priority.
                std::swap(heap_data[index], heap_data[highest_priority_index]);
                // Continue heapifying down from the swapped child's new position.
                index = highest_priority_index;
            }
        }
    }
};

// --- Type Aliases for Convenience ---
/**
 * @brief Alias for a Min-Heap using `CustomHeap`.
 *        Elements are ordered such that the smallest element is at the top.
 */
template <typename T>
using CustomMinHeap = CustomHeap<T, DefaultMinHeapComparator<T>>;

/**
 * @brief Alias for a Max-Heap using `CustomHeap`.
 *        Elements are ordered such that the largest element is at the top.
 */
template <typename T>
using CustomMaxHeap = CustomHeap<T, DefaultMaxHeapComparator<T>>;

#endif // CUSTOM_HEAP_HPP
```
---