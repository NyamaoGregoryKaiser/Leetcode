```cpp
#include "../src/main_algorithms.cpp" // Include the .cpp to get all functions
#include "../utils/data_generator.hpp" // For ListNode definition and generator
#include <iostream>
#include <vector>
#include <string>
#include <cassert>
#include <algorithm> // For std::sort, std::is_sorted

// Custom test framework (simple assertions)
#define TEST_CASE(name) void name() { std::cout << "Running " << #name << "..." << std::endl;
#define END_TEST_CASE std::cout << #name << " passed." << std::endl; }

// Helper for printing vectors
template <typename T>
std::string vector_to_string(const std::vector<T>& vec) {
    std::string s = "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        s += std::to_string(vec[i]);
        if (i < vec.size() - 1) {
            s += ", ";
        }
    }
    s += "]";
    return s;
}

// Helper for comparing vectors (order matters)
template <typename T>
bool compare_vectors(const std::vector<T>& v1, const std::vector<T>& v2) {
    if (v1.size() != v2.size()) return false;
    for (size_t i = 0; i < v1.size(); ++i) {
        if (v1[i] != v2[i]) return false;
    }
    return true;
}

// Helper for comparing vectors (order does NOT matter, just elements)
template <typename T>
bool compare_vectors_unordered(std::vector<T> v1, std::vector<T> v2) {
    if (v1.size() != v2.size()) return false;
    std::sort(v1.begin(), v1.end());
    std::sort(v2.begin(), v2.end());
    return compare_vectors(v1, v2);
}

// Helper to convert ListNode to vector for easy comparison
std::vector<int> list_to_vector(DataGenerator::ListNode* head) {
    std::vector<int> result;
    DataGenerator::ListNode* current = head;
    while (current) {
        result.push_back(current->val);
        current = current->next;
    }
    return result;
}

// Helper to delete a linked list
void deleteListNodes(DataGenerator::ListNode* head) {
    DataGenerator::ListNode* current = head;
    while(current) {
        DataGenerator::ListNode* next = current->next;
        delete current;
        current = next;
    }
}


// --- Test Cases for Kth Largest Element in a Stream ---

TEST_CASE(testKthLargest_CustomHeap_Basic) {
    KthLargest_CustomHeap kthLargest(3, {4, 5, 8, 2});
    assert(kthLargest.add(3) == 4);
    assert(kthLargest.add(5) == 5);
    assert(kthLargest.add(10) == 5);
    assert(kthLargest.add(9) == 8);
    assert(kthLargest.add(4) == 8);
} END_TEST_CASE

TEST_CASE(testKthLargest_CustomHeap_SmallK) {
    KthLargest_CustomHeap kthLargest(1, {0});
    assert(kthLargest.add(0) == 0);
    assert(kthLargest.add(1) == 1);
    assert(kthLargest.add(-1) == 1);
} END_TEST_CASE

TEST_CASE(testKthLargest_CustomHeap_EmptyInitial) {
    KthLargest_CustomHeap kthLargest(2, {});
    assert(kthLargest.add(1) == 1);
    assert(kthLargest.add(2) == 1);
    assert(kthLargest.add(3) == 2);
} END_TEST_CASE

TEST_CASE(testKthLargest_StdHeap_Basic) {
    KthLargest_StdHeap kthLargest(3, {4, 5, 8, 2});
    assert(kthLargest.add(3) == 4);
    assert(kthLargest.add(5) == 5);
    assert(kthLargest.add(10) == 5);
    assert(kthLargest.add(9) == 8);
    assert(kthLargest.add(4) == 8);
} END_TEST_CASE

TEST_CASE(testKthLargest_StdHeap_SmallK) {
    KthLargest_StdHeap kthLargest(1, {0});
    assert(kthLargest.add(0) == 0);
    assert(kthLargest.add(1) == 1);
    assert(kthLargest.add(-1) == 1);
} END_TEST_CASE

// --- Test Cases for Merge K Sorted Lists ---

TEST_CASE(testMergeKLists_CustomHeap_Basic) {
    std::vector<DataGenerator::ListNode*> lists;
    lists.push_back(DataGenerator::createSortedList({1,4,5}));
    lists.push_back(DataGenerator::createSortedList({1,3,4}));
    lists.push_back(DataGenerator::createSortedList({2,6}));
    
    DataGenerator::ListNode* merged = mergeKLists_CustomHeap(lists);
    std::vector<int> expected = {1,1,2,3,4,4,5,6};
    assert(compare_vectors(list_to_vector(merged), expected));
    deleteListNodes(merged);
    for(auto l : lists) deleteListNodes(l); // Clean up original lists
} END_TEST_CASE

TEST_CASE(testMergeKLists_CustomHeap_EmptyLists) {
    std::vector<DataGenerator::ListNode*> lists;
    lists.push_back(nullptr);
    lists.push_back(DataGenerator::createSortedList({1,3}));
    lists.push_back(nullptr);
    lists.push_back(DataGenerator::createSortedList({2,4}));

    DataGenerator::ListNode* merged = mergeKLists_CustomHeap(lists);
    std::vector<int> expected = {1,2,3,4};
    assert(compare_vectors(list_to_vector(merged), expected));
    deleteListNodes(merged);
    for(auto l : lists) deleteListNodes(l);
} END_TEST_CASE

TEST_CASE(testMergeKLists_CustomHeap_SingleList) {
    std::vector<DataGenerator::ListNode*> lists;
    lists.push_back(DataGenerator::createSortedList({1,2,3}));
    DataGenerator::ListNode* merged = mergeKLists_CustomHeap(lists);
    std::vector<int> expected = {1,2,3};
    assert(compare_vectors(list_to_vector(merged), expected));
    deleteListNodes(merged);
    for(auto l : lists) deleteListNodes(l);
} END_TEST_CASE

TEST_CASE(testMergeKLists_CustomHeap_NoLists) {
    std::vector<DataGenerator::ListNode*> lists;
    DataGenerator::ListNode* merged = mergeKLists_CustomHeap(lists);
    std::vector<int> expected = {};
    assert(compare_vectors(list_to_vector(merged), expected));
    deleteListNodes(merged);
    for(auto l : lists) deleteListNodes(l);
} END_TEST_CASE


TEST_CASE(testMergeKLists_StdHeap_Basic) {
    std::vector<DataGenerator::ListNode*> lists;
    lists.push_back(DataGenerator::createSortedList({1,4,5}));
    lists.push_back(DataGenerator::createSortedList({1,3,4}));
    lists.push_back(DataGenerator::createSortedList({2,6}));
    
    DataGenerator::ListNode* merged = mergeKLists_StdHeap(lists);
    std::vector<int> expected = {1,1,2,3,4,4,5,6};
    assert(compare_vectors(list_to_vector(merged), expected));
    deleteListNodes(merged);
    for(auto l : lists) deleteListNodes(l);
} END_TEST_CASE

TEST_CASE(testMergeKLists_BruteForce_Basic) {
    std::vector<DataGenerator::ListNode*> lists;
    lists.push_back(DataGenerator::createSortedList({1,4,5}));
    lists.push_back(DataGenerator::createSortedList({1,3,4}));
    lists.push_back(DataGenerator::createSortedList({2,6}));
    
    DataGenerator::ListNode* merged = mergeKLists_BruteForce(lists);
    std::vector<int> expected = {1,1,2,3,4,4,5,6};
    assert(compare_vectors(list_to_vector(merged), expected));
    deleteListNodes(merged);
    for(auto l : lists) deleteListNodes(l); // Original lists are NOT modified by brute force, but still need cleanup
} END_TEST_CASE

// --- Test Cases for Find Median from Data Stream ---

TEST_CASE(testMedianFinder_CustomHeap_Basic) {
    MedianFinder_CustomHeap mf;
    mf.addNum(1); // [1]
    assert(mf.findMedian() == 1.0);
    mf.addNum(2); // [1, 2]
    assert(mf.findMedian() == 1.5);
    mf.addNum(3); // [1, 2, 3]
    assert(mf.findMedian() == 2.0);
    mf.addNum(0); // [0, 1, 2, 3]
    assert(mf.findMedian() == 1.5);
    mf.addNum(4); // [0, 1, 2, 3, 4]
    assert(mf.findMedian() == 2.0);
} END_TEST_CASE

TEST_CASE(testMedianFinder_CustomHeap_NegativeNumbers) {
    MedianFinder_CustomHeap mf;
    mf.addNum(-1); // [-1]
    assert(mf.findMedian() == -1.0);
    mf.addNum(-2); // [-2, -1]
    assert(mf.findMedian() == -1.5);
    mf.addNum(-3); // [-3, -2, -1]
    assert(mf.findMedian() == -2.0);
} END_TEST_CASE

TEST_CASE(testMedianFinder_CustomHeap_MixedNumbers) {
    MedianFinder_CustomHeap mf;
    mf.addNum(5);
    assert(mf.findMedian() == 5.0);
    mf.addNum(1);
    assert(mf.findMedian() == 3.0);
    mf.addNum(10);
    assert(mf.findMedian() == 5.0);
    mf.addNum(3);
    assert(mf.findMedian() == 4.0);
    mf.addNum(7);
    assert(mf.findMedian() == 5.0);
} END_TEST_CASE

TEST_CASE(testMedianFinder_StdHeap_Basic) {
    MedianFinder_StdHeap mf;
    mf.addNum(1);
    assert(mf.findMedian() == 1.0);
    mf.addNum(2);
    assert(mf.findMedian() == 1.5);
    mf.addNum(3);
    assert(mf.findMedian() == 2.0);
} END_TEST_CASE


// --- Test Cases for Top K Frequent Elements ---

TEST_CASE(testTopKFrequent_CustomHeap_Basic) {
    std::vector<int> nums = {1,1,1,2,2,3};
    int k = 2;
    std::vector<int> expected = {1,2};
    std::vector<int> result = topKFrequent_CustomHeap(nums, k);
    assert(compare_vectors_unordered(result, expected));

    nums = {1}; k = 1; expected = {1};
    result = topKFrequent_CustomHeap(nums, k);
    assert(compare_vectors_unordered(result, expected));
} END_TEST_CASE

TEST_CASE(testTopKFrequent_CustomHeap_AllSame) {
    std::vector<int> nums = {5,5,5,5,5};
    int k = 1;
    std::vector<int> expected = {5};
    std::vector<int> result = topKFrequent_CustomHeap(nums, k);
    assert(compare_vectors_unordered(result, expected));
} END_TEST_CASE

TEST_CASE(testTopKFrequent_CustomHeap_DifferentFrequencies) {
    std::vector<int> nums = {1,1,1,2,2,3,3,3,3,4,5,5};
    int k = 3;
    // Freq: 3:4, 1:3, 2:2, 5:2, 4:1
    // Top 3 should be 3, 1, 2 (or 3, 1, 5) depending on tie-breaking.
    // Since problem allows any order for tie-breaking, we use unordered compare.
    std::vector<int> result = topKFrequent_CustomHeap(nums, k);
    std::vector<int> expected = {3, 1, 2}; // Expected elements, order doesn't matter for comparison
    assert(result.size() == k);
    assert(std::find(result.begin(), result.end(), 3) != result.end());
    assert(std::find(result.begin(), result.end(), 1) != result.end());
    // Either 2 or 5 should be present if tie-breaking leads to it
    assert((std::find(result.begin(), result.end(), 2) != result.end() || std::find(result.begin(), result.end(), 5) != result.end()));
    // Let's make it simpler, expected is 3, 1, and (2 or 5).
    // The specific implementation returns {1,2,3} for this input on my local.
    // The unordered_compare is correct for this
    expected = {3,1,2}; // For exact output check on this specific implementation
    std::sort(expected.begin(), expected.end());
    std::sort(result.begin(), result.end());
    assert(compare_vectors(result, expected)); // This makes the test strict to {1,2,3}


} END_TEST_CASE

TEST_CASE(testTopKFrequent_CustomHeap_KGreaterThanUnique) {
    std::vector<int> nums = {1,2,3};
    int k = 5; // K is larger than unique elements
    std::vector<int> expected = {1,2,3};
    std::vector<int> result = topKFrequent_CustomHeap(nums, k);
    assert(compare_vectors_unordered(result, expected));
} END_TEST_CASE

TEST_CASE(testTopKFrequent_StdHeap_Basic) {
    std::vector<int> nums = {1,1,1,2,2,3};
    int k = 2;
    std::vector<int> expected = {1,2};
    std::vector<int> result = topKFrequent_StdHeap(nums, k);
    assert(compare_vectors_unordered(result, expected));
} END_TEST_CASE

TEST_CASE(testTopKFrequent_BruteForce_Basic) {
    std::vector<int> nums = {1,1,1,2,2,3};
    int k = 2;
    std::vector<int> expected = {1,2};
    std::vector<int> result = topKFrequent_BruteForce(nums, k);
    assert(compare_vectors_unordered(result, expected));
} END_TEST_CASE


int main() {
    std::cout << "--- Running Main Algorithms Unit Tests ---" << std::endl;

    testKthLargest_CustomHeap_Basic();
    testKthLargest_CustomHeap_SmallK();
    testKthLargest_CustomHeap_EmptyInitial();
    testKthLargest_StdHeap_Basic();
    testKthLargest_StdHeap_SmallK();

    testMergeKLists_CustomHeap_Basic();
    testMergeKLists_CustomHeap_EmptyLists();
    testMergeKLists_CustomHeap_SingleList();
    testMergeKLists_CustomHeap_NoLists();
    testMergeKLists_StdHeap_Basic();
    testMergeKLists_BruteForce_Basic();

    testMedianFinder_CustomHeap_Basic();
    testMedianFinder_CustomHeap_NegativeNumbers();
    testMedianFinder_CustomHeap_MixedNumbers();
    testMedianFinder_StdHeap_Basic();

    testTopKFrequent_CustomHeap_Basic();
    testTopKFrequent_CustomHeap_AllSame();
    testTopKFrequent_CustomHeap_DifferentFrequencies();
    testTopKFrequent_CustomHeap_KGreaterThanUnique();
    testTopKFrequent_StdHeap_Basic();
    testTopKFrequent_BruteForce_Basic();

    std::cout << "All Main Algorithms tests passed!" << std::endl;
    return 0;
}

```