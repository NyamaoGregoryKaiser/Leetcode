```javascript
/**
 * @fileoverview Implements various approaches to check if a string is a palindrome.
 * A palindrome is a string that reads the same forwards and backwards.
 * For this problem, we typically consider only alphanumeric characters and ignore case.
 */

const { cleanStringAlphanumeric } = require('../utils/string-helpers');

/**
 * Solution 1: Two-Pointer Approach (Optimal)
 * This approach iterates from both ends of the cleaned string inwards, comparing characters.
 * It's memory-efficient as it doesn't create a reversed string.
 *
 * @param {string} s The input string.
 * @returns {boolean} True if the string is a palindrome, false otherwise.
 *
 * Time Complexity: O(N)
 *   - O(N) for cleaning the string (converting to lowercase, removing non-alphanumeric).
 *   - O(N/2) which simplifies to O(N) for the two-pointer comparison.
 *   Overall, dominated by string cleaning, so O(N).
 * Space Complexity: O(N)
 *   - O(N) for creating the cleaned string.
 *   - O(1) for the pointers.
 *   Overall, dominated by the cleaned string, so O(N).
 */
function isPalindromeTwoPointers(s) {
    // 1. Handle edge cases: empty string or single character string are palindromes.
    if (s === null || s.length <= 1) {
        return true;
    }

    // 2. Clean the string: remove non-alphanumeric characters and convert to lowercase.
    // This helper function ensures that 'A man, a plan, a canal: Panama' becomes 'amanaplanacanalpanama'.
    const cleanedString = cleanStringAlphanumeric(s);

    // 3. Initialize two pointers: one at the beginning and one at the end of the cleaned string.
    let left = 0;
    let right = cleanedString.length - 1;

    // 4. Iterate while the left pointer is less than the right pointer.
    while (left < right) {
        // 5. Compare characters at the current pointers.
        if (cleanedString[left] !== cleanedString[right]) {
            // If they don't match, it's not a palindrome.
            return false;
        }
        // 6. Move pointers inwards.
        left++;
        right--;
    }

    // 7. If the loop completes, all characters matched, so it's a palindrome.
    return true;
}

/**
 * Solution 2: Reverse and Compare Approach
 * This approach cleans the string, reverses it, and then compares the original cleaned string
 * with the reversed one. It's conceptually simpler but might be less memory-efficient for very long strings
 * due to creating an entirely new reversed string.
 *
 * @param {string} s The input string.
 * @returns {boolean} True if the string is a palindrome, false otherwise.
 *
 * Time Complexity: O(N)
 *   - O(N) for cleaning the string.
 *   - O(N) for reversing the cleaned string (e.g., `split`, `reverse`, `join`).
 *   - O(N) for comparing the two strings.
 *   Overall, O(N).
 * Space Complexity: O(N)
 *   - O(N) for the cleaned string.
 *   - O(N) for the reversed cleaned string.
 *   Overall, O(N).
 */
function isPalindromeReverseAndCompare(s) {
    // 1. Handle edge cases: empty string or single character string are palindromes.
    if (s === null || s.length <= 1) {
        return true;
    }

    // 2. Clean the string: remove non-alphanumeric characters and convert to lowercase.
    const cleanedString = cleanStringAlphanumeric(s);

    // 3. Reverse the cleaned string.
    //    - `split('')` converts the string into an array of characters.
    //    - `reverse()` reverses the array in place.
    //    - `join('')` converts the array back into a string.
    const reversedString = cleanedString.split('').reverse().join('');

    // 4. Compare the original cleaned string with its reversed version.
    return cleanedString === reversedString;
}

/**
 * Solution 3: Two-Pointer Approach without pre-cleaning (Less common in interviews, more complex)
 * This approach attempts to compare characters while skipping non-alphanumeric characters on the fly.
 * It avoids creating an intermediate `cleanedString`, potentially saving space if the original string
 * has many non-alphanumeric characters, but adds complexity to the loop condition.
 *
 * @param {string} s The input string.
 * @returns {boolean} True if the string is a palindrome, false otherwise.
 *
 * Time Complexity: O(N)
 *   - Iterates through the string with two pointers, potentially visiting each character twice
 *     in the worst case (once for `isAlphanumeric` check, once for comparison).
 *   Overall, O(N).
 * Space Complexity: O(1)
 *   - No new string created, only pointers and a helper function for char check.
 *   This is the most memory-efficient approach if `cleanStringAlphanumeric` is considered O(N) space.
 *   However, JS string methods (like `toLowerCase()`) still create new strings, so a true O(1) space
 *   would require character-by-character lowercasing without creating new strings, which is
 *   more complicated in JS.
 */
function isPalindromeTwoPointersInPlace(s) {
    if (s === null || s.length <= 1) {
        return true;
    }

    let left = 0;
    let right = s.length - 1;

    // Helper to check if a character is alphanumeric
    const isAlphanumeric = (char) => {
        const code = char.charCodeAt(0);
        return (code >= 48 && code <= 57) ||  // numeric (0-9)
               (code >= 97 && code <= 122) || // lower alpha (a-z)
               (code >= 65 && code <= 90);    // upper alpha (A-Z)
    };

    while (left < right) {
        // Move left pointer past non-alphanumeric characters
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        // Move right pointer past non-alphanumeric characters
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }

        // If pointers meet or cross, we've processed all valid characters
        if (left >= right) {
            break;
        }

        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        // Move pointers inwards
        left++;
        right--;
    }

    return true;
}


module.exports = {
    isPalindromeTwoPointers,
    isPalindromeReverseAndCompare,
    isPalindromeTwoPointersInPlace
};
```