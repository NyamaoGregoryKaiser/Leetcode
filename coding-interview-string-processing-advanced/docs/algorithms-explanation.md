```markdown
# Algorithm Explanations

This document provides detailed explanations for the string manipulation algorithms implemented in this project, covering their intuition, step-by-step logic, and time/space complexity analysis.

---

## 1. Valid Palindrome II

### Problem Description
Given a string `s`, return `true` if the `s` can be a palindrome after deleting **at most one** character from it.

### Optimal Solution: Two Pointers with One Skip

#### Intuition
A standard palindrome check uses two pointers, one from the start and one from the end, moving inwards. If characters at the pointers don't match, it's not a palindrome. For "Valid Palindrome II", we're allowed *one* mismatch. So, if we find a mismatch, we have two choices: either skip the character from the left pointer or skip the character from the right pointer. If either of these paths leads to a valid palindrome for the *remaining substring*, then the original string is a valid palindrome with one deletion.

#### Algorithm Steps
1.  Initialize two pointers, `left` at the beginning (`0`) and `right` at the end (`s.length - 1`).
2.  Iterate while `left < right`:
    a.  If `s[left]` equals `s[right]`, then these characters match. Move both pointers inwards: `left++`, `right--`.
    b.  If `s[left]` does not equal `s[right]`, we've found our potential single mismatch. At this point, we must choose to delete either `s[left]` or `s[right]`.
        *   Option 1: Delete `s[left]`. Check if the substring `s[left+1...right]` is a palindrome. This can be done by calling a helper function `isPalindromeRange(s, left + 1, right)`.
        *   Option 2: Delete `s[right]`. Check if the substring `s[left...right-1]` is a palindrome. This can be done by calling `isPalindromeRange(s, left, right - 1)`.
        *   If either `Option 1` or `Option 2` returns `true`, then the original string is a valid palindrome with one deletion. Return `true`.
3.  If the loop completes, it means all characters matched, or at most one mismatch was handled by the recursive calls (which then returned `true`). This implies the string is already a palindrome or became one after a single deletion. Return `true`.

#### Helper Function: `isPalindromeRange(s, left, right)`
This function checks if the substring of `s` between `left` and `right` (inclusive) is a palindrome.
1.  Iterate while `left < right`:
    a.  If `s[left]` does not equal `s[right]`, return `false`.
    b.  Move pointers inwards: `left++`, `right--`.
2.  If the loop completes, all characters in the range matched. Return `true`.

#### Time Complexity: O(N)
*   The main `validPalindrome` function iterates through the string at most `N/2` times.
*   In the worst case (when a mismatch is found), it makes two calls to `isPalindromeRange`.
*   Each `isPalindromeRange` call iterates through a substring of length at most `N`.
*   Thus, the total operations are proportional to `N/2` (main loop) + `N` (first helper call) + `N` (second helper call) = `O(N)`.

#### Space Complexity: O(1)
*   Only a few variables for pointers and the call stack for the helper functions are used. The depth of the recursion stack for `isPalindromeRange` is minimal (at most 2 levels from `validPalindrome`).

---

## 2. Group Anagrams

### Problem Description
Given an array of strings `strs`, group the anagrams together.

### Optimal Solution: Hash Map with Character Count Array as Key

#### Intuition
Anagrams are words that contain the same characters with the same frequencies, just in a different order. This property can be leveraged to create a canonical representation (a "key") for each group of anagrams. Any two anagrams will produce the same key. A hash map can then be used to store lists of words, mapping each unique key to its corresponding group of anagrams.

#### Algorithm Steps
1.  Initialize a `Map` (e.g., `Map<string, string[]>`) called `anagramGroups`. The key will be a string representation of character counts, and the value will be an array of strings that are anagrams.
2.  Iterate through each `str` in the input array `strs`.
3.  For each `str`, create a character frequency array. Since the problem implies lowercase English letters (a-z), an array of size 26 is suitable. Initialize all elements to `0`.
    *   Example: `charCounts = new Array(26).fill(0)`.
4.  Populate `charCounts`: For each character `char` in `str`:
    *   Increment the count at the index corresponding to `char`. The index can be calculated as `char.charCodeAt(0) - 'a'.charCodeAt(0)`.
5.  Convert the `charCounts` array into a unique string key. A simple and effective way is to `join` the array elements with a delimiter, e.g., `charCounts.join('#')`. This creates a string like `"1#0#0#1#..."` which uniquely represents the character frequencies.
6.  Use this `key` to interact with `anagramGroups`:
    *   If `anagramGroups` already `has(key)`, append `str` to the existing array: `anagramGroups.get(key)!.push(str)`.
    *   If `anagramGroups` does `not have(key)`, create a new entry: `anagramGroups.set(key, [str])`.
7.  After iterating through all strings in `strs`, the `values()` of the `anagramGroups` map will be the desired groups of anagrams. Convert these values to an array of arrays and return.

#### Time Complexity: O(N * K)
*   `N` is the number of strings in the input array.
*   `K` is the maximum length of a string.
*   The outer loop runs `N` times.
*   Inside the loop:
    *   Building the `charCounts` array involves iterating through each character of a string, taking `O(K)` time.
    *   Converting the `charCounts` array (fixed size 26) to a string key takes `O(26)` time, which is constant.
    *   Map operations (insertion, retrieval) take `O(1)` time on average.
*   Total time complexity: `N * (K + 26)` which simplifies to `O(N * K)`. This is generally more efficient than sorting each string (`O(N * K log K)`).

#### Space Complexity: O(N * K)
*   The `anagramGroups` map stores all `N` strings in its values. In the worst case, all strings are of length `K`. So, the total space for storing the strings is `O(N * K)`.
*   The `charCounts` array uses `O(26)` space, which is constant and temporary for each string.

---

## 3. Longest Substring Without Repeating Characters

### Problem Description
Given a string `s`, find the length of the longest substring without repeating characters.

### Optimal Solution: Sliding Window with a Hash Map

#### Intuition
The "Sliding Window" pattern is perfect for problems that ask for the longest/shortest subarray or substring that satisfies a certain condition. Here, the condition is "without repeating characters." We can maintain a window `[left, right]` where all characters within this window are unique. As we expand the window with `right`, if we encounter a duplicate, we must shrink the window from `left` until the duplicate is no longer present.

#### Algorithm Steps
1.  Initialize `maxLength = 0`. This will store the length of the longest valid substring found so far.
2.  Initialize `left = 0`. This pointer marks the beginning of the current valid window.
3.  Use a `Map` (e.g., `Map<string, number>`) called `charIndexMap`. This map will store the last seen index of each character encountered. `charIndexMap: { character -> its_last_index }`.
4.  Iterate with the `right` pointer from `0` to `s.length - 1`:
    a.  Get the `currentChar = s[right]`.
    b.  Check if `currentChar` is already in `charIndexMap` AND if its last seen index (`charIndexMap.get(currentChar)`) is greater than or equal to `left`. This check is crucial:
        *   If `charIndexMap.has(currentChar)` is true, it means `currentChar` has appeared before.
        *   If `charIndexMap.get(currentChar)! >= left`, it means the previous occurrence of `currentChar` is *within* the current window `[left, right]`. This signifies a duplicate in the current window.
        *   If both are true, we must move `left` to the position immediately after the previous occurrence of `currentChar`. So, update `left = charIndexMap.get(currentChar)! + 1`. This effectively shrinks the window from the left to remove the duplicate.
    c.  Regardless of whether a duplicate was found or `left` was moved, update the `charIndexMap` with the current character's new index: `charIndexMap.set(currentChar, right)`. This keeps track of the *most recent* position of `currentChar`.
    d.  Calculate the current valid window's length: `currentWindowLength = right - left + 1`.
    e.  Update `maxLength = Math.max(maxLength, currentWindowLength)`.
5.  After the loop finishes, `maxLength` will hold the maximum length of any substring found without repeating characters. Return `maxLength`.

#### Time Complexity: O(N)
*   The `right` pointer traverses the string from beginning to end once (`N` steps).
*   The `left` pointer also moves forward, and in the worst case, it can move up to `N` steps in total (e.g., when shrinking the window).
*   Map operations (getting and setting character indices) take `O(1)` time on average.
*   Therefore, the total time complexity is `O(N)`.

#### Space Complexity: O(min(N, M))
*   `M` is the size of the character set (e.g., 256 for extended ASCII, or 26 for lowercase English letters).
*   The `charIndexMap` stores at most `min(N, M)` unique characters. In the worst case, if all characters in the string are unique, it stores `N` entries. If the alphabet size `M` is smaller than `N`, it stores at most `M` entries.

---

## 4. String Compression

### Problem Description
Implement a function to perform basic string compression using the counts of repeated characters. If the "compressed" string would not become smaller than the original string, your method should return the original string.

### Optimal Solution: Iterative Builder with Two Pointers / Current Character Tracking

#### Intuition
This problem can be solved by iterating through the string, identifying consecutive runs of identical characters, counting them, and then appending the character and its count to a new "compressed" string. A key detail for JavaScript/TypeScript performance is to build the result in an array of characters/strings and then `join()` them at the end, as repeated string concatenation (`+=`) can be inefficient for very long strings.

#### Algorithm Steps
1.  Handle edge case: If the input string `s` is empty, return an empty string.
2.  Initialize an empty array, `compressedParts`, to store the character and count pairs. Using an array is efficient for building the result.
3.  Initialize a main pointer `i = 0` to traverse the input string `s`.
4.  Loop while `i < s.length`:
    a.  Store the `currentChar = s[i]`.
    b.  Initialize `count = 0`.
    c.  Use a nested loop or a second pointer `j` starting from `i` to count consecutive occurrences of `currentChar`:
        *   While `j < s.length` and `s[j] === currentChar`:
            *   Increment `count`.
            *   Increment `j`.
    d.  After the inner loop finishes, `count` holds the number of consecutive `currentChar`s, and `j` points to the first character *after* the current run (or `s.length`).
    e.  Add `currentChar` to `compressedParts`.
    f.  Add `count` (converted to a string, or pushed as a number for `join` to handle) to `compressedParts`.
    g.  Update the main pointer `i = j` to start the next iteration from the beginning of the next distinct character group.
5.  After the main loop finishes, join all elements in `compressedParts` to form the `compressedString`.
6.  Compare the `compressedString.length` with the original `s.length`.
    *   If `compressedString.length < s.length`, return `compressedString`.
    *   Otherwise (if the compressed string is not shorter or is the same length), return the original `s`.

#### Time Complexity: O(N)
*   The main pointer `i` traverses the string from beginning to end once.
*   The inner loop (driven by `j`) also contributes to a single overall traversal of the string. Each character in the input string is visited and processed by `i` or `j` exactly once.
*   Appending to the `compressedParts` array is `O(1)` on average.
*   Finally, `compressedParts.join('')` takes `O(L)` time, where `L` is the length of the `compressedParts` array, which can be up to `2*N` in the worst case.
*   Total time complexity is `O(N)`.

#### Space Complexity: O(N)
*   In the worst case (e.g., "abcde" or "aabbcc"), the compressed string will be `a1b1c1d1e1` or `a2b2c2`. The `compressedParts` array could store up to `2 * N` elements (character + count for each unique character group).
*   If the compressed string is shorter, this `O(N)` space is used for the output. If it's not shorter, we return the original string (which already exists).
*   So, the auxiliary space used is `O(N)`.

---
```