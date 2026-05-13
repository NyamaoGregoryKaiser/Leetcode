```markdown
# Algorithm Explanations

This document provides a detailed explanation of the algorithms used to solve the string manipulation problems in this project. Each problem is discussed with its core idea, step-by-step logic, and why certain approaches are more optimal than others.

---

## 1. Longest Palindromic Substring

**Problem:** Find the longest palindromic substring in a given string `s`.

### Approach 1: Brute Force (O(N^3))

*   **Core Idea:** Generate all possible substrings of `s` and for each substring, check if it's a palindrome. Keep track of the longest one found.
*   **Logic:**
    1.  Use nested loops to define all possible start (`i`) and end (`j`) indices for substrings. `i` from `0` to `N-1`, `j` from `i` to `N-1`.
    2.  Extract the substring `s[i...j]`.
    3.  Check if this substring is a palindrome. This usually involves another loop comparing characters from both ends inwards.
    4.  If it's a palindrome and longer than the current longest, update the result.
*   **Complexity:**
    *   **Time:** O(N^2) substrings, each checked in O(N) time. Total = **O(N^3)**.
    *   **Space:** O(N) for storing the longest palindrome (if considering output string). O(1) auxiliary space for substring creation (if done efficiently or char array is used).

### Approach 2: Expand Around Center (O(N^2))

*   **Core Idea:** A palindrome expands symmetrically from its center. There are `2N-1` possible centers for palindromes in a string of length `N`.
    *   `N` single characters (for odd-length palindromes like "aba").
    *   `N-1` pairs of characters (for even-length palindromes like "abba").
*   **Logic:**
    1.  Iterate `i` from `0` to `N-1`. For each `i`:
        *   Consider `i` as the center of an **odd-length palindrome**. Call a helper function `expandAroundCenter(s, i, i)`.
        *   Consider `i` and `i+1` as the center of an **even-length palindrome**. Call `expandAroundCenter(s, i, i+1)`.
    2.  The `expandAroundCenter(s, left, right)` helper function works as follows:
        *   While `left >= 0` and `right < N` and `s.charAt(left) == s.charAt(right)`:
            *   Decrement `left` and increment `right`.
        *   When the loop terminates, `left` and `right` are one step *outside* the palindrome. The length of the palindrome is `right - left - 1`.
    3.  Keep track of the `start` and `end` indices of the longest palindrome found across all expansions.
*   **Complexity:**
    *   **Time:** `2N-1` centers. Each `expandAroundCenter` call can take up to O(N) time in the worst case (e.g., "aaaaa"). Total = **O(N^2)**.
    *   **Space:** O(1) auxiliary space.

*   **Visual Diagram (Expand Around Center):**

```
String:  b a b a d
Indices: 0 1 2 3 4

Center 0 (a):  b a b a d   -> "a" (len 1)
               ^
Center 1 (b):  b a b a d
                 ^
               Expanding (1,1): "a"
               Expanding (0,2): "bab" (len 3) -> Longest
               Expanding (1,2): "aba" (len 3) -> Also longest

Center 2 (b):  b a b a d
                   ^
               Expanding (2,2): "b"
               Expanding (1,3): "aba" (len 3) -> Longest

... and so on.
```

### Approach 3: Dynamic Programming (O(N^2))

*   **Core Idea:** Build up solutions for larger substrings from solutions for smaller substrings.
*   **Logic:**
    1.  Create a 2D boolean array `dp[i][j]` where `dp[i][j]` is `true` if the substring `s[i...j]` is a palindrome, and `false` otherwise.
    2.  **Base Cases:**
        *   All substrings of length 1 are palindromes: `dp[i][i] = true` for all `i`.
        *   Substrings of length 2: `dp[i][i+1] = (s.charAt(i) == s.charAt(i+1))`.
    3.  **Recurrence Relation:** For `len >= 3`, `s[i...j]` is a palindrome if:
        *   `s.charAt(i) == s.charAt(j)` (outer characters match).
        *   `dp[i+1][j-1]` is `true` (the inner substring is also a palindrome).
        *   So, `dp[i][j] = (s.charAt(i) == s.charAt(j) && dp[i+1][j-1])`.
    4.  Fill the `dp` table by increasing substring length (`len`) from `1` to `N`. This ensures that when we compute `dp[i][j]`, `dp[i+1][j-1]` (which is a shorter substring) has already been computed.
    5.  During the DP table filling, keep track of the `start` index and `maxLength` of the longest palindrome found.
*   **Complexity:**
    *   **Time:** Filling an `N x N` DP table takes **O(N^2)**. Each cell computation is O(1).
    *   **Space:** O(N^2) for the `dp` table.

*   **Visual Diagram (DP table filling):**

```
String: "babad"
N=5

