```cpp
#include "gtest/gtest.h"
#include "../src/algorithms.h" // Include algorithms.h from parent directory's src folder
#include <vector>
#include <string>
#include <algorithm> // For std::sort

// Helper function to sort nested vectors of strings for comparison in tests
std::vector<std::vector<std::string>> sort_anagram_groups(std::vector<std::vector<std::string>> groups) {
    for (auto& group : groups) {
        std::sort(group.begin(), group.end());
    }
    std::sort(groups.begin(), groups.end(), [](const auto& a, const auto& b) {
        if (a.empty() && b.empty()) return false;
        if (a.empty()) return true; // Empty group comes first
        if (b.empty()) return false;
        return a[0] < b[0]; // Sort by first element of each group
    });
    return groups;
}


// Test Suite for Longest Palindromic Substring
TEST(LongestPalindromicSubstringTest, ExpandAroundCenter) {
    EXPECT_EQ(StringAlgorithms::longestPalindromeExpandAroundCenter("babad"), "bab"); // "aba" is also valid
    EXPECT_EQ(StringAlgorithms::longestPalindromeExpandAroundCenter("cbbd"), "bb");
    EXPECT_EQ(StringAlgorithms::longestPalindromeExpandAroundCenter("a"), "a");
    EXPECT_EQ(StringAlgorithms::longestPalindromeExpandAroundCenter("ac"), "a"); // or "c"
    EXPECT_EQ(StringAlgorithms::longestPalindromeExpandAroundCenter("racecar"), "racecar");
    EXPECT_EQ(StringAlgorithms::longestPalindromeExpandAroundCenter("madam"), "madam");
    EXPECT_EQ(StringAlgorithms::longestPalindromeExpandAroundCenter(""), "");
    EXPECT_EQ(StringAlgorithms::longestPalindromeExpandAroundCenter("aaaa"), "aaaa");
    EXPECT_EQ(StringAlgorithms::longestPalindromeExpandAroundCenter("forgeeksskeegfor"), "geeksskeeg");
    EXPECT_EQ(StringAlgorithms::longestPalindromeExpandAroundCenter("bananas"), "anana");
    EXPECT_EQ(StringAlgorithms::longestPalindromeExpandAroundCenter("abcba"), "abcba");
    EXPECT_EQ(StringAlgorithms::longestPalindromeExpandAroundCenter("abccba"), "abccba");
}

TEST(LongestPalindromicSubstringTest, DynamicProgramming) {
    EXPECT_EQ(StringAlgorithms::longestPalindromeDP("babad"), "bab"); // "aba" is also valid
    EXPECT_EQ(StringAlgorithms::longestPalindromeDP("cbbd"), "bb");
    EXPECT_EQ(StringAlgorithms::longestPalindromeDP("a"), "a");
    EXPECT_EQ(StringAlgorithms::longestPalindromeDP("ac"), "a"); // or "c"
    EXPECT_EQ(StringAlgorithms::longestPalindromeDP("racecar"), "racecar");
    EXPECT_EQ(StringAlgorithms::longestPalindromeDP("madam"), "madam");
    EXPECT_EQ(StringAlgorithms::longestPalindromeDP(""), "");
    EXPECT_EQ(StringAlgorithms::longestPalindromeDP("aaaa"), "aaaa");
    EXPECT_EQ(StringAlgorithms::longestPalindromeDP("forgeeksskeegfor"), "geeksskeeg");
    EXPECT_EQ(StringAlgorithms::longestPalindromeDP("bananas"), "anana");
    EXPECT_EQ(StringAlgorithms::longestPalindromeDP("abcba"), "abcba");
    EXPECT_EQ(StringAlgorithms::longestPalindromeDP("abccba"), "abccba");
}


// Test Suite for Minimum Window Substring
TEST(MinWindowSubstringTest, BasicCases) {
    EXPECT_EQ(StringAlgorithms::minWindowSubstring("ADOBECODEBANC", "ABC"), "BANC");
    EXPECT_EQ(StringAlgorithms::minWindowSubstring("a", "a"), "a");
    EXPECT_EQ(StringAlgorithms::minWindowSubstring("a", "aa"), ""); // T has more 'a's than S
    EXPECT_EQ(StringAlgorithms::minWindowSubstring("a", ""), ""); // T is empty
    EXPECT_EQ(StringAlgorithms::minWindowSubstring("", "a"), ""); // S is empty
    EXPECT_EQ(StringAlgorithms::minWindowSubstring("aa", "a"), "a");
    EXPECT_EQ(StringAlgorithms::minWindowSubstring("AbcDEFg", "bEg"), "bcDEFg");
}

TEST(MinWindowSubstringTest, EdgeCases) {
    EXPECT_EQ(StringAlgorithms::minWindowSubstring("ADOBECODEBANC", "ADOBECODEBANC"), "ADOBECODEBANC");
    EXPECT_EQ(StringAlgorithms::minWindowSubstring("abcdefg", "xyz"), ""); // No common characters
    EXPECT_EQ(StringAlgorithms::minWindowSubstring("abcdefg", "abc"), "abc");
    EXPECT_EQ(StringAlgorithms::minWindowSubstring("ADOBECODEBANC", "AABC"), "ADOBECODEBA"); // AABC matches at start
}


// Test Suite for String to Integer (atoi)
TEST(MyAtoiTest, BasicConversions) {
    EXPECT_EQ(StringAlgorithms::myAtoi("42"), 42);
    EXPECT_EQ(StringAlgorithms::myAtoi("   -42"), -42);
    EXPECT_EQ(StringAlgorithms::myAtoi("4193 with words"), 4193);
    EXPECT_EQ(StringAlgorithms::myAtoi("words and 987"), 0);
    EXPECT_EQ(StringAlgorithms::myAtoi("+1"), 1);
    EXPECT_EQ(StringAlgorithms::myAtoi("0"), 0);
    EXPECT_EQ(StringAlgorithms::myAtoi("-0"), 0);
}

TEST(MyAtoiTest, OverflowCases) {
    EXPECT_EQ(StringAlgorithms::myAtoi("-91283472332"), INT_MIN); // Negative overflow
    EXPECT_EQ(StringAlgorithms::myAtoi("2147483647"), INT_MAX);   // Max int
    EXPECT_EQ(StringAlgorithms::myAtoi("2147483648"), INT_MAX);   // Positive overflow
    EXPECT_EQ(StringAlgorithms::myAtoi("-2147483648"), INT_MIN);  // Min int
    EXPECT_EQ(StringAlgorithms::myAtoi("-2147483649"), INT_MIN);  // Negative overflow beyond min
    EXPECT_EQ(StringAlgorithms::myAtoi("99999999999999999999"), INT_MAX); // Large positive string
    EXPECT_EQ(StringAlgorithms::myAtoi("-99999999999999999999"), INT_MIN); // Large negative string
}

TEST(MyAtoiTest, EdgeCases) {
    EXPECT_EQ(StringAlgorithms::myAtoi(""), 0);
    EXPECT_EQ(StringAlgorithms::myAtoi(" "), 0);
    EXPECT_EQ(StringAlgorithms::myAtoi("  "), 0);
    EXPECT_EQ(StringAlgorithms::myAtoi("+-12"), 0); // Invalid sign sequence
    EXPECT_EQ(StringAlgorithms::myAtoi("   +0 123"), 0); // Only first digits, then non-digit (space)
    EXPECT_EQ(StringAlgorithms::myAtoi("0000000000012345678"), 12345678);
    EXPECT_EQ(StringAlgorithms::myAtoi(" -123a456"), -123);
    EXPECT_EQ(StringAlgorithms::myAtoi("-.123"), 0); // No digit after sign
    EXPECT_EQ(StringAlgorithms::myAtoi("+"), 0);
    EXPECT_EQ(StringAlgorithms::myAtoi("-"), 0);
}


// Test Suite for Group Anagrams
TEST(GroupAnagramsTest, SortedStringKey) {
    std::vector<std::string> strs1 = {"eat", "tea", "tan", "ate", "nat", "bat"};
    std::vector<std::vector<std::string>> expected1 = {
        {"bat"}, {"eat", "tea", "ate"}, {"tan", "nat"}
    };
    EXPECT_EQ(sort_anagram_groups(StringAlgorithms::groupAnagramsSortedString(strs1)), sort_anagram_groups(expected1));

    std::vector<std::string> strs2 = {""};
    std::vector<std::vector<std::string>> expected2 = {{""}};
    EXPECT_EQ(sort_anagram_groups(StringAlgorithms::groupAnagramsSortedString(strs2)), sort_anagram_groups(expected2));

    std::vector<std::string> strs3 = {"a"};
    std::vector<std::vector<std::string>> expected3 = {{"a"}};
    EXPECT_EQ(sort_anagram_groups(StringAlgorithms::groupAnagramsSortedString(strs3)), sort_anagram_groups(expected3));

    std::vector<std::string> strs4 = {"", "", "foo", "oof"};
    std::vector<std::vector<std::string>> expected4 = {{"", ""}, {"foo", "oof"}};
    EXPECT_EQ(sort_anagram_groups(StringAlgorithms::groupAnagramsSortedString(strs4)), sort_anagram_groups(expected4));

    std::vector<std::string> strs5 = {"hello", "world", "olleh", "lorwd"};
    std::vector<std::vector<std::string>> expected5 = {{"hello", "olleh"}, {"lorwd", "world"}};
    EXPECT_EQ(sort_anagram_groups(StringAlgorithms::groupAnagramsSortedString(strs5)), sort_anagram_groups(expected5));

    std::vector<std::string> strs6 = {};
    std::vector<std::vector<std::string>> expected6 = {};
    EXPECT_EQ(sort_anagram_groups(StringAlgorithms::groupAnagramsSortedString(strs6)), sort_anagram_groups(expected6));
}

TEST(GroupAnagramsTest, FrequencyArrayKey) {
    std::vector<std::string> strs1 = {"eat", "tea", "tan", "ate", "nat", "bat"};
    std::vector<std::vector<std::string>> expected1 = {
        {"bat"}, {"eat", "tea", "ate"}, {"tan", "nat"}
    };
    EXPECT_EQ(sort_anagram_groups(StringAlgorithms::groupAnagramsFrequencyArray(strs1)), sort_anagram_groups(expected1));

    std::vector<std::string> strs2 = {""};
    std::vector<std::vector<std::string>> expected2 = {{""}};
    EXPECT_EQ(sort_anagram_groups(StringAlgorithms::groupAnagramsFrequencyArray(strs2)), sort_anagram_groups(expected2));

    std::vector<std::string> strs3 = {"a"};
    std::vector<std::vector<std::string>> expected3 = {{"a"}};
    EXPECT_EQ(sort_anagram_groups(StringAlgorithms::groupAnagramsFrequencyArray(strs3)), sort_anagram_groups(expected3));

    std::vector<std::string> strs4 = {"", "", "foo", "oof"};
    std::vector<std::vector<std::string>> expected4 = {{"", ""}, {"foo", "oof"}};
    EXPECT_EQ(sort_anagram_groups(StringAlgorithms::groupAnagramsFrequencyArray(strs4)), sort_anagram_groups(expected4));

    std::vector<std::string> strs5 = {"hello", "world", "olleh", "lorwd"};
    std::vector<std::vector<std::string>> expected5 = {{"hello", "olleh"}, {"lorwd", "world"}};
    EXPECT_EQ(sort_anagram_groups(StringAlgorithms::groupAnagramsFrequencyArray(strs5)), sort_anagram_groups(expected5));

    std::vector<std::string> strs6 = {};
    std::vector<std::vector<std::string>> expected6 = {};
    EXPECT_EQ(sort_anagram_groups(StringAlgorithms::groupAnagramsFrequencyArray(strs6)), sort_anagram_groups(expected6));
}

```