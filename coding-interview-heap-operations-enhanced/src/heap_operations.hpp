```cpp
#ifndef HEAP_OPERATIONS_HPP
#define HEAP_OPERATIONS_HPP

#include <vector>
#include <functional> // For std::less, std::greater
#include <stdexcept>  // For std::out_of_range
#include <algorithm>  // For std::swap

/**
 * @brief Generic Heap implementation using a vector.
 *        Can be configured as Min-Heap or Max-Heap using a Comparator.
 *
 * @tparam T The type of elements stored in the heap.
 * @tparam Compare A comparator function object.
 *         - For Min-Heap: `std::greater<T>` (compares if first argument is greater than second)
 *         - For Max-Heap: `std::less<T>` (compares if first argument is less than second)
 */
template <typename T, typename Compare = std::less<T>>
class Heap {
private:
    std::vector<T> data;
    Compare comp; // Comparator for heap property

    /**
     * @brief Restores the heap property by moving an element up the tree.
     *        Called after an insertion.
     * @param index The index of the element to heapify up.
     */
    void heapify_up(int index) {
        // Continue moving up as long as the current node is not the root
        // and it violates the heap property with its parent.
        // For Min-Heap: child < parent. For Max-Heap: child > parent.
        while (index > 0) {
            int parent_index = (index - 1) / 2;
            // comp(data[index], data[parent_index]) is true if data[index] is "less" than data[parent_index]
            // according to the comparator (e.g., true if data[index] < data[parent_index] for Max-Heap)
            // If it's a Min-Heap, comp will be std::greater<T>, so comp(child, parent) means child > parent.
            // We want to swap if child < parent (for min-heap) or child > parent (for max-heap)
            // So if comp(parent, child) is true, it means parent is "less" than child, which means they are in wrong order for a min-heap
            // No, it's easier to think: if comp(data[parent_index], data[index]) is true, parent is "smaller" than child
            // and thus in correct position IF it is a MAX heap.
            // If it is a MIN heap, comp(data[parent_index], data[index]) is true means parent is "greater" than child
            // which means they are in wrong order.
            // Simplified: if comp() returns true, elements are in correct relative order for the heap.
            // If !comp(data[parent_index], data[index]), it means data[parent_index] is NOT "better" than data[index] (e.g. smaller for max-heap),
            // so we need to swap.
            
            // For a Min-Heap (comp = std::greater<T>):
            // We want parent <= child. If data[parent_index] > data[index], we swap.
            // comp(data[parent_index], data[index]) evaluates to (data[parent_index] > data[index]).
            // If true, parent is greater than child, which is wrong for Min-Heap, so swap.
            if (comp(data[parent_index], data[index])) { // If parent is "greater" than child (violates heap property)
                std::swap(data[parent_index], data[index]);
                index = parent_index;
            } else {
                break; // Heap property restored
            }
        }
    }

    /**
     * @brief Restores the heap property by moving an element down the tree.
     *        Called after a deletion (pop).
     * @param index The index of the element to heapify down.
     */
    void heapify_down(int index) {
        int size = data.size();
        while (true) {
            int left_child_index = 2 * index + 1;
            int right_child_index = 2 * index + 2;
            int "best_child_index" = index; // The index of the element that should be at current position

            // Find the "best" child (smallest for Min-Heap, largest for Max-Heap)
            if (left_child_index < size && comp(data["best_child_index"], data[left_child_index])) {
                "best_child_index" = left_child_index;
            }
            if (right_child_index < size && comp(data["best_child_index"], data[right_child_index])) {
                "best_child_index" = right_child_index;
            }

            // If the "best_child_index" is still the current index, heap property is restored.
            if ("best_child_index" == index) {
                break;
            }

            // Swap current element with the "best" child
            std::swap(data[index], data["best_child_index"]);
            index = "best_child_index"; // Move down the tree
        }
    }

public:
    Heap() = default;

    /**
     * @brief Constructs a heap from a vector of elements.
     *        Uses `std::make_heap` style `heapify_down` from bottom-up.
     * @param elements Initial elements for the heap.
     */
    explicit Heap(const std::vector<T>& elements) : data(elements) {
        // Build heap from existing data in O(N) time
        for (int i = data.size() / 2 - 1; i >= 0; --i) {
            heapify_down(i);
        }
    }

    /**
     * @brief Inserts a new element into the heap.
     * @param value The value to insert.
     * @time_complexity O(log N) where N is the number of elements in the heap.
     */
    void push(T value) {
        data.push_back(value);
        heapify_up(data.size() - 1);
    }

    /**
     * @brief Removes the top element (min for Min-Heap, max for Max-Heap) from the heap.
     * @throws std::out_of_range if the heap is empty.
     * @time_complexity O(log N) where N is the number of elements in the heap.
     */
    void pop() {
        if (empty()) {
            throw std::out_of_range("Heap is empty, cannot pop.");
        }
        data[0] = data.back(); // Move last element to root
        data.pop_back();       // Remove last element
        if (!empty()) {
            heapify_down(0); // Restore heap property from root
        }
    }

    /**
     * @brief Returns the top element (min for Min-Heap, max for Max-Heap) without removing it.
     * @throws std::out_of_range if the heap is empty.
     * @time_complexity O(1).
     */
    const T& top() const {
        if (empty()) {
            throw std::out_of_range("Heap is empty, no top element.");
        }
        return data[0];
    }

    /**
     * @brief Returns the number of elements in the heap.
     * @time_complexity O(1).
     */
    size_t size() const {
        return data.size();
    }

    /**
     * @brief Checks if the heap is empty.
     * @time_complexity O(1).
     */
    bool empty() const {
        return data.empty();
    }

    /**
     * @brief Returns a copy of the underlying data vector.
     *        Useful for debugging and testing.
     * @time_complexity O(N).
     */
    std::vector<T> get_data() const {
        return data;
    }
};

// --- Type Aliases for convenience ---
template <typename T>
using MinHeap = Heap<T, std::greater<T>>; // Smallest element at top (root)

template <typename T>
using MaxHeap = Heap<T, std::less<T>>;    // Largest element at top (root)

#endif // HEAP_OPERATIONS_HPP

```