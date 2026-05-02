```markdown
# String Manipulation Interview Tips

String manipulation is a fundamental topic in coding interviews. It tests your ability to handle various data structures, algorithms, and edge cases. This document provides general tips, common pitfalls, and variations for string problems.

---

## General Interview Strategies

1.  **Clarify the Problem:** Don't assume anything. Ask questions about:
    *   **Input Constraints:**
        *   String length (empty, single character, very long).
        *   Character set (ASCII, Unicode, lowercase English, alphanumeric, specific symbols).
        *   Case sensitivity.
        *   Presence of whitespace.
        *   Validity of input (e.g., is `s` always a valid integer for atoi?).
    *   **Output Requirements:** Format, order of elements (if multiple solutions).
    *   **Performance:** Time and space complexity expectations.
2.  **Start with a Brute Force (if applicable):**
    *   Describe a naive solution. This shows you understand the problem.
    *   Analyze its complexity. This often leads to identifying bottlenecks.
3.  **Optimize Iteratively:**
    *   Look for redundancies in brute force.
    *   Consider common optimization techniques:
        *   **Two Pointers:** For problems involving substrings, palindromes, or ordered processing.
        *   **Sliding Window:** For finding optimal substrings/subarrays.
        *   **Hash Maps/Sets:** For frequency counts, unique elements, or faster lookups.
        *   **Dynamic Programming:** For problems with overlapping subproblems and optimal substructure (e.g., palindromes, subsequences).
        *   **Prefix/Suffix Arrays:** Precomputing values to speed up queries.
        *   **Greedy Algorithms:** When local optimal choices lead to a global optimum.
4.  **Consider Edge Cases Early:** Think about them during design, not just at the end.
    *   Empty strings: `""`
    *   Single-character strings: `"a"`
    *   Strings with all identical characters: `"aaaaa"`
    *   Strings with mixed characters, special characters, numbers.
    *   Extremely long strings (for complexity analysis).
    *   Strings with leading/trailing spaces.
    *   Null input (though less common in C++ with `std::string`).
5.  **Talk Through Your Solution:** Explain your thought process, choices, and why you believe your optimized solution works.
6.  **Write Clean, Readable Code:**
    *   Meaningful variable names.
    *   Appropriate comments (for complex logic, not obvious lines).
    *   Break down complex logic into helper functions.
7.  **Test Your Code:** Walk through your solution with a few example inputs, including edge cases.
    *   "What if the input is empty?"
    *   "What if it's very long?"
    *   "What if it has special characters?"
8.  **Time and Space Complexity Analysis:** Always be prepared to discuss these.
    *   State worst-case scenarios.
    *   Justify your analysis.

---

## Common Pitfalls and Gotchas

*   **Off-by-one Errors:** Extremely common with string indices and lengths. Pay attention to inclusive/exclusive ranges (`s.substr(start, length)` vs `s[i...j]`).
*   **Character Encoding:** Assuming ASCII when Unicode might be present. For most interview problems, ASCII is implied unless specified.
*   **Case Sensitivity:** "Abc" is not an anagram of "abc" unless case-insensitivity is specified.
*   **Modifying Strings In-Place:** Be careful if the problem statement implies immutability or if modifying the original string has side effects. C++ `std::string` copies on modification by value.
*   **Integer Overflow (atoi):** This is a classic trap. Always check before performing arithmetic operations that could lead to overflow.
*   **Hash Function Quality:** For `std::unordered_map` with custom keys (like `std::array`), a good hash function is crucial for `O(1)` average-case performance. A bad hash can lead to `O(N)` worst-case.
*   **Infinite Loops:** Especially in sliding window or two-pointer problems, ensure your pointers always move towards termination.

---

## Interview Tips and Variations by Problem

### 1. Longest Palindromic Substring

*   **Variations:**
    *   Find all palindromic substrings.
    *   Find the longest palindromic *subsequence* (characters don't have to be contiguous, DP is more common here).
    *   Given a string, find the minimum cuts to partition it into palindromic substrings.
*   **Tips:**
    *   The "Expand Around Center" is generally preferred for its `O(1)` space complexity over DP's `O(N^2)`.
    *   Manacher's algorithm exists for `O(N)` time, but it's very complex and rarely expected unless specifically hinted. Mentioning it is good.
    *   Always test with single-character, two-character, all-same-character, and mixed odd/even length palindromes.

### 2. Minimum Window Substring

*   **Variations:**
    *   Smallest window containing all unique characters of `T`.
    *   Smallest window containing `K` distinct characters.
    *   Find substrings that are permutations of `T`.
*   **Tips:**
    *   The sliding window approach is key. Mastering the `formed` counter (or similar logic) and how to shrink the window is crucial.
    *   Use two hash maps (one for `t`'s requirements, one for the current window's counts) or a single map with negative counts.
    *   Remember to handle cases where `T` has duplicate characters (e.g., `s="aa", t="aaa"` should return `""`).

### 3. String to Integer (atoi)

*   **Variations:**
    *   Convert binary/hex string to integer.
    *   Convert integer to string.
    *   Validate if a string represents a valid number (e.g., only digits, one decimal point, optional sign).
*   **Tips:**
    *   This problem is a test of meticulousness and edge-case handling.
    *   The overflow check logic is the most challenging part; memorize or derive it carefully.
    *   Use `long long` for `result` during calculation to safely detect overflow before clamping.
    *   Break down the problem into distinct phases (whitespace, sign, digits).

### 4. Group Anagrams

*   **Variations:**
    *   Group words that are *not* anagrams (complement problem).
    *   Find if two strings are anagrams.
    *   Count anagrams in a text.
*   **Tips:**
    *   The core idea is to find a canonical representation for each anagram group. Sorted string and frequency array are the two primary methods.
    *   Frequency array is often more efficient for small, fixed alphabets (like 26 lowercase English letters), as it avoids `O(L log L)` sorting per string.
    *   When using `std::unordered_map` with a custom key type like `std::array<int, 26>`, remember to provide a custom hash function (e.g., `ArrayHasher` as implemented in this project). If you forget or use `std::map` instead, discuss the performance implications.

---
```