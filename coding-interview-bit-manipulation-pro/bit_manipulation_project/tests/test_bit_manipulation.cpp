```cpp
#include "gtest/gtest.h"
#include "../src/bit_manipulation_solver.hpp"
#include <vector>
#include <cstdint> // For uint32_t

// --- Helper function for printing binary in tests (optional, for debug) ---
std::string toBinary(uint32_t n) {
    if (n == 0) return "0";
    std::string binaryString;
    for (int i = 31; i >= 0; --i) {
        binaryString += ((n >> i) & 1) ? '1' : '0';
    }
    return binaryString;
}

// --- Test Fixture for BitManipulationSolver ---
class BitManipulationSolverTest : public ::testing::Test {
protected:
    // Any setup or teardown logic can go here.
    // For static methods, a fixture is not strictly necessary but good practice.
};

// --- Problem 1: Count Set Bits (Hamming Weight) Tests ---

TEST_F(BitManipulationSolverTest, CountSetBits_BruteForce_Basic) {
    EXPECT_EQ(BitManipulationSolver::countSetBits_BruteForce(0), 0);
    EXPECT_EQ(BitManipulationSolver::countSetBits_BruteForce(1), 1);         // 0001
    EXPECT_EQ(BitManipulationSolver::countSetBits_BruteForce(2), 1);         // 0010
    EXPECT_EQ(BitManipulationSolver::countSetBits_BruteForce(3), 2);         // 0011
    EXPECT_EQ(BitManipulationSolver::countSetBits_BruteForce(8), 1);         // 1000
    EXPECT_EQ(BitManipulationSolver::countSetBits_BruteForce(15), 4);        // 1111
    EXPECT_EQ(BitManipulationSolver::countSetBits_BruteForce(255), 8);       // 11111111
    EXPECT_EQ(BitManipulationSolver::countSetBits_BruteForce(0xAAAAAAAAu), 16); // 1010...1010
    EXPECT_EQ(BitManipulationSolver::countSetBits_BruteForce(0x55555555u), 16); // 0101...0101
    EXPECT_EQ(BitManipulationSolver::countSetBits_BruteForce(~0u), 32);     // All 1s
}

TEST_F(BitManipulationSolverTest, CountSetBits_Kernighan_Basic) {
    EXPECT_EQ(BitManipulationSolver::countSetBits_Kernighan(0), 0);
    EXPECT_EQ(BitManipulationSolver::countSetBits_Kernighan(1), 1);
    EXPECT_EQ(BitManipulationSolver::countSetBits_Kernighan(2), 1);
    EXPECT_EQ(BitManipulationSolver::countSetBits_Kernighan(3), 2);
    EXPECT_EQ(BitManipulationSolver::countSetBits_Kernighan(8), 1);
    EXPECT_EQ(BitManipulationSolver::countSetBits_Kernighan(15), 4);
    EXPECT_EQ(BitManipulationSolver::countSetBits_Kernighan(255), 8);
    EXPECT_EQ(BitManipulationSolver::countSetBits_Kernighan(0xAAAAAAAAu), 16);
    EXPECT_EQ(BitManipulationSolver::countSetBits_Kernighan(0x55555555u), 16);
    EXPECT_EQ(BitManipulationSolver::countSetBits_Kernighan(~0u), 32);
}

TEST_F(BitManipulationSolverTest, CountSetBits_LookupTable_Basic) {
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(0), 0);
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(1), 1);
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(2), 1);
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(3), 2);
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(8), 1);
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(15), 4);
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(255), 8);
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(0xAAAAAAAAu), 16);
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(0x55555555u), 16);
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(~0u), 32);
    // Test with specific byte patterns
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(0x01020408u), 4); // Each byte has 1 bit
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(0xF0F0F0F0u), 16); // Each byte has 4 bits
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(0x0F0F0F0Fu), 16); // Each byte has 4 bits
    EXPECT_EQ(BitManipulationSolver::countSetBits_LookupTable(0xFF00FF00u), 16);
}

// --- Problem 2: Check if a number is a power of two Tests ---

TEST_F(BitManipulationSolverTest, IsPowerOfTwo_Basic) {
    EXPECT_TRUE(BitManipulationSolver::isPowerOfTwo(1));
    EXPECT_TRUE(BitManipulationSolver::isPowerOfTwo(2));
    EXPECT_TRUE(BitManipulationSolver::isPowerOfTwo(4));
    EXPECT_TRUE(BitManipulationSolver::isPowerOfTwo(8));
    EXPECT_TRUE(BitManipulationSolver::isPowerOfTwo(1024));
    EXPECT_TRUE(BitManipulationSolver::isPowerOfTwo(1u << 31)); // Largest power of 2 for uint32_t

    EXPECT_FALSE(BitManipulationSolver::isPowerOfTwo(0));   // Special case: 0 is not a power of two
    EXPECT_FALSE(BitManipulationSolver::isPowerOfTwo(3));
    EXPECT_FALSE(BitManipulationSolver::isPowerOfTwo(6));
    EXPECT_FALSE(BitManipulationSolver::isPowerOfTwo(7));
    EXPECT_FALSE(BitManipulationSolver::isPowerOfTwo(1023));
    EXPECT_FALSE(BitManipulationSolver::isPowerOfTwo(1025));
    EXPECT_FALSE(BitManipulationSolver::isPowerOfTwo(0xFFFFFFFFu)); // All 1s
}

// --- Problem 3: Reverse Bits Tests ---

TEST_F(BitManipulationSolverTest, ReverseBits_Basic) {
    // Example from a common problem statement
    uint32_t input1 = 0b00000010100101000001111010011100u;
    uint32_t expected1 = 0b00111001011110000010100101000000u;
    EXPECT_EQ(BitManipulationSolver::reverseBits(input1), expected1);

    EXPECT_EQ(BitManipulationSolver::reverseBits(0u), 0u); // All zeros remains all zeros
    EXPECT_EQ(BitManipulationSolver::reverseBits(~0u), ~0u); // All ones remains all ones

    // Single LSB set
    EXPECT_EQ(BitManipulationSolver::reverseBits(1u), (1u << 31));

    // Single MSB set
    EXPECT_EQ(BitManipulationSolver::reverseBits(1u << 31), 1u);

    // Simple 8-bit example, extended to 32 bits
    // 00000000 00000000 00000000 11010010 (210)
    // Should reverse to:
    // 01001011 00000000 00000000 00000000 (1264843008)
    uint32_t input2 = 0b00000000000000000000000011010010u; // 210
    uint32_t expected2 = 0b01001011000000000000000000000000u; // 1264843008
    EXPECT_EQ(BitManipulationSolver::reverseBits(input2), expected2);
}

// --- Problem 4: Single Number Tests ---

TEST_F(BitManipulationSolverTest, SingleNumber_Basic) {
    EXPECT_EQ(BitManipulationSolver::singleNumber({2, 2, 1}), 1);
    EXPECT_EQ(BitManipulationSolver::singleNumber({4, 1, 2, 1, 2}), 4);
    EXPECT_EQ(BitManipulationSolver::singleNumber({1}), 1);
    EXPECT_EQ(BitManipulationSolver::singleNumber({7, 3, 5, 4, 5, 3, 7}), 4);
    EXPECT_EQ(BitManipulationSolver::singleNumber({-1, -1, -2}), -2);
    EXPECT_EQ(BitManipulationSolver::singleNumber({0, 0, 5, 5, 10}), 10);
    EXPECT_EQ(BitManipulationSolver::singleNumber({INT_MAX, INT_MAX, INT_MIN, INT_MIN, 123}), 123);
}

TEST_F(BitManipulationSolverTest, SingleNumber_EdgeCases) {
    // Array with only one element
    EXPECT_EQ(BitManipulationSolver::singleNumber({99}), 99);
    // Large numbers
    EXPECT_EQ(BitManipulationSolver::singleNumber({1000000000, 1000000000, 500000000}), 500000000);
}

// --- Problem 5: Insert M into N Tests ---

TEST_F(BitManipulationSolverTest, InsertMIntoN_Basic) {
    uint32_t N = 0b10000000000u; // 1024
    uint32_t M = 0b10011u;       // 19
    int i = 2, j = 6;
    // Expected: 10001001100u (1100)
    EXPECT_EQ(BitManipulationSolver::insertMIntoN(N, M, i, j), 0b10001001100u);

    // N with some bits set, M into empty space
    N = 0b1100000000011u; // 61443
    M = 0b10101u;         // 21
    i = 4; j = 8;
    // N (binary): 1100 0000 0000 0011
    // Clear bits 4-8 in N: 1100 0000 0000 0011 -> 1100 0000 0000 0000 (effectively)
    // M (shifted): 10101 << 4 = 101010000
    // Result: 1100 1010 1000 0011
    EXPECT_EQ(BitManipulationSolver::insertMIntoN(N, M, i, j), 0b1100101010000011u);

    // Insert M into N where M fully occupies the cleared bits
    N = 0b111100001111u;
    M = 0b0110u; // 6
    i = 4; j = 7; // M is 4 bits long, fits exactly
    // N:      1111 0000 1111
    // M:          0110
    // Result: 1111 0110 1111
    EXPECT_EQ(BitManipulationSolver::insertMIntoN(N, M, i, j), 0b111101101111u);
    
    // Insert into all zeros
    N = 0u;
    M = 0b11111u; // 31
    i = 0; j = 4;
    EXPECT_EQ(BitManipulationSolver::insertMIntoN(N, M, i, j), M);

    // Insert into all ones
    N = ~0u;
    M = 0u; // Insert all zeros
    i = 0; j = 31;
    EXPECT_EQ(BitManipulationSolver::insertMIntoN(N, M, i, j), 0u); // All ones cleared to all zeros

    // Insert M into all ones, M is a specific pattern
    N = ~0u;
    M = 0b101u; // 5
    i = 10; j = 12;
    // Expected: 11..11111010111..111 (bits 10,12 set, bit 11 cleared)
    uint32_t expected_val = ~0u;
    expected_val &= ~((7u << 10)); // clear bits 10,11,12 (0b111)
    expected_val |= (M << i); // or with M shifted
    EXPECT_EQ(BitManipulationSolver::insertMIntoN(N, M, i, j), expected_val);
}

TEST_F(BitManipulationSolverTest, InsertMIntoN_EdgePositions) {
    // Insert at LSB (i=0)
    uint32_t N_lsb = 0b10000000000u;
    uint32_t M_lsb = 0b11u; // 3
    int i_lsb = 0, j_lsb = 1;
    EXPECT_EQ(BitManipulationSolver::insertMIntoN(N_lsb, M_lsb, i_lsb, j_lsb), 0b10000000011u);

    // Insert at MSB (j=31)
    uint32_t N_msb = 0b0000000000011u;
    uint32_t M_msb = 0b101u; // 5
    int i_msb = 29, j_msb = 31;
    // N_msb: 0...0011
    // M_msb shifted: 1010...0
    // Result: 1010...011
    EXPECT_EQ(BitManipulationSolver::insertMIntoN(N_msb, M_msb, i_msb, j_msb), (0b101u << 29) | 0b11u);

    // Insert covering entire 32 bits
    uint32_t N_full = 0xAAAAAAAAu; // alternating 10s
    uint32_t M_full = 0x55555555u; // alternating 01s
    int i_full = 0, j_full = 31;
    EXPECT_EQ(BitManipulationSolver::insertMIntoN(N_full, M_full, i_full, j_full), M_full);
}

TEST_F(BitManipulationSolverTest, InsertMIntoN_InvalidArguments) {
    // i > j
    EXPECT_THROW(BitManipulationSolver::insertMIntoN(0, 0, 5, 2), std::invalid_argument);
    // i < 0
    EXPECT_THROW(BitManipulationSolver::insertMIntoN(0, 0, -1, 5), std::invalid_argument);
    // j > 31
    EXPECT_THROW(BitManipulationSolver::insertMIntoN(0, 0, 10, 32), std::invalid_argument);
    // i < 0 and j > 31
    EXPECT_THROW(BitManipulationSolver::insertMIntoN(0, 0, -5, 35), std::invalid_argument);
}
```