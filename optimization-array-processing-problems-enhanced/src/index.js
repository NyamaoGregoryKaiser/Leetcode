```javascript
// src/index.js
// This file serves as an entry point to export all problems for easy access
// and to demonstrate usage.

const problem1 = require('./problems/problem1_rotateArray');
const problem2 = require('./problems/problem2_mergeIntervals');
const problem3 = require('./problems/problem3_subarraySum');
const problem4 = require('./problems/problem4_trappingRainWater');
const problem5 = require('./problems/problem5_findDuplicate');

// Export all problem solutions
module.exports = {
    rotateArray: problem1,
    mergeIntervals: problem2,
    subarraySum: problem3,
    trappingRainWater: problem4,
    findDuplicate: problem5,
};

// Example usage:
if (require.main === module) {
    console.log("--- Array Manipulation Project Examples ---");

    // Problem 1: Rotate Array
    let nums1 = [1, 2, 3, 4, 5, 6, 7];
    let k1 = 3;
    console.log(`\nProblem 1: Rotate Array`);
    console.log(`Original: [${nums1}]`);
    console.log(`k: ${k1}`);
    problem1.rotateArrayByReversal(nums1, k1); // In-place modification
    console.log(`Rotated (by reversal): [${nums1}]`); // Expected: [5, 6, 7, 1, 2, 3, 4]

    let nums1_alt = [1, 2, 3, 4, 5, 6, 7];
    let k1_alt = 3;
    console.log(`Original: [${nums1_alt}]`);
    console.log(`Rotated (by extra array): [${problem1.rotateArrayByExtraArray(nums1_alt, k1_alt)}]`); // Expected: [5, 6, 7, 1, 2, 3, 4]


    // Problem 2: Merge Intervals
    let intervals2 = [[1,3],[2,6],[8,10],[15,18]];
    console.log(`\nProblem 2: Merge Intervals`);
    console.log(`Original Intervals: [${JSON.stringify(intervals2)}]`);
    console.log(`Merged Intervals: [${JSON.stringify(problem2.mergeIntervalsOptimal(intervals2)}]`); // Expected: [[1,6],[8,10],[15,18]]

    let intervals2_b = [[1,4],[4,5]];
    console.log(`Original Intervals: [${JSON.stringify(intervals2_b)}]`);
    console.log(`Merged Intervals: [${JSON.stringify(problem2.mergeIntervalsOptimal(intervals2_b)}]`); // Expected: [[1,5]]

    // Problem 3: Subarray Sum Equals K
    let nums3 = [1,1,1];
    let k3 = 2;
    console.log(`\nProblem 3: Subarray Sum Equals K`);
    console.log(`Array: [${nums3}], k: ${k3}`);
    console.log(`Count (Prefix Sums): ${problem3.subarraySumOptimal(nums3, k3)}`); // Expected: 2

    let nums3_b = [1,2,3];
    let k3_b = 3;
    console.log(`Array: [${nums3_b}], k: ${k3_b}`);
    console.log(`Count (Prefix Sums): ${problem3.subarraySumOptimal(nums3_b, k3_b)}`); // Expected: 2

    // Problem 4: Trapping Rain Water
    let heights4 = [0,1,0,2,1,0,1,3,2,1,2,1];
    console.log(`\nProblem 4: Trapping Rain Water`);
    console.log(`Heights: [${heights4}]`);
    console.log(`Trapped Water (Two Pointers): ${problem4.trapRainWaterTwoPointers(heights4)}`); // Expected: 6

    let heights4_b = [4,2,0,3,2,5];
    console.log(`Heights: [${heights4_b}]`);
    console.log(`Trapped Water (Two Pointers): ${problem4.trapRainWaterTwoPointers(heights4_b)}`); // Expected: 9

    // Problem 5: Find the Duplicate Number
    let nums5 = [1,3,4,2,2];
    console.log(`\nProblem 5: Find the Duplicate Number`);
    console.log(`Array: [${nums5}]`);
    console.log(`Duplicate (Floyd's Tortoise and Hare): ${problem5.findDuplicateFloyd(nums5)}`); // Expected: 2

    let nums5_b = [3,1,3,4,2];
    console.log(`Array: [${nums5_b}]`);
    console.log(`Duplicate (Floyd's Tortoise and Hare): ${problem5.findDuplicateFloyd(nums5_b)}`); // Expected: 3
}

```