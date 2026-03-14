```javascript
/**
 * @fileoverview Implements various approaches to find the longest common prefix (LCP)
 * amongst an array of strings.
 * The longest common prefix is the longest string that is a prefix of all strings in the array.
 * If there is no common prefix, return an empty string.
 */

/**
 * Solution 1: Vertical Scanning (Optimal for typical cases)
 * This approach iterates through the characters of the first string (which is assumed to be the
 * shortest or representative length). For each character, it checks if it exists at the same
 * position in all other strings. If any string doesn't have that character or has a different one,
 * the current prefix is the LCP.
 *
 * @param {string[]} strs An array of strings.
 * @returns {string} The longest common prefix.
 *
 * Time Complexity: O(S), where S is the sum of all characters in all strings.
 *   - In the worst case, all strings are identical. The algorithm would iterate through
 *     the length of the shortest string (L) and for each character, compare it with
 *     all other strings (N-1 comparisons). So, O(N * L_min), where N is number of strings
 *     and L_min is length of shortest string. If L_min is the length of the LCP,
 *     then it's effectively O(N * L_LCP).
 *   - This is generally faster than horizontal scanning for short LCPs or when strings
 *     are vastly different.
 * Space Complexity: O(1)
 *   - Only a few variables for pointers and prefix. No new strings are created beyond the result.
 */
function longestCommonPrefixVerticalScanning(strs) {
    // 1. Handle edge cases:
    if (!strs || strs.length === 0) {
        return ""; // No strings, no common prefix
    }
    if (strs.length === 1) {
        return strs[0]; // Only one string, it's its own LCP
    }

    // 2. Take the first string as a reference for prefix length.
    // The LCP cannot be longer than the shortest string in the array.
    // We iterate through its characters.
    const firstStr = strs[0];
    for (let i = 0; i < firstStr.length; i++) { // `i` is the character index
        const char = firstStr[i];

        // 3. For each character of the first string, compare it with the character
        // at the same position in all other strings.
        for (let j = 1; j < strs.length; j++) { // `j` is the string index
            const currentStr = strs[j];

            // 4. Check two conditions for prefix mismatch:
            //    a) If `currentStr` is shorter than `i`, then `firstStr[i]` cannot be
            //       a common character.
            //    b) If `currentStr[i]` is different from `char`.
            if (i === currentStr.length || currentStr[i] !== char) {
                // If a mismatch is found, the LCP is the part of `firstStr`
                // up to (but not including) the current character `i`.
                return firstStr.substring(0, i);
            }
        }
    }

    // 5. If the loop completes, it means the entire `firstStr` is a common prefix.
    return firstStr;
}

/**
 * Solution 2: Horizontal Scanning
 * This approach starts with the LCP being the first string. Then, it iterates through the
 * rest of the strings in the array. For each string, it updates the LCP by finding the
 * common prefix between the current LCP and the current string.
 *
 * @param {string[]} strs An array of strings.
 * @returns {string} The longest common prefix.
 *
 * Time Complexity: O(S), where S is the sum of all characters in all strings.
 *   - In the worst case, all strings are identical. If there are N strings, and
 *     the LCP length is L, then `indexOf` or `substring` operations might take L time.
 *     The loop runs N-1 times. Inside the loop, `longestCommonPrefix` (the helper)
 *     is called, which potentially scans up to L characters.
 *     So, O(N * L_LCP), where N is number of strings and L_LCP is the length of the final LCP.
 * Space Complexity: O(L_LCP)
 *   - The `prefix` variable stores the LCP, which can be up to the length of the shortest string.
 */
function longestCommonPrefixHorizontalScanning(strs) {
    if (!strs || strs.length === 0) {
        return "";
    }
    if (strs.length === 1) {
        return strs[0];
    }

    // Start with the first string as the initial common prefix.
    let prefix = strs[0];

    // Iterate through the rest of the strings.
    for (let i = 1; i < strs.length; i++) {
        const currentStr = strs[i];

        // While the current string does not start with the current `prefix`,
        // shorten the `prefix` by one character from the end.
        // `indexOf(prefix)` returns 0 if `currentStr` starts with `prefix`.
        while (currentStr.indexOf(prefix) !== 0) {
            // Shorten the prefix. If prefix becomes empty, there's no common prefix.
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix.length === 0) {
                return "";
            }
        }
    }

    return prefix;
}

/**
 * Solution 3: Divide and Conquer
 * This approach recursively divides the array of strings into two halves, finds the LCP
 * for each half, and then finds the LCP of those two LCPs.
 *
 * @param {string[]} strs An array of strings.
 * @returns {string} The longest common prefix.
 *
 * Time Complexity: O(S), where S is the sum of all characters in all strings.
 *   - Let N be the number of strings and L be the average length of a string.
 *   - The recursive calls traverse a binary tree structure. There are log(N) levels.
 *   - At each level, we perform `commonPrefix` operations. A `commonPrefix` call takes
 *     O(L) time.
 *   - Summing up over all levels, it is O(N * L) in the worst case (all strings are similar).
 *     More precisely, it's O(S) or O(N * L_LCP * log N) if LCP is small compared to L.
 * Space Complexity: O(L_LCP * log N)
 *   - Due to the recursion stack, which can go up to log N levels deep. Each stack frame
 *     stores the result of `commonPrefix`, which can be up to L_LCP characters long.
 */
function longestCommonPrefixDivideAndConquer(strs) {
    if (!strs || strs.length === 0) {
        return "";
    }

    /**
     * Helper function to find the common prefix between two strings.
     * @param {string} str1
     * @param {string} str2
     * @returns {string} The common prefix of str1 and str2.
     * Time: O(min(L1, L2)), Space: O(min(L1, L2)) (for substring) or O(1) if building char by char.
     */
    function commonPrefix(str1, str2) {
        let i = 0;
        while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
            i++;
        }
        return str1.substring(0, i);
    }

    /**
     * Recursive function to find LCP for a range of strings.
     * @param {number} start The starting index of the range.
     * @param {number} end The ending index of the range.
     * @returns {string} The LCP for the strings in the given range.
     */
    function findLCP(start, end) {
        if (start === end) {
            return strs[start]; // Base case: single string is its own LCP
        }

        const mid = Math.floor((start + end) / 2);
        const lcpLeft = findLCP(start, mid);         // LCP of the left half
        const lcpRight = findLCP(mid + 1, end);      // LCP of the right half

        return commonPrefix(lcpLeft, lcpRight);      // LCP of the two halves' LCPs
    }

    return findLCP(0, strs.length - 1);
}


module.exports = {
    longestCommonPrefixVerticalScanning,
    longestCommonPrefixHorizontalScanning,
    longestCommonPrefixDivideAndConquer
};
```