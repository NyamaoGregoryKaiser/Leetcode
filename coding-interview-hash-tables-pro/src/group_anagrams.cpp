#include "group_anagrams.h"
#include <array> // For std::array<int, 26>

namespace GroupAnagrams {

bool areAnagrams(const std::string& s1, const std::string& s2) {
    if (s1.length() != s2.length()) {
        return false;
    }

    // Use a frequency array for characters. Assuming lowercase English letters.
    // O(1) space (26 characters).
    std::array<int, 26> counts = {0};

    // Increment count for characters in s1
    for (char c : s1) {
        counts[c - 'a']++;
    }

    // Decrement count for characters in s2
    for (char c : s2) {
        counts[c - 'a']--;
        // If a count goes negative, it means s2 has more of that char than s1,
        // so they cannot be anagrams.
        if (counts[c - 'a'] < 0) {
            return false;
        }
    }

    // After checking all characters, all counts should be zero if they are anagrams.
    // (This check is implicitly covered by the negative check and length equality).
    return true; // If we reach here, all counts must be zero.
}


std::vector<std::vector<std::string>> groupAnagrams_bruteForce(const std::vector<std::string>& strs) {
    std::vector<std::vector<std::string>> result;
    if (strs.empty()) {
        return result;
    }

    // Keep track of strings that have already been grouped.
    std::vector<bool> visited(strs.size(), false);

    // Iterate through each string.
    for (size_t i = 0; i < strs.size(); ++i) {
        // If this string hasn't been grouped yet, start a new group.
        if (!visited[i]) {
            std::vector<std::string> current_group;
            current_group.push_back(strs[i]);
            visited[i] = true;

            // Compare this string with all subsequent strings.
            for (size_t j = i + 1; j < strs.size(); ++j) {
                // If a subsequent string is an anagram and hasn't been visited, add it to the group.
                if (!visited[j] && areAnagrams(strs[i], strs[j])) {
                    current_group.push_back(strs[j]);
                    visited[j] = true;
                }
            }
            result.push_back(current_group);
        }
    }

    return result;
}

std::vector<std::vector<std::string>> groupAnagrams_hashMap(const std::vector<std::string>& strs) {
    // A hash map where:
    // Key: The canonical form of an anagram (e.g., "aet" for "eat", "tea", "ate").
    // Value: A vector of strings that have this canonical form.
    std::unordered_map<std::string, std::vector<std::string>> anagram_groups;

    // Iterate through each string in the input.
    for (const std::string& s : strs) {
        // Create a copy of the string to sort it.
        std::string key = s;
        // Sort the string to get its canonical form.
        // For a string of length M, this takes O(M log M).
        std::sort(key.begin(), key.end());

        // Use the sorted string as the key to add the original string to the map.
        // If the key doesn't exist, a new vector will be created.
        // Hash map insertion/lookup is O(M) on average for string keys (due to hashing the string).
        anagram_groups[key].push_back(s);
    }

    // Collect all the groups from the hash map into the result vector.
    std::vector<std::vector<std::string>> result;
    for (auto const& pair : anagram_groups) {
        result.push_back(pair.second);
    }

    return result;
}

} // namespace GroupAnagrams