```javascript
/**
 * mergeKSortedLists.test.js
 *
 * Jest test suite for the Merge K Sorted Lists problem.
 */

const { mergeKLists, mergeKLists_BruteForce } = require('../src/algorithms/mergeKSortedLists');
const ListNode = require('../src/utils/listNode');
const { createLinkedList, linkedListToArray } = require('../src/utils/listNode');
const { benchmark, benchmarkAverage } = require('../src/utils/performanceBenchmarking');


describe('mergeKLists', () => {
    test('should merge three sorted linked lists', () => {
        const list1 = createLinkedList([1, 4, 5]);
        const list2 = createLinkedList([1, 3, 4]);
        const list3 = createLinkedList([2, 6]);
        const lists = [list1, list2, list3];
        const expected = [1, 1, 2, 3, 4, 4, 5, 6];
        const mergedHead = mergeKLists(lists);
        expect(linkedListToArray(mergedHead)).toEqual(expected);
    });

    test('should handle empty input array of lists', () => {
        const lists = [];
        expect(mergeKLists(lists)).toBeNull();
    });

    test('should handle array with empty lists', () => {
        const lists = [null, createLinkedList([1]), null, createLinkedList([2])];
        const expected = [1, 2];
        const mergedHead = mergeKLists(lists);
        expect(linkedListToArray(mergedHead)).toEqual(expected);
    });

    test('should handle single list in the array', () => {
        const list1 = createLinkedList([1, 2, 3]);
        const lists = [list1];
        const expected = [1, 2, 3];
        const mergedHead = mergeKLists(lists);
        expect(linkedListToArray(mergedHead)).toEqual(expected);
    });

    test('should handle all empty lists', () => {
        const lists = [null, null, null];
        expect(mergeKLists(lists)).toBeNull();
    });

    test('should merge two lists', () => {
        const list1 = createLinkedList([1, 2, 3]);
        const list2 = createLinkedList([4, 5, 6]);
        const lists = [list1, list2];
        const expected = [1, 2, 3, 4, 5, 6];
        const mergedHead = mergeKLists(lists);
        expect(linkedListToArray(mergedHead)).toEqual(expected);
    });

    test('should merge lists with different lengths', () => {
        const list1 = createLinkedList([1, 10]);
        const list2 = createLinkedList([2, 3, 4, 5, 6]);
        const list3 = createLinkedList([7, 8, 9]);
        const lists = [list1, list2, list3];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const mergedHead = mergeKLists(lists);
        expect(linkedListToArray(mergedHead)).toEqual(expected);
    });

    test('optimized vs brute force for Merge K Sorted Lists (large K, moderate N)', () => {
        const K = 100; // Number of lists
        const MAX_NODES_PER_LIST = 100; // Max nodes per list
        const lists = [];
        let totalNodes = 0;

        for (let i = 0; i < K; i++) {
            const numNodes = Math.floor(Math.random() * MAX_NODES_PER_LIST) + 1; // At least 1 node
            totalNodes += numNodes;
            const arr = Array.from({ length: numNodes }, (_, idx) => idx * 2 + i * 20 + Math.floor(Math.random() * 5));
            lists.push(createLinkedList(arr));
        }
        
        console.log(`\nTesting Merge K Sorted Lists with K=${K}, Total Nodes ~${totalNodes}`);

        // Ensure we work on copies for benchmarking
        const listsCopy1 = lists.map(list => linkedListToArray(list)).map(arr => createLinkedList(arr));
        const listsCopy2 = lists.map(list => linkedListToArray(list)).map(arr => createLinkedList(arr));

        // Optimized Heap solution
        const heapBenchmark = benchmark(() => mergeKLists(listsCopy1));
        console.log(`mergeKLists (Heap): Time=${heapBenchmark.durationMs.toFixed(3)}ms`);
        const heapResult = linkedListToArray(heapBenchmark.result);

        // Brute force (Pairwise Merging) solution
        const bruteForceBenchmark = benchmark(() => mergeKLists_BruteForce(listsCopy2));
        console.log(`mergeKLists_BruteForce (Pairwise): Time=${bruteForceBenchmark.durationMs.toFixed(3)}ms`);
        const bruteForceResult = linkedListToArray(bruteForceBenchmark.result);

        expect(heapResult).toEqual(bruteForceResult);
        // Expect heap to be faster for larger K
        expect(heapBenchmark.durationMs).toBeLessThan(bruteForceBenchmark.durationMs * 2); // Allow some leeway due to JS runtime etc.
        // For very large K and N, heap should be significantly faster.
    });

});
```