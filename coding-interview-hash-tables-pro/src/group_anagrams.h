#ifndef GROUP_ANAGRAMS_H
#define GROUP_ANAGRAMS_H

#include <vector>
#include <string>
#include <algorithm> // For std::sort
#include <unordered_map>

namespace GroupAnagrams {

/**
 * @brief Groups anagrams together using a brute-force approach.
 *
 * Compares each string with every other string to check if they are anagrams.
 * Uses a boolean array to keep track of visited strings to avoid redundant checks.
 *
 * @param strs The input vector of strings.
 * @return A vector of vectors of strings, where each inner vector contains a group of anagrams.
 *
 * Time Complexity: O(N^2 * M) - N^2 for comparing all pairs, M for checking if two strings are anagrams.
 * Space Complexity: O(N) - For the visited array and the result list.
 */
std::vector<std::vector<std::string>> groupAnagrams_bruteForce(const std::vector<std::string>& strs);

/**
 * @brief Groups anagrams together using a hash map.
 *
 * The core idea is that anagrams, when sorted alphabetically, will result in the same
 * canonical string. This sorted string can be used as a key in a hash map.
 * The value associated with each key will be a list of strings that share that canonical form.
 *
 * @param strs The input vector of strings.
 * @return A vector of vectors of strings, where each inner vector contains a group of anagrams.
 *
 * Time Complexity: O(N * M log M) - N iterations. In each iteration, sorting a string of length M
 *                    takes M log M. Hash map operations (insertion, lookup) are O(M) on average
 *                    (due to string hashing/comparison).
 * Space Complexity: O(N * M) - In the worst case, all strings are distinct anagram groups,
 *                    and each string (of length M) is stored in the hash map.
 */
std::vector<std::vector<std::string>> groupAnagrams_hashMap(const std::vector<std::string>& strs);

/**
 * @brief Helper function to check if two strings are anagrams.
 *
 * @param s1 The first string.
 * @param s2 The second string.
 * @return True if s1 and s2 are anagrams, false otherwise.
 *
 * Time Complexity: O(M) - Where M is the length of the strings. Uses a frequency array.
 * Space Complexity: O(1) - Constant space for the frequency array (26 for lowercase English letters).
 */
bool areAnagrams(const std::string& s1, const std::string& s2);

} // namespace GroupAnagrams

#endif // GROUP_ANAGRAMS_H