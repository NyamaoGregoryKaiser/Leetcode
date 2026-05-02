```cpp
#include "algorithms.h"
#include "helpers.h" // For ArrayHasher
#include <algorithm> // For std::min, std::max, std::sort, std::fill
#include <climits>   // For INT_MAX, INT_MIN
#include <unordered_map>
#include <map> // For std::map used in Group Anagrams alternative
#include <set> // For std::set (not used, but common)
#include <iostream> // For debugging, if needed

// Problem 1: Longest Palindromic Substring

// Approach 1: Expand Around Center
// Time Complexity: O(N^2) - For each character and each gap between characters,
//                  we expand outwards in the worst case up to N/2 times.
// Space Complexity: O(1) - No extra space proportional to N is used.
std::string StringAlgorithms::longestPalindromeExpandAroundCenter(const std::string& s) {
    if (s.empty()) {
        return "";
    }

    int start = 0; // Starting index of the longest palindrome found
    int maxLength = 1; // Length of the longest palindrome found

    // Helper lambda function to expand around a center
    // Takes left and right pointers, expands while characters match
    // Updates start and maxLength if a longer palindrome is found
    auto expandAndCheck = [&](int left, int right) {
        while (left >= 0 && right < s.length() && s[left] == s[right]) {
            if (right - left + 1 > maxLength) {
                maxLength = right - left + 1;
                start = left;
            }
            left--;
            right++;
        }
    };

    // Iterate through each character to consider it as a center for odd-length palindromes
    for (int i = 0; i < s.length(); ++i) {
        // Case 1: Odd length palindrome (center is s[i])
        // Example: "aba", center 'b' at index 1 -> expandAndCheck(1, 1)
        expandAndCheck(i, i);

        // Case 2: Even length palindrome (center is between s[i] and s[i+1])
        // Example: "abba", center between 'b' and 'b' -> expandAndCheck(1, 2)
        expandAndCheck(i, i + 1);
    }

    // Return the longest palindromic substring using the recorded start and maxLength
    return s.substr(start, maxLength);
}

// Approach 2: Dynamic Programming
// Time Complexity: O(N^2) - A nested loop iterates N*N times to fill the DP table.
// Space Complexity: O(N^2) - A 2D boolean array `dp` of size N*N is used.
std::string StringAlgorithms::longestPalindromeDP(const std::string& s) {
    int n = s.length();
    if (n == 0) {
        return "";
    }

    // dp[i][j] will be true if s[i...j] is a palindrome, false otherwise.
    // Initialize with false.
    std::vector<std::vector<bool>> dp(n, std::vector<bool>(n, false));

    int start = 0;       // Starting index of the longest palindrome found
    int maxLength = 1;   // Length of the longest palindrome found

    // All single characters are palindromes
    for (int i = 0; i < n; ++i) {
        dp[i][i] = true;
    }

    // Check for palindromes of length 2
    for (int i = 0; i < n - 1; ++i) {
        if (s[i] == s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLength = 2;
        }
    }

    // Check for palindromes of length 3 or more
    // k is the length of the substring
    for (int k = 3; k <= n; ++k) {
        // i is the starting index
        for (int i = 0; i <= n - k; ++i) {
            // j is the ending index of the substring s[i...j]
            int j = i + k - 1;

            // Condition for dp[i][j] to be true:
            // 1. Characters at the ends must match (s[i] == s[j])
            // 2. The inner substring s[i+1...j-1] must also be a palindrome (dp[i+1][j-1] == true)
            if (s[i] == s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                if (k > maxLength) {
                    start = i;
                    maxLength = k;
                }
            }
        }
    }

    return s.substr(start, maxLength);
}

// Problem 2: Minimum Window Substring

// Optimal Approach: Sliding Window with Hash Maps
// Time Complexity: O(N + M) where N is length of S and M is length of T.
//                  In the worst case, each character of S is visited twice by `left` and `right` pointers.
//                  Hash map operations are O(1) on average (assuming constant alphabet size).
// Space Complexity: O(k) where k is the number of unique characters in the alphabet (e.g., 256 for ASCII).
//                   Two hash maps (`charFreqT` and `windowFreq`) are used to store character frequencies.
std::string StringAlgorithms::minWindowSubstring(const std::string& s, const std::string& t) {
    int n = s.length();
    int m = t.length();

    if (m == 0 || n == 0 || m > n) {
        return "";
    }

    // charFreqT: stores character frequencies of string T
    std::unordered_map<char, int> charFreqT;
    for (char c : t) {
        charFreqT[c]++;
    }

    // windowFreq: stores character frequencies of the current window in S
    std::unordered_map<char, int> windowFreq;

    int left = 0;           // Left pointer of the sliding window
    int formed = 0;         // Number of unique characters in T that are present in the current window
                            // with required frequency (or more).
    int minLen = INT_MAX;   // Minimum length of the valid window found so far
    int minStart = 0;       // Starting index of the minimum window

    // Iterate with the right pointer to expand the window
    for (int right = 0; right < n; ++right) {
        char c_right = s[right];
        windowFreq[c_right]++; // Add current char to window

        // Check if the current char contributes to `formed` count
        // We only care about characters present in T, and if its frequency in window
        // matches its required frequency in T.
        if (charFreqT.count(c_right) && windowFreq[c_right] == charFreqT[c_right]) {
            formed++;
        }

        // Try to shrink the window from the left if all characters from T are matched
        // `formed` == `charFreqT.size()` means we have all unique characters of T in the window
        // with at least their required frequencies.
        while (formed == charFreqT.size() && left <= right) {
            // Update minLen if current window is smaller
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }

            char c_left = s[left];
            windowFreq[c_left]--; // Remove char from window (shrinking from left)

            // If the character removed from the left was a critical character (part of T)
            // and its frequency in the window drops below its required frequency in T,
            // then `formed` count decreases, indicating the window is no longer valid.
            if (charFreqT.count(c_left) && windowFreq[c_left] < charFreqT[c_left]) {
                formed--;
            }
            left++; // Move left pointer
        }
    }

    return (minLen == INT_MAX) ? "" : s.substr(minStart, minLen);
}

// Problem 3: String to Integer (atoi)

// Time Complexity: O(N) where N is the length of the string `s`.
//                  We iterate through the string at most twice (once for whitespace, once for digits).
// Space Complexity: O(1) - No extra space proportional to N is used.
int StringAlgorithms::myAtoi(const std::string& s) {
    long long result = 0; // Use long long to detect overflow before casting to int
    int sign = 1;
    int i = 0;
    int n = s.length();

    // 1. Skip leading whitespace
    while (i < n && s[i] == ' ') {
        i++;
    }

    // Handle case where string is all whitespace or empty
    if (i == n) {
        return 0;
    }

    // 2. Handle sign
    if (s[i] == '-' || s[i] == '+') {
        sign = (s[i] == '-') ? -1 : 1;
        i++;
    }

    // 3. Convert digits
    // Iterate while current character is a digit
    while (i < n && std::isdigit(s[i])) {
        int digit = s[i] - '0'; // Convert char to int digit

        // Check for overflow before multiplication
        // If (result * 10 + digit) would exceed INT_MAX or INT_MIN,
        // we detect it here.
        if (sign == 1 && (result > INT_MAX / 10 || (result == INT_MAX / 10 && digit > 7))) {
            // INT_MAX is 2147483647. If result is 214748364 and digit is 8 or 9, it overflows.
            // If result is > 214748364, it will definitely overflow.
            return INT_MAX;
        }
        if (sign == -1 && (result > -(long long)INT_MIN / 10 || (result == -(long long)INT_MIN / 10 && digit > 8))) {
            // INT_MIN is -2147483648. Its absolute value is 2147483648.
            // If result is 214748364 and digit is 9, for negative it overflows.
            // Note: -(long long)INT_MIN is required because INT_MIN's absolute value
            // cannot be represented by a positive int.
            return INT_MIN;
        }

        result = result * 10 + digit;
        i++;
    }

    // 4. Apply sign and return
    return static_cast<int>(result * sign);
}


// Problem 4: Group Anagrams

// Approach 1: Using Sorted String as Key (std::map)
// Time Complexity: O(N * L * log L) where N is the number of strings and L is the average length of a string.
//                  For each of N strings, we sort it (L log L) and then insert into a map (average O(log N) for std::map, or O(1) for unordered_map).
//                  Map operations are amortized O(1) for `std::unordered_map` but require a good hash function for the key.
//                  Using `std::map` as done here, insertion/lookup is O(log M) where M is the number of unique sorted keys. Max M=N.
// Space Complexity: O(N * L) - To store the sorted strings as keys and original strings as values.
std::vector<std::vector<std::string>> StringAlgorithms::groupAnagramsSortedString(const std::vector<std::string>& strs) {
    if (strs.empty()) {
        return {};
    }

    // std::map to store sorted string as key and a vector of original strings as value
    std::map<std::string, std::vector<std::string>> anagramGroups;

    for (const std::string& s : strs) {
        std::string key = s; // Make a copy to sort
        std::sort(key.begin(), key.end()); // Sort the copy
        anagramGroups[key].push_back(s);   // Add original string to the group corresponding to its sorted key
    }

    std::vector<std::vector<std::string>> result;
    // Iterate through the map and collect all groups
    for (const auto& pair : anagramGroups) {
        result.push_back(pair.second);
    }

    return result;
}

// Approach 2: Using Frequency Array as Key (std::unordered_map with custom hash)
// This is generally more efficient than sorting for fixed-alphabet characters (like lowercase English letters).
// Time Complexity: O(N * L + N * k) where N is number of strings, L is avg string length, k is alphabet size (26 for lowercase English).
//                  For each string, we iterate L times to build frequency array (O(L)).
//                  Then, hashing the frequency array takes O(k). Total O(N * (L+k)).
//                  `unordered_map` operations are O(1) on average.
// Space Complexity: O(N * L + N * k) - To store frequency arrays as keys and original strings as values.
//                   Each frequency array takes O(k) space.
std::vector<std::vector<std::string>> StringAlgorithms::groupAnagramsFrequencyArray(const std::vector<std::string>& strs) {
    if (strs.empty()) {
        return {};
    }

    // std::unordered_map with std::array<int, 26> as key and a vector of strings as value
    // Requires a custom hash function for std::array, defined in helpers.h
    std::unordered_map<std::array<int, 26>, std::vector<std::string>, ArrayHasher> anagramGroups;

    for (const std::string& s : strs) {
        std::array<int, 26> freq_array{}; // Initialize with zeros
        for (char c : s) {
            freq_array[c - 'a']++; // Increment count for each character
        }
        anagramGroups[freq_array].push_back(s); // Add original string to the group
    }

    std::vector<std::vector<std::string>> result;
    // Collect all groups from the hash map
    for (const auto& pair : anagramGroups) {
        result.push_back(pair.second);
    }

    return result;
}

```