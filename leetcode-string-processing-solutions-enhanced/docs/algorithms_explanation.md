```markdown
# Detailed Algorithm Explanations

This document provides in-depth explanations for each string manipulation algorithm implemented in this project, covering logic, multiple approaches, and time/space complexity analysis.

---

## 1. Longest Palindromic Substring

**Problem Statement:** Given a string `s`, return the longest palindromic substring in `s`.

### Approach 1: Brute Force

This is the most straightforward but least efficient approach.

**Logic:**
1. Generate all possible substrings of the given string `s`.
2. For each substring, check if it is a palindrome.
3. Keep track of the longest palindrome found so far.

**Detailed Steps:**
1. Initialize `longestPalindrome` as an empty string.
2. Iterate `i` from `0` to `s.length() - 1` (start of substring).
3. Inside, iterate `j` from `i` to `s.length() - 1` (end of substring).
4. Extract the substring `sub = s.substring(i, j + 1)`.
5. Call a helper function `isPalindrome(sub)` to check if `sub` is a palindrome.
   *   `isPalindrome` function: Use two pointers, `left` starting at `0` and `right` starting at `sub.length() - 1`. Move `left` forward and `right` backward, comparing `sub.charAt(left)` and `sub.charAt(right)`. If a mismatch is found, it's not a palindrome. If pointers cross without mismatch, it is.
6. If `sub` is a palindrome and `sub.length()` is greater than `longestPalindrome.length()`, update `longestPalindrome = sub`.
7. Return `longestPalindrome`.

**Time Complexity:** O(N^3)
*   There are `N * (N + 1) / 2` (approximately O(N^2)) possible substrings.
*   Checking each substring for palindrome property takes O(N) time (where N is the length of the substring, up to the length of the original string).
*   Total: O(N^2 * N) = O(N^3).

**Space Complexity:** O(N)
*   For storing the `longestPalindrome` string (up to N characters).
*   Temporary space for each `substring` creation in Java (up to N characters).

**Pros:** Simple to understand and implement.
**Cons:** Very inefficient for larger inputs.

---

### Approach 2: Expand Around Center (Optimal)

This approach leverages the fact that a palindrome expands symmetrically from its center. A palindrome can have an odd length (e.g., "aba", center is 'b') or an even length (e.g., "abba", center is 'bb'). We can iterate through all possible centers and expand outwards.

**Logic:**
1. Every single character is a palindrome of length 1. Every pair of identical adjacent characters forms a palindrome of length 2. These can serve as "centers" for expansion.
2. We can iterate through each character in the string `s`. For each character `s[i]`, we consider two types of centers:
    *   **Odd length palindromes:** The center is `s[i]`. We expand outwards with `left = i`, `right = i`.
    *   **Even length palindromes:** The center is between `s[i]` and `s[i+1]`. We expand outwards with `left = i`, `right = i + 1`.
3. In each expansion, we increment `right` and decrement `left` as long as the characters `s[left]` and `s[right]` match and stay within string boundaries.
4. We keep track of the maximum length found and its corresponding start index.

**Detailed Steps:**
1. Initialize `start = 0` (start index of the longest palindrome found) and `maxLength = 0`. If `s` is empty, return `""`. If `s` has length 1, return `s`.
2. Iterate `i` from `0` to `s.length() - 1`:
    *   Call a helper function `expandAroundCenter(s, i, i)` for odd-length palindromes. Let its result be `len1`.
    *   Call `expandAroundCenter(s, i, i + 1)` for even-length palindromes. Let its result be `len2`.
    *   `currentMaxLen = max(len1, len2)`.
    *   If `currentMaxLen > maxLength`:
        *   Update `maxLength = currentMaxLen`.
        *   Calculate `start = i - (maxLength - 1) / 2`. (This formula works for both odd and even lengths: for odd `L`, `i - (L-1)/2`; for even `L`, `i - (L/2 - 1)` which simplifies to `i - (L-2)/2` for middle left char).
3. Return `s.substring(start, start + maxLength)`.

**Helper Function `expandAroundCenter(s, left, right)`:**
1. While `left >= 0` AND `right < s.length()` AND `s.charAt(left) == s.charAt(right)`:
    *   Decrement `left`.
    *   Increment `right`.
2. The loop terminates when a mismatch is found or boundaries are hit. The length of the palindrome is `right - left - 1`.

**Time Complexity:** O(N^2)
*   We iterate through `N` possible centers.
*   For each center, `expandAroundCenter` can take up to O(N) time in the worst case (e.g., a string of all same characters like "aaaaa").
*   Total: O(N * N) = O(N^2).

**Space Complexity:** O(1)
*   Only a few integer variables are used to store indices and lengths.

**Pros:** Significantly more efficient than brute force.
**Cons:** Requires careful handling of two types of centers (odd/even length).

---

### Approach 3: Dynamic Programming (Discussed)

**Logic:**
`dp[i][j]` is a boolean value indicating whether the substring `s[i...j]` is a palindrome.
1. All single characters are palindromes: `dp[i][i] = true`.
2. Two adjacent identical characters form a palindrome: `dp[i][i+1] = (s.charAt(i) == s.charAt(i+1))`.
3. For longer substrings: `dp[i][j] = (s.charAt(i) == s.charAt(j)) && dp[i+1][j-1]`.
This means a substring `s[i...j]` is a palindrome if its end characters `s[i]` and `s[j]` match, AND the inner substring `s[i+1...j-1]` is also a palindrome.

**Detailed Steps:**
1. Initialize a 2D boolean array `dp[N][N]`.
2. Initialize `longestPalindrome = ""` and `maxLength = 0`.
3. **Base Cases:**
    *   For `len = 1`: `dp[i][i] = true` for all `i`. Update `longestPalindrome` and `maxLength`.
    *   For `len = 2`: `dp[i][i+1] = (s.charAt(i) == s.charAt(i+1))`. If true, update `longestPalindrome` and `maxLength`.
4. **General Case (lengths `len = 3` to `N`):**
    *   Iterate `len` from 3 to `N`.
    *   Iterate `i` from `0` to `N - len`.
    *   Calculate `j = i + len - 1`.
    *   `dp[i][j] = (s.charAt(i) == s.charAt(j)) && dp[i+1][j-1]`.
    *   If `dp[i][j]` is true and `len > maxLength`, update `maxLength` and `longestPalindrome`.
5. Return `longestPalindrome`.

**Time Complexity:** O(N^2)
*   The nested loops for `len` and `i` (or `i` and `j`) iterate O(N^2) times. Each `dp` calculation is O(1).

**Space Complexity:** O(N^2)
*   For the `dp[N][N]` 2D array.

**Pros:** Systematic and provides a clear recursive structure.
**Cons:** Higher space complexity compared to "Expand Around Center".

---

## 2. Group Anagrams

**Problem Statement:** Given an array of strings `strs`, group the anagrams together.

### Approach 1: Character Count Array as Key (Optimal)

This approach uses a hash map to group strings. The key for the hash map is a canonical representation of a string's character counts, ensuring all anagrams generate the same key.

**Logic:**
1. Anagrams have the same characters with the same frequencies.
2. We can create a unique "signature" or "key" for each string based on its character frequencies.
3. Use this signature as the key in a `HashMap<String, List<String>>`.

**Detailed Steps:**
1. Initialize an empty `HashMap<String, List<String>> called anagramGroups`.
2. For each `string s` in `strs`:
    *   Create an `int[] charCounts` of size 26 (for 'a' through 'z').
    *   Iterate through the characters `c` of `s`. For each `c`, increment `charCounts[c - 'a']`.
    *   Build a unique `key` string from `charCounts`. A common way is to append `#` followed by each count: e.g., `"#1#0#0#1..."` for `a=1, b=0, c=0, d=1...`. Using `StringBuilder` for efficiency.
    *   If `key` is not present in `anagramGroups`, add `key` with a new empty `ArrayList`.
    *   Add `s` to the `List<String>` associated with `key`.