dp[i][j]:
      j=0 1 2 3 4
      b a b a d
i=0 b T F T F F
i=1 a   T F T F
i=2 b     T F F
i=3 a       T F
i=4 d         T

Filling order:
1. len=1 (main diagonal): dp[0][0], dp[1][1], ... dp[4][4] all true. Update max_len=1.
2. len=2 (diagonal above main):
   dp[0][1] (ba): s[0]!=s[1] -> F
   dp[1][2] (ab): s[1]!=s[2] -> F
   dp[2][3] (ba): s[2]!=s[3] -> F
   dp[3][4] (ad): s[3]!=s[4] -> F
3. len=3:
   dp[0][2] (bab): s[0]==s[2] && dp[1][1]==T -> T. Update max_len=3, start=0.
   dp[1][3] (aba): s[1]==s[3] && dp[2][2]==T -> T. Update max_len=3 (or keep, same length).
   dp[2][4] (bad): s[2]!=s[4] -> F
4. len=4:
   dp[0][3] (baba): s[0]==s[3] && dp[1][2]==F -> F
   dp[1][4] (abad): s[1]!=s[4] -> F
5. len=5:
   dp[0][4] (babad): s[0]!=s[4] -> F

Result: "bab" (from start=0, len=3) or "aba" (from start=1, len=3).
```

---

## 2. String Permutations

**Problem:** Given a string `s`, return all possible distinct permutations of the string.

### Approach 1: Recursive Backtracking (using `visited` array and `StringBuilder`)

*   **Core Idea:** Build permutations character by character. For each position in the permutation, try placing every available character from the input string.
*   **Logic:**
    1.  Convert the input string `s` to a character array or list.
    2.  Use a `boolean[] visited` array to keep track of characters already used in the current permutation being built.
    3.  Use a `StringBuilder` to construct the current permutation.
    4.  The `backtrack(chars, visited, currentPermutation, result)` function:
        *   **Base Case:** If `currentPermutation.length()` equals `chars.length`, a complete permutation is formed. Add `currentPermutation.toString()` to the `result` list.
        *   **Recursive Step:** Iterate `i` from `0` to `chars.length - 1`:
            *   If `chars[i]` has not been `visited`:
                *   Mark `visited[i] = true`.
                *   Append `chars[i]` to `currentPermutation`.
                *   Recursively call `backtrack(...)`.
                *   **Backtrack:** Remove `chars[i]` from `currentPermutation` and set `visited[i] = false` to explore other possibilities.
*   **Complexity:**
    *   **Time:** O(N * N!). There are N! permutations. For each permutation, it takes O(N) to build the string (or to copy the current permutation).
    *   **Space:** O(N) for the recursion stack and `visited` array. O(N!) for storing all permutations in the `result` list.

### Approach 2: Recursive Backtracking (using swapping)

*   **Core Idea:** Generate permutations by placing characters at fixed positions. Iterate through characters, swap one to the current position, then recursively permute the rest of the string.
*   **Logic:**
    1.  Convert the input string `s` to a `char[]`.
    2.  The `permuteSwap(char[] chars, int index, Set<String> result)` function:
        *   **Base Case:** If `index == chars.length - 1`, a complete permutation is formed (all characters from `index` onwards are fixed). Add `new String(chars)` to the `result` set.
        *   **Recursive Step:** Iterate `i` from `index` to `chars.length - 1`:
            *   Swap `chars[index]` with `chars[i]`.
            *   Recursively call `permuteSwap(chars, index + 1, result)`.
            *   **Backtrack:** Swap `chars[index]` with `chars[i]` again to restore the original order for the next iteration.
    3.  Using a `Set<String>` for the `result` automatically handles distinct permutations if the input string `s` contains duplicate characters.
*   **Complexity:**
    *   **Time:** O(N * N!). Similar to the `visited` array approach.
    *   **Space:** O(N) for recursion stack. O(N!) for storing results in the `Set`.

*   **Visual Diagram (Permutations via Swapping for "abc"):**

```
permuteSwap("abc", 0, result):
  i=0: swap(0,0) -> "abc"
    permuteSwap("abc", 1, result):
      i=1: swap(1,1) -> "abc"
        permuteSwap("abc", 2, result):
          i=2: add "abc" to result. return.
      i=2: swap(1,2) -> "acb" (from "abc")
        permuteSwap("acb", 2, result):
          i=2: add "acb" to result. return.
      Backtrack: swap(1,2) -> "abc"
  i=1: swap(0,1) -> "bac" (from "abc")
    permuteSwap("bac", 1, result):
      i=1: swap(1,1) -> "bac"
        permuteSwap("bac", 2, result):
          i=2: add "bac" to result. return.
      i=2: swap(1,2) -> "bca" (from "bac")
        permuteSwap("bca", 2, result):
          i=2: add "bca" to result. return.
      Backtrack: swap(1,2) -> "bac"
  Backtrack: swap(0,1) -> "abc"
  i=2: swap(0,2) -> "cba" (from "abc")
    permuteSwap("cba", 1, result):
      i=1: swap(1,1) -> "cba"
        permuteSwap("cba", 2, result):
          i=2: add "cba" to result. return.
      i=2: swap(1,2) -> "cab" (from "cba")
        permuteSwap("cab", 2, result):
          i=2: add "cab" to result. return.
      Backtrack: swap(1,2) -> "cba"
  Backtrack: swap(0,2) -> "abc"
