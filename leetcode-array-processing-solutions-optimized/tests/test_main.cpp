#include "include/test_utils.h"
#include "include/array_manipulation.h"
#include <vector>
#include <numeric> // For iota
#include <algorithm> // For std::sort

// --- Rotate Array Tests ---
int testRotateArray_Approach1_Basic() {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
    std::vector<int> expected = {5, 6, 7, 1, 2, 3, 4};
    RotateArray::rotate_approach1(nums, 3);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A1 Basic Test");
}

int testRotateArray_Approach1_KLargerThanN() {
    std::vector<int> nums = {1, 2, 3, 4};
    std::vector<int> expected = {3, 4, 1, 2};
    RotateArray::rotate_approach1(nums, 6); // k=6 is effectively k=2 (6 % 4 = 2)
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A1 K Larger Than N Test");
}

int testRotateArray_Approach1_KEqualToN() {
    std::vector<int> nums = {1, 2, 3};
    std::vector<int> expected = {1, 2, 3};
    RotateArray::rotate_approach1(nums, 3);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A1 K Equal To N Test");
}

int testRotateArray_Approach1_Empty() {
    std::vector<int> nums;
    std::vector<int> expected;
    RotateArray::rotate_approach1(nums, 5);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A1 Empty Array Test");
}

int testRotateArray_Approach1_SingleElement() {
    std::vector<int> nums = {1};
    std::vector<int> expected = {1};
    RotateArray::rotate_approach1(nums, 5);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A1 Single Element Test");
}

int testRotateArray_Approach1_KIsZero() {
    std::vector<int> nums = {1, 2, 3, 4};
    std::vector<int> expected = {1, 2, 3, 4};
    RotateArray::rotate_approach1(nums, 0);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A1 K Is Zero Test");
}

int testRotateArray_Approach2_Basic() {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
    std::vector<int> expected = {5, 6, 7, 1, 2, 3, 4};
    RotateArray::rotate_approach2(nums, 3);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A2 Basic Test");
}

int testRotateArray_Approach2_KLargerThanN() {
    std::vector<int> nums = {1, 2, 3, 4};
    std::vector<int> expected = {3, 4, 1, 2};
    RotateArray::rotate_approach2(nums, 6);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A2 K Larger Than N Test");
}

int testRotateArray_Approach2_KEqualToN() {
    std::vector<int> nums = {1, 2, 3};
    std::vector<int> expected = {1, 2, 3};
    RotateArray::rotate_approach2(nums, 3);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A2 K Equal To N Test");
}

int testRotateArray_Approach2_Empty() {
    std::vector<int> nums;
    std::vector<int> expected;
    RotateArray::rotate_approach2(nums, 5);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A2 Empty Array Test");
}

int testRotateArray_Approach2_SingleElement() {
    std::vector<int> nums = {1};
    std::vector<int> expected = {1};
    RotateArray::rotate_approach2(nums, 5);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A2 Single Element Test");
}

int testRotateArray_Approach2_KIsZero() {
    std::vector<int> nums = {1, 2, 3, 4};
    std::vector<int> expected = {1, 2, 3, 4};
    RotateArray::rotate_approach2(nums, 0);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A2 K Is Zero Test");
}

int testRotateArray_Approach3_Basic() {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
    std::vector<int> expected = {5, 6, 7, 1, 2, 3, 4};
    RotateArray::rotate_approach3(nums, 3);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A3 Basic Test");
}

int testRotateArray_Approach3_KLargerThanN() {
    std::vector<int> nums = {1, 2, 3, 4};
    std::vector<int> expected = {3, 4, 1, 2};
    RotateArray::rotate_approach3(nums, 6);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A3 K Larger Than N Test");
}

int testRotateArray_Approach3_KEqualToN() {
    std::vector<int> nums = {1, 2, 3};
    std::vector<int> expected = {1, 2, 3};
    RotateArray::rotate_approach3(nums, 3);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A3 K Equal To N Test");
}

int testRotateArray_Approach3_Empty() {
    std::vector<int> nums;
    std::vector<int> expected;
    RotateArray::rotate_approach3(nums, 5);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A3 Empty Array Test");
}

