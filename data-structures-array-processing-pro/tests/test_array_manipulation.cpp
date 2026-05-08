#include "../src/array_manipulation.hpp"
#include "../src/utils.hpp"
#include <iostream>
#include <vector>
#include <string>

// Global counters for test results
int test_passed_count = 0;
int test_failed_count = 0;

void runTest(const std::string& test_name, std::function<void()> test_func) {
    int initial_passed = test_passed_count;
    int initial_failed = test_failed_count;

    std::cout << "Running test: " << test_name << "..." << std::endl;
    test_func();

    if (test_failed_count == initial_failed) {
        std::cout << "  Passed: " << (test_passed_count - initial_passed) << " assertions." << std::endl;
    } else {
        std::cout << "  Failed: " << (test_failed_count - initial_failed) << " assertions." << std::endl;
    }
    std::cout << std::endl;
}

// --- Test Cases for Rotate Array ---
void testRotateArray() {
    // Brute Force
    {
        std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
        std::vector<int> expected = {5, 6, 7, 1, 2, 3, 4};
        RotateArray::rotateBruteForce(nums, 3);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateBruteForce - Basic test k=3");
    }
    {
        std::vector<int> nums = {-1, -100, 3, 99};
        std::vector<int> expected = {3, 99, -1, -100};
        RotateArray::rotateBruteForce(nums, 2);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateBruteForce - Negative numbers k=2");
    }
    {
        std::vector<int> nums = {1, 2};
        std::vector<int> expected = {2, 1};
        RotateArray::rotateBruteForce(nums, 1);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateBruteForce - Small array k=1");
    }
    {
        std::vector<int> nums = {1, 2, 3};
        std::vector<int> expected = {1, 2, 3};
        RotateArray::rotateBruteForce(nums, 0);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateBruteForce - k=0");
    }
    {
        std::vector<int> nums = {1, 2, 3};
        std::vector<int> expected = {1, 2, 3};
        RotateArray::rotateBruteForce(nums, 3); // k = n
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateBruteForce - k=n");
    }
    {
        std::vector<int> nums = {1, 2, 3};
        std::vector<int> expected = {2, 3, 1};
        RotateArray::rotateBruteForce(nums, 4); // k > n
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateBruteForce - k>n");
    }
    {
        std::vector<int> nums = {1};
        std::vector<int> expected = {1};
        RotateArray::rotateBruteForce(nums, 5);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateBruteForce - Single element array");
    }
    {
        std::vector<int> nums = {};
        std::vector<int> expected = {};
        RotateArray::rotateBruteForce(nums, 3);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateBruteForce - Empty array");
    }


    // With Extra Space
    {
        std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
        std::vector<int> expected = {5, 6, 7, 1, 2, 3, 4};
        RotateArray::rotateWithExtraSpace(nums, 3);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateWithExtraSpace - Basic test k=3");
    }
    {
        std::vector<int> nums = {-1, -100, 3, 99};
        std::vector<int> expected = {3, 99, -1, -100};
        RotateArray::rotateWithExtraSpace(nums, 2);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateWithExtraSpace - Negative numbers k=2");
    }

    // Three Reversals
    {
        std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
        std::vector<int> expected = {5, 6, 7, 1, 2, 3, 4};
        RotateArray::rotateThreeReversals(nums, 3);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateThreeReversals - Basic test k=3");
    }
    {
        std::vector<int> nums = {-1, -100, 3, 99};
        std::vector<int> expected = {3, 99, -1, -100};
        RotateArray::rotateThreeReversals(nums, 2);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateThreeReversals - Negative numbers k=2");
    }
    {
        std::vector<int> nums = {1, 2, 3, 4, 5, 6};
        std::vector<int> expected = {4, 5, 6, 1, 2, 3};
        RotateArray::rotateThreeReversals(nums, 3);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateThreeReversals - k=N/2");
    }
    {
        std::vector<int> nums = {1, 2, 3, 4, 5, 6};
        std::vector<int> expected = {6, 1, 2, 3, 4, 5};
        RotateArray::rotateThreeReversals(nums, 1);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateThreeReversals - k=1");
    }
    {
        std::vector<int> nums = {1, 2, 3, 4, 5, 6};
        std::vector<int> expected = {2, 3, 4, 5, 6, 1}; // k=5 is equivalent to left rotate by 1
        RotateArray::rotateThreeReversals(nums, 5);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateThreeReversals - k=N-1");
    }
    {
        std::vector<int> nums = {1, 2, 3, 4, 5, 6};
        std::vector<int> expected = {1, 2, 3, 4, 5, 6};
        RotateArray::rotateThreeReversals(nums, 6); // k = N, no change
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateThreeReversals - k=N");
    }
    {
        std::vector<int> nums = {};
        std::vector<int> expected = {};
        RotateArray::rotateThreeReversals(nums, 3);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateThreeReversals - Empty array");
    }
    {
        std::vector<int> nums = {1};
        std::vector<int> expected = {1};
        RotateArray::rotateThreeReversals(nums, 3);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateThreeReversals - Single element array");
    }


    // Juggling Algorithm
    {
        std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
        std::vector<int> expected = {5, 6, 7, 1, 2, 3, 4};
        RotateArray::rotateJugglingAlgorithm(nums, 3);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateJugglingAlgorithm - Basic test k=3");
    }
    {
        std::vector<int> nums = {-1, -100, 3, 99};
        std::vector<int> expected = {3, 99, -1, -100};
        RotateArray::rotateJugglingAlgorithm(nums, 2);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateJugglingAlgorithm - Negative numbers k=2");
    }
    {
        std::vector<int> nums = {1, 2, 3, 4, 5, 6};
        std::vector<int> expected = {4, 5, 6, 1, 2, 3};
        RotateArray::rotateJugglingAlgorithm(nums, 3); // GCD(6,3)=3, 3 cycles
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateJugglingAlgorithm - k=N/2");
    }
    {
        std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
        std::vector<int> expected = {9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8};
        RotateArray::rotateJugglingAlgorithm(nums, 4); // GCD(12,4)=4, 4 cycles
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateJugglingAlgorithm - k=4, N=12");
    }
    {
        std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
        std::vector<int> expected = {10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        RotateArray::rotateJugglingAlgorithm(nums, 3); // GCD(12,3)=3, 3 cycles
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateJugglingAlgorithm - k=3, N=12");
    }
    {
        std::vector<int> nums = {1, 2, 3, 4, 5};
        std::vector<int> expected = {4, 5, 1, 2, 3};
        RotateArray::rotateJugglingAlgorithm(nums, 3); // GCD(5,3)=1, 1 cycle
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateJugglingAlgorithm - k=3, N=5 (GCD=1)");
    }
    {
        std::vector<int> nums = {1, 2, 3};
        std::vector<int> expected = {1, 2, 3};
        RotateArray::rotateJugglingAlgorithm(nums, 0);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateJugglingAlgorithm - k=0");
    }
    {
        std::vector<int> nums = {1, 2, 3};
        std::vector<int> expected = {1, 2, 3};
        RotateArray::rotateJugglingAlgorithm(nums, 3); // k = n
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateJugglingAlgorithm - k=n");
    }
    {
        std::vector<int> nums = {1, 2, 3};
        std::vector<int> expected = {2, 3, 1};
        RotateArray::rotateJugglingAlgorithm(nums, 4); // k > n
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateJugglingAlgorithm - k>n");
    }
    {
        std::vector<int> nums = {};
        std::vector<int> expected = {};
        RotateArray::rotateJugglingAlgorithm(nums, 3);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateJugglingAlgorithm - Empty array");
    }
    {
        std::vector<int> nums = {1};
        std::vector<int> expected = {1};
        RotateArray::rotateJugglingAlgorithm(nums, 3);
        ASSERT_VEC_EQ(nums, expected, "RotateArray::rotateJugglingAlgorithm - Single element array");
    }
}

// --- Test Cases for Product of Array Except Self ---
void testProductExceptSelf() {
    // With Division
    {
        std::vector<int> nums = {1, 2, 3, 4};
        std::vector<int> expected = {24, 12, 8, 6};
        std::vector<int> result = ProductExceptSelf::productExceptSelfWithDivision(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfWithDivision - Basic positive");
    }
    {
        std::vector<int> nums = {-1, 1, 0, -3, 3};
        std::vector<int> expected = {0, 0, 9, 0, 0};
        std::vector<int> result = ProductExceptSelf::productExceptSelfWithDivision(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfWithDivision - With one zero");
    }
    {
        std::vector<int> nums = {0, 0};
        std::vector<int> expected = {0, 0};
        std::vector<int> result = ProductExceptSelf::productExceptSelfWithDivision(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfWithDivision - With multiple zeros");
    }
    {
        std::vector<int> nums = {5};
        std::vector<int> expected = {1}; // Problem statement implies n > 1. If not, this is ambiguous.
                                          // Typically, for n=1, product except self is 1.
                                          // Given problem context, assume nums.size() > 1.
        std::vector<int> result = ProductExceptSelf::productExceptSelfWithDivision(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfWithDivision - Single element (edge case, usually n>1)");
    }
    {
        std::vector<int> nums = {2, 3};
        std::vector<int> expected = {3, 2};
        std::vector<int> result = ProductExceptSelf::productExceptSelfWithDivision(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfWithDivision - Two elements");
    }


    // Optimal (Prefix/Suffix)
    {
        std::vector<int> nums = {1, 2, 3, 4};
        std::vector<int> expected = {24, 12, 8, 6};
        std::vector<int> result = ProductExceptSelf::productExceptSelfOptimal(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfOptimal - Basic positive");
    }
    {
        std::vector<int> nums = {-1, 1, 0, -3, 3};
        std::vector<int> expected = {0, 0, 9, 0, 0};
        std::vector<int> result = ProductExceptSelf::productExceptSelfOptimal(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfOptimal - With one zero");
    }
    {
        std::vector<int> nums = {0, 0};
        std::vector<int> expected = {0, 0};
        std::vector<int> result = ProductExceptSelf::productExceptSelfOptimal(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfOptimal - With multiple zeros");
    }
    {
        std::vector<int> nums = {5};
        std::vector<int> expected = {1}; // Per problem statement interpretation for n=1
        std::vector<int> result = ProductExceptSelf::productExceptSelfOptimal(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfOptimal - Single element (edge case, usually n>1)");
    }
    {
        std::vector<int> nums = {2, 3};
        std::vector<int> expected = {3, 2};
        std::vector<int> result = ProductExceptSelf::productExceptSelfOptimal(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfOptimal - Two elements");
    }
    {
        std::vector<int> nums = {1, 0, 3};
        std::vector<int> expected = {0, 3, 0};
        std::vector<int> result = ProductExceptSelf::productExceptSelfOptimal(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfOptimal - Zero in middle");
    }
    {
        std::vector<int> nums = {0, 1, 2};
        std::vector<int> expected = {2, 0, 0};
        std::vector<int> result = ProductExceptSelf::productExceptSelfOptimal(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfOptimal - Zero at start");
    }
    {
        std::vector<int> nums = {1, 2, 0};
        std::vector<int> expected = {0, 0, 2};
        std::vector<int> result = ProductExceptSelf::productExceptSelfOptimal(nums);
        ASSERT_VEC_EQ(result, expected, "ProductExceptSelf::productExceptSelfOptimal - Zero at end");
    }
}

// --- Test Cases for Maximum Subarray Sum ---
void testMaxSubarray() {
    // Brute Force
    {
        std::vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        int expected = 6; // [4, -1, 2, 1]
        int result = MaxSubarray::maxSubArrayBruteForce(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayBruteForce - Basic test");
    }
    {
        std::vector<int> nums = {1};
        int expected = 1;
        int result = MaxSubarray::maxSubArrayBruteForce(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayBruteForce - Single element");
    }
    {
        std::vector<int> nums = {5, 4, -1, 7, 8};
        int expected = 23; // [5, 4, -1, 7, 8]
        int result = MaxSubarray::maxSubArrayBruteForce(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayBruteForce - All positive, increasing");
    }
    {
        std::vector<int> nums = {-2, -1};
        int expected = -1; // [-1]
        int result = MaxSubarray::maxSubArrayBruteForce(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayBruteForce - All negative");
    }
    {
        std::vector<int> nums = {-1, -2, -3, -4, -5};
        int expected = -1; // [-1]
        int result = MaxSubarray::maxSubArrayBruteForce(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayBruteForce - All negative, decreasing");
    }
    {
        std::vector<int> nums = {1, 2, -3, 4, -1, 2, -10, 5, 1};
        int expected = 6; // [4, -1, 2] or [5,1]
        int result = MaxSubarray::maxSubArrayBruteForce(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayBruteForce - Mixed values");
    }
    {
        std::vector<int> nums = {0};
        int expected = 0;
        int result = MaxSubarray::maxSubArrayBruteForce(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayBruteForce - Zero element");
    }
    {
        std::vector<int> nums = {0, -1, 0};
        int expected = 0;
        int result = MaxSubarray::maxSubArrayBruteForce(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayBruteForce - Zeros and negatives");
    }

    // Kadane's Algorithm
    {
        std::vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        int expected = 6; // [4, -1, 2, 1]
        int result = MaxSubarray::maxSubArrayKadane(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayKadane - Basic test");
    }
    {
        std::vector<int> nums = {1};
        int expected = 1;
        int result = MaxSubarray::maxSubArrayKadane(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayKadane - Single element");
    }
    {
        std::vector<int> nums = {5, 4, -1, 7, 8};
        int expected = 23; // [5, 4, -1, 7, 8]
        int result = MaxSubarray::maxSubArrayKadane(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayKadane - All positive, increasing");
    }
    {
        std::vector<int> nums = {-2, -1};
        int expected = -1; // [-1]
        int result = MaxSubarray::maxSubArrayKadane(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayKadane - All negative");
    }
    {
        std::vector<int> nums = {-1, -2, -3, -4, -5};
        int expected = -1; // [-1]
        int result = MaxSubarray::maxSubArrayKadane(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayKadane - All negative, decreasing");
    }
    {
        std::vector<int> nums = {1, 2, -3, 4, -1, 2, -10, 5, 1};
        int expected = 6; // [4, -1, 2] or [5,1]
        int result = MaxSubarray::maxSubArrayKadane(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayKadane - Mixed values");
    }
    {
        std::vector<int> nums = {0};
        int expected = 0;
        int result = MaxSubarray::maxSubArrayKadane(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayKadane - Zero element");
    }
    {
        std::vector<int> nums = {0, -1, 0};
        int expected = 0;
        int result = MaxSubarray::maxSubArrayKadane(nums);
        ASSERT_EQ(result, expected, "MaxSubarray::maxSubArrayKadane - Zeros and negatives");
    }
}

// --- Test Cases for Merge Intervals ---
void testMergeIntervals() {
    {
        std::vector<std::vector<int>> intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
        std::vector<std::vector<int>> expected = {{1, 6}, {8, 10}, {15, 18}};
        std::vector<std::vector<int>> result = MergeIntervals::merge(intervals);
        ASSERT_VEC_EQ(result, expected, "MergeIntervals::merge - Basic overlapping intervals");
    }
    {
        std::vector<std::vector<int>> intervals = {{1, 4}, {4, 5}};
        std::vector<std::vector<int>> expected = {{1, 5}};
        std::vector<std::vector<int>> result = MergeIntervals::merge(intervals);
        ASSERT_VEC_EQ(result, expected, "MergeIntervals::merge - Adjacent intervals");
    }
    {
        std::vector<std::vector<int>> intervals = {{1, 4}, {0, 4}};
        std::vector<std::vector<int>> expected = {{0, 4}};
        std::vector<std::vector<int>> result = MergeIntervals::merge(intervals);
        ASSERT_VEC_EQ(result, expected, "MergeIntervals::merge - Overlap with earlier start");
    }
    {
        std::vector<std::vector<int>> intervals = {{1, 4}, {0, 0}};
        std::vector<std::vector<int>> expected = {{0, 0}, {1, 4}};
        std::vector<std::vector<int>> result = MergeIntervals::merge(intervals);
        ASSERT_VEC_EQ(result, expected, "MergeIntervals::merge - No overlap, unsorted input");
    }
    {
        std::vector<std::vector<int>> intervals = {{1, 4}};
        std::vector<std::vector<int>> expected = {{1, 4}};
        std::vector<std::vector<int>> result = MergeIntervals::merge(intervals);
        ASSERT_VEC_EQ(result, expected, "MergeIntervals::merge - Single interval");
    }
    {
        std::vector<std::vector<int>> intervals = {};
        std::vector<std::vector<int>> expected = {};
        std::vector<std::vector<int>> result = MergeIntervals::merge(intervals);
        ASSERT_VEC_EQ(result, expected, "MergeIntervals::merge - Empty input");
    }
    {
        std::vector<std::vector<int>> intervals = {{1, 3}, {7, 9}, {2, 4}, {10, 12}, {5, 6}};
        std::vector<std::vector<int>> expected = {{1, 4}, {5, 6}, {7, 9}, {10, 12}};
        std::vector<std::vector<int>> result = MergeIntervals::merge(intervals);
        ASSERT_VEC_EQ(result, expected, "MergeIntervals::merge - Multiple non-contiguous merges");
    }
    {
        std::vector<std::vector<int>> intervals = {{1, 10}, {2, 3}, {4, 5}, {6, 7}};
        std::vector<std::vector<int>> expected = {{1, 10}};
        std::vector<std::vector<int>> result = MergeIntervals::merge(intervals);
        ASSERT_VEC_EQ(result, expected, "MergeIntervals::merge - One interval encompasses many");
    }
    {
        std::vector<std::vector<int>> intervals = {{2, 3}, {4, 5}, {6, 7}, {8, 9}, {1, 10}};
        std::vector<std::vector<int>> expected = {{1, 10}};
        std::vector<std::vector<int>> result = MergeIntervals::merge(intervals);
        ASSERT_VEC_EQ(result, expected, "MergeIntervals::merge - Unsorted, one encompasses many");
    }
    {
        std::vector<std::vector<int>> intervals = {{1, 5}, {2, 3}};
        std::vector<std::vector<int>> expected = {{1, 5}};
        std::vector<std::vector<int>> result = MergeIntervals::merge(intervals);
        ASSERT_VEC_EQ(result, expected, "MergeIntervals::merge - Inner interval fully contained");
    }
}

int main() {
    std::cout << "--- Running Array Manipulation Tests ---" << std::endl << std::endl;

    runTest("Rotate Array Tests", testRotateArray);
    runTest("Product Except Self Tests", testProductExceptSelf);
    runTest("Maximum Subarray Sum Tests", testMaxSubarray);
    runTest("Merge Intervals Tests", testMergeIntervals);

    std::cout << "--- Test Summary ---" << std::endl;
    std::cout << "Total Passed: " << test_passed_count << std::endl;
    std::cout << "Total Failed: " << test_failed_count << std::endl;

    if (test_failed_count == 0) {
        std::cout << "All tests passed successfully!" << std::endl;
        return 0;
    } else {
        std::cout << "Some tests failed." << std::endl;
        return 1;
    }
}