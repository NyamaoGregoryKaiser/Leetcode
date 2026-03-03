```markdown
# Algorithm Explanations for String Manipulation Problems

This document provides in-depth explanations of the algorithms implemented in the project, including their logic, step-by-step walkthroughs, ASCII diagrams, time/space complexity analysis, and common edge cases.

---

## 1. Longest Palindromic Substring

**Problem:** Given a string `s`, return the longest palindromic substring in `s`.

### Approach 1: Expand Around Center

**Logic:**
A palindrome is a sequence that reads the same forwards and backward. This implies it has a central point (or two central points for even-length palindromes) from which it expands symmetrically. The "Expand Around Center" approach iterates through every possible center and expands outwards to find the longest palindrome centered at that point.

There are `2N-1` possible centers in a string of length `N`:
1.  `N` centers for odd-length palindromes (each character `s[i]` can be a center).
    Example: `a b a d` -> `b` is center for `aba`.
2.  `N-1` centers for even-length palindromes (each pair of adjacent characters `s[i], s[i+1]` can be a center).
    Example: `a b b a` -> `bb` is center for `abba`.

**Algorithm Steps:**
1.  Initialize `maxLength = 0` and `start = 0` (to track the longest palindrome found so far).
2.  Iterate `i` from `0` to `s.length() - 1`:
    *   Call a helper function `expandAroundCenter(s, i, i)` to handle odd-length palindromes.
    *   Call `expandAroundCenter(s, i, i + 1)` to handle even-length palindromes.
3.  The `expandAroundCenter(s, left, right)` helper function:
    *   Takes the string `s` and two pointers `left` and `right` (representing the initial center(s)).
    *   While `left >= 0`, `right < s.length()`, AND `s.charAt(left) == s.charAt(right)`:
        *   Decrement `left` and increment `right`.
    *   Once the loop terminates, `left` and `right` are one step *outside* the actual palindrome.
    *   The palindrome's length is `right - left - 1`.
    *   If this `currentLength` is greater than `maxLength`, update `maxLength` and `start = left + 1`.
4.  After checking all centers, return `s.substring(start, start + maxLength)`.

**ASCII Diagram (Expand Around Center for "babad"):**

```
String:   b a b a d
Indices:  0 1 2 3 4

Iteration i = 0 (char 'b'):
  Center 'b' (0,0):
    expand(s, 0, 0) -> check s[0]==s[0] (b==b)
      left=-1, right=1. Current segment s[-1...1] is "b". length=1.
      maxLength=1, start=0.
  Center 'b','a' (0,1):
    expand(s, 0, 1) -> check s[0]==s[1] (b==a) -> false.
      left=0, right=1. Current segment is "". length=0.

Iteration i = 1 (char 'a'):
  Center 'a' (1,1):
    expand(s, 1, 1) -> check s[1]==s[1] (a==a)
      left=0, right=2. check s[0]==s[2] (b==b)
        left=-1, right=3. Palindrome s[0...2] is "bab". length=3.
        maxLength=3, start=0. (Updates from "b")
  Center 'a','b' (1,2):
    expand(s, 1, 2) -> check s[1]==s[2] (a==b) -> false.
      left=1, right=2. Current segment is "". length=0.

Iteration i = 2 (char 'b'):
  Center 'b' (2,2):
    expand(s, 2, 2) -> check s[2]==s[2] (b==b)
      left=1, right=3. check s[1]==s[3] (a==a)
        left=0, right=4. check s[0]==s[4] (b==d) -> false.
        left=0, right=4. Palindrome s[1...3] is "aba". length=3.
        maxLength=3 (no update, already 3), start=0 (no update, start still 0).
  Center 'b','a' (2,3):
    expand(s, 2, 3) -> check s[2]==s[3] (b==a) -> false.

