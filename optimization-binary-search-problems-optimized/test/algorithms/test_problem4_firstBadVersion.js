/**
 * @fileoverview Test suite for Problem 4: First Bad Version.
 */

const { firstBadVersion } = require('../../src/algorithms/problems/problem4_firstBadVersion');
const { createBadVersionAPI } = require('../../src/algorithms/utils/arrayUtils');

module.exports = {
    /**
     * Test case: First bad version is in the middle.
     * @param {function} assert The assertion function.
     */
    testFirstBadVersionMiddle: (assert) => {
        const n = 10;
        const isBadVersion = createBadVersionAPI(n, 5); // Versions 5, 6, 7, 8, 9, 10 are bad
        assert(firstBadVersion(n, isBadVersion) === 5, 'First bad version should be 5');
    },

    /**
     * Test case: First bad version is the first one.
     * @param {function} assert The assertion function.
     */
    testFirstBadVersionFirst: (assert) => {
        const n = 10;
        const isBadVersion = createBadVersionAPI(n, 1); // All versions are bad
        assert(firstBadVersion(n, isBadVersion) === 1, 'First bad version should be 1');
    },

    /**
     * Test case: First bad version is the last one.
     * @param {function} assert The assertion function.
     */
    testFirstBadVersionLast: (assert) => {
        const n = 10;
        const isBadVersion = createBadVersionAPI(n, 10); // Only version 10 is bad
        assert(firstBadVersion(n, isBadVersion) === 10, 'First bad version should be 10');
    },

    /**
     * Test case: Single version, which is bad.
     * @param {function} assert The assertion function.
     */
    testFirstBadVersionSingleBad: (assert) => {
        const n = 1;
        const isBadVersion = createBadVersionAPI(n, 1);
        assert(firstBadVersion(n, isBadVersion) === 1, 'Single version, which is bad');
    },

    /**
     * Test case: Two versions, first is good, second is bad.
     * @param {function} assert The assertion function.
     */
    testFirstBadVersionTwoVersionsMid: (assert) => {
        const n = 2;
        const isBadVersion = createBadVersionAPI(n, 2);
        assert(firstBadVersion(n, isBadVersion) === 2, 'Two versions, 1 good, 2 bad');
    },

    /**
     * Test case: Two versions, both bad (first is bad).
     * @param {function} assert The assertion function.
     */
    testFirstBadVersionTwoVersionsFirst: (assert) => {
        const n = 2;
        const isBadVersion = createBadVersionAPI(n, 1);
        assert(firstBadVersion(n, isBadVersion) === 1, 'Two versions, both bad (first)');
    },

    /**
     * Test case: Large number of versions.
     * @param {function} assert The assertion function.
     */
    testFirstBadVersionLargeN: (assert) => {
        const n = 1000000;
        const bad = 789123;
        const isBadVersion = createBadVersionAPI(n, bad);
        assert(firstBadVersion(n, isBadVersion) === bad, `Large N=${n}, first bad version should be ${bad}`);
    },

    /**
     * Test case: Large number of versions, first bad is near beginning.
     * @param {function} assert The assertion function.
     */
    testFirstBadVersionLargeNNearBeginning: (assert) => {
        const n = 1000000;
        const bad = 2;
        const isBadVersion = createBadVersionAPI(n, bad);
        assert(firstBadVersion(n, isBadVersion) === bad, `Large N=${n}, first bad version should be ${bad}`);
    },

    /**
     * Test case: Large number of versions, first bad is near end.
     * @param {function} assert The assertion function.
     */
    testFirstBadVersionLargeNNearEnd: (assert) => {
        const n = 1000000;
        const bad = 999999;
        const isBadVersion = createBadVersionAPI(n, bad);
        assert(firstBadVersion(n, isBadVersion) === bad, `Large N=${n}, first bad version should be ${bad}`);
    },

    /**
     * Test case: Invalid input (n = 0).
     * @param {function} assert The assertion function.
     */
    testFirstBadVersionInvalidN: (assert) => {
        assert.throws(() => firstBadVersion(0, createBadVersionAPI(1, 1)), 'Error expected for n=0');
    },

    /**
     * Test case: Invalid input (n < 0).
     * @param {function} assert The assertion function.
     */
    testFirstBadVersionNegativeN: (assert) => {
        assert.throws(() => firstBadVersion(-5, createBadVersionAPI(1, 1)), 'Error expected for negative n');
    }
};