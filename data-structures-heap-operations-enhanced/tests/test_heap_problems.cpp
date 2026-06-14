#include "gtest/gtest.h"
#include "src/heap_problems.h"
#include "utils/min_heap.h"
#include "utils/max_heap.h"
#include <algorithm> // For std::sort and std::is_permutation

// --- Helper Functions for Test Setup and Teardown ---

// Helper function to create a linked list from a vector
ListNode* createList(const std::vector<int>& values) {
    if (values.empty()) {
        return nullptr;
    }
    ListNode* head = new ListNode(values[0]);
    ListNode* current = head;
    for (size_t i = 1; i < values.size(); ++i) {
        current->next = new ListNode(values[i]);
        current = current->next;
    }
    return head;
}

// Helper function to convert a linked list to a vector
std::vector<int> listToVector(ListNode* head) {
    std::vector<int> values;
    ListNode* current = head;
    while (current != nullptr) {
        values.push_back(current->val);
        current = current->next;
    }
    return values;
}

// Helper function to delete a linked list
void deleteList(ListNode* head) {
    ListNode* current = head;
    while (current != nullptr) {
        ListNode* next = current->next;
        delete current;
        current = next;
    }
}

// --- Test Suite for Custom Heap Implementations ---

TEST(MinHeapTest, EmptyHeap) {
    MinHeap<int> heap;
    ASSERT_TRUE(heap.empty());
    ASSERT_EQ(heap.size(), 0);
    ASSERT_THROW(heap.top(), std::runtime_error);
    ASSERT_THROW(heap.pop(), std::runtime_error);
}

TEST(MinHeapTest, PushAndTop) {
    MinHeap<int> heap;
    heap.push(5);
    ASSERT_FALSE(heap.empty());
    ASSERT_EQ(heap.size(), 1);
    ASSERT_EQ(heap.top(), 5);

    heap.push(3);
    ASSERT_EQ(heap.size(), 2);
    ASSERT_EQ(heap.top(), 3); // Min element is 3

    heap.push(8);
    ASSERT_EQ(heap.size(), 3);
    ASSERT_EQ(heap.top(), 3); // Min element is still 3

    heap.push(1);
    ASSERT_EQ(heap.size(), 4);
    ASSERT_EQ(heap.top(), 1); // Min element is now 1
}

TEST(MinHeapTest, Pop) {
    MinHeap<int> heap;
    heap.push(5);
    heap.push(3);
    heap.push(8);
    heap.push(1); // Heap: [1, 3, 8, 5] (logical)

    ASSERT_EQ(heap.top(), 1);
    heap.pop(); // Heap: [3, 5, 8]
    ASSERT_EQ(heap.size(), 3);
    ASSERT_EQ(heap.top(), 3);

    heap.pop(); // Heap: [5, 8]
    ASSERT_EQ(heap.size(), 2);
    ASSERT_EQ(heap.top(), 5);

    heap.pop(); // Heap: [8]
    ASSERT_EQ(heap.size(), 1);
    ASSERT_EQ(heap.top(), 8);

    heap.pop(); // Heap: []
    ASSERT_TRUE(heap.empty());
    ASSERT_THROW(heap.top(), std::runtime_error);
}

TEST(MinHeapTest, BuildHeap) {
    std::vector<int> data = {4, 1, 3, 2, 16, 9, 10, 14, 8, 7};
    MinHeap<int> heap(data); // Should build in O(N)

    std::vector<int> sorted_elements;
    while (!heap.empty()) {
        sorted_elements.push_back(heap.top());
        heap.pop();
    }
    std::vector<int> expected_sorted = {1, 2, 3, 4, 7, 8, 9, 10, 14, 16};
    ASSERT_EQ(sorted_elements, expected_sorted);
}

TEST(MaxHeapTest, EmptyHeap) {
    MaxHeap<int> heap;
    ASSERT_TRUE(heap.empty());
    ASSERT_EQ(heap.size(), 0);
    ASSERT_THROW(heap.top(), std::runtime_error);
    ASSERT_THROW(heap.pop(), std::runtime_error);
}

TEST(MaxHeapTest, PushAndTop) {
    MaxHeap<int> heap;
    heap.push(5);
    ASSERT_FALSE(heap.empty());
    ASSERT_EQ(heap.size(), 1);
    ASSERT_EQ(heap.top(), 5);

    heap.push(8);
    ASSERT_EQ(heap.size(), 2);
    ASSERT_EQ(heap.top(), 8); // Max element is 8

    heap.push(3);
    ASSERT_EQ(heap.size(), 3);
    ASSERT_EQ(heap.top(), 8); // Max element is still 8

    heap.push(10);
    ASSERT_EQ(heap.size(), 4);
    ASSERT_EQ(heap.top(), 10); // Max element is now 10
}

