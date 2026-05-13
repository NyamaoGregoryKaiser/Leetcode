```java
package com.example.stringmanipulation.problems;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Problem: String Permutations
 * Given a string s, return all possible distinct permutations of the string.
 */
public class StringPermutations {

    /**
     * Approach 1: Recursive Backtracking (using a visited array and character list)
     * This approach builds permutations character by character.
     * Uses a boolean array `visited` to track characters already used in the current permutation.
     *
     * Time Complexity: O(N * N!)
     *   - N! permutations.
     *   - For each permutation, building the string/list takes O(N) time.
     * Space Complexity: O(N) for recursion stack and `visited` array, plus O(N!) for storing results.
     *   - Note: If input has duplicates and distinct permutations are required, using a Set for the final
     *     result will add overhead but ensure distinctness. If the input string itself is guaranteed
     *     to have unique characters, then a List is sufficient.
     *
     * @param s The input string.
     * @return A list of all distinct permutations.
     */
    public List<String> permuteUniqueChars(String s) {
        List<String> result = new ArrayList<>();
        if (s == null || s.isEmpty()) {
            if (s != null) result.add(""); // Add empty string for empty input, depending on spec
            return result;
        }

        char[] chars = s.toCharArray();
        boolean[] visited = new boolean[chars.length];
        StringBuilder currentPermutation = new StringBuilder();

        backtrack(chars, visited, currentPermutation, result);
        return result;
    }

    private void backtrack(char[] chars, boolean[] visited, StringBuilder currentPermutation, List<String> result) {
        // Base case: If current permutation length equals original string length, add to result.
        if (currentPermutation.length() == chars.length) {
            result.add(currentPermutation.toString());
            return;
        }

        // Iterate through all characters
        for (int i = 0; i < chars.length; i++) {
            // If character at index i has not been visited
            if (!visited[i]) {
                visited[i] = true; // Mark as visited
                currentPermutation.append(chars[i]); // Add to current permutation

                backtrack(chars, visited, currentPermutation, result); // Recurse

                // Backtrack: Remove character and unmark visited
                currentPermutation.deleteCharAt(currentPermutation.length() - 1);
                visited[i] = false;
            }
        }
    }

    /**
     * Approach 2: Recursive Backtracking (using swapping)
     * This approach generates permutations by swapping characters.
     * It performs in-place modifications on a character array.
     * For handling duplicates in the input string, we need to use a Set for the final result
     * or add an explicit check to avoid redundant recursive calls.
     *
     * Time Complexity: O(N * N!)
     *   - N! permutations.
     *   - For each permutation, string creation takes O(N).
     * Space Complexity: O(N) for recursion stack, plus O(N!) for storing results (Set might use more).
     *
     * @param s The input string.
     * @return A list of all distinct permutations.
     */
    public List<String> permuteWithDuplicates(String s) {
        Set<String> result = new HashSet<>(); // Use a Set to handle distinct permutations
        if (s == null || s.isEmpty()) {
            if (s != null) result.add("");
            return new ArrayList<>(result);
        }

        char[] chars = s.toCharArray();
        permuteSwap(chars, 0, result);
        return new ArrayList<>(result);
    }

    private void permuteSwap(char[] chars, int index, Set<String> result) {
        // Base case: If index reaches end of array, a permutation is formed
        if (index == chars.length - 1) {
            result.add(new String(chars));
            return;
        }

        // Recurse for each possible character at the current index
        for (int i = index; i < chars.length; i++) {
            // Optimize: If characters are identical, swapping them creates a redundant branch
            // This check (and the sort below) can help avoid duplicate permutations in a more efficient way
            // than just relying on a Set, but requires the input chars array to be sorted initially.
            // For a general implementation relying on Set, this specific optimization isn't strictly necessary.
            // if (i != index && chars[i] == chars[index]) continue; // This needs careful placement & context

            StringManipulationUtils.swap(chars, index, i); // Swap current char with char at index i
            permuteSwap(chars, index + 1, result);          // Recurse for the next index
            StringManipulationUtils.swap(chars, index, i); // Backtrack: swap back to restore original order
        }
    }

    /**
     * Approach 3: Recursive Backtracking (optimized for distinct permutations with duplicates in input)
     * This method correctly handles duplicate characters in the input string to generate only unique permutations
     * without relying on a `HashSet` for the final result (which is less efficient if many duplicates).
     * It requires sorting the input array first and then skipping duplicate characters in the recursion.
     *
     * Time Complexity: O(N * N!) (worst-case, but better for inputs with many duplicates than Approach 2 without optimization)
     * Space Complexity: O(N) for recursion stack + O(N!) for storing results.
     *
     * @param s The input string.
     * @return A list of all unique permutations.
     */
    public List<String> permuteOptimizedDistinct(String s) {
        List<String> result = new ArrayList<>();
        if (s == null || s.isEmpty()) {
            if (s != null) result.add("");
            return result;
        }

        char[] chars = s.toCharArray();
        Arrays.sort(chars); // Sort the characters to handle duplicates efficiently
        boolean[] visited = new boolean[chars.length];
        StringBuilder currentPermutation = new StringBuilder();

        backtrackOptimizedDistinct(chars, visited, currentPermutation, result);
        return result;
    }

    private void backtrackOptimizedDistinct(char[] chars, boolean[] visited, StringBuilder currentPermutation, List<String> result) {
        if (currentPermutation.length() == chars.length) {
            result.add(currentPermutation.toString());
            return;
        }

        for (int i = 0; i < chars.length; i++) {
            if (visited[i]) {
                continue; // Skip if already used
            }

            // This is the key optimization for handling duplicates:
            // If the current character is the same as the previous one,
            // AND the previous one has not been used (meaning it was part of a previous recursive branch
            // that completed or was skipped), then skipping the current one avoids duplicate permutations.
            // Example: "aab"
            // - first 'a' (index 0) is taken
            // - second 'a' (index 1) can be taken
            // - If first 'a' (index 0) is skipped, then the second 'a' (index 1) should be considered.
            //   This means `!visited[i-1]` must be true for the current char `chars[i]` to be skipped
            //   if `chars[i] == chars[i-1]`.
            if (i > 0 && chars[i] == chars[i - 1] && !visited[i - 1]) {
                continue;
            }

            visited[i] = true;
            currentPermutation.append(chars[i]);
            backtrackOptimizedDistinct(chars, visited, currentPermutation, result);
            currentPermutation.deleteCharAt(currentPermutation.length() - 1);
            visited[i] = false;
        }
    }
}
```