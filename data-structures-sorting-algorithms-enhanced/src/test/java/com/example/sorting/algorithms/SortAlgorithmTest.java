```java
package com.example.sorting.algorithms;

import com.example.sorting.utils.ArrayGenerator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Arrays;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for various sorting algorithms.
 * Each sorting algorithm implementation extends AbstractSorter.
 */
class SortAlgorithmTest {

    // Helper to get all sorter instances
    private static Stream<Arguments> sorterProviders() {
        return Stream.of(
                Arguments.of(new BubbleSort(), "BubbleSort"),
                Arguments.of(new SelectionSort(), "SelectionSort"),
                Arguments.of(new InsertionSort(), "InsertionSort"),
                Arguments.of(new MergeSort(), "MergeSort"),
                Arguments.of(new QuickSort(), "QuickSort"),
                Arguments.of(new HeapSort(), "HeapSort"),
                Arguments.of(new CountingSort(), "CountingSort"), // CountingSort has specific constraints (non-negative)
                Arguments.of(new RadixSort(), "RadixSort")      // RadixSort has specific constraints (non-negative)
        );
    }

    // Helper for sorters that support negative numbers
    private static Stream<Arguments> generalSorterProviders() {
        return Stream.of(
                Arguments.of(new BubbleSort(), "BubbleSort"),
                Arguments.of(new SelectionSort(), "SelectionSort"),
                Arguments.of(new InsertionSort(), "InsertionSort"),
                Arguments.of(new MergeSort(), "MergeSort"),
                Arguments.of(new QuickSort(), "QuickSort"),
                Arguments.of(new HeapSort(), "HeapSort")
        );
    }

    // Helper for sorters that only support non-negative numbers
    private static Stream<Arguments> nonNegativeSorterProviders() {
        return Stream.of(
                Arguments.of(new CountingSort(), "CountingSort"),
                Arguments.of(new RadixSort(), "RadixSort")
        );
    }

    @ParameterizedTest(name = "{displayName} - {1}")
    @MethodSource("generalSorterProviders")
    @DisplayName("Sorts a small random array with negative numbers")
    void testSmallRandomArrayWithNegatives(AbstractSorter sorter, String name) {
        int[] arr = ArrayGenerator.generateRandomArray(10, -50, 50);
        int[] expected = Arrays.copyOf(arr, arr.length);
        Arrays.sort(expected);

        sorter.sort(arr);
        assertArrayEquals(expected, arr);
    }

    @ParameterizedTest(name = "{displayName} - {1}")
    @MethodSource("sorterProviders")
    @DisplayName("Sorts an empty array")
    void testEmptyArray(AbstractSorter sorter, String name) {
        int[] arr = {};
        sorter.sort(arr);
        assertArrayEquals(new int[]{}, arr);
    }

    @ParameterizedTest(name = "{displayName} - {1}")
    @MethodSource("sorterProviders")
    @DisplayName("Sorts a single-element array")
    void testSingleElementArray(AbstractSorter sorter, String name) {
        int[] arr = {5};
        sorter.sort(arr);
        assertArrayEquals(new int[]{5}, arr);
    }

    @ParameterizedTest(name = "{displayName} - {1}")
    @MethodSource("sorterProviders")
    @DisplayName("Sorts an array with positive numbers")
    void testPositiveNumbers(AbstractSorter sorter, String name) {
        int[] arr = ArrayGenerator.generateRandomArray(100, 1, 1000);
        int[] expected = Arrays.copyOf(arr, arr.length);
        Arrays.sort(expected);

        sorter.sort(arr);
        assertArrayEquals(expected, arr);
    }

    @ParameterizedTest(name = "{displayName} - {1}")
    @MethodSource("generalSorterProviders")
    @DisplayName("Sorts an array with negative and positive numbers")
    void testMixedNumbers(AbstractSorter sorter, String name) {
        int[] arr = ArrayGenerator.generateRandomArray(100, -500, 500);
        int[] expected = Arrays.copyOf(arr, arr.length);
        Arrays.sort(expected);

        sorter.sort(arr);
        assertArrayEquals(expected, arr);
    }

    @ParameterizedTest(name = "{displayName} - {1}")
    @MethodSource("nonNegativeSorterProviders")
    @DisplayName("CountingSort/RadixSort throws on negative numbers")
    void testNonNegativeSortersWithNegativeNumbers(AbstractSorter sorter, String name) {
        int[] arr = {-5, 2, 8};
        assertThrows(IllegalArgumentException.class, () -> sorter.sort(arr));
    }

    @ParameterizedTest(name = "{displayName} - {1}")
    @MethodSource("sorterProviders")
    @DisplayName("Sorts an already sorted array")
    void testAlreadySortedArray(AbstractSorter sorter, String name) {
        int[] arr = ArrayGenerator.generateSortedArray(100);
        int[] expected = Arrays.copyOf(arr, arr.length); // Should remain same

        sorter.sort(arr);
        assertArrayEquals(expected, arr);
    }

    @ParameterizedTest(name = "{displayName} - {1}")
    @MethodSource("sorterProviders")
    @DisplayName("Sorts a reverse sorted array")
    void testReverseSortedArray(AbstractSorter sorter, String name) {
        int[] arr = ArrayGenerator.generateReverseSortedArray(100);
        int[] expected = ArrayGenerator.generateSortedArray(100);

        sorter.sort(arr);
        assertArrayEquals(expected, arr);
    }

    @ParameterizedTest(name = "{displayName} - {1}")
    @MethodSource("sorterProviders")
    @DisplayName("Sorts an array with duplicate elements")
    void testArrayWithDuplicates(AbstractSorter sorter, String name) {
        int[] arr = ArrayGenerator.generateArrayWithDuplicates(100, 10); // 10 distinct values
        int[] expected = Arrays.copyOf(arr, arr.length);
        Arrays.sort(expected);

        sorter.sort(arr);
        assertArrayEquals(expected, arr);
    }

    @ParameterizedTest(name = "{displayName} - {1}")
    @MethodSource("sorterProviders")
    @DisplayName("Sorts an array with all elements same")
    void testConstantArray(AbstractSorter sorter, String name) {
        int[] arr = ArrayGenerator.generateConstantArray(100, 7);
        int[] expected = Arrays.copyOf(arr, arr.length); // Should remain same

        sorter.sort(arr);
        assertArrayEquals(expected, arr);
    }

    @ParameterizedTest(name = "{displayName} - {1}")
    @MethodSource("sorterProviders")
    @DisplayName("Sorts a larger random array")
    void testLargerRandomArray(AbstractSorter sorter, String name) {
        int[] arr = ArrayGenerator.generateRandomArray(5000, 0, 10000);
        int[] expected = Arrays.copyOf(arr, arr.length);
        Arrays.sort(expected);

        sorter.sort(arr);
        assertArrayEquals(expected, arr);
    }

    @ParameterizedTest(name = "{displayName} - {1}")
    @MethodSource("sorterProviders")
    @DisplayName("Throws IllegalArgumentException for null array")
    void testNullArray(AbstractSorter sorter, String name) {
        int[] arr = null;
        assertThrows(IllegalArgumentException.class, () -> sorter.sort(arr));
    }
}
```