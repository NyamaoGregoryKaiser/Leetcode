```cpp
#include "../src/main_algorithms.cpp" // Include .cpp directly for problem functions (needs to be above main)
#include "../src/helpers.h"          // For test assertion utilities
#include <algorithm>                 // For std::sort in reference solutions

namespace SortingAlgorithms {

// --- Test suite for Kth Largest Element ---
void testKthLargest() {
    std::cout << "\n--- Testing Kth Largest Element ---" << std::endl;

    // Test Case 1: Basic case
    std::vector<int> nums1 = {3, 2, 1, 5, 6, 4};
    std::vector<int> nums1_copy1 = nums1;
    std::vector<int> nums1_copy2 = nums1;
    ASSERT_EQUAL(findKthLargest_QuickSelect(nums1, 2), 5, "Kth Largest - QS - Basic 1");
    ASSERT_EQUAL(findKthLargest_MinHeap(nums1_copy1, 2), 5, "Kth Largest - Heap - Basic 1");
    ASSERT_EQUAL(findKthLargest_Sort(nums1_copy2, 2), 5, "Kth Largest - Sort - Basic 1");

    // Test Case 2: Larger array
    std::vector<int> nums2 = {3, 2, 3, 1, 2, 4, 5, 5, 6};
    std::vector<int> nums2_copy1 = nums2;
    std::vector<int> nums2_copy2 = nums2;
    ASSERT_EQUAL(findKthLargest_QuickSelect(nums2, 4), 4, "Kth Largest - QS - Basic 2");
    ASSERT_EQUAL(findKthLargest_MinHeap(nums2_copy1, 4), 4, "Kth Largest - Heap - Basic 2");
    ASSERT_EQUAL(findKthLargest_Sort(nums2_copy2, 4), 4, "Kth Largest - Sort - Basic 2");

    // Test Case 3: K = 1 (Largest)
    std::vector<int> nums3 = {7, 6, 5, 4, 3, 2, 1};
    std::vector<int> nums3_copy1 = nums3;
    std::vector<int> nums3_copy2 = nums3;
    ASSERT_EQUAL(findKthLargest_QuickSelect(nums3, 1), 7, "Kth Largest - QS - K=1");
    ASSERT_EQUAL(findKthLargest_MinHeap(nums3_copy1, 1), 7, "Kth Largest - Heap - K=1");
    ASSERT_EQUAL(findKthLargest_Sort(nums3_copy2, 1), 7, "Kth Largest - Sort - K=1");

    // Test Case 4: K = N (Smallest)
    std::vector<int> nums4 = {7, 6, 5, 4, 3, 2, 1};
    std::vector<int> nums4_copy1 = nums4;
    std::vector<int> nums4_copy2 = nums4;
    ASSERT_EQUAL(findKthLargest_QuickSelect(nums4, 7), 1, "Kth Largest - QS - K=N");
    ASSERT_EQUAL(findKthLargest_MinHeap(nums4_copy1, 7), 1, "Kth Largest - Heap - K=N");
    ASSERT_EQUAL(findKthLargest_Sort(nums4_copy2, 7), 1, "Kth Largest - Sort - K=N");

    // Test Case 5: Duplicate elements
    std::vector<int> nums5 = {1, 2, 2, 3, 3, 3, 4, 4};
    std::vector<int> nums5_copy1 = nums5;
    std::vector<int> nums5_copy2 = nums5;
    ASSERT_EQUAL(findKthLargest_QuickSelect(nums5, 3), 3, "Kth Largest - QS - Duplicates"); // 3rd largest is 3
    ASSERT_EQUAL(findKthLargest_MinHeap(nums5_copy1, 3), 3, "Kth Largest - Heap - Duplicates");
    ASSERT_EQUAL(findKthLargest_Sort(nums5_copy2, 3), 3, "Kth Largest - Sort - Duplicates");

    // Test Case 6: Negative numbers
    std::vector<int> nums6 = {-1, -5, 0, 10, -2};
    std::vector<int> nums6_copy1 = nums6;
    std::vector<int> nums6_copy2 = nums6;
    ASSERT_EQUAL(findKthLargest_QuickSelect(nums6, 2), 0, "Kth Largest - QS - Negatives"); // 2nd largest is 0
    ASSERT_EQUAL(findKthLargest_MinHeap(nums6_copy1, 2), 0, "Kth Largest - Heap - Negatives");
    ASSERT_EQUAL(findKthLargest_Sort(nums6_copy2, 2), 0, "Kth Largest - Sort - Negatives");

    // Test Case 7: Single element
    std::vector<int> nums7 = {42};
    std::vector<int> nums7_copy1 = nums7;
    std::vector<int> nums7_copy2 = nums7;
    ASSERT_EQUAL(findKthLargest_QuickSelect(nums7, 1), 42, "Kth Largest - QS - Single Element");
    ASSERT_EQUAL(findKthLargest_MinHeap(nums7_copy1, 1), 42, "Kth Largest - Heap - Single Element");
    ASSERT_EQUAL(findKthLargest_Sort(nums7_copy2, 1), 42, "Kth Largest - Sort - Single Element");

    // Edge case: empty vector (QuickSelect would throw, Heap and Sort would also fail)
    // Note: The problem typically implies a non-empty array with valid k.
    // For `quickSelect`, it throws `std::out_of_range`. `findKthLargest_MinHeap` would crash on `min_heap.top()` if `k` is invalid or `nums` is empty.
    // We're assuming valid inputs as per typical interview problem constraints.
}

// --- Test suite for Sort Colors ---
void testSortColors() {
    std::cout << "\n--- Testing Sort Colors ---" << std::endl;

    // Test Case 1: Basic permutation
    std::vector<int> colors1 = {2, 0, 2, 1, 1, 0};
    std::vector<int> expected1 = {0, 0, 1, 1, 2, 2};
    std::vector<int> colors1_dutch = colors1;
    sortColors_DutchNationalFlag(colors1_dutch);
    ASSERT_VECTOR_EQUAL(colors1_dutch, expected1, "Sort Colors - Dutch - Basic 1");
    std::vector<int> colors1_counting = colors1;
    sortColors_CountingSort(colors1_counting);
    ASSERT_VECTOR_EQUAL(colors1_counting, expected1, "Sort Colors - Counting - Basic 1");

    // Test Case 2: Already sorted
    std::vector<int> colors2 = {0, 0, 1, 1, 2, 2};
    std::vector<int> expected2 = {0, 0, 1, 1, 2, 2};
    std::vector<int> colors2_dutch = colors2;
    sortColors_DutchNationalFlag(colors2_dutch);
    ASSERT_VECTOR_EQUAL(colors2_dutch, expected2, "Sort Colors - Dutch - Already Sorted");
    std::vector<int> colors2_counting = colors2;
    sortColors_CountingSort(colors2_counting);
    ASSERT_VECTOR_EQUAL(colors2_counting, expected2, "Sort Colors - Counting - Already Sorted");

    // Test Case 3: Reverse sorted
    std::vector<int> colors3 = {2, 2, 1, 1, 0, 0};
    std::vector<int> expected3 = {0, 0, 1, 1, 2, 2};
    std::vector<int> colors3_dutch = colors3;
    sortColors_DutchNationalFlag(colors3_dutch);
    ASSERT_VECTOR_EQUAL(colors3_dutch, expected3, "Sort Colors - Dutch - Reverse Sorted");
    std::vector<int> colors3_counting = colors3;
    sortColors_CountingSort(colors3_counting);
    ASSERT_VECTOR_EQUAL(colors3_counting, expected3, "Sort Colors - Counting - Reverse Sorted");

    // Test Case 4: All same color (0s)
    std::vector<int> colors4 = {0, 0, 0, 0};
    std::vector<int> expected4 = {0, 0, 0, 0};
    std::vector<int> colors4_dutch = colors4;
    sortColors_DutchNationalFlag(colors4_dutch);
    ASSERT_VECTOR_EQUAL(colors4_dutch, expected4, "Sort Colors - Dutch - All 0s");
    std::vector<int> colors4_counting = colors4;
    sortColors_CountingSort(colors4_counting);
    ASSERT_VECTOR_EQUAL(colors4_counting, expected4, "Sort Colors - Counting - All 0s");

    // Test Case 5: All same color (1s)
    std::vector<int> colors5 = {1, 1, 1, 1};
    std::vector<int> expected5 = {1, 1, 1, 1};
    std::vector<int> colors5_dutch = colors5;
    sortColors_DutchNationalFlag(colors5_dutch);
    ASSERT_VECTOR_EQUAL(colors5_dutch, expected5, "Sort Colors - Dutch - All 1s");
    std::vector<int> colors5_counting = colors5;
    sortColors_CountingSort(colors5_counting);
    ASSERT_VECTOR_EQUAL(colors5_counting, expected5, "Sort Colors - Counting - All 1s");

    // Test Case 6: All same color (2s)
    std::vector<int> colors6 = {2, 2, 2, 2};
    std::vector<int> expected6 = {2, 2, 2, 2};
    std::vector<int> colors6_dutch = colors6;
    sortColors_DutchNationalFlag(colors6_dutch);
    ASSERT_VECTOR_EQUAL(colors6_dutch, expected6, "Sort Colors - Dutch - All 2s");
    std::vector<int> colors6_counting = colors6;
    sortColors_CountingSort(colors6_counting);
    ASSERT_VECTOR_EQUAL(colors6_counting, expected6, "Sort Colors - Counting - All 2s");

    // Test Case 7: Single element
    std::vector<int> colors7 = {1};
    std::vector<int> expected7 = {1};
    std::vector<int> colors7_dutch = colors7;
    sortColors_DutchNationalFlag(colors7_dutch);
    ASSERT_VECTOR_EQUAL(colors7_dutch, expected7, "Sort Colors - Dutch - Single Element");
    std::vector<int> colors7_counting = colors7;
    sortColors_CountingSort(colors7_counting);
    ASSERT_VECTOR_EQUAL(colors7_counting, expected7, "Sort Colors - Counting - Single Element");

    // Test Case 8: Mixed, small array
    std::vector<int> colors8 = {2, 0, 1};
    std::vector<int> expected8 = {0, 1, 2};
    std::vector<int> colors8_dutch = colors8;
    sortColors_DutchNationalFlag(colors8_dutch);
    ASSERT_VECTOR_EQUAL(colors8_dutch, expected8, "Sort Colors - Dutch - Mixed Small");
    std::vector<int> colors8_counting = colors8;
    sortColors_CountingSort(colors8_counting);
    ASSERT_VECTOR_EQUAL(colors8_counting, expected8, "Sort Colors - Counting - Mixed Small");

    // Test Case 9: Empty array (no change)
    std::vector<int> colors9 = {};
    std::vector<int> expected9 = {};
    std::vector<int> colors9_dutch = colors9;
    sortColors_DutchNationalFlag(colors9_dutch);
    ASSERT_VECTOR_EQUAL(colors9_dutch, expected9, "Sort Colors - Dutch - Empty");
    std::vector<int> colors9_counting = colors9;
    sortColors_CountingSort(colors9_counting);
    ASSERT_VECTOR_EQUAL(colors9_counting, expected9, "Sort Colors - Counting - Empty");
}

// --- Test suite for Merge Intervals ---
void testMergeIntervals() {
    std::cout << "\n--- Testing Merge Intervals ---" << std::endl;

    // Test Case 1: Basic overlapping intervals
    std::vector<Interval> intervals1 = {{1,3}, {2,6}, {8,10}, {15,18}};
    std::vector<Interval> expected1 = {{1,6}, {8,10}, {15,18}};
    ASSERT_VECTOR_EQUAL(mergeIntervals(intervals1), expected1, "Merge Intervals - Basic Overlap");

    // Test Case 2: All intervals merge into one
    std::vector<Interval> intervals2 = {{1,4}, {0,4}};
    std::vector<Interval> expected2 = {{0,4}};
    ASSERT_VECTOR_EQUAL(mergeIntervals(intervals2), expected2, "Merge Intervals - All Merge 1");

    std::vector<Interval> intervals2_b = {{1,4}, {0,0}};
    std::vector<Interval> expected2_b = {{0,0},{1,4}};
    ASSERT_VECTOR_EQUAL(mergeIntervals(intervals2_b), expected2_b, "Merge Intervals - All Merge 1_b");


    // Test Case 3: No overlaps
    std::vector<Interval> intervals3 = {{1,2}, {3,4}, {5,6}};
    std::vector<Interval> expected3 = {{1,2}, {3,4}, {5,6}};
    ASSERT_VECTOR_EQUAL(mergeIntervals(intervals3), expected3, "Merge Intervals - No Overlap");

    // Test Case 4: Intervals touching (should merge)
    std::vector<Interval> intervals4 = {{1,4}, {4,5}};
    std::vector<Interval> expected4 = {{1,5}};
    ASSERT_VECTOR_EQUAL(mergeIntervals(intervals4), expected4, "Merge Intervals - Touching");

    // Test Case 5: Single interval
    std::vector<Interval> intervals5 = {{0,0}};
    std::vector<Interval> expected5 = {{0,0}};
    ASSERT_VECTOR_EQUAL(mergeIntervals(intervals5), expected5, "Merge Intervals - Single Interval");

    // Test Case 6: Empty input
    std::vector<Interval> intervals6 = {};
    std::vector<Interval> expected6 = {};
    ASSERT_VECTOR_EQUAL(mergeIntervals(intervals6), expected6, "Merge Intervals - Empty Input");

    // Test Case 7: Complex overlaps and non-overlaps
    std::vector<Interval> intervals7 = {{1,4}, {0,1}, {3,5}, {20,23}, {21,25}, {10,12}};
    std::vector<Interval> expected7 = {{0,5}, {10,12}, {20,25}};
    ASSERT_VECTOR_EQUAL(mergeIntervals(intervals7), expected7, "Merge Intervals - Complex");

    // Test Case 8: Intervals fully contained within others
    std::vector<Interval> intervals8 = {{1,10}, {2,3}, {4,5}, {6,7}};
    std::vector<Interval> expected8 = {{1,10}};
    ASSERT_VECTOR_EQUAL(mergeIntervals(intervals8), expected8, "Merge Intervals - Fully Contained");
}

// --- Test suite for Meeting Rooms II ---
void testMinMeetingRooms() {
    std::cout << "\n--- Testing Meeting Rooms II ---" << std::endl;

    // Test Case 1: Basic overlapping
    std::vector<Interval> meetings1 = {{0,30}, {5,10}, {15,20}};
    std::vector<Interval> meetings1_copy = meetings1;
    ASSERT_EQUAL(minMeetingRooms_Heap(meetings1), 2, "Min Rooms - Heap - Basic 1");
    ASSERT_EQUAL(minMeetingRooms_SweepLine(meetings1_copy), 2, "Min Rooms - Sweep - Basic 1");

    // Test Case 2: No overlaps
    std::vector<Interval> meetings2 = {{7,10}, {2,4}};
    std::vector<Interval> meetings2_copy = meetings2;
    ASSERT_EQUAL(minMeetingRooms_Heap(meetings2), 1, "Min Rooms - Heap - No Overlap");
    ASSERT_EQUAL(minMeetingRooms_SweepLine(meetings2_copy), 1, "Min Rooms - Sweep - No Overlap");

    // Test Case 3: All overlap
    std::vector<Interval> meetings3 = {{1,10}, {2,9}, {3,8}, {4,7}};
    std::vector<Interval> meetings3_copy = meetings3;
    ASSERT_EQUAL(minMeetingRooms_Heap(meetings3), 4, "Min Rooms - Heap - All Overlap");
    ASSERT_EQUAL(minMeetingRooms_SweepLine(meetings3_copy), 4, "Min Rooms - Sweep - All Overlap");

    // Test Case 4: Multiple meetings ending at the same time a new one starts
    std::vector<Interval> meetings4 = {{1,5}, {5,8}, {8,10}}; // Can reuse rooms sequentially
    std::vector<Interval> meetings4_copy = meetings4;
    ASSERT_EQUAL(minMeetingRooms_Heap(meetings4), 1, "Min Rooms - Heap - Sequential");
    ASSERT_EQUAL(minMeetingRooms_SweepLine(meetings4_copy), 1, "Min Rooms - Sweep - Sequential");

    // Test Case 5: More complex scenario
    std::vector<Interval> meetings5 = {{1,4}, {2,3}, {4,5}, {6,7}};
    std::vector<Interval> meetings5_copy = meetings5;
    ASSERT_EQUAL(minMeetingRooms_Heap(meetings5), 2, "Min Rooms - Heap - Complex 1"); // [1,4] & [2,3] overlap. [4,5] can reuse. [6,7] can reuse.
    ASSERT_EQUAL(minMeetingRooms_SweepLine(meetings5_copy), 2, "Min Rooms - Sweep - Complex 1");

    // Test Case 6: Empty input
    std::vector<Interval> meetings6 = {};
    std::vector<Interval> meetings6_copy = meetings6;
    ASSERT_EQUAL(minMeetingRooms_Heap(meetings6), 0, "Min Rooms - Heap - Empty");
    ASSERT_EQUAL(minMeetingRooms_SweepLine(meetings6_copy), 0, "Min Rooms - Sweep - Empty");

    // Test Case 7: One meeting
    std::vector<Interval> meetings7 = {{10,20}};
    std::vector<Interval> meetings7_copy = meetings7;
    ASSERT_EQUAL(minMeetingRooms_Heap(meetings7), 1, "Min Rooms - Heap - Single Meeting");
    ASSERT_EQUAL(minMeetingRooms_SweepLine(meetings7_copy), 1, "Min Rooms - Sweep - Single Meeting");

    // Test Case 8: Meetings with same start times
    std::vector<Interval> meetings8 = {{1,5}, {1,2}, {3,4}};
    std::vector<Interval> meetings8_copy = meetings8;
    ASSERT_EQUAL(minMeetingRooms_Heap(meetings8), 2, "Min Rooms - Heap - Same Start");
    ASSERT_EQUAL(minMeetingRooms_SweepLine(meetings8_copy), 2, "Min Rooms - Sweep - Same Start");

    // Test Case 9: Meetings with same end times
    std::vector<Interval> meetings9 = {{1,5}, {2,5}, {3,5}};
    std::vector<Interval> meetings9_copy = meetings9;
    ASSERT_EQUAL(minMeetingRooms_Heap(meetings9), 3, "Min Rooms - Heap - Same End");
    ASSERT_EQUAL(minMeetingRooms_SweepLine(meetings9_copy), 3, "Min Rooms - Sweep - Same End");
}

} // namespace SortingAlgorithms

int main() {
    SortingAlgorithms::testKthLargest();
    SortingAlgorithms::testSortColors();
    SortingAlgorithms::testMergeIntervals();
    SortingAlgorithms::testMinMeetingRooms();

    SortingAlgorithms::print_test_summary();

    return SortingAlgorithms::test_failed_count > 0 ? 1 : 0;
}
```