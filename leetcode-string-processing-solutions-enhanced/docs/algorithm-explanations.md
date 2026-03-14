```markdown
# 📖 Algorithm Explanations

This document provides detailed explanations, step-by-step walkthroughs, and ASCII art diagrams for the core algorithms implemented in this project.

---

## 1. Palindrome Checker

**Problem:** Determine if a given string is a palindrome, considering only alphanumeric characters and ignoring cases.

### Solution 1: Two-Pointer Approach

**Concept:** The most efficient way to check for a palindrome is to compare characters from both ends of the string inwards. Before comparison, the string needs to be "cleaned" by removing non-alphanumeric characters and converting it to a consistent case (e.g., lowercase).

**Steps:**

1.  **Clean the string:** Create a new string by filtering out all non-alphanumeric characters and converting all remaining characters to lowercase. This standardizes the string for comparison.
    *   Example: `"A man, a plan, a canal: Panama"` becomes `"amanaplanacanalpanama"`.
2.  **Initialize Pointers:** Set `left` pointer to the beginning (index 0) and `right` pointer to the end (index `length - 1`) of the *cleaned* string.
3.  **Iterate and Compare:**
    *   While `left < right`:
        *   Compare `cleanedString[left]` with `cleanedString[right]`.
        *   If they are not equal, the string is not a palindrome, return `false`.
        *   If they are equal, move `left` one step to the right (`left++`) and `right` one step to the left (`right--`).
4.  **Return True:** If the loop completes without finding any mismatches, it means the string is a palindrome, so return `true`.

**ASCII Art Diagram (Two Pointers on cleaned string):**

```
Input: "Race a car"
Cleaned: "raceacar"

Initial:
r a c e a c a r
^             ^
L             R

1st Iteration: 'r' == 'r'
r a c e a c a r
  ^         ^
  L         R

2nd Iteration: 'a' == 'a'
r a c e a c a r
    ^     ^
    L     R

3rd Iteration: 'c' == 'c'
r a c e a c a r
      ^   ^
      L   R

4th Iteration: 'e' != 'a' -> return false
```

**Time Complexity:** O(N)
*   O(N) for string cleaning (iterating through the original string).
*   O(N/2) for two-pointer comparison on the cleaned string, which simplifies to O(N).
*   Total: O(N).

**Space Complexity:** O(N)
*   O(N) for storing the `cleanedString`.
*   O(1) for pointers.
*   Total: O(N).

### Solution 2: Two-Pointer Approach (In-Place, without pre-cleaning)

**Concept:** This variation avoids creating a new `cleanedString` upfront, potentially saving memory if the original string has many non-alphanumeric characters. Instead, it moves the pointers past non-alphanumeric characters on the fly.

**Steps:**

1.  **Initialize Pointers:** Set `left` pointer to the beginning (index 0) and `right` pointer to the end (index `length - 1`) of the *original* string.
2.  **Iterate and Compare:**
    *   While `left < right`:
        *   **Move `left`:** While `left < right` and `s[left]` is not alphanumeric, increment `left`.
        *   **Move `right`:** While `left < right` and `s[right]` is not alphanumeric, decrement `right`.
        *   **Compare:** If `left < right`:
            *   Compare `s[left].toLowerCase()` with `s[right].toLowerCase()`.
            *   If they are not equal, return `false`.
            *   Increment `left` and decrement `right`.
        *   Else (if `left >= right` after moving), break the loop (pointers met or crossed).
3.  **Return True:** If the loop completes, return `true`.

**ASCII Art Diagram (In-Place Two Pointers):**

```
Input: "A man, a plan, a canal: Panama"

Initial:
A   m a n ,   a   p l a n ,   a   c a n a l :   P a n a m a
^                                                       ^
L                                                       R

1st Iteration:
- L: 'A' (alphanumeric)
- R: 'a' (alphanumeric)
- 'A'.toLowerCase() == 'a'.toLowerCase() -> 'a' == 'a' (match)
- L++, R--

Current State:
A   m a n ,   a   p l a n ,   a   c a n a l :   P a n a m a
    ^                                                   ^
    L                                                   R

2nd Iteration:
- L: ' ' (not alphanumeric) -> L++
- L: 'm' (alphanumeric)
- R: ' ' (not alphanumeric) -> R--
- R: 'm' (alphanumeric)
- 'm'.toLowerCase() == 'm'.toLowerCase() -> 'm' == 'm' (match)
- L++, R--

