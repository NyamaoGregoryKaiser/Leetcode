```java
package com.example.stringmanipulation.problems;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test class for LongestPalindromicSubstring.
 * Tests different approaches for finding the longest palindromic substring.
 */
class LongestPalindromicSubstringTest {

    // --- Test cases for all approaches ---
    // These test cases are designed to cover various scenarios, including:
    // - Simple palindromes (odd and even length)
    // - No palindromes (single characters are still palindromes)
    // - Palindromes at the beginning, middle, and end of the string
    // - Strings with repeating characters
    // - Edge cases like empty or single-character strings

    @ParameterizedTest(name = "Input: \"{0}\", Expected LPS: \"{1}\"")
    @CsvSource({
            "babad, bab",  // Odd length palindrome
            "cbbd, bb",    // Even length palindrome
            "a, a",        // Single character
            "ac, a",       // No palindrome longer than 1
            "racecar, racecar", // Full string is a palindrome
            "bananas, anana", // Palindrome in the middle
            "abcbe, bcb",
            "aaaaa, aaaaa", // All characters same
            "abacaba, abacaba", // Full string is a palindrome
            "pwwkew, ww", // Mixed characters, substring is palindrome
            "forgeeksskeegfor, geeksskeeg", // Longer example
            " '', '' "     // Empty string
    })
    @DisplayName("Should find the longest palindromic substring for various inputs")
    void testLongestPalindromicSubstring(String s, String expected) {
        // Test Brute Force
        assertEquals(expected, LongestPalindromicSubstring.bruteForce(s),
                "BruteForce failed for input: " + s);

        // Test Expand Around Center (Optimal)
        assertEquals(expected, LongestPalindromicSubstring.expandAroundCenter(s),
                "ExpandAroundCenter failed for input: " + s);

        // Test Dynamic Programming
        assertEquals(expected, LongestPalindromicSubstring.dynamicProgramming(s),
                "DynamicProgramming failed for input: " + s);
    }

    @Test
    @DisplayName("Should handle null input string for all methods")
    void testNullInput() {
        assertEquals("", LongestPalindromicSubstring.bruteForce(null));
        assertEquals("", LongestPalindromicSubstring.expandAroundCenter(null));
        assertEquals("", LongestPalindromicSubstring.dynamicProgramming(null));
    }

    @Test
    @DisplayName("Should handle single character string correctly for all methods")
    void testSingleCharString() {
        assertEquals("a", LongestPalindromicSubstring.bruteForce("a"));
        assertEquals("a", LongestPalindromicSubstring.expandAroundCenter("a"));
        assertEquals("a", LongestPalindromicSubstring.dynamicProgramming("a"));
    }

    @Test
    @DisplayName("Should handle string with no palindromic substring (except single chars)")
    void testNoPalindromicSubstring() {
        assertEquals("a", LongestPalindromicSubstring.bruteForce("abcde"));
        // The result is 'a' because single characters are palindromes, and "a" is the first single char.
        // Some implementations might return any single char, e.g., "e" if they iterate from end.
        // Our current implementation for brute force picks the first occurrence of length 1,
        // expandAroundCenter and DP pick the first of the longest.
        assertEquals("a", LongestPalindromicSubstring.expandAroundCenter("abcde"));
        assertEquals("a", LongestPalindromicSubstring.dynamicProgramming("abcde"));
    }

    @Test
    @DisplayName("Should handle complex cases with multiple palindromes of same max length")
    void testMultipleMaxPalindromes() {
        // "babad" -> "bab" or "aba". Our current impl picks "bab" because it starts earlier.
        // The problem usually allows any valid longest palindrome.
        String input = "babad";
        String expected = "bab";
        assertEquals(expected, LongestPalindromicSubstring.bruteForce(input));
        assertEquals(expected, LongestPalindromicSubstring.expandAroundCenter(input));
        assertEquals(expected, LongestPalindromicSubstring.dynamicProgramming(input));

        input = "tattarrattat"; // A famous long palindrome
        expected = "tattarrattat";
        assertEquals(expected, LongestPalindromicSubstring.bruteForce(input));
        assertEquals(expected, LongestPalindromicSubstring.expandAroundCenter(input));
        assertEquals(expected, LongestPalindromicSubstring.dynamicProgramming(input));
    }
}
```