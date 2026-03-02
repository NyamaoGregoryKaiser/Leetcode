```markdown
# Algorithm Explanations

This document provides detailed explanations of the logic, reasoning, and trade-offs for the optimal and key alternative solutions implemented in the project.

---

## 1. Anagram Checker: `isAnagramFrequencyArray`

**Problem:** Determine if two strings `s` and `t` are anagrams of each other, assuming they contain only lowercase English letters.

**Optimal Solution (for small, fixed character sets):** `isAnagramFrequencyArray(String s, String t)`

**Logic Explanation:**

The core idea is that two strings are anagrams if and only if they have the same characters with the same frequencies. For a fixed, small character set like lowercase English letters ('a' through 'z'), we can use a small integer array to store these frequencies.

1.  **Initial Checks:**
    *   **Null Strings:** If either string is `null`, they cannot be anagrams (unless specific problem constraints define `null` as valid, which is rare). The current implementation returns `false`.
    *   **Length Mismatch:** If `s` and `t` have different lengths, they cannot be anagrams. This is a quick exit condition that saves processing.

2.  **Frequency Array Initialization:**
    *   An `int[] charCounts = new int[26];` is created. Each index `0` to `25` corresponds to a letter 'a' to 'z' (e.g., `charCounts[0]` for 'a', `charCounts[1]` for 'b', etc.). All elements are initialized to `0`.

3.  **Process First String (`s`): Increment Counts**
    *   Iterate through each character `c` in `s`.
    *   For each character, calculate its corresponding index: `c - 'a'`.
    *   Increment the count at that index: `charCounts[c - 'a']++;`.
    *   *Example:* If `s = "anagram"`:
        *   `a`: `charCounts[0]` becomes 1
        *   `n`: `charCounts[13]` becomes 1
        *   `a`: `charCounts[0]` becomes 2
        *   `g`: `charCounts[6]` becomes 1
        *   `r`: `charCounts[17]` becomes 1
        *   `a`: `charCounts[0]` becomes 3
        *   `m`: `charCounts[12]` becomes 1
    *   After `s` is processed, `charCounts` reflects the exact frequency of each character in `s`.

4.  **Process Second String (`t`): Decrement Counts**
    *   Iterate through each character `c` in `t`.
    *   Decrement the count at its corresponding index: `charCounts[c - 'a']--;`.
    *   **Crucial Check:** If `charCounts[c - 'a']` becomes negative *at any point*, it means `t` contains more occurrences of character `c` than `s` did, or `t` contains a character not present in `s` at all. In either case, they cannot be anagrams, so we immediately return `false`.
    *   *Example (continuing with `s = "anagram", t = "nagaram"`):*
        *   `n`: `charCounts[13]` becomes 0 (was 1)
        *   `a`: `charCounts[0]` becomes 2 (was 3)
        *   `g`: `charCounts[6]` becomes 0 (was 1)
        *   `a`: `charCounts[0]` becomes 1 (was 2)
        *   `r`: `charCounts[17]` becomes 0 (was 1)
        *   `a`: `charCounts[0]` becomes 0 (was 1)
        *   `m`: `charCounts[12]` becomes 0 (was 1)

5.  **Final Result:**
    *   If the loop for `t` completes without returning `false`, it means that for every character in `t`, there was a corresponding character available in `s`.
    *   Because we performed an initial length check (`s.length() == t.length()`), if all characters in `t` were successfully "matched" and decremented, it implies that all counts in `charCounts` must now be `0`. There are no remaining characters from `s` unmatched by `t`.
    *   Therefore, if we reach this point, `s` and `t` are anagrams, and we return `true`.

**Time Complexity:** O(N)
*   The initial length check is O(1).
*   Iterating through `s` takes O(length(s)) time.
*   Iterating through `t` takes O(length(t)) time.
*   The array operations (increment/decrement) are O(1).
*   Total time complexity is proportional to the sum of the lengths of the two strings, which is O(N) where N is the total number of characters.

**Space Complexity:** O(1)
*   The `charCounts` array has a fixed size (26) regardless of the input string lengths. This makes it extremely memory-efficient for restricted character sets.

**Trade-offs with other approaches:**

*   **Compared to `isAnagramSorting` (O(N log N) time, O(N) or O(log N) space):**
    *   `isAnagramFrequencyArray` is faster (O(N) vs O(N log N)) and more space-efficient (O(1) vs O(N)) for English alphabets. Sorting involves more overhead.
*   **Compared to `isAnagramHashMap` (O(N) time, O(K) space):**
    *   `isAnagramFrequencyArray` has the same time complexity but superior space complexity (O(1) vs O(K), where K is unique characters, worst case O(N)) when the character set is small and fixed.
    *   `isAnagramHashMap` is more flexible and handles arbitrary character sets (Unicode, uppercase, symbols, spaces) where `charCounts` array would need to be much larger or a map is naturally more suitable.

---

## 2. Longest Palindromic Substring: `expandAroundCenter`

**Problem:** Given a string `s`, return the longest palindromic substring in `s`.

**Optimal Solution (Common Interview Approach):** `expandAroundCenter(String s)`

**Logic Explanation:**

A key property of palindromes is their symmetry around a central point. This point can be:
1.  **A single character:** For odd-length palindromes like "racecar", the center is 'e'.
2.  **Two characters:** For even-length palindromes like "abba", the center is 'bb' (between the two 'b's).

The `expandAroundCenter` approach leverages this by iterating through every possible center and expanding outwards to find the longest palindrome centered at that point.

1.  **Initial Checks:**
    *   **Null or Empty String:** If `s` is `null` or empty, an empty string `""` is returned.
    *   **Single Character String:** If `s` has only one character, it's a palindrome itself. While the main loop handles this, often good to consider.

2.  **Tracking the Longest Palindrome:**
    *   `start`: Stores the starting index of the longest palindrome found so far.
    *   `end`: Stores the ending index of the longest palindrome found so far.
    *   These are initialized to `0` and `0` respectively, implying that at least a single-character palindrome exists (the first character `s[0]`).

3.  **Main Loop: Iterate through possible centers:**
    *   The loop `for (int i = 0; i < s.length(); i++)` iterates `i` from `0` to `n-1` (where `n` is `s.length()`). Each `i` represents a potential center.

    *   **Two types of centers for each `i`:**
        *   **Odd-length palindrome:** We consider `s[i]` as the single center. We call `expand(s, i, i)`.
        *   **Even-length palindrome:** We consider the space between `s[i]` and `s[i+1]` as the center. We call `expand(s, i, i + 1)`. (Note: `i+1` is checked for validity within the `expand` helper).

4.  **`expand(String s, int left, int right)` Helper Function:**
    *   This function takes the string `s` and two indices `left` and `right`, representing the initial "center" (either `i, i` or `i, i+1`).
    *   It then expands outwards from this center:
        *   `while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right))`
        *   As long as `left` is within bounds, `right` is within bounds, and the characters at `left` and `right` match, the potential palindrome expands.
        *   `left--` and `right++`
    *   When the loop terminates (either a boundary is hit or characters don't match), the palindrome has been found.
    *   The length of this palindrome is `right - left - 1`. (Because `left` decremented one too many times and `right` incremented one too many times, so `(right-1) - (left+1) + 1 = right - left - 1`).

5.  **Updating `start` and `end`:**
    *   After calling `expand` for both odd and even centers for the current `i`, we take the `max` length found (`len`).
    *   If `len` is greater than the current `(end - start + 1)` (length of the longest palindrome found so far):
        *   We update `start` and `end` to reflect the new longest palindrome.
        *   The new `start` index is `i - (len - 1) / 2`.
        *   The new `end` index is `i + len / 2`.
        *   These formulas cleverly work for both odd and even `len`:
            *   If `len` is odd (`2k + 1`): `start = i - k`, `end = i + k`.
            *   If `len` is even (`2k`): `start = i - k + 1`, `end = i + k`.
            *   The general formulas derived work: `start = i - (len - 1) / 2` and `end = i + len / 2`.

6.  **Return Result:**
    *   After the main loop finishes, `start` and `end` hold the indices of the overall longest palindromic substring.
    *   `s.substring(start, end + 1)` is returned.

**Time Complexity:** O(N^2)
*   The main loop iterates `N` times (for `i` from `0` to `n-1`).
*   Inside the loop, the `expand` function can, in the worst case (e.g., "aaaaa"), iterate up to `N/2` times (expanding left and right).
*   Thus, the total time complexity is `N * O(N) = O(N^2)`.

**Space Complexity:** O(1)
*   Only a few variables (`start`, `end`, `i`, `len1`, `len2`, `len`, `left`, `right`) are used, which is constant space.
*   No auxiliary data structures proportional to the input size are created.

**Trade-offs with other approaches:**

*   **Compared to `bruteForce` (O(N^3) time, O(1) space):**
    *   `expandAroundCenter` is significantly faster (O(N^2) vs O(N^3)) while maintaining optimal O(1) space. This is a huge improvement for larger strings.
*   **Compared to `dynamicProgramming` (O(N^2) time, O(N^2) space):**
    *   `expandAroundCenter` has the same time complexity (O(N^2)) but superior space complexity (O(1) vs O(N^2)). This makes it generally preferred in interviews unless the problem has variations where the full DP table is needed for other computations.
    *   DP might be slightly cleaner to implement for some, but `expandAroundCenter` is usually faster in practice due to less overhead (no 2D array allocation/access).
*   **Manacher's Algorithm (O(N) time, O(N) space):**
    *   Manacher's algorithm is the most optimal in terms of time complexity (O(N)). However, it's considerably more complex to understand and implement correctly in a typical interview setting. `expandAroundCenter` is often considered the "optimal" solution for interviews because of its good balance of time efficiency (O(N^2)) and relative simplicity (O(1) space).

---

## 3. Valid Parentheses: `isValid`

**Problem:** Given a string `s` containing only '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

**Optimal Solution:** `isValid(String s)` using a Stack

**Logic Explanation:**

This problem is a classic application of a Stack data structure. The principle is that for every opening bracket, there must be a corresponding closing bracket of the *same type* and in the *correct order*. A stack helps maintain the order of opening brackets encountered.

1.  **Initial Checks:**
    *   **Null or Empty String:** An empty string (`null` or `""`) is usually considered valid. The current implementation returns `true` for these.
    *   **Odd Length:** If the string has an odd number of characters, it's impossible for all brackets to be matched, so it must be invalid. This is a quick exit condition.

2.  **Stack Initialization:**
    *   A `Stack<Character> stack = new Stack<>();` is created. This stack will store opening brackets as they are encountered.

3.  **Iterate through the String:**
    *   The code iterates through each character `c` in the input string `s`.

4.  **Processing Characters:**
    *   **Opening Brackets:** If `c` is an opening bracket ('(', '{', '['), it's pushed onto the stack. This signifies that we've "opened" a bracket that expects a corresponding closing bracket later.
        *   *Example:* If `s = "([{}])"`, when '(' is seen, it's pushed. Then '[' is pushed.
    *   **Closing Brackets:** If `c` is a closing bracket (')', '}', ']'), we need to check for a matching opening bracket:
        *   **Empty Stack Check:** First, check if the stack is `empty()`. If it is, it means we've encountered a closing bracket without any corresponding opening bracket (e.g., `"]a"`), so the string is immediately invalid. Return `false`.
        *   **Pop and Match:** If the stack is not empty, `pop()` the top element. This represents the most recently opened bracket that should now be closed.
        *   Compare the `poppedChar` with the current closing character `c`. If they do *not* form a valid pair (e.g., popping '(' but `c` is '}'), then the brackets are mismatched or in the wrong order. Return `false`.
        *   *Example (continuing with `s = "([{}])"`):*
            *   When '}' is seen, stack is `['(', '['`. Pop `[`. Match with `}`? No. If it was `{}`, match `}` with `{`.
            *   When ')' is seen, stack is `['(']`. Pop `(`. Match with `)`? Yes.

5.  **Final Result:**
    *   After iterating through all characters:
        *   If the stack is `empty()`, it means every opening bracket encountered had a corresponding and correctly ordered closing bracket. The string is valid. Return `true`.
        *   If the stack is *not* `empty()`, it means there are one or more opening brackets that were never closed (e.g., `"(("`). The string is invalid. Return `false`.

**Time Complexity:** O(N)
*   The algorithm iterates through the input string once, character by character.
*   Each operation on the stack (push, pop, isEmpty) takes O(1) time on average.
*   Therefore, the total time complexity is linear with respect to the length of the string, N.

**Space Complexity:** O(N)
*   In the worst-case scenario, the stack might need to store all opening brackets if they are never closed until the very end (e.g., "(((((((").
*   Thus, the space complexity is proportional to the maximum nesting depth of the brackets, which can be up to N/2 (approximately N) for a string like "((((()))))".

**Edge Cases and Gotchas:**

*   **Empty String:** Valid.
*   **Null String:** Generally considered valid or handled by specific problem constraints.
*   **Odd Length:** Always invalid, can be an early exit.
*   **Mismatched Types:** `([)]` is invalid because ']' closes the '[' not '('.
*   **Unclosed Brackets:** `((` is invalid.
*   **Unopened Brackets:** `))` is invalid.
*   **Non-bracket Characters:** The current implementation assumes the input contains only the specified bracket characters. If other characters are possible, a `default` case in the switch statement or an initial filtering pass might be needed.
```