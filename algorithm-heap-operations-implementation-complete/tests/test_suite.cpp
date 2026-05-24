```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::sort, std::is_sorted
#include <cmath>     // For std::fabs

// Include the main problems file (or its interface if it was a header)
// For this project, we'll directly include the .cpp for simplicity in testing.
// In a real project, this would be `main_heap_problems.hpp`
#include "../src/main_heap_problems.cpp" 

// --- Simple Test Framework ---
int test_count = 0;
int success_count = 0;

#define ASSERT_TRUE(condition, message) \
    do { \
        test_count++; \
        if (!(condition)) { \
            std::cerr << "FAILED Test " << test_count << ": " << message << std::endl; \
        } else { \
            success_count++; \
            std::cout << "PASSED Test " << test_count << ": " << message << std::endl; \
        } \
    } while (0)

#define ASSERT_EQUAL(actual, expected, message) \
    do { \
        test_count++; \
        if ((actual) != (expected)) { \
            std::cerr << "FAILED Test " << test_count << ": " << message \
                      << " (Expected: " << (expected) << ", Got: " << (actual) << ")" << std::endl; \
        } else { \
            success_count++; \
            std::cout << "PASSED Test " << test_count << ": " << message << std::endl; \
        } \
    } while (0)

#define ASSERT_DOUBLE_EQUAL(actual, expected, tolerance, message) \
    do { \
        test_count++; \
        if (std::fabs((actual) - (expected)) > (tolerance)) { \
            std::cerr << "FAILED Test " << test_count << ": " << message \
                      << " (Expected: " << (expected) << ", Got: " << (actual) << ")" << std::endl; \
        } else { \
            success_count++; \
            std::cout << "PASSED Test " << test_count << ": " << message << std::endl; \
        } \
    } while (0)

// Helper to compare vectors (order doesn't matter for top K frequent)
bool compare_vector_contents(const std::vector<int>& v1, const std::vector<int>& v2) {
    if (v1.size() != v2.size()) return false;
    std::vector<int> sorted_v1 = v1;
    std::vector<int> sorted_v2 = v2;
    std::sort(sorted_v1.begin(), sorted_v1.end());
    std::sort(sorted_v2.begin(), sorted_v2.end());
    return sorted_v1 == sorted_v2;
}


// --- Test Functions for Each Problem ---

void test_kth_largest_element() {
    std::cout << "\n--- Testing Kth Largest Element ---" << std::endl;

    // Test Case 1: Basic functionality
    std::vector<int> nums1 = {3, 2, 1, 5, 6, 4};
    ASSERT_EQUAL(findKthLargest_MinHeap(nums1, 2), 5, "Basic: K=2");
    ASSERT_EQUAL(findKthLargest_CustomMinHeap(nums1, 2), 5, "CustomHeap Basic: K=2");
    std::vector<int> nums1_qs = {3, 2, 1, 5, 6, 4}; // Quickselect modifies
    ASSERT_EQUAL(findKthLargest_Quickselect(nums1_qs, 2), 5, "Quickselect Basic: K=2");

    // Test Case 2: K=1 (largest element)
    std::vector<int> nums2 = {3, 2, 1, 5, 6, 4};
    ASSERT_EQUAL(findKthLargest_MinHeap(nums2, 1), 6, "K=1 (largest)");
    ASSERT_EQUAL(findKthLargest_CustomMinHeap(nums2, 1), 6, "CustomHeap K=1 (largest)");
    std::vector<int> nums2_qs = {3, 2, 1, 5, 6, 4};
    ASSERT_EQUAL(findKthLargest_Quickselect(nums2_qs, 1), 6, "Quickselect K=1 (largest)");

    // Test Case 3: K=N (smallest element)
    std::vector<int> nums3 = {3, 2, 1, 5, 6, 4};
    ASSERT_EQUAL(findKthLargest_MinHeap(nums3, 6), 1, "K=N (smallest)");
    ASSERT_EQUAL(findKthLargest_CustomMinHeap(nums3, 6), 1, "CustomHeap K=N (smallest)");
    std::vector<int> nums3_qs = {3, 2, 1, 5, 6, 4};
    ASSERT_EQUAL(findKthLargest_Quickselect(nums3_qs, 6), 1, "Quickselect K=N (smallest)");

    // Test Case 4: Duplicate elements
    std::vector<int> nums4 = {3, 2, 3, 1, 2, 4, 5, 5, 6};
    ASSERT_EQUAL(findKthLargest_MinHeap(nums4, 4), 4, "Duplicates: K=4");
    ASSERT_EQUAL(findKthLargest_CustomMinHeap(nums4, 4), 4, "CustomHeap Duplicates: K=4");
    std::vector<int> nums4_qs = {3, 2, 3, 1, 2, 4, 5, 5, 6};
    ASSERT_EQUAL(findKthLargest_Quickselect(nums4_qs, 4), 4, "Quickselect Duplicates: K=4");

    // Test Case 5: Negative numbers
    std::vector<int> nums5 = {-1, -2, 0, 5, 3};
    ASSERT_EQUAL(findKthLargest_MinHeap(nums5, 3), 0, "Negative numbers: K=3");
    ASSERT_EQUAL(findKthLargest_CustomMinHeap(nums5, 3), 0, "CustomHeap Negative numbers: K=3");
    std::vector<int> nums5_qs = {-1, -2, 0, 5, 3};
    ASSERT_EQUAL(findKthLargest_Quickselect(nums5_qs, 3), 0, "Quickselect Negative numbers: K=3");

    // Test Case 6: Single element
    std::vector<int> nums6 = {7};
    ASSERT_EQUAL(findKthLargest_MinHeap(nums6, 1), 7, "Single element: K=1");
    ASSERT_EQUAL(findKthLargest_CustomMinHeap(nums6, 1), 7, "CustomHeap Single element: K=1");
    std::vector<int> nums6_qs = {7};
    ASSERT_EQUAL(findKthLargest_Quickselect(nums6_qs, 1), 7, "Quickselect Single element: K=1");

    // Test Case 7: Larger array
    std::vector<int> nums7;
    for (int i = 0; i < 100; ++i) nums7.push_back(i);
    std::random_shuffle(nums7.begin(), nums7.end()); // Shuffle to make it unsorted
    ASSERT_EQUAL(findKthLargest_MinHeap(nums7, 10), 90, "Large array: K=10");
    std::vector<int> nums7_custom = nums7;
    ASSERT_EQUAL(findKthLargest_CustomMinHeap(nums7_custom, 10), 90, "CustomHeap Large array: K=10");
    std::vector<int> nums7_qs = nums7;
    ASSERT_EQUAL(findKthLargest_Quickselect(nums7_qs, 10), 90, "Quickselect Large array: K=10");

    std::cout << "-----------------------------------" << std::endl;
}

void test_merge_k_sorted_lists() {
    std::cout << "\n--- Testing Merge K Sorted Lists ---" << std::endl;

    // Test Case 1: Basic functionality
    std::vector<ListNode*> lists1_pq = {create_list({1, 4, 5}), create_list({1, 3, 4}), create_list({2, 6})};
    ListNode* result1_pq = mergeKLists_MinHeap(lists1_pq);
    ASSERT_TRUE(result1_pq && result1_pq->val == 1 && result1_pq->next->val == 1 && result1_pq->next->next->val == 2 &&
                result1_pq->next->next->next->val == 3 && result1_pq->next->next->next->next->val == 4 &&
                result1_pq->next->next->next->next->next->val == 4 && result1_pq->next->next->next->next->next->next->val == 5 &&
                result1_pq->next->next->next->next->next->next->next->val == 6 && !result1_pq->next->next->next->next->next->next->next->next,
                "Basic lists merge (std::pq)");
    delete_list(result1_pq);
    // Cleanup input lists
    for(ListNode* list : lists1_pq) delete_list(list);

    std::vector<ListNode*> lists1_custom = {create_list({1, 4, 5}), create_list({1, 3, 4}), create_list({2, 6})};
    ListNode* result1_custom = mergeKLists_CustomMinHeap(lists1_custom);
    ASSERT_TRUE(result1_custom && result1_custom->val == 1 && result1_custom->next->val == 1 && result1_custom->next->next->val == 2 &&
                result1_custom->next->next->next->val == 3 && result1_custom->next->next->next->next->val == 4 &&
                result1_custom->next->next->next->next->next->val == 4 && result1_custom->next->next->next->next->next->next->val == 5 &&
                result1_custom->next->next->next->next->next->next->next->val == 6 && !result1_custom->next->next->next->next->next->next->next->next,
                "Basic lists merge (CustomHeap)");
    delete_list(result1_custom);
    for(ListNode* list : lists1_custom) delete_list(list);

    // Test Case 2: Empty input list of lists
    std::vector<ListNode*> lists2 = {};
    ListNode* result2_pq = mergeKLists_MinHeap(lists2);
    ASSERT_TRUE(result2_pq == nullptr, "Empty list of lists (std::pq)");
    delete_list(result2_pq);

    std::vector<ListNode*> lists2_custom = {};
    ListNode* result2_custom = mergeKLists_CustomMinHeap(lists2_custom);
    ASSERT_TRUE(result2_custom == nullptr, "Empty list of lists (CustomHeap)");
    delete_list(result2_custom);

    // Test Case 3: Lists with some empty lists
    std::vector<ListNode*> lists3_pq = {create_list({}), create_list({1}), create_list({-5, 0, 10})};
    ListNode* result3_pq = mergeKLists_MinHeap(lists3_pq);
    ASSERT_TRUE(result3_pq && result3_pq->val == -5 && result3_pq->next->val == 0 && result3_pq->next->next->val == 1 &&
                result3_pq->next->next->next->val == 10 && !result3_pq->next->next->next->next,
                "Lists with empty lists (std::pq)");
    delete_list(result3_pq);
    for(ListNode* list : lists3_pq) delete_list(list);

    std::vector<ListNode*> lists3_custom = {create_list({}), create_list({1}), create_list({-5, 0, 10})};
    ListNode* result3_custom = mergeKLists_CustomMinHeap(lists3_custom);
    ASSERT_TRUE(result3_custom && result3_custom->val == -5 && result3_custom->next->val == 0 && result3_custom->next->next->val == 1 &&
                result3_custom->next->next->next->val == 10 && !result3_custom->next->next->next->next,
                "Lists with empty lists (CustomHeap)");
    delete_list(result3_custom);
    for(ListNode* list : lists3_custom) delete_list(list);

    // Test Case 4: Single list
    std::vector<ListNode*> lists4_pq = {create_list({7, 8, 9})};
    ListNode* result4_pq = mergeKLists_MinHeap(lists4_pq);
    ASSERT_TRUE(result4_pq && result4_pq->val == 7 && result4_pq->next->val == 8 && result4_pq->next->next->val == 9 && !result4_pq->next->next->next,
                "Single list (std::pq)");
    delete_list(result4_pq);
    for(ListNode* list : lists4_pq) delete_list(list);

    std::vector<ListNode*> lists4_custom = {create_list({7, 8, 9})};
    ListNode* result4_custom = mergeKLists_CustomMinHeap(lists4_custom);
    ASSERT_TRUE(result4_custom && result4_custom->val == 7 && result4_custom->next->val == 8 && result4_custom->next->next->val == 9 && !result4_custom->next->next->next,
                "Single list (CustomHeap)");
    delete_list(result4_custom);
    for(ListNode* list : lists4_custom) delete_list(list);

    // Test Case 5: All lists are empty
    std::vector<ListNode*> lists5_pq = {create_list({}), create_list({}), create_list({})};
    ListNode* result5_pq = mergeKLists_MinHeap(lists5_pq);
    ASSERT_TRUE(result5_pq == nullptr, "All lists empty (std::pq)");
    delete_list(result5_pq);
    for(ListNode* list : lists5_pq) delete_list(list);

    std::vector<ListNode*> lists5_custom = {create_list({}), create_list({}), create_list({})};
    ListNode* result5_custom = mergeKLists_CustomMinHeap(lists5_custom);
    ASSERT_TRUE(result5_custom == nullptr, "All lists empty (CustomHeap)");
    delete_list(result5_custom);
    for(ListNode* list : lists5_custom) delete_list(list);

    std::cout << "-----------------------------------" << std::endl;
}

void test_top_k_frequent_elements() {
    std::cout << "\n--- Testing Top K Frequent Elements ---" << std::endl;

    // Test Case 1: Basic functionality
    std::vector<int> nums1 = {1, 1, 1, 2, 2, 3};
    ASSERT_TRUE(compare_vector_contents(topKFrequent_MinHeap(nums1, 2), {1, 2}), "Basic: K=2 (std::pq)");
    ASSERT_TRUE(compare_vector_contents(topKFrequent_CustomMinHeap(nums1, 2), {1, 2}), "Basic: K=2 (CustomHeap)");
    ASSERT_TRUE(compare_vector_contents(topKFrequent_BucketSort(nums1, 2), {1, 2}), "Basic: K=2 (Bucket Sort)");

    // Test Case 2: K=1
    std::vector<int> nums2 = {1};
    ASSERT_TRUE(compare_vector_contents(topKFrequent_MinHeap(nums2, 1), {1}), "K=1 (std::pq)");
    ASSERT_TRUE(compare_vector_contents(topKFrequent_CustomMinHeap(nums2, 1), {1}), "K=1 (CustomHeap)");
    ASSERT_TRUE(compare_vector_contents(topKFrequent_BucketSort(nums2, 1), {1}), "K=1 (Bucket Sort)");

    // Test Case 3: K=N (all unique elements)
    std::vector<int> nums3 = {1, 2, 3, 4, 5};
    ASSERT_TRUE(compare_vector_contents(topKFrequent_MinHeap(nums3, 5), {1, 2, 3, 4, 5}), "K=N unique (std::pq)");
    ASSERT_TRUE(compare_vector_contents(topKFrequent_CustomMinHeap(nums3, 5), {1, 2, 3, 4, 5}), "K=N unique (CustomHeap)");
    ASSERT_TRUE(compare_vector_contents(topKFrequent_BucketSort(nums3, 5), {1, 2, 3, 4, 5}), "K=N unique (Bucket Sort)");

    // Test Case 4: Negative numbers and mixed frequencies
    std::vector<int> nums4 = {4, 1, -1, 2, -1, 2, 3}; // Frequencies: -1:2, 2:2, 4:1, 1:1, 3:1
    ASSERT_TRUE(compare_vector_contents(topKFrequent_MinHeap(nums4, 2), {-1, 2}), "Negative numbers, K=2 (std::pq)");
    ASSERT_TRUE(compare_vector_contents(topKFrequent_CustomMinHeap(nums4, 2), {-1, 2}), "Negative numbers, K=2 (CustomHeap)");
    ASSERT_TRUE(compare_vector_contents(topKFrequent_BucketSort(nums4, 2), {-1, 2}), "Negative numbers, K=2 (Bucket Sort)");
    ASSERT_TRUE(compare_vector_contents(topKFrequent_MinHeap(nums4, 3), {-1, 2, 1}), "Negative numbers, K=3 (std::pq)"); // Order of 1,3,4 doesn't matter
    ASSERT_TRUE(compare_vector_contents(topKFrequent_BucketSort(nums4, 3), {-1, 2, 1}), "Negative numbers, K=3 (Bucket Sort)");

    // Test Case 5: All elements same frequency, pick K
    std::vector<int> nums5 = {1, 2, 3, 4, 5, 6};
    ASSERT_TRUE(compare_vector_contents(topKFrequent_MinHeap(nums5, 3), {1, 2, 3}), "All same freq, K=3 (std::pq)");
    ASSERT_TRUE(compare_vector_contents(topKFrequent_BucketSort(nums5, 3), {1, 2, 3}), "All same freq, K=3 (Bucket Sort)");

    // Test Case 6: Empty input
    std::vector<int> nums6 = {};
    ASSERT_TRUE(topKFrequent_MinHeap(nums6, 0).empty(), "Empty input, K=0 (std::pq)");
    ASSERT_TRUE(topKFrequent_BucketSort(nums6, 0).empty(), "Empty input, K=0 (Bucket Sort)");

    std::cout << "-----------------------------------" << std::endl;
}

void test_median_from_data_stream() {
    std::cout << "\n--- Testing Median from Data Stream ---" << std::endl;
    double tolerance = 1e-9;

    // Test Case 1: Basic sequence (std::priority_queue)
    MedianFinder mf1;
    mf1.addNum(1);
    ASSERT_DOUBLE_EQUAL(mf1.findMedian(), 1.0, tolerance, "MF1: After adding 1");
    mf1.addNum(2);
    ASSERT_DOUBLE_EQUAL(mf1.findMedian(), 1.5, tolerance, "MF1: After adding 2");
    mf1.addNum(3);
    ASSERT_DOUBLE_EQUAL(mf1.findMedian(), 2.0, tolerance, "MF1: After adding 3");

    // Test Case 2: Basic sequence (CustomHeap)
    CustomMedianFinder cmf1;
    cmf1.addNum(1);
    ASSERT_DOUBLE_EQUAL(cmf1.findMedian(), 1.0, tolerance, "CMF1: After adding 1");
    cmf1.addNum(2);
    ASSERT_DOUBLE_EQUAL(cmf1.findMedian(), 1.5, tolerance, "CMF1: After adding 2");
    cmf1.addNum(3);
    ASSERT_DOUBLE_EQUAL(cmf1.findMedian(), 2.0, tolerance, "CMF1: After adding 3");

    // Test Case 3: Mixed numbers (std::priority_queue)
    MedianFinder mf2;
    mf2.addNum(-1);
    ASSERT_DOUBLE_EQUAL(mf2.findMedian(), -1.0, tolerance, "MF2: After adding -1");
    mf2.addNum(-2);
    ASSERT_DOUBLE_EQUAL(mf2.findMedian(), -1.5, tolerance, "MF2: After adding -2");
    mf2.addNum(0);
    ASSERT_DOUBLE_EQUAL(mf2.findMedian(), -1.0, tolerance, "MF2: After adding 0");
    mf2.addNum(5);
    ASSERT_DOUBLE_EQUAL(mf2.findMedian(), -0.5, tolerance, "MF2: After adding 5");
    mf2.addNum(10);
    ASSERT_DOUBLE_EQUAL(mf2.findMedian(), 0.0, tolerance, "MF2: After adding 10");

    // Test Case 4: Mixed numbers (CustomHeap)
    CustomMedianFinder cmf2;
    cmf2.addNum(-1);
    ASSERT_DOUBLE_EQUAL(cmf2.findMedian(), -1.0, tolerance, "CMF2: After adding -1");
    cmf2.addNum(-2);
    ASSERT_DOUBLE_EQUAL(cmf2.findMedian(), -1.5, tolerance, "CMF2: After adding -2");
    cmf2.addNum(0);
    ASSERT_DOUBLE_EQUAL(cmf2.findMedian(), -1.0, tolerance, "CMF2: After adding 0");
    cmf2.addNum(5);
    ASSERT_DOUBLE_EQUAL(cmf2.findMedian(), -0.5, tolerance, "CMF2: After adding 5");
    cmf2.addNum(10);
    ASSERT_DOUBLE_EQUAL(cmf2.findMedian(), 0.0, tolerance, "CMF2: After adding 10");

    // Test Case 5: Many numbers (std::priority_queue)
    MedianFinder mf3;
    std::vector<int> large_data = {6, 10, 2, 6, 5, 0, 6, 3, 1, 0, 0};
    std::vector<double> expected_medians = {6.0, 8.0, 6.0, 6.0, 6.0, 5.5, 6.0, 5.5, 5.0, 4.0, 3.0}; // Calculated manually/online
    for (size_t i = 0; i < large_data.size(); ++i) {
        mf3.addNum(large_data[i]);
        ASSERT_DOUBLE_EQUAL(mf3.findMedian(), expected_medians[i], tolerance, "MF3: Large data stream #" + std::to_string(i+1));
    }

    // Test Case 6: Many numbers (CustomHeap)
    CustomMedianFinder cmf3;
    for (size_t i = 0; i < large_data.size(); ++i) {
        cmf3.addNum(large_data[i]);
        ASSERT_DOUBLE_EQUAL(cmf3.findMedian(), expected_medians[i], tolerance, "CMF3: Large data stream #" + std::to_string(i+1));
    }

    std::cout << "-----------------------------------" << std::endl;
}

int main() {
    std::cout << "Running Heap Operations Test Suite..." << std::endl;

    test_kth_largest_element();
    test_merge_k_sorted_lists();
    test_top_k_frequent_elements();
    test_median_from_data_stream();

    std::cout << "\n--- Test Summary ---" << std::endl;
    std::cout << "Total Tests: " << test_count << std::endl;
    std::cout << "Passed: " << success_count << std::endl;
    std::cout << "Failed: " << (test_count - success_count) << std::endl;

    return (success_count == test_count) ? 0 : 1;
}

```
---