TEST(MaxHeapTest, Pop) {
    MaxHeap<int> heap;
    heap.push(5);
    heap.push(8);
    heap.push(3);
    heap.push(10); // Heap: [10, 8, 3, 5] (logical)

    ASSERT_EQ(heap.top(), 10);
    heap.pop(); // Heap: [8, 5, 3]
    ASSERT_EQ(heap.size(), 3);
    ASSERT_EQ(heap.top(), 8);

    heap.pop(); // Heap: [5, 3]
    ASSERT_EQ(heap.size(), 2);
    ASSERT_EQ(heap.top(), 5);

    heap.pop(); // Heap: [3]
    ASSERT_EQ(heap.size(), 1);
    ASSERT_EQ(heap.top(), 3);

    heap.pop(); // Heap: []
    ASSERT_TRUE(heap.empty());
    ASSERT_THROW(heap.top(), std::runtime_error);
}

TEST(MaxHeapTest, BuildHeap) {
    std::vector<int> data = {4, 1, 3, 2, 16, 9, 10, 14, 8, 7};
    MaxHeap<int> heap(data); // Should build in O(N)

    std::vector<int> sorted_elements;
    while (!heap.empty()) {
        sorted_elements.push_back(heap.top());
        heap.pop();
    }
    std::vector<int> expected_sorted = {16, 14, 10, 9, 8, 7, 4, 3, 2, 1};
    ASSERT_EQ(sorted_elements, expected_sorted);
}

// --- Test Suite for Problem 1: Kth Largest Element in an Array ---

struct KthLargestTest : public ::testing::TestWithParam<std::function<int(std::vector<int>&, int)>> {
    // Parameterized test fixture for different implementations
};

TEST_P(KthLargestTest, BasicCases) {
    std::vector<int> nums1 = {3, 2, 1, 5, 6, 4};
    ASSERT_EQ(GetParam()(nums1, 2), 5); // 2nd largest
    std::vector<int> nums2 = {3, 2, 1, 5, 6, 4};
    ASSERT_EQ(GetParam()(nums2, 6), 1); // 6th largest (smallest)
    std::vector<int> nums3 = {3, 2, 1, 5, 6, 4};
    ASSERT_EQ(GetParam()(nums3, 1), 6); // 1st largest
}

TEST_P(KthLargestTest, WithDuplicates) {
    std::vector<int> nums = {3, 2, 3, 1, 2, 4, 5, 5, 6};
    ASSERT_EQ(GetParam()(nums, 4), 4); // Sorted: [6,5,5,4,3,3,2,2,1], 4th largest is 4
    std::vector<int> nums2 = {3, 2, 3, 1, 2, 4, 5, 5, 6};
    ASSERT_EQ(GetParam()(nums2, 1), 6);
    std::vector<int> nums3 = {3, 2, 3, 1, 2, 4, 5, 5, 6};
    ASSERT_EQ(GetParam()(nums3, 9), 1);
}

TEST_P(KthLargestTest, SingleElement) {
    std::vector<int> nums = {1};
    ASSERT_EQ(GetParam()(nums, 1), 1);
}

TEST_P(KthLargestTest, AllSameElements) {
    std::vector<int> nums = {7, 7, 7, 7, 7};
    ASSERT_EQ(GetParam()(nums, 3), 7);
}

TEST_P(KthLargestTest, LargeNumbers) {
    std::vector<int> nums = {10000, 1, 5000, 20000, 1000, 15000};
    ASSERT_EQ(GetParam()(nums, 3), 10000); // Sorted: [20000, 15000, 10000, 5000, 1000, 1], 3rd largest is 10000
}

TEST_P(KthLargestTest, NegativeNumbers) {
    std::vector<int> nums = {-5, -1, -10, -3, -7};
    ASSERT_EQ(GetParam()(nums, 2), -3); // Sorted: [-1, -3, -5, -7, -10], 2nd largest is -3
}

TEST_P(KthLargestTest, SortedArray) {
    std::vector<int> nums = {1, 2, 3, 4, 5};
    ASSERT_EQ(GetParam()(nums, 3), 3);
}

TEST_P(KthLargestTest, ReverseSortedArray) {
    std::vector<int> nums = {5, 4, 3, 2, 1};
    ASSERT_EQ(GetParam()(nums, 3), 3);
}

INSTANTIATE_TEST_SUITE_P(
    KthLargestImplementations,
    KthLargestTest,
    ::testing::Values(
        findKthLargest_Heap,
        findKthLargest_NthElement,
        findKthLargest_Sort
    ),
    [](const ::testing::TestParamInfo<KthLargestTest::ParamType>& info) {
        // Provide a meaningful name for each test case
        if (info.param == (std::function<int(std::vector<int>&, int)>)findKthLargest_Heap) return "Heap";
        if (info.param == (std::function<int(std::vector<int>&, int)>)findKthLargest_NthElement) return "NthElement";
        if (info.param == (std::function<int(std::vector<int>&, int)>)findKthLargest_Sort) return "Sort";
        return "Unknown";
    }
);


