#pragma once

#include <vector>
#include <queue> // For std::priority_queue
#include <map>
#include <unordered_map>
#include <algorithm> // For std::nth_element, std::sort

// Include custom heap implementations
#include "utils/min_heap.h"
#include "utils/max_heap.h"

/**
 * @brief Definition for singly-linked list.
 *        Used in Problem 2: Merge K Sorted Lists.
 */
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}

    // Destructor to prevent memory leaks when creating test lists
    ~ListNode() {
        ListNode* current = this;
        while (current != nullptr) {
            ListNode* next_node = current->next;
            // std::cout << "Deleting " << current->val << std::endl; // For debugging
            current->next = nullptr; // Break the link
            delete current;
            current = next_node;
        }
    }
};

/**
 * @brief Custom comparator for ListNode* to be used in a Min-Heap/Priority Queue.
 *        Compares based on the `val` field of the ListNode.
 */
struct CompareListNode {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val; // For Min-Heap, we want 'a' to be "greater" if its value is larger
                                // so smaller values have higher priority (are 'less' in the heap sense).
    }
};

// --- Problem 1: Kth Largest Element in an Array ---
/**
 * @brief Finds the Kth largest element in an array using a Min-Heap.
 *        This is the primary (optimal) solution.
 *
 * @param nums The input vector of integers.
 * @param k The 'k' value (1-indexed).
 * @return The Kth largest element.
 * @Complexity: Time O(N log K), Space O(K)
 */
int findKthLargest_Heap(std::vector<int>& nums, int k);

/**
 * @brief Finds the Kth largest element in an array using `std::nth_element`.
 *        This is an optimized standard library approach.
 *
 * @param nums The input vector of integers.
 * @param k The 'k' value (1-indexed).
 * @return The Kth largest element.
 * @Complexity: Time Average O(N), Worst O(N^2), Space O(1)
 */
int findKthLargest_NthElement(std::vector<int>& nums, int k);

/**
 * @brief Finds the Kth largest element in an array by sorting (brute force).
 *
 * @param nums The input vector of integers.
 * @param k The 'k' value (1-indexed).
 * @return The Kth largest element.
 * @Complexity: Time O(N log N), Space O(log N) or O(N) depending on sort
 */
int findKthLargest_Sort(std::vector<int>& nums, int k);

// --- Problem 2: Merge K Sorted Lists ---
/**
 * @brief Merges K sorted linked lists into one using a Min-Heap of ListNode pointers.
 *        This is the primary (optimal) solution.
 *
 * @param lists A vector of pointers to the heads of the K sorted linked lists.
 * @return A pointer to the head of the merged sorted linked list.
 * @Complexity: Time O(N log K), Space O(K)
 */
ListNode* mergeKLists_Heap(std::vector<ListNode*>& lists);

// --- Problem 3: Find Median from Data Stream ---
/**
 * @brief Implements a data structure to find the median from a data stream using two heaps.
 */
class MedianFinder {
private:
    MaxHeap<int> max_heap_low;  // Stores the smaller half of numbers (max-heap)
    MinHeap<int> min_heap_high; // Stores the larger half of numbers (min-heap)

public:
    /**
     * @brief Constructor for MedianFinder.
     */
    MedianFinder();

    /**
     * @brief Adds an integer to the data structure.
     * @param num The integer to add.
     * @Complexity: Time O(log N), Space O(1) (amortized for current operation)
     */
    void addNum(int num);

    /**
     * @brief Returns the median of all elements added so far.
     * @return The median as a double.
     * @Complexity: Time O(1), Space O(1)
     */
    double findMedian();
};

// --- Problem 4: Top K Frequent Elements ---
/**
 * @brief Finds the K most frequent elements in an array using a Min-Heap of pairs.
 *        This is the primary (optimal) solution.
 *
 * @param nums The input vector of integers.
 * @param k The number of most frequent elements to return.
 * @return A vector containing the K most frequent elements.
 * @Complexity: Time O(N + M log K) -> simplified to O(N log K) in worst case. Space O(M + K) -> O(N)
 */
std::vector<int> topKFrequent_Heap(std::vector<int>& nums, int k);

/**
 * @brief Finds the K most frequent elements in an array using a map and sorting.
 *        This is an alternative, less optimal solution compared to bucket sort for large ranges.
 *
 * @param nums The input vector of integers.
 * @param k The number of most frequent elements to return.
 * @return A vector containing the K most frequent elements.
 * @Complexity: Time O(N + M log M), Space O(M)
 */
std::vector<int> topKFrequent_Sort(std::vector<int>& nums, int k);