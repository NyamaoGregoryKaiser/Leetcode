```javascript
/**
 * @fileoverview Performance benchmarking script for Linked List problems.
 * Compares different implementations for selected problems.
 */

const { createList, toArray } = require('../src/utils/listUtils');
const { reverseListIterative, reverseListRecursive, reverseListBruteForce } = require('../src/problems/Problem1_ReverseList');
const { mergeTwoListsIterative, mergeTwoListsRecursive } = require('../src/problems/Problem2_MergeTwoSortedLists');

/**
 * Executes a function multiple times and measures its average execution time.
 * @param {Function} func The function to benchmark.
 * @param {Array<*>} args Arguments to pass to the function.
 * @param {number} iterations Number of times to run the function.
 * @returns {number} Average time in milliseconds.
 */
function benchmark(func, args, iterations = 1000) {
    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
        // Deep copy arguments if they are mutable (like linked lists)
        // to ensure each run starts with a fresh state.
        const clonedArgs = args.map(arg => {
            if (arg && arg.val !== undefined && arg.next !== undefined) {
                // Assuming it's a Node or a head of a list
                return createList(toArray(arg)); // Recreate list from array representation
            }
            return arg;
        });

        const start = process.hrtime.bigint();
        func(...clonedArgs);
        const end = process.hrtime.bigint();
        totalTime += Number(end - start);
    }
    return (totalTime / BigInt(iterations)) / 1_000_000; // Convert nanoseconds to milliseconds
}

console.log("------------------------------------------");
console.log("    Running Linked List Benchmarks        ");
console.log("------------------------------------------\n");

// --- Problem 1: Reverse Linked List Benchmarks ---
console.log("--- Benchmarking Problem 1: Reverse Linked List ---");
const listSizes = [100, 1000, 10000]; // Sizes of lists to test
const iterations = 500; // Number of times to run each test for averaging

for (const size of listSizes) {
    const originalArray = Array.from({ length: size }, (_, i) => i + 1);
    const head = createList(originalArray);

    console.log(`\nList size: ${size}, Iterations: ${iterations}`);

    const timeIterative = benchmark(reverseListIterative, [head], iterations);
    console.log(`  Iterative:       ${timeIterative.toFixed(4)} ms`);

    const timeRecursive = benchmark(reverseListRecursive, [head], iterations);
    console.log(`  Recursive:       ${timeRecursive.toFixed(4)} ms`);

    const timeBruteForce = benchmark(reverseListBruteForce, [head], iterations / 10); // Reduce iterations for brute force due to higher cost
    console.log(`  Brute Force:     ${timeBruteForce.toFixed(4)} ms`);
}


// --- Problem 2: Merge Two Sorted Lists Benchmarks ---
console.log("\n--- Benchmarking Problem 2: Merge Two Sorted Lists ---");
const mergeListSizes = [50, 500, 5000]; // Total elements N+M
const mergeIterations = 500;

for (const size of mergeListSizes) {
    const arr1 = Array.from({ length: size / 2 }, (_, i) => i * 2);
    const arr2 = Array.from({ length: size / 2 }, (_, i) => i * 2 + 1);

    const head1 = createList(arr1);
    const head2 = createList(arr2);

    console.log(`\nTotal list size: ${size} (approx ${size/2} each), Iterations: ${mergeIterations}`);

    const timeMergeIterative = benchmark(mergeTwoListsIterative, [head1, head2], mergeIterations);
    console.log(`  Iterative:       ${timeMergeIterative.toFixed(4)} ms`);

    const timeMergeRecursive = benchmark(mergeTwoListsRecursive, [head1, head2], mergeIterations);
    console.log(`  Recursive:       ${timeMergeRecursive.toFixed(4)} ms`);
}

console.log("\n------------------------------------------");
console.log("          Benchmarks Complete             ");
console.log("------------------------------------------");
```