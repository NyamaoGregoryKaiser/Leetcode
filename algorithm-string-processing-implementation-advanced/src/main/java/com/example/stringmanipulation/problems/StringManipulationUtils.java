```java
package com.example.stringmanipulation.problems;

/**
 * A utility class for common string manipulation operations,
 * primarily used to support other problem solutions.
 */
public class StringManipulationUtils {

    /**
     * Checks if a substring from 'start' to 'end' (inclusive) of a given string is a palindrome.
     *
     * @param s The input string.
     * @param start The starting index of the substring.
     * @param end The ending index of the substring.
     * @return true if the substring is a palindrome, false otherwise.
     *
     * Time Complexity: O(end - start + 1) = O(L) where L is the length of the substring.
     * Space Complexity: O(1)
     */
    public static boolean isPalindrome(String s, int start, int end) {
        if (s == null || start < 0 || end >= s.length() || start > end) {
            // Handle invalid ranges or null string gracefully based on requirements.
            // For general palindrome check, usually we assume valid indices.
            // Returning false or throwing IllegalArgumentException are valid choices.
            return false; // Or throw new IllegalArgumentException("Invalid range or string for palindrome check.");
        }

        while (start < end) {
            if (s.charAt(start) != s.charAt(end)) {
                return false;
            }
            start++;
            end--;
        }
        return true;
    }

    /**
     * Checks if an entire string is a palindrome.
     * Convenience method leveraging the substring palindrome check.
     *
     * @param s The input string.
     * @return true if the string is a palindrome, false otherwise.
     *
     * Time Complexity: O(N) where N is the length of the string.
     * Space Complexity: O(1)
     */
    public static boolean isPalindrome(String s) {
        if (s == null || s.isEmpty()) {
            return true; // Empty string or null is considered a palindrome
        }
        return isPalindrome(s, 0, s.length() - 1);
    }

    /**
     * Swaps two characters in a character array.
     *
     * @param chars The character array.
     * @param i The index of the first character.
     * @param j The index of the second character.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public static void swap(char[] chars, int i, int j) {
        char temp = chars[i];
        chars[i] = chars[j];
        chars[j] = temp;
    }

    // You could add more utility methods here as needed, e.g.:
    // - Character frequency counting
    // - String reversal
    // - etc.
}
```