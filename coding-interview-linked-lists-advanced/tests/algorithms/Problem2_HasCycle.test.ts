```typescript
import { ListNode, createLinkedListWithCycle } from '../../src/data-structures/LinkedList';
import { hasCycle } from '../../src/algorithms/Problem2_HasCycle';
import { hasCycleSet } from '../../implementations/Problem2_HasCycle_Set';

describe('Problem 2: Linked List Cycle', () => {

    interface TestCase {
        name: string;
        arr: number[];
        pos: number; // -1 for no cycle, 0-indexed for cycle start
        expected: boolean;
    }

    const testCases: TestCase[] = [
        { name: 'example 1: cycle at index 1', arr: [3, 2, 0, -4], pos: 1, expected: true },
        { name: 'example 2: cycle at index 0', arr: [1, 2], pos: 0, expected: true },
        { name: 'example 3: no cycle', arr: [1], pos: -1, expected: false },
        { name: 'no cycle, multiple nodes', arr: [1, 2, 3, 4, 5], pos: -1, expected: false },
        { name: 'single node, no cycle', arr: [10], pos: -1, expected: false },
        { name: 'empty list', arr: [], pos: -1, expected: false },
        { name: 'cycle at the end of a long list', arr: Array.from({ length: 100 }, (_, i) => i), pos: 99, expected: true },
        { name: 'cycle where tail connects to head (pos 0)', arr: [1, 2, 3, 4], pos: 0, expected: true },
        { name: 'cycle where tail connects to itself (pos = length - 1)', arr: [1, 2, 3], pos: 2, expected: true },
        { name: 'cycle in a list with duplicate values', arr: [1, 2, 3, 1, 4], pos: 1, expected: true }, // [1,2,3,1,4], 4 points to 2
        { name: 'long list without cycle', arr: Array.from({ length: 1000 }, (_, i) => i), pos: -1, expected: false },
        { name: 'long list with cycle at middle', arr: Array.from({ length: 1000 }, (_, i) => i), pos: 500, expected: true },
    ];

    describe('Floyd\'s Tortoise and Hare Algorithm (hasCycle)', () => {
        testCases.forEach(({ name, arr, pos, expected }) => {
            it(`should correctly detect cycle for ${name} (arr: ${JSON.stringify(arr)}, pos: ${pos})`, () => {
                const head = createLinkedListWithCycle(arr, pos);
                expect(hasCycle(head)).toBe(expected);
            });
        });
    });

    describe('HashSet Approach (hasCycleSet)', () => {
        testCases.forEach(({ name, arr, pos, expected }) => {
            it(`should correctly detect cycle for ${name} (arr: ${JSON.stringify(arr)}, pos: ${pos}) using Set`, () => {
                const head = createLinkedListWithCycle(arr, pos);
                expect(hasCycleSet(head)).toBe(expected);
            });
        });
    });
});
```