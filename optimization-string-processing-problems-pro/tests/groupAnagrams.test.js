```javascript
/**
 * @fileoverview Test suite for Group Anagrams problem.
 */

const { testSuite, assertDeepEquals } = require('../src/utils/assert');
const {
    groupAnagramsSorting,
    groupAnagramsCounting
} = require('../src/problems/groupAnagrams');

// Helper to normalize results for comparison, since order of groups and elements within groups doesn't matter
const normalizeGroups = (groups) => {
    return groups.map(group => group.sort()).sort((a, b) => {
        if (a.length !== b.length) return a.length - b.length;
        return a[0].localeCompare(b[0]);
    });
};

testSuite('Group Anagrams - Sorting Characters', () => {
    it('should group basic anagrams correctly', () => {
        const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
        const expected = [
            ["eat", "tea", "ate"],
            ["tan", "nat"],
            ["bat"]
        ];
        const result = groupAnagramsSorting(input);
        assertDeepEquals(normalizeGroups(result), normalizeGroups(expected));
    });

    it('should handle an empty input array', () => {
        const input = [];
        const expected = [];
        assertDeepEquals(groupAnagramsSorting(input), expected);
    });

    it('should handle an array with a single empty string', () => {
        const input = [""];
        const expected = [[""]];
        assertDeepEquals(normalizeGroups(groupAnagramsSorting(input)), normalizeGroups(expected));
    });

    it('should handle an array with multiple empty strings', () => {
        const input = ["", ""];
        const expected = [["", ""]];
        assertDeepEquals(normalizeGroups(groupAnagramsSorting(input)), normalizeGroups(expected));
    });

    it('should handle an array with no anagrams', () => {
        const input = ["a", "b", "c"];
        const expected = [
            ["a"],
            ["b"],
            ["c"]
        ];
        assertDeepEquals(normalizeGroups(groupAnagramsSorting(input)), normalizeGroups(expected));
    });

    it('should handle an array with all strings being anagrams', () => {
        const input = ["abc", "bca", "cab"];
        const expected = [
            ["abc", "bca", "cab"]
        ];
        assertDeepEquals(normalizeGroups(groupAnagramsSorting(input)), normalizeGroups(expected));
    });

    it('should handle strings with different lengths correctly', () => {
        const input = ["a", "ab", "ba", "abc"];
        const expected = [
            ["a"],
            ["ab", "ba"],
            ["abc"]
        ];
        assertDeepEquals(normalizeGroups(groupAnagramsSorting(input)), normalizeGroups(expected));
    });

    it('should handle strings with mixed cases (if problem allowed, assuming lowercase for this problem)', () => {
        // Based on problem constraint: `strs[i]` consists of lowercase English letters.
        // This test case demonstrates what would happen if mixed case was allowed, but it won't be hit with current constraints.
        const input = ["Aa", "aA", "bb"];
        const expected = [
            ["Aa", "aA"],
            ["bb"]
        ];
        // For testing purposes, we'd need to modify problem or normalize case.
        // Sticking to lowercase only per problem constraint.
        const lowercaseInput = input.map(s => s.toLowerCase());
        const lowercaseExpected = expected.map(group => group.map(s => s.toLowerCase()));
        assertDeepEquals(normalizeGroups(groupAnagramsSorting(lowercaseInput)), normalizeGroups(lowercaseExpected));
    });

    it('should handle single string input', () => {
        const input = ["hello"];
        const expected = [
            ["hello"]
        ];
        assertDeepEquals(normalizeGroups(groupAnagramsSorting(input)), normalizeGroups(expected));
    });
});


testSuite('Group Anagrams - Character Counting Array', () => {
    it('should group basic anagrams correctly', () => {
        const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
        const expected = [
            ["eat", "tea", "ate"],
            ["tan", "nat"],
            ["bat"]
        ];
        const result = groupAnagramsCounting(input);
        assertDeepEquals(normalizeGroups(result), normalizeGroups(expected));
    });

    it('should handle an empty input array', () => {
        const input = [];
        const expected = [];
        assertDeepEquals(groupAnagramsCounting(input), expected);
    });

    it('should handle an array with a single empty string', () => {
        const input = [""];
        const expected = [[""]];
        assertDeepEquals(normalizeGroups(groupAnagramsCounting(input)), normalizeGroups(expected));
    });

    it('should handle an array with multiple empty strings', () => {
        const input = ["", ""];
        const expected = [["", ""]];
        assertDeepEquals(normalizeGroups(groupAnagramsCounting(input)), normalizeGroups(expected));
    });

    it('should handle an array with no anagrams', () => {
        const input = ["a", "b", "c"];
        const expected = [
            ["a"],
            ["b"],
            ["c"]
        ];
        assertDeepEquals(normalizeGroups(groupAnagramsCounting(input)), normalizeGroups(expected));
    });

    it('should handle an array with all strings being anagrams', () => {
        const input = ["abc", "bca", "cab"];
        const expected = [
            ["abc", "bca", "cab"]
        ];
        assertDeepEquals(normalizeGroups(groupAnagramsCounting(input)), normalizeGroups(expected));
    });

    it('should handle strings with different lengths correctly', () => {
        const input = ["a", "ab", "ba", "abc"];
        const expected = [
            ["a"],
            ["ab", "ba"],
            ["abc"]
        ];
        assertDeepEquals(normalizeGroups(groupAnagramsCounting(input)), normalizeGroups(expected));
    });

    it('should handle single string input', () => {
        const input = ["hello"];
        const expected = [
            ["hello"]
        ];
        assertDeepEquals(normalizeGroups(groupAnagramsCounting(input)), normalizeGroups(expected));
    });

    it('should handle complex cases with multiple groups and overlaps', () => {
        const input = ["duh", "ill"]; // No anagrams
        const expected = [
            ["duh"],
            ["ill"]
        ];
        assertDeepEquals(normalizeGroups(groupAnagramsCounting(input)), normalizeGroups(expected));
    });

    it('should handle "aabbaa" "ababab" "bababa"', () => {
        const input = ["aabbaa", "ababab", "bababa"];
        const expected = [
            ["aabbaa"],
            ["ababab", "bababa"]
        ];
        assertDeepEquals(normalizeGroups(groupAnagramsCounting(input)), normalizeGroups(expected));
    });
});
```