```markdown
# Interview Tips & Problem Variations for String Manipulation

This document provides general advice for tackling string manipulation problems in coding interviews, along with common variations and follow-up questions for the problems implemented in this project.

## General Interview Tips for String Manipulation

1.  **Clarify the Problem & Constraints:**
    *   **Character Set:** ASCII? Unicode? Only lowercase/uppercase letters? Digits? Special characters? This impacts data structures (e.g., `int[26]` vs `HashMap<Character, Integer>`).
    *   **Case Sensitivity:** Is "a" the same as "A"? What if it needs to be ignored? (e.g., `s.toLowerCase()`).
    *   **Whitespace:** Should it be ignored, treated as a delimiter, or processed?
    *   **Null/Empty Strings:** How should these be handled? Usually, return `""` or `0`, but confirm.
    *   **Length Constraints:** `N=10^5` suggests O(N) or O(N log N). `N=1000` might allow O(N^2). `N=20` could even permit O(N!).
    *   **Duplicates:** Are duplicate characters important (e.g., for anagrams or counting)?

2.  **Start with Brute Force (if stuck):**
    *   If the optimal solution isn't immediately obvious, explain a straightforward, possibly inefficient, solution first. This demonstrates you can at least solve the problem.
    *   Then, discuss its shortcomings (time/space complexity) and brainstorm ways to optimize.

3.  **Identify Common String Patterns & Techniques:**
    *   **Two Pointers:**
        *   Often used for palindromes (one from start, one from end).
        *   Reversing a string/array in-place.
        *   Finding pairs (e.g., `s.indexOf(char, startIndex)`).
        *   Sliding Window (see below).
    *   **Sliding Window:**
        *   For problems involving finding a substring/subarray that meets certain criteria (e.g., shortest, longest, contains X unique characters).
        *   Typically involves a `left` and `right` pointer, and a frequency map/array to track elements in the window.
    *   **Hash Maps / Frequency Arrays:**
        *   Counting character occurrences.
        *   Checking for anagrams (e.g., frequency maps must be identical).
        *   Storing unique patterns or "canonical forms" (e.g., sorted string for anagrams).
    *   **Sorting:**
        *   Converting a string to a `char[]` and sorting it is a common way to create a "canonical form" for anagrams.
    *   **Dynamic Programming (DP):**
        *   When problems have optimal substructure and overlapping subproblems (e.g., Longest Palindromic Substring, Longest Common Subsequence).
        *   Often involves a 2D `dp` table.
    *   **String Builder / `char[]` for Modification:**
        *   Java strings are immutable. For frequent modifications (insertions, deletions, replacements), convert to `char[]` or use `StringBuilder` for efficiency.

4.  **Practice Edge Cases:**
    *   `null` string, empty string (`""`).
    *   String with a single character.
    *   String with all identical characters (`"aaaaa"`).
    *   String with all distinct characters (`"abcde"`).
    *   Strings that nearly hit maximum/minimum constraints (e.g., `INT_MAX`, `INT_MIN`).
    *   Strings with leading/trailing spaces, special characters, mixed case.

5.  **Think About Complexity:**
    *   Always state and justify the time and space complexity of your solution.
    *   Discuss trade-offs (e.g., more space for faster time).
    *   Be prepared to optimize if your initial solution is too slow for the given constraints.

6.  **Communicate Effectively:**
    *   **Think Aloud:** Explain your thought process, even when you're exploring options or making mistakes.
    *   **Walkthrough:** Trace your algorithm with an example, especially an edge case.
    *   **Ask Clarifying Questions:** Don't assume anything.

## Problem Variations & Follow-ups

### 1. Longest Palindromic Substring

*   **Variations:**
    *   **Longest Palindromic *Subsequence*:** Characters don't need to be contiguous. This is a classic DP problem (e.g., using `LCS(s, reverse(s))`).
    *   **Count Palindromic Substrings/Subsequences:** Instead of just the longest, return the total count. (Can be adapted from DP approach or Expand Around Center).
    *   **Given K deletions, make string a palindrome:** More advanced DP or greedy approaches.
    *   **Shortest Palindrome (prepend chars to make it palindrome):** Find the longest palindromic suffix, then reverse the prefix before that suffix and append.
*   **Interview Questions:**
    *   "Why is your chosen approach better than another?" (e.g., O(1) space of Expand Around Center vs O(N^2) space of DP).
    *   "What if the string contains special characters or is case-insensitive?" (e.g., preprocessing string, like `s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase()`).
    *   "Can you optimize the DP space complexity?" (Rarely possible for standard LPS, but good question).

### 2. Minimum Window Substring

*   **Variations:**
    *   **Longest Substring without Repeating Characters:** Classic sliding window problem.
    *   **Longest Substring with At Most K Distinct Characters:** Another sliding window variant.
    *   **Find All Anagrams in a String:** Sliding window, where the window size is fixed to `t.length()`, and you check if the window is an anagram of `t`.
    *   **Smallest Substring of All Characters:** Similar logic, but `t` implies a set of characters that must be present, rather than a specific string `t`.
*   **Interview Questions:**
    *   "What if `t` contains duplicates?" (Handled by frequency maps).
    *   "What if the character set is much larger (Unicode)?" (Using `HashMap` instead of `int[]`).
    *   "Can you adapt this to find the *maximum* window that *doesn't* contain `t`?" (Inverse problem).
    *   "Explain the 'contraction' step (left pointer movement) thoroughly."

### 3. Group Anagrams

*   **Variations:**
    *   **Check if Two Strings are Anagrams:** Direct comparison of sorted forms or frequency maps.
    *   **Find all anagrams of a given pattern in a text:** Combines anagram checking with sliding window.
    *   **Count pairs of anagrams in an array:** Use the grouping method, then sum `(count * (count-1))/2` for each group.
*   **Interview Questions:**
    *   "Compare the performance of sorting vs. character counting for keys." (Discuss O(NK log K) vs O(NK)).
    *   "What if the strings contain Unicode characters?" (Counting array won't work easily, `HashMap<Character, Integer>` for frequencies or full string sorting would be needed).
    *   "What if the strings can have different lengths?" (By definition, anagrams must have the same length; clarify this if needed).

### 4. String to Integer (atoi)

*   **Variations:**
    *   **Integer to Roman / Roman to Integer:** Number system conversion.
    *   **Integer to String:** Reverse of `atoi`.
    *   **Parse a complex number format:** E.g., scientific notation, fractions.
    *   **Validate IP Address / Phone Number:** String parsing and validation.
*   **Interview Questions:**
    *   "Walk through your overflow checks with `Integer.MAX_VALUE` and `Integer.MIN_VALUE` examples." (Very common and critical).
    *   "What data type would you use for `total` if it were for 64-bit integers (`long`)?" (Need `Long.MAX_VALUE` and `Long.MIN_VALUE` checks, which still involves similar logic).
    *   "How would you handle leading/trailing non-numeric characters if they shouldn't just result in `0` or truncation, but an error?" (Throws an exception or returns a special error code).
    *   "Can you do this without using `long` intermediate storage?" (More complex integer-only overflow checks needed).

By thoroughly understanding these problems, their solutions, and common variations, you'll be well-prepared for a wide range of string manipulation challenges in coding interviews. Good luck!
```