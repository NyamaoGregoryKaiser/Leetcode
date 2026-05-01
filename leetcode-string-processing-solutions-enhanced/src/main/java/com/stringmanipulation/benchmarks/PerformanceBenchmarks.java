```java
package com.stringmanipulation.benchmarks;

import com.stringmanipulation.algorithms.StringAlgorithms;
import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
 * Performance benchmarks for String Manipulation algorithms using JMH.
 * This class provides benchmarks for:
 * - Longest Palindromic Substring (Brute Force vs. Expand Around Center)
 * - Group Anagrams (Character Count vs. Sorting)
 * - Minimum Window Substring
 * - String to Integer (Atoi)
 *
 * To run:
 * 1. Compile the project: `mvn clean install`
 * 2. Run the benchmarks: `java -jar target/benchmarks.jar`
 *    (or `java -jar target/benchmarks.jar com.stringmanipulation.benchmarks.PerformanceBenchmarks`
 *     to target this specific benchmark class)
 * 3. Use options like `-f 1 -wi 5 -i 5 -t 1` for fewer forks, warmups, iterations, and threads
 *    to get quicker (less accurate) results, or increase them for more reliable numbers.
 */
@Warmup(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 5, time = 2, timeUnit = TimeUnit.SECONDS)
@Fork(value = 1) // Number of times to fork the JVM. Set to 0 to run in the current JVM.
@State(Scope.Benchmark) // State shared by all benchmark threads
@BenchmarkMode(Mode.AverageTime) // Measure average time per operation
@OutputTimeUnit(TimeUnit.MICROSECONDS) // Output time in microseconds
public class PerformanceBenchmarks {

    // --- Data Setup for Benchmarks ---
    @Param({"10", "100", "500", "1000"}) // String lengths for benchmarks
    public int stringLength;

    @Param({"10", "100", "500"}) // Number of words for anagrams benchmark
    public int numWords;

    public String testStringPalindrome;
    public String[] testStringsAnagrams;
    public String testStringMinWindowS;
    public String testStringMinWindowT;
    public String testStringAtoi;

    private static final String ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    private final Random random = new Random(123); // Fixed seed for reproducibility

    // Helper to generate a random string of given length
    private String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(ALPHABET.charAt(random.nextInt(ALPHABET.length())));
        }
        return sb.toString();
    }

    // Helper to generate a string with a known palindrome
    private String generatePalindromeString(int length) {
        if (length == 0) return "";
        StringBuilder sb = new StringBuilder(length);
        int half = length / 2;
        for (int i = 0; i < half; i++) {
            sb.append(ALPHABET.charAt(random.nextInt(ALPHABET.length())));
        }
        String firstHalf = sb.toString();
        String secondHalf = sb.reverse().toString();
        if (length % 2 == 1) {
            return firstHalf + ALPHABET.charAt(random.nextInt(ALPHABET.length())) + secondHalf;
        } else {
            return firstHalf + secondHalf;
        }
    }

    // Helper to generate anagrams
    private String[] generateAnagrams(int count, int wordLength) {
        String base = generateRandomString(wordLength);
        char[] baseChars = base.toCharArray();
        List<String> words = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            // Shuffle baseChars to create an anagram
            for (int j = baseChars.length - 1; j > 0; j--) {
                int index = random.nextInt(j + 1);
                char temp = baseChars[index];
                baseChars[index] = baseChars[j];
                baseChars[j] = temp;
            }
            words.add(new String(baseChars));
        }
        return words.toArray(new String[0]);
    }

    // Setup method runs once before each set of benchmark iterations
    @Setup(Level.Trial)
    public void setup() {
        // Longest Palindromic Substring: use string with a guaranteed long palindrome
        testStringPalindrome = generatePalindromeString(stringLength);
        if (testStringPalindrome.length() < 10) testStringPalindrome = "forgeeksskeegfor"; // Ensure a decent test case for small N

        // Group Anagrams: generate 'numWords' anagrams of a certain length
        testStringsAnagrams = generateAnagrams(numWords, 10); // Fixed word length for anagrams

        // Minimum Window Substring: large string 's' and smaller 't'
        testStringMinWindowS = generateRandomString(stringLength * 2); // S is longer
        // Ensure t is actually present in s (approx), or contains some known chars
        String subInS = testStringMinWindowS.substring(random.nextInt(stringLength), random.nextInt(stringLength) + Math.min(stringLength/4, 10));
        testStringMinWindowT = (subInS.length() > 0 ? String.valueOf(subInS.charAt(0)) : "a") + (subInS.length() > 1 ? String.valueOf(subInS.charAt(1)) : "b"); // Simple pattern
        if (stringLength >= 10 && testStringMinWindowT.length() < 2) { // Ensure t is not too short for larger S
            testStringMinWindowT = testStringMinWindowS.substring(stringLength/4, stringLength/4+2);
        } else if (stringLength < 10) {
             testStringMinWindowS = "ADOBECODEBANC";
             testStringMinWindowT = "ABC";
        }

        // String to Integer (Atoi): a mix of valid, invalid, and boundary cases
        List<String> atoiCases = Arrays.asList(
            "   -42", "4193 with words", "-91283472332", "2147483647", "2147483648",
            "words and 987", " " + String.valueOf(random.nextInt(10000000)) // Random numbers
        );
        testStringAtoi = atoiCases.get(random.nextInt(atoiCases.size()));
        // For varying stringLength, might just use fixed test cases
        if (stringLength > 100) { // For very long strings, focus on parsing aspects
             testStringAtoi = "   " + (random.nextBoolean() ? "+" : "-") + generateRandomString(stringLength - 5);
             // Ensure it has some digits at the start for atoi
             if (stringLength > 10) {
                 StringBuilder sb = new StringBuilder("  ");
                 if (random.nextBoolean()) sb.append("+"); else sb.append("-");
                 for (int i=0; i<Math.min(stringLength-5, 12); i++) sb.append(random.nextInt(10));
                 sb.append("some words");
                 testStringAtoi = sb.toString();
             }
        }
    }

    // --- Benchmarks ---

    @Benchmark
    public void longestPalindromeBruteForce(Blackhole bh) {
        bh.consume(StringAlgorithms.longestPalindromeBruteForce(testStringPalindrome));
    }

    @Benchmark
    public void longestPalindromeExpandAroundCenter(Blackhole bh) {
        bh.consume(StringAlgorithms.longestPalindromeExpandAroundCenter(testStringPalindrome));
    }

    @Benchmark
    public void groupAnagramsCharCount(Blackhole bh) {
        bh.consume(StringAlgorithms.groupAnagrams(testStringsAnagrams));
    }

    @Benchmark
    public void groupAnagramsSorting(Blackhole bh) {
        bh.consume(StringAlgorithms.groupAnagramsSorting(testStringsAnagrams));
    }

    @Benchmark
    public void minWindowSubstring(Blackhole bh) {
        bh.consume(StringAlgorithms.minWindowSubstring(testStringMinWindowS, testStringMinWindowT));
    }

    @Benchmark
    public void stringToIntegerAtoi(Blackhole bh) {
        bh.consume(StringAlgorithms.stringToIntegerAtoi(testStringAtoi));
    }
}
```