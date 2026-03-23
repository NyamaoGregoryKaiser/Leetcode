```javascript
/**
 * test/lcs.test.js
 *
 * Test cases for the Longest Common Subsequence (LCS) problem implementations.
 */

const {
    lcsRecursive,
    lcsMemoization,
    lcsTabulation
} = require('../src/dp_problems');

module.exports = function(assert) {
    // Helper to run all LCS versions against a single test case
    function testLCS(text1, text2, expected, description) {
        console.log(`  Testing text1='${text1}', text2='${text2}', expected=${expected} (${description})`);
        assert.strictEqual(lcsRecursive(text1, text2), expected, `Recursive: LCS('${text1}', '${text2}') should be ${expected}`);
        assert.strictEqual(lcsMemoization(text1, text2), expected, `Memoization: LCS('${text1}', '${text2}') should be ${expected}`);
        assert.strictEqual(lcsTabulation(text1, text2), expected, `Tabulation: LCS('${text1}', '${text2}') should be ${expected}`);
    }

    // Test Cases
    testLCS("abcde", "ace", 3, 'Standard case'); // "ace"
    testLCS("abc", "abc", 3, 'Identical strings'); // "abc"
    testLCS("abc", "def", 0, 'No common characters'); // ""
    testLCS("abc", "", 0, 'Empty second string'); // ""
    testLCS("", "abc", 0, 'Empty first string'); // ""
    testLCS("", "", 0, 'Both empty strings'); // ""
    testLCS("AGGTAB", "GXTXAYB", 4, 'Textbook example ("GTAB")');
    testLCS("ABCDGH", "AEDFHR", 3, 'Another textbook example ("ADH")');
    testLCS("AA", "A", 1, 'Short strings, partial match');
    testLCS("ABCBDAB", "BDCABA", 4, 'Complex case ("BCBA" or "BDAB")');
    testLCS("abczd", "azbycxd", 3, 'Dispersed characters ("acd")');
    testLCS("abcdef", "fedcba", 1, 'Reversed, single common char ("a" or "b" etc.)');
    testLCS("zxvw", "xyz", 2, 'Partial overlap ("xz")');
};
```