3. Return `anagramGroups`.

**Time Complexity:** O(N * K)
*   `N` is the number of strings in `strs`.
*   `K` is the maximum length of a string.
*   For each string:
    *   Iterating through `K` characters to build `charCounts` takes O(K).
    *   Building the `key` from `charCounts` (array of size 26) takes O(alphabet_size), which is a constant (26). So O(1) effectively.
    *   HashMap `put`/`get` operations are O(1) on average.
*   Total: O(N * (K + alphabet_size)) = O(N * K) assuming `alphabet_size` is constant and much smaller than `K`.

**Space Complexity:** O(N * K)
*   The hash map stores lists of strings. In the worst case, all `N` strings could be distinct anagrams, each of length up to `K`.
*   The `charCounts` array takes O(alphabet_size) space per string, which is constant.

**Pros:** Efficient, especially for strings with a small, fixed alphabet size.
**Cons:** Constructing the string key from the count array can be slightly verbose.

---

### Approach 2: Sorting Each String as Key (Alternative)

This is a simpler but generally less efficient approach.

**Logic:**
1. Anagrams become identical when their characters are sorted alphabetically.
2. Use the sorted version of each string as the key in a `HashMap<String, List<String>>`.

**Detailed Steps:**
1. Initialize an empty `HashMap<String, List<String>> called anagramGroups`.
2. For each `string s` in `strs`:
    *   Convert `s` to a `char[]`.
    *   Sort the `char[]`.
    *   Convert the sorted `char[]` back to a `String`. This `sortedString` is the unique key.
    *   If `sortedString` is not present in `anagramGroups`, add `sortedString` with a new empty `ArrayList`.
    *   Add `s` to the `List<String>` associated with `sortedString`.
