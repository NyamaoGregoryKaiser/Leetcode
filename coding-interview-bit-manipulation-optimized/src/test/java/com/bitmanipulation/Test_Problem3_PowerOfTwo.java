```java
package com.bitmanipulation;

import com.bitmanipulation.problems.Problem3_PowerOfTwo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit tests for Problem3_PowerOfTwo.
 */
@DisplayName("Problem3_PowerOfTwo Tests")
public class Test_Problem3_PowerOfTwo {

    private Problem3_PowerOfTwo solution;

    @BeforeEach
    void setUp() {
        solution = new Problem3_PowerOfTwo();
    }

    // --- Test cases for isPowerOfTwo_Iterative ---
    @Test
    @DisplayName("Iterative: Test with 1 (2^0)")
    void testIterative_One() {
        assertEquals(true, solution.isPowerOfTwo_Iterative(1));
    }

    @Test
    @DisplayName("Iterative: Test with 16 (2^4)")
    void testIterative_Sixteen() {
        assertEquals(true, solution.isPowerOfTwo_Iterative(16));
    }

    @Test
    @DisplayName("Iterative: Test with 3 (not power of two)")
    void testIterative_Three() {
        assertEquals(false, solution.isPowerOfTwo_Iterative(3));
    }

    @Test
    @DisplayName("Iterative: Test with 0")
    void testIterative_Zero() {
        assertEquals(false, solution.isPowerOfTwo_Iterative(0));
    }

    @Test
    @DisplayName("Iterative: Test with negative number (-16)")
    void testIterative_Negative() {
        assertEquals(false, solution.isPowerOfTwo_Iterative(-16));
    }

    @Test
    @DisplayName("Iterative: Test with large power of two (2^30)")
    void testIterative_LargePowerOfTwo() {
        assertEquals(true, solution.isPowerOfTwo_Iterative(1 << 30));
    }

    @Test
    @DisplayName("Iterative: Test with large non-power of two")
    void testIterative_LargeNonPowerOfTwo() {
        assertEquals(false, solution.isPowerOfTwo_Iterative((1 << 30) + 1));
    }

    @Test
    @DisplayName("Iterative: Test with Integer.MAX_VALUE")
    void testIterative_MaxInt() {
        assertEquals(false, solution.isPowerOfTwo_Iterative(Integer.MAX_VALUE));
    }

    // --- Test cases for isPowerOfTwo_BitwiseAND ---
    @Test
    @DisplayName("Bitwise AND: Test with 1 (2^0)")
    void testBitwiseAND_One() {
        assertEquals(true, solution.isPowerOfTwo_BitwiseAND(1));
    }

    @Test
    @DisplayName("Bitwise AND: Test with 16 (2^4)")
    void testBitwiseAND_Sixteen() {
        assertEquals(true, solution.isPowerOfTwo_BitwiseAND(16));
    }

    @Test
    @DisplayName("Bitwise AND: Test with 3 (not power of two)")
    void testBitwiseAND_Three() {
        assertEquals(false, solution.isPowerOfTwo_BitwiseAND(3));
    }

    @Test
    @DisplayName("Bitwise AND: Test with 0")
    void testBitwiseAND_Zero() {
        assertEquals(false, solution.isPowerOfTwo_BitwiseAND(0));
    }

    @Test
    @DisplayName("Bitwise AND: Test with negative number (-16)")
    void testBitwiseAND_Negative() {
        assertEquals(false, solution.isPowerOfTwo_BitwiseAND(-16));
    }

    @Test
    @DisplayName("Bitwise AND: Test with large power of two (2^30)")
    void testBitwiseAND_LargePowerOfTwo() {
        assertEquals(true, solution.isPowerOfTwo_BitwiseAND(1 << 30));
    }

    @Test
    @DisplayName("Bitwise AND: Test with large non-power of two")
    void testBitwiseAND_LargeNonPowerOfTwo() {
        assertEquals(false, solution.isPowerOfTwo_BitwiseAND((1 << 30) + 1));
    }

    @Test
    @DisplayName("Bitwise AND: Test with Integer.MIN_VALUE (is a power of 2, 2^31, but negative)")
    void testBitwiseAND_MinInt() {
        // Integer.MIN_VALUE (100...000) would be 2^31 if interpreted as unsigned.
        // As a signed int, it's negative, so should return false based on definition.
        assertEquals(false, solution.isPowerOfTwo_BitwiseAND(Integer.MIN_VALUE));
    }

    // --- Test cases for isPowerOfTwo_BitCount ---
    @Test
    @DisplayName("BitCount: Test with 1 (2^0)")
    void testBitCount_One() {
        assertEquals(true, solution.isPowerOfTwo_BitCount(1));
    }

    @Test
    @DisplayName("BitCount: Test with 16 (2^4)")
    void testBitCount_Sixteen() {
        assertEquals(true, solution.isPowerOfTwo_BitCount(16));
    }

    @Test
    @DisplayName("BitCount: Test with 3 (not power of two)")
    void testBitCount_Three() {
        assertEquals(false, solution.isPowerOfTwo_BitCount(3));
    }

    @Test
    @DisplayName("BitCount: Test with 0")
    void testBitCount_Zero() {
        assertEquals(false, solution.isPowerOfTwo_BitCount(0));
    }

    @Test
    @DisplayName("BitCount: Test with negative number (-16)")
    void testBitCount_Negative() {
        assertEquals(false, solution.isPowerOfTwo_BitCount(-16));
    }

    @Test
    @DisplayName("BitCount: Test with large power of two (2^30)")
    void testBitCount_LargePowerOfTwo() {
        assertEquals(true, solution.isPowerOfTwo_BitCount(1 << 30));
    }

    @Test
    @DisplayName("BitCount: Test with large non-power of two")
    void testBitCount_LargeNonPowerOfTwo() {
        assertEquals(false, solution.isPowerOfTwo_BitCount((1 << 30) + 1));
    }

    @Test
    @DisplayName("BitCount: Test with Integer.MIN_VALUE")
    void testBitCount_MinInt() {
        assertEquals(false, solution.isPowerOfTwo_BitCount(Integer.MIN_VALUE));
    }

    // --- Consistency Test ---
    @Test
    @DisplayName("Consistency: All methods should agree on various inputs")
    void testConsistencyAcrossMethods() {
        int[] testNumbers = {1, 2, 3, 4, 0, 16, 32, 1024, 1023, -1, -2, Integer.MAX_VALUE, Integer.MIN_VALUE, (1 << 20)};
        for (int num : testNumbers) {
            boolean expectedIterative = solution.isPowerOfTwo_Iterative(num);
            assertEquals(expectedIterative, solution.isPowerOfTwo_BitwiseAND(num), "Bitwise AND failed for " + num);
            assertEquals(expectedIterative, solution.isPowerOfTwo_BitCount(num), "BitCount failed for " + num);
        }
    }
}
```