... and so on. Finally, returns `s.substring(0, 3)` which is "bab".
```

**Complexity Analysis:**
*   **Time Complexity:** O(N^2)
    *   We iterate through `N` characters for `i`.
    *   For each `i`, `expandAroundCenter` is called twice.
    *   In the worst case (e.g., "aaaaa"), `expandAroundCenter` can iterate `N/2` times.
    *   Thus, roughly `N * O(N) = O(N^2)`.
*   **Space Complexity:** O(1)
    *   Only a few variables are used to store indices and lengths.

**Edge Cases & Gotchas:**
*   **Empty string or null string:** Handle by returning `""`.
*   **Single character string:** Correctly returns the character itself.
*   **All characters same:** Handles "aaaaa" correctly.
*   **No palindromes longer than 1 character:** Returns any single character (e.g., "a" from "abcde").
*   **Multiple longest palindromes:** This approach will return the one that is encountered first or updated last, depending on the exact loop and update logic (e.g., for "babad", it might return "bab" or "aba"). The problem usually states any valid longest is acceptable.

### Approach 2: Dynamic Programming (DP)

**Logic:**
This approach builds up the solution from smaller subproblems. A substring `s[i...j]` is a palindrome if:
1.  The characters at its ends are equal: `s.charAt(i) == s.charAt(j)`.
2.  The inner substring `s[i+1...j-1]` is also a palindrome.

**Base Cases:**
*   Single characters are palindromes: `s[i...i]` is always `true`.
*   Two characters: `s[i...i+1]` is a palindrome if `s.charAt(i) == s.charAt(i+1)`.

**Algorithm Steps:**
1.  Create a 2D boolean array `dp[N][N]`, where `dp[i][j]` is `true` if `s[i...j]` is a palindrome.
2.  Initialize `longest = ""` and `currentMaxLen = 0`.
3.  **Length 1 (Base Case):** For `i` from `0` to `N-1`, set `dp[i][i] = true`. Update `longest` and `currentMaxLen` to 1 and `s.substring(i, i+1)`.
4.  **Length 2 (Base Case):** For `i` from `0` to `N-2`, if `s.charAt(i) == s.charAt(i+1)`, set `dp[i][i+1] = true`. Update `longest` and `currentMaxLen` to 2 and `s.substring(i, i+2)`.
5.  **Length 3 to N (Recursive Relation):**
    *   For `length` from `3` to `N`:
        *   For `i` from `0` to `N - length`:
            *   Let `j = i + length - 1`.
            *   If `s.charAt(i) == s.charAt(j)` AND `dp[i+1][j-1]` is `true`, then `dp[i][j] = true`.
            *   If `dp[i][j]` is `true` and `length > currentMaxLen`, update `currentMaxLen` and `longest = s.substring(i, j+1)`.
6.  Return `longest`.

**ASCII Diagram (DP table for "babad"):**

```
String:   b a b a d
Indices:  0 1 2 3 4

dp table (boolean dp[i][j] = is s[i...j] palindrome)

       j=0 1 2 3 4
       b a b a d
i=0 b  T F T F F
i=1 a    T F T F
i=2 b      T F F
i=3 a        T F
i=4 d          T

Fill order:
1. length = 1 (all diagonals dp[i][i] are true)
   dp[0][0]=T, dp[1][1]=T, dp[2][2]=T, dp[3][3]=T, dp[4][4]=T. Longest="b", len=1

2. length = 2 (check s[i]==s[i+1])
   dp[0][1] (ba): s[0]!=s[1] -> F
   dp[1][2] (ab): s[1]!=s[2] -> F
   dp[2][3] (ba): s[2]!=s[3] -> F
   dp[3][4] (ad): s[3]!=s[4] -> F
   Still Longest="b", len=1 (assuming first char was 'b', if it was 'a' then "a")

   Wait, if s="cbbd", dp[1][2] for 'bb' would be true, and longest becomes "bb", len=2.
   Let's re-evaluate example "babad"
   s[1]='a', s[3]='a'. No length 2 palindromes.

