```javascript
/**
 * tests/test_subarraySum.js
 * Test suite for Problem 3: Subarray Sum Equals K
 */

const { assert, testSuite } = require('./testRunner');
const { subarraySumBruteForce, subarraySumOptimal } = require('../src/problems/problem3_subarraySum');
const { shallowCopyArray } = require('../src/utils/arrayUtils');

testSuite('Problem 3: Subarray Sum Equals K', () => {

    // Test cases for subarraySumBruteForce
    testSuite('subarraySumBruteForce', () => {
        let nums;
        let k;
        let expected;

        // Test 1: Basic case
        nums = [1, 1, 1]; k = 2; expected = 2;
        assert(subarraySumBruteForce(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 2: Another basic case
        nums = [1, 2, 3]; k = 3; expected = 2; // [1,2], [3]
        assert(subarraySumBruteForce(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 3: No subarray sums to k
        nums = [1, 5, 2]; k = 7; expected = 0;
        assert(subarraySumBruteForce(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 4: Single element array, sum equals k
        nums = [5]; k = 5; expected = 1;
        assert(subarraySumBruteForce(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 5: Single element array, sum not equals k
        nums = [5]; k = 0; expected = 0;
        assert(subarraySumBruteForce(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 6: Empty array
        nums = []; k = 0; expected = 0;
        assert(subarraySumBruteForce(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 7: Array with negative numbers
        nums = [1, -1, 1, -1, 1]; k = 0; expected = 4; // [1,-1], [-1,1], [1,-1], [1,-1,1,-1]
        assert(subarraySumBruteForce(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 8: All elements sum to k
        nums = [2, 2, 2]; k = 6; expected = 1;
        assert(subarraySumBruteForce(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 9: k=0 with positive and negative numbers
        nums = [0, 0, 0]; k = 0; expected = 6; // [0], [0], [0], [0,0], [0,0], [0,0,0]
        assert(subarraySumBruteForce(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);
    });

    // Test cases for subarraySumOptimal (Prefix Sums with Hash Map)
    testSuite('subarraySumOptimal', () => {
        let nums;
        let k;
        let expected;

        // Test 1: Basic case
        nums = [1, 1, 1]; k = 2; expected = 2;
        assert(subarraySumOptimal(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 2: Another basic case
        nums = [1, 2, 3]; k = 3; expected = 2; // [1,2], [3]
        assert(subarraySumOptimal(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 3: No subarray sums to k
        nums = [1, 5, 2]; k = 7; expected = 0;
        assert(subarraySumOptimal(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 4: Single element array, sum equals k
        nums = [5]; k = 5; expected = 1;
        assert(subarraySumOptimal(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 5: Single element array, sum not equals k
        nums = [5]; k = 0; expected = 0;
        assert(subarraySumOptimal(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 6: Empty array
        nums = []; k = 0; expected = 0;
        assert(subarraySumOptimal(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 7: Array with negative numbers
        nums = [1, -1, 1, -1, 1]; k = 0; expected = 4; // [1,-1], [-1,1], [1,-1], [1,-1,1,-1]
        assert(subarraySumOptimal(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 8: All elements sum to k
        nums = [2, 2, 2]; k = 6; expected = 1;
        assert(subarraySumOptimal(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 9: k=0 with positive and negative numbers
        nums = [0, 0, 0]; k = 0; expected = 6; // [0] (3 times), [0,0] (2 times), [0,0,0] (1 time)
        assert(subarraySumOptimal(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 10: Array with mixed numbers, k=negative
        nums = [-1, -1, 1]; k = -1; expected = 2; // [-1], [-1,1,-1]
        assert(subarraySumOptimal(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);

        // Test 11: Longer array
        nums = [10, 5, 2, 7, 1, 9]; k = 17; expected = 2; // [10, 5, 2], [5, 2, 7, 1, 9] - 17, No, [10,5,2] -> 17, [5,2,7,1,9] -> 24-7=17, [7,1,9] -> 17
        assert(subarraySumOptimal(shallowCopyArray(nums), k), expected, `[${nums}], k=${k} -> ${expected}`);
    });
});
```