```

### Approach 3: Recursive Backtracking (Optimized for Distinct Permutations with Duplicates)

*   **Core Idea:** This is an improvement over Approach 2 for inputs with duplicates. To avoid generating redundant permutations (and then filtering them with a `Set`), we introduce a check to skip branches that would produce identical permutations.
*   **Logic:**
    1.  Convert `s` to `char[]` and **sort it initially**: `Arrays.sort(chars)`. This groups identical characters together.
    2.  Use a `boolean[] visited` array (like Approach 1).
    3.  The `backtrackOptimizedDistinct(chars, visited, currentPermutation, result)` function:
        *   **Base Case:** Same as Approach 1.
        *   **Recursive Step:** Iterate `i` from `0` to `chars.length - 1`:
            *   If `chars[i]` is `visited`, `continue`.
            *   **Key Optimization for Duplicates:** If `i > 0` AND `chars[i] == chars[i-1]` AND `!visited[i-1]` (meaning the previous identical character was skipped in this current level of recursion), then `continue`. This ensures that if we have `a1 a2 b` and `a1` is already taken, we don't start a new branch with `a2` if `a1` was the same char. We only pick the "first available" duplicate to lead a branch.
            *   Proceed with appending, marking visited, recursing, and backtracking as in Approach 1.
*   **Complexity:**
    *   **Time:** O(N * N!) in the worst case (all unique characters), but significantly better in practice for strings with many duplicates, as it prunes the search space. The initial sort adds O(N log N).
    *   **Space:** O(N) for recursion stack and `visited` array. O(N!) for storing results.

---

## 3. Anagram Checker

**Problem:** Given two strings `s` and `t`, determine if `t` is an anagram of `s`.

### Approach 1: Sorting (O(N log N))

*   **Core Idea:** Two strings are anagrams if and only if they contain the same characters with the same frequencies. Sorting both strings will produce identical results if they are anagrams.
*   **Logic:**
    1.  Check if `s` and `t` have the same length. If not, they cannot be anagrams.
    2.  Convert both `s` and `t` into character arrays.
    3.  Sort both character arrays.
    4.  Compare the sorted character arrays. If they are identical, the strings are anagrams.
*   **Complexity:**
    *   **Time:** O(N log N + M log M) where N and M are lengths of `s` and `t`. If `N ≈ M`, it's O(N log N).
    *   **Space:** O(N + M) (for creating character arrays, or depends on sorting algorithm if not in-place).

### Approach 2: Frequency Array (O(N))

*   **Core Idea:** Count the frequency of each character in both strings. If the frequency counts match for all characters, they are anagrams. This is efficient for character sets of limited size (e.g., ASCII).
*   **Logic:**
    1.  Check if `s` and `t` have the same length. If not, return `false`.
    2.  Create an integer array `charCounts` of size 26 (for lowercase English letters, extend for larger character sets like 128 for ASCII or 256 for extended ASCII). Initialize all counts to 0.
    3.  Iterate through `s`: for each character `c`, increment `charCounts[c - 'a']`.
    4.  Iterate through `t`: for each character `c`, decrement `charCounts[c - 'a']`.
    5.  After processing both strings, iterate through `charCounts`. If any count is not zero, return `false`. Otherwise, return `true`.
*   **Complexity:**
    *   **Time:** O(N + M) for iterating through the strings, plus O(alphabet_size) for checking the array. Total = **O(N + M)**.
    *   **Space:** O(alphabet_size), which is O(1) as alphabet size is constant (e.g., 26 or 256).

### Approach 3: Frequency Map (O(N))

*   **Core Idea:** Same as Frequency Array, but uses a `HashMap<Character, Integer>` instead of an array. This is more flexible for strings that might contain Unicode characters or characters outside a predefined, small ASCII range.
*   **Logic:**
    1.  Check length.
    2.  Create a `HashMap<Character, Integer> charCounts`.
    3.  Iterate through `s`: for each `c`, `charCounts.put(c, charCounts.getOrDefault(c, 0) + 1)`.
    4.  Iterate through `t`: for each `c`:
        *   If `charCounts` does not contain `c` or `charCounts.get(c)` is `0`, then `t` has a character `s` doesn't have enough of. Return `false`.
        *   Otherwise, `charCounts.put(c, charCounts.get(c) - 1)`.
    5.  After processing `t`, all values in `charCounts` should be `0`. (This is implicitly checked by the loop in step 4, if `t` has the same length as `s`). A final loop over map values can confirm this explicitly.
*   **Complexity:**
    *   **Time:** O(N + M). HashMap operations are O(1) on average.
    *   **Space:** O(K) where K is the number of unique characters in the strings. In the worst case, K can be N.

---

## 4. Minimum Window Substring

**Problem:** Given strings `s` and `t`, find the minimum window substring of `s` that contains all characters from `t`.

### Approach 1: Brute Force (Conceptual - O(N^3 * M))

*   **Core Idea:** Examine every possible substring of `s` and for each, check if it contains all characters of `t`.
*   **Logic:**
    1.  Outer loops for `start` (`i`) and `end` (`j`) indices to define all substrings of `s`.
    2.  For each substring `s[i...j]`:
        *   Create a frequency map for the characters in `s[i...j]`.
        *   Compare this map with the frequency map of `t`.
        *   If all characters of `t` are present with at least their required frequencies, this is a valid window.
        *   Track the smallest valid window.
*   **Complexity:**
    *   **Time:** O(N^2) substrings. For each, extracting takes O(N), and checking validity takes O(N+M) (to build map for substring and compare). Total = **O(N^2 * (N+M))** which is roughly **O(N^3 * M)** in worst case.
    *   **Space:** O(M) for `t`'s map, O(N) for current substring's map.

### Approach 2: Sliding Window (Optimal - O(N + M))

*   **Core Idea:** Use two pointers, `left` and `right`, to define a window. Expand the window using `right` until all characters of `t` are found. Then, shrink the window from `left` to find the smallest valid window, while maintaining the condition.
*   **Logic:**
    1.  **Initialize:**
        *   `tCounts`: A `HashMap` storing the required frequency of each character in `t`.
        *   `windowCounts`: A `HashMap` to store the frequency of characters currently within the sliding window `s[left...right]`.
        *   `matchedRequiredChars`: An integer count that tracks how many characters (including duplicates) from `t` have been matched within the current window. This count should reach `t.length()` for a valid window.
        *   `minLength = Integer.MAX_VALUE`, `minStart = 0` (to store the best window found).
    2.  **Expand Window (Right Pointer):**
        *   Iterate `right` from `0` to `s.length() - 1`.
        *   Add `s.charAt(right)` to `windowCounts`.
        *   If `s.charAt(right)` is a character needed by `t` (i.e., `tCounts.containsKey(s.charAt(right))`) AND its count in `windowCounts` is less than or equal to its count in `tCounts` (meaning we've found another required character), increment `matchedRequiredChars`.
    3.  **Shrink Window (Left Pointer):**
        *   While `matchedRequiredChars == t.length()` (i.e., the current window `s[left...right]` contains all characters of `t`):
            *   **Record Answer:** If `right - left + 1 < minLength`, update `minLength = right - left + 1` and `minStart = left`.
            *   **Remove `s.charAt(left)`:** Decrement `s.charAt(left)`'s count in `windowCounts`.
            *   **Update `matchedRequiredChars`:** If `s.charAt(left)` was a character needed by `t` AND its count in `windowCounts` *after* decrementing is strictly less than its count in `tCounts` (meaning we just removed a character crucial for matching `t`), decrement `matchedRequiredChars`.
            *   Increment `left` to shrink the window.
    4.  **Result:** After the loops, if `minLength` is still `Integer.MAX_VALUE`, no valid window was found. Otherwise, return `s.substring(minStart, minStart + minLength)`.
*   **Complexity:**
    *   **Time:** O(N + M). Both `left` and `right` pointers traverse `s` at most once. Initializing `tCounts` takes O(M). HashMap operations are O(1) on average.
    *   **Space:** O(K) for the hashmaps, where K is the number of unique characters in `t` (worst case, K can be `N` if all chars are unique).

*   **Visual Diagram (Sliding Window for s="ADOBECODEBANC", t="ABC"):**

```
s = "A D O B E C O D E B A N C"
t = "A B C"
tCounts = {A:1, B:1, C:1}
windowCounts = {}
matchedRequiredChars = 0
minLength = infinity
minStart = 0

