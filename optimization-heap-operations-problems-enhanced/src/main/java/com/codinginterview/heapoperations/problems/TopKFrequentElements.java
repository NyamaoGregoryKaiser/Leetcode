```java
package com.codinginterview.heapoperations.problems;

import com.codinginterview.heapoperations.utils.CustomMinHeap;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

/**
 * Problem: Top K Frequent Elements
 *
 * Given an integer array nums and an integer k, return the k most frequent elements.
 * You may return the answer in any order.
 *
 * Example 1:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2] (or [2,1])
 *
 * Example 2:
 * Input: nums = [1], k = 1
 * Output: [1]
 *
 * Constraints:
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * k is in the range [1, the number of unique elements in the array].
 * It is guaranteed that the answer is unique, meaning there is only one set of the k most frequent elements.
 */
public class TopKFrequentElements {

    /**
     * Approach 1: Optimal Solution using HashMap + Min-Heap (Java's PriorityQueue)
     *
     * Algorithm:
     * 1. **Count Frequencies:** Use a HashMap to store the frequency of each number.
     *    Iterate through the input array `nums` and populate `Map<Integer, Integer>`
     *    where key is the number and value is its frequency.
     *    Time: O(N), Space: O(M) where M is the number of unique elements.
     *
     * 2. **Maintain Top K with Min-Heap:** Create a Min-Heap (PriorityQueue) that
     *    stores `Map.Entry<Integer, Integer>` objects. The heap should be ordered
     *    by the *frequency* (value of the entry) in ascending order.
     *    Iterate through each entry in the frequency map:
     *    a. Add the entry to the min-heap.
     *    b. If the size of the min-heap exceeds `k`, remove the entry with the smallest
     *       frequency (`heap.poll()`). This ensures the heap always contains `k` elements
     *       that have the highest frequencies encountered so far. The root of this heap
     *       will always be the element with the Kth highest frequency.
     *    Time: O(M log K), Space: O(K)
     *
     * 3. **Extract Results:** Create an `int[]` array of size `k`.
     *    While the heap is not empty, extract elements (`heap.poll()`) and add their keys
     *    (the actual numbers) to the result array.
     *    Time: O(K log K) (or O(K) if simply moving to list/array), Space: O(K)
     *
     * Overall Time Complexity: O(N + M log K)
     *   - N for frequency counting, M for iterating unique elements for heap, K for final extraction.
     * Overall Space Complexity: O(M + K)
     *   - M for HashMap, K for Min-Heap.
     *
     * @param nums The input integer array.
     * @param k The number of most frequent elements to return.
     * @return An array containing the k most frequent elements.
     */
    public int[] topKFrequentHeap(int[] nums, int k) {
        // Step 1: Count frequencies of each number
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : nums) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }

        // Step 2: Use a min-heap to keep track of the k most frequent elements
        // The heap stores Map.Entry objects, ordered by frequency (value).
        // A min-heap ensures that the smallest frequency among the top K is at the root.
        PriorityQueue<Map.Entry<Integer, Integer>> minHeap = new PriorityQueue<>(
                Comparator.comparingInt(Map.Entry::getValue)
        );

        for (Map.Entry<Integer, Integer> entry : freqMap.entrySet()) {
            minHeap.offer(entry); // Add current entry
            if (minHeap.size() > k) {
                minHeap.poll(); // Remove the entry with the smallest frequency if heap size exceeds k
            }
        }

        // Step 3: Extract the elements from the heap
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = minHeap.poll().getKey();
        }

        return result;
    }

    /**
     * Approach 2: Optimal Solution using HashMap + Custom Min-Heap
     *
     * This method provides the same logic as `topKFrequentHeap` but uses
     * our custom `CustomMinHeap` implementation to demonstrate heap mechanics from scratch.
     *
     * For this, we need a custom Pair class or equivalent to store element and its frequency.
     *
     * Time Complexity: O(N + M log K)
     * Space Complexity: O(M + K)
     *
     * @param nums The input integer array.
     * @param k The number of most frequent elements to return.
     * @return An array containing the k most frequent elements.
     */
    public int[] topKFrequentCustomHeap(int[] nums, int k) {
        // Custom class to store frequency and value for the custom heap
        class FrequencyPair {
            int value;
            int frequency;

            public FrequencyPair(int value, int frequency) {
                this.value = value;
                this.frequency = frequency;
            }
        }

        // Step 1: Count frequencies
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : nums) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }

        // Step 2: Use a custom min-heap to keep track of the k most frequent elements
        // Comparator ensures sorting by frequency in ascending order (for min-heap)
        CustomMinHeap<FrequencyPair> minHeap = new CustomMinHeap<>(
                Comparator.comparingInt(p -> p.frequency)
        );

        for (Map.Entry<Integer, Integer> entry : freqMap.entrySet()) {
            minHeap.add(new FrequencyPair(entry.getKey(), entry.getValue()));
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        // Step 3: Extract results
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = minHeap.poll().value;
        }

        return result;
    }


    /**
     * Approach 3: Bucket Sort (Linear Time Solution)
     *
     * This approach is generally the most optimal in terms of time complexity
     * if the maximum frequency is not excessively large (which it is bounded by N).
     *
     * Algorithm:
     * 1. **Count Frequencies:** Use a HashMap to store `(number, frequency)` pairs.
     *    Time: O(N), Space: O(M)
     *
     * 2. **Create Buckets:** Create an array of lists, where `buckets[i]` will store
     *    all numbers that have a frequency of `i`. The size of this array will be
     *    `N + 1` because the maximum possible frequency is `N`.
     *    Initialize each bucket (list) if it's null when adding.
     *    Time: O(M), Space: O(N) (worst case, if all numbers have distinct frequencies up to N)
     *
     * 3. **Populate Buckets:** Iterate through the `freqMap`. For each `(number, frequency)`
     *    pair, add `number` to `buckets[frequency]`.
     *    Time: O(M)
     *
     * 4. **Collect Top K:** Iterate through the `buckets` array from the highest
     *    possible frequency (N) down to 1. For each bucket that contains elements,
     *    add them to the result list until `k` elements have been collected.
     *    Time: O(N) (worst case, iterating through all buckets and elements)
     *
     * Overall Time Complexity: O(N)
     *   - O(N) for frequency counting.
     *   - O(N) for populating buckets (at most N elements stored across all buckets).
     *   - O(N) for collecting results (at most N elements checked).
     * Overall Space Complexity: O(N)
     *   - For frequency map and buckets array.
     *
     * @param nums The input integer array.
     * @param k The number of most frequent elements to return.
     * @return An array containing the k most frequent elements.
     */
    public int[] topKFrequentBucketSort(int[] nums, int k) {
        // Step 1: Count frequencies
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : nums) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }

        // Step 2: Create buckets for frequencies.
        // Index i represents frequency i, and the list at buckets[i] contains numbers with that frequency.
        // Max frequency can be nums.length.
        List<Integer>[] buckets = new List[nums.length + 1];

        // Step 3: Populate buckets
        for (Map.Entry<Integer, Integer> entry : freqMap.entrySet()) {
            int num = entry.getKey();
            int frequency = entry.getValue();
            if (buckets[frequency] == null) {
                buckets[frequency] = new ArrayList<>();
            }
            buckets[frequency].add(num);
        }

        // Step 4: Collect top k elements by iterating buckets from highest frequency
        List<Integer> resultList = new ArrayList<>();
        for (int i = buckets.length - 1; i >= 0 && resultList.size() < k; i--) {
            if (buckets[i] != null) {
                for (int num : buckets[i]) {
                    resultList.add(num);
                    if (resultList.size() == k) {
                        break; // Found k elements
                    }
                }
            }
        }

        return resultList.stream().mapToInt(Integer::intValue).toArray();
    }


    /**
     * Approach 4: HashMap + Sorting (for comparison)
     *
     * Algorithm:
     * 1. **Count Frequencies:** Use a HashMap to store `(number, frequency)` pairs.
     *    Time: O(N), Space: O(M)
     *
     * 2. **Convert to List and Sort:** Convert the `entrySet()` of the HashMap into an
     *    `ArrayList<Map.Entry<Integer, Integer>>`. Sort this list based on frequencies
     *    in descending order.
     *    Time: O(M log M) where M is the number of unique elements.
     *    Space: O(M)
     *
     * 3. **Extract Top K:** Take the first `k` elements from the sorted list.
     *    Time: O(K)
     *
     * Overall Time Complexity: O(N + M log M)
     *   - O(N) for frequency counting.
     *   - O(M log M) for sorting the map entries.
     *   - O(K) for extracting results.
     * Overall Space Complexity: O(M)
     *   - For frequency map and the list of entries.
     *
     * This approach is simpler but less efficient than the heap-based approach
     * if `K` is significantly smaller than `M` (the number of unique elements),
     * as it sorts all unique elements regardless of `K`.
     *
     * @param nums The input integer array.
     * @param k The number of most frequent elements to return.
     * @return An array containing the k most frequent elements.
     */
    public int[] topKFrequentSorting(int[] nums, int k) {
        // Step 1: Count frequencies
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : nums) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }

        // Step 2: Convert map entries to a list and sort by frequency in descending order
        List<Map.Entry<Integer, Integer>> entryList = new ArrayList<>(freqMap.entrySet());
        entryList.sort((e1, e2) -> e2.getValue() - e1.getValue()); // Descending order of frequency

        // Step 3: Extract the k most frequent elements
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = entryList.get(i).getKey();
        }

        return result;
    }
}
```