... and so on. This continues until pointers cross or a mismatch is found.
```

**Time Complexity:** O(N)
*   Each character is visited at most twice (once by `left`, once by `right`), and each visit involves a constant time `isAlphanumeric` check.
*   Total: O(N).

**Space Complexity:** O(1)
*   Only a few variables for pointers. No new string is explicitly created.
*   However, `toLowerCase()` in JavaScript *does* create a new string for each character if it's uppercase. If strict O(1) space meant *no* new strings at all, this would be slightly off, but generally, for interview purposes, in-place character comparison is considered O(1) auxiliary space.

---

## 2. Longest Common Prefix

**Problem:** Find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string `""`.

### Solution 1: Vertical Scanning

**Concept:** This is a straightforward approach. We iterate through the characters of the first string, and for each character, we compare it with the character at the *same position* in all other strings. If a mismatch or an out-of-bounds access occurs, the common prefix ends at the previous character.

**Steps:**

1.  **Handle Edge Cases:** If the input array `strs` is empty or `null`, return `""`. If it contains only one string, that string is the LCP.
2.  **Use First String as Reference:** Let `firstStr` be `strs[0]`. We will iterate through its characters. The LCP cannot be longer than `firstStr`.
3.  **Outer Loop (Character Index `i`):** Iterate `i` from `0` to `firstStr.length - 1`. This `i` represents the current character position we are checking.
4.  **Inner Loop (String Index `j`):** For each character `firstStr[i]`, iterate `j` from `1` to `strs.length - 1` (i.e., through all other strings).
5.  **Check for Mismatch:** Inside the inner loop, for `strs[j]`:
    *   If `i` is equal to `strs[j].length` (meaning `strs[j]` is shorter than `i` and thus can't have `firstStr[i]`) OR
    *   If `strs[j][i]` is not equal to `firstStr[i]`:
        *   A mismatch is found. The LCP is `firstStr.substring(0, i)`. Return this substring.
6.  **Return `firstStr`:** If the outer loop completes without returning, it means `firstStr` itself is a prefix of all other strings. Return `firstStr`.

**ASCII Art Diagram (Vertical Scanning):**

```
Input: ["flower", "flow", "flight"]

      i=0  i=1  i=2  i=3  i=4  i=5
      ---  ---  ---  ---  ---  ---
str[0]: f    l    o    w    e    r
str[1]: f    l    o    w
str[2]: f    l    i    g    h    t

i = 0 ('f'):
- str[0][0] = 'f'
- str[1][0] = 'f' (match)
- str[2][0] = 'f' (match)
- Continue to i = 1

i = 1 ('l'):
- str[0][1] = 'l'
- str[1][1] = 'l' (match)
- str[2][1] = 'l' (match)
- Continue to i = 2

i = 2 ('o'):
- str[0][2] = 'o'
- str[1][2] = 'o' (match)
- str[2][2] = 'i' (MISMATCH: 'o' != 'i')
- LCP is substring of str[0] from 0 to i (exclusive).
- Return str[0].substring(0, 2) which is "fl".
```

**Time Complexity:** O(S) where S is the sum of all characters in all strings.
*   In the worst case (all strings are identical), it iterates `L_min` characters (length of shortest string) and for each character, it compares against `N-1` other strings. So, `O(N * L_min)`. If `L_min` is the length of the LCP, this is `O(N * L_LCP)`.
*   This can also be seen as iterating each character of the first string `N` times in the worst case.
*   Total: O(S) or O(N * L_LCP).

**Space Complexity:** O(1)
*   Only a few variables for indices and the `char` itself.
*   The `substring` operation creates a new string for the result, which is `O(L_LCP)`. Generally considered O(1) auxiliary space.

### Solution 2: Divide and Conquer

**Concept:** This approach recursively divides the array of strings into two halves, finds the LCP for each half, and then finds the LCP of those two LCPs.

**Steps:**

1.  **Base Case:** If the array contains only one string, return that string as its LCP.
2.  **Divide:** Split the array of strings into two halves (e.g., `left` and `right`).
3.  **Conquer:** Recursively call the LCP function on the `left` half to get `lcpLeft`, and on the `right` half to get `lcpRight`.
4.  **Combine:** Implement a `commonPrefix(str1, str2)` helper function that takes two strings and returns their common prefix. Use this to find the `commonPrefix(lcpLeft, lcpRight)`.

**ASCII Art Diagram (Divide and Conquer):**

```
Input: ["flower", "flow", "flight", "flat"]

                               LCP(["flower", "flow", "flight", "flat"])
                                            /          \
                     LCP(["flower", "flow"])           LCP(["flight", "flat"])
                           /    \                               /    \
        LCP(["flower"])   LCP(["flow"])         LCP(["flight"])   LCP(["flat"])
              |                 |                      |                 |
            "flower"           "flow"               "flight"            "flat"
              \                 /                      \                 /
          commonPrefix("flower", "flow")         commonPrefix("flight", "flat")
                     |                                       |
                   "flow"                                  "fl"
                      \                                    /
                     commonPrefix("flow", "fl")
                                 |
                               "fl"
