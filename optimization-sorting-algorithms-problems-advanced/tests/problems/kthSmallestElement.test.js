const {
    kthSmallest_Sorting,
    kthSmallest_QuickSelect,
    kthSmallest_MaxHeap
} = require('../../src/problems/kthSmallestElement');
const { generateRandomArray, shuffleArray } = require('../../src/utils/arrayUtils');

function runKthSmallestTests() {
    console.log("\n--- Running Kth Smallest Element Tests ---");

    const testCases = [
        { arr: [7, 10, 4, 3, 20, 15], k: 3, expected: 7, name: "Basic case" },
        { arr: [1, 2, 3, 4, 5], k: 1, expected: 1, name: "First element in sorted array" },
        { arr: [1, 2, 3, 4, 5], k: 5, expected: 5, name: "Last element in sorted array" },
        { arr: [5, 4, 3, 2, 1], k: 3, expected: 3, name: "Middle element in reverse sorted array" },
        { arr: [3, 2, 1, 5, 6, 4], k: 2, expected: 2, name: "Duplicates and mixed order" },
        { arr: [1, 1, 1, 1, 1], k: 3, expected: 1, name: "All identical elements" },
        { arr: [100], k: 1, expected: 100, name: "Single element array" },
        { arr: [-5, -2, -10, 0, 3, -1], k: 2, expected: -5, name: "Array with negative numbers" },
        { arr: [12, 3, 5, 7, 4, 19, 26], k: 4, expected: 7, name: "Another mixed case" }
    ];

    const runTestsForMethod = (methodName, func) => {
        console.log(`\nTesting ${methodName}:`);
        for (let i = 0; i < testCases.length; i++) {
            const { arr, k, expected, name } = testCases[i];
            // Pass a copy of the array to ensure original isn't modified by one test for another
            const result = func([...arr], k);
            const passed = (result === expected);
            console.assert(passed, `Test ${i + 1} Failed (${name}): arr=${JSON.stringify(arr)}, k=${k}, Expected=${expected}, Got=${result}`);
            if (passed) {
                // console.log(`Test ${i + 1} Passed: ${name}`);
            }
        }
        // Test edge cases: empty array or k out of bounds (should throw)
        try {
            func([], 1);
            console.assert(false, "Test Failed: Empty array should throw an error.");
        } catch (e) {
            console.assert(e.message.includes("empty"), "Test Passed: Caught expected error for empty array.");
        }
        try {
            func([1,2,3], 0);
            console.assert(false, "Test Failed: k=0 should throw an error for MaxHeap.");
        } catch (e) {
            // QuickSelect throws on k_index < 0, Sorting passes (k-1) which is -1
            // MaxHeap specifically checks for k < 1
            const expectedError = (methodName === 'kthSmallest_MaxHeap') ? 'k is out of bounds' : 'empty';
            console.assert(e.message.includes(expectedError), `Test Passed: Caught expected error for k=0 with ${methodName}.`);
        }
        try {
            func([1,2,3], 4);
            console.assert(false, "Test Failed: k > arr.length should throw an error for MaxHeap.");
        } catch (e) {
            // QuickSelect throws on k_index >= arr.length (i.e., 3 >= 3 if k=4)
            // Sorting returns undefined for (k-1) out of bounds
            // MaxHeap specifically checks for k > arr.length
            const expectedError = (methodName === 'kthSmallest_MaxHeap') ? 'k is out of bounds' : 'undefined';
            console.assert(e.message.includes(expectedError) || (result === undefined), `Test Passed: Caught expected error for k > arr.length with ${methodName}.`);
        }

        // Test with larger random arrays to check robustness
        for (let i = 0; i < 5; i++) {
            const size = Math.floor(Math.random() * 900) + 100; // 100 to 1000 elements
            const arr = generateRandomArray(size, -1000, 1000);
            const k = Math.floor(Math.random() * size) + 1; // Random k
            const sortedRef = [...arr].sort(defaultComparator);
            const expected = sortedRef[k - 1];

            const result = func([...arr], k);
            const passed = (result === expected);
            console.assert(passed, `Random Test ${i + 1} Failed (${methodName}): size=${size}, k=${k}, Expected=${expected}, Got=${result}`);
            if (passed) {
                // console.log(`Random Test ${i + 1} Passed: size=${size}, k=${k}`);
            }
        }
        console.log(`All ${methodName} tests passed!`);
    };

    runTestsForMethod('kthSmallest_Sorting', kthSmallest_Sorting);
    runTestsForMethod('kthSmallest_QuickSelect', kthSmallest_QuickSelect);
    runTestsForMethod('kthSmallest_MaxHeap', kthSmallest_MaxHeap);

    console.log("Kth Smallest Element tests completed.");
}

module.exports = runKthSmallestTests;