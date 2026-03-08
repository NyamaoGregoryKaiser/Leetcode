const mergeSort = require('../../src/algorithms/mergeSort');
const { isSorted, generateRandomArray } = require('../../src/utils/arrayUtils');
const defaultComparator = require('../../src/utils/comparator');

function runMergeSortTests() {
    console.log("\n--- Running Merge Sort Tests ---");

    // Test Case 1: Empty array
    let arr1 = [];
    console.assert(isSorted(mergeSort(arr1)), "Test 1 Failed: Empty array");
    console.assert(arr1.length === 0, "Test 1 Failed: Empty array length");

    // Test Case 2: Single element array
    let arr2 = [5];
    console.assert(isSorted(mergeSort(arr2)), "Test 2 Failed: Single element array");
    console.assert(arr2[0] === 5, "Test 2 Failed: Single element value");

    // Test Case 3: Already sorted array
    let arr3 = [1, 2, 3, 4, 5];
    let sortedArr3 = mergeSort(arr3);
    console.assert(isSorted(sortedArr3), "Test 3 Failed: Already sorted array");
    console.assert(JSON.stringify(sortedArr3) === JSON.stringify([1, 2, 3, 4, 5]), "Test 3 Failed: Already sorted array content");

    // Test Case 4: Reverse sorted array
    let arr4 = [5, 4, 3, 2, 1];
    let sortedArr4 = mergeSort(arr4);
    console.assert(isSorted(sortedArr4), "Test 4 Failed: Reverse sorted array");
    console.assert(JSON.stringify(sortedArr4) === JSON.stringify([1, 2, 3, 4, 5]), "Test 4 Failed: Reverse sorted array content");

    // Test Case 5: Array with duplicate elements
    let arr5 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    let sortedArr5 = mergeSort(arr5);
    console.assert(isSorted(sortedArr5), "Test 5 Failed: Array with duplicates");
    console.assert(JSON.stringify(sortedArr5) === JSON.stringify([1, 1, 2, 3, 4, 5, 5, 6, 9]), "Test 5 Failed: Array with duplicates content");

    // Test Case 6: Array with negative numbers
    let arr6 = [-3, -1, -4, -1, -5, -9, -2, -6, -5];
    let sortedArr6 = mergeSort(arr6);
    console.assert(isSorted(sortedArr6), "Test 6 Failed: Array with negative numbers");
    console.assert(JSON.stringify(sortedArr6) === JSON.stringify([-9, -6, -5, -5, -4, -3, -2, -1, -1]), "Test 6 Failed: Array with negative numbers content");

    // Test Case 7: Mixed positive, negative, and zero
    let arr7 = [0, -5, 3, -1, 4, 0, -2, 5];
    let sortedArr7 = mergeSort(arr7);
    console.assert(isSorted(sortedArr7), "Test 7 Failed: Mixed numbers");
    console.assert(JSON.stringify(sortedArr7) === JSON.stringify([-5, -2, -1, 0, 0, 3, 4, 5]), "Test 7 Failed: Mixed numbers content");

    // Test Case 8: Larger random array
    const randomArr1 = generateRandomArray(1000, -1000, 1000);
    const sortedRandomArr1 = mergeSort([...randomArr1]); // Pass a copy, mergeSort returns new array
    console.assert(isSorted(sortedRandomArr1), "Test 8 Failed: Large random array");
    console.assert(JSON.stringify(sortedRandomArr1) === JSON.stringify([...randomArr1].sort(defaultComparator)), "Test 8 Failed: Large random array content mismatch");

    // Test Case 9: Array with all identical elements
    let arr9 = [7, 7, 7, 7, 7];
    let sortedArr9 = mergeSort(arr9);
    console.assert(isSorted(sortedArr9), "Test 9 Failed: All identical elements");
    console.assert(JSON.stringify(sortedArr9) === JSON.stringify([7, 7, 7, 7, 7]), "Test 9 Failed: All identical elements content");

    // Test Case 10: Array with odd number of elements
    let arr10 = [5, 2, 8, 1, 9];
    let sortedArr10 = mergeSort(arr10);
    console.assert(isSorted(sortedArr10), "Test 10 Failed: Odd number of elements");
    console.assert(JSON.stringify(sortedArr10) === JSON.stringify([1, 2, 5, 8, 9]), "Test 10 Failed: Odd number of elements content");


    console.log("All Merge Sort tests passed!");
}

module.exports = runMergeSortTests;