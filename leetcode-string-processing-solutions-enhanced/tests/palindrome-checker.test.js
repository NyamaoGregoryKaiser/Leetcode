```javascript
/**
 * @fileoverview Test suite for Palindrome Checker algorithms.
 * Uses Jest to test `isPalindromeTwoPointers`, `isPalindromeReverseAndCompare`,
 * and `isPalindromeTwoPointersInPlace` functions.
 */

const {
    isPalindromeTwoPointers,
    isPalindromeReverseAndCompare,
    isPalindromeTwoPointersInPlace
} = require('../src/algorithms/palindrome-checker');

// Group tests for Palindrome Checker
describe('Palindrome Checker', () => {
    // Array of all palindrome functions to test.
    // This allows running the same set of tests for each implementation.
    const palindromeFunctions = [
        { name: 'isPalindromeTwoPointers', func: isPalindromeTwoPointers },
        { name: 'isPalindromeReverseAndCompare', func: isPalindromeReverseAndCompare },
        { name: 'isPalindromeTwoPointersInPlace', func: isPalindromeTwoPointersInPlace }
    ];

    palindromeFunctions.forEach(({ name, func }) => {
        describe(`Function: ${name}`, () => {
            // Test cases for valid palindromes
            test('should return true for simple palindromes', () => {
                expect(func("racecar")).toBe(true);
                expect(func("madam")).toBe(true);
                expect(func("level")).toBe(true);
            });

            // Test cases for palindromes with mixed case and special characters
            test('should return true for palindromes with mixed cases and non-alphanumeric characters', () => {
                expect(func("A man, a plan, a canal: Panama")).toBe(true);
                expect(func("No lemon, no melon")).toBe(true);
                expect(func("Was it a car or a cat I saw?")).toBe(true);
                expect(func("Eva, can I stab bats in a cave?")).toBe(true);
            });

            // Test cases for non-palindromes
            test('should return false for non-palindromes', () => {
                expect(func("hello")).toBe(false);
                expect(func("world")).toBe(false);
                expect(func("apple")).toBe(false);
            });

            // Test cases for edge cases
            test('should return true for empty string', () => {
                expect(func("")).toBe(true);
            });

            test('should return true for single character string', () => {
                expect(func("a")).toBe(true);
                expect(func("Z")).toBe(true);
                expect(func("1")).toBe(true);
            });

            test('should return true for string with only non-alphanumeric characters', () => {
                expect(func("!@#$%^&*()")).toBe(true); // Cleans to ""
                expect(func("!a!")).toBe(true); // Cleans to "a"
                expect(func("!!")).toBe(true); // Cleans to ""
            });

            test('should handle numeric palindromes', () => {
                expect(func("121")).toBe(true);
                expect(func("12321")).toBe(true);
                expect(func("12345")).toBe(false);
            });

            test('should handle palindromes with numbers and letters', () => {
                expect(func("A1B1A")).toBe(true);
                expect(func("race a car")).toBe(false); // 'raceacar' vs 'raceacar' (false for TwoPointers/ReverseAndCompare because 'e'!='a')
                                                        // This specific test case might fail for `isPalindromeTwoPointersInPlace`
                                                        // if it doesn't correctly handle inner non-alphanumeric checks in a nuanced way.
                                                        // Let's refine based on the definition: "race a car" -> "raceacar"
                                                        // 'r'=='r', 'a'=='a', 'c'=='c', 'e'=='a' (false)
                                                        // So it should be false for all.
            });

            test('should handle long palindromes', () => {
                const longPalindrome = "A long, a saga, a car, a race, a plan, a canal, Panama!";
                expect(func(longPalindrome)).toBe(true);
            });

            test('should handle long non-palindromes', () => {
                const longNonPalindrome = "This is a very long string that is definitely not a palindrome.";
                expect(func(longNonPalindrome)).toBe(false);
            });

            test('should handle special characters that are not alphanumeric', () => {
                expect(func("$$$racecar$$$")).toBe(true);
                expect(func("0P")).toBe(false); // '0p' vs 'p0' -> false
                expect(func("!#@P00P@#!?")).toBe(true); // 'p00p' -> true
            });
        });
    });
});
```