```java
package com.example.stringmanipulation.problems;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * AnagramChecker
 * Provides various methods to check if two strings are anagrams of each other.
 * An anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 * Assumes strings contain only lowercase English letters unless specified.
 */
public class AnagramChecker {

    /**
     * Checks if two strings are anagrams using sorting.
     * This approach sorts both strings and then compares them. If they are identical after sorting,
     * they are anagrams.
     *
     * Time Complexity: O(N log N) where N is the length of the string, due to sorting.
     *                  Specifically, O(N log N + M log M) if strings have different lengths N and M.
     * Space Complexity: O(N) or O(log N) depending on the sort implementation (e.g., Arrays.sort uses
     *                   Dual-Pivot Quicksort for primitives, which is O(log N) stack space,
     *                   but creating char arrays takes O(N) space).
     *
     * @param s The first string.
     * @param t The second string.
     * @return true if s and t are anagrams, false otherwise.
     */
    public static boolean isAnagramSorting(String s, String t) {
        // Edge case: If lengths are different, they cannot be anagrams.
        if (s == null || t == null || s.length() != t.length()) {
            return false;
        }

        char[] sChars = s.toCharArray();
        char[] tChars = t.toCharArray();

        Arrays.sort(sChars);
        Arrays.sort(tChars);

        return Arrays.equals(sChars, tChars);
    }

    /**
     * Checks if two strings are anagrams using a frequency array.
     * This is the most optimal approach for strings containing characters from a small, fixed-size
     * character set (like lowercase English letters).
     * It counts the frequency of each character in the first string and then decrements counts
     * for characters in the second string. If all counts are zero at the end, they are anagrams.
     *
     * Time Complexity: O(N) where N is the total length of the strings (length of s + length of t),
     *                  as we iterate through each string once.
     * Space Complexity: O(1) because the size of the frequency array (26 for lowercase English letters)
     *                   is constant, regardless of the input string length.
     *
     * @param s The first string.
     * @param t The second string.
     * @return true if s and t are anagrams, false otherwise.
     */
    public static boolean isAnagramFrequencyArray(String s, String t) {
        // Edge case: If lengths are different, they cannot be anagrams.
        if (s == null || t == null || s.length() != t.length()) {
            return false;
        }

        // Assuming lowercase English letters ('a' through 'z')
        int[] charCounts = new int[26]; // 0-indexed: 'a' -> 0, 'b' -> 1, ..., 'z' -> 25

        // Increment counts for characters in string s
        for (char c : s.toCharArray()) {
            charCounts[c - 'a']++;
        }

        // Decrement counts for characters in string t
        for (char c : t.toCharArray()) {
            charCounts[c - 'a']--;
            // If a character count goes below zero, it means t has more of this character
            // than s, or a character not present in s.
            if (charCounts[c - 'a'] < 0) {
                return false;
            }
        }

        // After processing both strings, all counts in charCounts array must be zero
        // if they are anagrams. (This check is implicitly covered by the decrement logic
        // and initial length check, but good to be explicit about the invariant).
        // Since we already checked lengths and decremented counts, if all chars in t found in s,
        // and counts didn't go below 0, then all counts must be 0.
        // If s = "abc", t = "abx", lengths are equal.
        // charCounts = [1,1,1] after s.
        // charCounts = [0,0,1] after 'a', 'b' in t.
        // charCounts['x'-'a']-- will lead to -1 which is caught.
        // Example: s="aabb", t="abab".
        // s: a=2, b=2
        // t: a=1, b=1, a=0, b=0 -> all counts are 0.
        return true; // All counts balanced out to zero
    }

    /**
     * Checks if two strings are anagrams using a HashMap.
     * This approach is more general than the frequency array as it can handle any character set
     * (e.g., Unicode, uppercase, spaces) without knowing the range in advance.
     *
     * Time Complexity: O(N) on average, where N is the total length of the strings.
     *                  HashMap operations (put, get, remove) take O(1) on average.
     * Space Complexity: O(K) where K is the number of unique characters in the strings.
     *                   In the worst case, K can be up to N if all characters are unique.
     *
     * @param s The first string.
     * @param t The second string.
     * @return true if s and t are anagrams, false otherwise.
     */
    public static boolean isAnagramHashMap(String s, String t) {
        // Edge case: If lengths are different, they cannot be anagrams.
        if (s == null || t == null || s.length() != t.length()) {
            return false;
        }

        Map<Character, Integer> charCounts = new HashMap<>();

        // Populate map with character counts from string s
        for (char c : s.toCharArray()) {
            charCounts.put(c, charCounts.getOrDefault(c, 0) + 1);
        }

        // Decrement counts for characters in string t
        for (char c : t.toCharArray()) {
            // If character 'c' is not in map or its count is already zero, t has an extra char
            if (!charCounts.containsKey(c) || charCounts.get(c) == 0) {
                return false;
            }
            charCounts.put(c, charCounts.get(c) - 1);
        }

        // At this point, if all character counts in the map are zero, they are anagrams.
        // Since we already checked lengths and handled decrements, we don't need to iterate
        // through the map again to check if all values are zero. If a character was present
        // in 's' but not in 't', its count wouldn't be zero, but we already ensured that
        // 't' doesn't have extra characters. The initial length check covers the "remaining
        // characters" scenario.
        return true;
    }
}
```