```java
package com.example.binarysearch.problems;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class BruteForceSolutionsTest {

    private final BruteForceSolutions bruteForce = new BruteForceSolutions();

    // --- Test Cases for Linear Search ---
    static Stream<Arguments> linearSearchTestCases() {
        return Stream.of(
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 3, 2),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 1, 0),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 5, 4),
                Arguments.of(new int[]{1, 1, 1, 1, 1}, 1, 0), // Returns first occurrence
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 6, -1),
                Arguments.of(new int[]{}, 5, -1),
                Arguments.of(null, 5, -1)
        );
    }

    @ParameterizedTest(name = "Linear search for {1} in {0} should return {2}")
    @MethodSource("linearSearchTestCases")
    @DisplayName("Test linearSearch method")
    void testLinearSearch(int[] arr, int target, int expected) {
        assertEquals(expected, bruteForce.linearSearch(arr, target));
    }

    // --- Test Cases for Find First Occurrence Brute Force ---
    static Stream<Arguments> findFirstOccurrenceBruteForceTestCases() {
        return Stream.of(
                Arguments.of(new int[]{1, 2, 3, 3, 3, 4, 5}, 3, 2),
                Arguments.of(new int[]{1, 1, 1, 1, 1}, 1, 0),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 1, 0),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 5, 4),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 6, -1),
                Arguments.of(new int[]{}, 5, -1),
                Arguments.of(null, 5, -1)
        );
    }

    @ParameterizedTest(name = "BF First occurrence of {1} in {0} should be at {2}")
    @MethodSource("findFirstOccurrenceBruteForceTestCases")
    @DisplayName("Test findFirstOccurrenceBruteForce method")
    void testFindFirstOccurrenceBruteForce(int[] arr, int target, int expected) {
        assertEquals(expected, bruteForce.findFirstOccurrenceBruteForce(arr, target));
    }

    // --- Test Cases for Find Last Occurrence Brute Force ---
    static Stream<Arguments> findLastOccurrenceBruteForceTestCases() {
        return Stream.of(
                Arguments.of(new int[]{1, 2, 3, 3, 3, 4, 5}, 3, 4),
                Arguments.of(new int[]{1, 1, 1, 1, 1}, 1, 4),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 1, 0),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 5, 4),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 6, -1),
                Arguments.of(new int[]{}, 5, -1),
                Arguments.of(null, 5, -1)
        );
    }

    @ParameterizedTest(name = "BF Last occurrence of {1} in {0} should be at {2}")
    @MethodSource("findLastOccurrenceBruteForceTestCases")
    @DisplayName("Test findLastOccurrenceBruteForce method")
    void testFindLastOccurrenceBruteForce(int[] arr, int target, int expected) {
        assertEquals(expected, bruteForce.findLastOccurrenceBruteForce(arr, target));
    }

    // --- Test Cases for Search in Rotated Sorted Array Brute Force ---
    static Stream<Arguments> searchInRotatedSortedArrayBruteForceTestCases() {
        return Stream.of(
                Arguments.of(new int[]{4, 5, 6, 7, 0, 1, 2}, 0, 4),
                Arguments.of(new int[]{4, 5, 6, 7, 0, 1, 2}, 3, -1),
                Arguments.of(new int[]{1}, 1, 0),
                Arguments.of(new int[]{3, 1}, 1, 1),
                Arguments.of(new int[]{1, 2, 3, 4, 5, 6, 7}, 7, 6),
                Arguments.of(new int[]{}, 5, -1),
                Arguments.of(null, 5, -1)
        );
    }

    @ParameterizedTest(name = "BF Search {1} in rotated {0} should return {2}")
    @MethodSource("searchInRotatedSortedArrayBruteForceTestCases")
    @DisplayName("Test searchInRotatedSortedArrayBruteForce method")
    void testSearchInRotatedSortedArrayBruteForce(int[] arr, int target, int expected) {
        assertEquals(expected, bruteForce.searchInRotatedSortedArrayBruteForce(arr, target));
    }

    // --- Test Cases for Find Minimum in Rotated Sorted Array Brute Force ---
    static Stream<Arguments> findMinInRotatedSortedArrayBruteForceTestCases() {
        return Stream.of(
                Arguments.of(new int[]{3, 4, 5, 1, 2}, 1),
                Arguments.of(new int[]{4, 5, 6, 7, 0, 1, 2}, 0),
                Arguments.of(new int[]{1}, 1),
                Arguments.of(new int[]{2, 1}, 1),
                Arguments.of(new int[]{1, 2}, 1),
                Arguments.of(new int[]{10, 20, 30, 40, 50}, 10)
        );
    }

    @ParameterizedTest(name = "BF Minimum in {0} should be {1}")
    @MethodSource("findMinInRotatedSortedArrayBruteForceTestCases")
    @DisplayName("Test findMinInRotatedSortedArrayBruteForce method")
    void testFindMinInRotatedSortedArrayBruteForce(int[] arr, int expected) {
        assertEquals(expected, bruteForce.findMinInRotatedSortedArrayBruteForce(arr));
    }

    @Test
    @DisplayName("Test findMinInRotatedSortedArrayBruteForce with edge cases")
    void testFindMinInRotatedSortedArrayBruteForceEdgeCases() {
        assertThrows(IllegalArgumentException.class, () -> bruteForce.findMinInRotatedSortedArrayBruteForce(null));
        assertThrows(IllegalArgumentException.class, () -> bruteForce.findMinInRotatedSortedArrayBruteForce(new int[]{}));
    }

    // --- Test Cases for Find Square Root (Integer) Brute Force ---
    static Stream<Arguments> mySqrtBruteForceTestCases() {
        return Stream.of(
                Arguments.of(4, 2),
                Arguments.of(8, 2),
                Arguments.of(9, 3),
                Arguments.of(0, 0),
                Arguments.of(1, 1),
                Arguments.of(2, 1),
                Arguments.of(2147395599, 46340) // Largest x where x <= 46340^2
        );
    }

    @ParameterizedTest(name = "BF Square root of {0} should be {1}")
    @MethodSource("mySqrtBruteForceTestCases")
    @DisplayName("Test mySqrtBruteForce method")
    void testMySqrtBruteForce(int x, int expected) {
        assertEquals(expected, bruteForce.mySqrtBruteForce(x));
    }

    @Test
    @DisplayName("Test mySqrtBruteForce with negative input")
    void testMySqrtBruteForceNegativeInput() {
        assertThrows(IllegalArgumentException.class, () -> bruteForce.mySqrtBruteForce(-1));
    }

    // --- Test Cases for Find Peak Element Brute Force ---
    static Stream<Arguments> findPeakElementBruteForceTestCases() {
        return Stream.of(
                Arguments.of(new int[]{1, 2, 3, 1}, 2),
                Arguments.of(new int[]{1, 2, 1, 3, 5, 6, 4}, 5),
                Arguments.of(new int[]{1, 2}, 1),
                Arguments.of(new int[]{2, 1}, 0),
                Arguments.of(new int[]{1}, 0),
                Arguments.of(new int[]{3, 4, 3, 2, 1}, 1),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 4),
                Arguments.of(new int[]{5, 4, 3, 2, 1}, 0),
                Arguments.of(new int[]{1, 3, 2, 4, 1, 5, 0}, 1) // Returns the first peak found, which is 3 at index 1
        );
    }

    @ParameterizedTest(name = "BF Peak in {0} should be at index {1}")
    @MethodSource("findPeakElementBruteForceTestCases")
    @DisplayName("Test findPeakElementBruteForce method")
    void testFindPeakElementBruteForce(int[] nums, int expectedIndex) {
        int actualIndex = bruteForce.findPeakElementBruteForce(nums);
        // Verify that the returned index is indeed a peak
        boolean isPeak = true;
        if (actualIndex > 0) {
            isPeak = isPeak && (nums[actualIndex] > nums[actualIndex - 1]);
        }
        if (actualIndex < nums.length - 1) {
            isPeak = isPeak && (nums[actualIndex] > nums[actualIndex + 1]);
        }
        // Special handling for single element array as it's always a peak
        if (nums != null && nums.length == 1) {
            isPeak = true;
        }

        assertEquals(expectedIndex, actualIndex, "Returned index " + actualIndex + " with value " + (actualIndex != -1 ? nums[actualIndex] : "N/A") + " is not correct for this test case. It should be " + expectedIndex);
        assertEquals(true, isPeak, "Index " + actualIndex + " with value " + (actualIndex != -1 ? nums[actualIndex] : "N/A") + " is not a peak.");
    }

    @Test
    @DisplayName("Test findPeakElementBruteForce with edge cases")
    void testFindPeakElementBruteForceEdgeCases() {
        assertEquals(-1, bruteForce.findPeakElementBruteForce(null));
        assertEquals(-1, bruteForce.findPeakElementBruteForce(new int[]{}));
    }
}
```