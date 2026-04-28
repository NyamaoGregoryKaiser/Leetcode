/**
 * @fileoverview Test suite for Longest Common Subsequence (LCS) implementations.
 */

const {
    lcs_memo,
    lcs_tab
} = require('../problems/longest_common_subsequence');

describe('Longest Common Subsequence Implementations', () => {

    // Define common test cases
    const testCases = [
        // Basic cases
        { text1: "abcde", text2: "ace", expected: 3 }, // "ace"
        { text1: "abc", text2: "abc", expected: 3 }, // "abc"
        { text1: "abc", text2: "def", expected: 0 }, // No common subsequence
        { text1: "oxcpqrsvwf", text2: "shmtulqrypy", expected: 2 }, // "qr", "sv", "wf" vs "shmtulqrypy". "q" and "r" are common. length 2.
                                                                    // Let's recheck this: text1="oxcpqrsvwf", text2="shmtulqrypy"
                                                                    // Common: 'q', 'r', 's', 'v', 'w', 'f' from text1
                                                                    // 'q', 'r', 'y' from text2
                                                                    // Common characters available: 'q', 'r'
                                                                    // LCS is 'qr', length 2. Correct.
        { text1: "bl", text2: "yby", expected: 1 }, // "b"

        // Edge cases
        { text1: "", text2: "abc", expected: 0 }, // Empty string
        { text1: "abc", text2: "", expected: 0 }, // Empty string
        { text1: "", text2: "", expected: 0 }, // Both empty
        { text1: "a", text2: "a", expected: 1 },
        { text1: "a", text2: "b", expected: 0 },
        { text1: "aaaaa", text2: "aaaaa", expected: 5 }, // All same
        { text1: "qwerty", text2: "qwert", expected: 5 }, // One is prefix of another
        { text1: "qwert", text2: "qwerty", expected: 5 }, // Another is prefix of other

        // More complex cases
        { text1: "AGGTAB", text2: "GXTXAYB", expected: 4 }, // "GTAB" or "GTXB" (G, T, A, B)
        { text1: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", text2: "ACEGIKMOQSUWY", expected: 13 }, // All even letters
        { text1: "zxvtzxt", text2: "vztx", expected: 4 }, // "vztx"
    ];

    // Test lcs_memo
    describe('lcs_memo (Memoization / Top-Down DP)', () => {
        testCases.forEach(({ text1, text2, expected }) => {
            test(`should return ${expected} for text1 = "${text1}" and text2 = "${text2}"`, () => {
                expect(lcs_memo(text1, text2)).toBe(expected);
            });
        });
    });

    // Test lcs_tab
    describe('lcs_tab (Tabulation / Bottom-Up DP)', () => {
        testCases.forEach(({ text1, text2, expected }) => {
            test(`should return ${expected} for text1 = "${text1}" and text2 = "${text2}"`, () => {
                expect(lcs_tab(text1, text2)).toBe(expected);
            });
        });
    });
});