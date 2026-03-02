/**
 * tests/longestCommonSubsequence.test.ts
 *
 * Test suite for Longest Common Subsequence (LCS) algorithms.
 */

import {
    longestCommonSubsequence_bruteForce,
    longestCommonSubsequence_memoized,
    longestCommonSubsequence_tabulated,
    longestCommonSubsequence_spaceOptimized
} from '../src/algorithms/longestCommonSubsequence';

describe('Longest Common Subsequence (LCS) Algorithms', () => {

    const testCases = [
        { text1: "abcde", text2: "ace", expected: 3 }, // "ace"
        { text1: "abc", text2: "abc", expected: 3 },   // "abc"
        { text1: "abc", text2: "def", expected: 0 },   // No common subsequence
        { text1: "aaaaa", text2: "aaaaa", expected: 5 },
        { text1: "abracadabra", text2: "avadakedavra", expected: 6 }, // "aadara"
        { text1: "AGGTAB", text2: "GXTXAYB", expected: 4 }, // "GTAB" or "GTXB"
        { text1: "", text2: "abc", expected: 0 },
        { text1: "abc", text2: "", expected: 0 },
        { text1: "", text2: "", expected: 0 },
        { text1: "pmjghegpkltromanicsf", text2: "qpmjghegpkltromanics", expected: 19 }, // LeetCode edge case
        { text1: "bsbininm", text2: "jmjkbkjkv", expected: 1 }, // "b"
        { text1: "ezupkr", text2: "ubmrapg", expected: 2 }, // "pr"
    ];

    describe('longestCommonSubsequence_bruteForce', () => {
        // Brute force is exponential, so limit test cases
        testCases.slice(0, 6).forEach(({ text1, text2, expected }) => {
            test(`should return ${expected} for text1="${text1}", text2="${text2}"`, () => {
                expect(longestCommonSubsequence_bruteForce(text1, text2)).toBe(expected);
            });
        });
    });

    describe('longestCommonSubsequence_memoized', () => {
        testCases.forEach(({ text1, text2, expected }) => {
            test(`should return ${expected} for text1="${text1}", text2="${text2}"`, () => {
                expect(longestCommonSubsequence_memoized(text1, text2)).toBe(expected);
            });
        });

        test('should handle larger strings efficiently', () => {
            const longText1 = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
            const longText2 = "abcde123fg45hijk67lmn89opqrstuvwxyz"; // LCS should be "abcdefghijklmnopqrstuvwxyz" (length 26)
            expect(longestCommonSubsequence_memoized(longText1, longText2)).toBe(26);
        });
    });

    describe('longestCommonSubsequence_tabulated', () => {
        testCases.forEach(({ text1, text2, expected }) => {
            test(`should return ${expected} for text1="${text1}", text2="${text2}"`, () => {
                expect(longestCommonSubsequence_tabulated(text1, text2)).toBe(expected);
            });
        });

        test('should handle larger strings efficiently', () => {
            const longText1 = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
            const longText2 = "abcde123fg45hijk67lmn89opqrstuvwxyz";
            expect(longestCommonSubsequence_tabulated(longText1, longText2)).toBe(26);
        });
    });

    describe('longestCommonSubsequence_spaceOptimized', () => {
        testCases.forEach(({ text1, text2, expected }) => {
            test(`should return ${expected} for text1="${text1}", text2="${text2}"`, () => {
                expect(longestCommonSubsequence_spaceOptimized(text1, text2)).toBe(expected);
            });
        });

        test('should handle larger strings efficiently', () => {
            const longText1 = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
            const longText2 = "abcde123fg45hijk67lmn89opqrstuvwxyz";
            expect(longestCommonSubsequence_spaceOptimized(longText1, longText2)).toBe(26);
        });

        test('should work when text2 is longer than text1', () => {
            const shortText = "ace";
            const longText = "abcde";
            expect(longestCommonSubsequence_spaceOptimized(shortText, longText)).toBe(3);
        });
    });
});