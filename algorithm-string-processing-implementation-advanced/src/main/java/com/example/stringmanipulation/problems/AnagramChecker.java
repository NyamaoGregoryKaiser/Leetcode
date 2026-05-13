```java
package com.example.stringmanipulation.problems;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Problem: Anagram Checker
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 */
public class AnagramChecker {

    /**
     * Approach 1: Sorting
     * Two strings are anagrams if and only if their sorted forms are identical.
     *
     * Time Complexity: O(N log N + M log M)
     *   - Where N is the length of s and M is the length of t.
     *   - Sorting character arrays takes O(L log L) time, where L is string length.
     *   - Comparing sorted arrays takes O(min(N, M)) time.
     * Space Complexity: O(N + M)
     *   - For converting strings to char arrays (or for the sorting algorithm itself if it's not in-place).
     *
     * @param s The first string.
     * @param t The second string.
     * @return true if t is an anagram of s, false otherwise.
     */
    public boolean isAnagramSorting(String s, String t) {
        if (s == null || t == null) {
            return false; // Or throw IllegalArgumentException
        }
        if (s.length() != t.length()) {
            return false; // Anagrams must have the same length
        }

        char[] sChars = s.toCharArray();
        char[] tChars = t.toCharArray();

        Arrays.sort(sChars);
        Arrays.sort(tChars);

        return Arrays.equals(sChars, tChars);
    }

    /**
     * Approach 2: Frequency Array (Optimal for ASCII characters)
     * Two strings are anagrams if they have the same character counts.
     * We can use an array of size 26 (for lowercase English letters) or 128/256 (for extended ASCII)
     * to store character frequencies.
     * Increment count for characters in 's', decrement for characters in 't'.
     * If all counts are zero at the end, they are anagrams.
     *
     * Time Complexity: O(N + M)
     *   - Iterating through each string once takes O(N) and O(M) time respectively.
     * Space Complexity: O(1) (or O(alphabet_size))
     *   - The size of the frequency array is fixed (e.g., 26 for English alphabet),
     *     so it does not depend on the input string length.
     *
     * @param s The first string.
     * @param t The second string.
     * @return true if t is an anagram of s, false otherwise.
     */
    public boolean isAnagramFrequencyArray(String s, String t) {
        if (s == null || t == null) {
            return false;
        }
        if (s.length() != t.length()) {
            return false;
        }

        // Assuming lowercase English letters (a-z) only.
        // For general ASCII, use int[128] or int[256].
        int[] charCounts = new int[26];

        for (char c : s.toCharArray()) {
            charCounts[c - 'a']++;
        }

        for (char c : t.toCharArray()) {
            charCounts[c - 'a']--;
        }

        // Check if all counts are zero
        for (int count : charCounts) {
            if (count != 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * Approach 3: Frequency Map (General for Unicode/Any characters)
     * Similar to the frequency array but uses a HashMap for characters,
     * which is more flexible for strings with non-ASCII or a very large character set.
     *
     * Time Complexity: O(N + M)
     *   - Iterating through each string once. HashMap operations (put, get) are O(1) on average.
     * Space Complexity: O(K)
     *   - Where K is the number of unique characters in the strings (can be up to N in worst case).
     *
     * @param s The first string.
     * @param t The second string.
     * @return true if t is an anagram of s, false otherwise.
     */
    public boolean isAnagramFrequencyMap(String s, String t) {
        if (s == null || t == null) {
            return false;
        }
        if (s.length() != t.length()) {
            return false;
        }

        Map<Character, Integer> charCounts = new HashMap<>();

        for (char c : s.toCharArray()) {
            charCounts.put(c, charCounts.getOrDefault(c, 0) + 1);
        }

        for (char c : t.toCharArray()) {
            // If character not in map, or count becomes negative, it's not an anagram
            if (!charCounts.containsKey(c) || charCounts.get(c) == 0) {
                return false;
            }
            charCounts.put(c, charCounts.get(c) - 1);
        }

        // After processing 't', all counts in charCounts should ideally be zero.
        // However, the check `charCounts.get(c) == 0` during decrement already handles this,
        // so we don't strictly need a final loop through the map's values if the length check is done initially.
        // But for robustness, we can iterate again:
        for (int count : charCounts.values()) {
            if (count != 0) {
                return false;
            }
        }

        return true;
    }
}
```