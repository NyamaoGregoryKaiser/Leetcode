package com.binarysearch;

import com.binarysearch.algorithms.BinarySearchProblems;
import com.binarysearch.algorithms.BruteForceSolutions;
import com.binarysearch.utils.ArrayGenerator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Binary Search Problem Tests")
class BinarySearchTest {

    private BinarySearchProblems binarySearch;
    private BruteForceSolutions bruteForce;

    @BeforeEach
    void setUp() {
        binarySearch = new BinarySearchProblems();
        bruteForce = new BruteForceSolutions();
    }

    // --- Problem 1: Standard Binary Search (`find`) ---
    @Test
    @DisplayName("P1: find - Empty array should return -1")
    void testFindEmptyArray() {
        assertEquals(-1, binarySearch.find(new int[]{}, 5));
        assertEquals(-1, binarySearch.findRecursive(new int[]{}, 5));
        assertEquals(-1, bruteForce.find(new int[]{}, 5));
    }

    @Test
    @DisplayName("P1: find - Single element array, target found")
    void testFindSingleElementFound() {
        assertEquals(0, binarySearch.find(new int[]{5}, 5));
        assertEquals(0, binarySearch.findRecursive(new int[]{5}, 5));
        assertEquals(0, bruteForce.find(new int[]{5}, 5));
    }

    @Test
    @DisplayName("P1: find - Single element array, target not found")
    void testFindSingleElementNotFound() {
        assertEquals(-1, binarySearch.find(new int[]{5}, 10));
        assertEquals(-1, binarySearch.findRecursive(new int[]{5}, 10));
        assertEquals(-1, bruteForce.find(new int[]{5}, 10));
    }

    @Test
    @DisplayName("P1: find - Target at beginning of array")
    void testFindTargetAtBeginning() {
        int[] nums = {1, 5, 10, 15, 20};
        assertEquals(0, binarySearch.find(nums, 1));
        assertEquals(0, binarySearch.findRecursive(nums, 1));
        assertEquals(0, bruteForce.find(nums, 1));
    }

    @Test
    @DisplayName("P1: find - Target at end of array")
    void testFindTargetAtEnd() {
        int[] nums = {1, 5, 10, 15, 20};
        assertEquals(4, binarySearch.find(nums, 20));
        assertEquals(4, binarySearch.findRecursive(nums, 20));
        assertEquals(4, bruteForce.find(nums, 20));
    }

    @Test
    @DisplayName("P1: find - Target in middle of array")
    void testFindTargetInMiddle() {
        int[] nums = {1, 5, 10, 15, 20};
        assertEquals(2, binarySearch.find(nums, 10));
        assertEquals(2, binarySearch.findRecursive(nums, 10));
        assertEquals(2, bruteForce.find(nums, 10));
    }

    @Test
    @DisplayName("P1: find - Target not present in array")
    void testFindTargetNotFound() {
        int[] nums = {1, 5, 10, 15, 20};
        assertEquals(-1, binarySearch.find(nums, 7));
        assertEquals(-1, binarySearch.findRecursive(nums, 7));
        assertEquals(-1, bruteForce.find(nums, 7));
    }

    @Test
    @DisplayName("P1: find - Target not present, less than min")
    void testFindTargetLessThanMin() {
        int[] nums = {1, 5, 10, 15, 20};
        assertEquals(-1, binarySearch.find(nums, 0));
        assertEquals(-1, binarySearch.findRecursive(nums, 0));
        assertEquals(-1, bruteForce.find(nums, 0));
    }

    @Test
    @DisplayName("P1: find - Target not present, greater than max")
    void testFindTargetGreaterThanMax() {
        int[] nums = {1, 5, 10, 15, 20};
        assertEquals(-1, binarySearch.find(nums, 25));
        assertEquals(-1, binarySearch.findRecursive(nums, 25));
        assertEquals(-1, bruteForce.find(nums, 25));
    }

    @Test
    @DisplayName("P1: find - Array with even number of elements")
    void testFindEvenLengthArray() {
        int[] nums = {2, 4, 6, 8};
        assertEquals(1, binarySearch.find(nums, 4));
        assertEquals(1, binarySearch.findRecursive(nums, 4));
        assertEquals(1, bruteForce.find(nums, 4));
        assertEquals(-1, binarySearch.find(nums, 5));
        assertEquals(-1, binarySearch.findRecursive(nums, 5));
        assertEquals(-1, bruteForce.find(nums, 5));
    }

