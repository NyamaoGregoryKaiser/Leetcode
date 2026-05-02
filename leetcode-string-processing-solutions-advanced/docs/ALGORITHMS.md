```markdown
# Detailed Algorithm Explanations

This document provides in-depth explanations for each string manipulation problem, including problem statements, high-level ideas, step-by-step logic, ASCII art diagrams, and comprehensive time and space complexity analysis.

---

## 1. Longest Palindromic Substring

**Problem Statement:** Given a string `s`, return the longest palindromic substring in `s`.

### Approach 1: Expand Around Center

**High-level Idea:**
A palindrome is symmetric around its center. The center can be a single character (for odd-length palindromes like "madam") or the space between two characters (for even-length palindromes like "abba"). We can iterate through every possible center and expand outwards to find the longest palindrome centered there.

**Step-by-step Logic:**
1.  Initialize `start` and `maxLength` to track the longest palindrome found so far (e.g., `start=0`, `maxLength=1` for a single character).
2.  Iterate `i` from `0` to `n-1` (where `n` is the length of `s`). `i` will serve as the center:
    *   **For odd-length palindromes:** `i` itself is the center. Set `left = i` and `right = i`.
    *   **For even-length palindromes:** The center is between `i` and `i+1`. Set `left = i` and `right = i+1`.
3.  For each `(left, right)` pair:
    *   Expand outwards: while `left >= 0`, `right < n`, and `s[left] == s[right]`:
        *   If the current palindrome (`s.substr(left, right - left + 1)`) is longer than `maxLength`, update `maxLength` and `start`.
        *   Decrement `left`, increment `right`.
4.  After checking all possible centers, return `s.substr(start, maxLength)`.

**ASCII Art Diagram (Expand Around Center):**

```
String:  b a b a d
Indices: 0 1 2 3 4

Iteration i = 0: (Center 'b')
  Odd:  left=0, right=0 (b) -> expand(0,0) => "b" (maxLen=1, start=0)
  Even: left=0, right=1 (ba) -> no match

Iteration i = 1: (Center 'a')
  Odd:  left=1, right=1 (a) -> expand(1,1) => "a"
        expand(0,2) (b=b) => "bab" (maxLen=3, start=0)
        expand(-1,3) -> stop
  Even: left=1, right=2 (ab) -> no match

