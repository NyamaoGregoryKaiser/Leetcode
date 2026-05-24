```typescript
import {
    countSetBits_iterative,
    countSetBits_brianKernighan,
    countSetBits_lookupTable
} from '../../src/problems/countSetBits';
import { toBinaryString } from '../../src/utils/bitUtils';

describe('Count Set Bits (Hamming Weight)', () => {
    const testCases = [
        { n: 0, expected: 0, binary: '00000000000000000000000000000000' },
        { n: 1, expected: 1, binary: '00000000000000000000000000000001' },
        { n: 2, expected: 1, binary: '00000000000000000000000000000010' },
        { n: 3, expected: 2, binary: '00000000000000000000000000000011' },
        { n: 7, expected: 3, binary: '00000000000000000000000000000111' },
        { n: 8, expected: 1, binary: '00000000000000000000000000001000' },
        { n: 43261596, expected: 10, binary: '00000010100101000001111010011100' }, // Example from Reverse Bits problem
        { n: 964176192, expected: 10, binary: '00111001011110000010100101000000' }, // Example from Reverse Bits problem reversed
        { n: 2147483647, expected: 31, binary: '01111111111111111111111111111111' }, // 2^31 - 1 (max positive signed 32-bit)
        { n: 4294967295, expected: 32, binary: '11111111111111111111111111111111' }, // 2^32 - 1 (max unsigned 32-bit)
        // Test with a large number where LSBs are 0
        { n: 256, expected: 1, binary: '00000000000000000000000100000000' },
        // A number with alternating bits
        { n: parseInt('10101010101010101010101010101010', 2), expected: 16, binary: '10101010101010101010101010101010' },
        { n: parseInt('01010101010101010101010101010101', 2), expected: 16, binary: '01010101010101010101010101010101' },
    ];

    describe.each([
        ['Iterative Bit Check', countSetBits_iterative],
        ['Brian Kernighan\'s Algorithm', countSetBits_brianKernighan],
        ['Lookup Table (Precomputation)', countSetBits_lookupTable],
    ])('Method: %s', (methodName, countSetBits) => {
        it('should correctly count set bits for various integers', () => {
            for (const { n, expected, binary } of testCases) {
                // For unsigned 32-bit, JS numbers are 64-bit, so we manually ensure the input is treated as 32-bit unsigned.
                // The functions already handle `n >>> 0` internally.
                const result = countSetBits(n);
                expect(result).toBe(expected);
                expect(toBinaryString(n)).toBe(binary); // Validate binary representation
            }
        });

        // Test with maximum 32-bit unsigned integer
        it('should correctly count set bits for max unsigned 32-bit integer (all 1s)', () => {
            const maxUInt32 = 0xFFFFFFFF; // 4294967295
            expect(countSetBits(maxUInt32)).toBe(32);
        });

        // Test with minimum 32-bit unsigned integer
        it('should correctly count set bits for 0', () => {
            expect(countSetBits(0)).toBe(0);
        });
    });
});
```