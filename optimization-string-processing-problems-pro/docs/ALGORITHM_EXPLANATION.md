```markdown
# Detailed Algorithm Explanations

This document provides in-depth explanations of the algorithms implemented in the project, including their logic, step-by-step processes, complexity analysis, and illustrative diagrams where appropriate.

---

## 1. Longest Palindromic Substring (LPS)

**Problem:** Given a string `s`, find the longest palindromic substring.

### 1.1. Approach 1: Expand Around Center

**Logic:**
A palindrome mirrors around its center. The center can be a single character (for odd-length palindromes like "aba") or two adjacent characters (for even-length palindromes like "abba"). This approach iterates through all possible centers and expands outwards to find the maximum length palindrome for each center.

**Step-by-step:**
1.  Initialize `start = 0` and `maxLength = 1` (a single character is always a palindrome).
2.  Iterate `i` from `0` to `s.length - 1`. For each `i`, consider two types of centers:
    *   **Odd length palindromes:** Center is `s[i]`. Initialize `left = i`, `right = i`.
    *   **Even length palindromes:** Center is between `s[i]` and `s[i+1]`. Initialize `left = i`, `right = i + 1`.
3.  For each `(left, right)` pair:
    *   While `left >= 0`, `right < s.length`, and `s[left] === s[right]`:
        *   Decrement `left` and increment `right`.
    *   Once the loop terminates, the palindrome found spans from `left + 1` to `right - 1`. Its length is `(right - 1) - (left + 1) + 1 = right - left - 1`.
4.  Compare this `currentMaxLen` with `maxLength`. If `currentMaxLen` is greater, update `maxLength` and `start`. The new `start` index can be calculated as `i - floor((currentMaxLen - 1) / 2)`.
5.  After checking all possible centers, the substring `s.substring(start, start + maxLength)` is the longest palindromic substring.

**Example Walkthrough: `s = "babad"`**

```
i=0, s[0]='b':
  Odd center 'b': expand(0,0) -> 'b', len=1
  Even center 'b-a': expand(0,1) -> '', len=0
  maxLength=1, start=0, current result: "b"

i=1, s[1]='a':
  Odd center 'a': expand(1,1) -> 'a', len=1
  Even center 'a-b': expand(1,2) -> "aba", len=3
    left=1, right=2. s[1]=a, s[2]=b. No match. len=0.
    Wait, `expandAroundCenter` function:
    expand(s, 1, 2):
      left=1, right=2. s[1]='a', s[2]='b'. Not equal.
      Loop doesn't run. Returns (2-1-1) = 0.
    Oh, my explanation was simplified. Let's trace carefully:
    For i=1:
      1. expandAroundCenter(s, 1, 1): ('a')
         left=1, right=1. s[1]==s[1]. left=0, right=2.
         s[0]='b', s[2]='b'. s[0]==s[2]. left=-1, right=3.
         Loop ends. Length = right - left - 1 = 3 - (-1) - 1 = 3. Palindrome is "bab".
         currentMaxLen = 3.
         Since 3 > maxLength (1), update: maxLength=3, start = 1 - floor((3-1)/2) = 1 - 1 = 0.
         Current longest: "bab" (s[0...2])

      2. expandAroundCenter(s, 1, 2): ('ab')
         left=1, right=2. s[1]='a', s[2]='b'. Not equal.
         Loop doesn't run. Length = right - left - 1 = 2 - 1 - 1 = 0.
         currentMaxLen from this is 0.

i=2, s[2]='b':
  Odd center 'b': expand(2,2) -> 'b', len=1
  Even center 'b-a': expand(2,3) -> "aba" -> len=3
    expand(s, 2, 2): 'b'
      left=2, right=2. s[2]==s[2]. left=1, right=3.
      s[1]='a', s[3]='a'. s[1]==s[3]. left=0, right=4.
      s[0]='b', s[4]='d'. s[0]!=s[4].
      Loop ends. Length = right - left - 1 = 4 - 0 - 1 = 3. Palindrome is "aba".
      currentMaxLen = 3.
      Since 3 is not > maxLength (3), no update.

      expand(s, 2, 3): 'ba'
      left=2, right=3. s[2]='b', s[3]='a'. Not equal. Length = 0.

... and so on.

Final result for "babad" will be "bab" (or "aba", depending on which one is found first or comparison logic).

