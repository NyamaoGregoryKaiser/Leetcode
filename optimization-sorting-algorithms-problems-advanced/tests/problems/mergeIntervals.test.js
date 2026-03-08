const mergeIntervals = require('../../src/problems/mergeIntervals');

// Helper to compare arrays of intervals (order matters for intervals themselves, but not for the outer array once sorted)
function arraysOfIntervalsEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i][0] !== arr2[i][0] || arr1[i][1] !== arr2[i][1]) {
            return false;
        }
    }
    return true;
}

function runMergeIntervalsTests() {
    console.log("\n--- Running Merge Intervals Tests ---");

    const testCases = [
        {
            name: "Basic overlapping intervals",
            input: [[1,3],[2,6],[8,10],[15,18]],
            expected: [[1,6],[8,10],[15,18]]
        },
        {
            name: "All intervals overlap",
            input: [[1,4],[0,4]],
            expected: [[0,4]]
        },
        {
            name: "Intervals with exactly touching boundaries",
            input: [[1,4],[4,5]],
            expected: [[1,5]]
        },
        {
            name: "No overlapping intervals",
            input: [[1,2],[3,4],[5,6]],
            expected: [[1,2],[3,4],[5,6]]
        },
        {
            name: "Empty input array",
            input: [],
            expected: []
        },
        {
            name: "Single interval",
            input: [[1,5]],
            expected: [[1,5]]
        },
        {
            name: "Multiple intervals overlapping into one large interval",
            input: [[1,4],[0,0],[2,3]],
            expected: [[0,4]]
        },
        {
            name: "Intervals out of order initially",
            input: [[4,5],[1,4],[0,0],[2,3]],
            expected: [[0,5]]
        },
        {
            name: "Complex overlapping scenario",
            input: [[1,4],[0,1],[3,5]],
            expected: [[0,5]]
        },
        {
            name: "Intervals that contain each other",
            input: [[1,10],[2,3],[5,7]],
            expected: [[1,10]]
        },
        {
            name: "Intervals with negative numbers or large numbers (within limits)",
            input: [[-10,-5],[-7,-3],[0,0],[1,10],[9,12],[15,20]],
            expected: [[-10,-3],[0,0],[1,12],[15,20]]
        },
        {
            name: "More complex case with multiple groups",
            input: [[1,3],[2,6],[8,10],[15,18],[12,14],[10,11]],
            expected: [[1,6],[8,11],[12,14],[15,18]]
        }
    ];

    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        // Pass a copy because mergeIntervals might sort in-place
        const result = mergeIntervals(JSON.parse(JSON.stringify(tc.input)));
        const passed = arraysOfIntervalsEqual(result, tc.expected);
        console.assert(passed, `Test ${i + 1} Failed (${tc.name}): Input=${JSON.stringify(tc.input)}, Expected=${JSON.stringify(tc.expected)}, Got=${JSON.stringify(result)}`);
        if (passed) {
            // console.log(`Test ${i + 1} Passed: ${tc.name}`);
        }
    }

    console.log("All Merge Intervals tests passed!");
}

module.exports = runMergeIntervalsTests;