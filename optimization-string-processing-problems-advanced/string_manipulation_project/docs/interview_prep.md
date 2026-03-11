# Interview Preparation: String Manipulation

String manipulation is a very common topic in coding interviews. It tests your understanding of basic data structures, algorithms, edge cases, and sometimes language-specific string behaviors.

## General Strategies for String Problems

1.  **Clarify the Problem:**
    *   **Character Set:** What characters are allowed? (ASCII, Unicode, lowercase, uppercase, digits, special characters, spaces?)
    *   **Case Sensitivity:** Is `a` different from `A`?
    *   **Whitespace:** How should leading/trailing/internal whitespace be handled?
    *   **Empty String:** What should the function return for an empty string (`""`) or `null`?
    *   **Input Constraints:** Max length? Smallest length?
    *   **Definition:** Understand precise definitions (e.g., "substring" vs. "subsequence", "palindrome").
    *   **Output Format:** List of lists, string, boolean? Any specific ordering?

2.  **Brainstorm Approaches:**
    *   **Brute Force:** Start with the simplest, most obvious (often inefficient) solution. This helps clarify understanding and define a baseline.
    *   **Two Pointers:** Many string problems involve moving two pointers (left/right) towards each other or in the same direction. (e.g., palindromes, reversing, substring search).
    *   **Sliding Window:** For problems involving contiguous substrings or ranges with certain properties (e.g., longest substring with K distinct characters).
    *   **Hash Maps/Sets:** Efficiently store and retrieve character counts, frequencies, or seen substrings/characters. (e.g., anagrams, unique characters, first non-repeating character).
    *   **Stacks:** For problems involving balanced parentheses, expression evaluation, or parsing (e.g., `isValidParentheses`).
    *   **Dynamic Programming (DP):** When optimal substructure and overlapping subproblems exist (e.g., Longest Palindromic Substring, Edit Distance).
    *   **Greedy Algorithms:** When making locally optimal choices leads to a globally optimal solution.
    *   **Tries (Prefix Trees):** For problems involving searching for prefixes, autocomplete, or dictionaries.
    *   **String Algorithms:** KMP, Rabin-Karp for pattern matching (less common in general interviews, but good to know). Manacher's for LPS.

3.  **Optimize (Time & Space):**
    *   After a brute-force or initial solution, identify bottlenecks.
    *   Can you use a data structure to speed up lookups/updates? (Hash map, set, stack).
    *   Can you avoid recomputing results? (DP, memoization).
    *   Can you reduce nested loops? (Two pointers, sliding window).
    *   Consider space-time tradeoffs.
    *   Ask if in-place modification is allowed/required.

4.  **Edge Cases and Gotchas (Always Test These!):**
    *   **Empty string:** `""`
    *   **Single character string:** `"a"`
    *   **Strings with all same characters:** `"aaaaa"`
    *   **Strings with all distinct characters:** `"abcde"`
    *   **Maximum length strings:** What happens when `N` is large?
    *   **Strings with special characters/numbers:** If allowed by constraints.
    *   **Unicode characters:** Python handles these well, but other languages might require special care.
    *   **Integer Overflow:** For `atoi`-like problems.
    *   **Off-by-one errors:** Especially with array/string slicing or pointer movements.

5.  **Communicate Your Thoughts:**
    *   **State your understanding:** Rephrase the problem in your own words.
    *   **Ask clarifying questions:** Refer to point 1.
    *   **Outline your approach:** Explain the high-level idea first.
    *   **Discuss tradeoffs:** Explain why you chose one algorithm over another (time vs. space).
    *   **Walk through an example:** Trace your algorithm with a small input.
    *   **Write clean code:** Use meaningful variable names, add comments for complex logic.
    *   **Test your code:** Mentally (or on whiteboard) run through edge cases.

## Interview Tips & Common Variations

### General Tips:

*   **Practice string methods:** Be familiar with common string operations in your chosen language (e.g., `len()`, `str.split()`, `str.join()`, `str.strip()`, `str.replace()`, `str.find()`, `str[::-1]` for reversing).
*   **Python Specifics:** Strings are immutable. Any modification creates a new string. For frequent modifications, convert to a `list` of characters, modify, then `"".join()` back to a string.
*   **Character Ordinal Values:** `ord(char)` and `chr(int)` are useful for mapping characters to/from integer values (e.g., for frequency arrays, `ord('a')` is 97).
*   **Modulus Operator for Fixed-Size Hashes:** For character counts, using `char_code % 26` can be an alternative if not using `ord('a')`.

### Problem Variations:

*   **Palindromes:**
    *   Check if a string/number is a palindrome.
    *   Longest palindromic *subsequence*.
    *   Palindrome Permutation (can a string be rearranged to form a palindrome?).
    *   Valid Palindrome II (allow one character deletion).
*   **Anagrams:**
    *   Check if two strings are anagrams.
    *   Find all anagrams in a string (substring search).
*   **Substrings / Subsequences:**
    *   Longest common substring/subsequence.
    *   Smallest window substring.
    *   Count occurrences of a substring.
    *   Distinct substrings.
*   **Reversal:**
    *   Reverse a string.
    *   Reverse words in a sentence.
    *   Reverse specific parts of a string.
*   **Parsing / Formatting:**
    *   `atoi` (String to Integer).
    *   Integer to Roman, Roman to Integer.
    *   Validate IP addresses, email formats, etc.
*   **Unique Characters / Frequencies:**
    *   First unique character.
    *   String contains all unique characters.
    *   Most frequent character.
*   **Parentheses / Brackets:**
    *   Generate all valid parentheses.
    *   Minimum additions to make parentheses valid.
    *   Longest valid parentheses substring.
*   **Compression / Encoding:**
    *   Run-length encoding.
    *   URLify (replace spaces with %20).

## Memory-Efficient String Handling

While `O(1)` space is often the goal, for string problems, this might mean *not* creating auxiliary data structures that scale with `N` (like another copy of the string or an `N x N` DP table).

*   **In-place modifications:** If allowed by the language (e.g., C++ `char[]`), try to modify the string directly to save space. In Python, strings are immutable, so this usually means converting to a list of characters first.
*   **Two pointers:** Often inherently space-efficient as they only use a few variables.
*   **`O(N)` vs. `O(N^2)` DP:** For problems like LPS, a 2D DP table is `O(N^2)`. Sometimes, a 1D DP table or clever indexing can reduce space. However, `O(N)` auxiliary space for a string problem of length `N` is generally acceptable (e.g., a stack, a hash map where keys/values are chars).
*   **Character counting arrays:** Using fixed-size arrays (e.g., `[0]*26` for English alphabet) is `O(1)` space, as the size doesn't depend on input string length `N`.

Always consider the memory constraints explicitly mentioned by the interviewer. If not specified, prioritizing `O(1)` auxiliary space for competitive programming is good, but `O(N)` is often fine in interviews.

By keeping these strategies and considerations in mind, you'll be well-equipped to tackle a wide range of string manipulation problems effectively during your interviews.
---