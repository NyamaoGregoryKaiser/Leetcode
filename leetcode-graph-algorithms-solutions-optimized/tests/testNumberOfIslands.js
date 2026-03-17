```javascript
/**
 * testNumberOfIslands.js
 *
 * Test file for the numberOfIslands algorithms (BFS, DFS, Iterative DFS).
 */

const {
    numberOfIslandsBFS,
    numberOfIslandsDFS,
    numberOfIslandsDFS_Iterative
} = require('../src/algorithms/numberOfIslands');

function runTest(algorithm, name, grid, expected) {
    // Create a deep copy of the grid because the algorithms modify it in-place.
    const gridCopy = grid.map(row => [...row]);
    const result = algorithm(gridCopy);
    const passed = result === expected;
    console.log(`  - ${name} (Grid Size: ${grid.length}x${grid[0]?.length || 0}): ${passed ? '✅ Passed' : '❌ Failed'}. Expected: ${expected}, Got: ${result}`);
    if (!passed) {
        console.log("    Original Grid:");
        grid.forEach(row => console.log(`      ${row.join('')}`));
        console.log("    Modified Grid (after algorithm ran):");
        gridCopy.forEach(row => console.log(`      ${row.join('')}`));
    }
    return passed;
}

async function runTests() {
    let passedCount = 0;
    let totalCount = 0;

    const testCases = [
        {
            name: "Example 1",
            grid: [
                ["1", "1", "1", "1", "0"],
                ["1", "1", "0", "1", "0"],
                ["1", "1", "0", "0", "0"],
                ["0", "0", "0", "0", "0"]
            ],
            expected: 1
        },
        {
            name: "Example 2",
            grid: [
                ["1", "1", "0", "0", "0"],
                ["1", "1", "0", "0", "0"],
                ["0", "0", "1", "0", "0"],
                ["0", "0", "0", "1", "1"]
            ],
            expected: 3
        },
        {
            name: "Empty Grid",
            grid: [],
            expected: 0
        },
        {
            name: "Grid with empty rows",
            grid: [[]],
            expected: 0
        },
        {
            name: "All water",
            grid: [
                ["0", "0", "0"],
                ["0", "0", "0"],
                ["0", "0", "0"]
            ],
            expected: 0
        },
        {
            name: "All land",
            grid: [
                ["1", "1", "1"],
                ["1", "1", "1"],
                ["1", "1", "1"]
            ],
            expected: 1
        },
        {
            name: "Single island",
            grid: [
                ["0", "0", "0"],
                ["0", "1", "0"],
                ["0", "0", "0"]
            ],
            expected: 1
        },
        {
            name: "Multiple small islands",
            grid: [
                ["1", "0", "1", "0", "1"],
                ["0", "1", "0", "1", "0"],
                ["1", "0", "1", "0", "1"]
            ],
            expected: 9
        },
        {
            name: "Complex island shape",
            grid: [
                ["1", "1", "0", "1", "1"],
                ["1", "0", "0", "0", "1"],
                ["0", "0", "1", "0", "0"],
                ["1", "0", "0", "0", "1"],
                ["1", "1", "0", "1", "1"]
            ],
            expected: 5 // Top-left island, top-right island, middle island, bottom-left island, bottom-right island
        },
        {
            name: "Grid with 'L' shapes",
            grid: [
                ["1", "1", "0", "0"],
                ["1", "0", "0", "0"],
                ["0", "0", "1", "1"],
                ["0", "0", "1", "0"]
            ],
            expected: 2
        }
    ];

    console.log("Running Number of Islands tests (BFS):");
    for (const tc of testCases) {
        totalCount++;
        if (runTest(numberOfIslandsBFS, tc.name, tc.grid, tc.expected)) {
            passedCount++;
        }
    }

    console.log("\nRunning Number of Islands tests (DFS Recursive):");
    for (const tc of testCases) {
        totalCount++;
        if (runTest(numberOfIslandsDFS, tc.name, tc.grid, tc.expected)) {
            passedCount++;
        }
    }

    console.log("\nRunning Number of Islands tests (DFS Iterative):");
    for (const tc of testCases) {
        totalCount++;
        if (runTest(numberOfIslandsDFS_Iterative, tc.name, tc.grid, tc.expected)) {
            passedCount++;
        }
    }

    console.log(`\nSummary for Number of Islands: ${passedCount}/${totalCount} tests passed.`);
    return { total: totalCount, passed: passedCount, failed: totalCount - passedCount };
}

module.exports = { runTests };
```