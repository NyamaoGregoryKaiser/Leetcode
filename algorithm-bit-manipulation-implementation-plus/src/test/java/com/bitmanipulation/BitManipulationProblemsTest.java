```java
package com.bitmanipulation;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * BitManipulationProblemsTest.java
 *
 * JUnit 5 test class for BitManipulationProblems.
 * Provides comprehensive test cases for each problem, including positive, negative,
 * edge cases (0, MAX_VALUE, MIN_VALUE), and specific examples.
 */
class BitManipulationProblemsTest {

    private BitManipulationProblems solver;

    @BeforeEach
    void setUp() {
        solver = new BitManipulationProblems();
    }

    @Nested
    @DisplayName("Problem 1: Count Set Bits (Hamming Weight)")
    class CountSetBitsTest {

        @Test
        @DisplayName("Test case: 0 (0000...0000)")
        void testCountSetBits_Zero() {
            assertEquals(0, solver.countSetBits_Iteration(0));
            assertEquals(0, solver.countSetBits_BrianKernighan(0));
            assertEquals(0, solver.countSetBits_BuiltIn(0));
        }

        @Test
        @DisplayName("Test case: 1 (0000...0001)")
        void testCountSetBits_One() {
            assertEquals(1, solver.countSetBits_Iteration(1));
            assertEquals(1, solver.countSetBits_BrianKernighan(1));
            assertEquals(1, solver.countSetBits_BuiltIn(1));
        }

        @Test
        @DisplayName("Test case: 11 (0000...1011)")
        void testCountSetBits_Eleven() {
            assertEquals(3, solver.countSetBits_Iteration(11));
            assertEquals(3, solver.countSetBits_BrianKernighan(11));
            assertEquals(3, solver.countSetBits_BuiltIn(11));
        }

        @Test
        @DisplayName("Test case: 255 (0000...11111111)")
        void testCountSetBits_TwoFiftyFive() {
            assertEquals(8, solver.countSetBits_Iteration(255));
            assertEquals(8, solver.countSetBits_BrianKernighan(255));
            assertEquals(8, solver.countSetBits_BuiltIn(255));
        }

        @Test
        @DisplayName("Test case: Integer.MAX_VALUE (0111...1111)")
        void testCountSetBits_MaxInt() {
            assertEquals(31, solver.countSetBits_Iteration(Integer.MAX_VALUE));
            assertEquals(31, solver.countSetBits_BrianKernighan(Integer.MAX_VALUE));
            assertEquals(31, solver.countSetBits_BuiltIn(Integer.MAX_VALUE));
        }

        @Test
        @DisplayName("Test case: -1 (1111...1111) - all bits set")
        void testCountSetBits_NegativeOne() {
            // For unsigned 32-bit int, -1 is all 1s.
            assertEquals(32, solver.countSetBits_Iteration(-1)); // Iteration uses >>>, correctly counts 32
            assertEquals(32, solver.countSetBits_BrianKernighan(-1)); // Brian Kernighan's works for negative too
            assertEquals(32, solver.countSetBits_BuiltIn(-1)); // Built-in handles it
        }

        @Test
        @DisplayName("Test case: Integer.MIN_VALUE (1000...0000) - one set bit")
        void testCountSetBits_MinInt() {
            assertEquals(1, solver.countSetBits_Iteration(Integer.MIN_VALUE));
            assertEquals(1, solver.countSetBits_BrianKernighan(Integer.MIN_VALUE));
            assertEquals(1, solver.countSetBits_BuiltIn(Integer.MIN_VALUE));
        }

        @Test
        @DisplayName("Test case: Powers of 2")
        void testCountSetBits_PowersOfTwo() {
            assertEquals(1, solver.countSetBits_Iteration(2));
            assertEquals(1, solver.countSetBits_BrianKernighan(4));
            assertEquals(1, solver.countSetBits_BuiltIn(16));
            assertEquals(1, solver.countSetBits_BuiltIn(1 << 30)); // Large power of 2
        }

        @Test
        @DisplayName("Test case: Large number, mixed bits")
        void testCountSetBits_LargeMixed() {
            // 2147483647 is MAX_VALUE (31 ones)
            // 2147483646 is MAX_VALUE - 1 (30 ones)
            assertEquals(30, solver.countSetBits_Iteration(2147483646));
            assertEquals(30, solver.countSetBits_BrianKernighan(2147483646));
            assertEquals(30, solver.countSetBits_BuiltIn(2147483646));

            // -10 (binary: 11111111111111111111111111110110) has 30 set bits
            assertEquals(30, solver.countSetBits_Iteration(-10));
            assertEquals(30, solver.countSetBits_BrianKernighan(-10));
            assertEquals(30, solver.countSetBits_BuiltIn(-10));
        }
    }

    @Nested
    @DisplayName("Problem 2: Single Number")
    class SingleNumberTest {

        @Test
        @DisplayName("Test case: Basic example [2,2,1]")
        void testSingleNumber_Basic1() {
            int[] nums = {2, 2, 1};
            assertEquals(1, solver.singleNumber_XOR(nums));
        }

        @Test
        @DisplayName("Test case: Basic example [4,1,2,1,2]")
        void testSingleNumber_Basic2() {
            int[] nums = {4, 1, 2, 1, 2};
            assertEquals(4, solver.singleNumber_XOR(nums));
        }

        @Test
        @DisplayName("Test case: Array with only one element [7]")
        void testSingleNumber_SingleElement() {
            int[] nums = {7};
            assertEquals(7, solver.singleNumber_XOR(nums));
        }

        @Test
        @DisplayName("Test case: Single number at the beginning")
        void testSingleNumber_Start() {
            int[] nums = {1, 2, 2, 3, 3};
            assertEquals(1, solver.singleNumber_XOR(nums));
        }

        @Test
        @DisplayName("Test case: Single number at the end")
        void testSingleNumber_End() {
            int[] nums = {2, 2, 3, 3, 1};
            assertEquals(1, solver.singleNumber_XOR(nums));
        }

        @Test
        @DisplayName("Test case: Single number in the middle")
        void testSingleNumber_Middle() {
            int[] nums = {2, 2, 1, 3, 3};
            assertEquals(1, solver.singleNumber_XOR(nums));
        }

        @Test
        @DisplayName("Test case: With negative numbers")
        void testSingleNumber_Negatives() {
            int[] nums = {-1, 2, 2, -1, 5};
            assertEquals(5, solver.singleNumber_XOR(nums));
        }

        @Test
        @DisplayName("Test case: With zero")
        void testSingleNumber_Zero() {
            int[] nums = {0, 1, 0, 2, 2};
            assertEquals(1, solver.singleNumber_XOR(nums));
        }

        @Test
        @DisplayName("Test case: Large numbers")
        void testSingleNumber_LargeNumbers() {
            int largeNum = 1_000_000_007;
            int[] nums = {largeNum, 5, 5, largeNum, Integer.MAX_VALUE, Integer.MAX_VALUE, 123};
            assertEquals(123, solver.singleNumber_XOR(nums));
        }
    }

    @Nested
    @DisplayName("Problem 3: Power of Two")
    class PowerOfTwoTest {

        @Test
        @DisplayName("Test case: n = 1 (2^0)")
        void testIsPowerOfTwo_One() {
            assertTrue(solver.isPowerOfTwo_Bitwise(1));
            assertTrue(solver.isPowerOfTwo_Loop(1));
        }

        @Test
        @DisplayName("Test case: n = 16 (2^4)")
        void testIsPowerOfTwo_Sixteen() {
            assertTrue(solver.isPowerOfTwo_Bitwise(16));
            assertTrue(solver.isPowerOfTwo_Loop(16));
        }

        @Test
        @DisplayName("Test case: n = 3 (not a power of two)")
        void testIsPowerOfTwo_Three() {
            assertFalse(solver.isPowerOfTwo_Bitwise(3));
            assertFalse(solver.isPowerOfTwo_Loop(3));
        }

        @Test
        @DisplayName("Test case: n = 0")
        void testIsPowerOfTwo_Zero() {
            assertFalse(solver.isPowerOfTwo_Bitwise(0));
            assertFalse(solver.isPowerOfTwo_Loop(0));
        }

        @Test
        @DisplayName("Test case: Negative numbers (e.g., -2)")
        void testIsPowerOfTwo_Negative() {
            assertFalse(solver.isPowerOfTwo_Bitwise(-2));
            assertFalse(solver.isPowerOfTwo_Loop(-2));
        }

        @Test
        @DisplayName("Test case: n = 2")
        void testIsPowerOfTwo_Two() {
            assertTrue(solver.isPowerOfTwo_Bitwise(2));
            assertTrue(solver.isPowerOfTwo_Loop(2));
        }

        @Test
        @DisplayName("Test case: n = 1024 (2^10)")
        void testIsPowerOfTwo_LargePower() {
            assertTrue(solver.isPowerOfTwo_Bitwise(1024));
            assertTrue(solver.isPowerOfTwo_Loop(1024));
        }

        @Test
        @DisplayName("Test case: n = 1023 (not a power of two)")
        void testIsPowerOfTwo_NotPowerOfTwo() {
            assertFalse(solver.isPowerOfTwo_Bitwise(1023));
            assertFalse(solver.isPowerOfTwo_Loop(1023));
        }

        @Test
        @DisplayName("Test case: n = Integer.MIN_VALUE (100...000)")
        void testIsPowerOfTwo_MinInt() {
            // Integer.MIN_VALUE is -2^31, which is technically 2^31 in magnitude
            // but for positive definition, it should be false.
            assertFalse(solver.isPowerOfTwo_Bitwise(Integer.MIN_VALUE));
            assertFalse(solver.isPowerOfTwo_Loop(Integer.MIN_VALUE));
        }
    }

    @Nested
    @DisplayName("Problem 4: Reverse Bits")
    class ReverseBitsTest {

        @Test
        @DisplayName("Test case: 0 (all zeros)")
        void testReverseBits_Zero() {
            assertEquals(0, solver.reverseBits_Iteration(0));
            assertEquals(0, solver.reverseBits_BuiltIn(0));
        }

        @Test
        @DisplayName("Test case: 1 (0...0001) -> (1000...0)")")
        void testReverseBits_One() {
            assertEquals(1 << 31, solver.reverseBits_Iteration(1));
            assertEquals(1 << 31, solver.reverseBits_BuiltIn(1));
        }

        @Test
        @DisplayName("Test case: 2 (0...0010) -> (0100...0)")")
        void testReverseBits_Two() {
            assertEquals(1 << 30, solver.reverseBits_Iteration(2));
            assertEquals(1 << 30, solver.reverseBits_BuiltIn(2));
        }

        @Test
        @DisplayName("Test case: Example from problem description (11)")
        void testReverseBits_Eleven() { // 11 is 0...00001011
            // Reversed should be 11010000...000
            // Binary string: 00000000000000000000000000001011
            // Reversed:      11010000000000000000000000000000
            int n = 11;
            int expected = Integer.parseUnsignedInt("11010000000000000000000000000000", 2);
            assertEquals(expected, solver.reverseBits_Iteration(n));
            assertEquals(expected, solver.reverseBits_BuiltIn(n));
        }

        @Test
        @DisplayName("Test case: Max value (0111...1111)")
        void testReverseBits_MaxInt() {
            // Integer.MAX_VALUE (0111...1111) reversed is still 0111...1111 but shifted.
            // Specifically, 1 at MSB then 30 1s, then 0. This gives us 2^30 + 2^29 + ... + 2^1.
            int n = Integer.MAX_VALUE;
            // The reverse of 011...1 (31 ones) is 11...110 (31 ones followed by a zero)
            // This is (2^31 - 1) * 2 or more accurately Integer.MIN_VALUE | (~Integer.MIN_VALUE >>> 1) << 1
            // which is -2_147_483_648 | (0x7FFFFFFF >>> 1) << 1 = -2_147_483_648 | 0x3FFFFFFF << 1
            // = -2_147_483_648 | 0x7FFFFFFE = -2
            int expected = -2; // 111...1110
            assertEquals(expected, solver.reverseBits_Iteration(n));
            assertEquals(expected, solver.reverseBits_BuiltIn(n));
        }

        @Test
        @DisplayName("Test case: Min value (1000...0000)")
        void testReverseBits_MinInt() {
            // Integer.MIN_VALUE (1000...0000) reversed is 0000...0001
            int n = Integer.MIN_VALUE;
            int expected = 1;
            assertEquals(expected, solver.reverseBits_Iteration(n));
            assertEquals(expected, solver.reverseBits_BuiltIn(n));
        }

        @Test
        @DisplayName("Test case: Mixed bits pattern (e.g., 0xAAAAAAAA)")
        void testReverseBits_MixedPattern() { // 0xAAAAAAAA is 101010...1010
            // Reversed it should be 010101...0101 (0x55555555)
            int n = 0xAAAAAAAA;
            int expected = 0x55555555;
            assertEquals(expected, solver.reverseBits_Iteration(n));
            assertEquals(expected, solver.reverseBits_BuiltIn(n));
        }

        @Test
        @DisplayName("Test case: Mixed bits pattern (e.g., 0x55555555)")
        void testReverseBits_MixedPattern2() { // 0x55555555 is 010101...0101
            // Reversed it should be 101010...1010 (0xAAAAAAAA)
            int n = 0x55555555;
            int expected = 0xAAAAAAAA;
            assertEquals(expected, solver.reverseBits_Iteration(n));
            assertEquals(expected, solver.reverseBits_BuiltIn(n));
        }
    }

    @Nested
    @DisplayName("Problem 5: Update Bits (Insert M into N)")
    class UpdateBitsTest {

        @Test
        @DisplayName("Test case: Example from problem description N=1024, M=19, i=2, j=6")
        void testUpdateBits_Example() {
            // N = 1024 (binary: ...10000000000)
            // M = 19   (binary: ...00010011)
            // i = 2, j = 6
            // Expected: N = ...10001001100 (binary) = 1164
            int N = 1024; // 0000010000000000
            int M = 19;   // 0000000000010011
            int i = 2;
            int j = 6;
            int expected = 1164; // 0000010001001100

            assertEquals(expected, solver.updateBits(N, M, i, j));
        }

        @Test
        @DisplayName("Test case: Insert into all zeros")
        void testUpdateBits_AllZeros() {
            // N = 0
            // M = 255 (11111111)
            // i = 0, j = 7
            // Expected: 255
            int N = 0;
            int M = 255;
            int i = 0;
            int j = 7;
            int expected = 255; // 000...011111111

            assertEquals(expected, solver.updateBits(N, M, i, j));
        }

        @Test
        @DisplayName("Test case: Insert into all ones")
        void testUpdateBits_AllOnes() {
            // N = -1 (all ones)
            // M = 0
            // i = 0, j = 3
            // Expected: ...11111111111111111111111111110000 (clear 4 LSBs)
            int N = -1; // 111...1111
            int M = 0;
            int i = 0;
            int j = 3;
            int expected = ~((1 << 4) - 1); // Equivalent to -16

            assertEquals(expected, solver.updateBits(N, M, i, j));
        }

        @Test
        @DisplayName("Test case: Insert M at beginning (i=0, j=M_bit_length-1)")
        void testUpdateBits_Beginning() {
            // N = 0b11110000
            // M = 0b111 (7)
            // i = 0, j = 2
            // Expected: 0b11110111
            int N = 0b11110000; // 240
            int M = 0b111;      // 7
            int i = 0;
            int j = 2;
            int expected = 0b11110111; // 247

            assertEquals(expected, solver.updateBits(N, M, i, j));
        }

        @Test
        @DisplayName("Test case: Insert M at end (i=31-M_bit_length, j=31)")
        void testUpdateBits_End() {
            // N = 0x0000FFFF
            // M = 0xAAAA (43690)
            // i = 16, j = 31 (M fits within 16 bits)
            // Expected: 0xAAAAFFFF
            int N = 0x0000FFFF; // 0...01111111111111111
            int M = 0xAAAA;     // 1010101010101010
            int i = 16;
            int j = 31;
            int expected = 0xAAAAFFFF;

            assertEquals(expected, solver.updateBits(N, M, i, j));
        }

        @Test
        @DisplayName("Test case: M is larger than space (but problem assumes M fits)")
        void testUpdateBits_MTooLarge() {
            // N = 0b100000000
            // M = 0b111111 (63)
            // i = 1, j = 3 (space for 3 bits: 0111)
            // The problem statement assumes j-i+1 >= k.
            // If M=63 (111111) and i=1, j=3 (length 3), M would be truncated by `m << i`.
            // M=63 (00...111111), M<<1 = (00...1111110)
            // We want to insert 111111. Only 3 bits will be taken from M<<i, starting from LSB.
            // M=63, M<<i = 0b...1111110. The 3 bits from 1 to 3 are 111.
            int N = 0b100000000; // 256
            int M = 0b111111;    // 63
            int i = 1;
            int j = 3; // Clear bits at 1,2,3. So 0...01110
            int expected = 0b100001110; // N with cleared bits, then M_shifted 0b...1111110. Only 3 LSBs from M will be inserted.
                                        // (M << i) will be 0b1111110.
                                        // N_cleared: 0b100000000 & ~ (0b1110) = 0b100000000 & 0b...11110001 = 0b100000000
                                        // 0b100000000 | 0b...1111110 = 0b100000000 | 0b1110 = 0b100001110
            int expectedValue = 256 | (63 << 1); // The lower bits of M are taken. 256 | 126 = 382
            // Let's re-evaluate. The problem says "insert M...such that M starts at bit j and ends at bit i."
            // This means M itself is considered to be `(M & ((1 << (j-i+1)) - 1))`.
            // So if M=63 (111111) and space is 3 bits, we are conceptually inserting 111.
            // So M' = M & ((1 << (j-i+1)) - 1) = 63 & ((1 << 3) - 1) = 63 & 7 = 7
            // So we insert 7.
            int M_effective = M & ((1 << (j - i + 1)) - 1); // 63 & 7 = 7 (0b111)
            int expectedCalculated = solver.updateBits(N, M_effective, i, j); // Should be 256 | (7 << 1) = 256 | 14 = 270

            assertEquals(solver.updateBits(N, M, i, j), expectedCalculated);
            assertEquals(270, solver.updateBits(N,M,i,j));

        }
    }
}
```