```typescript
/**
 * tests/algorithms/isPowerOfTwo.test.ts
 *
 * Test suite for the Power of Two problem.
 * It tests both iterative and bit manipulation approaches.
 */

import {
    isPowerOfTwo_Iterative,
    isPowerOfTwo_BitManipulation,
    isPowerOfTwo // The default export
} from '../../src/algorithms/isPowerOfTwo';

describe('Is Power of Two Algorithms', () => {

    const testCases: { name: string; input: number; expected: boolean }[] = [
        // Powers of two
        { name: '1 (2^0)', input: 1, expected: true },
        { name: '2 (2^1)', input: 2, expected: true },
        { name: '4 (2^2)', input: 4, expected: true },
        { name: '8 (2^3)', input: 8, expected: true },
        { name: '1024 (2^10)', input: 1024, expected: true },
        { name: 'Large power of two (2^30)', input: 1073741824, expected: true }, // 2^30

        // Not powers of two (positive)
        { name: '3', input: 3, expected: false },
        { name: '5', input: 5, expected: false },
        { name: '6', input: 6, expected: false },
        { name: '7', input: 7, expected: false },
        { name: '9', input: 9, expected: false },
        { name: '1023', input: 1023, expected: false },
        { name: '1025', input: 1025, expected: false },

        // Edge cases
        { name: 'Zero', input: 0, expected: false }, // Powers of two are strictly positive
        { name: 'Negative one', input: -1, expected: false },
        { name: 'Negative two', input: -2, expected: false },
        { name: 'Negative four', input: -4, expected: false },
        { name: 'Smallest JS safe integer (negative)', input: Number.MIN_SAFE_INTEGER, expected: false },
        { name: 'Largest JS safe integer', input: Number.MAX_SAFE_INTEGER, expected: false },
        { name: 'MAX_INT (2^31 - 1, not a power of two)', input: 2147483647, expected: false },
        { name: 'MIN_INT (-2^31, not a positive power of two)', input: -2147483648, expected: false },
    ];

    // Helper to run tests for a given function
    const runTestsForFunction = (func: (n: number) => boolean, funcName: string) => {
        describe(`${funcName} approach`, () => {
            testCases.forEach(({ name, input, expected }) => {
                test(`should return ${expected} for ${name} (Input: ${input})`, () => {
                    expect(func(input)).toBe(expected);
                });
            });
        });
    };

    runTestsForFunction(isPowerOfTwo_Iterative, 'Iterative Division');
    runTestsForFunction(isPowerOfTwo_BitManipulation, 'Bit Manipulation');

    describe('Default isPowerOfTwo export', () => {
        testCases.forEach(({ name, input, expected }) => {
            test(`should match expected for ${name} (Input: ${input})`, () => {
                expect(isPowerOfTwo(input)).toBe(expected);
            });
        });

        test('should be an alias for the Bit Manipulation algorithm', () => {
            expect(isPowerOfTwo).toBe(isPowerOfTwo_BitManipulation);
        });
    });
});
```