Iteration i = 2: (Center 'b')
  Odd:  left=2, right=2 (b) -> expand(2,2) => "b"
        expand(1,3) (a=a) => "aba" (maxLen=3, start=0 or 1, let's say 0 for "bab")
        expand(0,4) (b=d) -> no match
  Even: left=2, right=3 (ba) -> no match

... and so on.
```

**Time Complexity:** O(N^2)
*   We iterate through `N` possible centers.
*   For each center, in the worst case, we expand outwards `N/2` times.
*   Total: `N * N/2 = O(N^2)`.

**Space Complexity:** O(1)
*   Only a few variables (`start`, `maxLength`, `left`, `right`) are used, independent of input size.

---

### Approach 2: Dynamic Programming

**High-level Idea:**
A substring `s[i...j]` is a palindrome if:
1.  The characters at its ends are equal (`s[i] == s[j]`).
2.  The inner substring `s[i+1...j-1]` is also a palindrome.
This recursive structure lends itself to dynamic programming.

**Step-by-step Logic:**
1.  Create a 2D boolean DP table `dp[n][n]`, where `dp[i][j]` is `true` if `s[i...j]` is a palindrome, `false` otherwise.
2.  **Base Cases:**
    *   All single characters are palindromes: `dp[i][i] = true` for all `i`.
    *   All two-character substrings `s[i...i+1]` are palindromes if `s[i] == s[i+1]`.
3.  **Fill the DP table:** Iterate for increasing substring lengths `k` from 3 to `n`.
    *   For each length `k`, iterate `i` from `0` to `n-k` (start index).
    *   The end index `j` will be `i + k - 1`.
    *   `dp[i][j] = (s[i] == s[j] && dp[i+1][j-1])`.
4.  During the DP table filling, keep track of the `start` index and `maxLength` of the longest palindrome found.
5.  Return `s.substr(start, maxLength)`.

**ASCII Art Diagram (Dynamic Programming):**

```
String:  b a b a d (N=5)

DP Table (dp[i][j] is true if s[i...j] is palindrome)

k=1 (length 1):
dp[0][0]=T ('b')  dp[1][1]=T ('a')  dp[2][2]=T ('b')  dp[3][3]=T ('a')  dp[4][4]=T ('d')
MaxLen=1, Start=0

k=2 (length 2):
s[0]=b, s[1]=a -> dp[0][1]=F
s[1]=a, s[2]=b -> dp[1][2]=F
s[2]=b, s[3]=a -> dp[2][3]=F
s[3]=a, s[4]=d -> dp[3][4]=F

k=3 (length 3):
i=0, j=2 (s[0...2] = "bab"): s[0]=b, s[2]=b, dp[1][1]=T -> dp[0][2]=T (MaxLen=3, Start=0)
i=1, j=3 (s[1...3] = "aba"): s[1]=a, s[3]=a, dp[2][2]=T -> dp[1][3]=T (MaxLen=3, Start=0 or 1)
i=2, j=4 (s[2...4] = "bad"): s[2]=b, s[4]=d -> dp[2][4]=F

k=4 (length 4):
i=0, j=3 (s[0...3] = "baba"): s[0]=b, s[3]=a -> dp[0][3]=F
i=1, j=4 (s[1...4] = "abad"): s[1]=a, s[4]=d -> dp[1][4]=F

k=5 (length 5):
i=0, j=4 (s[0...4] = "babad"): s[0]=b, s[4]=d -> dp[0][4]=F

Final longest: "bab" (or "aba")
```

**Time Complexity:** O(N^2)
*   Two nested loops fill the `N*N` DP table. Each cell calculation is O(1).
*   Total: `O(N^2)`.

**Space Complexity:** O(N^2)
*   A 2D boolean array of size `N*N` is used.

---

## 2. Minimum Window Substring

**Problem Statement:** Given two strings `s` and `t` of lengths `N` and `M` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such window, return an empty string.

### Optimal Approach: Sliding Window with Hash Maps

**High-level Idea:**
Use a sliding window (`left`, `right` pointers) to scan string `s`. Maintain character counts for string `t` and for the current window in `s`. Expand the window by moving `right`, and shrink it by moving `left` when a valid window is found. Keep track of the smallest valid window.

**Step-by-step Logic:**
1.  Handle edge cases: if `t` is empty, `s` is empty, or `t` is longer than `s`, return `""`.
2.  Create a frequency map for `t` (e.g., `charFreqT`) to store counts of characters needed.
3.  Initialize `left = 0`, `formed = 0` (count of unique characters in `t` whose required frequency is met in the current window), `minLen = INT_MAX`, `minStart = 0`.
4.  Create another frequency map for the current window in `s` (e.g., `windowFreq`).
5.  Iterate `right` from `0` to `n-1` (expand the window):
    *   Add `s[right]` to `windowFreq`.
    *   If `s[right]` is in `charFreqT` AND `windowFreq[s[right]] == charFreqT[s[right]]`, increment `formed`. This means we now have enough of `s[right]` to satisfy `t`'s requirement for that character.
6.  While `formed == charFreqT.size()` (meaning all unique characters from `t` are present in the window with at least required frequencies), try to shrink the window from the left:
    *   If `right - left + 1 < minLen`, update `minLen = right - left + 1` and `minStart = left`.
    *   Remove `s[left]` from `windowFreq`.
    *   If `s[left]` was a character from `t` AND `windowFreq[s[left]] < charFreqT[s[left]]` (its count dropped below required), decrement `formed`.
    *   Increment `left`.
7.  After the `right` pointer reaches the end, return `s.substr(minStart, minLen)` if `minLen` is not `INT_MAX`, otherwise return `""`.

**ASCII Art Diagram (Sliding Window):**

```
S = "ADOBECODEBANC", T = "ABC"

charFreqT: {A:1, B:1, C:1}
windowFreq: {}
left = 0, formed = 0, minLen = INF, minStart = 0

right=0, s[0]='A': windowFreq={A:1}. charFreqT has 'A', windowFreq['A']==charFreqT['A'] -> formed=1.
           Window: [A]
right=1, s[1]='D': windowFreq={A:1, D:1}.
           Window: [AD]
right=2, s[2]='O': windowFreq={A:1, D:1, O:1}.
           Window: [ADO]
right=3, s[3]='B': windowFreq={A:1, D:1, O:1, B:1}. charFreqT has 'B', windowFreq['B']==charFreqT['B'] -> formed=2.
           Window: [ADOB]
right=4, s[4]='E': windowFreq={A:1, D:1, O:1, B:1, E:1}.
           Window: [ADOBE]
right=5, s[5]='C': windowFreq={A:1, D:1, O:1, B:1, E:1, C:1}. charFreqT has 'C', windowFreq['C']==charFreqT['C'] -> formed=3.
           Window: [ADOBEC]
           Formed == charFreqT.size() (3==3) -> Window is valid!

           Shrink from left:
           minLen = 6, minStart = 0.
           left=0, s[0]='A': windowFreq={D:1, O:1, B:1, E:1, C:1}. formed=3 (still enough 'A' if T had more, but T has 1 and window has 0, so A not fully matched)
                       Wait, windowFreq['A'] becomes 0, which is < charFreqT['A'](1). So formed decreases. -> formed=2.
           Window: [DOBEC]
           Loop ends (formed != charFreqT.size()).

right=6, s[6]='O': ...
...
right=9, s[9]='B': windowFreq={..., B:1, ...}. formed increases to 3. Window [CODEB]
           minLen = 6, minStart = 0 (old) vs (9-5+1=5)
           minLen = 5, minStart = 5. Window [CODEB]

           Shrink from left:
           left=5, s[5]='C': windowFreq={O:1, D:1, E:1, B:1}. formed decreases to 2.
           Window: [ODEB]
           Loop ends.

...
right=12, s[12]='C': windowFreq={..., C:1}. formed increases to 3. Window [DEBANC]
           minLen = 5 (old) vs (12-7+1=6)
           minLen = 5, minStart = 5.

           Shrink from left:
           left=7, s[7]='D': windowFreq={E:1, B:1, A:1, N:1, C:1}. (D removed)
           left=8, s[8]='E': windowFreq={B:1, A:1, N:1, C:1}. (E removed)
           left=9, s[9]='B': windowFreq={A:1, N:1, C:1}. formed decreases to 2.
           Window: [ANC]
           Loop ends.

Final Result: "BANC" (from minStart=9, minLen=4, window s[9...12] i.e. "BANC")
```

**Time Complexity:** O(N + M)
*   The `right` pointer iterates through `s` once (N operations).
*   The `left` pointer also iterates through `s` at most once (N operations).
*   `charFreqT` map initialization takes O(M).
*   Hash map operations (insertion, deletion, lookup) are O(1) on average.
*   Total: O(N + M).

**Space Complexity:** O(k)
*   Where `k` is the size of the character set (e.g., 256 for ASCII, 52 for English letters).
*   Two hash maps (`charFreqT` and `windowFreq`) are used to store character counts. The maximum number of distinct characters in these maps is `k`.

---

## 3. String to Integer (atoi)

**Problem Statement:** Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer. The function must first discard leading whitespace, then read an optional sign, followed by digits, and interpret them as a numerical value. Additional characters are ignored. Handle cases where no valid conversion is performed (return 0) and integer overflow (clamp to `INT_MAX` or `INT_MIN`).

### Optimal Approach: Careful Parsing with Overflow Checks

**High-level Idea:**
Parse the string character by character, following the rules strictly:
1.  Discard leading whitespace.
2.  Check for an optional sign (`+` or `-`).
3.  Read digits until a non-digit character or end of string.
4.  Convert digits to an integer, checking for 32-bit integer overflow at each step.

**Step-by-step Logic:**
1.  Initialize `result = 0`, `sign = 1` (positive), `i = 0` (current index).
2.  **Skip leading whitespace:** Iterate `i` while `s[i]` is a space.
3.  **Handle sign:** If `s[i]` is `'-'`, set `sign = -1`. If `s[i]` is `'+'`, `sign` remains `1`. In either case, increment `i`.
4.  **Convert digits:** Iterate `i` while `s[i]` is a digit:
    *   Extract the digit: `digit = s[i] - '0'`.
    *   **Overflow Check:** Before `result = result * 10 + digit`, perform checks:
        *   If `sign == 1`:
            *   If `result > INT_MAX / 10` OR (`result == INT_MAX / 10` AND `digit > 7`), then `result * 10 + digit` would overflow `INT_MAX`. Return `INT_MAX`. (Note: `INT_MAX` ends in 7).
        *   If `sign == -1`:
            *   If `result > -(long long)INT_MIN / 10` OR (`result == -(long long)INT_MIN / 10` AND `digit > 8`), then `result * 10 + digit` would overflow `INT_MIN`. Return `INT_MIN`. (Note: `INT_MIN` ends in 8 in absolute value, e.g. -2147483648). Using `-(long long)INT_MIN` is crucial because `abs(INT_MIN)` cannot be represented by a positive `int`.
    *   Update `result`: `result = result * 10 + digit`.
    *   Increment `i`.
5.  Return `result * sign`.

**ASCII Art Diagram (State Machine - simplified):**

```
Start
  |
  V
+---+        ' '        +---+
|   |<------------------|   |
| 1 |  non-' '          | 2 |  '+' or '-'    +---+
|   |------------------>|   |---------------->|   |
+---+                   +---+                 | 3 |  digit
                                              |   |------------+
                                              +---+            |
                                                ^              | non-digit or end
                                                |              |
                                                +--------------+
                                                Read Digits,
                                                Check Overflow
                                                    |
                                                    V
                                                  Finish
```

**Time Complexity:** O(N)
*   The string `s` is traversed at most twice (once for whitespace, once for digits). Each character processing is O(1).

**Space Complexity:** O(1)
*   Only a few variables (`result`, `sign`, `i`) are used.

---

## 4. Group Anagrams

**Problem Statement:** Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Approach 1: Using Sorted String as Key

**High-level Idea:**
Anagrams have the same characters, just in a different order. If we sort the characters of each string, all anagrams will produce the exact same sorted string. We can use this sorted string as a key in a hash map (or `std::map`) to group original strings.

**Step-by-step Logic:**
1.  Create a hash map (e.g., `std::map<std::string, std::vector<std::string>>`) where the key is a sorted string and the value is a list of original strings that are anagrams.
2.  Iterate through each string `s` in the input `strs` vector.
3.  Create a copy of `s`, say `key = s`.
4.  Sort the characters in `key`: `std::sort(key.begin(), key.end())`.
5.  Add the original string `s` to the vector associated with `key` in the hash map: `anagramGroups[key].push_back(s)`.
6.  After iterating through all strings, collect all the `std::vector<std::string>` values from the hash map into a `std::vector<std::vector<std::string>>` result.

**ASCII Art Diagram (Sorted String as Key):**

```
Input: ["eat", "tea", "tan", "ate", "nat", "bat"]

String "eat":  sort("eat") -> "aet"
  Map: {"aet": ["eat"]}

String "tea":  sort("tea") -> "aet"
  Map: {"aet": ["eat", "tea"]}

String "tan":  sort("tan") -> "ant"
  Map: {"aet": ["eat", "tea"], "ant": ["tan"]}

String "ate":  sort("ate") -> "aet"
  Map: {"aet": ["eat", "tea", "ate"], "ant": ["tan"]}

String "nat":  sort("nat") -> "ant"
  Map: {"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"]}

