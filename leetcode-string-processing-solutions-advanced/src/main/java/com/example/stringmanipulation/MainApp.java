```java
package com.example.stringmanipulation;

import com.example.stringmanipulation.problems.GroupAnagrams;
import com.example.stringmanipulation.problems.LongestPalindromicSubstring;
import com.example.stringmanipulation.problems.MinimumWindowSubstring;
import com.example.stringmanipulation.problems.StringToIntegerAtoi;
import com.example.stringmanipulation.utils.PerformanceBenchmark;

import java.util.List;

/**
 * Main application class to demonstrate the usage of the String Manipulation algorithms
 * and run performance benchmarks.
 */
public class MainApp {

    public static void main(String[] args) {
        System.out.println("--- String Manipulation Interview Project ---");
        System.out.println("Demonstrating core algorithms and running benchmarks.");
        System.out.println();

        // 1. Demonstrate Longest Palindromic Substring
        System.out.println("--- Longest Palindromic Substring ---");
        LongestPalindromicSubstring lps = new LongestPalindromicSubstring();
        String sLPS1 = "babad";
        String sLPS2 = "cbbd";
        String sLPS3 = "racecar";

        System.out.printf("Input: \"%s\", Longest Palindrome (Expand Around Center): \"%s\"%n", sLPS1, lps.longestPalindromeExpandAroundCenter(sLPS1));
        System.out.printf("Input: \"%s\", Longest Palindrome (DP): \"%s\"%n", sLPS1, lps.longestPalindromeDP(sLPS1));
        System.out.printf("Input: \"%s\", Longest Palindrome (Expand Around Center): \"%s\"%n", sLPS2, lps.longestPalindromeExpandAroundCenter(sLPS2));
        System.out.printf("Input: \"%s\", Longest Palindrome (DP): \"%s\"%n", sLPS2, lps.longestPalindromeDP(sLPS2));
        System.out.printf("Input: \"%s\", Longest Palindrome (Expand Around Center): \"%s\"%n", sLPS3, lps.longestPalindromeExpandAroundCenter(sLPS3));
        System.out.printf("Input: \"%s\", Longest Palindrome (DP): \"%s\"%n", sLPS3, lps.longestPalindromeDP(sLPS3));
        System.out.println();

        // 2. Demonstrate Minimum Window Substring
        System.out.println("--- Minimum Window Substring ---");
        MinimumWindowSubstring mws = new MinimumWindowSubstring();
        String sMWS1 = "ADOBECODEBANC"; String tMWS1 = "ABC";
        String sMWS2 = "a"; String tMWS2 = "a";
        String sMWS3 = "a"; String tMWS3 = "aa";

        System.out.printf("S: \"%s\", T: \"%s\" -> Min Window: \"%s\"%n", sMWS1, tMWS1, mws.minWindow(sMWS1, tMWS1));
        System.out.printf("S: \"%s\", T: \"%s\" -> Min Window: \"%s\"%n", sMWS2, tMWS2, mws.minWindow(sMWS2, tMWS2));
        System.out.printf("S: \"%s\", T: \"%s\" -> Min Window: \"%s\"%n", sMWS3, tMWS3, mws.minWindow(sMWS3, tMWS3));
        System.out.println();

        // 3. Demonstrate Group Anagrams
        System.out.println("--- Group Anagrams ---");
        GroupAnagrams ga = new GroupAnagrams();
        String[] strsGA1 = {"eat","tea","tan","ate","nat","bat"};
        String[] strsGA2 = {""};
        String[] strsGA3 = {"a"};

        System.out.printf("Input: %s -> Grouped Anagrams (Sorting): %s%n", arrayToString(strsGA1), ga.groupAnagramsBySorting(strsGA1));
        System.out.printf("Input: %s -> Grouped Anagrams (Counting): %s%n", arrayToString(strsGA1), ga.groupAnagramsByCounting(strsGA1));
        System.out.printf("Input: %s -> Grouped Anagrams (Sorting): %s%n", arrayToString(strsGA2), ga.groupAnagramsBySorting(strsGA2));
        System.out.printf("Input: %s -> Grouped Anagrams (Counting): %s%n", arrayToString(strsGA2), ga.groupAnagramsByCounting(strsGA2));
        System.out.printf("Input: %s -> Grouped Anagrams (Sorting): %s%n", arrayToString(strsGA3), ga.groupAnagramsBySorting(strsGA3));
        System.out.printf("Input: %s -> Grouped Anagrams (Counting): %s%n", arrayToString(strsGA3), ga.groupAnagramsByCounting(strsGA3));
        System.out.println();

        // 4. Demonstrate String to Integer (atoi)
        System.out.println("--- String to Integer (atoi) ---");
        StringToIntegerAtoi atoi = new StringToIntegerAtoi();
        String sAtoi1 = "42";
        String sAtoi2 = "   -42";
        String sAtoi3 = "4193 with words";
        String sAtoi4 = "words and 987";
        String sAtoi5 = "-91283472332"; // Underflow example
        String sAtoi6 = "2147483647";   // Integer.MAX_VALUE
        String sAtoi7 = "2147483648";   // Overflow example

        System.out.printf("Input: \"%s\" -> Integer: %d%n", sAtoi1, atoi.myAtoi(sAtoi1));
        System.out.printf("Input: \"%s\" -> Integer: %d%n", sAtoi2, atoi.myAtoi(sAtoi2));
        System.out.printf("Input: \"%s\" -> Integer: %d%n", sAtoi3, atoi.myAtoi(sAtoi3));
        System.out.printf("Input: \"%s\" -> Integer: %d%n", sAtoi4, atoi.myAtoi(sAtoi4));
        System.out.printf("Input: \"%s\" -> Integer: %d (Expected: %d)%n", sAtoi5, atoi.myAtoi(sAtoi5), Integer.MIN_VALUE);
        System.out.printf("Input: \"%s\" -> Integer: %d (Expected: %d)%n", sAtoi6, atoi.myAtoi(sAtoi6), Integer.MAX_VALUE);
        System.out.printf("Input: \"%s\" -> Integer: %d (Expected: %d)%n", sAtoi7, atoi.myAtoi(sAtoi7), Integer.MAX_VALUE);
        System.out.println();

        // Run all performance benchmarks
        PerformanceBenchmark.runAllBenchmarks();
    }

    // Helper to print string arrays cleanly
    private static String arrayToString(String[] arr) {
        if (arr == null) return "null";
        if (arr.length == 0) return "[]";
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            sb.append("\"").append(arr[i]).append("\"");
            if (i < arr.length - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();
    }
}
```