int testRotateArray_Approach3_SingleElement() {
    std::vector<int> nums = {1};
    std::vector<int> expected = {1};
    RotateArray::rotate_approach3(nums, 5);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A3 Single Element Test");
}

int testRotateArray_Approach3_KIsZero() {
    std::vector<int> nums = {1, 2, 3, 4};
    std::vector<int> expected = {1, 2, 3, 4};
    RotateArray::rotate_approach3(nums, 0);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A3 K Is Zero Test");
}

int testRotateArray_Approach3_TwoElements() {
    std::vector<int> nums = {1, 2};
    std::vector<int> expected = {2, 1};
    RotateArray::rotate_approach3(nums, 1);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A3 Two Elements Test");
}

int testRotateArray_Approach3_EvenLength() {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6};
    std::vector<int> expected = {5, 6, 1, 2, 3, 4};
    RotateArray::rotate_approach3(nums, 2);
    return ASSERT_VEC_EQ(nums, expected, "Rotate Array A3 Even Length K=2 Test");
}

// --- Product of Array Except Self Tests ---
int testProductExceptSelf_Basic() {
    std::vector<int> nums = {1, 2, 3, 4};
    std::vector<int> expected = {24, 12, 8, 6};
    std::vector<int> result = ProductExceptSelf::productExceptSelf_approach1(nums);
    return ASSERT_VEC_EQ(result, expected, "Product Except Self Basic Test");
}

int testProductExceptSelf_WithZero() {
    std::vector<int> nums = {-1, 1, 0, -3, 3};
    std::vector<int> expected = {0, 0, 9, 0, 0};
    std::vector<int> result = ProductExceptSelf::productExceptSelf_approach1(nums);
    return ASSERT_VEC_EQ(result, expected, "Product Except Self With Zero Test");
}

int testProductExceptSelf_TwoZeros() {
    std::vector<int> nums = {1, 0, 3, 0};
    std::vector<int> expected = {0, 0, 0, 0};
    std::vector<int> result = ProductExceptSelf::productExceptSelf_approach1(nums);
    return ASSERT_VEC_EQ(result, expected, "Product Except Self Two Zeros Test");
}

int testProductExceptSelf_AllNegatives() {
    std::vector<int> nums = {-1, -2, -3};
    std::vector<int> expected = {6, 3, 2};
    std::vector<int> result = ProductExceptSelf::productExceptSelf_approach1(nums);
    return ASSERT_VEC_EQ(result, expected, "Product Except Self All Negatives Test");
}

int testProductExceptSelf_Empty() {
    std::vector<int> nums = {};
    std::vector<int> expected = {};
    std::vector<int> result = ProductExceptSelf::productExceptSelf_approach1(nums);
    return ASSERT_VEC_EQ(result, expected, "Product Except Self Empty Array Test");
}

int testProductExceptSelf_SingleElement() {
    std::vector<int> nums = {5};
    std::vector<int> expected = {1}; // As per common interview interpretation for single element
    std::vector<int> result = ProductExceptSelf::productExceptSelf_approach1(nums);
    return ASSERT_VEC_EQ(result, expected, "Product Except Self Single Element Test");
}

// --- Merge Intervals Tests ---
int testMergeIntervals_Basic() {
    std::vector<std::vector<int>> intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
    std::vector<std::vector<int>> expected = {{1, 6}, {8, 10}, {15, 18}};
    std::vector<std::vector<int>> result = MergeIntervals::merge_approach1(intervals);
    return ASSERT_VEC_VEC_EQ(result, expected, "Merge Intervals Basic Test");
}

int testMergeIntervals_OverlappingEnds() {
    std::vector<std::vector<int>> intervals = {{1, 4}, {4, 5}};
    std::vector<std::vector<int>> expected = {{1, 5}};
    std::vector<std::vector<int>> result = MergeIntervals::merge_approach1(intervals);
    return ASSERT_VEC_VEC_EQ(result, expected, "Merge Intervals Overlapping Ends Test");
}

