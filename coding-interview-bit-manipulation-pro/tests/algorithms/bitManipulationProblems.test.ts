```typescript
/**
 * @file bitManipulationProblems.test.ts
 * @description Jest test suite for all bit manipulation algorithm implementations.
 */

import {
    countSetBits_bruteForce,
    countSetBits_brianKernighan,
    countSetBits_lookupTable,
    isPowerOfTwo_bruteForce,
    isPowerOfTwo_bitManipulation,
    reverseBits_iterative,
    reverseBits_lookupTable,
    singleNumber_hashMap,
    singleNumber_xor,
    insertMIntoN_optimal,
} from '../../src/algorithms/bitManipulationProblems';
import { toBinaryString } from '../../src/utils/bitUtils';

// --- Helper for multiple solution testing ---
function testMultipleSolutions<TInput, TOutput>(
    description: string,
    solutions: { name: string, solve: (input: TInput) => TOutput }[],
    testCases: { input: TInput, expected: TOutput }[]
) {
    describe(description, () => {
        for (const { name, solve } of solutions) {
            it(`${name} should correctly solve all test cases`, () => {
                for (const { input, expected } of testCases) {
                    expect(solve(input)).toBe(expected);
                }
            });
        }
    });
}

// --- Problem 1: Count Set Bits (Hamming Weight) ---
describe('Count Set Bits (Hamming Weight)', () => {
    const testCases = [
        { input: 0, expected: 0 },
        { input: 1, expected: 1 },
        { input: 2, expected: 1 }, // 10
        { input: 3, expected: 2 }, // 11
        { input: 7, expected: 3 }, // 111
        { input: 8, expected: 1 }, // 1000
        { input: 15, expected: 4 }, // 1111
        { input: 16, expected: 1 }, // 10000
        { input: 0b10101010, expected: 4 },
        { input: 0b11111111, expected: 8 },
        { input: 0b00000000, expected: 0 },
        { input: 0b10110101110101011011110010101010, expected: 19 }, // Complex 32-bit
        { input: 0xFFFFFFFF, expected: 32 }, // All 1s (32-bit unsigned)
        { input: 0x00000000, expected: 0 }, // All 0s
        { input: 2147483647, expected: 31 }, // MAX_INT - 1 (011...111)
        { input: 2147483648, expected: 1 }, // 2^31 (100...000)
    ];

    testMultipleSolutions(
        'Count Set Bits Solutions',
        [
            countSetBits_bruteForce,
            countSetBits_brianKernighan,
            countSetBits_lookupTable,
        ],
        testCases
    );
});


// --- Problem 2: Is Power of Two ---
describe('Is Power of Two', () => {
    const testCases = [
        { input: 0, expected: false },
        { input: 1, expected: true },  // 2^0
        { input: 2, expected: true },  // 2^1
        { input: 3, expected: false },
        { input: 4, expected: true },  // 2^2
        { input: 5, expected: false },
        { input: 6, expected: false },
        { input: 7, expected: false },
        { input: 8, expected: true },  // 2^3
        { input: 1024, expected: true }, // 2^10
        { input: 1023, expected: false },
        { input: 2048, expected: true }, // 2^11
        { input: -2, expected: false }, // Negative numbers are not powers of two
        { input: -1, expected: false },
        { input: 2147483647, expected: false }, // Largest 31-bit integer (not power of 2)
        { input: 2147483648, expected: true }, // 2^31 (on platforms where this fits in number)
        { input: 4294967296, expected: true }, // 2^32 (JavaScript numbers can handle this)
    ];

    testMultipleSolutions(
        'Is Power of Two Solutions',
        [
            isPowerOfTwo_bruteForce,
            isPowerOfTwo_bitManipulation,
        ],
        testCases
    );
});


// --- Problem 3: Reverse Bits ---
describe('Reverse Bits', () => {
    const testCases = [
        { input: 0, expected: 0 },
        { input: 1, expected: 2147483648 }, // 0...01 -> 10...0
        { input: 2, expected: 1073741824 }, // 0...10 -> 010...0
        { input: 0b10000000000000000000000000000000, expected: 1 }, // MSB -> LSB
        { input: 0b00000000000000000000000000000001, expected: 0b10000000000000000000000000000000 }, // LSB -> MSB
        { input: 0b101, expected: 0b10100000000000000000000000000000 }, // 5 -> 2684354560
        { input: 0b00111001011110000010100101000000, expected: 0b00100101000001010000000111100000 }, // Example from problem description
        { input: 4294967295, expected: 4294967295 }, // 0xFFFFFFFF (all ones) reverses to itself
        { input: 2873345, expected: 0b10010011101010111010111010000000 }, // Custom complex number
    ];

    testMultipleSolutions(
        'Reverse Bits Solutions',
        [
            reverseBits_iterative,
            reverseBits_lookupTable,
        ],
        testCases
    );
});


// --- Problem 4: Single Number ---
describe('Single Number', () => {
    const testCases = [
        { input: [2, 2, 1], expected: 1 },
        { input: [4, 1, 2, 1, 2], expected: 4 },
        { input: [1], expected: 1 },
        { input: [1, 0, 1], expected: 0 },
        { input: [7, 7, 7, 7, 7, 8, 8, 9, 9, 10, 10], expected: 7 }, // One odd appearance
        { input: [123, 456, 123, 789, 456], expected: 789 },
        // Large test case
        {
            input: (() => {
                const arr: number[] = [];
                for (let i = 1; i <= 10000; i++) {
                    arr.push(i, i);
                }
                arr.push(5001); // The unique number
                return arr;
            })(),
            expected: 5001
        }
    ];

    testMultipleSolutions(
        'Single Number Solutions',
        [
            singleNumber_hashMap,
            singleNumber_xor,
        ],
        testCases
    );

    it('singleNumber_hashMap should throw error for invalid input', () => {
        expect(() => singleNumber_hashMap.solve([])).toThrow("Invalid input: no single number found or more than one.");
        expect(() => singleNumber_hashMap.solve([1, 2, 3])).toThrow("Invalid input: no single number found or more than one.");
    });
});


// --- Problem 5: Insert M into N ---
describe('Insert M into N', () => {
    const testCases = [
        { N: 0b10000000000, M: 0b10011, i: 2, j: 6, expected: 0b10001001100 }, // Example from problem
        { N: 0b00000000000, M: 0b101, i: 0, j: 2, expected: 0b101 }, // Insert into all zeros
        { N: 0b11111111111, M: 0b000, i: 0, j: 2, expected: 0b11111111000 }, // Clear bits and insert zeros
        { N: 0b11111111111, M: 0b101, i: 0, j: 2, expected: 0b11111111101 }, // Clear and insert
        { N: 0b10000000000000000000000000000000, M: 0b1, i: 0, j: 0, expected: 0b10000000000000000000000000000001 }, // Insert at LSB
        { N: 0b01111111111111111111111111111111, M: 0b1, i: 31, j: 31, expected: 0b11111111111111111111111111111111 }, // Insert at MSB
        { N: 0b10101010101010101010101010101010, M: 0b111, i: 4, j: 6, expected: 0b10101010101010101010101001111010 }, // Complex N
        { N: 0b0, M: 0b11111111111111111111111111111111, i: 0, j: 31, expected: 0xFFFFFFFF }, // Insert all 1s into 0s
    ];

    testMultipleSolutions(
        'Insert M into N Solution',
        [
            insertMIntoN_optimal,
        ],
        testCases.map(tc => ({ input: { N: tc.N, M: tc.M, i: tc.i, j: tc.j }, expected: tc.expected }))
    );

    it('insertMIntoN_optimal should throw error for invalid bit range', () => {
        expect(() => insertMIntoN_optimal.solve({ N: 0, M: 0, i: -1, j: 5 })).toThrow("Invalid bit range");
        expect(() => insertMIntoN_optimal.solve({ N: 0, M: 0, i: 5, j: 32 })).toThrow("Invalid bit range");
        expect(() => insertMIntoN_optimal.solve({ N: 0, M: 0, i: 5, j: 4 })).toThrow("Invalid bit range");
    });

    it('insertMIntoN_optimal should throw error if M does not fit', () => {
        // M = 0b100 (4), but range i=0, j=1 only has 2 bits (max value 0b11 = 3)
        expect(() => insertMIntoN_optimal.solve({ N: 0, M: 0b100, i: 0, j: 1 })).toThrow("M does not fit");
        // M = 0b10 (2), range i=0, j=0 only has 1 bit (max value 0b1 = 1)
        expect(() => insertMIntoN_optimal.solve({ N: 0, M: 0b10, i: 0, j: 0 })).toThrow("M does not fit");
    });
});
```