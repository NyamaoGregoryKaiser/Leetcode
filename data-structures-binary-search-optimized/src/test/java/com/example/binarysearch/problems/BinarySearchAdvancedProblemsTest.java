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

class BinarySearchAdvancedProblemsTest {

    private final BinarySearchAdvancedProblems problems = new BinarySearchAdvancedProblems();

    // --- Test Cases for Find First Occurrence ---
    static Stream<Arguments> findFirstOccurrenceTestCases() {
        return Stream.of(
                Arguments.of(new int[]{1, 2, 3, 3, 3, 4, 5}, 3, 2),
                Arguments.of(new int[]{1, 1, 1, 1, 1}, 1, 0),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 1, 0), // First element
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 5, 4), // Last element, unique
                Arguments.of(new int[]{10, 20, 30, 40, 50}, 30, 2),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 6, -1), // Not found (greater)
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 0, -1), // Not found (smaller)
                Arguments.of(new int[]{}, 5, -1), // Empty array
                Arguments.of(null, 5, -1), // Null array
                Arguments.of(new int[]{5, 5, 5}, 5, 0),
                Arguments.of(new int[]{1, 2, 2, 3, 4}, 2, 1)
        );
    }

    @ParameterizedTest(name = "First occurrence of {1} in {0} should be at {2}")
    @MethodSource("findFirstOccurrenceTestCases")
    @DisplayName("Test findFirstOccurrence method")
    void testFindFirstOccurrence(int[] arr, int target, int expected) {
        assertEquals(expected, problems.findFirstOccurrence(arr, target));
    }

    // --- Test Cases for Find Last Occurrence ---
    static Stream<Arguments> findLastOccurrenceTestCases() {
        return Stream.of(
                Arguments.of(new int[]{1, 2, 3, 3, 3, 4, 5}, 3, 4),
                Arguments.of(new int[]{1, 1, 1, 1, 1}, 1, 4),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 1, 0), // First element, unique
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 5, 4), // Last element
                Arguments.of(new int[]{10, 20, 30, 40, 50}, 30, 2),
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 6, -1), // Not found (greater)
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 0, -1), // Not found (smaller)
                Arguments.of(new int[]{}, 5, -1), // Empty array
                Arguments.of(null, 5, -1), // Null array
                Arguments.of(new int[]{5, 5, 5}, 5, 2),
                Arguments.of(new int[]{1, 2, 2, 3, 4}, 2, 2)
        );
    }

    @ParameterizedTest(name = "Last occurrence of {1} in {0} should be at {2}")
    @MethodSource("findLastOccurrenceTestCases")
    @DisplayName("Test findLastOccurrence method")
    void testFindLastOccurrence(int[] arr, int target, int expected) {
        assertEquals(expected, problems.findLastOccurrence(arr, target));
    }

    // --- Test Cases for Search in Rotated Sorted Array ---
    static Stream<Arguments> searchInRotatedSortedArrayTestCases() {
        return Stream.of(
                Arguments.of(new int[]{4, 5, 6, 7, 0, 1, 2}, 0, 4),
                Arguments.of(new int[]{4, 5, 6, 7, 0, 1, 2}, 3, -1),
                Arguments.of(new int[]{1}, 0, -1),
                Arguments.of(new int[]{1}, 1, 0),
                Arguments.of(new int[]{1, 3}, 3, 1),
                Arguments.of(new int[]{3, 1}, 1, 1),
                Arguments.of(new int[]{3, 5, 1}, 3, 0),
                Arguments.of(new int[]{5, 1, 3}, 3, 2),
                Arguments.of(new int[]{6, 7, 0, 1, 2, 3, 4, 5}, 0, 2),
                Arguments.of(new int[]{6, 7, 0, 1, 2, 3, 4, 5}, 7, 1),
                Arguments.of(new int[]{6, 7, 0, 1, 2, 3, 4, 5}, 5, 7),
                Arguments.of(new int[]{6, 7, 0, 1, 2, 3, 4, 5}, 8, -1),
                Arguments.of(new int[]{1, 2, 3, 4, 5, 6, 7}, 1, 0), // Not rotated
                Arguments.of(new int[]{1, 2, 3, 4, 5, 6, 7}, 7, 6), // Not rotated
                Arguments.of(new int[]{1, 2, 3, 4, 5, 6, 7}, 0, -1), // Not found
                Arguments.of(new int[]{}, 5, -1), // Empty array
                Arguments.of(null, 5, -1) // Null array
        );
    }

    @ParameterizedTest(name = "Search {1} in rotated {0} should return {2}")
    @MethodSource("searchInRotatedSortedArrayTestCases")
    @DisplayName("Test searchInRotatedSortedArray method")
    void testSearchInRotatedSortedArray(int[] arr, int target, int expected) {
        assertEquals(expected, problems.searchInRotatedSortedArray(arr, target));
    }

    // --- Test Cases for Find Minimum in Rotated Sorted Array ---
    static Stream<Arguments> findMinInRotatedSortedArrayTestCases() {
        return Stream.of(
                Arguments.of(new int[]{3, 4, 5, 1, 2}, 1),
                Arguments.of(new int[]{4, 5, 6, 7, 0, 1, 2}, 0),
                Arguments.of(new int[]{1}, 1),
                Arguments.of(new int[]{2, 1}, 1),
                Arguments.of(new int[]{1, 2}, 1), // Not rotated
                Arguments.of(new int[]{10, 20, 30, 40, 50}, 10), // Not rotated
                Arguments.of(new int[]{5, 1, 2, 3, 4}, 1),
                Arguments.of(new int[]{2, 3, 4, 5, 1}, 1)
        );
    }

    @ParameterizedTest(name = "Minimum in {0} should be {1}")
    @MethodSource("findMinInRotatedSortedArrayTestCases")
    @DisplayName("Test findMinInRotatedSortedArray method")
    void testFindMinInRotatedSortedArray(int[] arr, int expected) {
        assertEquals(expected, problems.findMinInRotatedSortedArray(arr));
    }

    @Test
    @DisplayName("Test findMinInRotatedSortedArray with edge cases")
    void testFindMinInRotatedSortedArrayEdgeCases() {
        assertThrows(IllegalArgumentException.class, () -> problems.findMinInRotatedSortedArray(null));
        assertThrows(IllegalArgumentException.class, () -> problems.findMinInRotatedSortedArray(new int[]{}));
    }

    // --- Test Cases for Find Square Root (Integer) ---
    static Stream<Arguments> mySqrtTestCases() {
        return Stream.of(
                Arguments.of(4, 2),
                Arguments.of(8, 2),
                Arguments.of(9, 3),
                Arguments.of(0, 0),
                Arguments.of(1, 1),
                Arguments.of(2, 1),
                Arguments.of(2147395599, 46340), // Max int before sqrt(MAX_INT) for 32-bit (46340*46340 = 2147395600)
                Arguments.of(2147483647, 46340) // Integer.MAX_VALUE
        );
    }

    @ParameterizedTest(name = "Square root of {0} should be {1}")
    @MethodSource("mySqrtTestCases")
    @DisplayName("Test mySqrt method")
    void testMySqrt(int x, int expected) {
        assertEquals(expected, problems.mySqrt(x));
    }

    @Test
    @DisplayName("Test mySqrt with negative input")
    void testMySqrtNegativeInput() {
        assertThrows(IllegalArgumentException.class, () -> problems.mySqrt(-1));
    }

    // --- Test Cases for Find Peak Element ---
    static Stream<Arguments> findPeakElementTestCases() {
        return Stream.of(
                Arguments.of(new int[]{1, 2, 3, 1}, 2), // Index 2 (value 3)
                Arguments.of(new int[]{1, 2, 1, 3, 5, 6, 4}, 5), // Index 5 (value 6)
                Arguments.of(new int[]{1, 2}, 1), // Index 1 (value 2)
                Arguments.of(new int[]{2, 1}, 0), // Index 0 (value 2)
                Arguments.of(new int[]{1}, 0), // Single element
                Arguments.of(new int[]{3, 4, 3, 2, 1}, 1), // Index 1 (value 4)
                Arguments.of(new int[]{1, 2, 3, 4, 5}, 4), // Index 4 (value 5)
                Arguments.of(new int[]{5, 4, 3, 2, 1}, 0), // Index 0 (value 5)
                Arguments.of(new int[]{1, 3, 2, 4, 1, 5, 0}, 5) // Index 5 (value 5), or 1 (value 3) or 3 (value 4) -> any is fine, 5 is correct with current algo
        );
    }

    @ParameterizedTest(name = "Peak in {0} should be at index {1}")
    @MethodSource("findPeakElementTestCases")
    @DisplayName("Test findPeakElement method")
    void testFindPeakElement(int[] nums, int expectedIndex) {
        int actualIndex = problems.findPeakElement(nums);
        // Verify that the returned index is indeed a peak
        boolean isPeak = true;
        if (actualIndex > 0) {
            isPeak = isPeak && (nums[actualIndex] > nums[actualIndex - 1]);
        }
        if (actualIndex < nums.length - 1) {
            isPeak = isPeak && (nums[actualIndex] > nums[actualIndex + 1]);
        }
        assertEquals(true, isPeak, "Index " + actualIndex + " with value " + nums[actualIndex] + " is not a peak.");
        // We only assert that it's *a* peak, not necessarily the *specific* one from `expectedIndex`
        // as multiple peaks can exist. However, for deterministic arrays, our algorithm yields a specific one.
    }

    @Test
    @DisplayName("Test findPeakElement with edge cases")
    void testFindPeakElementEdgeCases() {
        assertEquals(-1, problems.findPeakElement(null));
        assertEquals(-1, problems.findPeakElement(new int[]{}));
    }
}
```