```

**Time Complexity:** O(S) where S is the sum of all characters in all strings.
*   The recursive calls form a binary tree. There are `log N` levels (where N is the number of strings).
*   At each level, the `commonPrefix` function is called. In the worst case, `commonPrefix(str1, str2)` takes `O(L_LCP)` time (length of LCP).
*   Across all nodes at one level, the total work for `commonPrefix` operations sums up to `O(N * L_LCP)` or `O(S)`.
*   Total: `O(S)` or `O(N * L_LCP * log N)`.

**Space Complexity:** O(L_LCP * log N)
*   Due to the recursion stack. The depth of the stack is `log N`. Each stack frame stores intermediate `lcpLeft` and `lcpRight` strings, which can be up to `L_LCP` in length.

---

## 3. Decode String

**Problem:** Given an encoded string, return its decoded string. The encoding rule is `k[encoded_string]`, where `encoded_string` inside the square brackets is repeated `k` times.

### Solution 1: Stack-based Iterative Approach

**Concept:** This problem involves nested structures (`[]`) and requires keeping track of previous states (repetition counts and partially built strings). A stack is a natural data structure for managing such nested dependencies. We'll use two stacks: one for numbers and one for strings.

**Steps:**

1.  **Initialize:**
    *   `numStack`: Stores repetition counts (`k`).
    *   `strStack`: Stores string segments that come *before* an opening bracket.
    *   `currentNum = 0`: Builds the current number.
    *   `currentStr = ""`: Builds the string segment within the current level of brackets or the final result.
2.  **Iterate through the input string `s` character by character:**
    *   **If `char` is a digit:**
        *   Append it to `currentNum` (e.g., if `currentNum` is 3 and `char` is '2', `currentNum` becomes 32).
        *   `currentNum = currentNum * 10 + parseInt(char, 10);`
    *   **If `char` is `[`:**
        *   Push the `currentStr` onto `strStack`. This saves the string accumulated *before* this bracketed segment.
        *   Push `currentNum` onto `numStack`. This saves the repetition count for the new segment.
        *   Reset `currentStr = ""` and `currentNum = 0` to start building the new segment inside the brackets.
    *   **If `char` is `]`:**
        *   Pop `num` from `numStack` (this is the repetition count for the segment just completed).
        *   Pop `prevStr` from `strStack` (this is the string that came before the current bracketed segment).
        *   Repeat `currentStr` (the segment just built inside the brackets) `num` times.
        *   Append the repeated segment to `prevStr`. This result becomes the new `currentStr`.
        *   `currentStr = prevStr + currentStr.repeat(num);`
    *   **If `char` is a letter:**
        *   Append it to `currentStr`.
        *   `currentStr += char;`
3.  **Return `currentStr`:** After processing all characters, `currentStr` will hold the fully decoded string.

**ASCII Art Diagram (Stack-based Iteration - "3[a2[c]]"):**

```
Input: "3[a2[c]]"

i=0, char='3': currentNum = 3
i=1, char='[':
  strStack = [""] (push currentStr)
  numStack = [3]  (push currentNum)
  currentStr = ""
  currentNum = 0

i=2, char='a': currentStr = "a"
i=3, char='2': currentNum = 2
i=4, char='[':
  strStack = ["", "a"] (push currentStr)
  numStack = [3, 2]   (push currentNum)
  currentStr = ""
  currentNum = 0

i=5, char='c': currentStr = "c"
i=6, char=']':
  num = numStack.pop() -> 2
  prevStr = strStack.pop() -> "a"
  currentStr = prevStr + currentStr.repeat(num)
             = "a" + "c".repeat(2)
             = "a" + "cc"
             = "acc"

i=7, char=']':
  num = numStack.pop() -> 3
  prevStr = strStack.pop() -> ""
  currentStr = prevStr + currentStr.repeat(num)
             = "" + "acc".repeat(3)
             = "accaccacc"

