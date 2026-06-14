#include "heap_problems.h"
#include <functional> // For std::greater, used with std::priority_queue
#include <unordered_map>
#include <algorithm> // For std::sort, std::nth_element
#include <map>       // For ordered map, useful for `topKFrequent_Sort`
#include <vector>    // For std::vector

// --- Problem 1: Kth Largest Element in an Array ---

/**
 * @brief Finds the Kth largest element in an array using a Min-Heap.
 *
 * This approach maintains a min-heap of size `k`. As we iterate through the
 * numbers, we push each number into the heap. If the heap size exceeds `k`,
 * we pop the smallest element. After processing all numbers, the heap will
 * contain the `k` largest elements from the array, and its top (smallest)
 * will be the Kth largest element overall.
 *
 * @param nums The input vector of integers.
 * @param k The 'k' value (1-indexed).
 * @return The Kth largest element.
 *
 * @Complexity:
 *   Time: O(N log K)
 *     - We iterate through all N elements of the input array.
 *     - For each element, we perform a push (O(log K)) and potentially a pop (O(log K)).
 *     - Total: N * O(log K) = O(N log K).
 *   Space: O(K)
 *     - The min-heap stores at most K elements.
 */
int findKthLargest_Heap(std::vector<int>& nums, int k) {
    // We use a min-heap to keep track of the `k` largest elements.
    // The smallest among these `k` elements will be at the top.
    MinHeap<int> minHeap; 
    // Or using standard library: std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;

    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop(); // Remove the smallest element if heap size exceeds k
        }
    }

    // The top of the min-heap is the Kth largest element.
    return minHeap.top();
}

/**
 * @brief Finds the Kth largest element in an array using `std::nth_element`.
 *
 * `std::nth_element` is a partial sorting algorithm that rearranges the elements
 * in `[first, last)` such that the element at the `n`-th position is the element
 * that would be in that position in a sorted sequence. All of the elements
 * before this element are less than or equal to it, and all of the elements
 * after this element are greater than or equal to it.
 *
 * To find the Kth largest, we want the element at index `nums.size() - k`
 * if the array were sorted in ascending order.
 *
 * @param nums The input vector of integers.
 * @param k The 'k' value (1-indexed).
 * @return The Kth largest element.
 *
 * @Complexity:
 *   Time: Average O(N), Worst Case O(N^2)
 *     - The average case is linear, making it very efficient.
 *     - The worst case is rare for typical implementations (e.g., Introselect).
 *   Space: O(1)
 *     - In-place modification of the array.
 */
int findKthLargest_NthElement(std::vector<int>& nums, int k) {
    // The Kth largest element is at index (N - k) in a 0-indexed sorted array.
    // For example, if N=6, k=2, we need the 2nd largest. This is nums[4].
    // nums.size() - k = 6 - 2 = 4.
    std::nth_element(nums.begin(), nums.begin() + (nums.size() - k), nums.end());
    return nums[nums.size() - k];
}

/**
 * @brief Finds the Kth largest element in an array by sorting the entire array.
 *        This is a straightforward but generally less optimal "brute force" approach.
 *
 * @param nums The input vector of integers.
 * @param k The 'k' value (1-indexed).
 * @return The Kth largest element.
 *
 * @Complexity:
 *   Time: O(N log N)
 *     - Dominated by the sorting operation.
 *   Space: O(log N) or O(N)
 *     - Depends on the sorting algorithm implementation (e.g., in-place quicksort uses O(log N) stack space, merge sort uses O(N)).
 */
int findKthLargest_Sort(std::vector<int>& nums, int k) {
    std::sort(nums.begin(), nums.end(), std::greater<int>()); // Sort in descending order
    // Or sort ascending: std::sort(nums.begin(), nums.end()); return nums[nums.size() - k];
    return nums[k - 1]; // Kth largest is at index k-1 in a 0-indexed descending array
}


// --- Problem 2: Merge K Sorted Lists ---

/**
 * @brief Merges K sorted linked lists into one using a Min-Heap of ListNode pointers.
 *
 * This approach uses a min-heap to keep track of the smallest current element
 * from all `k` lists. We initially add the head of each non-empty list to the heap.
 * Then, we repeatedly extract the minimum element from the heap, append it to
 * our merged list, and if the extracted node has a `next` node, we add that
 * `next` node back to the heap.
 *
 * @param lists A vector of pointers to the heads of the K sorted linked lists.
 * @return A pointer to the head of the merged sorted linked list.
 *
 * @Complexity:
 *   Time: O(N log K)
 *     - N is the total number of nodes across all lists.
 *     - K is the number of lists.
 *     - Each of the N nodes is pushed into the heap once and popped from the heap once.
 *     - Each push/pop operation on a heap of size K takes O(log K) time.
 *   Space: O(K)
 *     - The heap stores at most K `ListNode*` pointers (one from each list).
 */
