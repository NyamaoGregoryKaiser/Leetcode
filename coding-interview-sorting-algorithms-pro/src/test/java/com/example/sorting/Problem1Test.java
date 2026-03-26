```java
package com.example.sorting;

import com.example.sorting.problems.Problem1_SortAnArray;
import com.example.sorting.utils.ArrayUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Arrays;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test class for Problem1_SortAnArray, covering Merge Sort, Quick Sort, and Heap Sort.
 */
public class Problem1Test {

    private Problem1_SortAnArray sorter;

    @BeforeEach
    void setUp() {
        sorter = new Problem1_SortAnArray();
    }

    // --- Test Data Provider ---
    static Stream<int[]> testArraysProvider() {
        return Stream.of(
                new int[]{},                       // Empty array
                new int[]{1},                      // Single element
                new int[]{5, 1, 4, 2, 8},          // General case
                new int[]{1, 2, 3, 4, 5},          // Already sorted
                new int[]{5, 4, 3, 2, 1},          // Reverse sorted
                new int[]{3, 1, 4, 1, 5, 9, 2, 6}, // With duplicates
                new int[]{0, 0, 0, 0},             // All same elements
                new int[]{-5, -1, -10, 0},         // Negative numbers
                ArrayUtils.generateRandomArray(10, -100, 100), // Small random
                ArrayUtils.generateRandomArray(100, -1000, 1000), // Medium random
                ArrayUtils.generateMostlySortedArray(20, 3), // Mostly sorted
                ArrayUtils.generateArrayWithDuplicates(15, 5) // With many duplicates
        );
    }

    // --- Merge Sort Tests ---
    @ParameterizedTest(name = "Merge Sort Test {index}: {0}")
    @MethodSource("testArraysProvider")
    @DisplayName("Merge Sort should correctly sort various arrays")
    void testMergeSort(int[] originalArray) {
        int[] nums = ArrayUtils.copyArray(originalArray);
        int[] expected = ArrayUtils.copyArray(originalArray);
        if (expected != null) {
            Arrays.sort(expected);
        }

        sorter.mergeSort(nums);

        assertArrayEquals(expected, nums, "Merge Sort failed for array: " + Arrays.toString(originalArray));
        assertTrue(ArrayUtils.isSorted(nums), "Merge Sort did not produce a sorted array: " + Arrays.toString(nums));
    }

    @Test
    @DisplayName("Merge Sort with null array should not throw exception")
    void testMergeSortNull() {
        sorter.mergeSort(null); // Should handle null gracefully
        // No exception implies success for this test
    }

    // --- Quick Sort Tests ---
    @ParameterizedTest(name = "Quick Sort Test {index}: {0}")
    @MethodSource("testArraysProvider")
    @DisplayName("Quick Sort should correctly sort various arrays")
    void testQuickSort(int[] originalArray) {
        int[] nums = ArrayUtils.copyArray(originalArray);
        int[] expected = ArrayUtils.copyArray(originalArray);
        if (expected != null) {
            Arrays.sort(expected);
        }

        sorter.quickSort(nums);

        assertArrayEquals(expected, nums, "Quick Sort failed for array: " + Arrays.toString(originalArray));
        assertTrue(ArrayUtils.isSorted(nums), "Quick Sort did not produce a sorted array: " + Arrays.toString(nums));
    }

    @Test
    @DisplayName("Quick Sort with null array should not throw exception")
    void testQuickSortNull() {
        sorter.quickSort(null); // Should handle null gracefully
        // No exception implies success for this test
    }

    // --- Heap Sort Tests ---
    @ParameterizedTest(name = "Heap Sort Test {index}: {0}")
    @MethodSource("testArraysProvider")
    @DisplayName("Heap Sort should correctly sort various arrays")
    void testHeapSort(int[] originalArray) {
        int[] nums = ArrayUtils.copyArray(originalArray);
        int[] expected = ArrayUtils.copyArray(originalArray);
        if (expected != null) {
            Arrays.sort(expected);
        }

        sorter.heapSort(nums);

        assertArrayEquals(expected, nums, "Heap Sort failed for array: " + Arrays.toString(originalArray));
        assertTrue(ArrayUtils.isSorted(nums), "Heap Sort did not produce a sorted array: " + Arrays.toString(nums));
    }

    @Test
    @DisplayName("Heap Sort with null array should not throw exception")
    void testHeapSortNull() {
        sorter.heapSort(null); // Should handle null gracefully
        // No exception implies success for this test
    }
}
```