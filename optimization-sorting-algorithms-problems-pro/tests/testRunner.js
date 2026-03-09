```javascript
/**
 * tests/testRunner.js
 *
 * This file orchestrates running all defined test cases for both
 * standard sorting algorithms and specific sorting-related problems.
 * It provides clear feedback on success or failure, including details
 * for failed tests.
 *
 * To run tests: `node tests/testRunner.js`
 * Make sure to `npm install` for 'chalk' and 'colors' if not already done.
 */

const chalk = require('chalk');
const colors = require('colors/safe'); // Using 'colors' for consistency if chalk isn't enough
const {
    standardSortTestCases,
    problemTestCases,
    isWiggleSorted,
    areIntervalsEqual,
    areArraysEqualUnordered
} = require('./testCases');
const basicSorts = require('../algorithms/basicSorts');
const advancedSorts = require('../algorithms/advancedSorts');
const sortingProblems = require('../algorithms/sortingProblems');

const allSorts = { ...basicSorts, ...advancedSorts };

let totalTests = 0;
let passedTests = 0;

/**
 * Runs a single test case for a sorting algorithm.
 * @param {string} sorterName The name of the sorting algorithm.
 * @param {function(Array<any>): Array<any>} sorterFn The sorting function.
 * @param {object} testCase The test case object.
 */
function runSortTest(sorterName, sorterFn, testCase) {
    totalTests++;
    const originalInput = [...testCase.input]; // Clone input to ensure purity for subsequent tests
    let passed = false;
    let actualOutput;

    try {
        actualOutput = sorterFn([...originalInput]); // Pass a clone to sort function
        passed = JSON.stringify(actualOutput) === JSON.stringify(testCase.expected);
    } catch (error) {
        console.log(colors.red(`  ❌ Test Failed: ${sorterName} - ${testCase.name}`));
        console.log(colors.red(`    Input: ${JSON.stringify(originalInput)}`));
        console.log(colors.red(`    Error: ${error.message}`));
        return; // Skip incrementing passedTests for error cases
    }

    if (passed) {
        passedTests++;
        // console.log(chalk.green(`  ✔ ${testCase.name}`));
    } else {
        console.log(chalk.red(`  ❌ Test Failed: ${sorterName} - ${testCase.name}`));
        console.log(chalk.red(`    Input:    ${testCase.skipVisual ? '(skipped for large array)' : JSON.stringify(originalInput)}`));
        console.log(chalk.red(`    Expected: ${testCase.skipVisual ? '(skipped for large array)' : JSON.stringify(testCase.expected)}`));
        console.log(chalk.red(`    Actual:   ${testCase.skipVisual ? '(skipped for large array)' : JSON.stringify(actualOutput)}`));
    }
}

/**
 * Runs a test case for a specific problem function.
 * @param {string} problemName The name of the problem function.
 * @param {function(...any): any} problemFn The problem solution function.
 * @param {object} testCase The test case object.
 */
function runProblemTest(problemName, problemFn, testCase) {
    totalTests++;
    let passed = false;
    let actualOutput;
    let testInputArgs = [];

    try {
        // Dynamically construct arguments based on problem type
        switch (problemName) {
            case 'findKthLargest_BruteForce':
            case 'findKthLargest_QuickSelect':
            case 'findKthLargest_MinHeap':
                testInputArgs = [[...testCase.nums], testCase.k];
                actualOutput = problemFn(...testInputArgs);
                passed = actualOutput === testCase.expected;
                break;
            case 'mergeIntervals_Optimal':
                testInputArgs = [[...testCase.intervals.map(i => [...i])]]; // Deep clone intervals
                actualOutput = problemFn(...testInputArgs);
                passed = areIntervalsEqual(actualOutput, testCase.expected);
                break;
            case 'wiggleSortII_SortAndDistribute':
                testInputArgs = [[...testCase.nums]]; // The function modifies in-place
                problemFn(...testInputArgs);
                actualOutput = testInputArgs[0]; // Get the modified array
                passed = isWiggleSorted(actualOutput);
                break;
            case 'sortColors_TwoPass':
            case 'sortColors_OnePass':
                testInputArgs = [[...testCase.nums]]; // The function modifies in-place
                problemFn(...testInputArgs);
                actualOutput = testInputArgs[0]; // Get the modified array
                passed = JSON.stringify(actualOutput) === JSON.stringify(testCase.expected);
                break;
            case 'getSmallestKNumbers_BruteForce':
            case 'getSmallestKNumbers_MaxHeap':
            case 'getSmallestKNumbers_QuickSelect':
                testInputArgs = [[...testCase.arr], testCase.k];
                actualOutput = problemFn(...testInputArgs);
                passed = areArraysEqualUnordered(actualOutput, testCase.expected);
                break;
            default:
                throw new Error(`Unknown problem function: ${problemName}`);
        }
    } catch (error) {
        console.log(chalk.red(`  ❌ Test Failed: ${problemName} - ${testCase.name}`));
        console.log(chalk.red(`    Input: ${JSON.stringify(testInputArgs)}`));
        console.log(chalk.red(`    Error: ${error.message}`));
        return;
    }

    if (passed) {
        passedTests++;
        // console.log(chalk.green(`  ✔ ${testCase.name}`));
    } else {
        console.log(chalk.red(`  ❌ Test Failed: ${problemName} - ${testCase.name}`));
        console.log(chalk.red(`    Input:    ${JSON.stringify(testInputArgs)}`));
        console.log(chalk.red(`    Expected: ${problemName === 'wiggleSortII_SortAndDistribute' ? 'valid wiggle pattern' : JSON.stringify(testCase.expected)}`));
        console.log(chalk.red(`    Actual:   ${JSON.stringify(actualOutput)}`));
    }
}

// --- Main Test Execution ---
console.log(colors.bold.blue('--- Running Sorting Algorithm Tests ---'));
console.log('');

// Test standard sorting algorithms
for (const sorterName in allSorts) {
    console.log(colors.bold.cyan(`Testing ${sorterName}:`));
    const sorterFn = allSorts[sorterName];
    let relevantTestCases = standardSortTestCases.filter(tc => !tc.type || tc.type === "general");

    // Add specific test cases for Counting Sort and Radix Sort
    if (sorterName === 'countingSort') {
        relevantTestCases = relevantTestCases.concat(standardSortTestCases.filter(tc => tc.type === "counting"));
    } else if (sorterName === 'radixSort') {
        relevantTestCases = relevantTestCases.concat(standardSortTestCases.filter(tc => tc.type === "radix"));
    }
    // Filter out specific test cases not relevant to general sorts
    else {
         relevantTestCases = relevantTestCases.filter(tc => tc.type === "general" || !tc.type);
         // Filter out negative number tests for counting/radix if they are generic
         relevantTestCases = relevantTestCases.filter(tc => {
             if (tc.name.includes("negative numbers") && (sorterName === 'countingSort' || sorterName === 'radixSort')) {
                 return false;
             }
             return true;
         });
    }


    for (const testCase of relevantTestCases) {
        if ((sorterName === 'countingSort' || sorterName === 'radixSort') && testCase.input.some(num => num < 0)) {
            // Counting and Radix sort don't support negative numbers in this implementation.
            // This test should ideally throw an error, so we test for that.
            totalTests++;
            let caughtError = false;
            try {
                sorterFn([...testCase.input]);
            } catch (error) {
                if (error.message.includes("negative integers")) { // Check for specific error message
                    caughtError = true;
                    passedTests++;
                    // console.log(chalk.green(`  ✔ ${testCase.name} (Negative number error caught as expected)`));
                } else {
                     console.log(chalk.red(`  ❌ Test Failed (Unexpected Error): ${sorterName} - ${testCase.name}`));
                     console.log(chalk.red(`    Input: ${JSON.stringify(testCase.input)}`));
                     console.log(chalk.red(`    Error: ${error.message}`));
                }
            }
            if (!caughtError) {
                 console.log(chalk.red(`  ❌ Test Failed (Expected Error Not Caught): ${sorterName} - ${testCase.name}`));
                 console.log(chalk.red(`    Input: ${JSON.stringify(testCase.input)}`));
            }
        } else {
            runSortTest(sorterName, sorterFn, testCase);
        }
    }
    console.log('');
}


// Test problem-solving functions
console.log(colors.bold.blue('--- Running Sorting Problem Tests ---'));
console.log('');

for (const problemCategory in problemTestCases) {
    for (const testCase of problemTestCases[problemCategory]) {
        // Kth Largest
        if (problemCategory === 'findKthLargest') {
            console.log(colors.bold.cyan(`Testing findKthLargest_BruteForce - ${testCase.name}`));
            runProblemTest('findKthLargest_BruteForce', sortingProblems.findKthLargest_BruteForce, testCase);
            console.log(colors.bold.cyan(`Testing findKthLargest_QuickSelect - ${testCase.name}`));
            runProblemTest('findKthLargest_QuickSelect', sortingProblems.findKthLargest_QuickSelect, testCase);
            console.log(colors.bold.cyan(`Testing findKthLargest_MinHeap - ${testCase.name}`));
            runProblemTest('findKthLargest_MinHeap', sortingProblems.findKthLargest_MinHeap, testCase);
        }
        // Merge Overlapping Intervals
        else if (problemCategory === 'mergeIntervals') {
            console.log(colors.bold.cyan(`Testing mergeIntervals_Optimal - ${testCase.name}`));
            runProblemTest('mergeIntervals_Optimal', sortingProblems.mergeIntervals_Optimal, testCase);
        }
        // Wiggle Sort II
        else if (problemCategory === 'wiggleSortII') {
            console.log(colors.bold.cyan(`Testing wiggleSortII_SortAndDistribute - ${testCase.name}`));
            runProblemTest('wiggleSortII_SortAndDistribute', sortingProblems.wiggleSortII_SortAndDistribute, testCase);
        }
        // Sort Colors
        else if (problemCategory === 'sortColors') {
            console.log(colors.bold.cyan(`Testing sortColors_TwoPass - ${testCase.name}`));
            runProblemTest('sortColors_TwoPass', sortingProblems.sortColors_TwoPass, testCase);
            console.log(colors.bold.cyan(`Testing sortColors_OnePass - ${testCase.name}`));
            runProblemTest('sortColors_OnePass', sortingProblems.sortColors_OnePass, testCase);
        }
        // Smallest K Numbers
        else if (problemCategory === 'getSmallestKNumbers') {
            console.log(colors.bold.cyan(`Testing getSmallestKNumbers_BruteForce - ${testCase.name}`));
            runProblemTest('getSmallestKNumbers_BruteForce', sortingProblems.getSmallestKNumbers_BruteForce, testCase);
            console.log(colors.bold.cyan(`Testing getSmallestKNumbers_MaxHeap - ${testCase.name}`));
            runProblemTest('getSmallestKNumbers_MaxHeap', sortingProblems.getSmallestKNumbers_MaxHeap, testCase);
            console.log(colors.bold.cyan(`Testing getSmallestKNumbers_QuickSelect - ${testCase.name}`));
            runProblemTest('getSmallestKNumbers_QuickSelect', sortingProblems.getSmallestKNumbers_QuickSelect, testCase);
        }
        console.log('');
    }
}


// --- Summary ---
console.log(colors.bold.blue('--- Test Summary ---'));
if (passedTests === totalTests) {
    console.log(colors.bold.green(`All ${passedTests}/${totalTests} tests passed!`));
} else {
    console.log(colors.bold.red(`FAILED: ${totalTests - passedTests} out of ${totalTests} tests failed.`));
    console.log(colors.yellow(`Passed: ${passedTests}`));
    console.log(colors.red(`Failed: ${totalTests - passedTests}`));
}
console.log('');
```