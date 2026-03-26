# Algorithm Explanations

This document provides detailed explanations for each algorithm implemented in the `src/algorithms` directory, including the logic, multiple approaches, and their time/space complexity analysis.

---

## 1. Reverse String

**Problem:** Reverse a string, given as a `char[]`, in-place with `O(1)` extra memory.

### Approach 1: `reverseStringIterative(s)` (Not In-Place, for comparison)

*   **Logic:**
    1.  Initialize an empty string `reversed`.
    2.  Iterate through the input string `s` from its last character to the first.
    3.  Append each character to `reversed`.
    4.  Return `reversed`.
*   **Time Complexity:** `O(N)`, where N is the length of the string. We iterate through the string once.
*   **Space Complexity:** `O(N)`. A new string `reversed` of length N is created. This approach does NOT meet the "in-place" requirement.

### Approach 2: `reverseStringTwoPointersInPlace(s)` (Optimal, Iterative In-Place)

*   **Logic:**
    1.  Initialize two pointers: `left` at the beginning of the array (index 0) and `right` at the end of the array (index `s.length - 1`).
    2.  While `left` is less than `right`:
        *   Swap the characters at `s[left]` and `s[right]`.
        *   Increment `left` and decrement `right`.
    3.  The loop continues until `left` meets or crosses `right`, at which point the entire array will have been reversed.
*   **Why it works:** By swapping elements symmetrically from the ends towards the center, we ensure that each character is moved to its correct reversed position without needing extra storage.
*   **Time Complexity:** `O(N)`. We iterate through approximately half of the array, performing constant-time swaps.
*   **Space Complexity:** `O(1)`. Only a few variables (`left`, `right`, temporary for swap) are used, regardless of input size. This meets the in-place requirement.

*Visual Diagram (ASCII Art) - See `docs/ascii_diagrams.md`*

### Approach 3: `reverseStringRecursiveInPlace(s)` (Recursive In-Place)

*   **Logic:**
    1.  This is a recursive variant of the two-pointer approach.
    2.  The function takes the character array `s`, a `left` pointer, and a `right` pointer.
    3.  **Base Case:** If `left` is greater than or equal to `right`, it means the pointers have met or crossed, and the segment (or entire array) is reversed. The recursion stops.
    4.  **Recursive Step:**
        *   Swap `s[left]` and `s[right]`.
        *   Make a recursive call to `reverseStringRecursiveInPlace(s, left + 1, right - 1)` to process the inner segment.
*   **Why it works:** Each recursive call handles one pair of swaps and then delegates the rest of the problem to a smaller subproblem, eventually reaching the base case.
*   **Time Complexity:** `O(N)`. There are `N/2` swaps, and each swap involves a function call.
*   **Space Complexity:** `O(N)`. Due to the recursion call stack. For very long strings, this could lead to a "Stack Overflow" error in JavaScript engines, as JavaScript does not guarantee Tail Call Optimization (TCO). In a strict `O(1)` space context, the iterative two-pointer approach is preferred.

---

## 2. Valid Parentheses

**Problem:** Determine if an input string `s` (containing `()[]{}`) is valid, ensuring open brackets are closed by the same type and in the correct order.

### Approach 1: `isValidParenthesesUsingArrayAsStack(s)` (Optimal, Array as Stack)

*   **Logic:**
    1.  **Early Exit:** If the string length is odd, it's impossible to be valid (every open bracket needs a close), so return `false`.
    2.  Initialize an empty array to act as a stack.
    3.  Define a `bracketMap` to store pairs of open-to-close brackets (e.g., `{'(': ')', '[': ']', '{': '}'}`).
    4.  Iterate through each character `char` in the input string `s`:
        *   **If `char` is an opening bracket:** Push its corresponding closing bracket (from `bracketMap`) onto the stack. This is an optimization: instead of pushing the open bracket and checking later, we push what we *expect* to see.
        *   **If `char` is a closing bracket:**
            *   Check if the stack is empty. If it is, there's no matching opening bracket for this closing one, so return `false`.
            *   Pop the top element from the stack.
            *   Compare the popped element with the current `char`. If they don't match (e.g., popped `)` but current is `]`), then the brackets are mismatched, so return `false`.
    5.  After the loop, if the stack is empty, it means all opening brackets found a valid closing counterpart. Return `true`.
    6.  If the stack is not empty, there are unmatched opening brackets (e.g., `"{[("`), so return `false`.
*   **Why it works:** The stack naturally handles the "last-in, first-out" (LIFO) requirement for nested brackets. When you encounter an opening bracket, you expect its corresponding closing bracket to be the *next* one to be closed *among currently open brackets*. The stack's top element always represents the most recently opened and still unmatched bracket.
*   **Time Complexity:** `O(N)`, where N is the length of the string. We iterate through the string once. Each `push`, `pop`, and `has` operation on a JavaScript array (at the end) or a Map takes `O(1)` on average.
*   **Space Complexity:** `O(N)`. In the worst case (e.g., `((((((`, all characters are opening brackets), the stack will store up to N/2 closing brackets.

