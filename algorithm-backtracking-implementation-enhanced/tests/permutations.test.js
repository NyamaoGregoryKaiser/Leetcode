```javascript
/**
 * @fileoverview Test suite for permutations algorithms.
 * Uses the global `assert` and `testSuite` functions provided by `testRunner.js`.
 */

const { findPermutations, findPermutationsSwap } = require('../src/algorithms/permutations');
const { areSortedArraysOfArraysEqual } = require('../src/utils/arrayUtils');

testSuite('Permutations Algorithms', () => {

    // Helper to compare results for permutations, where order of sub-arrays doesn't matter.
    const expectPermutationsEqual = (actual, expected, message) => {
        const result = areSortedArraysOfArraysEqual(actual, expected);
        assert(result, message);
    };

    // Test Cases for findPermutations (using `used` array)
    testSuite('findPermutations (with used array)', () => {
        assert(typeof findPermutations === 'function', 'findPermutations should be a function');

        // Test Case 1: Standard case with 3 distinct numbers
        expectPermutationsEqual(
            findPermutations([1, 2, 3]),
            [
                [1, 2, 3], [1, 3, 2],
                [2, 1, 3], [2, 3, 1],
                [3, 1, 2], [3, 2, 1]
            ],
            'Should correctly find all permutations for [1, 2, 3]'
        );

        // Test Case 2: Array with 2 distinct numbers
        expectPermutationsEqual(
            findPermutations([1, 2]),
            [
                [1, 2],
                [2, 1]
            ],
            'Should correctly find all permutations for [1, 2]'
        );

        // Test Case 3: Single element array
        expectPermutationsEqual(
            findPermutations([1]),
            [
                [1]
            ],
            'Should correctly find all permutations for [1]'
        );

        // Test Case 4: Empty array
        expectPermutationsEqual(
            findPermutations([]),
            [
                []
            ],
            'Should correctly find all permutations for an empty array (result is [[])]'
        );

        // Test Case 5: Larger array (4 elements)
        expectPermutationsEqual(
            findPermutations([0, 1, 2, 3]),
            [
                [0, 1, 2, 3], [0, 1, 3, 2], [0, 2, 1, 3], [0, 2, 3, 1], [0, 3, 1, 2], [0, 3, 2, 1],
                [1, 0, 2, 3], [1, 0, 3, 2], [1, 2, 0, 3], [1, 2, 3, 0], [1, 3, 0, 2], [1, 3, 2, 0],
                [2, 0, 1, 3], [2, 0, 3, 1], [2, 1, 0, 3], [2, 1, 3, 0], [2, 3, 0, 1], [2, 3, 1, 0],
                [3, 0, 1, 2], [3, 0, 2, 1], [3, 1, 0, 2], [3, 1, 2, 0], [3, 2, 0, 1], [3, 2, 1, 0]
            ],
            'Should correctly find all permutations for [0, 1, 2, 3]'
        );

        // Test Case 6: Array with negative numbers
        expectPermutationsEqual(
            findPermutations([-1, 0, 1]),
            [
                [-1, 0, 1], [-1, 1, 0],
                [0, -1, 1], [0, 1, -1],
                [1, -1, 0], [1, 0, -1]
            ],
            'Should correctly find all permutations for [-1, 0, 1]'
        );
    });

    // Test Cases for findPermutationsSwap (using in-place swapping)
    testSuite('findPermutationsSwap (with in-place swapping)', () => {
        assert(typeof findPermutationsSwap === 'function', 'findPermutationsSwap should be a function');

        // Test Case 1: Standard case with 3 distinct numbers
        // NOTE: findPermutationsSwap modifies the input array *temporarily*.
        // The tests should ensure a fresh array is passed or copies are made if subsequent tests
        // depend on the original array's state.
        expectPermutationsEqual(
            findPermutationsSwap([1, 2, 3]),
            [
                [1, 2, 3], [1, 3, 2],
                [2, 1, 3], [2, 3, 1],
                [3, 1, 2], [3, 2, 1]
            ],
            'Should correctly find all permutations for [1, 2, 3]'
        );

        // Test Case 2: Array with 2 distinct numbers
        expectPermutationsEqual(
            findPermutationsSwap([1, 2]),
            [
                [1, 2],
                [2, 1]
            ],
            'Should correctly find all permutations for [1, 2]'
        );

        // Test Case 3: Single element array
        expectPermutationsEqual(
            findPermutationsSwap([1]),
            [
                [1]
            ],
            'Should correctly find all permutations for [1]'
        );

        // Test Case 4: Empty array
        expectPermutationsEqual(
            findPermutationsSwap([]),
            [
                []
            ],
            'Should correctly find all permutations for an empty array (result is [[]])'
        );

        // Test Case 5: Larger array (4 elements)
        expectPermutationsEqual(
            findPermutationsSwap([0, 1, 2, 3]),
            [
                [0, 1, 2, 3], [0, 1, 3, 2], [0, 2, 1, 3], [0, 2, 3, 1], [0, 3, 1, 2], [0, 3, 2, 1],
                [1, 0, 2, 3], [1, 0, 3, 2], [1, 2, 0, 3], [1, 2, 3, 0], [1, 3, 0, 2], [1, 3, 2, 0],
                [2, 0, 1, 3], [2, 0, 3, 1], [2, 1, 0, 3], [2, 1, 3, 0], [2, 3, 0, 1], [2, 3, 1, 0],
                [3, 0, 1, 2], [3, 0, 2, 1], [3, 1, 0, 2], [3, 1, 2, 0], [3, 2, 0, 1], [3, 2, 1, 0]
            ],
            'Should correctly find all permutations for [0, 1, 2, 3]'
        );

        // Test Case 6: Array with negative numbers
        expectPermutationsEqual(
            findPermutationsSwap([-1, 0, 1]),
            [
                [-1, 0, 1], [-1, 1, 0],
                [0, -1, 1], [0, 1, -1],
                [1, -1, 0], [1, 0, -1]
            ],
            'Should correctly find all permutations for [-1, 0, 1]'
        );
    });
});
```