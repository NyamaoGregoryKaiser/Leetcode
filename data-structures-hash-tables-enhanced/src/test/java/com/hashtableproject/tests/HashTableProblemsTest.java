```java
package com.hashtableproject.tests;

import com.hashtableproject.problems.HashTableProblems.*;
import com.hashtableproject.utils.CustomHashTable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the HashTableProblems class and CustomHashTable.
 * Uses JUnit 5.
 */
@DisplayName("Hash Table Interview Problems Test Suite")
class HashTableProblemsTest {

    private TwoSum twoSum;
    private LongestConsecutiveSequence longestConsecutiveSequence;
    private GroupAnagrams groupAnagrams;
    private SubarraySumEqualsK subarraySumEqualsK;

    @BeforeEach
    void setUp() {
        twoSum = new TwoSum();
        longestConsecutiveSequence = new LongestConsecutiveSequence();
        groupAnagrams = new GroupAnagrams();
        subarraySumEqualsK = new SubarraySumEqualsK();
    }

    // --- Two Sum Tests ---
    @Test
    @DisplayName("TwoSum: Optimal solution - Basic case")
    void twoSum_Optimal_BasicCase() {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] expected = {0, 1};
        int[] result = twoSum.twoSum_Optimal(nums, target);
        Arrays.sort(result); // Sort to ensure order doesn't matter for comparison
        assertArrayEquals(expected, result);
    }

    @Test
    @DisplayName("TwoSum: Optimal solution - No solution")
    void twoSum_Optimal_NoSolution() {
        int[] nums = {1, 2, 3, 4};
        int target = 10;
        assertThrows(IllegalArgumentException.class, () -> twoSum.twoSum_Optimal(nums, target));
    }

    @Test
    @DisplayName("TwoSum: Optimal solution - Duplicates in array")
    void twoSum_Optimal_Duplicates() {
        int[] nums = {3, 3};
        int target = 6;
        int[] expected = {0, 1};
        int[] result = twoSum.twoSum_Optimal(nums, target);
        Arrays.sort(result);
        assertArrayEquals(expected, result);

        nums = new int[]{3, 2, 4};
        target = 6;
        expected = new int[]{1, 2};
        result = twoSum.twoSum_Optimal(nums, target);
        Arrays.sort(result);
        assertArrayEquals(expected, result);
    }

    @Test
    @DisplayName("TwoSum: Optimal solution - Negative numbers")
    void twoSum_Optimal_NegativeNumbers() {
        int[] nums = {-1, -2, -3, -4, -5};
        int target = -8;
        int[] expected = {2, 4};
        int[] result = twoSum.twoSum_Optimal(nums, target);
        Arrays.sort(result);
        assertArrayEquals(expected, result);
    }

    @Test
    @DisplayName("TwoSum: Brute force solution - Basic case")
    void twoSum_BruteForce_BasicCase() {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] expected = {0, 1};
        int[] result = twoSum.twoSum_BruteForce(nums, target);
        Arrays.sort(result);
        assertArrayEquals(expected, result);
    }

    @Test
    @DisplayName("TwoSum: Brute force solution - No solution")
    void twoSum_BruteForce_NoSolution() {
        int[] nums = {1, 2, 3, 4};
        int target = 10;
        assertThrows(IllegalArgumentException.class, () -> twoSum.twoSum_BruteForce(nums, target));
    }

    // --- Longest Consecutive Sequence Tests ---
    @Test
    @DisplayName("LongestConsecutiveSequence: Optimal solution - Basic case")
    void longestConsecutive_Optimal_BasicCase() {
        int[] nums = {100, 4, 200, 1, 3, 2};
        assertEquals(4, longestConsecutiveSequence.longestConsecutive_Optimal(nums)); // Sequence: 1,2,3,4
    }

    @Test
    @DisplayName("LongestConsecutiveSequence: Optimal solution - Empty array")
    void longestConsecutive_Optimal_EmptyArray() {
        int[] nums = {};
        assertEquals(0, longestConsecutiveSequence.longestConsecutive_Optimal(nums));
    }

    @Test
    @DisplayName("LongestConsecutiveSequence: Optimal solution - Single element array")
    void longestConsecutive_Optimal_SingleElement() {
        int[] nums = {1};
        assertEquals(1, longestConsecutiveSequence.longestConsecutive_Optimal(nums));
    }

    @Test
    @DisplayName("LongestConsecutiveSequence: Optimal solution - Unsorted array with duplicates")
    void longestConsecutive_Optimal_Duplicates() {
        int[] nums = {0, 3, 7, 2, 2, 5, 8, 4, 6, 0, 1};
        assertEquals(9, longestConsecutiveSequence.longestConsecutive_Optimal(nums)); // Sequence: 0,1,2,3,4,5,6,7,8
    }

    @Test
    @DisplayName("LongestConsecutiveSequence: Optimal solution - Disconnected sequences")
    void longestConsecutive_Optimal_Disconnected() {
        int[] nums = {1, 2, 0, 1, 3, 5, 6, 7};
        assertEquals(4, longestConsecutiveSequence.longestConsecutive_Optimal(nums)); // Sequence: 0,1,2,3
    }

    @Test
    @DisplayName("LongestConsecutiveSequence: Optimal solution - All elements are consecutive")
    void longestConsecutive_Optimal_AllConsecutive() {
        int[] nums = {5, 4, 3, 2, 1};
        assertEquals(5, longestConsecutiveSequence.longestConsecutive_Optimal(nums));
    }

    @Test
    @DisplayName("LongestConsecutiveSequence: Sorting approach - Basic case")
    void longestConsecutive_Sorting_BasicCase() {
        int[] nums = {100, 4, 200, 1, 3, 2};
        assertEquals(4, longestConsecutiveSequence.longestConsecutive_Sorting(nums));
    }

    @Test
    @DisplayName("LongestConsecutiveSequence: Sorting approach - Empty array")
    void longestConsecutive_Sorting_EmptyArray() {
        int[] nums = {};
        assertEquals(0, longestConsecutiveSequence.longestConsecutive_Sorting(nums));
    }

    @Test
    @DisplayName("LongestConsecutiveSequence: Sorting approach - Duplicates")
    void longestConsecutive_Sorting_Duplicates() {
        int[] nums = {0, 3, 7, 2, 2, 5, 8, 4, 6, 0, 1};
        assertEquals(9, longestConsecutiveSequence.longestConsecutive_Sorting(nums));
    }

    // --- Group Anagrams Tests ---
    @Test
    @DisplayName("GroupAnagrams: Sorted string key - Basic case")
    void groupAnagrams_SortedStringKey_BasicCase() {
        String[] strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
        List<List<String>> result = groupAnagrams.groupAnagrams_SortedStringKey(strs);
        assertGroupAnagramsResult(result, List.of(
                List.of("bat"),
                List.of("nat", "tan"),
                List.of("ate", "eat", "tea")
        ));
    }

    @Test
    @DisplayName("GroupAnagrams: Sorted string key - Empty array")
    void groupAnagrams_SortedStringKey_EmptyArray() {
        String[] strs = {};
        List<List<String>> result = groupAnagrams.groupAnagrams_SortedStringKey(strs);
        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("GroupAnagrams: Sorted string key - Single word array")
    void groupAnagrams_SortedStringKey_SingleWord() {
        String[] strs = {"a"};
        List<List<String>> result = groupAnagrams.groupAnagrams_SortedStringKey(strs);
        assertGroupAnagramsResult(result, List.of(List.of("a")));
    }

    @Test
    @DisplayName("GroupAnagrams: Sorted string key - No anagrams")
    void groupAnagrams_SortedStringKey_NoAnagrams() {
        String[] strs = {"a", "b", "c"};
        List<List<String>> result = groupAnagrams.groupAnagrams_SortedStringKey(strs);
        assertGroupAnagramsResult(result, List.of(List.of("a"), List.of("b"), List.of("c")));
    }

    @Test
    @DisplayName("GroupAnagrams: Sorted string key - Mixed case and long strings (requires lowercase handling not implemented, assumes all lowercase)")
    void groupAnagrams_SortedStringKey_MixedCase() {
        String[] strs = {"listen", "silent", "top", "pot", "enlist"};
        List<List<String>> result = groupAnagrams.groupAnagrams_SortedStringKey(strs);
        assertGroupAnagramsResult(result, List.of(
                List.of("listen", "silent", "enlist"),
                List.of("top", "pot")
        ));
    }

    @Test
    @DisplayName("GroupAnagrams: Char count key - Basic case")
    void groupAnagrams_CharCountKey_BasicCase() {
        String[] strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
        List<List<String>> result = groupAnagrams.groupAnagrams_CharCountKey(strs);
        assertGroupAnagramsResult(result, List.of(
                List.of("bat"),
                List.of("nat", "tan"),
                List.of("ate", "eat", "tea")
        ));
    }

    @Test
    @DisplayName("GroupAnagrams: Char count key - Empty array")
    void groupAnagrams_CharCountKey_EmptyArray() {
        String[] strs = {};
        List<List<String>> result = groupAnagrams.groupAnagrams_CharCountKey(strs);
        assertTrue(result.isEmpty());
    }

    // Helper to compare lists of lists for anagrams (order of inner lists and items within them doesn't matter)
    private void assertGroupAnagramsResult(List<List<String>> actual, List<List<String>> expected) {
        assertEquals(expected.size(), actual.size(), "Number of anagram groups should match.");

        // Sort inner lists and then outer list for canonical comparison
        List<List<String>> sortedActual = actual.stream()
                .map(list -> {
                    Collections.sort(list);
                    return list;
                })
                .sorted((l1, l2) -> String.join("", l1).compareTo(String.join("", l2)))
                .collect(Collectors.toList());

        List<List<String>> sortedExpected = expected.stream()
                .map(list -> {
                    Collections.sort(list);
                    return list;
                })
                .sorted((l1, l2) -> String.join("", l1).compareTo(String.join("", l2)))
                .collect(Collectors.toList());

        assertEquals(sortedExpected, sortedActual, "Anagram groups should match.");
    }

    // --- Subarray Sum Equals K Tests ---
    @Test
    @DisplayName("SubarraySumEqualsK: Optimal solution - Basic case")
    void subarraySum_Optimal_BasicCase() {
        int[] nums = {1, 1, 1};
        int k = 2;
        assertEquals(2, subarraySumEqualsK.subarraySum_Optimal(nums, k)); // [1,1] (indices 0,1), [1,1] (indices 1,2)
    }

    @Test
    @DisplayName("SubarraySumEqualsK: Optimal solution - Empty array")
    void subarraySum_Optimal_EmptyArray() {
        int[] nums = {};
        int k = 0;
        assertEquals(0, subarraySumEqualsK.subarraySum_Optimal(nums, k));
    }

    @Test
    @DisplayName("SubarraySumEqualsK: Optimal solution - Single element array, matches K")
    void subarraySum_Optimal_SingleElementMatch() {
        int[] nums = {5};
        int k = 5;
        assertEquals(1, subarraySumEqualsK.subarraySum_Optimal(nums, k));
    }

    @Test
    @DisplayName("SubarraySumEqualsK: Optimal solution - Single element array, no match")
    void subarraySum_Optimal_SingleElementNoMatch() {
        int[] nums = {5};
        int k = 10;
        assertEquals(0, subarraySumEqualsK.subarraySum_Optimal(nums, k));
    }

    @Test
    @DisplayName("SubarraySumEqualsK: Optimal solution - Contains negative numbers")
    void subarraySum_Optimal_NegativeNumbers() {
        int[] nums = {1, -1, 1, -1, 1};
        int k = 0;
        assertEquals(4, subarraySumEqualsK.subarraySum_Optimal(nums, k)); // [1,-1], [-1,1], [1,-1], [1,-1,1,-1]
    }

    @Test
    @DisplayName("SubarraySumEqualsK: Optimal solution - Multiple occurrences of sum K")
    void subarraySum_Optimal_MultipleOccurrences() {
        int[] nums = {1, 2, 3};
        int k = 3;
        assertEquals(2, subarraySumEqualsK.subarraySum_Optimal(nums, k)); // [3], [1,2]
    }

    @Test
    @DisplayName("SubarraySumEqualsK: Optimal solution - K is 0")
    void subarraySum_Optimal_KIsZero() {
        int[] nums = {0, 0, 0};
        int k = 0;
        assertEquals(6, subarraySumEqualsK.subarraySum_Optimal(nums, k)); // [0] (0), [0] (1), [0] (2), [0,0](0,1), [0,0](1,2), [0,0,0](0,2)
    }

    @Test
    @DisplayName("SubarraySumEqualsK: Brute force solution - Basic case")
    void subarraySum_BruteForce_BasicCase() {
        int[] nums = {1, 1, 1};
        int k = 2;
        assertEquals(2, subarraySumEqualsK.subarraySum_BruteForce(nums, k));
    }

    @Test
    @DisplayName("SubarraySumEqualsK: Brute force solution - Negative numbers")
    void subarraySum_BruteForce_NegativeNumbers() {
        int[] nums = {1, -1, 1, -1, 1};
        int k = 0;
        assertEquals(4, subarraySumEqualsK.subarraySum_BruteForce(nums, k));
    }


    // --- CustomHashTable Tests ---
    @Test
    @DisplayName("CustomHashTable: Put and Get operations")
    void customHashTable_PutGet() {
        CustomHashTable<String, Integer> map = new CustomHashTable<>();
        assertTrue(map.isEmpty());
        assertEquals(0, map.size());

        map.put("one", 1);
        map.put("two", 2);
        map.put("three", 3);

        assertFalse(map.isEmpty());
        assertEquals(3, map.size());
        assertEquals(1, map.get("one"));
        assertEquals(2, map.get("two"));
        assertEquals(3, map.get("three"));
        assertNull(map.get("four")); // Key not present
    }

    @Test
    @DisplayName("CustomHashTable: Update existing key")
    void customHashTable_Update() {
        CustomHashTable<String, Integer> map = new CustomHashTable<>();
        map.put("key1", 10);
        assertEquals(10, map.get("key1"));
        assertEquals(1, map.size());

        map.put("key1", 20); // Update
        assertEquals(20, map.get("key1"));
        assertEquals(1, map.size()); // Size should not change
    }

    @Test
    @DisplayName("CustomHashTable: ContainsKey method")
    void customHashTable_ContainsKey() {
        CustomHashTable<String, Integer> map = new CustomHashTable<>();
        map.put("apple", 1);
        assertTrue(map.containsKey("apple"));
        assertFalse(map.containsKey("banana"));
    }

    @Test
    @DisplayName("CustomHashTable: Remove operation")
    void customHashTable_Remove() {
        CustomHashTable<String, Integer> map = new CustomHashTable<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        assertEquals(3, map.size());
        assertEquals(2, map.remove("B"));
        assertEquals(2, map.size());
        assertFalse(map.containsKey("B"));
        assertNull(map.get("B"));
        assertNull(map.remove("D")); // Remove non-existent key

        assertEquals(1, map.remove("A"));
        assertEquals(1, map.size());
        assertFalse(map.containsKey("A"));

        assertEquals(3, map.remove("C"));
        assertTrue(map.isEmpty());
    }

    @Test
    @DisplayName("CustomHashTable: Clear operation")
    void customHashTable_Clear() {
        CustomHashTable<String, Integer> map = new CustomHashTable<>();
        map.put("a", 1);
        map.put("b", 2);
        map.clear();
        assertTrue(map.isEmpty());
        assertEquals(0, map.size());
        assertNull(map.get("a"));
    }

    @Test
    @DisplayName("CustomHashTable: Handling null keys")
    void customHashTable_NullKey() {
        CustomHashTable<String, Integer> map = new CustomHashTable<>();
        map.put(null, 100);
        assertTrue(map.containsKey(null));
        assertEquals(100, map.get(null));
        assertEquals(1, map.size());

        map.put(null, 200); // Update null key
        assertEquals(200, map.get(null));
        assertEquals(1, map.size());

        assertEquals(200, map.remove(null));
        assertFalse(map.containsKey(null));
        assertEquals(0, map.size());
    }

    @Test
    @DisplayName("CustomHashTable: Collision handling (basic check - relies on specific hash codes)")
    void customHashTable_CollisionHandling() {
        // This test relies on specific hash codes to ensure collisions.
        // E.g., if capacity is 16, keys with same hashCode() % 16 will collide.
        // Assuming default string hashCode() and current capacity.
        CustomHashTable<String, Integer> map = new CustomHashTable<>(4, 0.75f); // Small capacity to force collisions

        map.put("FB", 1); // hashCode: 2236. 2236 % 4 = 0
        map.put("Ea", 2); // hashCode: 2236. 2236 % 4 = 0 (Collision!)
        map.put("apple", 3);
        map.put("banana", 4);

        assertEquals(4, map.size());
        assertEquals(1, map.get("FB"));
        assertEquals(2, map.get("Ea")); // Should still retrieve correctly
        assertEquals(3, map.get("apple"));

        // Check bucket sizes (implementation specific, but good for understanding)
        assertEquals(2, map.getBucketSize(map.getBucketIndex("FB"))); // Bucket 0 should have 2 elements
        assertEquals(1, map.getBucketSize(map.getBucketIndex("apple")));
    }

    @Test
    @DisplayName("CustomHashTable: Resize operation")
    void customHashTable_Resize() {
        CustomHashTable<Integer, String> map = new CustomHashTable<>(2, 0.75f); // Capacity 2, threshold 1
        assertEquals(2, map.getCapacity());

        map.put(1, "one"); // size = 1, triggers resize
        // At this point, size 1 == threshold 1, so put() will call resize *before* adding
        // the item, new capacity will be 4, then item added.
        // If resize check is *after* add, then first item won't resize, second might.
        // Our implementation checks before, so first `put` already has capacity 2, size 0.
        // After put(1, "one"), size becomes 1. threshold is (2 * 0.75) = 1.
        // Next put will trigger resize.
        map.put(2, "two"); // size = 2 (exceeds threshold), triggers resize to 4, then adds 2.
        assertEquals(4, map.getCapacity());
        assertEquals(2, map.size());

        map.put(3, "three"); // size = 3
        assertEquals(4, map.getCapacity()); // No resize yet
        assertEquals(3, map.size());

        map.put(4, "four"); // size = 4 (exceeds threshold 4 * 0.75 = 3), triggers resize to 8
        assertEquals(8, map.getCapacity());
        assertEquals(4, map.size());

        assertEquals("one", map.get(1));
        assertEquals("two", map.get(2));
        assertEquals("three", map.get(3));
        assertEquals("four", map.get(4));
    }
}
```