#include "BitManipulationSolutions.hpp"
#include "bit_manipulation_utils.hpp"
#include "AdditionalBitManipulationSolutions.hpp" // For testing additional implementations
#include <iostream>
#include <vector>
#include <cassert> // Using standard assert for simplicity, can be replaced by a more robust framework

// Helper macro for testing (simple version)
#define TEST_CASE(test_name) \
    std::cout << "\n--- " << test_name << " ---" << std::endl;

#define REQUIRE_EQUAL(expected, actual, description) \
    do { \
        if ((expected) == (actual)) { \
            BitUtils::assertCondition(true, description); \
        } else { \
            std::cerr << "[FAIL] " << description \
                      << ". Expected: " << (expected) \
                      << ", Actual: " << (actual) << std::endl; \
            exit(EXIT_FAILURE); /* Stop on first failure */ \
        } \
    } while (0)

#define REQUIRE_TRUE(condition, description) \
    do { \
        if (condition) { \
            BitUtils::assertCondition(true, description); \
        } else { \
            std::cerr << "[FAIL] " << description << std::endl; \
            exit(EXIT_FAILURE); \
        } \
    } while (0)

#define REQUIRE_FALSE(condition, description) \
    do { \
        if (!(condition)) { \
            BitUtils::assertCondition(true, description); \
        } else { \
            std::cerr << "[FAIL] " << description << std::endl; \
            exit(EXIT_FAILURE); \
        } \
    } while (0)

void runCountSetBitsTests() {
    TEST_CASE("Count Set Bits (Hamming Weight)")

    // --- countSetBits_BrianKernighan ---
    REQUIRE_EQUAL(0, BitManipulation::countSetBits_BrianKernighan(0), "BrianKernighan: countSetBits(0)");
    REQUIRE_EQUAL(1, BitManipulation::countSetBits_BrianKernighan(1), "BrianKernighan: countSetBits(1)"); // 0001
    REQUIRE_EQUAL(1, BitManipulation::countSetBits_BrianKernighan(2), "BrianKernighan: countSetBits(2)"); // 0010
    REQUIRE_EQUAL(2, BitManipulation::countSetBits_BrianKernighan(3), "BrianKernighan: countSetBits(3)"); // 0011
    REQUIRE_EQUAL(1, BitManipulation::countSetBits_BrianKernighan(4), "BrianKernighan: countSetBits(4)"); // 0100
    REQUIRE_EQUAL(3, BitManipulation::countSetBits_BrianKernighan(7), "BrianKernighan: countSetBits(7)"); // 0111
    REQUIRE_EQUAL(2, BitManipulation::countSetBits_BrianKernighan(10), "BrianKernighan: countSetBits(10)"); // 1010
    REQUIRE_EQUAL(8, BitManipulation::countSetBits_BrianKernighan(255), "BrianKernighan: countSetBits(255)"); // 11111111
    REQUIRE_EQUAL(31, BitManipulation::countSetBits_BrianKernighan(0x7FFFFFFF), "BrianKernighan: countSetBits(0x7FFFFFFF)"); // Max positive int
    REQUIRE_EQUAL(32, BitManipulation::countSetBits_BrianKernighan(0xFFFFFFFF), "BrianKernighan: countSetBits(0xFFFFFFFF)"); // All bits set

    // --- countSetBits_Loop ---
    REQUIRE_EQUAL(0, BitManipulation::countSetBits_Loop(0), "Loop: countSetBits(0)");
    REQUIRE_EQUAL(1, BitManipulation::countSetBits_Loop(1), "Loop: countSetBits(1)");
    REQUIRE_EQUAL(2, BitManipulation::countSetBits_Loop(3), "Loop: countSetBits(3)");
    REQUIRE_EQUAL(32, BitManipulation::countSetBits_Loop(0xFFFFFFFF), "Loop: countSetBits(0xFFFFFFFF)");

    // --- additional_implementations: countSetBits_BruteForce ---
    REQUIRE_EQUAL(0, AdditionalBitManipulation::countSetBits_BruteForce(0), "BruteForce: countSetBits(0)");
    REQUIRE_EQUAL(1, AdditionalBitManipulation::countSetBits_BruteForce(1), "BruteForce: countSetBits(1)");
    REQUIRE_EQUAL(2, AdditionalBitManipulation::countSetBits_BruteForce(3), "BruteForce: countSetBits(3)");
    REQUIRE_EQUAL(32, AdditionalBitManipulation::countSetBits_BruteForce(0xFFFFFFFF), "BruteForce: countSetBits(0xFFFFFFFF)");

    // --- additional_implementations: countSetBits_LookupTable ---
    REQUIRE_EQUAL(0, AdditionalBitManipulation::countSetBits_LookupTable(0), "LookupTable: countSetBits(0)");
    REQUIRE_EQUAL(1, AdditionalBitManipulation::countSetBits_LookupTable(1), "LookupTable: countSetBits(1)");
    REQUIRE_EQUAL(2, AdditionalBitManipulation::countSetBits_LookupTable(3), "LookupTable: countSetBits(3)");
    REQUIRE_EQUAL(8, AdditionalBitManipulation::countSetBits_LookupTable(255), "LookupTable: countSetBits(255)");
    REQUIRE_EQUAL(32, AdditionalBitManipulation::countSetBits_LookupTable(0xFFFFFFFF), "LookupTable: countSetBits(0xFFFFFFFF)");
    REQUIRE_EQUAL(16, AdditionalBitManipulation::countSetBits_LookupTable(0x55555555), "LookupTable: countSetBits(0x55555555)"); // Alternating bits
}

