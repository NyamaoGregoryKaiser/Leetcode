```typescript
/**
 * tests/bitManipulation.test.ts
 *
 * This file contains comprehensive test suites for the bit manipulation algorithms
 * implemented in `src/bitManipulation.ts`. It uses Jest for testing, covering
 * various positive, negative, edge, and large number cases to ensure correctness
 * and robustness of the implementations.
 */

import {
    countSetBitsSimple,
    countSetBitsBrianKernighan,
    singleNumber,
    singleNumberHashMap,
    isPowerOfTwo,
    isPowerOfTwoIterative,
    reverseBits
} from '../src/bitManipulation';

describe('Bit Manipulation Algorithms', () => {

    // --- Problem 1: Counting Set Bits (Hamming Weight) ---
    describe('countSetBits', () => {
        describe('countSetBitsSimple', () => {
            it('should return 0 for 0', () => {
                expect(countSetBitsSimple(0)).toBe(0);
            });

            it('should count set bits for powers of 2', () => {
                expect(countSetBitsSimple(1)).toBe(1);      // 0001
                expect(countSetBitsSimple(2)).toBe(1);      // 0010
                expect(countSetBitsSimple(4)).toBe(1);      // 0100
                expect(countSetBitsSimple(128)).toBe(1);    // 10000000
            });

            it('should count set bits for arbitrary numbers', () => {
                expect(countSetBitsSimple(3)).toBe(2);      // 0011
                expect(countSetBitsSimple(5)).toBe(2);      // 0101
                expect(countSetBitsSimple(11)).toBe(3);     // 1011
                expect(countSetBitsSimple(255)).toBe(8);    // 11111111
                expect(countSetBitsSimple(65535)).toBe(16); // All 16 bits set in a 16-bit number
            });

            it('should handle large numbers (up to 32-bit unsigned)', () => {
                // Max 32-bit unsigned integer (all 32 bits set)
                const maxUint32 = 0xFFFFFFFF; // 4294967295
                expect(countSetBitsSimple(maxUint32)).toBe(32);

                // A number with alternating bits
                const alternatingBits = 0xAAAAAAAA; // 10101010... (16 set bits)
                expect(countSetBitsSimple(alternatingBits)).toBe(16);
            });

            it('should handle numbers where high bits are set without JS negative interpretation', () => {
                // For instance, 2^31-1 (max positive 32-bit signed)
                const largePositive = 2147483647; // 0111...1111 (31 bits set)
                expect(countSetBitsSimple(largePositive)).toBe(31);

                // If input is treated as unsigned, it means it was a positive value passed.
                // JavaScript treats bitwise operations as 32-bit signed, but `>>> 0` handles the unsigned context.
                // E.g., a number like 2^31 (1000...0000) is negative in signed 32-bit, but positive for unsigned.
                const twoPower31 = 2147483648; // 10000000000000000000000000000000 (1 set bit, at MSB)
                expect(countSetBitsSimple(twoPower31)).toBe(1);
            });
        });

        describe('countSetBitsBrianKernighan', () => {
            it('should return 0 for 0', () => {
                expect(countSetBitsBrianKernighan(0)).toBe(0);
            });

            it('should count set bits for powers of 2', () => {
                expect(countSetBitsBrianKernighan(1)).toBe(1);
                expect(countSetBitsBrianKernighan(2)).toBe(1);
                expect(countSetBitsBrianKernighan(4)).toBe(1);
                expect(countSetBitsBrianKernighan(128)).toBe(1);
            });

            it('should count set bits for arbitrary numbers', () => {
                expect(countSetBitsBrianKernighan(3)).toBe(2);
                expect(countSetBitsBrianKernighan(5)).toBe(2);
                expect(countSetBitsBrianKernighan(11)).toBe(3);
                expect(countSetBitsBrianKernighan(255)).toBe(8);
                expect(countSetBitsBrianKernighan(65535)).toBe(16);
            });

            it('should handle large numbers (up to 32-bit unsigned)', () => {
                const maxUint32 = 0xFFFFFFFF; // 4294967295
                expect(countSetBitsBrianKernighan(maxUint32)).toBe(32);

                const alternatingBits = 0xAAAAAAAA; // 10101010... (16 set bits)
                expect(countSetBitsBrianKernighan(alternatingBits)).toBe(16);
            });

            it('should handle numbers where high bits are set without JS negative interpretation', () => {
                const largePositive = 2147483647; // 0111...1111 (31 bits set)
                expect(countSetBitsBrianKernighan(largePositive)).toBe(31);

                const twoPower31 = 2147483648; // 10000000000000000000000000000000 (1 set bit, at MSB)
                expect(countSetBitsBrianKernighan(twoPower31)).toBe(1);
            });
        });
    });

    // --- Problem 2: Single Number ---
    describe('singleNumber', () => {
        describe('XOR-based solution', () => {
            it('should find the single number in a simple array', () => {
                expect(singleNumber([2, 2, 1])).toBe(1);
            });

            it('should find the single number in a larger array', () => {
                expect(singleNumber([4, 1, 2, 1, 2])).toBe(4);
            });

            it('should work with a single element array', () => {
                expect(singleNumber([1])).toBe(1);
            });

            it('should handle zero as the single number', () => {
                expect(singleNumber([0, 1, 1])).toBe(0);
            });

            it('should handle negative numbers', () => {
                expect(singleNumber([-1, -1, 5])).toBe(5);
                expect(singleNumber([-2, 1, -2])).toBe(1);
                expect(singleNumber([7, -3, 7, -3, 0])).toBe(0);
            });

            it('should work with larger values', () => {
                expect(singleNumber([100000, 50000, 100000])).toBe(50000);
            });
        });

        describe('Hash Map solution (Alternative)', () => {
            it('should find the single number in a simple array', () => {
                expect(singleNumberHashMap([2, 2, 1])).toBe(1);
            });

            it('should find the single number in a larger array', () => {
                expect(singleNumberHashMap([4, 1, 2, 1, 2])).toBe(4);
            });

            it('should work with a single element array', () => {
                expect(singleNumberHashMap([1])).toBe(1);
            });

            it('should handle zero as the single number', () => {
                expect(singleNumberHashMap([0, 1, 1])).toBe(0);
            });

            it('should handle negative numbers', () => {
                expect(singleNumberHashMap([-1, -1, 5])).toBe(5);
                expect(singleNumberHashMap([-2, 1, -2])).toBe(1);
                expect(singleNumberHashMap([7, -3, 7, -3, 0])).toBe(0);
            });

            it('should work with larger values', () => {
                expect(singleNumberHashMap([100000, 50000, 100000])).toBe(50000);
            });
        });
    });

    // --- Problem 3: Power of Two ---
    describe('isPowerOfTwo', () => {
        describe('Bitwise AND Trick', () => {
            it('should return true for powers of two', () => {
                expect(isPowerOfTwo(1)).toBe(true);  // 2^0
                expect(isPowerOfTwo(2)).toBe(true);  // 2^1
                expect(isPowerOfTwo(4)).toBe(true);  // 2^2
                expect(isPowerOfTwo(16)).toBe(true); // 2^4
                expect(isPowerOfTwo(1024)).toBe(true); // 2^10
                expect(isPowerOfTwo(2147483648)).toBe(true); // 2^31 (MSB set, JavaScript handles as unsigned)
            });

            it('should return false for non-powers of two', () => {
                expect(isPowerOfTwo(0)).toBe(false);   // Edge case: non-positive
                expect(isPowerOfTwo(3)).toBe(false);
                expect(isPowerOfTwo(5)).toBe(false);
                expect(isPowerOfTwo(6)).toBe(false);
                expect(isPowerOfTwo(15)).toBe(false);
                expect(isPowerOfTwo(1023)).toBe(false);
                expect(isPowerOfTwo(-2)).toBe(false);  // Edge case: negative number
                expect(isPowerOfTwo(-16)).toBe(false); // Edge case: negative number
            });
        });

        describe('Iterative Division (Alternative)', () => {
            it('should return true for powers of two', () => {
                expect(isPowerOfTwoIterative(1)).toBe(true);
                expect(isPowerOfTwoIterative(2)).toBe(true);
                expect(isPowerOfTwoIterative(4)).toBe(true);
                expect(isPowerOfTwoIterative(16)).toBe(true);
                expect(isPowerOfTwoIterative(1024)).toBe(true);
                expect(isPowerOfTwoIterative(2147483648)).toBe(true);
            });

            it('should return false for non-powers of two', () => {
                expect(isPowerOfTwoIterative(0)).toBe(false);
                expect(isPowerOfTwoIterative(3)).toBe(false);
                expect(isPowerOfTwoIterative(5)).toBe(false);
                expect(isPowerOfTwoIterative(6)).toBe(false);
                expect(isPowerOfTwoIterative(15)).toBe(false);
                expect(isPowerOfTwoIterative(1023)).toBe(false);
                expect(isPowerOfTwoIterative(-2)).toBe(false);
                expect(isPowerOfTwoIterative(-16)).toBe(false);
            });
        });
    });

    // --- Problem 4: Reverse Bits ---
    describe('reverseBits', () => {
        it('should reverse bits for a standard example', () => {
            const n = 43261596; // 00000010100101000001111010011100
            const expected = 964176192; // 00111001011110000010100101000000
            expect(reverseBits(n)).toBe(expected);
        });

        it('should reverse bits for a number with only LSB set', () => {
            const n = 1; // 0...0001
            const expected = 2147483648; // 1000...0000 (2^31)
            expect(reverseBits(n)).toBe(expected);
        });

        it('should reverse bits for a number with only MSB set (if MSB is 2^31)', () => {
            const n = 2147483648; // 1000...0000 (2^31)
            const expected = 1; // 0...0001
            expect(reverseBits(n)).toBe(expected);
        });

        it('should handle 0 correctly', () => {
            expect(reverseBits(0)).toBe(0); // 0...0000 -> 0...0000
        });

        it('should handle a number with all 1s', () => {
            const n = 0xFFFFFFFF; // 4294967295 (all 32 bits are 1)
            expect(reverseBits(n)).toBe(0xFFFFFFFF); // Should remain all 1s
        });

        it('should handle a number with alternating bits starting with 1', () => {
            const n = 0xAAAAAAAA; // 10101010...1010 (16 ones, 16 zeros)
            const expected = 0x55555555; // 01010101...0101 (reversed)
            expect(reverseBits(n)).toBe(expected);
        });

        it('should handle a number with alternating bits starting with 0', () => {
            const n = 0x55555555; // 01010101...0101 (16 ones, 16 zeros)
            const expected = 0xAAAAAAAA; // 10101010...1010 (reversed)
            expect(reverseBits(n)).toBe(expected);
        });
    });
});
```