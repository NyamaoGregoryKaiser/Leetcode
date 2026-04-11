```cpp
#include "array_manipulator.h"
#include "utils.h"
#include <iostream>
#include <vector>
#include <string>

// Function to demonstrate Two Sum problem
void demonstrateTwoSum() {
    std::cout << "\n--- Problem 1: Two Sum ---\n";

    std::vector<int> nums1 = {2, 7, 11, 15};
    int target1 = 9;
    printVector(nums1, "Input nums");
    std::cout << "Target: " << target1 << std::endl;

    std::vector<int> result1_brute = ArrayManipulator::twoSum_bruteForce(nums1, target1);
    printVector(result1_brute, "Brute Force Indices");

    std::vector<int> result1_hash = ArrayManipulator::twoSum_hashMap(nums1, target1);
    printVector(result1_hash, "Hash Map Indices");

    std::vector<int> nums2 = {3, 2, 4};
    int target2 = 6;
    printVector(nums2, "\nInput nums");
    std::cout << "Target: " << target2 << std::endl;
    printVector(ArrayManipulator::twoSum_hashMap(nums2, target2), "Hash Map Indices");

    std::vector<int> nums3 = {3, 3};
    int target3 = 6;
    printVector(nums3, "\nInput nums");
    std::cout << "Target: " << target3 << std::endl;
    printVector(ArrayManipulator::twoSum_hashMap(nums3, target3), "Hash Map Indices");
}

// Function to demonstrate Rotate Array problem
void demonstrateRotateArray() {
    std::cout << "\n--- Problem 2: Rotate Array ---\n";

    std::vector<int> nums1 = {1, 2, 3, 4, 5, 6, 7};
    int k1 = 3;
    printVector(nums1, "Original nums");
    std::cout << "Rotate by k=" << k1 << std::endl;
    std::vector<int> nums1_copy = nums1;
    ArrayManipulator::rotate_extraArray(nums1_copy, k1);
    printVector(nums1_copy, "Extra Array Result");

    nums1_copy = nums1;
    ArrayManipulator::rotate_bubble(nums1_copy, k1);
    printVector(nums1_copy, "Bubble Rotate Result");

    nums1_copy = nums1;
    ArrayManipulator::rotate_reversal(nums1_copy, k1);
    printVector(nums1_copy, "Reversal Result");

    std::vector<int> nums2 = {-1, -100, 3, 99};
    int k2 = 2;
    printVector(nums2, "\nOriginal nums");
    std::cout << "Rotate by k=" << k2 << std::endl;
    nums1_copy = nums2;
    ArrayManipulator::rotate_reversal(nums1_copy, k2);
    printVector(nums1_copy, "Reversal Result");

    std::vector<int> nums3 = {1, 2};
    int k3 = 3; // k > n
    printVector(nums3, "\nOriginal nums");
    std::cout << "Rotate by k=" << k3 << std::endl;
    nums1_copy = nums3;
    ArrayManipulator::rotate_reversal(nums1_copy, k3);
    printVector(nums1_copy, "Reversal Result");
}

// Function to demonstrate Merge Intervals problem
void demonstrateMergeIntervals() {
    std::cout << "\n--- Problem 3: Merge Intervals ---\n";

    std::vector<std::vector<int>> intervals1 = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
    printVectorOfVectors(intervals1, "Original Intervals");
    std::vector<std::vector<int>> merged1 = ArrayManipulator::mergeIntervals_sortAndMerge(intervals1);
    printVectorOfVectors(merged1, "Merged Intervals");

    std::vector<std::vector<int>> intervals2 = {{1, 4}, {4, 5}};
    printVectorOfVectors(intervals2, "\nOriginal Intervals");
    std::vector<std::vector<int>> merged2 = ArrayManipulator::mergeIntervals_sortAndMerge(intervals2);
    printVectorOfVectors(merged2, "Merged Intervals");

    std::vector<std::vector<int>> intervals3 = {{1, 4}, {0, 4}};
    printVectorOfVectors(intervals3, "\nOriginal Intervals");
    std::vector<std::vector<int>> merged3 = ArrayManipulator::mergeIntervals_sortAndMerge(intervals3);
    printVectorOfVectors(merged3, "Merged Intervals");

    std::vector<std::vector<int>> intervals4 = {{1, 4}, {0, 0}};
    printVectorOfVectors(intervals4, "\nOriginal Intervals");
    std::vector<std::vector<int>> merged4 = ArrayManipulator::mergeIntervals_sortAndMerge(intervals4);
    printVectorOfVectors(merged4, "Merged Intervals");
}

// Function to demonstrate Trapping Rain Water problem
void demonstrateTrappingRainWater() {
    std::cout << "\n--- Problem 4: Trapping Rain Water ---\n";

    std::vector<int> height1 = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    printVector(height1, "Elevation Map");
    std::cout << "Brute Force Water: " << ArrayManipulator::trapRainWater_bruteForce(height1) << std::endl;
    std::cout << "Precompute Max Water: " << ArrayManipulator::trapRainWater_precomputeMax(height1) << std::endl;
    std::cout << "Two-Pointer Water: " << ArrayManipulator::trapRainWater_twoPointer(height1) << std::endl;

    std::vector<int> height2 = {4, 2, 0, 3, 2, 5};
    printVector(height2, "\nElevation Map");
    std::cout << "Brute Force Water: " << ArrayManipulator::trapRainWater_bruteForce(height2) << std::endl;
    std::cout << "Precompute Max Water: " << ArrayManipulator::trapRainWater_precomputeMax(height2) << std::endl;
    std::cout << "Two-Pointer Water: " << ArrayManipulator::trapRainWater_twoPointer(height2) << std::endl;

    std::vector<int> height3 = {2, 0, 2};
    printVector(height3, "\nElevation Map");
    std::cout << "Two-Pointer Water: " << ArrayManipulator::trapRainWater_twoPointer(height3) << std::endl;

    std::vector<int> height4 = {1, 2, 3, 4, 5}; // No water trapped
    printVector(height4, "\nElevation Map");
    std::cout << "Two-Pointer Water: " << ArrayManipulator::trapRainWater_twoPointer(height4) << std::endl;
}


int main() {
    std::cout << "Array Manipulation Project Demonstrations\n";

    demonstrateTwoSum();
    demonstrateRotateArray();
    demonstrateMergeIntervals();
    demonstrateTrappingRainWater();

    std::cout << "\nAll demonstrations complete.\n";

    return 0;
}
```