End of string. Return "accaccacc".
```

**Time Complexity:** O(L_decoded)
*   Let N be the length of the input string, maxK be the maximum repetition count, and maxNesting be the maximum nesting depth.
*   Each character is visited once.
*   The `repeat()` operation takes time proportional to the length of the string being repeated (`M`) times the repetition count (`k`).
*   In the worst case, the final decoded string length (`L_decoded`) can be very large (e.g., `10[10[10[a]]]` leads to `1000a`'s).
*   The overall time complexity is proportional to the length of the final decoded string, `O(L_decoded)`.

**Space Complexity:** O(L_decoded)
*   The `strStack` can store intermediate strings whose total length can add up to `L_decoded` in the worst case (e.g., `10[a]10[b]...` leads to many separate, large strings on the stack).
*   The `numStack` stores numbers, which is `O(maxNesting)`.
*   Total: `O(L_decoded)`.

### Solution 2: Recursive Approach

**Concept:** The recursive solution naturally mirrors the nested structure of the problem. A function can be designed to decode a segment of the string, handling inner brackets by making recursive calls. A global `index` pointer helps track the current position across recursive calls.

**Steps:**

1.  **Global Index:** Initialize a global (or passed by reference) `index = 0` to keep track of the current position in the input string `s`.
2.  **Recursive `decode()` function:**
    *   This function will decode a segment of the string starting from the current `index` until it encounters a closing bracket `]` or the end of the string.
    *   Inside `decode()`:
        *   Initialize `currentStr = ""` and `currentNum = 0`.
        *   Loop `while (index < s.length)`:
            *   **If `s[index]` is a digit:** Build `currentNum`. Increment `index`.
            *   **If `s[index]` is `[`:** Increment `index` (to move past `[`). Make a recursive call: `decodedInnerStr = decode()`. Append `decodedInnerStr` repeated `currentNum` times to `currentStr`. Reset `currentNum = 0`.
            *   **If `s[index]` is `]`:** Increment `index` (to move past `]`). This segment is complete, return `currentStr`.
            *   **If `s[index]` is a letter:** Append it to `currentStr`. Increment `index`.
        *   If the loop finishes (end of string reached), return `currentStr`.
3.  **Initial Call:** Call `decodeStringRecursive()` which in turn calls the `decode()` helper once.

**Time Complexity:** O(L_decoded) - Similar to the stack-based approach. Each character is visited and processed. String concatenations and repetitions dominate.

**Space Complexity:** O(L_decoded) - Similar to the stack-based approach.
*   The recursion call stack depth is `O(maxNesting)`.
*   Intermediate strings created during repetition and concatenation contribute to space.
*   Total: `O(L_decoded)`.

---

## 4. Group Anagrams

**Problem:** Given an array of strings, group anagrams together.

### Solution 1: Sorting Characters as Key

**Concept:** Anagrams are words that contain the same characters with the same frequencies, just in a different order. If we sort the characters of an anagram, they will all produce the same "canonical" sorted string. This sorted string can then be used as a key in a hash map to group the original anagrams.

**Steps:**

1.  **Handle Edge Cases:** If the input array `strs` is empty or `null`, return an empty array.
2.  **Initialize a Map:** Use a `Map` (or a JavaScript object) to store the groups. The keys will be the sorted strings, and the values will be arrays of original strings that are anagrams.
    *   `anagramGroups = new Map<string, string[]>();`
3.  **Iterate through Strings:** For each `str` in the input `strs` array:
    *   **Generate Key:**
        *   Convert `str` to an array of characters: `str.split('')`.
        *   Sort the character array: `.sort()`.
        *   Join the characters back into a string: `.join('')`. This is the `sortedKey`.
        *   Example: `"eat"` -> `"aet"`, `"tea"` -> `"aet"`, `"tan"` -> `"ant"`.
    *   **Group Anagrams:**
        *   Check if `anagramGroups` already `has(sortedKey)`.
        *   If yes, `anagramGroups.get(sortedKey).push(str)`.
        *   If no, `anagramGroups.set(sortedKey, [str])`.
4.  **Return Results:** Convert the values of the `anagramGroups` map into an array.
    *   `return Array.from(anagramGroups.values());`

**ASCII Art Diagram (Sorting Key):**

```
Input: ["eat", "tea", "tan", "ate", "nat", "bat"]

Initialize: anagramGroups = {}

1. str = "eat"
   sortedKey = "aet"
   anagramGroups = { "aet": ["eat"] }

