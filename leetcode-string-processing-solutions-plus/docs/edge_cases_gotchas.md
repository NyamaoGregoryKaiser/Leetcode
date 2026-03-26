# Edge Cases and Gotchas in String Manipulation Problems

String manipulation problems often have tricky edge cases that can break solutions if not handled carefully. Here's a list of common pitfalls and considerations.

---

## General String Considerations

1.  **Empty String (`""`):**
    *   What should the function return? `""`, `0`, `[]`, `null`, `undefined`?
    *   Example: `reverseString("")` -> `""`. `isValidParentheses("")` -> `true`. `longestSubstringWithoutRepeatingCharacters("")` -> `0`.
    *   Many algorithms handle empty strings gracefully (e.g., loops won't run), but explicit checks can be safer.

2.  **Single Character String (`"a"`):**
    *   Often a base case or minimum valid input.
    *   Example: `reverseString("a")` -> `"a"`. `longestSubstringWithoutRepeatingCharacters("a")` -> `1`. `isValidParentheses("a")` (if 'a' is not a bracket) -> `false`.

3.  **Strings with All Same Characters (`"aaaaa"`):**
    *   Can affect logic for uniqueness, patterns, etc.
    *   Example: `longestSubstringWithoutRepeatingCharacters("aaaaa")` -> `1`.

4.  **Strings with Unique Characters (`"abcdef"`):**
    *   Another extreme for uniqueness checks.
    *   Example: `longestSubstringWithoutRepeatingCharacters("abcdef")` -> `6`.

5.  **Strings with Special Characters, Numbers, or Spaces (`"a b c!", "123"`):**
    *   Does the problem specify character set (e.g., only lowercase English letters)? If not, your solution should ideally handle Unicode, spaces, punctuation, numbers, etc., unless explicitly told to ignore them.
    *   Example: `reverseStringTwoPointersInPlace(["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", "!"])`.
    *   `groupAnagrams` might need to handle cases where these characters are part of an anagram. If only letters are considered, non-letters need to be filtered or ignored for canonical keys.

6.  **Case Sensitivity:**
    *   Are `'A'` and `'a'` considered the same or different?
    *   Example: "Race" is an anagram of "Care" if case-insensitive, but not if case-sensitive. Always clarify this with the interviewer. Solutions often convert strings to `toLowerCase()` for case-insensitive comparisons.

7.  **Input Type Validation:**
    *   What if the input is `null`, `undefined`, a number, or an object instead of a string (or array of characters)? Robust solutions should include type checks or assume valid input per problem constraints.
    *   *Gotcha:* In JavaScript, `null.length` or `undefined.length` will throw an error. Accessing properties on these values will fail. `typeof null` is "object", `typeof []` is "object". `Array.isArray()` is good for array checks.

---

## Specific Problem Gotchas

### Reverse String

*   **In-Place vs. New String:** The most crucial distinction. Many problems specifically ask for in-place with `O(1)` space (like the `char[]` version). Returning a new string (like `reverseStringIterative` in this project) is typically `O(N)` space.
*   **Edge Lengths:** Empty array `[]`, single-element array `["a"]`.
*   **Modifying Original Array:** Ensure your function correctly modifies the input array reference, not a copy.

### Valid Parentheses

*   **Odd Length Strings:** An immediate `false` can save computation.
*   **Starting with a Closing Bracket:** The stack will be empty when attempting to pop, leading to an immediate `false`.
*   **Unmatched Opening Brackets at End:** If the stack is not empty after processing the entire string, it means some opening brackets were never closed.
*   **Mismatched Bracket Types:** `([)]` is invalid because `(` is closed by `]` instead of `)`. The stack-based solution handles this by comparing types.

### Longest Substring Without Repeating Characters

*   **Empty String:** `0` length.
*   **Single Character String:** `1` length.
*   **All Same Characters:** `1` length.
*   **All Unique Characters:** Length is string length.
*   **Sliding Window Logic:**
    *   Correctly advancing `left` and `right` pointers.
    *   Updating `maxLength` at the right moment (e.g., after expanding the window, or after any valid window change).
    *   `Map` vs `Set` for `left` pointer jumps: Using a `Map` to store character indices allows for direct jumps of the `left` pointer, which can be faster than incrementally moving `left` with a `Set` in certain cases (e.g., `pwwkew`).

### Group Anagrams

*   **Empty Input Array:** Return `[]` or `[[]]`? Usually `[]`.
*   **Empty Strings as Anagrams:** `["", ""]` should be grouped together. `groupAnagramsSortingKey(["", ""])` -> `[["", ""]]`.
*   **Single-Character Strings:** `["a", "b", "a"]` -> `[["a", "a"], ["b"]]`.
*   **Case Sensitivity (again):** Clarify if "Eat" and "tea" are anagrams. If so, convert to a consistent case before generating keys.
*   **Non-Alphabetic Characters:** Are `"!abc"` and `"abc!"` anagrams? The `char counting` approach needs adjustments or filtering if non-alphabetic chars should be ignored or handled specially. The `sorting` approach will treat them as distinct characters.
*   **Handling `Map` vs. Object Keys:** In JavaScript, `Map` keys can be anything, including arrays. However, `Array.prototype.sort()` creates a new array, so `[1,2].sort()` and `[1,2].sort()` would be different array objects, even if their contents are identical. `join('')` converts the sorted array into a primitive string, which *can* be used as a reliable `Map` or object key.

---