*Visual Diagram (ASCII Art) - See `docs/ascii_diagrams.md`*

### Approach 2: `isValidParenthesesUsingCustomStack(s)` (Optimal, Custom Stack)

*   **Logic:** Identical to Approach 1, but explicitly uses the `Stack` class defined in `src/utils/dataStructures.js`. This demonstrates working with a custom data structure.
*   **Time Complexity:** `O(N)`. Operations on the custom `Stack` are implemented using array methods, so they are effectively `O(1)` on average.
*   **Space Complexity:** `O(N)`. Same as Approach 1.

---

## 3. Longest Substring Without Repeating Characters

**Problem:** Find the length of the longest substring without repeating characters in a given string `s`.

### Approach 1: `lengthOfLongestSubstringBruteForce(s)` (Brute-Force)

*   **Logic:**
    1.  Initialize `maxLength` to 0.
    2.  Use a nested loop:
        *   The outer loop (`i`) iterates from the beginning to the end of the string, marking the start of a potential substring.
        *   The inner loop (`j`) iterates from `i` to the end of the string, extending the current substring.
    3.  Inside the inner loop, maintain a `Set` called `charSet` to store characters in the current substring `s[i...j]`.
    4.  For each character `s[j]`:
        *   If `s[j]` is already in `charSet`, it means a repeat has been found. Break the inner loop and move `i` to the next character (start a new substring).
        *   If `s[j]` is not in `charSet`, add it to the set. Update `maxLength` with `Math.max(maxLength, j - i + 1)`, as `s[i...j]` is a valid non-repeating substring.
    5.  Return `maxLength`.
*   **Time Complexity:** `O(N^2)`. The outer loop runs `N` times. The inner loop runs up to `N` times. `Set` operations are `O(1)` on average. In the worst case, `j` iterates almost to `N` for each `i`.
*   **Space Complexity:** `O(min(N, AlphabetSize))`. The `Set` can store up to `AlphabetSize` unique characters (e.g., 26 for lowercase English) or `N` characters if all are unique within the window.

### Approach 2: `lengthOfLongestSubstringSlidingWindowSet(s)` (Optimal, Sliding Window with Set)

*   **Logic:**
    1.  Initialize `maxLength` to 0, `left` pointer to 0, and `right` pointer to 0.
    2.  Initialize a `Set` called `charSet` to store characters currently within the sliding window `[left, right)`. (Note: `right` is exclusive, meaning `s[right]` is the character we are currently trying to add).
    3.  While `right` is less than `N` (string length):
        *   **If `s[right]` is NOT in `charSet`:**
            *   Add `s[right]` to `charSet`.
            *   Update `maxLength` with `Math.max(maxLength, right - left + 1)`.
            *   Increment `right` to expand the window.
        *   **If `s[right]` IS in `charSet` (a repeat):**
            *   This means `s[right]` is a duplicate within the current window `[left, right)`.
            *   To remove the duplicate, we must shrink the window from the left.
            *   Delete `s[left]` from `charSet`.
            *   Increment `left` to shrink the window.
            *   Keep shrinking until `s[right]` is no longer a duplicate in the window.
    4.  Return `maxLength`.
*   **Why it works:** The sliding window ensures that `left` and `right` pointers only move forward. Each character is added to the set and removed from the set at most once. This linear traversal guarantees `O(N)` time.
*   **Time Complexity:** `O(N)`. Both `left` and `right` pointers traverse the string at most once. Set operations are `O(1)` on average.
*   **Space Complexity:** `O(min(N, AlphabetSize))`. The `Set` stores characters within the current window.

*Visual Diagram (ASCII Art) - See `docs/ascii_diagrams.md`*

### Approach 3: `lengthOfLongestSubstringSlidingWindowMap(s)` (More Optimized Sliding Window with Map)

*   **Logic:**
    1.  Initialize `maxLength` to 0, `left` pointer to 0.
    2.  Initialize a `Map` called `charMap` to store `character -> its last seen index`.
    3.  Iterate with a `right` pointer from 0 to `N-1`:
        *   Let `char = s[right]`.
        *   **If `char` is in `charMap` AND its last seen index (`charMap.get(char)`) is greater than or equal to `left`:**
            *   This means `char` is a duplicate *within the current window `[left, right)`*.
            *   To resolve this, we must move the `left` pointer past the previous occurrence of `char`.
            *   Set `left = charMap.get(char) + 1`. This effectively "jumps" the `left` pointer, making the window start immediately after the last occurrence of the repeated character.
        *   **Always update `charMap.set(char, right)`:** This keeps track of the most recent index for each character.
        *   **Update `maxLength`:** The current window size is `right - left + 1`. Update `maxLength = Math.max(maxLength, right - left + 1)`.
    4.  Return `maxLength`.
