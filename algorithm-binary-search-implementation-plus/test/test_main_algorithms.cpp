#include "../src/utils.h"
#include "../src/main_algorithms.cpp" // Include .cpp directly for simpler compilation in test context
                                      // In a larger project, you'd typically include a header with function declarations
#include <iostream>
#include <cassert> // For assert()
#include <vector>
#include <string>

// Helper for assertion messages
#define ASSERT_EQ(actual, expected, message) \
    if ((actual) != (expected)) { \
        std::cerr << "FAILED: " << message << "\n" \
                  << "  Actual: " << (actual) << ", Expected: " << (expected) << std::endl; \
        exit(EXIT_FAILURE); \
    } else { \
        std::cout << "PASSED: " << message << std::endl; \
    }

void testBinarySearchIterative() {
    std::cout << "\n--- Testing binarySearchIterative ---" << std::endl;
    std::vector<int> arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    printVector(arr, "Array: ");

    ASSERT_EQ(binarySearchIterative(arr, 1), 0, "Target 1 (first element)");
    ASSERT_EQ(binarySearchIterative(arr, 19), 9, "Target 19 (last element)");
    ASSERT_EQ(binarySearchIterative(arr, 7), 3, "Target 7 (middle)");
    ASSERT_EQ(binarySearchIterative(arr, 10), -1, "Target 10 (not found)");
    ASSERT_EQ(binarySearchIterative(arr, 0), -1, "Target 0 (before range)");
    ASSERT_EQ(binarySearchIterative(arr, 20), -1, "Target 20 (after range)");

    std::vector<int> empty_arr = {};
    ASSERT_EQ(binarySearchIterative(empty_arr, 5), -1, "Empty array");

    std::vector<int> single_arr = {42};
    ASSERT_EQ(binarySearchIterative(single_arr, 42), 0, "Single element array, found");
    ASSERT_EQ(binarySearchIterative(single_arr, 100), -1, "Single element array, not found");

    std::cout << "All binarySearchIterative tests passed!" << std::endl;
}

void testBinarySearchRecursive() {
    std::cout << "\n--- Testing binarySearchRecursiveWrapper ---" << std::endl;
    std::vector<int> arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    printVector(arr, "Array: ");

    ASSERT_EQ(binarySearchRecursiveWrapper(arr, 1), 0, "Target 1 (first element)");
    ASSERT_EQ(binarySearchRecursiveWrapper(arr, 19), 9, "Target 19 (last element)");
    ASSERT_EQ(binarySearchRecursiveWrapper(arr, 7), 3, "Target 7 (middle)");
    ASSERT_EQ(binarySearchRecursiveWrapper(arr, 10), -1, "Target 10 (not found)");
    ASSERT_EQ(binarySearchRecursiveWrapper(arr, 0), -1, "Target 0 (before range)");
    ASSERT_EQ(binarySearchRecursiveWrapper(arr, 20), -1, "Target 20 (after range)");

    std::vector<int> empty_arr = {};
    ASSERT_EQ(binarySearchRecursiveWrapper(empty_arr, 5), -1, "Empty array");

    std::vector<int> single_arr = {42};
    ASSERT_EQ(binarySearchRecursiveWrapper(single_arr, 42), 0, "Single element array, found");
    ASSERT_EQ(binarySearchRecursiveWrapper(single_arr, 100), -1, "Single element array, not found");

    std::cout << "All binarySearchRecursiveWrapper tests passed!" << std::endl;
}

void testFindFirstLastOccurrence() {
    std::cout << "\n--- Testing findFirstOccurrence & findLastOccurrence ---" << std::endl;
    std::vector<int> arr = {1, 2, 3, 3, 3, 4, 5, 5, 6, 7, 7, 7, 7, 8};
    printVector(arr, "Array: ");

    // Target with multiple occurrences
    ASSERT_EQ(findFirstOccurrence(arr, 3), 2, "First occurrence of 3");
    ASSERT_EQ(findLastOccurrence(arr, 3), 4, "Last occurrence of 3");
    ASSERT_EQ(findFirstOccurrence(arr, 7), 9, "First occurrence of 7");
    ASSERT_EQ(findLastOccurrence(arr, 7), 12, "Last occurrence of 7");

    // Target with single occurrence
    ASSERT_EQ(findFirstOccurrence(arr, 1), 0, "First occurrence of 1");
    ASSERT_EQ(findLastOccurrence(arr, 1), 0, "Last occurrence of 1");
    ASSERT_EQ(findFirstOccurrence(arr, 6), 8, "First occurrence of 6");
    ASSERT_EQ(findLastOccurrence(arr, 6), 8, "Last occurrence of 6");

    // Target not found
    ASSERT_EQ(findFirstOccurrence(arr, 0), -1, "Target 0 (not found)");
    ASSERT_EQ(findLastOccurrence(arr, 0), -1, "Target 0 (not found)");
    ASSERT_EQ(findFirstOccurrence(arr, 9), -1, "Target 9 (not found)");
    ASSERT_EQ(findLastOccurrence(arr, 9), -1, "Target 9 (not found)");

    // Empty array
    std::vector<int> empty_arr = {};
    ASSERT_EQ(findFirstOccurrence(empty_arr, 5), -1, "Empty array (first)");
    ASSERT_EQ(findLastOccurrence(empty_arr, 5), -1, "Empty array (last)");

    // Single element array
    std::vector<int> single_arr = {10};
    ASSERT_EQ(findFirstOccurrence(single_arr, 10), 0, "Single element (first)");
    ASSERT_EQ(findLastOccurrence(single_arr, 10), 0, "Single element (last)");
    ASSERT_EQ(findFirstOccurrence(single_arr, 5), -1, "Single element not found (first)");
    ASSERT_EQ(findLastOccurrence(single_arr, 5), -1, "Single element not found (last)");

    std::cout << "All findFirstOccurrence & findLastOccurrence tests passed!" << std::endl;
}