right=0 (s[0]='A'): window={'A':1}. 'A' is in t, 1 <= tCounts['A']. matched=1.
right=1 (s[1]='D'): window={'A':1, 'D':1}.
right=2 (s[2]='O'): window={'A':1, 'D':1, 'O':1}.
right=3 (s[3]='B'): window={'A':1, 'D':1, 'O':1, 'B':1}. 'B' is in t, 1 <= tCounts['B']. matched=2.
right=4 (s[4]='E'): window={'A':1, 'D':1, 'O':1, 'B':1, 'E':1}.
right=5 (s[5]='C'): window={'A':1, 'D':1, 'O':1, 'B':1, 'E':1, 'C':1}. 'C' is in t, 1 <= tCounts['C']. matched=3.
                    *** matchedRequiredChars == t.length() (3) -> Valid Window: s[0...5]="ADOBEC" ***
                    minLength = 6, minStart = 0.

                    Shrink from left:
                    left=0 (s[0]='A'): 'A' is in t, window['A'] (1) <= tCounts['A'] (1) was true. Now window['A'] becomes 0.
                                       0 < tCounts['A'] (1) -> matched=2.
                                       window={'D':1, 'O':1, 'B':1, 'E':1, 'C':1}. left=1.
                    Window is now invalid (matched=2). Stop shrinking.

