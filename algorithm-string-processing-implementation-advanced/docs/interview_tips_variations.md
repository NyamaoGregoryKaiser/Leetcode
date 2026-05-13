```markdown
# Interview Tips and Variations

This document provides general tips for approaching string manipulation problems in coding interviews, along with common variations and follow-up questions for the problems covered in this project.

---

## General Interview Tips for String Manipulation:

1.  **Clarify the Problem:**
    *   **Case Sensitivity:** "Apple" vs "apple".
    *   **Whitespace:** "hello world" vs "helloworld". Should spaces be ignored, counted, or treated specially?
    *   **Character Set:** ASCII, English alphabet (lowercase/uppercase), extended ASCII, Unicode? This influences data structures (e.g., `int[26]` vs `HashMap`).
    *   **Empty/Null Strings:** How should these inputs be handled?
    *   **Output Format:** List of strings, single string, boolean, etc.

2.  **Start with Brute Force (if stuck):**
    *   If the optimal solution isn't immediately obvious, describe a brute-force approach. This shows you can break down the problem and identify sub-problems.
    *   Analyze its complexity. This often highlights bottlenecks that lead to optimizations.

3.  **Think about Optimizations:**
    *   **Sliding Window:** For substring/subsequence problems, especially when looking for minimum/maximum length/count satisfying a condition.
    *   **Two Pointers:** Often used for palindromes, comparing parts of a string, or finding specific patterns.
    *   **Hashing/Frequency Maps/Arrays:** For character counting, checking anagrams, or general character statistics.
    *   **Dynamic Programming:** If optimal substructure and overlapping subproblems are present (e.g., Longest Palindromic Substring).
    *   **Recursion/Backtracking:** For generating all permutations/combinations.
    *   **Pre-computation:** Can you process the string once to build a lookup table that speeds up subsequent operations?

4.  **Data Structures:**
    *   `char[]`: More efficient for in-place modifications than `String` (which are immutable in Java).
    *   `StringBuilder`: For efficient string building.
    *   `HashMap`/`int[]`: For frequency counting.
    *   `Set`: For storing unique elements.
    *   `Stack`: For problems involving parentheses matching, expression evaluation.
    *   `Queue`: For BFS-like string transformations.

5.  **Complexity Analysis:**
    *   Always state the Time and Space Complexity of your proposed solution. Be precise and justify your analysis.
    *   Discuss trade-offs between different approaches (e.g., O(N log N) vs O(N) but O(1) vs O(K) space).

6.  **Walk Through Examples:**
    *   Use small, clear examples to demonstrate your algorithm's logic.
    *   Include edge cases (empty string, single character, all same characters, no match) in your walkthrough.

7.  **Code Structure and Clarity:**
    *   Use meaningful variable names.
    *   Break down complex logic into helper functions.
    *   Add comments for tricky parts.
    *   Handle edge cases explicitly.

---

## Variations and Follow-up Questions for Specific Problems:

### 1. Longest Palindromic Substring

*   **Count all palindromic substrings:**
    *   Instead of just the longest, return the total count. This can be solved with a modified DP approach (each `dp[i][j]=true` contributes 1 to the count) or by modifying the "expand around center" logic to count valid expansions.
*   **Smallest palindromic substring:** Trivial, always 1 (any single character).
*   **Palindromic subsequence:** Unlike substring (contiguous), subsequence elements don't need to be contiguous. This is a different DP problem (Longest Common Subsequence of `s` and `reverse(s)`).
*   **Manacher's Algorithm:** If O(N^2) isn't fast enough, the interviewer might ask for the linear time Manacher's algorithm. This is quite advanced for a typical interview.

### 2. String Permutations

*   **Permutations with unique characters:** Standard backtracking.
*   **Permutations with duplicate characters (return unique permutations):**
    *   As shown, sorting the input and adding a skip condition in backtracking is key.
    *   Follow-up: Explain why sorting and the `!visited[i-1]` condition works to avoid duplicates.
*   **K-permutations:** Generate permutations of length K (not N). Modify the base case and length check.
*   **Combinations vs. Permutations:** Understand the difference. Combinations don't care about order.
*   **Next Lexicographical Permutation:** Given a permutation, find the next one in lexicographical order (e.g., "abc" -> "acb"). Requires a specific algorithm involving finding a pivot and swapping.

### 3. Anagram Checker

*   **Find all anagrams in a string (e.g., LeetCode 438 - Find All Anagrams in a String):**
    *   This is a sliding window problem. Maintain a frequency map for the pattern (`t`) and a frequency map for the current window in `s`. Slide the window, updating counts and checking if the window's character counts match the pattern's.
*   **Group Anagrams (e.g., LeetCode 49):**
    *   Given a list of words, group words that are anagrams of each other.
    *   Solution: Use a `HashMap<String, List<String>>`. For each word, sort it to get a "canonical" form (e.g., "eat" -> "aet"). Use this sorted string as the key in the map, and add the original word to the list value.
*   **Check if two strings are "k-anagrams":**
    *   Two strings are k-anagrams if they can be made anagrams by changing at most k characters in one of the strings. Requires frequency counting and calculating mismatches.

### 4. Minimum Window Substring

*   **Smallest substring containing all *unique* characters:** Instead of counting total characters, count distinct characters. `matchedRequiredChars` would then track how many unique characters from `t` have their frequency met, and the condition would be `matchedRequiredChars == tCounts.size()`.
*   **Find smallest window with K distinct characters:** A variation where `t` is not given, but a number `K` is.
*   **Max/Min window with a property:** Generalize the sliding window pattern for other properties.
*   **Longest substring without repeating characters (LeetCode 3):** Classic sliding window problem.
*   **Longest substring with at most K distinct characters:** Another common sliding window variant.
*   **Implement `strStr()` (KMP Algorithm):** While not strictly a window, it's about finding a pattern in a text efficiently. This is a more advanced string matching algorithm.

---