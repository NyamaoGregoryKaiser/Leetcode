```java
package com.stringmanipulation.algorithms;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This class contains implementations of various String Manipulation algorithms
 * for common coding interview problems.
 * Each problem includes optimal solutions, detailed comments, and complexity analysis.
 */
public class StringAlgorithms {

    /*
     * =========================================================================
     * PROBLEM 1: LONGEST PALINDROMIC SUBSTRING
     * Given a string s, return the longest palindromic substring in s.
     * =========================================================================
     */

    /**
     * Approach 1: Brute Force
     * Checks every possible substring for palindrome property.
     *
     * Time Complexity: O(N^3)
     *   - O(N^2) for iterating through all possible start and end indices of substrings.
     *   - O(N) for checking if each substring is a palindrome.
     * Space Complexity: O(N) (or O(1) if `substring` doesn't create new string,
     *                   but generally it does for `isPalindrome` call)
     *   - For storing the current longest palindrome and for substring creation.
     *
     * @param s The input string.
     * @return The longest palindromic substring.
     */
    public static String longestPalindromeBruteForce(String s) {
        if (s == null || s.length() < 1) {
            return "";
        }

        String longestPalindrome = "";

        // Iterate through all possible starting points
        for (int i = 0; i < s.length(); i++) {
            // Iterate through all possible ending points (from current start to end of string)
            for (int j = i; j < s.length(); j++) {
                String sub = s.substring(i, j + 1); // Get substring s[i...j]
                if (isPalindrome(sub)) {
                    if (sub.length() > longestPalindrome.length()) {
                        longestPalindrome = sub; // Update if current palindrome is longer
                    }
                }
            }
        }
        return longestPalindrome;
    }

    /**
     * Helper method to check if a string is a palindrome.
     *
     * Time Complexity: O(N) where N is the length of the string.
     * Space Complexity: O(1).
     *
     * @param str The string to check.
     * @return True if the string is a palindrome, false otherwise.
     */
    private static boolean isPalindrome(String str) {
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


    /**
     * Approach 2: Expand Around Center
     * This is an optimized approach. A palindrome is symmetric around its center.
     * The center can be a single character (e.g., "aba") or two characters (e.g., "abba").
     * We iterate through each possible center and expand outwards to find the longest palindrome.
     *
     * Time Complexity: O(N^2)
     *   - We iterate N times for each possible center.
     *   - In each iteration, expanding outwards can take up to O(N) time.
     * Space Complexity: O(1)
     *   - Only a few variables are used to store indices and length.
     *
     * @param s The input string.
     * @return The longest palindromic substring.
     */
    public static String longestPalindromeExpandAroundCenter(String s) {
        if (s == null || s.length() < 1) {
            return "";
        }

        int start = 0; // Start index of the longest palindrome found
        int maxLength = 0; // Length of the longest palindrome found

        // Iterate through each character, treating it as a potential center
        for (int i = 0; i < s.length(); i++) {
            // Case 1: Odd length palindromes (e.g., "aba"), center is s[i]
            // Expand around s[i] as the center (i, i)
            int len1 = expandAroundCenter(s, i, i);

            // Case 2: Even length palindromes (e.g., "abba"), center is s[i] and s[i+1]
            // Expand around the space between s[i] and s[i+1] (i, i+1)
            int len2 = expandAroundCenter(s, i, i + 1);

            // Get the maximum length palindrome from these two cases
            int currentMaxLen = Math.max(len1, len2);

            // If the current palindrome is longer than the previously found longest, update
            if (currentMaxLen > maxLength) {
                maxLength = currentMaxLen;
                // Calculate the new start index.
                // For a length `L` and center `i` (odd length: i,i), `start = i - (L-1)/2`
                // For a length `L` and center `i, i+1` (even length: i,i+1), `start = i - (L/2 - 1)`
                // Both can be generalized as `start = i - (maxLength - 1) / 2`
                start = i - (maxLength - 1) / 2;
            }
        }

        // Extract the longest palindromic substring using the calculated start and maxLength
        return s.substring(start, start + maxLength);
    }

    /**
     * Helper method to expand around a given center and return the length of the palindrome.
     *
     * @param s     The input string.
     * @param left  The left pointer (center or left part of the center).
     * @param right The right pointer (center or right part of the center).
     * @return The length of the palindrome found by expanding from left and right.
     */
    private static int expandAroundCenter(String s, int left, int right) {
        // As long as the pointers are within bounds and characters match, expand outwards
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;  // Move left pointer to the left
            right++; // Move right pointer to the right
        }
        // The length of the palindrome is (right - 1) - (left + 1) + 1 = right - left - 1
        return right - left - 1;
    }


    /*
     * =========================================================================
     * PROBLEM 2: GROUP ANAGRAMS
     * Given an array of strings strs, group the anagrams together.
     * You can return the answer in any order.
     * An Anagram is a word or phrase formed by rearranging the letters of a
     * different word or phrase, typically using all the original letters exactly once.
     * =========================================================================
     */

    /**
     * Approach: Character Count Array as Key
     * This approach uses a hash map where the key is a unique representation of the character
     * counts for an anagram, and the value is a list of strings that share that character count.
     *
     * Time Complexity: O(N * K)
     *   - N is the number of strings in the input array.
     *   - K is the maximum length of a string.
     *   - For each string, we iterate K times to build its character count array (O(K)).
     *   - Building the string key from the char count array is also O(K).
     *   - Hash map operations (put/get) take O(1) on average.
     * Space Complexity: O(N * K)
     *   - The hash map stores lists of strings. In the worst case, all strings are distinct
     *     anagrams, storing N strings. Each string has length K.
     *   - The character count array (or string representation of it) takes O(alphabet_size) which is constant (26 for lowercase English letters).
     *     So, total space is dominated by storing the output lists.
     *
     * @param strs An array of strings.
     * @return A map where keys are canonical forms of anagrams and values are lists of anagrams.
     */
    public static Map<String, List<String>> groupAnagrams(String[] strs) {
        if (strs == null || strs.length == 0) {
            return new HashMap<>();
        }

        Map<String, List<String>> anagramGroups = new HashMap<>();

        for (String s : strs) {
            // Create a character count array for the current string
            // For lowercase English letters 'a' through 'z'
            int[] charCounts = new int[26];
            for (char c : s.toCharArray()) {
                charCounts[c - 'a']++;
            }

            // Build a unique key from the character count array.
            // A StringBuilder is used for efficient string construction.
            // Example key: "#1#0#0#1..." for counts of a, b, c, d...
            StringBuilder keyBuilder = new StringBuilder();
            for (int count : charCounts) {
                keyBuilder.append("#").append(count);
            }
            String key = keyBuilder.toString();

            // Add the current string to the list corresponding to its key
            // If the key doesn't exist, compute a new ArrayList for it
            anagramGroups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }

        // If the problem requires returning List<List<String>>:
        // return new ArrayList<>(anagramGroups.values());

        return anagramGroups;
    }

    /**
     * Alternative Approach: Sorting Each String as Key (Discussed)
     * This approach also uses a hash map. Instead of a character count array,
     * it sorts each string alphabetically and uses the sorted string as the key.
     *
     * Time Complexity: O(N * K log K)
     *   - N is the number of strings.
     *   - K is the maximum length of a string.
     *   - Sorting a string of length K takes O(K log K).
     *   - This is generally slower than O(N * K) for character counting,
     *     especially for larger K, but simpler to implement.
     * Space Complexity: O(N * K)
     *   - Same as character count method, dominated by storing the output lists.
     *   - `toCharArray()` and `new String(charArray)` might also create temporary char arrays.
     */
    public static Map<String, List<String>> groupAnagramsSorting(String[] strs) {
        if (strs == null || strs.length == 0) {
            return new HashMap<>();
        }

        Map<String, List<String>> anagramGroups = new HashMap<>();

        for (String s : strs) {
            char[] charArray = s.toCharArray();
            Arrays.sort(charArray); // Sort the character array
            String sortedKey = new String(charArray); // Convert back to string to use as key

            // Add the current string to the list corresponding to its sorted key
            anagramGroups.computeIfAbsent(sortedKey, k -> new ArrayList<>()).add(s);
        }
        return anagramGroups;
    }


    /*
     * =========================================================================
     * PROBLEM 3: MINIMUM WINDOW SUBSTRING
     * Given two strings s and t of lengths m and n respectively, return the
     * minimum window substring of s such that every character in t (including
     * duplicates) is included in the window. If there is no such substring,
     * return the empty string "".
     * The testcases will be generated such that the answer is unique.
     * A substring is a contiguous sequence of characters within the string.
     * =========================================================================
     */

    /**
     * Approach: Sliding Window with Two Hash Maps
     * This method uses a sliding window (defined by `left` and `right` pointers)
     * and two frequency maps:
     * 1. `targetCharCounts`: Stores the required character counts from string `t`.
     * 2. `windowCharCounts`: Stores the character counts within the current window `s[left...right]`.
     *
     * The algorithm expands the `right` pointer, updating `windowCharCounts`.
     * It then tries to contract the `left` pointer as much as possible while
     * still satisfying the condition that all characters of `t` are covered.
     *
     * Time Complexity: O(N + M)
     *   - N is the length of string `s`.
     *   - M is the length of string `t`.
     *   - The `right` pointer traverses `s` once (O(N)).
     *   - The `left` pointer traverses `s` once in the worst case (O(N)).
     *   - Initializing `targetCharCounts` takes O(M).
     *   - Hash map operations (put/get/remove) are O(1) on average for ASCII characters.
     * Space Complexity: O(1) (or O(alphabet_size))
     *   - The hash maps store at most `alphabet_size` entries (e.g., 256 for extended ASCII).
     *   - This space is constant regardless of input string lengths.
     *
     * @param s The source string.
     * @param t The target pattern string.
     * @return The minimum window substring, or "" if not found.
     */
    public static String minWindowSubstring(String s, String t) {
        if (t.isEmpty()) { // If t is empty, any window is a valid minimum window, but problem implies it's non-empty. Returning "" as per common interpretation.
            return "";
        }
        if (s.isEmpty()) {
            return "";
        }

        // Map to store character counts of string t (the required characters)
        // Key: character, Value: count
        Map<Character, Integer> targetCharCounts = new HashMap<>();
        for (char c : t.toCharArray()) {
            targetCharCounts.put(c, targetCharCounts.getOrDefault(c, 0) + 1);
        }

        // Map to store character counts of the current window in string s
        Map<Character, Integer> windowCharCounts = new HashMap<>();

        int left = 0;       // Left pointer of the sliding window
        int formed = 0;     // Number of unique characters in the window that match the count in targetCharCounts
                            // A character `c` in `windowCharCounts` is 'formed' if its count
                            // is >= its required count in `targetCharCounts`.
        int minLength = Integer.MAX_VALUE; // Stores the length of the smallest window found
        int minStart = 0;   // Stores the starting index of the smallest window found

        // `requiredUniqueChars` counts the number of unique characters in `t` that must be found.
        int requiredUniqueChars = targetCharCounts.size();

        // Iterate with the right pointer to expand the window
        for (int right = 0; right < s.length(); right++) {
            char currentChar = s.charAt(right);

            // Add the current character to the window's character count
            windowCharCounts.put(currentChar, windowCharCounts.getOrDefault(currentChar, 0) + 1);

            // Check if the current character (and its count) satisfies a requirement from 't'
            // If currentChar is in targetCharCounts AND its count in windowCharCounts
            // now meets or exceeds its required count in targetCharCounts
            if (targetCharCounts.containsKey(currentChar) &&
                    windowCharCounts.get(currentChar).intValue() == targetCharCounts.get(currentChar).intValue()) {
                formed++; // Increment the count of satisfied unique characters
            }

            // While all required unique characters are formed, try to shrink the window from the left
            while (formed == requiredUniqueChars && left <= right) {
                // Update minimum window if current window is smaller
                if (right - left + 1 < minLength) {
                    minLength = right - left + 1;
                    minStart = left;
                }

                char leftChar = s.charAt(left);

                // Remove the leftmost character from the window
                windowCharCounts.put(leftChar, windowCharCounts.get(leftChar) - 1);

                // If the leftChar was a required character AND its count in the window
                // now drops below its required count in targetCharCounts, decrement 'formed'
                if (targetCharCounts.containsKey(leftChar) &&
                        windowCharCounts.get(leftChar).intValue() < targetCharCounts.get(leftChar).intValue()) {
                    formed--; // This character is no longer fully "formed"
                }

                left++; // Shrink the window by moving the left pointer
            }
        }

        // If minLength is still MAX_VALUE, no valid window was found
        return (minLength == Integer.MAX_VALUE) ? "" : s.substring(minStart, minStart + minLength);
    }


    /*
     * =========================================================================
     * PROBLEM 4: STRING TO INTEGER (atoi)
     * Implement the myAtoi(string s) function, which converts a string to a
     * 32-bit signed integer (similar to C/C++'s atoi function).
     *
     * The algorithm for myAtoi(string s) is as follows:
     * 1. Read in and ignore any leading whitespace.
     * 2. Check if the next character is '-' or '+'. Read this character in if it is either.
     *    This determines the sign of the integer. If neither is present, assume positive.
     * 3. Read in next the digits until the next non-digit character or the end of the input is reached.
     *    The digits should be interpreted as a numerical value.
     * 4. If no digits were read, then the integer will be 0.
     * 5. Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If the numerical value
     *    is out of the range of a 32-bit signed integer [-2^31, 2^31 - 1], then clamp the number
     *    to be either -2^31 or 2^31 - 1.
     * 6. Return the integer as the final result.
     * =========================================================================
     */

    /**
     * Approach: Robust Parsing with Edge Case Handling and Overflow Checks
     * This implementation carefully follows the `atoi` specification, handling:
     * 1. Leading whitespace.
     * 2. Optional sign (+ or -).
     * 3. Digit parsing.
     * 4. Non-digit character termination.
     * 5. No digits found (result 0).
     * 6. Integer overflow/underflow clamping to `Integer.MAX_VALUE` or `Integer.MIN_VALUE`.
     *
     * Time Complexity: O(N)
     *   - We iterate through the string at most once.
     * Space Complexity: O(1)
     *   - Only a few variables are used.
     *
     * @param s The input string.
     * @return The 32-bit signed integer result.
     */
    public static int stringToIntegerAtoi(String s) {
        if (s == null || s.isEmpty()) {
            return 0;
        }

        int i = 0;
        int n = s.length();

        // 1. Read in and ignore any leading whitespace.
        while (i < n && s.charAt(i) == ' ') {
            i++;
        }

        // If all characters were whitespace or string is empty after trimming
        if (i == n) {
            return 0;
        }

        // 2. Check if the next character is '-' or '+'.
        int sign = 1; // Default to positive
        if (s.charAt(i) == '-') {
            sign = -1;
            i++;
        } else if (s.charAt(i) == '+') {
            i++;
        }

        // After sign, if it's another sign, or not a digit, it's invalid
        // (e.g. " +-1" or " -+413" are invalid, '++1' etc are too if parsed strictly)
        // The problem statement implies we stop at the first non-sign/non-digit after whitespace.
        // For " +-1", the current interpretation stops at ' '.
        // For "+-1", it's problematic. Standard atoi usually stops at second sign.
        // Let's ensure no double sign here or non-digit immediately after sign.
        if (i < n && !Character.isDigit(s.charAt(i))) {
             // If we have a sign and then a non-digit, or multiple signs (e.g., "-+"), then it's not a number.
             // Based on common interpretations of atoi, " +-1" would lead to 0 because ' ' after '+'/'-' is invalid.
             // For strict implementation of "no digits were read", and the current char is not a digit, return 0.
            return 0;
        }


        long result = 0; // Use long to prevent intermediate overflow during calculation

        // 3. Read in next the digits until the next non-digit character or the end of the input is reached.
        while (i < n && Character.isDigit(s.charAt(i))) {
            int digit = s.charAt(i) - '0';

            // Check for overflow BEFORE adding the new digit and multiplying.
            // If positive and (result > MAX/10 OR (result == MAX/10 AND digit > MAX%10))
            if (sign == 1 && (result > Integer.MAX_VALUE / 10 || (result == Integer.MAX_VALUE / 10 && digit > 7))) {
                return Integer.MAX_VALUE;
            }
            // If negative and (result < MIN/10 OR (result == MIN/10 AND digit > ABS(MIN%10) == 8))
            // Note: Integer.MIN_VALUE = -2147483648, ABS(MIN%10) = 8
            // Integer.MAX_VALUE = 2147483647, MAX%10 = 7
            if (sign == -1 && (result > Integer.MAX_VALUE / 10 || (result == Integer.MAX_VALUE / 10 && digit > 8))) {
                // If the number is negative, we're comparing absolute values
                // If current 'result' (positive accumulator) exceeds MAX_VALUE equivalent
                // Or if it equals MAX_VALUE/10 and the next digit causes overflow for negative numbers (which is 8)
                // then clamp to MIN_VALUE.
                return Integer.MIN_VALUE;
            }

            result = result * 10 + digit;
            i++;
        }

        // 5. Convert these digits into an integer and apply sign.
        // The clamping is done during the loop. Final check on the result.
        // If result * sign is still out of bounds, clamp.
        // This final check is mostly for cases where result * sign fits into long,
        // but not into int (e.g., if result was MAX_VALUE+1, handled by prior checks).
        // For robustness, consider `long finalVal = result * sign;`
        // if (finalVal > Integer.MAX_VALUE) return Integer.MAX_VALUE;
        // if (finalVal < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        // return (int) finalVal;

        // Given the overflow checks inside the loop against `Integer.MAX_VALUE` and `Integer.MIN_VALUE` (using `MAX_VALUE`
        // for comparison on positive `result` which represents absolute value), the `result` should not exceed `Integer.MAX_VALUE`
        // at this point. So direct cast with sign application is safe.
        return (int) (result * sign);
    }
}
```