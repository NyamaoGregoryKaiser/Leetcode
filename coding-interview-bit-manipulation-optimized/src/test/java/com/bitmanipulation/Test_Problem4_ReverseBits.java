```java
package com.bitmanipulation;

import com.bitmanipulation.problems.Problem4_ReverseBits;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit tests for Problem4_ReverseBits.
 */
@DisplayName("Problem4_ReverseBits Tests")
public class Test_Problem4_ReverseBits {

    private Problem4_ReverseBits solution;

    @BeforeEach
    void setUp() {
        solution = new Problem4_ReverseBits();
    }

    // --- Test cases for reverseBits_Iterative ---
    @Test
    @DisplayName("Iterative: Test with 0")
    void testIterative_Zero() {
        assertEquals(0, solution.reverseBits_Iterative(0));
    }

    @Test
    @DisplayName("Iterative: Test with 1 (0...001 -> 100...00)")
    void testIterative_One() {
        assertEquals(1 << 31, solution.reverseBits_Iterative(1));
    }

    @Test
    @DisplayName("Iterative: Test with LSB set (e.g., 2^31)")
    void testIterative_MaxSignedValue() {
        // Integer.MIN_VALUE is 1000...000 (MSB is 1)
        // Reversed should be 00...001 (value 1)
        assertEquals(1, solution.reverseBits_Iterative(Integer.MIN_VALUE));
    }

    @Test
    @DisplayName("Iterative: Test with -1 (all ones -> all ones)")
    void testIterative_NegativeOne() {
        // -1 (all 1s in 2's complement) -> reversed is also all 1s
        assertEquals(-1, solution.reverseBits_Iterative(-1));
    }

    @Test
    @DisplayName("Iterative: Test with given example (43261596)")
    void testIterative_Example1() {
        int n = 43261596; // 00000010100101000001111010011100
        int expected = 964176192; // 00111001011110000010100101000000
        assertEquals(expected, solution.reverseBits_Iterative(n));
    }

    @Test
    @DisplayName("Iterative: Test with custom pattern (0xAAAA -> 0x5555... shifted)")
    void testIterative_CustomPattern1() {
        // 0xAAAA (0...1010101010101010)
        // Reversed should be 0101010101010101...0
        // Which is 0x5555 shifted correctly.
        int n = 0xAAAA; // 00000000000000001010101010101010
        int expected = 0x55550000; // 01010101010101010000000000000000
        assertEquals(expected, solution.reverseBits_Iterative(n));
    }

    @Test
    @DisplayName("Iterative: Test with MSB set (Integer.MIN_VALUE = 2^31)")
    void testIterative_MSB_Set() {
        int n = 1 << 31; // Integer.MIN_VALUE
        // Binary: 1000...000
        // Reversed: 000...001
        assertEquals(1, solution.reverseBits_Iterative(n));
    }

    // --- Test cases for reverseBits_LookupTable ---
    @Test
    @DisplayName("Lookup Table: Test with 0")
    void testLookupTable_Zero() {
        assertEquals(0, solution.reverseBits_LookupTable(0));
    }

    @Test
    @DisplayName("Lookup Table: Test with 1 (0...001 -> 100...00)")
    void testLookupTable_One() {
        assertEquals(1 << 31, solution.reverseBits_LookupTable(1));
    }

    @Test
    @DisplayName("Lookup Table: Test with LSB set (e.g., 2^31)")
    void testLookupTable_MaxSignedValue() {
        // Integer.MIN_VALUE is 1000...000 (MSB is 1)
        // Reversed should be 00...001 (value 1)
        assertEquals(1, solution.reverseBits_LookupTable(Integer.MIN_VALUE));
    }

    @Test
    @DisplayName("Lookup Table: Test with -1 (all ones -> all ones)")
    void testLookupTable_NegativeOne() {
        // -1 (all 1s in 2's complement) -> reversed is also all 1s
        assertEquals(-1, solution.reverseBits_LookupTable(-1));
    }

    @Test
    @DisplayName("Lookup Table: Test with given example (43261596)")
    void testLookupTable_Example1() {
        int n = 43261596; // 00000010100101000001111010011100
        int expected = 964176192; // 00111001011110000010100101000000
        assertEquals(expected, solution.reverseBits_LookupTable(n));
    }

    @Test
    @DisplayName("Lookup Table: Test with custom pattern (0xAAAA -> 0x5555... shifted)")
    void testLookupTable_CustomPattern1() {
        int n = 0xAAAA; // 00000000000000001010101010101010
        int expected = 0x55550000; // 01010101010101010000000000000000
        assertEquals(expected, solution.reverseBits_LookupTable(n));
    }

    @Test
    @DisplayName("Lookup Table: Test with MSB set (Integer.MIN_VALUE = 2^31)")
    void testLookupTable_MSB_Set() {
        int n = 1 << 31; // Integer.MIN_VALUE
        // Binary: 1000...000
        // Reversed: 000...001
        assertEquals(1, solution.reverseBits_LookupTable(n));
    }

    // --- Consistency Test (Ensuring all methods yield same result) ---
    @Test
    @DisplayName("Consistency: Both methods should agree on various inputs")
    void testConsistencyAcrossMethods() {
        int[] testNumbers = {0, 1, Integer.MAX_VALUE, Integer.MIN_VALUE, -1, 43261596, 964176192, 0x0000FFFF, 0xFFFF0000, 0xAAAAAAAA, 0x55555555};
        for (int num : testNumbers) {
            int expected = solution.reverseBits_Iterative(num); // Use iterative as base truth
            assertEquals(expected, solution.reverseBits_LookupTable(num), "Lookup Table failed for " + num);
        }
    }
}
```