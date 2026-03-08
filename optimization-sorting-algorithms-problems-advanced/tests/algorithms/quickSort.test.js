const quickSort = require('../../src/algorithms/quickSort');
const { isSorted, generateRandomArray } = require('../../src/utils/arrayUtils');
const defaultComparator = require('../../src/utils/comparator');

function runQuickSortTests() {
    console.log("\n--- Running Quick Sort Tests ---");

    // Test Case 1: Empty array
    let arr1 = [];
    let copy1 = [...arr1];
    quickSort(copy1);
    console.assert(isSorted(copy1), "Test 1 Failed: Empty array");
    console.assert(copy1.length === 0, "Test 1 Failed: Empty array length");

    // Test Case 2: Single element array
    let arr2 = [5];
    let copy2 = [...arr2];
    quickSort(copy2);
    console.assert(isSorted(copy2), "Test 2 Failed: Single element array");
    console.assert(copy2[0] === 5, "Test 2 Failed: Single element value");

    // Test Case 3: Already sorted array (worst case for naive pivot)
    let arr3 = [1, 2, 3, 4, 5];
    let copy3 = [...arr3];
    quickSort(copy3);
    console.assert(isSorted(copy3), "Test 3 Failed: Already sorted array");
    console.assert(JSON.stringify(copy3) === JSON.stringify([1, 2, 3, 4, 5]), "Test 3 Failed: Already sorted array content");

    // Test Case 4: Reverse sorted array (worst case for naive pivot)
    let arr4 = [5, 4, 3, 2, 1];
    let copy4 = [...arr4];
    quickSort(copy4);
    console.assert(isSorted(copy4), "Test 4 Failed: Reverse sorted array");
    console.assert(JSON.stringify(copy4) === JSON.stringify([1, 2, 3, 4, 5]), "Test 4 Failed: Reverse sorted array content");

    // Test Case 5: Array with duplicate elements
    let arr5 = [3, 1, 4, 1, 5, 9, 2, 6, 5];
    let copy5 = [...arr5];
    quickSort(copy5);
    console.assert(isSorted(copy5), "Test 5 Failed: Array with duplicates");
    console.assert(JSON.stringify(copy5) === JSON.stringify([1, 1, 2, 3, 4, 5, 5, 6, 9]), "Test 5 Failed: Array with duplicates content");

    // Test Case 6: Array with negative numbers
    let arr6 = [-3, -1, -4, -1, -5, -9, -2, -6, -5];
    let copy6 = [...arr6];
    quickSort(copy6);
    console.assert(isSorted(copy6), "Test 6 Failed: Array with negative numbers");
    console.assert(JSON.stringify(copy6) === JSON.stringify([-9, -6, -5, -5, -4, -3, -2, -1, -1]), "Test 6 Failed: Array with negative numbers content");

    // Test Case 7: Mixed positive, negative, and zero
    let arr7 = [0, -5, 3, -1, 4, 0, -2, 5];
    let copy7 = [...arr7];
    quickSort(copy7);
    console.assert(isSorted(copy7), "Test 7 Failed: Mixed numbers");
    console.assert(JSON.stringify(copy7) === JSON.stringify([-5, -2, -1, 0, 0, 3, 4, 5]), "Test 7 Failed: Mixed numbers content");

    // Test Case 8: Larger random array
    const randomArr1 = generateRandomArray(1000, -1000, 1000);
    const copyRandomArr1 = [...randomArr1];
    quickSort(copyRandomArr1);
    console.assert(isSorted(copyRandomArr1), "Test 8 Failed: Large random array");
    console.assert(JSON.stringify(copyRandomArr1) === JSON.stringify([...randomArr1].sort(defaultComparator)), "Test 8 Failed: Large random array content mismatch");

    // Test Case 9: Array with all identical elements
    let arr9 = [7, 7, 7, 7, 7];
    let copy9 = [...arr9];
    quickSort(copy9);
    console.assert(isSorted(copy9), "Test 9 Failed: All identical elements");
    console.assert(JSON.stringify(copy9) === JSON.stringify([7, 7, 7, 7, 7]), "Test 9 Failed: All identical elements content");

    // Test Case 10: Odd number of elements
    let arr10 = [5, 2, 8, 1, 9];
    let copy10 = [...arr10];
    quickSort(copy10);
    console.assert(isSorted(copy10), "Test 10 Failed: Odd number of elements");
    console.assert(JSON.stringify(copy10) === JSON.stringify([1, 2, 5, 8, 9]), "Test 10 Failed: Odd number of elements content");

    console.log("All Quick Sort tests passed!");
}

module.exports = runQuickSortTests;