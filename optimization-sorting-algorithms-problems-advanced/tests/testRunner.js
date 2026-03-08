/**
 * tests/testRunner.js
 *
 * This is a simple test runner to execute all test files.
 * It uses Node.js's built-in `console.assert` for simplicity.
 *
 * To run: `node tests/testRunner.js` or `npm test`
 */

// Algorithms tests
const runBubbleSortTests = require('./algorithms/bubbleSort.test');
const runMergeSortTests = require('./algorithms/mergeSort.test');
const runQuickSortTests = require('./algorithms/quickSort.test');
const runHeapSortTests = require('./algorithms/heapSort.test');
const runCountingSortTests = require('./algorithms/countingSort.test');

// Problems tests
const runKthSmallestTests = require('./problems/kthSmallestElement.test');
const runMergeIntervalsTests = require('./problems/mergeIntervals.test');
const runSortColorsTests = require('./problems/sortColors.test');
const runFindAllDuplicatesTests = require('./problems/findAllDuplicates.test');


function runAllTests() {
    console.log("Starting all sorting algorithm tests...\n");

    // Run Algorithm Tests
    runBubbleSortTests();
    runMergeSortTests();
    runQuickSortTests();
    runHeapSortTests();
    runCountingSortTests();

    // Run Problem Tests
    runKthSmallestTests();
    runMergeIntervalsTests();
    runSortColorsTests();
    runFindAllDuplicatesTests();

    console.log("\nAll tests finished.");
    console.log("Please check the console output for any 'Failed' assertions.");
}

runAllTests();