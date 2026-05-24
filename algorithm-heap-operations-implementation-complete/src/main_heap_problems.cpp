```cpp
#include <iostream>
#include <vector>
#include <queue>      // For std::priority_queue
#include <map>        // For frequency counting
#include <algorithm>  // For std::sort, std::nth_element
#include <numeric>    // For std::iota
#include <functional> // For std::greater, std::less

// Include custom heap for alternative implementations
#include "custom_heap.hpp"

// Utility to print vectors
template <typename T>
void print_vector(const std::string& name, const std::vector<T>& vec) {
    std::cout << name << ": [";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i] << (i == vec.size() - 1 ? "" : ", ");
    }
    std::cout << "]" << std::endl;
}

// Utility to print ListNode
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

void print_list(const std::string& name, ListNode* head) {
    std::cout << name << ": [";
    ListNode* current = head;
    while (current) {
        std::cout << current->val << (current->next ? ", " : "");
        current = current->next;
    }
    std::cout << "]" << std::endl;
}

// Function to create a linked list from a vector
ListNode* create_list(const std::vector<int>& nums) {
    if (nums.empty()) {
        return nullptr;
    }
    ListNode* head = new ListNode(nums[0]);
    ListNode* current = head;
    for (size_t i = 1; i < nums.size(); ++i) {
        current->next = new ListNode(nums[i]);
        current = current->next;
    }
    return head;
}

// Function to delete a linked list
void delete_list(ListNode* head) {
    while (head) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }
}


// --- Problem 1: Kth Largest Element in an Array ---

/**
 * @brief Finds the Kth largest element using a min-heap (priority queue).
 *
 * This approach maintains a min-heap of size K. It iterates through the input
 * array. If the heap size is less than K, it adds the current element.
 * If the heap size is K and the current element is greater than the heap's smallest
 * element (heap.top()), it removes the smallest and adds the current element.
 * After iterating through all elements, the heap's top element is the Kth largest.
 *
 * Time Complexity: O(N log K) - N elements, each potentially causing a log K heap operation.
 * Space Complexity: O(K) - To store K elements in the heap.
 *
 * @param nums The input array of integers.
 * @param k The 'k' for which to find the Kth largest element.
 * @return The Kth largest element.
 */
int findKthLargest_MinHeap(std::vector<int>& nums, int k) {
    // std::priority_queue is a max-heap by default.
    // To make it a min-heap, use std::greater<int> as the comparator.
    std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;

    for (int num : nums) {
        min_heap.push(num);
        if (min_heap.size() > k) {
            min_heap.pop(); // Maintain heap size K
        }
    }

    return min_heap.top();
}

/**
 * @brief Finds the Kth largest element using a custom MinHeap.
 *
 * This function demonstrates how to use the `CustomMinHeap` class for the same problem.
 * Logic is identical to `findKthLargest_MinHeap`.
 *
 * Time Complexity: O(N log K)
 * Space Complexity: O(K)
 *
 * @param nums The input array of integers.
 * @param k The 'k' for which to find the Kth largest element.
 * @return The Kth largest element.
 */
int findKthLargest_CustomMinHeap(std::vector<int>& nums, int k) {
    CustomMinHeap<int> min_heap;

    for (int num : nums) {
        min_heap.push(num);
        if (min_heap.size() > k) {
            min_heap.pop(); // Maintain heap size K
        }
    }
    return min_heap.top();
}


/**
 * @brief Helper function for Quickselect (partitioning).
 *
 * Partitions the array around a pivot. Elements smaller than the pivot
 * are moved to its left, and larger elements to its right.
 * Returns the final index of the pivot.
 *
 * @param nums The array to partition.
 * @param left The starting index of the sub-array.
 * @param right The ending index of the sub-array.
 * @param pivot_index The index of the chosen pivot.
 * @return The final index of the pivot after partitioning.
 */
int partition(std::vector<int>& nums, int left, int right, int pivot_index) {
    int pivot_value = nums[pivot_index];
    // Move pivot to end
    std::swap(nums[pivot_index], nums[right]);
    int store_index = left;

    // Iterate through the array and swap elements smaller than the pivot to the left
    for (int i = left; i < right; ++i) {
        if (nums[i] < pivot_value) {
            std::swap(nums[store_index], nums[i]);
            store_index++;
        }
    }
    // Move pivot to its final sorted position
    std::swap(nums[right], nums[store_index]);
    return store_index;
}

/**
 * @brief Finds the Kth largest element using Quickselect algorithm.
 *
 * Quickselect is a selection algorithm to find the k-th smallest (or largest)
 * element in an unordered list. It is related to the quicksort sorting algorithm.
 * It uses a partition strategy to narrow down the search space.
 *
 * Time Complexity:
 *   Average: O(N) - On average, the partition reduces the problem size by a constant factor.
 *   Worst: O(N^2) - If partitioning consistently picks the smallest/largest element as pivot.
 *                  This can be mitigated by choosing a good pivot (e.g., median-of-three, random pivot).
 * Space Complexity: O(log N) average for recursion stack, O(N) worst case.
 *
 * @param nums The input array of integers. (Modified in-place).
 * @param k The 'k' for which to find the Kth largest element.
 * @return The Kth largest element.
 */
int findKthLargest_Quickselect(std::vector<int>& nums, int k) {
    // The Kth largest element is equivalent to the (N - K)th smallest element.
    // Let's find the (nums.size() - k)th smallest element (0-indexed).
    int target_index = nums.size() - k;

    int left = 0;
    int right = nums.size() - 1;

    while (true) {
        // Choose a random pivot index to improve average performance and avoid worst-case O(N^2)
        // for already sorted or reverse-sorted inputs.
        int pivot_index = left + rand() % (right - left + 1);

        pivot_index = partition(nums, left, right, pivot_index);

        if (pivot_index == target_index) {
            return nums[pivot_index];
        } else if (pivot_index < target_index) {
            left = pivot_index + 1; // Search in the right partition
        } else { // pivot_index > target_index
            right = pivot_index - 1; // Search in the left partition
        }
    }
}


// --- Problem 2: Merge K Sorted Lists ---

// Custom comparator for ListNode pointers to create a min-heap
// Compares nodes based on their 'val' for `std::priority_queue`.
// A node has "lower priority" if its value is GREATER, making it a min-heap.
struct CompareListNode {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val;
    }
};

/**
 * @brief Merges K sorted linked lists using a min-heap (priority queue).
 *
 * This approach leverages a min-heap to efficiently find the smallest element
 * among the heads of all K lists.
 *
 * Algorithm:
 * 1. Initialize a min-heap (priority queue) and a dummy head for the result list.
 * 2. Add the head of each non-empty list to the min-heap.
 * 3. While the heap is not empty:
 *    a. Extract the node with the smallest value from the heap.
 *    b. Append this node to the merged list.
 *    c. If the extracted node has a `next` element, add `next` to the heap.
 * 4. Return the merged list (next of dummy head).
 *
 * Time Complexity: O(N log K)
 *   - N is the total number of elements across all lists.
 *   - K is the number of lists.
 *   - Each element is pushed once and popped once from the heap (N operations).
 *   - Each heap operation takes O(log K) time.
 * Space Complexity: O(K) - To store at most K list heads in the heap.
 *
 * @param lists A vector of pointers to the heads of K sorted linked lists.
 * @return A pointer to the head of the merged sorted linked list.
 */
ListNode* mergeKLists_MinHeap(std::vector<ListNode*>& lists) {
    // Min-heap to store the current node from each list
    std::priority_queue<ListNode*, std::vector<ListNode*>, CompareListNode> min_heap;

    // Add the head of each list to the heap if it's not null
    for (ListNode* list : lists) {
        if (list) {
            min_heap.push(list);
        }
    }

    ListNode dummy_head;
    ListNode* current = &dummy_head;

    while (!min_heap.empty()) {
        ListNode* smallest_node = min_heap.top();
        min_heap.pop();

        current->next = smallest_node; // Append to result list
        current = current->next;

        // If the extracted node has a next element, push it to the heap
        if (smallest_node->next) {
            min_heap.push(smallest_node->next);
        }
    }

    return dummy_head.next;
}

// Custom comparator for ListNode pointers for `CustomMinHeap`.
// `comp(a, b)` returns true if `a` has LOWER priority than `b`.
// For a min-heap, a node with a larger value has lower priority.
struct CustomCompareListNode {
    bool operator()(ListNode* a, ListNode* b) const {
        return a->val > b->val; // 'a' has lower priority than 'b' if a->val is greater than b->val
    }
};

/**
 * @brief Merges K sorted linked lists using a custom MinHeap.
 *
 * This function demonstrates how to use the `CustomHeap` class with a custom comparator
 * for `ListNode*` elements. Logic is identical to `mergeKLists_MinHeap`.
 *
 * Time Complexity: O(N log K)
 * Space Complexity: O(K)
 *
 * @param lists A vector of pointers to the heads of K sorted linked lists.
 * @return A pointer to the head of the merged sorted linked list.
 */
ListNode* mergeKLists_CustomMinHeap(std::vector<ListNode*>& lists) {
    CustomHeap<ListNode*, CustomCompareListNode> min_heap;

    for (ListNode* list : lists) {
        if (list) {
            min_heap.push(list);
        }
    }

    ListNode dummy_head;
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


// --- Problem 3: Top K Frequent Elements ---

// Custom comparator for pairs (frequency, number) to create a min-heap.
// We want to keep track of the K elements with HIGHEST frequency.
// So, elements with SMALLER frequency should have higher priority to be popped.
struct ComparePairFrequency {
    bool operator()(const std::pair<int, int>& a, const std::pair<int, int>& b) {
        return a.first > b.first; // 'a' has lower priority than 'b' if a's frequency is greater than b's frequency
    }
};

/**
 * @brief Finds the K most frequent elements using a hash map and a min-heap.
 *
 * Algorithm:
 * 1. Count the frequency of each number using a hash map (std::map or std::unordered_map).
 * 2. Iterate through the frequency map. For each (number, frequency) pair:
 *    a. Push the pair into a min-heap.
 *    b. If the heap size exceeds K, pop the smallest element (least frequent).
 *       This ensures the heap always contains the K most frequent elements seen so far.
 * 3. After processing all elements, the min-heap contains the K most frequent elements.
 *    Extract them into a result vector.
 *
 * Time Complexity: O(N + M log K)
 *   - O(N) to build the frequency map (N is the number of elements in nums).
 *   - O(M log K) to iterate through the map and push/pop elements from the heap
 *     (M is the number of unique elements, M <= N). Each heap operation is O(log K).
 * Space Complexity: O(M + K)
 *   - O(M) for the frequency map.
 *   - O(K) for the min-heap.
 *
 * @param nums The input array of integers.
 * @param k The number of most frequent elements to find.
 * @return A vector containing the K most frequent elements.
 */
std::vector<int> topKFrequent_MinHeap(const std::vector<int>& nums, int k) {
    // Step 1: Count frequency of each number
    std::map<int, int> counts;
    for (int num : nums) {
        counts[num]++;
    }

    // Step 2: Use a min-heap to keep track of the K most frequent elements
    // The heap stores pairs of {frequency, number}.
    // We use a custom comparator `ComparePairFrequency` to make it a min-heap based on frequency.
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, ComparePairFrequency> min_heap;

    for (auto const& [num, freq] : counts) {
        min_heap.push({freq, num}); // Push {frequency, number}
        if (min_heap.size() > k) {
            min_heap.pop(); // Remove the element with the smallest frequency
        }
    }

    // Step 3: Extract elements from the heap
    std::vector<int> result;
    while (!min_heap.empty()) {
        result.push_back(min_heap.top().second);
        min_heap.pop();
    }
    // The problem doesn't specify order, but typically reversed to match 'top K'.
    // If exact order is needed, depends on problem statement. Current result is in
    // ascending order of frequency (due to min-heap pop order).
    // To get descending order of frequency, reverse the result.
    std::reverse(result.begin(), result.end());

    return result;
}

// Custom comparator for pairs (frequency, number) for `CustomMinHeap`.
// `comp(a, b)` returns true if `a` has LOWER priority than `b`.
// For a min-heap, a pair with a larger frequency has higher priority,
// so a pair with a smaller frequency has lower priority.
struct CustomComparePairFrequency {
    bool operator()(const std::pair<int, int>& a, const std::pair<int, int>& b) const {
        return a.first > b.first; // 'a' has lower priority than 'b' if a.first > b.first
    }
};

/**
 * @brief Finds the K most frequent elements using a hash map and a custom MinHeap.
 *
 * This function demonstrates how to use the `CustomHeap` class with a custom comparator
 * for `std::pair<int, int>` elements. Logic is identical to `topKFrequent_MinHeap`.
 *
 * Time Complexity: O(N + M log K)
 * Space Complexity: O(M + K)
 *
 * @param nums The input array of integers.
 * @param k The number of most frequent elements to find.
 * @return A vector containing the K most frequent elements.
 */
std::vector<int> topKFrequent_CustomMinHeap(const std::vector<int>& nums, int k) {
    std::map<int, int> counts;
    for (int num : nums) {
        counts[num]++;
    }

    CustomHeap<std::pair<int, int>, CustomComparePairFrequency> min_heap;

    for (auto const& [num, freq] : counts) {
        min_heap.push({freq, num});
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

/**
 * @brief Finds the K most frequent elements using a hash map and bucket sort.
 *
 * This approach is often more efficient than heap-based for certain constraints,
 * especially if max frequency is not extremely large.
 *
 * Algorithm:
 * 1. Count the frequency of each number using a hash map.
 * 2. Create an array of vectors (buckets) where the index represents frequency.
 *    Each `buckets[i]` will store numbers that appear `i` times.
 * 3. Iterate from the highest possible frequency down to 1. Collect elements
 *    from the buckets until `k` elements are found.
 *
 * Time Complexity: O(N)
 *   - O(N) to build the frequency map.
 *   - O(N) to populate buckets (worst case, if all elements are unique, map size N, max_freq 1).
 *   - O(N) to collect results from buckets (worst case, total elements collected is N).
 *   Specifically, it's O(N + M) where M is number of unique elements.
 * Space Complexity: O(N)
 *   - O(N) for the frequency map.
 *   - O(N) for the buckets array (max frequency can be N).
 *
 * @param nums The input array of integers.
 * @param k The number of most frequent elements to find.
 * @return A vector containing the K most frequent elements.
 */
std::vector<int> topKFrequent_BucketSort(const std::vector<int>& nums, int k) {
    // Step 1: Count frequency of each number
    std::map<int, int> counts;
    for (int num : nums) {
        counts[num]++;
    }

    // Step 2: Create buckets. Index is frequency, value is list of numbers with that frequency.
    // Max possible frequency is nums.size().
    std::vector<std::vector<int>> buckets(nums.size() + 1);
    for (auto const& [num, freq] : counts) {
        buckets[freq].push_back(num);
    }

    // Step 3: Collect elements from buckets, starting from highest frequency
    std::vector<int> result;
    for (int i = static_cast<int>(nums.size()); i >= 0 && result.size() < k; --i) {
        for (int num : buckets[i]) {
            result.push_back(num);
            if (result.size() == k) {
                return result;
            }
        }
    }
    return result;
}


// --- Problem 4: Find Median from Data Stream ---

/**
 * @class MedianFinder
 * @brief Implements a data structure that supports adding numbers and finding the median.
 *
 * This implementation uses two heaps:
 * 1. A max-heap (`max_heap_small_half`) to store the smaller half of the numbers.
 *    Its top element is the largest element in the smaller half.
 * 2. A min-heap (`min_heap_large_half`) to store the larger half of the numbers.
 *    Its top element is the smallest element in the larger half.
 *
 * Invariant maintained:
 * - `max_heap_small_half.top() <= min_heap_large_half.top()`
 * - Sizes of the two heaps differ by at most 1.
 *
 * `addNum` Time Complexity: O(log N) - Each push/pop operation on a heap takes logarithmic time.
 * `findMedian` Time Complexity: O(1) - Accessing the top elements of heaps is constant time.
 * Space Complexity: O(N) - To store N numbers in the two heaps.
 */
class MedianFinder {
public:
    /**
     * @brief Constructor: Initializes the MedianFinder object.
     */
    MedianFinder() {
        // By default std::priority_queue is a max-heap (uses std::less)
        // For min-heap, provide std::greater as comparator
    }

    /**
     * @brief Adds an integer `num` to the data structure.
     *
     * @param num The integer to add.
     */
    void addNum(int num) {
        // Step 1: Add the number to the correct heap
        // If num is smaller than or equal to the max of the smaller half, add to max_heap_small_half.
        // Otherwise, add to min_heap_large_half.
        if (max_heap_small_half.empty() || num <= max_heap_small_half.top()) {
            max_heap_small_half.push(num);
        } else {
            min_heap_large_half.push(num);
        }

        // Step 2: Rebalance the heaps to maintain the size invariant.
        // Invariant: max_heap_small_half.size() == min_heap_large_half.size()
        //            OR max_heap_small_half.size() == min_heap_large_half.size() + 1
        // (i.e., smaller_half can have at most one more element)

        // If max_heap_small_half becomes too large, move its top to min_heap_large_half.
        if (max_heap_small_half.size() > min_heap_large_half.size() + 1) {
            min_heap_large_half.push(max_heap_small_half.top());
            max_heap_small_half.pop();
        }
        // If min_heap_large_half becomes too large, move its top to max_heap_small_half.
        else if (min_heap_large_half.size() > max_heap_small_half.size()) {
            max_heap_small_half.push(min_heap_large_half.top());
            min_heap_large_half.pop();
        }
    }

    /**
     * @brief Returns the median of all elements added so far.
     *
     * @return The median value as a double.
     */
    double findMedian() {
        if (max_heap_small_half.empty()) {
            return 0.0; // Or throw an exception, depending on requirements for empty stream
        }

        // If total count is odd, median is the top of the larger heap (max_heap_small_half).
        if (max_heap_small_half.size() > min_heap_large_half.size()) {
            return static_cast<double>(max_heap_small_half.top());
        }
        // If total count is even, median is the average of tops of both heaps.
        else {
            return (static_cast<double>(max_heap_small_half.top()) + min_heap_large_half.top()) / 2.0;
        }
    }

private:
    std::priority_queue<int> max_heap_small_half; // Stores the smaller half of numbers (max-heap)
    std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap_large_half; // Stores the larger half of numbers (min-heap)
};

/**
 * @class CustomMedianFinder
 * @brief Implements a data structure that supports adding numbers and finding the median,
 *        using custom heap implementations.
 *
 * This class demonstrates using `CustomMaxHeap` and `CustomMinHeap` for the two-heap approach.
 * Logic is identical to `MedianFinder`.
 *
 * `addNum` Time Complexity: O(log N)
 * `findMedian` Time Complexity: O(1)
 * Space Complexity: O(N)
 */
class CustomMedianFinder {
public:
    CustomMedianFinder() {}

    void addNum(int num) {
        if (max_heap_small_half.empty() || num <= max_heap_small_half.top()) {
            max_heap_small_half.push(num);
        } else {
            min_heap_large_half.push(num);
        }

        if (max_heap_small_half.size() > min_heap_large_half.size() + 1) {
            min_heap_large_half.push(max_heap_small_half.top());
            max_heap_small_half.pop();
        } else if (min_heap_large_half.size() > max_heap_small_half.size()) {
            max_heap_small_half.push(min_heap_large_half.top());
            min_heap_large_half.pop();
        }
    }

    double findMedian() {
        if (max_heap_small_half.empty()) {
            return 0.0;
        }

        if (max_heap_small_half.size() > min_heap_large_half.size()) {
            return static_cast<double>(max_heap_small_half.top());
        } else {
            return (static_cast<double>(max_heap_small_half.top()) + min_heap_large_half.top()) / 2.0;
        }
    }

private:
    CustomMaxHeap<int> max_heap_small_half; // Stores the smaller half (custom max-heap)
    CustomMinHeap<int> min_heap_large_half; // Stores the larger half (custom min-heap)
};


// --- Main Demonstration Function ---
int main() {
    std::cout << "--- Heap Operations Project Demonstrations ---" << std::endl << std::endl;

    // --- Problem 1: Kth Largest Element in an Array ---
    std::cout << "--- Problem 1: Kth Largest Element in an Array ---" << std::endl;
    std::vector<int> nums1 = {3, 2, 1, 5, 6, 4};
    int k1 = 2;
    print_vector("Input nums", nums1);
    std::cout << "k = " << k1 << std::endl;
    std::cout << "Kth largest (Min-Heap): " << findKthLargest_MinHeap(nums1, k1) << std::endl;
    std::cout << "Kth largest (Custom Min-Heap): " << findKthLargest_CustomMinHeap(nums1, k1) << std::endl;
    // Quickselect modifies the input vector, so make a copy
    std::vector<int> nums1_qs = {3, 2, 1, 5, 6, 4};
    std::cout << "Kth largest (Quickselect): " << findKthLargest_Quickselect(nums1_qs, k1) << std::endl;
    std::cout << std::endl;

    std::vector<int> nums2 = {3, 2, 3, 1, 2, 4, 5, 5, 6};
    int k2 = 4;
    print_vector("Input nums", nums2);
    std::cout << "k = " << k2 << std::endl;
    std::cout << "Kth largest (Min-Heap): " << findKthLargest_MinHeap(nums2, k2) << std::endl;
    std::cout << "Kth largest (Custom Min-Heap): " << findKthLargest_CustomMinHeap(nums2, k2) << std::endl;
    std::vector<int> nums2_qs = {3, 2, 3, 1, 2, 4, 5, 5, 6};
    std::cout << "Kth largest (Quickselect): " << findKthLargest_Quickselect(nums2_qs, k2) << std::endl;
    std::cout << std::endl;


    // --- Problem 2: Merge K Sorted Lists ---
    std::cout << "--- Problem 2: Merge K Sorted Lists ---" << std::endl;
    std::vector<ListNode*> lists1;
    lists1.push_back(create_list({1, 4, 5}));
    lists1.push_back(create_list({1, 3, 4}));
    lists1.push_back(create_list({2, 6}));

    std::cout << "Input Lists:" << std::endl;
    for (size_t i = 0; i < lists1.size(); ++i) {
        print_list("List " + std::to_string(i+1), lists1[i]);
    }

    // Merge using std::priority_queue
    std::vector<ListNode*> lists1_pq = {create_list({1, 4, 5}), create_list({1, 3, 4}), create_list({2, 6})};
    ListNode* merged_list_pq = mergeKLists_MinHeap(lists1_pq);
    print_list("Merged List (std::priority_queue)", merged_list_pq);
    delete_list(merged_list_pq);

    // Merge using CustomMinHeap
    std::vector<ListNode*> lists1_custom = {create_list({1, 4, 5}), create_list({1, 3, 4}), create_list({2, 6})};
    ListNode* merged_list_custom = mergeKLists_CustomMinHeap(lists1_custom);
    print_list("Merged List (CustomMinHeap)", merged_list_custom);
    delete_list(merged_list_custom);

    // Clean up original lists (needed if not copied for each call)
    for(ListNode* list : lists1) delete_list(list);
    std::cout << std::endl;

    std::vector<ListNode*> lists2;
    lists2.push_back(create_list({}));
    lists2.push_back(create_list({1}));
    lists2.push_back(create_list({-5, 0, 10}));

    std::cout << "Input Lists:" << std::endl;
    for (size_t i = 0; i < lists2.size(); ++i) {
        print_list("List " + std::to_string(i+1), lists2[i]);
    }

    std::vector<ListNode*> lists2_pq = {create_list({}), create_list({1}), create_list({-5, 0, 10})};
    ListNode* merged_list2_pq = mergeKLists_MinHeap(lists2_pq);
    print_list("Merged List (std::priority_queue)", merged_list2_pq);
    delete_list(merged_list2_pq);

    std::vector<ListNode*> lists2_custom = {create_list({}), create_list({1}), create_list({-5, 0, 10})};
    ListNode* merged_list2_custom = mergeKLists_CustomMinHeap(lists2_custom);
    print_list("Merged List (CustomMinHeap)", merged_list2_custom);
    delete_list(merged_list2_custom);

    for(ListNode* list : lists2) delete_list(list);
    std::cout << std::endl;


    // --- Problem 3: Top K Frequent Elements ---
    std::cout << "--- Problem 3: Top K Frequent Elements ---" << std::endl;
    std::vector<int> nums3 = {1, 1, 1, 2, 2, 3};
    int k3 = 2;
    print_vector("Input nums", nums3);
    std::cout << "k = " << k3 << std::endl;
    print_vector("Top K Frequent (Min-Heap)", topKFrequent_MinHeap(nums3, k3));
    print_vector("Top K Frequent (Custom Min-Heap)", topKFrequent_CustomMinHeap(nums3, k3));
    print_vector("Top K Frequent (Bucket Sort)", topKFrequent_BucketSort(nums3, k3));
    std::cout << std::endl;

    std::vector<int> nums4 = {1};
    int k4 = 1;
    print_vector("Input nums", nums4);
    std::cout << "k = " << k4 << std::endl;
    print_vector("Top K Frequent (Min-Heap)", topKFrequent_MinHeap(nums4, k4));
    print_vector("Top K Frequent (Custom Min-Heap)", topKFrequent_CustomMinHeap(nums4, k4));
    print_vector("Top K Frequent (Bucket Sort)", topKFrequent_BucketSort(nums4, k4));
    std::cout << std::endl;

    std::vector<int> nums5 = {4,1,-1,2,-1,2,3};
    int k5 = 2;
    print_vector("Input nums", nums5);
    std::cout << "k = " << k5 << std::endl;
    print_vector("Top K Frequent (Min-Heap)", topKFrequent_MinHeap(nums5, k5));
    print_vector("Top K Frequent (Custom Min-Heap)", topKFrequent_CustomMinHeap(nums5, k5));
    print_vector("Top K Frequent (Bucket Sort)", topKFrequent_BucketSort(nums5, k5));
    std::cout << std::endl;


    // --- Problem 4: Find Median from Data Stream ---
    std::cout << "--- Problem 4: Find Median from Data Stream ---" << std::endl;
    std::cout << "Using std::priority_queue based MedianFinder:" << std::endl;
    MedianFinder mf;
    mf.addNum(1);
    std::cout << "Added 1, Median: " << mf.findMedian() << std::endl; // 1.0
    mf.addNum(2);
    std::cout << "Added 2, Median: " << mf.findMedian() << std::endl; // 1.5
    mf.addNum(3);
    std::cout << "Added 3, Median: " << mf.findMedian() << std::endl; // 2.0
    mf.addNum(0);
    std::cout << "Added 0, Median: " << mf.findMedian() << std::endl; // 1.5
    mf.addNum(5);
    std::cout << "Added 5, Median: " << mf.findMedian() << std::endl; // 2.0
    mf.addNum(-1);
    std::cout << "Added -1, Median: " << mf.findMedian() << std::endl; // 1.5
    std::cout << std::endl;

    std::cout << "Using CustomHeap based CustomMedianFinder:" << std::endl;
    CustomMedianFinder cmf;
    cmf.addNum(1);
    std::cout << "Added 1, Median: " << cmf.findMedian() << std::endl; // 1.0
    cmf.addNum(2);
    std::cout << "Added 2, Median: " << cmf.findMedian() << std::endl; // 1.5
    cmf.addNum(3);
    std::cout << "Added 3, Median: " << cmf.findMedian() << std::endl; // 2.0
    cmf.addNum(0);
    std::cout << "Added 0, Median: " << cmf.findMedian() << std::endl; // 1.5
    cmf.addNum(5);
    std::cout << "Added 5, Median: " << cmf.findMedian() << std::endl; // 2.0
    cmf.addNum(-1);
    std::cout << "Added -1, Median: " << cmf.findMedian() << std::endl; // 1.5
    std::cout << std::endl;

    return 0;
}

```
---