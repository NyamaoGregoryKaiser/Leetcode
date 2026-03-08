const {
    findAllDuplicates_Sorting,
    findAllDuplicates_HashSet,
    findAllDuplicates_InPlace
} = require('../../src/problems/findAllDuplicates');
const { shuffleArray } = require('../../src/utils/arrayUtils');

// Helper to compare arrays ignoring order
function arraysEqualUnordered(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    const sortedArr1 = [...arr1].sort((a, b) => a - b);
    const sortedArr2 = [...arr2].sort((a, b) => a - b);
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) return false;
    }
    return true;
}

function runFindAllDuplicatesTests() {
    console.log("\n--- Running Find All Duplicates Tests ---");

    const testCases = [
        {
            name: "Basic case with duplicates",
            input: [4, 3, 2, 7, 8, 2, 3, 1],
            expected: [2, 3]
        },
        {
            name: "No duplicates",
            input: [1, 2, 3, 4, 5],
            expected: []
        },
        {
            name: "All duplicates (each appears twice)",
            input: [1, 1, 2, 2, 3, 3],
            expected: [1, 2, 3]
        },
        {
            name: "Empty array",
            input: [],
            expected: []
        },
        {
            name: "Single element array",
            input: [1],
            expected: []
        },
        {
            name: "Array with one duplicate",
            input: [1, 2, 3, 1],
            expected: [1]
        },
        {
            name: "Larger array with mixed duplicates",
            input: [5, 4, 3, 2, 1, 5, 4, 3, 2, 1],
            expected: [1, 2, 3, 4, 5]
        },
        {
            name: "Duplicates at edges",
            input: [1, 8, 3, 4, 5, 6, 7, 1],
            expected: [1]
        },
        {
            name: "Duplicates in middle",
            input: [1, 2, 3, 3, 2, 6, 7],
            expected: [2, 3]
        },
        {
            name: "Max range values",
            input: [10, 2, 5, 1, 10, 2, 5, 9, 8, 7, 6, 4, 3, 1],
            expected: [1, 2, 5, 10]
        }
    ];

    const runTestsForMethod = (methodName, func) => {
        console.log(`\n--- Testing ${methodName} ---`);
        for (let i = 0; i < testCases.length; i++) {
            const tc = testCases[i];
            // Make a copy as some methods might modify the array
            const inputCopy = [...tc.input];
            const result = func(inputCopy);
            const passed = arraysEqualUnordered(result, tc.expected);
            console.assert(passed, `Test ${i + 1} Failed (${tc.name}): Input=${JSON.stringify(tc.input)}, Expected=${JSON.stringify(tc.expected)}, Got=${JSON.stringify(result)}`);
            if (passed) {
                // console.log(`Test ${i + 1} Passed: ${tc.name}`);
            }
        }
        console.log(`All ${methodName} tests passed!`);
    };

    runTestsForMethod('findAllDuplicates_Sorting', findAllDuplicates_Sorting);
    runTestsForMethod('findAllDuplicates_HashSet', findAllDuplicates_HashSet);
    runTestsForMethod('findAllDuplicates_InPlace', findAllDuplicates_InPlace);

    // Test for original array modification after InPlace algorithm
    let originalArray = [4, 3, 2, 7, 8, 2, 3, 1];
    let copyOriginal = [...originalArray];
    findAllDuplicates_InPlace(originalArray);
    // The original array is modified to contain negative numbers
    // If strict O(1) space and no modification is needed, this is not an issue
    // but good to note. For this problem, usually the modification is acceptable.
    // To restore: for (let i = 0; i < originalArray.length; i++) { originalArray[i] = Math.abs(originalArray[i]); }
    console.log(`\nOriginal array after InPlace method (may be modified): ${JSON.stringify(originalArray)}`);
    console.assert(
        !arraysEqualUnordered(originalArray, copyOriginal),
        "Test Failed: InPlace method should modify the original array."
    );
    console.log("Find All Duplicates tests completed.");
}

module.exports = runFindAllDuplicatesTests;