```java
package com.example.stringmanipulation.problems;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for AnagramChecker.
 * Tests different approaches for checking if two strings are anagrams.
 */
class AnagramCheckerTest {

    // --- Tests for isAnagramSorting ---

    @ParameterizedTest(name = "Sorting: \"{0}\" and \"{1}\" should be anagrams: {2}")
    @CsvSource({
            "anagram, nagaram, true",
            "rat, car, false",
            "listen, silent, true",
            "hello, olleh, true",
            "a, a, true",
            "ab, ba, true",
            "abc, acb, true",
            "aabc, abac, true",
            "topcoder, codertop, true",
            "abc, ab, false", // Different lengths
            "ab, abc, false", // Different lengths
            "'', '', true",  // Empty strings are anagrams of each other
            "a, b, false"
    })
    @DisplayName("isAnagramSorting should correctly identify anagrams and non-anagrams")
    void testIsAnagramSorting(String s, String t, boolean expected) {
        assertEquals(expected, AnagramChecker.isAnagramSorting(s, t));
    }

    @Test
    @DisplayName("isAnagramSorting should handle null strings gracefully")
    void testIsAnagramSorting_NullStrings() {
        assertFalse(AnagramChecker.isAnagramSorting(null, "abc"));
        assertFalse(AnagramChecker.isAnagramSorting("abc", null));
        assertFalse(AnagramChecker.isAnagramSorting(null, null)); // Would be false due to length check
    }

    @Test
    @DisplayName("isAnagramSorting should handle different lengths correctly")
    void testIsAnagramSorting_DifferentLengths() {
        assertFalse(AnagramChecker.isAnagramSorting("ab", "a"));
        assertFalse(AnagramChecker.isAnagramSorting("a", "ab"));
    }

    // --- Tests for isAnagramFrequencyArray ---

    @ParameterizedTest(name = "FrequencyArray: \"{0}\" and \"{1}\" should be anagrams: {2}")
    @CsvSource({
            "anagram, nagaram, true",
            "rat, car, false",
            "listen, silent, true",
            "hello, olleh, true",
            "a, a, true",
            "ab, ba, true",
            "abc, acb, true",
            "aabc, abac, true",
            "topcoder, codertop, true",
            "abc, ab, false", // Different lengths
            "ab, abc, false", // Different lengths
            "'', '', true",  // Empty strings are anagrams of each other
            "a, b, false",
            "zzza, zaaz, true",
            "zzy, zyz, true",
            "aaz, baz, false" // Should catch character mismatch early
    })
    @DisplayName("isAnagramFrequencyArray should correctly identify anagrams and non-anagrams")
    void testIsAnagramFrequencyArray(String s, String t, boolean expected) {
        assertEquals(expected, AnagramChecker.isAnagramFrequencyArray(s, t));
    }

    @Test
    @DisplayName("isAnagramFrequencyArray should handle null strings gracefully")
    void testIsAnagramFrequencyArray_NullStrings() {
        assertFalse(AnagramChecker.isAnagramFrequencyArray(null, "abc"));
        assertFalse(AnagramChecker.isAnagramFrequencyArray("abc", null));
        assertFalse(AnagramChecker.isAnagramFrequencyArray(null, null));
    }

    @Test
    @DisplayName("isAnagramFrequencyArray should handle different lengths correctly")
    void testIsAnagramFrequencyArray_DifferentLengths() {
        assertFalse(AnagramChecker.isAnagramFrequencyArray("ab", "a"));
        assertFalse(AnagramChecker.isAnagramFrequencyArray("a", "ab"));
    }

    // --- Tests for isAnagramHashMap ---

    @ParameterizedTest(name = "HashMap: \"{0}\" and \"{1}\" should be anagrams: {2}")
    @CsvSource({
            "anagram, nagaram, true",
            "rat, car, false",
            "listen, silent, true",
            "hello, olleh, true",
            "a, a, true",
            "ab, ba, true",
            "abc, acb, true",
            "aabc, abac, true",
            "topcoder, codertop, true",
            "abc, ab, false", // Different lengths
            "ab, abc, false", // Different lengths
            "'', '', true",  // Empty strings are anagrams of each other
            "a, b, false",
            "zzza, zaaz, true",
            "zzy, zyz, true",
            "aaz, baz, false", // Should catch character mismatch early
            "Anagram, Nagaram, false", // Case sensitivity, unless specified otherwise
            "aa bb, abab, true", // With spaces, as HashMap can handle any char
            "restful, fluster, true",
            "debit card, bad credit, true" // Anagram with spaces
    })
    @DisplayName("isAnagramHashMap should correctly identify anagrams and non-anagrams, including case and spaces")
    void testIsAnagramHashMap(String s, String t, boolean expected) {
        assertEquals(expected, AnagramChecker.isAnagramHashMap(s, t));
    }

    @Test
    @DisplayName("isAnagramHashMap should handle null strings gracefully")
    void testIsAnagramHashMap_NullStrings() {
        assertFalse(AnagramChecker.isAnagramHashMap(null, "abc"));
        assertFalse(AnagramChecker.isAnagramHashMap("abc", null));
        assertFalse(AnagramChecker.isAnagramHashMap(null, null));
    }

    @Test
    @DisplayName("isAnagramHashMap should handle different lengths correctly")
    void testIsAnagramHashMap_DifferentLengths() {
        assertFalse(AnagramChecker.isAnagramHashMap("ab", "a"));
        assertFalse(AnagramChecker.isAnagramHashMap("a", "ab"));
    }
}
```