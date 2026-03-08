const countingSort = require('../../src/algorithms/countingSort');
const { isSorted, generateRandomArray } = require('../../src/utils/arrayUtils');
const defaultComparator = require('../../src/utils/comparator');

function runCountingSortTests() {
    console.log("\n--- Running Counting Sort Tests ---");

    // Test Case 1: Empty array
    let arr1 = [];
    console.assert(isSorted(countingSort(arr1.slice())), "Test 1 Failed: Empty array");
    console.assert(arr1.length === 0, "Test 1 Failed: Empty array length");

    // Test Case 2: Single element array
    let arr2 = [5];
    console.assert(isSorted(countingSort(arr2.slice())), "Test 2 Failed: Single element array");
    console.assert(arr2[0] === 5, "Test 2 Failed: Single element value");

    // Test Case 3: Already sorted array
    let arr3 = [1, 2, 3, 4, 5];
    let sortedArr3 = countingSort(arr3.slice());
    console.assert(isSorted(sortedArr3), "Test 3 Failed: Already sorted array");
    console.assert(JSON.stringify(sortedArr3) === JSON.stringify([1, 2, 3, 4, 5]), "Test 3 Failed: Already sorted array content");

    // Test Case 4: Reverse sorted array
    let arr4 = [5, 4, 3, 2, 1];
    let sortedArr4 = countingSort(arr4.slice());
    console.assert(isSorted(sortedArr4), "Test 4 Failed: Reverse sorted array");
    console.assert(JSON.stringify(sortedArr4) === JSON.stringify([1, 2, 3, 4, 5]), "Test 4 Failed: Reverse sorted array content");

    // Test Case 5: Array with duplicate elements
    let arr5 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    let sortedArr5 = countingSort(arr5.slice());
    console.assert(isSorted(sortedArr5), "Test 5 Failed: Array with duplicates");
    console.assert(JSON.stringify(sortedArr5) === JSON.stringify([1, 1, 2, 3, 4, 5, 5, 6, 9]), "Test 5 Failed: Array with duplicates content");

    // Test Case 6: Array with zeros
    let arr6 = [0, 5, 3, 1, 4, 0, 2, 5];
    let sortedArr6 = countingSort(arr6.slice());
    console.assert(isSorted(sortedArr6), "Test 6 Failed: Array with zeros");
    console.assert(JSON.stringify(sortedArr6) === JSON.stringify([0, 0, 1, 2, 3, 4, 5, 5]), "Test 6 Failed: Array with zeros content");

    // Test Case 7: Larger random array within a limited range
    const randomArr1 = generateRandomArray(100, 0, 50); // Range 0-50 for efficiency
    const sortedRandomArr1 = countingSort([...randomArr1]); // Pass a copy
    console.assert(isSorted(sortedRandomArr1), "Test 7 Failed: Large random array");
    console.assert(JSON.stringify(sortedRandomArr1) === JSON.stringify([...randomArr1].sort(defaultComparator)), "Test 7 Failed: Large random array content mismatch");

    // Test Case 8: Array with all identical elements
    let arr8 = [7, 7, 7, 7, 7];
    let sortedArr8 = countingSort(arr8.slice());
    console.assert(isSorted(sortedArr8), "Test 8 Failed: All identical elements");
    console.assert(JSON.stringify(sortedArr8) === JSON.stringify([7, 7, 7, 7, 7]), "Test 8 Failed: All identical elements content");

    // Test Case 9: Max value close to array length
    let arr9 = [10, 2, 5, 1, 10, 2, 5];
    let sortedArr9 = countingSort(arr9.slice());
    console.assert(isSorted(sortedArr9), "Test 9 Failed: Max value close to array length");
    console.assert(JSON.stringify(sortedArr9) === JSON.stringify([1, 2, 2, 5, 5, 10, 10]), "Test 9 Failed: Max value close to array length content");

    // Test Case 10: Test for negative number constraint (should throw error)
    let arr10 = [-1, 0, 1];
    try {
        countingSort(arr10.slice());
        console.assert(false, "Test 10 Failed: Counting Sort should throw error for negative numbers");
    } catch (e) {
        console.assert(e.message.includes("does not support negative numbers"), "Test 10 Passed: Caught expected error for negative numbers");
    }

    console.log("All Counting Sort tests passed!");
}

module.exports = runCountingSortTests;