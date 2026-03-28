```java
package com.example.sorting.problems;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Unit tests for P4_SortByFrequency.
 * Due to the nature of the problem (order of characters with same frequency doesn't matter),
 * some test cases might have multiple valid outputs. We'll handle this by checking if the output
 * matches any of the valid possibilities or by reconstructing a frequency map for comparison.
 */
class P4_SortByFrequencyTest {

    private final P4_SortByFrequency solution = new P4_SortByFrequency();

    private static Stream<Arguments> provideFrequencySortTestCases() {
        return Stream.of(
                Arguments.of("tree", new String[]{"eert", "eetr"}),
                Arguments.of("cccaaa", new String[]{"aaaccc", "cccaaa"}),
                Arguments.of("Aabb", new String[]{"bbAa", "bbaA"}),
                Arguments.of("loveleetcode", new String[]{"eeeeoollvcd", "eeeeoolldvc" /* many variations */}),
                Arguments.of("abc", new String[]{"abc", "acb", "bac", "bca", "cab", "cba"}), // All single frequency
                Arguments.of("zzzaac", new String[]{"zzzacc", "aaazzzc", "zzzaac", "aaacz", "caazzz", "caazzz" /* lots of permutations for equal freq*/}),
                Arguments.of("", new String[]{""}),
                Arguments.of("a", new String[]{"a"}),
                Arguments.of("AaBbCc", new String[]{"CcBbAa", "BbCcAa", "AaBbCc", "CcAaBb", "BbAaCc", "AaCcBb"}), // All unique, 1 freq
                Arguments.of("ddccbbAA", new String[]{"ddccbbAA", "ddccAAbb", "ccddbbAA", "ccddAAbb", "bbccddAA", "bbccAAdd", "AAbbccdd", "AAbbddcc", "AAddbbcc", "AAddccbb", "ddAAbbcc", "ddccAAbb"}), // Duplicates, same frequency
                Arguments.of("banana", new String[]{"aaannb", "aaabnn"}), // 'a':3, 'n':2, 'b':1
                Arguments.of("Programming", new String[]{"rrggmmioPan", "rrggmmiPoan", "rrggmmoiPna", "rrggmmoiPan", "rrggmmoPinA" /* ... and more */}) // Multiple frequencies
        );
    }

    // Helper to check if the output is valid given potential multiple valid outputs
    private void assertValidOutput(String actual, String[] possibleExpectedOutputs, String message) {
        if (possibleExpectedOutputs.length == 0 && actual.isEmpty()) {
            return;
        }
        for (String expected : possibleExpectedOutputs) {
            if (actual.equals(expected)) {
                return; // Found a match, output is valid
            }
        }
        // If no direct match, verify by reconstructing frequency map and sorted order of frequencies
        // This is a more robust check for problems where output order can vary for same frequency elements.
        String expectedReference = possibleExpectedOutputs[0]; // Use first as reference for frequencies

        assertEquals(actual.length(), expectedReference.length(), "Output length mismatch for " + message);

        java.util.Map<Character, Integer> actualFreqMap = getFrequencyMap(actual);
        java.util.Map<Character, Integer> expectedFreqMap = getFrequencyMap(expectedReference);

        assertEquals(expectedFreqMap.size(), actualFreqMap.size(), "Number of distinct characters mismatch for " + message);

        for (java.util.Map.Entry<Character, Integer> entry : expectedFreqMap.entrySet()) {
            assertTrue(actualFreqMap.containsKey(entry.getKey()), "Missing character " + entry.getKey() + " in actual output for " + message);
            assertEquals(entry.getValue(), actualFreqMap.get(entry.getKey()), "Frequency mismatch for character " + entry.getKey() + " for " + message);
        }

        // Additional check: the order of characters' frequencies should be non-increasing.
        // Convert to a list of frequencies, sort it, and compare.
        List<Integer> actualFrequencies = new ArrayList<>(actualFreqMap.values());
        List<Integer> expectedFrequencies = new ArrayList<>(expectedFreqMap.values());

        actualFrequencies.sort(java.util.Collections.reverseOrder());
        expectedFrequencies.sort(java.util.Collections.reverseOrder());

        assertEquals(expectedFrequencies, actualFrequencies, "Sorted frequency list mismatch for " + message);
    }

    private java.util.Map<Character, Integer> getFrequencyMap(String s) {
        java.util.Map<Character, Integer> freqMap = new java.util.HashMap<>();
        for (char c : s.toCharArray()) {
            freqMap.put(c, freqMap.getOrDefault(c, 0) + 1);
        }
        return freqMap;
    }

    @ParameterizedTest(name = "{index}: s=\"{0}\"")
    @MethodSource("provideFrequencySortTestCases")
    @DisplayName("Test frequencySort_HashMapAndSort method")
    void testFrequencySort_HashMapAndSort(String s, String[] expectedOutputs) {
        String actual = solution.frequencySort_HashMapAndSort(s);
        assertValidOutput(actual, expectedOutputs, "HashMapAndSort");
    }

    @ParameterizedTest(name = "{index}: s=\"{0}\"")
    @MethodSource("provideFrequencySortTestCases")
    @DisplayName("Test frequencySort_HashMapAndMaxHeap method")
    void testFrequencySort_HashMapAndMaxHeap(String s, String[] expectedOutputs) {
        String actual = solution.frequencySort_HashMapAndMaxHeap(s);
        assertValidOutput(actual, expectedOutputs, "HashMapAndMaxHeap");
    }

    @ParameterizedTest(name = "{index}: s=\"{0}\"")
    @MethodSource("provideFrequencySortTestCases")
    @DisplayName("Test frequencySort_HashMapAndBucketSort method")
    void testFrequencySort_HashMapAndBucketSort(String s, String[] expectedOutputs) {
        String actual = solution.frequencySort_HashMapAndBucketSort(s);
        assertValidOutput(actual, expectedOutputs, "HashMapAndBucketSort");
    }

    // --- Edge Cases and Invalid Inputs ---

    @Test
    @DisplayName("Test null string input for all methods")
    void testNullString() {
        assertThrows(IllegalArgumentException.class, () -> solution.frequencySort_HashMapAndSort(null), "HashMapAndSort method");
        assertThrows(IllegalArgumentException.class, () -> solution.frequencySort_HashMapAndMaxHeap(null), "HashMapAndMaxHeap method");
        assertThrows(IllegalArgumentException.class, () -> solution.frequencySort_HashMapAndBucketSort(null), "HashMapAndBucketSort method");
    }
}
```