```
**Complexity:**
*   **Time:** O(N^2) - N iterations for `i`, and each `expandAroundCenter` can take up to O(N) time.
*   **Space:** O(1) - Constant extra space for variables.

### 1.2. Approach 2: Dynamic Programming

**Logic:**
This approach builds a 2D boolean table `dp[i][j]` where `dp[i][j]` is `true` if the substring `s[i...j]` is a palindrome, and `false` otherwise. The crucial observation is that `s[i...j]` is a palindrome if `s[i]` equals `s[j]` AND the inner substring `s[i+1...j-1]` is also a palindrome.

**State Definition:**
`dp[i][j]` = `true` if `s[i...j]` is a palindrome, `false` otherwise.

**Base Cases:**
1.  **Length 1:** `dp[i][i] = true` for all `i`. (Single characters are palindromes).
2.  **Length 2:** `dp[i][i+1] = (s[i] === s[i+1])`. (Two characters are a palindrome if they are identical).

**Recursive Relation:**
`dp[i][j] = (s[i] === s[j]) && dp[i+1][j-1]` for `j - i + 1 > 2` (length > 2).

**Order of Computation:**
We need `dp[i+1][j-1]` to compute `dp[i][j]`. This means we should fill the DP table by increasing substring length (or "gap" between `i` and `j`).

**Step-by-step:**
1.  Initialize `dp[N][N]` table with `false`.
2.  Initialize `start = 0`, `maxLength = 1`.
3.  Fill base cases:
    *   Set `dp[i][i] = true` for all `i`.
    *   For `i` from `0` to `N-2`: if `s[i] === s[i+1]`, set `dp[i][i+1] = true`, update `start = i`, `maxLength = 2`.
4.  Iterate `gap` (substring length - 1) from `2` to `N-1`:
    *   For `i` from `0` to `N - gap - 1`:
        *   Let `j = i + gap`.
        *   If `s[i] === s[j]` AND `dp[i+1][j-1]` is `true`, then `dp[i][j] = true`.
        *   If `dp[i][j]` is `true` and `gap + 1 > maxLength`:
            *   Update `maxLength = gap + 1`.
            *   Update `start = i`.
5.  Return `s.substring(start, start + maxLength)`.

**Example Walkthrough: `s = "babad"`**
`N=5`

Initial `dp` table (all false, except `dp[i][i]` for length 1):
```
  0 1 2 3 4
0 T F F F F
1 F T F F F
2 F F T F F
3 F F F T F
4 F F F F T
```
`maxLength = 1, start = 0`

Length 2 (gap=1):
*   `i=0, j=1`: `s[0]='b', s[1]='a'`. Not equal. `dp[0][1]=F`.
*   `i=1, j=2`: `s[1]='a', s[2]='b'`. Not equal. `dp[1][2]=F`.
*   `i=2, j=3`: `s[2]='b', s[3]='a'`. Not equal. `dp[2][3]=F`.
*   `i=3, j=4`: `s[3]='a', s[4]='d'`. Not equal. `dp[3][4]=F`.
No updates to `maxLength` or `start` based on length 2.

Length 3 (gap=2):
*   `i=0, j=2`: `s[0]='b', s[2]='b'`. Equal. `dp[1][1]` is `T`. So `dp[0][2]=T`.
    `maxLength = 3`, `start = 0`. (Substring "bab")
*   `i=1, j=3`: `s[1]='a', s[3]='a'`. Equal. `dp[2][2]` is `T`. So `dp[1][3]=T`.
    `maxLength` is still 3. No update. (Substring "aba")
*   `i=2, j=4`: `s[2]='b', s[4]='d'`. Not equal. `dp[2][4]=F`.

Current `dp` table:
```
  0 1 2 3 4
