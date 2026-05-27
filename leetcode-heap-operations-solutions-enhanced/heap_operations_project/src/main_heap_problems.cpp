```cpp
#include "custom_heap.h" // For custom heap implementation
#include <iostream>
#include <vector>
#include <queue>         // For std::priority_queue (alternative solutions)
#include <algorithm>     // For std::sort, std::nth_element
#include <map>           // For frequency counting
#include <functional>    // For std::greater

// --- Problem 1: Kth Largest Element in an Array ---
// Given an integer array nums and an integer k, return the kth largest element in the array.
// Note that it is the kth largest element in the sorted order, not the kth distinct element.

namespace KthLargestElement {

    /**
     * @brief Approach 1: Sorting (Brute Force)
     * Sorts the array in descending order and returns the element at index k-1.
     *
     * Time Complexity: O(N log N) due to sorting.
     * Space Complexity: O(log N) or O(N) depending on sort implementation (e.g., IntroSort usually O(log N) stack space, MergeSort O(N) auxiliary space).
     *
     * @param nums The input array.
     * @param k The desired rank.
     * @return The kth largest element.
     */
    int findKthLargest_Sort(std::vector<int> nums, int k) {
        std::sort(nums.rbegin(), nums.rend()); // Sort in descending order
        return nums[k - 1];
    }

    /**
     * @brief Approach 2: Min-Heap (Optimal for general Kth problems)
     * Uses a min-heap to keep track of the `k` largest elements seen so far.
     * Iterate through the array:
     * 1. Push element onto heap.
     * 2. If heap size > k, pop the smallest element (which is the root).
     * After iterating, the heap's root (smallest element in heap) is the kth largest overall.
     *
     * Time Complexity: O(N log K) because each of N elements is pushed/popped (log K).
     * Space Complexity: O(K) to store elements in the heap.
     *
     * @param nums The input array.
     * @param k The desired rank.
     * @return The kth largest element.
     */
    int findKthLargest_MinHeap_Std(std::vector<int> nums, int k) {
        // std::priority_queue by default is a max-heap.
        // To make it a min-heap, use std::greater<int>.
        std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;

        for (int num : nums) {
            min_heap.push(num);
            if (min_heap.size() > k) {
                min_heap.pop();
            }
        }
        return min_heap.top();
    }

    /**
     * @brief Approach 2.1: Min-Heap using Custom Heap Implementation
     * Same logic as findKthLargest_MinHeap_Std, but uses the custom MinHeap.
     *
     * Time Complexity: O(N log K)
     * Space Complexity: O(K)
     *
     * @param nums The input array.
     * @param k The desired rank.
     * @return The kth largest element.
     */
    int findKthLargest_MinHeap_Custom(std::vector<int> nums, int k) {
        MinHeap<int> min_heap;

        for (int num : nums) {
            min_heap.push(num);
            if (min_heap.size() > k) {
                min_heap.pop();
            }
        }
        return min_heap.top();
    }

    /**
     * @brief Approach 3: Quickselect (Average Optimal, not heap-based but good comparison)
     * An average O(N) algorithm based on the partitioning logic of Quicksort.
     * It finds the k-th smallest element, which can be adapted to find the k-th largest.
     * The k-th largest element is the (N - k)-th smallest element.
     * std::nth_element provides an implementation of Quickselect.
     *
     * Time Complexity: Average O(N), Worst Case O(N^2) (can be avoided with good pivot selection).
     * Space Complexity: O(log N) (for recursion stack) or O(1) iterative.
     *
     * @param nums The input array.
     * @param k The desired rank.
     * @return The kth largest element.
     */
    int findKthLargest_Quickselect(std::vector<int> nums, int k) {
        // std::nth_element rearranges the elements in [first, last) such that:
        // - The element at the nth position is the element that would be in that position in a sorted sequence.
        // - All of the elements before this nth position are less than or equal to the elements after this nth position.
        // To find the kth largest, we need the element at index (nums.size() - k) if sorted ascending.
        std::nth_element(nums.begin(), nums.begin() + (nums.size() - k), nums.end());
        return nums[nums.size() - k];
    }

} // namespace KthLargestElement


// --- Problem 2: Merge K Sorted Lists ---
// You are given an array of k linked-lists, each sorted in ascending order.
// Merge all the linked-lists into one sorted linked-list and return it.

// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

// Custom comparator for min-heap of ListNode pointers
// We want the heap to return the node with the smallest 'val'
struct CompareListNode {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val; // Min-heap behavior for ListNode*
    }
};

namespace MergeKSortedLists {

    /**
     * @brief Approach 1: Brute Force (Collect all, then sort)
     * Collects all values from all lists into a single vector,
     * sorts the vector, and then reconstructs a new linked list.
     *
     * Time Complexity: O(N log N) where N is the total number of elements.
     * Space Complexity: O(N) for storing all elements in a vector.
     *
     * @param lists Vector of sorted linked lists.
     * @return Merged sorted linked list.
     */
    ListNode* mergeKLists_BruteForce(std::vector<ListNode*>& lists) {
        std::vector<int> all_elements;
        for (ListNode* list : lists) {
            ListNode* current = list;
            while (current) {
                all_elements.push_back(current->val);
                current = current->next;
            }
        }

        if (all_elements.empty()) return nullptr;

        std::sort(all_elements.begin(), all_elements.end());

        ListNode* dummy = new ListNode();
        ListNode* current = dummy;
        for (int val : all_elements) {
            current->next = new ListNode(val);
            current = current->next;
        }
        return dummy->next;
    }

    /**
     * @brief Approach 2: Using a Min-Heap (Optimal)
     * Uses a min-heap to efficiently find the smallest element among the heads of the k lists.
     * 1. Push the head of each non-empty list into the min-heap.
     * 2. While the heap is not empty:
     *    a. Extract the smallest node (top of the heap).
     *    b. Add this node to the merged list.
     *    c. If the extracted node has a next element, push it into the heap.
     *
     * Time Complexity: O(N log K) where N is the total number of elements and K is the number of lists.
     *                  Each of N elements is pushed/popped from a heap of size at most K.
     * Space Complexity: O(K) for the min-heap.
     *
     * @param lists Vector of sorted linked lists.
     * @return Merged sorted linked list.
     */
    ListNode* mergeKLists_MinHeap_Std(std::vector<ListNode*>& lists) {
        std::priority_queue<ListNode*, std::vector<ListNode*>, CompareListNode> min_heap;

        for (ListNode* list_head : lists) {
            if (list_head) {
                min_heap.push(list_head);
            }
        }

        ListNode* dummy = new ListNode();
        ListNode* tail = dummy;

        while (!min_heap.empty()) {
            ListNode* smallest_node = min_heap.top();
            min_heap.pop();

            tail->next = smallest_node;
            tail = smallest_node;

            if (smallest_node->next) {
                min_heap.push(smallest_node->next);
            }
        }
        return dummy->next;
    }

    /**
     * @brief Approach 2.1: Using Custom Min-Heap
     * Same logic as mergeKLists_MinHeap_Std, but uses the custom MinHeap.
     *
     * Time Complexity: O(N log K)
     * Space Complexity: O(K)
     *
     * @param lists Vector of sorted linked lists.
     * @return Merged sorted linked list.
     */
    ListNode* mergeKLists_MinHeap_Custom(std::vector<ListNode*>& lists) {
        // Custom MinHeap needs to store pointers and use a custom comparator
        // Our current custom_heap.h doesn't directly support custom comparators
        // for `operator<`, so we'd need to wrap ListNode* in a struct or modify custom_heap.h.
        // For simplicity and to demonstrate the problem, let's assume
        // a wrapper struct for ListNode* that defines operator< for comparison.
        // Or directly modify custom_heap.h template to accept a comparator.
        // For now, let's stick to using the std::priority_queue with CompareListNode for this problem
        // as custom_heap.h is generic for types T which define operator<.
        // If ListNode* directly supports operator<, it would work, but it doesn't by default
        // based on `val`.

        // To use custom MinHeap directly, we would need a wrapper struct:
        struct NodeWrapper {
            ListNode* node;
            bool operator<(const NodeWrapper& other) const {
                return node->val < other.node->val; // Min-heap for values
            }
        };

        MinHeap<NodeWrapper> min_heap;

        for (ListNode* list_head : lists) {
            if (list_head) {
                min_heap.push({list_head});
            }
        }

        ListNode* dummy = new ListNode();
        ListNode* tail = dummy;

        while (!min_heap.empty()) {
            NodeWrapper wrapper = min_heap.top();
            min_heap.pop();
            ListNode* smallest_node = wrapper.node;

            tail->next = smallest_node;
            tail = smallest_node;

            if (smallest_node->next) {
                min_heap.push({smallest_node->next});
            }
        }
        return dummy->next;
    }

    /**
     * @brief Approach 3: Divide and Conquer (Similar performance to Heap)
     * Recursively merges two lists at a time until all lists are merged.
     * mergeKLists([L1, L2, L3, L4]) -> merge(merge(L1, L2), merge(L3, L4))
     *
     * Time Complexity: O(N log K)
     * Space Complexity: O(log K) (for recursion stack)
     *
     * @param lists Vector of sorted linked lists.
     * @return Merged sorted linked list.
     */
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        if (!l1) return l2;
        if (!l2) return l1;

        if (l1->val < l2->val) {
            l1->next = mergeTwoLists(l1->next, l2);
            return l1;
        } else {
            l2->next = mergeTwoLists(l1, l2->next);
            return l2;
        }
    }

    ListNode* mergeKLists_DivideAndConquer(std::vector<ListNode*>& lists) {
        if (lists.empty()) return nullptr;
        if (lists.size() == 1) return lists[0];

        int interval = 1;
        while (interval < lists.size()) {
            for (int i = 0; i + interval < lists.size(); i += interval * 2) {
                lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
            }
            interval *= 2;
        }
        return lists[0];
    }

} // namespace MergeKSortedLists


// --- Problem 3: Find Median from Data Stream ---
// The median is the middle value in an ordered integer list. If the size of the list is even,
// there is no single middle value, and the median is the average of the two middle values.
// Implement the MedianFinder class:
// - MedianFinder() initializes the MedianFinder object.
// - void addNum(int num) adds an integer from the data stream to the data structure.
// - double findMedian() returns the median of all elements so far.

namespace FindMedianFromDataStream {

    /**
     * @brief Approach: Two Heaps (Optimal)
     * Maintain two heaps:
     * 1. A max-heap (`low`) to store the smaller half of the numbers.
     * 2. A min-heap (`high`) to store the larger half of the numbers.
     *
     * The `max_heap.top()` will be the largest element in the smaller half.
     * The `min_heap.top()` will be the smallest element in the larger half.
     *
     * We ensure:
     * a. All elements in `low` are less than or equal to all elements in `high`.
     * b. The sizes of the heaps differ by at most 1.
     *
     * When adding a number:
     * - If `num` is smaller than or equal to `max_heap.top()` (or `max_heap` is empty), add to `max_heap`.
     * - Else, add to `min_heap`.
     *
     * After adding, rebalance the heaps:
     * - If `max_heap.size() > min_heap.size() + 1`, move `max_heap.top()` to `min_heap`.
     * - If `min_heap.size() > max_heap.size()`, move `min_heap.top()` to `max_heap`.
     *
     * Finding median:
     * - If total size is odd, median is `max_heap.top()`.
     * - If total size is even, median is average of `max_heap.top()` and `min_heap.top()`.
     *
     * Time Complexity:
     * - addNum: O(log N) due to heap operations.
     * - findMedian: O(1).
     * Space Complexity: O(N) to store all numbers in the heaps.
     */
    class MedianFinder_Std {
    public:
        // Max-heap for the smaller half of numbers
        std::priority_queue<int> low_heap;
        // Min-heap for the larger half of numbers
        std::priority_queue<int, std::vector<int>, std::greater<int>> high_heap;

        MedianFinder_Std() {}

        void addNum(int num) {
            // Add to the appropriate heap
            if (low_heap.empty() || num <= low_heap.top()) {
                low_heap.push(num);
            } else {
                high_heap.push(num);
            }

            // Rebalance heaps
            if (low_heap.size() > high_heap.size() + 1) {
                high_heap.push(low_heap.top());
                low_heap.pop();
            } else if (high_heap.size() > low_heap.size()) {
                low_heap.push(high_heap.top());
                high_heap.pop();
            }
        }

        double findMedian() {
            if (low_heap.empty()) return 0.0; // Or throw error

            if (low_heap.size() == high_heap.size()) {
                return (low_heap.top() + high_heap.top()) / 2.0;
            } else { // low_heap will always be potentially one larger
                return low_heap.top();
            }
        }
    };

    /**
     * @brief Approach: Two Heaps using Custom Heap Implementation
     * Same logic as MedianFinder_Std, but uses the custom MinHeap and MaxHeap.
     *
     * Time Complexity:
     * - addNum: O(log N)
     * - findMedian: O(1)
     * Space Complexity: O(N)
     */
    class MedianFinder_Custom {
    public:
        // Max-heap for the smaller half of numbers
        MaxHeap<int> low_heap;
        // Min-heap for the larger half of numbers
        MinHeap<int> high_heap;

        MedianFinder_Custom() {}

        void addNum(int num) {
            // Add to the appropriate heap
            if (low_heap.empty() || num <= low_heap.top()) {
                low_heap.push(num);
            } else {
                high_heap.push(num);
            }

            // Rebalance heaps
            if (low_heap.size() > high_heap.size() + 1) {
                high_heap.push(low_heap.top());
                low_heap.pop();
            } else if (high_heap.size() > low_heap.size()) {
                low_heap.push(high_heap.top());
                high_heap.pop();
            }
        }

        double findMedian() {
            if (low_heap.empty()) return 0.0; // Or throw error

            if (low_heap.size() == high_heap.size()) {
                return (low_heap.top() + high_heap.top()) / 2.0;
            } else { // low_heap will always be potentially one larger
                return low_heap.top();
            }
        }
    };

} // namespace FindMedianFromDataStream


// --- Problem 4: Top K Frequent Elements ---
// Given an integer array nums and an integer k, return the k most frequent elements.
// You may return the answer in any order.

namespace TopKFrequentElements {

    /**
     * @brief Approach 1: Frequency Map + Sorting (Brute Force)
     * 1. Count frequencies of all elements using a hash map.
     * 2. Transfer map entries into a vector of pairs.
     * 3. Sort the vector based on frequency (descending).
     * 4. Take the first k elements.
     *
     * Time Complexity: O(N) for map creation, O(M log M) for sorting (M is distinct elements, M <= N).
     *                  Overall O(N + M log M). In worst case M=N (all distinct), O(N log N).
     * Space Complexity: O(M) for map and vector.
     *
     * @param nums Input array.
     * @param k Number of frequent elements to return.
     * @return Vector of k most frequent elements.
     */
    std::vector<int> topKFrequent_MapAndSort(const std::vector<int>& nums, int k) {
        // 1. Count frequencies
        std::map<int, int> counts; // Using std::map for ordered keys, std::unordered_map is typically faster
        for (int num : nums) {
            counts[num]++;
        }

        // 2. Transfer to vector of pairs
        std::vector<std::pair<int, int>> freq_vec;
        for (auto const& [num, freq] : counts) {
            freq_vec.push_back({num, freq});
        }

        // 3. Sort by frequency in descending order
        std::sort(freq_vec.begin(), freq_vec.end(),
                  [](const std::pair<int, int>& a, const std::pair<int, int>& b) {
                      return a.second > b.second; // Sort by frequency (second element) descending
                  });

        // 4. Collect top k elements
        std::vector<int> result;
        for (int i = 0; i < k; ++i) {
            result.push_back(freq_vec[i].first);
        }
        return result;
    }


    /**
     * @brief Approach 2: Frequency Map + Min-Heap (Optimal)
     * 1. Count frequencies of all elements using a hash map.
     * 2. Use a min-heap to keep track of the `k` elements with the highest frequencies.
     *    The heap stores pairs of (frequency, number).
     *    When iterating through the map entries:
     *    a. Push current (freq, num) onto the heap.
     *    b. If heap size > k, pop the element with the smallest frequency (root of min-heap).
     * 3. After iterating, the heap contains the `k` most frequent elements. Extract them.
     *
     * Time Complexity: O(N) for map creation. O(M log K) for heap operations (M distinct elements).
     *                  Overall O(N + M log K). In worst case M=N, O(N log K).
     * Space Complexity: O(M) for map, O(K) for heap.
     *
     * @param nums Input array.
     * @param k Number of frequent elements to return.
     * @return Vector of k most frequent elements.
     */
    std::vector<int> topKFrequent_MinHeap_Std(const std::vector<int>& nums, int k) {
        // 1. Count frequencies
        std::map<int, int> counts; // Using std::map, std::unordered_map is generally preferred for performance
        for (int num : nums) {
            counts[num]++;
        }

        // Min-heap to store pairs of (frequency, number)
        // We want to keep k largest frequencies, so use a min-heap on frequency
        // If the heap grows beyond k, we pop the smallest frequency, ensuring
        // only the k largest frequencies remain.
        // Custom comparator for std::priority_queue to make it a min-heap based on frequency.
        // `std::priority_queue` is a max-heap by default. To make it a min-heap
        // for `std::pair<int, int>`, its default comparison (lexicographical for pairs)
        // means it would prioritize the `first` element (frequency) in descending order.
        // So `std::greater` needs to be applied to the PAIR comparison.
        // Alternatively, store {-frequency, number} in a max-heap. Or, define custom struct.
        // Or, simpler, the default pair comparison behavior IS min-heap on first element.
        // No, `std::priority_queue<std::pair<int, int>>` is a max-heap: it extracts the largest pair (by first, then second).
        // To make it a min-heap on the first element (frequency), we need `std::greater<std::pair<int, int>>`.
        std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<std::pair<int, int>>> min_heap;

        for (auto const& [num, freq] : counts) {
            min_heap.push({freq, num}); // Push {frequency, number}
            if (min_heap.size() > k) {
                min_heap.pop();
            }
        }

        // 3. Extract top k elements
        std::vector<int> result;
        while (!min_heap.empty()) {
            result.push_back(min_heap.top().second); // We need the number, not the frequency
            min_heap.pop();
        }
        return result;
    }

    /**
     * @brief Approach 2.1: Frequency Map + Min-Heap using Custom Heap Implementation
     * Same logic as topKFrequent_MinHeap_Std, but uses the custom MinHeap.
     *
     * Time Complexity: O(N + M log K)
     * Space Complexity: O(M + K)
     *
     * @param nums Input array.
     * @param k Number of frequent elements to return.
     * @return Vector of k most frequent elements.
     */
    std::vector<int> topKFrequent_MinHeap_Custom(const std::vector<int>& nums, int k) {
        // 1. Count frequencies
        std::map<int, int> counts;
        for (int num : nums) {
            counts[num]++;
        }

        // Custom MinHeap needs to store pairs directly. std::pair supports operator< by default
        // which performs lexicographical comparison. For a MinHeap, this means it will put
        // the pair with the smallest 'first' element (frequency) at the top.
        MinHeap<std::pair<int, int>> min_heap;

        for (auto const& [num, freq] : counts) {
            min_heap.push({freq, num}); // Push {frequency, number}
            if (min_heap.size() > k) {
                min_heap.pop();
            }
        }

        // 3. Extract top k elements
        std::vector<int> result;
        while (!min_heap.empty()) {
            result.push_back(min_heap.top().second);
            min_heap.pop();
        }
        return result;
    }

} // namespace TopKFrequentElements

// Example usage and main function (for direct execution if needed, otherwise tests cover this)
// int main() {
//     // Kth Largest
//     std::vector<int> nums1 = {3, 2, 1, 5, 6, 4};
//     int k1 = 2;
//     std::cout << "Kth Largest (Sort): " << KthLargestElement::findKthLargest_Sort(nums1, k1) << std::endl;
//     std::cout << "Kth Largest (MinHeap Std): " << KthLargestElement::findKthLargest_MinHeap_Std(nums1, k1) << std::endl;
//     std::cout << "Kth Largest (MinHeap Custom): " << KthLargestElement::findKthLargest_MinHeap_Custom(nums1, k1) << std::endl;
//     std::cout << "Kth Largest (Quickselect): " << KthLargestElement::findKthLargest_Quickselect(nums1, k1) << std::endl;

//     // Merge K Sorted Lists (requires manual ListNode setup)
//     // ListNode* l1 = new ListNode(1, new ListNode(4, new ListNode(5)));
//     // ListNode* l2 = new ListNode(1, new ListNode(3, new ListNode(4)));
//     // ListNode* l3 = new ListNode(2, new ListNode(6));
//     // std::vector<ListNode*> lists = {l1, l2, l3};
//     // ListNode* merged_list = MergeKSortedLists::mergeKLists_MinHeap_Std(lists);
//     // ... print merged_list ...

//     // Find Median from Data Stream
//     // MedianFinder_Std mf_std;
//     // mf_std.addNum(1);
//     // mf_std.addNum(2);
//     // std::cout << "Median: " << mf_std.findMedian() << std::endl; // 1.5
//     // mf_std.addNum(3);
//     // std::cout << "Median: " << mf_std.findMedian() << std::endl; // 2.0

//     // Top K Frequent
//     // std::vector<int> nums2 = {1, 1, 1, 2, 2, 3};
//     // int k2 = 2;
//     // std::vector<int> top_k = TopKFrequentElements::topKFrequent_MinHeap_Std(nums2, k2);
//     // std::cout << "Top K Frequent: ";
//     // for (int x : top_k) std::cout << x << " ";
//     // std::cout << std::endl;

//     return 0;
// }
```