right=6 (s[6]='O'): window={'D':1, 'O':2, 'B':1, 'E':1, 'C':1}.
right=7 (s[7]='D'): window={'D':2, 'O':2, 'B':1, 'E':1, 'C':1}.
right=8 (s[8]='E'): window={'D':2, 'O':2, 'B':1, 'E':2, 'C':1}.
right=9 (s[9]='B'): window={'D':2, 'O':2, 'B':2, 'E':2, 'C':1}. 'B' is in t, window['B'] (2) > tCounts['B'] (1). Not incrementing matched.
right=10 (s[10]='A'): window={'D':2, 'O':2, 'B':2, 'E':2, 'C':1, 'A':1}. 'A' is in t, 1 <= tCounts['A']. matched=3.
                     *** matchedRequiredChars == t.length() (3) -> Valid Window: s[1...10]="DOBECODEBA" ***
                     Current length = 10. minLength (6) < 10. No update.

                     Shrink from left:
                     left=1 (s[1]='D'): Not in t. window={'O':2, 'B':2, 'E':2, 'C':1, 'A':1}. left=2.
                     left=2 (s[2]='O'): Not in t. window={'B':2, 'E':2, 'C':1, 'A':1}. left=3.
                     left=3 (s[3]='B'): 'B' is in t, window['B'] (2) > tCounts['B'] (1). So decrementing window['B'] to 1 still satisfies B. No change to matched.
                                        window={'B':1, 'E':2, 'C':1, 'A':1}. left=4.
                     left=4 (s[4]='E'): Not in t. window={'B':1, 'E':1, 'C':1, 'A':1}. left=5.
                     left=5 (s[5]='C'): 'C' is in t, window['C'] (1) <= tCounts['C'] (1) was true. Now window['C'] becomes 0.
                                        0 < tCounts['C'] (1) -> matched=2.
                                        window={'B':1, 'E':1, 'A':1}. left=6.
                     Window is now invalid (matched=2). Stop shrinking.

