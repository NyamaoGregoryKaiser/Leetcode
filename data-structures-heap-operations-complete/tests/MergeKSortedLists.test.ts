import { ListNode, mergeKLists, mergeKLists_bruteForce, mergeKLists_divideAndConquer } from '../src/algorithms/MergeKSortedLists';

// Helper function to convert an array to a linked list
const arrayToList = (arr: number[]): ListNode | null => {
    if (arr.length === 0) {
        return null;
    }
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
};

// Helper function to convert a linked list to an array
const listToArray = (head: ListNode | null): number[] => {
    const arr: number[] = [];
    let current = head;
    while (current !== null) {
        arr.push(current.val);
        current = current.next;
    }
    return arr;
};

describe('MergeKSortedLists', () => {
    const testCases = [
        {
            name: 'Example 1',
            input: [
                arrayToList([1, 4, 5]),
                arrayToList([1, 3, 4]),
                arrayToList([2, 6]),
            ],
            expected: [1, 1, 2, 3, 4, 4, 5, 6],
        },
        {
            name: 'Empty lists array',
            input: [],
            expected: [],
        },
        {
            name: 'Single empty list in array',
            input: [null],
            expected: [],
        },
        {
            name: 'Multiple empty lists',
            input: [null, null, null],
            expected: [],
        },
        {
            name: 'Single non-empty list',
            input: [arrayToList([1, 2, 3])],
            expected: [1, 2, 3],
        },
        {
            name: 'Two lists of different lengths',
            input: [
                arrayToList([1, 10, 20]),
                arrayToList([5, 15]),
            ],
            expected: [1, 5, 10, 15, 20],
        },
        {
            name: 'Lists with duplicates',
            input: [
                arrayToList([1, 1, 2]),
                arrayToList([1, 3, 4]),
                arrayToList([2, 6, 6]),
            ],
            expected: [1, 1, 1, 2, 2, 3, 4, 6, 6],
        },
        {
            name: 'Lists with negative numbers',
            input: [
                arrayToList([-5, -3, 0]),
                arrayToList([-10, -1, 1]),
            ],
            expected: [-10, -5, -3, -1, 0, 1],
        },
        {
            name: 'Large number of lists (10 lists, 5 elements each)',
            input: Array.from({ length: 10 }, (_, i) => arrayToList([i * 10 + 1, i * 10 + 2, i * 10 + 3, i * 10 + 4, i * 10 + 5])),
            expected: Array.from({ length: 50 }, (_, i) => Math.floor(i / 5) * 10 + (i % 5) + 1).sort((a, b) => a - b),
        },
        {
            name: 'All lists sorted descending (should still work as input lists are sorted ascending)',
            input: [
                arrayToList([10, 20, 30]),
                arrayToList([1, 2, 3]),
            ],
            expected: [1, 2, 3, 10, 20, 30],
        },
        {
            name: 'Lists where some values are much larger/smaller',
            input: [
                arrayToList([1, 2]),
                arrayToList([1000, 2000]),
                arrayToList([5, 10]),
            ],
            expected: [1, 2, 5, 10, 1000, 2000],
        },
    ];

    describe('mergeKLists (Heap-based)', () => {
        testCases.forEach(testCase => {
            it(`should correctly merge for: ${testCase.name}`, () => {
                const result = mergeKLists(testCase.input);
                expect(listToArray(result)).toEqual(testCase.expected);
            });
        });
    });

    describe('mergeKLists_bruteForce (Sorting-based)', () => {
        testCases.forEach(testCase => {
            it(`should correctly merge for: ${testCase.name}`, () => {
                const result = mergeKLists_bruteForce(testCase.input);
                expect(listToArray(result)).toEqual(testCase.expected);
            });
        });
    });

    describe('mergeKLists_divideAndConquer', () => {
        testCases.forEach(testCase => {
            it(`should correctly merge for: ${testCase.name}`, () => {
                const result = mergeKLists_divideAndConquer(testCase.input);
                expect(listToArray(result)).toEqual(testCase.expected);
            });
        });
    });
});