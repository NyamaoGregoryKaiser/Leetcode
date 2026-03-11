#include "../src/two_sum.h"
#include "../src/longest_consecutive_sequence.h"
#include "../src/group_anagrams.h"
#include "../src/lfu_cache.h"
#include "../utils/test_utils.h"

#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For sorting for consistent comparison

// --- Test Functions for Two Sum ---
void testTwoSum() {
    std::cout << "--- Running Two Sum Tests ---" << std::endl;

    // Test Case 1: Basic
    std::vector<int> nums1 = {2, 7, 11, 15};
    int target1 = 9;
    std::vector<int> expected1 = {0, 1};
    ASSERT_VEC_EQ(TwoSum::twoSum_bruteForce(nums1, target1), expected1, "TwoSum Brute Force Case 1 Failed");
    ASSERT_VEC_EQ(TwoSum::twoSum_hashMap(nums1, target1), expected1, "TwoSum Hash Map Case 1 Failed");
    std::cout << "TwoSum Test 1 Passed." << std::endl;

    // Test Case 2: Numbers not sorted, different order result
    std::vector<int> nums2 = {3, 2, 4};
    int target2 = 6;
    std::vector<int> expected2 = {1, 2}; // Because 2+4 = 6 at indices 1 and 2
    ASSERT_VEC_EQ(TwoSum::twoSum_bruteForce(nums2, target2), expected2, "TwoSum Brute Force Case 2 Failed");
    ASSERT_VEC_EQ(TwoSum::twoSum_hashMap(nums2, target2), expected2, "TwoSum Hash Map Case 2 Failed");
    std::cout << "TwoSum Test 2 Passed." << std::endl;

    // Test Case 3: Duplicates in array, but not using same element twice
    std::vector<int> nums3 = {3, 3};
    int target3 = 6;
    std::vector<int> expected3 = {0, 1};
    ASSERT_VEC_EQ(TwoSum::twoSum_bruteForce(nums3, target3), expected3, "TwoSum Brute Force Case 3 Failed");
    ASSERT_VEC_EQ(TwoSum::twoSum_hashMap(nums3, target3), expected3, "TwoSum Hash Map Case 3 Failed");
    std::cout << "TwoSum Test 3 Passed." << std::endl;

    // Test Case 4: Negative numbers
    std::vector<int> nums4 = {-1, -2, -3, -4, -5};
    int target4 = -8;
    std::vector<int> expected4 = {2, 4}; // -3 + -5 = -8
    ASSERT_VEC_EQ(TwoSum::twoSum_bruteForce(nums4, target4), expected4, "TwoSum Brute Force Case 4 Failed");
    ASSERT_VEC_EQ(TwoSum::twoSum_hashMap(nums4, target4), expected4, "TwoSum Hash Map Case 4 Failed");
    std::cout << "TwoSum Test 4 Passed." << std::endl;

    // Test Case 5: Large numbers (ensure no overflow if target is within int range)
    std::vector<int> nums5 = {1000000000, 1000000000, 1000000000};
    int target5 = 2000000000;
    std::vector<int> expected5 = {0, 1};
    ASSERT_VEC_EQ(TwoSum::twoSum_bruteForce(nums5, target5), expected5, "TwoSum Brute Force Case 5 Failed");
    ASSERT_VEC_EQ(TwoSum::twoSum_hashMap(nums5, target5), expected5, "TwoSum Hash Map Case 5 Failed");
    std::cout << "TwoSum Test 5 Passed." << std::endl;

    // Test Case 6: No solution (should not happen based on problem, but good for robustness)
    std::vector<int> nums6 = {1, 2, 3};
    int target6 = 7;
    std::vector<int> expected6 = {};
    ASSERT_VEC_EQ(TwoSum::twoSum_bruteForce(nums6, target6), expected6, "TwoSum Brute Force Case 6 (No Solution) Failed");
    ASSERT_VEC_EQ(TwoSum::twoSum_hashMap(nums6, target6), expected6, "TwoSum Hash Map Case 6 (No Solution) Failed");
    std::cout << "TwoSum Test 6 Passed." << std::endl;

    std::cout << "All Two Sum tests passed!" << std::endl << std::endl;
}