0 T F T F F  ("bab")
1 F T F T F  ("aba")
2 F F T F F
3 F F F T F
4 F F F F T
```

Length 4 (gap=3):
*   `i=0, j=3`: `s[0]='b', s[3]='a'`. Not equal. `dp[0][3]=F`.
*   `i=1, j=4`: `s[1]='a', s[4]='d'`. Not equal. `dp[1][4]=F`.

Length 5 (gap=4):
*   `i=0, j=4`: `s[0]='b', s[4]='d'`. Not equal. `dp[0][4]=F`.

Final `maxLength = 3`, `start = 0`. Result: `s.substring(0, 0+3)` which is "bab".

**Complexity:**
*   **Time:** O(N^2) - Filling an N x N table, each cell takes O(1).
*   **Space:** O(N^2) - For the 2D DP table.

---

## 2. Group Anagrams

**Problem:** Given an array of strings `strs`, group the anagrams together.

### 2.1. Approach 1: Sorting Characters

**Logic:**
Anagrams are words that contain the same characters with the same frequencies. If you sort the characters of anagrams, they will all produce the identical sorted string. This sorted string can serve as a unique key for grouping.

**Step-by-step:**
1.  Create a `Map` (hash map) called `anagramGroups`. Keys will be sorted strings, and values will be arrays of original strings that are anagrams.
2.  Iterate through each `str` in the input `strs` array:
    *   Convert `str` to a character array, sort it alphabetically, and join it back into a string. Let this be `key`.
    *   If `key` does not exist in `anagramGroups`, add it with an empty array as its value: `anagramGroups.set(key, [])`.
    *   Append the original `str` to the array associated with `key`: `anagramGroups.get(key).push(str)`.
3.  After processing all strings, extract all the values from `anagramGroups`. These values are the desired groups of anagrams.

**Example Walkthrough: `strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`**

1.  `anagramGroups = {}`
2.  `str = "eat"`:
    *   Sorted: `"aet"`. `key = "aet"`.
    *   `anagramGroups` does not have "aet". `anagramGroups.set("aet", [])`.
    *   `anagramGroups.get("aet").push("eat")`. -> `{"aet": ["eat"]}`
3.  `str = "tea"`:
    *   Sorted: `"aet"`. `key = "aet"`.
    *   `anagramGroups` has "aet".
    *   `anagramGroups.get("aet").push("tea")`. -> `{"aet": ["eat", "tea"]}`
4.  `str = "tan"`:
    *   Sorted: `"ant"`. `key = "ant"`.
    *   `anagramGroups` does not have "ant". `anagramGroups.set("ant", [])`.
    *   `anagramGroups.get("ant").push("tan")`. -> `{"aet": ["eat", "tea"], "ant": ["tan"]}`
5.  `str = "ate"`:
    *   Sorted: `"aet"`. `key = "aet"`.
    *   `anagramGroups` has "aet".
    *   `anagramGroups.get("aet").push("ate")`. -> `{"aet": ["eat", "tea", "ate"], "ant": ["tan"]}`
6.  `str = "nat"`:
    *   Sorted: `"ant"`. `key = "ant"`.
    *   `anagramGroups` has "ant".
    *   `anagramGroups.get("ant").push("nat")`. -> `{"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"]}`
7.  `str = "bat"`:
    *   Sorted: `"abt"`. `key = "abt"`.
    *   `anagramGroups` does not have "abt". `anagramGroups.set("abt", [])`.
    *   `anagramGroups.get("abt").push("bat")`. -> `{"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"], "abt": ["bat"]}`

Finally, return `[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]` (order of groups and elements within groups may vary).

**Complexity:**
*   **Time:** O(N * M log M)
    *   N: number of strings in `strs`.
    *   M: maximum length of a string.
    *   Sorting each string takes O(M log M). There are N strings.
*   **Space:** O(N * M)
    *   In the worst case, all strings are distinct and the hash map stores all N strings, each of length up to M. The keys (sorted strings) also take O(M) space.

### 2.2. Approach 2: Character Counting Array (Frequency Map)

**Logic:**
Instead of sorting, which is O(M log M), we can create a frequency count for each character in a string. For lowercase English letters, an array of 26 integers suffices. This frequency array (or a string representation of it) can then be used as the hash map key. This method is often faster because character counting is O(M) instead of O(M log M).

**Step-by-step:**
1.  Create a `Map` called `anagramGroups`. Keys will be string representations of character counts, and values will be arrays of original strings.
2.  Iterate through each `str` in the input `strs` array:
    *   Create a `charCounts` array of size 26, initialized to zeros. (e.g., `[0, 0, ..., 0]`).
    *   For each character `char` in `str`:
        *   Increment `charCounts[char.charCodeAt(0) - 'a'.charCodeAt(0)]`. This maps 'a' to index 0, 'b' to 1, etc.
    *   Convert `charCounts` into a unique string key. A good way is to `join` the counts with a delimiter, e.g., `charCounts.join('#')`. This prevents ambiguity (e.g., `[1,11]` vs `[11,1]` would both be "111" without a delimiter).
    *   If `key` does not exist in `anagramGroups`, add it with an empty array.
    *   Append the original `str` to the array associated with `key`.
3.  After processing all strings, extract all the values from `anagramGroups`.

**Example Walkthrough: `strs = ["eat", "tea"]`**

1.  `anagramGroups = {}`
2.  `str = "eat"`:
    *   `charCounts = [0]*26`.
    *   'e': `charCounts[4]++` -> `[0,0,0,0,1,...]`
    *   'a': `charCounts[0]++` -> `[1,0,0,0,1,...]`
    *   't': `charCounts[19]++` -> `[1,0,0,0,1,...,1,...]`
    *   `key = "1#0#0#0#1#...#0#1#0..."` (string representation of the array)
    *   `anagramGroups.set(key, ["eat"])`
3.  `str = "tea"`:
    *   `charCounts = [0]*26`.
    *   't': `charCounts[19]++`
    *   'e': `charCounts[4]++`
    *   'a': `charCounts[0]++`
    *   `key = "1#0#0#0#1#...#0#1#0..."` (same key as "eat")
    *   `anagramGroups.get(key).push("tea")`. -> `{"1#...": ["eat", "tea"]}`

**Complexity:**
*   **Time:** O(N * M)
    *   N: number of strings.
    *   M: maximum length of a string.
    *   Counting characters for each string takes O(M).
    *   Generating the key from a fixed-size (26) array takes O(1).
*   **Space:** O(N * M)
    *   Similar to sorting, storing all strings in the map values. Keys are constant size (26 characters plus delimiters).

---

## 3. KMP String Matching

**Problem:** Implement `strstr` (find the first occurrence of `needle` in `haystack`).

### 3.1. Approach 1: Brute Force

**Logic:**
The simplest approach is to check every possible starting position in the `haystack` for an occurrence of the `needle`.

**Step-by-step:**
1.  Handle edge cases: if `needle` is empty, return 0. If `haystack` is shorter than `needle`, return -1.
2.  Iterate `i` from `0` to `haystack.length - needle.length`. This `i` is the potential starting index of the `needle` in `haystack`.
3.  For each `i`, start an inner loop with `j` from `0` to `needle.length - 1`.
    *   Compare `haystack[i + j]` with `needle[j]`.
    *   If a mismatch occurs (`haystack[i + j] !== needle[j]`), set a `match` flag to `false` and `break` the inner loop.
4.  If the inner loop completes with `match` still `true`, it means `needle` was found starting at `i`. Return `i`.
5.  If the outer loop completes without finding a match, return -1.

**Example: `haystack = "ABABCABAB"`, `needle = "BAB"`**

*   `i=0`: "ABA" vs "BAB" -> Mismatch at `haystack[0]` vs `needle[0]` ('A' vs 'B').
*   `i=1`: "BAB" vs "BAB" -> Match! Return 1.

**Complexity:**
*   **Time:** O(N * M)
    *   N: length of `haystack`.
    *   M: length of `needle`.
    *   In the worst case (e.g., `haystack = "aaaaab"`, `needle = "aaab"`), the inner loop runs almost `M` times for each of `N-M+1` outer loop iterations.
*   **Space:** O(1)

### 3.2. Approach 2: Knuth-Morris-Pratt (KMP) Algorithm

**Logic:**
The KMP algorithm optimizes string searching by avoiding redundant comparisons. When a mismatch occurs, instead of blindly shifting the `needle` by one position, it uses a precomputed table (the "LPS array") to determine the next optimal shift. The LPS array stores the length of the longest proper prefix of a substring that is also a suffix of that substring. This information allows us to intelligently "slide" the pattern forward.

**Key Concept: LPS Array (Longest Proper Prefix which is also Suffix)**
`lps[i]` for a pattern `P` is the length of the longest proper prefix of `P[0...i]` that is also a suffix of `P[0...i]`.

**Example: `needle = "ABABCABAB"`**

| Index `i` | Character `P[i]` | Prefix `P[0...i]` | Proper Prefixes | Suffixes | LPS `lps[i]` |
| :-------- | :--------------- | :---------------- | :-------------- | :------- | :----------- |
| 0         | A                | A                 |                 |          | 0            |
| 1         | B                | AB                | A               | B        | 0            |
| 2         | A                | ABA               | A, AB           | A, BA    | 1            |
| 3         | B                | ABAB              | A, AB, ABA      | B, AB, BAB | 2            |
| 4         | C                | ABABC             | A, AB, ABA, ABAB | C, BC, ABC, BABC | 0            |
| 5         | A                | ABABCA            | ...             | ...      | 1            |
| 6         | B                | ABABCAB           | ...             | ...      | 2            |
| 7         | A                | ABABCABA          | ...             | ...      | 3            |
| 8         | B                | ABABCABAB         | ...             | ...      | 4            |

**LPS Array for "ABABCABAB" is `[0, 0, 1, 2, 0, 1, 2, 3, 4]`**

**Algorithm Steps:**

**Part 1: `computeLPSArray(needle)`**
1.  Create an `lps` array of size `M` (length of `needle`), initialized to zeros. `lps[0]` is always 0.
2.  Use two pointers:
    *   `length`: length of the previous longest prefix suffix. Initially 0.
    *   `i`: current index in the `needle` (starts from 1).
3.  While `i < M`:
    *   If `needle[i] === needle[length]`:
        *   Increment `length`.
        *   Set `lps[i] = length`.
        *   Increment `i`.
    *   Else (`needle[i] !== needle[length]`):
        *   If `length` is not 0: set `length = lps[length - 1]`. (This means we are looking for a shorter prefix that is also a suffix).
        *   If `length` is 0: set `lps[i] = 0`. Increment `i`. (No common prefix suffix, start over with length 0).

**Part 2: `strStrKMP(haystack, needle)`**
1.  Compute the `lps` array for `needle` using the function above.
2.  Initialize two pointers:
    *   `i`: pointer for `haystack` (text). Initially 0.
    *   `j`: pointer for `needle` (pattern). Initially 0.
3.  While `i < N` (length of `haystack`):
    *   If `haystack[i] === needle[j]`:
        *   Increment `i` and `j`.
    *   If `j` reaches `M` (length of `needle`):
        *   A match is found! Return `i - j` (the starting index in `haystack`).
    *   Else if `i < N` and `haystack[i] !== needle[j]` (mismatch):
        *   If `j` is not 0: set `j = lps[j - 1]`. (Shift `needle` using LPS array to align the longest proper prefix suffix).
        *   If `j` is 0: increment `i`. (No prefix to backtrack, just move to the next character in `haystack`).
4.  If the loop finishes and no match is found, return -1.

**Example Walkthrough: `haystack = "ABABDABACDABABCABAB"`, `needle = "ABABCABAB"`**
`lps` array for `needle`: `[0, 0, 1, 2, 0, 1, 2, 3, 4]`

```
haystack: A B A B D A B A C D A B A B C A B A B
needle:   A B A B C A B A B
          ^ (i=0, j=0)

