#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <algorithm> // For std::sort, std::min, std::max
#include <numeric>   // For std::iota (in some advanced use cases, not strictly here)
#include <limits>    // For numeric_limits (not strictly here, but useful)

/**
 * @file main_problems.cpp
 * @brief Implementations of various hash table problems for coding interviews.
 *
 * This file contains optimal and alternative solutions for several classic
 * hash table problems, along with detailed comments explaining the logic,
 * time complexity, and space complexity.
 */

// Forward declarations for utility functions if not included (though utils.hpp is included by tests/benchmarks)
// For standalone compilation of this file, you might need to implement or declare these here.
// For this project structure, it's assumed utils.hpp is available.

namespace HashTableProblems {

    // --- Problem 1: Two Sum ---
    // Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    // You may assume that each input would have exactly one solution, and you may not use the same element twice.

    /**
     * @brief Optimal solution for Two Sum using a hash map.
     *
     * This approach uses a hash map (`std::unordered_map`) to store numbers encountered
     * so far along with their indices. For each number `num` in the array, it calculates
     * the `complement` needed (`target - num`). It then checks if this `complement`
     * already exists in the hash map. If it does, we've found our pair, and we return
     * the current index and the index of the complement from the map.
     *
     * Time Complexity: O(N) - We iterate through the array once. Hash map insertions
     *                  and lookups take O(1) on average.
     * Space Complexity: O(N) - In the worst case, we might store all N numbers in
     *                   the hash map if no pair is found until the very end.
     *
     * @param nums The input array of integers.
     * @param target The target sum.
     * @return A vector containing the indices of the two numbers that sum up to target.
     */
    std::vector<int> twoSum_Optimal(const std::vector<int>& nums, int target) {
        // Map to store number -> index
        std::unordered_map<int, int> num_map;

        for (int i = 0; i < nums.size(); ++i) {
            int current_num = nums[i];
            int complement = target - current_num;

            // Check if the complement exists in our map
            if (num_map.count(complement)) {
                // If found, we have our pair. Return its index and the current index.
                return {num_map[complement], i};
            }

            // If not found, add the current number and its index to the map
            // This ensures we always look for a complement from *previous* elements,
            // preventing using the same element twice.
            num_map[current_num] = i;
        }

        // According to the problem statement, there's always exactly one solution.
        // This line should technically not be reached if the problem guarantees a solution.
        return {}; // Should not happen
    }

