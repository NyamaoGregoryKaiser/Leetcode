```java
package com.stringmanipulation;

import com.stringmanipulation.algorithms.StringAlgorithms;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Main application class to demonstrate the String Manipulation algorithms.
 * This class provides examples of how to use the implemented algorithms
 * and prints their results to the console.
 */
public class StringManipulationApp {

    public static void main(String[] args) {
        System.out.println("--- String Manipulation Algorithms Demonstration ---");
        System.out.println("-------------------------------------------------");

        // --- Problem 1: Longest Palindromic Substring ---
        System.out.println("\nProblem 1: Longest Palindromic Substring");
        String s1 = "babad";
        String s2 = "cbbd";
        String s3 = "a";
        String s4 = "forgeeksskeegfor";
        String s5 = "racecar";
        String s6 = "";
        String s7 = "abacaba";

        System.out.println("Input: \"" + s1 + "\" -> Brute Force: \"" + StringAlgorithms.longestPalindromeBruteForce(s1) + "\", Expand Around Center: \"" + StringAlgorithms.longestPalindromeExpandAroundCenter(s1) + "\"");
        System.out.println("Input: \"" + s2 + "\" -> Brute Force: \"" + StringAlgorithms.longestPalindromeBruteForce(s2) + "\", Expand Around Center: \"" + StringAlgorithms.longestPalindromeExpandAroundCenter(s2) + "\"");
        System.out.println("Input: \"" + s3 + "\" -> Brute Force: \"" + StringAlgorithms.longestPalindromeBruteForce(s3) + "\", Expand Around Center: \"" + StringAlgorithms.longestPalindromeExpandAroundCenter(s3) + "\"");
        System.out.println("Input: \"" + s4 + "\" -> Brute Force: \"" + StringAlgorithms.longestPalindromeBruteForce(s4) + "\", Expand Around Center: \"" + StringAlgorithms.longestPalindromeExpandAroundCenter(s4) + "\"");
        System.out.println("Input: \"" + s5 + "\" -> Brute Force: \"" + StringAlgorithms.longestPalindromeBruteForce(s5) + "\", Expand Around Center: \"" + StringAlgorithms.longestPalindromeExpandAroundCenter(s5) + "\"");
        System.out.println("Input: \"" + s6 + "\" -> Brute Force: \"" + StringAlgorithms.longestPalindromeBruteForce(s6) + "\", Expand Around Center: \"" + StringAlgorithms.longestPalindromeExpandAroundCenter(s6) + "\"");
        System.out.println("Input: \"" + s7 + "\" -> Brute Force: \"" + StringAlgorithms.longestPalindromeBruteForce(s7) + "\", Expand Around Center: \"" + StringAlgorithms.longestPalindromeExpandAroundCenter(s7) + "\"");


        // --- Problem 2: Group Anagrams ---
        System.out.println("\nProblem 2: Group Anagrams");
        String[] words1 = {"eat", "tea", "tan", "ate", "nat", "bat"};
        String[] words2 = {"", ""};
        String[] words3 = {"a"};
        String[] words4 = {"hello", "olleh", "world"};

        Map<String, List<String>> result1 = StringAlgorithms.groupAnagrams(words1);
        System.out.println("Input: " + Arrays.toString(words1) + " -> Output: " + result1);

        Map<String, List<String>> result2 = StringAlgorithms.groupAnagrams(words2);
        System.out.println("Input: " + Arrays.toString(words2) + " -> Output: " + result2);

        Map<String, List<String>> result3 = StringAlgorithms.groupAnagrams(words3);
        System.out.println("Input: " + Arrays.toString(words3) + " -> Output: " + result3);

        Map<String, List<String>> result4 = StringAlgorithms.groupAnagrams(words4);
        System.out.println("Input: " + Arrays.toString(words4) + " -> Output: " + result4);

        // --- Problem 3: Minimum Window Substring ---
        System.out.println("\nProblem 3: Minimum Window Substring");
        String text1 = "ADOBECODEBANC";
        String pattern1 = "ABC";
        String text2 = "a";
        String pattern2 = "a";
        String text3 = "a";
        String pattern3 = "aa";
        String text4 = "ab";
        String pattern4 = "b";
        String text5 = "cabwefgewcwaefgcf";
        String pattern5 = "cae";

        System.out.println("S: \"" + text1 + "\", T: \"" + pattern1 + "\" -> Min Window: \"" + StringAlgorithms.minWindowSubstring(text1, pattern1) + "\"");
        System.out.println("S: \"" + text2 + "\", T: \"" + pattern2 + "\" -> Min Window: \"" + StringAlgorithms.minWindowSubstring(text2, pattern2) + "\"");
        System.out.println("S: \"" + text3 + "\", T: \"" + pattern3 + "\" -> Min Window: \"" + StringAlgorithms.minWindowSubstring(text3, pattern3) + "\"");
        System.out.println("S: \"" + text4 + "\", T: \"" + pattern4 + "\" -> Min Window: \"" + StringAlgorithms.minWindowSubstring(text4, pattern4) + "\"");
        System.out.println("S: \"" + text5 + "\", T: \"" + pattern5 + "\" -> Min Window: \"" + StringAlgorithms.minWindowSubstring(text5, pattern5) + "\"");

        // --- Problem 4: String to Integer (atoi) ---
        System.out.println("\nProblem 4: String to Integer (atoi)");
        String atoi1 = "42";
        String atoi2 = "   -42";
        String atoi3 = "4193 with words";
        String atoi4 = "words and 987";
        String atoi5 = "-91283472332"; // Exceeds MIN_VALUE
        String atoi6 = "2147483647";   // MAX_VALUE
        String atoi7 = "2147483648";   // Exceeds MAX_VALUE
        String atoi8 = "-2147483648";  // MIN_VALUE
        String atoi9 = "-2147483649";  // Exceeds MIN_VALUE
        String atoi10 = "";
        String atoi11 = " ";
        String atoi12 = "+1";
        String atoi13 = "-";
        String atoi14 = "+-1";
        String atoi15 = "  +  413";


        System.out.println("Input: \"" + atoi1 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi1));
        System.out.println("Input: \"" + atoi2 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi2));
        System.out.println("Input: \"" + atoi3 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi3));
        System.out.println("Input: \"" + atoi4 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi4));
        System.out.println("Input: \"" + atoi5 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi5));
        System.out.println("Input: \"" + atoi6 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi6));
        System.out.println("Input: \"" + atoi7 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi7));
        System.out.println("Input: \"" + atoi8 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi8));
        System.out.println("Input: \"" + atoi9 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi9));
        System.out.println("Input: \"" + atoi10 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi10));
        System.out.println("Input: \"" + atoi11 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi11));
        System.out.println("Input: \"" + atoi12 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi12));
        System.out.println("Input: \"" + atoi13 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi13));
        System.out.println("Input: \"" + atoi14 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi14));
        System.out.println("Input: \"" + atoi15 + "\" -> Result: " + StringAlgorithms.stringToIntegerAtoi(atoi15));
    }
}
```