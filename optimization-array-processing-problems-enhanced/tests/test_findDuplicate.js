```javascript
/**
 * tests/test_findDuplicate.js
 * Test suite for Problem 5: Find the Duplicate Number
 */

const { assert, testSuite } = require('./testRunner');
const {
    findDuplicateHashSet,
    findDuplicateSorting,
    findDuplicateFloyd
} = require('../src/problems/problem5_findDuplicate');
const { shallowCopyArray, generateArrayWithOneDuplicate } = require('../src/utils/arrayUtils');

testSuite('Problem 5: Find the Duplicate Number', () => {

    // Helper function to run tests for a given solution
    const runTestsForSolution = (solutionFn, solutionName, allowsModification = false) => {
        testSuite(solutionName, () => {
            let nums;
            let expected;

            const getTestArray = (arr) => allowsModification ? arr : shallowCopyArray(arr);

            // Test 1: Example 1 from problem description
            nums = [1, 3, 4, 2, 2]; expected = 2;
            assert(solutionFn(getTestArray(nums)), expected, `[${nums}] should find ${expected}`);

            // Test 2: Example 2 from problem description
            nums = [3, 1, 3, 4, 2]; expected = 3;
            assert(solutionFn(getTestArray(nums)), expected, `[${nums}] should find ${expected}`);

            // Test 3: Smallest case n=1, nums=[1,1]
            nums = [1, 1]; expected = 1;
            assert(solutionFn(getTestArray(nums)), expected, `[${nums}] should find ${expected}`);

            // Test 4: duplicate is the first element
            nums = [2, 2, 1]; expected = 2;
            assert(solutionFn(getTestArray(nums)), expected, `[${nums}] should find ${expected}`);

            // Test 5: duplicate is the last element
            nums = [1, 2, 3, 3]; expected = 3;
            assert(solutionFn(getTestArray(nums)), expected, `[${nums}] should find ${expected}`);

            // Test 6: Larger array, duplicate in middle
            nums = [4, 3, 1, 2, 4]; expected = 4;
            assert(solutionFn(getTestArray(nums)), expected, `[${nums}] should find ${expected}`);

            // Test 7: Longer array with duplicate
            nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5]; expected = 5;
            assert(solutionFn(getTestArray(nums)), expected, `[${nums}] should find ${expected}`);

            // Test 8: All elements up to n, then a duplicate
            nums = [1, 2, 3, 4, 5, 1]; expected = 1;
            assert(solutionFn(getTestArray(nums)), expected, `[${nums}] should find ${expected}`);

            // Test 9: n = 10, random array
            nums = generateArrayWithOneDuplicate(10);
            const freqMap = {};
            for (const num of nums) {
                freqMap[num] = (freqMap[num] || 0) + 1;
            }
            const expectedRandom = Object.keys(freqMap).find(key => freqMap[key] > 1);
            assert(solutionFn(getTestArray(nums)), parseInt(expectedRandom), `Random array [${nums}] should find ${expectedRandom}`);

            // Test 10: n = 100, random array
            nums = generateArrayWithOneDuplicate(100);
            const freqMap2 = {};
            for (const num of nums) {
                freqMap2[num] = (freqMap2[num] || 0) + 1;
            }
            const expectedRandom2 = Object.keys(freqMap2).find(key => freqMap2[key] > 1);
            assert(solutionFn(getTestArray(nums)), parseInt(expectedRandom2), `Large random array [${nums.length} elements] should find ${expectedRandom2}`);
        });
    };

    runTestsForSolution(findDuplicateHashSet, 'findDuplicateHashSet');
    runTestsForSolution(findDuplicateSorting, 'findDuplicateSorting', true); // Sorting modifies the array
    runTestsForSolution(findDuplicateFloyd, 'findDuplicateFloyd (Optimal In-Place)');
});
```