int testMergeIntervals_FullOverlap() {
    std::vector<std::vector<int>> intervals = {{1, 4}, {0, 4}};
    std::vector<std::vector<int>> expected = {{0, 4}};
    std::vector<std::vector<int>> result = MergeIntervals::merge_approach1(intervals);
    return ASSERT_VEC_VEC_EQ(result, expected, "Merge Intervals Full Overlap Test");
}

int testMergeIntervals_NoOverlap() {
    std::vector<std::vector<int>> intervals = {{1, 2}, {3, 4}, {5, 6}};
    std::vector<std::vector<int>> expected = {{1, 2}, {3, 4}, {5, 6}};
    std::vector<std::vector<int>> result = MergeIntervals::merge_approach1(intervals);
    return ASSERT_VEC_VEC_EQ(result, expected, "Merge Intervals No Overlap Test");
}

int testMergeIntervals_MultipleOverlaps() {
    std::vector<std::vector<int>> intervals = {{1, 4}, {0, 0}, {0, 1}};
    std::vector<std::vector<int>> expected = {{0, 4}};
    std::vector<std::vector<int>> result = MergeIntervals::merge_approach1(intervals);
    return ASSERT_VEC_VEC_EQ(result, expected, "Merge Intervals Multiple Overlaps Test");
}

int testMergeIntervals_UnsortedInput() {
    std::vector<std::vector<int>> intervals = {{4, 5}, {1, 4}, {0, 1}};
    std::vector<std::vector<int>> expected = {{0, 5}};
    std::vector<std::vector<int>> result = MergeIntervals::merge_approach1(intervals);
    return ASSERT_VEC_VEC_EQ(result, expected, "Merge Intervals Unsorted Input Test");
}

int testMergeIntervals_EmptyInput() {
    std::vector<std::vector<int>> intervals = {};
    std::vector<std::vector<int>> expected = {};
    std::vector<std::vector<int>> result = MergeIntervals::merge_approach1(intervals);
    return ASSERT_VEC_VEC_EQ(result, expected, "Merge Intervals Empty Input Test");
}

int testMergeIntervals_SingleInterval() {
    std::vector<std::vector<int>> intervals = {{1, 5}};
    std::vector<std::vector<int>> expected = {{1, 5}};
    std::vector<std::vector<int>> result = MergeIntervals::merge_approach1(intervals);
    return ASSERT_VEC_VEC_EQ(result, expected, "Merge Intervals Single Interval Test");
}

