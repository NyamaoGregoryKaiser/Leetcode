```javascript
/**
 * @fileoverview Test suite for KMP String Matching problem.
 */

const { testSuite, assertStrictEquals, assertDeepEquals } = require('../src/utils/assert');
const {
    strStrBruteForce,
    strStrKMP,
    computeLPSArray
} = require('../src/problems/kmpStringMatching');

// Test suite for computeLPSArray helper function
testSuite('KMP Helper: computeLPSArray', () => {
    it('should return correct LPS array for "AAAA"', () => {
        assertDeepEquals(computeLPSArray("AAAA", 4), [0, 1, 2, 3]);
    });

    it('should return correct LPS array for "ABCDE"', () => {
        assertDeepEquals(computeLPSArray("ABCDE", 5), [0, 0, 0, 0, 0]);
    });

    it('should return correct LPS array for "AABAACAABAA"', () => {
        assertDeepEquals(computeLPSArray("AABAACAABAA", 11), [0, 1, 0, 1, 2, 0, 1, 2, 3, 4, 5]);
    });

    it('should return correct LPS array for "AAACAAAAAC"', () => {
        assertDeepEquals(computeLPSArray("AAACAAAAAC", 10), [0, 1, 2, 0, 1, 2, 3, 3, 4, 0]);
    });

    it('should return correct LPS array for "ABABCABAB"', () => {
        assertDeepEquals(computeLPSArray("ABABCABAB", 9), [0, 0, 1, 2, 0, 1, 2, 3, 4]);
    });

    it('should return [0] for single character pattern', () => {
        assertDeepEquals(computeLPSArray("A", 1), [0]);
    });

    it('should return [] for empty pattern', () => {
        assertDeepEquals(computeLPSArray("", 0), []);
    });
});


// Test suite for Brute Force approach
testSuite('strStrBruteForce', () => {
    it('should return 0 when needle is empty', () => {
        assertStrictEquals(strStrBruteForce("hello", ""), 0);
    });

    it('should return 0 for exact match at start', () => {
        assertStrictEquals(strStrBruteForce("hello", "he"), 0);
    });

    it('should return correct index for match in middle', () => {
        assertStrictEquals(strStrBruteForce("hello", "ll"), 2);
    });

    it('should return correct index for match at end', () => {
        assertStrictEquals(strStrBruteForce("hello", "lo"), 3);
    });

    it('should return -1 when no match is found', () => {
        assertStrictEquals(strStrBruteForce("hello", "xyz"), -1);
    });

    it('should return -1 when haystack is shorter than needle', () => {
        assertStrictEquals(strStrBruteForce("hi", "hello"), -1);
    });

    it('should return 0 when haystack and needle are identical', () => {
        assertStrictEquals(strStrBruteForce("abc", "abc"), 0);
    });

    it('should handle repeated characters in haystack and needle (no match)', () => {
        assertStrictEquals(strStrBruteForce("aaaaa", "bba"), -1);
    });

    it('should handle repeated characters in haystack and needle (match)', () => {
        assertStrictEquals(strStrBruteForce("aaaaa", "aaa"), 0);
    });

    it('should handle complex case with partial matches', () => {
        assertStrictEquals(strStrBruteForce("ABABDABACDABABCABAB", "ABABCABAB"), 10);
    });

    it('should handle another complex case', () => {
        assertStrictEquals(strStrBruteForce("mississippi", "issip"), 4);
    });
});

// Test suite for KMP approach
testSuite('strStrKMP', () => {
    it('should return 0 when needle is empty', () => {
        assertStrictEquals(strStrKMP("hello", ""), 0);
    });

    it('should return 0 for exact match at start', () => {
        assertStrictEquals(strStrKMP("hello", "he"), 0);
    });

    it('should return correct index for match in middle', () => {
        assertStrictEquals(strStrKMP("hello", "ll"), 2);
    });

    it('should return correct index for match at end', () => {
        assertStrictEquals(strStrKMP("hello", "lo"), 3);
    });

    it('should return -1 when no match is found', () => {
        assertStrictEquals(strStrKMP("hello", "xyz"), -1);
    });

    it('should return -1 when haystack is shorter than needle', () => {
        assertStrictEquals(strStrKMP("hi", "hello"), -1);
    });

    it('should return 0 when haystack and needle are identical', () => {
        assertStrictEquals(strStrKMP("abc", "abc"), 0);
    });

    it('should handle repeated characters in haystack and needle (no match)', () => {
        assertStrictEquals(strStrKMP("aaaaa", "bba"), -1);
    });

    it('should handle repeated characters in haystack and needle (match)', () => {
        assertStrictEquals(strStrKMP("aaaaa", "aaa"), 0);
    });

    it('should handle complex case with partial matches', () => {
        assertStrictEquals(strStrKMP("ABABDABACDABABCABAB", "ABABCABAB"), 10);
    });

    it('should handle the example from problem description "sadbutsad", "sad"', () => {
        assertStrictEquals(strStrKMP("sadbutsad", "sad"), 0);
    });

    it('should handle "leetcode", "leeto"', () => {
        assertStrictEquals(strStrKMP("leetcode", "leeto"), -1);
    });

    it('should handle another complex case', () => {
        assertStrictEquals(strStrKMP("mississippi", "issip"), 4);
    });

    it('should handle long patterns that don\'t exist', () => {
        assertStrictEquals(strStrKMP("abcdefghijk", "klm"), -1);
    });

    it('should handle empty haystack and non-empty needle', () => {
        assertStrictEquals(strStrKMP("", "abc"), -1);
    });
});
```