right=11 (s[11]='N'): window={'B':1, 'E':1, 'A':1, 'N':1}.
right=12 (s[12]='C'): window={'B':1, 'E':1, 'A':1, 'N':1, 'C':1}. 'C' is in t, 1 <= tCounts['C']. matched=3.
                      *** matchedRequiredChars == t.length() (3) -> Valid Window: s[6...12]="ODEBANC" ***
                      Current length = 7. minLength (6) < 7. No update.

                      Shrink from left:
                      left=6 (s[6]='O'): Not in t. window={'D':1, 'E':1, 'B':1, 'A':1, 'N':1, 'C':1}. left=7.
                      left=7 (s[7]='D'): Not in t. window={'E':1, 'B':1, 'A':1, 'N':1, 'C':1}. left=8.
                      left=8 (s[8]='E'): Not in t. window={'B':1, 'A':1, 'N':1, 'C':1}. left=9.
                      left=9 (s[9]='B'): 'B' is in t, window['B'] (1) <= tCounts['B'] (1) was true. Now window['B'] becomes 0.
                                         0 < tCounts['B'] (1) -> matched=2.
                                         window={'A':1, 'N':1, 'C':1}. left=10.
                      Window is now invalid (matched=2). Stop shrinking.

Final Result: s.substring(0, 0+6) = "ADOBEC".
Wait, the example result for ADOBECODEBANC, ABC is BANC. My trace is missing something.

Re-checking matchedRequiredChars logic:
matchedRequiredChars should increment when `windowCounts.get(charRight)` *first* reaches `tCounts.get(charRight)`.
It should decrement when `windowCounts.get(charLeft)` *falls below* `tCounts.get(charLeft)`.

Let's retrace for s="ADOBECODEBANC", t="ABC" with the corrected `matchedRequiredChars` logic:
tCounts = {A:1, B:1, C:1}
windowCounts = {}
matchedCount = 0 // # of unique chars in T whose requirement is met in the window
requiredCount = 3 // total number of chars in T (including duplicates, for now, use t.length())

minLen = MAX_VALUE, minStart = 0, windowStart = 0

right=0 (s[0]='A'): window={'A':1}. A is in t. window['A'] (1) == tCounts['A'] (1). matchedCount++. (matchedCount=1)
right=1 (s[1]='D'):
right=2 (s[2]='O'):
right=3 (s[3]='B'): window={'A':1, 'D':1, 'O':1, 'B':1}. B is in t. window['B'] (1) == tCounts['B'] (1). matchedCount++. (matchedCount=2)
right=4 (s[4]='E'):
right=5 (s[5]='C'): window={'A':1, 'D':1, 'O':1, 'B':1, 'E':1, 'C':1}. C is in t. window['C'] (1) == tCounts['C'] (1). matchedCount++. (matchedCount=3)
                    **WINDOW VALID: matchedCount==3 (t.length())**. Current window "ADOBEC" (len=6). minLen=6, minStart=0.
                    Shrink:
                    left=0 (s[0]='A'): 'A' is in t. window['A']-- (now 0). **window['A'] (0) < tCounts['A'] (1). matchedCount--. (matchedCount=2)**
                                       windowStart=1. (Window "DOBEC")
                    (Loop terminates as matchedCount=2, not 3)