3. length = 3 to N (dp[i][j] = (s[i]==s[j]) && dp[i+1][j-1])
   length = 3:
     i=0, j=2 (bab): s[0]==s[2] ('b'=='b') AND dp[1][1] (a) is T -> dp[0][2]=T.
       Longest="bab", len=3.
     i=1, j=3 (aba): s[1]==s[3] ('a'=='a') AND dp[2][2] (b) is T -> dp[1][3]=T.
       Longest="bab", len=3 (no update, length is same. In code, it keeps "bab" or updates to "aba" depending on order/comparison).
     i=2, j=4 (bad): s[2]!=s[4] -> F

   length = 4:
     i=0, j=3 (baba): s[0]==s[3] ('b'=='a') -> F
     i=1, j=4 (abad): s[1]==s[4] ('a'=='d') -> F

   length = 5:
     i=0, j=4 (babad): s[0]==s[4] ('b'=='d') -> F

Final result: "bab" (or "aba", depending on update logic for same length).

```

**Complexity Analysis:**
*   **Time Complexity:** O(N^2)
    *   The nested loops iterate `length` from `3` to `N` and `i` from `0` to `N - length`. This fills an `N x N` table.
    *   Each cell calculation is O(1).
    *   Total: O(N^2).
*   **Space Complexity:** O(N^2)
    *   The `dp` table requires O(N^2) space.

**Comparison (Expand Around Center vs. DP):**
*   Both have O(N^2) time complexity.
*   Expand Around Center has O(1) space, while DP has O(N^2) space.
*   In practice, Expand Around Center is often slightly faster due to less overhead (no 2D array allocation and access, better cache locality for smaller strings). However, DP is a valuable approach for understanding how to build solutions from subproblems.

---

## 2. Minimum Window Substring

**Problem:** Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.

### Approach: Sliding Window with Two Pointers

**Logic:**
This is a classic sliding window problem. We use two pointers, `left` and `right`, to define a "window" within string `s`. The `right` pointer expands the window to include new characters, and when the window becomes "valid" (contains all characters of `t` with required frequencies), the `left` pointer contracts the window to find the smallest possible valid window.

**Algorithm Steps:**
1.  **Initialize `targetFreq` map:** Store the frequency of each character in string `t`.
    Example: `t = "ABC"` -> `{A:1, B:1, C:1}`.
    Example: `t = "AA"` -> `{A:2}`.
2.  **Initialize window state:**
    *   `left = 0` (start of the current window).
    *   `charsNeeded = t.length()` (total count of characters from `t` that are still "needed" in the current window to make it valid).
    *   `windowFreq` map: Stores frequencies of characters within the current window `s[left...right]`.
    *   `minLength = Integer.MAX_VALUE`.
    *   `minStart = 0` (start index of the minimum window found so far).
3.  **Expand Window (Move `right` pointer):** Iterate `right` from `0` to `s.length() - 1`:
    *   Let `rChar = s.charAt(right)`.
    *   Add `rChar` to `windowFreq`.
    *   If `rChar` is a character required by `t` (i.e., `targetFreq.containsKey(rChar)` is true) AND `windowFreq.get(rChar)` is less than or equal to `targetFreq.get(rChar)`:
        *   Decrement `charsNeeded`. This means one instance of a required character has been met.
4.  **Contract Window (Move `left` pointer) - while window is valid:**
    *   While `charsNeeded == 0` (meaning the current window `s[left...right]` contains all required characters from `t` with their necessary frequencies):
        *   **Record potential answer:** Calculate `currentWindowLength = right - left + 1`.
        *   If `currentWindowLength < minLength`, update `minLength = currentWindowLength` and `minStart = left`.
        *   **Shrink from left:** Let `lChar = s.charAt(left)`.
        *   Decrement `lChar` count in `windowFreq`.
        *   If `lChar` is a character required by `t` AND `windowFreq.get(lChar)` becomes strictly less than `targetFreq.get(lChar)`:
            *   Increment `charsNeeded`. This indicates that removing `lChar` made the window invalid for this character, so we need another instance of it.
        *   Increment `left` pointer.
5.  **Final Result:** If `minLength` is still `Integer.MAX_VALUE`, no valid window was found, return `""`. Otherwise, return `s.substring(minStart, minStart + minLength)`.

**ASCII Diagram (Sliding Window for `s = "ADOBECODEBANC", t = "ABC"`):**

```
s:   A D O B E C O D E B A N C
t:   A B C
targetFreq: {A:1, B:1, C:1}
charsNeeded = 3
minLength = MAX_INT, minStart = 0

