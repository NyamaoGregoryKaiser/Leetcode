```typescript
import { ListNode, createLinkedList, createLinkedListWithCycle, linkedListToArray } from '../src/data-structures/LinkedList';
import { benchmark, benchmarkAverage } from '../src/utils/performance';

// Import algorithms for benchmarking
import { reverseListIterative } from '../src/algorithms/Problem1_ReverseList';
import { reverseListRecursive } from '../implementations/Problem1_ReverseList_Recursive';

import { hasCycle } from '../src/algorithms/Problem2_HasCycle';
import { hasCycleSet } from '../implementations/Problem2_HasCycle_Set';

import { mergeTwoListsRecursive } from '../src/algorithms/Problem3_MergeSorted';
import { mergeTwoListsIterative } from '../implementations/Problem3_MergeSorted_Iterative';

import { removeNthFromEndOnePass } from '../src/algorithms/Problem4_RemoveNthFromEnd';
import { removeNthFromEndTwoPass } from '../implementations/Problem4_RemoveNthFromEnd_TwoPass';

describe('Performance Benchmarks for Linked List Algorithms', () => {

    const N_ITERATIONS = 1000; // Number of times to run each benchmark for average calculation

    // Helper to generate a long list for stress testing
    const generateLongList = (length: number) => createLinkedList(Array.from({ length }, (_, i) => i));
    const generateLongListWithCycle = (length: number, pos: number) => createLinkedListWithCycle(Array.from({ length }, (_, i) => i), pos);


    // Problem 1: Reverse Linked List
    describe('Problem 1: Reverse Linked List Performance', () => {
        const longListLength = 5000; // Max allowed by constraints
        let longListHead: ListNode | null;

        beforeEach(() => {
            // Re-create the list for each test to ensure fresh state
            longListHead = generateLongList(longListLength);
        });

        it(`Iterative vs Recursive for list of length ${longListLength} (avg over ${N_ITERATIONS} runs)`, () => {
            // Note: For reverseList, the function modifies the list, so we must clone or recreate for each call
            // We'll recreate for each average iteration

            const iterativeBench = benchmarkAverage(
                () => {
                    const clonedList = generateLongList(longListLength); // Clone for independent runs
                    return reverseListIterative(clonedList);
                },
                [], // No direct args, handled internally by recreating list
                N_ITERATIONS
            );

            const recursiveBench = benchmarkAverage(
                () => {
                    const clonedList = generateLongList(longListLength); // Clone for independent runs
                    return reverseListRecursive(clonedList);
                },
                [], // No direct args
                N_ITERATIONS
            );

            console.log(`\n--- Reverse Linked List (Length: ${longListLength}) ---`);
            console.log(`Iterative: Avg ${iterativeBench.averageTimeMs.toFixed(4)} ms`);
            console.log(`Recursive: Avg ${recursiveBench.averageTimeMs.toFixed(4)} ms`);

            // Recursive solution typically has higher overhead due to stack frames.
            // In Node.js, recursive depth limit can also be an issue for very long lists.
            expect(iterativeBench.averageTimeMs).toBeLessThan(recursiveBench.averageTimeMs * 2); // Expect iterative to be faster
        });
    });

    // Problem 2: Linked List Cycle
    describe('Problem 2: Linked List Cycle Performance', () => {
        const longListLength = 10000; // Max allowed by constraints is 10^5, but 10^4 is good for tests
        let noCycleHead: ListNode | null;
        let cycleHead: ListNode | null;

        beforeEach(() => {
            noCycleHead = generateLongList(longListLength);
            cycleHead = generateLongListWithCycle(longListLength, Math.floor(longListLength / 2)); // Cycle in middle
        });

        it(`Floyd's (O(1) space) vs Set (O(N) space) for long list without cycle (avg over ${N_ITERATIONS} runs)`, () => {
            const floydBench = benchmarkAverage(hasCycle, [noCycleHead], N_ITERATIONS);
            const setBench = benchmarkAverage(hasCycleSet, [noCycleHead], N_ITERATIONS);

            console.log(`\n--- Linked List Cycle (Length: ${longListLength}, No Cycle) ---`);
            console.log(`Floyd's (O(1) Space): Avg ${floydBench.averageTimeMs.toFixed(4)} ms`);
            console.log(`Set (O(N) Space): Avg ${setBench.averageTimeMs.toFixed(4)} ms`);

            // Floyd's algorithm should be faster as Set operations have overhead and memory allocations
            expect(floydBench.averageTimeMs).toBeLessThan(setBench.averageTimeMs);
        });

        it(`Floyd's (O(1) space) vs Set (O(N) space) for long list with cycle (avg over ${N_ITERATIONS} runs)`, () => {
            const floydBench = benchmarkAverage(hasCycle, [cycleHead], N_ITERATIONS);
            const setBench = benchmarkAverage(hasCycleSet, [cycleHead], N_ITERATIONS);

            console.log(`\n--- Linked List Cycle (Length: ${longListLength}, With Cycle) ---`);
            console.log(`Floyd's (O(1) Space): Avg ${floydBench.averageTimeMs.toFixed(4)} ms`);
            console.log(`Set (O(N) Space): Avg ${setBench.averageTimeMs.toFixed(4)} ms`);

            expect(floydBench.averageTimeMs).toBeLessThan(setBench.averageTimeMs);
        });
    });

    // Problem 3: Merge Two Sorted Lists
    describe('Problem 3: Merge Two Sorted Lists Performance', () => {
        const listLength = 2500; // Max allowed by constraints is 50, but for benchmark let's exceed it
        let list1: ListNode | null;
        let list2: ListNode | null;

        beforeEach(() => {
            // Lists are modified, so recreate for each benchmark run
            list1 = createLinkedList(Array.from({ length: listLength }, (_, i) => i * 2)); // [0, 2, 4, ...]
            list2 = createLinkedList(Array.from({ length: listLength }, (_, i) => i * 2 + 1)); // [1, 3, 5, ...]
        });

        it(`Iterative (O(1) space) vs Recursive (O(N) space) for lists of length ${listLength} (avg over ${N_ITERATIONS} runs)`, () => {
            const iterativeBench = benchmarkAverage(
                (l1, l2) => mergeTwoListsIterative(l1, l2),
                [createLinkedList(Array.from({ length: listLength }, (_, i) => i * 2)), createLinkedList(Array.from({ length: listLength }, (_, i) => i * 2 + 1))],
                N_ITERATIONS
            );

            const recursiveBench = benchmarkAverage(
                (l1, l2) => mergeTwoListsRecursive(l1, l2),
                [createLinkedList(Array.from({ length: listLength }, (_, i) => i * 2)), createLinkedList(Array.from({ length: listLength }, (_, i) => i * 2 + 1))],
                N_ITERATIONS
            );

            console.log(`\n--- Merge Two Sorted Lists (Each Length: ${listLength}) ---`);
            console.log(`Iterative (O(1) Space): Avg ${iterativeBench.averageTimeMs.toFixed(4)} ms`);
            console.log(`Recursive (O(N) Space): Avg ${recursiveBench.averageTimeMs.toFixed(4)} ms`);

            // Iterative should typically be faster or comparable due to no stack overhead
            expect(iterativeBench.averageTimeMs).toBeLessThan(recursiveBench.averageTimeMs);
        });
    });

    // Problem 4: Remove Nth Node From End
    describe('Problem 4: Remove Nth Node From End Performance', () => {
        const listLength = 1000; // Max allowed by constraints is 30, but for benchmark let's exceed it
        const nToRemove = Math.floor(listLength / 2); // Remove a middle element

        let originalList: ListNode | null;

        beforeEach(() => {
            originalList = generateLongList(listLength);
        });

        it(`One-Pass vs Two-Pass for list of length ${listLength}, removing ${nToRemove}th from end (avg over ${N_ITERATIONS} runs)`, () => {
            const onePassBench = benchmarkAverage(
                (head, n) => removeNthFromEndOnePass(head, n),
                [generateLongList(listLength), nToRemove], // Recreate list
                N_ITERATIONS
            );

            const twoPassBench = benchmarkAverage(
                (head, n) => removeNthFromEndTwoPass(head, n),
                [generateLongList(listLength), nToRemove], // Recreate list
                N_ITERATIONS
            );

            console.log(`\n--- Remove Nth From End (Length: ${listLength}, N: ${nToRemove}) ---`);
            console.log(`One-Pass: Avg ${onePassBench.averageTimeMs.toFixed(4)} ms`);
            console.log(`Two-Pass: Avg ${twoPassBench.averageTimeMs.toFixed(4)} ms`);

            // One-pass should theoretically be slightly faster but often comparable to two-pass for typical lengths
            expect(onePassBench.averageTimeMs).toBeLessThanOrEqual(twoPassBench.averageTimeMs * 1.5); // Allow for some variance
        });

        it(`One-Pass vs Two-Pass for list of length ${listLength}, removing head (n = ${listLength}) (avg over ${N_ITERATIONS} runs)`, () => {
            const onePassBench = benchmarkAverage(
                (head, n) => removeNthFromEndOnePass(head, n),
                [generateLongList(listLength), listLength], // Recreate list
                N_ITERATIONS
            );

            const twoPassBench = benchmarkAverage(
                (head, n) => removeNthFromEndTwoPass(head, n),
                [generateLongList(listLength), listLength], // Recreate list
                N_ITERATIONS
            );

            console.log(`\n--- Remove Nth From End (Length: ${listLength}, N: ${listLength} - remove head) ---`);
            console.log(`One-Pass: Avg ${onePassBench.averageTimeMs.toFixed(4)} ms`);
            console.log(`Two-Pass: Avg ${twoPassBench.averageTimeMs.toFixed(4)} ms`);

            expect(onePassBench.averageTimeMs).toBeLessThanOrEqual(twoPassBench.averageTimeMs * 1.5);
        });
    });
});
```