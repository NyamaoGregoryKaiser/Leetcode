```java
package com.stringmanipulation.tests;

import com.stringmanipulation.algorithms.StringAlgorithms;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit 5 test class for StringAlgorithms.
 * Contains nested classes for each problem, ensuring comprehensive test coverage
 * including base cases, edge cases, and typical scenarios.
 */
@DisplayName("StringAlgorithms Tests")
class StringAlgorithmsTest {

    @Nested
    @DisplayName("Longest Palindromic Substring")
    class LongestPalindromicSubstringTest {

        @Test
        @DisplayName("Brute Force: Basic cases")
        void testLongestPalindromeBruteForce_basic() {
            assertEquals("bab", StringAlgorithms.longestPalindromeBruteForce("babad"));
            assertEquals("bb", StringAlgorithms.longestPalindromeBruteForce("cbbd"));
            assertEquals("a", StringAlgorithms.longestPalindromeBruteForce("a"));
            assertEquals("racecar", StringAlgorithms.longestPalindromeBruteForce("racecar"));
            assertEquals("forgeeksskeegfor", StringAlgorithms.longestPalindromeBruteForce("forgeeksskeegfor"));
            assertEquals("madam", StringAlgorithms.longestPalindromeBruteForce("madam"));
        }

        @Test
        @DisplayName("Brute Force: Edge cases")
        void testLongestPalindromeBruteForce_edgeCases() {
            assertEquals("", StringAlgorithms.longestPalindromeBruteForce(""));
            assertEquals("a", StringAlgorithms.longestPalindromeBruteForce("abcdefg"));
            assertEquals("aa", StringAlgorithms.longestPalindromeBruteForce("aa"));
            assertEquals("aaa", StringAlgorithms.longestPalindromeBruteForce("aaa"));
            assertEquals("a", StringAlgorithms.longestPalindromeBruteForce("abcde"));
            assertEquals("zz", StringAlgorithms.longestPalindromeBruteForce("xyzzyx")); // Test middle palindrome
            assertEquals("z", StringAlgorithms.longestPalindromeBruteForce("abcxyz")); // No palindrome except single char
            assertEquals("abcba", StringAlgorithms.longestPalindromeBruteForce("abccbafg")); // Palindrome at start
            assertEquals("abccba", StringAlgorithms.longestPalindromeBruteForce("fgabccba")); // Palindrome at end
        }

        @Test
        @DisplayName("Expand Around Center: Basic cases")
        void testLongestPalindromeExpandAroundCenter_basic() {
            // Note: "babad" can return "bab" or "aba". Both are valid.
            // My implementation returns "bab" because it starts from 'b' at index 0 and 'a' at index 1.
            // A more robust test would check if the result IS a palindrome and HAS the max length.
            String s1 = "babad";
            String result1 = StringAlgorithms.longestPalindromeExpandAroundCenter(s1);
            assertTrue(isPalindrome(result1));
            assertTrue(result1.length() >= 3); // "bab" or "aba"

            assertEquals("bb", StringAlgorithms.longestPalindromeExpandAroundCenter("cbbd"));
            assertEquals("a", StringAlgorithms.longestPalindromeExpandAroundCenter("a"));
            assertEquals("racecar", StringAlgorithms.longestPalindromeExpandAroundCenter("racecar"));
            assertEquals("forgeeksskeegfor", StringAlgorithms.longestPalindromeExpandAroundCenter("forgeeksskeegfor"));
            assertEquals("madam", StringAlgorithms.longestPalindromeExpandAroundCenter("madam"));
        }

        @Test
        @DisplayName("Expand Around Center: Edge cases")
        void testLongestPalindromeExpandAroundCenter_edgeCases() {
            assertEquals("", StringAlgorithms.longestPalindromeExpandAroundCenter(""));
            assertEquals("a", StringAlgorithms.longestPalindromeExpandAroundCenter("abcdefg")); // Longest single char
            assertEquals("aa", StringAlgorithms.longestPalindromeExpandAroundCenter("aa"));
            assertEquals("aaa", StringAlgorithms.longestPalindromeExpandAroundCenter("aaa"));
            assertEquals("a", StringAlgorithms.longestPalindromeExpandAroundCenter("abcde")); // All single chars
            assertEquals("zzyyzz", StringAlgorithms.longestPalindromeExpandAroundCenter("xyzzyyzz")); // Test middle palindrome
            assertEquals("a", StringAlgorithms.longestPalindromeExpandAroundCenter("abcxyz")); // No palindrome except single char
            assertEquals("abccba", StringAlgorithms.longestPalindromeExpandAroundCenter("abccbafg")); // Palindrome at start
            assertEquals("abccba", StringAlgorithms.longestPalindromeExpandAroundCenter("fgabccba")); // Palindrome at end
            assertEquals("tattarrattat", StringAlgorithms.longestPalindromeExpandAroundCenter("tattarrattat")); // Very long palindrome
            assertEquals("aaaaa", StringAlgorithms.longestPalindromeExpandAroundCenter("aaaaa")); // All same characters
        }

        // Helper for testLongestPalindromeExpandAroundCenter_basic to verify result if multiple valid answers
        private boolean isPalindrome(String str) {
            int left = 0;
            int right = str.length() - 1;
            while (left < right) {
                if (str.charAt(left) != str.charAt(right)) {
                    return false;
                }
                left++;
                right--;
            }
            return true;
        }
    }

    @Nested
    @DisplayName("Group Anagrams")
    class GroupAnagramsTest {

        // Helper to compare maps of lists, ignoring order of lists and elements within lists
        private void assertAnagramGroupsEquals(Map<String, List<String>> expected, Map<String, List<String>> actual) {
            assertEquals(expected.size(), actual.size(), "Number of groups should be equal");

            for (Map.Entry<String, List<String>> entry : expected.entrySet()) {
                String key = entry.getKey(); // Key is canonical form (e.g., "#1#0#0...")
                List<String> expectedList = entry.getValue();
                assertTrue(actual.containsKey(key), "Actual map should contain key: " + key);

                List<String> actualList = actual.get(key);
                assertNotNull(actualList, "Actual list for key " + key + " should not be null");
                assertEquals(expectedList.size(), actualList.size(), "List size for key " + key + " should be equal");

                // Sort both lists to ignore order for comparison
                List<String> sortedExpected = expectedList.stream().sorted().collect(Collectors.toList());
                List<String> sortedActual = actualList.stream().sorted().collect(Collectors.toList());
                assertEquals(sortedExpected, sortedActual, "Lists for key " + key + " should contain same elements");
            }
        }

        // Helper to build canonical key for character count method
        private String buildCharCountKey(String s) {
            int[] charCounts = new int[26];
            for (char c : s.toCharArray()) {
                charCounts[c - 'a']++;
            }
            StringBuilder keyBuilder = new StringBuilder();
            for (int count : charCounts) {
                keyBuilder.append("#").append(count);
            }
            return keyBuilder.toString();
        }


        @Test
        @DisplayName("Char Count: Basic cases")
        void testGroupAnagramsCharCount_basic() {
            String[] strs1 = {"eat", "tea", "tan", "ate", "nat", "bat"};
            Map<String, List<String>> expected1 = new HashMap<>();
            expected1.put(buildCharCountKey("bat"), Arrays.asList("bat"));
            expected1.put(buildCharCountKey("nat"), Arrays.asList("nat", "tan"));
            expected1.put(buildCharCountKey("eat"), Arrays.asList("eat", "tea", "ate"));
            assertAnagramGroupsEquals(expected1, StringAlgorithms.groupAnagrams(strs1));

            String[] strs2 = {"a"};
            Map<String, List<String>> expected2 = new HashMap<>();
            expected2.put(buildCharCountKey("a"), Collections.singletonList("a"));
            assertAnagramGroupsEquals(expected2, StringAlgorithms.groupAnagrams(strs2));

            String[] strs3 = {"hello", "olleh", "world"};
            Map<String, List<String>> expected3 = new HashMap<>();
            expected3.put(buildCharCountKey("hello"), Arrays.asList("hello", "olleh"));
            expected3.put(buildCharCountKey("world"), Collections.singletonList("world"));
            assertAnagramGroupsEquals(expected3, StringAlgorithms.groupAnagrams(strs3));
        }

        @Test
        @DisplayName("Char Count: Edge cases")
        void testGroupAnagramsCharCount_edgeCases() {
            String[] strs1 = {};
            assertTrue(StringAlgorithms.groupAnagrams(strs1).isEmpty());

            String[] strs2 = {"", ""};
            Map<String, List<String>> expected2 = new HashMap<>();
            expected2.put(buildCharCountKey(""), Arrays.asList("", ""));
            assertAnagramGroupsEquals(expected2, StringAlgorithms.groupAnagrams(strs2));

            String[] strs3 = {"abc", "bca", "acb", "def", "fed"};
            Map<String, List<String>> expected3 = new HashMap<>();
            expected3.put(buildCharCountKey("abc"), Arrays.asList("abc", "bca", "acb"));
            expected3.put(buildCharCountKey("def"), Arrays.asList("def", "fed"));
            assertAnagramGroupsEquals(expected3, StringAlgorithms.groupAnagrams(strs3));

            String[] strs4 = {"ab", "ba", "abc", "bca"};
            Map<String, List<String>> expected4 = new HashMap<>();
            expected4.put(buildCharCountKey("ab"), Arrays.asList("ab", "ba"));
            expected4.put(buildCharCountKey("abc"), Arrays.asList("abc", "bca"));
            assertAnagramGroupsEquals(expected4, StringAlgorithms.groupAnagrams(strs4));

            String[] strs5 = {"test", "sett", "stet", "tset"};
            Map<String, List<String>> expected5 = new HashMap<>();
            expected5.put(buildCharCountKey("test"), Arrays.asList("test", "sett", "stet", "tset"));
            assertAnagramGroupsEquals(expected5, StringAlgorithms.groupAnagrams(strs5));
        }

        // Helper to build canonical key for sorting method
        private String buildSortedKey(String s) {
            char[] charArray = s.toCharArray();
            Arrays.sort(charArray);
            return new String(charArray);
        }

        @Test
        @DisplayName("Sorting: Basic cases")
        void testGroupAnagramsSorting_basic() {
            String[] strs1 = {"eat", "tea", "tan", "ate", "nat", "bat"};
            Map<String, List<String>> expected1 = new HashMap<>();
            expected1.put(buildSortedKey("bat"), Arrays.asList("bat"));
            expected1.put(buildSortedKey("nat"), Arrays.asList("nat", "tan"));
            expected1.put(buildSortedKey("eat"), Arrays.asList("eat", "tea", "ate"));
            assertAnagramGroupsEquals(expected1, StringAlgorithms.groupAnagramsSorting(strs1));
        }

        @Test
        @DisplayName("Sorting: Edge cases")
        void testGroupAnagramsSorting_edgeCases() {
            String[] strs1 = {};
            assertTrue(StringAlgorithms.groupAnagramsSorting(strs1).isEmpty());

            String[] strs2 = {"", ""};
            Map<String, List<String>> expected2 = new HashMap<>();
            expected2.put(buildSortedKey(""), Arrays.asList("", ""));
            assertAnagramGroupsEquals(expected2, StringAlgorithms.groupAnagramsSorting(strs2));
        }
    }

    @Nested
    @DisplayName("Minimum Window Substring")
    class MinWindowSubstringTest {

        @Test
        @DisplayName("Basic cases")
        void testMinWindowSubstring_basic() {
            assertEquals("BANC", StringAlgorithms.minWindowSubstring("ADOBECODEBANC", "ABC"));
            assertEquals("a", StringAlgorithms.minWindowSubstring("a", "a"));
            assertEquals("b", StringAlgorithms.minWindowSubstring("ab", "b"));
            assertEquals("abc", StringAlgorithms.minWindowSubstring("abcde", "abc"));
        }

        @Test
        @DisplayName("Edge cases and complex scenarios")
        void testMinWindowSubstring_edgeCases() {
            assertEquals("", StringAlgorithms.minWindowSubstring("a", "aa")); // Not enough chars in S
            assertEquals("A", StringAlgorithms.minWindowSubstring("A", "A"));
            assertEquals("", StringAlgorithms.minWindowSubstring("ADOBECODEBANC", "XYZ")); // No match
            assertEquals("aa", StringAlgorithms.minWindowSubstring("aa", "aa"));
            assertEquals("CBA", StringAlgorithms.minWindowSubstring("CBA", "ABC")); // Full string is the window
            assertEquals("cwae", StringAlgorithms.minWindowSubstring("cabwefgewcwaefgcf", "cae")); // Multiple possible windows
            assertEquals("ba", StringAlgorithms.minWindowSubstring("bbaa", "aba")); // Duplicates in t
            assertEquals("a", StringAlgorithms.minWindowSubstring("a", "b")); // t not in s
            assertEquals("aa", StringAlgorithms.minWindowSubstring("aab", "ab")); // aab, t=ab, ans=ab.  If aab t=aa ans=aa
            assertEquals("ab", StringAlgorithms.minWindowSubstring("aab", "ab"));
            assertEquals("aa", StringAlgorithms.minWindowSubstring("aab", "aa"));
            assertEquals("", StringAlgorithms.minWindowSubstring("", "abc")); // Empty S
            assertEquals("", StringAlgorithms.minWindowSubstring("abc", "")); // Empty T (problem states non-empty T usually)
            assertEquals("bca", StringAlgorithms.minWindowSubstring("abcb", "abc"));
            assertEquals("ac", StringAlgorithms.minWindowSubstring("acbbaca", "aba"));
        }
    }

    @Nested
    @DisplayName("String to Integer (atoi)")
    class StringToIntegerAtoiTest {

        @Test
        @DisplayName("Basic cases")
        void testStringToIntegerAtoi_basic() {
            assertEquals(42, StringAlgorithms.stringToIntegerAtoi("42"));
            assertEquals(-42, StringAlgorithms.stringToIntegerAtoi("   -42"));
            assertEquals(4193, StringAlgorithms.stringToIntegerAtoi("4193 with words"));
            assertEquals(1, StringAlgorithms.stringToIntegerAtoi("+1"));
            assertEquals(0, StringAlgorithms.stringToIntegerAtoi("words and 987"));
        }

        @Test
        @DisplayName("Overflow/Underflow cases")
        void testStringToIntegerAtoi_overflow() {
            assertEquals(Integer.MAX_VALUE, StringAlgorithms.stringToIntegerAtoi("91283472332")); // Exceeds MAX
            assertEquals(Integer.MIN_VALUE, StringAlgorithms.stringToIntegerAtoi("-91283472332")); // Exceeds MIN
            assertEquals(Integer.MAX_VALUE, StringAlgorithms.stringToIntegerAtoi("2147483647")); // MAX
            assertEquals(Integer.MIN_VALUE, StringAlgorithms.stringToIntegerAtoi("-2147483648")); // MIN
            assertEquals(Integer.MAX_VALUE, StringAlgorithms.stringToIntegerAtoi("2147483648")); // MAX + 1
            assertEquals(Integer.MIN_VALUE, StringAlgorithms.stringToIntegerAtoi("-2147483649")); // MIN - 1
        }

        @Test
        @DisplayName("Edge cases and unusual inputs")
        void testStringToIntegerAtoi_edgeCases() {
            assertEquals(0, StringAlgorithms.stringToIntegerAtoi("")); // Empty string
            assertEquals(0, StringAlgorithms.stringToIntegerAtoi(" ")); // Whitespace only
            assertEquals(0, StringAlgorithms.stringToIntegerAtoi("-")); // Only sign
            assertEquals(0, StringAlgorithms.stringToIntegerAtoi("+")); // Only sign
            assertEquals(0, StringAlgorithms.stringToIntegerAtoi("+-12")); // Invalid sign sequence
            assertEquals(0, StringAlgorithms.stringToIntegerAtoi("  +  413")); // Whitespace between sign and digit
            assertEquals(0, StringAlgorithms.stringToIntegerAtoi("0")); // Zero
            assertEquals(0, StringAlgorithms.stringToIntegerAtoi("-0")); // Negative zero
            assertEquals(0, StringAlgorithms.stringToIntegerAtoi("   +0 123")); // Zero with leading sign and whitespace
            assertEquals(123, StringAlgorithms.stringToIntegerAtoi("0000000000000000000000000000123")); // Leading zeros
            assertEquals(1, StringAlgorithms.stringToIntegerAtoi(" .1")); // Stop at non-digit
            assertEquals(0, StringAlgorithms.stringToIntegerAtoi("++1")); // Another invalid sign sequence
        }
    }
}
```