Match A==A, B==B, A==A, B==B. Mismatch D!=C.
haystack: A B A B D A B A C D A B A B C A B A B
needle:   A B A B C A B A B
                ^ ^ (i=4, j=4) Mismatch!
j = lps[j-1] = lps[3] = 2. Shift needle.
haystack: A B A B D A B A C D A B A B C A B A B
needle:         A B A B C A B A B
                ^ (i=4, j=2)

Match D!=A.
haystack: A B A B D A B A C D A B A B C A B A B
needle:         A B A B C A B A B
                  ^ ^ (i=4, j=2) Mismatch!
j = lps[j-1] = lps[1] = 0. Shift needle.
haystack: A B A B D A B A C D A B A B C A B A B
needle:           A B A B C A B A B
                  ^ (i=4, j=0)

Mismatch D!=A. j is 0. Increment i.
haystack: A B A B D A B A C D A B A B C A B A B
needle:           A B A B C A B A B
                    ^ (i=5, j=0)

... eventually ...

haystack: A B A B D A B A C D A B A B C A B A B
needle:                       A B A B C A B A B
                            ^ (i=10, j=0)

Match A==A, B==B, A==A, B==B, C==C, A==A, B==B, A==A, B==B.
Full match! j reaches M (9).
Return i - j = 19 - 9 = 10.

