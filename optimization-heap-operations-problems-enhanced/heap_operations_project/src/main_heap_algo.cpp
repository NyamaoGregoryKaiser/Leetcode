```cpp
#include <iostream>
#include <vector>
#include <queue> // For std::priority_queue
#include <map>   // For TopKFrequentElements
#include <set>   // For custom comparison in SmallestRange
#include <limits> // For numeric_limits
#include <stdexcept> // For std::runtime_error

// Include custom heap implementations for comparison/demonstration
#include "min_heap.h"
#include "max_heap.h"

namespace HeapProblems {

    // --- Problem 1: Kth Smallest Element in an Array ---
    // LeetCode: 215. Kth Largest Element in an Array (Variation: Kth Smallest)

    /**
     * @brief Finds the Kth smallest element in an unsorted array using a Max-Heap.
     *
     * This is the most efficient heap-based approach for finding the Kth smallest.
     * We maintain a max-heap of size K. When a new element comes, if it's smaller
     * than the heap's top (largest in heap), we pop the top and push the new element.
     * After processing all elements, the heap's top will be the Kth smallest.
     *
     * @param nums The input array of integers.
     * @param k The desired rank (e.g., k=1 for smallest, k=2 for 2nd smallest).
     * @return The Kth smallest element.
     * @throws std::invalid_argument if k is invalid (e.g., k > nums.size() or k <= 0).
     *
     * Time Complexity: O(N log K) - N elements, each potentially involves a log K heap operation.
     * Space Complexity: O(K) - to store K elements in the max-heap.
     */
    int findKthSmallestMaxHeap(const std::vector<int>& nums, int k) {
        if (k <= 0 || k > nums.size()) {
            throw std::invalid_argument("Invalid k for findKthSmallestMaxHeap: k must be between 1 and nums.size()");
        }

        // Use std::priority_queue, which is a max-heap by default.
        std::priority_queue<int> maxHeap;

        for (int num : nums) {
            maxHeap.push(num); // Add current number to the heap
            if (maxHeap.size() > k) {
                maxHeap.pop(); // If heap size exceeds k, remove the largest element
            }
        }
        // After processing all elements, the top of the maxHeap is the Kth smallest element.
        // This is because it contains the K largest elements among the smallest N elements considered.
        // Example: N={3,2,1,5,6,4}, k=3.
        // heap: {3}, {3,2}, {3,2,1}, {5,3,2} (pop 1), {6,5,3} (pop 2), {6,5,4} (pop 3). Result: 4.
        // Wait, the logic is: maintain k largest elements *seen so far*.
        // If k=3, nums={3,2,1,5,6,4}
        // 3 -> {3}
        // 2 -> {3,2}
        // 1 -> {3,2,1}
        // 5 (5>1) -> pop 1 -> {3,2}, push 5 -> {5,3,2}
        // 6 (6>2) -> pop 2 -> {5,3}, push 6 -> {6,5,3}
        // 4 (4>3) -> pop 3 -> {6,5}, push 4 -> {6,5,4}
        // The *top* of this heap (6) is the Kth *largest* element.
        // For Kth smallest: The heap should store the *K smallest* elements.
        // If an incoming element is larger than heap.top(), it doesn't belong to the K smallest.
        // If it's smaller, pop largest (heap.top()) and push new.
        // So, the max-heap should store the K smallest elements.
        // The largest of these K smallest elements is the Kth smallest overall.

        // Corrected logic for Kth Smallest using Max-Heap:
        // The max-heap stores the 'k' smallest elements encountered so far.
        // The root of this max-heap (maxHeap.top()) will be the Kth smallest element.
        std::priority_queue<int> maxHeap_K_Smallest;
        for (int num : nums) {
            maxHeap_K_Smallest.push(num);
            if (maxHeap_K_Smallest.size() > k) {
                maxHeap_K_Smallest.pop(); // Remove the largest among the 'k+1' elements
            }
        }
        return maxHeap_K_Smallest.top();
    }

    /**
     * @brief Finds the Kth smallest element in an unsorted array using a Min-Heap.
     *
     * This approach is less optimal than using a max-heap of size K for finding the Kth smallest.
     * It involves pushing all elements into a min-heap and then extracting K times.
     *
     * @param nums The input array of integers.
     * @param k The desired rank.
     * @return The Kth smallest element.
     * @throws std::invalid_argument if k is invalid.
     * @throws std::runtime_error if heap operations fail.
     *
     * Time Complexity: O(N + K log N) - N for building heap, K log N for K extractions.
     *                  Can be simplified to O(N log N) if K is comparable to N, or O(N) if K is small.
     * Space Complexity: O(N) - to store all elements in the min-heap.
     */
    int findKthSmallestMinHeap(const std::vector<int>& nums, int k) {
        if (k <= 0 || k > nums.size()) {
            throw std::invalid_argument("Invalid k for findKthSmallestMinHeap: k must be between 1 and nums.size()");
        }

        // Min-heap using std::priority_queue with std::greater<int> comparator
        std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;

        for (int num : nums) {
            minHeap.push(num); // Push all elements into the min-heap
        }

        int result = -1;
        // Pop k-1 elements to get to the Kth smallest
        for (int i = 0; i < k; ++i) {
            if (minHeap.empty()) { // Should not happen if k is valid
                throw std::runtime_error("Heap unexpectedly empty during Kth smallest extraction.");
            }
            result = minHeap.top();
            minHeap.pop();
        }
        return result;
    }

    // --- Problem 2: Merge K Sorted Lists ---
    // LeetCode: 23. Merge k Sorted Lists

    // Definition for singly-linked list.
    struct ListNode {
        int val;
        ListNode *next;
        ListNode() : val(0), next(nullptr) {}
        ListNode(int x) : val(x), next(nullptr) {}
        ListNode(int x, ListNode *next) : val(x), next(next) {}
    };

    /**
     * @brief Custom comparator for ListNode pointers to use in a min-priority queue.
     *        It orders nodes based on their 'val' in ascending order.
     */
    struct CompareListNode {
        bool operator()(ListNode* a, ListNode* b) {
            return a->val > b->val; // For min-heap, smallest element has highest priority (lesser value)
        }
    };

    /**
     * @brief Merges k sorted linked lists into one sorted linked list using a Min-Heap.
     *
     * This is the optimal approach. A min-heap stores the current head node of each list.
     * We repeatedly extract the minimum node from the heap, add it to the result list,
     * and then add its `next` node (if not null) back into the heap.
     *
     * @param lists A vector of pointers to the head nodes of k sorted linked lists.
     * @return A pointer to the head of the merged sorted linked list.
     *
     * Time Complexity: O(N log K), where N is the total number of elements across all lists,
     *                  and K is the number of lists. Each element is inserted/extracted once
     *                  from a heap of size at most K.
     * Space Complexity: O(K) - for storing K list heads in the min-heap.
     */
    ListNode* mergeKLists(std::vector<ListNode*>& lists) {
        // Min-heap to store ListNode pointers, ordered by their 'val'.
        std::priority_queue<ListNode*, std::vector<ListNode*>, CompareListNode> minHeap;

        // Add the head of each non-empty list to the heap.
        for (ListNode* list : lists) {
            if (list) {
                minHeap.push(list);
            }
        }

        ListNode dummyHead; // Dummy node to simplify handling the head of the merged list
        ListNode* current = &dummyHead; // Pointer to the last node in the merged list

        while (!minHeap.empty()) {
            ListNode* smallest = minHeap.top(); // Get the smallest element
            minHeap.pop();                       // Remove it from the heap

            current->next = smallest;            // Link it to the merged list
            current = current->next;             // Move current pointer forward

            if (smallest->next) {                // If the extracted node has a next element
                minHeap.push(smallest->next);    // Add the next element to the heap
            }
        }

        return dummyHead.next; // Return the head of the merged list (skipping dummy)
    }

    /**
     * @brief Merges k sorted linked lists using a pairwise merge approach.
     *
     * This is a less optimal approach compared to the heap-based one.
     * It merges lists two by two until only one list remains.
     * Helper function: merges two sorted lists.
     *
     * @param l1 Pointer to the head of the first list.
     * @param l2 Pointer to the head of the second list.
     * @return Pointer to the head of the merged sorted list.
     *
     * Time Complexity for mergeTwoLists: O(L1 + L2) where L1 and L2 are lengths of lists.
     * Time Complexity for mergeKListsPairwise: O(N * K) in the worst case (e.g., all lists are small but K is large).
     *                                          More precisely, it's roughly O(N * log K) if implemented efficiently
     *                                          using a divide and conquer strategy (similar to merge sort).
     *                                          However, a sequential pairwise merge (merging list 1 with 2, then result with 3, etc.)
     *                                          would be O(N*K).
     * Space Complexity: O(1) auxiliary space (if done iteratively in-place), or O(log K) for recursion stack.
     */
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode dummyHead;
        ListNode* current = &dummyHead;

        while (l1 && l2) {
            if (l1->val <= l2->val) {
                current->next = l1;
                l1 = l1->next;
            } else {
                current->next = l2;
                l2 = l2->next;
            }
            current = current->next;
        }

        if (l1) {
            current->next = l1;
        } else if (l2) {
            current->next = l2;
        }
        return dummyHead.next;
    }

    ListNode* mergeKListsPairwise(std::vector<ListNode*>& lists) {
        if (lists.empty()) {
            return nullptr;
        }
        if (lists.size() == 1) {
            return lists[0];
        }

        // Iteratively merge lists
        // In this implementation, it's more like a "sequential" pairwise merge.
        // A better pairwise merge would be like a tournament tree (divide and conquer).
        ListNode* mergedList = lists[0];
        for (size_t i = 1; i < lists.size(); ++i) {
            mergedList = mergeTwoLists(mergedList, lists[i]);
        }
        return mergedList;
    }


    // --- Problem 3: Find Median from Data Stream ---
    // LeetCode: 295. Find Median from Data Stream

    /**
     * @brief Implements a MedianFinder using two heaps: a max-heap for the smaller half
     *        and a min-heap for the larger half.
     *
     * The goal is to keep the sizes of the two heaps balanced (or one heap having one more element).
     * The median can then be easily found from the top of the heaps.
     *
     * Data structure invariants:
     * 1. All elements in `low` (max-heap) are less than or equal to all elements in `high` (min-heap).
     * 2. `low.size()` is either equal to `high.size()` or `low.size() == high.size() + 1`.
     *
     * Time Complexity (addNum): O(log N) - for heap push/pop operations.
     * Time Complexity (findMedian): O(1) - for peeking at heap tops.
     * Space Complexity: O(N) - to store all numbers.
     */
    class MedianFinder {
    public:
        // Max-heap to store the smaller half of numbers. Top is largest in smaller half.
        std::priority_queue<int> low;
        // Min-heap to store the larger half of numbers. Top is smallest in larger half.
        std::priority_queue<int, std::vector<int>, std::greater<int>> high;

        MedianFinder() {}

        /**
         * @brief Adds a new number to the data stream and maintains heap invariants.
         * @param num The number to add.
         */
        void addNum(int num) {
            // Rule 1: Add to 'low' heap first
            low.push(num);

            // Rule 2: Ensure low.top() <= high.top() by transferring
            // If low.top() is greater than high.top() (or if high is empty after first push)
            // push low.top() to high and pop from low.
            if (!low.empty() && !high.empty() && low.top() > high.top()) {
                high.push(low.top());
                low.pop();
            }

            // Rule 3: Balance heap sizes: low.size() == high.size() or low.size() == high.size() + 1
            if (low.size() > high.size() + 1) {
                high.push(low.top());
                low.pop();
            } else if (high.size() > low.size()) {
                low.push(high.top());
                high.pop();
            }
        }

        /**
         * @brief Finds the median of all numbers added so far.
         * @return The median value.
         */
        double findMedian() {
            if (low.empty()) {
                throw std::runtime_error("No numbers added to MedianFinder.");
            }

            if (low.size() == high.size()) {
                // Even number of elements, median is average of two middle elements
                return (static_cast<double>(low.top()) + high.top()) / 2.0;
            } else {
                // Odd number of elements, median is the top of the 'low' heap
                return static_cast<double>(low.top());
            }
        }
    };

    // --- Problem 4: Top K Frequent Elements ---
    // LeetCode: 347. Top K Frequent Elements

    /**
     * @brief Finds the K most frequent elements in an array using a Min-Heap.
     *
     * Steps:
     * 1. Count frequencies of all elements using a hash map (std::map or std::unordered_map).
     * 2. Iterate through the frequency map. For each (element, frequency) pair, push it into a min-heap.
     *    The min-heap stores pairs (frequency, element) and is ordered by frequency (smallest frequency at top).
     * 3. If the heap size exceeds K, pop the element with the smallest frequency (heap.top()).
     * 4. After processing all elements, the heap will contain the K elements with the highest frequencies.
     *
     * @param nums The input array of integers.
     * @param k The number of most frequent elements to find.
     * @return A vector containing the K most frequent elements.
     * @throws std::invalid_argument if k is invalid (e.g., k <= 0 or k > number of unique elements).
     *
     * Time Complexity: O(N + M log K), where N is the number of elements in `nums`, M is the
     *                  number of unique elements in `nums`. O(N) for frequency counting.
     *                  O(M log K) for heap operations (M insertions, M potential pops).
     * Space Complexity: O(M + K) - O(M) for frequency map, O(K) for min-heap.
     */
    std::vector<int> topKFrequent(const std::vector<int>& nums, int k) {
        if (k <= 0) {
            throw std::invalid_argument("Invalid k for topKFrequent: k must be greater than 0.");
        }

        // Step 1: Count frequencies
        std::map<int, int> freqMap;
        for (int num : nums) {
            freqMap[num]++;
        }

        if (k > freqMap.size()) {
             // Handle case where k is larger than the number of unique elements.
             // It implies we should return all unique elements, if that's the desired behavior.
             // For strict interpretation of problem (k frequent elements), this is an error or implies returning all unique.
             // Here, we'll just return all unique elements as a practical approach.
             std::vector<int> result_all_unique;
             for(auto const& [num, freq] : freqMap) {
                 result_all_unique.push_back(num);
             }
             return result_all_unique;
            // Or throw std::invalid_argument("k is greater than the number of unique elements.");
        }


        // Step 2: Use a min-heap to keep track of the k most frequent elements.
        // The heap stores pairs of (frequency, element).
        // Since it's a min-heap, it will keep elements with smallest frequency at top.
        // We want to keep the K elements with *largest* frequencies.
        // So, if an element with frequency F comes, and heap size is K,
        // if F > heap.top().first (smallest freq in heap), then pop and push new element.
        // std::priority_queue by default is a max-heap. For min-heap, we need std::greater.
        std::priority_queue<std::pair<int, int>,
                            std::vector<std::pair<int, int>>,
                            std::greater<std::pair<int, int>>> minHeap; // Pair: {frequency, element}

        for (auto const& [num, freq] : freqMap) {
            minHeap.push({freq, num});
            if (minHeap.size() > k) {
                minHeap.pop(); // Remove the element with the smallest frequency among the current k+1 elements
            }
        }

        // Step 3: Extract elements from the min-heap to get the result.
        // The heap now contains the K elements with the highest frequencies.
        std::vector<int> result;
        while (!minHeap.empty()) {
            result.push_back(minHeap.top().second); // Add the element (second part of pair)
            minHeap.pop();
        }

        // The elements are collected in ascending order of frequency (due to min-heap).
        // If specific order (e.g., descending frequency) is required, sort `result` or
        // push into another structure. For this problem, order usually doesn't matter.
        // std::reverse(result.begin(), result.end()); // Optional: if descending order of freq is desired.

        return result;
    }

    // --- Problem 5: Smallest Range Covering Elements from K Lists ---
    // LeetCode: 632. Smallest Range Covering Elements from K Lists

    /**
     * @brief Finds the smallest range [min, max] that includes at least one element from each of k sorted lists.
     *
     * This problem uses a min-heap to efficiently track the current minimum element
     * across all lists, while simultaneously maintaining the current maximum element seen.
     *
     * Each element in the min-heap will be a tuple: `(value, list_index, element_index_in_list)`.
     * The heap is ordered by `value`.
     *
     * Algorithm:
     * 1. Initialize a min-heap. `currentMax` to track the maximum element among the heap elements.
     *    `rangeStart`, `rangeEnd` to store the smallest found range.
     * 2. For each of the k lists, add its first element to the min-heap. Update `currentMax` if necessary.
     * 3. Loop while the heap contains an element from all K lists (heap.size() == k):
     *    a. Extract the minimum element `(minVal, listIdx, elemIdx)` from the heap.
     *    b. This `minVal` and `currentMax` define a potential range. Update `rangeStart`, `rangeEnd`
     *       if the current range `(currentMax - minVal)` is smaller than the best found so far.
     *    c. If the list from which `minVal` was extracted has a next element, add it to the heap.
     *       Update `currentMax` if this new element is larger.
     *    d. If the list has no more elements, break the loop as we can no longer cover all lists.
     *
     * @param nums A vector of vectors, where each inner vector is a sorted list.
     * @return A vector of two integers {rangeStart, rangeEnd} representing the smallest range.
     * @throws std::invalid_argument if input lists are empty or k is invalid.
     *
     * Time Complexity: O(N log K), where N is the total number of elements across all lists,
     *                  and K is the number of lists. Each element is inserted/extracted once
     *                  from a heap of size at most K.
     * Space Complexity: O(K) - for storing K elements in the min-heap.
     */
    std::vector<int> smallestRange(const std::vector<std::vector<int>>& nums) {
        int k = nums.size();
        if (k == 0) {
            return {}; // No lists, no range.
        }

        // Min-heap stores tuples: {value, list_idx, element_idx_in_list}
        // Ordered by 'value'.
        using ElementInfo = std::tuple<int, int, int>; // {value, list_idx, elem_idx}
        std::priority_queue<ElementInfo, std::vector<ElementInfo>, std::greater<ElementInfo>> minHeap;

        int currentMax = std::numeric_limits<int>::min(); // Tracks the maximum element currently in the heap
        int rangeStart = 0;
        int rangeEnd = std::numeric_limits<int>::max(); // Initialize with largest possible range

        // 1. Initialize heap with the first element of each list and find initial currentMax
        for (int i = 0; i < k; ++i) {
            if (nums[i].empty()) {
                // If any list is empty, it's impossible to cover all lists.
                // Depending on requirements, could throw error or return empty range.
                // For this problem, usually valid inputs are assumed.
                throw std::invalid_argument("One of the input lists is empty, cannot form a range.");
            }
            minHeap.push({nums[i][0], i, 0}); // Push {value, list_idx, element_idx}
            currentMax = std::max(currentMax, nums[i][0]);
        }

        // 2. Loop until one list is exhausted (heap size becomes less than k)
        while (minHeap.size() == k) {
            ElementInfo minElem = minHeap.top();
            minHeap.pop();

            int minVal = std::get<0>(minElem);
            int listIdx = std::get<1>(minElem);
            int elemIdx = std::get<2>(minElem);

            // Check if current range is smaller than the best found so far
            if (currentMax - minVal < rangeEnd - rangeStart) {
                rangeStart = minVal;
                rangeEnd = currentMax;
            }

            // Move to the next element in the list from which minVal was extracted
            if (elemIdx + 1 < nums[listIdx].size()) {
                int nextVal = nums[listIdx][elemIdx + 1];
                minHeap.push({nextVal, listIdx, elemIdx + 1});
                currentMax = std::max(currentMax, nextVal); // Update currentMax if new element is larger
            } else {
                // This list is exhausted. Cannot maintain a range covering all k lists.
                break;
            }
        }

        return {rangeStart, rangeEnd};
    }

} // namespace HeapProblems
```