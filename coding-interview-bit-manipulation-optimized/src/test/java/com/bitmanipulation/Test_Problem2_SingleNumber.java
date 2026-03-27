```java
package com.bitmanipulation;

import com.bitmanipulation.problems.Problem2_SingleNumber;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Unit tests for Problem2_SingleNumber.
 */
@DisplayName("Problem2_SingleNumber Tests")
public class Test_Problem2_SingleNumber {

    private Problem2_SingleNumber solution;

    @BeforeEach
    void setUp() {
        solution = new Problem2_SingleNumber();
    }

    // --- Test cases for singleNumber_XOR ---
    @Test
    @DisplayName("XOR: Basic test case [2,2,1]")
    void testXOR_Basic1() {
        int[] nums = {2, 2, 1};
        assertEquals(1, solution.singleNumber_XOR(nums));
    }

    @Test
    @DisplayName("XOR: Basic test case [4,1,2,1,2]")
    void testXOR_Basic2() {
        int[] nums = {4, 1, 2, 1, 2};
        assertEquals(4, solution.singleNumber_XOR(nums));
    }

    @Test
    @DisplayName("XOR: Single element array [1]")
    void testXOR_SingleElement() {
        int[] nums = {1};
        assertEquals(1, solution.singleNumber_XOR(nums));
    }

    @Test
    @DisplayName("XOR: Array with 0 [0,0,1]")
    void testXOR_WithZero() {
        int[] nums = {0, 0, 1};
        assertEquals(1, solution.singleNumber_XOR(nums));
    }

    @Test
    @DisplayName("XOR: Array with negative numbers [-1,-1,2,2,3]")
    void testXOR_WithNegativeNumbers() {
        int[] nums = {-1, -1, 2, 2, 3};
        assertEquals(3, solution.singleNumber_XOR(nums));
    }

    @Test
    @DisplayName("XOR: Large numbers with single at end")
    void testXOR_LargeNumbersEnd() {
        int[] nums = {100000, 200000, 100000, 200000, 300000};
        assertEquals(300000, solution.singleNumber_XOR(nums));
    }

    @Test
    @DisplayName("XOR: Single number is 0")
    void testXOR_SingleIsZero() {
        int[] nums = {5, 5, 0};
        assertEquals(0, solution.singleNumber_XOR(nums));
    }

    // --- Test cases for singleNumber_HashSet ---
    @Test
    @DisplayName("HashSet: Basic test case [2,2,1]")
    void testHashSet_Basic1() {
        int[] nums = {2, 2, 1};
        assertEquals(1, solution.singleNumber_HashSet(nums));
    }

    @Test
    @DisplayName("HashSet: Basic test case [4,1,2,1,2]")
    void testHashSet_Basic2() {
        int[] nums = {4, 1, 2, 1, 2};
        assertEquals(4, solution.singleNumber_HashSet(nums));
    }

    @Test
    @DisplayName("HashSet: Single element array [1]")
    void testHashSet_SingleElement() {
        int[] nums = {1};
        assertEquals(1, solution.singleNumber_HashSet(nums));
    }

    @Test
    @DisplayName("HashSet: Array with 0 [0,0,1]")
    void testHashSet_WithZero() {
        int[] nums = {0, 0, 1};
        assertEquals(1, solution.singleNumber_HashSet(nums));
    }

    @Test
    @DisplayName("HashSet: Array with negative numbers [-1,-1,2,2,3]")
    void testHashSet_WithNegativeNumbers() {
        int[] nums = {-1, -1, 2, 2, 3};
        assertEquals(3, solution.singleNumber_HashSet(nums));
    }

    // --- Test cases for singleNumber_HashMap ---
    @Test
    @DisplayName("HashMap: Basic test case [2,2,1]")
    void testHashMap_Basic1() {
        int[] nums = {2, 2, 1};
        assertEquals(1, solution.singleNumber_HashMap(nums));
    }

    @Test
    @DisplayName("HashMap: Basic test case [4,1,2,1,2]")
    void testHashMap_Basic2() {
        int[] nums = {4, 1, 2, 1, 2};
        assertEquals(4, solution.singleNumber_HashMap(nums));
    }

    @Test
    @DisplayName("HashMap: Single element array [1]")
    void testHashMap_SingleElement() {
        int[] nums = {1};
        assertEquals(1, solution.singleNumber_HashMap(nums));
    }

    @Test
    @DisplayName("HashMap: Array with 0 [0,0,1]")
    void testHashMap_WithZero() {
        int[] nums = {0, 0, 1};
        assertEquals(1, solution.singleNumber_HashMap(nums));
    }

    @Test
    @DisplayName("HashMap: Array with negative numbers [-1,-1,2,2,3]")
    void testHashMap_WithNegativeNumbers() {
        int[] nums = {-1, -1, 2, 2, 3};
        assertEquals(3, solution.singleNumber_HashMap(nums));
    }

    @Test
    @DisplayName("HashMap: Empty array should throw exception (problem constraints state non-empty)")
    void testHashMap_EmptyArray() {
        int[] nums = {};
        // The problem statement guarantees a non-empty array and a single number,
        // so this case technically isn't strictly necessary per problem constraints,
        // but good for robustness. Our implementation throws an exception.
        assertThrows(IllegalArgumentException.class, () -> solution.singleNumber_HashMap(nums));
    }

    // --- Consistency Test (Ensuring all methods yield same result) ---
    @Test
    @DisplayName("Consistency: All methods should agree on various inputs")
    void testConsistencyAcrossMethods() {
        int[][] testCases = {
            {2, 2, 1},
            {4, 1, 2, 1, 2},
            {1},
            {0, 0, 1},
            {-1, -1, 2, 2, 3},
            {Integer.MAX_VALUE, Integer.MAX_VALUE, Integer.MIN_VALUE, Integer.MIN_VALUE, 5},
            {100, 200, 100, 300, 200}
        };

        for (int[] nums : testCases) {
            int expected = solution.singleNumber_XOR(nums); // XOR is the optimal, use as ground truth
            assertEquals(expected, solution.singleNumber_HashSet(nums), "HashSet failed for " + java.util.Arrays.toString(nums));
            assertEquals(expected, solution.singleNumber_HashMap(nums), "HashMap failed for " + java.util.Arrays.toString(nums));
        }
    }
}
```