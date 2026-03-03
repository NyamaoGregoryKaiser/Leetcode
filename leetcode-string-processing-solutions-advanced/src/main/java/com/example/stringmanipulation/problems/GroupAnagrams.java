```java
package com.example.stringmanipulation.problems;

import java.util.*;

/**
 * Problem: Group Anagrams
 * Given an array of strings `strs`, group the anagrams together.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 *
 * Examples:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * Input: strs = [""]
 * Output: [[""]]
 *
 * Input: strs = ["a"]
 * Output: [["a"]]
 *
 * Constraints:
 * 1 <= strs.length <= 10^4
 * 0 <= strs[i].length <= 100
 * strs[i] consists of lowercase English letters.
 */
public class GroupAnagrams {

    /**
     * Approach 1: Sorting Characters (Optimal)
     *
     * The idea is that anagrams, when their characters are sorted alphabetically,
     * will produce the same canonical string. We can use this canonical string as a key
     * in a hash map, and store lists of original strings that map to this key.
     *
     * Algorithm:
     * 1. Initialize a HashMap where the key is a sorted string and the value is a list of strings.
     * 2. Iterate through each string `s` in the input array `strs`.
     * 3. Convert the string `s` to a character array.
     * 4. Sort the character array.
     * 5. Convert the sorted character array back to a string. This sorted string is our canonical key.
     * 6. Use `map.getOrDefault(key, new ArrayList<>())` to get the list associated with the key.
     *    If the key doesn't exist, a new empty list is created.
     * 7. Add the original string `s` to this list.
     * 8. Put the updated list back into the map with the canonical key.
     * 9. Finally, return all the values (lists of anagrams) from the hash map.
     *
     * Time Complexity: O(N * K log K)
     * N is the number of strings in `strs`.
     * K is the maximum length of a string in `strs`.
     * For each of the N strings, we convert it to a char array, sort it (K log K), and then convert back to string.
     * Hash map operations (put, get) take O(K) time in the worst case if string hashing takes O(K) time.
     * So, N * (K + K log K + K) which simplifies to O(N * K log K).
     *
     * Space Complexity: O(N * K)
     * In the worst case, all strings are distinct and not anagrams of each other.
     * The hash map will store N entries, and each key (sorted string) has length K.
     * Each value is the original string, contributing K to space. So, O(N * K).
     */
    public List<List<String>> groupAnagramsBySorting(String[] strs) {
        if (strs == null || strs.length == 0) {
            return new ArrayList<>();
        }

        // Map to store sorted string -> list of original anagrams
        Map<String, List<String>> anagramGroups = new HashMap<>();

        for (String s : strs) {
            // Convert string to char array for sorting
            char[] charArray = s.toCharArray();
            // Sort the char array
            Arrays.sort(charArray);
            // Convert sorted char array back to string to use as map key
            String sortedKey = new String(charArray);

            // Add the original string to the list associated with the sorted key
            // If the key is not present, compute an empty list first
            anagramGroups.computeIfAbsent(sortedKey, k -> new ArrayList<>()).add(s);
        }

        // Return all the lists of anagrams (values) from the map
        return new ArrayList<>(anagramGroups.values());
    }


    /**
     * Approach 2: Character Count Array (Optimal Alternative)
     *
     * Instead of sorting the string, we can create a frequency count array for each string.
     * Since strings only contain lowercase English letters, a size 26 integer array is sufficient.
     * For example, `s = "aba"` would have `counts = [2, 1, 0, ..., 0]`.
     * We can then convert this array into a unique string representation (e.g., "1#0#0#1#...") to use as a hash map key.
     * This avoids the O(K log K) sorting time.
     *
     * Algorithm:
     * 1. Initialize a HashMap where the key is a string representation of the character counts
     *    and the value is a list of strings.
     * 2. Iterate through each string `s` in the input array `strs`.
     * 3. Create a `count` array of size 26 (for 'a' through 'z'), initialized to zeros.
     * 4. For each character `c` in `s`, increment `count[c - 'a']`.
     * 5. Build a string representation of this `count` array. A `StringBuilder` is efficient for this.
     *    Append each count followed by a delimiter (e.g., '#') to make the key unique.
     *    Example: `[1,0,0,1]` -> "1#0#0#1#"
     * 6. Use this count string as the map key.
     * 7. Add the original string `s` to the list associated with this key.
     * 8. Return all the values from the hash map.
     *
     * Time Complexity: O(N * K)
     * N is the number of strings.
     * K is the maximum length of a string.
     * For each of N strings:
     * - Creating the count array: O(K) (iterating through characters of the string).
     * - Building the key string: O(alphabet_size), which is O(26) or O(1) effectively.
     * Hash map operations (put, get) take O(K) on average if string hashing is O(K),
     * but here the key length is constant (26 characters for counts + 26 delimiters). So O(1) effectively for map ops.
     * Total: N * (K + 26) which simplifies to O(N * K).
     * This is generally faster than the sorting approach for larger K because K log K > K.
     *
     * Space Complexity: O(N * K)
     * Similar to the sorting approach, storing N strings of max length K.
     * The count array takes O(26) space per string, which is constant.
     * The map stores N entries, each with a constant-length key and an original string of length K.
     * Total: O(N * K).
     */
    public List<List<String>> groupAnagramsByCounting(String[] strs) {
        if (strs == null || strs.length == 0) {
            return new ArrayList<>();
        }

        Map<String, List<String>> anagramGroups = new HashMap<>();

        for (String s : strs) {
            // Array to store character counts (a-z)
            int[] charCounts = new int[26]; // 26 for 'a' through 'z'

            // Populate charCounts for the current string
            for (char c : s.toCharArray()) {
                charCounts[c - 'a']++;
            }

            // Build a string representation of the charCounts array to use as a map key
            // Example: "1#0#0#1#0#..." for string "aab" if 'a' appears twice and 'b' once.
            StringBuilder keyBuilder = new StringBuilder();
            for (int count : charCounts) {
                keyBuilder.append(count).append('#'); // Using '#' as a delimiter to avoid ambiguity (e.g., "12" vs "1#2#")
            }
            String key = keyBuilder.toString();

            // Add the original string to the list associated with this count-based key
            anagramGroups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }

        // Return all the lists of anagrams from the map
        return new ArrayList<>(anagramGroups.values());
    }
}

```