```javascript
/**
 * Entry point for demonstrating the array manipulation algorithms.
 * You can run this file using `npm start` or `node src/index.js`
 * to see examples of the functions in action.
 */

const {
    maxSubarraySumSlidingWindow,
    rotateArrayBruteForce,
    rotateArrayExtraSpace,
    rotateArrayReversal,
    rotateArrayCyclicReplacement,
    productExceptSelf,
    productExceptSelfOptimal,
    mergeIntervals,
    mergeIntervalsNoSort
} = require('./algorithms/arrayManipulation');

console.log('--- Array Manipulation Demonstrations ---');
console.log('');

// --- Problem 1: Maximum Sum of K-sized Subarray ---
console.log('Problem 1: Maximum Sum of K-sized Subarray');
const arr1 = [2, 1, 5, 1, 3, 2];
const k1 = 3;
console.log(`Array: [${arr1}], k: ${k1}`);
console.log(`Max Sum (Sliding Window): ${maxSubarraySumSlidingWindow(arr1, k1)}`); // Expected: 9 (from [5, 1, 3])
console.log('---------------------------------------');

const arr1_2 = [1, 2, 3, 4, 5, 6];
const k1_2 = 2;
console.log(`Array: [${arr1_2}], k: ${k1_2}`);
console.log(`Max Sum (Sliding Window): ${maxSubarraySumSlidingWindow(arr1_2, k1_2)}`); // Expected: 11 (from [5, 6])
console.log('---------------------------------------');

// --- Problem 2: Rotate Array ---
console.log('Problem 2: Rotate Array');

let nums2_bf = [1, 2, 3, 4, 5, 6, 7];
let k2 = 3;
console.log(`Original Array: [${nums2_bf}], k: ${k2}`);
rotateArrayBruteForce(nums2_bf, k2);
console.log(`Brute Force (in-place): [${nums2_bf}]`); // Expected: [5, 6, 7, 1, 2, 3, 4]

let nums2_es = [1, 2, 3, 4, 5, 6, 7];
k2 = 3;
rotateArrayExtraSpace(nums2_es, k2);
console.log(`Extra Space (in-place): [${nums2_es}]`); // Expected: [5, 6, 7, 1, 2, 3, 4]

let nums2_rev = [1, 2, 3, 4, 5, 6, 7];
k2 = 3;
rotateArrayReversal(nums2_rev, k2);
console.log(`Reversal (in-place): [${nums2_rev}]`); // Expected: [5, 6, 7, 1, 2, 3, 4]

let nums2_cyc = [1, 2, 3, 4, 5, 6, 7];
k2 = 3;
rotateArrayCyclicReplacement(nums2_cyc, k2);
console.log(`Cyclic Replacement (in-place): [${nums2_cyc}]`); // Expected: [5, 6, 7, 1, 2, 3, 4]
console.log('---------------------------------------');

// --- Problem 3: Product of Array Except Self ---
console.log('Problem 3: Product of Array Except Self');
const arr3 = [1, 2, 3, 4];
console.log(`Array: [${arr3}]`);
console.log(`Product (Brute Force): [${productExceptSelf(arr3)}]`); // Expected: [24, 12, 8, 6]
console.log(`Product (Optimal): [${productExceptSelfOptimal(arr3)}]`); // Expected: [24, 12, 8, 6]

const arr3_zeros = [0, 1, 2, 3];
console.log(`Array: [${arr3_zeros}]`);
console.log(`Product (Optimal): [${productExceptSelfOptimal(arr3_zeros)}]`); // Expected: [6, 0, 0, 0]

const arr3_two_zeros = [1, 0, 2, 0];
console.log(`Array: [${arr3_two_zeros}]`);
console.log(`Product (Optimal): [${productExceptSelfOptimal(arr3_two_zeros)}]`); // Expected: [0, 0, 0, 0]
console.log('---------------------------------------');

// --- Problem 4: Merge Overlapping Intervals ---
console.log('Problem 4: Merge Overlapping Intervals');
const intervals4 = [[1, 3], [2, 6], [8, 10], [15, 18]];
console.log(`Intervals: [${intervals4.map(i => `[${i}]`).join(', ')}]`);
const merged4 = mergeIntervals(intervals4);
console.log(`Merged (Sorted): [${merged4.map(i => `[${i}]`).join(', ')}]`); // Expected: [[1,6], [8,10], [15,18]]

const intervals4_2 = [[1, 4], [4, 5]];
console.log(`Intervals: [${intervals4_2.map(i => `[${i}]`).join(', ')}]`);
const merged4_2 = mergeIntervals(intervals4_2);
console.log(`Merged (Sorted): [${merged4_2.map(i => `[${i}]`).join(', ')}]`); // Expected: [[1,5]]

const intervals4_3 = [[1,4],[0,4]];
console.log(`Intervals: [${intervals4_3.map(i => `[${i}]`).join(', ')}]`);
const merged4_3 = mergeIntervals(intervals4_3);
console.log(`Merged (Sorted): [${merged4_3.map(i => `[${i}]`).join(', ')}]`); // Expected: [[0,4]]

const intervals4_unsorted = [[2,3],[4,5],[6,7],[8,9],[1,10]];
console.log(`Intervals (Unsorted): [${intervals4_unsorted.map(i => `[${i}]`).join(', ')}]`);
const merged4_unsorted = mergeIntervals(intervals4_unsorted);
console.log(`Merged (Unsorted Input): [${merged4_unsorted.map(i => `[${i}]`).join(', ')}]`); // Expected: [[1,10]]

console.log('---------------------------------------');
```