// --- Test Suite for Problem 2: Merge K Sorted Lists ---

TEST(MergeKListsTest, BasicCase) {
    std::vector<ListNode*> lists;
    lists.push_back(createList({1, 4, 5}));
    lists.push_back(createList({1, 3, 4}));
    lists.push_back(createList({2, 6}));

    ListNode* merged = mergeKLists_Heap(lists);
    std::vector<int> expected = {1, 1, 2, 3, 4, 4, 5, 6};
    ASSERT_EQ(listToVector(merged), expected);
    deleteList(merged); // Clean up
}

TEST(MergeKListsTest, EmptyInput) {
    std::vector<ListNode*> lists;
    ListNode* merged = mergeKLists_Heap(lists);
    ASSERT_EQ(merged, nullptr);
    deleteList(merged);
}

TEST(MergeKListsTest, OneEmptyList) {
    std::vector<ListNode*> lists;
    lists.push_back(nullptr);
    ListNode* merged = mergeKLists_Heap(lists);
    ASSERT_EQ(merged, nullptr);
    deleteList(merged);
}

TEST(MergeKListsTest, AllEmptyLists) {
    std::vector<ListNode*> lists(3, nullptr);
    ListNode* merged = mergeKLists_Heap(lists);
    ASSERT_EQ(merged, nullptr);
    deleteList(merged);
}

TEST(MergeKListsTest, SingleList) {
    std::vector<ListNode*> lists;
    lists.push_back(createList({1, 2, 3}));
    ListNode* merged = mergeKLists_Heap(lists);
    std::vector<int> expected = {1, 2, 3};
    ASSERT_EQ(listToVector(merged), expected);
    deleteList(merged);
}

TEST(MergeKListsTest, ListsOfDifferentLengths) {
    std::vector<ListNode*> lists;
    lists.push_back(createList({1, 10}));
    lists.push_back(createList({2, 3, 4, 5, 6}));
    lists.push_back(createList({7}));

    ListNode* merged = mergeKLists_Heap(lists);
    std::vector<int> expected = {1, 2, 3, 4, 5, 6, 7, 10};
    ASSERT_EQ(listToVector(merged), expected);
    deleteList(merged);
}

TEST(MergeKListsTest, LargeValues) {
    std::vector<ListNode*> lists;
    lists.push_back(createList({10000, 20000}));
    lists.push_back(createList({1, 2, 3, 4, 5}));
    lists.push_back(createList({5000, 15000}));

    ListNode* merged = mergeKLists_Heap(lists);
    std::vector<int> expected = {1, 2, 3, 4, 5, 5000, 10000, 15000, 20000};
    ASSERT_EQ(listToVector(merged), expected);
    deleteList(merged);
}

TEST(MergeKListsTest, NegativeValues) {
    std::vector<ListNode*> lists;
    lists.push_back(createList({-5, -3, -1}));
    lists.push_back(createList({-4, -2, 0}));
    lists.push_back(createList({-6}));

    ListNode* merged = mergeKLists_Heap(lists);
    std::vector<int> expected = {-6, -5, -4, -3, -2, -1, 0};
    ASSERT_EQ(listToVector(merged), expected);
    deleteList(merged);
}

TEST(MergeKListsTest, OnlyTwoLists) {
    std::vector<ListNode*> lists;
    lists.push_back(createList({1, 5, 9}));
    lists.push_back(createList({2, 6, 10}));

    ListNode* merged = mergeKLists_Heap(lists);
    std::vector<int> expected = {1, 2, 5, 6, 9, 10};
    ASSERT_EQ(listToVector(merged), expected);
    deleteList(merged);
}


// --- Test Suite for Problem 3: Find Median from Data Stream ---

TEST(MedianFinderTest, BasicOperations) {
    MedianFinder mf;
    mf.addNum(1);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 1.0);
    mf.addNum(2);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 1.5); // (1+2)/2
    mf.addNum(3);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 2.0); // 2
    mf.addNum(4);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 2.5); // (2+3)/2
    mf.addNum(5);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 3.0); // 3
}

TEST(MedianFinderTest, EvenNumberOfElements) {
    MedianFinder mf;
    mf.addNum(10);
    mf.addNum(20);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 15.0);
    mf.addNum(5);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 10.0);
    mf.addNum(25);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 15.0);
}