void runReverseBitsTests() {
    TEST_CASE("Reverse Bits")

    // --- reverseBits (main implementation) ---
    REQUIRE_EQUAL(0U, BitManipulation::reverseBits(0U), "reverseBits(0)");
    REQUIRE_EQUAL(0x80000000U, BitManipulation::reverseBits(1U), "reverseBits(1)"); // 0...01 -> 10...0
    REQUIRE_EQUAL(0x00000001U, BitManipulation::reverseBits(0x80000000U), "reverseBits(0x80000000)"); // 10...0 -> 0...01
    REQUIRE_EQUAL(0x00000001U, BitManipulation::reverseBits(0x80000000U), "reverseBits(2147483648U)"); // largest power of 2
    REQUIRE_EQUAL(0x40000000U, BitManipulation::reverseBits(2U), "reverseBits(2)"); // 0...10 -> 010...0
    REQUIRE_EQUAL(0x20000000U, BitManipulation::reverseBits(4U), "reverseBits(4)"); // 0...100 -> 0010...0
    REQUIRE_EQUAL(0xAAAAAAAAU, BitManipulation::reverseBits(0x55555555U), "reverseBits(0x55555555)"); // 0101... -> 1010...
    REQUIRE_EQUAL(0x00000000U, BitManipulation::reverseBits(0x00000000U), "reverseBits(0x00000000)"); // All zeros
    REQUIRE_EQUAL(0xFFFFFFFFU, BitManipulation::reverseBits(0xFFFFFFFFU), "reverseBits(0xFFFFFFFF)"); // All ones

    // Example from LeetCode: input 43261596 (00000010100101000001111010011100)
    // output 964176192 (00111001011110000010100101000000)
    unsigned int input_lc = 43261596U;
    unsigned int expected_lc = 964176192U;
    REQUIRE_EQUAL(expected_lc, BitManipulation::reverseBits(input_lc), "reverseBits(LeetCode Example 43261596)");

    // --- additional_implementations: reverseBits_ByteByByte ---
    REQUIRE_EQUAL(0U, AdditionalBitManipulation::reverseBits_ByteByByte(0U), "ByteByByte: reverseBits(0)");
    REQUIRE_EQUAL(0x80000000U, AdditionalBitManipulation::reverseBits_ByteByByte(1U), "ByteByByte: reverseBits(1)");
    REQUIRE_EQUAL(0x00000001U, AdditionalBitManipulation::reverseBits_ByteByByte(0x80000000U), "ByteByByte: reverseBits(0x80000000)");
    REQUIRE_EQUAL(0xAAAAAAAAU, AdditionalBitManipulation::reverseBits_ByteByByte(0x55555555U), "ByteByByte: reverseBits(0x55555555)");
    REQUIRE_EQUAL(expected_lc, AdditionalBitManipulation::reverseBits_ByteByByte(input_lc), "ByteByByte: reverseBits(LeetCode Example 43261596)");

}

