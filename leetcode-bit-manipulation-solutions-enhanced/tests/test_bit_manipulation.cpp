```cpp
#include "../src/bit_manipulation.h"
#include "../src/utils.h"
#include <iostream>
#include <algorithm> // For std::sort

// Test Cases for CountSetBits
TEST_CASE(testCountSetBits)
    // Test iterative approach
    ASSERT_EQUAL(0, CountSetBits::countSetBits_iterative(0), "Iterative: countSetBits(0)");
    ASSERT_EQUAL(1, CountSetBits::countSetBits_iterative(1), "Iterative: countSetBits(1)");
    ASSERT_EQUAL(1, CountSetBits::countSetBits_iterative(2), "Iterative: countSetBits(2)"); // 10_2
    ASSERT_EQUAL(2, CountSetBits::countSetBits_iterative(3), "Iterative: countSetBits(3)"); // 11_2
    ASSERT_EQUAL(1, CountSetBits::countSetBits_iterative(4), "Iterative: countSetBits(4)"); // 100_2
    ASSERT_EQUAL(3, CountSetBits::countSetBits_iterative(7), "Iterative: countSetBits(7)"); // 111_2
    ASSERT_EQUAL(8, CountSetBits::countSetBits_iterative(255), "Iterative: countSetBits(255)"); // 1111 1111_2
    ASSERT_EQUAL(16, CountSetBits::countSetBits_iterative(0xFFFF), "Iterative: countSetBits(0xFFFF)");
    ASSERT_EQUAL(32, CountSetBits::countSetBits_iterative(0xFFFFFFFF), "Iterative: countSetBits(0xFFFFFFFF)"); // All bits set

    // Test Brian Kernighan's approach
    ASSERT_EQUAL(0, CountSetBits::countSetBits_brianKernighan(0), "Brian Kernighan: countSetBits(0)");
    ASSERT_EQUAL(1, CountSetBits::countSetBits_brianKernighan(1), "Brian Kernighan: countSetBits(1)");
    ASSERT_EQUAL(1, CountSetBits::countSetBits_brianKernighan(2), "Brian Kernighan: countSetBits(2)");
    ASSERT_EQUAL(2, CountSetBits::countSetBits_brianKernighan(3), "Brian Kernighan: countSetBits(3)");
    ASSERT_EQUAL(1, CountSetBits::countSetBits_brianKernighan(4), "Brian Kernighan: countSetBits(4)");
    ASSERT_EQUAL(3, CountSetBits::countSetBits_brianKernighan(7), "Brian Kernighan: countSetBits(7)");
    ASSERT_EQUAL(8, CountSetBits::countSetBits_brianKernighan(255), "Brian Kernighan: countSetBits(255)");
    ASSERT_EQUAL(16, CountSetBits::countSetBits_brianKernighan(0xFFFF), "Brian Kernighan: countSetBits(0xFFFF)");
    ASSERT_EQUAL(32, CountSetBits::countSetBits_brianKernighan(0xFFFFFFFF), "Brian Kernighan: countSetBits(0xFFFFFFFF)");

    // Test Lookup Table approach (ensure initialized)
    CountSetBits::initializeLookupTable();
    ASSERT_EQUAL(0, CountSetBits::countSetBits_lookupTable(0), "Lookup Table: countSetBits(0)");
    ASSERT_EQUAL(1, CountSetBits::countSetBits_lookupTable(1), "Lookup Table: countSetBits(1)");
    ASSERT_EQUAL(1, CountSetBits::countSetBits_lookupTable(2), "Lookup Table: countSetBits(2)");
    ASSERT_EQUAL(2, CountSetBits::countSetBits_lookupTable(3), "Lookup Table: countSetBits(3)");
    ASSERT_EQUAL(8, CountSetBits::countSetBits_lookupTable(255), "Lookup Table: countSetBits(255)");
    ASSERT_EQUAL(16, CountSetBits::countSetBits_lookupTable(0xFFFF), "Lookup Table: countSetBits(0xFFFF)");
    ASSERT_EQUAL(32, CountSetBits::countSetBits_lookupTable(0xFFFFFFFF), "Lookup Table: countSetBits(0xFFFFFFFF)");
    ASSERT_EQUAL(5, CountSetBits::countSetBits_lookupTable(0b100010000000100010001), "Lookup Table: complex pattern"); // 1 + 1 + 1 + 1 + 1 = 5
    ASSERT_EQUAL(16, CountSetBits::countSetBits_lookupTable(0x11111111), "Lookup Table: 0x11111111 (4*4 bits)");
END_TEST_CASE

// Test Cases for SingleNumberIII
TEST_CASE(testSingleNumberIII)
    std::vector<int> nums1 = {1, 2, 1, 3, 2, 5};
    std::vector<int> expected1 = {3, 5};
    ASSERT_VECTOR_EQUAL(expected1, SingleNumberIII::findTwoUniqueNumbers(nums1), "findTwoUniqueNumbers({1,2,1,3,2,5})");

    std::vector<int> nums2 = {-1, 0};
    std::vector<int> expected2 = {-1, 0};
    ASSERT_VECTOR_EQUAL(expected2, SingleNumberIII::findTwoUniqueNumbers(nums2), "findTwoUniqueNumbers({-1,0})");

    std::vector<int> nums3 = {0, 1};
    std::vector<int> expected3 = {0, 1};
    ASSERT_VECTOR_EQUAL(expected3, SingleNumberIII::findTwoUniqueNumbers(nums3), "findTwoUniqueNumbers({0,1})");

    std::vector<int> nums4 = {10, 20, 30, 10, 20, 40};
    std::vector<int> expected4 = {30, 40};
    ASSERT_VECTOR_EQUAL(expected4, SingleNumberIII::findTwoUniqueNumbers(nums4), "findTwoUniqueNumbers({10,20,30,10,20,40})");

    std::vector<int> nums5 = {7, 7, 3, 4, 5, 5};
    std::vector<int> expected5 = {3, 4};
    ASSERT_VECTOR_EQUAL(expected5, SingleNumberIII::findTwoUniqueNumbers(nums5), "findTwoUniqueNumbers({7,7,3,4,5,5})");
END_TEST_CASE

// Test Cases for PowerOfTwo
TEST_CASE(testIsPowerOfTwo)
    // Test loop approach
    ASSERT_TRUE(PowerOfTwo::isPowerOfTwo_loop(1), "Loop: isPowerOfTwo(1)");
    ASSERT_TRUE(PowerOfTwo::isPowerOfTwo_loop(2), "Loop: isPowerOfTwo(2)");
    ASSERT_TRUE(PowerOfTwo::isPowerOfTwo_loop(4), "Loop: isPowerOfTwo(4)");
    ASSERT_TRUE(PowerOfTwo::isPowerOfTwo_loop(16), "Loop: isPowerOfTwo(16)");
    ASSERT_TRUE(PowerOfTwo::isPowerOfTwo_loop(1024), "Loop: isPowerOfTwo(1024)");
    ASSERT_TRUE(PowerOfTwo::isPowerOfTwo_loop(2147483648L), "Loop: isPowerOfTwo(2^31) (if int is long enough, otherwise this is problematic)"); // Max power of 2 for int32_t is 2^30
    ASSERT_FALSE(PowerOfTwo::isPowerOfTwo_loop(0), "Loop: isPowerOfTwo(0)");
    ASSERT_FALSE(PowerOfTwo::isPowerOfTwo_loop(-2), "Loop: isPowerOfTwo(-2)");
    ASSERT_FALSE(PowerOfTwo::isPowerOfTwo_loop(3), "Loop: isPowerOfTwo(3)");
    ASSERT_FALSE(PowerOfTwo::isPowerOfTwo_loop(6), "Loop: isPowerOfTwo(6)");
    ASSERT_FALSE(PowerOfTwo::isPowerOfTwo_loop(1023), "Loop: isPowerOfTwo(1023)");

    // Test bit manipulation approach
    ASSERT_TRUE(PowerOfTwo::isPowerOfTwo_bitManipulation(1), "Bit: isPowerOfTwo(1)");
    ASSERT_TRUE(PowerOfTwo::isPowerOfTwo_bitManipulation(2), "Bit: isPowerOfTwo(2)");
    ASSERT_TRUE(PowerOfTwo::isPowerOfTwo_bitManipulation(4), "Bit: isPowerOfTwo(4)");
    ASSERT_TRUE(PowerOfTwo::isPowerOfTwo_bitManipulation(16), "Bit: isPowerOfTwo(16)");
    ASSERT_TRUE(PowerOfTwo::isPowerOfTwo_bitManipulation(1024), "Bit: isPowerOfTwo(1024)");
    ASSERT_TRUE(PowerOfTwo::isPowerOfTwo_bitManipulation(1 << 30), "Bit: isPowerOfTwo(2^30)"); // Max positive power of 2 for signed 32-bit int
    ASSERT_FALSE(PowerOfTwo::isPowerOfTwo_bitManipulation(0), "Bit: isPowerOfTwo(0)");
    ASSERT_FALSE(PowerOfTwo::isPowerOfTwo_bitManipulation(-2), "Bit: isPowerOfTwo(-2)");
    ASSERT_FALSE(PowerOfTwo::isPowerOfTwo_bitManipulation(3), "Bit: isPowerOfTwo(3)");
    ASSERT_FALSE(PowerOfTwo::isPowerOfTwo_bitManipulation(6), "Bit: isPowerOfTwo(6)");
    ASSERT_FALSE(PowerOfTwo::isPowerOfTwo_bitManipulation(1023), "Bit: isPowerOfTwo(1023)");
END_TEST_CASE

// Test Cases for ReverseBits
TEST_CASE(testReverseBits)
    // 0 -> 0
    ASSERT_EQUAL(0, ReverseBits::reverseBits_iterative(0), "reverseBits(0)");

    // 1 (0...01) -> 2^31 (10...0)
    ASSERT_EQUAL(1U << 31, ReverseBits::reverseBits_iterative(1), "reverseBits(1)");

    // 0x80000000 (10...0) -> 1 (0...01)
    ASSERT_EQUAL(1, ReverseBits::reverseBits_iterative(0x80000000), "reverseBits(0x80000000)");

    // 0xFFFFFFFF (all 1s) -> 0xFFFFFFFF (all 1s)
    ASSERT_EQUAL(0xFFFFFFFF, ReverseBits::reverseBits_iterative(0xFFFFFFFF), "reverseBits(0xFFFFFFFF)");

    // 0x00000001 -> 0x80000000
    ASSERT_EQUAL(0x80000000, ReverseBits::reverseBits_iterative(0x00000001), "reverseBits(0x00000001)");

    // 0xAAAAAAAA (1010...1010) -> 0x55555555 (0101...0101)
    ASSERT_EQUAL(0x55555555, ReverseBits::reverseBits_iterative(0xAAAAAAAA), "reverseBits(0xAAAAAAAA)");

    // 0x55555555 (0101...0101) -> 0xAAAAAAAA (1010...1010)
    ASSERT_EQUAL(0xAAAAAAAA, ReverseBits::reverseBits_iterative(0x55555555), "reverseBits(0x55555555)");

    // Example from problem: 43261596 (00000010100101000001111010011100_2)
    // Reversed:           (00111001011110000010100101000000_2) -> 964176192
    uint32_t input = 43261596;
    uint32_t expected = 964176192;
    ASSERT_EQUAL(expected, ReverseBits::reverseBits_iterative(input), "reverseBits(43261596)");

    // Test with a specific pattern: 0xF000000F (111100...001111)
    // Should reverse to:           0xF000000F (111100...001111)
    // This is a palindrome in bits (if 32-bit).
    ASSERT_EQUAL(0xF000000FU, ReverseBits::reverseBits_iterative(0xF000000FU), "reverseBits(0xF000000F)");

END_TEST_CASE

// Test Cases for UpdateBits
TEST_CASE(testUpdateBits)
    // Example from problem: n = 10000000000_2, m = 10011_2, i = 2, j = 6
    // Expected: 10001001100_2
    // n = 1024, m = 19
    // Expected decimal: 1024 + (19 << 2) = 1024 + 76 = 1100
    int n1 = 1024; // 0b10000000000
    int m1 = 19;   // 0b10011
    int i1 = 2;
    int j1 = 6;
    int expected1 = 1100; // 0b10001001100
    ASSERT_EQUAL(expected1, UpdateBits::updateBits(n1, m1, i1, j1), "updateBits(1024, 19, 2, 6)");
    std::cout << "    n1:        " << toBinaryString(n1, 12) << std::endl;
    std::cout << "    m1:        " << toBinaryString(m1, 12) << std::endl;
    std::cout << "    Expected:  " << toBinaryString(expected1, 12) << std::endl;
    std::cout << "    Actual:    " << toBinaryString(UpdateBits::updateBits(n1, m1, i1, j1), 12) << std::endl;


    // Test case: Clear and set all bits
    int n2 = 0xFFFFFFFF; // All ones
    int m2 = 0x00000000; // All zeros
    int i2 = 0;
    int j2 = 31;
    int expected2 = 0; // Should clear all bits to 0
    ASSERT_EQUAL(expected2, UpdateBits::updateBits(n2, m2, i2, j2), "updateBits(all 1s, 0, 0, 31)");
    std::cout << "    n2:        " << toBinaryString(n2) << std::endl;
    std::cout << "    m2:        " << toBinaryString(m2) << std::endl;
    std::cout << "    Expected:  " << toBinaryString(expected2) << std::endl;
    std::cout << "    Actual:    " << toBinaryString(UpdateBits::updateBits(n2, m2, i2, j2)) << std::endl;


    // Test case: Insert all 1s into all 0s
    int n3 = 0x00000000; // All zeros
    int m3 = 0xFFFFFFFF; // All ones
    int i3 = 0;
    int j3 = 31;
    int expected3 = 0xFFFFFFFF; // Should set all bits to 1
    ASSERT_EQUAL(expected3, UpdateBits::updateBits(n3, m3, i3, j3), "updateBits(0, all 1s, 0, 31)");
    std::cout << "    n3:        " << toBinaryString(n3) << std::endl;
    std::cout << "    m3:        " << toBinaryString(m3) << std::endl;
    std::cout << "    Expected:  " << toBinaryString(expected3) << std::endl;
    std::cout << "    Actual:    " << toBinaryString(UpdateBits::updateBits(n3, m3, i3, j3)) << std::endl;


    // Test case: Small insertion, n = 0, m = 1 (0b1), i = 0, j = 0
    int n4 = 0;
    int m4 = 1;
    int i4 = 0;
    int j4 = 0;
    int expected4 = 1; // 0b1
    ASSERT_EQUAL(expected4, UpdateBits::updateBits(n4, m4, i4, j4), "updateBits(0, 1, 0, 0)");
    std::cout << "    n4:        " << toBinaryString(n4, 4) << std::endl;
    std::cout << "    m4:        " << toBinaryString(m4, 4) << std::endl;
    std::cout << "    Expected:  " << toBinaryString(expected4, 4) << std::endl;
    std::cout << "    Actual:    " << toBinaryString(UpdateBits::updateBits(n4, m4, i4, j4), 4) << std::endl;


    // Test case: n = 0b10101010, m = 0b11, i=2, j=3
    // n: ...1010 1010
    // m:       11
    // Range [2,3]: clear bits 2,3 in n
    // n after clear: ...1010 0010
    // m shifted (m << 2): ...0000 1100
    // result: ...1010 1110
    int n5 = 0b10101010;
    int m5 = 0b11;
    int i5 = 2;
    int j5 = 3;
    int expected5 = 0b10101110;
    ASSERT_EQUAL(expected5, UpdateBits::updateBits(n5, m5, i5, j5), "updateBits(0b10101010, 0b11, 2, 3)");
    std::cout << "    n5:        " << toBinaryString(n5, 8) << std::endl;
    std::cout << "    m5:        " << toBinaryString(m5, 8) << std::endl;
    std::cout << "    Expected:  " << toBinaryString(expected5, 8) << std::endl;
    std::cout << "    Actual:    " << toBinaryString(UpdateBits::updateBits(n5, m5, i5, j5), 8) << std::endl;

    // Test with negative numbers
    // n = -5 (0b...11111011), m = 1 (0b...00000001), i = 0, j = 0
    // expected = -5 (0b...11111011) - no change if m=1
    int n6 = -5; // 0xFFFFFFFB
    int m6 = 1;
    int i6 = 0;
    int j6 = 0;
    int expected6 = -5;
    ASSERT_EQUAL(expected6, UpdateBits::updateBits(n6, m6, i6, j6), "updateBits(-5, 1, 0, 0)");
    std::cout << "    n6:        " << toBinaryString(n6) << std::endl;
    std::cout << "    m6:        " << toBinaryString(m6) << std::endl;
    std::cout << "    Expected:  " << toBinaryString(expected6) << std::endl;
    std::cout << "    Actual:    " << toBinaryString(UpdateBits::updateBits(n6, m6, i6, j6)) << std::endl;

    // n = -5 (0b...11111011), m = 0 (0b...00000000), i = 0, j = 0
    // expected = -6 (0b...11111010) - clear LSB (1->0) in -5
    int n7 = -5;
    int m7 = 0;
    int i7 = 0;
    int j7 = 0;
    int expected7 = -6;
    ASSERT_EQUAL(expected7, UpdateBits::updateBits(n7, m7, i7, j7), "updateBits(-5, 0, 0, 0)");
    std::cout << "    n7:        " << toBinaryString(n7) << std::endl;
    std::cout << "    m7:        " << toBinaryString(m7) << std::endl;
    std::cout << "    Expected:  " << toBinaryString(expected7) << std::endl;
    std::cout << "    Actual:    " << toBinaryString(UpdateBits::updateBits(n7, m7, i7, j7)) << std::endl;

END_TEST_CASE

int main() {
    RUN_ALL_TESTS(
        testCountSetBits();
        testSingleNumberIII();
        testIsPowerOfTwo();
        testReverseBits();
        testUpdateBits();
    );
}

```