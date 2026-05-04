```javascript
/**
 * tests/test_mergeIntervals.js
 * Test suite for Problem 2: Merge Intervals
 */

const { assert, testSuite } = require('./testRunner');
const { mergeIntervalsOptimal } = require('../src/problems/problem2_mergeIntervals');
const { areArraysDeepEqual, shallowCopyArray } = require('../src/utils/arrayUtils');

testSuite('Problem 2: Merge Intervals', () => {

    const intervalComparator = (actual, expected) => areArraysDeepEqual(actual, expected);

    // Test cases for mergeIntervalsOptimal
    testSuite('mergeIntervalsOptimal', () => {
        let intervals;
        let expected;

        // Test 1: Basic overlapping intervals
        intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
        expected = [[1, 6], [8, 10], [15, 18]];
        assert(mergeIntervalsOptimal(shallowCopyArray(intervals)), expected, `should merge basic overlapping intervals ${JSON.stringify(intervals)}`, intervalComparator);

        // Test 2: Intervals completely subsuming others
        intervals = [[1, 4], [0, 4]];
        expected = [[0, 4]];
        assert(mergeIntervalsOptimal(shallowCopyArray(intervals)), expected, `should merge intervals where one subsumes another ${JSON.stringify(intervals)}`, intervalComparator);

        // Test 3: No overlapping intervals
        intervals = [[1, 2], [3, 4], [5, 6]];
        expected = [[1, 2], [3, 4], [5, 6]];
        assert(mergeIntervalsOptimal(shallowCopyArray(intervals)), expected, `should return original intervals if no overlap ${JSON.stringify(intervals)}`, intervalComparator);

        // Test 4: All intervals overlap
        intervals = [[1, 4], [0, 4], [2, 3], [3, 5]];
        expected = [[0, 5]];
        assert(mergeIntervalsOptimal(shallowCopyArray(intervals)), expected, `should merge all overlapping intervals into one ${JSON.stringify(intervals)}`, intervalComparator);

        // Test 5: Single interval
        intervals = [[1, 5]];
        expected = [[1, 5]];
        assert(mergeIntervalsOptimal(shallowCopyArray(intervals)), expected, `should handle a single interval ${JSON.stringify(intervals)}`, intervalComparator);

        // Test 6: Empty intervals array
        intervals = [];
        expected = [];
        assert(mergeIntervalsOptimal(shallowCopyArray(intervals)), expected, `should handle an empty array ${JSON.stringify(intervals)}`, intervalComparator);

        // Test 7: Intervals touching at boundary
        intervals = [[1, 4], [4, 5]];
        expected = [[1, 5]];
        assert(mergeIntervalsOptimal(shallowCopyArray(intervals)), expected, `should merge intervals touching at boundary ${JSON.stringify(intervals)}`, intervalComparator);

        // Test 8: More complex overlapping
        intervals = [[1, 4], [0, 0], [2, 3]];
        expected = [[0, 0], [1, 4]];
        assert(mergeIntervalsOptimal(shallowCopyArray(intervals)), expected, `should handle complex overlaps ${JSON.stringify(intervals)}`, intervalComparator);

        // Test 9: Negative numbers
        intervals = [[-5, -2], [-3, 0], [1, 2]];
        expected = [[-5, 0], [1, 2]];
        assert(mergeIntervalsOptimal(shallowCopyArray(intervals)), expected, `should handle negative numbers ${JSON.stringify(intervals)}`, intervalComparator);

        // Test 10: Unsorted input that needs sorting
        intervals = [[8, 10], [1, 3], [15, 18], [2, 6]];
        expected = [[1, 6], [8, 10], [15, 18]];
        assert(mergeIntervalsOptimal(shallowCopyArray(intervals)), expected, `should sort and merge unsorted input ${JSON.stringify(intervals)}`, intervalComparator);

        // Test 11: Duplicate intervals
        intervals = [[1, 3], [1, 3]];
        expected = [[1, 3]];
        assert(mergeIntervalsOptimal(shallowCopyArray(intervals)), expected, `should handle duplicate intervals ${JSON.stringify(intervals)}`, intervalComparator);

        // Test 12: Intervals with large values
        intervals = [[0, 10000], [5000, 15000], [20000, 30000]];
        expected = [[0, 15000], [20000, 30000]];
        assert(mergeIntervalsOptimal(shallowCopyArray(intervals)), expected, `should handle large values ${JSON.stringify(intervals)}`, intervalComparator);
    });
});
```