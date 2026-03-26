```java
package com.example.sorting;

import com.example.sorting.problems.Problem3_KthLargestElement;
import com.example.sorting.utils.ArrayUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Arrays;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Test class for Problem3_KthLargestElement.
 */
public class Problem3Test {

    private Problem3_KthLargestElement finder;

    @BeforeEach
    void setUp() {
        finder = new Problem3_KthLargestElement();
    }

    // --- Test Data Provider ---
    static Stream<Arguments> kthLargestCasesProvider() {
        return Stream.of(
                Arguments.of(new int[]{3, 2, 1, 5, 6, 4}, 2, 5),          // Example 1
                Arguments.of(new int[]{3, 2, 3, 1, 2, 4, 5, 5, 6}, 4, 4), // Example 2
                Arguments.of(new int[]{1}, 1, 1),                         // Single element
                Arguments.of(new int[]{7, 6, 5, 4, 3, 2, 1}, 1, 7),       // Largest
                Arguments.of(new int[]{7, 6, 5, 4, 3, 2, 1}, 7, 1),       // Smallest
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 3, 3),             // Sorted array
                Arguments.of(new int[]{5, 4, 3, 2, 1}, 3, 3),             // Reverse sorted array
                Arguments.of(new int[]{2, 2, 2, 2, 2}, 3, 2),             // All same elements
                Arguments.of(new int[]{99, 99}, 1, 99),                   // Duplicates
                Arguments.of(new int[]{10, 5, 20, 15, 25}, 3, 15),
                Arguments.of(ArrayUtils.generateRandomArray(20, 0, 100), 5, getKthLargestSorted(ArrayUtils.generateRandomArray(20, 0, 100), 5)) // Random array
        );
    }

    // Helper to get the expected Kth largest by sorting
    private static int getKthLargestSorted(int[] nums, int k) {
        int[] temp = ArrayUtils.copyArray(nums);
        Arrays.sort(temp);
        return temp[temp.length - k];
    }

    // --- QuickSelect Tests ---
    @ParameterizedTest(name = "QuickSelect Test {index}: arr={0}, k={1} -> {2}")
    @MethodSource("kthLargestCasesProvider")
    @DisplayName("findKthLargestQuickSelect should correctly find the Kth largest element")
    void testFindKthLargestQuickSelect(int[] originalNums, int k, int expected) {
        int[] nums = ArrayUtils.copyArray(originalNums); // Operate on a copy
        assertEquals(expected, finder.findKthLargestQuickSelect(nums, k),
                "QuickSelect failed for array: " + Arrays.toString(originalNums) + ", k=" + k);
    }

    @Test
    @DisplayName("QuickSelect should throw IllegalArgumentException for invalid k or array")
    void testFindKthLargestQuickSelectInvalidInputs() {
        assertThrows(IllegalArgumentException.class, () -> finder.findKthLargestQuickSelect(new int[]{}, 1)); // Empty array
        assertThrows(IllegalArgumentException.class, () -> finder.findKthLargestQuickSelect(null, 1)); // Null array
        assertThrows(IllegalArgumentException.class, () -> finder.findKthLargestQuickSelect(new int[]{1, 2, 3}, 0)); // k too small
        assertThrows(IllegalArgumentException.class, () -> finder.findKthLargestQuickSelect(new int[]{1, 2, 3}, 4)); // k too large
    }

    // --- Min-Heap Tests ---
    @ParameterizedTest(name = "MinHeap Test {index}: arr={0}, k={1} -> {2}")
    @MethodSource("kthLargestCasesProvider")
    @DisplayName("findKthLargestMinHeap should correctly find the Kth largest element")
    void testFindKthLargestMinHeap(int[] originalNums, int k, int expected) {
        int[] nums = ArrayUtils.copyArray(originalNums); // Operate on a copy
        assertEquals(expected, finder.findKthLargestMinHeap(nums, k),
                "MinHeap failed for array: " + Arrays.toString(originalNums) + ", k=" + k);
    }

    @Test
    @DisplayName("MinHeap should throw IllegalArgumentException for invalid k or array")
    void testFindKthLargestMinHeapInvalidInputs() {
        assertThrows(IllegalArgumentException.class, () -> finder.findKthLargestMinHeap(new int[]{}, 1));
        assertThrows(IllegalArgumentException.class, () -> finder.findKthLargestMinHeap(null, 1));
        assertThrows(IllegalArgumentException.class, () -> finder.findKthLargestMinHeap(new int[]{1, 2, 3}, 0));
        assertThrows(IllegalArgumentException.class, () -> finder.findKthLargestMinHeap(new int[]{1, 2, 3}, 4));
    }

    // --- Brute-Force Sort Tests ---
    @ParameterizedTest(name = "Sort Test {index}: arr={0}, k={1} -> {2}")
    @MethodSource("kthLargestCasesProvider")
    @DisplayName("findKthLargestSort should correctly find the Kth largest element")
    void testFindKthLargestSort(int[] originalNums, int k, int expected) {
        int[] nums = ArrayUtils.copyArray(originalNums); // Operate on a copy
        assertEquals(expected, finder.findKthLargestSort(nums, k),
                "Sort failed for array: " + Arrays.toString(originalNums) + ", k=" + k);
    }

    @Test
    @DisplayName("Sort should throw IllegalArgumentException for invalid k or array")
    void testFindKthLargestSortInvalidInputs() {
        assertThrows(IllegalArgumentException.class, () -> finder.findKthLargestSort(new int[]{}, 1));
        assertThrows(IllegalArgumentException.class, () -> finder.findKthLargestSort(null, 1));
        assertThrows(IllegalArgumentException.class, () -> finder.findKthLargestSort(new int[]{1, 2, 3}, 0));
        assertThrows(IllegalArgumentException.class, () -> finder.findKthLargestSort(new int[]{1, 2, 3}, 4));
    }
}
```