```cpp
#ifndef SORT_IMPLEMENTATIONS_H
#define SORT_IMPLEMENTATIONS_H

#include <vector>
#include <functional> // For std::function

namespace SortingAlgorithms {

/**
 * @brief Interface for common sorting algorithms.
 * All algorithms are template functions to work with various data types.
 */

// --- Basic Sorts (for completeness and comparison) ---

/**
 * @brief Sorts a vector using Bubble Sort algorithm.
 * Time Complexity: O(N^2) average/worst, O(N) best (already sorted).
 * Space Complexity: O(1).
 * @tparam T The type of elements in the vector.
 * @param arr The vector to be sorted.
 */
template <typename T>
void bubbleSort(std::vector<T>& arr);

/**
 * @brief Sorts a vector using Selection Sort algorithm.
 * Time Complexity: O(N^2) average/worst/best.
 * Space Complexity: O(1).
 * @tparam T The type of elements in the vector.
 * @param arr The vector to be sorted.
 */
template <typename T>
void selectionSort(std::vector<T>& arr);

/**
 * @brief Sorts a vector using Insertion Sort algorithm.
 * Time Complexity: O(N^2) average/worst, O(N) best (already sorted).
 * Space Complexity: O(1).
 * @tparam T The type of elements in the vector.
 * @param arr The vector to be sorted.
 */
template <typename T>
void insertionSort(std::vector<T>& arr);

// --- Efficient Comparison Sorts ---

/**
 * @brief Sorts a vector using Quick Sort algorithm (recursive).
 * Employs randomized pivot selection for better average performance.
 * Time Complexity: O(N log N) average, O(N^2) worst.
 * Space Complexity: O(log N) average (due to recursion stack), O(N) worst.
 * @tparam T The type of elements in the vector.
 * @param arr The vector to be sorted.
 */
template <typename T>
void quickSort(std::vector<T>& arr);

/**
 * @brief Sorts a vector using Merge Sort algorithm (recursive, top-down).
 * Time Complexity: O(N log N) average/worst/best.
 * Space Complexity: O(N) (for temporary merge arrays).
 * @tparam T The type of elements in the vector.
 * @param arr The vector to be sorted.
 */
template <typename T>
void mergeSort(std::vector<T>& arr);

/**
 * @brief Sorts a vector using Heap Sort algorithm.
 * Time Complexity: O(N log N) average/worst/best.
 * Space Complexity: O(1) (in-place).
 * @tparam T The type of elements in the vector.
 * @param arr The vector to be sorted.
 */
template <typename T>
void heapSort(std::vector<T>& arr);

// --- Kth Element (QuickSelect) ---

/**
 * @brief Finds the k-th smallest element in an unsorted array using QuickSelect.
 * (Equivalent to finding (N-k+1)-th largest element).
 * Time Complexity: O(N) average, O(N^2) worst (with bad pivot choices).
 * Space Complexity: O(log N) average, O(N) worst (recursion stack).
 * @tparam T The type of elements in the vector.
 * @param arr The vector to search in.
 * @param k The 1-based index of the element to find (e.g., k=1 for smallest).
 * @return The k-th smallest element.
 * @throws std::out_of_range if k is invalid.
 */
template <typename T>
T quickSelect(std::vector<T>& arr, int k);

// --- Custom Comparator versions (for generalizability) ---

/**
 * @brief Sorts a vector using Quick Sort with a custom comparison function.
 * @tparam T The type of elements in the vector.
 * @tparam Compare A comparator function object (e.g., std::less<T>).
 * @param arr The vector to be sorted.
 * @param comp The comparison function.
 */
template <typename T, typename Compare>
void quickSort(std::vector<T>& arr, Compare comp);

/**
 * @brief Sorts a vector using Merge Sort with a custom comparison function.
 * @tparam T The type of elements in the vector.
 * @tparam Compare A comparator function object (e.g., std::less<T>).
 * @param arr The vector to be sorted.
 * @param comp The comparison function.
 */
template <typename T, typename Compare>
void mergeSort(std::vector<T>& arr, Compare comp);

} // namespace SortingAlgorithms

// Include the implementation file to allow template instantiation across translation units
#include "sort_implementations.cpp"

#endif // SORT_IMPLEMENTATIONS_H
```