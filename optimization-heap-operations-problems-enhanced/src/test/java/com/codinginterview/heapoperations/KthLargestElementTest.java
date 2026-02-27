```java
package com.codinginterview.heapoperations;

import com.codinginterview.heapoperations.problems.KthLargestElement;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class KthLargestElementTest {

    private KthLargestElement solver;

    @BeforeEach
    void setUp() {
        solver = new KthLargestElement();
    }

    // --- Test cases for findKthLargestMinHeap (Optimal) ---

    @Test
    @DisplayName("MinHeap: Basic test case 1")
    void testFindKthLargestMinHeapBasic1() {
        int[] nums = {3, 2, 1, 5, 6, 4};
        int k = 2;
        assertEquals(5, solver.findKthLargestMinHeap(nums, k));
    }

    @Test
    @DisplayName("MinHeap: Basic test case 2 with duplicates")
    void testFindKthLargestMinHeapBasic2() {
        int[] nums = {3, 2, 3, 1, 2, 4, 5, 5, 6};
        int k = 4;
        assertEquals(4, solver.findKthLargestMinHeap(nums, k));
    }

    @Test
    @DisplayName("MinHeap: K is 1 (largest element)")
    void testFindKthLargestMinHeapK1() {
        int[] nums = {7, 6, 5, 4, 3, 2, 1};
        int k = 1;
        assertEquals(7, solver.findKthLargestMinHeap(nums, k));
    }

    @Test
    @DisplayName("MinHeap: K is nums.length (smallest element)")
    void testFindKthLargestMinHeapKLength() {
        int[] nums = {7, 6, 5, 4, 3, 2, 1};
        int k = nums.length;
        assertEquals(1, solver.findKthLargestMinHeap(nums, k));
    }

    @Test
    @DisplayName("MinHeap: All elements are same")
    void testFindKthLargestMinHeapAllSame() {
        int[] nums = {5, 5, 5, 5, 5};
        int k = 3;
        assertEquals(5, solver.findKthLargestMinHeap(nums, k));
    }

    @Test
    @DisplayName("MinHeap: Array with negative numbers")
    void testFindKthLargestMinHeapNegativeNumbers() {
        int[] nums = {-1, -5, -2, -3, -4};
        int k = 2;
        assertEquals(-2, solver.findKthLargestMinHeap(nums, k));
    }

    @Test
    @DisplayName("MinHeap: Single element array")
    void testFindKthLargestMinHeapSingleElement() {
        int[] nums = {42};
        int k = 1;
        assertEquals(42, solver.findKthLargestMinHeap(nums, k));
    }

    @Test
    @DisplayName("MinHeap: Empty array (should throw exception from PriorityQueue)")
    void testFindKthLargestMinHeapEmptyArray() {
        int[] nums = {};
        int k = 1;
        // PriorityQueue.peek() on an empty queue returns null, but here we expect an empty nums,
        // so `nums` loop will not run and peek() will be called on empty.
        // It should indeed throw NoSuchElementException.
        assertThrows(java.util.NoSuchElementException.class, () -> solver.findKthLargestMinHeap(nums, k));
    }

    @Test
    @DisplayName("MinHeap: Array with mixed positive and negative numbers")
    void testFindKthLargestMinHeapMixedNumbers() {
        int[] nums = {-5, -2, 0, 1, 5, 8, 10};
        int k = 3;
        assertEquals(5, solver.findKthLargestMinHeap(nums, k));
    }

    @Test
    @DisplayName("MinHeap: Large values")
    void testFindKthLargestMinHeapLargeValues() {
        int[] nums = {10000, 1, 5000, 2, 7500};
        int k = 2;
        assertEquals(7500, solver.findKthLargestMinHeap(nums, k));
    }

    // --- Test cases for findKthLargestCustomMinHeap (Optimal - Custom) ---

    @Test
    @DisplayName("Custom MinHeap: Basic test case 1")
    void testFindKthLargestCustomMinHeapBasic1() {
        int[] nums = {3, 2, 1, 5, 6, 4};
        int k = 2;
        assertEquals(5, solver.findKthLargestCustomMinHeap(nums, k));
    }

    @Test
    @DisplayName("Custom MinHeap: Basic test case 2 with duplicates")
    void testFindKthLargestCustomMinHeapBasic2() {
        int[] nums = {3, 2, 3, 1, 2, 4, 5, 5, 6};
        int k = 4;
        assertEquals(4, solver.findKthLargestCustomMinHeap(nums, k));
    }

    @Test
    @DisplayName("Custom MinHeap: Empty array (should throw exception from CustomMinHeap)")
    void testFindKthLargestCustomMinHeapEmptyArray() {
        int[] nums = {};
        int k = 1;
        assertThrows(java.util.NoSuchElementException.class, () -> solver.findKthLargestCustomMinHeap(nums, k));
    }

    // --- Test cases for findKthLargestMaxHeap (Less Optimal) ---

    @Test
    @DisplayName("MaxHeap: Basic test case 1")
    void testFindKthLargestMaxHeapBasic1() {
        int[] nums = {3, 2, 1, 5, 6, 4};
        int k = 2;
        assertEquals(5, solver.findKthLargestMaxHeap(nums, k));
    }

    @Test
    @DisplayName("MaxHeap: Basic test case 2 with duplicates")
    void testFindKthLargestMaxHeapBasic2() {
        int[] nums = {3, 2, 3, 1, 2, 4, 5, 5, 6};
        int k = 4;
        assertEquals(4, solver.findKthLargestMaxHeap(nums, k));
    }

    @Test
    @DisplayName("MaxHeap: Empty array (should throw exception from PriorityQueue)")
    void testFindKthLargestMaxHeapEmptyArray() {
        int[] nums = {};
        int k = 1;
        assertThrows(java.util.NoSuchElementException.class, () -> solver.findKthLargestMaxHeap(nums, k));
    }


    // --- Test cases for findKthLargestSorting (Brute Force/Comparison) ---

    @Test
    @DisplayName("Sorting: Basic test case 1")
    void testFindKthLargestSortingBasic1() {
        int[] nums = {3, 2, 1, 5, 6, 4};
        int k = 2;
        assertEquals(5, solver.findKthLargestSorting(nums, k));
    }

    @Test
    @DisplayName("Sorting: Basic test case 2 with duplicates")
    void testFindKthLargestSortingBasic2() {
        int[] nums = {3, 2, 3, 1, 2, 4, 5, 5, 6};
        int k = 4;
        assertEquals(4, solver.findKthLargestSorting(nums, k));
    }

    @Test
    @DisplayName("Sorting: Empty array (should throw ArrayIndexOutOfBoundsException)")
    void testFindKthLargestSortingEmptyArray() {
        int[] nums = {};
        int k = 1;
        assertThrows(ArrayIndexOutOfBoundsException.class, () -> solver.findKthLargestSorting(nums, k));
    }
}
```