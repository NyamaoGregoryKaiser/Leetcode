```javascript
/**
 * tests/testCases.js
 *
 * This file defines a set of test cases for all implemented sorting algorithms
 * and specific sorting-related problems. It includes various array types and
 * edge cases to ensure robustness.
 */

const {
    generateRandomArray,
    generateSortedArray,
    generateReverseSortedArray,
    generateDuplicatesArray,
    generateNearlySortedArray,
    generateAllSameArray
} = require('../utils/arrayGenerator');

// --- Standard Sorting Algorithm Test Cases ---
const standardSortTestCases = [
    {
        name: "Empty array",
        input: [],
        expected: [],
        type: "general"
    },
    {
        name: "Single element array",
        input: [5],
        expected: [5],
        type: "general"
    },
    {
        name: "Two elements",
        input: [7, 2],
        expected: [2, 7],
        type: "general"
    },
    {
        name: "Small random array",
        input: [3, 1, 4, 1, 5, 9, 2, 6],
        expected: [1, 1, 2, 3, 4, 5, 6, 9],
        type: "general"
    },
    {
        name: "Already sorted array",
        input: [1, 2, 3, 4, 5],
        expected: [1, 2, 3, 4, 5],
        type: "general"
    },
    {
        name: "Reverse sorted array",
        input: [5, 4, 3, 2, 1],
        expected: [1, 2, 3, 4, 5],
        type: "general"
    },
    {
        name: "Array with duplicates",
        input: [5, 2, 8, 2, 5, 1, 8],
        expected: [1, 2, 2, 5, 5, 8, 8],
        type: "general"
    },
    {
        name: "Array with negative numbers",
        input: [-3, -1, -4, -1, -5, -9, -2, -6],
        expected: [-9, -6, -5, -4, -3, -2, -1, -1],
        type: "general"
    },
    {
        name: "Array with zeros",
        input: [0, 5, 0, 1, 0, 3],
        expected: [0, 0, 0, 1, 3, 5],
        type: "general"
    },
    {
        name: "Mixed positive, negative, zero",
        input: [5, -2, 0, 8, -1, 3],
        expected: [-2, -1, 0, 3, 5, 8],
        type: "general"
    },
    {
        name: "Large number array (small value range)",
        input: generateRandomArray(100, 0, 20),
        expected: generateRandomArray(100, 0, 20).sort((a, b) => a - b),
        type: "general",
        skipVisual: true // Skip printing large arrays
    },
    {
        name: "Large number array (large value range)",
        input: generateRandomArray(100, -1000, 1000),
        expected: generateRandomArray(100, -1000, 1000).sort((a, b) => a - b),
        type: "general",
        skipVisual: true
    },
    {
        name: "Array with all same elements",
        input: [7, 7, 7, 7, 7],
        expected: [7, 7, 7, 7, 7],
        type: "general"
    },
    {
        name: "Counting Sort Specific: Max value 0",
        input: [0, 0, 0],
        expected: [0, 0, 0],
        type: "counting" // This test case is specific to counting sort's range
    },
    {
        name: "Counting Sort Specific: Large max value",
        input: [100, 4, 2, 150, 7, 9, 200, 3, 1],
        expected: [1, 2, 3, 4, 7, 9, 100, 150, 200],
        type: "counting"
    },
    {
        name: "Radix Sort Specific: Numbers with different digit counts",
        input: [170, 45, 75, 90, 802, 24, 2, 66],
        expected: [2, 24, 45, 66, 75, 90, 170, 802],
        type: "radix"
    },
    {
        name: "Radix Sort Specific: Large numbers",
        input: [329, 457, 657, 839, 436, 720, 355],
        expected: [329, 355, 436, 457, 657, 720, 839],
        type: "radix"
    }
];

// --- Specific Problem Test Cases ---

const problemTestCases = {
    // Kth Largest Element in an Array
    findKthLargest: [
        {
            name: "Basic case",
            nums: [3, 2, 1, 5, 6, 4],
            k: 2,
            expected: 5
        },
        {
            name: "With duplicates",
            nums: [3, 2, 3, 1, 2, 4, 5, 5, 6],
            k: 4,
            expected: 4
        },
        {
            name: "Smallest K largest (k=1)",
            nums: [7, 6, 5, 4, 3, 2, 1],
            k: 1,
            expected: 7
        },
        {
            name: "Largest K largest (k=n)",
            nums: [7, 6, 5, 4, 3, 2, 1],
            k: 7,
            expected: 1
        },
        {
            name: "Single element array",
            nums: [1],
            k: 1,
            expected: 1
        },
        {
            name: "Two elements, k=1",
            nums: [1, 2],
            k: 1,
            expected: 2
        },
        {
            name: "Two elements, k=2",
            nums: [1, 2],
            k: 2,
            expected: 1
        },
        {
            name: "Negative numbers",
            nums: [-1, -5, -2, -8],
            k: 2,
            expected: -2
        },
        {
            name: "Mixed numbers",
            nums: [1, 0, -1, 5, 2],
            k: 3,
            expected: 2
        }
    ],

    // Merge Overlapping Intervals
    mergeIntervals: [
        {
            name: "Basic overlapping",
            intervals: [[1, 3], [2, 6], [8, 10], [15, 18]],
            expected: [[1, 6], [8, 10], [15, 18]]
        },
        {
            name: "No overlapping",
            intervals: [[1, 2], [3, 4], [5, 6]],
            expected: [[1, 2], [3, 4], [5, 6]]
        },
        {
            name: "Fully contained intervals",
            intervals: [[1, 10], [2, 5], [3, 7]],
            expected: [[1, 10]]
        },
        {
            name: "Adjacent intervals",
            intervals: [[1, 4], [4, 5]], // [1,4] and [4,5] are considered overlapping
            expected: [[1, 5]]
        },
        {
            name: "Multiple overlaps",
            intervals: [[1, 4], [0, 4]],
            expected: [[0, 4]]
        },
        {
            name: "All overlapping",
            intervals: [[1, 4], [0, 0], [0, 1]],
            expected: [[0, 4]]
        },
        {
            name: "Empty array",
            intervals: [],
            expected: []
        },
        {
            name: "Single interval",
            intervals: [[1, 5]],
            expected: [[1, 5]]
        },
        {
            name: "Unsorted input, multiple merges",
            intervals: [[8, 10], [1, 3], [2, 6], [15, 18], [1, 4]],
            expected: [[1, 6], [8, 10], [15, 18]]
        },
        {
            name: "Complex merges",
            intervals: [[1, 4], [0, 5]],
            expected: [[0, 5]]
        },
        {
            name: "More complex case",
            intervals: [[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]],
            expected: [[1, 10]]
        }
    ],

    // Wiggle Sort II
    wiggleSortII: [
        {
            name: "Basic even length",
            nums: [1, 5, 1, 1, 6, 4],
            expectedWiggle: true // Check if it's a valid wiggle, not exact match
        },
        {
            name: "Basic odd length",
            nums: [1, 3, 2, 2, 3, 1],
            expectedWiggle: true
        },
        {
            name: "All same elements",
            nums: [1, 1, 1, 1, 1],
            expectedWiggle: true // Should still be [1,1,1,1,1] or similar
        },
        {
            name: "Two unique elements",
            nums: [1, 2, 1, 2, 1, 2],
            expectedWiggle: true
        },
        {
            name: "Already wiggled",
            nums: [1, 6, 1, 5, 1, 4],
            expectedWiggle: true
        },
        {
            name: "Smallest case (length 1)",
            nums: [1],
            expectedWiggle: true
        },
        {
            name: "Smallest case (length 2)",
            nums: [1, 2],
            expectedWiggle: true // Expected: [1,2]
        },
        {
            name: "Smallest case (length 3)",
            nums: [1, 2, 3],
            expectedWiggle: true // Expected: [1,3,2]
        },
        {
            name: "Elements with high frequency",
            nums: [4, 5, 5, 6],
            expectedWiggle: true
        },
        {
            name: "More frequency testing",
            nums: [4, 5, 5, 5, 6],
            expectedWiggle: true
        }
    ],

    // Sort Colors (Dutch National Flag Problem)
    sortColors: [
        {
            name: "Basic mix",
            nums: [2, 0, 2, 1, 1, 0],
            expected: [0, 0, 1, 1, 2, 2]
        },
        {
            name: "All zeros",
            nums: [0, 0, 0],
            expected: [0, 0, 0]
        },
        {
            name: "All ones",
            nums: [1, 1, 1],
            expected: [1, 1, 1]
        },
        {
            name: "All twos",
            nums: [2, 2, 2],
            expected: [2, 2, 2]
        },
        {
            name: "Mix with 0s at end",
            nums: [1, 2, 0],
            expected: [0, 1, 2]
        },
        {
            name: "Mix with 2s at beginning",
            nums: [2, 1, 0],
            expected: [0, 1, 2]
        },
        {
            name: "Longer mix",
            nums: [2, 0, 1, 2, 1, 0, 0, 2, 1],
            expected: [0, 0, 0, 1, 1, 1, 2, 2, 2]
        },
        {
            name: "Empty array",
            nums: [],
            expected: []
        },
        {
            name: "Single element 0",
            nums: [0],
            expected: [0]
        },
        {
            name: "Single element 1",
            nums: [1],
            expected: [1]
        },
        {
            name: "Single element 2",
            nums: [2],
            expected: [2]
        },
        {
            name: "Two elements (0,1)",
            nums: [1, 0],
            expected: [0, 1]
        },
        {
            name: "Two elements (1,2)",
            nums: [2, 1],
            expected: [1, 2]
        }
    ],

    // Find the Smallest K Numbers
    getSmallestKNumbers: [
        {
            name: "Basic case k=2",
            arr: [3, 2, 1],
            k: 2,
            expected: [1, 2] // Order doesn't matter for output
        },
        {
            name: "k=1",
            arr: [0, 1, 2, 1],
            k: 1,
            expected: [0]
        },
        {
            name: "k=length",
            arr: [1, 2, 3, 4],
            k: 4,
            expected: [1, 2, 3, 4]
        },
        {
            name: "k > length",
            arr: [1, 2, 3],
            k: 5,
            expected: [1, 2, 3]
        },
        {
            name: "Duplicates",
            arr: [3, 2, 1, 5, 6, 4, 1],
            k: 3,
            expected: [1, 1, 2]
        },
        {
            name: "Negative numbers",
            arr: [-5, -1, -10, 0, 2],
            k: 3,
            expected: [-10, -5, -1]
        },
        {
            name: "Empty array",
            arr: [],
            k: 0,
            expected: []
        },
        {
            name: "k=0",
            arr: [1, 2, 3],
            k: 0,
            expected: []
        },
        {
            name: "Single element, k=1",
            arr: [7],
            k: 1,
            expected: [7]
        }
    ]
};

// Helper function to check wiggle sort property
function isWiggleSorted(arr) {
    if (arr.length < 2) return true;
    for (let i = 0; i < arr.length - 1; i++) {
        if (i % 2 === 0) { // Even index, should be smaller than next
            if (arr[i] >= arr[i + 1]) {
                return false;
            }
        } else { // Odd index, should be larger than next
            if (arr[i] <= arr[i + 1]) {
                return false;
            }
        }
    }
    return true;
}

// Helper function for comparing array of arrays (intervals)
function areIntervalsEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i][0] !== arr2[i][0] || arr1[i][1] !== arr2[i][1]) {
            return false;
        }
    }
    return true;
}

// Helper function for comparing arrays where order doesn't matter (e.g., k smallest)
function areArraysEqualUnordered(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    const sortedArr1 = [...arr1].sort((a, b) => a - b);
    const sortedArr2 = [...arr2].sort((a, b) => a - b);
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }
    return true;
}


module.exports = {
    standardSortTestCases,
    problemTestCases,
    isWiggleSorted,
    areIntervalsEqual,
    areArraysEqualUnordered
};
```