```cpp
#ifndef ALGORITHMS_H
#define ALGORITHMS_H

#include <string>
#include <vector>

// Forward declaration of helper functions/structs if needed, or include helpers.h
// #include "helpers.h"

// A class to encapsulate string manipulation algorithms
class StringAlgorithms {
public:
    // Problem 1: Longest Palindromic Substring
    // Given a string s, return the longest palindromic substring in s.

    // Approach 1: Expand Around Center
    // Time: O(N^2), Space: O(1)
    static std::string longestPalindromeExpandAroundCenter(const std::string& s);

    // Approach 2: Dynamic Programming
    // Time: O(N^2), Space: O(N^2)
    static std::string longestPalindromeDP(const std::string& s);


    // Problem 2: Minimum Window Substring
    // Given two strings s and t of lengths N and M respectively, return the minimum window substring of s
    // such that every character in t (including duplicates) is included in the window. If there is no such window, return an empty string.

    // Optimal Approach: Sliding Window with Hash Maps
    // Time: O(N + M), Space: O(k) (k is alphabet size)
    static std::string minWindowSubstring(const std::string& s, const std::string& t);


    // Problem 3: String to Integer (atoi)
    // Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.
    // The function must first discard as many whitespace characters as possible until the first non-whitespace character is found.
    // Then, it reads an optional initial plus or minus sign, followed by as many numerical digits as possible, and interprets them as a numerical value.
    // The string can contain additional characters after these numerical characters, which should be ignored.
    // If no valid conversion could be performed, a zero value is returned.
    // The integer must be in the range [-2^31, 2^31 - 1].

    // Optimal Approach: Careful Parsing with Overflow Checks
    // Time: O(N), Space: O(1)
    static int myAtoi(const std::string& s);


    // Problem 4: Group Anagrams
    // Given an array of strings strs, group the anagrams together. You can return the answer in any order.
    // An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
    // typically using all the original letters exactly once.

    // Approach 1: Using Sorted String as Key (std::map)
    // Time: O(N * L * log L), Space: O(N * L)
    static std::vector<std::vector<std::string>> groupAnagramsSortedString(const std::vector<std::string>& strs);

    // Approach 2: Using Frequency Array as Key (std::unordered_map with custom hash)
    // Time: O(N * (L + k)), Space: O(N * (L + k)) (k is alphabet size)
    static std::vector<std::vector<std::string>> groupAnagramsFrequencyArray(const std::vector<std::string>& strs);
};

#endif // ALGORITHMS_H
```