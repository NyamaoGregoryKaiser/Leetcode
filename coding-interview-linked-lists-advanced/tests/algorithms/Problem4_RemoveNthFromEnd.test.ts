```typescript
import { ListNode, createLinkedList, linkedListToArray } from '../../src/data-structures/LinkedList';
import { removeNthFromEndOnePass } from '../../src/algorithms/Problem4_RemoveNthFromEnd';
import { removeNthFromEndTwoPass } from '../../implementations/Problem4_RemoveNthFromEnd_TwoPass';

describe('Problem 4: Remove Nth Node From End of List', () => {

    interface TestCase {
        name: string;
        inputList: number[];
        n: number;
        expectedList: number[];
    }

    const testCases: TestCase[] = [
        { name: 'example 1: remove 2nd from end', inputList: [1, 2, 3, 4, 5], n: 2, expectedList: [1, 2, 3, 5] },
        { name: 'example 2: remove 1st from end (single node list)', inputList: [1], n: 1, expectedList: [] },
        { name: 'example 3: remove 1st from end (two node list)', inputList: [1, 2], n: 1, expectedList: [1] },
        { name: 'remove head (n = length)', inputList: [1, 2, 3], n: 3, expectedList: [2, 3] },
        { name: 'remove tail (n = 1)', inputList: [1, 2, 3], n: 1, expectedList: [1, 2] },
        { name: 'remove middle node', inputList: [1, 2, 3, 4, 5], n: 3, expectedList: [1, 2, 4, 5] },
        { name: 'list of length 2, remove head', inputList: [1, 2], n: 2, expectedList: [2] },
        { name: 'longer list, remove 5th from end', inputList: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], n: 5, expectedList: [10, 20, 30, 40, 50, 70, 80, 90, 100] },
        { name: 'list with negative numbers, remove 2nd from end', inputList: [-1, -2, -3, -4, -5], n: 2, expectedList: [-1, -2, -3, -5] },
        { name: 'list with duplicate numbers, remove 3rd from end', inputList: [1, 2, 1, 3, 1], n: 3, expectedList: [1, 2, 3, 1] },
    ];

    describe('One-Pass Two-Pointer Solution (removeNthFromEndOnePass)', () => {
        testCases.forEach(({ name, inputList, n, expectedList }) => {
            it(`should ${name} for list [${inputList}] with n=${n} -> [${expectedList}]`, () => {
                const head = createLinkedList(inputList);
                const modifiedHead = removeNthFromEndOnePass(head, n);
                expect(linkedListToArray(modifiedHead)).toEqual(expectedList);
            });
        });
    });

    describe('Two-Pass Solution (removeNthFromEndTwoPass)', () => {
        testCases.forEach(({ name, inputList, n, expectedList }) => {
            it(`should ${name} for list [${inputList}] with n=${n} -> [${expectedList}]`, () => {
                const head = createLinkedList(inputList);
                const modifiedHead = removeNthFromEndTwoPass(head, n);
                expect(linkedListToArray(modifiedHead)).toEqual(expectedList);
            });
        });
    });
});
```