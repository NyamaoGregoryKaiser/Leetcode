#include "include/array_manipulation.h"
#include "include/utils.h"
#include <iostream>
#include <vector>

void runRotateArrayExamples() {
    std::cout << "--- Rotate Array ---" << std::endl;

    std::vector<int> nums1 = {1, 2, 3, 4, 5, 6, 7};
    int k1 = 3;
    Utils::printVector(nums1, "Original nums1");
    std::cout << "k = " << k1 << std::endl;

    std::vector<int> copy1 = nums1;
    RotateArray::rotate_approach1(copy1, k1);
    Utils::printVector(copy1, "After Approach 1 (temp array)");

    std::vector<int> copy2 = nums1;
    RotateArray::rotate_approach2(copy2, k1);
    Utils::printVector(copy2, "After Approach 2 (reversal)");

    std::vector<int> copy3 = nums1;
    RotateArray::rotate_approach3(copy3, k1);
    Utils::printVector(copy3, "After Approach 3 (juggling cycle)");

    std::cout << std::endl;

    std::vector<int> nums2 = {-1, -100, 3, 99};
    int k2 = 2;
    Utils::printVector(nums2, "Original nums2");
    std::cout << "k = " << k2 << std::endl;

    std::vector<int> copy4 = nums2;
    RotateArray::rotate_approach2(copy4, k2);
    Utils::printVector(copy4, "After Approach 2 (reversal)");
    std::cout << std::endl;
}

void runProductExceptSelfExamples() {
    std::cout << "--- Product of Array Except Self ---" << std::endl;

    std::vector<int> nums1 = {1, 2, 3, 4};
    Utils::printVector(nums1, "Input nums1");
    std::vector<int> result1 = ProductExceptSelf::productExceptSelf_approach1(nums1);
    Utils::printVector(result1, "Output result1");

    std::cout << std::endl;

    std::vector<int> nums2 = {-1, 1, 0, -3, 3};
    Utils::printVector(nums2, "Input nums2");
    std::vector<int> result2 = ProductExceptSelf::productExceptSelf_approach1(nums2);
    Utils::printVector(result2, "Output result2");
    std::cout << std::endl;
}

void runMergeIntervalsExamples() {
    std::cout << "--- Merge Intervals ---" << std::endl;

    std::vector<std::vector<int>> intervals1 = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
    Utils::printVectorOfVectors(intervals1, "Input intervals1");
    std::vector<std::vector<int>> result1 = MergeIntervals::merge_approach1(intervals1);
    Utils::printVectorOfVectors(result1, "Output result1");

    std::cout << std::endl;

    std::vector<std::vector<int>> intervals2 = {{1, 4}, {4, 5}};
    Utils::printVectorOfVectors(intervals2, "Input intervals2");
    std::vector<std::vector<int>> result2 = MergeIntervals::merge_approach1(intervals2);
    Utils::printVectorOfVectors(result2, "Output result2");

    std::cout << std::endl;

    std::vector<std::vector<int>> intervals3 = {{1, 4}, {0, 4}};
    Utils::printVectorOfVectors(intervals3, "Input intervals3");
    std::vector<std::vector<int>> result3 = MergeIntervals::merge_approach1(intervals3);
    Utils::printVectorOfVectors(result3, "Output result3");

    std::cout << std::endl;
}

void runTrappingRainWaterExamples() {
    std::cout << "--- Trapping Rain Water ---" << std::endl;

    std::vector<int> height1 = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    Utils::printVector(height1, "Input height1");
    int result1_approach1 = TrappingRainWater::trap_approach1(height1);
    std::cout << "Output (Two Pointers): " << result1_approach1 << std::endl;
    int result1_approach2 = TrappingRainWater::trap_approach2(height1);
    std::cout << "Output (Stack): " << result1_approach2 << std::endl;

    std::cout << std::endl;

    std::vector<int> height2 = {4, 2, 0, 3, 2, 5};
    Utils::printVector(height2, "Input height2");
    int result2_approach1 = TrappingRainWater::trap_approach1(height2);
    std::cout << "Output (Two Pointers): " << result2_approach1 << std::endl;
    int result2_approach2 = TrappingRainWater::trap_approach2(height2);
    std::cout << "Output (Stack): " << result2_approach2 << std::endl;
    std::cout << std::endl;
}

int main() {
    std::cout << "Array Manipulation Interview Project Examples" << std::endl;
    std::cout << "===========================================" << std::endl << std::endl;

    runRotateArrayExamples();
    runProductExceptSelfExamples();
    runMergeIntervalsExamples();
    runTrappingRainWaterExamples();

    return 0;
}
---