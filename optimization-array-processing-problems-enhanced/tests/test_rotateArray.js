```javascript
/**
 * tests/test_rotateArray.js
 * Test suite for Problem 1: Rotate Array
 */

const { assert, testSuite } = require('./testRunner');
const { rotateArrayByExtraArray, rotateArrayByReversal, rotateArrayBySplice } = require('../src/problems/problem1_rotateArray');
const { shallowCopyArray, areArraysDeepEqual } = require('../src/utils/arrayUtils');

testSuite('Problem 1: Rotate Array', () => {

    // Custom comparator for arrays
    const arrayComparator = (actual, expected) => areArraysDeepEqual(actual, expected);

    // Test cases for rotateArrayByExtraArray
    testSuite('rotateArrayByExtraArray', () => {
        let nums;
        let k;
        let expected;

        // Test 1: Basic rotation
        nums = [1, 2, 3, 4, 5, 6, 7]; k = 3; expected = [5, 6, 7, 1, 2, 3, 4];
        assert(rotateArrayByExtraArray(shallowCopyArray(nums), k), expected, `should rotate [${nums}] by ${k} steps`, arrayComparator);

        // Test 2: k > n
        nums = [1, 2]; k = 3; expected = [2, 1];
        assert(rotateArrayByExtraArray(shallowCopyArray(nums), k), expected, `should handle k > n for [${nums}] by ${k} steps`, arrayComparator);

        // Test 3: k = n (no effective rotation)
        nums = [1, 2, 3]; k = 3; expected = [1, 2, 3];
        assert(rotateArrayByExtraArray(shallowCopyArray(nums), k), expected, `should handle k = n for [${nums}] by ${k} steps`, arrayComparator);

        // Test 4: k = 0 (no rotation)
        nums = [1, 2, 3]; k = 0; expected = [1, 2, 3];
        assert(rotateArrayByExtraArray(shallowCopyArray(nums), k), expected, `should handle k = 0 for [${nums}] by ${k} steps`, arrayComparator);

        // Test 5: Empty array
        nums = []; k = 5; expected = [];
        assert(rotateArrayByExtraArray(shallowCopyArray(nums), k), expected, `should handle empty array [${nums}] by ${k} steps`, arrayComparator);

        // Test 6: Single element array
        nums = [1]; k = 5; expected = [1];
        assert(rotateArrayByExtraArray(shallowCopyArray(nums), k), expected, `should handle single element array [${nums}] by ${k} steps`, arrayComparator);

        // Test 7: Negative numbers
        nums = [-1, -100, 3, 99]; k = 2; expected = [3, 99, -1, -100];
        assert(rotateArrayByExtraArray(shallowCopyArray(nums), k), expected, `should handle negative numbers [${nums}] by ${k} steps`, arrayComparator);

        // Test 8: Large array and k
        // nums = Array.from({length: 1000}, (_, i) => i + 1); k = 12345;
        // let expectedLarge = [...nums.slice(1000 - (12345 % 1000)), ...nums.slice(0, 1000 - (12345 % 1000))];
        // assert(rotateArrayByExtraArray(shallowCopyArray(nums), k), expectedLarge, `should handle large array and k`, arrayComparator);

        // Test 9: Two elements, k=1
        nums = [1,2]; k = 1; expected = [2,1];
        assert(rotateArrayByExtraArray(shallowCopyArray(nums), k), expected, `should rotate [${nums}] by ${k} steps`, arrayComparator);
    });

    // Test cases for rotateArrayByReversal (Optimal)
    testSuite('rotateArrayByReversal (Optimal)', () => {
        let nums;
        let k;
        let expected;

        // Test 1: Basic rotation
        nums = [1, 2, 3, 4, 5, 6, 7]; k = 3; expected = [5, 6, 7, 1, 2, 3, 4];
        let numsCopy1 = shallowCopyArray(nums);
        rotateArrayByReversal(numsCopy1, k);
        assert(numsCopy1, expected, `should rotate [${nums}] by ${k} steps`, arrayComparator);

        // Test 2: k > n
        nums = [1, 2]; k = 3; expected = [2, 1];
        let numsCopy2 = shallowCopyArray(nums);
        rotateArrayByReversal(numsCopy2, k);
        assert(numsCopy2, expected, `should handle k > n for [${nums}] by ${k} steps`, arrayComparator);

        // Test 3: k = n (no effective rotation)
        nums = [1, 2, 3]; k = 3; expected = [1, 2, 3];
        let numsCopy3 = shallowCopyArray(nums);
        rotateArrayByReversal(numsCopy3, k);
        assert(numsCopy3, expected, `should handle k = n for [${nums}] by ${k} steps`, arrayComparator);

        // Test 4: k = 0 (no rotation)
        nums = [1, 2, 3]; k = 0; expected = [1, 2, 3];
        let numsCopy4 = shallowCopyArray(nums);
        rotateArrayByReversal(numsCopy4, k);
        assert(numsCopy4, expected, `should handle k = 0 for [${nums}] by ${k} steps`, arrayComparator);

        // Test 5: Empty array
        nums = []; k = 5; expected = [];
        let numsCopy5 = shallowCopyArray(nums);
        rotateArrayByReversal(numsCopy5, k);
        assert(numsCopy5, expected, `should handle empty array [${nums}] by ${k} steps`, arrayComparator);

        // Test 6: Single element array
        nums = [1]; k = 5; expected = [1];
        let numsCopy6 = shallowCopyArray(nums);
        rotateArrayByReversal(numsCopy6, k);
        assert(numsCopy6, expected, `should handle single element array [${nums}] by ${k} steps`, arrayComparator);

        // Test 7: Negative numbers
        nums = [-1, -100, 3, 99]; k = 2; expected = [3, 99, -1, -100];
        let numsCopy7 = shallowCopyArray(nums);
        rotateArrayByReversal(numsCopy7, k);
        assert(numsCopy7, expected, `should handle negative numbers [${nums}] by ${k} steps`, arrayComparator);

        // Test 8: Two elements, k=1
        nums = [1,2]; k = 1; expected = [2,1];
        let numsCopy8 = shallowCopyArray(nums);
        rotateArrayByReversal(numsCopy8, k);
        assert(numsCopy8, expected, `should rotate [${nums}] by ${k} steps`, arrayComparator);
    });

    // Test cases for rotateArrayBySplice
    testSuite('rotateArrayBySplice', () => {
        let nums;
        let k;
        let expected;

        // Test 1: Basic rotation
        nums = [1, 2, 3, 4, 5, 6, 7]; k = 3; expected = [5, 6, 7, 1, 2, 3, 4];
        assert(rotateArrayBySplice(shallowCopyArray(nums), k), expected, `should rotate [${nums}] by ${k} steps`, arrayComparator);

        // Test 2: k > n
        nums = [1, 2]; k = 3; expected = [2, 1];
        assert(rotateArrayBySplice(shallowCopyArray(nums), k), expected, `should handle k > n for [${nums}] by ${k} steps`, arrayComparator);

        // Test 3: k = n (no effective rotation)
        nums = [1, 2, 3]; k = 3; expected = [1, 2, 3];
        assert(rotateArrayBySplice(shallowCopyArray(nums), k), expected, `should handle k = n for [${nums}] by ${k} steps`, arrayComparator);

        // Test 4: k = 0 (no rotation)
        nums = [1, 2, 3]; k = 0; expected = [1, 2, 3];
        assert(rotateArrayBySplice(shallowCopyArray(nums), k), expected, `should handle k = 0 for [${nums}] by ${k} steps`, arrayComparator);

        // Test 5: Empty array
        nums = []; k = 5; expected = [];
        assert(rotateArrayBySplice(shallowCopyArray(nums), k), expected, `should handle empty array [${nums}] by ${k} steps`, arrayComparator);

        // Test 6: Single element array
        nums = [1]; k = 5; expected = [1];
        assert(rotateArrayBySplice(shallowCopyArray(nums), k), expected, `should handle single element array [${nums}] by ${k} steps`, arrayComparator);

        // Test 7: Negative numbers
        nums = [-1, -100, 3, 99]; k = 2; expected = [3, 99, -1, -100];
        assert(rotateArrayBySplice(shallowCopyArray(nums), k), expected, `should handle negative numbers [${nums}] by ${k} steps`, arrayComparator);

        // Test 8: Two elements, k=1
        nums = [1,2]; k = 1; expected = [2,1];
        assert(rotateArrayBySplice(shallowCopyArray(nums), k), expected, `should rotate [${nums}] by ${k} steps`, arrayComparator);
    });
});
```