```

**Complexity:**
*   **Time:** O(N + M)
    *   `computeLPSArray` takes O(M).
    *   The search phase takes O(N) because `i` advances by at least 1 in each step (either `i++` or `i++` and `j` resets). `j` never decreases `i`. Each character of `haystack` and `needle` is visited a constant number of times.
*   **Space:** O(M) for the LPS array.

---

## 4. Minimum Window Substring

**Problem:** Find the minimum window substring of `s` that contains all characters of `t` (including duplicates).

### Approach: Sliding Window with Two Pointers and Hash Map

**Logic:**
This problem is a classic sliding window scenario. We use two pointers, `windowStart` (left) and `windowEnd` (right), to define a current window in string `s`. We expand the window by moving `windowEnd` and contract it by moving `windowStart`. Hash maps are used to keep track of character frequencies needed from `t` and characters currently present in the window.

**Step-by-step:**
1.  **Initialize `mapT`**: Create a hash map (`mapT`) to store the required frequencies of characters in `t`.
    *   Example: `t = "ABC"` -> `mapT = { 'A': 1, 'B': 1, 'C': 1 }`
    *   Example: `t = "AA"` -> `mapT = { 'A': 2 }`
2.  **Initialize Window Variables**:
    *   `windowStart = 0` (left pointer of the window).
    *   `matchedCharsCount = 0`: This count tracks how many characters from `t` (with their required frequencies) are currently "covered" by the window. We increment `matchedCharsCount` when `mapT[char]` becomes non-negative after `char` is encountered (meaning we've met a requirement). We decrement when `mapT[char]` becomes positive after `char` is removed (meaning we now lack a required character). When `matchedCharsCount` equals `t.length`, the window is valid.
    *   `minLength = Infinity`: Stores the length of the smallest valid window found so far.
    *   `minWindowStart = 0`: Stores the starting index of the smallest valid window.
3.  **Expand the Window (Move `windowEnd`)**:
    *   Iterate `windowEnd` from `0` to `s.length - 1`.
    *   Let `rightChar = s[windowEnd]`.
    *   If `rightChar` is a character present in `mapT`:
        *   Decrement `mapT[rightChar]`. (This signifies we've "used" one instance of this character from `t`'s requirement).
        *   If `mapT[rightChar] >= 0`, increment `matchedCharsCount`. (This means we successfully covered a *required* instance of `rightChar`. If `mapT[rightChar]` went negative, it means we have more `rightChar` in the window than `t` needs, but we only care about covering the *required* count).
4.  **Contract the Window (Move `windowStart`)**:
    *   While `matchedCharsCount === t.length` (meaning the current window `s[windowStart...windowEnd]` is valid):
        *   **Check for smaller window**: If `(windowEnd - windowStart + 1) < minLength`:
            *   Update `minLength = windowEnd - windowStart + 1`.
            *   Update `minWindowStart = windowStart`.
        *   **Shrink from left**: Let `leftChar = s[windowStart]`.
        *   Increment `windowStart`.
        *   If `leftChar` is a character present in `mapT`:
            *   Increment `mapT[leftChar]`. (We are removing `leftChar` from the window, so `t`'s requirement needs to be re-evaluated).
            *   If `mapT[leftChar] > 0`, decrement `matchedCharsCount`. (This means by removing `leftChar`, we no longer fulfill a *required* instance of it, so the window might become invalid).
5.  **Return Result**:
    *   If `minLength` is still `Infinity`, return `""`.
    *   Otherwise, return `s.substring(minWindowStart, minWindowStart + minLength)`.

**Example Walkthrough: `s = "ADOBECODEBANC"`, `t = "ABC"`**

Initial: `mapT = {'A':1, 'B':1, 'C':1}`, `windowStart=0`, `matchedCharsCount=0`, `minLength=Infinity`, `minWindowStart=0`

| `windowEnd` | `s[windowEnd]` | `mapT` State              | `matchedCharsCount` | Window `s[start...end]` | `minLength` | `minWindowStart` | Comments                                   |
| :---------- | :------------- | :------------------------ | :------------------ | :---------------------- | :---------- | :--------------- | :----------------------------------------- |
| 0           | A              | {'A':0, 'B':1, 'C':1}     | 1                   | "A"                     | Inf         | 0                | `mapT['A']` became 0 (>=0), so `matched++` |
| 1           | D              | (no change)               | 1                   | "AD"                    | Inf         | 0                |                                            |
| 2           | O              | (no change)               | 1                   | "ADO"                   | Inf         | 0                |                                            |
| 3           | B              | {'A':0, 'B':0, 'C':1}     | 2                   | "ADOB"                  | Inf         | 0                | `mapT['B']` became 0 (>=0), so `matched++` |
| 4           | E              | (no change)               | 2                   | "ADOBE"                 | Inf         | 0                |                                            |
| 5           | C              | {'A':0, 'B':0, 'C':0}     | 3                   | "ADOBEC"                | Inf         | 0                | `mapT['C']` became 0 (>=0), so `matched++` |
|             |                | **Window "ADOBEC" is valid (`matchedCharsCount` == `t.length`)** |                     |                         |             |                  |                                            |
|             | **Contract**   |                           |                     |                         |             |                  | Current len = 6. minLength=6, minWindowStart=0 |
| `ws=0` -> `s[0]` = A | A     | {'A':1, 'B':0, 'C':0}     | 2                   | "DOBEC"                 | 6           | 0                | `mapT['A']` became 1 (>0), `matched--`     |
|             | **Window Invalid** |                           |                     |                         |             |                  |                                            |
| 6           | O              | (no change)               | 2                   | "DOBECO"                | 6           | 0                |                                            |
| 7           | D              | (no change)               | 2                   | "DOBECOD"               | 6           | 0                |                                            |
| 8           | E              | (no change)               | 2                   | "DOBECODE"              | 6           | 0                |                                            |
| 9           | B              | {'A':1, 'B':-1, 'C':0}    | 2                   | "DOBECODEB"             | 6           | 0                | `mapT['B']` became -1 (not >=0) `matched` unchanged|
| 10          | A              | {'A':0, 'B':-1, 'C':0}    | 3                   | "DOBECODEBA"            | 6           | 0                | `mapT['A']` became 0 (>=0), so `matched++` |
|             |                | **Window "DOBECODEBA" is valid** |                     |                         |             |                  |                                            |
|             | **Contract**   |                           |                     |                         |             |                  | Current len = 11-4+1 = 8. (start=4) |
| `ws=1` -> `s[1]` = D | D     | (no change)               | 3                   | "OBECODEBA"             | 6           | 0                |                                            |
| `ws=2` -> `s[2]` = O | O     | (no change)               | 3                   | "BECODEBA"              | 6           | 0                |                                            |
| `ws=3` -> `s[3]` = B | B     | {'A':0, 'B':0, 'C':0}     | 3                   | "ECODEBA"               | 6           | 0                | `mapT['B']` became 0 (not >0) `matched` unchanged|
| `ws=4` -> `s[4]` = E | E     | (no change)               | 3                   | "CODEBA"                | 6           | 0                |                                            |
| `ws=5` -> `s[5]` = C | C     | {'A':0, 'B':0, 'C':1}     | 2                   | "ODEBA"                 | 6           | 0                | `mapT['C']` became 1 (>0), `matched--`     |
|             | **Window Invalid** |                           |                     |                         |             |                  |                                            |
| 11          | N              | (no change)               | 2                   | "ODEBAN"                | 6           | 0                |                                            |
| 12          | C              | {'A':0, 'B':0, 'C':0}     | 3                   | "ODEBANC"               | 6           | 0                | `mapT['C']` became 0 (>=0), `matched++`    |
|             |                | **Window "ODEBANC" is valid** |                     |                         |             |                  |                                            |
|             | **Contract**   |                           |                     |                         |             |                  | Current len = 13-6+1 = 8. (start=6) |
| `ws=6` -> `s[6]` = O | O     | (no change)               | 3                   | "DEBANC"                | 6           | 0                |                                            |
| `ws=7` -> `s[7]` = D | D     | (no change)               | 3                   | "EBANC"                 | 6           | 0                |                                            |
| `ws=8` -> `s[8]` = E | E     | (no change)               | 3                   | "BANC"                  | 6           | 0                |                                            |
| `ws=9` -> `s[9]` = B | B     | {'A':0, 'B':1, 'C':0}     | 2                   | "ANC"                   | 6           | 0                | `mapT['B']` became 1 (>0), `matched--`     |
|             | **Window Invalid** |                           |                     |                         |             |                  |                                            |

End of `s`. `minLength = 6`, `minWindowStart = 0`. But this window was `s[0...5]` which is "ADOBEC".
Let's re-evaluate the update: at `windowEnd=5`, "ADOBEC", length 6. `minLength=6, minWindowStart=0`.
At `windowEnd=12`, "ODEBANC", length 8. No update.

The first valid window was "ADOBEC" (length 6), but `s[0]` to `s[5]` are 'A','D','O','B','E','C'.
Wait, my trace of the `left` pointer was slightly off in how `windowStart` was actually derived in the code vs. example.
The provided code uses `mapT` as the frequency map that goes negative. `matchedCharsCount` counts when `mapT[char] >= 0`. This is the most common way.

Let's re-trace `s = "ADOBECODEBANC"`, `t = "ABC"` more carefully with the code logic:

`mapT = {'A':1, 'B':1, 'C':1}`, `start=0`, `matched=0`, `minLen=Inf`, `minWinStart=0`

`windowEnd=0, s[0]='A'`: `mapT['A']--` -> `{'A':0, 'B':1, 'C':1}`. `0 >= 0` so `matched++` (1).
`windowEnd=1, s[1]='D'`: (not in mapT)
`windowEnd=2, s[2]='O'`: (not in mapT)
`windowEnd=3, s[3]='B'`: `mapT['B']--` -> `{'A':0, 'B':0, 'C':1}`. `0 >= 0` so `matched++` (2).
`windowEnd=4, s[4]='E'`: (not in mapT)
`windowEnd=5, s[5]='C'`: `mapT['C']--` -> `{'A':0, 'B':0, 'C':0}`. `0 >= 0` so `matched++` (3).

***`matched === t.length` (3 === 3). Window "ADOBEC" is valid.***
Current length = 5 - 0 + 1 = 6. `minLength = 6`, `minWindowStart = 0`.
**Shrink loop:**
  `leftChar = s[0] = 'A'`: `start++` (1). `mapT['A']++` -> `{'A':1, 'B':0, 'C':0}`. `1 > 0` so `matched--` (2).
  Window is now "DOBEC". Invalid. Loop ends.

`windowEnd=6, s[6]='O'`: (not in mapT)
`windowEnd=7, s[7]='D'`: (not in mapT)
`windowEnd=8, s[8]='E'`: (not in mapT)
`windowEnd=9, s[9]='B'`: `mapT['B']--` -> `{'A':1, 'B':-1, 'C':0}`. `-1 < 0` so `matched` unchanged (2).
`windowEnd=10, s[10]='A'`: `mapT['A']--` -> `{'A':0, 'B':-1, 'C':0}`. `0 >= 0` so `matched++` (3).

***`matched === t.length` (3 === 3). Window "ODEBA" (s[1...10]) is valid.***
Current length = 10 - 1 + 1 = 10. `10` is not `< minLength (6)`. No update to `minLen`/`minWinStart`.
**Shrink loop:**
  `leftChar = s[1] = 'D'`: `start++` (2). (not in mapT)
  `leftChar = s[2] = 'O'`: `start++` (3). (not in mapT)
  `leftChar = s[3] = 'B'`: `start++` (4). `mapT['B']++` -> `{'A':0, 'B':0, 'C':0}`. `0` is not `> 0` so `matched` unchanged (3).
  Window is "EBA" (s[4...10]). Still valid. Current length = 10 - 4 + 1 = 7. `7` is not `< minLength (6)`. No update.
  `leftChar = s[4] = 'E'`: `start++` (5). (not in mapT)
  Window is "BA" (s[5...10]). Still valid. Current length = 10 - 5 + 1 = 6. `6` is not `< minLength (6)`. No update.
  `leftChar = s[5] = 'C'`: `start++` (6). `mapT['C']++` -> `{'A':0, 'B':0, 'C':1}`. `1 > 0` so `matched--` (2).
  Window is "BA" (s[6...10]). Invalid. Loop ends.

`windowEnd=11, s[11]='N'`: (not in mapT)
`windowEnd=12, s[12]='C'`: `mapT['C']--` -> `{'A':0, 'B':0, 'C':0}`. `0 >= 0` so `matched++` (3).

***`matched === t.length` (3 === 3). Window "BANC" (s[9...12]) is valid.***
Current length = 12 - 9 + 1 = 4. `4 < minLength (6)`. Update `minLength = 4`, `minWindowStart = 9`.
**Shrink loop:**
  `leftChar = s[9] = 'B'`: `start++` (10). `mapT['B']++` -> `{'A':0, 'B':1, 'C':0}`. `1 > 0` so `matched--` (2).
  Window is "ANC" (s[10...12]). Invalid. Loop ends.

End of `s`.
Return `s.substring(minWindowStart, minWindowStart + minLength)` = `s.substring(9, 9 + 4)` = `s.substring(9, 13)` = "BANC".

**Complexity:**
*   **Time:** O(S + T)
    *   S: length of `s`.
    *   T: length of `t`.
    *   `mapT` initialization: O(T).
    *   `windowEnd` pointer iterates once through `s`: O(S).
    *   `windowStart` pointer iterates at most once through `s`: O(S).
    *   Hash map operations are O(1) on average.
*   **Space:** O(1) (specifically O(A) where A is the size of the alphabet, which is constant). The hash maps store at most `A` unique characters.

---
```