3. Return `anagramGroups`.

**Time Complexity:** O(N * K log K)
*   `N` is the number of strings.
*   `K` is the maximum length of a string.
*   For each string:
    *   Sorting a string of length `K` takes O(K log K).
    *   HashMap operations are O(1) on average.
*   Total: O(N * K log K).

**Space Complexity:** O(N * K)
*   Similar to the character count approach, dominated by storing the output lists.
*   Temporary `char[]` creation and `String` conversion also consume O(K) space per string.

**Pros:** Easy to implement.
**Cons:** Slower than the character count method, especially for longer strings, due to the `K log K` sorting factor.

---

## 3. Minimum Window Substring

**Problem Statement:** Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.

### Approach: Sliding Window with Two Hash Maps (Optimal)

This technique uses two pointers to define a "window" in the source string `s` and two frequency maps to track character counts.

**Logic:**
1. Keep track of the required character counts from `t` in one map (`targetCharCounts`).
2. Use a sliding window (`left` and `right` pointers) over `s`.
3. As the `right` pointer expands the window, update the character counts in a second map (`windowCharCounts`) for characters within the current window.
4. Maintain a counter (`formed`) for how many unique characters from `t` have met their required counts within the current window.
5. Once all characters in `t` are "formed" (i.e., `formed == targetCharCounts.size()`), try to shrink the window from the `left`.
6. During shrinking, if a character is removed from the left that causes `formed` to drop, stop shrinking.
7. Record the smallest valid window found.

**Detailed Steps:**
1. **Initialization:**
    *   Handle edge cases: if `t` is empty or `s` is empty, return `""`.
    *   Create `targetCharCounts`: a `HashMap<Character, Integer>` to store counts of characters in `t`.
    *   Initialize `left = 0`, `formed = 0`.
    *   Initialize `minLength = Integer.MAX_VALUE`, `minStart = 0`.
    *   `requiredUniqueChars = targetCharCounts.size()`.
    *   Create `windowCharCounts`: a `HashMap<Character, Integer>` for the current window.

2. **Expand the window (move `right` pointer):**
    *   Iterate `right` from `0` to `s.length() - 1`.
    *   Let `currentChar = s.charAt(right)`.
    *   Add `currentChar` to `windowCharCounts`: `windowCharCounts.put(currentChar, windowCharCounts.getOrDefault(currentChar, 0) + 1)`.
    *   **Check `formed` count:** If `currentChar` is in `targetCharCounts` AND `windowCharCounts.get(currentChar)` equals `targetCharCounts.get(currentChar)`, then increment `formed`. This means one unique character's requirement has been met.

3. **Contract the window (move `left` pointer) when all characters are formed:**
    *   While `formed == requiredUniqueChars` AND `left <= right`:
        *   **Update minimum window:** If `right - left + 1 < minLength`, update `minLength = right - left + 1` and `minStart = left`.
        *   Let `leftChar = s.charAt(left)`.
        *   **Shrink window:** Decrement `leftChar`'s count in `windowCharCounts`: `windowCharCounts.put(leftChar, windowCharCounts.get(leftChar) - 1)`.
        *   **Update `formed` count:** If `leftChar` was in `targetCharCounts` AND `windowCharCounts.get(leftChar)` is now less than `targetCharCounts.get(leftChar)`, then decrement `formed` (because this character is no longer fully satisfied).
        *   Increment `left` to shrink the window.

