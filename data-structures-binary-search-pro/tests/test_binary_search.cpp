#include "test_utils.h"
#include "binary_search_problems.h"
#include "brute_force_solutions.h"
#include <vector>
#include <iostream>

// Helper to wrap different search functions for testing
void testSearchFunction(TestRunner& runner, const std::string& func_name, int (*search_func)(const std::vector<int>&, int)) {
    // Empty array
    runner.assert_equals(-1, search_func({}, 5), func_name + ": Empty array");

    // Single element array
    runner.assert_equals(0, search_func({10}, 10), func_name + ": Single element found");
    runner.assert_equals(-1, search_func({10}, 5), func_name + ": Single element not found");

    // General cases
    std::vector<int> nums = {1, 3, 5, 7, 9, 11, 13, 15};
    runner.assert_equals(0, search_func(nums, 1), func_name + ": Target at beginning");
    runner.assert_equals(7, search_func(nums, 15), func_name + ": Target at end");
    runner.assert_equals(3, search_func(nums, 7), func_name + ": Target in middle");
    runner.assert_equals(-1, search_func(nums, 0), func_name + ": Target less than min");
    runner.assert_equals(-1, search_func(nums, 16), func_name + ": Target greater than max");
    runner.assert_equals(-1, search_func(nums, 6), func_name + ": Target not found (between elements)");

    // Array with duplicates (should find any occurrence for standard search)
    std::vector<int> duplicates = {1, 3, 3, 5, 5, 5, 7};
    runner.assert_equals(1, search_func(duplicates, 3), func_name + ": Duplicates (any 3)"); // Could be 1 or 2
    runner.assert_equals(3, search_func(duplicates, 5), func_name + ": Duplicates (any 5)"); // Could be 3, 4, or 5
    runner.assert_equals(-1, search_func(duplicates, 4), func_name + ": Duplicates (not found)");
}

void testStandardBinarySearch(TestRunner& runner) {
    testSearchFunction(runner, "BS_Iterative", BinarySearch::searchIterative);
    testSearchFunction(runner, "BS_Recursive", BinarySearch::searchRecursive);
    testSearchFunction(runner, "BruteForce_Linear", BruteForce::linearSearch);
}

void testFirstLastOccurrence(TestRunner& runner) {
    std::vector<int> nums = {1, 2, 3, 3, 3, 4, 5, 5, 6};

    // First Occurrence
    runner.assert_equals(-1, BinarySearch::findFirstOccurrence({}, 3), "FirstOccurrence: Empty array");
    runner.assert_equals(-1, BinarySearch::findFirstOccurrence({10}, 5), "FirstOccurrence: Single not found");
    runner.assert_equals(0, BinarySearch::findFirstOccurrence({10}, 10), "FirstOccurrence: Single found");

    runner.assert_equals(0, BinarySearch::findFirstOccurrence(nums, 1), "FirstOccurrence: Target 1 (start)");
    runner.assert_equals(2, BinarySearch::findFirstOccurrence(nums, 3), "FirstOccurrence: Target 3");
    runner.assert_equals(6, BinarySearch::findFirstOccurrence(nums, 5), "FirstOccurrence: Target 5");
    runner.assert_equals(8, BinarySearch::findFirstOccurrence(nums, 6), "FirstOccurrence: Target 6 (end)");
    runner.assert_equals(-1, BinarySearch::findFirstOccurrence(nums, 0), "FirstOccurrence: Target 0 (too small)");
    runner.assert_equals(-1, BinarySearch::findFirstOccurrence(nums, 7), "FirstOccurrence: Target 7 (too large)");
    runner.assert_equals(-1, BinarySearch::findFirstOccurrence(nums, 20), "FirstOccurrence: Target 20 (not found)");
    runner.assert_equals(-1, BinarySearch::findFirstOccurrence(nums, 0), "FirstOccurrence: Target 0 (not found)");

    // Last Occurrence
    runner.assert_equals(-1, BinarySearch::findLastOccurrence({}, 3), "LastOccurrence: Empty array");
    runner.assert_equals(-1, BinarySearch::findLastOccurrence({10}, 5), "LastOccurrence: Single not found");
    runner.assert_equals(0, BinarySearch::findLastOccurrence({10}, 10), "LastOccurrence: Single found");

    runner.assert_equals(0, BinarySearch::findLastOccurrence(nums, 1), "LastOccurrence: Target 1 (start)");
    runner.assert_equals(4, BinarySearch::findLastOccurrence(nums, 3), "LastOccurrence: Target 3");
    runner.assert_equals(7, BinarySearch::findLastOccurrence(nums, 5), "LastOccurrence: Target 5");
    runner.assert_equals(8, BinarySearch::findLastOccurrence(nums, 6), "LastOccurrence: Target 6 (end)");
    runner.assert_equals(-1, BinarySearch::findLastOccurrence(nums, 0), "LastOccurrence: Target 0 (too small)");
    runner.assert_equals(-1, BinarySearch::findLastOccurrence(nums, 7), "LastOccurrence: Target 7 (too large)");
    runner.assert_equals(-1, BinarySearch::findLastOccurrence(nums, 20), "LastOccurrence: Target 20 (not found)");
    runner.assert_equals(-1, BinarySearch::findLastOccurrence(nums, 0), "LastOccurrence: Target 0 (not found)");
}

