```java
package com.example.stringmanipulation.problems;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@DisplayName("Longest Palindromic Substring")
class LongestPalindromicSubstringTest {

    private LongestPalindromicSubstring solver;

    @BeforeEach
    void setUp() {
        solver = new LongestPalindromicSubstring();
    }

    @Nested
    @DisplayName("Brute Force Approach")
    class BruteForceTests {

        @ParameterizedTest(name = "Input: \"{0}\" -> Expected: \"{1}\"")
        @CsvSource({
                "babad, bab",
                "cbbd, bb",
                "a, a",
                "ac, a",
                "racecar, racecar",
                "bananas, anana",
                "zzzaaaazzzz, zzzaaaazzzz"
        })
        void testBruteForce(String input, String expected) {
            // Note: For inputs like "babad", both "bab" and "aba" are valid.
            // Brute force might return one or the other based on iteration order.
            // We'll accept any valid longest palindrome.
            String result = solver.longestPalindromeBruteForce(input);
            assertTrue(isPalindrome(result) && result.length() == expected.length(),
                       "For '" + input + "', expected longest palindrome length " + expected.length() + ", got '" + result + "' with length " + result.length());
        }

        @Test
        void testBruteForce_EmptyString() {
            assertEquals("", solver.longestPalindromeBruteForce(""));
        }

        @Test
        void testBruteForce_NullString() {
            assertEquals("", solver.longestPalindromeBruteForce(null));
        }

        @Test
        void testBruteForce_SingleCharacter() {
            assertEquals("x", solver.longestPalindromeBruteForce("x"));
        }
        
        @Test
        void testBruteForce_MultipleLongestPalindromes() {
            // "babad" can return "bab" or "aba". Both are valid.
            String input = "babad";
            String result = solver.longestPalindromeBruteForce(input);
            Set<String> validResults = new HashSet<>(Arrays.asList("bab", "aba"));
            assertTrue(validResults.contains(result), "For 'babad', expected 'bab' or 'aba', but got '" + result + "'");
        }
    }

    @Nested
    @DisplayName("Expand Around Center Approach")
    class ExpandAroundCenterTests {

        @ParameterizedTest(name = "Input: \"{0}\" -> Expected: \"{1}\"")
        @CsvSource({
                "babad, bab", // Can be "bab" or "aba"
                "cbbd, bb",
                "a, a",
                "ac, a",
                "racecar, racecar",
                "bananas, anana",
                "zzzaaaazzzz, zzzaaaazzzz",
                "aaaa, aaaa",
                "abcba, abcba",
                "abccba, abccba",
                "abacaba, abacaba",
                "abcde, a", // No palindrome except single characters
                "pwwkew, ww", // Longest is "ww"
                "tattarrattat, tattarrattat" // Longest itself
        })
        void testExpandAroundCenter(String input, String expected) {
            String result = solver.longestPalindromeExpandAroundCenter(input);
            
            // For cases like "babad", both "bab" and "aba" are valid.
            // The expand around center typically finds "bab" or "aba" depending on tie-breaking.
            // For simplicity, we check if the result is a palindrome and has the expected length.
            assertTrue(isPalindrome(result) && result.length() == expected.length(),
                       "For '" + input + "', expected longest palindrome length " + expected.length() + ", got '" + result + "' with length " + result.length());
            
            // For specific cases with multiple valid answers, an explicit check can be made:
            if (input.equals("babad")) {
                Set<String> validResults = new HashSet<>(Arrays.asList("bab", "aba"));
                assertTrue(validResults.contains(result), "For 'babad', expected 'bab' or 'aba', but got '" + result + "'");
            } else {
                // For other cases, if the expected is unique, then direct equality:
                // Note: The CsvSource might imply a unique expected, but expandAroundCenter might pick another valid one.
                // It's safer to check palindrome and length, or list all valid options.
                if (result.length() == expected.length()) { // If length matches, and we know `expected` is a palindrome
                    // No further check needed if `isPalindrome` passes and length is max.
                } else {
                    assertEquals(expected, result, "Direct match for " + input);
                }
            }
        }

        @Test
        void testExpandAroundCenter_EmptyString() {
            assertEquals("", solver.longestPalindromeExpandAroundCenter(""));
        }

        @Test
        void testExpandAroundCenter_NullString() {
            assertEquals("", solver.longestPalindromeExpandAroundCenter(null));
        }

        @Test
        void testExpandAroundCenter_AllSameCharacters() {
            assertEquals("aaaaa", solver.longestPalindromeExpandAroundCenter("aaaaa"));
        }
    }

    @Nested
    @DisplayName("Dynamic Programming Approach")
    class DPTests {

        @ParameterizedTest(name = "Input: \"{0}\" -> Expected: \"{1}\"")
        @CsvSource({
                "babad, bab", // Can be "bab" or "aba"
                "cbbd, bb",
                "a, a",
                "ac, a",
                "racecar, racecar",
                "bananas, anana",
                "zzzaaaazzzz, zzzaaaazzzz",
                "aaaa, aaaa",
                "abcba, abcba",
                "abccba, abccba",
                "abacaba, abacaba",
                "abcde, a",
                "pwwkew, ww",
                "tattarrattat, tattarrattat"
        })
        void testDP(String input, String expected) {
            String result = solver.longestPalindromeDP(input);
            assertTrue(isPalindrome(result) && result.length() == expected.length(),
                       "For '" + input + "', expected longest palindrome length " + expected.length() + ", got '" + result + "' with length " + result.length());

            if (input.equals("babad")) {
                Set<String> validResults = new HashSet<>(Arrays.asList("bab", "aba"));
                assertTrue(validResults.contains(result), "For 'babad', expected 'bab' or 'aba', but got '" + result + "'");
            } else {
                if (result.length() == expected.length()) {
                    // Similar logic as Expand Around Center for multiple valid longest palindromes.
                } else {
                    assertEquals(expected, result, "Direct match for " + input);
                }
            }
        }

        @Test
        void testDP_EmptyString() {
            assertEquals("", solver.longestPalindromeDP(""));
        }

        @Test
        void testDP_NullString() {
            assertEquals("", solver.longestPalindromeDP(null));
        }

        @Test
        void testDP_AllSameCharacters() {
            assertEquals("aaaaa", solver.longestPalindromeDP("aaaaa"));
        }
    }

    // Helper method to check if a string is a palindrome
    private boolean isPalindrome(String s) {
        if (s == null || s.isEmpty()) {
            return true;
        }
        int left = 0;
        int right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```