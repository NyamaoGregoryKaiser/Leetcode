```javascript
/**
 * @fileoverview Performance benchmarking script for Linked List algorithms.
 * Compares the execution time of optimal solutions against alternative solutions.
 */

const { performance } = require('perf_hooks');
const { arrayToLinkedList, createCycle } = require('../src/utils/linkedListHelpers');

// --- Problem Imports ---
// Optimal Solutions
const reverseLinkedList = require('../src/problems/reverseLinkedList');
const detectCycle = require('../src/problems/detectCycle');
const mergeTwoSortedLists = require('../src/problems/mergeTwoSortedLists');
const removeNthFromEnd = require('../src/problems/removeNthFromEnd');
const addTwoNumbers = require('../src/problems/addTwoNumbers');

// Alternative Solutions
const reverseLinkedListRecursive = require('../src/alternatives/reverseLinkedList_recursive');
const detectCycleSet = require('../src/alternatives/detectCycle_set');
const mergeTwoSortedListsRecursive = require('../src/alternatives/mergeTwoSortedLists_recursive');
const removeNthFromEndTwoPass = require('../src/alternatives/removeNthFromEnd_twoPass');
const addTwoNumbersRecursive = require('../src/alternatives/addTwoNumbers_recursive');

// --- Helper for benchmarking ---
function benchmarkFunction(name, func, setup, iterations = 10000) {
    const data = setup(); // Prepare data for the test
    let totalTime = 0;

    for (let i = 0; i < iterations; i++) {
        // Re-create the data for each iteration if it's mutable
        // This is crucial for Linked List problems, as functions modify the list
        const testData = setup();
        const start = performance.now();
        // Handle functions with multiple arguments. Assumes setup returns an array of arguments.
        if (Array.isArray(testData)) {
            func(...testData);
        } else {
            func(testData);
        }
        const end = performance.now();
        totalTime += (end - start);
    }
    console.log(`  ${name}: ${totalTime.toFixed(4)} ms (avg: ${(totalTime / iterations).toFixed(6)} ms) over ${iterations} iterations`);
}

// --- Benchmarking Scenarios ---

console.log('--- Linked List Benchmarks ---');
console.log('Iteration count for each test: 10,000');
console.log('Results are approximate and depend on system load.');

// --- Problem 1: Reverse Linked List ---
console.log('\nBenchmarking: Reverse Linked List (N=100)');
const listLength = 100;
const longListArray = Array.from({ length: listLength }, (_, i) => i + 1);

benchmarkFunction(
    'Iterative Reverse',
    reverseLinkedList,
    () => arrayToLinkedList(longListArray)
);
benchmarkFunction(
    'Recursive Reverse',
    reverseLinkedListRecursive,
    () => arrayToLinkedList(longListArray)
);

// --- Problem 2: Detect Cycle ---
console.log('\nBenchmarking: Detect Cycle (N=200, cycle at middle)');
const cycleListLength = 200;
const cyclePos = 100; // Cycle starts at index 100
const cycleListArray = Array.from({ length: cycleListLength }, (_, i) => i + 1);

benchmarkFunction(
    'Floyd\'s Tortoise and Hare',
    detectCycle,
    () => createCycle(arrayToLinkedList(cycleListArray), cyclePos)
);
benchmarkFunction(
    'Set-based Cycle Detection',
    detectCycleSet,
    () => createCycle(arrayToLinkedList(cycleListArray), cyclePos)
);

console.log('\nBenchmarking: Detect Cycle (N=200, NO cycle)');
benchmarkFunction(
    'Floyd\'s Tortoise and Hare (no cycle)',
    detectCycle,
    () => arrayToLinkedList(cycleListArray)
);
benchmarkFunction(
    'Set-based Cycle Detection (no cycle)',
    detectCycleSet,
    () => arrayToLinkedList(cycleListArray)
);

// --- Problem 3: Merge Two Sorted Lists ---
console.log('\nBenchmarking: Merge Two Sorted Lists (N=100 each)');
const list1Arr = Array.from({ length: 100 }, (_, i) => i * 2);
const list2Arr = Array.from({ length: 100 }, (_, i) => i * 2 + 1);

benchmarkFunction(
    'Iterative Merge',
    mergeTwoSortedLists,
    () => [arrayToLinkedList(list1Arr), arrayToLinkedList(list2Arr)]
);
benchmarkFunction(
    'Recursive Merge',
    mergeTwoSortedListsRecursive,
    () => [arrayToLinkedList(list1Arr), arrayToLinkedList(list2Arr)]
);

// --- Problem 4: Remove Nth Node From End of List ---
console.log('\nBenchmarking: Remove Nth Node From End (N=150, remove middle)');
const removeListLength = 150;
const removeN = 75; // Remove roughly middle node
const removeListArray = Array.from({ length: removeListLength }, (_, i) => i + 1);

benchmarkFunction(
    'Two-Pointer (One-Pass)',
    (head, n) => removeNthFromEnd(head, n),
    () => [arrayToLinkedList(removeListArray), removeN]
);
benchmarkFunction(
    'Two-Pass (Length Calc)',
    (head, n) => removeNthFromEndTwoPass(head, n),
    () => [arrayToLinkedList(removeListArray), removeN]
);

// --- Problem 5: Add Two Numbers ---
console.log('\nBenchmarking: Add Two Numbers (N=50 each, with carry)');
const addList1Arr = Array.from({ length: 50 }, () => 9); // 50 nines
const addList2Arr = Array.from({ length: 50 }, () => 9); // 50 nines

benchmarkFunction(
    'Iterative Add',
    addTwoNumbers,
    () => [arrayToLinkedList(addList1Arr), arrayToLinkedList(addList2Arr)]
);
benchmarkFunction(
    'Recursive Add',
    addTwoNumbersRecursive,
    () => [arrayToLinkedList(addList1Arr), arrayToLinkedList(addList2Arr)]
);
```