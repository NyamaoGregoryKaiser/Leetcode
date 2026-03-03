```java
package com.example.stringmanipulation;

import com.example.stringmanipulation.problems.GroupAnagrams;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GroupAnagramsTest {

    private GroupAnagrams groupAnagrams;

    @BeforeEach
    void setUp() {
        groupAnagrams = new GroupAnagrams();
    }

    // Helper to normalize the output for comparison (sort outer and inner lists)
    private List<List<String>> normalizeOutput(List<List<String>> output) {
        output.forEach(Collections::sort);
        output.sort((l1, l2) -> {
            // Compare based on the first element if lists are not empty
            if (!l1.isEmpty() && !l2.isEmpty()) {
                return l1.get(0).compareTo(l2.get(0));
            }
            return Integer.compare(l1.size(), l2.size()); // Fallback if lists can be empty
        });
        return output;
    }

    // Test cases for groupAnagramsBySorting
    @Test
    void testGroupAnagramsBySorting_Example1() {
        String[] strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
        List<List<String>> expected = Arrays.asList(
                Arrays.asList("ate", "eat", "tea"),
                Arrays.asList("bat"),
                Arrays.asList("nat", "tan")
        );
        List<List<String>> result = groupAnagrams.groupAnagramsBySorting(strs);
        assertEquals(normalizeOutput(expected), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsBySorting_EmptyString() {
        String[] strs = {""};
        List<List<String>> expected = Collections.singletonList(Collections.singletonList(""));
        List<List<String>> result = groupAnagrams.groupAnagramsBySorting(strs);
        assertEquals(normalizeOutput(expected), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsBySorting_SingleCharString() {
        String[] strs = {"a"};
        List<List<String>> expected = Collections.singletonList(Collections.singletonList("a"));
        List<List<String>> result = groupAnagrams.groupAnagramsBySorting(strs);
        assertEquals(normalizeOutput(expected), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsBySorting_NoAnagrams() {
        String[] strs = {"abc", "def", "ghi"};
        List<List<String>> expected = Arrays.asList(
                Collections.singletonList("abc"),
                Collections.singletonList("def"),
                Collections.singletonList("ghi")
        );
        List<List<String>> result = groupAnagrams.groupAnagramsBySorting(strs);
        assertEquals(normalizeOutput(expected), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsBySorting_AllAnagrams() {
        String[] strs = {"listen", "silent", "enlist"};
        List<List<String>> expected = Collections.singletonList(Arrays.asList("enlist", "listen", "silent"));
        List<List<String>> result = groupAnagrams.groupAnagramsBySorting(strs);
        assertEquals(normalizeOutput(expected), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsBySorting_MixedCases() {
        String[] strs = {"a", "b", "c", "ab", "ba", "ca"};
        List<List<String>> expected = Arrays.asList(
                Collections.singletonList("a"),
                Collections.singletonList("b"),
                Collections.singletonList("c"),
                Arrays.asList("ab", "ba"),
                Collections.singletonList("ca") // 'ac' is not 'ca' anagram
        );
        List<List<String>> result = groupAnagrams.groupAnagramsBySorting(strs);
        // Special normalization for "ca" vs "ac" if it was present
        List<List<String>> expectedSorted = new ArrayList<>();
        expectedSorted.add(Collections.singletonList("a"));
        expectedSorted.add(Arrays.asList("ab", "ba"));
        expectedSorted.add(Collections.singletonList("b"));
        expectedSorted.add(Collections.singletonList("c"));
        expectedSorted.add(Collections.singletonList("ca"));
        assertEquals(normalizeOutput(expectedSorted), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsBySorting_LongStrings() {
        String[] strs = {"abcdefghijklmnopqrstuvwxyz", "zyxwuvtsrqponmlkjihgfedcba"};
        List<List<String>> expected = Collections.singletonList(Arrays.asList("abcdefghijklmnopqrstuvwxyz", "zyxwuvtsrqponmlkjihgfedcba"));
        List<List<String>> result = groupAnagrams.groupAnagramsBySorting(strs);
        assertEquals(normalizeOutput(expected), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsBySorting_NullInput() {
        String[] strs = null;
        List<List<String>> result = groupAnagrams.groupAnagramsBySorting(strs);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGroupAnagramsBySorting_EmptyArray() {
        String[] strs = {};
        List<List<String>> result = groupAnagrams.groupAnagramsBySorting(strs);
        assertTrue(result.isEmpty());
    }

    // Test cases for groupAnagramsByCounting
    @Test
    void testGroupAnagramsByCounting_Example1() {
        String[] strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
        List<List<String>> expected = Arrays.asList(
                Arrays.asList("ate", "eat", "tea"),
                Arrays.asList("bat"),
                Arrays.asList("nat", "tan")
        );
        List<List<String>> result = groupAnagrams.groupAnagramsByCounting(strs);
        assertEquals(normalizeOutput(expected), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsByCounting_EmptyString() {
        String[] strs = {""};
        List<List<String>> expected = Collections.singletonList(Collections.singletonList(""));
        List<List<String>> result = groupAnagrams.groupAnagramsByCounting(strs);
        assertEquals(normalizeOutput(expected), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsByCounting_SingleCharString() {
        String[] strs = {"a"};
        List<List<String>> expected = Collections.singletonList(Collections.singletonList("a"));
        List<List<String>> result = groupAnagrams.groupAnagramsByCounting(strs);
        assertEquals(normalizeOutput(expected), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsByCounting_NoAnagrams() {
        String[] strs = {"abc", "def", "ghi"};
        List<List<String>> expected = Arrays.asList(
                Collections.singletonList("abc"),
                Collections.singletonList("def"),
                Collections.singletonList("ghi")
        );
        List<List<String>> result = groupAnagrams.groupAnagramsByCounting(strs);
        assertEquals(normalizeOutput(expected), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsByCounting_AllAnagrams() {
        String[] strs = {"listen", "silent", "enlist"};
        List<List<String>> expected = Collections.singletonList(Arrays.asList("enlist", "listen", "silent"));
        List<List<String>> result = groupAnagrams.groupAnagramsByCounting(strs);
        assertEquals(normalizeOutput(expected), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsByCounting_MixedCases() {
        String[] strs = {"a", "b", "c", "ab", "ba", "ca"};
        List<List<String>> expectedSorted = new ArrayList<>();
        expectedSorted.add(Collections.singletonList("a"));
        expectedSorted.add(Arrays.asList("ab", "ba"));
        expectedSorted.add(Collections.singletonList("b"));
        expectedSorted.add(Collections.singletonList("c"));
        expectedSorted.add(Collections.singletonList("ca"));
        List<List<String>> result = groupAnagrams.groupAnagramsByCounting(strs);
        assertEquals(normalizeOutput(expectedSorted), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsByCounting_LongStrings() {
        String[] strs = {"abcdefghijklmnopqrstuvwxyz", "zyxwuvtsrqponmlkjihgfedcba"};
        List<List<String>> expected = Collections.singletonList(Arrays.asList("abcdefghijklmnopqrstuvwxyz", "zyxwuvtsrqponmlkjihgfedcba"));
        List<List<String>> result = groupAnagrams.groupAnagramsByCounting(strs);
        assertEquals(normalizeOutput(expected), normalizeOutput(result));
    }

    @Test
    void testGroupAnagramsByCounting_NullInput() {
        String[] strs = null;
        List<List<String>> result = groupAnagrams.groupAnagramsByCounting(strs);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGroupAnagramsByCounting_EmptyArray() {
        String[] strs = {};
        List<List<String>> result = groupAnagrams.groupAnagramsByCounting(strs);
        assertTrue(result.isEmpty());
    }
}
```