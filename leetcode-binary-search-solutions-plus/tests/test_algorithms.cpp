```cpp
#include "gtest/gtest.h"
#include "../src/algorithms.h"
#include "../src/helpers.h"
#include <vector>
#include <algorithm> // For std::sort

using namespace BinarySearch;

// Test fixture for common setup/teardown if needed, but not strictly necessary for simple functions
class BinarySearchTest : public ::testing::Test {
protected:
    void SetUp() override {
        // Common setup for tests, if any
    }

    void TearDown() override {
        // Common teardown for tests, if any
    }
};

// --- Problem 1: Standard Binary Search ---

TEST_F(BinarySearchTest, LinearSearchBasic) {
    std::vector<int> nums = {1, 2, 3, 4, 5};
    EXPECT_EQ(linearSearch(nums, 3), 2);
    EXPECT_EQ(linearSearch(nums, 1), 0);
    EXPECT_EQ(linearSearch(nums, 5), 4);
    EXPECT_EQ(linearSearch(nums, 6), -1);
    EXPECT_EQ(linearSearch({}, 1), -1);
}

TEST_F(BinarySearchTest, StandardBinarySearchIterative_Basic) {
    std::vector<int> nums = {-1, 0, 3, 5, 9, 12};
    EXPECT_EQ(standardBinarySearchIterative(nums, 9), 4);
    EXPECT_EQ(standardBinarySearchIterative(nums, 3), 2);
    EXPECT_EQ(standardBinarySearchIterative(nums, -1), 0);
    EXPECT_EQ(standardBinarySearchIterative(nums, 12), 5);
    EXPECT_EQ(standardBinarySearchIterative(nums, 2), -1); // Not found
    EXPECT_EQ(standardBinarySearchIterative(nums, 13), -1); // Not found (beyond max)
    EXPECT_EQ(standardBinarySearchIterative(nums, -2), -1); // Not found (before min)
}

TEST_F(BinarySearchTest, StandardBinarySearchIterative_EdgeCases) {
    EXPECT_EQ(standardBinarySearchIterative({}, 5), -1);             // Empty array
    EXPECT_EQ(standardBinarySearchIterative({5}, 5), 0);            // Single element found
    EXPECT_EQ(standardBinarySearchIterative({5}, 1), -1);            // Single element not found
    EXPECT_EQ(standardBinarySearchIterative({1, 2}, 1), 0);         // Two elements, find first
    EXPECT_EQ(standardBinarySearchIterative({1, 2}, 2), 1);         // Two elements, find second
    EXPECT_EQ(standardBinarySearchIterative({1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, 1), 0); // Large array, first element
    EXPECT_EQ(standardBinarySearchIterative({1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, 10), 9); // Large array, last element
}

TEST_F(BinarySearchTest, StandardBinarySearchRecursive_Basic) {
    std::vector<int> nums = {-1, 0, 3, 5, 9, 12};
    EXPECT_EQ(standardBinarySearchRecursive(nums, 9), 4);
    EXPECT_EQ(standardBinarySearchRecursive(nums, 3), 2);
    EXPECT_EQ(standardBinarySearchRecursive(nums, -1), 0);
    EXPECT_EQ(standardBinarySearchRecursive(nums, 12), 5);
    EXPECT_EQ(standardBinarySearchRecursive(nums, 2), -1); // Not found
}

TEST_F(BinarySearchTest, StandardBinarySearchRecursive_EdgeCases) {
    EXPECT_EQ(standardBinarySearchRecursive({}, 5), -1);             // Empty array
    EXPECT_EQ(standardBinarySearchRecursive({5}, 5), 0);            // Single element found
    EXPECT_EQ(standardBinarySearchRecursive({5}, 1), -1);            // Single element not found
}

// --- Problem 2: Find First and Last Occurrence of an Element ---

TEST_F(BinarySearchTest, FindFirstOccurrence) {
    std::vector<int> nums = {5, 7, 7, 8, 8, 10};
    EXPECT_EQ(findFirstOccurrence(nums, 7), 1);
    EXPECT_EQ(findFirstOccurrence(nums, 8), 3);
    EXPECT_EQ(findFirstOccurrence(nums, 5), 0);
    EXPECT_EQ(findFirstOccurrence(nums, 10), 5);
    EXPECT_EQ(findFirstOccurrence(nums, 6), -1); // Not found
    EXPECT_EQ(findFirstOccurrence({}, 5), -1);
    EXPECT_EQ(findFirstOccurrence({1, 1, 1}, 1), 0);
    EXPECT_EQ(findFirstOccurrence({1, 2, 3}, 2), 1);
}

TEST_F(BinarySearchTest, FindLastOccurrence) {
    std::vector<int> nums = {5, 7, 7, 8, 8, 10};
    EXPECT_EQ(findLastOccurrence(nums, 7), 2);
    EXPECT_EQ(findLastOccurrence(nums, 8), 4);
    EXPECT_EQ(findLastOccurrence(nums, 5), 0);
    EXPECT_EQ(findLastOccurrence(nums, 10), 5);
    EXPECT_EQ(findLastOccurrence(nums, 6), -1); // Not found
    EXPECT_EQ(findLastOccurrence({}, 5), -1);
    EXPECT_EQ(findLastOccurrence({1, 1, 1}, 1), 2);
    EXPECT_EQ(findLastOccurrence({1, 2, 3}, 2), 1);
}

TEST_F(BinarySearchTest, FindFirstAndLastOccurrence_Basic) {
    std::vector<int> nums = {5, 7, 7, 8, 8, 10};
    EXPECT_EQ(findFirstAndLastOccurrence(nums, 8), std::vector<int>({3, 4}));
    EXPECT_EQ(findFirstAndLastOccurrence(nums, 7), std::vector<int>({1, 2}));
    EXPECT_EQ(findFirstAndLastOccurrence(nums, 5), std::vector<int>({0, 0}));
    EXPECT_EQ(findFirstAndLastOccurrence(nums, 10), std::vector<int>({5, 5}));
    EXPECT_EQ(findFirstAndLastOccurrence(nums, 6), std::vector<int>({-1, -1})); // Not found
}

TEST_F(BinarySearchTest, FindFirstAndLastOccurrence_EdgeCases) {
    EXPECT_EQ(findFirstAndLastOccurrence({}, 0), std::vector<int>({-1, -1})); // Empty array
    EXPECT_EQ(findFirstAndLastOccurrence({1}, 1), std::vector<int>({0, 0})); // Single element found
    EXPECT_EQ(findFirstAndLastOccurrence({1}, 0), std::vector<int>({-1, -1})); // Single element not found
    EXPECT_EQ(findFirstAndLastOccurrence({1, 1, 1, 1}, 1), std::vector<int>({0, 3})); // All duplicates
    EXPECT_EQ(findFirstAndLastOccurrence({1, 2, 3, 4, 5}, 3), std::vector<int>({2, 2})); // No duplicates
    EXPECT_EQ(findFirstAndLastOccurrence({1, 2, 3, 3, 3, 4, 5}, 3), std::vector<int>({2, 4}));
}

// --- Problem 3: Search in Rotated Sorted Array ---

TEST_F(BinarySearchTest, SearchInRotatedSortedArray_Basic) {
    std::vector<int> nums1 = {4, 5, 6, 7, 0, 1, 2};
    EXPECT_EQ(searchInRotatedSortedArray(nums1, 0), 4);
    EXPECT_EQ(searchInRotatedSortedArray(nums1, 3), -1);
    EXPECT_EQ(searchInRotatedSortedArray(nums1, 4), 0); // First element
    EXPECT_EQ(searchInRotatedSortedArray(nums1, 2), 6); // Last element

    std::vector<int> nums2 = {1, 3};
    EXPECT_EQ(searchInRotatedSortedArray(nums2, 3), 1);
    EXPECT_EQ(searchInRotatedSortedArray(nums2, 1), 0);
    EXPECT_EQ(searchInRotatedSortedArray(nums2, 0), -1);

    std::vector<int> nums3 = {3, 1}; // Rotated version of {1,3}
    EXPECT_EQ(searchInRotatedSortedArray(nums3, 1), 1);
    EXPECT_EQ(searchInRotatedSortedArray(nums3, 3), 0);
    EXPECT_EQ(searchInRotatedSortedArray(nums3, 0), -1);
}

TEST_F(BinarySearchTest, SearchInRotatedSortedArray_EdgeCases) {
    EXPECT_EQ(searchInRotatedSortedArray({}, 5), -1);             // Empty array
    EXPECT_EQ(searchInRotatedSortedArray({1}, 1), 0);            // Single element found
    EXPECT_EQ(searchInRotatedSortedArray({1}, 0), -1);            // Single element not found
    EXPECT_EQ(searchInRotatedSortedArray({3, 4, 5, 1, 2}, 1), 3); // Pivot in middle
    EXPECT_EQ(searchInRotatedSortedArray({1, 2, 3, 4, 5}, 3), 2); // Not rotated
    EXPECT_EQ(searchInRotatedSortedArray({2, 3, 4, 5, 1}, 1), 4); // Rotated at end
    EXPECT_EQ(searchInRotatedSortedArray({5, 1, 2, 3, 4}, 5), 0); // Rotated at beginning
}

// --- Problem 4: Find Peak Element ---

TEST_F(BinarySearchTest, FindPeakElementLinear_Basic) {
    std::vector<int> nums1 = {1, 2, 3, 1};
    EXPECT_EQ(findPeakElementLinear(nums1), 2);

    std::vector<int> nums2 = {1, 2, 1, 3, 5, 6, 4};
    // Can return either index 1 (val 2) or index 5 (val 6)
    int peak_idx = findPeakElementLinear(nums2);
    EXPECT_TRUE(peak_idx == 1 || peak_idx == 5);

    std::vector<int> nums3 = {3, 2, 1};
    EXPECT_EQ(findPeakElementLinear(nums3), 0);
    
    std::vector<int> nums4 = {1, 2, 3};
    EXPECT_EQ(findPeakElementLinear(nums4), 2);
}

TEST_F(BinarySearchTest, FindPeakElement_Basic) {
    std::vector<int> nums1 = {1, 2, 3, 1};
    EXPECT_EQ(findPeakElement(nums1), 2);

    std::vector<int> nums2 = {1, 2, 1, 3, 5, 6, 4};
    // The BS implementation will find index 5 (value 6)
    EXPECT_EQ(findPeakElement(nums2), 5); 

    std::vector<int> nums3 = {3, 2, 1};
    EXPECT_EQ(findPeakElement(nums3), 0); // Peak at the very beginning
    
    std::vector<int> nums4 = {1, 2, 3};
    EXPECT_EQ(findPeakElement(nums4), 2); // Peak at the very end
}

TEST_F(BinarySearchTest, FindPeakElement_EdgeCases) {
    EXPECT_EQ(findPeakElement({1}), 0); // Single element
    EXPECT_EQ(findPeakElement({1, 2}), 1); // Ascending
    EXPECT_EQ(findPeakElement({2, 1}), 0); // Descending
    EXPECT_EQ(findPeakElement({3, 4, 5, 6, 7}), 4); // Monotonically increasing
    EXPECT_EQ(findPeakElement({7, 6, 5, 4, 3}), 0); // Monotonically decreasing
    EXPECT_EQ(findPeakElement({1, 3, 2, 4, 1}), 3); // Multiple peaks, returns 4
}


// --- Problem 5: Smallest Divisor Given a Threshold ---

TEST_F(BinarySearchTest, SmallestDivisor_CheckDivisor) {
    std::vector<int> nums = {1, 2, 5, 9};
    EXPECT_TRUE(checkDivisor(nums, 5, 6)); // sum = 5 <= 6
    EXPECT_FALSE(checkDivisor(nums, 4, 6)); // sum = 7 > 6
    EXPECT_TRUE(checkDivisor(nums, 9, 6)); // sum = 4 <= 6
    EXPECT_FALSE(checkDivisor(nums, 1, 6)); // sum = 17 > 6
}

TEST_F(BinarySearchTest, SmallestDivisor_Basic) {
    std::vector<int> nums1 = {1, 2, 5, 9};
    EXPECT_EQ(smallestDivisor(nums1, 6), 5);

    std::vector<int> nums2 = {44, 22, 33, 11, 1};
    EXPECT_EQ(smallestDivisor(nums2, 5), 44);

    std::vector<int> nums3 = {2, 3, 5, 9};
    EXPECT_EQ(smallestDivisor(nums3, 10), 3); // (2/3 + 3/3 + 5/3 + 9/3) = (1+1+2+3) = 7 <= 10
}

TEST_F(BinarySearchTest, SmallestDivisor_EdgeCases) {
    std::vector<int> nums1 = {1000000};
    EXPECT_EQ(smallestDivisor(nums1, 1), 1000000); // Max possible divisor
    EXPECT_EQ(smallestDivisor(nums1, 1000000), 1); // Min possible divisor

    std::vector<int> nums2 = {1, 1, 1};
    EXPECT_EQ(smallestDivisor(nums2, 3), 1); // All ones, threshold allows small divisor
    EXPECT_EQ(smallestDivisor(nums2, 2), 2); // Need larger divisor
    EXPECT_EQ(smallestDivisor(nums2, 1), 3); // Need even larger

    std::vector<int> nums3 = {7, 8, 9};
    EXPECT_EQ(smallestDivisor(nums3, 15), 1); // Sum 24, need 1
    EXPECT_EQ(smallestDivisor(nums3, 5), 3); // Sum 7+8+9 = 24. For div=1 -> 24. div=2 -> 4+4+5=13. div=3 -> 3+3+3=9. div=4 -> 2+2+3=7. div=5 -> 2+2+2=6. div=6 -> 2+2+2=6. div=7 -> 1+2+2=5. Smallest for 5 is 7.

    // A detailed walkthrough: nums = {7, 8, 9}, threshold = 5
    // Divisor 1: ceil(7/1)+ceil(8/1)+ceil(9/1) = 7+8+9 = 24 > 5 (too small)
    // Divisor 2: ceil(7/2)+ceil(8/2)+ceil(9/2) = 4+4+5 = 13 > 5 (too small)
    // Divisor 3: ceil(7/3)+ceil(8/3)+ceil(9/3) = 3+3+3 = 9 > 5 (too small)
    // Divisor 4: ceil(7/4)+ceil(8/4)+ceil(9/4) = 2+2+3 = 7 > 5 (too small)
    // Divisor 5: ceil(7/5)+ceil(8/5)+ceil(9/5) = 2+2+2 = 6 > 5 (too small)
    // Divisor 6: ceil(7/6)+ceil(8/6)+ceil(9/6) = 2+2+2 = 6 > 5 (too small)
    // Divisor 7: ceil(7/7)+ceil(8/7)+ceil(9/7) = 1+2+2 = 5 <= 5 (valid, potential answer)
    // high becomes 6, ans becomes 7.
    // ... eventually low becomes 7, high becomes 6, loop ends.
    EXPECT_EQ(smallestDivisor(nums3, 5), 7);
}
```