void testSearchRotatedSortedArray(TestRunner& runner) {
    // Normal cases
    std::vector<int> nums1 = {4, 5, 6, 7, 0, 1, 2};
    runner.assert_equals(4, BinarySearch::searchRotatedSortedArray(nums1, 0), "Rotated: Target 0 found");
    runner.assert_equals(6, BinarySearch::searchRotatedSortedArray(nums1, 2), "Rotated: Target 2 found");
    runner.assert_equals(0, BinarySearch::searchRotatedSortedArray(nums1, 4), "Rotated: Target 4 found");
    runner.assert_equals(-1, BinarySearch::searchRotatedSortedArray(nums1, 3), "Rotated: Target 3 not found");
    runner.assert_equals(-1, BinarySearch::searchRotatedSortedArray(nums1, 8), "Rotated: Target 8 not found");

    // No rotation
    std::vector<int> nums2 = {0, 1, 2, 4, 5, 6, 7};
    runner.assert_equals(0, BinarySearch::searchRotatedSortedArray(nums2, 0), "Rotated: No rotation, Target 0 found");
    runner.assert_equals(3, BinarySearch::searchRotatedSortedArray(nums2, 4), "Rotated: No rotation, Target 4 found");

    // Small arrays
    runner.assert_equals(0, BinarySearch::searchRotatedSortedArray({1}, 1), "Rotated: Single element found");
    runner.assert_equals(-1, BinarySearch::searchRotatedSortedArray({1}, 0), "Rotated: Single element not found");
    runner.assert_equals(-1, BinarySearch::searchRotatedSortedArray({}, 5), "Rotated: Empty array");
    runner.assert_equals(0, BinarySearch::searchRotatedSortedArray({3,1}, 3), "Rotated: 2 elements, first");
    runner.assert_equals(1, BinarySearch::searchRotatedSortedArray({3,1}, 1), "Rotated: 2 elements, second");
    runner.assert_equals(-1, BinarySearch::searchRotatedSortedArray({3,1}, 2), "Rotated: 2 elements, not found");

    // Larger array with more complex rotation
    std::vector<int> nums3 = {6, 7, 8, 9, 10, 0, 1, 2, 3, 4, 5};
    runner.assert_equals(5, BinarySearch::searchRotatedSortedArray(nums3, 0), "Rotated: Large array, Target 0");
    runner.assert_equals(9, BinarySearch::searchRotatedSortedArray(nums3, 4), "Rotated: Large array, Target 4");
    runner.assert_equals(4, BinarySearch::searchRotatedSortedArray(nums3, 10), "Rotated: Large array, Target 10");
    runner.assert_equals(-1, BinarySearch::searchRotatedSortedArray(nums3, 11), "Rotated: Large array, Target 11 not found");

    // Test with brute force for comparison
    runner.assert_equals(4, BruteForce::linearSearchRotated(nums1, 0), "BruteForce_Rotated: Target 0 found");
    runner.assert_equals(0, BruteForce::linearSearchRotated(nums2, 0), "BruteForce_Rotated: No rotation, Target 0 found");
    runner.assert_equals(-1, BruteForce::linearSearchRotated(nums1, 3), "BruteForce_Rotated: Target 3 not found");
}

void testMySqrt(TestRunner& runner) {
    runner.assert_equals(0LL, BinarySearch::mySqrt(0), "mySqrt: 0");
    runner.assert_equals(1LL, BinarySearch::mySqrt(1), "mySqrt: 1");
    runner.assert_equals(1LL, BinarySearch::mySqrt(2), "mySqrt: 2");
    runner.assert_equals(2LL, BinarySearch::mySqrt(4), "mySqrt: 4");
    runner.assert_equals(2LL, BinarySearch::mySqrt(8), "mySqrt: 8");
    runner.assert_equals(3LL, BinarySearch::mySqrt(9), "mySqrt: 9");
    runner.assert_equals(4LL, BinarySearch::mySqrt(16), "mySqrt: 16");
    runner.assert_equals(4LL, BinarySearch::mySqrt(17), "mySqrt: 17");
    runner.assert_equals(46340LL, BinarySearch::mySqrt(2147483647), "mySqrt: INT_MAX"); // Largest int for 32-bit

    // Test with brute force
    runner.assert_equals(46340LL, BruteForce::mySqrtLinear(2147483647), "mySqrtLinear: INT_MAX");
    runner.assert_equals(0LL, BruteForce::mySqrtLinear(0), "mySqrtLinear: 0");
    runner.assert_equals(2LL, BruteForce::mySqrtLinear(8), "mySqrtLinear: 8");
}

