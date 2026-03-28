```typescript
/**
 * @file tests/problem3-group-anagrams.test.ts
 * @description Test suite for the Group Anagrams problem.
 */

import { groupAnagrams } from '../src/main';
import { groupAnagramsBruteForce } from '../implementations/brute-force-problems';

// Helper to sort the inner arrays and the outer array for consistent comparison
const sortResult = (result: string[][]): string[][] => {
    return result.map(group => group.sort()).sort((a, b) => a.join('').localeCompare(b.join('')));
};

describe('Group Anagrams', () => {
    // Test cases for optimal hash map solution
    describe('Optimal Solution (Hash Map)', () => {
        test('should group anagrams correctly for a basic set', () => {
            const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
            const expected = [
                ["ate", "eat", "tea"],
                ["nat", "tan"],
                ["bat"]
            ];
            expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
        });

        test('should handle an empty array', () => {
            const strs: string[] = [];
            expect(groupAnagrams(strs)).toEqual([]);
        });

        test('should handle an array with a single empty string', () => {
            const strs = [""];
            expect(groupAnagrams(strs)).toEqual([[""]]);
        });

        test('should handle an array with multiple empty strings', () => {
            const strs = ["", ""];
            expect(groupAnagrams(strs)).toEqual([["", ""]]);
        });

        test('should handle an array with a single non-anagram string', () => {
            const strs = ["a"];
            expect(groupAnagrams(strs)).toEqual([["a"]]);
        });

        test('should handle an array where all strings are unique (no anagrams)', () => {
            const strs = ["abc", "def", "ghi"];
            const expected = [
                ["abc"],
                ["def"],
                ["ghi"]
            ];
            expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
        });

        test('should handle long strings', () => {
            const strs = ["ab", "ba", "abc", "bac", "cab"];
            const expected = [
                ["ab", "ba"],
                ["abc", "bac", "cab"]
            ];
            expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
        });

        test('should handle strings with different character sets', () => {
            const strs = ["listen", "silent", "enlist", "hello", "world"];
            const expected = [
                ["listen", "silent", "enlist"],
                ["hello"],
                ["world"]
            ];
            expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
        });

        test('should handle strings with uppercase characters (assuming case-sensitive)', () => {
            const strs = ["Eat", "tea", "Tan"]; // Case-sensitive, so "Eat" is not "tea"
            const expected = [
                ["Eat"],
                ["tea"],
                ["Tan"]
            ];
            expect(sortResult(groupAnagrams(strs))).toEqual(sortResult(expected));
        });
    });

    // Test cases for brute-force solution (for comparison/completeness)
    describe('Brute Force Solution', () => {
        test('should group anagrams correctly for a basic set (brute force)', () => {
            const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
            const expected = [
                ["ate", "eat", "tea"],
                ["nat", "tan"],
                ["bat"]
            ];
            expect(sortResult(groupAnagramsBruteForce(strs))).toEqual(sortResult(expected));
        });

        test('should handle an empty array (brute force)', () => {
            const strs: string[] = [];
            expect(groupAnagramsBruteForce(strs)).toEqual([]);
        });

        test('should handle an array with a single empty string (brute force)', () => {
            const strs = [""];
            expect(groupAnagramsBruteForce(strs)).toEqual([[""]]);
        });

        test('should handle an array where all strings are unique (brute force)', () => {
            const strs = ["abc", "def", "ghi"];
            const expected = [
                ["abc"],
                ["def"],
                ["ghi"]
            ];
            expect(sortResult(groupAnagramsBruteForce(strs))).toEqual(sortResult(expected));
        });
    });
});
```