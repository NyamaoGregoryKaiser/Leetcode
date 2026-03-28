```java
package com.example.sorting.problems;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Unit tests for P5_FindMissingPositive.
 */
class P5_FindMissingPositiveTest {

    private final P5_FindMissingPositive solution = new P5_FindMissingPositive();

    private static Stream<Arguments> provideFindMissingPositiveTestCases() {
        return Stream.of(
                Arguments.of(new int[]{1, 2, 0}, 3),
                Arguments.of(new int[]{3, 4, -1, 1}, 2),
                Arguments.of(new int[]{7, 8, 9, 11, 12}, 1),
                Arguments.of(new int[]{1}, 2),
                Arguments.of(new int[]{2}, 1),
                Arguments.of(new int[]{}, 1),
                Arguments.of(new int[]{0}, 1),
                Arguments.of(new int[]{-5, -2, 0}, 1),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 6),
                Arguments.of(new int[]{1, 1, 2, 0, 3}, 4), // Duplicates, zero
                Arguments.of(new int[]{1, 1}, 2), // Duplicates
                Arguments.of(new int[]{100, -10, 5, 2, 1, 3}, 4),
                Arguments.of(new int[]{2147483647, 0, 1, 2}, 3) // Large number and zero
        );
    }

    @ParameterizedTest(name = "{index}: nums={0}, expected={1}")
    @MethodSource("provideFindMissingPositiveTestCases")
    @DisplayName("Test findMissingPositive_HashSet method")
    void testFindMissingPositive_HashSet(int[] nums, int expected) {
        assertEquals(expected, solution.findMissingPositive_HashSet(nums));
    }

    @ParameterizedTest(name = "{index}: nums={0}, expected={1}")
    @MethodSource("provideFindMissingPositiveTestCases")
    @DisplayName("Test findMissingPositive_InPlaceSwapping method")
    void testFindMissingPositive_InPlaceSwapping(int[] nums, int expected) {
        int[] numsCopy = nums.clone(); // Method modifies array
        assertEquals(expected, solution.findMissingPositive_InPlaceSwapping(numsCopy));
    }

    // --- Edge Cases and Invalid Inputs ---

    @Test
    @DisplayName("Test null array input for HashSet method")
    void testHashSetNullArray() {
        int[] nums = null;
        assertThrows(IllegalArgumentException.class, () -> solution.findMissingPositive_HashSet(nums));
    }

    @Test
    @DisplayName("Test null array input for InPlaceSwapping method")
    void testInPlaceSwappingNullArray() {
        int[] nums = null;
        assertThrows(IllegalArgumentException.class, () -> solution.findMissingPositive_InPlaceSwapping(nums));
    }
}
```