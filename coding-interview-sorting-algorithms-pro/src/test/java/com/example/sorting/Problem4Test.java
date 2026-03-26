```java
package com.example.sorting;

import com.example.sorting.problems.Problem4_SortColors;
import com.example.sorting.utils.ArrayUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Arrays;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test class for Problem4_SortColors.
 */
public class Problem4Test {

    private Problem4_SortColors sorter;

    @BeforeEach
    void setUp() {
        sorter = new Problem4_SortColors();
    }

    // --- Test Data Provider ---
    static Stream<Arguments> sortColorsCasesProvider() {
        return Stream.of(
                Arguments.of(new int[]{2, 0, 2, 1, 1, 0}, new int[]{0, 0, 1, 1, 2, 2}), // Example 1
                Arguments.of(new int[]{2, 0, 1}, new int[]{0, 1, 2}),                 // Example 2
                Arguments.of(new int[]{0}, new int[]{0}),                             // Single 0
                Arguments.of(new int[]{1}, new int[]{1}),                             // Single 1
                Arguments.of(new int[]{2}, new int[]{2}),                             // Single 2
                Arguments.of(new int[]{}, new int[]{}),                               // Empty array
                Arguments.of(new int[]{0, 0, 0}, new int[]{0, 0, 0}),                 // All 0s
                Arguments.of(new int[]{1, 1, 1}, new int[]{1, 1, 1}),                 // All 1s
                Arguments.of(new int[]{2, 2, 2}, new int[]{2, 2, 2}),                 // All 2s
                Arguments.of(new int[]{0, 1, 2}, new int[]{0, 1, 2}),                 // Already sorted
                Arguments.of(new int[]{2, 1, 0}, new int[]{0, 1, 2}),                 // Reverse sorted
                Arguments.of(new int[]{1, 0, 2, 1, 0, 2}, new int[]{0, 0, 1, 1, 2, 2}), // Mixed
                Arguments.of(new int[]{0, 2, 1, 0, 2, 1, 0}, new int[]{0, 0, 0, 1, 1, 2, 2})
        );
    }

    // Helper to verify the sorted order [0,0,...,1,1,...,2,2,...]
    private static boolean verifySortedColors(int[] nums) {
        if (nums == null || nums.length <= 1) {
            return true;
        }
        int count0 = 0;
        int count1 = 0;
        int count2 = 0;

        for (int num : nums) {
            if (num == 0) count0++;
            else if (num == 1) count1++;
            else if (num == 2) count2++;
            else return false; // Contains invalid color
        }

        // Check if 0s appear first, then 1s, then 2s
        for (int i = 0; i < nums.length; i++) {
            if (i < count0 && nums[i] != 0) return false;
            if (i >= count0 && i < count0 + count1 && nums[i] != 1) return false;
            if (i >= count0 + count1 && i < count0 + count1 + count2 && nums[i] != 2) return false;
        }
        return true;
    }

    // --- Dutch National Flag Algorithm Tests ---
    @ParameterizedTest(name = "Dutch National Flag Test {index}: input={0}")
    @MethodSource("sortColorsCasesProvider")
    @DisplayName("sortColorsDutchNationalFlag should correctly sort colors")
    void testSortColorsDutchNationalFlag(int[] originalNums, int[] expected) {
        int[] nums = ArrayUtils.copyArray(originalNums); // Operate on a copy
        sorter.sortColorsDutchNationalFlag(nums);
        assertArrayEquals(expected, nums, "Dutch National Flag failed for input: " + Arrays.toString(originalNums));
        assertTrue(verifySortedColors(nums), "Dutch National Flag result is not correctly sorted: " + Arrays.toString(nums));
    }

    @Test
    @DisplayName("Dutch National Flag should handle null array gracefully")
    void testSortColorsDutchNationalFlagNull() {
        sorter.sortColorsDutchNationalFlag(null);
        // No exception implies success
    }

    // --- Counting Sort Tests ---
    @ParameterizedTest(name = "Counting Sort Test {index}: input={0}")
    @MethodSource("sortColorsCasesProvider")
    @DisplayName("sortColorsCountingSort should correctly sort colors")
    void testSortColorsCountingSort(int[] originalNums, int[] expected) {
        int[] nums = ArrayUtils.copyArray(originalNums); // Operate on a copy
        sorter.sortColorsCountingSort(nums);
        assertArrayEquals(expected, nums, "Counting Sort failed for input: " + Arrays.toString(originalNums));
        assertTrue(verifySortedColors(nums), "Counting Sort result is not correctly sorted: " + Arrays.toString(nums));
    }

    @Test
    @DisplayName("Counting Sort should handle null array gracefully")
    void testSortColorsCountingSortNull() {
        sorter.sortColorsCountingSort(null);
        // No exception implies success
    }

    @Test
    @DisplayName("Counting Sort should throw IllegalArgumentException for invalid colors")
    void testSortColorsCountingSortInvalidColors() {
        assertThrows(IllegalArgumentException.class, () -> sorter.sortColorsCountingSort(new int[]{0, 1, 3, 2}));
        assertThrows(IllegalArgumentException.class, () -> sorter.sortColorsCountingSort(new int[]{-1, 0, 1}));
    }

    // --- Built-in Sort Tests ---
    @ParameterizedTest(name = "Built-in Sort Test {index}: input={0}")
    @MethodSource("sortColorsCasesProvider")
    @DisplayName("sortColorsBuiltInSort should correctly sort colors")
    void testSortColorsBuiltInSort(int[] originalNums, int[] expected) {
        int[] nums = ArrayUtils.copyArray(originalNums); // Operate on a copy
        sorter.sortColorsBuiltInSort(nums);
        assertArrayEquals(expected, nums, "Built-in Sort failed for input: " + Arrays.toString(originalNums));
        assertTrue(verifySortedColors(nums), "Built-in Sort result is not correctly sorted: " + Arrays.toString(nums));
    }

    @Test
    @DisplayName("Built-in Sort should handle null array gracefully")
    void testSortColorsBuiltInSortNull() {
        sorter.sortColorsBuiltInSort(null);
        // No exception implies success
    }
}
```