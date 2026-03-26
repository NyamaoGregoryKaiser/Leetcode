```java
package com.example.sorting;

import com.example.sorting.problems.Problem2_MergeSortedArrays;
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
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test class for Problem2_MergeSortedArrays.
 */
public class Problem2Test {

    private Problem2_MergeSortedArrays merger;

    @BeforeEach
    void setUp() {
        merger = new Problem2_MergeSortedArrays();
    }

    // --- Test Data Provider for merge methods ---
    static Stream<Arguments> mergeCasesProvider() {
        return Stream.of(
                // Example 1: Basic merge
                Arguments.of(new int[]{1, 2, 3, 0, 0, 0}, 3, new int[]{2, 5, 6}, 3, new int[]{1, 2, 2, 3, 5, 6}),
                // Example 2: nums1 is empty
                Arguments.of(new int[]{0}, 0, new int[]{1}, 1, new int[]{1}),
                // Example 3: nums2 is empty
                Arguments.of(new int[]{1}, 1, new int[]{}, 0, new int[]{1}),
                // nums1 already contains nums2
                Arguments.of(new int[]{4, 5, 6, 0, 0, 0}, 3, new int[]{1, 2, 3}, 3, new int[]{1, 2, 3, 4, 5, 6}),
                // No overlap, nums1 fully before nums2
                Arguments.of(new int[]{1, 2, 3, 0, 0, 0}, 3, new int[]{4, 5, 6}, 3, new int[]{1, 2, 3, 4, 5, 6}),
                // No overlap, nums2 fully before nums1
                Arguments.of(new int[]{4, 5, 6, 0, 0, 0}, 3, new int[]{1, 2, 3}, 3, new int[]{1, 2, 3, 4, 5, 6}),
                // Duplicates across arrays
                Arguments.of(new int[]{1, 2, 3, 0, 0, 0}, 3, new int[]{1, 2, 3}, 3, new int[]{1, 1, 2, 2, 3, 3}),
                // Duplicates within arrays
                Arguments.of(new int[]{1, 1, 2, 0, 0}, 3, new int[]{2, 2}, 2, new int[]{1, 1, 2, 2, 2}),
                // Larger arrays
                Arguments.of(new int[]{10, 20, 30, 40, 50, 0, 0, 0, 0, 0}, 5, new int[]{15, 25, 35, 45, 55}, 5, new int[]{10, 15, 20, 25, 30, 35, 40, 45, 50, 55}),
                // One array with single element
                Arguments.of(new int[]{10, 0}, 1, new int[]{5}, 1, new int[]{5, 10}),
                Arguments.of(new int[]{5, 0}, 1, new int[]{10}, 1, new int[]{5, 10})
        );
    }

    // --- Optimal Solution Tests ---
    @ParameterizedTest(name = "Optimal Merge Test {index}: nums1={0}, m={1}, nums2={2}, n={3}")
    @MethodSource("mergeCasesProvider")
    @DisplayName("mergeOptimal should correctly merge two sorted arrays")
    void testMergeOptimal(int[] nums1_initial, int m, int[] nums2_initial, int n, int[] expected) {
        int[] nums1_copy = ArrayUtils.copyArray(nums1_initial); // Create a deep copy to not modify original
        int[] nums2_copy = ArrayUtils.copyArray(nums2_initial); // Create a deep copy for nums2 as well

        merger.mergeOptimal(nums1_copy, m, nums2_copy, n);

        assertArrayEquals(expected, nums1_copy, "mergeOptimal failed");
        assertTrue(ArrayUtils.isSorted(nums1_copy), "mergeOptimal did not produce a sorted array");
    }

    // --- Brute-Force Solution Tests ---
    @ParameterizedTest(name = "Brute Force Merge Test {index}: nums1={0}, m={1}, nums2={2}, n={3}")
    @MethodSource("mergeCasesProvider")
    @DisplayName("mergeBruteForce should correctly merge two sorted arrays")
    void testMergeBruteForce(int[] nums1_initial, int m, int[] nums2_initial, int n, int[] expected) {
        int[] nums1_copy = ArrayUtils.copyArray(nums1_initial);
        int[] nums2_copy = ArrayUtils.copyArray(nums2_initial);

        merger.mergeBruteForce(nums1_copy, m, nums2_copy, n);

        assertArrayEquals(expected, nums1_copy, "mergeBruteForce failed");
        assertTrue(ArrayUtils.isSorted(nums1_copy), "mergeBruteForce did not produce a sorted array");
    }
}
```