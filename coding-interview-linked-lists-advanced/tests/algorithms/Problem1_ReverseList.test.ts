```typescript
import { ListNode, createLinkedList, linkedListToArray } from '../../src/data-structures/LinkedList';
import { reverseListIterative } from '../../src/algorithms/Problem1_ReverseList';
import { reverseListRecursive } from '../../implementations/Problem1_ReverseList_Recursive';

describe('Problem 1: Reverse Linked List', () => {

    const testCases = [
        { name: 'empty list', input: [], expected: [] },
        { name: 'single node list', input: [1], expected: [1] },
        { name: 'two node list', input: [1, 2], expected: [2, 1] },
        { name: 'multiple node list', input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
        { name: 'list with even number of nodes', input: [10, 20, 30, 40], expected: [40, 30, 20, 10] },
        { name: 'list with negative numbers', input: [-1, -2, -3], expected: [-3, -2, -1] },
        { name: 'list with duplicate numbers', input: [1, 2, 1, 3], expected: [3, 1, 2, 1] },
        { name: 'large list (more than 10 nodes)', input: Array.from({ length: 15 }, (_, i) => i + 1), expected: Array.from({ length: 15 }, (_, i) => 15 - i) },
    ];

    describe('Iterative Solution (reverseListIterative)', () => {
        testCases.forEach(({ name, input, expected }) => {
            it(`should reverse a ${name}: ${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, () => {
                const head = createLinkedList(input);
                const reversedHead = reverseListIterative(head);
                expect(linkedListToArray(reversedHead)).toEqual(expected);
            });
        });
    });

    describe('Recursive Solution (reverseListRecursive)', () => {
        testCases.forEach(({ name, input, expected }) => {
            it(`should reverse a ${name}: ${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, () => {
                const head = createLinkedList(input);
                const reversedHead = reverseListRecursive(head);
                expect(linkedListToArray(reversedHead)).toEqual(expected);
            });
        });
    });
});
```