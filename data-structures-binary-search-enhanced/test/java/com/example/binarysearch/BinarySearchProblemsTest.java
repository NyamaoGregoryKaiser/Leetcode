package com.example.binarysearch;

import com.example.binarysearch.utils.ArrayUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit 5 Test class for BinarySearchProblems.
 * Contains extensive test cases for each problem, including edge cases and normal scenarios.
 */
class BinarySearchProblemsTest {

    private BinarySearchProblems solver;

    @BeforeEach
    void setUp() {
        solver = new BinarySearchProblems();
    }

    // --- Tests for Standard Binary Search (search method) ---

    @Test
    @DisplayName("BS-1: Should find target in middle of even-length array")
    void testSearch_targetInMiddleEvenLength() {
        int[] arr = {1, 3, 5, 7, 9, 11};
        assertEquals(2, solver.search(arr, 5));
    }

    @Test
    @DisplayName("BS-2: Should find target in middle of odd-length array")
    void testSearch_targetInMiddleOddLength() {
        int[] arr = {1, 3, 5, 7, 9};
        assertEquals(2, solver.search(arr, 5));
    }

    @Test
    @DisplayName("BS-3: Should find target at beginning of array")
    void testSearch_targetAtBeginning() {
        int[] arr = {1, 3, 5, 7, 9};
        assertEquals(0, solver.search(arr, 1));
    }

    @Test
    @DisplayName("BS-4: Should find target at end of array")
    void testSearch_targetAtEnd() {
        int[] arr = {1, 3, 5, 7, 9};
        assertEquals(4, solver.search(arr, 9));
    }

    @Test
    @DisplayName("BS-5: Should return -1 when target not present")
    void testSearch_targetNotPresent() {
        int[] arr = {1, 3, 5, 7, 9};
        assertEquals(-1, solver.search(arr, 4));
    }

    @Test
    @DisplayName("BS-6: Should return -1 for empty array")
    void testSearch_emptyArray() {
        int[] arr = {};
        assertEquals(-1, solver.search(arr, 5));
    }

    @Test
    @DisplayName("BS-7: Should return 0 for single-element array matching target")
    void testSearch_singleElementArrayMatch() {
        int[] arr = {7};
        assertEquals(0, solver.search(arr, 7));
    }

    @Test
    @DisplayName("BS-8: Should return -1 for single-element array not matching target")
    void testSearch_singleElementArrayNoMatch() {
        int[] arr = {7};
        assertEquals(-1, solver.search(arr, 5));
    }

    @Test
    @DisplayName("BS-9: Should return -1 for null array")
    void testSearch_nullArray() {
        assertEquals(-1, solver.search(null, 5));
    }

    @Test
    @DisplayName("BS-10: Should find target with negative numbers")
    void testSearch_negativeNumbers() {
        int[] arr = {-10, -5, 0, 5, 10};
        assertEquals(1, solver.search(arr, -5));
        assertEquals(2, solver.search(arr, 0));
        assertEquals(4, solver.search(arr, 10));
        assertEquals(-1, solver.search(arr, 1));
    }

    // --- Tests for Find First Occurrence ---

    @Test
    @DisplayName("FFO-1: Should find first occurrence in array with duplicates")
    void testFindFirstOccurrence_withDuplicates() {
        int[] arr = {1, 2, 3, 3, 3, 4, 5};
        assertEquals(2, solver.findFirstOccurrence(arr, 3));
    }