*   **Why it works:** This is an improvement over the `Set` approach because when a duplicate is found, `left` can directly jump to the position immediately after the previous occurrence of the duplicate, instead of shrinking the window one character at a time. This makes it slightly faster in scenarios with many repeating characters that require large window shifts.
*   **Time Complexity:** `O(N)`. The `right` pointer iterates `N` times. `left` pointer also moves at most `N` times in total. Map operations are `O(1)` on average.
*   **Space Complexity:** `O(min(N, AlphabetSize))`. The `Map` stores characters and their indices.

---

## 4. Group Anagrams

**Problem:** Given an array of strings, group anagrams together.

### Approach 1: `groupAnagramsSortingKey(strs)` (Optimal, Sorting as Key)

*   **Logic:**
    1.  Initialize a `Map` (e.g., `anagramMap`) where keys will be the canonical representation of an anagram group, and values will be arrays of strings belonging to that group.
    2.  Iterate through each string `str` in the input array `strs`:
        *   **Create Canonical Key:** Convert `str` to a character array, sort it alphabetically, and then join it back into a string. For example, "eat" -> `['e','a','t']` -> `['a','e','t']` -> "aet". This sorted string is the canonical key.
        *   **Map Operation:**
            *   If `anagramMap` *already has* this `key`, append `str` to the array associated with that key.
            *   If `anagramMap` *does not have* this `key`, create a new entry with this `key` and an array containing `str`.
    3.  After processing all strings, return all the values from the `anagramMap`. These values are the groups of anagrams.
*   **Why it works:** Anagrams, by definition, contain the same characters with the same frequencies. Therefore, sorting their characters will always result in the identical string, providing a perfect canonical key for grouping.
*   **Time Complexity:** `O(N * K log K)`
    *   `N`: number of strings in the input array.
    *   `K`: maximum length of a string in the input array.
    *   For each of the `N` strings:
        *   `str.split('')`: `O(K)`
        *   `.sort()`: `O(K log K)` (due to comparison sort)
        *   `.join('')`: `O(K)`
        *   Map operations: `O(1)` on average.
    *   Total: `N * (K + K log K + K) = O(N * K log K)`.
*   **Space Complexity:** `O(N * K)`
    *   The `anagramMap` stores up to `N` keys (if all strings are unique anagram groups) and `N` strings in its values.
    *   Each key (sorted string) takes `O(K)` space.
    *   Each string in the value arrays takes `O(K)` space.
    *   Total: `O(N * K)`.

### Approach 2: `groupAnagramsCountingKey(strs)` (Optimal, Character Counting as Key)

*   **Logic:**
    1.  Initialize a `Map` (e.g., `anagramMap`) as in the previous approach.
    2.  Iterate through each string `str` in the input array `strs`:
        *   **Create Canonical Key (Count Array):**
            *   Create a count array of size 26 (for lowercase English letters), initialized to zeros.
            *   Iterate through each character `char` of `str`. For each `char`, increment the count at the corresponding index in the count array (e.g., `char.charCodeAt(0) - 'a'.charCodeAt(0)`).
            *   Convert this count array into a string (e.g., `charCounts.join('#')` where '#' is a delimiter to prevent ambiguities like "ab" (1,1) vs "k" (11) if just `join('')`). This string serves as the canonical key.
        *   **Map Operation:** Similar to the sorting approach, add `str` to the list corresponding to its `key` in `anagramMap`.
    3.  Return all the values from the `anagramMap`.
*   **Why it works:** Like sorting, character counts are invariant for anagrams. Two strings are anagrams if and only if they have the same character counts. This method avoids the `O(K log K)` sorting step.
*   **Time Complexity:** `O(N * K + N * AlphabetSize)` which simplifies to `O(N * K)` (since `AlphabetSize` is a constant, usually 26).
    *   `N`: number of strings.
    *   `K`: maximum length of a string.
    *   For each of the `N` strings:
        *   Initializing count array: `O(AlphabetSize)`
        *   Counting characters: `O(K)`
        *   Creating key string from count array: `O(AlphabetSize)`
        *   Map operations: `O(1)` on average.
    *   Total: `N * (AlphabetSize + K + AlphabetSize) = O(N * (K + AlphabetSize)) = O(N * K)`.
    *   This is generally more efficient than `O(N * K log K)` when `K` is large because `K log K` grows faster than `K`.
*   **Space Complexity:** `O(N * K + N * AlphabetSize)` which simplifies to `O(N * K)`
    *   The `anagramMap` stores up to `N` original strings.
    *   The `anagramMap` stores up to `N` keys. Each key (character count string) takes `O(AlphabetSize)` space.
    *   Total: `O(N * K)`.

---