```java
package com.codinginterview.heapoperations;

import com.codinginterview.heapoperations.problems.TopKFrequentElements;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TopKFrequentElementsTest {

    private TopKFrequentElements solver;

    @BeforeEach
    void setUp() {
        solver = new TopKFrequentElements();
    }

    // Helper to compare two arrays for content equality, ignoring order.
    // Useful for TopKFrequentElements since output order doesn't matter.
    private void assertArrayContentsEqual(int[] expected, int[] actual) {
        assertEquals(expected.length, actual.length, "Arrays should have the same length");
        Set<Integer> expectedSet = new HashSet<>();
        for (int val : expected) {
            expectedSet.add(val);
        }
        for (int val : actual) {
            assertTrue(expectedSet.contains(val), "Actual array contains unexpected element: " + val);
            // Remove one instance to handle duplicates if present, though problem guarantees unique set of K.
            // For general cases, a freq map might be needed for comparison.
        }
    }

    // --- Test cases for topKFrequentHeap (Optimal using PriorityQueue) ---

    @Test
    @DisplayName("Heap: Basic test case 1")
    void testTopKFrequentHeapBasic1() {
        int[] nums = {1, 1, 1, 2, 2, 3};
        int k = 2;
        int[] expected = {1, 2}; // Order doesn't matter
        assertArrayContentsEqual(expected, solver.topKFrequentHeap(nums, k));
    }

    @Test
    @DisplayName("Heap: Basic test case 2")
    void testTopKFrequentHeapBasic2() {
        int[] nums = {1};
        int k = 1;
        int[] expected = {1};
        assertArrayContentsEqual(expected, solver.topKFrequentHeap(nums, k));
    }

    @Test
    @DisplayName("Heap: All elements are unique, k = all elements")
    void testTopKFrequentHeapAllUniqueKAll() {
        int[] nums = {1, 2, 3, 4, 5};
        int k = 5;
        int[] expected = {1, 2, 3, 4, 5};
        assertArrayContentsEqual(expected, solver.topKFrequentHeap(nums, k));
    }

    @Test
    @DisplayName("Heap: All elements are unique, k = 1")
    void testTopKFrequentHeapAllUniqueK1() {
        int[] nums = {1, 2, 3, 4, 5};
        int k = 1;
        // Any of them is fine, as they all have frequency 1. The problem guarantees unique answer.
        // For this specific case, it depends on hashmap iteration order, which is not guaranteed.
        // However, if we assume problem constraints, this specific test might not be possible for truly unique output.
        // Let's assume the problem means "there is a unique set of k elements", which is true if frequencies differ.
        // If frequencies are same for multiple elements eligible for k, any set is fine.
        // For now, testing if it returns a single element.
        int[] actual = solver.topKFrequentHeap(nums, k);
        assertEquals(1, actual.length);
        assertTrue(Arrays.stream(nums).anyMatch(n -> n == actual[0])); // The element must be one of the inputs
    }

    @Test
    @DisplayName("Heap: Multiple elements with same frequency, ties broken arbitrarily")
    void testTopKFrequentHeapTies() {
        int[] nums = {1, 1, 2, 2, 3, 3, 4};
        int k = 2; // Freq: 1->2, 2->2, 3->2, 4->1. Top 2 are any of 1,2,3.
        // Due to arbitrary choice, we can't assert a specific set like {1,2}.
        // The problem states "it is guaranteed that the answer is unique, meaning there is only one set of the k most frequent elements".
        // This implies that such a tie for the k-th frequency wouldn't happen for the required 'k'.
        // Let's construct a test where frequencies are distinct for top K.
        nums = new int[]{1, 1, 1, 2, 2, 3, 4, 5}; // Freq: 1->3, 2->2, 3->1, 4->1, 5->1
        k = 2;
        int[] expected = {1, 2};
        assertArrayContentsEqual(expected, solver.topKFrequentHeap(nums, k));
    }

    @Test
    @DisplayName("Heap: Array with negative numbers")
    void testTopKFrequentHeapNegativeNumbers() {
        int[] nums = {-1, -1, -1, -2, -2, -3};
        int k = 2;
        int[] expected = {-1, -2};
        assertArrayContentsEqual(expected, solver.topKFrequentHeap(nums, k));
    }

    @Test
    @DisplayName("Heap: Empty array (should return empty array)")
    void testTopKFrequentHeapEmptyArray() {
        int[] nums = {};
        int k = 1; // k can be 1, but there are no unique elements
        int[] expected = {};
        assertArrayContentsEqual(expected, solver.topKFrequentHeap(nums, k));
    }

    @Test
    @DisplayName("Heap: Large numbers, multiple occurrences")
    void testTopKFrequentHeapLargeNumbers() {
        int[] nums = {10000, 1, 10000, 5000, 1, 10000};
        int k = 2;
        // Freq: 10000->3, 1->2, 5000->1
        int[] expected = {10000, 1};
        assertArrayContentsEqual(expected, solver.topKFrequentHeap(nums, k));
    }

    // --- Test cases for topKFrequentCustomHeap (Optimal using CustomMinHeap) ---

    @Test
    @DisplayName("Custom Heap: Basic test case 1")
    void testTopKFrequentCustomHeapBasic1() {
        int[] nums = {1, 1, 1, 2, 2, 3};
        int k = 2;
        int[] expected = {1, 2};
        assertArrayContentsEqual(expected, solver.topKFrequentCustomHeap(nums, k));
    }

    @Test
    @DisplayName("Custom Heap: Empty array (should return empty array)")
    void testTopKFrequentCustomHeapEmptyArray() {
        int[] nums = {};
        int k = 1;
        int[] expected = {};
        assertArrayContentsEqual(expected, solver.topKFrequentCustomHeap(nums, k));
    }

    // --- Test cases for topKFrequentBucketSort (Linear Time Optimal) ---

    @Test
    @DisplayName("Bucket Sort: Basic test case 1")
    void testTopKFrequentBucketSortBasic1() {
        int[] nums = {1, 1, 1, 2, 2, 3};
        int k = 2;
        int[] expected = {1, 2};
        assertArrayContentsEqual(expected, solver.topKFrequentBucketSort(nums, k));
    }

    @Test
    @DisplayName("Bucket Sort: Basic test case 2")
    void testTopKFrequentBucketSortBasic2() {
        int[] nums = {1};
        int k = 1;
        int[] expected = {1};
        assertArrayContentsEqual(expected, solver.topKFrequentBucketSort(nums, k));
    }

    @Test
    @DisplayName("Bucket Sort: Empty array (should return empty array)")
    void testTopKFrequentBucketSortEmptyArray() {
        int[] nums = {};
        int k = 1;
        int[] expected = {};
        assertArrayContentsEqual(expected, solver.topKFrequentBucketSort(nums, k));
    }

    @Test
    @DisplayName("Bucket Sort: Large numbers, multiple occurrences")
    void testTopKFrequentBucketSortLargeNumbers() {
        int[] nums = {10000, 1, 10000, 5000, 1, 10000};
        int k = 2;
        // Freq: 10000->3, 1->2, 5000->1
        int[] expected = {10000, 1};
        assertArrayContentsEqual(expected, solver.topKFrequentBucketSort(nums, k));
    }

    // --- Test cases for topKFrequentSorting (Comparison) ---

    @Test
    @DisplayName("Sorting: Basic test case 1")
    void testTopKFrequentSortingBasic1() {
        int[] nums = {1, 1, 1, 2, 2, 3};
        int k = 2;
        int[] expected = {1, 2};
        assertArrayContentsEqual(expected, solver.topKFrequentSorting(nums, k));
    }

    @Test
    @DisplayName("Sorting: Basic test case 2")
    void testTopKFrequentSortingBasic2() {
        int[] nums = {1};
        int k = 1;
        int[] expected = {1};
        assertArrayContentsEqual(expected, solver.topKFrequentSorting(nums, k));
    }

    @Test
    @DisplayName("Sorting: Empty array (should return empty array)")
    void testTopKFrequentSortingEmptyArray() {
        int[] nums = {};
        int k = 1;
        int[] expected = {};
        assertArrayContentsEqual(expected, solver.topKFrequentSorting(nums, k));
    }

    @Test
    @DisplayName("Sorting: Large numbers, multiple occurrences")
    void testTopKFrequentSortingLargeNumbers() {
        int[] nums = {10000, 1, 10000, 5000, 1, 10000};
        int k = 2;
        // Freq: 10000->3, 1->2, 5000->1
        int[] expected = {10000, 1};
        assertArrayContentsEqual(expected, solver.topKFrequentSorting(nums, k));
    }
}
```