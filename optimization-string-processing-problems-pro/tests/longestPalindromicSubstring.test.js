```javascript
/**
 * @fileoverview Test suite for Longest Palindromic Substring problem.
 */

const { testSuite, assertStrictEquals } = require('../src/utils/assert');
const {
    longestPalindromeExpandAroundCenter,
    longestPalindromeDP
} = require('../src/problems/longestPalindromicSubstring');

testSuite('Longest Palindromic Substring - Expand Around Center', () => {
    it('should return "a" for single character string', () => {
        assertStrictEquals(longestPalindromeExpandAroundCenter("a"), "a");
    });

    it('should return "b" for "ab"', () => {
        assertStrictEquals(longestPalindromeExpandAroundCenter("ab"), "a");
    });

    it('should return "bb" for "bb"', () => {
        assertStrictEquals(longestPalindromeExpandAroundCenter("bb"), "bb");
    });

    it('should return "bab" for "babad"', () => {
        // "aba" is also valid, either is fine. We return one of them.
        const result = longestPalindromeExpandAroundCenter("babad");
        assertStrictEquals(result === "bab" || result === "aba", true, `Expected "bab" or "aba", got "${result}"`);
    });

    it('should return "bb" for "cbbd"', () => {
        assertStrictEquals(longestPalindromeExpandAroundCenter("cbbd"), "bb");
    });

    it('should return "racecar" for "racecar"', () => {
        assertStrictEquals(longestPalindromeExpandAroundCenter("racecar"), "racecar");
    });

    it('should return "madam" for "madam"', () => {
        assertStrictEquals(longestPalindromeExpandAroundCenter("madam"), "madam");
    });

    it('should return "anana" for "bananas"', () => {
        assertStrictEquals(longestPalindromeExpandAroundCenter("bananas"), "anana");
    });

    it('should return "" for an empty string', () => {
        assertStrictEquals(longestPalindromeExpandAroundCenter(""), "");
    });

    it('should return "a" for "ac"', () => {
        assertStrictEquals(longestPalindromeExpandAroundCenter("ac"), "a");
    });

    it('should handle long string with single character palindrome', () => {
        const longStr = "abcdefghijklmnopqrstuvwxyz";
        assertStrictEquals(longestPalindromeExpandAroundCenter(longStr), "a");
    });

    it('should handle long string with long palindrome at end', () => {
        const longStr = "abcdefghijklmnopponmlkjihgfedcba";
        assertStrictEquals(longestPalindromeExpandAroundCenter(longStr), "mnopponm");
    });

    it('should handle string with all same characters', () => {
        assertStrictEquals(longestPalindromeExpandAroundCenter("aaaaa"), "aaaaa");
    });

    it('should handle string with complex mixed palindrome', () => {
        assertStrictEquals(longestPalindromeExpandAroundCenter("forgeeksskeegfor"), "geeksskeeg");
    });

    it('should handle "aabaca" -> "aba"', () => {
        assertStrictEquals(longestPalindromeExpandAroundCenter("aabaca"), "aba");
    });
});

testSuite('Longest Palindromic Substring - Dynamic Programming', () => {
    it('should return "a" for single character string', () => {
        assertStrictEquals(longestPalindromeDP("a"), "a");
    });

    it('should return "b" for "ab"', () => {
        assertStrictEquals(longestPalindromeDP("ab"), "a");
    });

    it('should return "bb" for "bb"', () => {
        assertStrictEquals(longestPalindromeDP("bb"), "bb");
    });

    it('should return "bab" for "babad"', () => {
        // "aba" is also valid, either is fine. DP might prioritize one based on iteration order.
        const result = longestPalindromeDP("babad");
        assertStrictEquals(result === "bab" || result === "aba", true, `Expected "bab" or "aba", got "${result}"`);
    });

    it('should return "bb" for "cbbd"', () => {
        assertStrictEquals(longestPalindromeDP("cbbd"), "bb");
    });

    it('should return "racecar" for "racecar"', () => {
        assertStrictEquals(longestPalindromeDP("racecar"), "racecar");
    });

    it('should return "madam" for "madam"', () => {
        assertStrictEquals(longestPalindromeDP("madam"), "madam");
    });

    it('should return "anana" for "bananas"', () => {
        assertStrictEquals(longestPalindromeDP("bananas"), "anana");
    });

    it('should return "" for an empty string', () => {
        assertStrictEquals(longestPalindromeDP(""), "");
    });

    it('should return "a" for "ac"', () => {
        assertStrictEquals(longestPalindromeDP("ac"), "a");
    });

    it('should handle long string with single character palindrome', () => {
        const longStr = "abcdefghijklmnopqrstuvwxyz";
        assertStrictEquals(longestPalindromeDP(longStr), "a");
    });

    it('should handle long string with long palindrome at end', () => {
        const longStr = "abcdefghijklmnopponmlkjihgfedcba";
        assertStrictEquals(longestPalindromeDP(longStr), "mnopponm");
    });

    it('should handle string with all same characters', () => {
        assertStrictEquals(longestPalindromeDP("aaaaa"), "aaaaa");
    });

    it('should handle string with complex mixed palindrome', () => {
        assertStrictEquals(longestPalindromeDP("forgeeksskeegfor"), "geeksskeeg");
    });

    it('should handle "aabaca" -> "aba"', () => {
        assertStrictEquals(longestPalindromeDP("aabaca"), "aba");
    });
});
```