    @Test
    @DisplayName("P1: find - Array with odd number of elements")
    void testFindOddLengthArray() {
        int[] nums = {1, 3, 5, 7, 9};
        assertEquals(2, binarySearch.find(nums, 5));
        assertEquals(2, binarySearch.findRecursive(nums, 5));
        assertEquals(2, bruteForce.find(nums, 5));
        assertEquals(-1, binarySearch.find(nums, 8));
        assertEquals(-1, binarySearch.findRecursive(nums, 8));
        assertEquals(-1, bruteForce.find(nums, 8));
    }

    @Test
    @DisplayName("P1: find - Large random sorted array")
    void testFindLargeRandomArray() {
        int[] nums = ArrayGenerator.generateSortedArray(1000);
        int target = nums[ArrayGenerator.RANDOM.nextInt(1000)];
        assertTrue(binarySearch.find(nums, target) != -1);
        assertTrue(binarySearch.findRecursive(nums, target) != -1);
        assertTrue(bruteForce.find(nums, target) != -1);

        assertEquals(bruteForce.find(nums, target), binarySearch.find(nums, target));
        assertEquals(bruteForce.find(nums, target), binarySearch.findRecursive(nums, target));
    }

    // --- Problem 2: Find First/Last Occurrence ---
    @Test
    @DisplayName("P2: findFirst - Empty array should return -1")
    void testFindFirstEmptyArray() {
        assertEquals(-1, binarySearch.findFirst(new int[]{}, 5));
        assertEquals(-1, bruteForce.findFirst(new int[]{}, 5));
    }

    @Test
    @DisplayName("P2: findLast - Empty array should return -1")
    void testFindLastEmptyArray() {
        assertEquals(-1, binarySearch.findLast(new int[]{}, 5));
        assertEquals(-1, bruteForce.findLast(new int[]{}, 5));
    }

    @Test
    @DisplayName("P2: findFirst/findLast - Single element array, target found")
    void testFindFirstLastSingleElementFound() {
        assertEquals(0, binarySearch.findFirst(new int[]{5}, 5));
        assertEquals(0, binarySearch.findLast(new int[]{5}, 5));
        assertEquals(0, bruteForce.findFirst(new int[]{5}, 5));
        assertEquals(0, bruteForce.findLast(new int[]{5}, 5));
    }

    @Test
    @DisplayName("P2: findFirst/findLast - Single element array, target not found")
    void testFindFirstLastSingleElementNotFound() {
        assertEquals(-1, binarySearch.findFirst(new int[]{5}, 10));
        assertEquals(-1, binarySearch.findLast(new int[]{5}, 10));
        assertEquals(-1, bruteForce.findFirst(new int[]{5}, 10));
        assertEquals(-1, bruteForce.findLast(new int[]{5}, 10));
    }

    @Test
    @DisplayName("P2: findFirst/findLast - Target with multiple occurrences")
    void testFindFirstLastMultipleOccurrences() {
        int[] nums = {1, 2, 3, 3, 3, 3, 4, 5, 6};
        assertEquals(2, binarySearch.findFirst(nums, 3));
        assertEquals(5, binarySearch.findLast(nums, 3));
        assertEquals(2, bruteForce.findFirst(nums, 3));
        assertEquals(5, bruteForce.findLast(nums, 3));
    }

    @Test
    @DisplayName("P2: findFirst/findLast - Target at beginning, multiple occurrences")
    void testFindFirstLastTargetAtBeginning() {
        int[] nums = {1, 1, 1, 2, 3, 4, 5};
        assertEquals(0, binarySearch.findFirst(nums, 1));
        assertEquals(2, binarySearch.findLast(nums, 1));
        assertEquals(0, bruteForce.findFirst(nums, 1));
        assertEquals(2, bruteForce.findLast(nums, 1));
    }

    @Test
    @DisplayName("P2: findFirst/findLast - Target at end, multiple occurrences")
    void testFindFirstLastTargetAtEnd() {
        int[] nums = {1, 2, 3, 4, 5, 5, 5};
        assertEquals(4, binarySearch.findFirst(nums, 5));
        assertEquals(6, binarySearch.findLast(nums, 5));
        assertEquals(4, bruteForce.findFirst(nums, 5));
        assertEquals(6, bruteForce.findLast(nums, 5));
    }

