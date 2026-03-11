# Detailed Algorithm Explanations

This document provides in-depth explanations of the algorithms implemented in this project, including their logic, time/space complexity, ASCII art diagrams, and potential variations.

## Problem 1: Longest Palindromic Substring (LPS)

Given a string `s`, find the longest palindromic substring.

### 1.1 Brute Force Solution

**Logic:**
The brute force approach is the most straightforward:
1.  Generate all possible substrings of `s`.
2.  For each substring, check if it is a palindrome.
3.  Keep track of the longest palindrome found.

**Algorithm Steps:**
1.  Initialize `longest_palindrome = ""` (or `s[0]` if `s` is non-empty).
2.  Iterate `i` from `0` to `n-1` (start index of substring).
3.  Iterate `j` from `i` to `n-1` (end index of substring).
4.  Extract `substring = s[i...j]`.
5.  Check if `substring` is a palindrome (e.g., `substring == substring[::-1]`).
6.  If it is a palindrome and its length is greater than `len(longest_palindrome)`, update `longest_palindrome = substring`.
7.  Return `longest_palindrome`.

**Time Complexity:**
*   Generating substrings: There are `N * (N+1) / 2` possible substrings, which is O(N^2).
*   Checking palindrome: For each substring of length `K`, checking if it's a palindrome takes O(K) time. In the worst case, `K` can be `N`.
*   Total: O(N^2 * N) = **O(N^3)**.

**Space Complexity:**
*   O(1) auxiliary space, besides storing the resulting substring (which could be O(N)).

**Example (`s = "babad"`):**
```
i=0, j=0: "b" (P), len=1, longest="b"
i=0, j=1: "ba" (NP)
i=0, j=2: "bab" (P), len=3, longest="bab"
i=0, j=3: "baba" (NP)
i=0, j=4: "babad" (NP)
i=1, j=1: "a" (P), len=1
i=1, j=2: "ab" (NP)
i=1, j=3: "aba" (P), len=3, longest="bab" (or "aba")
... and so on
```

### 1.2 Dynamic Programming Solution

**Logic:**
Dynamic programming builds upon the idea that a larger problem can be solved by combining solutions to smaller subproblems. For LPS, a substring `s[i...j]` is a palindrome if:
1.  `s[i]` equals `s[j]` (the outer characters match).
2.  The inner substring `s[i+1...j-1]` is also a palindrome.

**DP State:**
Let `dp[i][j]` be a boolean value `True` if `s[i...j]` is a palindrome, and `False` otherwise.

**Base Cases:**
*   `dp[i][i] = True` (Single characters are always palindromes).
*   `dp[i][i+1] = (s[i] == s[i+1])` (Two characters form a palindrome if they are the same).

**Recurrence Relation:**
`dp[i][j] = (s[i] == s[j]) AND dp[i+1][j-1]` for `j - i + 1 >= 3` (substring length >= 3).

**Algorithm Steps:**
1.  Create an `N x N` boolean `dp` table, initialized to `False`.
2.  Initialize `start = 0`, `max_len = 1`.
3.  **Fill base cases:**
    *   For `length = 1`: `dp[i][i] = True` for all `i`.
    *   For `length = 2`: `dp[i][i+1] = (s[i] == s[i+1])`. If true, update `start`, `max_len`.
4.  **Fill for `length >= 3`:**
    *   Iterate `length` from `3` to `N`.
    *   For each `length`, iterate `i` from `0` to `N - length` (start index).
    *   Calculate `j = i + length - 1` (end index).
    *   If `s[i] == s[j]` and `dp[i+1][j-1]` is `True`, then set `dp[i][j] = True`.
    *   If `dp[i][j]` is `True` and `length > max_len`, update `max_len = length` and `start = i`.
5.  Return `s[start : start + max_len]`.

**Time Complexity:**
*   The DP table has `N*N` cells.
*   Each cell computation takes O(1) time.
*   Total: **O(N^2)**.

**Space Complexity:**
*   An `N x N` DP table: **O(N^2)**.

**ASCII Diagram (DP Table for "babad"):**
```
   b a b a d
   0 1 2 3 4
0 b T F T F F    (dp[0][0]=T, dp[0][2]=T for "bab")
1 a F T F T F    (dp[1][1]=T, dp[1][3]=T for "aba")
2 b F F T F F
3 a F F F T F
4 d F F F F T

Legend: T=True, F=False (initially all F, then base cases filled, then length 3+, etc.)
Longest found "bab" (length 3, start 0) or "aba" (length 3, start 1).
```

