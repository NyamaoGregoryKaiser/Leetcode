#include <iostream>
#include <vector>
#include <string>
#include <algorithm> // For std::sort
#include <set>       // For canonical sorting of vectors of strings

// Include utility functions
#include "../src/utils.hpp"
// Include problem solutions
#include "../src/main_problems.cpp"

// --- Custom Assertion Macros ---
// Basic assertion for boolean conditions
#define ASSERT_TRUE(condition, message) \
    do { \
        if (!(condition)) { \
            std::cerr << "FAILED: " << message << " (Line: " << __LINE__ << ")\n"; \
            test_failed_count++; \
        } else { \
            test_passed_count++; \
        } \
        test_total_count++; \
    } while (0)

// Assertion for equality of primitive types or types with operator==
#define ASSERT_EQ(expected, actual, message) \
    do { \
        if (!((expected) == (actual))) { \
            std::cerr << "FAILED: " << message << ". Expected: " << (expected) << ", Got: " << (actual) << " (Line: " << __LINE__ << ")\n"; \
            test_failed_count++; \
        } else { \
            test_passed_count++; \
        } \
        test_total_count++; \
    } while (0)

// Assertion for vector equality (order-independent via sorting)
template <typename T>
void ASSERT_VEC_EQ_IMPL(const std::vector<T>& expected, const std::vector<T>& actual, const std::string& message, int line_num, int& passed_count, int& failed_count, int& total_count) {
    total_count++;
    if (!compareVectors(expected, actual)) {
        std::cerr << "FAILED: " << message << ". Expected: ";
        printVector(expected, "", "");
        std::cerr << ", Got: ";
        printVector(actual, "", "");
        std::cerr << " (Line: " << line_num << ")\n";
        failed_count++;
    } else {
        passed_count++;
    }
}
#define ASSERT_VEC_EQ(expected, actual, message) \
    ASSERT_VEC_EQ_IMPL(expected, actual, message, __LINE__, test_passed_count, test_failed_count, test_total_count)

// Assertion for vector of vector equality (order-independent via sorting)
template <typename T>
void ASSERT_VEC_VEC_EQ_IMPL(const std::vector<std::vector<T>>& expected, const std::vector<std::vector<T>>& actual, const std::string& message, int line_num, int& passed_count, int& failed_count, int& total_count) {
    total_count++;
    if (!compareVectorOfVectors(expected, actual)) {
        std::cerr << "FAILED: " << message << ". Expected: ";
        printVectorOfVectors(expected, "", "");
        std::cerr << ", Got: ";
        printVectorOfVectors(actual, "", "");
        std::cerr << " (Line: " << line_num << ")\n";
        failed_count++;
    } else {
        passed_count++;
    }
}
#define ASSERT_VEC_VEC_EQ(expected, actual, message) \
    ASSERT_VEC_VEC_EQ_IMPL(expected, actual, message, __LINE__, test_passed_count, test_failed_count, test_total_count)


// Global counters for test results
int test_passed_count = 0;
int test_failed_count = 0;
int test_total_count = 0;

// Namespace alias for convenience
namespace Problem = HashTableProblems;

// --- Test Functions for Each Problem ---

void testTwoSum() {
    std::cout << "\n--- Testing Two Sum ---\n";

    // Optimal Solution
    ASSERT_VEC_EQ({0, 1}, Problem::twoSum_Optimal({2, 7, 11, 15}, 9), "Optimal: Basic case [2,7,11,15], target 9");
    ASSERT_VEC_EQ({1, 2}, Problem::twoSum_Optimal({3, 2, 4}, 6), "Optimal: Different order [3,2,4], target 6");
    ASSERT_VEC_EQ({0, 1}, Problem::twoSum_Optimal({3, 3}, 6), "Optimal: Duplicate numbers [3,3], target 6");
    ASSERT_VEC_EQ({0, 3}, Problem::twoSum_Optimal({-1, -2, -3, -4, -5}, -8), "Optimal: Negative numbers [-1,-2,-3,-4,-5], target -8");
    ASSERT_VEC_EQ({0, 4}, Problem::twoSum_Optimal({1, 2, 3, 4, 5, 6}, 6), "Optimal: Target with non-adjacent numbers");
    ASSERT_VEC_EQ({2, 3}, Problem::twoSum_Optimal({1, 5, 9, 2, 8}, 11), "Optimal: Numbers not at beginning");
    ASSERT_VEC_EQ({0, 1}, Problem::twoSum_Optimal({20, 300, 100, 10}, 320), "Optimal: Large numbers");

    // Brute Force Solution
    ASSERT_VEC_EQ({0, 1}, Problem::twoSum_BruteForce({2, 7, 11, 15}, 9), "BruteForce: Basic case [2,7,11,15], target 9");
    ASSERT_VEC_EQ({1, 2}, Problem::twoSum_BruteForce({3, 2, 4}, 6), "BruteForce: Different order [3,2,4], target 6");
    ASSERT_VEC_EQ({0, 1}, Problem::twoSum_BruteForce({3, 3}, 6), "BruteForce: Duplicate numbers [3,3], target 6");
    ASSERT_VEC_EQ({0, 3}, Problem::twoSum_BruteForce({-1, -2, -3, -4, -5}, -8), "BruteForce: Negative numbers [-1,-2,-3,-4,-5], target -8");
}

