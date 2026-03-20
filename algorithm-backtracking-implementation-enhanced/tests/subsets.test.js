```javascript
/**
 * @fileoverview Test suite for subsets algorithms.
 * Uses the global `assert` and `testSuite` functions provided by `testRunner.js`.
 */

const { findSubsets, findSubsetsIncludeExclude } = require('../src/algorithms/subsets');
const { areSortedArraysOfArraysEqual } = require('../src/utils/arrayUtils');

testSuite('Subsets Algorithms', () => {

    // Helper to compare results for subsets, where order of sub-arrays doesn't matter.
    const expectSubsetsEqual = (actual, expected, message) => {
        const result = areSortedArraysOfArraysEqual(actual, expected);
        assert(result, message);
    };

    // Test Cases for findSubsets (loop based)
    testSuite('findSubsets (loop based)', () => {
        assert(typeof findSubsets === 'function', 'findSubsets should be a function');

        // Test Case 1: Standard case with 3 distinct numbers
        expectSubsetsEqual(
            findSubsets([1, 2, 3]),
            [
                [],
                [1],
                [2],
                [1, 2],
                [3],
                [1, 3],
                [2, 3],
                [1, 2, 3]
            ],
            'Should correctly find all subsets for [1, 2, 3]'
        );

        // Test Case 2: Array with 2 distinct numbers
        expectSubsetsEqual(
            findSubsets([1, 2]),
            [
                [],
                [1],
                [2],
                [1, 2]
            ],
            'Should correctly find all subsets for [1, 2]'
        );

        // Test Case 3: Single element array
        expectSubsetsEqual(
            findSubsets([1]),
            [
                [],
                [1]
            ],
            'Should correctly find all subsets for [1]'
        );

        // Test Case 4: Empty array
        expectSubsetsEqual(
            findSubsets([]),
            [
                []
            ],
            'Should correctly find all subsets for an empty array (result is [[]])'
        );

        // Test Case 5: Array with negative numbers
        expectSubsetsEqual(
            findSubsets([-1, 0]),
            [
                [],
                [-1],
                [0],
                [-1, 0]
            ],
            'Should correctly find all subsets for [-1, 0]'
        );

        // Test Case 6: Larger array (4 elements)
        expectSubsetsEqual(
            findSubsets([1, 2, 3, 4]),
            [
                [],
                [1],
                [2],
                [1, 2],
                [3],
                [1, 3],
                [2, 3],
                [1, 2, 3],
                [4],
                [1, 4],
                [2, 4],
                [1, 2, 4],
                [3, 4],
                [1, 3, 4],
                [2, 3, 4],
                [1, 2, 3, 4]
            ],
            'Should correctly find all subsets for [1, 2, 3, 4]'
        );
    });

    // Test Cases for findSubsetsIncludeExclude (two branches)
    testSuite('findSubsetsIncludeExclude (two branches)', () => {
        assert(typeof findSubsetsIncludeExclude === 'function', 'findSubsetsIncludeExclude should be a function');

        // Test Case 1: Standard case with 3 distinct numbers
        expectSubsetsEqual(
            findSubsetsIncludeExclude([1, 2, 3]),
            [
                [],
                [1],
                [2],
                [1, 2],
                [3],
                [1, 3],
                [2, 3],
                [1, 2, 3]
            ],
            'Should correctly find all subsets for [1, 2, 3]'
        );

        // Test Case 2: Array with 2 distinct numbers
        expectSubsetsEqual(
            findSubsetsIncludeExclude([1, 2]),
            [
                [],
                [1],
                [2],
                [1, 2]
            ],
            'Should correctly find all subsets for [1, 2]'
        );

        // Test Case 3: Single element array
        expectSubsetsEqual(
            findSubsetsIncludeExclude([1]),
            [
                [],
                [1]
            ],
            'Should correctly find all subsets for [1]'
        );

        // Test Case 4: Empty array
        expectSubsetsEqual(
            findSubsetsIncludeExclude([]),
            [
                []
            ],
            'Should correctly find all subsets for an empty array (result is [[]])'
        );

        // Test Case 5: Array with negative numbers
        expectSubsetsEqual(
            findSubsetsIncludeExclude([-1, 0]),
            [
                [],
                [-1],
                [0],
                [-1, 0]
            ],
            'Should correctly find all subsets for [-1, 0]'
        );

        // Test Case 6: Larger array (4 elements)
        expectSubsetsEqual(
            findSubsetsIncludeExclude([1, 2, 3, 4]),
            [
                [],
                [1],
                [2],
                [1, 2],
                [3],
                [1, 3],
                [2, 3],
                [1, 2, 3],
                [4],
                [1, 4],
                [2, 4],
                [1, 2, 4],
                [3, 4],
                [1, 3, 4],
                [2, 3, 4],
                [1, 2, 3, 4]
            ],
            'Should correctly find all subsets for [1, 2, 3, 4]'
        );
    });
});
```