void testKthSmallestInTwoSortedArrays(TestRunner& runner) {
    std::vector<int> nums1_1 = {1, 3};
    std::vector<int> nums1_2 = {2};
    runner.assert_equals(1, BinarySearch::findKthSmallestInTwoSortedArrays(nums1_1, nums1_2, 1), "KthSmallest: Case 1, k=1");
    runner.assert_equals(2, BinarySearch::findKthSmallestInTwoSortedArrays(nums1_1, nums1_2, 2), "KthSmallest: Case 1, k=2");
    runner.assert_equals(3, BinarySearch::findKthSmallestInTwoSortedArrays(nums1_1, nums1_2, 3), "KthSmallest: Case 1, k=3");

    std::vector<int> nums2_1 = {1, 2};
    std::vector<int> nums2_2 = {3, 4};
    runner.assert_equals(1, BinarySearch::findKthSmallestInTwoSortedArrays(nums2_1, nums2_2, 1), "KthSmallest: Case 2, k=1");
    runner.assert_equals(2, BinarySearch::findKthSmallestInTwoSortedArrays(nums2_1, nums2_2, 2), "KthSmallest: Case 2, k=2");
    runner.assert_equals(3, BinarySearch::findKthSmallestInTwoSortedArrays(nums2_1, nums2_2, 3), "KthSmallest: Case 2, k=3");
    runner.assert_equals(4, BinarySearch::findKthSmallestInTwoSortedArrays(nums2_1, nums2_2, 4), "KthSmallest: Case 2, k=4");

    std::vector<int> nums3_1 = {1, 3, 5, 7, 9};
    std::vector<int> nums3_2 = {2, 4, 6, 8, 10};
    runner.assert_equals(1, BinarySearch::findKthSmallestInTwoSortedArrays(nums3_1, nums3_2, 1), "KthSmallest: Case 3, k=1");
    runner.assert_equals(5, BinarySearch::findKthSmallestInTwoSortedArrays(nums3_1, nums3_2, 5), "KthSmallest: Case 3, k=5");
    runner.assert_equals(10, BinarySearch::findKthSmallestInTwoSortedArrays(nums3_1, nums3_2, 10), "KthSmallest: Case 3, k=10");
    runner.assert_equals(6, BinarySearch::findKthSmallestInTwoSortedArrays(nums3_1, nums3_2, 6), "KthSmallest: Case 3, k=6");

    // Empty arrays
    runner.assert_equals(5, BinarySearch::findKthSmallestInTwoSortedArrays({}, {5, 6, 7}, 1), "KthSmallest: Nums1 empty, k=1");
    runner.assert_equals(7, BinarySearch::findKthSmallestInTwoSortedArrays({}, {5, 6, 7}, 3), "KthSmallest: Nums1 empty, k=3");
    runner.assert_equals(5, BinarySearch::findKthSmallestInTwoSortedArrays({5, 6, 7}, {}, 1), "KthSmallest: Nums2 empty, k=1");

    // K out of bounds (should ideally be handled at call site, or return specific error)
    // Current implementation for out-of-bounds k could lead to infinite loop or array access error
    // if not handled properly in the calling function.
    // For now, assume valid k inputs as per typical interview problem constraints.

    // Test with brute force
    runner.assert_equals(2, BruteForce::findKthSmallestInTwoSortedArraysMerge(nums1_1, nums1_2, 2), "BruteForce_KthSmallest: Case 1, k=2");
    runner.assert_equals(5, BruteForce::findKthSmallestInTwoSortedArraysMerge(nums3_1, nums3_2, 5), "BruteForce_KthSmallest: Case 3, k=5");
    runner.assert_equals(7, BruteForce::findKthSmallestInTwoSortedArraysMerge({}, {5, 6, 7}, 3), "BruteForce_KthSmallest: Nums1 empty, k=3");
}

int main() {
    TestRunner runner;

    runner.run_suite("Standard Binary Search", testStandardBinarySearch);
    runner.run_suite("First and Last Occurrence", testFirstLastOccurrence);
    runner.run_suite("Search in Rotated Sorted Array", testSearchRotatedSortedArray);
    runner.run_suite("Integer Square Root", testMySqrt);
    runner.run_suite("Kth Smallest in Two Sorted Arrays", testKthSmallestInTwoSortedArrays);

    runner.print_results();

    return runner.failed_tests == 0 ? 0 : 1;
}
---