// --- Test Functions for Longest Consecutive Sequence ---
void testLongestConsecutiveSequence() {
    std::cout << "--- Running Longest Consecutive Sequence Tests ---" << std::endl;

    // Test Case 1: Basic example
    std::vector<int> nums1 = {100, 4, 200, 1, 3, 2};
    int expected1 = 4;
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_sort(nums1), expected1, "LCS Sort Case 1 Failed");
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_hashSet(nums1), expected1, "LCS Hash Set Case 1 Failed");
    std::cout << "LCS Test 1 Passed." << std::endl;

    // Test Case 2: Empty array
    std::vector<int> nums2 = {};
    int expected2 = 0;
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_sort(nums2), expected2, "LCS Sort Case 2 Failed");
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_hashSet(nums2), expected2, "LCS Hash Set Case 2 Failed");
    std::cout << "LCS Test 2 Passed." << std::endl;

    // Test Case 3: Single element
    std::vector<int> nums3 = {1};
    int expected3 = 1;
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_sort(nums3), expected3, "LCS Sort Case 3 Failed");
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_hashSet(nums3), expected3, "LCS Hash Set Case 3 Failed");
    std::cout << "LCS Test 3 Passed." << std::endl;

    // Test Case 4: All consecutive
    std::vector<int> nums4 = {0, 3, 7, 2, 5, 8, 4, 6, 0, 1};
    int expected4 = 9; // 0,1,2,3,4,5,6,7,8
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_sort(nums4), expected4, "LCS Sort Case 4 Failed");
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_hashSet(nums4), expected4, "LCS Hash Set Case 4 Failed");
    std::cout << "LCS Test 4 Passed." << std::endl;

    // Test Case 5: Negative numbers
    std::vector<int> nums5 = {-1, 0, -5, -2};
    int expected5 = 3; // -2, -1, 0
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_sort(nums5), expected5, "LCS Sort Case 5 Failed");
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_hashSet(nums5), expected5, "LCS Hash Set Case 5 Failed");
    std::cout << "LCS Test 5 Passed." << std::endl;

    // Test Case 6: Duplicates and non-consecutive
    std::vector<int> nums6 = {9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6};
    int expected6 = 11; // -1,0,1,3,4,5,6,7,8,9 (wait, this is incorrect calculation. Duplicates should not increase count, only distinct consecutive numbers count)
    // Correct sequence: -1, 0, 1. Length 3.
    // 3, 4, 5, 6, 7, 8, 9. Length 7.
    // So expected should be 7.
    std::vector<int> nums6_mod = {9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6};
    int expected6_actual = 7; // -1,0,1,2,3,4,5,6,7,8,9. Here: 3,4,5,6,7,8,9 is length 7. -1,0,1 is length 3. Max is 7.
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_sort(nums6_mod), expected6_actual, "LCS Sort Case 6 Failed");
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_hashSet(nums6_mod), expected6_actual, "LCS Hash Set Case 6 Failed");
    std::cout << "LCS Test 6 Passed." << std::endl;

    // Test Case 7: All same number
    std::vector<int> nums7 = {5, 5, 5, 5};
    int expected7 = 1;
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_sort(nums7), expected7, "LCS Sort Case 7 Failed");
    ASSERT_EQ(LongestConsecutiveSequence::longestConsecutive_hashSet(nums7), expected7, "LCS Hash Set Case 7 Failed");
    std::cout << "LCS Test 7 Passed." << std::endl;

    std::cout << "All Longest Consecutive Sequence tests passed!" << std::endl << std::endl;
}

