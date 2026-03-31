```cpp
#include "heap_operations.hpp" // For custom MinHeap/MaxHeap
#include "utils/data_generator.hpp" // For ListNode definition and helper functions
#include <vector>
#include <queue> // For std::priority_queue
#include <map>   // For frequency counting (Top K Frequent)
#include <algorithm> // For std::sort (brute force, Top K)
#include <limits> // For numeric_limits (Merge K)

// Forward declarations for DataGenerator::ListNode
using DataGenerator::ListNode;

/**
 * @brief Problem 1: Kth Largest Element in a Stream
 *
 * Design a class to find the k-th largest element in a stream.
 *
 * Example:
 * KthLargest kthLargest = KthLargest(3, [4, 5, 8, 2]);
 * kthLargest.add(3);   // return 4
 * kthLargest.add(5);   // return 5
 * kthLargest.add(10);  // return 5
 * kthLargest.add(9);   // return 8
 * kthLargest.add(4);   // return 8
 */

// Approach 1: Using custom MinHeap
class KthLargest_CustomHeap {
private:
    MinHeap<int> min_heap;
    int k_val;

public:
    /**
     * @brief Constructor for KthLargest_CustomHeap.
     * @param k The 'k' for k-th largest.
     * @param nums Initial array of numbers.
     * @time_complexity O(N log K) for initialization, where N is initial nums size.
     * @space_complexity O(K) for storing elements in the heap.
     */
    KthLargest_CustomHeap(int k, const std::vector<int>& nums) : k_val(k) {
        for (int num : nums) {
            add(num); // Use the add method to maintain heap property
        }
    }

    /**
     * @brief Adds a new value to the stream and returns the k-th largest element.
     * @param val The value to add.
     * @return The k-th largest element.
     * @time_complexity O(log K) for push/pop operations.
     * @space_complexity O(K) for storing elements in the heap.
     */
    int add(int val) {
        min_heap.push(val);
        if (min_heap.size() > k_val) {
            min_heap.pop();
        }
        return min_heap.top();
    }
};

// Approach 2: Using std::priority_queue (Min-Heap)
class KthLargest_StdHeap {
private:
    std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;
    int k_val;

public:
    /**
     * @brief Constructor for KthLargest_StdHeap.
     * @param k The 'k' for k-th largest.
     * @param nums Initial array of numbers.
     * @time_complexity O(N log K) for initialization, where N is initial nums size.
     * @space_complexity O(K) for storing elements in the heap.
     */
    KthLargest_StdHeap(int k, const std::vector<int>& nums) : k_val(k) {
        for (int num : nums) {
            add(num);
        }
    }

    /**
     * @brief Adds a new value to the stream and returns the k-th largest element.
     * @param val The value to add.
     * @return The k-th largest element.
     * @time_complexity O(log K) for push/pop operations.
     * @space_complexity O(K) for storing elements in the heap.
     */
    int add(int val) {
        min_heap.push(val);
        if (min_heap.size() > k_val) {
            min_heap.pop();
        }
        return min_heap.top();
    }
};


/**
 * @brief Problem 2: Merge K Sorted Lists
 *
 * Merge k sorted linked lists into one sorted linked list.
 *
 * Example:
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,3,4,4,5,6]
 */

// Custom comparator for ListNode pointers for Min-Heap
struct CompareListNodePtr {
    bool operator()(ListNode* a, ListNode* b) {
        // For Min-Heap, 'a' is "greater" than 'b' if a->val > b->val
        return a->val > b->val;
    }
};

// Approach 1: Using custom MinHeap of ListNode pointers
ListNode* mergeKLists_CustomHeap(std::vector<ListNode*>& lists) {
    MinHeap<ListNode*, CompareListNodePtr> min_heap;

    // Push the head of each list into the min-heap
    for (ListNode* list_head : lists) {
        if (list_head) {
            min_heap.push(list_head);
        }
    }

    ListNode dummy_head(0);
    ListNode* current = &dummy_head;

    // While the heap is not empty, extract the smallest element
    while (!min_heap.empty()) {
        ListNode* smallest_node = min_heap.top();
        min_heap.pop();

        current->next = smallest_node;
        current = current->next;

        // If the extracted node has a next element, push it to the heap
        if (smallest_node->next) {
            min_heap.push(smallest_node->next);
        }
    }

    return dummy_head.next;
}

// Approach 2: Using std::priority_queue of ListNode pointers
ListNode* mergeKLists_StdHeap(std::vector<ListNode*>& lists) {
    // std::priority_queue defaults to Max-Heap. Use std::greater for Min-Heap.
    // We need a custom comparator for ListNode*
    std::priority_queue<ListNode*, std::vector<ListNode*>, CompareListNodePtr> min_heap;

    for (ListNode* list_head : lists) {
        if (list_head) {
            min_heap.push(list_head);
        }
    }

    ListNode dummy_head(0);
    ListNode* current = &dummy_head;

    while (!min_heap.empty()) {
        ListNode* smallest_node = min_heap.top();
        min_heap.pop();

        current->next = smallest_node;
        current = current->next;

        if (smallest_node->next) {
            min_heap.push(smallest_node->next);
        }
    }

    return dummy_head.next;
}

// Approach 3: Brute Force (Collect all, sort, then rebuild list)
ListNode* mergeKLists_BruteForce(std::vector<ListNode*>& lists) {
    std::vector<int> all_elements;
    for (ListNode* list_head : lists) {
        ListNode* current = list_head;
        while (current) {
            all_elements.push_back(current->val);
            current = current->next;
        }
    }

    std::sort(all_elements.begin(), all_elements.end());

    ListNode dummy_head(0);
    ListNode* current = &dummy_head;
    for (int val : all_elements) {
        current->next = new ListNode(val);
        current = current->next;
    }

    return dummy_head.next;
}


/**
 * @brief Problem 3: Find Median from Data Stream
 *
 * Design a data structure that supports adding new numbers and finding the median
 * of all numbers added so far.
 *
 * Example:
 * MedianFinder medianFinder = new MedianFinder();
 * medianFinder.addNum(1);    // arr = [1]
 * medianFinder.addNum(2);    // arr = [1, 2]
 * medianFinder.findMedian(); // return 1.5
 * medianFinder.addNum(3);    // arr = [1, 2, 3]
 * medianFinder.findMedian(); // return 2.0
 */

// Approach 1: Using custom MaxHeap and MinHeap
class MedianFinder_CustomHeap {
private:
    MaxHeap<int> lower_half; // Stores smaller half, max element at top
    MinHeap<int> upper_half; // Stores larger half, min element at top

    /**
     * @brief Balances the two heaps such that lower_half.size() is equal to or
     *        one greater than upper_half.size().
     */
    void balance_heaps() {
        // If lower_half has too many elements (size > upper_half.size() + 1)
        if (lower_half.size() > upper_half.size() + 1) {
            upper_half.push(lower_half.top());
            lower_half.pop();
        }
        // If upper_half has too many elements (size > lower_half.size())
        else if (upper_half.size() > lower_half.size()) {
            lower_half.push(upper_half.top());
            upper_half.pop();
        }
    }

public:
    /**
     * @brief Constructor for MedianFinder_CustomHeap.
     * @time_complexity O(1).
     * @space_complexity O(1).
     */
    MedianFinder_CustomHeap() {}

    /**
     * @brief Adds a number to the data structure.
     * @param num The number to add.
     * @time_complexity O(log N) where N is the total count of numbers added so far.
     * @space_complexity O(N) to store all numbers across two heaps.
     */
    void addNum(int num) {
        // Add to appropriate heap
        if (lower_half.empty() || num <= lower_half.top()) {
            lower_half.push(num);
        } else {
            upper_half.push(num);
        }
        balance_heaps(); // Re-balance after addition
    }

    /**
     * @brief Returns the median of all numbers added so far.
     * @return The median value.
     * @time_complexity O(1).
     */
    double findMedian() {
        if (lower_half.empty()) {
            return 0.0; // Or throw error, depending on problem spec
        }

        if (lower_half.size() == upper_half.size()) {
            // Even number of elements, median is average of two middle elements
            return (static_cast<double>(lower_half.top()) + upper_half.top()) / 2.0;
        } else {
            // Odd number of elements, median is the top of the larger heap (lower_half)
            return static_cast<double>(lower_half.top());
        }
    }
};

// Approach 2: Using std::priority_queue (Max-Heap and Min-Heap)
class MedianFinder_StdHeap {
private:
    // Max-heap for the smaller half of numbers
    std::priority_queue<int> lower_half;
    // Min-heap for the larger half of numbers
    std::priority_queue<int, std::vector<int>, std::greater<int>> upper_half;

    /**
     * @brief Balances the two heaps.
     */
    void balance_heaps() {
        if (lower_half.size() > upper_half.size() + 1) {
            upper_half.push(lower_half.top());
            lower_half.pop();
        } else if (upper_half.size() > lower_half.size()) {
            lower_half.push(upper_half.top());
            upper_half.pop();
        }
    }

public:
    /**
     * @brief Constructor for MedianFinder_StdHeap.
     * @time_complexity O(1).
     * @space_complexity O(1).
     */
    MedianFinder_StdHeap() {}

    /**
     * @brief Adds a number to the data structure.
     * @param num The number to add.
     * @time_complexity O(log N) where N is the total count of numbers added so far.
     * @space_complexity O(N) to store all numbers across two heaps.
     */
    void addNum(int num) {
        if (lower_half.empty() || num <= lower_half.top()) {
            lower_half.push(num);
        } else {
            upper_half.push(num);
        }
        balance_heaps();
    }

    /**
     * @brief Returns the median of all numbers added so far.
     * @return The median value.
     * @time_complexity O(1).
     */
    double findMedian() {
        if (lower_half.empty()) {
            return 0.0;
        }

        if (lower_half.size() == upper_half.size()) {
            return (static_cast<double>(lower_half.top()) + upper_half.top()) / 2.0;
        } else {
            return static_cast<double>(lower_half.top());
        }
    }
};


/**
 * @brief Problem 4: Top K Frequent Elements
 *
 * Given an integer array nums and an integer k, return the k most frequent elements.
 *
 * Example:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 */

// Custom comparator for pairs for Min-Heap based on frequency (first element)
struct ComparePairFrequency {
    bool operator()(const std::pair<int, int>& a, const std::pair<int, int>& b) {
        // For Min-Heap, 'a' is "greater" than 'b' if a.first > b.first
        // This ensures the pair with the smallest frequency is at the top
        return a.first > b.first;
    }
};

// Approach 1: Using custom MinHeap of pairs
std::vector<int> topKFrequent_CustomHeap(const std::vector<int>& nums, int k) {
    if (k == 0) return {};
    if (nums.empty()) return {};

    // Step 1: Count frequencies of each element
    std::map<int, int> freq_map;
    for (int num : nums) {
        freq_map[num]++;
    }

    // Step 2: Use a Min-Heap to keep track of the k most frequent elements
    // Heap stores pairs: (frequency, element)
    MinHeap<std::pair<int, int>, ComparePairFrequency> min_heap;

    for (const auto& pair : freq_map) {
        min_heap.push({pair.second, pair.first}); // {frequency, element}
        if (min_heap.size() > k) {
            min_heap.pop(); // Remove the element with the smallest frequency
        }
    }

    // Step 3: Extract elements from the heap
    std::vector<int> result;
    while (!min_heap.empty()) {
        result.push_back(min_heap.top().second); // Add element (second part of pair)
        min_heap.pop();
    }
    // The elements are popped in ascending order of frequency, reverse to match typical output
    std::reverse(result.begin(), result.end());
    return result;
}

// Approach 2: Using std::priority_queue of pairs
std::vector<int> topKFrequent_StdHeap(const std::vector<int>& nums, int k) {
    if (k == 0) return {};
    if (nums.empty()) return {};

    std::map<int, int> freq_map;
    for (int num : nums) {
        freq_map[num]++;
    }

    // Min-Heap of pairs (frequency, element)
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, ComparePairFrequency> min_heap;

    for (const auto& pair : freq_map) {
        min_heap.push({pair.second, pair.first});
        if (min_heap.size() > k) {
            min_heap.pop();
        }
    }

    std::vector<int> result;
    while (!min_heap.empty()) {
        result.push_back(min_heap.top().second);
        min_heap.pop();
    }
    std::reverse(result.begin(), result.end());
    return result;
}

// Approach 3: Brute Force (Count, sort, take top k)
std::vector<int> topKFrequent_BruteForce(const std::vector<int>& nums, int k) {
    if (k == 0) return {};
    if (nums.empty()) return {};

    // Step 1: Count frequencies
    std::map<int, int> freq_map;
    for (int num : nums) {
        freq_map[num]++;
    }

    // Step 2: Convert map to vector of pairs
    std::vector<std::pair<int, int>> freq_vec;
    for (const auto& pair : freq_map) {
        freq_vec.push_back({pair.second, pair.first}); // {frequency, element}
    }

    // Step 3: Sort the vector by frequency in descending order
    std::sort(freq_vec.begin(), freq_vec.end(), [](const std::pair<int, int>& a, const std::pair<int, int>& b) {
        return a.first > b.first; // Sort by frequency descending
    });

    // Step 4: Extract the top k elements
    std::vector<int> result;
    for (int i = 0; i < std::min((int)freq_vec.size(), k); ++i) {
        result.push_back(freq_vec[i].second);
    }

    return result;
}
```