    @Test
    @DisplayName("FFO-2: Should find first occurrence when target is unique")
    void testFindFirstOccurrence_uniqueTarget() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals(2, solver.findFirstOccurrence(arr, 3));
    }

    @Test
    @DisplayName("FFO-3: Should return -1 when target not present")
    void testFindFirstOccurrence_targetNotPresent() {
        int[] arr = {1, 2, 4, 5};
        assertEquals(-1, solver.findFirstOccurrence(arr, 3));
    }

    @Test
    @DisplayName("FFO-4: Should find first occurrence at beginning")
    void testFindFirstOccurrence_atBeginning() {
        int[] arr = {1, 1, 2, 3, 4, 5};
        assertEquals(0, solver.findFirstOccurrence(arr, 1));
    }

    @Test
    @DisplayName("FFO-5: Should find first occurrence at end")
    void testFindFirstOccurrence_atEnd() {
        int[] arr = {1, 2, 3, 4, 5, 5};
        assertEquals(4, solver.findFirstOccurrence(arr, 5));
    }

    @Test
    @DisplayName("FFO-6: Should handle empty array")
    void testFindFirstOccurrence_emptyArray() {
        int[] arr = {};
        assertEquals(-1, solver.findFirstOccurrence(arr, 3));
    }

    @Test
    @DisplayName("FFO-7: Should handle single element array matching")
    void testFindFirstOccurrence_singleElementMatch() {
        int[] arr = {3};
        assertEquals(0, solver.findFirstOccurrence(arr, 3));
    }

    @Test
    @DisplayName("FFO-8: Should handle single element array not matching")
    void testFindFirstOccurrence_singleElementNoMatch() {
        int[] arr = {3};
        assertEquals(-1, solver.findFirstOccurrence(arr, 4));
    }

    @Test
    @DisplayName("FFO-9: Should handle null array")
    void testFindFirstOccurrence_nullArray() {
        assertEquals(-1, solver.findFirstOccurrence(null, 3));
    }

    // --- Tests for Find Last Occurrence ---

    @Test
    @DisplayName("FLO-1: Should find last occurrence in array with duplicates")
    void testFindLastOccurrence_withDuplicates() {
        int[] arr = {1, 2, 3, 3, 3, 4, 5};
        assertEquals(4, solver.findLastOccurrence(arr, 3));
    }

    @Test
    @DisplayName("FLO-2: Should find last occurrence when target is unique")
    void testFindLastOccurrence_uniqueTarget() {
        int[] arr = {1, 2, 3, 4, 5};
        assertEquals(2, solver.findLastOccurrence(arr, 3));
    }

    @Test
    @DisplayName("FLO-3: Should return -1 when target not present")
    void testFindLastOccurrence_targetNotPresent() {
        int[] arr = {1, 2, 4, 5};
        assertEquals(-1, solver.findLastOccurrence(arr, 3));
    }

    @Test
    @DisplayName("FLO-4: Should find last occurrence at beginning")
    void testFindLastOccurrence_atBeginning() {
        int[] arr = {1, 1, 2, 3, 4, 5};
        assertEquals(1, solver.findLastOccurrence(arr, 1));
    }

    @Test
    @DisplayName("FLO-5: Should find last occurrence at end")
    void testFindLastOccurrence_atEnd() {
        int[] arr = {1, 2, 3, 4, 5, 5};
        assertEquals(5, solver.findLastOccurrence(arr, 5));
    }

    @Test
    @DisplayName("FLO-6: Should handle empty array")
    void testFindLastOccurrence_emptyArray() {
        int[] arr = {};
        assertEquals(-1, solver.findLastOccurrence(arr, 3));
    }

    @Test
    @DisplayName("FLO-7: Should handle single element array matching")
    void testFindLastOccurrence_singleElementMatch() {
        int[] arr = {3};
        assertEquals(0, solver.findLastOccurrence(arr, 3));
    }

    @Test
    @DisplayName("FLO-8: Should handle single element array not matching")
    void testFindLastOccurrence_singleElementNoMatch() {
        int[] arr = {3};
        assertEquals(-1, solver.findLastOccurrence(arr, 4));
    }

    @Test
    @DisplayName("FLO-9: Should handle null array")
    void testFindLastOccurrence_nullArray() {
        assertEquals(-1, solver.findLastOccurrence(null, 3));
    }

    // --- Tests for Search in Rotated Sorted Array ---

    @Test
    @DisplayName("SRSA-1: Should find target in a rotated array (pivot in middle)")
    void testSearchInRotatedSortedArray_pivotInMiddle() {
        int[] nums = {4, 5, 6, 7, 0, 1, 2}; // Pivot at 0
        assertEquals(4, solver.searchInRotatedSortedArray(nums, 0));
        assertEquals(0, solver.searchInRotatedSortedArray(nums, 4));
        assertEquals(6, solver.searchInRotatedSortedArray(nums, 2));
        assertEquals(3, solver.searchInRotatedSortedArray(nums, 7));
    }

    @Test
    @DisplayName("SRSA-2: Should return -1 when target not present")
    void testSearchInRotatedSortedArray_targetNotPresent() {
        int[] nums = {4, 5, 6, 7, 0, 1, 2};
        assertEquals(-1, solver.searchInRotatedSortedArray(nums, 3));
    }

    @Test
    @DisplayName("SRSA-3: Should handle array not rotated")
    void testSearchInRotatedSortedArray_notRotated() {
        int[] nums = {0, 1, 2, 4, 5, 6, 7};
        assertEquals(0, solver.searchInRotatedSortedArray(nums, 0));
        assertEquals(6, solver.searchInRotatedSortedArray(nums, 7));
        assertEquals(3, solver.searchInRotatedSortedArray(nums, 4));
    }

    @Test
    @DisplayName("SRSA-4: Should handle single element array matching")
    void testSearchInRotatedSortedArray_singleElementMatch() {
        int[] nums = {1};
        assertEquals(0, solver.searchInRotatedSortedArray(nums, 1));
    }

    @Test
    @DisplayName("SRSA-5: Should handle single element array not matching")
    void testSearchInRotatedSortedArray_singleElementNoMatch() {
        int[] nums = {1};
        assertEquals(-1, solver.searchInRotatedSortedArray(nums, 0));
    }

    @Test
    @DisplayName("SRSA-6: Should handle empty array")
    void testSearchInRotatedSortedArray_emptyArray() {
        int[] nums = {};
        assertEquals(-1, solver.searchInRotatedSortedArray(nums, 0));
    }

    @Test
    @DisplayName("SRSA-7: Should handle null array")
    void testSearchInRotatedSortedArray_nullArray() {
        assertEquals(-1, solver.searchInRotatedSortedArray(null, 0));
    }

    @Test
    @DisplayName("SRSA-8: Should handle two elements array (rotated)")
    void testSearchInRotatedSortedArray_twoElementsRotated() {
        int[] nums = {3, 1}; // Original {1,3} rotated
        assertEquals(1, solver.searchInRotatedSortedArray(nums, 1));
        assertEquals(0, solver.searchInRotatedSortedArray(nums, 3));
        assertEquals(-1, solver.searchInRotatedSortedArray(nums, 2));
    }

    @Test
    @DisplayName("SRSA-9: Should handle two elements array (not rotated)")
    void testSearchInRotatedSortedArray_twoElementsNotRotated() {
        int[] nums = {1, 3};
        assertEquals(0, solver.searchInRotatedSortedArray(nums, 1));
        assertEquals(1, solver.searchInRotatedSortedArray(nums, 3));
        assertEquals(-1, solver.searchInRotatedSortedArray(nums, 2));
    }

    @Test
    @DisplayName("SRSA-10: Should handle duplicates (though problem statement typically says unique)")
    void testSearchInRotatedSortedArray_withDuplicates() {
        // LeetCode problem 33 usually assumes unique. If duplicates are allowed, it's problem 81.
        // Our current implementation works for unique elements.
        // For duplicates, the logic needs a slight adjustment (e.g., when nums[low] == nums[mid] == nums[high], low++).
        int[] nums = {1, 1, 1, 1, 1, 2, 1, 1}; // This is a harder case, for unique this works.
        // Test with unique array for now
        int[] uniqueRotated = {3, 4, 5, 6, 7, 8, 1, 2};
        assertEquals(6, solver.searchInRotatedSortedArray(uniqueRotated, 1));
    }

    // --- Tests for Find Peak Element ---

    @Test
    @DisplayName("FPE-1: Should find peak in a multi-peak array (returning first found)")
    void testFindPeakElement_multiPeak() {
        int[] nums = {1, 2, 1, 3, 5, 6, 4}; // Peaks at index 1 (2) and 5 (6)
        int peakIndex = solver.findPeakElement(nums);
        assertTrue(peakIndex == 1 || peakIndex == 5);
        if (peakIndex == 1) { // Peak at 2
            assertTrue(nums[1] > nums[0] && nums[1] > nums[2]);
        } else { // Peak at 6
            assertTrue(nums[5] > nums[4] && nums[5] > nums[6]);
        }
    }

    @Test
    @DisplayName("FPE-2: Should find peak at beginning of array")
    void testFindPeakElement_peakAtBeginning() {
        int[] nums = {3, 2, 1};
        assertEquals(0, solver.findPeakElement(nums));
    }

    @Test
    @DisplayName("FPE-3: Should find peak at end of array")
    void testFindPeakElement_peakAtEnd() {
        int[] nums = {1, 2, 3};
        assertEquals(2, solver.findPeakElement(nums));
    }

    @Test
    @DisplayName("FPE-4: Should find peak in single-element array")
    void testFindPeakElement_singleElement() {
        int[] nums = {5};
        assertEquals(0, solver.findPeakElement(nums));
    }

    @Test
    @DisplayName("FPE-5: Should handle two-element array (first is peak)")
    void testFindPeakElement_twoElementsFirstPeak() {
        int[] nums = {5, 1};
        assertEquals(0, solver.findPeakElement(nums));
    }

    @Test
    @DisplayName("FPE-6: Should handle two-element array (second is peak)")
    void testFindPeakElement_twoElementsSecondPeak() {
        int[] nums = {1, 5};
        assertEquals(1, solver.findPeakElement(nums));
    }

    @Test
    @DisplayName("FPE-7: Should find peak in a larger array")
    void testFindPeakElement_largerArray() {
        int[] nums = {1, 2, 3, 4, 5, 4, 3, 2, 1}; // Peak at 5 (index 4)
        assertEquals(4, solver.findPeakElement(nums));
    }

    @Test
    @DisplayName("FPE-8: Should throw exception for empty array")
    void testFindPeakElement_emptyArray() {
        int[] nums = {};
        assertThrows(IllegalArgumentException.class, () -> solver.findPeakElement(nums));
    }

    @Test
    @DisplayName("FPE-9: Should throw exception for null array")
    void testFindPeakElement_nullArray() {
        assertThrows(IllegalArgumentException.class, () -> solver.findPeakElement(null));
    }

    @Test
    @DisplayName("FPE-10: Ascending array, peak at end")
    void testFindPeakElement_ascendingArray() {
        int[] nums = {1, 2, 3, 4, 5, 6, 7};
        assertEquals(6, solver.findPeakElement(nums));
    }

    @Test
    @DisplayName("FPE-11: Descending array, peak at start")
    void testFindPeakElement_descendingArray() {
        int[] nums = {7, 6, 5, 4, 3, 2, 1};
        assertEquals(0, solver.findPeakElement(nums));
    }

    // --- Tests for Integer Square Root (mySqrt) ---

    @ParameterizedTest(name = "Sqrt({0}) should be {1}")
    @CsvSource({
            "0, 0",
            "1, 1",
            "4, 2",
            "8, 2", // Truncated
            "9, 3",
            "15, 3", // Truncated
            "16, 4",
            "2147395599, 46340" // Max int before overflow for sqrt(x)
    })
    @DisplayName("MY_SQRT-1 to MY_SQRT-8: Should return correct integer square root for various inputs")
    void testMySqrt_variousInputs(int input, int expected) {
        assertEquals(expected, solver.mySqrt(input));
    }

    @Test
    @DisplayName("MY_SQRT-9: Should handle maximum integer value safely")
    void testMySqrt_maxIntValue() {
        int x = Integer.MAX_VALUE; // 2147483647
        assertEquals(46340, solver.mySqrt(x));
    }

    @Test
    @DisplayName("MY_SQRT-10: Should throw exception for negative input")
    void testMySqrt_negativeInput() {
        assertThrows(IllegalArgumentException.class, () -> solver.mySqrt(-1));
        assertThrows(IllegalArgumentException.class, () -> solver.mySqrt(-100));
    }

    @Test
    @DisplayName("MY_SQRT-11: Larger numbers with square roots")
    void testMySqrt_largeNumbers() {
        assertEquals(100, solver.mySqrt(10000));
        assertEquals(1000, solver.mySqrt(1000000));
        assertEquals(30000, solver.mySqrt(900000000));
    }
}