```markdown
# Edge Cases and Gotchas

This document outlines common edge cases and potential pitfalls when dealing with string manipulation problems, specifically for the problems covered in this project. Being aware of these helps in writing robust solutions and performing well in interviews.

---

## General String Manipulation Edge Cases:

*   **Null Input:** Always check if the input string is `null`. Depending on the problem, you might return an empty string, throw an `IllegalArgumentException`, or handle it as a specific case.
*   **Empty String (""):** An empty string is often a valid input.
    *   For palindromes: `""` is usually considered a palindrome.
    *   For permutations: `""` has one permutation, which is `""`.
    *   For anagrams: `""` and `""` are anagrams. `""` and `"a"` are not.
*   **Single Character String:** `s.length() == 1`. Often a base case or a trivial case.
*   **Strings with Only Identical Characters:** e.g., "aaaaa".
*   **Strings with Mixed Case:** "Racecar" vs "racecar". Should you treat 'A' and 'a' as the same or different? Clarify with interviewer. If case-insensitive, convert to a common case (e.g., lowercase) early.
*   **Strings with Special Characters or Spaces:** "A man, a plan, a canal: Panama". Should these be considered, ignored, or cleaned? Clarify.
*   **Character Set:** Are inputs limited to ASCII, English alphabet, or full Unicode? This affects choices between frequency arrays (fixed size) and HashMaps (flexible).

---

## 1. Longest Palindromic Substring

*   **Null/Empty/Single character string:** Handled by returning `""` or the character itself. My implementations return `""` for `null` or empty, and `s` for single char.
*   **String with no palindromes (other than single characters):** e.g., "abcde". The longest will be any single character, e.g., "a".
*   **Multiple longest palindromes of the same length:** e.g., "babad" -> "bab" or "aba". The problem usually allows returning any one of them. The choice often depends on the traversal order of the algorithm (e.g., "bab" might be found before "aba" due to starting from index 0).
*   **Performance for very long strings:** Brute force is O(N^3) and will fail for N > ~100. DP and Expand Around Center are O(N^2) and work well for N up to ~1000-2000. For N > 2000, Manacher's algorithm (O(N)) is typically required, but it's more complex and usually not expected in a standard interview unless specifically asked for the optimal.
*   **Edge indices in DP/Expand Around Center:** Careful handling of `left >= 0` and `right < N` bounds. In DP, `i+1` and `j-1` should not go out of bounds for the inner palindrome check; the loop ranges usually implicitly handle this by starting `len` from 3.

---

## 2. String Permutations

*   **Null/Empty/Single character string:** Handled. Empty string usually results in `[""]` or `[]` depending on specification. My implementations return `[""]` for empty, `[]` for null.
*   **Input string with duplicate characters:**
    *   If the problem asks for *all* permutations (including duplicates if they existed as distinct objects, e.g., `s = "a1 a2 b" -> "a1 a2 b", "a2 a1 b"`), then simple backtracking works.
    *   If the problem asks for *distinct* permutations (e.g., `s = "aab" -> "aab", "aba", "baa"` but not `aab` appearing twice), special handling is required.
        *   Using a `Set<String>` to store results (as in `permuteWithDuplicates`) implicitly handles this but adds overhead for string creation and set insertions.
        *   Pre-sorting the input array and adding a skip condition (`if (i > 0 && chars[i] == chars[i - 1] && !visited[i - 1]) continue;`) during backtracking (as in `permuteOptimizedDistinct`) is more efficient as it prunes the search tree.
*   **Performance:** Permutations explode exponentially (N!). For N=10, 10! = 3,628,800. For N=12, 12! = 479,001,600. Even with highly optimized code, N > ~10-12 will likely hit time limits if all permutations must be generated and stored. Be ready to discuss this limitation.

---

## 3. Anagram Checker

*   **Null/Empty strings:**
    *   `null, null` -> `false` (my implementation). Some might argue `true` as they are "equivalent". Clarify.
    *   `"", ""` -> `true`.
    *   `"a", ""` -> `false` (different lengths).
*   **Different lengths:** The most fundamental check. If lengths differ, they cannot be anagrams.
*   **Case sensitivity:** `"Listen"` and `"silent"` are not anagrams if case-sensitive. My `isAnagramSorting` and `isAnagramFrequencyArray` are case-sensitive. `isAnagramFrequencyMap` is also case-sensitive unless explicit `Character.toLowerCase()` is used. Clarify and adapt.
*   **Non-alphabetic characters/spaces:** `"A gentleman"` and `"Elegant man"` are anagrams if spaces and case are ignored. My implementations do not ignore these, treating them as distinct characters. Adjust logic (e.g., `s.replaceAll("[^a-zA-Z]", "").toLowerCase()`) if needed.
*   **Character set:** For limited character sets (like lowercase English 'a'-'z'), a `int[26]` array is optimal (O(1) space). For broader ASCII or Unicode, `HashMap<Character, Integer>` is necessary, leading to O(K) space where K is unique characters.

---

## 4. Minimum Window Substring

*   **Null/Empty strings:** My implementation returns `""`. If `t` is empty, some definitions return `""` or `""` (the smallest empty string). If `s` is empty, definitely `""`.
*   **`t` is longer than `s`:** Cannot find a window. Return `""`. My implementation handles this early.
*   **No valid window exists:** If `t` contains characters not in `s`, or `s` doesn't have enough frequency of a required character (e.g., `s="ab", t="aab"`). Return `""`.
*   **`t` contains duplicate characters:** The frequency map (`tCounts`) and `matchedRequiredChars` must correctly account for duplicate character requirements. `matchedRequiredChars` increments for *each instance* of a character from `t` found in the window, up to its `tCounts` limit. This is crucial for correctness.
*   **Order of operations in shrinking window:**
    1.  Check for current valid window and update `minLength`.
    2.  Process `s[left]` (decrement its count, possibly `matchedRequiredChars`).
    3.  Increment `left`.
    The order matters to ensure `matchedRequiredChars` is correctly maintained relative to the shrinking window.
*   **Off-by-one errors for window length/start index:** `right - left + 1` for length, `s.substring(minStart, minStart + minLength)` for extraction. Be careful with inclusive/exclusive bounds.
*   **Large inputs:** The O(N+M) sliding window approach is highly efficient and should pass even for very long strings (N, M up to 10^5).

---
```