ListNode* mergeKLists_Heap(std::vector<ListNode*>& lists) {
    // Use std::priority_queue with a custom comparator for ListNode*
    // It's a max-heap by default, so std::greater is needed for a min-heap behavior.
    std::priority_queue<ListNode*, std::vector<ListNode*>, CompareListNode> minHeap;

    // Add the head of each non-null list to the min-heap
    for (ListNode* list : lists) {
        if (list != nullptr) {
            minHeap.push(list);
        }
    }

    // Create a dummy head for the merged list to simplify handling the head node
    ListNode dummyHead;
    ListNode* current = &dummyHead;

    // While the heap is not empty, extract the smallest element
    while (!minHeap.empty()) {
        ListNode* minNode = minHeap.top();
        minHeap.pop();

        // Append the minimum node to the merged list
        current->next = minNode;
        current = current->next;

        // If the extracted node has a next element, push it to the heap
        if (minNode->next != nullptr) {
            minHeap.push(minNode->next);
        }
    }

    return dummyHead.next;
}


// --- Problem 3: Find Median from Data Stream ---

MedianFinder::MedianFinder() {
    // Heaps are initialized as empty
}

/**
 * @brief Adds an integer `num` to the data structure.
 *
 * This method balances two heaps: `max_heap_low` (stores smaller half, max-heap)
 * and `min_heap_high` (stores larger half, min-heap).
 * The goal is to keep `max_heap_low`'s size either equal to `min_heap_high`'s
 * size or one greater. This way, the median is always accessible at the top
 * of `max_heap_low` or the average of the tops of both heaps.
 *
 * @param num The integer to add.
 *
 * @Complexity:
 *   Time: O(log N)
 *     - Each `addNum` involves at most two `push` operations and one `pop` operation
 *       on heaps whose sizes are about N/2. `log(N/2)` is O(log N).
 *   Space: O(1) (amortized for current operation, total O(N) for storage)
 */
void MedianFinder::addNum(int num) {
    // Step 1: Add the number to the appropriate heap
    // If max_heap_low is empty or num is smaller than or equal to its top, it belongs to the lower half.
    if (max_heap_low.empty() || num <= max_heap_low.top()) {
        max_heap_low.push(num);
    } else {
        min_heap_high.push(num);
    }

    // Step 2: Balance the heaps
    // Ensure max_heap_low either has the same size as min_heap_high or is one element larger.
    // If max_heap_low becomes too large: move its top to min_heap_high
    if (max_heap_low.size() > min_heap_high.size() + 1) {
        min_heap_high.push(max_heap_low.top());
        max_heap_low.pop();
    }
    // If min_heap_high becomes too large: move its top to max_heap_low
    else if (min_heap_high.size() > max_heap_low.size()) {
        max_heap_low.push(min_heap_high.top());
        min_heap_high.pop();
    }
}

/**
 * @brief Returns the median of all elements added so far.
 *
 * If the total count of numbers is odd, the median is the top of `max_heap_low`.
 * If the total count is even, the median is the average of the tops of
 * `max_heap_low` and `min_heap_high`.
 *
 * @return The median as a double.
 *
 * @Complexity:
 *   Time: O(1)
 *     - Accessing the top element of a heap is a constant time operation.
 *   Space: O(1)
 */
double MedianFinder::findMedian() {
    if (max_heap_low.empty()) {
        // Should not happen based on constraints (at least one element before calling findMedian)
        throw std::runtime_error("No numbers added yet to find median.");
    }

    if (max_heap_low.size() == min_heap_high.size()) {
        // Even number of elements, median is the average of the two middle elements
        return (static_cast<double>(max_heap_low.top()) + min_heap_high.top()) / 2.0;
    } else {
        // Odd number of elements, median is the top of the larger heap (max_heap_low)
        return static_cast<double>(max_heap_low.top());
    }
}


// --- Problem 4: Top K Frequent Elements ---

