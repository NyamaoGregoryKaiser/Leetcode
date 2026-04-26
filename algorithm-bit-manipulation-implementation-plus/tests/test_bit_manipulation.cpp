```cpp
#include <iostream>
#include <vector>
#include <string>
#include <limits> // For numeric_limits
#include "src/bit_manipulation_optimized.h"
#include "src/bit_manipulation_bruteforce.h"
#include "src/bit_manipulation_utils.h"

// Define a simple test macro to reduce boilerplate
#define RUN_TEST(func_call, expected_val, description) \
    do { \
        auto actual_val = func_call; \
        std::string exp_str = std::to_string(expected_val); \
        std::string act_str = std::to_string(actual_val); \
        BitManipulation::testAssertion(actual_val == expected_val, description, exp_str, act_str); \
    } while(0)

// Helper for vector comparison
#define RUN_TEST_VEC(func_call, expected_val, description) \
    do { \
        auto actual_val = func_call; \
        bool success = (actual_val == expected_val); \
        if (!success) { \
            std::string exp_str = std::to_string(expected_val); \
            std::string act_str = std::to_string(actual_val); \
            BitManipulation::testAssertion(false, description, exp_str, act_str); \
        } else { \
            BitManipulation::testAssertion(true, description); \
        } \
    } while(0)

void test_countSetBits() {
    std::cout << "\n--- Testing Count Set Bits (Hamming Weight) ---" << std::endl;

    // Test cases for countSetBits_Kernighan
    RUN_TEST(BitManipulation::countSetBits_Kernighan(0), 0, "Kernighan: n = 0");
    RUN_TEST(BitManipulation::countSetBits_Kernighan(1), 1, "Kernighan: n = 1 (0001)");
    RUN_TEST(BitManipulation::countSetBits_Kernighan(2), 1, "Kernighan: n = 2 (0010)");
    RUN_TEST(BitManipulation::countSetBits_Kernighan(3), 2, "Kernighan: n = 3 (0011)");
    RUN_TEST(BitManipulation::countSetBits_Kernighan(7), 3, "Kernighan: n = 7 (0111)");
    RUN_TEST(BitManipulation::countSetBits_Kernighan(8), 1, "Kernighan: n = 8 (1000)");
    RUN_TEST(BitManipulation::countSetBits_Kernighan(std::numeric_limits<uint32_t>::max()), 32, "Kernighan: Max uint32_t (all 1s)");
    RUN_TEST(BitManipulation::countSetBits_Kernighan(0xaaaaaaaa), 16, "Kernighan: Alternating 1010...1010"); // 10101010101010101010101010101010
    RUN_TEST(BitManipulation::countSetBits_Kernighan(0x55555555), 16, "Kernighan: Alternating 0101...0101"); // 01010101010101010101010101010101

    // Test cases for countSetBits_Shift (should yield same results)
    RUN_TEST(BitManipulation::countSetBits_Shift(0), 0, "Shift: n = 0");
    RUN_TEST(BitManipulation::countSetBits_Shift(1), 1, "Shift: n = 1 (0001)");
    RUN_TEST(BitManipulation::countSetBits_Shift(std::numeric_limits<uint32_t>::max()), 32, "Shift: Max uint32_t (all 1s)");

    // Test cases for countSetBits_Brute (should yield same results)
    RUN_TEST(BitManipulation::countSetBits_Brute(0), 0, "Brute: n = 0");
    RUN_TEST(BitManipulation::countSetBits_Brute(1), 1, "Brute: n = 1 (0001)");
    RUN_TEST(BitManipulation::countSetBits_Brute(std::numeric_limits<uint32_t>::max()), 32, "Brute: Max uint32_t (all 1s)");
}

void test_singleNumber() {
    std::cout << "\n--- Testing Single Number ---" << std::endl;

    // Test cases for singleNumber (Optimized XOR)
    RUN_TEST_VEC(BitManipulation::singleNumber({2, 2, 1}), 1, "XOR: Basic case [2,2,1]");
    RUN_TEST_VEC(BitManipulation::singleNumber({4, 1, 2, 1, 2}), 4, "XOR: Mixed numbers [4,1,2,1,2]");
    RUN_TEST_VEC(BitManipulation::singleNumber({1}), 1, "XOR: Single element array [1]");
    RUN_TEST_VEC(BitManipulation::singleNumber({0, 0, 1}), 1, "XOR: Contains zero [0,0,1]");
    RUN_TEST_VEC(BitManipulation::singleNumber({-1, -1, -2}), -2, "XOR: Negative numbers [-1,-1,-2]");
    RUN_TEST_VEC(BitManipulation::singleNumber({std::numeric_limits<int>::max(), std::numeric_limits<int>::max(), 5}), 5, "XOR: Max int with unique");
    RUN_TEST_VEC(BitManipulation::singleNumber({5, 5, std::numeric_limits<int>::min()}), std::numeric_limits<int>::min(), "XOR: Min int with unique");

    // Test cases for singleNumber_Brute_HashMap
    RUN_TEST_VEC(BitManipulation::singleNumber_Brute_HashMap({2, 2, 1}), 1, "HashMap: Basic case [2,2,1]");
    RUN_TEST_VEC(BitManipulation::singleNumber_Brute_HashMap({4, 1, 2, 1, 2}), 4, "HashMap: Mixed numbers [4,1,2,1,2]");
    RUN_TEST_VEC(BitManipulation::singleNumber_Brute_HashMap({1}), 1, "HashMap: Single element array [1]");
    RUN_TEST_VEC(BitManipulation::singleNumber_Brute_HashMap({0, 0, 1}), 1, "HashMap: Contains zero [0,0,1]");
    RUN_TEST_VEC(BitManipulation::singleNumber_Brute_HashMap({-1, -1, -2}), -2, "HashMap: Negative numbers [-1,-1,-2]");
}

void test_reverseBits() {
    std::cout << "\n--- Testing Reverse Bits ---" << std::endl;

    // Test cases for reverseBits (Optimized)
    RUN_TEST(BitManipulation::reverseBits(0), 0, "Optimized: n = 0");
    RUN_TEST(BitManipulation::reverseBits(1), 0x80000000, "Optimized: n = 1 (LSB set)"); // 0...01 -> 10...0
    RUN_TEST(BitManipulation::reverseBits(0x80000000), 1, "Optimized: n = 0x80000000 (MSB set)"); // 10...0 -> 0...01
    RUN_TEST(BitManipulation::reverseBits(0b00000000000000000000000000000010), 0x40000000, "Optimized: n = 2"); // 0...10 -> 010...0
    RUN_TEST(BitManipulation::reverseBits(0b00000000000000000000000000000011), 0xC0000000, "Optimized: n = 3"); // 0...11 -> 110...0
    RUN_TEST(BitManipulation::reverseBits(0b10101010101010101010101010101010), 0x55555555, "Optimized: Alternating pattern (0xAAAAAAA)"); // 0xAAAAAAAA -> 0x55555555
    RUN_TEST(BitManipulation::reverseBits(0x0000FFFF), 0xFFFF0000, "Optimized: Lower half set");
    RUN_TEST(BitManipulation::reverseBits(0xFFFF0000), 0x0000FFFF, "Optimized: Upper half set");
    RUN_TEST(BitManipulation::reverseBits(0x12345678), 0x1E6A2C48, "Optimized: Complex number");
    // Binary: 0001 0010 0011 0100 0101 0110 0111 1000
    // Reversed: 0001 1110 0110 1010 0010 1100 0100 1000

    // Test cases for reverseBits_Brute
    RUN_TEST(BitManipulation::reverseBits_Brute(0), 0, "Brute: n = 0");
    RUN_TEST(BitManipulation::reverseBits_Brute(1), 0x80000000, "Brute: n = 1 (LSB set)");
    RUN_TEST(BitManipulation::reverseBits_Brute(0x80000000), 1, "Brute: n = 0x80000000 (MSB set)");
    RUN_TEST(BitManipulation::reverseBits_Brute(0b00000000000000000000000000000010), 0x40000000, "Brute: n = 2");
    RUN_TEST(BitManipulation::reverseBits_Brute(0x12345678), 0x1E6A2C48, "Brute: Complex number");
}

void test_isPowerOfTwo() {
    std::cout << "\n--- Testing Is Power Of Two ---" << std::endl;

    // Test cases for isPowerOfTwo (Optimized)
    RUN_TEST(BitManipulation::isPowerOfTwo(1), true, "Optimized: n = 1 (2^0)");
    RUN_TEST(BitManipulation::isPowerOfTwo(2), true, "Optimized: n = 2 (2^1)");
    RUN_TEST(BitManipulation::isPowerOfTwo(4), true, "Optimized: n = 4 (2^2)");
    RUN_TEST(BitManipulation::isPowerOfTwo(32), true, "Optimized: n = 32 (2^5)");
    RUN_TEST(BitManipulation::isPowerOfTwo(0), false, "Optimized: n = 0");
    RUN_TEST(BitManipulation::isPowerOfTwo(3), false, "Optimized: n = 3");
    RUN_TEST(BitManipulation::isPowerOfTwo(6), false, "Optimized: n = 6");
    RUN_TEST(BitManipulation::isPowerOfTwo(std::numeric_limits<int>::min()), false, "Optimized: n = INT_MIN"); // Negative number
    RUN_TEST(BitManipulation::isPowerOfTwo(std::numeric_limits<int>::max()), false, "Optimized: n = INT_MAX"); // Not power of two
    RUN_TEST(BitManipulation::isPowerOfTwo(-2), false, "Optimized: n = -2"); // Negative number

    // Test cases for isPowerOfTwo_Brute
    RUN_TEST(BitManipulation::isPowerOfTwo_Brute(1), true, "Brute: n = 1");
    RUN_TEST(BitManipulation::isPowerOfTwo_Brute(32), true, "Brute: n = 32");
    RUN_TEST(BitManipulation::isPowerOfTwo_Brute(0), false, "Brute: n = 0");
    RUN_TEST(BitManipulation::isPowerOfTwo_Brute(6), false, "Brute: n = 6");
    RUN_TEST(BitManipulation::isPowerOfTwo_Brute(-8), false, "Brute: n = -8");
}

void test_isPowerOfFour() {
    std::cout << "\n--- Testing Is Power Of Four ---" << std::endl;

    // Test cases for isPowerOfFour (Optimized)
    RUN_TEST(BitManipulation::isPowerOfFour(1), true, "Optimized: n = 1 (4^0)");
    RUN_TEST(BitManipulation::isPowerOfFour(4), true, "Optimized: n = 4 (4^1)");
    RUN_TEST(BitManipulation::isPowerOfFour(64), true, "Optimized: n = 64 (4^3)");
    RUN_TEST(BitManipulation::isPowerOfFour(0), false, "Optimized: n = 0");
    RUN_TEST(BitManipulation::isPowerOfFour(2), false, "Optimized: n = 2 (Power of 2, not 4)");
    RUN_TEST(BitManipulation::isPowerOfFour(8), false, "Optimized: n = 8 (Power of 2, not 4)");
    RUN_TEST(BitManipulation::isPowerOfFour(16), true, "Optimized: n = 16 (4^2)");
    RUN_TEST(BitManipulation::isPowerOfFour(3), false, "Optimized: n = 3");
    RUN_TEST(BitManipulation::isPowerOfFour(12), false, "Optimized: n = 12");
    RUN_TEST(BitManipulation::isPowerOfFour(-4), false, "Optimized: n = -4");

    // Test cases for isPowerOfFour_Brute
    RUN_TEST(BitManipulation::isPowerOfFour_Brute(1), true, "Brute: n = 1");
    RUN_TEST(BitManipulation::isPowerOfFour_Brute(64), true, "Brute: n = 64");
    RUN_TEST(BitManipulation::isPowerOfFour_Brute(0), false, "Brute: n = 0");
    RUN_TEST(BitManipulation::isPowerOfFour_Brute(2), false, "Brute: n = 2");
    RUN_TEST(BitManipulation::isPowerOfFour_Brute(8), false, "Brute: n = 8");
    RUN_TEST(BitManipulation::isPowerOfFour_Brute(16), true, "Brute: n = 16");
    RUN_TEST(BitManipulation::isPowerOfFour_Brute(-4), false, "Brute: n = -4");
}


int main() {
    std::cout << "Starting Bit Manipulation Tests..." << std::endl;

    test_countSetBits();
    test_singleNumber();
    test_reverseBits();
    test_isPowerOfTwo();
    test_isPowerOfFour();

    std::cout << "\nAll Bit Manipulation Tests Completed." << std::endl;
    return 0;
}

```