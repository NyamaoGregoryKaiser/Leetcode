```java
package com.heapinterview.heapinterview;

import com.heapinterview.algorithms.HeapProblems;
import com.heapinterview.algorithms.HeapProblems.MergeKSortedLists.ListNode;
import com.heapinterview.utils.PerformanceBenchmarker;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Heap Problems Tests")
class HeapProblemsTest {

    @Nested
    @DisplayName("Kth Smallest Element in an Unsorted Array")
    class KthSmallestElementTests {

        private final HeapProblems.KthSmallestElement solver = new HeapProblems.KthSmallestElement();

        private static Stream<Arguments> provideKthSmallestTestData() {
            return Stream.of(
                    // General cases
                    Arguments.of(new int[]{3, 2, 1, 5, 6, 4}, 2, 2),
                    Arguments.of(new int[]{3, 2, 3, 1, 2, 4, 5, 5, 6}, 4, 3),
                    Arguments.of(new int[]{1}, 1, 1),
                    Arguments.of(new int[]{7, 6, 5, 4, 3, 2, 1}, 1, 1),
                    Arguments.of(new int[]{7, 6, 5, 4, 3, 2, 1}, 7, 7),
                    Arguments.of(new int[]{10, 20, 15, 25, 30}, 3, 20),
                    Arguments.of(new int[]{1, 2, 3, 4, 5}, 3, 3),
                    // With duplicates
                    Arguments.of(new int[]{1, 1, 2, 2, 3, 3}, 3, 2),
                    Arguments.of(new int[]{10, 5, 10, 5, 10, 5}, 1, 5),
                    Arguments.of(new int[]{10, 5, 10, 5, 10, 5}, 4, 10)
            );
        }

        @ParameterizedTest(name = "Array: {0}, k: {1} -> Expected: {2}")
        @MethodSource("provideKthSmallestTestData")
        void testFindKthSmallestMaxHeap(int[] nums, int k, int expected) {
            assertEquals(expected, solver.findKthSmallestMaxHeap(Arrays.copyOf(nums, nums.length), k), "Max-Heap solution failed");
        }

        @ParameterizedTest(name = "Array: {0}, k: {1} -> Expected: {2}")
        @MethodSource("provideKthSmallestTestData")
        void testFindKthSmallestMinHeap(int[] nums, int k, int expected) {
            assertEquals(expected, solver.findKthSmallestMinHeap(Arrays.copyOf(nums, nums.length), k), "Min-Heap solution failed");
        }

        @ParameterizedTest(name = "Array: {0}, k: {1} -> Expected: {2}")
        @MethodSource("provideKthSmallestTestData")
        void testFindKthSmallestSorting(int[] nums, int k, int expected) {
            assertEquals(expected, solver.findKthSmallestSorting(Arrays.copyOf(nums, nums.length), k), "Sorting solution failed");
        }

        @Test
        @DisplayName("Max-Heap: should throw IllegalArgumentException for invalid k")
        void testFindKthSmallestMaxHeapInvalidK() {
            int[] nums = {1, 2, 3};
            assertThrows(IllegalArgumentException.class, () -> solver.findKthSmallestMaxHeap(nums, 0));
            assertThrows(IllegalArgumentException.class, () -> solver.findKthSmallestMaxHeap(nums, 4));
            assertThrows(IllegalArgumentException.class, () -> solver.findKthSmallestMaxHeap(new int[]{}, 1));
            assertThrows(IllegalArgumentException.class, () -> solver.findKthSmallestMaxHeap(null, 1));
        }

        @Test
        @DisplayName("Performance comparison for KthSmallestElement")
        void testKthSmallestPerformance() {
            int[] largeArray = new int[100000];
            Random random = new Random();
            for (int i = 0; i < largeArray.length; i++) {
                largeArray[i] = random.nextInt(1000000);
            }
            int k = 1000; // Small k
            int kLarge = 99000; // Large k

            System.out.println("\nPerformance Test for Kth Smallest Element (N=" + largeArray.length + ", k=" + k + ")");

            PerformanceBenchmarker.Pair<Long, Integer> maxHeapResult = PerformanceBenchmarker.measureTimeWithResult("Max-Heap (small k)", () ->
                    solver.findKthSmallestMaxHeap(Arrays.copyOf(largeArray, largeArray.length), k)
            );

            PerformanceBenchmarker.Pair<Long, Integer> minHeapResult = PerformanceBenchmarker.measureTimeWithResult("Min-Heap (small k)", () ->
                    solver.findKthSmallestMinHeap(Arrays.copyOf(largeArray, largeArray.length), k)
            );

            PerformanceBenchmarker.Pair<Long, Integer> sortingResult = PerformanceBenchmarker.measureTimeWithResult("Sorting (small k)", () ->
                    solver.findKthSmallestSorting(Arrays.copyOf(largeArray, largeArray.length), k)
            );

            assertEquals(maxHeapResult.getValue(), minHeapResult.getValue());
            assertEquals(maxHeapResult.getValue(), sortingResult.getValue());

            // Test with large k
            System.out.println("\nPerformance Test for Kth Smallest Element (N=" + largeArray.length + ", k=" + kLarge + ")");
            PerformanceBenchmarker.Pair<Long, Integer> maxHeapResultLargeK = PerformanceBenchmarker.measureTimeWithResult("Max-Heap (large k)", () ->
                    solver.findKthSmallestMaxHeap(Arrays.copyOf(largeArray, largeArray.length), kLarge)
            );
            PerformanceBenchmarker.Pair<Long, Integer> minHeapResultLargeK = PerformanceBenchmarker.measureTimeWithResult("Min-Heap (large k)", () ->
                    solver.findKthSmallestMinHeap(Arrays.copyOf(largeArray, largeArray.length), kLarge)
            );
            PerformanceBenchmarker.Pair<Long, Integer> sortingResultLargeK = PerformanceBenchmarker.measureTimeWithResult("Sorting (large k)", () ->
                    solver.findKthSmallestSorting(Arrays.copyOf(largeArray, largeArray.length), kLarge)
            );

            assertEquals(maxHeapResultLargeK.getValue(), minHeapResultLargeK.getValue());
            assertEquals(maxHeapResultLargeK.getValue(), sortingResultLargeK.getValue());
        }
    }

    @Nested
    @DisplayName("Find Median from Data Stream")
    class MedianFinderTests {

        @Test
        @DisplayName("should correctly find median for various inputs")
        void testFindMedian() {
            HeapProblems.MedianFinder mf = new HeapProblems.MedianFinder();

            mf.addNum(1);
            assertEquals(1.0, mf.findMedian(), 1e-5); // [1]

            mf.addNum(2);
            assertEquals(1.5, mf.findMedian(), 1e-5); // [1, 2]

            mf.addNum(3);
            assertEquals(2.0, mf.findMedian(), 1e-5); // [1, 2, 3]

            mf.addNum(4);
            assertEquals(2.5, mf.findMedian(), 1e-5); // [1, 2, 3, 4]

            mf.addNum(5);
            assertEquals(3.0, mf.findMedian(), 1e-5); // [1, 2, 3, 4, 5]

            mf.addNum(0);
            assertEquals(2.5, mf.findMedian(), 1e-5); // [0, 1, 2, 3, 4, 5]

            mf.addNum(100);
            assertEquals(3.0, mf.findMedian(), 1e-5); // [0, 1, 2, 3, 4, 5, 100]

            mf.addNum(-50);
            assertEquals(2.5, mf.findMedian(), 1e-5); // [-50, 0, 1, 2, 3, 4, 5, 100]
        }

        @Test
        @DisplayName("should handle empty state gracefully")
        void testEmptyMedianFinder() {
            HeapProblems.MedianFinder mf = new HeapProblems.MedianFinder();
            assertThrows(IllegalStateException.class, mf::findMedian);
        }

        @Test
        @DisplayName("should handle single element")
        void testSingleElement() {
            HeapProblems.MedianFinder mf = new HeapProblems.MedianFinder();
            mf.addNum(7);
            assertEquals(7.0, mf.findMedian(), 1e-5);
        }

        @Test
        @DisplayName("should handle large number of elements")
        void testLargeNumberOfElements() {
            HeapProblems.MedianFinder mf = new HeapProblems.MedianFinder();
            List<Integer> numbers = new ArrayList<>();
            Random random = new Random();
            int count = 10000;

            for (int i = 0; i < count; i++) {
                int num = random.nextInt(100000);
                mf.addNum(num);
                numbers.add(num);
                Collections.sort(numbers);

                double expectedMedian;
                if ((i + 1) % 2 == 1) { // Odd count
                    expectedMedian = numbers.get(i / 2);
                } else { // Even count
                    expectedMedian = (numbers.get(i / 2) + numbers.get(i / 2 - 1)) / 2.0;
                }
                assertEquals(expectedMedian, mf.findMedian(), 1e-5, "Median mismatch at count: " + (i + 1) + ", num: " + num);
            }
        }

        @Test
        @DisplayName("Performance comparison for MedianFinder")
        void testMedianFinderPerformance() {
            int numOperations = 100000;
            Random random = new Random();

            System.out.println("\nPerformance Test for MedianFinder (addNum operations: " + numOperations + ")");

            PerformanceBenchmarker.measureTime("Heap-based MedianFinder", () -> {
                HeapProblems.MedianFinder mf = new HeapProblems.MedianFinder();
                for (int i = 0; i < numOperations; i++) {
                    mf.addNum(random.nextInt(1000000));
                    if (i % 1000 == 0) { // Call findMedian periodically
                        mf.findMedian();
                    }
                }
                mf.findMedian(); // Final call
            });
        }
    }

    @Nested
    @DisplayName("Merge K Sorted Lists")
    class MergeKSortedListsTests {

        private final HeapProblems.MergeKSortedLists solver = new HeapProblems.MergeKSortedLists();

        private static Stream<Arguments> provideMergeKSortedListsTestData() {
            return Stream.of(
                    Arguments.of(
                            new ListNode[]{
                                    ListNode.fromArray(new int[]{1, 4, 5}),
                                    ListNode.fromArray(new int[]{1, 3, 4}),
                                    ListNode.fromArray(new int[]{2, 6})
                            },
                            Arrays.asList(1, 1, 2, 3, 4, 4, 5, 6)
                    ),
                    Arguments.of(
                            new ListNode[]{},
                            Collections.emptyList()
                    ),
                    Arguments.of(
                            new ListNode[]{null},
                            Collections.emptyList()
                    ),
                    Arguments.of(
                            new ListNode[]{null, ListNode.fromArray(new int[]{1})},
                            Arrays.asList(1)
                    ),
                    Arguments.of(
                            new ListNode[]{ListNode.fromArray(new int[]{}), ListNode.fromArray(new int[]{1})},
                            Arrays.asList(1)
                    ),
                    Arguments.of(
                            new ListNode[]{ListNode.fromArray(new int[]{10, 20}), ListNode.fromArray(new int[]{5, 15}), ListNode.fromArray(new int[]{30})},
                            Arrays.asList(5, 10, 15, 20, 30)
                    )
            );
        }

        @ParameterizedTest(name = "Lists: {0} -> Expected: {1}")
        @MethodSource("provideMergeKSortedListsTestData")
        void testMergeKListsHeap(ListNode[] lists, List<Integer> expected) {
            ListNode merged = solver.mergeKLists(lists);
            assertEquals(expected, ListNode.toList(merged), "Min-Heap solution failed");
        }

        @ParameterizedTest(name = "Lists: {0} -> Expected: {1}")
        @MethodSource("provideMergeKSortedListsTestData")
        void testMergeKListsNaive(ListNode[] lists, List<Integer> expected) {
            // Create deep copies of lists for each test to avoid modification issues
            ListNode[] copiedLists = Arrays.stream(lists)
                    .map(list -> list == null ? null : ListNode.fromArray(ListNode.toList(list).stream().mapToInt(i->i).toArray()))
                    .toArray(ListNode[]::new);
            ListNode merged = solver.mergeKListsNaive(copiedLists);
            assertEquals(expected, ListNode.toList(merged), "Naive merge solution failed");
        }

        @ParameterizedTest(name = "Lists: {0} -> Expected: {1}")
        @MethodSource("provideMergeKSortedListsTestData")
        void testMergeKListsDivideAndConquer(ListNode[] lists, List<Integer> expected) {
            ListNode[] copiedLists = Arrays.stream(lists)
                    .map(list -> list == null ? null : ListNode.fromArray(ListNode.toList(list).stream().mapToInt(i->i).toArray()))
                    .toArray(ListNode[]::new);
            ListNode merged = solver.mergeKListsDivideAndConquer(copiedLists);
            assertEquals(expected, ListNode.toList(merged), "Divide and Conquer solution failed");
        }

        @Test
        @DisplayName("Performance comparison for MergeKSortedLists")
        void testMergeKListsPerformance() {
            int numLists = 1000;
            int nodesPerList = 100;
            ListNode[] lists = new ListNode[numLists];
            Random random = new Random();

            for (int i = 0; i < numLists; i++) {
                int[] arr = new int[nodesPerList];
                int currentVal = 0;
                for (int j = 0; j < nodesPerList; j++) {
                    currentVal += random.nextInt(10) + 1; // Ensure sorted and positive
                    arr[j] = currentVal;
                }
                lists[i] = ListNode.fromArray(arr);
            }

            System.out.println("\nPerformance Test for Merge K Sorted Lists (K=" + numLists + ", Avg N=" + nodesPerList + ")");

            // Create deep copy for each benchmark run
            ListNode[] listsForHeap = Arrays.stream(lists)
                    .map(list -> ListNode.fromArray(ListNode.toList(list).stream().mapToInt(Integer::intValue).toArray()))
                    .toArray(ListNode[]::new);
            PerformanceBenchmarker.measureTime("Min-Heap Solution", () -> solver.mergeKLists(listsForHeap));

            // Naive approach can be very slow for large K, comment out if it takes too long
            // ListNode[] listsForNaive = Arrays.stream(lists)
            //         .map(list -> ListNode.fromArray(ListNode.toList(list).stream().mapToInt(Integer::intValue).toArray()))
            //         .toArray(ListNode[]::new);
            // PerformanceBenchmarker.measureTime("Naive Merge Solution", () -> solver.mergeKListsNaive(listsForNaive));

            ListNode[] listsForDivideConquer = Arrays.stream(lists)
                    .map(list -> ListNode.fromArray(ListNode.toList(list).stream().mapToInt(Integer::intValue).toArray()))
                    .toArray(ListNode[]::new);
            PerformanceBenchmarker.measureTime("Divide and Conquer Solution", () -> solver.mergeKListsDivideAndConquer(listsForDivideConquer));
        }
    }

    @Nested
    @DisplayName("Top K Frequent Elements")
    class TopKFrequentElementsTests {

        private final HeapProblems.TopKFrequentElements solver = new HeapProblems.TopKFrequentElements();

        private static Stream<Arguments> provideTopKFrequentTestData() {
            return Stream.of(
                    Arguments.of(new int[]{1, 1, 1, 2, 2, 3}, 2, new int[]{1, 2}),
                    Arguments.of(new int[]{1}, 1, new int[]{1}),
                    Arguments.of(new int[]{1, 2}, 2, new int[]{1, 2}),
                    Arguments.of(new int[]{1, 1, 1, 2, 2, 3, 3, 3, 3}, 1, new int[]{3}),
                    Arguments.of(new int[]{10, 20, 10, 30, 20, 10, 40}, 2, new int[]{10, 20}), // Order can vary, needs to be handled
                    Arguments.of(new int[]{5, 5, 5, 1, 1, 2, 2, 3}, 3, new int[]{5, 1, 2}),
                    Arguments.of(new int[]{-1, -1, 0, 0, 1, 1, 1}, 2, new int[]{1, -1})
            );
        }

        // Helper to check if two arrays contain the same elements, regardless of order
        private void assertArraysContainSameElements(int[] expected, int[] actual) {
            Arrays.sort(expected);
            Arrays.sort(actual);
            assertArrayEquals(expected, actual);
        }

        @ParameterizedTest(name = "Nums: {0}, k: {1} -> Expected: {2}")
        @MethodSource("provideTopKFrequentTestData")
        void testTopKFrequentMinHeap(int[] nums, int k, int[] expected) {
            int[] result = solver.topKFrequentMinHeap(nums, k);
            assertArraysContainSameElements(expected, result);
        }

        @ParameterizedTest(name = "Nums: {0}, k: {1} -> Expected: {2}")
        @MethodSource("provideTopKFrequentTestData")
        void testTopKFrequentMaxHeap(int[] nums, int k, int[] expected) {
            int[] result = solver.topKFrequentMaxHeap(nums, k);
            assertArraysContainSameElements(expected, result);
        }

        @ParameterizedTest(name = "Nums: {0}, k: {1} -> Expected: {2}")
        @MethodSource("provideTopKFrequentTestData")
        void testTopKFrequentBucketSort(int[] nums, int k, int[] expected) {
            int[] result = solver.topKFrequentBucketSort(nums, k);
            assertArraysContainSameElements(expected, result);
        }

        @Test
        @DisplayName("should throw IllegalArgumentException for invalid inputs")
        void testTopKFrequentInvalidInputs() {
            int[] nums = {1, 2, 3};
            assertThrows(IllegalArgumentException.class, () -> solver.topKFrequentMinHeap(nums, 0));
            assertThrows(IllegalArgumentException.class, () -> solver.topKFrequentMinHeap(new int[]{}, 1));
            assertThrows(IllegalArgumentException.class, () -> solver.topKFrequentMinHeap(null, 1));
            // k > nums.length is handled by returning all unique elements, not an exception
            assertArraysContainSameElements(new int[]{1,2,3}, solver.topKFrequentMinHeap(nums, 5));
        }

        @Test
        @DisplayName("Performance comparison for Top K Frequent Elements")
        void testTopKFrequentPerformance() {
            int arraySize = 1000000;
            int numRange = 10000; // numbers between 0 and numRange-1
            int k = 100;
            int[] largeArray = new int[arraySize];
            Random random = new Random();

            for (int i = 0; i < arraySize; i++) {
                largeArray[i] = random.nextInt(numRange);
            }

            System.out.println("\nPerformance Test for Top K Frequent Elements (N=" + arraySize + ", K=" + k + ", NumRange=" + numRange + ")");

            PerformanceBenchmarker.measureTime("Min-Heap Solution", () -> solver.topKFrequentMinHeap(Arrays.copyOf(largeArray, largeArray.length), k));
            PerformanceBenchmarker.measureTime("Max-Heap Solution", () -> solver.topKFrequentMaxHeap(Arrays.copyOf(largeArray, largeArray.length), k));
            PerformanceBenchmarker.measureTime("Bucket Sort Solution", () -> solver.topKFrequentBucketSort(Arrays.copyOf(largeArray, largeArray.length), k));
        }
    }
}
```