```cpp
#include "utils.h"
#include <algorithm> // For std::sort
#include <numeric>   // For std::iota
#include <limits>    // For numeric_limits (Longest Consecutive Sequence)
#include <list>      // For MyHashMap chaining

// Alias for convenience
using namespace std;

namespace HashTableProblems {

// --- Problem 1: Two Sum ---
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.

// Approach 1: Brute Force
// Time Complexity: O(N^2) - Nested loops iterate through all pairs.
// Space Complexity: O(1) - No extra space used.
vector<int> twoSum_bruteForce(const vector<int>& nums, int target) {
    int n = nums.size();
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {}; // Should not reach here based on problem statement ("exactly one solution")
}

// Approach 2: Using a Hash Map (One Pass)
// This is the optimal solution.
// Time Complexity: O(N) - We iterate through the list once. For each element, hash map
//                      insertion and lookup take O(1) on average.
// Space Complexity: O(N) - In the worst case, we might store all N elements in the hash map.
vector<int> twoSum_hashMap(const vector<int>& nums, int target) {
    // Map to store (number -> index)
    unordered_map<int, int> num_to_index;
    int n = nums.size();

    for (int i = 0; i < n; ++i) {
        int complement = target - nums[i];
        // Check if the complement exists in the map
        if (num_to_index.count(complement)) {
            // Found the pair: complement's index and current index 'i'
            return {num_to_index[complement], i};
        }
        // If complement not found, add current number and its index to the map
        num_to_index[nums[i]] = i;
    }
    return {}; // Should not reach here
}


// --- Problem 2: Longest Consecutive Sequence ---
// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
// You must write an algorithm that runs in O(n) time.

// Optimal Approach: Using a Hash Set
// Time Complexity: O(N) on average. Although there's a nested while loop, each number
//                  is visited by the outer loop at most once as a potential start of a sequence,
//                  and by the inner loop at most once when it's part of a sequence.
//                  The `count` and `erase` operations on an `unordered_set` take O(1) on average.
// Space Complexity: O(N) - In the worst case, all unique elements are stored in the hash set.
int longestConsecutive(const vector<int>& nums) {
    if (nums.empty()) {
        return 0;
    }

    // Store all numbers in a hash set for O(1) average time lookups.
    unordered_set<int> num_set(nums.begin(), nums.end());
    int longest_sequence = 0;

    // Iterate through each number in the set
    // For each number, check if it's the start of a sequence.
    // A number `x` is the start of a sequence if `x-1` is not present in the set.
    for (int num : num_set) {
        if (num_set.count(num - 1) == 0) { // 'num' is a potential start of a sequence
            int current_num = num;
            int current_sequence_length = 1;

            // Increment current_num and check for consecutive elements
            while (num_set.count(current_num + 1)) {
                current_num++;
                current_sequence_length++;
            }
            longest_sequence = max(longest_sequence, current_sequence_length);
        }
    }
    return longest_sequence;
}

// Alternative (Less Optimal / Not O(N) but useful for comparison): Sorting
// Time Complexity: O(N log N) due to sorting.
// Space Complexity: O(1) or O(N) depending on sort implementation (in-place vs copy).
int longestConsecutive_sorting(vector<int> nums) { // pass by value to sort
    if (nums.empty()) return 0;

    sort(nums.begin(), nums.end());

    // Remove duplicates to simplify consecutive check. This is not strictly necessary but helps.
    nums.erase(unique(nums.begin(), nums.end()), nums.end());

    int longest_streak = 0;
    int current_streak = 0;

    for (size_t i = 0; i < nums.size(); ++i) {
        if (i == 0 || nums[i] == nums[i-1] + 1) {
            current_streak++;
        } else {
            current_streak = 1;
        }
        longest_streak = max(longest_streak, current_streak);
    }
    return longest_streak;
}


// --- Problem 3: Group Anagrams ---
// Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
// typically using all the original letters exactly once.

// Optimal Approach: Using a Hash Map with Sorted String as Key
// Time Complexity: O(N * K log K)
//                  N = number of strings in `strs`
//                  K = maximum length of a string
//                  For each string, we sort it (K log K) and then perform a hash map operation (O(1) on average).
// Space Complexity: O(N * K) - In the worst case, all strings are unique anagram groups,
//                   and we store each string's sorted version as a key and the original string.
vector<vector<string>> groupAnagrams(const vector<string>& strs) {
    // Map to store (sorted_string -> list_of_anagrams)
    unordered_map<string, vector<string>> anagram_groups;

    for (const string& s : strs) {
        string key = s; // Make a copy to sort
        sort(key.begin(), key.end()); // Sort the copy to create the canonical key
        anagram_groups[key].push_back(s); // Add original string to the group
    }

    // Collect all groups into the result vector
    vector<vector<string>> result;
    for (auto const& [key, val] : anagram_groups) {
        result.push_back(val);
    }
    return result;
}

// Alternative Key Generation: Character Count Array (for small alphabet like English lowercase)
// Time Complexity: O(N * K + N * A) where A is alphabet size (26 for lowercase English)
//                  K for iterating string, A for converting count array to string key.
//                  Overall still O(N * K) because A is constant.
// Space Complexity: O(N * K) + O(A) for temporary count array.
vector<vector<string>> groupAnagrams_charCountKey(const vector<string>& strs) {
    unordered_map<string, vector<string>> anagram_groups;

    for (const string& s : strs) {
        // Create a character count array for 'a' through 'z'
        array<int, 26> char_counts{}; // Initialize with zeros

        for (char c : s) {
            char_counts[c - 'a']++;
        }

        // Convert the count array to a string key (e.g., "#1#0#0#2..." for "aab")
        string key = "";
        for (int count : char_counts) {
            key += "#" + to_string(count);
        }
        anagram_groups[key].push_back(s);
    }

    vector<vector<string>> result;
    for (auto const& [key, val] : anagram_groups) {
        result.push_back(val);
    }
    return result;
}


// --- Problem 4: First Unique Character in a String ---
// Given a string s, find the first non-repeating character in it and return its index.
// If it does not exist, return -1.

// Optimal Approach: Two-Pass using Hash Map (Frequency Map)
// Time Complexity: O(N) - First pass to populate frequency map, second pass to find first unique.
// Space Complexity: O(1) - The map will store at most 26 (for lowercase English alphabet)
//                   or 256 (for extended ASCII) entries, which is constant.
int firstUniqChar(const string& s) {
    // Map to store character frequencies
    unordered_map<char, int> char_frequencies;

    // First pass: Populate frequencies
    for (char c : s) {
        char_frequencies[c]++;
    }

    // Second pass: Find the first character with frequency 1
    for (int i = 0; i < s.length(); ++i) {
        if (char_frequencies[s[i]] == 1) {
            return i;
        }
    }

    return -1; // No unique character found
}

// Alternative: Using a fixed-size array for character counts (more efficient for small alphabets)
// Time Complexity: O(N)
// Space Complexity: O(1) (array size 26 or 256 is constant)
int firstUniqChar_array(const string& s) {
    // Assuming lowercase English letters ('a' through 'z')
    // A size 256 array can handle full ASCII.
    array<int, 26> char_counts{}; // Initialize all to 0

    // First pass: Populate frequencies
    for (char c : s) {
        char_counts[c - 'a']++;
    }

    // Second pass: Find the first character with frequency 1
    for (int i = 0; i < s.length(); ++i) {
        if (char_counts[s[i] - 'a'] == 1) {
            return i;
        }
    }

    return -1; // No unique character found
}


// --- Problem 5: Design a Simple Hash Map (Concept & Basic Chaining) ---
// Implement a simplified HashMap with basic put, get, and remove functionalities.
// For this problem, we'll design a `MyHashMap` that uses chaining for collision resolution.
// Keys and values are integers. Assume non-negative keys.

class MyHashMap {
private:
    static const int BUCKET_SIZE = 1000; // A reasonable, fixed number of buckets for simplicity
    // Each bucket will be a list of key-value pairs
    vector<list<pair<int, int>>> buckets;

    // A simple hash function (modulo operation)
    int hash(int key) const {
        return key % BUCKET_SIZE;
    }

    // Helper to find an iterator to the key-value pair in a specific bucket
    list<pair<int, int>>::iterator find_in_bucket(int key, int h_idx) {
        for (auto it = buckets[h_idx].begin(); it != buckets[h_idx].end(); ++it) {
            if (it->first == key) {
                return it;
            }
        }
        return buckets[h_idx].end(); // Not found
    }

public:
    MyHashMap() : buckets(BUCKET_SIZE) {
        // Initialize all buckets as empty lists
    }

    // Value will always be non-negative.
    void put(int key, int value) {
        int h_idx = hash(key);
        auto it = find_in_bucket(key, h_idx);

        if (it != buckets[h_idx].end()) {
            // Key already exists, update its value
            it->second = value;
        } else {
            // Key does not exist, add new pair to the front of the list
            buckets[h_idx].push_front({key, value});
        }
    }

    // Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
    int get(int key) {
        int h_idx = hash(key);
        auto it = find_in_bucket(key, h_idx);

        if (it != buckets[h_idx].end()) {
            return it->second; // Key found, return its value
        }
        return -1; // Key not found
    }

    // Removes the mapping of the specified value key if this map contains a mapping for the key.
    void remove(int key) {
        int h_idx = hash(key);
        auto it = find_in_bucket(key, h_idx);

        if (it != buckets[h_idx].end()) {
            // Key found, erase it from the list
            buckets[h_idx].erase(it);
        }
    }
    
    // For testing/benchmarking: count elements
    int size() const {
        int count = 0;
        for (const auto& bucket : buckets) {
            count += bucket.size();
        }
        return count;
    }
};

} // namespace HashTableProblems
```