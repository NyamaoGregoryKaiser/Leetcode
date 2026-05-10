```markdown
# Interview Guide: String Manipulation

This document provides tips, common edge cases, variations, and crucial considerations for tackling string manipulation problems in a coding interview setting.

---

## General Interview Tips for String Problems

1.  **Clarify Constraints and Edge Cases:**
    *   **Empty strings:** `""` is a very common edge case. Does `""` match `""`? Does `""` match `"abc"`? Does `"abc"` match `""`?
    *   **Single character strings:** `s="a", t="a"`.
    *   **Strings with identical characters:** `"aaaaa"`.
    *   **Strings with all unique characters:** `"abcdefg"`.
    *   **Length limits:** `N=1`, `N=10^5`, `N=10^9`. This guides your complexity analysis.
    *   **Character set:** Lowercase English letters, uppercase, alphanumeric, ASCII, Unicode? This affects hash map keys or character array sizes.
    *   **Case sensitivity:** ` "a" ` vs ` "A" ` – typically problems specify. If not, ask!
    *   **Whitespace:** Are spaces significant?
    *   **Order of results:** Does it matter if you return `["a", "b"]` or `["b", "a"]` for a group?

2.  **Start with Brute Force (if applicable):**
    *   Even if not optimal, articulate a brute-force approach. This shows you can break down the problem and establish a baseline.
    *   Analyze its time and space complexity.
    *   This also helps you identify the inefficiencies that an optimized solution needs to address.

3.  **Identify Patterns and Data Structures:**
    *   **Frequency Counting:** If character counts or anagrams are involved, use hash maps (objects in JS) or fixed-size arrays (for ASCII/alphabets).
    *   **Two Pointers / Sliding Window:** For problems involving substrings, contiguous segments, or finding optimal ranges (e.g., Minimum Window Substring, Longest Palindromic Substring's Expand Around Center).
    *   **Dynamic Programming:** For optimal substructure and overlapping subproblems (e.g., Longest Palindromic Substring, Edit Distance).
    *   **Stack:** For matching parentheses, reversing words, or parsing expressions.
    *   **String Hashing (Rabin-Karp) / KMP:** For efficient substring search.
    *   **Trie (Prefix Tree):** For problems involving prefixes, autocomplete, or dictionary searches.

4.  **Visualize with Examples:**
    *   Walk through your logic with small examples (provided in the problem or your own).
    *   Use ASCII diagrams for complex algorithms like KMP's LPS array.

5.  **Talk Through Your Thought Process:**
    *   Explain *why* you choose a certain approach.
    *   Discuss trade-offs (e.g., time vs. space complexity).
    *   Mention alternative approaches you considered and why you discarded them (or why they are valid but less optimal).

6.  **Code Clearly and Modularly:**
    *   Use meaningful variable names.
    *   Add comments for complex logic.
    *   Break down complex algorithms into helper functions (e.g., `computeLPSArray` for KMP).
    *   Test your helper functions separately (mentally or explicitly).

7.  **Test Thoroughly:**
    *   After writing code, test with your identified edge cases.
    *   Consider specific examples that might break your logic (e.g., palindromes like "abacaba" vs "abaaba").

---

## Problem-Specific Interview Tips & Variations

### 1. Longest Palindromic Substring

**Common Gotchas & Edge Cases:**
*   Empty string: Should return `""`.
*   Single character string: Should return the character itself.
*   Strings with no palindromes longer than 1: `s="abc"`, should return "a" (or "b", "c").
*   Strings with all same characters: `s="aaaaa"`, should return "aaaaa".
*   Even vs. odd length palindromes: Ensure your algorithm handles both. Expand around center naturally covers this.

**Variations:**
*   **Count all palindromic substrings:** Modify DP to count `true` entries.
*   **Longest Palindromic Subsequence:** (Different problem, subsequence not substring). This is a classic DP problem typically solved with `dp[i][j]` representing the LPS of `s[i...j]`.
*   **Shortest Palindrome to make S a Palindrome:** Add minimum chars to front of `S` to make it a palindrome. Often related to KMP's LPS array.

### 2. Group Anagrams

**Common Gotchas & Edge Cases:**
*   Empty input array: `[]`.
*   Array with empty strings: `["", ""]`. Should group as `[["", ""]]`.
*   No anagrams: `["a", "b", "c"]`. Should return `[["a"], ["b"], ["c"]]`.
*   All strings are anagrams of each other.

**Variations:**
*   **Check if two strings are anagrams:** Simplest form, just sort and compare or use character counts.
*   **Find all anagrams in a dictionary for a given word.**
*   **Find all starting indices of anagrams of a pattern in a text:** Sliding window variant using character counts.

### 3. KMP String Matching (Implement `strstr`)

**Common Gotchas & Edge Cases:**
*   Empty `needle`: Should typically return 0 (as per standard library behavior).
*   Empty `haystack`: If `needle` is not empty, should return -1.
*   `needle` longer than `haystack`: Should return -1.
*   `haystack` and `needle` are identical.
*   `needle` appears multiple times: KMP finds the *first* occurrence.
*   Pathological cases for brute force: `haystack = "aaaaab"`, `needle = "aaab"`. Brute force is O(NM). KMP is O(N+M). Be ready to explain this difference.

**Variations:**
*   **Find all occurrences:** Instead of just the first.
*   **Rabin-Karp Algorithm:** Another O(N+M) string matching algorithm using hashing. Good to mention as an alternative.
*   **Regular Expression Matching:** Much more complex, often solved with DP.
*   **Longest Common Substring/Subsequence:** Related but distinct problems.

### 4. Minimum Window Substring

**Common Gotchas & Edge Cases:**
*   Empty `t`: Should return `""`.
*   Empty `s`: If `t` is not empty, should return `""`.
*   `s` shorter than `t`: Should return `""`.
*   `t` contains characters not in `s`: Should return `""`.
*   `s` and `t` have single characters: `s="a", t="a" -> "a"`.
*   `t` has duplicate characters: `s="aa", t="a" -> "a"`; `s="ab", t="aa" -> ""`. The character counts must match *frequencies*.
*   Multiple valid windows of the same minimum length: The problem usually asks for the *first* one encountered (or any). Sliding window naturally finds the first.

**Variations:**
*   **Longest Substring without Repeating Characters:** A simpler sliding window problem.
*   **Longest Substring with K Distinct Characters:** Another sliding window variant.
*   **Smallest Substring Containing All `unique` Characters of `T`:** If duplicates in `T` don't matter.
*   **Finding `K` closest elements:** Not string-related, but sliding window concept.

---

Remember to practice these problems actively, not just passively read the solutions. Try to implement them from scratch and explain your reasoning out loud. Good luck!
```