void testLongestConsecutiveSequence() {
    std::cout << "\n--- Testing Longest Consecutive Sequence ---\n";

    // Optimal Solution
    ASSERT_EQ(4, Problem::longestConsecutive_Optimal({100, 4, 200, 1, 3, 2}), "Optimal: Basic case [100,4,200,1,3,2]");
    ASSERT_EQ(9, Problem::longestConsecutive_Optimal({0, 3, 7, 2, 5, 8, 4, 6, 0, 1}), "Optimal: Another basic case with duplicates");
    ASSERT_EQ(1, Problem::longestConsecutive_Optimal({1}), "Optimal: Single element");
    ASSERT_EQ(0, Problem::longestConsecutive_Optimal({}), "Optimal: Empty array");
    ASSERT_EQ(1, Problem::longestConsecutive_Optimal({7, 7, 7, 7, 7}), "Optimal: All same elements");
    ASSERT_EQ(5, Problem::longestConsecutive_Optimal({-1, 0, 1, 2, 3}), "Optimal: Negative and zero");
    ASSERT_EQ(5, Problem::longestConsecutive_Optimal({9, 1, 4, 7, 3, -1, 0, 5, 8, -2, 6}), "Optimal: Scattered sequence");
    ASSERT_EQ(1, Problem::longestConsecutive_Optimal({10, 20, 30, 40}), "Optimal: No consecutive elements");
    ASSERT_EQ(2, Problem::longestConsecutive_Optimal({1, 2, 0, 1}), "Optimal: Duplicates mixed with sequence");
    ASSERT_EQ(3, Problem::longestConsecutive_Optimal({1, 3, 2}), "Optimal: Out of order consecutive");
    ASSERT_EQ(6, Problem::longestConsecutive_Optimal({0,1,2,3,4,5}), "Optimal: Fully consecutive sorted");
    ASSERT_EQ(6, Problem::longestConsecutive_Optimal({5,4,3,2,1,0}), "Optimal: Fully consecutive reverse sorted");


    // Sorting Solution
    ASSERT_EQ(4, Problem::longestConsecutive_Sorting({100, 4, 200, 1, 3, 2}), "Sorting: Basic case [100,4,200,1,3,2]");
    ASSERT_EQ(9, Problem::longestConsecutive_Sorting({0, 3, 7, 2, 5, 8, 4, 6, 0, 1}), "Sorting: Another basic case with duplicates");
    ASSERT_EQ(1, Problem::longestConsecutive_Sorting({1}), "Sorting: Single element");
    ASSERT_EQ(0, Problem::longestConsecutive_Sorting({}), "Sorting: Empty array");
    ASSERT_EQ(1, Problem::longestConsecutive_Sorting({7, 7, 7, 7, 7}), "Sorting: All same elements");
    ASSERT_EQ(5, Problem::longestConsecutive_Sorting({-1, 0, 1, 2, 3}), "Sorting: Negative and zero");
    ASSERT_EQ(5, Problem::longestConsecutive_Sorting({9, 1, 4, 7, 3, -1, 0, 5, 8, -2, 6}), "Sorting: Scattered sequence");
}

