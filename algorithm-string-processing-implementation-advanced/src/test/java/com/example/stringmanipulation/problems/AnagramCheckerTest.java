```java
package com.example.stringmanipulation.problems;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DisplayName("Anagram Checker")
class AnagramCheckerTest {

    private AnagramChecker checker;

    @BeforeEach
    void setUp() {
        checker = new AnagramChecker();
    }

    @Nested
    @DisplayName("Sorting Approach")
    class SortingApproachTests {

        @ParameterizedTest(name = "s=\"{0}\", t=\"{1}\" -> true")
        @CsvSource({
                "anagram, nagaram",
                "listen, silent",
                "A gentleman, Elegant man", // Case sensitive, spaces count, but current impl assumes lower English
                "abcd, dcba",
                "a, a",
                "'', ''", // Both empty strings are anagrams
                "race, care"
        })
        void testIsAnagramSorting_True(String s, String t) {
            assertTrue(checker.isAnagramSorting(s, t));
        }

        @ParameterizedTest(name = "s=\"{0}\", t=\"{1}\" -> false")
        @CsvSource({
                "rat, car",
                "hello, world",
                "apple, apply", // Different lengths
                "a, b",
                "aa, a", // Different lengths
                "null, a",
                "a, null",
                "null, null",
                "abc, abcd",
                "abc, xbc",
                "aaab, aaac" // Same length, different chars
        })
        void testIsAnagramSorting_False(String s, String t) {
            assertFalse(checker.isAnagramSorting(s, t));
        }
    }

    @Nested
    @DisplayName("Frequency Array Approach (for lowercase English letters)")
    class FrequencyArrayApproachTests {

        @ParameterizedTest(name = "s=\"{0}\", t=\"{1}\" -> true")
        @CsvSource({
                "anagram, nagaram",
                "listen, silent",
                "abcd, dcba",
                "a, a",
                "'', ''",
                "race, care"
        })
        void testIsAnagramFrequencyArray_True(String s, String t) {
            assertTrue(checker.isAnagramFrequencyArray(s, t));
        }

        @ParameterizedTest(name = "s=\"{0}\", t=\"{1}\" -> false")
        @CsvSource({
                "rat, car",
                "hello, world",
                "apple, apply",
                "a, b",
                "aa, a",
                "null, a",
                "a, null",
                "null, null",
                "abc, abcd",
                "abc, xbc",
                "aaab, aaac"
        })
        void testIsAnagramFrequencyArray_False(String s, String t) {
            assertFalse(checker.isAnagramFrequencyArray(s, t));
        }
    }

    @Nested
    @DisplayName("Frequency Map Approach (General)")
    class FrequencyMapApproachTests {

        @ParameterizedTest(name = "s=\"{0}\", t=\"{1}\" -> true")
        @CsvSource({
                "anagram, nagaram",
                "listen, silent",
                "abcd, dcba",
                "a, a",
                "'', ''",
                "race, care",
                "A gentleman, Elegant man", // Works with spaces and mixed case
                "hello world, world hello"
        })
        void testIsAnagramFrequencyMap_True(String s, String t) {
            assertTrue(checker.isAnagramFrequencyMap(s, t));
        }

        @ParameterizedTest(name = "s=\"{0}\", t=\"{1}\" -> false")
        @CsvSource({
                "rat, car",
                "hello, world",
                "apple, apply",
                "a, b",
                "aa, a",
                "null, a",
                "a, null",
                "null, null",
                "abc, abcd",
                "abc, xbc",
                "aaab, aaac",
                "A gentleman, notAnagram" // Mixed case/spaces - not anagram
        })
        void testIsAnagramFrequencyMap_False(String s, String t) {
            assertFalse(checker.isAnagramFrequencyMap(s, t));
        }
    }
}
```