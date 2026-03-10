import { ListNode } from '@data-structures/ListNode';
import { arrayToLinkedList, createCycleList } from '@utils/listUtils';

// Import all problem solutions
import { reverseLinkedListIterative, reverseLinkedListRecursive } from '@problems/reverseLinkedList';
import { mergeTwoSortedListsIterative, mergeTwoSortedListsRecursive } from '@problems/mergeTwoSortedLists';
import { detectCycleFloyd, detectCycleHashSet } from '@problems/detectCycle';
import { removeNthFromEndOnePass, removeNthFromEndTwoPass } from '@problems/removeNthFromEnd';

/**
 * Helper function to run a benchmark for a given function.
 * @param name The name of the function being benchmarked.
 * @param fn The function to benchmark.
 * @param args The arguments to pass to the function.
 */
function runBenchmark(name: string, fn: (...args: any[]) => any, ...args: any[]): void {
    const startTime = process.hrtime.bigint();
    const result = fn(...args);
    const endTime = process.hrtime.bigint();
    const durationMs = Number(endTime - startTime) / 1_000_000;
    console.log(`- ${name}: ${durationMs.toFixed(3)} ms`);
    // Optionally, you might want to print a partial result to ensure the function ran correctly
    // console.log(`  Result (head val): ${result instanceof ListNode ? result.val : result}`);
}

// --- Benchmark Configurations ---
const LIST_SIZE_SMALL = 100;
const LIST_SIZE_MEDIUM = 1000;
const LIST_SIZE_LARGE = 10000;
const LIST_SIZE_VERY_LARGE = 100000;

function generateList(size: number): ListNode | null {
    return arrayToLinkedList(Array.from({ length: size }, (_, i) => i));
}

function generateSortedLists(size: number): [ListNode | null, ListNode | null] {
    const arr1 = Array.from({ length: size / 2 }, (_, i) => i * 2);
    const arr2 = Array.from({ length: size / 2 }, (_, i) => i * 2 + 1);
    return [arrayToLinkedList(arr1), arrayToLinkedList(arr2)];
}

function generateCycleList(size: number, cyclePos: number): ListNode | null {
    return createCycleList(Array.from({ length: size }, (_, i) => i), cyclePos);
}

console.log("--- Running Benchmarks ---");

// --- Problem 1: Reverse Linked List ---
console.log("\n### Problem 1: Reverse Linked List");
let listToReverse: ListNode | null;

console.log(`\nSize: ${LIST_SIZE_LARGE}`);
listToReverse = generateList(LIST_SIZE_LARGE);
runBenchmark("Iterative Reverse (copy)", reverseLinkedListIterative, listToReverse); // Requires fresh list for each call
listToReverse = generateList(LIST_SIZE_LARGE);
runBenchmark("Recursive Reverse (copy)", reverseLinkedListRecursive, listToReverse);


console.log(`\nSize: ${LIST_SIZE_VERY_LARGE}`);
listToReverse = generateList(LIST_SIZE_VERY_LARGE);
runBenchmark("Iterative Reverse (copy)", reverseLinkedListIterative, listToReverse);
listToReverse = generateList(LIST_SIZE_VERY_LARGE);
// Recursive can hit stack limit for very large lists, commenting out or increasing stack size
// runBenchmark("Recursive Reverse (copy)", reverseLinkedListRecursive, listToReverse);
console.log("  (Recursive for VERY_LARGE list commented out due to potential stack overflow)");


// --- Problem 2: Merge Two Sorted Lists ---
console.log("\n### Problem 2: Merge Two Sorted Lists");
let list1_merge: ListNode | null, list2_merge: ListNode | null;

console.log(`\nSize: ${LIST_SIZE_LARGE}`);
[list1_merge, list2_merge] = generateSortedLists(LIST_SIZE_LARGE);
runBenchmark("Iterative Merge", mergeTwoSortedListsIterative, list1_merge, list2_merge);
[list1_merge, list2_merge] = generateSortedLists(LIST_SIZE_LARGE); // Regenerate for independent benchmark
runBenchmark("Recursive Merge", mergeTwoSortedListsRecursive, list1_merge, list2_merge);


console.log(`\nSize: ${LIST_SIZE_VERY_LARGE}`);
[list1_merge, list2_merge] = generateSortedLists(LIST_SIZE_VERY_LARGE);
runBenchmark("Iterative Merge", mergeTwoSortedListsIterative, list1_merge, list2_merge);
[list1_merge, list2_merge] = generateSortedLists(LIST_SIZE_VERY_LARGE);
// Similar to reverse, recursive merge can also hit stack limits for very large lists
// runBenchmark("Recursive Merge", mergeTwoSortedListsRecursive, list1_merge, list2_merge);
console.log("  (Recursive for VERY_LARGE list commented out due to potential stack overflow)");


