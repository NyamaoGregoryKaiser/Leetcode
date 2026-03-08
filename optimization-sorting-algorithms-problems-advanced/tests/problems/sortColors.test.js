const {
    sortColors_TwoPassCounting,
    sortColors_OnePass
} = require('../../src/problems/sortColors');
const { shuffleArray } = require('../../src/utils/arrayUtils');

// Helper to check if array is sorted in 0, 1, 2 order
function isColorSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

function runSortColorsTests() {
    console.log("\n--- Running Sort Colors Tests ---");

    const testCases = [
        {
            name: "Basic mixed order",
            input: [2, 0, 2, 1, 1, 0],
            expected: [0, 0, 1, 1, 2, 2]
        },
        {
            name: "Already sorted",
            input: [0, 0, 1, 1, 2, 2],
            expected: [0, 0, 1, 1, 2, 2]
        },
        {
            name: "Reverse sorted",
            input: [2, 2, 1, 1, 0, 0],
            expected: [0, 0, 1, 1, 2, 2]
        },
        {
            name: "All zeros",
            input: [0, 0, 0],
            expected: [0, 0, 0]
        },
        {
            name: "All ones",
            input: [1, 1, 1],
            expected: [1, 1, 1]
        },
        {
            name: "All twos",
            input: [2, 2, 2],
            expected: [2, 2, 2]
        },
        {
            name: "Single element - 0",
            input: [0],
            expected: [0]
        },
        {
            name: "Single element - 1",
            input: [1],
            expected: [1]
        },
        {
            name: "Single element - 2",
            input: [2],
            expected: [2]
        },
        {
            name: "Two elements - 0,1",
            input: [1, 0],
            expected: [0, 1]
        },
        {
            name: "Two elements - 0,2",
            input: [2, 0],
            expected: [0, 2]
        },
        {
            name: "Two elements - 1,2",
            input: [2, 1],
            expected: [1, 2]
        },
        {
            name: "Only 0s and 2s",
            input: [2, 0, 2, 0],
            expected: [0, 0, 2, 2]
        },
        {
            name: "Only 0s and 1s",
            input: [1, 0, 1, 0],
            expected: [0, 0, 1, 1]
        },
        {
            name: "Only 1s and 2s",
            input: [2, 1, 2, 1],
            expected: [1, 1, 2, 2]
        },
        {
            name: "Larger random array with 0, 1, 2",
            input: shuffleArray([
                ...Array(10).fill(0),
                ...Array(15).fill(1),
                ...Array(5).fill(2)
            ]),
            expected: [
                ...Array(10).fill(0),
                ...Array(15).fill(1),
                ...Array(5).fill(2)
            ]
        }
    ];

    const runTestsForMethod = (methodName, func) => {
        console.log(`\n--- Testing ${methodName} ---`);
        for (let i = 0; i < testCases.length; i++) {
            const tc = testCases[i];
            const inputCopy = [...tc.input]; // Pass a copy, as sortColors sorts in-place
            func(inputCopy);
            const passed = isColorSorted(inputCopy) && JSON.stringify(inputCopy) === JSON.stringify(tc.expected);
            console.assert(passed, `Test ${i + 1} Failed (${tc.name}): Input=${JSON.stringify(tc.input)}, Expected=${JSON.stringify(tc.expected)}, Got=${JSON.stringify(inputCopy)}`);
            if (passed) {
                // console.log(`Test ${i + 1} Passed: ${tc.name}`);
            }
        }
        console.log(`All ${methodName} tests passed!`);
    };

    runTestsForMethod('sortColors_TwoPassCounting', sortColors_TwoPassCounting);
    runTestsForMethod('sortColors_OnePass', sortColors_OnePass);

    console.log("Sort Colors tests completed.");
}

module.exports = runSortColorsTests;