    @Test
    @DisplayName("P2: findFirst/findLast - Target not present")
    void testFindFirstLastTargetNotFound() {
        int[] nums = {1, 2, 4, 5, 6};
        assertEquals(-1, binarySearch.findFirst(nums, 3));
        assertEquals(-1, binarySearch.findLast(nums, 3));
        assertEquals(-1, bruteForce.findFirst(nums, 3));
        assertEquals(-1, bruteForce.findLast(nums, 3));
    }

    @Test
    @DisplayName("P2: findFirst/findLast - All elements are target")
    void testFindFirstLastAllTarget() {
        int[] nums = {7, 7, 7, 7, 7};
        assertEquals(0, binarySearch.findFirst(nums, 7));
        assertEquals(4, binarySearch.findLast(nums, 7));
        assertEquals(0, bruteForce.findFirst(nums, 7));
        assertEquals(4, bruteForce.findLast(nums, 7));
    }

    @Test
    @DisplayName("P2: findFirst/findLast - Large random sorted array with duplicates")
    void testFindFirstLastLargeRandomArray() {
        int[] nums = ArrayGenerator.generateSortedArrayWithDuplicates(1000, 50);
        // Pick a target likely to have duplicates
        int target = nums[ArrayGenerator.RANDOM.nextInt(1000 / 2) + 100]; // Ensure target is not too small/large
        int bsFirst = binarySearch.findFirst(nums, target);
        int bsLast = binarySearch.findLast(nums, target);
        int bfFirst = bruteForce.findFirst(nums, target);
        int bfLast = bruteForce.findLast(nums, target);

        assertEquals(bfFirst, bsFirst);
        assertEquals(bfLast, bsLast);

        if (bsFirst != -1) {
            assertTrue(bsFirst <= bsLast);
            assertEquals(target, nums[bsFirst]);
            assertEquals(target, nums[bsLast]);
            if (bsFirst > 0) assertTrue(nums[bsFirst - 1] < target);
            if (bsLast < nums.length - 1) assertTrue(nums[bsLast + 1] > target);
        }
    }


    // --- Problem 3: Search in Rotated Sorted Array ---
    @Test
    @DisplayName("P3: searchInRotatedSortedArray - Empty array should return -1")
    void testSearchRotatedEmptyArray() {
        assertEquals(-1, binarySearch.searchInRotatedSortedArray(new int[]{}, 5));
        assertEquals(-1, bruteForce.searchInRotatedSortedArray(new int[]{}, 5));
    }

    @Test
    @DisplayName("P3: searchInRotatedSortedArray - Single element array, target found")
    void testSearchRotatedSingleElementFound() {
        assertEquals(0, binarySearch.searchInRotatedSortedArray(new int[]{5}, 5));
        assertEquals(0, bruteForce.searchInRotatedSortedArray(new int[]{5}, 5));
    }

    @Test
    @DisplayName("P3: searchInRotatedSortedArray - Single element array, target not found")
    void testSearchRotatedSingleElementNotFound() {
        assertEquals(-1, binarySearch.searchInRotatedSortedArray(new int[]{5}, 10));
        assertEquals(-1, bruteForce.searchInRotatedSortedArray(new int[]{5}, 10));
    }

    @Test
    @DisplayName("P3: searchInRotatedSortedArray - Target in left half of rotated array")
    void testSearchRotatedLeftHalf() {
        int[] nums = {4, 5, 6, 7, 0, 1, 2}; // Rotated at 0
        assertEquals(4, binarySearch.searchInRotatedSortedArray(nums, 0));
        assertEquals(4, bruteForce.searchInRotatedSortedArray(nums, 0));
    }

    @Test
    @DisplayName("P3: searchInRotatedSortedArray - Target in right half of rotated array")
    void testSearchRotatedRightHalf() {
        int[] nums = {4, 5, 6, 7, 0, 1, 2}; // Rotated at 0
        assertEquals(2, binarySearch.searchInRotatedSortedArray(nums, 6));
        assertEquals(2, bruteForce.searchInRotatedSortedArray(nums, 6));
    }

    @Test
    @DisplayName("P3: searchInRotatedSortedArray - Target not found")
    void testSearchRotatedNotFound() {
        int[] nums = {4, 5, 6, 7, 0, 1, 2};
        assertEquals(-1, binarySearch.searchInRotatedSortedArray(nums, 3));
        assertEquals(-1, bruteForce.searchInRotatedSortedArray(nums, 3));
    }

    @Test
    @DisplayName("P3: searchInRotatedSortedArray - No rotation")
    void testSearchRotatedNoRotation() {
        int[] nums = {0, 1, 2, 4, 5, 6, 7};
        assertEquals(3, binarySearch.searchInRotatedSortedArray(nums, 4));
        assertEquals(3, bruteForce.searchInRotatedSortedArray(nums, 4));
    }

