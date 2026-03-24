/**
 * @fileoverview Test suite for Longest Common Subsequence (LCS) implementations.
 */

const {
    longestCommonSubsequenceBruteForce,
    longestCommonSubsequenceMemoization,
    longestCommonSubsequenceTabulation,
    longestCommonSubsequenceSpaceOptimized,
} = require('../src/problems/longestCommonSubsequence');

describe('Longest Common Subsequence (LCS)', () => {
    // Test cases for brute force (limited by performance)
    describe('longestCommonSubsequenceBruteForce', () => {
        it('should return 0 for empty strings', () => {
            expect(longestCommonSubsequenceBruteForce("", "")).toBe(0);
        });

        it('should return 0 if one string is empty', () => {
            expect(longestCommonSubsequenceBruteForce("abc", "")).toBe(0);
            expect(longestCommonSubsequenceBruteForce("", "def")).toBe(0);
        });

        it('should return correct LCS for simple cases', () => {
            expect(longestCommonSubsequenceBruteForce("abcde", "ace")).toBe(3); // "ace"
            expect(longestCommonSubsequenceBruteForce("abc", "abc")).toBe(3);   // "abc"
            expect(longestCommonSubsequenceBruteForce("abc", "def")).toBe(0);   // ""
        });

        it('should handle strings with no common characters', () => {
            expect(longestCommonSubsequenceBruteForce("abc", "defg")).toBe(0);
        });

        it('should handle duplicate characters', () => {
            expect(longestCommonSubsequenceBruteForce("aaaa", "aa")).toBe(2);
            expect(longestCommonSubsequenceBruteForce("abracadabra", "apple")).toBe(3); // "apl"
        });

        it('should handle longer strings (within limits of brute force)', () => {
            expect(longestCommonSubsequenceBruteForce("AGGTAB", "GXTXAYB")).toBe(4); // "GTAB"
        });
    });

    // Test cases for memoization
    describe('longestCommonSubsequenceMemoization', () => {
        it('should return 0 for empty strings', () => {
            expect(longestCommonSubsequenceMemoization("", "")).toBe(0);
        });

        it('should return 0 if one string is empty', () => {
            expect(longestCommonSubsequenceMemoization("abc", "")).toBe(0);
            expect(longestCommonSubsequenceMemoization("", "def")).toBe(0);
        });

        it('should return correct LCS for simple cases', () => {
            expect(longestCommonSubsequenceMemoization("abcde", "ace")).toBe(3);
            expect(longestCommonSubsequenceMemoization("abc", "abc")).toBe(3);
            expect(longestCommonSubsequenceMemoization("abc", "def")).toBe(0);
        });

        it('should handle strings with no common characters', () => {
            expect(longestCommonSubsequenceMemoization("abc", "defg")).toBe(0);
        });

        it('should handle duplicate characters', () => {
            expect(longestCommonSubsequenceMemoization("aaaa", "aa")).toBe(2);
            expect(longestCommonSubsequenceMemoization("abracadabra", "apple")).toBe(3);
        });

        it('should handle longer strings efficiently', () => {
            expect(longestCommonSubsequenceMemoization("AGGTAB", "GXTXAYB")).toBe(4);
            expect(longestCommonSubsequenceMemoization("ezupkr", "ubmrapg")).toBe(2); // "pr"
            expect(longestCommonSubsequenceMemoization("pmjghegzqg", "sbqghkjrov")).toBe(4); // "qghj"
        });

        it('should handle very long strings (up to reasonable limits)', () => {
            const text1 = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"; // 52 chars
            const text2 = "acegikmoqsuwyacegikmoqsuwyacegikmoqsuwy";             // 39 chars
            expect(longestCommonSubsequenceMemoization(text1, text2)).toBe(26); // "acegikmoqsuwyacegikmoqsuwy"
        });
    });

    // Test cases for tabulation
    describe('longestCommonSubsequenceTabulation', () => {
        it('should return 0 for empty strings', () => {
            expect(longestCommonSubsequenceTabulation("", "")).toBe(0);
        });

        it('should return 0 if one string is empty', () => {
            expect(longestCommonSubsequenceTabulation("abc", "")).toBe(0);
            expect(longestCommonSubsequenceTabulation("", "def")).toBe(0);
        });

        it('should return correct LCS for simple cases', () => {
            expect(longestCommonSubsequenceTabulation("abcde", "ace")).toBe(3);
            expect(longestCommonSubsequenceTabulation("abc", "abc")).toBe(3);
            expect(longestCommonSubsequenceTabulation("abc", "def")).toBe(0);
        });

        it('should handle strings with no common characters', () => {
            expect(longestCommonSubsequenceTabulation("abc", "defg")).toBe(0);
        });

        it('should handle duplicate characters', () => {
            expect(longestCommonSubsequenceTabulation("aaaa", "aa")).toBe(2);
            expect(longestCommonSubsequenceTabulation("abracadabra", "apple")).toBe(3);
        });

        it('should handle longer strings efficiently', () => {
            expect(longestCommonSubsequenceTabulation("AGGTAB", "GXTXAYB")).toBe(4);
            expect(longestCommonSubsequenceTabulation("ezupkr", "ubmrapg")).toBe(2);
            expect(longestCommonSubsequenceTabulation("pmjghegzqg", "sbqghkjrov")).toBe(4);
        });

        it('should handle very long strings', () => {
            const text1 = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
            const text2 = "acegikmoqsuwyacegikmoqsuwyacegikmoqsuwy";
            expect(longestCommonSubsequenceTabulation(text1, text2)).toBe(26);
        });
    });

    // Test cases for space-optimized tabulation
    describe('longestCommonSubsequenceSpaceOptimized', () => {
        it('should return 0 for empty strings', () => {
            expect(longestCommonSubsequenceSpaceOptimized("", "")).toBe(0);
        });

        it('should return 0 if one string is empty', () => {
            expect(longestCommonSubsequenceSpaceOptimized("abc", "")).toBe(0);
            expect(longestCommonSubsequenceSpaceOptimized("", "def")).toBe(0);
        });

        it('should return correct LCS for simple cases', () => {
            expect(longestCommonSubsequenceSpaceOptimized("abcde", "ace")).toBe(3);
            expect(longestCommonSubsequenceSpaceOptimized("abc", "abc")).toBe(3);
            expect(longestCommonSubsequenceSpaceOptimized("abc", "def")).toBe(0);
        });

        it('should handle strings with no common characters', () => {
            expect(longestCommonSubsequenceSpaceOptimized("abc", "defg")).toBe(0);
        });

        it('should handle duplicate characters', () => {
            expect(longestCommonSubsequenceSpaceOptimized("aaaa", "aa")).toBe(2);
            expect(longestCommonSubsequenceSpaceOptimized("abracadabra", "apple")).toBe(3);
        });

        it('should handle longer strings efficiently', () => {
            expect(longestCommonSubsequenceSpaceOptimized("AGGTAB", "GXTXAYB")).toBe(4);
            expect(longestCommonSubsequenceSpaceOptimized("ezupkr", "ubmrapg")).toBe(2);
            expect(longestCommonSubsequenceSpaceOptimized("pmjghegzqg", "sbqghkjrov")).toBe(4);
        });

        it('should handle very long strings', () => {
            const text1 = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
            const text2 = "acegikmoqsuwyacegikmoqsuwyacegikmoqsuwy";
            expect(longestCommonSubsequenceSpaceOptimized(text1, text2)).toBe(26);
        });
    });
});