Initial: left = 0, right = 0, windowFreq = {}

1. right = 0, s[0] = 'A'
   windowFreq = {A:1}, 'A' in t and windowFreq[A] <= targetFreq[A]
   charsNeeded = 2
   Window "A"

2. right = 1, s[1] = 'D'
   windowFreq = {A:1, D:1}
   charsNeeded = 2
   Window "AD"

3. right = 2, s[2] = 'O'
   windowFreq = {A:1, D:1, O:1}
   charsNeeded = 2
   Window "ADO"

4. right = 3, s[3] = 'B'
   windowFreq = {A:1, D:1, O:1, B:1}, 'B' in t
   charsNeeded = 1
   Window "ADOB"

5. right = 4, s[4] = 'E'
   windowFreq = {A:1, D:1, O:1, B:1, E:1}
   charsNeeded = 1
   Window "ADOBE"

6. right = 5, s[5] = 'C'
   windowFreq = {A:1, D:1, O:1, B:1, E:1, C:1}, 'C' in t
   charsNeeded = 0  <-- Window is now VALID! "ADOBEC" (len 6)

   **Shrink phase (while charsNeeded == 0):**
   currentWindowLength = 5 - 0 + 1 = 6. minLength = 6, minStart = 0.
   left = 0, s[0] = 'A'.
     windowFreq = {A:0, D:1, O:1, B:1, E:1, C:1}. 'A' in t, windowFreq[A] (0) < targetFreq[A] (1).
     charsNeeded = 1.
   left = 1. Window "DOBEC". charsNeeded is 1, so exit shrink phase.

7. right = 6, s[6] = 'O'
   windowFreq = {A:0, D:1, O:2, B:1, E:1, C:1}
   charsNeeded = 1
   Window "DOBECO"

...
Continue expanding right, until `right = 11`, `s[11] = 'N'`.
Window is now "ODEBANC" (from `s[4]` to `s[11]`)
   `targetFreq = {A:1, B:1, C:1}`
   `windowFreq = {O:1, D:1, E:1, B:1, A:1, N:1, C:1}`
   `charsNeeded = 0` <-- Window is VALID! "ODEBANC" (len 8)

   **Shrink phase:**
   currentWindowLength = 11 - 4 + 1 = 8. minLength (6) is smaller. No update.
   left = 4, s[4] = 'E'. 'E' not in t. windowFreq = {O:1, D:1, E:0, B:1, A:1, N:1, C:1}. charsNeeded = 0. left = 5.
   Window "DEBANC" (len 7). No update.
   left = 5, s[5] = 'C'. 'C' in t. windowFreq[C] (0) < targetFreq[C] (1). charsNeeded = 1. left = 6.
   Window "EBANC". charsNeeded is 1. Exit shrink phase.

   The example output "BANC" requires `minStart=8, minLength=4`.
   This occurs when right pointer reaches 'C' at index 12.
   When `right=12`, `s[12]='C'`. Current window ending at `s[12]` is `s[4...12]` or `s[5...12]`.
   Let's trace when `right=12`, `s[12]='C'`.
   Assuming `left` is at `6` after previous shrinks, window `s[6...11]`="ODECBA". `s[12]`='N'.
   No, let's retrace the specific `BANC` part.
   When `right` is at `s[12] = 'C'`.
   String: `ADOBECODEBANC`
   Let `left` be at `8` (`s[8] = 'E'`). Current window `s[8...12]` is `EBANC`.
   `targetFreq = {A:1, B:1, C:1}`
   `windowFreq = {E:1, B:1, A:1, N:1, C:1}`
   `charsNeeded = 0` (B, A, C are present). Window "EBANC" is VALID. Len 5. `minLen=5, minStart=8`.

   **Shrink:**
   `left = 8`, `s[8] = 'E'`. 'E' not in t. `windowFreq[E]=0`. `charsNeeded=0`. `left=9`.
   Window `s[9...12]` is "BANC". VALID. Len 4. `minLen=4, minStart=9`.

   **Shrink:**
   `left = 9`, `s[9] = 'B'`. 'B' in t. `windowFreq[B]=0 < targetFreq[B]=1`. `charsNeeded=1`. `left=10`.
   Window `s[10...12]` is "ANC". NOT VALID (`B` is missing). Exit shrink.