/**
 * @brief Finds the K most frequent elements in an array using a Min-Heap of pairs.
 *
 * Steps:
 * 1. Count frequencies of all numbers using an `unordered_map`.
 * 2. Use a min-heap to keep track of the `k` elements with highest frequencies.
 *    The heap stores `(frequency, number)` pairs, ordered by frequency.
 *    If the heap size exceeds `k`, the element with the smallest frequency
 *    (at the heap's top) is removed.
 * 3. After iterating through all unique elements and their frequencies, the
 *    heap will contain the `k` most frequent elements. Extract them.
 *
 * @param nums The input vector of integers.
 * @param k The number of most frequent elements to return.
 * @return A vector containing the K most frequent elements.
 *
 * @Complexity:
 *   Time: O(N + M log K)
 *     - O(N) for populating the frequency map (N elements).
 *     - O(M log K) for heap operations, where M is the number of unique elements.
 *       Each of M unique elements is pushed once (O(log K)) and potentially popped once (O(log K)).
 *     - In the worst case, M could be N, so complexity becomes O(N log K).
 *   Space: O(M + K)
 *     - O(M) for the frequency map.
 *     - O(K) for the min-heap.
 *     - In the worst case, M could be N, so complexity becomes O(N).
 */
std::vector<int> topKFrequent_Heap(std::vector<int>& nums, int k) {
    // Step 1: Count frequencies
    std::unordered_map<int, int> freq_map;
    for (int num : nums) {
        freq_map[num]++;
    }

    // Step 2: Use a min-heap to store (frequency, number) pairs
    // std::priority_queue is a max-heap by default. To make it a min-heap for pairs
    // based on the first element (frequency), we need to use std::greater for pairs.
    // The default std::pair comparison is lexicographical, which works:
    // pair<f1, n1> < pair<f2, n2> if f1 < f2 OR (f1 == f2 AND n1 < n2)
    // std::priority_queue with std::greater will then yield the pair with smallest frequency at top.
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<std::pair<int, int>>> minHeap;

    for (auto const& [num, freq] : freq_map) {
        minHeap.push({freq, num}); // Store as {frequency, number}
        if (minHeap.size() > k) {
            minHeap.pop(); // If heap size exceeds k, remove the element with smallest frequency
        }
    }

    // Step 3: Extract the k most frequent elements from the heap
    std::vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top().second); // Add the number (second element of pair)
        minHeap.pop();
    }

    // The elements are extracted in increasing order of frequency.
    // Reverse to get them in decreasing order if required, but problem statement allows any order.
    // std::reverse(result.begin(), result.end());

    return result;
}

/**
 * @brief Finds the K most frequent elements in an array using a map and sorting.
 *        This serves as an alternative to the heap approach, often easier to grasp
 *        but potentially less efficient for very large datasets where K << M.
 *
 * Steps:
 * 1. Count frequencies of all numbers using an `unordered_map`.
 * 2. Transfer `(number, frequency)` pairs to a vector.
 * 3. Sort this vector based on frequency in descending order.
 * 4. Take the first `k` elements.
 *
 * @param nums The input vector of integers.
 * @param k The number of most frequent elements to return.
 * @return A vector containing the K most frequent elements.
 *
 * @Complexity:
 *   Time: O(N + M log M)
 *     - O(N) for populating the frequency map.
 *     - O(M log M) for sorting the M unique elements based on frequency.
 *     - In the worst case, M could be N, so complexity becomes O(N log N).
 *   Space: O(M)
 *     - O(M) for the frequency map.
 *     - O(M) for the vector of pairs to be sorted.
 *     - In the worst case, M could be N, so complexity becomes O(N).
 */
std::vector<int> topKFrequent_Sort(std::vector<int>& nums, int k) {
    // Step 1: Count frequencies
    std::unordered_map<int, int> freq_map;
    for (int num : nums) {
        freq_map[num]++;
    }

    // Step 2: Transfer to a vector of pairs for sorting
    std::vector<std::pair<int, int>> freq_vec; // Stores {number, frequency}
    for (auto const& [num, freq] : freq_map) {
        freq_vec.push_back({num, freq});
    }

    // Step 3: Sort the vector by frequency in descending order
    // If frequencies are equal, the problem allows any order, so no secondary sort key needed.
    std::sort(freq_vec.begin(), freq_vec.end(), [](const std::pair<int, int>& a, const std::pair<int, int>& b) {
        return a.second > b.second; // Sort by frequency (second element) in descending order
    });

    // Step 4: Extract the top k elements
    std::vector<int> result;
    for (int i = 0; i < k; ++i) {
        result.push_back(freq_vec[i].first); // Add the number (first element of pair)
    }

    return result;
}