void testGroupAnagrams() {
    std::cout << "\n--- Testing Group Anagrams ---\n";

    // Optimal Solution (Sorting string key)
    std::vector<std::string> strs1 = {"eat", "tea", "tan", "ate", "nat", "bat"};
    std::vector<std::vector<std::string>> expected1 = {{"bat"}, {"nat", "tan"}, {"ate", "eat", "tea"}};
    ASSERT_VEC_VEC_EQ(expected1, Problem::groupAnagrams_Optimal(strs1), "Optimal (Sort Key): Basic case");

    std::vector<std::string> strs2 = {"a"};
    std::vector<std::vector<std::string>> expected2 = {{"a"}};
    ASSERT_VEC_VEC_EQ(expected2, Problem::groupAnagrams_Optimal(strs2), "Optimal (Sort Key): Single string");

    std::vector<std::string> strs3 = {""};
    std::vector<std::vector<std::string>> expected3 = {{""}};
    ASSERT_VEC_VEC_EQ(expected3, Problem::groupAnagrams_Optimal(strs3), "Optimal (Sort Key): Empty string");

    std::vector<std::string> strs4 = {"", ""};
    std::vector<std::vector<std::string>> expected4 = {{"", ""}};
    ASSERT_VEC_VEC_EQ(expected4, Problem::groupAnagrams_Optimal(strs4), "Optimal (Sort Key): Two empty strings");

    std::vector<std::string> strs5 = {"abc", "bca", "cab", "xyz"};
    std::vector<std::vector<std::string>> expected5 = {{"abc", "bca", "cab"}, {"xyz"}};
    ASSERT_VEC_VEC_EQ(expected5, Problem::groupAnagrams_Optimal(strs5), "Optimal (Sort Key): Multiple groups");

    std::vector<std::string> strs6 = {"abc", "cba", "bac"};
    std::vector<std::vector<std::string>> expected6 = {{"abc", "cba", "bac"}};
    ASSERT_VEC_VEC_EQ(expected6, Problem::groupAnagrams_Optimal(strs6), "Optimal (Sort Key): One group");

    std::vector<std::string> strs7 = {"listen", "silent", "enlist", "banana", "nanaba"};
    std::vector<std::vector<std::string>> expected7 = {{"listen", "silent", "enlist"}, {"banana", "nanaba"}};
    ASSERT_VEC_VEC_EQ(expected7, Problem::groupAnagrams_Optimal(strs7), "Optimal (Sort Key): Longer strings");

    std::vector<std::string> strs8 = {};
    std::vector<std::vector<std::string>> expected8 = {};
    ASSERT_VEC_VEC_EQ(expected8, Problem::groupAnagrams_Optimal(strs8), "Optimal (Sort Key): Empty input vector");

    // Counting Key Solution
    ASSERT_VEC_VEC_EQ(expected1, Problem::groupAnagrams_Counting(strs1), "Optimal (Count Key): Basic case");
    ASSERT_VEC_VEC_EQ(expected2, Problem::groupAnagrams_Counting(strs2), "Optimal (Count Key): Single string");
    ASSERT_VEC_VEC_EQ(expected3, Problem::groupAnagrams_Counting(strs3), "Optimal (Count Key): Empty string");
    ASSERT_VEC_VEC_EQ(expected4, Problem::groupAnagrams_Counting(strs4), "Optimal (Count Key): Two empty strings");
    ASSERT_VEC_VEC_EQ(expected5, Problem::groupAnagrams_Counting(strs5), "Optimal (Count Key): Multiple groups");
    ASSERT_VEC_VEC_EQ(expected6, Problem::groupAnagrams_Counting(strs6), "Optimal (Count Key): One group");
    ASSERT_VEC_VEC_EQ(expected7, Problem::groupAnagrams_Counting(strs7), "Optimal (Count Key): Longer strings");
    ASSERT_VEC_VEC_EQ(expected8, Problem::groupAnagrams_Counting(strs8), "Optimal (Count Key): Empty input vector");
}

void testFirstUniqueCharacter() {
    std::cout << "\n--- Testing First Unique Character ---\n";

    // Optimal Solution
    ASSERT_EQ(0, Problem::firstUniqChar_Optimal("leetcode"), "Optimal: Basic case 'leetcode'");
    ASSERT_EQ(2, Problem::firstUniqChar_Optimal("loveleetcode"), "Optimal: Basic case 'loveleetcode'");
    ASSERT_EQ(-1, Problem::firstUniqChar_Optimal("aabb"), "Optimal: No unique characters 'aabb'");
    ASSERT_EQ(0, Problem::firstUniqChar_Optimal("a"), "Optimal: Single character 'a'");
    ASSERT_EQ(-1, Problem::firstUniqChar_Optimal(""), "Optimal: Empty string");
    ASSERT_EQ(0, Problem::firstUniqChar_Optimal("abcde"), "Optimal: All unique");
    ASSERT_EQ(6, Problem::firstUniqChar_Optimal("ccbbddel"), "Optimal: Unique at end");
    ASSERT_EQ(0, Problem::firstUniqChar_Optimal("abcdefghijklmnopqrstuvwxyz"), "Optimal: All unique long string");
    ASSERT_EQ(-1, Problem::firstUniqChar_Optimal("zzxxcc"), "Optimal: All repeated, even numbers of chars");
    ASSERT_EQ(0, Problem::firstUniqChar_Optimal("abacaba"), "Optimal: Unique in palindromic context");

    // Brute Force Solution
    ASSERT_EQ(0, Problem::firstUniqChar_BruteForce("leetcode"), "BruteForce: Basic case 'leetcode'");
    ASSERT_EQ(2, Problem::firstUniqChar_BruteForce("loveleetcode"), "BruteForce: Basic case 'loveleetcode'");
    ASSERT_EQ(-1, Problem::firstUniqChar_BruteForce("aabb"), "BruteForce: No unique characters 'aabb'");
    ASSERT_EQ(0, Problem::firstUniqChar_BruteForce("a"), "BruteForce: Single character 'a'");
    ASSERT_EQ(-1, Problem::firstUniqChar_BruteForce(""), "BruteForce: Empty string");
}