End of loop. Return `s.substring(minStart, minStart + minLength)` = `s.substring(9, 9+4)` = "BANC".

```

**Complexity Analysis:**
*   **Time Complexity:** O(S + T)
    *   Populating `targetFreq` takes O(T) time.
    *   The `right` pointer traverses `s` once (O(S)).
    *   The `left` pointer also traverses `s` at most once in total across all shrink phases (O(S)).
    *   Hash map operations (get, put, containsKey) take O(1) on average.
    *   Total: O(S + T).
*   **Space Complexity:** O(T)
    *   The `targetFreq` map stores at most `|Σ|` (alphabet size) or `O(T_unique)` entries.
    *   The `windowFreq` map stores at most `|Σ|` or `O(S_unique)` entries.
    *   Since `|Σ|` is typically constant (e.g., 52 for English letters), it's often considered O(1) space. If `t` can have arbitrary Unicode characters, then it's O(T_unique).

**Edge Cases & Gotchas:**
*   **Empty `s` or `t`:** Returns `""`.
*   **`t` is longer than `s`:** Returns `""`.
*   **No valid window:** `minLength` remains `Integer.MAX_VALUE`, returns `""`.
*   **`t` contains duplicate characters:** Handled correctly by frequency maps and `charsNeeded` counter. For `t = "AA"`, `charsNeeded` starts at 2 and is decremented only when two 'A's are found in the window.
*   **`s` and `t` have no common characters:** `charsNeeded` will never reach 0.
*   **Case sensitivity:** The current implementation is case-sensitive. Adjust to `s.toLowerCase()` if case-insensitivity is desired.

---

## 3. Group Anagrams

**Problem:** Given an array of strings `strs`, group the anagrams together.

### Approach 1: Sorting Characters (Optimal and Common)

**Logic:**
The core idea is that anagrams, when their characters are sorted alphabetically, will result in the same canonical string. This canonical string can serve as a unique key for all anagrams in a group.

**Algorithm Steps:**
1.  Initialize a `HashMap<String, List<String>>` called `anagramGroups`. The key will be the sorted string (canonical form), and the value will be a list of original strings that are anagrams of each other.
2.  Iterate through each string `s` in the input array `strs`:
    *   Convert `s` to a character array (`char[] charArray = s.toCharArray();`).
    *   Sort the character array (`Arrays.sort(charArray);`).
    *   Convert the sorted character array back to a new string (`String sortedKey = new String(charArray);`). This is the canonical key for anagrams.
    *   Use `anagramGroups.computeIfAbsent(sortedKey, k -> new ArrayList<>()).add(s);` to add the original string `s` to the list associated with `sortedKey`. If `sortedKey` is not yet in the map, a new empty `ArrayList` is created and associated with it first.
3.  Finally, return all the `values` (which are `List<String>`) from the `anagramGroups` map.

**Example Walkthrough for `strs = ["eat","tea","tan","ate","nat","bat"]`:**

| Original String | Char Array | Sorted Array | Sorted Key | `anagramGroups` Map (Key -> Value)                                   |
| :-------------- | :--------- | :----------- | :--------- | :------------------------------------------------------------------- |
| "eat"           | `[e,a,t]`  | `[a,e,t]`    | "aet"      | `{"aet": ["eat"]}`                                                   |
| "tea"           | `[t,e,a]`  | `[a,e,t]`    | "aet"      | `{"aet": ["eat", "tea"]}`                                            |
| "tan"           | `[t,a,n]`  | `[a,n,t]`    | "ant"      | `{"aet": ["eat", "tea"], "ant": ["tan"]}`                            |
| "ate"           | `[a,t,e]`  | `[a,e,t]`    | "aet"      | `{"aet": ["eat", "tea", "ate"], "ant": ["tan"]}`                     |
| "nat"           | `[n,a,t]`  | `[a,n,t]`    | "ant"      | `{"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"]}`              |
| "bat"           | `[b,a,t]`  | `[a,b,t]`    | "abt"      | `{"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"], "abt": ["bat"]}` |

Result: `[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]` (order of lists and elements within lists may vary).

**Complexity Analysis:**
*   **Time Complexity:** O(N * K log K)
    *   `N`: number of strings in `strs`.
    *   `K`: maximum length of a string.
    *   For each of the `N` strings:
        *   Converting to `char[]`: O(K).
        *   Sorting `char[]`: O(K log K).
        *   Converting back to `String`: O(K).
        *   Hash map operations (put/get): Average O(K) (due to string hashing which depends on string length).
    *   Total: N * (K + K log K + K) which simplifies to O(N * K log K).
*   **Space Complexity:** O(N * K)
    *   In the worst case, all `N` strings are distinct or no anagrams.
    *   The hash map stores `N` entries. Each key is a sorted string of length `K`. Each value is an original string of length `K`.
    *   Total: O(N * K).

**Edge Cases & Gotchas:**
*   **Empty strings:** `""` is an anagram of itself. Handles correctly.
*   **Single character strings:** Handles correctly.
*   **Empty input array or null input:** Handles by returning an empty list.

### Approach 2: Character Count Array (Optimal Alternative)

**Logic:**
Instead of sorting, which takes `O(K log K)`, we can create a frequency map (or array) of characters for each string. Since the problem states lowercase English letters, a fixed-size array of 26 integers is efficient. We can then convert this frequency array into a unique string representation to use as a hash map key.

**Algorithm Steps:**
1.  Initialize a `HashMap<String, List<String>>` called `anagramGroups`.
2.  Iterate through each string `s` in the input array `strs`:
    *   Create an `int[] charCounts = new int[26];` (for 'a' through 'z').
    *   Iterate through each character `c` in `s`: `charCounts[c - 'a']++;`.
    *   Build a unique `String` key from `charCounts`. A `StringBuilder` is good for this. For example, append each count followed by a delimiter like `'#'`: `"1#0#0#1#..."`. This format prevents ambiguity (e.g., "12" vs "1#2#").
    *   Use this count string as the map key, adding the original string `s` to its associated list, similar to the sorting approach.
3.  Return all values from `anagramGroups`.

**Example Walkthrough for `s = "baba"` (Key generation for one string):**
1.  `s = "baba"`
2.  `charCounts = [0,0,0,...,0]` (size 26)
3.  Process characters:
    *   'b': `charCounts[1]++` -> `[0,1,0,...]`
    *   'a': `charCounts[0]++` -> `[1,1,0,...]`
    *   'b': `charCounts[1]++` -> `[1,2,0,...]`
    *   'a': `charCounts[0]++` -> `[2,2,0,...]`
4.  `charCounts` is now `[2, 2, 0, ..., 0]` (2 'a's, 2 'b's).
5.  Build key: `new StringBuilder().append(2).append('#').append(2).append('#').append(0).append('#')...`
    Key would be `2#2#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#`.

