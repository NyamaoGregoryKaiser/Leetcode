```javascript
/**
 * @fileoverview Utility functions for string manipulation.
 * This file centralizes common string operations to promote reusability and maintainability.
 */

/**
 * Cleans a string by removing non-alphanumeric characters and converting it to lowercase.
 * This is particularly useful for problems like Palindrome Checker where case and special characters
 * should be ignored.
 * @param {string} s The input string.
 * @returns {string} The cleaned string containing only lowercase alphanumeric characters.
 *
 * Time Complexity: O(N) where N is the length of the input string, due to string iteration and regex matching.
 * Space Complexity: O(N) in the worst case if all characters are alphanumeric, as a new string is created.
 */
function cleanStringAlphanumeric(s) {
    if (typeof s !== 'string') {
        throw new TypeError("Input must be a string.");
    }
    // Use a regular expression to replace all non-alphanumeric characters with an empty string.
    // The `g` flag ensures all occurrences are replaced.
    // The `i` flag ensures case-insensitive matching for alphanumeric characters, though we
    // convert to lowercase afterwards anyway.
    return s.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

/**
 * Checks if a character is a digit (0-9).
 * @param {string} char The character to check.
 * @returns {boolean} True if the character is a digit, false otherwise.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function isDigit(char) {
    if (typeof char !== 'string' || char.length !== 1) {
        throw new TypeError("Input must be a single character string.");
    }
    return char >= '0' && char <= '9';
}

/**
 * Converts a character to its character code and uses it as an index for a 26-element array (a-z).
 * Useful for problems involving character frequencies, e.g., anagrams, where 'a' maps to 0, 'b' to 1, etc.
 * Assumes lowercase English alphabet.
 * @param {string} char The character to convert. Must be a lowercase English letter.
 * @returns {number} The 0-indexed position of the character (0 for 'a', 1 for 'b', ...).
 * @throws {Error} If the input is not a lowercase English letter.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function charToIndex(char) {
    if (typeof char !== 'string' || char.length !== 1 || char < 'a' || char > 'z') {
        throw new Error("Input must be a single lowercase English letter.");
    }
    return char.charCodeAt(0) - 'a'.charCodeAt(0);
}

/**
 * Generates a random string of a given length, consisting of lowercase English letters.
 * Useful for generating test data or benchmark inputs.
 * @param {number} length The desired length of the random string.
 * @returns {string} A random string.
 * @throws {Error} If length is not a non-negative number.
 *
 * Time Complexity: O(length)
 * Space Complexity: O(length)
 */
function generateRandomString(length) {
    if (typeof length !== 'number' || length < 0 || !Number.isInteger(length)) {
        throw new Error("Length must be a non-negative integer.");
    }
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Generates an array of random strings with varying lengths.
 * Useful for generating test data or benchmark inputs for problems like LCP or Group Anagrams.
 * @param {number} count The number of strings to generate.
 * @param {number} minLength The minimum length for each string.
 * @param {number} maxLength The maximum length for each string.
 * @returns {string[]} An array of random strings.
 * @throws {Error} If count, minLength, or maxLength are invalid.
 *
 * Time Complexity: O(count * maxLength) in the worst case.
 * Space Complexity: O(count * maxLength) in the worst case.
 */
function generateRandomStringArray(count, minLength, maxLength) {
    if (typeof count !== 'number' || count < 0 || !Number.isInteger(count)) {
        throw new Error("Count must be a non-negative integer.");
    }
    if (typeof minLength !== 'number' || minLength < 0 || !Number.isInteger(minLength)) {
        throw new Error("Min length must be a non-negative integer.");
    }
    if (typeof maxLength !== 'number' || maxLength < minLength || !Number.isInteger(maxLength)) {
        throw new Error("Max length must be an integer >= minLength.");
    }

    const result = [];
    for (let i = 0; i < count; i++) {
        const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        result.push(generateRandomString(length));
    }
    return result;
}

module.exports = {
    cleanStringAlphanumeric,
    isDigit,
    charToIndex,
    generateRandomString,
    generateRandomStringArray
};
```