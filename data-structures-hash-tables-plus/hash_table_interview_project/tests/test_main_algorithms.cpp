```cpp
#include "../src/main_algorithms.cpp" // Include the implementation file directly for testing
#include <vector>
#include <string>
#include <algorithm> // For std::sort, used in test validation for groupAnagrams

// Make sure to use the namespace for the problems
using namespace HashTableProblems;
using namespace TestFramework;
using namespace std; // For vector, string, etc.

// --- Helper for Group Anagrams testing ---
// This function sorts the inner vectors and the outer vector of vectors
// to make comparison order-independent.
vector<vector<string>> sort_anagram_groups(vector<vector<string>> groups) {
    for (auto& group : groups) {
        sort(group.begin(), group.end());
    }
    // Custom comparator for vector of vectors
    sort(groups.begin(), groups.end(), [](const vector<string>& a, const vector<string>& b) {
        if (a.empty() && b.empty()) return false;
        if (a.empty()) return true;
        if (b.empty()) return false;
        return a[0] < b[0]; // Compare based on the first string in each sorted group
    });
    return groups;
}


void run_two_sum_tests() {
    cout << "\n--- Running Two Sum Tests ---\n";
    vector<int> result;

    // Test Case 1: Basic positive case
    vector<int> nums1 = {2, 7, 11, 15};
    int target1 = 9;
    result = twoSum_hashMap(nums1, target1);
    sort(result.begin(), result.end()); // Ensure order for comparison
    ASSERT_CONTAINER_EQ(result, (vector<int>{0, 1}), "Two Sum (HashMap) - Basic Case 1");

    result = twoSum_bruteForce(nums1, target1);
    sort(result.begin(), result.end());
    ASSERT_CONTAINER_EQ(result, (vector<int>{0, 1}), "Two Sum (Brute Force) - Basic Case 1");

    // Test Case 2: Numbers with same value but different indices
    vector<int> nums2 = {3, 2, 4};
    int target2 = 6;
    result = twoSum_hashMap(nums2, target2);
    sort(result.begin(), result.end());
    ASSERT_CONTAINER_EQ(result, (vector<int>{1, 2}), "Two Sum (HashMap) - Different indices");

    result = twoSum_bruteForce(nums2, target2);
    sort(result.begin(), result.end());
    ASSERT_CONTAINER_EQ(result, (vector<int>{1, 2}), "Two Sum (Brute Force) - Different indices");

    // Test Case 3: Negative numbers
    vector<int> nums3 = {-1, -2, -3, -4, -5};
    int target3 = -8;
    result = twoSum_hashMap(nums3, target3);
    sort(result.begin(), result.end());
    ASSERT_CONTAINER_EQ(result, (vector<int>{2, 4}), "Two Sum (HashMap) - Negative numbers");

    result = twoSum_bruteForce(nums3, target3);
    sort(result.begin(), result.end());
    ASSERT_CONTAINER_EQ(result, (vector<int>{2, 4}), "Two Sum (Brute Force) - Negative numbers");

    // Test Case 4: Zeroes
    vector<int> nums4 = {0, 4, 3, 0};
    int target4 = 0;
    result = twoSum_hashMap(nums4, target4);
    sort(result.begin(), result.end());
    ASSERT_CONTAINER_EQ(result, (vector<int>{0, 3}), "Two Sum (HashMap) - Zeroes");

    result = twoSum_bruteForce(nums4, target4);
    sort(result.begin(), result.end());
    ASSERT_CONTAINER_EQ(result, (vector<int>{0, 3}), "Two Sum (Brute Force) - Zeroes");

    // Test Case 5: Large numbers (within int limits)
    vector<int> nums5 = {1000000000, 1000000000, 2};
    int target5 = 1000000002;
    result = twoSum_hashMap(nums5, target5);
    sort(result.begin(), result.end());
    ASSERT_CONTAINER_EQ(result, (vector<int>{1, 2}), "Two Sum (HashMap) - Large numbers");

    result = twoSum_bruteForce(nums5, target5);
    sort(result.begin(), result.end());
    ASSERT_CONTAINER_EQ(result, (vector<int>{1, 2}), "Two Sum (Brute Force) - Large numbers");

    // Test Case 6: Edge case - two elements
    vector<int> nums6 = {5, 5};
    int target6 = 10;
    result = twoSum_hashMap(nums6, target6);
    sort(result.begin(), result.end());
    ASSERT_CONTAINER_EQ(result, (vector<int>{0, 1}), "Two Sum (HashMap) - Two elements");
    
    result = twoSum_bruteForce(nums6, target6);
    sort(result.begin(), result.end());
    ASSERT_CONTAINER_EQ(result, (vector<int>{0, 1}), "Two Sum (Brute Force) - Two elements");
}

void run_longest_consecutive_sequence_tests() {
    cout << "\n--- Running Longest Consecutive Sequence Tests ---\n";

    // Test Case 1: Basic example
    ASSERT_EQ(longestConsecutive({100, 4, 200, 1, 3, 2}), 4, "LCS (HashMap) - Basic Case 1");
    ASSERT_EQ(longestConsecutive_sorting({100, 4, 200, 1, 3, 2}), 4, "LCS (Sorting) - Basic Case 1");

    // Test Case 2: Empty array
    ASSERT_EQ(longestConsecutive({}), 0, "LCS (HashMap) - Empty Array");
    ASSERT_EQ(longestConsecutive_sorting({}), 0, "LCS (Sorting) - Empty Array");

    // Test Case 3: Single element
    ASSERT_EQ(longestConsecutive({1}), 1, "LCS (HashMap) - Single Element");
    ASSERT_EQ(longestConsecutive_sorting({1}), 1, "LCS (Sorting) - Single Element");

    // Test Case 4: Duplicates
    ASSERT_EQ(longestConsecutive({0, 3, 7, 2, 5, 8, 4, 6, 0, 1}), 9, "LCS (HashMap) - Duplicates");
    ASSERT_EQ(longestConsecutive_sorting({0, 3, 7, 2, 5, 8, 4, 6, 0, 1}), 9, "LCS (Sorting) - Duplicates");

    // Test Case 5: Negative numbers
    ASSERT_EQ(longestConsecutive({-1, 0, 1, 2, 3}), 5, "LCS (HashMap) - Negative Numbers");
    ASSERT_EQ(longestConsecutive_sorting({-1, 0, 1, 2, 3}), 5, "LCS (Sorting) - Negative Numbers");

    // Test Case 6: Disconnected sequences
    ASSERT_EQ(longestConsecutive({1, 2, 0, 1, 100, 200, 300, 301, 302}), 3, "LCS (HashMap) - Disconnected");
    ASSERT_EQ(longestConsecutive_sorting({1, 2, 0, 1, 100, 200, 300, 301, 302}), 3, "LCS (Sorting) - Disconnected");

    // Test Case 7: All elements are consecutive
    ASSERT_EQ(longestConsecutive({7, 6, 5, 4, 3, 2, 1}), 7, "LCS (HashMap) - All Consecutive");
    ASSERT_EQ(longestConsecutive_sorting({7, 6, 5, 4, 3, 2, 1}), 7, "LCS (Sorting) - All Consecutive");

    // Test Case 8: No consecutive elements
    ASSERT_EQ(longestConsecutive({10, 5, 20, 15, 25}), 1, "LCS (HashMap) - No Consecutive");
    ASSERT_EQ(longestConsecutive_sorting({10, 5, 20, 15, 25}), 1, "LCS (Sorting) - No Consecutive");
}

void run_group_anagrams_tests() {
    cout << "\n--- Running Group Anagrams Tests ---\n";
    vector<vector<string>> actual, expected;

    // Test Case 1: Basic example
    actual = groupAnagrams({"eat", "tea", "tan", "ate", "nat", "bat"});
    expected = {{"bat"}, {"nat", "tan"}, {"ate", "eat", "tea"}};
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups(expected), "Group Anagrams (Sorted Key) - Basic Case 1");

    actual = groupAnagrams_charCountKey({"eat", "tea", "tan", "ate", "nat", "bat"});
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups(expected), "Group Anagrams (Char Count Key) - Basic Case 1");

    // Test Case 2: Empty array
    actual = groupAnagrams({});
    expected = {};
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups(expected), "Group Anagrams (Sorted Key) - Empty Array");

    actual = groupAnagrams_charCountKey({});
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups(expected), "Group Anagrams (Char Count Key) - Empty Array");

    // Test Case 3: Single string
    actual = groupAnagrams({"a"});
    expected = {{"a"}};
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups(expected), "Group Anagrams (Sorted Key) - Single String");

    actual = groupAnagrams_charCountKey({"a"});
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups(expected), "Group Anagrams (Char Count Key) - Single String");

    // Test Case 4: Strings with different lengths but same characters (not anagrams)
    actual = groupAnagrams({"a", "ab", "ba"});
    expected = {{"a"}, {"ab"}, {"ba"}}; // "ab" and "ba" are anagrams
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups({{"a"}, {"ab", "ba"}}), "Group Anagrams (Sorted Key) - Different lengths");

    actual = groupAnagrams_charCountKey({"a", "ab", "ba"});
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups({{"a"}, {"ab", "ba"}}), "Group Anagrams (Char Count Key) - Different lengths");

    // Test Case 5: All strings are unique (no anagrams)
    actual = groupAnagrams({"abc", "def", "ghi"});
    expected = {{"abc"}, {"def"}, {"ghi"}};
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups(expected), "Group Anagrams (Sorted Key) - No Anagrams");

    actual = groupAnagrams_charCountKey({"abc", "def", "ghi"});
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups(expected), "Group Anagrams (Char Count Key) - No Anagrams");

    // Test Case 6: All strings are anagrams of each other
    actual = groupAnagrams({"listen", "silent", "enlist"});
    expected = {{"enlist", "listen", "silent"}};
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups(expected), "Group Anagrams (Sorted Key) - All Anagrams");

    actual = groupAnagrams_charCountKey({"listen", "silent", "enlist"});
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups(expected), "Group Anagrams (Char Count Key) - All Anagrams");

    // Test Case 7: Strings with special characters or numbers (assuming standard sort handles them)
    // Note: The charCountKey approach assumes lowercase English letters.
    // This test case only works for groupAnagrams (sorted key) as char_counts is fixed for 26 chars.
    actual = groupAnagrams({"a!b", "b!a"});
    expected = {{"a!b", "b!a"}};
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups(expected), "Group Anagrams (Sorted Key) - Special Chars");

    // Test Case 8: Long strings
    string long_s1 = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
    string long_s2 = "zyxwuvtsrqponmlkjihgfedcbazyxwuvtsrqponmlkjihgfedcba";
    string long_s3 = "azbycxdwevfugthsirjqkplomnmlkqjrishtgufvedxcybzaw"; // A slightly different permutation for a non-anagram check if needed
    
    vector<string> long_strs = {long_s1, long_s2};
    actual = groupAnagrams(long_strs);
    expected = {{long_s1, long_s2}};
    ASSERT_CONTAINER_EQ(sort_anagram_groups(actual), sort_anagram_groups(expected), "Group Anagrams (Sorted Key) - Long Strings");
}

void run_first_unique_char_tests() {
    cout << "\n--- Running First Unique Character Tests ---\n";

    // Test Case 1: Basic example
    ASSERT_EQ(firstUniqChar("leetcode"), 0, "FUC (HashMap) - leetcode");
    ASSERT_EQ(firstUniqChar_array("leetcode"), 0, "FUC (Array) - leetcode");

    // Test Case 2: Another basic example
    ASSERT_EQ(firstUniqChar("loveleetcode"), 2, "FUC (HashMap) - loveleetcode");
    ASSERT_EQ(firstUniqChar_array("loveleetcode"), 2, "FUC (Array) - loveleetcode");

    // Test Case 3: No unique character
    ASSERT_EQ(firstUniqChar("aabb"), -1, "FUC (HashMap) - aabb");
    ASSERT_EQ(firstUniqChar_array("aabb"), -1, "FUC (Array) - aabb");

    // Test Case 4: Empty string
    ASSERT_EQ(firstUniqChar(""), -1, "FUC (HashMap) - Empty String");
    ASSERT_EQ(firstUniqChar_array(""), -1, "FUC (Array) - Empty String");

    // Test Case 5: Single character
    ASSERT_EQ(firstUniqChar("a"), 0, "FUC (HashMap) - Single Char");
    ASSERT_EQ(firstUniqChar_array("a"), 0, "FUC (Array) - Single Char");

    // Test Case 6: Unique char at the end
    ASSERT_EQ(firstUniqChar("aabbccdeffg"), 6, "FUC (HashMap) - Unique at end"); // 'd'
    ASSERT_EQ(firstUniqChar_array("aabbccdeffg"), 6, "FUC (Array) - Unique at end");

    // Test Case 7: All characters are unique
    ASSERT_EQ(firstUniqChar("abcdef"), 0, "FUC (HashMap) - All Unique");
    ASSERT_EQ(firstUniqChar_array("abcdef"), 0, "FUC (Array) - All Unique");

    // Test Case 8: Mixed case (Note: current array solution is for lowercase only)
    // This will fail for firstUniqChar_array if it expects only lowercase.
    // For general ASCII, array size 256 is needed.
    // ASSERT_EQ(firstUniqChar("aAbBc"), 0, "FUC (HashMap) - Mixed Case");
    // ASSERT_EQ(firstUniqChar_array("aAbBc"), 0, "FUC (Array) - Mixed Case (Expected Fail if only lowercase)");
}

void run_my_hash_map_tests() {
    cout << "\n--- Running MyHashMap Tests ---\n";
    MyHashMap hashMap;

    // Test Case 1: Put and Get
    hashMap.put(1, 1);
    hashMap.put(2, 2);
    ASSERT_EQ(hashMap.get(1), 1, "MyHashMap - Get existing key 1");
    ASSERT_EQ(hashMap.get(3), -1, "MyHashMap - Get non-existing key 3");
    ASSERT_EQ(hashMap.get(2), 2, "MyHashMap - Get existing key 2");

    // Test Case 2: Update value
    hashMap.put(2, 1);
    ASSERT_EQ(hashMap.get(2), 1, "MyHashMap - Update key 2");

    // Test Case 3: Remove key
    hashMap.remove(2);
    ASSERT_EQ(hashMap.get(2), -1, "MyHashMap - Get removed key 2");

    // Test Case 4: Remove non-existing key
    hashMap.remove(3); // Should not crash
    ASSERT_EQ(hashMap.get(3), -1, "MyHashMap - Remove non-existing key 3");

    // Test Case 5: Insert multiple items, some causing collisions (modulo BUCKET_SIZE)
    // Example: 1000 and 0 would collide if BUCKET_SIZE = 1000
    // Example: 1 and 1001 would collide
    hashMap.put(1, 10);
    hashMap.put(1001, 20); // Collides with 1
    ASSERT_EQ(hashMap.get(1), 10, "MyHashMap - Collision Key 1");
    ASSERT_EQ(hashMap.get(1001), 20, "MyHashMap - Collision Key 1001");

    // Test Case 6: Update one of the colliding keys
    hashMap.put(1, 15);
    ASSERT_EQ(hashMap.get(1), 15, "MyHashMap - Update Colliding Key 1");
    ASSERT_EQ(hashMap.get(1001), 20, "MyHashMap - Check other colliding key 1001 after update");

    // Test Case 7: Remove one of the colliding keys
    hashMap.remove(1001);
    ASSERT_EQ(hashMap.get(1001), -1, "MyHashMap - Removed Colliding Key 1001");
    ASSERT_EQ(hashMap.get(1), 15, "MyHashMap - Check remaining colliding key 1");

    // Test Case 8: Large number of insertions/removals
    MyHashMap largeMap;
    for (int i = 0; i < 2000; ++i) { // Exceeds BUCKET_SIZE, ensuring collisions
        largeMap.put(i, i * 2);
    }
    ASSERT_EQ(largeMap.size(), 2000, "MyHashMap - Large insertions size");
    ASSERT_EQ(largeMap.get(500), 1000, "MyHashMap - Large insertions get 500");
    ASSERT_EQ(largeMap.get(1500), 3000, "MyHashMap - Large insertions get 1500");

    largeMap.remove(500);
    ASSERT_EQ(largeMap.get(500), -1, "MyHashMap - Large insertions remove 500");
    ASSERT_EQ(largeMap.size(), 1999, "MyHashMap - Large insertions size after remove");
    ASSERT_EQ(largeMap.get(1500), 3000, "MyHashMap - Large insertions get 1500 after remove");

    largeMap.put(500, 500 * 3); // Reinsert
    ASSERT_EQ(largeMap.get(500), 1500, "MyHashMap - Large insertions reinsert 500");
    ASSERT_EQ(largeMap.size(), 2000, "MyHashMap - Large insertions size after reinsert");
}


int main() {
    run_two_sum_tests();
    run_longest_consecutive_sequence_tests();
    run_group_anagrams_tests();
    run_first_unique_char_tests();
    run_my_hash_map_tests();

    TestFramework::run_all_tests();

    return 0;
}
```