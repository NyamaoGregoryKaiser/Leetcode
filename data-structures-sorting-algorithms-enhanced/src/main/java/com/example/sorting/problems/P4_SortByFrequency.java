```java
package com.example.sorting.problems;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

/**
 * Problem: Sort Characters by Frequency
 *
 * Given a string `s`, sort it in decreasing order based on the frequency of the characters.
 * If two characters have the same frequency, they can appear in any order.
 *
 * Example 1:
 * Input: s = "tree"
 * Output: "eert"
 * Explanation: 'e' appears twice while 'r' and 't' both appear once.
 * So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
 *
 * Example 2:
 * Input: s = "cccaaa"
 * Output: "aaaccc"
 * Explanation: Both 'c' and 'a' appear three times.
 * Note that "cccaaa" is also a valid answer, as the order of characters with the same frequency does not matter.
 *
 * Example 3:
 * Input: s = "Aabb"
 * Output: "bbAa"
 * Explanation: 'A' and 'a' are treated as two different characters. 'b' appears twice, 'A' and 'a' once.
 * So "bbaA" is also a valid answer.
 */
public class P4_SortByFrequency {

    /**
     * Approach 1: Hash Map + Custom Sort
     *
     * 1. Count Character Frequencies: Use a HashMap to store each character and its frequency.
     * 2. Store in List and Sort: Convert the HashMap entries into a List of entries or a custom Pair object.
     *    Sort this list based on frequency in descending order. If frequencies are equal,
     *    the order of characters doesn't matter, so any secondary sort (e.g., by character ASCII value) is fine.
     * 3. Build Result String: Iterate through the sorted list and append each character to the result
     *    string as many times as its frequency.
     *
     * Time Complexity: O(N + C log C)
     *   - O(N) to count frequencies (N is length of string).
     *   - O(C log C) to sort the C distinct characters (C <= 256 for ASCII/Unicode Basic Multilingual Plane).
     *   - Total: O(N) as C is a constant (e.g., 256).
     *
     * Space Complexity: O(C)
     *   - O(C) for the HashMap and the list of entries (C distinct characters).
     *
     * @param s The input string.
     * @return The string sorted by character frequency in decreasing order.
     * @throws IllegalArgumentException if the input string is null.
     */
    public String frequencySort_HashMapAndSort(String s) {
        if (s == null) {
            throw new IllegalArgumentException("Input string cannot be null.");
        }
        if (s.isEmpty()) {
            return "";
        }

        // 1. Count character frequencies
        Map<Character, Integer> freqMap = new HashMap<>();
        for (char c : s.toCharArray()) {
            freqMap.put(c, freqMap.getOrDefault(c, 0) + 1);
        }

        // 2. Convert map entries to a list and sort
        List<Map.Entry<Character, Integer>> entryList = new ArrayList<>(freqMap.entrySet());

        // Sort by frequency in descending order. If frequencies are equal, sort by character (optional, for deterministic output).
        Collections.sort(entryList, (e1, e2) -> {
            int freqCompare = e2.getValue().compareTo(e1.getValue());
            if (freqCompare == 0) {
                // Optional: For deterministic output, sort by character if frequencies are equal
                return e1.getKey().compareTo(e2.getKey());
            }
            return freqCompare;
        });

        // 3. Build the result string
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<Character, Integer> entry : entryList) {
            char c = entry.getKey();
            int freq = entry.getValue();
            for (int i = 0; i < freq; i++) {
                sb.append(c);
            }
        }

        return sb.toString();
    }

    /**
     * Approach 2: Hash Map + Max-Heap (Priority Queue)
     *
     * 1. Count Character Frequencies: Same as Approach 1, use a HashMap.
     * 2. Build Max-Heap: Create a Max-Heap (PriorityQueue) that stores characters,
     *    prioritizing characters with higher frequencies.
     * 3. Extract from Heap and Build String: Repeatedly extract the character with the
     *    highest frequency from the heap, and append it to the result string as many
     *    times as its frequency.
     *
     * Time Complexity: O(N + C log C)
     *   - O(N) to count frequencies.
     *   - O(C log C) to build the heap (C insertions, each O(log C)) and extract from heap (C extractions, each O(log C)).
     *   - Total: O(N) as C is a constant.
     *
     * Space Complexity: O(C)
     *   - O(C) for the HashMap and the PriorityQueue.
     *
     * @param s The input string.
     * @return The string sorted by character frequency in decreasing order.
     * @throws IllegalArgumentException if the input string is null.
     */
    public String frequencySort_HashMapAndMaxHeap(String s) {
        if (s == null) {
            throw new IllegalArgumentException("Input string cannot be null.");
        }
        if (s.isEmpty()) {
            return "";
        }

        // 1. Count character frequencies
        Map<Character, Integer> freqMap = new HashMap<>();
        for (char c : s.toCharArray()) {
            freqMap.put(c, freqMap.getOrDefault(c, 0) + 1);
        }

        // 2. Build a Max-Heap. The elements are characters, and comparison is based on their frequencies.
        // The lambda expression defines a custom comparator for characters based on their frequency.
        // `(a, b) -> freqMap.get(b) - freqMap.get(a)` means:
        //   - If freqMap.get(b) > freqMap.get(a), result is positive, 'b' has higher priority (max-heap behavior).
        //   - This effectively sorts characters with higher frequencies first.
        PriorityQueue<Character> maxHeap = new PriorityQueue<>((a, b) -> freqMap.get(b) - freqMap.get(a));
        // Add all unique characters from the frequency map to the heap.
        maxHeap.addAll(freqMap.keySet());

        // 3. Build the result string
        StringBuilder sb = new StringBuilder();
        while (!maxHeap.isEmpty()) {
            char c = maxHeap.poll(); // Get the character with the highest frequency
            int freq = freqMap.get(c);
            for (int i = 0; i < freq; i++) {
                sb.append(c);
            }
        }

        return sb.toString();
    }

    /**
     * Approach 3: Hash Map + Bucket Sort
     *
     * This is an optimal solution, especially considering the limited range of character frequencies
     * (max frequency can be N, min is 1). It avoids the O(log C) factor from sorting/heap operations.
     *
     * 1. Count Character Frequencies: Same as Approach 1.
     * 2. Create Buckets: Create an array of Lists (buckets) where the index `i` represents frequency `i`.
     *    The maximum frequency a character can have is `s.length()`. So, the bucket array size will be `N+1`.
     * 3. Populate Buckets: Iterate through the frequency map and place each character into its corresponding
     *    frequency bucket.
     * 4. Build Result String: Iterate the buckets from the highest frequency index down to 1.
     *    For each character in a bucket, append it to the result string its frequency times.
     *
     * Time Complexity: O(N)
     *   - O(N) to count frequencies.
     *   - O(C) to populate buckets.
     *   - O(N) to iterate buckets and build string (each character is appended once).
     *   - Total: O(N).
     *
     * Space Complexity: O(N + C)
     *   - O(C) for the HashMap.
     *   - O(N) for the bucket array (in worst case, all characters have frequency 1, so N lists).
     *   - Total: O(N) dominated by the bucket array.
     *
     * @param s The input string.
     * @return The string sorted by character frequency in decreasing order.
     * @throws IllegalArgumentException if the input string is null.
     */
    public String frequencySort_HashMapAndBucketSort(String s) {
        if (s == null) {
            throw new IllegalArgumentException("Input string cannot be null.");
        }
        if (s.isEmpty()) {
            return "";
        }

        // 1. Count character frequencies
        Map<Character, Integer> freqMap = new HashMap<>();
        for (char c : s.toCharArray()) {
            freqMap.put(c, freqMap.getOrDefault(c, 0) + 1);
        }

        // 2. Create buckets: index is frequency, value is list of characters with that frequency
        // Max frequency can be s.length(), so we need buckets up to s.length()
        List<Character>[] buckets = new List[s.length() + 1]; // buckets[0] will be unused for frequencies >= 1

        // 3. Populate buckets
        for (char c : freqMap.keySet()) {
            int freq = freqMap.get(c);
            if (buckets[freq] == null) {
                buckets[freq] = new ArrayList<>();
            }
            buckets[freq].add(c);
        }

        // 4. Build the result string by iterating buckets from max frequency down
        StringBuilder sb = new StringBuilder();
        for (int freq = s.length(); freq >= 1; freq--) {
            if (buckets[freq] != null) {
                for (char c : buckets[freq]) {
                    for (int i = 0; i < freq; i++) {
                        sb.append(c);
                    }
                }
            }
        }

        return sb.toString();
    }
}
```