void testSearchInRotatedSortedArray() {
    std::cout << "\n--- Testing searchInRotatedSortedArray ---" << std::endl;

    std::vector<int> arr1 = {4, 5, 6, 7, 0, 1, 2}; // Pivot at 0
    printVector(arr1, "Array 1: ");
    ASSERT_EQ(searchInRotatedSortedArray(arr1, 0), 4, "Target 0");
    ASSERT_EQ(searchInRotatedSortedArray(arr1, 5), 1, "Target 5");
    ASSERT_EQ(searchInRotatedSortedArray(arr1, 2), 6, "Target 2");
    ASSERT_EQ(searchInRotatedSortedArray(arr1, 3), -1, "Target 3 (not found)");

    std::vector<int> arr2 = {1}; // Single element
    printVector(arr2, "Array 2: ");
    ASSERT_EQ(searchInRotatedSortedArray(arr2, 1), 0, "Target 1 (single element)");
    ASSERT_EQ(searchInRotatedSortedArray(arr2, 0), -1, "Target 0 (single element, not found)");

    std::vector<int> arr3 = {1, 2, 3, 4, 5}; // Not rotated
    printVector(arr3, "Array 3: ");
    ASSERT_EQ(searchInRotatedSortedArray(arr3, 3), 2, "Target 3 (not rotated)");
    ASSERT_EQ(searchInRotatedSortedArray(arr3, 0), -1, "Target 0 (not rotated, not found)");

    std::vector<int> arr4 = {3, 1}; // Two elements rotated
    printVector(arr4, "Array 4: ");
    ASSERT_EQ(searchInRotatedSortedArray(arr4, 1), 1, "Target 1 (two elements)");
    ASSERT_EQ(searchInRotatedSortedArray(arr4, 3), 0, "Target 3 (two elements)");

    std::vector<int> empty_arr = {};
    ASSERT_EQ(searchInRotatedSortedArray(empty_arr, 5), -1, "Empty array");

    // Larger, random array
    for (int i = 0; i < 10; ++i) {
        std::vector<int> random_rotated = generateRandomRotatedSortedVector(50, -100, 100);
        int target = random_rotated.empty() ? -1 : random_rotated[std::uniform_int_distribution<>(0, random_rotated.size() - 1)(std::mt19937(std::random_device()()))];
        int expected_idx = -1;
        for (size_t j = 0; j < random_rotated.size(); ++j) {
            if (random_rotated[j] == target) {
                expected_idx = j;
                break;
            }
        }
        int actual_idx = searchInRotatedSortedArray(random_rotated, target);
        std::string msg = "Random rotated array (size 50) target " + std::to_string(target) + " found at ";
        ASSERT_EQ(actual_idx, expected_idx, msg);
    }
    std::cout << "All searchInRotatedSortedArray tests passed!" << std::endl;
}

