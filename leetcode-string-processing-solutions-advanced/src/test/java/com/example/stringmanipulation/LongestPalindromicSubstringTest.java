```java
package com.example.stringmanipulation;

import com.example.stringmanipulation.problems.LongestPalindromicSubstring;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class LongestPalindromicSubstringTest {

    private LongestPalindromicSubstring lps;

    @BeforeEach
    void setUp() {
        lps = new LongestPalindromicSubstring();
    }

    // Helper to check if a string is a palindrome
    private boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    // Since multiple valid answers can exist for LPS, we need to check if the result
    // is one of the longest palindromic substrings.
    // For "babad", both "bab" and "aba" are valid.
    // This helper determines if the result is valid by comparing length and checking palindrome property.
    private void assertIsLongestPalindrome(String input, String expectedOrPossible, String actual) {
        assertTrue(isPalindrome(actual), "Result must be a palindrome.");
        int actualLength = actual.length();
        int expectedLength = expectedOrPossible.length(); // Use one of the expected as a reference length
        // To truly check, one would generate all palindromic substrings and find max length.
        // For simplicity, we assume the provided expected strings are indeed longest.
        // And we ensure the actual result is a palindrome and has length at least as long as `expectedOrPossible`.
        // If there are multiple longest palindromes of the same max length, this test might need adjustment.
        // For typical LeetCode problems, any valid longest palindrome is accepted.
        assertTrue(actualLength >= expectedLength, "Actual palindrome must be at least as long as expected. " +
                "Expected length: " + expectedLength + ", Actual length: " + actualLength);
        if (actualLength > expectedLength) {
             // This indicates the expected value might not have been truly the longest, or
             // our test logic for expectedLength needs more sophistication for multi-longest.
             // For now, it's a pass if actual is a palindrome and longer or equal length.
            System.out.println("Warning: Actual palindrome (" + actual + ") is longer than or equal to expected reference (" + expectedOrPossible + ")");
        }
    }

    // Test cases for longestPalindromeExpandAroundCenter
    @Test
    void testExpandAroundCenter_Example1() {
        String s = "babad";
        String result = lps.longestPalindromeExpandAroundCenter(s);
        Set<String> possibleResults = new HashSet<>(Arrays.asList("bab", "aba"));
        assertTrue(possibleResults.contains(result), "For 'babad', expected 'bab' or 'aba'");
        assertIsLongestPalindrome(s, "bab", result); // Checks length and palindrome property
    }

    @Test
    void testExpandAroundCenter_Example2() {
        String s = "cbbd";
        assertEquals("bb", lps.longestPalindromeExpandAroundCenter(s));
        assertIsLongestPalindrome(s, "bb", lps.longestPalindromeExpandAroundCenter(s));
    }

    @Test
    void testExpandAroundCenter_SingleCharacter() {
        String s = "a";
        assertEquals("a", lps.longestPalindromeExpandAroundCenter(s));
        assertIsLongestPalindrome(s, "a", lps.longestPalindromeExpandAroundCenter(s));
    }

    @Test
    void testExpandAroundCenter_EmptyString() {
        String s = "";
        assertEquals("", lps.longestPalindromeExpandAroundCenter(s));
    }

    @Test
    void testExpandAroundCenter_NullString() {
        String s = null;
        assertEquals("", lps.longestPalindromeExpandAroundCenter(s));
    }

    @Test
    void testExpandAroundCenter_AllSameCharacters() {
        String s = "aaaaa";
        assertEquals("aaaaa", lps.longestPalindromeExpandAroundCenter(s));
        assertIsLongestPalindrome(s, "aaaaa", lps.longestPalindromeExpandAroundCenter(s));
    }

    @Test
    void testExpandAroundCenter_NoPalindromeLongerThanOneChar() {
        String s = "abcde";
        Set<String> possibleResults = new HashSet<>(Arrays.asList("a", "b", "c", "d", "e"));
        assertTrue(possibleResults.contains(lps.longestPalindromeExpandAroundCenter(s)));
        assertIsLongestPalindrome(s, "a", lps.longestPalindromeExpandAroundCenter(s));
    }

    @Test
    void testExpandAroundCenter_EvenLengthPalindrome() {
        String s = "abccba";
        assertEquals("abccba", lps.longestPalindromeExpandAroundCenter(s));
        assertIsLongestPalindrome(s, "abccba", lps.longestPalindromeExpandAroundCenter(s));
    }

    @Test
    void testExpandAroundCenter_OddLengthPalindrome() {
        String s = "racecar";
        assertEquals("racecar", lps.longestPalindromeExpandAroundCenter(s));
        assertIsLongestPalindrome(s, "racecar", lps.longestPalindromeExpandAroundCenter(s));
    }

    @Test
    void testExpandAroundCenter_MixedPalindromes() {
        String s = "bananas";
        assertEquals("anana", lps.longestPalindromeExpandAroundCenter(s));
        assertIsLongestPalindrome(s, "anana", lps.longestPalindromeExpandAroundCenter(s));
    }

    @Test
    void testExpandAroundCenter_AnotherMixed() {
        String s = "forgeeksskeegfor";
        assertEquals("geeksskeeg", lps.longestPalindromeExpandAroundCenter(s));
        assertIsLongestPalindrome(s, "geeksskeeg", lps.longestPalindromeExpandAroundCenter(s));
    }

    // Test cases for longestPalindromeDP
    @Test
    void testDP_Example1() {
        String s = "babad";
        String result = lps.longestPalindromeDP(s);
        Set<String> possibleResults = new HashSet<>(Arrays.asList("bab", "aba"));
        assertTrue(possibleResults.contains(result), "For 'babad', expected 'bab' or 'aba'");
        assertIsLongestPalindrome(s, "bab", result);
    }

    @Test
    void testDP_Example2() {
        String s = "cbbd";
        assertEquals("bb", lps.longestPalindromeDP(s));
        assertIsLongestPalindrome(s, "bb", lps.longestPalindromeDP(s));
    }

    @Test
    void testDP_SingleCharacter() {
        String s = "a";
        assertEquals("a", lps.longestPalindromeDP(s));
        assertIsLongestPalindrome(s, "a", lps.longestPalindromeDP(s));
    }

    @Test
    void testDP_EmptyString() {
        String s = "";
        assertEquals("", lps.longestPalindromeDP(s));
    }

    @Test
    void testDP_NullString() {
        String s = null;
        assertEquals("", lps.longestPalindromeDP(s));
    }

    @Test
    void testDP_AllSameCharacters() {
        String s = "aaaaa";
        assertEquals("aaaaa", lps.longestPalindromeDP(s));
        assertIsLongestPalindrome(s, "aaaaa", lps.longestPalindromeDP(s));
    }

    @Test
    void testDP_NoPalindromeLongerThanOneChar() {
        String s = "abcde";
        Set<String> possibleResults = new HashSet<>(Arrays.asList("a", "b", "c", "d", "e"));
        assertTrue(possibleResults.contains(lps.longestPalindromeDP(s)));
        assertIsLongestPalindrome(s, "a", lps.longestPalindromeDP(s));
    }

    @Test
    void testDP_EvenLengthPalindrome() {
        String s = "abccba";
        assertEquals("abccba", lps.longestPalindromeDP(s));
        assertIsLongestPalindrome(s, "abccba", lps.longestPalindromeDP(s));
    }

    @Test
    void testDP_OddLengthPalindrome() {
        String s = "racecar";
        assertEquals("racecar", lps.longestPalindromeDP(s));
        assertIsLongestPalindrome(s, "racecar", lps.longestPalindromeDP(s));
    }

    @Test
    void testDP_MixedPalindromes() {
        String s = "bananas";
        assertEquals("anana", lps.longestPalindromeDP(s));
        assertIsLongestPalindrome(s, "anana", lps.longestPalindromeDP(s));
    }

    @Test
    void testDP_AnotherMixed() {
        String s = "forgeeksskeegfor";
        assertEquals("geeksskeeg", lps.longestPalindromeDP(s));
        assertIsLongestPalindrome(s, "geeksskeeg", lps.longestPalindromeDP(s));
    }
}
```