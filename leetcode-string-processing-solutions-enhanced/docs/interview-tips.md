```markdown
# 💡 Interview Tips and Variations for String Manipulation Problems

Mastering string manipulation is crucial for coding interviews. This document provides general advice, common pitfalls, and variations for the problems covered in this project.

---

## General Interview Tips for String Problems

1.  **Clarify Requirements:**
    *   **Case Sensitivity:** "Is 'Racecar' a palindrome if 'R' != 'r'?" (Usually not, but confirm).
    *   **Special Characters:** "Should spaces, punctuation, or numbers be ignored?" (Typically ignored for palindromes, but confirm).
    *   **Encoding:** "What character set is used (ASCII, Unicode)? Are emojis possible?" (Less common but important for length/char comparisons).
    *   **Empty/Null Input:** "What to return for an empty string or null input?"
    *   **Constraints:** "What are the maximum lengths of strings, or number of strings in an array?" (This heavily influences complexity choices).

2.  **Think of Edge Cases First:**
    *   Empty string (`""`)
    *   Single character string (`"a"`)
    *   String with all same characters (`"aaaaa"`)
    *   String with only special characters (`"!@#$"`)
    *   Very long strings
    *   Strings at the boundaries of constraints (e.g., max length, max number of strings).

3.  **Choosing the Right Data Structure/Algorithm:**
    *   **Two Pointers:** Excellent for problems involving symmetrical checks (palindromes), finding subsegments, or in-place modifications.
    *   **Hash Maps/Sets:** Ideal for frequency counts (anagrams), uniqueness checks, or fast lookups.
    *   **Stack:** Useful for parsing nested structures (e.g., balanced parentheses, decode string), processing reverse order operations.
    *   **Recursion:** Can elegantly solve naturally recursive problems like nested structures. Be mindful of stack depth.
    *   **Sorting:** Often used to normalize strings (e.g., sorting characters for anagrams) to create canonical keys.
    *   **Sliding Window:** For finding substrings with certain properties.

4.  **Immutable Strings in JavaScript:**
    *   Remember that strings in JavaScript are immutable. Operations like `str[i] = 'x'` or `str.toLowerCase()` create *new* strings.
    *   For performance-critical scenarios where many modifications are needed, consider converting to an array of characters (`str.split('')`), performing operations, and then `join('')` at the end. Or, use string builders if available in other languages.

5.  **Complexity Analysis:**
    *   Always state and justify your Time and Space Complexity.
    *   Be specific about what `N` and `K` represent (e.g., `N` = number of strings, `K` = max string length).
    *   Mention auxiliary space vs. total space.

6.  **Code Structure and Readability:**
    *   Use meaningful variable names.
    *   Break down complex logic into helper functions.
    *   Add comments for non-obvious parts.

---

## Problem-Specific Interview Tips & Variations

### 1. Palindrome Checker (`isPalindrome`)

**Common Pitfalls:**
*   Forgetting to handle case-insensitivity.
*   Forgetting to filter non-alphanumeric characters.
*   Off-by-one errors with pointers.
*   Assuming `s.length` is always > 0.

**Follow-up Questions/Variations:**

1.  **Count Palindromic Substrings:** Given a string, count how many palindromic substrings it has. (This often uses a "expand around center" approach).
2.  **Longest Palindromic Substring:** Find the longest palindromic substring in a given string. (Can use expand around center, dynamic programming, or Manacher's algorithm).
3.  **Minimum Deletions/Insertions to Make a Palindrome:** How many characters need to be deleted or inserted to make a string a palindrome? (Dynamic Programming).
4.  **Palindrome Permutation:** Given a string, determine if a permutation of the string could form a palindrome. (Check character frequencies: at most one character can have an odd count).
5.  **Smallest Palindrome by Appending:** Given a string, find the shortest palindrome by adding characters to the end.

### 2. Longest Common Prefix (`longestCommonPrefix`)

**Common Pitfalls:**
*   Handling empty array or array with empty strings.
*   Off-by-one errors when slicing substrings.
*   Not considering the shortest string's length as an upper bound for the LCP.

**Follow-up Questions/Variations:**

1.  **Longest Common Substring:** Not prefix, but any substring. (Suffix arrays/trees, dynamic programming).
2.  **Longest Common Subsequence:** Characters don't need to be contiguous. (Dynamic Programming).
3.  **LCP of Suffixes:** Used in suffix arrays and trees.
4.  **Trie Data Structure:** How would you solve this using a Trie? (Insert all strings into a Trie, then traverse down until a node has more than one child or is marked as an end of a word).
5.  **Generalized LCP:** Find the longest common prefix among strings from a stream where strings arrive one by one.

### 3. Decode String (`decodeString`)

**Common Pitfalls:**
*   Incorrectly parsing multi-digit numbers (e.g., '10' vs '1', '0').
*   Incorrectly handling nested brackets.
*   Forgetting to reset `currentNum` or `currentStr` at appropriate times.
*   Edge cases like `k[]` (empty string to repeat).

**Follow-up Questions/Variations:**

1.  **Encode String:** Given a decoded string, find a shortest possible encoded version. (More complex, potentially dynamic programming or greedy).
2.  **Reverse Polish Notation (RPN):** Similar stack-based parsing logic can be applied to evaluate RPN expressions.
3.  **Basic Calculator Problems:** Implementing a calculator that handles parentheses and operator precedence.
4.  **String Compression/Decompression:** General problems involving run-length encoding or other compression schemes.
5.  **Valid Parentheses:** A simpler stack problem often used as a warm-up.

### 4. Group Anagrams (`groupAnagrams`)

**Common Pitfalls:**
*   Not normalizing keys correctly (e.g., case sensitivity, ignoring special characters if needed).
*   Inefficient key generation (e.g., repeatedly sorting/joining for map lookups in a naive way).
*   Forgetting to handle empty input array or an array with empty strings.

**Follow-up Questions/Variations:**

1.  **Check if Two Strings are Anagrams:** A simpler version, just compare sorted versions or character counts.
2.  **Palindrome Permutation (revisited):** Check if a string can be rearranged to form a palindrome (count character frequencies, at most one odd count).
3.  **K-Anagrams:** Two strings are K-anagrams if they can be made anagrams by changing at most K characters in one string.
4.  **Find All Anagrams in a String:** Given a text `T` and a pattern `P`, find all occurrences of anagrams of `P` in `T`. (Often solved with a sliding window and frequency maps).
5.  **Data Stream Anagrams:** How to efficiently group anagrams from a continuous stream of words? (Could involve pre-computing hashes or sorted forms and using a rolling hash or similar for quick lookups).
6.  **Trie for Anagrams:** Could a Trie be used? (Not directly, as character order matters in Tries, but you could perhaps store sorted characters in a Trie, or modified Tries exist).
```