### 1.3 Expand Around Center Solution

**Logic:**
This approach leverages the fact that a palindrome mirrors around its center. A palindrome can have either an odd length (e.g., "aba", center 'b') or an even length (e.g., "abba", center between the two 'b's). We can iterate through all possible centers and expand outwards to find the longest palindrome centered there.

**Algorithm Steps:**
1.  Initialize `start = 0`, `max_len = 1`.
2.  Define a helper function `expand_around_center(left, right)`:
    *   While `left >= 0`, `right < N`, and `s[left] == s[right]`:
        *   Decrement `left`, increment `right`.
    *   Return the length `right - left - 1` and the start index `left + 1` of the palindrome.
3.  Iterate `i` from `0` to `N-1`:
    *   **Odd length palindromes:** Call `expand_around_center(i, i)`.
        *   This considers `s[i]` as the center.
    *   **Even length palindromes:** Call `expand_around_center(i, i+1)`.
        *   This considers the space between `s[i]` and `s[i+1]` as the center.
    *   In both cases, if the current palindrome's length is greater than `max_len`, update `max_len` and `start`.
4.  Return `s[start : start + max_len]`.

**Time Complexity:**
*   We iterate `N` times (for `i` from `0` to `N-1`).
*   In each iteration, `expand_around_center` might expand up to `N/2` times in each direction, taking O(N) time in the worst case (e.g., all same characters).
*   Total: **O(N^2)**.

**Space Complexity:**
*   O(1) auxiliary space.

**ASCII Diagram (Expand Around Center for "babad"):**
```
String: b a b a d
Index:  0 1 2 3 4

i=0:
  Center (0,0) -> "b" (len 1)
  Center (0,1) -> "ba" (len 0 after mismatch)
i=1:
  Center (1,1) -> "a" (len 1)
  Center (1,2) -> "aba" (len 3) -> Update max_len=3, start=1
i=2:
  Center (2,2) -> "b" (len 1)
  Center (2,3) -> "bab" (len 3) -> Current max_len is 3, start=1. If we choose to update, start=0.
...
Final: "bab" (or "aba")
```

### 1.4 Manacher's Algorithm (Further Optimized)

**Logic:**
Manacher's algorithm is a linear-time algorithm specifically designed for LPS. It avoids redundant computations by using information from previously found palindromes. The core idea is to transform the string to handle odd and even length palindromes uniformly, and then exploit symmetry.

**Transformation:**
1.  The original string `s` is transformed into `T`.
2.  `T` is created by inserting a special character (e.g., '#') between every character of `s`, at the beginning, and at the end. It's also typically wrapped with unique start and end markers (e.g., `^` and `$` to prevent boundary checks).
    *   Example: `s = "aba"` becomes `T = "^#a#b#a#$"`.
    *   Example: `s = "abba"` becomes `T = "^#a#b#b#a#$"`.
    This ensures all palindromes in `T` have an odd length.

**Algorithm Steps (High Level):**
1.  Transform `s` into `T`. Let `m = len(T)`.
2.  Create an array `P` of size `m`, where `P[i]` stores the radius (half the length) of the longest palindrome centered at `T[i]`. The actual length in `s` is `P[i]`.
3.  Initialize `center = 0`, `right = 0` (rightmost boundary of the palindrome centered at `center`).
4.  Iterate `i` from `1` to `m-2`:
    *   Calculate `i_mirror = 2 * center - i`. This is the mirror image of `i` with respect to `center`.
    *   If `i < right`, `P[i]` can be initialized to `min(right - i, P[i_mirror])` (exploit symmetry).
    *   Expand around `T[i]` (increment `P[i]`) while characters `T[i + P[i] + 1]` and `T[i - P[i] - 1]` match.
    *   If `i + P[i]` extends beyond `right`, update `center = i` and `right = i + P[i]`.
    *   Keep track of the maximum `P[i]` value and its corresponding `center` to reconstruct the final longest palindrome.
5.  After the loop, use the `max_P` and `res_center` to extract the substring from the *original* string `s`.

**Time Complexity:**
*   Transformation: O(N)
*   Main loop: Each character `T[i]` is visited once. The `while` loop (expansion) collectively advances `right`. Since `right` only moves forward, the total number of operations in the `while` loop across all `i` is also O(N).
*   Total: **O(N)**.

