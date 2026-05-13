```java
package com.example.stringmanipulation.benchmarks;

import com.example.stringmanipulation.problems.AnagramChecker;
import com.example.stringmanipulation.problems.LongestPalindromicSubstring;
import com.example.stringmanipulation.problems.StringPermutations;
import com.example.stringmanipulation.problems.MinimumWindowSubstring;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;

import java.util.concurrent.TimeUnit;
import java.util.List;
import java.util.Random;
import java.util.Arrays;
import java.util.Collections;

/**
 * PerformanceBenchmarker uses JMH (Java Microbenchmark Harness) to compare
 * the performance of different algorithmic approaches for the String Manipulation problems.
 *
 * To run:
 * mvn clean install
 * mvn exec:java -Dexec.mainClass="org.openjdk.jmh.Main" -Dexec.args="com.example.stringmanipulation.benchmarks.PerformanceBenchmarker"
 * (or simply `mvn exec:java` if the pom.xml mainClass is configured for JMH entry point)
 */
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@Warmup(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@Fork(1)
@State(Scope.Benchmark)
public class PerformanceBenchmarker {

    // --- State for Longest Palindromic Substring ---
    private LongestPalindromicSubstring lps;
    private String lps_shortString = "babad";
    private String lps_mediumString = "forgeeksskeegfor"; // Palindrome in middle
    private String lps_longString; // ~1000 chars, mostly random, some palindromes

    // --- State for Anagram Checker ---
    private AnagramChecker anagramChecker;
    private String anagram_s1_short = "listen";
    private String anagram_t1_short = "silent";
    private String anagram_s2_medium;
    private String anagram_t2_medium; // Anagram of s2_medium
    private String anagram_s3_medium_non; // Non-anagram of s2_medium

    // --- State for String Permutations ---
    private StringPermutations stringPermutations;
    private String perm_short = "abc";
    private String perm_medium = "abcdef"; // 6! = 720 permutations
    private String perm_medium_dup = "aabbc"; // With duplicates

    // --- State for Minimum Window Substring ---
    private MinimumWindowSubstring mws;
    private String mws_s1 = "ADOBECODEBANC";
    private String mws_t1 = "ABC";
    private String mws_s2_long; // Long string
    private String mws_t2_medium = "XYZ"; // Target for long string


    @Setup(Level.Trial)
    public void setup() {
        lps = new LongestPalindromicSubstring();
        anagramChecker = new AnagramChecker();
        stringPermutations = new StringPermutations();
        mws = new MinimumWindowSubstring();

        // Generate long string for LPS benchmark (max length 1000)
        Random random = new Random(123); // Fixed seed for reproducibility
        StringBuilder sbLPS = new StringBuilder();
        for (int i = 0; i < 900; i++) {
            sbLPS.append((char) ('a' + random.nextInt(26)));
        }
        // Insert a known long palindrome to ensure interesting test cases
        String longPal = generatePalindrome(99); // Odd length
        sbLPS.insert(400, longPal);
        lps_longString = sbLPS.toString();


        // Generate medium strings for Anagram Checker
        StringBuilder sbAnagram1 = new StringBuilder();
        StringBuilder sbAnagram2 = new StringBuilder();
        for (int i = 0; i < 1000; i++) {
            sbAnagram1.append((char) ('a' + random.nextInt(26)));
        }
        anagram_s2_medium = sbAnagram1.toString();
        char[] s2Chars = anagram_s2_medium.toCharArray();
        List<Character> charList = new ArrayList<>();
        for (char c : s2Chars) charList.add(c);
        Collections.shuffle(charList, random);
        for (char c : charList) sbAnagram2.append(c);
        anagram_t2_medium = sbAnagram2.toString();

        StringBuilder sbAnagram3 = new StringBuilder(anagram_s2_medium);
        sbAnagram3.setCharAt(0, (char) ('a' + (sbAnagram3.charAt(0) - 'a' + 1) % 26)); // Change one char
        anagram_s3_medium_non = sbAnagram3.toString();


        // Generate long string for MWS benchmark
        StringBuilder sbMWS = new StringBuilder();
        for (int i = 0; i < 5000; i++) {
            sbMWS.append((char) ('A' + random.nextInt(26)));
        }
        // Insert target characters
        String targetChars = "AXYZBCEFGHIJK"; // Some characters from mws_t2_medium, others not
        int insertPos = random.nextInt(sbMWS.length() - targetChars.length());
        sbMWS.replace(insertPos, insertPos + targetChars.length(), targetChars);
        mws_s2_long = sbMWS.toString();
    }

    private String generatePalindrome(int length) {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length / 2; i++) {
            sb.append((char) ('a' + random.nextInt(26)));
        }
        String firstHalf = sb.toString();
        String reversedFirstHalf = sb.reverse().toString();
        if (length % 2 == 1) {
            return firstHalf + (char) ('a' + random.nextInt(26)) + reversedFirstHalf;
        } else {
            return firstHalf + reversedFirstHalf;
        }
    }

    // --- Longest Palindromic Substring Benchmarks ---
    @Benchmark
    public void lps_bruteForce_short(Blackhole bh) {
        bh.consume(lps.longestPalindromeBruteForce(lps_shortString));
    }

    // Note: Brute force will be too slow for medium/long strings, so we omit for those.
    // @Benchmark
    // public void lps_bruteForce_medium(Blackhole bh) { bh.consume(lps.longestPalindromeBruteForce(lps_mediumString)); }

    @Benchmark
    public void lps_expandAroundCenter_short(Blackhole bh) {
        bh.consume(lps.longestPalindromeExpandAroundCenter(lps_shortString));
    }

    @Benchmark
    public void lps_expandAroundCenter_medium(Blackhole bh) {
        bh.consume(lps.longestPalindromeExpandAroundCenter(lps_mediumString));
    }

    @Benchmark
    public void lps_expandAroundCenter_long(Blackhole bh) {
        bh.consume(lps.longestPalindromeExpandAroundCenter(lps_longString));
    }

    @Benchmark
    public void lps_dp_short(Blackhole bh) {
        bh.consume(lps.longestPalindromeDP(lps_shortString));
    }

    @Benchmark
    public void lps_dp_medium(Blackhole bh) {
        bh.consume(lps.longestPalindromeDP(lps_mediumString));
    }

    @Benchmark
    public void lps_dp_long(Blackhole bh) {
        bh.consume(lps.longestPalindromeDP(lps_longString));
    }


    // --- Anagram Checker Benchmarks ---
    @Benchmark
    public void anagram_sorting_short(Blackhole bh) {
        bh.consume(anagramChecker.isAnagramSorting(anagram_s1_short, anagram_t1_short));
    }

    @Benchmark
    public void anagram_sorting_medium_true(Blackhole bh) {
        bh.consume(anagramChecker.isAnagramSorting(anagram_s2_medium, anagram_t2_medium));
    }

    @Benchmark
    public void anagram_sorting_medium_false(Blackhole bh) {
        bh.consume(anagramChecker.isAnagramSorting(anagram_s2_medium, anagram_s3_medium_non));
    }

    @Benchmark
    public void anagram_freqArray_short(Blackhole bh) {
        bh.consume(anagramChecker.isAnagramFrequencyArray(anagram_s1_short, anagram_t1_short));
    }

    @Benchmark
    public void anagram_freqArray_medium_true(Blackhole bh) {
        bh.consume(anagramChecker.isAnagramFrequencyArray(anagram_s2_medium, anagram_t2_medium));
    }

    @Benchmark
    public void anagram_freqArray_medium_false(Blackhole bh) {
        bh.consume(anagramChecker.isAnagramFrequencyArray(anagram_s2_medium, anagram_s3_medium_non));
    }

    @Benchmark
    public void anagram_freqMap_short(Blackhole bh) {
        bh.consume(anagramChecker.isAnagramFrequencyMap(anagram_s1_short, anagram_t1_short));
    }

    @Benchmark
    public void anagram_freqMap_medium_true(Blackhole bh) {
        bh.consume(anagramChecker.isAnagramFrequencyMap(anagram_s2_medium, anagram_t2_medium));
    }

    @Benchmark
    public void anagram_freqMap_medium_false(Blackhole bh) {
        bh.consume(anagramChecker.isAnagramFrequencyMap(anagram_s2_medium, anagram_s3_medium_non));
    }


    // --- String Permutations Benchmarks ---
    // Note: Permutations grow extremely fast. Benchmarking beyond N=6 or N=7 with these methods is prohibitive.
    // The main point is to show the complexity of N! and how it quickly becomes unfeasible.
    @Benchmark
    public void permute_uniqueChars_short(Blackhole bh) {
        bh.consume(stringPermutations.permuteUniqueChars(perm_short)); // 3! = 6
    }

    @Benchmark
    public void permute_uniqueChars_medium(Blackhole bh) {
        bh.consume(stringPermutations.permuteUniqueChars(perm_medium)); // 6! = 720
    }

    @Benchmark
    public void permute_duplicates_short_with_set(Blackhole bh) {
        bh.consume(stringPermutations.permuteWithDuplicates("aab")); // 3 unique
    }

    @Benchmark
    public void permute_optimizedDistinct_short_with_dup(Blackhole bh) {
        bh.consume(stringPermutations.permuteOptimizedDistinct("aab")); // 3 unique
    }

    @Benchmark
    public void permute_optimizedDistinct_medium_with_dup(Blackhole bh) {
        bh.consume(stringPermutations.permuteOptimizedDistinct(perm_medium_dup)); // 5! / (2! * 2!) = 120 / 4 = 30
    }


    // --- Minimum Window Substring Benchmarks ---
    @Benchmark
    public void mws_slidingWindow_short(Blackhole bh) {
        bh.consume(mws.minWindowSlidingWindow(mws_s1, mws_t1));
    }

    @Benchmark
    public void mws_slidingWindow_long_sparse(Blackhole bh) {
        bh.consume(mws.minWindowSlidingWindow(mws_s2_long, mws_t2_medium));
    }

    @Benchmark
    public void mws_slidingWindow_long_no_match(Blackhole bh) {
        bh.consume(mws.minWindowSlidingWindow(mws_s2_long, "QWERTYUIOP"));
    }
}
```