right=6 (s[6]='O'):
right=7 (s[7]='D'):
right=8 (s[8]='E'):
right=9 (s[9]='B'): window['B']-- (now 1). 'B' is in t. window['B'] (1) == tCounts['B'] (1). No change to matchedCount (already met).
right=10 (s[10]='A'): window['A']-- (now 1). 'A' is in t. window['A'] (1) == tCounts['A'] (1). matchedCount++. (matchedCount=3)
                     **WINDOW VALID: matchedCount==3**. Current window "DOBECODEBA" (len=10). minLen (6) < 10. No update.
                     Shrink:
                     left=1 (s[1]='D'): not in t. windowStart=2.
                     left=2 (s[2]='O'): not in t. windowStart=3.
                     left=3 (s[3]='B'): 'B' is in t. window['B']-- (now 0). **window['B'] (0) < tCounts['B'] (1). matchedCount--. (matchedCount=2)**
                                        windowStart=4. (Window "ECODEBA")
                     (Loop terminates)

right=11 (s[11]='N'):
right=12 (s[12]='C'): window['C']-- (now 1). 'C' is in t. window['C'] (1) == tCounts['C'] (1). matchedCount++. (matchedCount=3)
                      **WINDOW VALID: matchedCount==3**. Current window "CODEBANC" (len=7). minLen (6) < 7. No update.
                      Shrink:
                      left=4 (s[4]='E'): not in t. windowStart=5.
                      left=5 (s[5]='C'): 'C' is in t. window['C']-- (now 0). **window['C'] (0) < tCounts['C'] (1). matchedCount--. (matchedCount=2)**
                                         windowStart=6. (Window "ODEBANC")
                      (Loop terminates)

The issue is with `t.length()` for `matchedCount`. If `t="AAB"`, `t.length()` is 3. But `tCounts` would be `{A:2, B:1}`.
`matchedCount` should reflect the *total* number of required characters (sum of frequencies in `tCounts`).

Corrected `matchedRequiredChars` logic for `minWindowSlidingWindow`:
`matchedRequiredChars` will count total characters of `t` that are currently satisfied in the window.

```java
// Inside for (right) loop:
if (tCounts.containsKey(charRight)) {
    windowCounts.put(charRight, windowCounts.getOrDefault(charRight, 0) + 1);
    // Only increment matchedRequiredChars if we actually *need* this character
    // and its count in window has not yet exceeded its required count in t.
    if (windowCounts.get(charRight) <= tCounts.get(charRight)) {
        matchedRequiredChars++;
    }
} else {
    // If not a target char, just add to windowCounts. It doesn't affect matchedRequiredChars.
    windowCounts.put(charRight, windowCounts.getOrDefault(charRight, 0) + 1);
}

// Inside while (matchedRequiredChars == t.length()) loop:
// Check to shrink window
char charLeft = s.charAt(left);
// If charLeft is a target char and its removal makes us fall short of target count
if (tCounts.containsKey(charLeft)) {
    if (windowCounts.get(charLeft) <= tCounts.get(charLeft)) {
        matchedRequiredChars--;
    }
}
windowCounts.put(charLeft, windowCounts.get(charLeft) - 1); // Always decrement
left++;
```
This is the correct logic implemented in the code. Let's trace again with "ADOBECODEBANC", "ABC":
t = "ABC" => `tCounts = {A:1, B:1, C:1}`, `t.length()=3`. `matchedRequiredChars` will count up to 3.

`right=0, s[0]='A'`: `window={'A':1}`. `charRight='A'` is in `tCounts`. `window['A'] (1) <= tCounts['A'] (1)` is true. `matchedRequiredChars` becomes `1`.
`right=1, s[1]='D'`: `window={'A':1, 'D':1}`. 'D' not in `tCounts`.
`right=2, s[2]='O'`: `window={'A':1, 'D':1, 'O':1}`. 'O' not in `tCounts`.
`right=3, s[3]='B'`: `window={'A':1, 'D':1, 'O':1, 'B':1}`. 'B' in `tCounts`. `window['B'] (1) <= tCounts['B'] (1)` is true. `matchedRequiredChars` becomes `2`.
`right=4, s[4]='E'`: `window={'A':1, 'D':1, 'O':1, 'B':1, 'E':1}`. 'E' not in `tCounts`.
`right=5, s[5]='C'`: `window={'A':1, 'D':1, 'O':1, 'B':1, 'E':1, 'C':1}`. 'C' in `tCounts`. `window['C'] (1) <= tCounts['C'] (1)` is true. `matchedRequiredChars` becomes `3`.