void runSingleNumberTests() {
    TEST_CASE("Single Number")

    // --- singleNumber_XOR ---
    REQUIRE_EQUAL(1, BitManipulation::singleNumber_XOR({2, 2, 1}), "XOR: Single number in {2,2,1} is 1");
    REQUIRE_EQUAL(4, BitManipulation::singleNumber_XOR({4, 1, 2, 1, 2}), "XOR: Single number in {4,1,2,1,2} is 4");
    REQUIRE_EQUAL(7, BitManipulation::singleNumber_XOR({7}), "XOR: Single number in {7} is 7");
    REQUIRE_EQUAL(0, BitManipulation::singleNumber_XOR({0}), "XOR: Single number in {0} is 0");
    REQUIRE_EQUAL(-1, BitManipulation::singleNumber_XOR({-1, 0, -1}), "XOR: Single number in {-1,0,-1} is 0");
    REQUIRE_EQUAL(100, BitManipulation::singleNumber_XOR({10, 20, 10, 20, 100}), "XOR: Single number in {10,20,10,20,100} is 100");
    REQUIRE_EQUAL(0xABCD, BitManipulation::singleNumber_XOR({0x1234, 0x5678, 0x1234, 0x5678, 0xABCD}), "XOR: Single number with hex values");

    // --- singleNumber_HashMap ---
    REQUIRE_EQUAL(1, BitManipulation::singleNumber_HashMap({2, 2, 1}), "HashMap: Single number in {2,2,1} is 1");
    REQUIRE_EQUAL(4, BitManipulation::singleNumber_HashMap({4, 1, 2, 1, 2}), "HashMap: Single number in {4,1,2,1,2} is 4");
    REQUIRE_EQUAL(7, BitManipulation::singleNumber_HashMap({7}), "HashMap: Single number in {7} is 7");
    REQUIRE_EQUAL(0, BitManipulation::singleNumber_HashMap({0}), "HashMap: Single number in {0} is 0");
    REQUIRE_EQUAL(-1, BitManipulation::singleNumber_HashMap({-1, 0, -1}), "HashMap: Single number in {-1,0,-1} is 0");
}

void runIsPowerOfTwoTests() {
    TEST_CASE("Is Power of 2")

    // --- isPowerOfTwo_Bitwise ---
    REQUIRE_FALSE(BitManipulation::isPowerOfTwo_Bitwise(0), "Bitwise: isPowerOfTwo(0) should be false");
    REQUIRE_TRUE(BitManipulation::isPowerOfTwo_Bitwise(1), "Bitwise: isPowerOfTwo(1) should be true (2^0)");
    REQUIRE_TRUE(BitManipulation::isPowerOfTwo_Bitwise(2), "Bitwise: isPowerOfTwo(2) should be true (2^1)");
    REQUIRE_FALSE(BitManipulation::isPowerOfTwo_Bitwise(3), "Bitwise: isPowerOfTwo(3) should be false");
    REQUIRE_TRUE(BitManipulation::isPowerOfTwo_Bitwise(4), "Bitwise: isPowerOfTwo(4) should be true (2^2)");
    REQUIRE_FALSE(BitManipulation::isPowerOfTwo_Bitwise(6), "Bitwise: isPowerOfTwo(6) should be false");
    REQUIRE_TRUE(BitManipulation::isPowerOfTwo_Bitwise(8), "Bitwise: isPowerOfTwo(8) should be true (2^3)");
    REQUIRE_TRUE(BitManipulation::isPowerOfTwo_Bitwise(1024), "Bitwise: isPowerOfTwo(1024) should be true (2^10)");
    REQUIRE_FALSE(BitManipulation::isPowerOfTwo_Bitwise(1023), "Bitwise: isPowerOfTwo(1023) should be false");
    REQUIRE_FALSE(BitManipulation::isPowerOfTwo_Bitwise(-2), "Bitwise: isPowerOfTwo(-2) should be false"); // Negative numbers

    // --- isPowerOfTwo_Loop ---
    REQUIRE_FALSE(BitManipulation::isPowerOfTwo_Loop(0), "Loop: isPowerOfTwo(0) should be false");
    REQUIRE_TRUE(BitManipulation::isPowerOfTwo_Loop(1), "Loop: isPowerOfTwo(1) should be true");
    REQUIRE_TRUE(BitManipulation::isPowerOfTwo_Loop(2), "Loop: isPowerOfTwo(2) should be true");
    REQUIRE_FALSE(BitManipulation::isPowerOfTwo_Loop(3), "Loop: isPowerOfTwo(3) should be false");
    REQUIRE_TRUE(BitManipulation::isPowerOfTwo_Loop(4), "Loop: isPowerOfTwo(4) should be true");
    REQUIRE_TRUE(BitManipulation::isPowerOfTwo_Loop(1024), "Loop: isPowerOfTwo(1024) should be true");
    REQUIRE_FALSE(BitManipulation::isPowerOfTwo_Loop(-4), "Loop: isPowerOfTwo(-4) should be false");
}