// --- Problem 3: Detect Cycle in Linked List ---
console.log("\n### Problem 3: Detect Cycle in Linked List");
let cycleList: ListNode | null;
let noCycleList: ListNode | null;

console.log(`\nSize: ${LIST_SIZE_LARGE} (Cycle at middle)`);
cycleList = generateCycleList(LIST_SIZE_LARGE, LIST_SIZE_LARGE / 2);
runBenchmark("Floyd's Tortoise and Hare", detectCycleFloyd, cycleList);
// Regenerate list for HashSet as it might modify/inspect nodes differently if not careful, though it usually doesn't
cycleList = generateCycleList(LIST_SIZE_LARGE, LIST_SIZE_LARGE / 2);
runBenchmark("Hash Set", detectCycleHashSet, cycleList);

console.log(`\nSize: ${LIST_SIZE_LARGE} (No Cycle)`);
noCycleList = generateCycleList(LIST_SIZE_LARGE, -1);
runBenchmark("Floyd's Tortoise and Hare", detectCycleFloyd, noCycleList);
noCycleList = generateCycleList(LIST_SIZE_LARGE, -1);
runBenchmark("Hash Set", detectCycleHashSet, noCycleList);

console.log(`\nSize: ${LIST_SIZE_VERY_LARGE} (Cycle at middle)`);
cycleList = generateCycleList(LIST_SIZE_VERY_LARGE, LIST_SIZE_VERY_LARGE / 2);
runBenchmark("Floyd's Tortoise and Hare", detectCycleFloyd, cycleList);
cycleList = generateCycleList(LIST_SIZE_VERY_LARGE, LIST_SIZE_VERY_LARGE / 2);
runBenchmark("Hash Set", detectCycleHashSet, cycleList); // Expect HashSet to be slower and use more memory

console.log(`\nSize: ${LIST_SIZE_VERY_LARGE} (No Cycle)`);
noCycleList = generateCycleList(LIST_SIZE_VERY_LARGE, -1);
runBenchmark("Floyd's Tortoise and Hare", detectCycleFloyd, noCycleList);
noCycleList = generateCycleList(LIST_SIZE_VERY_LARGE, -1);
runBenchmark("Hash Set", detectCycleHashSet, noCycleList); // Expect HashSet to be slower and use more memory


// --- Problem 4: Remove Nth Node From End of List ---
console.log("\n### Problem 4: Remove Nth Node From End of List");
let listToRemoveNth: ListNode | null;
const N_SMALL = 5;
const N_LARGE = LIST_SIZE_LARGE / 2; // Remove from middle
const N_VERY_LARGE = LIST_SIZE_VERY_LARGE - 10; // Near head, for one pass comparison

console.log(`\nSize: ${LIST_SIZE_LARGE}, n=${N_SMALL}`);
listToRemoveNth = generateList(LIST_SIZE_LARGE);
runBenchmark("One-Pass Remove Nth", removeNthFromEndOnePass, listToRemoveNth, N_SMALL);
listToRemoveNth = generateList(LIST_SIZE_LARGE);
runBenchmark("Two-Pass Remove Nth", removeNthFromEndTwoPass, listToRemoveNth, N_SMALL);

console.log(`\nSize: ${LIST_SIZE_LARGE}, n=${N_LARGE} (Middle)`);
listToRemoveNth = generateList(LIST_SIZE_LARGE);
runBenchmark("One-Pass Remove Nth", removeNthFromEndOnePass, listToRemoveNth, N_LARGE);
listToRemoveNth = generateList(LIST_SIZE_LARGE);
runBenchmark("Two-Pass Remove Nth", removeNthFromEndTwoPass, listToRemoveNth, N_LARGE);

console.log(`\nSize: ${LIST_SIZE_VERY_LARGE}, n=${N_VERY_LARGE} (Near Head)`);
listToRemoveNth = generateList(LIST_SIZE_VERY_LARGE);
runBenchmark("One-Pass Remove Nth", removeNthFromEndOnePass, listToRemoveNth, N_VERY_LARGE);
listToRemoveNth = generateList(LIST_SIZE_VERY_LARGE);
runBenchmark("Two-Pass Remove Nth", removeNthFromEndTwoPass, listToRemoveNth, N_VERY_LARGE);

console.log("\n--- Benchmarks Complete ---");