String "bat":  sort("bat") -> "abt"
  Map: {"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"], "abt": ["bat"]}

Result (collecting map values):
[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

**Time Complexity:** O(N * L * log L)
*   `N` is the number of strings in `strs`.
*   `L` is the average length of a string.
*   For each of the `N` strings:
    *   Sorting a string of length `L` takes `O(L log L)`.
    *   Inserting/looking up in `std::map` takes `O(log M)` where `M` is the number of unique sorted keys (at most `N`). String comparison in map takes `O(L)`. So total `O(L log M)`.
    *   If `std::unordered_map` is used, average time is `O(L)` for hashing and lookup. Worst case `O(L*M)`.
*   Overall: `N * (L log L + L) = O(N * L log L)`.

**Space Complexity:** O(N * L)
*   The hash map stores `N` strings (original) and `N` sorted strings (keys).
*   Total space proportional to the sum of lengths of all strings, which is `O(N * L)`.

---

### Approach 2: Using Frequency Array as Key

**High-level Idea:**
Instead of sorting the string, we can count the frequency of each character. For lowercase English letters, a fixed-size array (e.g., `std::array<int, 26>`) can represent the frequency count. This frequency array/vector can then serve as a unique identifier (key) for anagrams. For `std::unordered_map`, a custom hash function for `std::array` is needed.

**Step-by-step Logic:**
1.  Create an `std::unordered_map` where the key is an `std::array<int, 26>` (representing character frequencies 'a' through 'z') and the value is a `std::vector<std::string>`. A custom `ArrayHasher` struct is needed for `std::unordered_map` to hash `std::array`.
2.  Iterate through each string `s` in the input `strs` vector.
3.  For each string `s`, create a frequency array, `freq_array`. Initialize all 26 elements to 0.
4.  Iterate through characters `c` in `s`: increment `freq_array[c - 'a']`.
5.  Use `freq_array` as the key to store the original string `s` in the `unordered_map`: `anagramGroups[freq_array].push_back(s)`.
6.  Collect all `std::vector<std::string>` values from the `unordered_map` into a result vector.

**ASCII Art Diagram (Frequency Array as Key):**

```
Input: ["eat", "tea", "tan", "ate", "nat", "bat"]

String "eat":
  freq_array: [a:1, b:0, c:0, ..., e:1, ..., t:1, ...] (all others 0)
  Map: { [1,0,0,0,1,0,...1]: ["eat"] }

String "tea":
  freq_array: [a:1, b:0, c:0, ..., e:1, ..., t:1, ...] (same as "eat")
  Map: { [1,0,0,0,1,0,...1]: ["eat", "tea"] }

String "tan":
  freq_array: [a:1, b:0, c:0, ..., n:1, ..., t:1, ...]
  Map: { [1,0,0,0,1,0,...1]: ["eat", "tea"],
         [1,0,0,0,0,0,...1,1,...1]: ["tan"] }
         (simplified freq array key representation)

... and so on.
```

**Time Complexity:** O(N * (L + k))
*   `N` is the number of strings.
*   `L` is the average length of a string.
*   `k` is the size of the alphabet (e.g., 26 for lowercase English).
*   For each of the `N` strings:
    *   Building the frequency array takes `O(L)` (iterating through characters).
    *   Hashing the frequency array of size `k` takes `O(k)`.
    *   `unordered_map` insertion/lookup takes `O(1)` on average.
*   Overall: `N * (L + k) = O(N * (L + k))`. This is typically faster than `O(N * L log L)` when `k` is small and `log L` is large (i.e., `L` is long).

**Space Complexity:** O(N * L + N * k)
*   The hash map stores `N` original strings (sum of lengths is `O(N*L)`).
*   It also stores `N` frequency arrays as keys (each `O(k)`), so `O(N*k)` for keys.
*   Total: `O(N * (L + k))`.

```