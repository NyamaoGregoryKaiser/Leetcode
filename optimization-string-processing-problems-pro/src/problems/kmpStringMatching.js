```javascript
/**
 * @fileoverview Problem: KMP String Matching
 *
 * Implement the `strstr` function (or equivalent), which searches for the first occurrence
 * of `needle` in `haystack`, returning the index of the first character of the `needle`,
 * or -1 if `needle` is not part of `haystack`.
 *
 * This problem is solved using the Knuth-Morris-Pratt (KMP) algorithm, an efficient string-searching algorithm.
 *
 * Constraints:
 * 1 <= haystack.length, needle.length <= 10^5
 * `haystack` and `needle` consist of lowercase English letters.
 */

/**
 * Solution 1: Brute Force Approach
 * This is the most straightforward but least efficient method.
 * It checks every possible starting position for the needle in the haystack.
 *
 * Algorithm:
 * 1. Iterate through the `haystack` from index `i = 0` up to `haystack.length - needle.length`.
 * 2. For each `i`, compare the substring `haystack.substring(i, i + needle.length)` with `needle`.
 * 3. If they match, return `i`.
 * 4. If no match is found after checking all possible starting positions, return -1.
 *
 * Time Complexity: O(N * M)
 * Where N is the length of `haystack` and M is the length of `needle`.
 * In the worst case (e.g., `haystack = "aaaaab"`, `needle = "aaab"`), we might perform
 * M comparisons for almost every possible starting position in the haystack.
 *
 * Space Complexity: O(1)
 * Only a few variables are used.
 *
 * @param {string} haystack - The string to search within.
 * @param {string} needle - The string to search for.
 * @returns {number} The index of the first occurrence of needle, or -1 if not found.
 */
function strStrBruteForce(haystack, needle) {
    if (needle.length === 0) {
        return 0; // Empty needle is always found at index 0
    }
    if (haystack.length < needle.length) {
        return -1; // Haystack is shorter than needle, cannot contain it
    }

    // Iterate through all possible starting positions in haystack
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        let match = true;
        // Compare the substring of haystack with the needle
        for (let j = 0; j < needle.length; j++) {
            if (haystack[i + j] !== needle[j]) {
                match = false;
                break; // Mismatch found, move to next starting position in haystack
            }
        }
        if (match) {
            return i; // Full match found
        }
    }

    return -1; // No match found
}

/**
 * Solution 2: Knuth-Morris-Pratt (KMP) Algorithm
 *
 * The KMP algorithm improves upon brute force by avoiding redundant comparisons
 * when a mismatch occurs. It pre-processes the `needle` to build a "longest proper prefix
 * which is also a suffix" (LPS) array. This LPS array tells us how many characters
 * to shift the `needle` by, instead of always shifting by one.
 *
 * Example: `needle = "ABABCABAB"`
 * LPS array: `[0, 0, 1, 2, 0, 1, 2, 3, 4]`
 * - `LPS[i]` stores the length of the longest proper prefix of `needle[0...i]`
 *   that is also a suffix of `needle[0...i]`.
 * - "Proper prefix" means it cannot be the entire string itself.
 *
 * Algorithm Steps:
 * 1. **Compute LPS Array:**
 *    - Create an array `lps` of the same length as `needle`, initialized to zeros.
 *    - Use two pointers: `len` (length of the previous longest prefix suffix) and `i` (current index).
 *    - `len` tracks the length of the longest prefix of `needle[0...i-1]` that is also a suffix.
 *    - If `needle[i]` matches `needle[len]`: increment `len`, set `lps[i] = len`, increment `i`.
 *    - If mismatch (`needle[i] !== needle[len]`):
 *      - If `len` is not 0, set `len = lps[len - 1]` (try a shorter prefix suffix).
 *      - If `len` is 0, set `lps[i] = 0`, increment `i`.
 *
 * 2. **Search for Pattern in Haystack:**
 *    - Use two pointers: `i` for `haystack` (main string) and `j` for `needle` (pattern).
 *    - If `haystack[i]` matches `needle[j]`: increment both `i` and `j`.
 *    - If `j` reaches `needle.length`, a match is found. Return `i - j`.
 *    - If mismatch (`haystack[i] !== needle[j]`):
 *      - If `j` is not 0, set `j = lps[j - 1]` (shift needle based on LPS array).
 *      - If `j` is 0, increment `i` (no prefix to backtrack, move to next char in haystack).
 *
 * Time Complexity: O(N + M)
 * Where N is the length of `haystack` and M is the length of `needle`.
 * - Computing LPS array: O(M) because each character of `needle` is visited at most twice (once by `i`, once by `len` reset).
 * - Searching in haystack: O(N) because each character of `haystack` is visited at most twice.
 * Total time = O(M + N). This is significantly better than O(N * M) for large strings.
 *
 * Space Complexity: O(M)
 * For storing the LPS array.
 *
 * @param {string} haystack - The string to search within.
 * @param {string} needle - The string to search for.
 * @returns {number} The index of the first occurrence of needle, or -1 if not found.
 */
function strStrKMP(haystack, needle) {
    if (needle.length === 0) {
        return 0; // Empty needle is always found at index 0
    }
    if (haystack.length < needle.length) {
        return -1; // Haystack is shorter than needle, cannot contain it
    }

    const N = haystack.length;
    const M = needle.length;

    // Step 1: Compute LPS array for the needle (pattern)
    const lps = computeLPSArray(needle, M);

    let i = 0; // Pointer for haystack (text)
    let j = 0; // Pointer for needle (pattern)

    while (i < N) {
        if (needle[j] === haystack[i]) {
            i++;
            j++;
        }

        if (j === M) {
            // Pattern found at index (i - j)
            return i - j;
        } else if (i < N && needle[j] !== haystack[i]) {
            // Mismatch after j matches
            // Do not match lps[0...lps[j-1]] characters, they will match anyway
            if (j !== 0) {
                j = lps[j - 1]; // Shift j back using LPS array
            } else {
                i++; // If j is 0, no prefix to backtrack, just move to next char in haystack
            }
        }
    }

    return -1; // Pattern not found
}

/**
 * Helper function: Computes the Longest Proper Prefix which is also Suffix (LPS) array.
 * Used by the KMP algorithm.
 *
 * @param {string} needle - The pattern string.
 * @param {number} M - Length of the needle.
 * @returns {number[]} The LPS array.
 */
function computeLPSArray(needle, M) {
    // lps[i] stores the length of the longest proper prefix of needle[0...i]
    // that is also a suffix of needle[0...i].
    const lps = Array(M).fill(0);

    let length = 0; // Length of the previous longest prefix suffix
    let i = 1;      // Iterator for the needle array

    // lps[0] is always 0
    while (i < M) {
        if (needle[i] === needle[length]) {
            // If characters match, extend the current prefix suffix
            length++;
            lps[i] = length;
            i++;
        } else {
            // Mismatch
            if (length !== 0) {
                // If length is not 0, we can fall back to the LPS value of the previous prefix
                // This means we are looking for a shorter prefix that is also a suffix.
                length = lps[length - 1];
            } else {
                // If length is 0, no common prefix suffix found at this point,
                // so lps[i] remains 0.
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

module.exports = {
    strStrBruteForce,
    strStrKMP,
    computeLPSArray // Exported for testing/explanation purposes
};
```