```markdown
# Interview Guide: String Manipulation

This guide provides tips for approaching string manipulation problems in coding interviews, common pitfalls, and follow-up questions for the problems in this project.

## General Interview Tips

1.  **Clarify the Problem:** Always start by asking clarifying questions.
    *   What are the constraints on the input string length? (e.g., empty, very long)
    *   What characters are allowed? (e.g., lowercase English, uppercase, digits, spaces, special characters, Unicode)
    *   Is it case-sensitive?
    *   Are there any performance requirements (time/space limits)?
    *   What should happen for edge cases (empty string, single character string)?

2.  **Think Out Loud (TL;DR: Talk):** Verbalize your thought process. Interviewers want to understand *how* you think.
    *   Explain your initial brute-force ideas.
    *   Discuss why they might be inefficient.
    *   Brainstorm optimizations and explain your chosen approach.
    *   Walk through an example with your chosen approach.

3.  **Example Test Cases:** Work through a small example (provided by the interviewer or self-generated) step-by-step using your algorithm. This helps catch logic errors early. Also consider edge cases (empty, single char, all same, all unique).

4.  **Complexity Analysis:** After outlining your solution, state the time and space complexity. Justify your analysis. This is crucial.

5.  **Code Structure and Readability:**
    *   Use meaningful variable names.
    *   Break down complex logic into helper functions.
    *   Add comments for tricky parts, but don't over-comment obvious code.
    *   Handle edge cases explicitly.

6.  **Testing Your Code:** After writing the code, "dry run" it with your example cases. Think about:
    *   Does it work for the happy path?
    *   Does it handle edge cases (empty, single character)?
    *   Does it handle constraints (max length, specific character sets)?

7.  **Be Open to Feedback:** If the interviewer gives a hint or suggests an alternative, engage with it. They might be guiding you to a more optimal solution or testing your collaborative skills.

## Common String Manipulation Techniques

*   **Two Pointers:** Ideal for palindrome checks, reversing strings, or finding pairs.
*   **Sliding Window:** Perfect for finding longest/shortest substrings/subarrays that meet a certain condition (e.g., unique characters, fixed sum).
*   **Hash Maps/Sets:** Efficiently store and retrieve character frequencies, last seen indices, or track unique characters in a window.
*   **Sorting:** Useful for canonicalizing strings (e.g., anagrams).
*   **String Builder (Array.join):** For languages like JavaScript, building an array of characters/substrings and then `join`ing them at the end is often more efficient than repeated string concatenation.

## Problem-Specific Interview Tips & Variations

### 1. Valid Palindrome II

*   **Initial Thought:** What if I generate all `N` possible strings by deleting one character, and then check each for palindrome?
    *   **Discuss:** This is `O(N)` strings. Each check is `O(N)`. Total `O(N^2)`. Not optimal.
*   **Key Insight:** The `two-pointer` approach quickly identifies the *first* mismatch. Since we only have one "skip" budget, that mismatch is the only place we can use it.
*   **Communication:** Clearly explain the "fork in the road" logic when a mismatch occurs (`isPalindromeRange(s, left+1, right) || isPalindromeRange(s, left, right-1)`). This is the core of the solution.
*   **Edge Cases:** Empty string, single char, already a palindrome (no deletion needed).
*   **Follow-up Questions/Variations:**
    *   "What if you can delete `k` characters?" (This makes it much harder, likely dynamic programming `O(N*K)` or `O(N^2)`).
    *   "What if the string contains non-alphanumeric characters and case should be ignored?" (Standard palindrome pre-processing: filter, convert to lowercase).
    *   "Find the *longest* palindromic substring by deleting at most `k` characters." (More complex DP).

### 2. Group Anagrams

*   **Initial Thought:** How do I identify anagrams? Sorting. Sort each string and use it as a map key.
    *   **Discuss:** This is a valid and commonly accepted solution. `O(N * K log K)`.
*   **Key Insight (for optimal):** Character counts are an alternative canonical form. Generating a character count array (and then a string key) avoids the `log K` factor of sorting.
*   **Communication:** Explain why character counts work as a key. Discuss the trade-offs between sorting and character counting for key generation. Character count is often preferred for performance.
*   **Edge Cases:** Empty string array, array with empty strings, single character strings, no anagrams.
*   **Follow-up Questions/Variations:**
    *   "What if the strings contain Unicode characters?" (Character counting array for 26 letters won't work. A `Map<char, count>` or `Intl.Segmenter` might be needed, or a hash of the char counts).
    *   "What if it's case-insensitive?" (Convert all strings to lowercase before processing).
    *   "Return `true` if two given strings are anagrams." (Simpler problem, apply char count or sort directly to two strings).

### 3. Longest Substring Without Repeating Characters

*   **Initial Thought:** Brute-force: check every possible substring. For each substring, check if it has unique characters.
    *   **Discuss:** `O(N^2)` substrings. Checking uniqueness is `O(K)` where `K` is substring length (using a Set). Total `O(N^3)`. Inefficient.
*   **Key Insight:** The "Sliding Window" is the optimal pattern. When a character repeats, we don't need to restart the window from scratch. We can smartly move the `left` pointer.
*   **Data Structure Choice:** A `Map<char, index>` is crucial here because we need to know *where* the repeating character last appeared to move `left` correctly. A `Set<char>` would only tell us *if* it repeated, not where.
*   **Communication:** Clearly explain how `left` and `right` pointers work and the role of the `charIndexMap`. Walk through an example to show `left` moving.
*   **Edge Cases:** Empty string, single char, string with all same chars, string with all unique chars.
*   **Follow-up Questions/Variations:**
    *   "What if we need the actual substring, not just its length?" (Store the start/end indices or substring itself when `maxLength` is updated).
    *   "Longest substring with at most `k` distinct characters." (Similar sliding window, but track character counts in window and shrink when count exceeds `k`).
    *   "Longest substring with `k` repeating characters" (different problem, not sliding window).

### 4. String Compression

*   **Initial Thought:** Iterate and build the new string using `+=`.
    *   **Discuss:** While functionally correct, repeated `+=` can be `O(N^2)` in some JavaScript engine implementations due to string immutability. An array-based approach is generally safer for performance.
*   **Key Insight:** Iterative counting of consecutive characters. Don't forget the comparison with the original string's length.
*   **Implementation Detail:** Using `(string | number)[]` and then `join('')` is a good practice for string building in TypeScript/JavaScript.
*   **Edge Cases:** Empty string, single char, string of two same chars (compression `a2` has same length as `aa`), string with no repetitions (compressed `a1b1c1` is longer).
*   **Follow-up Questions/Variations:**
    *   "What if the counts can be very large (e.g., 'a' repeated 1000 times)?" (The current `count.toString()` handles this fine).
    *   "What if the string contains numbers or special characters?" (The current logic using `s[i]` and `count` works universally).
    *   "Implement the *decompression* algorithm." (Reverse logic, parse number after character).
    *   "Design a more advanced compression algorithm (e.g., LZW, Huffman coding)." (Much more complex, usually a separate discussion).

Remember to practice these problems, understand the underlying patterns, and articulate your solutions clearly!
```