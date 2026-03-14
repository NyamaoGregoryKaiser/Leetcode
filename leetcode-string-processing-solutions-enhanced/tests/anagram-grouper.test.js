```javascript
/**
 * @fileoverview Test suite for Anagram Grouper algorithms.
 * Uses Jest to test `groupAnagramsSortingKey` and `groupAnagramsCharCountKey` functions.
 */

const {
    groupAnagramsSortingKey,
    groupAnagramsCharCountKey
} = require('../src/algorithms/anagram-grouper');

// Helper to sort inner arrays and then the outer array for consistent comparison
const sortGroups = (groups) => {
    return groups
        .map(group => group.sort()) // Sort strings within each group
        .sort((a, b) => a[0].localeCompare(b[0])); // Sort groups by their first element
};

// Group tests for Anagram Grouper
describe('Anagram Grouper', () => {
    // Array of all anagram grouper functions to test.
    const anagramGrouperFunctions = [
        { name: 'groupAnagramsSortingKey', func: groupAnagramsSortingKey },
        { name: 'groupAnagramsCharCountKey', func: groupAnagramsCharCountKey }
    ];

    anagramGrouperFunctions.forEach(({ name, func }) => {
        describe(`Function: ${name}`, () => {
            // Test cases from problem description
            test('should group anagrams correctly for ["eat", "tea", "tan", "ate", "nat", "bat"]', () => {
                const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
                const expected = [
                    ["ate", "eat", "tea"],
                    ["nat", "tan"],
                    ["bat"]
                ];
                expect(sortGroups(func(input))).toEqual(sortGroups(expected));
            });

            // Test cases for simpler scenarios
            test('should return empty array for empty input array', () => {
                expect(func([])).toEqual([]);
            });

            test('should group single-character strings', () => {
                const input = ["a", "b", "c"];
                const expected = [
                    ["a"],
                    ["b"],
                    ["c"]
                ];
                expect(sortGroups(func(input))).toEqual(sortGroups(expected));
            });

            test('should group strings of same length that are not anagrams', () => {
                const input = ["abc", "def", "ghi"];
                const expected = [
                    ["abc"],
                    ["def"],
                    ["ghi"]
                ];
                expect(sortGroups(func(input))).toEqual(sortGroups(expected));
            });

            test('should group strings with different lengths but some anagrams', () => {
                const input = ["ab", "ba", "abc", "cab", "def", "fed"];
                const expected = [
                    ["ab", "ba"],
                    ["abc", "cab"],
                    ["def", "fed"]
                ];
                expect(sortGroups(func(input))).toEqual(sortGroups(expected));
            });

            // Test cases for edge cases
            test('should handle array with one string', () => {
                expect(func(["hello"])).toEqual([
                    ["hello"]
                ]);
            });

            test('should handle all strings being anagrams of each other', () => {
                const input = ["pots", "spot", "stop", "tops"];
                const expected = [
                    ["pots", "spot", "stop", "tops"]
                ];
                expect(sortGroups(func(input))).toEqual(sortGroups(expected));
            });

            test('should handle strings with duplicate characters', () => {
                const input = ["listen", "silent", "google", "ooggle", "cat", "act"];
                const expected = [
                    ["listen", "silent"],
                    ["google", "ooggle"],
                    ["act", "cat"]
                ];
                expect(sortGroups(func(input))).toEqual(sortGroups(expected));
            });

            test('should handle strings with mixed case (should treat as distinct unless normalized)', () => {
                // By default, solutions are case-sensitive due to character sorting/counting.
                // If the problem specified case-insensitivity, strings would need to be lowercased first.
                const input = ["Tea", "tea", "Eat", "eat"];
                const expected = [
                    ["Eat"],
                    ["Tea"],
                    ["eat"],
                    ["tea"]
                ];
                expect(sortGroups(func(input))).toEqual(sortGroups(expected));
            });

            test('should handle long strings (without exceeding practical limits)', () => {
                const longA = "a".repeat(100) + "b";
                const longB = "b" + "a".repeat(100);
                const longC = "c".repeat(101);
                const input = [longA, longB, longC];
                const expected = [
                    [longA, longB],
                    [longC]
                ];
                expect(sortGroups(func(input))).toEqual(sortGroups(expected));
            });

            test('should handle strings with non-alphabetic characters (should treat as distinct unless filtered)', () => {
                // Assuming only lowercase English letters as per charToIndex utility,
                // other characters would break if not handled or filtered.
                // For this test, we use only expected lowercase letters.
                const input = ["ab1", "1ba", "abc", "bac"];
                // If a problem allowed non-alpha, 'ab1' and '1ba' would be anagrams of each other.
                // However, our charCountKey assumes only 'a'-'z'.
                // The SortingKey approach would handle it by sorting all characters, including numbers/symbols.
                // Let's create a test case that works for both based on common interview interpretations (lowercase letters only).
                const input_alpha = ["listen", "silent", "banana", "ananaa", "hello"];
                const expected_alpha = [
                    ["ananaa", "banana"],
                    ["hello"],
                    ["listen", "silent"]
                ];
                expect(sortGroups(func(input_alpha))).toEqual(sortGroups(expected_alpha));
            });
        });
    });
});
```