TEST(MedianFinderTest, NegativeNumbers) {
    MedianFinder mf;
    mf.addNum(-1);
    ASSERT_DOUBLE_EQ(mf.findMedian(), -1.0);
    mf.addNum(-2);
    ASSERT_DOUBLE_EQ(mf.findMedian(), -1.5);
    mf.addNum(0);
    ASSERT_DOUBLE_EQ(mf.findMedian(), -1.0);
    mf.addNum(-3);
    ASSERT_DOUBLE_EQ(mf.findMedian(), -1.5);
}

TEST(MedianFinderTest, DuplicateNumbers) {
    MedianFinder mf;
    mf.addNum(5);
    mf.addNum(5);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 5.0);
    mf.addNum(3);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 5.0); // 3,5,5 -> median is 5
    mf.addNum(7);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 5.0); // 3,5,5,7 -> median is 5
}

TEST(MedianFinderTest, LargeNumbers) {
    MedianFinder mf;
    mf.addNum(100000);
    mf.addNum(10000);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 55000.0);
    mf.addNum(1000000);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 100000.0);
    mf.addNum(50000);
    ASSERT_DOUBLE_EQ(mf.findMedian(), 75000.0);
}


// --- Test Suite for Problem 4: Top K Frequent Elements ---

struct TopKFrequentTest : public ::testing::TestWithParam<std::function<std::vector<int>(std::vector<int>&, int)>> {
    // Parameterized test fixture for different implementations
    // Need to sort the result as order doesn't matter for the problem
    static bool compareVectors(std::vector<int> a, std::vector<int> b) {
        std::sort(a.begin(), a.end());
        std::sort(b.begin(), b.end());
        return a == b;
    }
};

TEST_P(TopKFrequentTest, BasicCases) {
    std::vector<int> nums1 = {1, 1, 1, 2, 2, 3};
    std::vector<int> expected1 = {1, 2};
    ASSERT_TRUE(TopKFrequentTest::compareVectors(GetParam()(nums1, 2), expected1));

    std::vector<int> nums2 = {1};
    std::vector<int> expected2 = {1};
    ASSERT_TRUE(TopKFrequentTest::compareVectors(GetParam()(nums2, 1), expected2));
}

TEST_P(TopKFrequentTest, AllUniqueElements) {
    std::vector<int> nums = {1, 2, 3, 4, 5};
    std::vector<int> expected = {1, 2, 3}; // Freq 1 for all, order can be anything for k=3
    std::vector<int> result = GetParam()(nums, 3);
    ASSERT_EQ(result.size(), 3);
    // As order doesn't matter, just check if all elements are present
    ASSERT_TRUE(std::find(result.begin(), result.end(), 1) != result.end());
    ASSERT_TRUE(std::find(result.begin(), result.end(), 2) != result.end());
    ASSERT_TRUE(std::find(result.begin(), result.end(), 3) != result.end());
}

TEST_P(TopKFrequentTest, MoreComplexCase) {
    std::vector<int> nums = {1, 1, 1, 2, 2, 3, 4, 4, 4, 4}; // 1:3, 2:2, 3:1, 4:4
    std::vector<int> expected = {4, 1, 2}; // Freq: 4, 3, 2
    ASSERT_TRUE(TopKFrequentTest::compareVectors(GetParam()(nums, 3), expected));

    std::vector<int> nums2 = {1, 1, 1, 2, 2, 3, 4, 4, 4, 4};
    std::vector<int> expected2 = {4, 1};
    ASSERT_TRUE(TopKFrequentTest::compareVectors(GetParam()(nums2, 2), expected2));
}

TEST_P(TopKFrequentTest, AllSameElements) {
    std::vector<int> nums = {7, 7, 7, 7, 7};
    std::vector<int> expected = {7};
    ASSERT_TRUE(TopKFrequentTest::compareVectors(GetParam()(nums, 1), expected));
}

TEST_P(TopKFrequentTest, NegativeNumbers) {
    std::vector<int> nums = {-1, -1, -1, -2, -2, -3};
    std::vector<int> expected = {-1, -2};
    ASSERT_TRUE(TopKFrequentTest::compareVectors(GetParam()(nums, 2), expected));
}

TEST_P(TopKFrequentTest, EmptyInput) {
    std::vector<int> nums = {};
    std::vector<int> expected = {};
    ASSERT_TRUE(TopKFrequentTest::compareVectors(GetParam()(nums, 0), expected));
}

INSTANTIATE_TEST_SUITE_P(
    TopKFrequentImplementations,
    TopKFrequentTest,
    ::testing::Values(
        topKFrequent_Heap,
        topKFrequent_Sort
    ),
    [](const ::testing::TestParamInfo<TopKFrequentTest::ParamType>& info) {
        if (info.param == (std::function<std::vector<int>(std::vector<int>&, int)>)topKFrequent_Heap) return "Heap";
        if (info.param == (std::function<std::vector<int>(std::vector<int>&, int)>)topKFrequent_Sort) return "Sort";
        return "Unknown";
    }
);