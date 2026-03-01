/**
 * tests/longest-common-subsequence.test.ts
 *
 * Test suite for the Longest Common Subsequence (LCS) implementations.
 * Uses Jest for testing.
 */

import {
    lcsRecursive,
    lcsMemoization,
    lcsTabulation
} from '../src/algorithms/longest-common-subsequence';

describe('Longest Common Subsequence', () => {
    // Test cases for all implementations
    const testCases = [
        { s1: "AGGTAB", s2: "GXTXAYB", expected: 4 }, // "GTAB"
        { s1: "ABCDGH", s2: "AEDFHR", expected: 3 },  // "ADH"
        { s1: "ABC", s2: "AC", expected: 2 },        // "AC"
        { s1: "ABC", s2: "ABC", expected: 3 },       // "ABC"
        { s1: "ABC", s2: "DEF", expected: 0 },       // No common subsequence
        { s1: "", s2: "ABC", expected: 0 },          // Empty string 1
        { s1: "ABC", s2: "", expected: 0 },          // Empty string 2
        { s1: "", s2: "", expected: 0 },             // Both empty
        { s1: "AXBYC", s2: "ABYC", expected: 4 },    // "ABYC"
        { s1: "aaaa", s2: "aa", expected: 2 },
        { s1: "abracadabra", s2: "avadakedavra", expected: 7 }, // "a_a_da_ra" or similar
        // Longer strings to push DP methods
        { s1: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", s2: "AXBYCZDUFVGWHIJKSOMNPQRLTEU", expected: 13 }, // Many possible
    ];

    // Recursive (Brute Force) tests
    describe('lcsRecursive', () => {
        // Limiting recursive tests for larger strings as it's O(2^(m+n)) and can be very slow or stack overflow
        const recursiveTestCases = testCases.filter(tc => tc.s1.length + tc.s2.length <= 15); // Adjust max length for reasonable runtime
        recursiveTestCases.forEach(({ s1, s2, expected }) => {
            test(`should return ${expected} for s1="${s1}", s2="${s2}"`, () => {
                expect(lcsRecursive(s1, s2)).toBe(expected);
            });
        });

        // Specific test for a case that might be slow for full recursion but is within limits
        test('should handle "AGGTAB", "GXTXAYB" correctly (recursive)', () => {
            expect(lcsRecursive("AGGTAB", "GXTXAYB")).toBe(4);
        });

        // Edge case: empty strings
        test('should return 0 for empty strings (recursive)', () => {
            expect(lcsRecursive("", "")).toBe(0);
            expect(lcsRecursive("ABC", "")).toBe(0);
            expect(lcsRecursive("", "DEF")).toBe(0);
        });
    });

    // Memoization (Top-Down DP) tests
    describe('lcsMemoization', () => {
        testCases.forEach(({ s1, s2, expected }) => {
            test(`should return ${expected} for s1="${s1}", s2="${s2}"`, () => {
                // Memoization table needs to be initialized correctly for each call
                // and its dimensions depend on string lengths.
                const memo = Array(s1.length + 1).fill(0).map(() => Array(s2.length + 1).fill(-1));
                expect(lcsMemoization(s1, s2, s1.length, s2.length, memo)).toBe(expected);
            });
        });

        // Edge case: empty strings
        test('should return 0 for empty strings (memoization)', () => {
            expect(lcsMemoization("", "")).toBe(0);
            expect(lcsMemoization("ABC", "")).toBe(0);
            expect(lcsMemoization("", "DEF")).toBe(0);
        });
    });

    // Tabulation (Bottom-Up DP) tests
    describe('lcsTabulation', () => {
        testCases.forEach(({ s1, s2, expected }) => {
            test(`should return ${expected} for s1="${s1}", s2="${s2}"`, () => {
                expect(lcsTabulation(s1, s2)).toBe(expected);
            });
        });

        // Edge case: empty strings
        test('should return 0 for empty strings (tabulation)', () => {
            expect(lcsTabulation("", "")).toBe(0);
            expect(lcsTabulation("ABC", "")).toBe(0);
            expect(lcsTabulation("", "DEF")).toBe(0);
        });
    });
});