4. **Result:**
    *   If `minLength` is still `Integer.MAX_VALUE`, no valid window was found, return `""`.
    *   Otherwise, return `s.substring(minStart, minStart + minLength)`.

**Time Complexity:** O(N + M)
*   `N` is the length of `s`.
*   `M` is the length of `t`.
*   The `right` pointer iterates through `s` once (O(N)).
*   The `left` pointer also iterates through `s` at most once (O(N)).
*   Populating `targetCharCounts` takes O(M).
*   Hash map operations are O(1) on average.
*   Total: O(N + M).

**Space Complexity:** O(1) (or O(alphabet_size))
*   The hash maps store at most `alphabet_size` entries (e.g., 256 for extended ASCII characters). This is considered constant space relative to input string lengths.

**Pros:** Highly efficient, widely applicable for substring problems involving character frequencies.
**Cons:** Can be tricky to implement correctly due to precise conditions for incrementing/decrementing `formed` and updating window pointers.

---

## 4. String to Integer (atoi)

**Problem Statement:** Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer, adhering to specific rules for whitespace, signs, digits, and overflow.

### Approach: Robust Parsing with Edge Case Handling and Overflow Checks (Optimal)

This problem is primarily about meticulous handling of various edge cases and ensuring integer overflow/underflow is correctly managed.

**Logic:**
Follow the problem's 6-step algorithm precisely, paying attention to:
1.  Ignoring leading whitespace.
2.  Determining the sign.
3.  Parsing digits only.
4.  Stopping at the first non-digit character.
5.  Handling empty digit sequences.
6.  Clamping the result to `Integer.MAX_VALUE` or `Integer.MIN_VALUE` if overflow/underflow occurs.

**Detailed Steps:**
1.  **Initialize:** `index = 0`, `n = s.length()`, `sign = 1` (default positive), `result = 0` (use `long` for `result` to temporarily hold values larger than `Integer.MAX_VALUE` before clamping).

2.  **1. Ignore leading whitespace:**
    *   While `index < n` and `s.charAt(index)` is a space, increment `index`.

3.  **2. Check for sign:**
    *   If `index < n`:
        *   If `s.charAt(index) == '-'`, set `sign = -1` and increment `index`.
        *   Else if `s.charAt(index) == '+'`, increment `index`.
        *   Else (if it's not a digit and not a sign, or if it's another sign like "++"), break and return `0`. *Self-correction: The problem implies that if we see a non-digit after whitespace/optional sign, we stop. If no digits were seen up to this point, return 0.*

4.  **3. Read digits and build number:**
    *   While `index < n` and `s.charAt(index)` is a digit:
        *   Convert the character to its integer value: `digit = s.charAt(index) - '0'`.
        *   **Overflow Check (CRITICAL):**
            *   Before `result = result * 10 + digit;`, check if `result * 10 + digit` would exceed `Integer.MAX_VALUE` or fall below `Integer.MIN_VALUE`.
            *   For positive numbers: If `result > Integer.MAX_VALUE / 10` OR (`result == Integer.MAX_VALUE / 10` AND `digit > 7`), return `Integer.MAX_VALUE`. (7 is `Integer.MAX_VALUE % 10`).
            *   For negative numbers: If `result > Integer.MAX_VALUE / 10` OR (`result == Integer.MAX_VALUE / 10` AND `digit > 8`), return `Integer.MIN_VALUE`. (8 is `abs(Integer.MIN_VALUE % 10)`, `Integer.MAX_VALUE` is used for comparison since `result` is always accumulated as a positive absolute value).
        *   Update `result = result * 10 + digit`.
        *   Increment `index`.

5.  **4. If no digits were read, then the integer will be 0.**
    *   This is implicitly handled. If `result` is still `0` after the digit parsing loop, it means no digits were successfully parsed.

6.  **5. Apply sign and return:**
    *   Return `(int) (result * sign)`. The `long` `result` ensures that `Integer.MAX_VALUE` or `Integer.MIN_VALUE` can be temporarily reached before clamping. The in-loop checks handle explicit clamping.

**Time Complexity:** O(N)
*   We iterate through the string at most once.

**Space Complexity:** O(1)
*   Only a few primitive variables are used.

**Pros:** Accurately implements the complex `atoi` specification.
**Cons:** Requires careful attention to detail for all edge cases and overflow conditions, making it prone to off-by-one errors or missed scenarios.

---
```