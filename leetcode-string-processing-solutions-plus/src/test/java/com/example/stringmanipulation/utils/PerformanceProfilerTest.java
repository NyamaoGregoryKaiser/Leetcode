```java
package com.example.stringmanipulation.utils;

import com.example.stringmanipulation.problems.AnagramChecker;
import com.example.stringmanipulation.problems.LongestPalindromicSubstring;
import com.example.stringmanipulation.problems.ValidParentheses;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * PerformanceProfilerTest
 * Demonstrates the usage of PerformanceProfiler for various string manipulation algorithms.
 * This class is for showcasing the profiling utility rather than traditional assertion-based testing.
 */
class PerformanceProfilerTest {

    private static final int SMALL_ITERATIONS = 100;
    private static final int MEDIUM_ITERATIONS = 1000;
    private static final int LARGE_ITERATIONS = 10000; // For faster methods
    private static final int VERY_LARGE_ITERATIONS = 100_000; // For very fast methods

    // --- Anagram Checker Benchmarks ---
    @Test
    @DisplayName("Benchmark AnagramChecker algorithms with medium length strings")
    void benchmarkAnagramCheckerMediumStrings() {
        System.out.println("\n--- Anagram Checker Benchmarks (Medium Strings) ---");

        String s1 = "listenlistenlistenlistenlistenlistenlisten"; // Length 40
        String s2 = "silenttsilenttsilenttsilenttsilenttsilentt"; // Length 40, s2 is an anagram if rearranged
        // For actual anagram test:
        String s_medium = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"; // Length 52
        String t_medium = "zyxwuvtsrqponmlkjihgfedcbazyxwuvtsrqponmlkjihgfedcba"; // Length 52 (reversed alphabet twice)

        int iterations = MEDIUM_ITERATIONS;

        PerformanceProfiler.ProfilerResult resSorting = PerformanceProfiler.profileMethod(
            () -> AnagramChecker.isAnagramSorting(s_medium, t_medium),
            "Anagram_Sorting (Medium)", iterations
        );
        System.out.println(resSorting);

        PerformanceProfiler.ProfilerResult resFrequencyArray = PerformanceProfiler.profileMethod(
            () -> AnagramChecker.isAnagramFrequencyArray(s_medium, t_medium),
            "Anagram_FrequencyArray (Medium)", iterations
        );
        System.out.println(resFrequencyArray);

        PerformanceProfiler.ProfilerResult resHashMap = PerformanceProfiler.profileMethod(
            () -> AnagramChecker.isAnagramHashMap(s_medium, t_medium),
            "Anagram_HashMap (Medium)", iterations
        );
        System.out.println(resHashMap);
    }

    @Test
    @DisplayName("Benchmark AnagramChecker algorithms with long strings")
    void benchmarkAnagramCheckerLongStrings() {
        System.out.println("\n--- Anagram Checker Benchmarks (Long Strings) ---");
        // Create genuinely long strings for better differentiation
        String longStringPart1 = "abcdefghijklmnopqrstuvwxyz";
        String longStringPart2 = "zyxwuvtsrqponmlkjihgfedcba"; // Reversed alphabet

        StringBuilder sb1 = new StringBuilder();
        StringBuilder sb2 = new StringBuilder();
        int repeat = 1000; // Creates strings of length 26000

        for (int i = 0; i < repeat; i++) {
            sb1.append(longStringPart1);
            sb1.append(longStringPart2);
            sb2.append(longStringPart2);
            sb2.append(longStringPart1);
        }
        String longS1 = sb1.toString();
        String longS2 = sb2.toString(); // s2 is an anagram of s1

        int iterations = SMALL_ITERATIONS; // Fewer iterations for O(N log N) on very long strings

        // Note: For very long strings, sorting can become noticeably slower.
        // We expect FrequencyArray to be significantly faster.
        PerformanceProfiler.ProfilerResult resSorting = PerformanceProfiler.profileMethod(
            () -> AnagramChecker.isAnagramSorting(longS1, longS2),
            "Anagram_Sorting (Long)", iterations
        );
        System.out.println(resSorting);

        PerformanceProfiler.ProfilerResult resFrequencyArray = PerformanceProfiler.profileMethod(
            () -> AnagramChecker.isAnagramFrequencyArray(longS1, longS2),
            "Anagram_FrequencyArray (Long)", iterations
        );
        System.out.println(resFrequencyArray);

        PerformanceProfiler.ProfilerResult resHashMap = PerformanceProfiler.profileMethod(
            () -> AnagramChecker.isAnagramHashMap(longS1, longS2),
            "Anagram_HashMap (Long)", iterations
        );
        System.out.println(resHashMap);
    }

    // --- Longest Palindromic Substring Benchmarks ---
    @Test
    @DisplayName("Benchmark LongestPalindromicSubstring algorithms")
    void benchmarkLongestPalindromicSubstring() {
        System.out.println("\n--- Longest Palindromic Substring Benchmarks ---");

        String shortStr = "babad"; // Length 5
        String mediumStr = "forgeeksskeegforabcdeffedcba"; // Length 28
        String longStr = generateLongStringForLPS(1000); // Length 2001, for O(N^2)
        String veryLongStr = generateLongStringForLPS(5000); // Length 10001

        int smallIterations = MEDIUM_ITERATIONS; // For short strings
        int mediumIterations = SMALL_ITERATIONS; // For medium strings
        int longIterations = 1; // Brute-force is very slow
        int veryLongIterations = 1; // O(N^2) can be slow for N=10000

        // Short String
        System.out.println("\n--- LPS (Short String) ---");
        PerformanceProfiler.profileMethod(
            () -> LongestPalindromicSubstring.bruteForce(shortStr),
            "LPS_BruteForce (Short)", smallIterations
        );
        PerformanceProfiler.profileMethod(
            () -> LongestPalindromicSubstring.expandAroundCenter(shortStr),
            "LPS_ExpandAroundCenter (Short)", VERY_LARGE_ITERATIONS
        );
        PerformanceProfiler.profileMethod(
            () -> LongestPalindromicSubstring.dynamicProgramming(shortStr),
            "LPS_DP (Short)", VERY_LARGE_ITERATIONS
        );

        // Medium String
        System.out.println("\n--- LPS (Medium String) ---");
        PerformanceProfiler.profileMethod(
            () -> LongestPalindromicSubstring.bruteForce(mediumStr),
            "LPS_BruteForce (Medium)", mediumIterations
        );
        PerformanceProfiler.profileMethod(
            () -> LongestPalindromicSubstring.expandAroundCenter(mediumStr),
            "LPS_ExpandAroundCenter (Medium)", LARGE_ITERATIONS
        );
        PerformanceProfiler.profileMethod(
            () -> LongestPalindromicSubstring.dynamicProgramming(mediumStr),
            "LPS_DP (Medium)", LARGE_ITERATIONS
        );

        // Long String (N=2000)
        System.out.println("\n--- LPS (Long String - N=2000) ---");
        // bruteForce will be extremely slow, so skip or run with very few iterations.
        // PerformanceProfiler.profileMethod(
        //     () -> LongestPalindromicSubstring.bruteForce(longStr),
        //     "LPS_BruteForce (Long)", 1
        // );
        PerformanceProfiler.profileMethod(
            () -> LongestPalindromicSubstring.expandAroundCenter(longStr),
            "LPS_ExpandAroundCenter (Long)", longIterations
        );
        PerformanceProfiler.profileMethod(
            () -> LongestPalindromicSubstring.dynamicProgramming(longStr),
            "LPS_DP (Long)", longIterations
        );

        // Very Long String (N=10000)
        System.out.println("\n--- LPS (Very Long String - N=10000) ---");
        PerformanceProfiler.profileMethod(
            () -> LongestPalindromicSubstring.expandAroundCenter(veryLongStr),
            "LPS_ExpandAroundCenter (Very Long)", veryLongIterations
        );
        PerformanceProfiler.profileMethod(
            () -> LongestPalindromicSubstring.dynamicProgramming(veryLongStr),
            "LPS_DP (Very Long)", veryLongIterations
        );
    }

    private String generateLongStringForLPS(int halfLength) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < halfLength; i++) {
            sb.append('a');
        }
        sb.append('b'); // Center char if odd length, or just a marker
        for (int i = 0; i < halfLength; i++) {
            sb.append('a');
        }
        // Resulting string: "aaaa...aaabaaaaa...aaaa" (length 2*halfLength + 1)
        // LPS is the entire string.
        return sb.toString();
    }


    // --- Valid Parentheses Benchmark ---
    @Test
    @DisplayName("Benchmark ValidParentheses algorithm")
    void benchmarkValidParentheses() {
        System.out.println("\n--- Valid Parentheses Benchmarks ---");

        String shortValid = "()[]{}"; // Length 6
        String longValid = generateLongValidParentheses(10000); // Length 20000
        String veryLongValid = generateLongValidParentheses(100000); // Length 200000

        PerformanceProfiler.profileMethod(
            () -> ValidParentheses.isValid(shortValid),
            "ValidParentheses (Short)", VERY_LARGE_ITERATIONS
        );

        PerformanceProfiler.profileMethod(
            () -> ValidParentheses.isValid(longValid),
            "ValidParentheses (Long)", LARGE_ITERATIONS
        );

        PerformanceProfiler.profileMethod(
            () -> ValidParentheses.isValid(veryLongValid),
            "ValidParentheses (Very Long)", MEDIUM_ITERATIONS
        );
    }

    private String generateLongValidParentheses(int pairs) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < pairs; i++) {
            sb.append("()");
        }
        return sb.toString();
    }

    // --- Profiler Utility Tests ---
    @Test
    @DisplayName("PerformanceProfiler should throw exception for invalid iterations")
    void testProfilerInvalidIterations() {
        assertThrows(IllegalArgumentException.class, () ->
            PerformanceProfiler.profileMethod(() -> {}, "TestTask", 0)
        );
        assertThrows(IllegalArgumentException.class, () ->
            PerformanceProfiler.profileMethod(() -> true, "TestSupplier", -1)
        );
    }

    @Test
    @DisplayName("PerformanceProfiler should return valid stats for a simple task")
    void testProfilerSimpleTask() {
        PerformanceProfiler.ProfilerResult result = PerformanceProfiler.profileMethod(
            () -> {
                try {
                    Thread.sleep(1); // Simulate some work
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }, "Simple Sleep Task", 10
        );

        assertTrue(result.getMinTimeMs() > 0, "Min time should be greater than 0");
        assertTrue(result.getAverageTimeMs() > 0, "Average time should be greater than 0");
        assertTrue(result.getMaxTimeMs() > 0, "Max time should be greater than 0");
        System.out.println(result); // Print for verification
    }
}
```