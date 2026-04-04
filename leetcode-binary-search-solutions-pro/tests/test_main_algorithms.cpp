```cpp
#include "simple_test_framework.h"
#include "main_algorithms.h"
#include "utils.h"

#include <vector>
#include <optional>
#include <iostream>

using namespace BinarySearch;
using namespace Utils;

// --- Problem 1: Standard Binary Search ---

TEST_CASE(testIterativeBinarySearch_Found) {
    std::vector<int> nums = {1, 3, 5, 7, 9, 11, 13};
    ASSERT_OPTIONAL_EQUAL(5, iterativeBinarySearch(nums, 11), "Target 11 should be at index 5");
    ASSERT_OPTIONAL_EQUAL(0, iterativeBinarySearch(nums, 1), "Target 1 should be at index 0");
    ASSERT_OPTIONAL_EQUAL(6, iterativeBinarySearch(nums, 13), "Target 13 should be at index 6");
    ASSERT_OPTIONAL_EQUAL(3, iterativeBinarySearch(nums, 7), "Target 7 should be at index 3");
} END_TEST_CASE

TEST_CASE(testIterativeBinarySearch_NotFound) {
    std::vector<int> nums = {1, 3, 5, 7, 9, 11, 13};
    ASSERT_OPTIONAL_EQUAL(std::nullopt, iterativeBinarySearch(nums, 4), "Target 4 should not be found");
    ASSERT_OPTIONAL_EQUAL(std::nullopt, iterativeBinarySearch(nums, 0), "Target 0 should not be found");
    ASSERT_OPTIONAL_EQUAL(std::nullopt, iterativeBinarySearch(nums, 14), "Target 14 should not be found");
} END_TEST_CASE

TEST_CASE(testIterativeBinarySearch_EdgeCases) {
    std::vector<int> empty = {};
    ASSERT_OPTIONAL_EQUAL(std::nullopt, iterativeBinarySearch(empty, 5), "Empty array");

    std::vector<int> single = {10};
    ASSERT_OPTIONAL_EQUAL(0, iterativeBinarySearch(single, 10), "Single element array - found");
    ASSERT_OPTIONAL_EQUAL(std::nullopt, iterativeBinarySearch(single, 5), "Single element array - not found");

    std::vector<int> two_elements = {2, 4};
    ASSERT_OPTIONAL_EQUAL(0, iterativeBinarySearch(two_elements, 2), "Two elements - first");
    ASSERT_OPTIONAL_EQUAL(1, iterativeBinarySearch(two_elements, 4), "Two elements - second");
    ASSERT_OPTIONAL_EQUAL(std::nullopt, iterativeBinarySearch(two_elements, 3), "Two elements - not found");
} END_TEST_CASE

TEST_CASE(testRecursiveBinarySearch_Found) {
    std::vector<int> nums = {1, 3, 5, 7, 9, 11, 13};
    ASSERT_OPTIONAL_EQUAL(5, recursiveBinarySearch(nums, 11), "Target 11 should be at index 5 (recursive)");
    ASSERT_OPTIONAL_EQUAL(0, recursiveBinarySearch(nums, 1), "Target 1 should be at index 0 (recursive)");
    ASSERT_OPTIONAL_EQUAL(6, recursiveBinarySearch(nums, 13), "Target 13 should be at index 6 (recursive)");
} END_TEST_CASE

TEST_CASE(testRecursiveBinarySearch_NotFound) {
    std::vector<int> nums = {1, 3, 5, 7, 9, 11, 13};
    ASSERT_OPTIONAL_EQUAL(std::nullopt, recursiveBinarySearch(nums, 4), "Target 4 should not be found (recursive)");
} END_TEST_CASE

// --- Problem 2: Find First and Last Occurrence ---

TEST_CASE(testFindFirstLast_Found) {
    std::vector<int> nums = {1, 2, 3, 3, 3, 4, 5, 5, 6};
    ASSERT_PAIR_OPTIONAL_EQUAL({2, 4}, findFirstAndLastOccurrence(nums, 3), "Target 3 occurrences");
    ASSERT_PAIR_OPTIONAL_EQUAL({6, 7}, findFirstAndLastOccurrence(nums, 5), "Target 5 occurrences");
    ASSERT_PAIR_OPTIONAL_EQUAL({0, 0}, findFirstAndLastOccurrence(nums, 1), "Target 1 occurrences");
    ASSERT_PAIR_OPTIONAL_EQUAL({8, 8}, findFirstAndLastOccurrence(nums, 6), "Target 6 occurrences");
} END_TEST_CASE

TEST_CASE(testFindFirstLast_SingleOccurrence) {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6};
    ASSERT_PAIR_OPTIONAL_EQUAL({2, 2}, findFirstAndLastOccurrence(nums, 3), "Target 3 single occurrence");
} END_TEST_CASE

TEST_CASE(testFindFirstLast_NotFound) {
    std::vector<int> nums = {1, 2, 3, 3, 3, 4, 5, 5, 6};
    ASSERT_PAIR_OPTIONAL_EQUAL({std::nullopt, std::nullopt}, findFirstAndLastOccurrence(nums, 0), "Target 0 not found");
    ASSERT_PAIR_OPTIONAL_EQUAL({std::nullopt, std::nullopt}, findFirstAndLastOccurrence(nums, 7), "Target 7 not found");
} END_TEST_CASE

TEST_CASE(testFindFirstLast_EdgeCases) {
    std::vector<int> empty = {};
    ASSERT_PAIR_OPTIONAL_EQUAL({std::nullopt, std::nullopt}, findFirstAndLastOccurrence(empty, 5), "Empty array");

    std::vector<int> single = {10};
    ASSERT_PAIR_OPTIONAL_EQUAL({0, 0}, findFirstAndLastOccurrence(single, 10), "Single element found");
    ASSERT_PAIR_OPTIONAL_EQUAL({std::nullopt, std::nullopt}, findFirstAndLastOccurrence(single, 5), "Single element not found");
} END_TEST_CASE

// --- Problem 3: Search in Rotated Sorted Array ---

TEST_CASE(testSearchRotated_Found) {
    std::vector<int> nums1 = {4, 5, 6, 7, 0, 1, 2};
    ASSERT_OPTIONAL_EQUAL(4, searchInRotatedSortedArray(nums1, 0), "Target 0 in rotated array {4,5,6,7,0,1,2}");
    ASSERT_OPTIONAL_EQUAL(0, searchInRotatedSortedArray(nums1, 4), "Target 4 in rotated array {4,5,6,7,0,1,2}");
    ASSERT_OPTIONAL_EQUAL(6, searchInRotatedSortedArray(nums1, 2), "Target 2 in rotated array {4,5,6,7,0,1,2}");
    ASSERT_OPTIONAL_EQUAL(2, searchInRotatedSortedArray(nums1, 6), "Target 6 in rotated array {4,5,6,7,0,1,2}");

    std::vector<int> nums2 = {1, 2, 3, 4, 5, 6, 7}; // Not rotated
    ASSERT_OPTIONAL_EQUAL(3, searchInRotatedSortedArray(nums2, 4), "Target 4 in sorted array {1,2,3,4,5,6,7}");

    std::vector<int> nums3 = {3, 1, 2}; // Small rotated
    ASSERT_OPTIONAL_EQUAL(0, searchInRotatedSortedArray(nums3, 3), "Target 3 in rotated array {3,1,2}");
    ASSERT_OPTIONAL_EQUAL(1, searchInRotatedSortedArray(nums3, 1), "Target 1 in rotated array {3,1,2}");
    ASSERT_OPTIONAL_EQUAL(2, searchInRotatedSortedArray(nums3, 2), "Target 2 in rotated array {3,1,2}");
} END_TEST_CASE

TEST_CASE(testSearchRotated_NotFound) {
    std::vector<int> nums1 = {4, 5, 6, 7, 0, 1, 2};
    ASSERT_OPTIONAL_EQUAL(std::nullopt, searchInRotatedSortedArray(nums1, 3), "Target 3 not found in rotated array");
    ASSERT_OPTIONAL_EQUAL(std::nullopt, searchInRotatedSortedArray(nums1, 8), "Target 8 not found in rotated array");
} END_TEST_CASE

TEST_CASE(testSearchRotated_EdgeCases) {
    std::vector<int> empty = {};
    ASSERT_OPTIONAL_EQUAL(std::nullopt, searchInRotatedSortedArray(empty, 5), "Empty array");

    std::vector<int> single = {10};
    ASSERT_OPTIONAL_EQUAL(0, searchInRotatedSortedArray(single, 10), "Single element array - found");
    ASSERT_OPTIONAL_EQUAL(std::nullopt, searchInRotatedSortedArray(single, 5), "Single element array - not found");

    std::vector<int> two_elements_rotated = {2, 1};
    ASSERT_OPTIONAL_EQUAL(0, searchInRotatedSortedArray(two_elements_rotated, 2), "Two elements rotated - 2");
    ASSERT_OPTIONAL_EQUAL(1, searchInRotatedSortedArray(two_elements_rotated, 1), "Two elements rotated - 1");
    ASSERT_OPTIONAL_EQUAL(std::nullopt, searchInRotatedSortedArray(two_elements_rotated, 3), "Two elements rotated - not found");
} END_TEST_CASE

// --- Problem 4: Find Peak Element ---

TEST_CASE(testFindPeakElement_GeneralCases) {
    std::vector<int> nums1 = {1, 2, 3, 1}; // Peak is 3
    ASSERT_OPTIONAL_EQUAL(2, findPeakElement(nums1), "Peak in {1,2,3,1} should be 3 at index 2");

    std::vector<int> nums2 = {1, 2, 1, 3, 5, 6, 4}; // Peaks are 2 (idx 1), 6 (idx 5). Any is fine.
    std::optional<int> peak2 = findPeakElement(nums2);
    ASSERT_TRUE(peak2.has_value() && (peak2.value() == 1 || peak2.value() == 5), "Peak in {1,2,1,3,5,6,4} should be 2 or 6");

    std::vector<int> nums3 = {1, 5, 4}; // Peak is 5
    ASSERT_OPTIONAL_EQUAL(1, findPeakElement(nums3), "Peak in {1,5,4} should be 5 at index 1");

    std::vector<int> nums4 = {3, 2, 1}; // Peak is 3 (first element)
    ASSERT_OPTIONAL_EQUAL(0, findPeakElement(nums4), "Peak in {3,2,1} should be 3 at index 0");

    std::vector<int> nums5 = {1, 2, 3}; // Peak is 3 (last element)
    ASSERT_OPTIONAL_EQUAL(2, findPeakElement(nums5), "Peak in {1,2,3} should be 3 at index 2");
} END_TEST_CASE

TEST_CASE(testFindPeakElement_EdgeCases) {
    std::vector<int> empty = {};
    ASSERT_OPTIONAL_EQUAL(std::nullopt, findPeakElement(empty), "Empty array should have no peak");

    std::vector<int> single = {5};
    ASSERT_OPTIONAL_EQUAL(0, findPeakElement(single), "Single element array peak is index 0");

    std::vector<int> two_elements = {1, 2}; // Peak is 2
    ASSERT_OPTIONAL_EQUAL(1, findPeakElement(two_elements), "Peak in {1,2} should be 2 at index 1");

    std::vector<int> two_elements_desc = {2, 1}; // Peak is 2
    ASSERT_OPTIONAL_EQUAL(0, findPeakElement(two_elements_desc), "Peak in {2,1} should be 2 at index 0");
} END_TEST_CASE

// --- Problem 5: Sqrt(x) - Integer Square Root ---

TEST_CASE(testMySqrt_PerfectSquares) {
    ASSERT_EQUAL(0, mySqrt(0), "sqrt(0) should be 0");
    ASSERT_EQUAL(1, mySqrt(1), "sqrt(1) should be 1");
    ASSERT_EQUAL(2, mySqrt(4), "sqrt(4) should be 2");
    ASSERT_EQUAL(3, mySqrt(9), "sqrt(9) should be 3");
    ASSERT_EQUAL(10, mySqrt(100), "sqrt(100) should be 10");
    ASSERT_EQUAL(46340, mySqrt(2147395600), "sqrt(2147395600) should be 46340"); // Near max int value
} END_TEST_CASE

TEST_CASE(testMySqrt_ImPerfectSquares) {
    ASSERT_EQUAL(2, mySqrt(8), "sqrt(8) should be 2 (trunc)");
    ASSERT_EQUAL(1, mySqrt(2), "sqrt(2) should be 1 (trunc)");
    ASSERT_EQUAL(1, mySqrt(3), "sqrt(3) should be 1 (trunc)");
    ASSERT_EQUAL(7, mySqrt(49), "sqrt(49) should be 7");
    ASSERT_EQUAL(7, mySqrt(50), "sqrt(50) should be 7");
} END_TEST_CASE

TEST_CASE(testMySqrt_LargeValues) {
    ASSERT_EQUAL(30000, mySqrt(900000000), "sqrt(900000000) should be 30000");
    ASSERT_EQUAL(46340, mySqrt(2147483647), "sqrt(MAX_INT) should be 46340"); // MAX_INT is 2^31 - 1
} END_TEST_CASE

RUN_ALL_TESTS(
    testIterativeBinarySearch_Found,
    testIterativeBinarySearch_NotFound,
    testIterativeBinarySearch_EdgeCases,
    testRecursiveBinarySearch_Found,
    testRecursiveBinarySearch_NotFound,
    testFindFirstLast_Found,
    testFindFirstLast_SingleOccurrence,
    testFindFirstLast_NotFound,
    testFindFirstLast_EdgeCases,
    testSearchRotated_Found,
    testSearchRotated_NotFound,
    testSearchRotated_EdgeCases,
    testFindPeakElement_GeneralCases,
    testFindPeakElement_EdgeCases,
    testMySqrt_PerfectSquares,
    testMySqrt_ImPerfectSquares,
    testMySqrt_LargeValues
)
```