// --- Trapping Rain Water Tests ---
int testTrappingRainWater_Approach1_Basic() {
    std::vector<int> height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    int expected = 6;
    int result = TrappingRainWater::trap_approach1(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A1 Basic Test");
}

int testTrappingRainWater_Approach1_PeakAtEnds() {
    std::vector<int> height = {4, 2, 0, 3, 2, 5};
    int expected = 9;
    int result = TrappingRainWater::trap_approach1(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A1 Peak At Ends Test");
}

int testTrappingRainWater_Approach1_AllSameHeight() {
    std::vector<int> height = {2, 2, 2, 2};
    int expected = 0;
    int result = TrappingRainWater::trap_approach1(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A1 All Same Height Test");
}

int testTrappingRainWater_Approach1_IncreasingHeights() {
    std::vector<int> height = {1, 2, 3, 4, 5};
    int expected = 0;
    int result = TrappingRainWater::trap_approach1(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A1 Increasing Heights Test");
}

int testTrappingRainWater_Approach1_DecreasingHeights() {
    std::vector<int> height = {5, 4, 3, 2, 1};
    int expected = 0;
    int result = TrappingRainWater::trap_approach1(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A1 Decreasing Heights Test");
}

int testTrappingRainWater_Approach1_Empty() {
    std::vector<int> height = {};
    int expected = 0;
    int result = TrappingRainWater::trap_approach1(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A1 Empty Test");
}

int testTrappingRainWater_Approach1_TwoElements() {
    std::vector<int> height = {1, 2};
    int expected = 0;
    int result = TrappingRainWater::trap_approach1(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A1 Two Elements Test");
}

int testTrappingRainWater_Approach1_Valley() {
    std::vector<int> height = {5, 0, 5};
    int expected = 5;
    int result = TrappingRainWater::trap_approach1(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A1 Valley Test");
}

int testTrappingRainWater_Approach2_Basic() {
    std::vector<int> height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    int expected = 6;
    int result = TrappingRainWater::trap_approach2(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A2 Basic Test");
}

int testTrappingRainWater_Approach2_PeakAtEnds() {
    std::vector<int> height = {4, 2, 0, 3, 2, 5};
    int expected = 9;
    int result = TrappingRainWater::trap_approach2(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A2 Peak At Ends Test");
}

int testTrappingRainWater_Approach2_AllSameHeight() {
    std::vector<int> height = {2, 2, 2, 2};
    int expected = 0;
    int result = TrappingRainWater::trap_approach2(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A2 All Same Height Test");
}

int testTrappingRainWater_Approach2_IncreasingHeights() {
    std::vector<int> height = {1, 2, 3, 4, 5};
    int expected = 0;
    int result = TrappingRainWater::trap_approach2(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A2 Increasing Heights Test");
}

int testTrappingRainWater_Approach2_DecreasingHeights() {
    std::vector<int> height = {5, 4, 3, 2, 1};
    int expected = 0;
    int result = TrappingRainWater::trap_approach2(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A2 Decreasing Heights Test");
}

int testTrappingRainWater_Approach2_Empty() {
    std::vector<int> height = {};
    int expected = 0;
    int result = TrappingRainWater::trap_approach2(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A2 Empty Test");
}

int testTrappingRainWater_Approach2_TwoElements() {
    std::vector<int> height = {1, 2};
    int expected = 0;
    int result = TrappingRainWater::trap_approach2(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A2 Two Elements Test");
}

int testTrappingRainWater_Approach2_Valley() {
    std::vector<int> height = {5, 0, 5};
    int expected = 5;
    int result = TrappingRainWater::trap_approach2(height);
    return ASSERT_EQ(result, expected, "Trapping Rain Water A2 Valley Test");
}


int main() {
    std::cout << "Running all tests..." << std::endl << std::endl;
    int failures = 0;

    // Rotate Array Tests
    failures += runTest("RotateArray_Approach1_Basic", testRotateArray_Approach1_Basic);
    failures += runTest("RotateArray_Approach1_KLargerThanN", testRotateArray_Approach1_KLargerThanN);
    failures += runTest("RotateArray_Approach1_KEqualToN", testRotateArray_Approach1_KEqualToN);
    failures += runTest("RotateArray_Approach1_Empty", testRotateArray_Approach1_Empty);
    failures += runTest("RotateArray_Approach1_SingleElement", testRotateArray_Approach1_SingleElement);
    failures += runTest("RotateArray_Approach1_KIsZero", testRotateArray_Approach1_KIsZero);

    failures += runTest("RotateArray_Approach2_Basic", testRotateArray_Approach2_Basic);
    failures += runTest("RotateArray_Approach2_KLargerThanN", testRotateArray_Approach2_KLargerThanN);
    failures += runTest("RotateArray_Approach2_KEqualToN", testRotateArray_Approach2_KEqualToN);
    failures += runTest("RotateArray_Approach2_Empty", testRotateArray_Approach2_Empty);
    failures += runTest("RotateArray_Approach2_SingleElement", testRotateArray_Approach2_SingleElement);
    failures += runTest("RotateArray_Approach2_KIsZero", testRotateArray_Approach2_KIsZero);

    failures += runTest("RotateArray_Approach3_Basic", testRotateArray_Approach3_Basic);
    failures += runTest("RotateArray_Approach3_KLargerThanN", testRotateArray_Approach3_KLargerThanN);
    failures += runTest("RotateArray_Approach3_KEqualToN", testRotateArray_Approach3_KEqualToN);
    failures += runTest("RotateArray_Approach3_Empty", testRotateArray_Approach3_Empty);
    failures += runTest("RotateArray_Approach3_SingleElement", testRotateArray_Approach3_SingleElement);
    failures += runTest("RotateArray_Approach3_KIsZero", testRotateArray_Approach3_KIsZero);
    failures += runTest("RotateArray_Approach3_TwoElements", testRotateArray_Approach3_TwoElements);
    failures += runTest("RotateArray_Approach3_EvenLength", testRotateArray_Approach3_EvenLength);

    // Product Except Self Tests
    failures += runTest("ProductExceptSelf_Basic", testProductExceptSelf_Basic);
    failures += runTest("ProductExceptSelf_WithZero", testProductExceptSelf_WithZero);
    failures += runTest("ProductExceptSelf_TwoZeros", testProductExceptSelf_TwoZeros);
    failures += runTest("ProductExceptSelf_AllNegatives", testProductExceptSelf_AllNegatives);
    failures += runTest("ProductExceptSelf_Empty", testProductExceptSelf_Empty);
    failures += runTest("ProductExceptSelf_SingleElement", testProductExceptSelf_SingleElement);

    // Merge Intervals Tests
    failures += runTest("MergeIntervals_Basic", testMergeIntervals_Basic);
    failures += runTest("MergeIntervals_OverlappingEnds", testMergeIntervals_OverlappingEnds);
    failures += runTest("MergeIntervals_FullOverlap", testMergeIntervals_FullOverlap);
    failures += runTest("MergeIntervals_NoOverlap", testMergeIntervals_NoOverlap);
    failures += runTest("MergeIntervals_MultipleOverlaps", testMergeIntervals_MultipleOverlaps);
    failures += runTest("MergeIntervals_UnsortedInput", testMergeIntervals_UnsortedInput);
    failures += runTest("MergeIntervals_EmptyInput", testMergeIntervals_EmptyInput);
    failures += runTest("MergeIntervals_SingleInterval", testMergeIntervals_SingleInterval);

    // Trapping Rain Water Tests
    failures += runTest("TrappingRainWater_Approach1_Basic", testTrappingRainWater_Approach1_Basic);
    failures += runTest("TrappingRainWater_Approach1_PeakAtEnds", testTrappingRainWater_Approach1_PeakAtEnds);
    failures += runTest("TrappingRainWater_Approach1_AllSameHeight", testTrappingRainWater_Approach1_AllSameHeight);
    failures += runTest("TrappingRainWater_Approach1_IncreasingHeights", testTrappingRainWater_Approach1_IncreasingHeights);
    failures += runTest("TrappingRainWater_Approach1_DecreasingHeights", testTrappingRainWater_Approach1_DecreasingHeights);
    failures += runTest("TrappingRainWater_Approach1_Empty", testTrappingRainWater_Approach1_Empty);
    failures += runTest("TrappingRainWater_Approach1_TwoElements", testTrappingRainWater_Approach1_TwoElements);
    failures += runTest("TrappingRainWater_Approach1_Valley", testTrappingRainWater_Approach1_Valley);

    failures += runTest("TrappingRainWater_Approach2_Basic", testTrappingRainWater_Approach2_Basic);
    failures += runTest("TrappingRainWater_Approach2_PeakAtEnds", testTrappingRainWater_Approach2_PeakAtEnds);
    failures += runTest("TrappingRainWater_Approach2_AllSameHeight", testTrappingRainWater_Approach2_AllSameHeight);
    failures += runTest("TrappingRainWater_Approach2_IncreasingHeights", testTrappingRainWater_Approach2_IncreasingHeights);
    failures += runTest("TrappingRainWater_Approach2_DecreasingHeights", testTrappingRainWater_Approach2_DecreasingHeights);
    failures += runTest("TrappingRainWater_Approach2_Empty", testTrappingRainWater_Approach2_Empty);
    failures += runTest("TrappingRainWater_Approach2_TwoElements", testTrappingRainWater_Approach2_TwoElements);
    failures += runTest("TrappingRainWater_Approach2_Valley", testTrappingRainWater_Approach2_Valley);

    std::cout << std::endl << "--- Test Summary ---" << std::endl;
    if (failures == 0) {
        std::cout << "All tests passed!" << std::endl;
        return 0;
    } else {
        std::cout << failures << " test(s) failed." << std::endl;
        return 1;
    }
}
---