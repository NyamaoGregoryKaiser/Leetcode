```typescript
/**
 * tests/algorithms/countSetBits.test.ts
 *
 * Test suite for the Count Set Bits (Hamming Weight) problem.
 * It tests multiple approaches: LSB iteration, Brian Kernighan's, and Lookup Table.
 */

import {
    countSetBits_LSB,
    countSetBits_BrianKernighan,
    countSetBits_LookupTable,
    hammingWeight // The default export
} from '../../src/algorithms/countSetBits';
import { toBinaryString32 } from '../../src/utils/binaryUtils';

describe('Count Set Bits (Hamming Weight) Algorithms', () => {

    const testCases = [
        { name: 'Zero', input: 0, expected: 0 },
        { name: 'One', input: 1, expected: 1 }, // 0...0001
        { name: 'Two', input: 2, expected: 1 }, // 0...0010
        { name: 'Three', input: 3, expected: 2 }, // 0...0011
        { name: 'Eleven', input: 11, expected: 3 }, // 0...1011
        { name: 'Max 8-bit unsigned', input: 255, expected: 8 }, // 0...11111111
        { name: 'Small power of 2', input: 8, expected: 1 }, // 0...1000
        { name: 'Large power of 2', input: 1 << 30, expected: 1 }, // 1000...00 (bit 30)
        { name: 'Max unsigned 32-bit (all ones)', input: 0xFFFFFFFF, expected: 32 }, // All 32 bits set
        { name: 'Mixed bits', input: 0xDEADBEEF, expected: 24 }, // 11011110101011011011111011101111
        { name: 'Alternating bits', input: 0xAAAAAAAA, expected: 16 }, // 10101010... (16 ones)
        { name: 'Alternating bits offset', input: 0x55555555, expected: 16 }, // 01010101... (16 ones)
        { name: 'Negative number (JS 32-bit signed two\'s complement)', input: -1, expected: 32 }, // 0xFFFFFFFF for unsigned interpretation
        { name: 'Negative number -2 (JS 32-bit signed)', input: -2, expected: 31 }, // 0xFFFFFFFE for unsigned interpretation
        { name: 'Negative number -100 (JS 32-bit signed)', input: -100, expected: 26 }, // 0xFFFFFF9C for unsigned interpretation
    ];

    // Helper to run tests for a given function
    const runTestsForFunction = (func: (n: number) => number, funcName: string) => {
        describe(`${funcName} approach`, () => {
            testCases.forEach(({ name, input, expected }) => {
                test(`should correctly count set bits for ${name} (Input: ${input}, Binary: ${toBinaryString32(input)})`, () => {
                    expect(func(input)).toBe(expected);
                });
            });
        });
    };

    runTestsForFunction(countSetBits_LSB, 'LSB Iteration');
    runTestsForFunction(countSetBits_BrianKernighan, 'Brian Kernighan');
    runTestsForFunction(countSetBits_LookupTable, 'Lookup Table');

    describe('Default hammingWeight export', () => {
        testCases.forEach(({ name, input, expected }) => {
            test(`should match expected for ${name} (Input: ${input})`, () => {
                expect(hammingWeight(input)).toBe(expected);
            });
        });

        test('should be an alias for Brian Kernighan\'s algorithm', () => {
            expect(hammingWeight).toBe(countSetBits_BrianKernighan);
        });
    });
});
```