**Complexity Analysis:**
*   **Time Complexity:** O(N * K)
    *   `N`: number of strings.
    *   `K`: maximum length of a string.
    *   For each of the `N` strings:
        *   Creating `charCounts` array: O(K) (iterating through characters).
        *   Building the key string from `charCounts`: O(alphabet_size) which is O(26) (constant).
        *   Hash map operations: Average O(1) because the key length is constant (52 characters for counts and delimiters).
    *   Total: N * (K + 26) which simplifies to O(N * K). This is generally faster than O(N * K log K) for sufficiently large K.
*   **Space Complexity:** O(N * K)
    *   Similar to the sorting approach, storing `N` strings of max length `K`.
    *   The `charCounts` array is `O(26)` (constant) space for each string processed.
    *   The map keys are constant length.
    *   Total: O(N * K).

**Comparison (Sorting vs. Counting):**
*   Both are optimal for the given constraints.
*   Character Counting is theoretically faster (O(NK) vs O(NK log K)).
*   In practice, for small `K` (e.g., K <= ~20-30), sorting might be faster due to the overhead of `StringBuilder` and potentially more cache-friendly operations for small arrays. For larger `K`, counting is usually superior.

---

## 4. String to Integer (atoi)

**Problem:** Implement the `myAtoi(String s)` function, which converts a string to a 32-bit signed integer according to specific rules, handling whitespace, signs, non-digit characters, and overflow/underflow.

