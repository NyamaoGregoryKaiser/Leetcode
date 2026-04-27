```typescript
/**
 * tests/algorithms/singleNumber.test.ts
 *
 * Test suite for the Single Number problem.
 * It tests both Hash Map (less optimal for constraints) and Bit Manipulation (XOR) approaches.
 */

import {
    singleNumber_HashMap,
    singleNumber_XOR,
    singleNumber // The default export
} from '../../src/algorithms/singleNumber';

describe('Single Number Algorithms', () => {

    const testCases: { name: string; input: number[]; expected: number }[] = [
        { name: 'Basic example 1', input: [2, 2, 1], expected: 1 },
        { name: 'Basic example 2', input: [4, 1, 2, 1, 2], expected: 4 },
        { name: 'Single element array', input: [7], expected: 7 },
        { name: 'Longer array, single at end', input: [1, 2, 3, 4, 1, 2, 3], expected: 4 },
        { name: 'Longer array, single at start', input: [10, 1, 2, 3, 1, 2, 3], expected: 10 },
        { name: 'Longer array, single in middle', input: [5, 5, 6, 6, 7, 8, 8], expected: 7 },
        { name: 'Negative numbers', input: [-1, -2, -1, -2, -3], expected: -3 },
        { name: 'Mixed positive and negative', input: [-1, 2, -1, 3, 2], expected: 3 },
        { name: 'Zero as single number', input: [0, 1, 1], expected: 0 },
        { name: 'Zero as duplicate', input: [5, 0, 5], expected: 0 }, // Not actually, 0 is XOR identity. This means single is 0.
        { name: 'Large numbers', input: [100000, 200000, 100000, 300000, 200000], expected: 300000 },
        { name: 'MAX_SAFE_INTEGER and duplicates', input: [Number.MAX_SAFE_INTEGER, 1, Number.MAX_SAFE_INTEGER, 2, 1], expected: 2 },
        { name: 'MIN_SAFE_INTEGER and duplicates', input: [Number.MIN_SAFE_INTEGER, 1, Number.MIN_SAFE_INTEGER, 2, 1], expected: 2 },
    ];

    // Helper to run tests for a given function
    const runTestsForFunction = (func: (nums: number[]) => number, funcName: string) => {
        describe(`${funcName} approach`, () => {
            testCases.forEach(({ name, input, expected }) => {
                test(`should find the single number for ${name} (Input: [${input}])`, () => {
                    expect(func(input)).toBe(expected);
                });
            });
        });
    };

    runTestsForFunction(singleNumber_HashMap, 'Hash Map');
    runTestsForFunction(singleNumber_XOR, 'Bit Manipulation (XOR)');

    describe('Default singleNumber export', () => {
        testCases.forEach(({ name, input, expected }) => {
            test(`should match expected for ${name} (Input: [${input}])`, () => {
                expect(singleNumber(input)).toBe(expected);
            });
        });

        test('should be an alias for the Bit Manipulation (XOR) algorithm', () => {
            expect(singleNumber).toBe(singleNumber_XOR);
        });
    });

    // Test for edge case: empty array (though problem states non-empty)
    describe('Edge Cases', () => {
        test('should throw an error for empty array with HashMap (no single number)', () => {
            expect(() => singleNumber_HashMap([])).toThrow("No single number found - invalid input based on problem statement.");
        });

        // XOR approach will return 0 for an empty array, which might be an edge case depending on problem
        // interpretation if 0 is a valid number in the input array.
        // For this problem, it's defined as "non-empty array".
        test('should return 0 for an empty array with XOR (due to initial value)', () => {
            expect(singleNumber_XOR([])).toBe(0);
        });
    });
});
```