void runInsertMIntoNTests() {
    TEST_CASE("Insert M into N")

    unsigned int N, M, expected;
    int i, j;

    // Example 1: N = 10000000000_2, M = 10011_2, i = 2, j = 6
    // N: 10000000000 (2048)
    // M:       10011 (19)
    // i: 2, j: 6
    // Result: 10001001100 (2204)
    N = 0b10000000000; // 2048
    M = 0b10011;       // 19
    i = 2; j = 6;
    expected = 0b10001001100; // 2204
    REQUIRE_EQUAL(expected, BitManipulation::insertMIntoN(N, M, i, j), "insertMIntoN(N=2048, M=19, i=2, j=6)");

    // Example 2: N = 1024 (0b10000000000), M = 21 (0b10101), i = 2, j = 6 (same N and i,j as ex1)
    // N: 10000000000
    // M:       10101
    // i: 2, j: 6
    // Result: 10001010100 (2212)
    N = 1U << 10; // 1024
    M = 21;       // 0b10101
    i = 2; j = 6;
    expected = (1U << 10) | (21U << 2);
    // Let's break it down:
    // N (1024): ...0000 0100 0000 0000
    // M (21):   ...0000 0001 0101
    // i=2, j=6. Clear bits N[2..6]
    // Mask for N[0..i-1]: 0000 0000 0011 (1<<2)-1
    // Mask for N[j+1..31]: 1111 1111 1100 0000 0000 (...111110000000) = (~0U) << (6+1)
    // Clear mask: (0b111110000000 | 0b000000000011) = 0b111110000011 (only these bits remain from N)
    // N cleared: 0b10000000000 & 0b111110000011 = 0b10000000000 (2048)
    // M shifted: M << 2 = 0b1010100 (84)
    // Result: 0b10000000000 | 0b1010100 = 0b10001010100 (2048 + 84 = 2132)
    // Re-calculating expected:
    // N: 0...010000000000
    // M: 0...000000010101
    // i=2, j=6
    // Clear N[2..6]: 0...010000000000 AND (left mask | right mask)
    // Left mask: ~0U << 7 = 11111111111111111111111110000000
    // Right mask: (1U << 2) - 1 = 00000000000000000000000000000011
    // Full clear mask: 11111111111111111111111110000011
    // N & clear_mask: 0...010000000000 & 1...10000011 = 0...010000000000 (N itself, as its bits are outside i..j)
    // M shifted: 0...000000010101 << 2 = 0...000001010100
    // N | M_shifted: 0...010000000000 | 0...000001010100 = 0...010001010100 (2132)
    expected = 2132U;
    REQUIRE_EQUAL(expected, BitManipulation::insertMIntoN(N, M, i, j), "insertMIntoN(N=1024, M=21, i=2, j=6)");

    // Edge Case: M inserted at the beginning (i=0)
    N = 0b11110000; // 240
    M = 0b101;     // 5
    i = 0; j = 2;
    expected = 0b11110101; // 245
    REQUIRE_EQUAL(expected, BitManipulation::insertMIntoN(N, M, i, j), "insertMIntoN(N=240, M=5, i=0, j=2)");

    // Edge Case: M inserted at the end (highest bits)
    N = 0b00001111; // 15
    M = 0b101;     // 5
    i = 29; j = 31; // For a 32-bit int, highest bits are 29, 30, 31
    // Expected: 0b10100000000000000000000000001111
    expected = (5U << 29) | 0b1111U;
    REQUIRE_EQUAL(expected, BitManipulation::insertMIntoN(N, M, i, j), "insertMIntoN(N=15, M=5, i=29, j=31)");

    // M covering entire N
    N = 0xFFFFFFFFU;
    M = 0xAAAAAAAAU;
    i = 0; j = 31;
    expected = 0xAAAAAAAAU;
    REQUIRE_EQUAL(expected, BitManipulation::insertMIntoN(N, M, i, j), "insertMIntoN(N=all_ones, M=0xAAAAAAAA, i=0, j=31)");

    // M is 0
    N = 0b101010;
    M = 0;
    i = 1; j = 3;
    expected = 0b100010; // Original: 0b101010, cleared bits [1..3] -> 0b100000. M shifted is 0. So N is just cleared.
    REQUIRE_EQUAL(expected, BitManipulation::insertMIntoN(N, M, i, j), "insertMIntoN(N=0b101010, M=0, i=1, j=3)");

    // M is N itself
    N = 0b110110;
    M = 0b110;
    i = 2; j = 4;
    // N: 110110
    // M:   110
    // cleared N: 100010
    // shifted M: 11000
    // Result: 111010
    expected = 0b111010;
    REQUIRE_EQUAL(expected, BitManipulation::insertMIntoN(N, M, i, j), "insertMIntoN(N=0b110110, M=0b110, i=2, j=4)");
}


int main() {
    std::cout << "Starting Bit Manipulation Tests..." << std::endl;

    runCountSetBitsTests();
    runReverseBitsTests();
    runSingleNumberTests();
    runIsPowerOfTwoTests();
    runInsertMIntoNTests();

    std::cout << "\nAll tests passed successfully!" << std::endl;
    return 0;
}

---