    /**
     * @brief Brute-force solution for Two Sum.
     *
     * This approach checks every possible pair of numbers in the array.
     * It uses nested loops to iterate through all combinations of two distinct indices.
     *
     * Time Complexity: O(N^2) - The outer loop runs N times, and the inner loop
     *                  runs N-1 times in the worst case.
     * Space Complexity: O(1) - No extra space proportional to input size is used.
     *
     * @param nums The input array of integers.
     * @param target The target sum.
     * @return A vector containing the indices of the two numbers that sum up to target.
     */
    std::vector<int> twoSum_BruteForce(const std::vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); ++i) {
            for (int j = i + 1; j < nums.size(); ++j) { // Start j from i+1 to avoid using same element twice
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {}; // Should not happen based on problem constraints
    }


    // --- Problem 2: Longest Consecutive Sequence ---
    // Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
    // Your algorithm should run in O(n) time.

    /**
     * @brief Optimal solution for Longest Consecutive Sequence using a hash set.
     *
     * The key idea is to store all numbers in a hash set (`std::unordered_set`) for O(1) average
     * time lookups. Then, iterate through the numbers. For each number, we check if it's the
     * *start* of a sequence. A number `num` is considered the start of a sequence if `num - 1`
     * is *not* present in the hash set. If `num - 1` is present, it means `num` is part of a
     * longer sequence starting earlier, so we can skip it.
     *
     * If `num` is a sequence start, we then increment `current_num` and check `current_num + 1`,
     * `current_num + 2`, and so on, in the hash set, counting the length of the sequence.
     *
     * Time Complexity: O(N) - While there are nested loops, each number is visited by the outer
     *                  loop once, and *if* it's the start of a sequence, it's also visited
     *                  by the inner `while` loop. However, each number is checked for existence
     *                  in the `unordered_set` at most a constant number of times (once by the
     *                  outer loop, and once by the inner loop if it's part of a sequence).
     *                  Therefore, the total work is proportional to N.
     * Space Complexity: O(N) - To store all numbers in the hash set.
     *
     * @param nums The input array of integers.
     * @return The length of the longest consecutive elements sequence.
     */
    int longestConsecutive_Optimal(const std::vector<int>& nums) {
        if (nums.empty()) {
            return 0;
        }

        // Store all numbers in a hash set for O(1) average time lookups.
        std::unordered_set<int> num_set(nums.begin(), nums.end());
        int longest_streak = 0;

        // Iterate through each number in the original input array.
        for (int num : nums) {
            // Check if the current number is the potential start of a sequence.
            // It's a start if 'num - 1' is NOT present in the set.
            if (num_set.find(num - 1) == num_set.end()) {
                int current_num = num;
                int current_streak = 1;

                // While the next number in sequence is found in the set, extend the streak.
                while (num_set.find(current_num + 1) != num_set.end()) {
                    current_num++;
                    current_streak++;
                }

                // Update the maximum streak found so far.
                longest_streak = std::max(longest_streak, current_streak);
            }
        }
        return longest_streak;
    }

    /**
     * @brief Alternative solution for Longest Consecutive Sequence using sorting.
     *
     * This approach first sorts the array, which brings consecutive elements together.
     * Then, it iterates through the sorted array, keeping track of the current streak
     * and the maximum streak.
     *
     * Time Complexity: O(N log N) - Dominated by the sorting step.
     * Space Complexity: O(1) or O(N) - Depends on the sorting algorithm used.
     *                   `std::sort` for `std::vector` typically uses IntroSort (hybrid)
     *                   which can be O(log N) or O(N) in worst-case for some implementations.
     *                   If in-place sort, it's O(1) auxiliary space. If not, O(N).
     *                   For simplicity, let's say O(1) auxiliary space, or O(N) if we consider a copy.
     *
     * @param nums The input array of integers.
     * @return The length of the longest consecutive elements sequence.
     */
    int longestConsecutive_Sorting(std::vector<int> nums) { // Pass by value to allow sorting
        if (nums.empty()) {
            return 0;
        }

        std::sort(nums.begin(), nums.end());

        int longest_streak = 1;
        int current_streak = 1;

        for (size_t i = 1; i < nums.size(); ++i) {
            if (nums[i] == nums[i-1]) {
                // Handle duplicates: they don't extend the streak but don't break it either.
                continue;
            } else if (nums[i] == nums[i-1] + 1) {
                // Current number is consecutive to the previous one.
                current_streak++;
            } else {
                // Sequence broken. Reset current streak.
                longest_streak = std::max(longest_streak, current_streak);
                current_streak = 1;
            }
        }
        // Update longest_streak one last time after the loop, in case the longest streak
        // was at the end of the array.
        longest_streak = std::max(longest_streak, current_streak);
        return longest_streak;
    }


    // --- Problem 3: Group Anagrams ---
    // Given an array of strings strs, group the anagrams together. You can return the answer in any order.
    // An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
    // typically using all the original letters exactly once.

    /**
     * @brief Optimal solution for Group Anagrams using a hash map.
     *
     * The core idea is that anagrams have the same characters with the same counts.
     * If we sort the characters of an anagram, they will all result in the same "canonical" string.
     * This canonical string can serve as a key in a hash map.
     *
     * We iterate through the input array of strings. For each string:
     * 1. Create its canonical form by sorting its characters.
     * 2. Use this canonical string as a key in an `std::unordered_map`.
     * 3. The value associated with this key will be a `std::vector<std::string>` that stores
     *    all original strings that produce this canonical form (i.e., all anagrams).
     * Finally, collect all values from the hash map into the result vector.
     *
     * Time Complexity: O(N * M log M)
     *   - N: number of strings in the input array.
     *   - M: average length of a string.
     *   - For each string, we sort it (M log M) and then perform a hash map operation (average O(1) for string key).
     * Space Complexity: O(N * M) - In the worst case, all strings are distinct and stored
     *                   in the hash map, plus their sorted keys.
     *
     * @param strs The input array of strings.
     * @return A vector of vectors of strings, where each inner vector contains a group of anagrams.
     */
    std::vector<std::vector<std::string>> groupAnagrams_Optimal(const std::vector<std::string>& strs) {
        // Map to store sorted string (canonical form) -> list of original anagrams
        std::unordered_map<std::string, std::vector<std::string>> anagram_groups;

        for (const std::string& s : strs) {
            std::string key = s; // Create a copy to sort
            std::sort(key.begin(), key.end()); // Sort characters to get canonical form
            anagram_groups[key].push_back(s);   // Add original string to the list for this key
        }

        // Collect all grouped anagrams from the map's values
        std::vector<std::vector<std::string>> result;
        for (auto const& [key, val] : anagram_groups) {
            result.push_back(val);
        }

        return result;
    }

    /**
     * @brief Alternative solution for Group Anagrams using character counts as key.
     *
     * Instead of sorting strings, we can use a frequency array (e.g., `int[26]`)
     * to represent the character counts for each string. This frequency array can then
     * be converted into a string (e.g., "1#0#0#1#..." for 'a', 'd') to serve as a key
     * in the hash map. This avoids the O(M log M) sorting cost for each string.
     *
     * Time Complexity: O(N * M)
     *   - N: number of strings.
     *   - M: average length of a string.
     *   - For each string, we iterate through its characters to build the frequency array (O(M)),
     *     and then convert the array to a string (O(AlphabetSize), which is constant, 26).
     *     Hash map operations are O(1) on average.
     * Space Complexity: O(N * M) - Similar to the sorting approach.
     *
     * @param strs The input array of strings.
     * @return A vector of vectors of strings, where each inner vector contains a group of anagrams.
     */
    std::vector<std::vector<std::string>> groupAnagrams_Counting(const std::vector<std::string>& strs) {
        std::unordered_map<std::string, std::vector<std::string>> anagram_groups;

        for (const std::string& s : strs) {
            // Use a fixed-size array for character counts (assuming lowercase English letters)
            std::vector<int> char_counts(26, 0);
            for (char c : s) {
                char_counts[c - 'a']++;
            }

            // Convert the count array to a string key
            std::string key = "";
            for (int count : char_counts) {
                key += std::to_string(count) + "#"; // E.g., "1#0#0#1#..."
            }
            anagram_groups[key].push_back(s);
        }

        std::vector<std::vector<std::string>> result;
        for (auto const& [key, val] : anagram_groups) {
            result.push_back(val);
        }
        return result;
    }


    // --- Problem 4: First Unique Character in a String ---
    // Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

    /**
     * @brief Optimal solution for First Unique Character using a frequency map and a second pass.
     *
     * This approach uses a frequency map (an `std::unordered_map<char, int>` or a `std::vector<int>`
     * if restricted to ASCII/lowercase letters) to count the occurrences of each character.
     *
     * In the first pass, we populate the frequency map.
     * In the second pass, we iterate through the string again. For each character, we check
     * its count in the frequency map. The first character encountered with a count of 1 is
     * our answer, and we return its index. If no such character is found after iterating
     * through the entire string, we return -1.
     *
     * Time Complexity: O(N) - Two passes over the string. Hash map operations are O(1) on average.
     * Space Complexity: O(K) where K is the size of the alphabet (e.g., 26 for lowercase English letters).
     *                   This is effectively O(1) if the alphabet size is constant and small.
     *
     * @param s The input string.
     * @return The index of the first non-repeating character, or -1 if none exists.
     */
    int firstUniqChar_Optimal(const std::string& s) {
        // Using a vector of size 26 for lowercase English letters is more efficient
        // than unordered_map for this specific constraint.
        // Stores counts of characters.
        std::vector<int> char_counts(26, 0);

        // First pass: Populate character counts
        for (char c : s) {
            char_counts[c - 'a']++;
        }

        // Second pass: Find the first character with a count of 1
        for (int i = 0; i < s.length(); ++i) {
            if (char_counts[s[i] - 'a'] == 1) {
                return i;
            }
        }

        return -1; // No unique character found
    }

    /**
     * @brief Brute-force solution for First Unique Character.
     *
     * For each character in the string, this approach checks the entire string
     * to see if that character appears anywhere else. If it finds a character
     * that appears only once, it returns its index.
     *
     * Time Complexity: O(N^2) - For each of N characters, we iterate through the string again (N times).
     * Space Complexity: O(1) - No extra space proportional to input size is used.
     *
     * @param s The input string.
     * @return The index of the first non-repeating character, or -1 if none exists.
     */
    int firstUniqChar_BruteForce(const std::string& s) {
        for (int i = 0; i < s.length(); ++i) {
            bool is_unique = true;
            for (int j = 0; j < s.length(); ++j) {
                // If it's not the same character at the same position, and characters match
                if (i != j && s[i] == s[j]) {
                    is_unique = false;
                    break;
                }
            }
            if (is_unique) {
                return i;
            }
        }
        return -1;
    }


    // --- Problem 5: Contains Duplicate ---
    // Given an integer array nums, return true if any value appears at least twice in the array,
    // and return false if every element is distinct.

    /**
     * @brief Optimal solution for Contains Duplicate using a hash set.
     *
     * This approach iterates through the array and attempts to insert each number
     * into a hash set (`std::unordered_set`). A hash set only stores unique elements.
     * If an insertion attempt fails (meaning the element is already present in the set),
     * it indicates a duplicate has been found, and we can immediately return `true`.
     * If the loop completes without finding any duplicates, it means all elements are distinct,
     * and we return `false`.
     *
     * Time Complexity: O(N) - We iterate through the array once. Hash set insertions and
     *                  lookups (checking for existence implicitly) take O(1) on average.
     * Space Complexity: O(N) - In the worst case, all elements are unique, and we store
     *                   all N numbers in the hash set.
     *
     * @param nums The input array of integers.
     * @return `true` if any value appears at least twice, `false` otherwise.
     */
    bool containsDuplicate_Optimal(const std::vector<int>& nums) {
        std::unordered_set<int> seen_numbers;

        for (int num : nums) {
            // If the number is already in the set, it's a duplicate.
            if (seen_numbers.count(num)) { // or seen_numbers.find(num) != seen_numbers.end()
                return true;
            }
            // Otherwise, add it to the set.
            seen_numbers.insert(num);
        }
        return false; // No duplicates found
    }

    /**
     * @brief Alternative solution for Contains Duplicate using sorting.
     *
     * This approach first sorts the array. After sorting, any duplicate elements
     * will be adjacent to each other. We then iterate through the sorted array
     * and compare adjacent elements. If two adjacent elements are equal, a duplicate
     * is found, and we return `true`. If the loop completes, no duplicates exist.
     *
     * Time Complexity: O(N log N) - Dominated by the sorting step.
     * Space Complexity: O(1) or O(N) - Depends on the sorting algorithm. `std::sort`
     *                   typically uses IntroSort and can be O(log N) auxiliary space
     *                   or O(N) in worst-case, but often O(1) if in-place.
     *
     * @param nums The input array of integers.
     * @return `true` if any value appears at least twice, `false` otherwise.
     */
    bool containsDuplicate_Sorting(std::vector<int> nums) { // Pass by value to allow sorting
        if (nums.size() <= 1) {
            return false; // No duplicates possible with 0 or 1 element
        }

        std::sort(nums.begin(), nums.end());

        for (size_t i = 0; i < nums.size() - 1; ++i) {
            if (nums[i] == nums[i+1]) {
                return true;
            }
        }
        return false;
    }

    /**
     * @brief Brute-force solution for Contains Duplicate.
     *
     * This approach compares every element with every other element in the array.
     * It uses nested loops to check all possible pairs.
     *
     * Time Complexity: O(N^2) - The outer loop runs N times, and the inner loop
     *                  runs N-1 times in the worst case.
     * Space Complexity: O(1) - No extra space proportional to input size is used.
     *
     * @param nums The input array of integers.
     * @return `true` if any value appears at least twice, `false` otherwise.
     */
    bool containsDuplicate_BruteForce(const std::vector<int>& nums) {
        for (size_t i = 0; i < nums.size(); ++i) {
            for (size_t j = i + 1; j < nums.size(); ++j) {
                if (nums[i] == nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }

} // namespace HashTableProblems