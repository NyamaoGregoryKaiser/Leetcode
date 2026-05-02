```java
package com.heapinterview.algorithms;

import java.util.*;
import java.util.stream.Collectors;

/**
 * HeapProblems: Contains solutions to various coding interview problems
 * that can be optimally solved using Heap (Priority Queue) data structures.
 */
public class HeapProblems {

    /**
     * Problem 1: Kth Smallest Element in an Unsorted Array
     * Given an unsorted array of numbers, find the Kth smallest number in it.
     * Note: This is the Kth smallest number in the sorted order, not the Kth distinct element.
     */
    public static class KthSmallestElement {

        /**
         * Optimal Approach: Using a Max-Heap (PriorityQueue in Java)
         * Maintain a max-heap of size K. Iterate through the array:
         * If the heap size is less than K, add the element.
         * If the heap size is K, and the current element is smaller than the heap's top (largest element),
         * remove the top and add the current element.
         * The top of the heap at the end will be the Kth smallest element.
         *
         * Time Complexity: O(N log K)
         * - N for iterating through the array.
         * - log K for each heap operation (insertion or removal) on a heap of size K.
         * Space Complexity: O(K) for storing K elements in the heap.
         *
         * @param nums The input array of integers.
         * @param k The desired Kth smallest element.
         * @return The Kth smallest element.
         * @throws IllegalArgumentException if k is out of bounds.
         */
        public int findKthSmallestMaxHeap(int[] nums, int k) {
            if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
                throw new IllegalArgumentException("Invalid input: nums array is empty or k is out of bounds.");
            }

            // Create a Max-Heap. In Java, PriorityQueue is a Min-Heap by default.
            // To make it a Max-Heap, use Collections.reverseOrder() or a custom comparator.
            PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

            for (int num : nums) {
                maxHeap.offer(num); // Add element
                if (maxHeap.size() > k) {
                    maxHeap.poll(); // If heap size exceeds k, remove the largest element
                }
            }

            // The root of the max-heap (which is the smallest of the largest k elements)
            // will be the Kth smallest overall.
            return maxHeap.peek();
        }

        /**
         * Alternative Approach 1: Using a Min-Heap (add all, then poll K times)
         * Add all elements to a min-heap. Then poll K times. The Kth polled element
         * will be the Kth smallest.
         *
         * Time Complexity: O(N + K log N)
         * - O(N) to build the heap (or N * log N if inserted one by one without heapify optimization).
         * - O(K log N) for polling K elements.
         * Space Complexity: O(N) for storing all elements in the heap.
         *
         * @param nums The input array of integers.
         * @param k The desired Kth smallest element.
         * @return The Kth smallest element.
         * @throws IllegalArgumentException if k is out of bounds.
         */
        public int findKthSmallestMinHeap(int[] nums, int k) {
            if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
                throw new IllegalArgumentException("Invalid input: nums array is empty or k is out of bounds.");
            }

            PriorityQueue<Integer> minHeap = new PriorityQueue<>();
            for (int num : nums) {
                minHeap.offer(num);
            }

            int kthSmallest = -1;
            for (int i = 0; i < k; i++) {
                kthSmallest = minHeap.poll();
            }
            return kthSmallest;
        }

        /**
         * Alternative Approach 2: Sorting (Brute-force/Simple)
         * Sort the entire array and then return the element at index k-1.
         *
         * Time Complexity: O(N log N) due to sorting.
         * Space Complexity: O(1) or O(N) depending on sorting algorithm implementation.
         *
         * @param nums The input array of integers.
         * @param k The desired Kth smallest element.
         * @return The Kth smallest element.
         * @throws IllegalArgumentException if k is out of bounds.
         */
        public int findKthSmallestSorting(int[] nums, int k) {
            if (nums == null || nums.length == 0 || k <= 0 || k > nums.length) {
                throw new IllegalArgumentException("Invalid input: nums array is empty or k is out of bounds.");
            }

            Arrays.sort(nums); // Sorts in ascending order
            return nums[k - 1]; // Kth smallest is at index k-1
        }
    }


    /**
     * Problem 2: Find Median from Data Stream
     * The median is the middle value in an ordered integer list. If the size of the list is even,
     * there is no single middle value, and the median is the average of the two middle values.
     * Implement the `MedianFinder` class:
     * - `MedianFinder()` initializes the `MedianFinder` object.
     * - `void addNum(int num)` adds an integer `num` from the data stream to the data structure.
     * - `double findMedian()` returns the median of all elements so far. Answers within 10^-5 of the actual answer will be accepted.
     */
    public static class MedianFinder {

        // Max-heap to store the smaller half of the numbers.
        // Elements in `small` are <= elements in `large`.
        private PriorityQueue<Integer> small;
        // Min-heap to store the larger half of the numbers.
        // Elements in `large` are >= elements in `small`.
        private PriorityQueue<Integer> large;

        /**
         * Initializes the MedianFinder object.
         * Time Complexity: O(1)
         * Space Complexity: O(1)
         */
        public MedianFinder() {
            // Max-heap for the lower half. Top element is the largest in the lower half.
            small = new PriorityQueue<>(Collections.reverseOrder());
            // Min-heap for the upper half. Top element is the smallest in the upper half.
            large = new PriorityQueue<>();
        }

        /**
         * Adds an integer num from the data stream.
         * The goal is to keep the sizes of `small` and `large` balanced:
         * `small.size()` should be equal to `large.size()` or `small.size() = large.size() + 1`.
         * This ensures `small` always has the potential median (or one of the two for even count).
         *
         * Time Complexity: O(log N) where N is the total number of elements added so far.
         * - Each `offer` or `poll` operation on a heap takes O(log M) where M is the heap size.
         * - Since M is roughly N/2, it's O(log (N/2)) which is O(log N).
         * Space Complexity: O(1) per operation (O(N) total for storing all numbers).
         *
         * @param num The integer to add.
         */
        public void addNum(int num) {
            // 1. Add new number to `small` (max-heap) first.
            // This ensures `small` always contains numbers <= numbers in `large` if `large` is not empty.
            small.offer(num);

            // 2. Ensure the largest element in `small` is not greater than the smallest in `large`.
            // If `small`'s top is > `large`'s top (and `large` is not empty),
            // move `small`'s top to `large`.
            if (!small.isEmpty() && !large.isEmpty() && small.peek() > large.peek()) {
                large.offer(small.poll());
            }

            // 3. Balance the heap sizes: `small` should have `large.size()` or `large.size() + 1` elements.
            // If `small` gets too small (e.g., `large` has more elements), move from `large` to `small`.
            if (small.size() < large.size()) {
                small.offer(large.poll());
            }
            // If `small` gets too large (e.g., `small` has 2 more elements than `large`), move from `small` to `large`.
            else if (small.size() > large.size() + 1) {
                large.offer(small.poll());
            }
        }

        /**
         * Returns the median of all elements so far.
         * If total count is odd, median is the top of `small` (larger half).
         * If total count is even, median is average of `small`'s top and `large`'s top.
         *
         * Time Complexity: O(1) for `peek` operations.
         * Space Complexity: O(1)
         *
         * @return The current median.
         */
        public double findMedian() {
            if (small.isEmpty()) {
                throw new IllegalStateException("No numbers added yet.");
            }

            if (small.size() == large.size()) {
                // Even number of elements, median is average of tops
                return (small.peek() + large.peek()) / 2.0;
            } else {
                // Odd number of elements, median is top of `small`
                return small.peek();
            }
        }

        // Alternative approach for MedianFinder is to maintain a sorted list (e.g., ArrayList)
        // addNum: O(N) to insert and maintain sorted order
        // findMedian: O(1)
        // Overall, two-heap is more efficient for frequent `addNum` operations.
    }


    /**
     * Problem 3: Merge K Sorted Lists
     * You are given an array of k linked-lists, each sorted in ascending order.
     * Merge all the linked-lists into one sorted linked-list and return it.
     */
    public static class MergeKSortedLists {

        // Definition for singly-linked list.
        public static class ListNode {
            int val;
            ListNode next;
            ListNode() {}
            ListNode(int val) { this.val = val; }
            ListNode(int val, ListNode next) { this.val = val; this.next = next; }

            // Helper for testing: converts array to ListNode
            public static ListNode fromArray(int[] arr) {
                if (arr == null || arr.length == 0) return null;
                ListNode head = new ListNode(arr[0]);
                ListNode current = head;
                for (int i = 1; i < arr.length; i++) {
                    current.next = new ListNode(arr[i]);
                    current = current.next;
                }
                return head;
            }

            // Helper for testing: converts ListNode to List
            public static List<Integer> toList(ListNode head) {
                List<Integer> list = new ArrayList<>();
                ListNode current = head;
                while (current != null) {
                    list.add(current.val);
                    current = current.next;
                }
                return list;
            }
        }

        /**
         * Optimal Approach: Using a Min-Heap (PriorityQueue)
         * The idea is to keep track of the smallest element from each of the K lists.
         * A min-heap will efficiently store the current head nodes of all non-empty lists,
         * ordered by their `val`.
         *
         * 1. Add the head of each non-null list to the min-heap.
         * 2. Repeatedly extract the minimum node from the heap. This node becomes part of the merged list.
         * 3. If the extracted node has a `next` node, add that `next` node to the heap.
         * 4. Continue until the heap is empty.
         *
         * Time Complexity: O(N log K)
         * - N is the total number of nodes across all K lists.
         * - K is the number of lists.
         * - Each node is inserted into and extracted from the heap once.
         * - Each heap operation takes O(log K) time because the heap will store at most K elements (one from each list).
         * Space Complexity: O(K) for the min-heap.
         *
         * @param lists An array of K sorted linked lists.
         * @return The head of the merged sorted linked list.
         */
        public ListNode mergeKLists(ListNode[] lists) {
            if (lists == null || lists.length == 0) {
                return null;
            }

            // Min-Heap to store ListNodes, ordered by their 'val'.
            // The comparator ensures it's a min-heap based on node values.
            PriorityQueue<ListNode> minHeap = new PriorityQueue<>(Comparator.comparingInt(node -> node.val));

            // Add the head of each non-null list to the heap
            for (ListNode list : lists) {
                if (list != null) {
                    minHeap.offer(list);
                }
            }

            ListNode dummyHead = new ListNode(); // Dummy node to simplify building the merged list
            ListNode current = dummyHead;

            while (!minHeap.isEmpty()) {
                ListNode smallest = minHeap.poll(); // Extract the smallest node
                current.next = smallest;            // Add it to the merged list
                current = current.next;             // Advance the current pointer

                // If the extracted node has a next node, add it to the heap
                if (smallest.next != null) {
                    minHeap.offer(smallest.next);
                }
            }

            return dummyHead.next; // The actual head of the merged list
        }

        /**
         * Alternative Approach: Merge lists one by one (less efficient for large K)
         * Merge list1 with list2, then merge the result with list3, and so on.
         *
         * Time Complexity: O(N*K) where N is total elements, K is num lists.
         * (Imagine merging two lists of size N/2. Each merge takes O(total_elements_in_two_lists).
         * For K lists, this adds up.)
         *
         * @param lists An array of K sorted linked lists.
         * @return The head of the merged sorted linked list.
         */
        public ListNode mergeKListsNaive(ListNode[] lists) {
            if (lists == null || lists.length == 0) {
                return null;
            }

            ListNode result = null;
            for (ListNode list : lists) {
                result = mergeTwoLists(result, list);
            }
            return result;
        }

        // Helper function to merge two sorted linked lists
        private ListNode mergeTwoLists(ListNode l1, ListNode l2) {
            if (l1 == null) return l2;
            if (l2 == null) return l1;

            ListNode dummyHead = new ListNode();
            ListNode current = dummyHead;

            while (l1 != null && l2 != null) {
                if (l1.val <= l2.val) {
                    current.next = l1;
                    l1 = l1.next;
                } else {
                    current.next = l2;
                    l2 = l2.next;
                }
                current = current.next;
            }

            if (l1 != null) {
                current.next = l1;
            } else {
                current.next = l2;
            }

            return dummyHead.next;
        }

        /**
         * Alternative Approach: Divide and Conquer (Similar complexity to heap for K large)
         * Recursively merge lists: merge(0, k-1) = merge(merge(0, (k-1)/2), merge((k-1)/2 + 1, k-1)).
         *
         * Time Complexity: O(N log K) - similar to heap, as each merge layer reduces the number of lists by half.
         * Space Complexity: O(log K) for recursion stack.
         *
         * @param lists An array of K sorted linked lists.
         * @return The head of the merged sorted linked list.
         */
        public ListNode mergeKListsDivideAndConquer(ListNode[] lists) {
            if (lists == null || lists.length == 0) {
                return null;
            }
            return mergeDivideAndConquer(lists, 0, lists.length - 1);
        }

        private ListNode mergeDivideAndConquer(ListNode[] lists, int start, int end) {
            if (start == end) {
                return lists[start]; // Base case: single list
            }
            if (start > end) {
                return null; // Invalid range
            }

            int mid = start + (end - start) / 2;
            ListNode leftMerged = mergeDivideAndConquer(lists, start, mid);
            ListNode rightMerged = mergeDivideAndConquer(lists, mid + 1, end);
            return mergeTwoLists(leftMerged, rightMerged); // Use the existing mergeTwoLists helper
        }
    }


    /**
     * Problem 4: Top K Frequent Elements
     * Given an integer array nums and an integer k, return the k most frequent elements.
     * You may return the answer in any order.
     */
    public static class TopKFrequentElements {

        /**
         * Optimal Approach: Using a Min-Heap (PriorityQueue)
         * 1. Count the frequency of each number using a HashMap.
         * 2. Create a Min-Heap to store (frequency, number) pairs.
         *    The heap should order by frequency (smallest frequency at top).
         * 3. Iterate through the frequency map:
         *    - Add each (frequency, number) pair to the heap.
         *    - If the heap size exceeds K, remove the pair with the smallest frequency (heap.poll()).
         * 4. After processing all elements, the heap will contain the K most frequent elements.
         *    Extract them from the heap.
         *
         * Time Complexity: O(N + M log K)
         * - O(N) to count frequencies (N is number of elements in `nums`).
         * - O(M log K) where M is the number of unique elements (map entries).
         *   Each `offer`/`poll` takes O(log K) because the heap maintains K elements.
         *   In the worst case, M could be N. So, O(N + N log K).
         *   Effectively O(N log K) if K < N. If K == N, it's O(N).
         * Space Complexity: O(M) for the frequency map, O(K) for the heap. Total O(M + K).
         *
         * @param nums The input array of integers.
         * @param k The number of most frequent elements to return.
         * @return An array containing the K most frequent elements.
         * @throws IllegalArgumentException if k is out of bounds or nums is invalid.
         */
        public int[] topKFrequentMinHeap(int[] nums, int k) {
            if (nums == null || nums.length == 0 || k <= 0) {
                throw new IllegalArgumentException("Invalid input: nums array is empty or k is invalid.");
            }
            if (k > nums.length) { // If k is larger than unique elements, return all unique elements
                // This case can be handled by collecting all unique elements
                return Arrays.stream(nums).distinct().toArray();
            }

            // Step 1: Count frequencies
            Map<Integer, Integer> freqMap = new HashMap<>();
            for (int num : nums) {
                freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
            }

            // Step 2: Create a Min-Heap of Map.Entry (value, frequency)
            // The comparator ensures elements with smaller frequency are at the top.
            PriorityQueue<Map.Entry<Integer, Integer>> minHeap = new PriorityQueue<>(
                    Comparator.comparingInt(Map.Entry::getValue) // Compare by frequency (value)
            );

            // Step 3: Iterate through frequency map and populate heap
            for (Map.Entry<Integer, Integer> entry : freqMap.entrySet()) {
                minHeap.offer(entry);
                if (minHeap.size() > k) {
                    minHeap.poll(); // Remove the element with the smallest frequency
                }
            }

            // Step 4: Extract elements from heap
            int[] result = new int[k];
            for (int i = k - 1; i >= 0; i--) { // Fill from end to maintain order if needed, otherwise order doesn't matter
                result[i] = minHeap.poll().getKey();
            }
            return result;
        }

        /**
         * Alternative Approach 1: Using a Max-Heap (less efficient if k is small)
         * 1. Count frequencies.
         * 2. Add all (frequency, number) pairs to a Max-Heap (largest frequency at top).
         * 3. Poll K times to get the K most frequent elements.
         *
         * Time Complexity: O(N + M log M)
         * - O(N) to count frequencies.
         * - O(M log M) to insert all unique elements into the Max-Heap, then K poll operations.
         *   Building heap from M elements can be O(M). Polling K times O(K log M). So O(N + M + K log M).
         *   Worst case M=N, so O(N log N). This is worse than O(N log K) if K << N.
         * Space Complexity: O(M) for map and heap.
         *
         * @param nums The input array of integers.
         * @param k The number of most frequent elements to return.
         * @return An array containing the K most frequent elements.
         */
        public int[] topKFrequentMaxHeap(int[] nums, int k) {
            if (nums == null || nums.length == 0 || k <= 0) {
                throw new IllegalArgumentException("Invalid input: nums array is empty or k is invalid.");
            }
            if (k > nums.length) {
                return Arrays.stream(nums).distinct().toArray();
            }

            Map<Integer, Integer> freqMap = new HashMap<>();
            for (int num : nums) {
                freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
            }

            // Max-Heap, ordered by frequency in descending order
            PriorityQueue<Map.Entry<Integer, Integer>> maxHeap = new PriorityQueue<>(
                    (e1, e2) -> e2.getValue() - e1.getValue() // Compare by frequency, reverse order for max-heap
            );

            maxHeap.addAll(freqMap.entrySet()); // Add all entries to max-heap

            int[] result = new int[k];
            for (int i = 0; i < k; i++) {
                if (!maxHeap.isEmpty()) {
                    result[i] = maxHeap.poll().getKey();
                } else {
                    // Should not happen if k <= unique elements count, but good for robustness
                    break;
                }
            }
            return result;
        }

        /**
         * Alternative Approach 2: Bucket Sort (if frequency range is known/small)
         * This method is highly efficient if `max_frequency` is not excessively large.
         * 1. Count frequencies using a HashMap.
         * 2. Create an array of lists (buckets) where `buckets[i]` stores numbers with frequency `i`.
         * 3. Iterate from the highest possible frequency down to 1, collecting elements until K are found.
         *
         * Time Complexity: O(N) average, O(N + MaxFreq) where MaxFreq is the maximum frequency.
         * - O(N) to build frequency map.
         * - O(N) to populate buckets (each number goes into one bucket).
         * - O(MaxFreq) to iterate buckets, and O(N) in total to collect k elements.
         *   Total is O(N) because max frequency can be N, but total elements in buckets is N.
         * Space Complexity: O(N) for frequency map and buckets.
         *
         * @param nums The input array of integers.
         * @param k The number of most frequent elements to return.
         * @return An array containing the K most frequent elements.
         */
        public int[] topKFrequentBucketSort(int[] nums, int k) {
            if (nums == null || nums.length == 0 || k <= 0) {
                throw new IllegalArgumentException("Invalid input: nums array is empty or k is invalid.");
            }
            if (k > nums.length) {
                return Arrays.stream(nums).distinct().toArray();
            }

            Map<Integer, Integer> freqMap = new HashMap<>();
            for (int num : nums) {
                freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
            }

            // Create buckets. Index `i` stores a list of numbers with frequency `i`.
            // The maximum possible frequency is nums.length.
            List<Integer>[] buckets = new List[nums.length + 1];
            for (int i = 0; i < buckets.length; i++) {
                buckets[i] = new ArrayList<>();
            }

            // Populate buckets
            for (Map.Entry<Integer, Integer> entry : freqMap.entrySet()) {
                buckets[entry.getValue()].add(entry.getKey());
            }

            List<Integer> resultList = new ArrayList<>();
            // Iterate from highest frequency to lowest
            for (int i = buckets.length - 1; i >= 0 && resultList.size() < k; i--) {
                if (!buckets[i].isEmpty()) {
                    for (int num : buckets[i]) {
                        resultList.add(num);
                        if (resultList.size() == k) {
                            break; // Found K elements
                        }
                    }
                }
            }

            return resultList.stream().mapToInt(Integer::intValue).toArray();
        }
    }
}
```