2. str = "tea"
   sortedKey = "aet"
   anagramGroups = { "aet": ["eat", "tea"] }

3. str = "tan"
   sortedKey = "ant"
   anagramGroups = { "aet": ["eat", "tea"], "ant": ["tan"] }

4. str = "ate"
   sortedKey = "aet"
   anagramGroups = { "aet": ["eat", "tea", "ate"], "ant": ["tan"] }

5. str = "nat"
   sortedKey = "ant"
   anagramGroups = { "aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"] }

6. str = "bat"
   sortedKey = "abt"
   anagramGroups = { "aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"], "abt": ["bat"] }

Return: [ ["eat", "tea", "ate"], ["tan", "nat"], ["bat"] ] (order of groups may vary)
```

**Time Complexity:** O(N * K log K)
*   N is the number of strings in the input array.
*   K is the maximum length of a string.
*   For each string:
    *   Splitting the string to an array of characters: O(K).
    *   Sorting the character array: O(K log K).
    *   Joining characters back to a string: O(K).
    *   Hash map insertion/lookup: Average O(1).
*   Dominant factor is sorting, so N * K log K.

**Space Complexity:** O(N * K)
*   In the worst case, all strings are distinct and not anagrams. The `anagramGroups` map will store N entries. Each key is a string of length K, and each value stores the original string of length K.
*   Total space for keys and values can be up to N * K characters.

### Solution 2: Character Count Array as Key

**Concept:** Instead of sorting, we can count the frequency of each character in a string. For a fixed alphabet (like lowercase English letters), a frequency array of size 26 can represent any string. This frequency array (or a string representation of it) can serve as the unique key for anagrams.

**Steps:**

1.  **Handle Edge Cases:** Similar to Solution 1.
2.  **Initialize a Map:** `anagramGroups = new Map<string, string[]>();`
3.  **Iterate through Strings:** For each `str` in the input `strs` array:
    *   **Create Frequency Array:**
        *   Initialize an array `charCounts` of size 26 with all zeros (for 'a' through 'z').
        *   Iterate through each `char` in `str`:
            *   Increment `charCounts[char.charCodeAt(0) - 'a'.charCodeAt(0)]`. (Uses a helper `charToIndex` for readability).
        *   Example: `"eat"` -> `[1,1,0,0,1,0,...,0]` (1 'a', 1 'e', 1 't').
    *   **Generate Key:**
        *   Convert the `charCounts` array into a string. A good way is to `join` elements with a unique separator (e.g., `#`) to avoid collisions (`"11"` from `[1,1]` vs `[11]` if not separated).
        *   Example: `[1,1,0,0,1,0,...,0]` -> `"1#1#0#0#1#0#...#0"`
    *   **Group Anagrams:**
        *   Similar to Solution 1: check if `anagramGroups` `has(countKey)`, then push or set.
4.  **Return Results:** `return Array.from(anagramGroups.values());`

**ASCII Art Diagram (Character Count Key):**

```
Input: ["eat", "tea", "tan", "ate", "nat", "bat"]

Initialize: anagramGroups = {}

1. str = "eat"
   charCounts = [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0] (a=1, e=1, t=1)
   countKey = "1#0#0#0#1#0#...#0#1#0#..."
   anagramGroups = { "1#...#1": ["eat"] }

2. str = "tea"
   charCounts = [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0]
   countKey = "1#...#1"
   anagramGroups = { "1#...#1": ["eat", "tea"] }

3. str = "tan"
   charCounts = [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0] (a=1, n=1, t=1)
   countKey = "1#...#1#...#1"
   anagramGroups = { "1#...#1": ["eat", "tea"], "1#...#1#...#1": ["tan"] }

... and so on.

Return: [ ["eat", "tea", "ate"], ["tan", "nat"], ["bat"] ] (order of groups may vary)
```

**Time Complexity:** O(N * K)
*   N is the number of strings.
*   K is the maximum length of a string.
*   For each string:
    *   Iterating through characters to build frequency array: O(K).
    *   Converting frequency array to string key: O(alphabet_size), which is O(1) (26 for English lowercase).
    *   Hash map insertion/lookup: Average O(1).
*   Total: N * K. This is generally more efficient than O(N * K log K) for large K, as `K log K` grows faster than `K`.

**Space Complexity:** O(N * K)
*   Similar to Solution 1. The map stores N entries. Each key is a string of length `alphabet_size` (which is constant, so O(1)) and each value stores the original string of length K.
*   Total space for keys and values can be up to N * K characters.
```