### Approach: Iterative Parsing with State Management and Overflow Check

**Logic:**
This problem is a detailed exercise in parsing strings and handling numerous edge cases. The solution typically involves a single pass through the string, maintaining a current state (index, sign, accumulated value), and performing strict checks at each step as per the rules. The most critical part is correctly detecting and clamping overflow/underflow.

**Algorithm Steps:**
1.  **Handle Null/Empty String:** If `s` is `null` or empty, return 0.
2.  **Initialization:**
    *   `index = 0`: Current reading position in the string.
    *   `sign = 1`: Multiplier for the final result (+1 for positive, -1 for negative).
    *   `total = 0L`: Accumulates the digit value. Use `long` to temporarily store the value to easily detect overflow before it occurs for `int`.
    *   `INT_MAX = Integer.MAX_VALUE` (2147483647) and `INT_MIN = Integer.MIN_VALUE` (-2147483648).
3.  **Step 1: Skip Leading Whitespace:**
    *   Increment `index` while `index < n` and `s.charAt(index) == ' '`.
    *   If `index` reaches the end of the string after skipping spaces, return 0.
4.  **Step 2: Process Sign:**
    *   If `index < n`:
        *   If `s.charAt(index) == '-'`, set `sign = -1` and increment `index`.
        *   Else if `s.charAt(index) == '+'`, set `sign = 1` and increment `index`.
    *   If the character is neither `'-'` nor `'+'`, and not a digit (checked in step 3), this is an invalid start; no further action is needed here, as the next loop handles non-digit characters.
5.  **Step 3: Process Digits and Check Overflow:**
    *   Iterate while `index < n` and `s.charAt(index)` is a digit (`'0'` through `'9'`):
        *   Get `digit = s.charAt(index) - '0'`.
        *   **Crucial Overflow/Underflow Check:** Before updating `total = total * 10 + digit`:
            *   **For Positive `sign` (checking against `INT_MAX`):**
                *   If `total > INT_MAX / 10`: The next multiplication `total * 10` will definitely overflow. Return `INT_MAX`.
                *   If `total == INT_MAX / 10`: The next multiplication `total * 10` will be just below `INT_MAX`. It will overflow if `digit > 7` (since `INT_MAX` is `214748364**7**`). Return `INT_MAX`.
            *   **For Negative `sign` (checking against `INT_MIN` magnitude):**
                *   We are building `total` as a positive magnitude. The check is similar but against `INT_MAX` for magnitude.
                *   If `total > INT_MAX / 10`: The next `total * 10` will already exceed the maximum positive magnitude an int can hold, which means applying negative sign will definitely underflow. Return `INT_MIN`.
                *   If `total == INT_MAX / 10`: The next multiplication will be `INT_MAX - 7`. It will underflow if `digit > 8` (since `INT_MIN` is `-214748364**8**`). Return `INT_MIN`.
                *   Note: `Integer.MIN_VALUE` has a magnitude that is 1 greater than `Integer.MAX_VALUE`. Hence the `digit > 8` condition.
        *   Update `total = total * 10 + digit`.
        *   Increment `index`.
6.  **Step 4: Return Final Result:**
    *   Return `(int) (total * sign)`. The cast `(int)` will handle the final clamping if `total * sign` exceeds `int` range, but our explicit checks already handle this.

**Example Walkthrough for `s = "   -4193 with words"`:**

