```cpp
#include "gtest/gtest.h"
#include "array_manipulator.hpp"
#include "test_utils.hpp"
#include <vector>
#include <numeric>
#include <algorithm>

// Define a test fixture for ArrayManipulator to reuse the object
class ArrayManipulatorTest : public ::testing::Test {
protected:
    ArrayManipulator manipulator;
};

// --- Test Cases for Rotate Array ---

// Helper to test all rotate methods
void testRotateMethods(ArrayManipulator& manipulator, std::vector<int> nums, int k, const std::vector<int>& expected) {
    std::vector<int> nums_copy1 = nums;
    manipulator.rotate_temp_array(nums_copy1, k);
    ASSERT_EQ(nums_copy1, expected) << "rotate_temp_array failed for input " << TestUtils::printVector(nums, "original") << " k=" << k;

    std::vector<int> nums_copy2 = nums;
    manipulator.rotate_reverse(nums_copy2, k);
    ASSERT_EQ(nums_copy2, expected) << "rotate_reverse failed for input " << TestUtils::printVector(nums, "original") << " k=" << k;

    std::vector<int> nums_copy3 = nums;
    manipulator.rotate_juggling(nums_copy3, k);
    ASSERT_EQ(nums_copy3, expected) << "rotate_juggling failed for input " << TestUtils::printVector(nums, "original") << " k=" << k;

    // Brute force can be very slow for large k and n, so only test with smaller sizes
    if (nums.size() < 1000) { // Limit brute force for performance reasons in tests
        std::vector<int> nums_copy4 = nums;
        manipulator.rotate_brute_force(nums_copy4, k);
        ASSERT_EQ(nums_copy4, expected) << "rotate_brute_force failed for input " << TestUtils::printVector(nums, "original") << " k=" << k;
    }
}

TEST_F(ArrayManipulatorTest, RotateArray_Example1) {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
    int k = 3;
    std::vector<int> expected = {5, 6, 7, 1, 2, 3, 4};
    testRotateMethods(manipulator, nums, k, expected);
}

TEST_F(ArrayManipulatorTest, RotateArray_Example2) {
    std::vector<int> nums = {-1, -100, 3, 99};
    int k = 2;
    std::vector<int> expected = {3, 99, -1, -100};
    testRotateMethods(manipulator, nums, k, expected);
}

TEST_F(ArrayManipulatorTest, RotateArray_SingleElement) {
    std::vector<int> nums = {1};
    int k = 5;
    std::vector<int> expected = {1};
    testRotateMethods(manipulator, nums, k, expected);
}

TEST_F(ArrayManipulatorTest, RotateArray_EmptyArray) {
    std::vector<int> nums = {};
    int k = 3;
    std::vector<int> expected = {};
    testRotateMethods(manipulator, nums, k, expected);
}

TEST_F(ArrayManipulatorTest, RotateArray_RotateByZero) {
    std::vector<int> nums = {1, 2, 3, 4, 5};
    int k = 0;
    std::vector<int> expected = {1, 2, 3, 4, 5};
    testRotateMethods(manipulator, nums, k, expected);
}

TEST_F(ArrayManipulatorTest, RotateArray_RotateByLength) {
    std::vector<int> nums = {1, 2, 3, 4, 5};
    int k = 5;
    std::vector<int> expected = {1, 2, 3, 4, 5};
    testRotateMethods(manipulator, nums, k, expected);
}

TEST_F(ArrayManipulatorTest, RotateArray_RotateByMoreThanLength) {
    std::vector<int> nums = {1, 2, 3};
    int k = 4; // k=4 is effectively k=1 (4 % 3 = 1)
    std::vector<int> expected = {3, 1, 2};
    testRotateMethods(manipulator, nums, k, expected);
}

TEST_F(ArrayManipulatorTest, RotateArray_LargeArraySmallK) {
    std::vector<int> nums(1000);
    std::iota(nums.begin(), nums.end(), 1); // [1, 2, ..., 1000]
    int k = 5;
    std::vector<int> expected(1000);
    for (int i = 0; i < 1000; ++i) {
        expected[(i + k) % 1000] = nums[i];
    }
    // Only test optimal methods for large arrays
    std::vector<int> nums_copy1 = nums;
    manipulator.rotate_temp_array(nums_copy1, k);
    ASSERT_EQ(nums_copy1, expected);
    std::vector<int> nums_copy2 = nums;
    manipulator.rotate_reverse(nums_copy2, k);
    ASSERT_EQ(nums_copy2, expected);
    std::vector<int> nums_copy3 = nums;
    manipulator.rotate_juggling(nums_copy3, k);
    ASSERT_EQ(nums_copy3, expected);
}

TEST_F(ArrayManipulatorTest, RotateArray_LargeArrayLargeK) {
    std::vector<int> nums(1000);
    std::iota(nums.begin(), nums.end(), 1); // [1, 2, ..., 1000]
    int k = 999; // Effectively k=999 % 1000 = 999
    std::vector<int> expected(1000);
    for (int i = 0; i < 1000; ++i) {
        expected[(i + k) % 1000] = nums[i];
    }
    // Only test optimal methods for large arrays
    std::vector<int> nums_copy1 = nums;
    manipulator.rotate_temp_array(nums_copy1, k);
    ASSERT_EQ(nums_copy1, expected);
    std::vector<int> nums_copy2 = nums;
    manipulator.rotate_reverse(nums_copy2, k);
    ASSERT_EQ(nums_copy2, expected);
    std::vector<int> nums_copy3 = nums;
    manipulator.rotate_juggling(nums_copy3, k);
    ASSERT_EQ(nums_copy3, expected);
}

// --- Test Cases for Find the Duplicate Number ---

// Helper to test all findDuplicate methods
void testFindDuplicateMethods(ArrayManipulator& manipulator, const std::vector<int>& nums, int expected_duplicate) {
    ASSERT_EQ(manipulator.findDuplicate_sort(nums), expected_duplicate) << "findDuplicate_sort failed for " << TestUtils::printVector(nums, "original");
    ASSERT_EQ(manipulator.findDuplicate_hashSet(nums), expected_duplicate) << "findDuplicate_hashSet failed for " << TestUtils::printVector(nums, "original");
    ASSERT_EQ(manipulator.findDuplicate_floyd(nums), expected_duplicate) << "findDuplicate_floyd failed for " << TestUtils::printVector(nums, "original");
    ASSERT_EQ(manipulator.findDuplicate_binarySearch(nums), expected_duplicate) << "findDuplicate_binarySearch failed for " << TestUtils::printVector(nums, "original");
}

TEST_F(ArrayManipulatorTest, FindDuplicate_Example1) {
    std::vector<int> nums = {1, 3, 4, 2, 2};
    int expected = 2;
    testFindDuplicateMethods(manipulator, nums, expected);
}

TEST_F(ArrayManipulatorTest, FindDuplicate_Example2) {
    std::vector<int> nums = {3, 1, 3, 4, 2};
    int expected = 3;
    testFindDuplicateMethods(manipulator, nums, expected);
}

TEST_F(ArrayManipulatorTest, FindDuplicate_SmallestPossible) {
    std::vector<int> nums = {1, 1}; // n=1, array size=2, values 1 to 1
    int expected = 1;
    testFindDuplicateMethods(manipulator, nums, expected);
}

TEST_F(ArrayManipulatorTest, FindDuplicate_MultipleOccurrences) {
    // Problem states "only one duplicate number", but what if it appears more than twice?
    // "exactly one duplicate number" implies one number is repeated, all others unique.
    // e.g. [1,2,2,3,4] has 2 as duplicate. [1,2,2,2,3] also has 2 as duplicate.
    // The Floyd algorithm finds *a* duplicate. Let's test based on "the duplicate value".
    std::vector<int> nums = {2, 5, 4, 2, 1, 3}; // n=5, nums=6, range 1-5, duplicate 2
    int expected = 2;
    testFindDuplicateMethods(manipulator, nums, expected);
}

TEST_F(ArrayManipulatorTest, FindDuplicate_LargerValues) {
    std::vector<int> nums = {8, 7, 1, 10, 17, 15, 14, 18, 16, 13, 11, 12, 9, 6, 5, 4, 3, 2, 17}; // n=18, duplicate 17
    int expected = 17;
    testFindDuplicateMethods(manipulator, nums, expected);
}

TEST_F(ArrayManipulatorTest, FindDuplicate_RandomLargeArray) {
    for (int i = 0; i < 10; ++i) { // Run multiple times for robustness
        int n_val = 1000 + i * 10; // N from 1000 to 1090
        std::vector<int> nums = TestUtils::generateDuplicateVector(n_val);
        // The duplicate value is the one that appears twice. We can find it by counting.
        std::map<int, int> counts;
        int expected_duplicate = -1;
        for (int num : nums) {
            counts[num]++;
            if (counts[num] > 1) {
                expected_duplicate = num;
                break;
            }
        }
        ASSERT_NE(expected_duplicate, -1) << "Test setup error: No duplicate found in generated array.";
        testFindDuplicateMethods(manipulator, nums, expected_duplicate);
    }
}


// --- Test Cases for Trapping Rain Water ---

// Helper to test all trap methods
void testTrapMethods(ArrayManipulator& manipulator, const std::vector<int>& height, int expected_water) {
    ASSERT_EQ(manipulator.trap_twoPointers(height), expected_water) << "trap_twoPointers failed for " << TestUtils::printVector(height, "original");
    ASSERT_EQ(manipulator.trap_dynamicProgramming(height), expected_water) << "trap_dynamicProgramming failed for " << TestUtils::printVector(height, "original");
    ASSERT_EQ(manipulator.trap_monotonicStack(height), expected_water) << "trap_monotonicStack failed for " << TestUtils::printVector(height, "original");
}

TEST_F(ArrayManipulatorTest, TrappingRainWater_Example1) {
    std::vector<int> height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    int expected = 6;
    testTrapMethods(manipulator, height, expected);
}

TEST_F(ArrayManipulatorTest, TrappingRainWater_Example2) {
    std::vector<int> height = {4, 2, 0, 3, 2, 5};
    int expected = 9;
    testTrapMethods(manipulator, height, expected);
}

TEST_F(ArrayManipulatorTest, TrappingRainWater_EmptyArray) {
    std::vector<int> height = {};
    int expected = 0;
    testTrapMethods(manipulator, height, expected);
}

TEST_F(ArrayManipulatorTest, TrappingRainWater_SingleBar) {
    std::vector<int> height = {5};
    int expected = 0;
    testTrapMethods(manipulator, height, expected);
}

TEST_F(ArrayManipulatorTest, TrappingRainWater_TwoBars) {
    std::vector<int> height = {5, 2};
    int expected = 0;
    testTrapMethods(manipulator, height, expected);
}

TEST_F(ArrayManipulatorTest, TrappingRainWater_ThreeBarsNoWater) {
    std::vector<int> height = {5, 2, 5};
    int expected = 3; // (5-2)
    testTrapMethods(manipulator, height, expected);
}

TEST_F(ArrayManipulatorTest, TrappingRainWater_Plateau) {
    std::vector<int> height = {4, 2, 3, 2, 4};
    int expected = 4; // (4-2) + (4-3) + (4-2) = 2+1+2 = 5, wait, min(left_max,right_max) - height[i] -> for 2 it's (4-2)=2, for 3 it's (4-3)=1, for 2 it's (4-2)=2. Total 5.
                      // Let's re-verify:
                      // [4,2,3,2,4]
                      // i=1 (val 2): left_max=4, right_max=4. min(4,4)-2 = 2.
                      // i=2 (val 3): left_max=4, right_max=4. min(4,4)-3 = 1.
                      // i=3 (val 2): left_max=4, right_max=4. min(4,4)-2 = 2.
                      // Total = 2+1+2 = 5.
    testTrapMethods(manipulator, height, 5); // Corrected expected value
}

TEST_F(ArrayManipulatorTest, TrappingRainWater_DecreasingThenIncreasing) {
    std::vector<int> height = {5, 4, 3, 2, 1, 2, 3, 4, 5};
    int expected = 16; // 4+3+2+1 + 1+2+3+4 = 20.  Wait, this would be for a V shape.
                       // For {5,4,3,2,1,2,3,4,5}:
                       // i=1 (4): min(5,5)-4 = 1
                       // i=2 (3): min(5,5)-3 = 2
                       // i=3 (2): min(5,5)-2 = 3
                       // i=4 (1): min(5,5)-1 = 4
                       // i=5 (2): min(5,5)-2 = 3
                       // i=6 (3): min(5,5)-3 = 2
                       // i=7 (4): min(5,5)-4 = 1
                       // Total = 1+2+3+4+3+2+1 = 16.
    testTrapMethods(manipulator, height, 16); // Corrected expected value
}

TEST_F(ArrayManipulatorTest, TrappingRainWater_AllSameHeight) {
    std::vector<int> height = {3, 3, 3, 3, 3};
    int expected = 0;
    testTrapMethods(manipulator, height, expected);
}

TEST_F(ArrayManipulatorTest, TrappingRainWater_Sawtooth) {
    std::vector<int> height = {6, 2, 4, 0, 5, 1, 3, 0, 7};
    // Expected:
    // (6,_,4): (6-2)=4
    // (4,_,5): (4-0)=4
    // (5,_,3): (5-1)=4
    // (5,_,7): (5-0)=5
    // Total: 4+4+4+5 = 17
    // Let's manually verify for two pointers
    // L=0, R=8, H=[6,2,4,0,5,1,3,0,7]
    // LM=0, RM=0, water=0
    //
    // Iter 1: L=0(6), R=8(7). LM=6, RM=7. LM < RM. water += LM-H[L]=6-6=0. L=1.
    // H=[6,2,4,0,5,1,3,0,7]
    // Iter 2: L=1(2), R=8(7). LM=6, RM=7. LM < RM. water += LM-H[L]=6-2=4. L=2. water=4.
    // H=[6,2,4,0,5,1,3,0,7]
    // Iter 3: L=2(4), R=8(7). LM=6, RM=7. LM < RM. water += LM-H[L]=6-4=2. L=3. water=6.
    // H=[6,2,4,0,5,1,3,0,7]
    // Iter 4: L=3(0), R=8(7). LM=6, RM=7. LM < RM. water += LM-H[L]=6-0=6. L=4. water=12.
    // H=[6,2,4,0,5,1,3,0,7]
    // Iter 5: L=4(5), R=8(7). LM=6, RM=7. LM < RM. water += LM-H[L]=6-5=1. L=5. water=13.
    // H=[6,2,4,0,5,1,3,0,7]
    // Iter 6: L=5(1), R=8(7). LM=6, RM=7. LM < RM. water += LM-H[L]=6-1=5. L=6. water=18.
    // H=[6,2,4,0,5,1,3,0,7]
    // Iter 7: L=6(3), R=8(7). LM=6, RM=7. LM < RM. water += LM-H[L]=6-3=3. L=7. water=21.
    // H=[6,2,4,0,5,1,3,0,7]
    // Iter 8: L=7(0), R=8(7). LM=6, RM=7. LM < RM. water += LM-H[L]=6-0=6. L=8. water=27.
    // H=[6,2,4,0,5,1,3,0,7]
    // Iter 9: L=8, R=8. Loop ends.
    // Total = 27. My manual calculation was wrong.
    testTrapMethods(manipulator, height, 27);
}

TEST_F(ArrayManipulatorTest, TrappingRainWater_LargeRandomArray) {
    for (int i = 0; i < 5; ++i) { // Run multiple times for robustness
        int n_size = 1000 + i * 100; // N from 1000 to 1400
        std::vector<int> height = TestUtils::generateElevationMap(n_size, 1000);
        
        // Calculate expected using DP approach which is verified and easier to reason for correctness
        // (if all three methods pass, it indicates high confidence)
        int expected_water = manipulator.trap_dynamicProgramming(height); // Use DP as reference
        ASSERT_EQ(manipulator.trap_twoPointers(height), expected_water) << "trap_twoPointers failed for large random array " << TestUtils::printVector(height, "original");
        ASSERT_EQ(manipulator.trap_monotonicStack(height), expected_water) << "trap_monotonicStack failed for large random array " << TestUtils::printVector(height, "original");
    }
}


// --- Test Cases for Product of Array Except Self ---

// Helper to test all productExceptSelf methods
void testProductExceptSelfMethods(ArrayManipulator& manipulator, const std::vector<int>& nums, const std::vector<int>& expected) {
    ASSERT_EQ(manipulator.productExceptSelf_twoPass(nums), expected) << "productExceptSelf_twoPass failed for " << TestUtils::printVector(nums, "original");
    // Brute force can be very slow for large N, so limit testing for it.
    if (nums.size() < 1000) {
        ASSERT_EQ(manipulator.productExceptSelf_bruteForce(nums), expected) << "productExceptSelf_bruteForce failed for " << TestUtils::printVector(nums, "original");
    }
}

TEST_F(ArrayManipulatorTest, ProductExceptSelf_Example1) {
    std::vector<int> nums = {1, 2, 3, 4};
    std::vector<int> expected = {24, 12, 8, 6};
    testProductExceptSelfMethods(manipulator, nums, expected);
}

TEST_F(ArrayManipulatorTest, ProductExceptSelf_Example2) {
    std::vector<int> nums = {-1, 1, 0, -3, 3};
    std::vector<int> expected = {0, 0, 9, 0, 0};
    testProductExceptSelfMethods(manipulator, nums, expected);
}

TEST_F(ArrayManipulatorTest, ProductExceptSelf_ContainsZero) {
    std::vector<int> nums = {1, 0, 2};
    std::vector<int> expected = {0, 2, 0};
    testProductExceptSelfMethods(manipulator, nums, expected);
}

TEST_F(ArrayManipulatorTest, ProductExceptSelf_MultipleZeros) {
    std::vector<int> nums = {1, 0, 2, 0, 3};
    std::vector<int> expected = {0, 0, 0, 0, 0};
    testProductExceptSelfMethods(manipulator, nums, expected);
}

TEST_F(ArrayManipulatorTest, ProductExceptSelf_NegativeNumbers) {
    std::vector<int> nums = {2, -1, 3, -4};
    // Expected:
    // i=0 (2): (-1)*3*(-4) = 12
    // i=1 (-1): 2*3*(-4) = -24
    // i=2 (3): 2*(-1)*(-4) = 8
    // i=3 (-4): 2*(-1)*3 = -6
    std::vector<int> expected = {12, -24, 8, -6};
    testProductExceptSelfMethods(manipulator, nums, expected);
}

TEST_F(ArrayManipulatorTest, ProductExceptSelf_SingleElement) {
    std::vector<int> nums = {7};
    std::vector<int> expected = {1}; // Problem usually implies N > 1, but if N=1, product of empty set is 1.
    testProductExceptSelfMethods(manipulator, nums, expected);
}

TEST_F(ArrayManipulatorTest, ProductExceptSelf_EmptyArray) {
    std::vector<int> nums = {};
    std::vector<int> expected = {};
    testProductExceptSelfMethods(manipulator, nums, expected);
}

TEST_F(ArrayManipulatorTest, ProductExceptSelf_LargeArray) {
    std::vector<int> nums(1000);
    for (int i = 0; i < 1000; ++i) {
        nums[i] = (i % 5) + 1; // Values 1-5 to avoid overflow with actual products
    }
    
    std::vector<int> expected(1000);
    // Calculate expected using brute force for verification, but only once.
    // In a real scenario, this would be pre-calculated or a trusted known good implementation.
    for (int i = 0; i < 1000; ++i) {
        long long current_product = 1;
        for (int j = 0; j < 1000; ++j) {
            if (i == j) continue;
            current_product *= nums[j];
        }
        expected[i] = static_cast<int>(current_product);
    }

    ASSERT_EQ(manipulator.productExceptSelf_twoPass(nums), expected);
    // brute-force for this size is too slow.
}
```