// --- Test Functions for Group Anagrams ---
void testGroupAnagrams() {
    std::cout << "--- Running Group Anagrams Tests ---" << std::endl;

    // Test Case 1: Basic example
    std::vector<std::string> strs1 = {"eat", "tea", "tan", "ate", "nat", "bat"};
    std::vector<std::vector<std::string>> expected1 = {{"bat"}, {"nat", "tan"}, {"ate", "eat", "tea"}};
    ASSERT_VEC_VEC_STR_EQ(GroupAnagrams::groupAnagrams_bruteForce(strs1), expected1, "Group Anagrams Brute Force Case 1 Failed");
    ASSERT_VEC_VEC_STR_EQ(GroupAnagrams::groupAnagrams_hashMap(strs1), expected1, "Group Anagrams Hash Map Case 1 Failed");
    std::cout << "Group Anagrams Test 1 Passed." << std::endl;

    // Test Case 2: Empty input
    std::vector<std::string> strs2 = {};
    std::vector<std::vector<std::string>> expected2 = {};
    ASSERT_VEC_VEC_STR_EQ(GroupAnagrams::groupAnagrams_bruteForce(strs2), expected2, "Group Anagrams Brute Force Case 2 Failed");
    ASSERT_VEC_VEC_STR_EQ(GroupAnagrams::groupAnagrams_hashMap(strs2), expected2, "Group Anagrams Hash Map Case 2 Failed");
    std::cout << "Group Anagrams Test 2 Passed." << std::endl;

    // Test Case 3: Single string
    std::vector<std::string> strs3 = {"a"};
    std::vector<std::vector<std::string>> expected3 = {{"a"}};
    ASSERT_VEC_VEC_STR_EQ(GroupAnagrams::groupAnagrams_bruteForce(strs3), expected3, "Group Anagrams Brute Force Case 3 Failed");
    ASSERT_VEC_VEC_STR_EQ(GroupAnagrams::groupAnagrams_hashMap(strs3), expected3, "Group Anagrams Hash Map Case 3 Failed");
    std::cout << "Group Anagrams Test 3 Passed." << std::endl;

    // Test Case 4: No anagrams
    std::vector<std::string> strs4 = {"abc", "def", "ghi"};
    std::vector<std::vector<std::string>> expected4 = {{"abc"}, {"def"}, {"ghi"}};
    ASSERT_VEC_VEC_STR_EQ(GroupAnagrams::groupAnagrams_bruteForce(strs4), expected4, "Group Anagrams Brute Force Case 4 Failed");
    ASSERT_VEC_VEC_STR_EQ(GroupAnagrams::groupAnagrams_hashMap(strs4), expected4, "Group Anagrams Hash Map Case 4 Failed");
    std::cout << "Group Anagrams Test 4 Passed." << std::endl;

    // Test Case 5: All anagrams
    std::vector<std::string> strs5 = {"tar", "rat", "art"};
    std::vector<std::vector<std::string>> expected5 = {{"art", "rat", "tar"}};
    ASSERT_VEC_VEC_STR_EQ(GroupAnagrams::groupAnagrams_bruteForce(strs5), expected5, "Group Anagrams Brute Force Case 5 Failed");
    ASSERT_VEC_VEC_STR_EQ(GroupAnagrams::groupAnagrams_hashMap(strs5), expected5, "Group Anagrams Hash Map Case 5 Failed");
    std::cout << "Group Anagrams Test 5 Passed." << std::endl;

    // Test Case 6: Mixed case (ensure sorting handles it or define behavior)
    // Current solution assumes lowercase. If mixed case is allowed, 'a' != 'A'.
    // A better solution would convert to lowercase first or use a larger frequency array.
    std::vector<std::string> strs6 = {"a", "b", "c", "A"};
    std::vector<std::vector<std::string>> expected6 = {{"A"}, {"a"}, {"b"}, {"c"}};
    ASSERT_VEC_VEC_STR_EQ(GroupAnagrams::groupAnagrams_bruteForce(strs6), expected6, "Group Anagrams Brute Force Case 6 Failed");
    ASSERT_VEC_VEC_STR_EQ(GroupAnagrams::groupAnagrams_hashMap(strs6), expected6, "Group Anagrams Hash Map Case 6 Failed");
    std::cout << "Group Anagrams Test 6 Passed." << std::endl;
    // Note for solution: Current `areAnagrams` only works for lowercase. `std::sort` for key generation
    // handles mixed case correctly based on ASCII values, so hashMap approach is fine.

    std::cout << "All Group Anagrams tests passed!" << std::endl << std::endl;
}