```
s = "   -4193 with words"
n = 19
index = 0, sign = 1, total = 0

1. Skip Whitespace:
   s[0] = ' ' -> index = 1
   s[1] = ' ' -> index = 2
   s[2] = ' ' -> index = 3
   s[3] = '-' -> loop ends. index is 3.

2. Process Sign:
   s[3] = '-' -> sign = -1, index = 4.

3. Process Digits and Check Overflow:
   Loop while index < n and s[index] is a digit.
   Current `total` is 0.

   index = 4, s[4] = '4':
     digit = 4.
     Overflow check (for negative, against INT_MAX / 10): 0 <= INT_MAX / 10. OK.
     total = 0 * 10 + 4 = 4.
     index = 5.

   index = 5, s[5] = '1':
     digit = 1.
     Overflow check: 4 <= INT_MAX / 10. OK.
     total = 4 * 10 + 1 = 41.
     index = 6.

   index = 6, s[6] = '9':
     digit = 9.
     Overflow check: 41 <= INT_MAX / 10. OK.
     total = 41 * 10 + 9 = 419.
     index = 7.

   index = 7, s[7] = '3':
     digit = 3.
     Overflow check: 419 <= INT_MAX / 10. OK.
     total = 419 * 10 + 3 = 4193.
     index = 8.

   index = 8, s[8] = ' ':
     ' ' is not a digit. Loop terminates.

4. Return Final Result:
   `total * sign` = `4193 * -1` = `-4193`.

```

**Complexity Analysis:**
*   **Time Complexity:** O(L)
    *   `L` is the length of the string `s`.
    *   We iterate through the string at most once. Each character is processed a constant number of times.
*   **Space Complexity:** O(1)
    *   Only a few variables are used to store indices, sign, and total.

**Edge Cases & Gotchas:**
*   **Leading/trailing whitespace:** Handled explicitly.
*   **Multiple signs (`+-`, `--`, etc.):** `atoi` typically considers only the first non-whitespace character as a sign. Subsequent signs (or non-digits) terminate parsing, leading to a return of 0 or the value parsed up to that point. The provided algorithm correctly handles this by incrementing `index` only once for a sign. If the *next* character isn't a digit, the loop terminates.
*   **Non-digit characters before digits (`"words and 987"`):** If the first non-whitespace character is not a digit or sign, `total` remains 0, and `0` is returned.
*   **Non-digit characters after digits (`"4193 with words"`):** Parsing stops at the first non-digit character, and the accumulated digit value is returned.
*   **Overflow/Underflow:** This is the most complex part. The check `total > INT_MAX / 10` and `(total == INT_MAX / 10 && digit > 7/8)` is critical. Using a `long` for `total` makes it safer to perform intermediate calculations without overflowing the `long` itself before the explicit `int` overflow checks. The clamping (`return Integer.MAX_VALUE` or `Integer.MIN_VALUE`) is also essential.

---

### General Interview Tips for String Manipulation

*   **Clarify Constraints:** Always ask about character sets (ASCII, Unicode, lowercase English, digits), length limits, null/empty string behavior, and case sensitivity.
*   **Brute Force First:** If stuck, describe a brute-force approach first. This shows you can at least solve it, and then you can optimize.
*   **Look for Patterns:** Palindromes, anagrams, substrings often have structural patterns.
*   **Common Techniques:**
    *   **Two Pointers:** For palindromes, reversing, substring comparison.
    *   **Sliding Window:** For finding substrings with certain properties (e.g., minimum window, longest unique substring).
    *   **Hash Maps/Frequency Arrays:** For counting character frequencies, checking anagrams, or storing visited states.
    *   **Sorting:** Useful for canonical forms (e.g., anagrams) or specific ordering.
    *   **Dynamic Programming:** For optimal substructure and overlapping subproblems (e.g., Longest Palindromic Substring, Longest Common Subsequence).
    *   **StringBuilder/char[]:** For efficient string modification, as `String` in Java is immutable.
*   **Edge Cases:** Always explicitly consider and test for:
    *   Empty string (`""`)
    *   Null string (`null`)
    *   Single character string
    *   Strings with all same characters (`"aaaaa"`)
    *   Strings with no matching characters
    *   Boundary conditions (e.g., maximum/minimum length, integer overflow).
*   **Complexity Analysis:** Be ready to state and justify the time and space complexity of your chosen solution. Discuss how different approaches compare.
*   **Talk Through Your Logic:** Explain your thought process, even when optimizing. This helps the interviewer understand your problem-solving skills.
*   **Test Cases:** Propose a few diverse test cases (normal, edge, performance-critical) and walk through them with your code.

---

```