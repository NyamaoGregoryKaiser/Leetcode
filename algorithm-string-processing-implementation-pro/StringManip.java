```java
package com.example;

import java.util.Arrays;

public class StringManip {

    // Problem 1: Reverse String
    public static String reverseString(String str) {
        // Approach 1: Using StringBuilder (most efficient)
        return new StringBuilder(str).reverse().toString();
    }

    public static String reverseStringRecursive(String str){
        if(str.isEmpty()){
            return str;
        }
        return reverseStringRecursive(str.substring(1)) + str.charAt(0);
    }

    // Problem 2: Palindrome Check
    public static boolean isPalindrome(String str) {
        // Approach 1: Two Pointers
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
    //Approach 2: Using StringBuilder
    public static boolean isPalindromeSB(String str){
        String reversed = new StringBuilder(str).reverse().toString();
        return str.equals(reversed);
    }

    // Problem 3: Longest Palindromic Substring
    public static String longestPalindromeSubstring(String str) {
        if (str == null || str.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < str.length(); i++) {
            int len1 = expandAroundCenter(str, i, i); //Odd length palindromes
            int len2 = expandAroundCenter(str, i, i + 1); //Even length palindromes

            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return str.substring(start, end + 1);
    }

    private static int expandAroundCenter(String s, int left, int right) {
        int L = left, R = right;
        while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) {
            L--;
            R++;
        }
        return R - L - 1;
    }


    public static void main(String[] args) {
        System.out.println("Reverse String: " + reverseString("hello"));
        System.out.println("Reverse String Recursive: " + reverseStringRecursive("hello"));
        System.out.println("Is Palindrome: " + isPalindrome("racecar"));
        System.out.println("Is Palindrome (SB): " + isPalindromeSB("A man, a plan, a canal: Panama"));
        System.out.println("Longest Palindromic Substring: " + longestPalindromeSubstring("babad"));

    }
}
```