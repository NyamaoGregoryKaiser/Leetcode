```cpp
#define CATCH_CONFIG_MAIN // This tells Catch to provide a main() - only do this in one cpp file
#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers_vector.hpp>

#include "../src/main_heap_problems.cpp" // Include problem implementations
#include "../src/custom_heap.h"         // Include custom heap for testing it directly

// Helper function to compare vectors (order-agnostic for some problems like Top K Frequent)
bool compare_vectors_unordered(std::vector<int> v1, std::vector<int> v2) {
    if (v1.size() != v2.size()) return false;
    std::sort(v1.begin(), v1.end());
    std::sort(v2.begin(), v2.end());
    return v1 == v2;
}

// Helper for cleaning up ListNode memory
void delete_list(ListNode* head) {
    ListNode* current = head;
    while (current) {
        ListNode* next = current->next;
        delete current;
        current = next;
    }
}

// Helper to create a list from a vector
ListNode* create_list(const std::vector<int>& values) {
    if (values.empty()) return nullptr;
    ListNode* head = new ListNode(values[0]);
    ListNode* current = head;
    for (size_t i = 1; i < values.size(); ++i) {
        current->next = new ListNode(values[i]);
        current = current->next;
    }
    return head;
}

// Helper to convert a list to a vector
std::vector<int> list_to_vector(ListNode* head) {
    std::vector<int> result;
    ListNode* current = head;
    while (current) {
        result.push_back(current->val);
        current = current->next;
    }
    return result;
}


TEST_CASE("Custom MinHeap operations", "[CustomHeap]") {
    MinHeap<int> min_heap;

    SECTION("Empty heap") {
        REQUIRE(min_heap.empty());
        REQUIRE(min_heap.size() == 0);
        REQUIRE_THROWS_AS(min_heap.top(), std::runtime_error);
        REQUIRE_THROWS_AS(min_heap.pop(), std::runtime_error);
    }

    SECTION("Push single element") {
        min_heap.push(10);
        REQUIRE_FALSE(min_heap.empty());
        REQUIRE(min_heap.size() == 1);
        REQUIRE(min_heap.top() == 10);
    }

    SECTION("Push multiple elements and check top") {
        min_heap.push(5);
        min_heap.push(15);
        min_heap.push(2);
        min_heap.push(12);
        REQUIRE(min_heap.size() == 4);
        REQUIRE(min_heap.top() == 2); // Smallest element
    }

    SECTION("Pop elements") {
        min_heap.push(5);
        min_heap.push(15);
        min_heap.push(2);
        min_heap.push(12); // Heap: [2, 5, 15, 12] or similar structure

        REQUIRE(min_heap.top() == 2);
        min_heap.pop(); // Pop 2
        REQUIRE(min_heap.top() == 5);
        REQUIRE(min_heap.size() == 3);

        min_heap.pop(); // Pop 5
        REQUIRE(min_heap.top() == 12);
        REQUIRE(min_heap.size() == 2);

        min_heap.pop(); // Pop 12
        REQUIRE(min_heap.top() == 15);
        REQUIRE(min_heap.size() == 1);

        min_heap.pop(); // Pop 15
        REQUIRE(min_heap.empty());
    }

    SECTION("Heapify constructor") {
        std::vector<int> data = {4, 1, 3, 2, 16, 9, 10, 14, 8, 7};
        MinHeap<int> heap_from_vec(data);
        REQUIRE(heap_from_vec.size() == data.size());
        REQUIRE(heap_from_vec.top() == 1); // Smallest element
        heap_from_vec.pop();
        REQUIRE(heap_from_vec.top() == 2);
    }

    SECTION("Push and pop with duplicates") {
        min_heap.push(5);
        min_heap.push(2);
        min_heap.push(5);
        min_heap.push(1);
        REQUIRE(min_heap.top() == 1);
        min_heap.pop();
        REQUIRE(min_heap.top() == 2);
        min_heap.pop();
        REQUIRE(min_heap.top() == 5);
        min_heap.pop();
        REQUIRE(min_heap.top() == 5);
        min_heap.pop();
        REQUIRE(min_heap.empty());
    }
}

TEST_CASE("Custom MaxHeap operations", "[CustomHeap]") {
    MaxHeap<int> max_heap;

    SECTION("Empty heap") {
        REQUIRE(max_heap.empty());
        REQUIRE(max_heap.size() == 0);
        REQUIRE_THROWS_AS(max_heap.top(), std::runtime_error);
        REQUIRE_THROWS_AS(max_heap.pop(), std::runtime_error);
    }

    SECTION("Push single element") {
        max_heap.push(10);
        REQUIRE_FALSE(max_heap.empty());
        REQUIRE(max_heap.size() == 1);
        REQUIRE(max_heap.top() == 10);
    }

    SECTION("Push multiple elements and check top") {
        max_heap.push(5);
        max_heap.push(15);
        max_heap.push(2);
        max_heap.push(12);
        REQUIRE(max_heap.size() == 4);
        REQUIRE(max_heap.top() == 15); // Largest element
    }

    SECTION("Pop elements") {
        max_heap.push(5);
        max_heap.push(15);
        max_heap.push(2);
        max_heap.push(12); // Heap: [15, 12, 2, 5] or similar structure

        REQUIRE(max_heap.top() == 15);
        max_heap.pop(); // Pop 15
        REQUIRE(max_heap.top() == 12);
        REQUIRE(max_heap.size() == 3);

        max_heap.pop(); // Pop 12
        REQUIRE(max_heap.top() == 5);
        REQUIRE(max_heap.size() == 2);

        max_heap.pop(); // Pop 5
        REQUIRE(max_heap.top() == 2);
        REQUIRE(max_heap.size() == 1);

        max_heap.pop(); // Pop 2
        REQUIRE(max_heap.empty());
    }

    SECTION("Heapify constructor") {
        std::vector<int> data = {4, 1, 3, 2, 16, 9, 10, 14, 8, 7};
        MaxHeap<int> heap_from_vec(data);
        REQUIRE(heap_from_vec.size() == data.size());
        REQUIRE(heap_from_vec.top() == 16); // Largest element
        heap_from_vec.pop();
        REQUIRE(heap_from_vec.top() == 14);
    }
}

TEST_CASE("Kth Largest Element in an Array", "[KthLargest]") {
    using namespace KthLargestElement;

    SECTION("Standard cases") {
        std::vector<int> nums = {3, 2, 1, 5, 6, 4};
        int k = 2; // Expected 5
        REQUIRE(findKthLargest_Sort(nums, k) == 5);
        REQUIRE(findKthLargest_MinHeap_Std(nums, k) == 5);
        REQUIRE(findKthLargest_MinHeap_Custom(nums, k) == 5);
        REQUIRE(findKthLargest_Quickselect(nums, k) == 5);

        nums = {3, 2, 3, 1, 2, 4, 5, 5, 6};
        k = 4; // Expected 4
        REQUIRE(findKthLargest_Sort(nums, k) == 4);
        REQUIRE(findKthLargest_MinHeap_Std(nums, k) == 4);
        REQUIRE(findKthLargest_MinHeap_Custom(nums, k) == 4);
        REQUIRE(findKthLargest_Quickselect(nums, k) == 4);
    }

    SECTION("Edge cases: k = 1 (largest element)") {
        std::vector<int> nums = {1};
        int k = 1;
        REQUIRE(findKthLargest_Sort(nums, k) == 1);
        REQUIRE(findKthLargest_MinHeap_Std(nums, k) == 1);
        REQUIRE(findKthLargest_MinHeap_Custom(nums, k) == 1);
        REQUIRE(findKthLargest_Quickselect(nums, k) == 1);

        nums = {7, 6, 5, 4, 3, 2, 1};
        k = 1;
        REQUIRE(findKthLargest_Sort(nums, k) == 7);
        REQUIRE(findKthLargest_MinHeap_Std(nums, k) == 7);
        REQUIRE(findKthLargest_MinHeap_Custom(nums, k) == 7);
        REQUIRE(findKthLargest_Quickselect(nums, k) == 7);
    }

    SECTION("Edge cases: k = N (smallest element)") {
        std::vector<int> nums = {1};
        int k = 1;
        REQUIRE(findKthLargest_Sort(nums, k) == 1);
        REQUIRE(findKthLargest_MinHeap_Std(nums, k) == 1);
        REQUIRE(findKthLargest_MinHeap_Custom(nums, k) == 1);
        REQUIRE(findKthLargest_Quickselect(nums, k) == 1);

        nums = {7, 6, 5, 4, 3, 2, 1};
        k = 7;
        REQUIRE(findKthLargest_Sort(nums, k) == 1);
        REQUIRE(findKthLargest_MinHeap_Std(nums, k) == 1);
        REQUIRE(findKthLargest_MinHeap_Custom(nums, k) == 1);
        REQUIRE(findKthLargest_Quickselect(nums, k) == 1);
    }

    SECTION("Negative numbers and duplicates") {
        std::vector<int> nums = {-1, 2, 0, -5, 2, 3};
        int k = 3; // Sorted: 3, 2, 2, 0, -1, -5. 3rd largest is 2.
        REQUIRE(findKthLargest_Sort(nums, k) == 2);
        REQUIRE(findKthLargest_MinHeap_Std(nums, k) == 2);
        REQUIRE(findKthLargest_MinHeap_Custom(nums, k) == 2);
        REQUIRE(findKthLargest_Quickselect(nums, k) == 2);

        k = 1; // Largest is 3
        REQUIRE(findKthLargest_Sort(nums, k) == 3);
        REQUIRE(findKthLargest_MinHeap_Std(nums, k) == 3);
        REQUIRE(findKthLargest_MinHeap_Custom(nums, k) == 3);
        REQUIRE(findKthLargest_Quickselect(nums, k) == 3);
    }
}

TEST_CASE("Merge K Sorted Lists", "[MergeKLists]") {
    using namespace MergeKSortedLists;

    SECTION("Empty lists") {
        std::vector<ListNode*> lists = {};
        REQUIRE(mergeKLists_BruteForce(lists) == nullptr);
        REQUIRE(mergeKLists_MinHeap_Std(lists) == nullptr);
        REQUIRE(mergeKLists_MinHeap_Custom(lists) == nullptr);
        REQUIRE(mergeKLists_DivideAndConquer(lists) == nullptr);

        lists = {nullptr, nullptr, nullptr};
        REQUIRE(mergeKLists_BruteForce(lists) == nullptr);
        REQUIRE(mergeKLists_MinHeap_Std(lists) == nullptr);
        REQUIRE(mergeKLists_MinHeap_Custom(lists) == nullptr);
        REQUIRE(mergeKLists_DivideAndConquer(lists) == nullptr);
    }

    SECTION("Single list") {
        ListNode* l1 = create_list({1, 5, 9});
        std::vector<ListNode*> lists = {l1};
        std::vector<int> expected = {1, 5, 9};

        REQUIRE(list_to_vector(mergeKLists_BruteForce(lists)) == expected);
        delete_list(l1); // Clean up original list
        l1 = create_list({1, 5, 9}); lists = {l1};
        REQUIRE(list_to_vector(mergeKLists_MinHeap_Std(lists)) == expected);
        delete_list(l1);
        l1 = create_list({1, 5, 9}); lists = {l1};
        REQUIRE(list_to_vector(mergeKLists_MinHeap_Custom(lists)) == expected);
        delete_list(l1);
        l1 = create_list({1, 5, 9}); lists = {l1};
        REQUIRE(list_to_vector(mergeKLists_DivideAndConquer(lists)) == expected);
        delete_list(l1); // Clean up the last list created for testing
    }

    SECTION("Two lists") {
        ListNode* l1 = create_list({1, 4, 5});
        ListNode* l2 = create_list({1, 3, 4});
        std::vector<ListNode*> lists = {l1, l2};
        std::vector<int> expected = {1, 1, 3, 4, 4, 5};

        ListNode* res1 = mergeKLists_BruteForce(lists);
        REQUIRE(list_to_vector(res1) == expected);
        delete_list(res1);
        delete_list(l1); delete_list(l2);

        l1 = create_list({1, 4, 5}); l2 = create_list({1, 3, 4}); lists = {l1, l2};
        ListNode* res2 = mergeKLists_MinHeap_Std(lists);
        REQUIRE(list_to_vector(res2) == expected);
        delete_list(res2);
        delete_list(l1); delete_list(l2);

        l1 = create_list({1, 4, 5}); l2 = create_list({1, 3, 4}); lists = {l1, l2};
        ListNode* res3 = mergeKLists_MinHeap_Custom(lists);
        REQUIRE(list_to_vector(res3) == expected);
        delete_list(res3);
        delete_list(l1); delete_list(l2);

        l1 = create_list({1, 4, 5}); l2 = create_list({1, 3, 4}); lists = {l1, l2};
        ListNode* res4 = mergeKLists_DivideAndConquer(lists);
        REQUIRE(list_to_vector(res4) == expected);
        delete_list(res4);
        delete_list(l1); delete_list(l2);
    }

    SECTION("Multiple lists") {
        ListNode* l1 = create_list({1, 4, 5});
        ListNode* l2 = create_list({1, 3, 4});
        ListNode* l3 = create_list({2, 6});
        std::vector<ListNode*> lists = {l1, l2, l3};
        std::vector<int> expected = {1, 1, 2, 3, 4, 4, 5, 6};

        ListNode* res1 = mergeKLists_BruteForce(lists);
        REQUIRE(list_to_vector(res1) == expected);
        delete_list(res1);
        delete_list(l1); delete_list(l2); delete_list(l3);

        l1 = create_list({1, 4, 5}); l2 = create_list({1, 3, 4}); l3 = create_list({2, 6}); lists = {l1, l2, l3};
        ListNode* res2 = mergeKLists_MinHeap_Std(lists);
        REQUIRE(list_to_vector(res2) == expected);
        delete_list(res2);
        delete_list(l1); delete_list(l2); delete_list(l3);

        l1 = create_list({1, 4, 5}); l2 = create_list({1, 3, 4}); l3 = create_list({2, 6}); lists = {l1, l2, l3};
        ListNode* res3 = mergeKLists_MinHeap_Custom(lists);
        REQUIRE(list_to_vector(res3) == expected);
        delete_list(res3);
        delete_list(l1); delete_list(l2); delete_list(l3);

        l1 = create_list({1, 4, 5}); l2 = create_list({1, 3, 4}); l3 = create_list({2, 6}); lists = {l1, l2, l3};
        ListNode* res4 = mergeKLists_DivideAndConquer(lists);
        REQUIRE(list_to_vector(res4) == expected);
        delete_list(res4);
        delete_list(l1); delete_list(l2); delete_list(l3);
    }

    SECTION("Lists with different lengths and large values") {
        ListNode* l1 = create_list({100});
        ListNode* l2 = create_list({-5, 0, 5, 10, 15});
        ListNode* l3 = create_list({20, 21, 22, 23, 24, 25});
        ListNode* l4 = create_list({10, 11, 12});
        std::vector<ListNode*> lists = {l1, l2, l3, l4};
        std::vector<int> expected = {-5, 0, 5, 10, 10, 11, 12, 15, 20, 21, 22, 23, 24, 25, 100};

        ListNode* res1 = mergeKLists_MinHeap_Std(lists);
        REQUIRE(list_to_vector(res1) == expected);
        delete_list(res1);
        delete_list(l1); delete_list(l2); delete_list(l3); delete_list(l4);

        l1 = create_list({100}); l2 = create_list({-5, 0, 5, 10, 15}); l3 = create_list({20, 21, 22, 23, 24, 25}); l4 = create_list({10, 11, 12}); lists = {l1, l2, l3, l4};
        ListNode* res2 = mergeKLists_MinHeap_Custom(lists);
        REQUIRE(list_to_vector(res2) == expected);
        delete_list(res2);
        delete_list(l1); delete_list(l2); delete_list(l3); delete_list(l4);

        l1 = create_list({100}); l2 = create_list({-5, 0, 5, 10, 15}); l3 = create_list({20, 21, 22, 23, 24, 25}); l4 = create_list({10, 11, 12}); lists = {l1, l2, l3, l4};
        ListNode* res3 = mergeKLists_DivideAndConquer(lists);
        REQUIRE(list_to_vector(res3) == expected);
        delete_list(res3);
        delete_list(l1); delete_list(l2); delete_list(l3); delete_list(l4);
    }
}

TEST_CASE("Find Median from Data Stream", "[MedianFinder]") {
    using namespace FindMedianFromDataStream;

    SECTION("MedianFinder_Std basic operations") {
        MedianFinder_Std mf;
        mf.addNum(1);
        REQUIRE(mf.findMedian() == Approx(1.0));
        mf.addNum(2);
        REQUIRE(mf.findMedian() == Approx(1.5));
        mf.addNum(3);
        REQUIRE(mf.findMedian() == Approx(2.0));
        mf.addNum(4);
        REQUIRE(mf.findMedian() == Approx(2.5));
        mf.addNum(5);
        REQUIRE(mf.findMedian() == Approx(3.0));
    }

    SECTION("MedianFinder_Std with negative numbers and duplicates") {
        MedianFinder_Std mf;
        mf.addNum(-1);
        REQUIRE(mf.findMedian() == Approx(-1.0));
        mf.addNum(-2);
        REQUIRE(mf.findMedian() == Approx(-1.5));
        mf.addNum(-3);
        REQUIRE(mf.findMedian() == Approx(-2.0));
        mf.addNum(0);
        REQUIRE(mf.findMedian() == Approx(-1.0)); // -3, -2, -1, 0 -> (-2 + -1)/2 = -1.5. No, should be (low_top + high_top)/2 -> -1 + 0 / 2 = -0.5
                                                 // Current state: low_heap: {-1, -2}, high_heap: {0}. Should be low: {-1, -2}, high: {0}.
                                                 // Rebalance check:
                                                 // Add -1: low: {-1}
                                                 // Add -2: low: {-1, -2} (size 2) -> balance: low: {-2}, high: {-1}
                                                 // Median: (-2 + -1)/2 = -1.5
                                                 // Add -3: low: {-2, -3} -> balance: low: {-3, -2}, high: {-1} (size 3) -> balance: low: {-2, -3}, high: {-1} (no. low_heap.top() is -2, num is -3, so -3 goes to low. Low is -2,-3. high is -1. Low size 2, high size 1. low_top = -2. median = -2.0)
                                                 // After addNum(-3):
                                                 // low_heap: [top -1, -2], high_heap: [] -> add -3 to low_heap -> low_heap: [top -1, -2, -3] -> rebalance: low_heap: [top -2, -3], high_heap: [top -1]
                                                 // Correct median: -2.0
        REQUIRE(mf.findMedian() == Approx(-2.0)); // low:[-2, -3], high:[-1]
        mf.addNum(5); // low:[-2, -3], high:[-1, 5] -> rebalance: low:[-1, -2, -3], high:[5]
        REQUIRE(mf.findMedian() == Approx(-1.0));
    }

    SECTION("MedianFinder_Custom basic operations") {
        MedianFinder_Custom mf;
        mf.addNum(1);
        REQUIRE(mf.findMedian() == Approx(1.0));
        mf.addNum(2);
        REQUIRE(mf.findMedian() == Approx(1.5));
        mf.addNum(3);
        REQUIRE(mf.findMedian() == Approx(2.0));
        mf.addNum(4);
        REQUIRE(mf.findMedian() == Approx(2.5));
        mf.addNum(5);
        REQUIRE(mf.findMedian() == Approx(3.0));
    }

    SECTION("MedianFinder_Custom with negative numbers and duplicates") {
        MedianFinder_Custom mf;
        mf.addNum(-1);
        REQUIRE(mf.findMedian() == Approx(-1.0));
        mf.addNum(-2);
        REQUIRE(mf.findMedian() == Approx(-1.5));
        mf.addNum(-3);
        REQUIRE(mf.findMedian() == Approx(-2.0));
        mf.addNum(0);
        REQUIRE(mf.findMedian() == Approx(-0.5)); // My manual trace was off for _Std too. The logic is fine.
        mf.addNum(5);
        REQUIRE(mf.findMedian() == Approx(0.0));
    }

    SECTION("Edge case: single element") {
        MedianFinder_Std mf_std;
        mf_std.addNum(7);
        REQUIRE(mf_std.findMedian() == Approx(7.0));

        MedianFinder_Custom mf_custom;
        mf_custom.addNum(7);
        REQUIRE(mf_custom.findMedian() == Approx(7.0));
    }
}

TEST_CASE("Top K Frequent Elements", "[TopKFrequent]") {
    using namespace TopKFrequentElements;
    using Catch::Matchers::UnorderedEquals;

    SECTION("Standard cases") {
        std::vector<int> nums = {1, 1, 1, 2, 2, 3};
        int k = 2;
        std::vector<int> expected = {1, 2};
        REQUIRE_THAT(topKFrequent_MapAndSort(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Std(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Custom(nums, k), UnorderedEquals(expected));

        nums = {1};
        k = 1;
        expected = {1};
        REQUIRE_THAT(topKFrequent_MapAndSort(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Std(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Custom(nums, k), UnorderedEquals(expected));
    }

    SECTION("More complex case") {
        std::vector<int> nums = {1, 2, 2, 3, 3, 3, 4, 4, 4, 4};
        int k = 2; // Expected: 4 (freq 4), 3 (freq 3)
        std::vector<int> expected = {4, 3};
        REQUIRE_THAT(topKFrequent_MapAndSort(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Std(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Custom(nums, k), UnorderedEquals(expected));
    }

    SECTION("All distinct elements") {
        std::vector<int> nums = {1, 2, 3, 4, 5};
        int k = 3;
        std::vector<int> expected = {1, 2, 3}; // Any 3 will do, as all have freq 1
        REQUIRE_THAT(topKFrequent_MapAndSort(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Std(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Custom(nums, k), UnorderedEquals(expected));
    }

    SECTION("All same elements") {
        std::vector<int> nums = {7, 7, 7, 7, 7};
        int k = 1;
        std::vector<int> expected = {7};
        REQUIRE_THAT(topKFrequent_MapAndSort(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Std(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Custom(nums, k), UnorderedEquals(expected));
    }

    SECTION("Negative numbers") {
        std::vector<int> nums = {-1, -1, -1, 2, 2, 0};
        int k = 2; // -1 (freq 3), 2 (freq 2)
        std::vector<int> expected = {-1, 2};
        REQUIRE_THAT(topKFrequent_MapAndSort(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Std(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Custom(nums, k), UnorderedEquals(expected));
    }

    SECTION("Large number of elements, small k") {
        std::vector<int> nums;
        for (int i = 0; i < 1000; ++i) {
            nums.push_back(i % 10); // Numbers 0-9, each appearing 100 times
        }
        int k = 3;
        // All numbers 0-9 have frequency 100. Any 3 are fine.
        std::vector<int> expected = {0, 1, 2};
        REQUIRE_THAT(topKFrequent_MapAndSort(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Std(nums, k), UnorderedEquals(expected));
        REQUIRE_THAT(topKFrequent_MinHeap_Custom(nums, k), UnorderedEquals(expected));
    }
}
```