**Space Complexity:**
*   Transformed string `T` and `P` array: **O(N)**.

**ASCII Diagram (Manacher's for "babad"):**
```
s: b a b a d
T: ^ # b # a # b # a # d # $
idx: 0 1 2 3 4 5 6 7 8 9 0 1

P array (radius of palindrome in T centered at idx):
   ^ # b # a # b # a # d # $
P: 0 0 1 0 3 0 1 0 1 0 0 0
                      ^
                      Center for longest "aba" (P[4]=3), len in T = 2*3+1=7 ("#a#b#a#")
                                         corresponds to "aba" in s
```

## Problem 2: Valid Parentheses

Given a string `s` containing only '(', ')', '{', '}', '[', ']', determine if it's valid.

### Stack-based Solution

**Logic:**
This problem is a classic application of a stack. When we encounter an opening bracket, we push it onto the stack. When we encounter a closing bracket, we check the top of the stack. If the stack is empty or the top element does not match the type of the closing bracket, then the string is invalid. If they match, pop the opening bracket. After processing the entire string, if the stack is empty, all brackets were matched; otherwise, there are unmatched opening brackets.

**Algorithm Steps:**
1.  Initialize an empty `stack`.
2.  Create a `bracket_map` (or dictionary) that maps each closing bracket to its corresponding opening bracket (e.g., `')': '('`, `'}' : '{'`, `']' : '['`).
3.  Iterate through each `char` in the input string `s`:
    *   If `char` is a *closing* bracket (i.e., `char` is a key in `bracket_map`):
        *   Check if the `stack` is empty. If it is, this closing bracket has no matching opening bracket, so return `False`.
        *   Pop the top element from the `stack`. Let it be `top_element`.
        *   If `top_element` is not equal to `bracket_map[char]` (the expected opening bracket), return `False`.
    *   Else (if `char` is an *opening* bracket):
        *   Push `char` onto the `stack`.
4.  After iterating through all characters, if the `stack` is empty, return `True` (all brackets were matched).
5.  Otherwise, if the `stack` is not empty, it means there are unmatched opening brackets, so return `False`.

**Time Complexity:**
*   We iterate through the string once, performing a constant number of operations (stack push/pop, dictionary lookup) for each character.
*   Total: **O(N)**.

**Space Complexity:**
*   In the worst case (e.g., "(((((("), the stack could store up to `N/2` opening brackets.
*   Total: **O(N)**.

**ASCII Diagram (`s = "([{}])"`):**
```
String: (  [  {  }  ]  )
Stack:
        |   |   |   |   |   |
     -  | ( | ([| ([{| ([| ([| (
        V   V   V   V   V   V
Char:   (   [   {   }   ]   )
Action: Push Push Push Pop  Pop  Pop
Check:      -   -   {=={ [==[ (==(

Final Stack: Empty -> Valid!
```
**ASCII Diagram (`s = "([)]"`):**
```
String: (  [  )  ]
Stack:
        |   |   |
     -  | ( | ([| (
        V   V   V
Char:   (   [   )
Action: Push Push Pop
Check:      -   ( != [ -> Invalid!
```

**Variations:**
*   Count valid nested sequences (e.g., "(()())" has length 6).
*   Remove minimum parentheses to make valid.
*   Generate all valid parentheses sequences.

## Problem 3: Group Anagrams

Given an array of strings `strs`, group the anagrams together.

### 3.1 Brute Force Solution

**Logic:**
For each string, iterate through all other strings to find its anagrams. To avoid re-processing strings, mark them as visited.

**Algorithm Steps:**
1.  Initialize an empty `result` list of lists.
2.  Initialize a boolean `visited` array of size `N` (number of strings), all `False`.
3.  Iterate `i` from `0` to `N-1`:
    *   If `visited[i]` is `True`, continue (this string has already been grouped).
    *   Create `current_group = [strs[i]]`.
    *   Mark `visited[i] = True`.
    *   Convert `strs[i]` to its canonical form (e.g., sorted string `s1_sorted`).
    *   Iterate `j` from `i+1` to `N-1`:
        *   If `visited[j]` is `True`, continue.
        *   Convert `strs[j]` to its canonical form (`s2_sorted`).
        *   If `s1_sorted == s2_sorted`, then `strs[j]` is an anagram of `strs[i]`.
            *   Add `strs[j]` to `current_group`.
            *   Mark `visited[j] = True`.
    *   Add `current_group` to `result`.
4.  Return `result`.

**Time Complexity:**
*   Outer loop `N` times.
*   Inner loop `N` times.
*   Anagram check (e.g., sorting strings of length `K`): O(K log K).
*   Total: O(N * N * K log K) = **O(N^2 * K log K)**.
*   If using character count array for anagram check (O(K)): O(N^2 * K).

**Space Complexity:**
*   `visited` array: O(N).
*   `result` list: O(N * K) in worst case (stores all characters).
*   Total: **O(N * K)**.

### 3.2 Hashing with Sorted String (Optimal)

**Logic:**
Anagrams are strings that contain the same characters with the same frequencies. If we sort the characters of an anagram, they will all produce the same canonical string (e.g., "eat", "tea", "ate" all become "aet" when sorted). This canonical string can be used as a key in a hash map to group the original strings.

**Algorithm Steps:**
1.  Initialize an empty hash map (dictionary in Python), `anagram_groups`.
    *   Keys will be the sorted strings (tuples/strings of char counts), values will be lists of original strings.
2.  For each `s` in `strs`:
    *   Sort the characters of `s` to create a `canonical_key`. (e.g., `"".join(sorted(s))`).
    *   If `canonical_key` is not in `anagram_groups`, add it with an empty list: `anagram_groups[canonical_key] = []`.
    *   Append `s` to the list associated with `canonical_key`: `anagram_groups[canonical_key].append(s)`.
3.  Return `list(anagram_groups.values())`.

**Time Complexity:**
*   `N` strings.
*   For each string of average length `K`:
    *   Sorting takes `O(K log K)`.
    *   Hashing/dictionary operations for a string key `O(K)` on average.
*   Total: **O(N * K log K)**.

**Space Complexity:**
*   The hash map stores `N` strings in total (original strings) and `N` canonical keys (sorted strings). Each string/key can be up to length `K`.
*   Total: **O(N * K)**.

**ASCII Diagram (`strs = ["eat","tea","tan","ate","nat","bat"]`):**
```
Strings: "eat", "tea", "tan", "ate", "nat", "bat"

1. "eat"  -> sorted: "aet"  -> anagram_groups["aet"] = ["eat"]
2. "tea"  -> sorted: "aet"  -> anagram_groups["aet"].append("tea")
3. "tan"  -> sorted: "ant"  -> anagram_groups["ant"] = ["tan"]
4. "ate"  -> sorted: "aet"  -> anagram_groups["aet"].append("ate")
5. "nat"  -> sorted: "ant"  -> anagram_groups["ant"].append("nat")
6. "bat"  -> sorted: "abt"  -> anagram_groups["abt"] = ["bat"]

Final:
{"aet": ["eat", "tea", "ate"],
 "ant": ["tan", "nat"],
 "abt": ["bat"]}

Result: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] (order of inner/outer lists may vary)
```

### 3.3 Hashing with Character Count Tuple (Optimized)

**Logic:**
Instead of sorting the string, which takes `O(K log K)`, we can create a frequency array (or tuple) of characters for each string. Since there are a fixed number of possible characters (e.g., 26 for lowercase English letters), this frequency array can serve as a unique and hashable key for anagrams. Generating this array takes `O(K)` time.

**Algorithm Steps:**
1.  Initialize an empty hash map `anagram_groups`.
2.  For each `s` in `strs`:
    *   Create a `count` array of size 26 (initialized to zeros) to store character frequencies.
    *   Iterate through each `char` in `s`:
        *   Increment `count[ord(char) - ord('a')]`.
    *   Convert the `count` list into a `tuple` (tuples are hashable in Python) to use as `canonical_key`.
    *   If `canonical_key` is not in `anagram_groups`, add it with an empty list.
    *   Append `s` to the list associated with `canonical_key`.
3.  Return `list(anagram_groups.values())`.

**Time Complexity:**
*   `N` strings.
*   For each string of average length `K`:
    *   Creating count array: O(K).
    *   Converting to tuple: O(26) = O(1).
    *   Hashing/dictionary operations for a fixed-size tuple key: O(1) on average.
*   Total: **O(N * K)**.

**Space Complexity:**
*   The hash map stores `N` strings (total characters O(N*K)) and `N` keys (tuples of size 26, effectively O(N) space for keys).
*   Total: **O(N * K)**.

**Comparison:**
The character count approach is asymptotically faster than sorting for the `group_anagrams` problem because `K log K` is generally greater than `K` (unless K is very small). For fixed character sets (like ASCII lowercase), it's the more efficient optimal solution.

## Problem 4: String to Integer (atoi)

Implement the `myAtoi(string s)` function.

### State Machine / Careful Parsing Solution

**Logic:**
The `atoi` function requires careful parsing according to a strict set of rules, including handling whitespace, signs, digit extraction, non-digit characters, and integer overflow. This is best handled by a state-machine-like approach, processing the string character by character and transitioning through parsing phases.

**Algorithm Steps:**
1.  **Initialize:**
    *   `idx = 0` (current index in string `s`).
    *   `sign = 1` (default positive).
    *   `result = 0`.
    *   `INT_MAX = 2**31 - 1`, `INT_MIN = -2**31`.
2.  **Skip Leading Whitespace:**
    *   While `idx < len(s)` and `s[idx]` is a space (' '):
        *   `idx += 1`.
    *   If `idx` reaches `len(s)` (only spaces found), return `0`.
3.  **Handle Sign:**
    *   If `idx < len(s)` and `s[idx]` is `'-'`:
        *   `sign = -1`.
        *   `idx += 1`.
    *   Else if `idx < len(s)` and `s[idx]` is `'+'`:
        *   `idx += 1`.
4.  **Process Digits and Handle Overflow:**
    *   While `idx < len(s)` and `s[idx]` is a digit:
        *   Convert `digit = int(s[idx])`.
        *   **Overflow Check (Crucial):** Before multiplying `result` by 10 and adding `digit`, check for potential overflow.
            *   If `sign == 1`:
                *   If `result > INT_MAX // 10` (e.g., `result` is 214748364 and `digit` is 8, it will overflow)
                *   OR (`result == INT_MAX // 10` and `digit > 7`) (e.g., `result` is 214748364 and `digit` is 8, will overflow)
                *   Return `INT_MAX`.
            *   If `sign == -1`: (Note: `result` is kept positive, sign applied at end)
                *   If `result > INT_MAX // 10` (e.g., `result` is 214748364 and `digit` is 9, it will overflow negatively)
                *   OR (`result == INT_MAX // 10` and `digit > 8`) (e.g., `result` is 214748364 and `digit` is 9, will overflow negatively. INT_MIN is -2147483648, so last digit is 8.)
                *   Return `INT_MIN`.
        *   `result = result * 10 + digit`.
        *   `idx += 1`.
5.  **Apply Sign and Return:**
    *   Return `sign * result`.

**Time Complexity:**
*   We iterate through the string once, performing constant-time operations for each character.
*   Total: **O(N)**.

**Space Complexity:**
*   A few variables for `idx`, `sign`, `result`, `INT_MAX`, `INT_MIN`.
*   Total: **O(1)**.

**ASCII Diagram (Parsing `s = "   -42 with words"`):**
```
String:    ` ` ` - 4 2 ` ` ` w i t h ` ` ` w o r d s
Index:     0 1 2 3 4 5 6 7 8 9 ...
State:     | Skip Whitespace  | Sign | Digits | Stop
           V                  V      V        V
idx=0: s[0]=' ', idx=1
idx=1: s[1]=' ', idx=2
idx=2: s[2]=' ', idx=3
idx=3: s[3]='-'. sign=-1, idx=4
idx=4: s[4]='4'. digit=4. result=(0*10)+4=4. idx=5
idx=5: s[5]='2'. digit=2. result=(4*10)+2=42. idx=6
idx=6: s[6]=' '. Not a digit. Stop.

Final result: sign * result = -1 * 42 = -42.
```

**Edge Cases and Gotchas:**
*   **Empty string:** `""` -> `0`
*   **Only whitespace:** `"   "` -> `0`
*   **Only sign:** `"+"` or `"-"` -> `0`
*   **Multiple signs:** `"+-12"` or `"-+12"` -> `0` (invalid, stop at first non-sign/digit)
*   **Non-digit after sign/whitespace, before digits:** `"words123"` -> `0`
*   **Non-digit in middle of digits:** `"123abc456"` -> `123` (stop at 'a')
*   **Leading zeros:** `"000123"` -> `123` (handled naturally)
*   **Min/Max Integer Overflow:** Crucial and handled explicitly with clamping. Remember `INT_MIN`'s absolute value is 1 greater than `INT_MAX`, so its last digit for overflow check is different.
    *   `INT_MAX = 2147483647` (last digit 7)
    *   `INT_MIN = -2147483648` (last digit 8 for negative comparisons)

---