void testContainsDuplicate() {
    std::cout << "\n--- Testing Contains Duplicate ---\n";

    // Optimal Solution
    ASSERT_TRUE(Problem::containsDuplicate_Optimal({1, 2, 3, 1}), "Optimal: Basic true case {1,2,3,1}");
    ASSERT_FALSE(Problem::containsDuplicate_Optimal({1, 2, 3, 4}), "Optimal: Basic false case {1,2,3,4}");
    ASSERT_TRUE(Problem::containsDuplicate_Optimal({1, 1, 1, 3, 3, 4, 3, 2, 4, 2}), "Optimal: Multiple duplicates");
    ASSERT_FALSE(Problem::containsDuplicate_Optimal({}), "Optimal: Empty array");
    ASSERT_FALSE(Problem::containsDuplicate_Optimal({1}), "Optimal: Single element");
    ASSERT_TRUE(Problem::containsDuplicate_Optimal({1, 1}), "Optimal: Two identical elements");
    ASSERT_TRUE(Problem::containsDuplicate_Optimal({-1, -2, -3, -1}), "Optimal: Negative numbers duplicate");
    ASSERT_FALSE(Problem::containsDuplicate_Optimal({1000000000, 1000000001, 1000000002}), "Optimal: Large unique numbers");

    // Sorting Solution
    ASSERT_TRUE(Problem::containsDuplicate_Sorting({1, 2, 3, 1}), "Sorting: Basic true case {1,2,3,1}");
    ASSERT_FALSE(Problem::containsDuplicate_Sorting({1, 2, 3, 4}), "Sorting: Basic false case {1,2,3,4}");
    ASSERT_TRUE(Problem::containsDuplicate_Sorting({1, 1, 1, 3, 3, 4, 3, 2, 4, 2}), "Sorting: Multiple duplicates");
    ASSERT_FALSE(Problem::containsDuplicate_Sorting({}), "Sorting: Empty array");
    ASSERT_FALSE(Problem::containsDuplicate_Sorting({1}), "Sorting: Single element");
    ASSERT_TRUE(Problem::containsDuplicate_Sorting({1, 1}), "Sorting: Two identical elements");

    // Brute Force Solution
    ASSERT_TRUE(Problem::containsDuplicate_BruteForce({1, 2, 3, 1}), "BruteForce: Basic true case {1,2,3,1}");
    ASSERT_FALSE(Problem::containsDuplicate_BruteForce({1, 2, 3, 4}), "BruteForce: Basic false case {1,2,3,4}");
    ASSERT_TRUE(Problem::containsDuplicate_BruteForce({1, 1}), "BruteForce: Two identical elements");
    ASSERT_FALSE(Problem::containsDuplicate_BruteForce({}), "BruteForce: Empty array");
    ASSERT_FALSE(Problem::containsDuplicate_BruteForce({1}), "BruteForce: Single element");
}


// --- Main Test Runner ---
int main() {
    std::cout << "Starting all tests...\n";

    testTwoSum();
    testLongestConsecutiveSequence();
    testGroupAnagrams();
    testFirstUniqueCharacter();
    testContainsDuplicate();

    std::cout << "\n--- Test Summary ---\n";
    std::cout << "Total Tests: " << test_total_count << "\n";
    std::cout << "Passed: " << test_passed_count << "\n";
    std::cout << "Failed: " << test_failed_count << "\n";

    if (test_failed_count == 0) {
        std::cout << "All tests PASSED!\n";
        return 0;
    } else {
        std::cout << "Some tests FAILED!\n";
        return 1;
    }
}