    @Test
    @DisplayName("P3: searchInRotatedSortedArray - Rotation at first element")
    void testSearchRotatedFirstElement() {
        int[] nums = {1, 2, 3, 4, 5, 0}; // Rotated at 0
        assertEquals(5, binarySearch.searchInRotatedSortedArray(nums, 0));
        assertEquals(5, bruteForce.searchInRotatedSortedArray(nums, 0));
    }

    @Test
    @DisplayName("P3: searchInRotatedSortedArray - Rotation at last element (effectively no rotation if array wraps)")
    void testSearchRotatedLastElement() {
        int[] nums = {2, 3, 4, 5, 0, 1}; // Rotated at 0
        assertEquals(4, binarySearch.searchInRotatedSortedArray(nums, 0));
        assertEquals(4, bruteForce.searchInRotatedSortedArray(nums, 0));
    }

    @Test
    @DisplayName("P3: searchInRotatedSortedArray - Large random rotated array")
    void testSearchRotatedLargeRandomArray() {
        int[] nums = ArrayGenerator.generateRotatedSortedArray(1000);
        int target = nums[ArrayGenerator.RANDOM.nextInt(1000)];
        assertEquals(bruteForce.searchInRotatedSortedArray(nums, target), binarySearch.searchInRotatedSortedArray(nums, target));
    }

    @Test
    @DisplayName("P3: searchInRotatedSortedArray - Large random rotated array, target not found")
    void testSearchRotatedLargeRandomArrayNotFound() {
        int[] nums = ArrayGenerator.generateRotatedSortedArray(1000);
        int target = -10000; // A value highly unlikely to be in the generated array
        assertEquals(bruteForce.searchInRotatedSortedArray(nums, target), binarySearch.searchInRotatedSortedArray(nums, target));
        assertEquals(-1, binarySearch.searchInRotatedSortedArray(nums, target));
    }


    // --- Problem 4: Find Peak Element ---
    @Test
    @DisplayName("P4: findPeakElement - Empty array should return -1")
    void testFindPeakEmptyArray() {
        assertEquals(-1, binarySearch.findPeakElement(new int[]{}));
        assertEquals(-1, bruteForce.findPeakElement(new int[]{}));
    }

    @Test
    @DisplayName("P4: findPeakElement - Single element array")
    void testFindPeakSingleElement() {
        assertEquals(0, binarySearch.findPeakElement(new int[]{1}));
        assertEquals(0, bruteForce.findPeakElement(new int[]{1}));
    }

    @Test
    @DisplayName("P4: findPeakElement - Two elements, increasing")
    void testFindPeakTwoElementsIncreasing() {
        assertEquals(1, binarySearch.findPeakElement(new int[]{1, 2}));
        assertEquals(1, bruteForce.findPeakElement(new int[]{1, 2}));
    }

    @Test
    @DisplayName("P4: findPeakElement - Two elements, decreasing")
    void testFindPeakTwoElementsDecreasing() {
        assertEquals(0, binarySearch.findPeakElement(new int[]{2, 1}));
        assertEquals(0, bruteForce.findPeakElement(new int[]{2, 1}));
    }

    @Test
    @DisplayName("P4: findPeakElement - Peak in middle")
    void testFindPeakMiddle() {
        int[] nums = {1, 2, 1, 3, 5, 6, 4};
        // Binary search could return 1 or 5. Brute force will return the first one found (1 in this case).
        // Since the problem allows any peak, we compare against expected values.
        int peakIdxBs = binarySearch.findPeakElement(nums);
        assertTrue(peakIdxBs == 1 || peakIdxBs == 5);
        assertEquals(1, bruteForce.findPeakElement(nums)); // Brute force will find 2 at index 1 first
    }

    @Test
    @DisplayName("P4: findPeakElement - Peak at beginning")
    void testFindPeakBeginning() {
        int[] nums = {3, 2, 1};
        assertEquals(0, binarySearch.findPeakElement(nums));
        assertEquals(0, bruteForce.findPeakElement(nums));
    }

    @Test
    @DisplayName("P4: findPeakElement - Peak at end")
    void testFindPeakEnd() {
        int[] nums = {1, 2, 3};
        assertEquals(2, binarySearch.findPeakElement(nums));
        assertEquals(2, bruteForce.findPeakElement(nums));
    }