// --- Test Functions for LFU Cache ---
void testLFUCache() {
    std::cout << "--- Running LFU Cache Tests ---" << std::endl;

    // Test Case 1: Example from LeetCode
    LFUCache::LFUCache cache1(2);
    cache1.put(1, 1); // Cache: {1:1} Freq: {1:[1]} MinFreq:1
    cache1.put(2, 2); // Cache: {1:1, 2:2} Freq: {1:[2,1]} MinFreq:1
    ASSERT_EQ(cache1.get(1), 1, "LFU Cache Case 1.1 Failed: get(1)"); // 1 is MRU for freq 1
    // Cache: {1:1, 2:2} Freq: {1:[2]} {2:[1]} MinFreq:1 (1 moved to freq 2)
    ASSERT_EQ(cache1.get(2), 2, "LFU Cache Case 1.2 Failed: get(2)");
    // Cache: {1:1, 2:2} Freq: {2:[1,2]} MinFreq:2 (2 moved to freq 2)
    cache1.put(3, 3); // Cache full. Evict LFU (no ties). Only freq 2 present, so it's LRU for tie-breaking.
                      // Here, 1 and 2 both have freq 2. 1 was accessed first and then 2. So 1 is LRU among those.
                      // Original sequence of access for freq 2: 1 then 2. So 2 is MRU, 1 is LRU.
                      // Evict 1.
                      // Cache: {2:2, 3:3} Freq: {1:[3]} {2:[2]} MinFreq:1
    ASSERT_EQ(cache1.get(1), -1, "LFU Cache Case 1.3 Failed: get(1) after eviction");
    std::cout << "LFU Cache Test 1 Passed." << std::endl;


    // Test Case 2: Capacity 0
    LFUCache::LFUCache cache2(0);
    cache2.put(1, 1);
    ASSERT_EQ(cache2.get(1), -1, "LFU Cache Case 2.1 Failed: get(1) from empty cache");
    std::cout << "LFU Cache Test 2 Passed." << std::endl;

    // Test Case 3: More complex eviction, multiple frequencies
    LFUCache::LFUCache cache3(3);
    cache3.put(1, 1); // {1:1} F:{1:[1]} min:1
    cache3.put(2, 2); // {1:1, 2:2} F:{1:[2,1]} min:1
    cache3.put(3, 3); // {1:1, 2:2, 3:3} F:{1:[3,2,1]} min:1
    ASSERT_EQ(cache3.get(1), 1, "LFU Cache Case 3.1 Failed: get(1)"); // F:{1:[3,2]} F:{2:[1]} min:1
    ASSERT_EQ(cache3.get(2), 2, "LFU Cache Case 3.2 Failed: get(2)"); // F:{1:[3]} F:{2:[1,2]} min:1
    cache3.put(4, 4); // Cache full (3 elements). F:{1:[3]}, F:{2:[1,2]}. min_freq is 1.
                      // Evict 3 (LRU from freq 1 list).
                      // {1:1, 2:2, 4:4} F:{1:[4]} F:{2:[1,2]} min:1
    ASSERT_EQ(cache3.get(3), -1, "LFU Cache Case 3.3 Failed: get(3) after eviction");
    ASSERT_EQ(cache3.get(1), 1, "LFU Cache Case 3.4 Failed: get(1) post-eviction"); // F:{1:[4]} F:{2:[2]} F:{3:[1]} min:1
    ASSERT_EQ(cache3.get(2), 2, "LFU Cache Case 3.5 Failed: get(2) post-eviction"); // F:{1:[4]} F:{3:[1,2]} min:1
    ASSERT_EQ(cache3.get(4), 4, "LFU Cache Case 3.6 Failed: get(4) post-eviction"); // F:{3:[1,2,4]} min:3 (no more freq 1 or 2)
    std::cout << "LFU Cache Test 3 Passed." << std::endl;

    // Test Case 4: Overwriting existing key
    LFUCache::LFUCache cache4(2);
    cache4.put(1, 10); // {1:10} F:{1:[1]} min:1
    cache4.put(2, 20); // {1:10, 2:20} F:{1:[2,1]} min:1
    cache4.get(1);     // {1:10, 2:20} F:{1:[2]} F:{2:[1]} min:1
    cache4.put(1, 15); // Update 1. Value becomes 15, freq updates. It was at freq 2, so becomes freq 3.
                       // F:{1:[2]} F:{3:[1]} min:1
    ASSERT_EQ(cache4.get(1), 15, "LFU Cache Case 4.1 Failed: get(1) after update"); // F:{1:[2]} F:{4:[1]} min:1
    ASSERT_EQ(cache4.get(2), 20, "LFU Cache Case 4.2 Failed: get(2)"); // F:{2:[2]} F:{4:[1]} min:2
    std::cout << "LFU Cache Test 4 Passed." << std::endl;

    std::cout << "All LFU Cache tests passed!" << std::endl << std::endl;
}

// Entry point for all tests
void runAllTests() {
    std::cout << "========================================" << std::endl;
    std::cout << "          Running All Tests             " << std::endl;
    std::cout << "========================================" << std::endl << std::endl;

    testTwoSum();
    testLongestConsecutiveSequence();
    testGroupAnagrams();
    testLFUCache();

    std::cout << "========================================" << std::endl;
    std::cout << "       All Tests Completed Successfully! " << std::endl;
    std::cout << "========================================" << std::endl;
}