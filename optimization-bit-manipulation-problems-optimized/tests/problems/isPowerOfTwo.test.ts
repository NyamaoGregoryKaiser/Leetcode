```typescript
import {
    isPowerOfTwo_iterative,
    isPowerOfTwo_logarithm,
    isPowerOfTwo_bitwise
} from '../../src/problems/isPowerOfTwo';

describe('Is Power of Two', () => {
    const positivePowerOfTwoCases = [
        { n: 1, expected: true, description: '2^0' },
        { n: 2, expected: true, description: '2^1' },
        { n: 4, expected: true, description: '2^2' },
        { n: 8, expected: true, description: '2^3' },
        { n: 1024, expected: true, description: '2^10' },
        { n: 2048, expected: true, description: '2^11' },
        { n: 2147483648, expected: true, description: '2^31' }, // Largest 2^x within 32-bit signed int range (but can be unsigned)
    ];

    const nonPowerOfTwoCases = [
        { n: 0, expected: false, description: 'Zero' },
        { n: 3, expected: false, description: 'Odd number' },
        { n: 6, expected: false, description: 'Even but not power of 2' },
        { n: 1023, expected: false, description: 'One less than 2^10' },
        { n: 1025, expected: false, description: 'One more than 2^10' },
        { n: -1, expected: false, description: 'Negative number' },
        { n: -2, expected: false, description: 'Negative number' },
        { n: -2147483648, expected: false, description: 'Smallest negative 32-bit' }, // 2^31 as negative
    ];

    describe.each([
        ['Iterative Division', isPowerOfTwo_iterative],
        ['Logarithm Check', isPowerOfTwo_logarithm],
        ['Bitwise Check', isPowerOfTwo_bitwise],
    ])('Method: %s', (methodName, isPowerOfTwo) => {
        it('should return true for powers of two', () => {
            for (const { n, expected, description } of positivePowerOfTwoCases) {
                expect(isPowerOfTwo(n)).toBe(expected);
            }
        });

        it('should return false for non-powers of two', () => {
            for (const { n, expected, description } of nonPowerOfTwoCases) {
                expect(isPowerOfTwo(n)).toBe(expected);
            }
        });

        it('should handle large positive integers not exactly powers of two', () => {
            expect(isPowerOfTwo(2147483647)).toBe(false); // 2^31 - 1
            expect(isPowerOfTwo(2147483649)).toBe(false); // 2^31 + 1 (if within number limits)
        });
    });
});
```