    @Test
    @DisplayName("P4: findPeakElement - Larger array with multiple peaks")
    void testFindPeakMultiplePeaks() {
        int[] nums = {1, 2, 1, 2, 1};
        int peakIdxBs = binarySearch.findPeakElement(nums);
        assertTrue(peakIdxBs == 1 || peakIdxBs == 3);
        assertEquals(1, bruteForce.findPeakElement(nums)); // Brute force will find 2 at index 1 first
    }

    @Test
    @DisplayName("P4: findPeakElement - Large random peak array")
    void testFindPeakLargeRandomArray() {
        int[] nums = ArrayGenerator.generatePeakArray(1000);
        int peakIdx = binarySearch.findPeakElement(nums);
        assertTrue(peakIdx >= 0 && peakIdx < nums.length);

        // Verify that the returned index is indeed a peak
        boolean leftCheck = (peakIdx == 0) || (nums[peakIdx] > nums[peakIdx - 1]);
        boolean rightCheck = (peakIdx == nums.length - 1) || (nums[peakIdx] > nums[peakIdx + 1]);
        assertTrue(leftCheck && rightCheck);

        // Compare with brute force (brute force might return a different valid peak)
        int bfPeakIdx = bruteForce.findPeakElement(nums);
        boolean bfLeftCheck = (bfPeakIdx == 0) || (nums[bfPeakIdx] > nums[bfPeakIdx - 1]);
        boolean bfRightCheck = (bfPeakIdx == nums.length - 1) || (nums[bfPeakIdx] > nums[bfPeakIdx + 1]);
        assertTrue(bfLeftCheck && bfRightCheck);
    }


    // --- Problem 5: Sqrt(x) ---
    @Test
    @DisplayName("P5: mySqrt - Input 0 should return 0")
    void testMySqrtZero() {
        assertEquals(0, binarySearch.mySqrt(0));
        assertEquals(0, bruteForce.mySqrt(0));
    }

    @Test
    @DisplayName("P5: mySqrt - Input 1 should return 1")
    void testMySqrtOne() {
        assertEquals(1, binarySearch.mySqrt(1));
        assertEquals(1, bruteForce.mySqrt(1));
    }

    @Test
    @DisplayName("P5: mySqrt - Perfect square")
    void testMySqrtPerfectSquare() {
        assertEquals(2, binarySearch.mySqrt(4));
        assertEquals(2, bruteForce.mySqrt(4));
        assertEquals(10, binarySearch.mySqrt(100));
        assertEquals(10, bruteForce.mySqrt(100));
        assertEquals(15, binarySearch.mySqrt(225));
        assertEquals(15, bruteForce.mySqrt(225));
    }

    @Test
    @DisplayName("P5: mySqrt - Non-perfect square")
    void testMySqrtNonPerfectSquare() {
        assertEquals(2, binarySearch.mySqrt(8)); // sqrt(8) is 2.82, truncated to 2
        assertEquals(2, bruteForce.mySqrt(8));
        assertEquals(3, binarySearch.mySqrt(9)); // sqrt(9) is 3, perfect square
        assertEquals(3, bruteForce.mySqrt(9));
        assertEquals(3, binarySearch.mySqrt(10)); // sqrt(10) is 3.16, truncated to 3
        assertEquals(3, bruteForce.mySqrt(10));
        assertEquals(46340, binarySearch.mySqrt(2147395600)); // Large value near max int square
        assertEquals(46340, bruteForce.mySqrt(2147395600));
    }

    @Test
    @DisplayName("P5: mySqrt - Max integer value (potential overflow)")
    void testMySqrtMaxInt() {
        // Integer.MAX_VALUE = 2147483647
        // sqrt(2147483647) = 46340.95... truncated to 46340
        assertEquals(46340, binarySearch.mySqrt(Integer.MAX_VALUE));
        assertEquals(46340, bruteForce.mySqrt(Integer.MAX_VALUE));
    }

    @Test
    @DisplayName("P5: mySqrt - Smallest non-zero value greater than 1")
    void testMySqrtTwo() {
        assertEquals(1, binarySearch.mySqrt(2));
        assertEquals(1, bruteForce.mySqrt(2));
    }

    @Test
    @DisplayName("P5: mySqrt - Input negative should throw exception")
    void testMySqrtNegative() {
        assertThrows(IllegalArgumentException.class, () -> binarySearch.mySqrt(-1));
        assertThrows(IllegalArgumentException.class, () -> bruteForce.mySqrt(-5));
    }
}