void testFindMinInRotatedSortedArray() {
    std::cout << "\n--- Testing findMinInRotatedSortedArray ---" << std::endl;

    std::vector<int> arr1 = {4, 5, 6, 7, 0, 1, 2}; // Standard rotation
    printVector(arr1, "Array 1: ");
    ASSERT_EQ(findMinInRotatedSortedArray(arr1), 0, "Min in {4,5,6,7,0,1,2}");
    ASSERT_EQ(findMinInRotatedSortedArray_V2(arr1), 0, "Min (V2) in {4,5,6,7,0,1,2}");


    std::vector<int> arr2 = {3, 1, 2}; // Small rotation
    printVector(arr2, "Array 2: ");
    ASSERT_EQ(findMinInRotatedSortedArray(arr2), 1, "Min in {3,1,2}");
    ASSERT_EQ(findMinInRotatedSortedArray_V2(arr2), 1, "Min (V2) in {3,1,2}");


    std::vector<int> arr3 = {1, 2, 3, 4, 5}; // Not rotated
    printVector(arr3, "Array 3: ");
    ASSERT_EQ(findMinInRotatedSortedArray(arr3), 1, "Min in {1,2,3,4,5}");
    ASSERT_EQ(findMinInRotatedSortedArray_V2(arr3), 1, "Min (V2) in {1,2,3,4,5}");


    std::vector<int> arr4 = {1}; // Single element
    printVector(arr4, "Array 4: ");
    ASSERT_EQ(findMinInRotatedSortedArray(arr4), 1, "Min in {1}");
    ASSERT_EQ(findMinInRotatedSortedArray_V2(arr4), 1, "Min (V2) in {1}");


    std::vector<int> arr5 = {2, 1}; // Two elements rotated
    printVector(arr5, "Array 5: ");
    ASSERT_EQ(findMinInRotatedSortedArray(arr5), 1, "Min in {2,1}");
    ASSERT_EQ(findMinInRotatedSortedArray_V2(arr5), 1, "Min (V2) in {2,1}");


    std::vector<int> arr6 = {10, 20, 30, 4, 5, 6, 7, 8, 9}; // Larger set
    printVector(arr6, "Array 6: ");
    ASSERT_EQ(findMinInRotatedSortedArray(arr6), 4, "Min in {10,20,30,4,5,6,7,8,9}");
    ASSERT_EQ(findMinInRotatedSortedArray_V2(arr6), 4, "Min (V2) in {10,20,30,4,5,6,7,8,9}");


    std::vector<int> arr7 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}; // Already sorted
    printVector(arr7, "Array 7: ");
    ASSERT_EQ(findMinInRotatedSortedArray(arr7), 1, "Min in {1,2,...12}");
    ASSERT_EQ(findMinInRotatedSortedArray_V2(arr7), 1, "Min (V2) in {1,2,...12}");

    // Test with all duplicate values if allowed by generation (or construct manually)
    // std::vector<int> arr_dup = {3,3,1,3}; // This case is slightly different for original problem, assuming no duplicates.
                                        // But if duplicates are allowed, the problem becomes harder.
                                        // Our current solution works correctly assuming no duplicates.
                                        // For duplicates, if arr[low] == arr[mid] == arr[high], we might need to increment low and decrement high.
    // For general case: `findMinInRotatedSortedArray` generally assumes unique elements for O(logN).
    // The V2 version handles duplicates slightly better if `arr[low] == arr[mid] == arr[high]` by simply moving `low` or `high` and comparing `min_val`.
    std::vector<int> arr_dup = {1,1,1,1,1,0,1,1}; // Specific case with duplicates that could confuse
    printVector(arr_dup, "Array with Duplicates: ");
    ASSERT_EQ(findMinInRotatedSortedArray(arr_dup), 0, "Min in {1,1,1,1,1,0,1,1}"); // My V1 handles it due to local check for mid, mid+1.
    ASSERT_EQ(findMinInRotatedSortedArray_V2(arr_dup), 0, "Min (V2) in {1,1,1,1,1,0,1,1}"); // V2 handles it correctly.


    std::cout << "All findMinInRotatedSortedArray tests passed!" << std::endl;
}

void testMySqrt() {
    std::cout << "\n--- Testing mySqrt ---" << std::endl;

    ASSERT_EQ(mySqrt(0), 0, "sqrt(0)");
    ASSERT_EQ(mySqrt(1), 1, "sqrt(1)");
    ASSERT_EQ(mySqrt(2), 1, "sqrt(2)");
    ASSERT_EQ(mySqrt(3), 1, "sqrt(3)");
    ASSERT_EQ(mySqrt(4), 2, "sqrt(4)");
    ASSERT_EQ(mySqrt(8), 2, "sqrt(8)");
    ASSERT_EQ(mySqrt(9), 3, "sqrt(9)");
    ASSERT_EQ(mySqrt(16), 4, "sqrt(16)");
    ASSERT_EQ(mySqrt(2147395600), 46340, "sqrt(2147395600)"); // Max int square root is 46340
    ASSERT_EQ(mySqrt(2147483647), 46340, "sqrt(INT_MAX)"); // Max int itself

    // Test a custom large number that results in a perfect square
    ASSERT_EQ(mySqrt(46340 * 46340), 46340, "sqrt(46340*46340)");


    std::cout << "All mySqrt tests passed!" << std::endl;
}


int main() {
    std::cout << "=== Running All Binary Search Tests ===" << std::endl;

    testBinarySearchIterative();
    testBinarySearchRecursive();
    testFindFirstLastOccurrence();
    testSearchInRotatedSortedArray();
    testFindMinInRotatedSortedArray();
    testMySqrt();

    std::cout << "\n=== All Binary Search Tests PASSED! ===" << std::endl;
    return 0;
}