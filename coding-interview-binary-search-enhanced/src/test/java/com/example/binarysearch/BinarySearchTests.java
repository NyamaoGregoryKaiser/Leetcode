```java
package com.example.binarysearch;

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
 * JUnit 5 test class for BinarySearchAlgorithms.
 * Provides extensive test cases for each problem.
 */
class BinarySearchTests {

    private BinarySearchAlgorithms algorithms;

    @BeforeEach
    void setUp() {
        algorithms = new BinarySearchAlgorithms();
    }

    // --- Problem 1: Standard Binary Search (findTarget) ---

    @Test
    @DisplayName("P1: findTarget - Target in middle")
    void testFindTarget_Middle() {
        int[] nums = {1, 3, 5, 7, 9, 11, 13};
        assertEquals(3, algorithms.findTarget(nums, 7));
    }

    @Test
    @DisplayName("P1: findTarget - Target at beginning")
    void testFindTarget_Beginning() {
        int[] nums = {1, 3, 5, 7, 9};
        assertEquals(0, algorithms.findTarget(nums, 1));
    }

    @Test
    @DisplayName("P1: findTarget - Target at end")
    void testFindTarget_End() {
        int[] nums = {1, 3, 5, 7, 9};
        assertEquals(4, algorithms.findTarget(nums, 9));
    }

    @Test
    @DisplayName("P1: findTarget - Target not present")
    void testFindTarget_NotFound() {
        int[] nums = {1, 3, 5, 7, 9};
        assertEquals(-1, algorithms.findTarget(nums, 4));
    }

    @Test
    @DisplayName("P1: findTarget - Empty array")
    void testFindTarget_EmptyArray() {
        int[] nums = {};
        assertEquals(-1, algorithms.findTarget(nums, 5));
    }

    @Test
    @DisplayName("P1: findTarget - Null array")
    void testFindTarget_NullArray() {
        assertEquals(-1, algorithms.findTarget(null, 5));
    }

    @Test
    @DisplayName("P1: findTarget - Single element array (found)")
    void testFindTarget_SingleElementFound() {
        int[] nums = {5};
        assertEquals(0, algorithms.findTarget(nums, 5));
    }

    @Test
    @DisplayName("P1: findTarget - Single element array (not found)")
    void testFindTarget_SingleElementNotFound() {
        int[] nums = {5};
        assertEquals(-1, algorithms.findTarget(nums, 3));
    }

    @Test
    @DisplayName("P1: findTarget - Even length array")
    void testFindTarget_EvenLength() {
        int[] nums = {2, 4, 6, 8};
        assertEquals(1, algorithms.findTarget(nums, 4));
        assertEquals(3, algorithms.findTarget(nums, 8));
        assertEquals(-1, algorithms.findTarget(nums, 5));
    }

    @Test
    @DisplayName("P1: findTarget - Array with negative numbers")
    void testFindTarget_NegativeNumbers() {
        int[] nums = {-10, -5, 0, 5, 10};
        assertEquals(1, algorithms.findTarget(nums, -5));
        assertEquals(2, algorithms.findTarget(nums, 0));
        assertEquals(-1, algorithms.findTarget(nums, -7));
    }

    // --- Problem 2: Find First and Last Position of Element in Sorted Array (findFirstAndLastOccurrence) ---

    @Test
    @DisplayName("P2: findFirstAndLast - Target with multiple occurrences in middle")
    void testFindFirstAndLast_MultipleMiddle() {
        int[] nums = {5, 7, 7, 8, 8, 8, 10};
        assertArrayEquals(new int[]{3, 5}, algorithms.findFirstAndLastOccurrence(nums, 8));
    }

    @Test
    @DisplayName("P2: findFirstAndLast - Target with multiple occurrences at beginning")
    void testFindFirstAndLast_MultipleBeginning() {
        int[] nums = {1, 1, 1, 2, 3, 4, 5};
        assertArrayEquals(new int[]{0, 2}, algorithms.findFirstAndLastOccurrence(nums, 1));
    }

    @Test
    @DisplayName("P2: findFirstAndLast - Target with multiple occurrences at end")
    void testFindFirstAndLast_MultipleEnd() {
        int[] nums = {1, 2, 3, 5, 5, 5};
        assertArrayEquals(new int[]{3, 5}, algorithms.findFirstAndLastOccurrence(nums, 5));
    }

    @Test
    @DisplayName("P2: findFirstAndLast - Target with single occurrence")
    void testFindFirstAndLast_SingleOccurrence() {
        int[] nums = {5, 7, 7, 8, 10};
        assertArrayEquals(new int[]{3, 3}, algorithms.findFirstAndLastOccurrence(nums, 8));
    }

    @Test
    @DisplayName("P2: findFirstAndLast - Target not present")
    void testFindFirstAndLast_NotFound() {
        int[] nums = {5, 7, 7, 8, 8, 10};
        assertArrayEquals(new int[]{-1, -1}, algorithms.findFirstAndLastOccurrence(nums, 6));
    }

    @Test
    @DisplayName("P2: findFirstAndLast - Empty array")
    void testFindFirstAndLast_EmptyArray() {
        int[] nums = {};
        assertArrayEquals(new int[]{-1, -1}, algorithms.findFirstAndLastOccurrence(nums, 0));
    }

    @Test
    @DisplayName("P2: findFirstAndLast - Null array")
    void testFindFirstAndLast_NullArray() {
        assertArrayEquals(new int[]{-1, -1}, algorithms.findFirstAndLastOccurrence(null, 0));
    }

    @Test
    @DisplayName("P2: findFirstAndLast - All elements are target")
    void testFindFirstAndLast_AllTarget() {
        int[] nums = {7, 7, 7, 7, 7};
        assertArrayEquals(new int[]{0, 4}, algorithms.findFirstAndLastOccurrence(nums, 7));
    }

    @Test
    @DisplayName("P2: findFirstAndLast - Target at extreme ends with duplicates")
    void testFindFirstAndLast_ExtremeEnds() {
        int[] nums = {1, 1, 1, 1, 1, 10, 10, 10, 10, 10};
        assertArrayEquals(new int[]{0, 4}, algorithms.findFirstAndLastOccurrence(nums, 1));
        assertArrayEquals(new int[]{5, 9}, algorithms.findFirstAndLastOccurrence(nums, 10));
    }

    // --- Problem 3: Search in Rotated Sorted Array (searchInRotatedSortedArray) ---

    @Test
    @DisplayName("P3: searchRotated - Target in first part of rotated array")
    void testSearchRotated_FirstPart() {
        int[] nums = {4, 5, 6, 7, 0, 1, 2};
        assertEquals(4, algorithms.searchInRotatedSortedArray(nums, 0));
    }

    @Test
    @DisplayName("P3: searchRotated - Target in second part of rotated array")
    void testSearchRotated_SecondPart() {
        int[] nums = {4, 5, 6, 7, 0, 1, 2};
        assertEquals(1, algorithms.searchInRotatedSortedArray(nums, 5));
    }

    @Test
    @DisplayName("P3: searchRotated - Target at pivot point")
    void testSearchRotated_AtPivot() {
        int[] nums = {7, 0, 1, 2, 4, 5, 6};
        assertEquals(1, algorithms.searchInRotatedSortedArray(nums, 0));
    }

    @Test
    @DisplayName("P3: searchRotated - Target not present")
    void testSearchRotated_NotFound() {
        int[] nums = {4, 5, 6, 7, 0, 1, 2};
        assertEquals(-1, algorithms.searchInRotatedSortedArray(nums, 3));
    }

    @Test
    @DisplayName("P3: searchRotated - Empty array")
    void testSearchRotated_EmptyArray() {
        int[] nums = {};
        assertEquals(-1, algorithms.searchInRotatedSortedArray(nums, 0));
    }

    @Test
    @DisplayName("P3: searchRotated - Null array")
    void testSearchRotated_NullArray() {
        assertEquals(-1, algorithms.searchInRotatedSortedArray(null, 0));
    }

    @Test
    @DisplayName("P3: searchRotated - Single element array (found)")
    void testSearchRotated_SingleElementFound() {
        int[] nums = {1};
        assertEquals(0, algorithms.searchInRotatedSortedArray(nums, 1));
    }

    @Test
    @DisplayName("P3: searchRotated - Single element array (not found)")
    void testSearchRotated_SingleElementNotFound() {
        int[] nums = {1};
        assertEquals(-1, algorithms.searchInRotatedSortedArray(nums, 2));
    }

    @Test
    @DisplayName("P3: searchRotated - Array not rotated")
    void testSearchRotated_NotRotated() {
        int[] nums = {0, 1, 2, 4, 5, 6, 7};
        assertEquals(3, algorithms.searchInRotatedSortedArray(nums, 4));
        assertEquals(0, algorithms.searchInRotatedSortedArray(nums, 0));
        assertEquals(6, algorithms.searchInRotatedSortedArray(nums, 7));
    }

    @Test
    @DisplayName("P3: searchRotated - Two elements")
    void testSearchRotated_TwoElements() {
        int[] nums1 = {1, 3};
        assertEquals(0, algorithms.searchInRotatedSortedArray(nums1, 1));
        assertEquals(1, algorithms.searchInRotatedSortedArray(nums1, 3));
        assertEquals(-1, algorithms.searchInRotatedSortedArray(nums1, 2));

        int[] nums2 = {3, 1}; // Rotated
        assertEquals(1, algorithms.searchInRotatedSortedArray(nums2, 1));
        assertEquals(0, algorithms.searchInRotatedSortedArray(nums2, 3));
        assertEquals(-1, algorithms.searchInRotatedSortedArray(nums2, 2));
    }

    // --- Problem 4: Find Peak Element (findPeakElement) ---

    @Test
    @DisplayName("P4: findPeak - Peak in middle")
    void testFindPeak_Middle() {
        int[] nums = {1, 2, 3, 1};
        assertEquals(2, algorithms.findPeakElement(nums));
    }

    @Test
    @DisplayName("P4: findPeak - Peak at beginning")
    void testFindPeak_Beginning() {
        int[] nums = {3, 2, 1};
        assertEquals(0, algorithms.findPeakElement(nums));
    }

    @Test
    @DisplayName("P4: findPeak - Peak at end")
    void testFindPeak_End() {
        int[] nums = {1, 2, 3};
        assertEquals(2, algorithms.findPeakElement(nums));
    }

    @Test
    @DisplayName("P4: findPeak - Multiple peaks (should return any)")
    void testFindPeak_MultiplePeaks() {
        int[] nums = {1, 2, 1, 3, 5, 6, 4};
        // Expected can be 1 (value 2) or 5 (value 6)
        int result = algorithms.findPeakElement(nums);
        assertTrue(result == 1 || result == 5);
    }

    @Test
    @DisplayName("P4: findPeak - Single element array")
    void testFindPeak_SingleElement() {
        int[] nums = {5};
        assertEquals(0, algorithms.findPeakElement(nums));
    }

    @Test
    @DisplayName("P4: findPeak - Two elements (ascending)")
    void testFindPeak_TwoElementsAscending() {
        int[] nums = {1, 2};
        assertEquals(1, algorithms.findPeakElement(nums));
    }

    @Test
    @DisplayName("P4: findPeak - Two elements (descending)")
    void testFindPeak_TwoElementsDescending() {
        int[] nums = {2, 1};
        assertEquals(0, algorithms.findPeakElement(nums));
    }

    @Test
    @DisplayName("P4: findPeak - Empty array")
    void testFindPeak_EmptyArray() {
        int[] nums = {};
        assertEquals(-1, algorithms.findPeakElement(nums));
    }

    @Test
    @DisplayName("P4: findPeak - Null array")
    void testFindPeak_NullArray() {
        assertEquals(-1, algorithms.findPeakElement(null));
    }

    @Test
    @DisplayName("P4: findPeak - All same elements (not a typical case, but should handle)")
    void testFindPeak_AllSameElements() {
        // Technically, problem states strictly greater, so no peak.
        // But with imagined -infinity neighbors, first/last elements might be peaks.
        // For example, {2,2,2} should return 0 or 2 if neighbors are -inf.
        // Our algorithm will return high, which is last element (index 2).
        int[] nums = {2, 2, 2};
        assertEquals(2, algorithms.findPeakElement(nums));
    }

    // --- Problem 5: Sqrt(x) ---

    @ParameterizedTest(name = "P5: mySqrt - sqrt({0}) should be {1}")
    @MethodSource("sqrtTestCases")
    void testMySqrt(int x, int expected) {
        assertEquals(expected, algorithms.mySqrt(x));
    }

    private static Stream<Arguments> sqrtTestCases() {
        return Stream.of(
                Arguments.of(0, 0),
                Arguments.of(1, 1),
                Arguments.of(2, 1),
                Arguments.of(3, 1),
                Arguments.of(4, 2),
                Arguments.of(8, 2),
                Arguments.of(9, 3),
                Arguments.of(10, 3),
                Arguments.of(24, 4),
                Arguments.of(25, 5),
                Arguments.of(2147395599, 46340), // Max int before overflow for 46341^2
                Arguments.of(Integer.MAX_VALUE, 46340) // Largest possible int
        );
    }

    @Test
    @DisplayName("P5: mySqrt - Negative input should throw exception")
    void testMySqrt_NegativeInput() {
        assertThrows(IllegalArgumentException.class, () -> algorithms.mySqrt(-1));
    }
}
```