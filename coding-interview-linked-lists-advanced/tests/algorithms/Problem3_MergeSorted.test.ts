```typescript
import { ListNode, createLinkedList, linkedListToArray } from '../../src/data-structures/LinkedList';
import { mergeTwoListsRecursive } from '../../src/algorithms/Problem3_MergeSorted';
import { mergeTwoListsIterative } from '../../implementations/Problem3_MergeSorted_Iterative';

describe('Problem 3: Merge Two Sorted Lists', () => {

    interface TestCase {
        name: string;
        list1: number[];
        list2: number[];
        expected: number[];
    }

    const testCases: TestCase[] = [
        { name: 'example 1', list1: [1, 2, 4], list2: [1, 3, 4], expected: [1, 1, 2, 3, 4, 4] },
        { name: 'both empty lists', list1: [], list2: [], expected: [] },
        { name: 'list1 empty, list2 not empty', list1: [], list2: [0], expected: [0] },
        { name: 'list1 not empty, list2 empty', list1: [5, 6, 7], list2: [], expected: [5, 6, 7] },
        { name: 'distinct values, one list much longer', list1: [1, 3, 5], list2: [2, 4, 6, 8, 10], expected: [1, 2, 3, 4, 5, 6, 8, 10] },
        { name: 'values from list1 entirely before list2', list1: [1, 2, 3], list2: [4, 5, 6], expected: [1, 2, 3, 4, 5, 6] },
        { name: 'values from list2 entirely before list1', list1: [4, 5, 6], list2: [1, 2, 3], expected: [1, 2, 3, 4, 5, 6] },
        { name: 'all equal values', list1: [1, 1, 1], list2: [1, 1, 1], expected: [1, 1, 1, 1, 1, 1] },
        { name: 'negative numbers', list1: [-5, -3, -1], list2: [-4, -2, 0], expected: [-5, -4, -3, -2, -1, 0] },
        { name: 'mixed positive and negative', list1: [-2, 1, 5], list2: [-3, 0, 4], expected: [-3, -2, 0, 1, 4, 5] },
        { name: 'single node lists', list1: [7], list2: [3], expected: [3, 7] },
    ];

    describe('Recursive Solution (mergeTwoListsRecursive)', () => {
        testCases.forEach(({ name, list1, list2, expected }) => {
            it(`should merge ${name}: [${list1}] & [${list2}] -> [${expected}]`, () => {
                const head1 = createLinkedList(list1);
                const head2 = createLinkedList(list2);
                const mergedHead = mergeTwoListsRecursive(head1, head2);
                expect(linkedListToArray(mergedHead)).toEqual(expected);
            });
        });
    });

    describe('Iterative Solution (mergeTwoListsIterative)', () => {
        testCases.forEach(({ name, list1, list2, expected }) => {
            it(`should merge ${name}: [${list1}] & [${list2}] -> [${expected}]`, () => {
                const head1 = createLinkedList(list1);
                const head2 = createLinkedList(list2);
                const mergedHead = mergeTwoListsIterative(head1, head2);
                expect(linkedListToArray(mergedHead)).toEqual(expected);
            });
        });
    });
});
```