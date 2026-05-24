```typescript
import {
    reverseBits_iterative,
    reverseBits_divideAndConquer
} from '../../src/problems/reverseBits';
import { toBinaryString } from '../../src/utils/bitUtils';

describe('Reverse Bits', () => {
    const testCases = [
        { n: 0, expected: 0, binaryN: '00000000000000000000000000000000', binaryExpected: '00000000000000000000000000000000' },
        { n: 1, expected: 2147483648, binaryN: '00000000000000000000000000000001', binaryExpected: '10000000000000000000000000000000' }, // 2^31
        { n: 2, expected: 1073741824, binaryN: '00000000000000000000000000000010', binaryExpected: '01000000000000000000000000000000' }, // 2^30
        { n: 3, expected: 3221225472, binaryN: '00000000000000000000000000000011', binaryExpected: '11000000000000000000000000000000' }, // 2^31 + 2^30
        { n: 43261596, expected: 964176192, binaryN: '00000010100101000001111010011100', binaryExpected: '00111001011110000010100101000000' }, // LeetCode example
        { n: 4294967295, expected: 4294967295, binaryN: '11111111111111111111111111111111', binaryExpected: '11111111111111111111111111111111' }, // All 1s
        { n: 2147483648, expected: 1, binaryN: '10000000000000000000000000000000', binaryExpected: '00000000000000000000000000000001' }, // 2^31
        { n: parseInt('00010000000000000000000000000000', 2), expected: parseInt('00000000000000000000000000010000', 2), binaryN: '00010000000000000000000000000000', binaryExpected: '00000000000000000000000000010000' }, // 2^28 -> 2^4
        { n: parseInt('00000000000000000000000000001111', 2), expected: parseInt('11110000000000000000000000000000', 2), binaryN: '00000000000000000000000000001111', binaryExpected: '11110000000000000000000000000000' }, // First 4 bits set -> last 4 bits set
    ];

    describe.each([
        ['Iterative Shifting', reverseBits_iterative],
        ['Divide and Conquer (Parallel Swapping)', reverseBits_divideAndConquer],
    ])('Method: %s', (methodName, reverseBits) => {
        it('should correctly reverse bits for various 32-bit unsigned integers', () => {
            for (const { n, expected, binaryN, binaryExpected } of testCases) {
                const result = reverseBits(n);
                expect(result).toBe(expected);
                expect(toBinaryString(n)).toBe(binaryN); // Check input binary
                expect(toBinaryString(result)).toBe(binaryExpected); // Check output binary
            }
        });

        it('should handle large input values', () => {
            // A number with a specific pattern of bits
            const input = parseInt('10101010101010101010101010101010', 2); // alternating 10...
            const expected = parseInt('01010101010101010101010101010101', 2); // ...01 alternating
            expect(reverseBits(input)).toBe(expected);
            expect(toBinaryString(input)).toBe('10101010101010101010101010101010');
            expect(toBinaryString(expected)).toBe('01010101010101010101010101010101');
        });
    });
});
```