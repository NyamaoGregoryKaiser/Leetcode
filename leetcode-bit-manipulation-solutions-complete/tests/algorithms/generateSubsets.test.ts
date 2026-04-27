```typescript
/**
 * tests/algorithms/generateSubsets.test.ts
 *
 * Test suite for the Generate Subsets problem (Power Set).
 * It tests both Bitmasking and Backtracking approaches.
 */

import {
    generateSubsets_Bitmasking,
    generateSubsets_Backtracking,
    generateSubsets // The default export
} from '../../src/algorithms/generateSubsets';

describe('Generate Subsets Algorithms', () => {

    // Helper to sort an array of arrays for consistent comparison
    const sortSubsets = (subsets: number[][]): number[][] => {
        return subsets
            .map(subset => [...subset].sort((a, b) => a - b)) // Sort elements within each subset
            .sort((a, b) => { // Sort subsets based on their string representation
                if (a.length !== b.length) return a.length - b.length;
                return a.join(',') < b.join(',') ? -1 : (a.join(',') > b.join(',') ? 1 : 0);
            });
    };

    const testCases: { name: string; input: number[]; expected: number[][] }[] = [
        {
            name: 'Empty array',
            input: [],
            expected: [[]]
        },
        {
            name: 'Single element array [0]',
            input: [0],
            expected: [[], [0]]
        },
        {
            name: 'Single element array [1]',
            input: [1],
            expected: [[], [1]]
        },
        {
            name: 'Two elements [1, 2]',
            input: [1, 2],
            expected: [[], [1], [2], [1, 2]]
        },
        {
            name: 'Three elements [1, 2, 3]',
            input: [1, 2, 3],
            expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
        },
        {
            name: 'Four elements [4, 5, 6, 7]',
            input: [4, 5, 6, 7],
            expected: [
                [], [4], [5], [6], [7],
                [4, 5], [4, 6], [4, 7], [5, 6], [5, 7], [6, 7],
                [4, 5, 6], [4, 5, 7], [4, 6, 7], [5, 6, 7],
                [4, 5, 6, 7]
            ]
        },
        {
            name: 'Mixed positive and negative numbers [-1, 0, 1]',
            input: [-1, 0, 1],
            expected: [[], [-1], [0], [1], [-1, 0], [-1, 1], [0, 1], [-1, 0, 1]]
        }
    ];

    // Helper to run tests for a given function
    const runTestsForFunction = (func: (nums: number[]) => number[][], funcName: string) => {
        describe(`${funcName} approach`, () => {
            testCases.forEach(({ name, input, expected }) => {
                test(`should generate all subsets for ${name} (Input: [${input}])`, () => {
                    const result = func(input);
                    // Sort both the expected and actual results for consistent comparison
                    expect(sortSubsets(result)).toEqual(sortSubsets(expected));
                });
            });
        });
    };

    runTestsForFunction(generateSubsets_Bitmasking, 'Bitmasking');
    runTestsForFunction(generateSubsets_Backtracking, 'Backtracking');

    describe('Default generateSubsets export', () => {
        testCases.forEach(({ name, input, expected }) => {
            test(`should match expected for ${name} (Input: [${input}])`, () => {
                const result = generateSubsets(input);
                expect(sortSubsets(result)).toEqual(sortSubsets(expected));
            });
        });

        test('should be an alias for the Bitmasking algorithm', () => {
            expect(generateSubsets).toBe(generateSubsets_Bitmasking);
        });
    });
});
```