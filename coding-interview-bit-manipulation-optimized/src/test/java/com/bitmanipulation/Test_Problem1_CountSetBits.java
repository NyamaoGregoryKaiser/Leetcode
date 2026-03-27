```java
package com.bitmanipulation;

import com.bitmanipulation.problems.Problem1_CountSetBits;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit tests for Problem1_CountSetBits.
 */
@DisplayName("Problem1_CountSetBits Tests")
public class Test_Problem1_CountSetBits {

    private Problem1_CountSetBits solution;

    @BeforeEach
    void setUp() {
        solution = new Problem1_CountSetBits();
    }

    // --- Test cases for countSetBits_Iterative ---
    @Test
    @DisplayName("Iterative: Test with 0")
    void testIterative_Zero() {
        assertEquals(0, solution.countSetBits_Iterative(0));
    }

    @Test
    @DisplayName("Iterative: Test with positive small number (11)")
    void testIterative_PositiveSmall() {
        // 11 in binary is 0...01011 (3 set bits)
        assertEquals(3, solution.countSetBits_Iterative(11));
    }

    @Test
    @DisplayName("Iterative: Test with positive number (128)")
    void testIterative_PositiveSingleBit() {
        // 128 in binary is 0...10000000 (1 set bit)
        assertEquals(1, solution.countSetBits_Iterative(128));
    }

    @Test
    @DisplayName("Iterative: Test with max int value")
    void testIterative_MaxInt() {
        // Integer.MAX_VALUE is 0111...111 (31 set bits)
        assertEquals(31, solution.countSetBits_Iterative(Integer.MAX_VALUE));
    }

    @Test
    @DisplayName("Iterative: Test with -1 (all bits set for unsigned perspective)")
    void testIterative_NegativeOne() {
        // -1 in two's complement is 1111...1111 (32 set bits)
        assertEquals(32, solution.countSetBits_Iterative(-1));
    }

    @Test
    @DisplayName("Iterative: Test with large alternating pattern (0xAAAAAAAA)")
    void testIterative_AlternatingPattern() {
        // 0xAAAAAAAA is 10101010...1010 (16 set bits)
        assertEquals(16, solution.countSetBits_Iterative(0xAAAAAAAA));
    }

    // --- Test cases for countSetBits_BrianKernighan ---
    @Test
    @DisplayName("Brian Kernighan: Test with 0")
    void testBrianKernighan_Zero() {
        assertEquals(0, solution.countSetBits_BrianKernighan(0));
    }

    @Test
    @DisplayName("Brian Kernighan: Test with positive small number (11)")
    void testBrianKernighan_PositiveSmall() {
        assertEquals(3, solution.countSetBits_BrianKernighan(11));
    }

    @Test
    @DisplayName("Brian Kernighan: Test with positive number (128)")
    void testBrianKernighan_PositiveSingleBit() {
        assertEquals(1, solution.countSetBits_BrianKernighan(128));
    }

    @Test
    @DisplayName("Brian Kernighan: Test with max int value")
    void testBrianKernighan_MaxInt() {
        assertEquals(31, solution.countSetBits_BrianKernighan(Integer.MAX_VALUE));
    }

    @Test
    @DisplayName("Brian Kernighan: Test with -1 (all bits set for unsigned perspective)")
    void testBrianKernighan_NegativeOne() {
        assertEquals(32, solution.countSetBits_BrianKernighan(-1));
    }

    @Test
    @DisplayName("Brian Kernighan: Test with large alternating pattern (0xAAAAAAAA)")
    void testBrianKernighan_AlternatingPattern() {
        assertEquals(16, solution.countSetBits_BrianKernighan(0xAAAAAAAA));
    }

    // --- Test cases for countSetBits_LookupTable ---
    @Test
    @DisplayName("Lookup Table: Test with 0")
    void testLookupTable_Zero() {
        assertEquals(0, solution.countSetBits_LookupTable(0));
    }

    @Test
    @DisplayName("Lookup Table: Test with positive small number (11)")
    void testLookupTable_PositiveSmall() {
        assertEquals(3, solution.countSetBits_LookupTable(11));
    }

    @Test
    @DisplayName("Lookup Table: Test with positive number (128)")
    void testLookupTable_PositiveSingleBit() {
        assertEquals(1, solution.countSetBits_LookupTable(128));
    }

    @Test
    @DisplayName("Lookup Table: Test with max int value")
    void testLookupTable_MaxInt() {
        assertEquals(31, solution.countSetBits_LookupTable(Integer.MAX_VALUE));
    }

    @Test
    @DisplayName("Lookup Table: Test with -1 (all bits set for unsigned perspective)")
    void testLookupTable_NegativeOne() {
        assertEquals(32, solution.countSetBits_LookupTable(-1));
    }

    @Test
    @DisplayName("Lookup Table: Test with large alternating pattern (0xAAAAAAAA)")
    void testLookupTable_AlternatingPattern() {
        assertEquals(16, solution.countSetBits_LookupTable(0xAAAAAAAA));
    }

    // --- Test cases for countSetBits_BuiltIn ---
    @Test
    @DisplayName("Built-in: Test with 0")
    void testBuiltIn_Zero() {
        assertEquals(0, solution.countSetBits_BuiltIn(0));
    }

    @Test
    @DisplayName("Built-in: Test with positive small number (11)")
    void testBuiltIn_PositiveSmall() {
        assertEquals(3, solution.countSetBits_BuiltIn(11));
    }

    @Test
    @DisplayName("Built-in: Test with positive number (128)")
    void testBuiltIn_PositiveSingleBit() {
        assertEquals(1, solution.countSetBits_BuiltIn(128));
    }

    @Test
    @DisplayName("Built-in: Test with max int value")
    void testBuiltIn_MaxInt() {
        assertEquals(31, solution.countSetBits_BuiltIn(Integer.MAX_VALUE));
    }

    @Test
    @DisplayName("Built-in: Test with -1 (all bits set for unsigned perspective)")
    void testBuiltIn_NegativeOne() {
        assertEquals(32, solution.countSetBits_BuiltIn(-1));
    }

    @Test
    @DisplayName("Built-in: Test with large alternating pattern (0xAAAAAAAA)")
    void testBuiltIn_AlternatingPattern() {
        assertEquals(16, solution.countSetBits_BuiltIn(0xAAAAAAAA));
    }

    // --- Consistency Test (Ensuring all methods yield same result) ---
    @Test
    @DisplayName("Consistency: All methods should agree on various inputs")
    void testConsistencyAcrossMethods() {
        int[] testNumbers = {0, 1, 7, 11, 128, 255, Integer.MAX_VALUE, Integer.MIN_VALUE, -1, 0x55555555, 0xAAAAAAAA};
        for (int num : testNumbers) {
            int expected = Integer.bitCount(num); // Use built-in as the ground truth
            assertEquals(expected, solution.countSetBits_Iterative(num), "Iterative failed for " + num);
            assertEquals(expected, solution.countSetBits_BrianKernighan(num), "Brian Kernighan failed for " + num);
            assertEquals(expected, solution.countSetBits_LookupTable(num), "Lookup Table failed for " + num);
            assertEquals(expected, solution.countSetBits_BuiltIn(num), "Built-in failed for " + num);
        }
    }
}
```