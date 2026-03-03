```java
package com.example.stringmanipulation.utils;

import com.example.stringmanipulation.problems.GroupAnagrams;
import com.example.stringmanipulation.problems.LongestPalindromicSubstring;
import com.example.stringmanipulation.problems.MinimumWindowSubstring;
import com.example.stringmanipulation.problems.StringToIntegerAtoi;

import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

/**
 * Utility class for benchmarking the performance of different string manipulation algorithms.
 * It provides methods to measure execution time for various problems and approaches.
 */
public class PerformanceBenchmark {

    private static final int WARMUP_ITERATIONS = 5; // To allow JIT compilation
    private static final int MEASUREMENT_ITERATIONS = 10; // Number of times to run measurement

    public static void runAllBenchmarks() {
        System.out.println("--- Starting Performance Benchmarks ---");
        System.out.println();

        benchmarkLongestPalindromicSubstring();
        System.out.println();

        benchmarkMinimumWindowSubstring();
        System.out.println();

        benchmarkGroupAnagrams();
        System.out.println();

        benchmarkStringToIntegerAtoi();
        System.out.println();

        System.out.println("--- Benchmarks Finished ---");
    }

    private static void benchmarkLongestPalindromicSubstring() {
        System.out.println("Benchmarking Longest Palindromic Substring:");
        LongestPalindromicSubstring lps = new LongestPalindromicSubstring();

        // Test cases (adjust lengths for more rigorous tests)
        String s1 = generateRandomString(1000, "abcdefghijklmnopqrstuvwxyz"); // Max length 1000 for problem
        String s2 = "aaaaa...a" + "b" + "aaaaa...a"; // Longest palindrome almost entire string
        String s3 = "racecar"; // Short, obvious case
        String s4 = "forgeeksskeegfor"; // Medium, expands around center
        String s5 = "abccba"; // Even palindrome

        // Create a long palindromic string for worst-case (e.g., "aaaaaaaa...")
        StringBuilder sbLongPal = new StringBuilder();
        for (int i = 0; i < 900; i++) sbLongPal.append('a');
        String sLongPal = sbLongPal.toString();


        runBenchmark("LPS - Expand Around Center (Random 1000 chars)", () -> lps.longestPalindromeExpandAroundCenter(s1));
        runBenchmark("LPS - DP (Random 1000 chars)", () -> lps.longestPalindromeDP(s1));
        System.out.println("-------------------------");
        runBenchmark("LPS - Expand Around Center (Almost Full Palindrome)", () -> lps.longestPalindromeExpandAroundCenter(sLongPal));
        runBenchmark("LPS - DP (Almost Full Palindrome)", () -> lps.longestPalindromeDP(sLongPal));
        System.out.println("-------------------------");
        runBenchmark("LPS - Expand Around Center (racecar)", () -> lps.longestPalindromeExpandAroundCenter(s3));
        runBenchmark("LPS - DP (racecar)", () -> lps.longestPalindromeDP(s3));
        System.out.println("-------------------------");
        runBenchmark("LPS - Expand Around Center (forgeeksskeegfor)", () -> lps.longestPalindromeExpandAroundCenter(s4));
        runBenchmark("LPS - DP (forgeeksskeegfor)", () -> lps.longestPalindromeDP(s4));
    }

    private static void benchmarkMinimumWindowSubstring() {
        System.out.println("Benchmarking Minimum Window Substring:");
        MinimumWindowSubstring mws = new MinimumWindowSubstring();

        String s1 = generateRandomString(100000, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"); // Max length 10^5
        String t1 = generateRandomString(1000, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"); // Max length 10^5, but 't' is usually shorter

        String s2 = "ADOBECODEBANC";
        String t2 = "ABC";

        String s3 = "abcbadefg";
        String t3 = "abc";

        runBenchmark("MWS (S=10^5, T=10^3 Random Chars)", () -> mws.minWindow(s1, t1));
        System.out.println("-------------------------");
        runBenchmark("MWS (ADOBECODEBANC, ABC)", () -> mws.minWindow(s2, t2));
        System.out.println("-------------------------");
        runBenchmark("MWS (abcbadefg, abc)", () -> mws.minWindow(s3, t3));
    }

    private static void benchmarkGroupAnagrams() {
        System.out.println("Benchmarking Group Anagrams:");
        GroupAnagrams ga = new GroupAnagrams();

        // Generate large input for Group Anagrams
        // N = 10^4 strings, K = 100 length
        String[] largeStrs1 = new String[10000];
        Random rand = new Random();
        for (int i = 0; i < largeStrs1.length; i++) {
            largeStrs1[i] = generateRandomString(rand.nextInt(90) + 10, "abcdefghijklmnopqrstuvwxyz"); // Lengths 10-100
        }

        // Also generate an input where many are anagrams (worst case for sorting might vary)
        String[] largeStrs2 = new String[10000];
        String base = "abcdefghijklmnopqrstuvwxyz".substring(0, 10); // Use first 10 chars
        for (int i = 0; i < largeStrs2.length; i++) {
            List<Character> chars = base.chars().mapToObj(c -> (char) c).collect(Collectors.toList());
            Collections.shuffle(chars);
            largeStrs2[i] = chars.stream().map(String::valueOf).collect(Collectors.joining());
        }


        String[] strs1 = {"eat","tea","tan","ate","nat","bat"};
        String[] strs2 = {"a"};
        String[] strs3 = {"topcoder", "redocpot", "test", "sett"};


        runBenchmark("GA - By Sorting (Random 10^4 strings, len 10-100)", () -> ga.groupAnagramsBySorting(largeStrs1));
        runBenchmark("GA - By Counting (Random 10^4 strings, len 10-100)", () -> ga.groupAnagramsByCounting(largeStrs1));
        System.out.println("-------------------------");
        runBenchmark("GA - By Sorting (10^4 anagrams of a 10-char string)", () -> ga.groupAnagramsBySorting(largeStrs2));
        runBenchmark("GA - By Counting (10^4 anagrams of a 10-char string)", () -> ga.groupAnagramsByCounting(largeStrs2));
        System.out.println("-------------------------");
        runBenchmark("GA - By Sorting (eat, tea, tan...)", () -> ga.groupAnagramsBySorting(strs1));
        runBenchmark("GA - By Counting (eat, tea, tan...)", () -> ga.groupAnagramsByCounting(strs1));
    }

    private static void benchmarkStringToIntegerAtoi() {
        System.out.println("Benchmarking String to Integer (atoi):");
        StringToIntegerAtoi atoi = new StringToIntegerAtoi();

        // Test cases
        String s1 = "   -42";
        String s2 = "4193 with words";
        String s3 = "words and 987";
        String s4 = "2147483647"; // INT_MAX
        String s5 = "2147483648"; // Overflow
        String s6 = "-2147483648"; // INT_MIN
        String s7 = "-2147483649"; // Underflow
        String s8 = "    +12345678901234567890"; // Extremely long, guaranteed overflow
        String s9 = generateRandomNumericString(200); // Max length 200 digits


        runBenchmark("Atoi (   -42)", () -> atoi.myAtoi(s1));
        runBenchmark("Atoi (4193 with words)", () -> atoi.myAtoi(s2));
        runBenchmark("Atoi (words and 987)", () -> atoi.myAtoi(s3));
        runBenchmark("Atoi (INT_MAX)", () -> atoi.myAtoi(s4));
        runBenchmark("Atoi (Overflow case)", () -> atoi.myAtoi(s5));
        runBenchmark("Atoi (INT_MIN)", () -> atoi.myAtoi(s6));
        runBenchmark("Atoi (Underflow case)", () -> atoi.myAtoi(s7));
        runBenchmark("Atoi (Long string, overflow)", () -> atoi.myAtoi(s8));
        runBenchmark("Atoi (Random 200 digits)", () -> atoi.myAtoi(s9));
    }


    // Helper method to run a single benchmark for an algorithm
    private static void runBenchmark(String name, Runnable task) {
        System.out.printf("  %s: ", name);

        // Warmup phase
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            task.run();
        }

        // Measurement phase
        long totalTime = 0;
        for (int i = 0; i < MEASUREMENT_ITERATIONS; i++) {
            long startTime = System.nanoTime();
            task.run();
            long endTime = System.nanoTime();
            totalTime += (endTime - startTime);
        }
        double averageTimeMs = (double) totalTime / MEASUREMENT_ITERATIONS / 1_000_000.0;
        System.out.printf("%.3f ms (avg of %d runs)%n", averageTimeMs, MEASUREMENT_ITERATIONS);
    }

    // Helper to generate random strings for benchmarks
    private static String generateRandomString(int length, String charSet) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(charSet.charAt(random.nextInt(charSet.length())));
        }
        return sb.toString();
    }

    // Helper to generate random numeric strings (for atoi)
    private static String generateRandomNumericString(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);
        // Start with a non-zero digit to avoid leading zeros unless length is 1
        sb.append(random.nextInt(9) + 1);
        for (int i = 1; i < length; i++) {
            sb.append(random.nextInt(10));
        }
        // Optionally add a sign and leading spaces
        if (random.nextBoolean()) {
            sb.insert(0, random.nextBoolean() ? '-' : '+');
        }
        for (int i = 0; i < random.nextInt(5); i++) { // 0-4 leading spaces
            sb.insert(0, ' ');
        }
        return sb.toString();
    }
}
```