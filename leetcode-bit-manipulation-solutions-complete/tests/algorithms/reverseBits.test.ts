```typescript
/**
 * tests/algorithms/reverseBits.test.ts
 *
 * Test suite for the Reverse Bits problem.
 * It tests both iterative bit-by-bit and grouped bit swapping approaches.
 */

import {
    reverseBits_Iterative,
    reverseBits_GroupedSwaps,
    reverseBits // The default export
} from '../../src/algorithms/reverseBits';
import { toBinaryString32 } from '../../src/utils/binaryUtils';

describe('Reverse Bits Algorithms', () => {

    // Test cases for 32-bit unsigned integers
    const testCases = [
        {
            name: 'Example 1: LeetCode Sample',
            input: 43261596, // 00000010100101000001111010011100
            expected: 964176192 // 00111001011110000010100101000000
        },
        {
            name: 'All zeros',
            input: 0, // 0...0
            expected: 0 // 0...0
        },
        {
            name: 'All ones (max unsigned 32-bit)',
            input: 0xFFFFFFFF, // 1...1
            expected: 0xFFFFFFFF // 1...1
        },
        {
            name: 'Single MSB set',
            input: 1 << 31, // 1000...00 (MSB) -> -2147483648 in signed int
            expected: 1 // 0...01 (LSB)
        },
        {
            name: 'Single LSB set',
            input: 1, // 0...01 (LSB)
            expected: 1 << 31 // 1000...00 (MSB) -> -2147483648 in signed int
        },
        {
            name: 'Alternating bits (starting with 0)',
            input: 0x55555555, // 01010101...0101
            expected: 0xAAAAAAAA // 10101010...1010
        },
        {
            name: 'Alternating bits (starting with 1)',
            input: 0xAAAAAAAA, // 10101010...1010
            expected: 0x55555555 // 01010101...0101
        },
        {
            name: 'First byte reversed to last byte',
            input: 0x000000F0, // ...000011110000
            expected: 0x0F000000 // 00001111000000...
        },
        {
            name: 'Last byte reversed to first byte',
            input: 0xF0000000, // 11110000...
            expected: 0x0000000F // ...00001111
        },
        {
            name: 'Palindrome in bits (e.g., 0xCC = 11001100)',
            input: 0xCC, // 0...11001100
            expected: 0x33000000 // 00110011...
        },
        {
            name: 'More complex pattern',
            input: 0x12345678, // 00010010001101000101011001111000
            expected: 0x1E6A2C48 // 00011110011010100010110001001000
        },
    ];

    // Helper to run tests for a given function
    const runTestsForFunction = (func: (n: number) => number, funcName: string) => {
        describe(`${funcName} approach`, () => {
            testCases.forEach(({ name, input, expected }) => {
                // For better readability and debugging, convert inputs/outputs to binary strings.
                const inputBinary = toBinaryString32(input);
                const expectedBinary = toBinaryString32(expected);
                test(`should correctly reverse bits for ${name}\n Input:  ${input} (${inputBinary})\n Output: ${expected} (${expectedBinary})`, () => {
                    const result = func(input);
                    const resultBinary = toBinaryString32(result);

                    expect(result).toBe(expected);
                    expect(resultBinary).toBe(expectedBinary); // Also verify binary string representation
                });
            });
        });
    };

    runTestsForFunction(reverseBits_Iterative, 'Iterative Bit-by-Bit');
    runTestsForFunction(reverseBits_GroupedSwaps, 'Grouped Bit Swapping');

    describe('Default reverseBits export', () => {
        testCases.forEach(({ name, input, expected }) => {
            test(`should match expected for ${name}`, () => {
                expect(reverseBits(input)).toBe(expected);
            });
        });

        test('should be an alias for the Iterative Bit-by-Bit algorithm', () => {
            expect(reverseBits).toBe(reverseBits_Iterative);
        });
    });
});
```