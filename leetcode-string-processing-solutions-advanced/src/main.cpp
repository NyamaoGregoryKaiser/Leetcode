```cpp
#include "algorithms.h"
#include "helpers.h"
#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::sort

void demonstrateLongestPalindrome() {
    std::cout << "--- Longest Palindromic Substring ---\n";
    std::vector<std::string> testStrings = {"babad", "cbbd", "a", "ac", "racecar", "madam"};

    for (const std::string& s : testStrings) {
        std::cout << "Input: \"" << s << "\"\n";
        std::cout << "  Expand Around Center: \"" << StringAlgorithms::longestPalindromeExpandAroundCenter(s) << "\"\n";
        std::cout << "  Dynamic Programming:  \"" << StringAlgorithms::longestPalindromeDP(s) << "\"\n";
    }
    std::cout << "\n";
}

void demonstrateMinWindowSubstring() {
    std::cout << "--- Minimum Window Substring ---\n";
    std::vector<std::pair<std::string, std::string>> testCases = {
        {"ADOBECODEBANC", "ABC"},
        {"a", "a"},
        {"a", "aa"},
        {"", "a"},
        {"aa", "a"},
        {"AbcDEFg", "bEg"}
    };

    for (const auto& tc : testCases) {
        std::cout << "S: \"" << tc.first << "\", T: \"" << tc.second << "\"\n";
        std::cout << "  Result: \"" << StringAlgorithms::minWindowSubstring(tc.first, tc.second) << "\"\n";
    }
    std::cout << "\n";
}

void demonstrateMyAtoi() {
    std::cout << "--- String to Integer (atoi) ---\n";
    std::vector<std::string> testStrings = {
        "42",
        "   -42",
        "4193 with words",
        "words and 987",
        "-91283472332", // Overflow negative
        "2147483647",   // INT_MAX
        "2147483648",   // Overflow positive
        "-2147483648",  // INT_MIN
        "-2147483649",  // Overflow negative
        "+1",
        "  0000000000012345678",
        "",
        "  ",
        "+-12" // Invalid input according to problem description (sign once) -> 0
    };

    for (const std::string& s : testStrings) {
        std::cout << "Input: \"" << s << "\"\n";
        std::cout << "  Result: " << StringAlgorithms::myAtoi(s) << "\n";
    }
    std::cout << "\n";
}

void demonstrateGroupAnagrams() {
    std::cout << "--- Group Anagrams ---\n";
    std::vector<std::vector<std::string>> testCases = {
        {"eat", "tea", "tan", "ate", "nat", "bat"},
        {""},
        {"a"},
        {"", "", "foo", "oof"},
        {"hello", "world", "olleh", "lorwd"}
    };

    // Helper to print and sort results for consistent comparison
    auto print_and_sort_groups = [](const std::vector<std::vector<std::string>>& groups) {
        std::vector<std::vector<std::string>> sorted_groups = groups;
        // Sort each inner vector
        for (auto& group : sorted_groups) {
            std::sort(group.begin(), group.end());
        }
        // Sort the outer vector based on the first element of inner vectors
        std::sort(sorted_groups.begin(), sorted_groups.end(), [](const auto& a, const auto& b) {
            if (a.empty() && b.empty()) return false;
            if (a.empty()) return true;
            if (b.empty()) return false;
            return a[0] < b[0];
        });

        for (const auto& group : sorted_groups) {
            print_vector(group);
        }
    };

    for (const auto& strs : testCases) {
        std::cout << "Input: ";
        print_vector(strs);

        std::cout << "  Sorted String as Key:\n";
        std::vector<std::vector<std::string>> res1 = StringAlgorithms::groupAnagramsSortedString(strs);
        print_and_sort_groups(res1);

        std::cout << "  Frequency Array as Key:\n";
        std::vector<std::vector<std::string>> res2 = StringAlgorithms::groupAnagramsFrequencyArray(strs);
        print_and_sort_groups(res2);
        std::cout << "\n";
    }
    std::cout << "\n";
}


int main() {
    std::cout << "--- String Manipulation Interview Project Demonstrations ---\n\n";

    demonstrateLongestPalindrome();
    demonstrateMinWindowSubstring();
    demonstrateMyAtoi();
    demonstrateGroupAnagrams();

    std::cout << "--- Demonstrations Complete ---\n";
    return 0;
}

```