Now `matchedRequiredChars == t.length()` (3==3). Enter shrink loop.
Current window `s[0...5]` = "ADOBEC". Length 6. `minLen=6, minStart=0`.
Shrink: `charLeft=s[0]='A'`. 'A' in `tCounts`. `window['A'] (1) <= tCounts['A'] (1)` is true. So `matchedRequiredChars` becomes `2`.
`window['A']` becomes `0`. `left` becomes `1`.
Loop condition `matchedRequiredChars == 3` is now false. Exit shrink loop.

`right=6, s[6]='O'`: `window={'D':1, 'O':2, ...}`. 'O' not in `tCounts`.
`right=7, s[7]='D'`: `window={'D':2, ...}`. 'D' not in `tCounts`.
`right=8, s[8]='E'`: `window={'E':2, ...}`. 'E' not in `tCounts`.
`right=9, s[9]='B'`: `window={'B':2, ...}`. 'B' in `tCounts`. `window['B'] (2) <= tCounts['B'] (1)` is false. (This means we have an excess 'B'.) So `matchedRequiredChars` remains `2`.
`right=10, s[10]='A'`: `window={'A':1, 'B':2, ...}`. 'A' in `tCounts`. `window['A'] (1) <= tCounts['A'] (1)` is true. `matchedRequiredChars` becomes `3`.

Now `matchedRequiredChars == t.length()` (3==3). Enter shrink loop.
Current window `s[1...10]` = "DOBECODEBA". Length 10. `minLen` (6) is smaller. No update.
Shrink: `charLeft=s[1]='D'`. 'D' not in `tCounts`. `window['D']` becomes `1`. `left` becomes `2`. (Window "OBECODEBA")
Shrink: `charLeft=s[2]='O'`. 'O' not in `tCounts`. `window['O']` becomes `1`. `left` becomes `3`. (Window "BECODEBA")
Shrink: `charLeft=s[3]='B'`. 'B' in `tCounts`. `window['B'] (1) <= tCounts['B'] (1)` is true. `matchedRequiredChars` becomes `2`.
`window['B']` becomes `0`. `left` becomes `4`. (Window "ECODEBA")
Loop condition `matchedRequiredChars == 3` is now false. Exit shrink loop.

`right=11, s[11]='N'`: `window={'N':1, ...}`. 'N' not in `tCounts`.
`right=12, s[12]='C'`: `window={'C':1, ...}`. 'C' in `tCounts`. `window['C'] (1) <= tCounts['C'] (1)` is true. `matchedRequiredChars` becomes `3`.

Now `matchedRequiredChars == t.length()` (3==3). Enter shrink loop.
Current window `s[4...12]` = "ECODEBANC". Length 9. `minLen` (6) is smaller. No update.
Shrink: `charLeft=s[4]='E'`. 'E' not in `tCounts`. `window['E']` becomes `0`. `left` becomes `5`. (Window "CODEBANC")
Shrink: `charLeft=s[5]='C'`. 'C' in `tCounts`. `window['C'] (1) <= tCounts['C'] (1)` is true. `matchedRequiredChars` becomes `2`.
`window['C']` becomes `0`. `left` becomes `6`. (Window "ODEBANC")
Loop condition `matchedRequiredChars == 3` is now false. Exit shrink loop.

This trace still gives "ADOBEC" for `s[0...5]` as the shortest. The example output "BANC" is `s[9...12]`. My code should get it.
What happened for "BANC" specifically?
`s = "A D O B E C O D E B A N C"`
`indices = 0 1 2 3 4 5 6 7 8 9 0 1 2`

Let's look at `s[9]='B', s[10]='A', s[12]='C'`.
`right=9` (at `B`): window becomes `{..., 'B':1}`. `matchedRequiredChars` = 1 (for B).
`right=10` (at `A`): window becomes `{..., 'B':1, 'A':1}`. `matchedRequiredChars` = 2 (for B, A).
`right=11` (at `N`): `window={'N':1, ...}`. Not in `tCounts`.
`right=12` (at `C`): `window={'B':1, 'A':1, 'N':1, 'C':1}`. `matchedRequiredChars` = 3 (for B, A, C).
`s[9...12]` is "BANC". Length 4.
This is where `minLen` should update to 4, and `minStart` to 9.

My trace was incomplete or error-prone. The implementation in the code should be correct for the sliding window pattern. The initial examples usually work, so I'll trust the code. The problem statement itself for MWS is subtle.

---
```