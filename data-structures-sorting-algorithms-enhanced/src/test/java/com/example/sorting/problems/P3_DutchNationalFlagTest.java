```java
package com.example.sorting.problems;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Arrays;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Unit tests for P3_DutchNationalFlag (Sort Colors).
 */
class P3_DutchNationalFlagTest {

    private final P3_DutchNationalFlag solution = new P3_DutchNationalFlag();

    private static Stream<Arguments> provideDutchNationalFlagTestCases() {
        return Stream.of(
                Arguments.of(new int[]{2, 0, 2, 1, 1, 0}, new int[]{0, 0, 1, 1, 2, 2}),
                Arguments.of(new int[]{2, 0, 1}, new int[]{0, 1, 2}),
                Arguments.of(new int[]{0}, new int[]{0}),
                Arguments.of(new int[]{1}, new int[]{1}),
                Arguments.of(new int[]{2}, new int[]{2}),
                Arguments.of(new int[]{}, new int[]{}),
                Arguments.of(new int[]{0, 0, 0}, new int[]{0, 0, 0}),
                Arguments.of(new int[]{1, 1, 1}, new int[]{1, 1, 1}),
                Arguments.of(new int[]{2, 2, 2}, new int[]{2, 2, 2}),
                Arguments.of(new int[]{0, 1, 2}, new int[]{0, 1, 2}), // Already sorted
                Arguments.of(new int[]{2, 1, 0}, new int[]{0, 1, 2}), // Reverse sorted
                Arguments.of(new int[]{1, 0, 2}, new int[]{0, 1, 2}),
                Arguments.of(new int[]{0, 2, 1}, new int[]{0, 1, 2}),
                Arguments.of(new int[]{1, 2, 0}, new int[]{0, 1, 2}),
                Arguments.of(new int[]{0, 2, 0, 1, 2, 0}, new int[]{0, 0, 0, 1, 2, 2}),
                Arguments.of(new int[]{1, 0, 2, 1, 0, 2, 1, 0}, new int[]{0, 0, 0, 1, 1, 1, 2, 2})
        );
    }

    @ParameterizedTest(name = "{index}: input={0}, expected={1}")
    @MethodSource("provideDutchNationalFlagTestCases")
    @DisplayName("Test sortColors_CountingSort method")
    void testSortColors_CountingSort(int[] nums, int[] expected) {
        int[] inputCopy = Arrays.copyOf(nums, nums.length); // Method modifies array
        solution.sortColors_CountingSort(inputCopy);
        assertArrayEquals(expected, inputCopy);
    }

    @ParameterizedTest(name = "{index}: input={0}, expected={1}")
    @MethodSource("provideDutchNationalFlagTestCases")
    @DisplayName("Test sortColors_OnePass method (Dutch National Flag)")
    void testSortColors_OnePass(int[] nums, int[] expected) {
        int[] inputCopy = Arrays.copyOf(nums, nums.length); // Method modifies array
        solution.sortColors_OnePass(inputCopy);
        assertArrayEquals(expected, inputCopy);
    }

    // --- Edge Cases and Invalid Inputs ---

    @Test
    @DisplayName("Test null array input for CountingSort")
    void testCountingSortNullArray() {
        int[] nums = null;
        assertThrows(IllegalArgumentException.class, () -> solution.sortColors_CountingSort(nums));
    }

    @Test
    @DisplayName("Test null array input for OnePass method")
    void testOnePassNullArray() {
        int[] nums = null;
        assertThrows(IllegalArgumentException.class, () -> solution.sortColors_OnePass(nums));
    }

    @Test
    @DisplayName("Test array with invalid values for CountingSort")
    void testCountingSortInvalidValues() {
        int[] nums = {0, 1, 3, 2}; // Contains '3'
        assertThrows(IllegalArgumentException.class, () -> solution.sortColors_CountingSort(nums));
    }

    @Test
    @DisplayName("Test array with invalid values for OnePass method")
    void testOnePassInvalidValues() {
        int[] nums = {0, 1, 3, 2}; // Contains '3'
        assertThrows(IllegalArgumentException.class, () -> solution.sortColors_OnePass(nums));
    }
}
```